import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Store location schema
const storeSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    zipCode: z.string(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  }),
  contact: z.object({
    phone: z.string(),
    email: z.string().email(),
    whatsapp: z.string().optional(),
  }),
  hours: z.object({
    monday: z.string(),
    tuesday: z.string(),
    wednesday: z.string(),
    thursday: z.string(),
    friday: z.string(),
    saturday: z.string(),
    sunday: z.string(),
  }),
  features: z.array(z.string()),
  rating: z.number().min(1).max(5),
  reviewCount: z.number(),
  image: z.string(),
  isActive: z.boolean(),
  isFlagship: z.boolean(),
});

// Mock store data
const mockStores = [
  {
    id: '1',
    name: 'Fariha\'s Abaya Flagship Store',
    address: {
      street: '123 Fashion District',
      city: 'Dubai',
      state: 'Dubai',
      country: 'UAE',
      zipCode: '12345',
      coordinates: { lat: 25.2048, lng: 55.2708 },
    },
    contact: {
      phone: '+971-4-123-4567',
      email: 'dubai@farihasabaya.com',
      whatsapp: '+971-50-123-4567',
    },
    hours: {
      monday: '10:00 AM - 10:00 PM',
      tuesday: '10:00 AM - 10:00 PM',
      wednesday: '10:00 AM - 10:00 PM',
      thursday: '10:00 AM - 10:00 PM',
      friday: '2:00 PM - 11:00 PM',
      saturday: '10:00 AM - 11:00 PM',
      sunday: '10:00 AM - 10:00 PM',
    },
    features: [
      'Personal Styling Service',
      'Alterations Available',
      'VIP Fitting Room',
      'Complimentary Refreshments',
      'Private Appointments',
      'Wedding Collection',
    ],
    rating: 4.9,
    reviewCount: 234,
    image: '/api/placeholder/600/400',
    isActive: true,
    isFlagship: true,
    description: 'Our flagship store offering the complete Fariha\'s Abaya experience with personal styling and exclusive collections.',
  },
  {
    id: '2',
    name: 'Fariha\'s Abaya London',
    address: {
      street: '45 Oxford Street',
      city: 'London',
      state: 'England',
      country: 'UK',
      zipCode: 'W1D 2DZ',
      coordinates: { lat: 51.5074, lng: -0.1278 },
    },
    contact: {
      phone: '+44-20-7123-4567',
      email: 'london@farihasabaya.com',
      whatsapp: '+44-7712-345678',
    },
    hours: {
      monday: '9:00 AM - 8:00 PM',
      tuesday: '9:00 AM - 8:00 PM',
      wednesday: '9:00 AM - 8:00 PM',
      thursday: '9:00 AM - 9:00 PM',
      friday: '9:00 AM - 9:00 PM',
      saturday: '9:00 AM - 9:00 PM',
      sunday: '11:00 AM - 6:00 PM',
    },
    features: [
      'Personal Shopping',
      'Express Alterations',
      'Gift Wrapping',
      'Student Discount',
      'Online Click & Collect',
    ],
    rating: 4.7,
    reviewCount: 156,
    image: '/api/placeholder/600/400',
    isActive: true,
    isFlagship: false,
    description: 'Located in the heart of London\'s shopping district, offering premium abayas and personalized service.',
  },
  {
    id: '3',
    name: 'Fariha\'s Abaya New York',
    address: {
      street: '789 Fifth Avenue',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      zipCode: '10022',
      coordinates: { lat: 40.7589, lng: -73.9851 },
    },
    contact: {
      phone: '+1-212-123-4567',
      email: 'newyork@farihasabaya.com',
      whatsapp: '+1-917-123-4567',
    },
    hours: {
      monday: '10:00 AM - 8:00 PM',
      tuesday: '10:00 AM - 8:00 PM',
      wednesday: '10:00 AM - 8:00 PM',
      thursday: '10:00 AM - 8:00 PM',
      friday: '10:00 AM - 8:00 PM',
      saturday: '10:00 AM - 9:00 PM',
      sunday: '12:00 PM - 6:00 PM',
    },
    features: [
      'Personal Stylist',
      'Same-Day Alterations',
      'Luxury Packaging',
      'VIP Membership Program',
      'Private Shopping Events',
    ],
    rating: 4.8,
    reviewCount: 189,
    image: '/api/placeholder/600/400',
    isActive: true,
    isFlagship: false,
    description: 'Elegant showroom on Fifth Avenue featuring our latest collections and exclusive New York designs.',
  },
  {
    id: '4',
    name: 'Fariha\'s Abaya Toronto',
    address: {
      street: '100 Queen Street West',
      city: 'Toronto',
      state: 'ON',
      country: 'Canada',
      zipCode: 'M5H 2N2',
      coordinates: { lat: 43.6532, lng: -79.3832 },
    },
    contact: {
      phone: '+1-416-123-4567',
      email: 'toronto@farihasabaya.com',
      whatsapp: '+1-647-123-4567',
    },
    hours: {
      monday: '10:00 AM - 7:00 PM',
      tuesday: '10:00 AM - 7:00 PM',
      wednesday: '10:00 AM - 7:00 PM',
      thursday: '10:00 AM - 8:00 PM',
      friday: '10:00 AM - 8:00 PM',
      saturday: '10:00 AM - 8:00 PM',
      sunday: '12:00 PM - 5:00 PM',
    },
    features: [
      'Multilingual Staff',
      'Cultural Consultation',
      'Community Events',
      'Group Appointments',
      'Seasonal Collections',
    ],
    rating: 4.6,
    reviewCount: 98,
    image: '/api/placeholder/600/400',
    isActive: true,
    isFlagship: false,
    description: 'Serving Toronto\'s diverse community with beautiful abayas and cultural fashion expertise.',
  },
  {
    id: '5',
    name: 'Fariha\'s Abaya Doha',
    address: {
      street: '456 Pearl District',
      city: 'Doha',
      state: 'Doha',
      country: 'Qatar',
      zipCode: '12345',
      coordinates: { lat: 25.2854, lng: 51.5310 },
    },
    contact: {
      phone: '+974-4-123-4567',
      email: 'doha@farihasabaya.com',
      whatsapp: '+974-5512-3456',
    },
    hours: {
      monday: '10:00 AM - 10:00 PM',
      tuesday: '10:00 AM - 10:00 PM',
      wednesday: '10:00 AM - 10:00 PM',
      thursday: '10:00 AM - 10:00 PM',
      friday: '2:00 PM - 11:00 PM',
      saturday: '10:00 AM - 11:00 PM',
      sunday: '10:00 AM - 10:00 PM',
    },
    features: [
      'Luxury Consultation',
      'Exclusive Designs',
      'Premium Materials',
      'Royal Collection',
      'Bespoke Service',
    ],
    rating: 4.9,
    reviewCount: 145,
    image: '/api/placeholder/600/400',
    isActive: true,
    isFlagship: false,
    description: 'Luxury boutique in Doha\'s pearl district, featuring exclusive designs and premium collections.',
  },
];

