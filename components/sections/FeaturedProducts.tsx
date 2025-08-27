"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight, ShoppingBag, Palette, Star } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Product {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  gallery: string[];
  colors: string[];
  sizes: string[];
  rating: number;
  reviews: number;
  featured: boolean;
}

const featuredProducts: Product[] = [
  {
    id: "royal-midnight",
    name: "Royal Midnight Elegance",
    nameAr: "أناقة منتصف الليل الملكية",
    price: 2800,
    originalPrice: 3200,
    description: "A masterpiece of traditional craftsmanship, this abaya features intricate hand-embroidered details with golden thread work, creating an aura of timeless elegance perfect for special occasions.",
    image: "/api/placeholder/600/800",
    gallery: ["/api/placeholder/600/800", "/api/placeholder/600/800", "/api/placeholder/600/800"],
    colors: ["Black", "Navy", "Deep Burgundy"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.9,
    reviews: 127,
    featured: true,
  },
  {
    id: "golden-sunrise",
    name: "Golden Sunrise Collection",
    nameAr: "مجموعة شروق الشمس الذهبية",
    price: 3200,
    originalPrice: 3800,
    description: "Inspired by the first rays of dawn, this exquisite piece combines luxurious silk fabric with delicate pearl embellishments, embodying the perfect harmony of tradition and modern sophistication.",
    image: "/api/placeholder/600/800",
    gallery: ["/api/placeholder/600/800", "/api/placeholder/600/800", "/api/placeholder/600/800"],
    colors: ["Gold", "Champagne", "Rose Gold"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviews: 89,
    featured: true,
  },
  {
    id: "pearl-dreams",
    name: "Pearl Dreams Luxury",
    nameAr: "أحلام اللؤلؤ الفاخرة",
    price: 2400,
    description: "A contemporary interpretation of classic elegance, featuring subtle pearl detailing and flowing silhouettes that gracefully complement the modern woman's lifestyle while honoring timeless traditions.",
    image: "/api/placeholder/600/800",
    gallery: ["/api/placeholder/600/800", "/api/placeholder/600/800", "/api/placeholder/600/800"],
    colors: ["Pearl White", "Soft Sand", "Light Grey"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.8,
    reviews: 156,
    featured: true,
  },
  {
    id: "emerald-majesty",
    name: "Emerald Majesty",
    nameAr: "جلالة الزمرد",
    price: 3600,
    originalPrice: 4200,
    description: "An exclusive limited edition piece that showcases the finest in luxury abaya design, with emerald-toned fabric and intricate beadwork that captures light beautifully in any setting.",
    image: "/api/placeholder/600/800",
    gallery: ["/api/placeholder/600/800", "/api/placeholder/600/800", "/api/placeholder/600/800"],
    colors: ["Emerald", "Forest Green", "Deep Teal"],
    sizes: ["M", "L", "XL"],
    rating: 4.9,
    reviews: 73,
    featured: true,
  },
];

// Predefined particle positions for SSR compatibility
const particlePositions = [
  { x: 10, y: 20 },
  { x: 85, y: 15 },
  { x: 25, y: 70 },
  { x: 75, y: 80 },
  { x: 50, y: 30 },
  { x: 90, y: 60 },
  { x: 15, y: 90 },
  { x: 60, y: 10 },
];

// Floating particles component with deterministic positioning
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particlePositions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gold/30 rounded-full"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, (i % 2 === 0 ? 10 : -10), 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + (i % 3),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
};

// Color variant switcher
const ColorSwitcher = ({ colors, activeColor, onColorChange }: {
  colors: string[];
  activeColor: string;
  onColorChange: (color: string) => void;
}) => {
  const colorMap: Record<string, string> = {
    "Black": "#0A0A0A",
    "Navy": "#1e3a8a",
    "Deep Burgundy": "#4A0E0E",
    "Gold": "#D4AF37",
    "Champagne": "#F7E7CE",
    "Rose Gold": "#B76E79",
    "Pearl White": "#FAFAFA",
    "Soft Sand": "#F5E6D3",
    "Light Grey": "#D1D5DB",
    "Emerald": "#059669",
    "Forest Green": "#166534",
    "Deep Teal": "#134e4a",
  };

  return (
    <div className="flex gap-3">
      {colors.map((color) => (
        <motion.button
          key={color}
          className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
            activeColor === color ? "border-gold scale-110" : "border-white/30"
          }`}
          style={{ backgroundColor: colorMap[color] || "#000" }}
          onClick={() => onColorChange(color)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title={color}
        />
      ))}
    </div>
  );
};

// Product slide component
const ProductSlide = ({ product, isActive }: { product: Product; isActive: boolean }) => {
  const [activeColor, setActiveColor] = useState(product.colors[0]);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative h-screen flex items-center">
      <FloatingParticles />
      
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Product Image */}
          <motion.div
            className="relative h-[600px] lg:h-[700px]"
            initial={{ x: -100, opacity: 0 }}
            animate={isActive ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Fabric sway animation container */}
            <motion.div
              className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl"
              animate={{
                rotateY: [0, 2, 0, -2, 0],
                rotateX: [0, 1, 0, -1, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Loading placeholder */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-sand to-pearl animate-pulse flex items-center justify-center">
                  <div className="text-gold/50 font-serif text-2xl">
                    {product.name}
                  </div>
                </div>
              )}

              {/* Product image with zoom on hover */}
              <motion.img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-500"
                style={{ opacity: imageLoaded ? 1 : 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageLoaded(true)}
              />

              {/* Fabric texture overlay */}
              <div 
                className="absolute inset-0 opacity-10 mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='0.3'%3E%3Cpath d='M20 20l10-10v20l-10-10zm0 0l-10 10V10l10 10z'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-gold/5 to-transparent" />
            </motion.div>

            {/* 360° view hint */}
            <motion.div
              className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-2 rounded-full text-sm font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 1 }}
            >
              360° View
            </motion.div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            className="space-y-6"
            initial={{ x: 100, opacity: 0 }}
            animate={isActive ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Arabic name animation */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={isActive ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p className="text-gold font-arabic text-lg mb-2 text-right" dir="rtl">
                {product.nameAr}
              </p>
            </motion.div>

            {/* Product name slide in from right */}
            <motion.h1
              className="text-4xl lg:text-5xl font-serif text-black leading-tight"
              initial={{ x: 50, opacity: 0 }}
              animate={isActive ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {product.name}
            </motion.h1>

            {/* Price with golden glow */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={isActive ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <span className="text-3xl font-bold text-gold">
                ৳{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-sand/60 line-through">
                  ৳{product.originalPrice.toLocaleString()}
                </span>
              )}
              {product.originalPrice && (
                <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                  SAVE ৳{(product.originalPrice - product.price).toLocaleString()}
                </span>
              )}
            </motion.div>

            {/* Rating */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ y: 20, opacity: 0 }}
              animate={isActive ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) 
                        ? "text-gold fill-current" 
                        : "text-sand/50"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sand/70">
                {product.rating} ({product.reviews} reviews)
              </span>
            </motion.div>

            {/* Description appears line by line */}
            <motion.div
              className="space-y-4"
              initial={{ y: 20, opacity: 0 }}
              animate={isActive ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <p className="text-sand/80 leading-relaxed text-lg">
                {product.description}
              </p>
            </motion.div>

            {/* Color variant switcher */}
            <motion.div
              className="space-y-3"
              initial={{ y: 20, opacity: 0 }}
              animate={isActive ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              <div className="flex items-center gap-3">
                <Palette className="w-5 h-5 text-sand/70" />
                <span className="font-medium text-sand/80">Color: {activeColor}</span>
              </div>
              <ColorSwitcher
                colors={product.colors}
                activeColor={activeColor}
                onColorChange={setActiveColor}
              />
            </motion.div>

            {/* Inquire Now button with ripple effect */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={isActive ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 1.8 }}
            >
              <motion.button
                className="group relative px-8 py-4 bg-gradient-to-r from-gold to-rose-gold text-black font-semibold rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Ripple effect */}
                <motion.div
                  className="absolute inset-0 bg-white/30 rounded-full scale-0"
                  whileTap={{
                    scale: [0, 1],
                    opacity: [0.3, 0],
                  }}
                  transition={{ duration: 0.5 }}
                />
                
                <span className="relative z-10 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Inquire Now
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Main Featured Products Component with Swiper
const FeaturedProducts = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeSlide, setActiveSlide] = useState(0);

  const onSlideChange = useCallback((swiper: any) => {
    setActiveSlide(swiper.realIndex);
  }, []);

  return (
    <section ref={ref} className="relative bg-black overflow-hidden" id="featured">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-deep-burgundy/20 to-black" />
      <motion.div
        className="relative z-10 pt-20 pb-10"
        initial={{ y: 50, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">Featured Collection</h2>
          <p className="text-xl text-sand/90 max-w-2xl mx-auto">Crown jewels of our collection, handpicked for their exceptional beauty and craftsmanship</p>
        </div>
      </motion.div>

      <div className="relative">
        <Swiper
          modules={[Autoplay, Navigation, Pagination, EffectFade]}
            effect="fade"
            autoplay={{ delay: 8000, disableOnInteraction: false }}
            loop
            speed={900}
            onSlideChange={onSlideChange}
            className="h-[calc(100vh-180px)]"
            navigation={{
              nextEl: '.fp-next',
              prevEl: '.fp-prev'
            }}
            pagination={{ clickable: true, el: '.fp-pagination' }}
        >
          {featuredProducts.map((product, index) => (
            <SwiperSlide key={product.id} className="!h-full">
              <ProductSlide product={product} isActive={index === activeSlide} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button className="fp-prev absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <button className="fp-next absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm">
          <ArrowRight className="w-6 h-6 text-white" />
        </button>

        {/* Pagination Dots */}
        <div className="fp-pagination absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex gap-3 !w-auto" />

        {/* Slide Counter */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
          <span className="text-white text-sm font-medium">{activeSlide + 1} / {featuredProducts.length}</span>
        </div>
      </div>
    </section>
  );
};

export { FeaturedProducts };
