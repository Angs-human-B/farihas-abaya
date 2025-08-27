import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Product search and filter schema
const productQuerySchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  colors: z.string().optional(), // comma-separated values
  sizes: z.string().optional(), // comma-separated values
  sortBy: z.enum(['newest', 'price-low', 'price-high', 'popular']).optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(12),
});

// Mock product data
const mockProducts = [
  {
    id: '1',
    name: 'Midnight Elegance Abaya',
    price: 299.99,
    originalPrice: 349.99,
    category: 'premium',
    colors: ['black', 'navy'],
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/api/placeholder/400/600',
    images: ['/api/placeholder/400/600', '/api/placeholder/400/600'],
    description: 'Luxurious silk abaya with intricate gold embroidery',
    features: ['Premium Silk', 'Hand Embroidered', 'Classic Fit'],
    inStock: true,
    isNew: false,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 124,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Desert Rose Collection',
    price: 189.99,
    category: 'casual',
    colors: ['rose', 'beige'],
    sizes: ['XS', 'S', 'M', 'L'],
    image: '/api/placeholder/400/600',
    images: ['/api/placeholder/400/600'],
    description: 'Flowing chiffon abaya perfect for everyday elegance',
    features: ['Lightweight Chiffon', 'Breathable', 'Easy Care'],
    inStock: true,
    isNew: true,
    isFeatured: false,
    rating: 4.6,
    reviewCount: 89,
    createdAt: new Date('2024-02-20'),
  },
  {
    id: '3',
    name: 'Royal Burgundy Statement',
    price: 459.99,
    category: 'luxury',
    colors: ['burgundy'],
    sizes: ['M', 'L', 'XL'],
    image: '/api/placeholder/400/600',
    images: ['/api/placeholder/400/600', '/api/placeholder/400/600'],
    description: 'Luxurious velvet abaya with pearl detailing',
    features: ['Premium Velvet', 'Pearl Accents', 'Limited Edition'],
    inStock: true,
    isNew: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 67,
    createdAt: new Date('2024-03-01'),
  },
  {
    id: '4',
    name: 'Golden Shimmer Evening',
    price: 329.99,
    originalPrice: 399.99,
    category: 'evening',
    colors: ['gold', 'champagne'],
    sizes: ['S', 'M', 'L'],
    image: '/api/placeholder/400/600',
    images: ['/api/placeholder/400/600'],
    description: 'Glamorous evening abaya with subtle shimmer',
    features: ['Shimmer Fabric', 'Evening Wear', 'Elegant Cut'],
    inStock: false,
    isNew: false,
    isFeatured: true,
    rating: 4.7,
    reviewCount: 156,
    createdAt: new Date('2023-12-10'),
  },
  {
    id: '5',
    name: 'Contemporary Classic',
    price: 149.99,
    category: 'casual',
    colors: ['black', 'navy', 'gray'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: '/api/placeholder/400/600',
    images: ['/api/placeholder/400/600'],
    description: 'Modern cut abaya for contemporary women',
    features: ['Cotton Blend', 'Modern Fit', 'Versatile'],
    inStock: true,
    isNew: false,
    isFeatured: false,
    rating: 4.4,
    reviewCount: 203,
    createdAt: new Date('2023-11-15'),
  },
  {
    id: '6',
    name: 'Embroidered Heritage',
    price: 279.99,
    category: 'traditional',
    colors: ['navy', 'emerald'],
    sizes: ['S', 'M', 'L'],
    image: '/api/placeholder/400/600',
    images: ['/api/placeholder/400/600', '/api/placeholder/400/600'],
    description: 'Traditional embroidered abaya with modern comfort',
    features: ['Hand Embroidery', 'Traditional Design', 'Premium Cotton'],
    inStock: true,
    isNew: false,
    isFeatured: false,
    rating: 4.5,
    reviewCount: 78,
    createdAt: new Date('2024-01-08'),
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams);
    
    // Validate query parameters
    const validatedParams = productQuerySchema.parse(queryParams);
    
    let filteredProducts = [...mockProducts];
    
    // Apply search filter
    if (validatedParams.search) {
      const searchTerm = validatedParams.search.toLowerCase();
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.features.some(feature => feature.toLowerCase().includes(searchTerm))
      );
    }
    
    // Apply category filter
    if (validatedParams.category && validatedParams.category !== 'all') {
      filteredProducts = filteredProducts.filter(product =>
        product.category === validatedParams.category
      );
    }
    
    // Apply price filter
    if (validatedParams.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(product =>
        product.price >= validatedParams.minPrice!
      );
    }
    
    if (validatedParams.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(product =>
        product.price <= validatedParams.maxPrice!
      );
    }
    
    // Apply color filter
    if (validatedParams.colors) {
      const selectedColors = validatedParams.colors.split(',');
      filteredProducts = filteredProducts.filter(product =>
        product.colors.some(color => selectedColors.includes(color))
      );
    }
    
    // Apply size filter
    if (validatedParams.sizes) {
      const selectedSizes = validatedParams.sizes.split(',');
      filteredProducts = filteredProducts.filter(product =>
        product.sizes.some(size => selectedSizes.includes(size))
      );
    }
    
    // Apply sorting
    switch (validatedParams.sortBy) {
      case 'price-low':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filteredProducts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case 'popular':
        filteredProducts.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        // Default to featured first, then newest
        filteredProducts.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return b.createdAt.getTime() - a.createdAt.getTime();
        });
    }
    
    // Apply pagination
    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / validatedParams.limit);
    const startIndex = (validatedParams.page - 1) * validatedParams.limit;
    const endIndex = startIndex + validatedParams.limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    // Return response
    return NextResponse.json({
      success: true,
      data: {
        products: paginatedProducts,
        pagination: {
          currentPage: validatedParams.page,
          totalPages,
          totalProducts,
          hasNextPage: validatedParams.page < totalPages,
          hasPrevPage: validatedParams.page > 1,
        },
        filters: {
          availableCategories: ['casual', 'premium', 'luxury', 'evening', 'traditional'],
          availableColors: ['black', 'navy', 'rose', 'beige', 'burgundy', 'gold', 'champagne', 'gray', 'emerald'],
          availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
          priceRange: {
            min: Math.min(...mockProducts.map(p => p.price)),
            max: Math.max(...mockProducts.map(p => p.price)),
          },
        },
      },
    });
    
  } catch (error) {
    console.error('Products API error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid query parameters',
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

// Get single product by ID
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId } = body;
    
    if (!productId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product ID is required',
        },
        { status: 400 }
      );
    }
    
    const product = mockProducts.find(p => p.id === productId);
    
    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product not found',
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: { product },
    });
    
  } catch (error) {
    console.error('Product detail API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