// Store hours utility
const getCurrentDayHours = (hours: any) => {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = days[new Date().getDay()];
  return hours[today];
};

const isStoreOpen = (hours: any) => {
  const currentDay = getCurrentDayHours(hours);
  if (currentDay === 'Closed') return false;
  
  // Parse hours (assumes format like "10:00 AM - 8:00 PM")
  const now = new Date();
  const [openTime, closeTime] = currentDay.split(' - ');
  
  // This is a simplified check - in a real app you'd parse the times properly
  return true; // For demo purposes, assume stores are open
};

// GET - Get all stores or search by location
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');
    const country = searchParams.get('country');
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const radius = parseInt(searchParams.get('radius') || '50'); // km
    const onlyOpen = searchParams.get('onlyOpen') === 'true';
    
    let filteredStores = mockStores.filter(store => store.isActive);
    
    // Filter by city
    if (city) {
      filteredStores = filteredStores.filter(store =>
        store.address.city.toLowerCase().includes(city.toLowerCase())
      );
    }
    
    // Filter by country
    if (country) {
      filteredStores = filteredStores.filter(store =>
        store.address.country.toLowerCase().includes(country.toLowerCase())
      );
    }
    
    // Filter by distance (simplified calculation)
    if (lat && lng) {
      const userLat = parseFloat(lat);
      const userLng = parseFloat(lng);
      
      filteredStores = filteredStores.filter(store => {
        const storeLat = store.address.coordinates.lat;
        const storeLng = store.address.coordinates.lng;
        
        // Simple distance calculation (for demo purposes)
        const distance = Math.sqrt(
          Math.pow(storeLat - userLat, 2) + Math.pow(storeLng - userLng, 2)
        ) * 111; // Rough conversion to km
        
        return distance <= radius;
      });
    }
    
    // Filter by open status
    if (onlyOpen) {
      filteredStores = filteredStores.filter(store => isStoreOpen(store.hours));
    }
    
    // Add computed fields
    const storesWithStatus = filteredStores.map(store => ({
      ...store,
      isOpen: isStoreOpen(store.hours),
      todayHours: getCurrentDayHours(store.hours),
    }));
    
    // Sort by flagship first, then by rating
    storesWithStatus.sort((a, b) => {
      if (a.isFlagship && !b.isFlagship) return -1;
      if (!a.isFlagship && b.isFlagship) return 1;
      return b.rating - a.rating;
    });
    
    return NextResponse.json({
      success: true,
      data: {
        stores: storesWithStatus,
        totalStores: storesWithStatus.length,
        countries: [...new Set(mockStores.map(s => s.address.country))],
        cities: [...new Set(mockStores.map(s => s.address.city))],
      },
    });
    
  } catch (error) {
    console.error('Stores GET API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

// POST - Get single store details
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { storeId } = body;
    
    if (!storeId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Store ID is required',
        },
        { status: 400 }
      );
    }
    
    const store = mockStores.find(s => s.id === storeId && s.isActive);
    
    if (!store) {
      return NextResponse.json(
        {
          success: false,
          error: 'Store not found',
        },
        { status: 404 }
      );
    }
    
    // Add computed fields
    const storeWithStatus = {
      ...store,
      isOpen: isStoreOpen(store.hours),
      todayHours: getCurrentDayHours(store.hours),
    };
    
    return NextResponse.json({
      success: true,
      data: { store: storeWithStatus },
    });
    
  } catch (error) {
    console.error('Store detail API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

// PUT - Update store information (admin only)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { storeId, adminKey, updates } = body;
    
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
    
    if (!storeId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Store ID is required',
        },
        { status: 400 }
      );
    }
    
    const storeIndex = mockStores.findIndex(s => s.id === storeId);
    
    if (storeIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: 'Store not found',
        },
        { status: 404 }
      );
    }
    
    // Update store
    mockStores[storeIndex] = {
      ...mockStores[storeIndex],
      ...updates,
    };
    
    return NextResponse.json({
      success: true,
      message: 'Store updated successfully',
      data: { store: mockStores[storeIndex] },
    });
    
  } catch (error) {
    console.error('Store update API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
