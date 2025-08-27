"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { Search, Filter, Grid, List, ShoppingBag, Eye, Heart } from "lucide-react";
import Image from "next/image";

// Sample product data - replace with API call later
const sampleProducts = [
  {
    id: 1,
    name: "Royal Heritage Classic",
    nameAr: "التراث الملكي الكلاسيكي",
    price: 12500,
    discountPrice: 10000,
    category: "Royal Heritage",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Brown"],
    images: ["/api/placeholder/400/600", "/api/placeholder/400/600"],
    featured: true,
    inStock: true,
  },
  {
    id: 2,
    name: "Modern Mystique Evening",
    nameAr: "سحر المساء العصري",
    price: 15000,
    category: "Modern Mystique",
    sizes: ["S", "M", "L"],
    colors: ["Black", "Burgundy"],
    images: ["/api/placeholder/400/600", "/api/placeholder/400/600"],
    featured: false,
    inStock: true,
  },
  {
    id: 3,
    name: "Eid Exclusive Golden",
    nameAr: "العيد الحصري الذهبي",
    price: 18000,
    discountPrice: 16000,
    category: "Eid Exclusive",
    sizes: ["M", "L", "XL"],
    colors: ["Gold", "Black"],
    images: ["/api/placeholder/400/600", "/api/placeholder/400/600"],
    featured: true,
    inStock: true,
  },
  {
    id: 4,
    name: "Daily Elegance Comfort",
    nameAr: "راحة الأناقة اليومية",
    price: 8500,
    category: "Daily Elegance",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Brown", "Gray"],
    images: ["/api/placeholder/400/600", "/api/placeholder/400/600"],
    featured: false,
    inStock: true,
  },
  {
    id: 5,
    name: "Bridal Luxury Pearl",
    nameAr: "لؤلؤة العروس الفاخرة",
    price: 25000,
    category: "Bridal Collection",
    sizes: ["S", "M", "L"],
    colors: ["White", "Ivory", "Pearl"],
    images: ["/api/placeholder/400/600", "/api/placeholder/400/600"],
    featured: true,
    inStock: true,
  },
  {
    id: 6,
    name: "Limited Edition Designer",
    nameAr: "إصدار محدود للمصمم",
    price: 22000,
    category: "Limited Edition",
    sizes: ["M", "L"],
    colors: ["Black", "Gold"],
    images: ["/api/placeholder/400/600", "/api/placeholder/400/600"],
    featured: true,
    inStock: false,
  },
];

const categories = ["All", "Royal Heritage", "Modern Mystique", "Eid Exclusive", "Daily Elegance", "Bridal Collection", "Limited Edition"];
const sizes = ["S", "M", "L", "XL"];
const colors = ["Black", "Navy", "Brown", "Gray", "Gold", "White", "Ivory", "Pearl", "Burgundy"];
const occasions = ["All", "Daily Wear", "Evening", "Special Occasion", "Wedding", "Eid"];

