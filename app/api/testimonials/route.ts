import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Testimonial schema for validation
const testimonialSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, 'Comment must be at least 10 characters'),
  productId: z.string().optional(),
  location: z.string().optional(),
});

// Mock testimonials data
const mockTestimonials = [
  {
    id: '1',
    name: 'Fatima Al-Zahra',
    location: 'Dubai, UAE',
    rating: 5,
    comment: 'The quality is exceptional! I\'ve ordered three abayas now and each one exceeds my expectations. The fabric is luxurious and the fit is perfect.',
    productId: '1',
    verified: true,
    date: new Date('2024-03-10'),
    helpful: 24,
    avatar: '/api/placeholder/64/64',
  },
  {
    id: '2',
    name: 'Sarah Ahmed',
    location: 'London, UK',
    rating: 5,
    comment: 'Absolutely beautiful! The embroidery work is stunning and I received so many compliments. Fast shipping to the UK too.',
    productId: '2',
    verified: true,
    date: new Date('2024-03-08'),
    helpful: 18,
    avatar: '/api/placeholder/64/64',
  },
  {
    id: '3',
    name: 'Khadija Rahman',
    location: 'Toronto, Canada',
    rating: 4,
    comment: 'Great quality and beautiful design. The only minor issue was the length was slightly long for me, but the tailoring service fixed it perfectly.',
    productId: '3',
    verified: true,
    date: new Date('2024-03-05'),
    helpful: 15,
    avatar: '/api/placeholder/64/64',
  },
  {
    id: '4',
    name: 'Aisha Hassan',
    location: 'New York, USA',
    rating: 5,
    comment: 'I\'m in love with my new abaya! The customer service was excellent and helped me choose the perfect size. Will definitely order again.',
    productId: '1',
    verified: true,
    date: new Date('2024-03-02'),
    helpful: 31,
    avatar: '/api/placeholder/64/64',
  },
  {
    id: '5',
    name: 'Mariam Abdullah',
    location: 'Riyadh, Saudi Arabia',
    rating: 5,
    comment: 'Traditional yet modern design. Perfect for special occasions. The fabric drapes beautifully and the attention to detail is remarkable.',
    productId: '6',
    verified: true,
    date: new Date('2024-02-28'),
    helpful: 22,
    avatar: '/api/placeholder/64/64',
  },
  {
    id: '6',
    name: 'Zara Malik',
    location: 'Manchester, UK',
    rating: 4,
    comment: 'Very pleased with my purchase. The abaya is comfortable for daily wear and the quality is impressive for the price point.',
    productId: '5',
    verified: true,
    date: new Date('2024-02-25'),
    helpful: 12,
    avatar: '/api/placeholder/64/64',
  },
  {
    id: '7',
    name: 'Layla Mohammed',
    location: 'Sydney, Australia',
    rating: 5,
    comment: 'Exceeded all my expectations! The packaging was beautiful and the abaya itself is a work of art. Thank you for bringing such elegance to my wardrobe.',
    productId: '4',
    verified: true,
    date: new Date('2024-02-20'),
    helpful: 28,
    avatar: '/api/placeholder/64/64',
  },
  {
    id: '8',
    name: 'Nour Al-Hassan',
    location: 'Doha, Qatar',
    rating: 5,
    comment: 'The burgundy abaya is absolutely stunning! Perfect for evening events. I\'ve received so many compliments and requests about where I bought it.',
    productId: '3',
    verified: true,
    date: new Date('2024-02-18'),
    helpful: 35,
    avatar: '/api/placeholder/64/64',
  },
];

// GET - Fetch testimonials with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '6'), 20);
    const productId = searchParams.get('productId');
    const sortBy = searchParams.get('sortBy') || 'newest'; // newest, oldest, rating, helpful
    
    let filteredTestimonials = [...mockTestimonials];
    
    // Filter by product if specified
    if (productId) {
      filteredTestimonials = filteredTestimonials.filter(
        testimonial => testimonial.productId === productId
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'oldest':
        filteredTestimonials.sort((a, b) => a.date.getTime() - b.date.getTime());
        break;
      case 'rating':
        filteredTestimonials.sort((a, b) => b.rating - a.rating);
        break;
      case 'helpful':
        filteredTestimonials.sort((a, b) => b.helpful - a.helpful);
        break;
      case 'newest':
      default:
        filteredTestimonials.sort((a, b) => b.date.getTime() - a.date.getTime());
        break;
    }
    
    // Apply pagination
    const totalTestimonials = filteredTestimonials.length;
    const totalPages = Math.ceil(totalTestimonials / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTestimonials = filteredTestimonials.slice(startIndex, endIndex);
    
    // Calculate statistics
    const averageRating = filteredTestimonials.length > 0
      ? filteredTestimonials.reduce((sum, t) => sum + t.rating, 0) / filteredTestimonials.length
      : 0;
    
    const ratingDistribution = {
      5: filteredTestimonials.filter(t => t.rating === 5).length,
      4: filteredTestimonials.filter(t => t.rating === 4).length,
      3: filteredTestimonials.filter(t => t.rating === 3).length,
      2: filteredTestimonials.filter(t => t.rating === 2).length,
      1: filteredTestimonials.filter(t => t.rating === 1).length,
    };
    
    return NextResponse.json({
      success: true,
      data: {
        testimonials: paginatedTestimonials,
        pagination: {
          currentPage: page,
          totalPages,
          totalTestimonials,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
        statistics: {
          averageRating: Math.round(averageRating * 10) / 10,
          totalReviews: filteredTestimonials.length,
          ratingDistribution,
        },
      },
    });
    
  } catch (error) {
    console.error('Testimonials GET API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

// POST - Submit a new testimonial
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the testimonial data
    const validatedData = testimonialSchema.parse(body);
    
    // Simulate saving to database
    const newTestimonial = {
      id: (mockTestimonials.length + 1).toString(),
      ...validatedData,
      verified: false, // New testimonials start as unverified
      date: new Date(),
      helpful: 0,
      avatar: '/api/placeholder/64/64',
    };
    
    // In a real app, you would save to database here
    // await db.testimonials.create(newTestimonial);
    
    return NextResponse.json({
      success: true,
      message: 'Thank you for your review! It will be published after verification.',
      data: {
        testimonial: newTestimonial,
      },
    }, { status: 201 });
    
  } catch (error) {
    console.error('Testimonials POST API error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid testimonial data',
          details: error.issues,
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

// PUT - Mark testimonial as helpful
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { testimonialId, action } = body;
    
    if (!testimonialId || !action) {
      return NextResponse.json(
        {
          success: false,
          error: 'Testimonial ID and action are required',
        },
        { status: 400 }
      );
    }
    
    if (action !== 'helpful') {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid action',
        },
        { status: 400 }
      );
    }
    
    // Find testimonial
    const testimonial = mockTestimonials.find(t => t.id === testimonialId);
    
    if (!testimonial) {
      return NextResponse.json(
        {
          success: false,
          error: 'Testimonial not found',
        },
        { status: 404 }
      );
    }
    
    // Increment helpful count
    testimonial.helpful += 1;
    
    return NextResponse.json({
      success: true,
      message: 'Thank you for your feedback!',
      data: {
        testimonial,
      },
    });
    
  } catch (error) {
    console.error('Testimonials PUT API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
