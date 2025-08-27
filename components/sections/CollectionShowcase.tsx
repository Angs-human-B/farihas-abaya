"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Eye } from "lucide-react";
import { useState } from "react";

interface Collection {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  itemCount: number;
}

const collections: Collection[] = [
  {
    id: "royal-heritage",
    title: "Royal Heritage",
    description: "Traditional luxury abayas inspired by royal Arabian courts",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=500&fit=crop&crop=center",
    category: "Traditional",
    itemCount: 24,
  },
  {
    id: "modern-mystique",
    title: "Modern Mystique",
    description: "Contemporary designs that blend tradition with modern elegance",
    image: "https://images.unsplash.com/photo-1594736797933-d0501ba3fe65?w=400&h=600&fit=crop&crop=center",
    category: "Contemporary",
    itemCount: 18,
  },
  {
    id: "eid-exclusive",
    title: "Eid Exclusive",
    description: "Special occasion wear for celebrating life's precious moments",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=550&fit=crop&crop=center",
    category: "Occasion",
    itemCount: 12,
  },
  {
    id: "daily-elegance",
    title: "Daily Elegance",
    description: "Everyday premium wear that doesn't compromise on style",
    image: "https://images.unsplash.com/photo-1594736797933-d0501ba3fe65?w=400&h=480&fit=crop&crop=center",
    category: "Casual",
    itemCount: 32,
  },
  {
    id: "bridal-collection",
    title: "Bridal Collection",
    description: "Exquisite wedding abayas for the most special day",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=620&fit=crop&crop=center",
    category: "Bridal",
    itemCount: 8,
  },
  {
    id: "limited-edition",
    title: "Limited Edition",
    description: "Designer collaborations and exclusive pieces",
    image: "https://images.unsplash.com/photo-1594736797933-d0501ba3fe65?w=400&h=580&fit=crop&crop=center",
    category: "Exclusive",
    itemCount: 6,
  },
];

// Collection Card Component
const CollectionCard = ({ collection, index }: { collection: Collection; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Use index to create consistent pseudo-random heights
  const heights = [4, 5, 4, 6, 5, 4]; // Predefined heights for each card
  const cardHeight = heights[index % heights.length];

  return (
    <motion.div
      className="group relative overflow-hidden rounded-lg cursor-pointer"
      style={{ 
        gridRowEnd: `span ${cardHeight}` // Consistent masonry heights
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Image Container with Ken Burns Effect */}
      <div className="relative w-full h-full overflow-hidden">
        {/* Placeholder while loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-sand to-pearl animate-pulse flex items-center justify-center">
            <div className="text-gold/50 font-serif text-lg">
              {collection.title}
            </div>
          </div>
        )}
        
        {/* Actual image with Ken Burns effect */}
        <motion.img
          src={collection.image}
          alt={collection.title}
          className="w-full h-full object-cover transition-opacity duration-300"
          style={{ 
            opacity: imageLoaded ? 1 : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)} // Show placeholder even on error
        />

        {/* Fabric texture overlay */}
        <div 
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Golden border trace animation on hover */}
        <motion.div
          className="absolute inset-0 border-2 border-transparent"
          animate={isHovered ? {
            borderColor: ["rgba(212, 175, 55, 0)", "rgba(212, 175, 55, 1)", "rgba(212, 175, 55, 0)"],
          } : {}}
          transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
        />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        {/* Category badge */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          <span className="inline-block px-3 py-1 bg-gold/90 text-black text-sm font-medium rounded-full">
            {collection.category}
          </span>
        </motion.div>

        {/* Title slide-up animation */}
        <motion.h3
          className="text-2xl md:text-3xl font-serif text-white mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.4 }}
        >
          {collection.title}
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-sand/90 text-sm mb-4 line-clamp-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.5 }}
        >
          {collection.description}
        </motion.p>

        {/* Item count */}
        <motion.div
          className="text-xs text-gold/80 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.6 }}
        >
          {collection.itemCount} pieces
        </motion.div>

        {/* "View Collection" with arrow animation */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ y: 20, opacity: 0 }}
          animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-white font-medium">View Collection</span>
          <motion.div
            animate={isHovered ? { x: 5 } : { x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight className="w-5 h-5 text-gold" />
          </motion.div>
        </motion.div>

        {/* Quick view button */}
        <motion.button
          className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all duration-300"
          initial={{ scale: 0, opacity: 0 }}
          animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Eye className="w-5 h-5 text-white" />
        </motion.button>
      </div>
    </motion.div>
  );
};

// Main Collection Showcase Component
const CollectionShowcase = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="py-20 bg-pearl">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl md:text-6xl font-serif text-black mb-6"
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Signature Collections
          </motion.h2>
          
          <motion.p
            className="text-xl text-sand/70 max-w-3xl mx-auto leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover our curated collections, each telling a unique story of elegance, 
            tradition, and modern sophistication
          </motion.p>

          {/* Decorative divider */}
          <motion.div
            className="flex items-center justify-center mt-8"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent w-32"></div>
            <div className="w-2 h-2 bg-gold rounded-full mx-4"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent w-32"></div>
          </motion.div>
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[50px]"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {collections.map((collection, index) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              index={index}
            />
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-16"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <motion.button
            className="group relative px-8 py-4 bg-gradient-to-r from-gold to-rose-gold text-black font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-gold/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
            
            <span className="relative z-10 flex items-center gap-2">
              Explore All Collections
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export { CollectionShowcase };