// Product Card Component
const ProductCard = ({ product }: { product: any }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -5 }}
    >
      {/* Image Container */}
      <div 
        className="relative aspect-[3/4] overflow-hidden cursor-pointer"
        onMouseEnter={() => setCurrentImageIndex(1)}
        onMouseLeave={() => setCurrentImageIndex(0)}
      >
        <Image
          src={product.images[currentImageIndex] || product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <motion.button
            className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
          </motion.button>
          <motion.button
            className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Eye className="w-4 h-4 text-gray-600" />
          </motion.button>
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.featured && (
            <span className="px-2 py-1 bg-gold text-midnight text-xs font-medium rounded">
              Featured
            </span>
          )}
          {product.discountPrice && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">
              Sale
            </span>
          )}
          {!product.inStock && (
            <span className="px-2 py-1 bg-gray-500 text-white text-xs font-medium rounded">
              Out of Stock
            </span>
          )}
        </div>

        {/* Quick View Button */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <motion.button
            className="w-full py-2 bg-gold text-midnight font-medium rounded hover:bg-gold/90 transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Quick View
          </motion.button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-serif text-lg text-midnight mb-1 group-hover:text-gold transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2 font-arabic" dir="rtl">
          {product.nameAr}
        </p>
        <p className="text-sm text-gray-500 mb-3">{product.category}</p>
        
        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          {product.discountPrice ? (
            <>
              <span className="text-lg font-bold text-gold">৳{product.discountPrice.toLocaleString()}</span>
              <span className="text-sm text-gray-500 line-through">৳{product.price.toLocaleString()}</span>
            </>
          ) : (
            <span className="text-lg font-bold text-midnight">৳{product.price.toLocaleString()}</span>
          )}
        </div>

        {/* Colors */}
        <div className="flex items-center gap-1 mb-3">
          {product.colors.slice(0, 4).map((color: string) => (
            <div
              key={color}
              className="w-4 h-4 rounded-full border border-gray-300"
              style={{ 
                backgroundColor: color.toLowerCase() === 'black' ? '#000' : 
                                color.toLowerCase() === 'navy' ? '#1e3a8a' :
                                color.toLowerCase() === 'brown' ? '#8b4513' :
                                color.toLowerCase() === 'gray' ? '#6b7280' :
                                color.toLowerCase() === 'gold' ? '#d4af37' :
                                color.toLowerCase() === 'white' ? '#fff' :
                                color.toLowerCase() === 'ivory' ? '#fffff0' :
                                color.toLowerCase() === 'pearl' ? '#f8f8ff' :
                                color.toLowerCase() === 'burgundy' ? '#4a0e0e' : '#ccc'
              }}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-xs text-gray-500">+{product.colors.length - 4}</span>
          )}
        </div>

        {/* Sizes */}
        <div className="flex items-center gap-1">
          {product.sizes.map((size: string) => (
            <span key={size} className="px-2 py-1 text-xs border border-gray-300 rounded">
              {size}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Filter Sidebar Component
const FilterSidebar = ({ filters, setFilters, onClose }: any) => {
  const { register, watch, setValue } = useForm({
    defaultValues: filters
  });

  const watchedValues = watch();

  useEffect(() => {
    setFilters(watchedValues);
  }, [watchedValues, setFilters]);

  return (
    <motion.div
      className="bg-white p-6 h-full overflow-y-auto"
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-serif text-midnight">Filters</h3>
        <button onClick={onClose} className="lg:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            {...register("search")}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-transparent"
            placeholder="Search abayas..."
          />
        </div>
      </div>

      {/* Category */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <select
          {...register("category")}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-transparent"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
        <div className="flex gap-2">
          <input
            type="number"
            {...register("minPrice")}
            placeholder="Min"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-transparent"
          />
          <input
            type="number"
            {...register("maxPrice")}
            placeholder="Max"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-transparent"
          />
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
        <div className="grid grid-cols-2 gap-2">
          {sizes.map(size => (
            <label key={size} className="flex items-center">
              <input
                type="checkbox"
                {...register("sizes")}
                value={size}
                className="mr-2 rounded border-gray-300 text-gold focus:ring-gold"
              />
              <span className="text-sm">{size}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Colors</label>
        <div className="grid grid-cols-3 gap-2">
          {colors.map(color => (
            <label key={color} className="flex items-center">
              <input
                type="checkbox"
                {...register("colors")}
                value={color}
                className="sr-only"
              />
              <div className="w-6 h-6 rounded border-2 border-gray-300 mr-2 cursor-pointer relative">
                <div
                  className="w-full h-full rounded"
                  style={{ 
                    backgroundColor: color.toLowerCase() === 'black' ? '#000' : 
                                    color.toLowerCase() === 'navy' ? '#1e3a8a' :
                                    color.toLowerCase() === 'brown' ? '#8b4513' :
                                    color.toLowerCase() === 'gray' ? '#6b7280' :
                                    color.toLowerCase() === 'gold' ? '#d4af37' :
                                    color.toLowerCase() === 'white' ? '#fff' :
                                    color.toLowerCase() === 'ivory' ? '#fffff0' :
                                    color.toLowerCase() === 'pearl' ? '#f8f8ff' :
                                    color.toLowerCase() === 'burgundy' ? '#4a0e0e' : '#ccc'
                  }}
                />
              </div>
              <span className="text-sm">{color}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Occasion */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Occasion</label>
        <select
          {...register("occasion")}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-transparent"
        >
          {occasions.map(occasion => (
            <option key={occasion} value={occasion}>{occasion}</option>
          ))}
        </select>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => {
          setValue("search", "");
          setValue("category", "All");
          setValue("minPrice", "");
          setValue("maxPrice", "");
          setValue("sizes", []);
          setValue("colors", []);
          setValue("occasion", "All");
        }}
        className="w-full py-2 border border-gold text-gold hover:bg-gold hover:text-white transition-colors duration-200 rounded-md"
      >
        Clear All Filters
      </button>
    </motion.div>
  );
};

// Main Collection Page Component
export default function CollectionPage() {
  const [products, setProducts] = useState(sampleProducts);
  const [filteredProducts, setFilteredProducts] = useState(sampleProducts);
  const [filters, setFilters] = useState({
    search: "",
    category: "All",
    minPrice: "",
    maxPrice: "",
    sizes: [] as string[],
    colors: [] as string[],
    occasion: "All"
  });
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [productsToShow, setProductsToShow] = useState(12);

  // Filter products based on filters
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.nameAr.includes(filters.search) ||
        product.category.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Category filter
    if (filters.category && filters.category !== "All") {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Price filter
    if (filters.minPrice) {
      filtered = filtered.filter(product => 
        (product.discountPrice || product.price) >= parseInt(filters.minPrice)
      );
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(product => 
        (product.discountPrice || product.price) <= parseInt(filters.maxPrice)
      );
    }

    // Size filter
    if (filters.sizes && filters.sizes.length > 0) {
      filtered = filtered.filter(product => 
        product.sizes.some((size: string) => filters.sizes.includes(size))
      );
    }

    // Color filter
    if (filters.colors && filters.colors.length > 0) {
      filtered = filtered.filter(product => 
        product.colors.some((color: string) => filters.colors.includes(color))
      );
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case "price-high":
        filtered.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        filtered.sort((a, b) => Number(b.featured) - Number(a.featured));
    }

    setFilteredProducts(filtered);
  }, [filters, products, sortBy]);

  const loadMoreProducts = () => {
    setProductsToShow(prev => prev + 12);
  };

  return (
    <div className="min-h-screen bg-pearl">
      {/* Header */}
      <div className="bg-gradient-to-r from-midnight to-deep-burgundy py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-serif text-white mb-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Our Collection
          </motion.h1>
          <motion.p
            className="text-xl text-sand/80 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover exquisite abayas crafted with love and precision
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="flex lg:gap-8">
          {/* Mobile Filter Button */}
          <motion.button
            className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-gold text-midnight rounded-full shadow-lg"
            onClick={() => setShowFilters(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Filter className="w-6 h-6" />
          </motion.button>

          {/* Filter Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'fixed inset-0 z-40 lg:relative' : 'hidden lg:block'}`}>
            {showFilters && (
              <div 
                className="absolute inset-0 bg-black/50 lg:hidden"
                onClick={() => setShowFilters(false)}
              />
            )}
            <div className="relative z-50 lg:z-auto">
              <FilterSidebar 
                filters={filters} 
                setFilters={setFilters} 
                onClose={() => setShowFilters(false)} 
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div className="flex items-center gap-4">
                <span className="text-gray-600">
                  Showing {Math.min(productsToShow, filteredProducts.length)} of {filteredProducts.length} products
                </span>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-transparent"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name A-Z</option>
                </select>

                {/* View Mode */}
                <div className="flex border border-gray-300 rounded-md">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${viewMode === "grid" ? "bg-gold text-midnight" : "text-gray-600"}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${viewMode === "list" ? "bg-gold text-midnight" : "text-gray-600"}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${filters.category}-${sortBy}`}
                className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {filteredProducts.slice(0, productsToShow).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Load More Button */}
            {filteredProducts.length > productsToShow && (
              <div className="text-center mt-12">
                <motion.button
                  onClick={loadMoreProducts}
                  className="px-8 py-3 bg-gold text-midnight font-medium rounded-full hover:bg-gold/90 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Load More Products
                </motion.button>
              </div>
            )}

            {/* No Products */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-serif text-gray-600 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
