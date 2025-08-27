import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Contact form schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  inquiryType: z.enum(['general', 'order', 'size', 'custom', 'wholesale', 'press']).default('general'),
  orderNumber: z.string().optional(),
  urgency: z.enum(['low', 'medium', 'high']).default('medium'),
});

// Quote request schema
const quoteSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number is required for quotes'),
  company: z.string().optional(),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  productType: z.string().min(1, 'Product type is required'),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  specifications: z.string().min(20, 'Please provide detailed specifications'),
  attachments: z.array(z.string()).optional(),
});

// Mock contact submissions (in real app, this would be in a database)
const mockSubmissions = [
  {
    id: '1',
    name: 'Sarah Ahmed',
    email: 'sarah@example.com',
    subject: 'Size chart inquiry',
    inquiryType: 'size',
    status: 'resolved',
    submittedAt: new Date('2024-03-10'),
    respondedAt: new Date('2024-03-10'),
    priority: 'medium',
  },
  {
    id: '2',
    name: 'Fatima Hassan',
    email: 'fatima@example.com',
    subject: 'Custom design request',
    inquiryType: 'custom',
    status: 'in-progress',
    submittedAt: new Date('2024-03-09'),
    priority: 'high',
  },
];

// Mock email service
const sendContactEmail = async (submission: any) => {
  console.log(`Sending contact form email for submission ${submission.id}`);
  
  // Simulate email sending
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    success: true,
    messageId: `contact_${Date.now()}`,
  };
};

const sendAutoReply = async (email: string, name: string, submissionId: string) => {
  console.log(`Sending auto-reply to ${email} for submission ${submissionId}`);
  
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return {
    success: true,
    messageId: `autoreply_${Date.now()}`,
  };
};

const sendQuoteEmail = async (quote: any) => {
  console.log(`Sending quote request email for ${quote.id}`);
  
  await new Promise(resolve => setTimeout(resolve, 700));
  
  return {
    success: true,
    messageId: `quote_${Date.now()}`,
  };
};

// POST - Submit contact form
export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'contact';
    
    const body = await request.json();
    
    if (type === 'quote') {
      // Handle quote request
      const validatedData = quoteSchema.parse(body);
      
      const newQuote = {
        id: `quote_${Date.now()}`,
        ...validatedData,
        status: 'pending',
        submittedAt: new Date(),
        type: 'quote',
      };
      
      // Send quote request email to admin
      await sendQuoteEmail(newQuote);
      
      // Send confirmation to customer
      await sendAutoReply(
        validatedData.email,
        validatedData.name,
        newQuote.id
      );
      
      return NextResponse.json({
        success: true,
        message: 'Quote request submitted successfully! We\'ll get back to you within 24-48 hours.',
        data: {
          submissionId: newQuote.id,
          estimatedResponse: '24-48 hours',
        },
      }, { status: 201 });
      
    } else {
      // Handle regular contact form
      const validatedData = contactSchema.parse(body);
      
      // Determine priority based on inquiry type and urgency
      let priority = validatedData.urgency;
      if (validatedData.inquiryType === 'order' && validatedData.orderNumber) {
        priority = 'high';
      }
      
      const newSubmission = {
        id: `contact_${Date.now()}`,
        ...validatedData,
        status: 'new',
        submittedAt: new Date(),
        priority,
        type: 'contact',
      };
      
      // Add to mock database
      mockSubmissions.push(newSubmission);
      
      // Send notification email to admin
      await sendContactEmail(newSubmission);
      
      // Send auto-reply to customer
      await sendAutoReply(
        validatedData.email,
        validatedData.name,
        newSubmission.id
      );
      
      // Determine response time based on priority
      let estimatedResponse;
      switch (priority) {
        case 'high':
          estimatedResponse = '2-4 hours';
          break;
        case 'medium':
          estimatedResponse = '4-8 hours';
          break;
        case 'low':
        default:
          estimatedResponse = '8-24 hours';
          break;
      }
      
      return NextResponse.json({
        success: true,
        message: 'Your message has been sent successfully! We\'ll get back to you soon.',
        data: {
          submissionId: newSubmission.id,
          priority,
          estimatedResponse,
        },
      }, { status: 201 });
    }
    
  } catch (error) {
    console.error('Contact form submission error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please check your form data',
          details: error.issues,
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      {
        success: false,
        error: 'Something went wrong. Please try again or contact us directly.',
      },
      { status: 500 }
    );
  }
}

// GET - Retrieve contact submissions (admin only)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const adminKey = searchParams.get('adminKey');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50);
    
    // Validate admin access
    if (adminKey !== 'admin_secret_key') {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
        },
        { status: 401 }
      );
    }
    
    let filteredSubmissions = [...mockSubmissions];
    
    // Filter by status if provided
    if (status && status !== 'all') {
      filteredSubmissions = filteredSubmissions.filter(
        sub => sub.status === status
      );
    }
    
    // Sort by submission date (newest first)
    filteredSubmissions.sort(
      (a, b) => b.submittedAt.getTime() - a.submittedAt.getTime()
    );
    
    // Apply pagination
    const totalSubmissions = filteredSubmissions.length;
    const totalPages = Math.ceil(totalSubmissions / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedSubmissions = filteredSubmissions.slice(startIndex, endIndex);
    
    // Calculate statistics
    const statistics = {
      total: mockSubmissions.length,
      new: mockSubmissions.filter(s => s.status === 'new').length,
      inProgress: mockSubmissions.filter(s => s.status === 'in-progress').length,
      resolved: mockSubmissions.filter(s => s.status === 'resolved').length,
      highPriority: mockSubmissions.filter(s => s.priority === 'high').length,
    };
    
    return NextResponse.json({
      success: true,
      data: {
        submissions: paginatedSubmissions,
        pagination: {
          currentPage: page,
          totalPages,
          totalSubmissions,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
        statistics,
      },
    });
    
  } catch (error) {
    console.error('Contact submissions GET error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

// PUT - Update contact submission status (admin only)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { submissionId, status, adminKey, response } = body;
    
    // Validate admin access
    if (adminKey !== 'admin_secret_key') {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
        },
        { status: 401 }
      );
    }
    
    if (!submissionId || !status) {
      return NextResponse.json(
        {
          success: false,
          error: 'Submission ID and status are required',
        },
        { status: 400 }
      );
    }
    
    // Find submission
    const submission = mockSubmissions.find(s => s.id === submissionId);
    
    if (!submission) {
      return NextResponse.json(
        {
          success: false,
          error: 'Submission not found',
        },
        { status: 404 }
      );
    }
    
    // Update submission
    (submission as any).status = status;
    if (status === 'resolved') {
      (submission as any).respondedAt = new Date();
    }
    if (response) {
      (submission as any).adminResponse = response;
    }
    
    return NextResponse.json({
      success: true,
      message: 'Submission updated successfully',
      data: { submission },
    });
    
  } catch (error) {
    console.error('Contact submission update error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
