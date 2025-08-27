import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Newsletter subscription schema
const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  preferences: z.object({
    newArrivals: z.boolean().default(true),
    sales: z.boolean().default(true),
    styleGuides: z.boolean().default(true),
    exclusiveOffers: z.boolean().default(true),
  }).optional(),
  source: z.string().optional(), // Where they found us
});

// Unsubscribe schema
const unsubscribeSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  token: z.string().min(1, 'Unsubscribe token is required'),
});

// Mock subscriber data (in real app, this would be in a database)
const mockSubscribers = [
  {
    id: '1',
    email: 'sarah@example.com',
    firstName: 'Sarah',
    subscribedAt: new Date('2024-01-15'),
    isActive: true,
    preferences: {
      newArrivals: true,
      sales: true,
      styleGuides: false,
      exclusiveOffers: true,
    },
    source: 'website',
    unsubscribeToken: 'token_sarah_123',
  },
  {
    id: '2',
    email: 'fatima@example.com',
    firstName: 'Fatima',
    subscribedAt: new Date('2024-02-20'),
    isActive: true,
    preferences: {
      newArrivals: true,
      sales: false,
      styleGuides: true,
      exclusiveOffers: true,
    },
    source: 'instagram',
    unsubscribeToken: 'token_fatima_456',
  },
];

// Mock email service functions
const sendWelcomeEmail = async (email: string, firstName: string) => {
  // In a real app, you would use a service like SendGrid, Mailgun, etc.
  console.log(`Sending welcome email to ${email} (${firstName})`);
  
  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    success: true,
    messageId: `welcome_${Date.now()}`,
  };
};

const sendConfirmationEmail = async (email: string, firstName: string) => {
  console.log(`Sending confirmation email to ${email} (${firstName})`);
  
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return {
    success: true,
    messageId: `confirmation_${Date.now()}`,
  };
};

// POST - Subscribe to newsletter
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the subscription data
    const validatedData = newsletterSchema.parse(body);
    
    // Check if email already exists
    const existingSubscriber = mockSubscribers.find(
      sub => sub.email.toLowerCase() === validatedData.email.toLowerCase()
    );
    
    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        return NextResponse.json({
          success: false,
          error: 'This email is already subscribed to our newsletter',
        }, { status: 409 });
      } else {
        // Reactivate subscription
        existingSubscriber.isActive = true;
        existingSubscriber.subscribedAt = new Date();
        existingSubscriber.preferences = {
          ...existingSubscriber.preferences,
          ...validatedData.preferences,
        };
        
        // Send reactivation email
        await sendWelcomeEmail(validatedData.email, validatedData.firstName);
        
        return NextResponse.json({
          success: true,
          message: 'Welcome back! Your subscription has been reactivated.',
          data: {
            subscriber: {
              id: existingSubscriber.id,
              email: existingSubscriber.email,
              firstName: existingSubscriber.firstName,
              subscribedAt: existingSubscriber.subscribedAt,
            },
          },
        });
      }
    }
    
    // Create new subscriber
    const newSubscriber = {
      id: (mockSubscribers.length + 1).toString(),
      email: validatedData.email.toLowerCase(),
      firstName: validatedData.firstName,
      subscribedAt: new Date(),
      isActive: true,
      preferences: {
        newArrivals: true,
        sales: true,
        styleGuides: true,
        exclusiveOffers: true,
        ...validatedData.preferences,
      },
      source: validatedData.source || 'website',
      unsubscribeToken: `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
    
    // Add to mock database
    mockSubscribers.push(newSubscriber);
    
    // Send welcome email
    await sendWelcomeEmail(validatedData.email, validatedData.firstName);
    
    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed! Check your email for a welcome message.',
      data: {
        subscriber: {
          id: newSubscriber.id,
          email: newSubscriber.email,
          firstName: newSubscriber.firstName,
          subscribedAt: newSubscriber.subscribedAt,
        },
      },
    }, { status: 201 });
    
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid subscription data',
          details: error.issues,
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error. Please try again.',
      },
      { status: 500 }
    );
  }
}

// DELETE - Unsubscribe from newsletter
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate unsubscribe data
    const validatedData = unsubscribeSchema.parse(body);
    
    // Find subscriber
    const subscriber = mockSubscribers.find(
      sub => sub.email.toLowerCase() === validatedData.email.toLowerCase() &&
             sub.unsubscribeToken === validatedData.token
    );
    
    if (!subscriber) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email or unsubscribe token',
        },
        { status: 404 }
      );
    }
    
    if (!subscriber.isActive) {
      return NextResponse.json(
        {
          success: false,
          error: 'This email is already unsubscribed',
        },
        { status: 409 }
      );
    }
    
    // Deactivate subscription
    subscriber.isActive = false;
    
    // Send confirmation email
    await sendConfirmationEmail(validatedData.email, subscriber.firstName);
    
    return NextResponse.json({
      success: true,
      message: 'You have been successfully unsubscribed from our newsletter.',
    });
    
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid unsubscribe data',
          details: error.issues,
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error. Please try again.',
      },
      { status: 500 }
    );
  }
}

// PUT - Update subscription preferences
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, preferences, token } = body;
    
    if (!email || !token) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email and token are required',
        },
        { status: 400 }
      );
    }
    
    // Find subscriber
    const subscriber = mockSubscribers.find(
      sub => sub.email.toLowerCase() === email.toLowerCase() &&
             sub.unsubscribeToken === token
    );
    
    if (!subscriber || !subscriber.isActive) {
      return NextResponse.json(
        {
          success: false,
          error: 'Subscriber not found or inactive',
        },
        { status: 404 }
      );
    }
    
    // Update preferences
    subscriber.preferences = {
      ...subscriber.preferences,
      ...preferences,
    };
    
    return NextResponse.json({
      success: true,
      message: 'Preferences updated successfully',
      data: {
        preferences: subscriber.preferences,
      },
    });
    
  } catch (error) {
    console.error('Newsletter preferences update error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

// GET - Get newsletter statistics (admin only)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const adminKey = searchParams.get('adminKey');
    
    // In a real app, you would validate admin authentication
    if (adminKey !== 'admin_secret_key') {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
        },
        { status: 401 }
      );
    }
    
    const activeSubscribers = mockSubscribers.filter(sub => sub.isActive);
    const totalSubscribers = activeSubscribers.length;
    
    // Calculate growth (mock data)
    const thisMonth = new Date();
    thisMonth.setDate(1);
    const newThisMonth = activeSubscribers.filter(
      sub => sub.subscribedAt >= thisMonth
    ).length;
    
    const sourceBreakdown = activeSubscribers.reduce((acc, sub) => {
      acc[sub.source] = (acc[sub.source] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const preferencesBreakdown = {
      newArrivals: activeSubscribers.filter(sub => sub.preferences.newArrivals).length,
      sales: activeSubscribers.filter(sub => sub.preferences.sales).length,
      styleGuides: activeSubscribers.filter(sub => sub.preferences.styleGuides).length,
      exclusiveOffers: activeSubscribers.filter(sub => sub.preferences.exclusiveOffers).length,
    };
    
    return NextResponse.json({
      success: true,
      data: {
        totalSubscribers,
        newThisMonth,
        growthRate: totalSubscribers > 0 ? (newThisMonth / totalSubscribers) * 100 : 0,
        sourceBreakdown,
        preferencesBreakdown,
      },
    });
    
  } catch (error) {
    console.error('Newsletter statistics error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
