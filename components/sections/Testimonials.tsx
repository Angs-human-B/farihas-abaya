"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    name: "Fatima Rahman",
    nameAr: "فاطمة الرحمن",
    review: "The quality of Fariha's abayas is absolutely exceptional. The fabric feels luxurious and the stitching is perfect. I've received so many compliments wearing their Royal Heritage collection.",
    rating: 5,
    image: "/api/placeholder/80/80",
    location: "Dhaka",
    verified: true,
  },
  {
    id: 2,
    name: "Amina Khan",
    nameAr: "أمينة خان",
    review: "I ordered my wedding abaya from Fariha's and it was beyond my expectations. The attention to detail and the way it fit was perfect. Truly a work of art!",
    rating: 5,
    image: "/api/placeholder/80/80",
    location: "Chittagong",
    verified: true,
  },
  {
    id: 3,
    name: "Zara Ahmed",
    nameAr: "زارا أحمد",
    review: "Amazing customer service and beautiful designs. The Modern Mystique collection is my favorite - perfect for both casual and formal occasions.",
    rating: 5,
    image: "/api/placeholder/80/80",
    location: "Sylhet",
    verified: true,
  },
  {
    id: 4,
    name: "Mariam Ali",
    nameAr: "مريم علي",
    review: "I've been a loyal customer for 3 years now. Every piece I've bought has maintained its quality and elegance. Highly recommend Fariha's Abaya!",
    rating: 5,
    image: "/api/placeholder/80/80",
    location: "Rajshahi",
    verified: true,
  },
  {
    id: 5,
    name: "Safia Begum",
    nameAr: "صافية بيغوم",
    review: "The Eid Exclusive collection is absolutely stunning. The golden details and embroidery work is exquisite. Worth every penny!",
    rating: 5,
    image: "/api/placeholder/80/80",
    location: "Khulna",
    verified: true,
  },
  {
    id: 6,
    name: "Rashida Khatun",
    nameAr: "رشيدة خاتون",
    review: "Fast delivery and beautiful packaging. The abaya fits perfectly and the color is exactly as shown in the pictures. Very satisfied!",
    rating: 5,
    image: "/api/placeholder/80/80",
    location: "Barisal",
    verified: true,
  },
];

// Star Rating Component
const StarRating = ({ rating, animated = false }: { rating: number; animated?: boolean }) => {
  const [visibleStars, setVisibleStars] = useState(animated ? 0 : rating);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setVisibleStars(rating);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [rating, animated]);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.div
          key={star}
          initial={animated ? { scale: 0, rotate: -180 } : {}}
          animate={animated ? { 
            scale: star <= visibleStars ? 1 : 0, 
            rotate: star <= visibleStars ? 0 : -180 
          } : {}}
          transition={{ 
            duration: 0.3, 
            delay: animated ? star * 0.1 : 0,
            type: "spring",
            stiffness: 200
          }}
        >
          <Star
            className={`w-5 h-5 ${
              star <= visibleStars ? "text-gold fill-current" : "text-gray-300"
            } transition-colors duration-200`}
          />
        </motion.div>
      ))}
    </div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ testimonial, inView }: { testimonial: any; inView: boolean }) => {
  return (
    <motion.div
      className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 h-full group hover:bg-white/15 transition-all duration-500"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      {/* Quote Icon */}
      <motion.div
        className="absolute -top-4 -left-4 w-8 h-8 bg-gold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
        initial={{ scale: 0, rotate: -180 }}
        animate={inView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Quote className="w-4 h-4 text-midnight" />
      </motion.div>

      {/* Golden Ring Animation */}
      <motion.div
        className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-gold/30 transition-all duration-500"
        initial={{ scale: 0.8, opacity: 0 }}
        whileHover={{ 
          scale: 1,
          opacity: 1,
          boxShadow: "0 0 20px rgba(212, 175, 55, 0.3)"
        }}
      />

      <div className="relative z-10">
        {/* Rating */}
        <div className="mb-4">
          <StarRating rating={testimonial.rating} animated={inView} />
        </div>

        {/* Review Text */}
        <motion.p
          className="text-white/90 leading-relaxed mb-6 italic"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          "{testimonial.review}"
        </motion.p>

        {/* Customer Info */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {/* Profile Image with Golden Ring */}
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-gold"
              initial={{ scale: 0, rotate: -180 }}
              animate={inView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            />
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-transparent">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
            </div>
            {/* Verified Badge */}
            {testimonial.verified && (
              <motion.div
                className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.3, delay: 0.9 }}
              >
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </motion.div>
            )}
          </div>

          <div>
            <h4 className="font-medium text-white">{testimonial.name}</h4>
            <p className="text-sm text-sand/70 font-arabic" dir="rtl">{testimonial.nameAr}</p>
            <p className="text-xs text-gold">{testimonial.location}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Main Testimonials Component
const Testimonials = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [isPaused, setIsPaused] = useState(false);

  return (
    <section 
      ref={ref} 
      className="relative py-20 overflow-hidden bg-gradient-to-br from-midnight via-deep-burgundy to-midnight"
    >
      {/* Animated Background Pattern */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.1'%3E%3Cpath d='M40 40l20-20v40l-20-20zm0 0l-20 20V20l20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gold/20 rounded-full"
            style={{
              left: `${10 + i * 8}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-serif text-white mb-6"
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Voices of Elegance
          </motion.h2>
          <motion.p
            className="text-xl text-sand/80 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            What our valued customers say about their Fariha's Abaya experience
          </motion.p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          className="relative px-6 py-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet !bg-white/30 !w-3 !h-3",
              bulletActiveClass: "!bg-gold !scale-125",
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="!pb-16 !overflow-visible"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className="h-auto !overflow-visible">
                <div className="m-2">
                  <TestimonialCard testimonial={testimonial} inView={inView} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom pagination styling */}
          <style jsx global>{`
            .swiper-pagination {
              bottom: 0 !important;
            }
            .swiper-pagination-bullet {
              transition: all 0.3s ease !important;
            }
            .swiper-pagination-bullet:hover {
              background-color: rgba(212, 175, 55, 0.7) !important;
              transform: scale(1.1) !important;
            }
          `}</style>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-gold to-rose-gold text-midnight font-medium rounded-full hover:shadow-xl transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(212, 175, 55, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Share Your Experience
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export { Testimonials };
