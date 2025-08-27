"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { Heart, MessageCircle, Instagram, ExternalLink, X } from "lucide-react";
import Image from "next/image";

// Sample Instagram posts data
const instagramPosts = [
  {
    id: 1,
    image: "/api/placeholder/400/400",
    likes: 2847,
    comments: 156,
    caption: "Royal Heritage collection - where tradition meets modern elegance ✨ #FarihasAbaya #RoyalHeritage",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    image: "/api/placeholder/400/400",
    likes: 1924,
    comments: 89,
    caption: "Behind the scenes of our latest photoshoot 📸 Coming soon! #BehindTheScenes #NewCollection",
    timestamp: "1 day ago",
  },
  {
    id: 3,
    image: "/api/placeholder/400/400",
    likes: 3256,
    comments: 234,
    caption: "Eid Exclusive golden details that shine like your soul ✨ #EidCollection #GoldenElegance",
    timestamp: "2 days ago",
  },
  {
    id: 4,
    image: "/api/placeholder/400/400",
    likes: 1745,
    comments: 67,
    caption: "Daily elegance for the modern woman 🌟 #DailyWear #ModernAbaya",
    timestamp: "3 days ago",
  },
  {
    id: 5,
    image: "/api/placeholder/400/400",
    likes: 4123,
    comments: 298,
    caption: "Bridal collection preview - dreams woven in fabric 👰✨ #BridalCollection #WeddingAbaya",
    timestamp: "4 days ago",
  },
  {
    id: 6,
    image: "/api/placeholder/400/400",
    likes: 2156,
    comments: 134,
    caption: "Customer love at our Gulshan boutique 💝 Thank you for choosing us! #CustomerLove #Testimonial",
    timestamp: "5 days ago",
  },
  {
    id: 7,
    image: "/api/placeholder/400/400",
    likes: 1834,
    comments: 92,
    caption: "Fabric selection process - only the finest materials 🧵 #Quality #Craftsmanship",
    timestamp: "6 days ago",
  },
  {
    id: 8,
    image: "/api/placeholder/400/400",
    likes: 2967,
    comments: 178,
    caption: "Limited Edition designer collaboration dropping next week! 🔥 #LimitedEdition #ComingSoon",
    timestamp: "1 week ago",
  },
];

// Instagram Post Modal Component
const InstagramModal = ({ post, onClose }: { post: any; onClose: () => void }) => {
  if (!post) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative bg-white rounded-xl overflow-hidden max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image */}
        <div className="relative aspect-square">
          <Image
            src={post.image}
            alt="Instagram post"
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-gold to-rose-gold rounded-full flex items-center justify-center">
              <Instagram className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-midnight">@farihasabaya</h3>
              <p className="text-sm text-gray-500">{post.timestamp}</p>
            </div>
          </div>

          {/* Caption */}
          <p className="text-gray-700 leading-relaxed mb-4">{post.caption}</p>

          {/* Stats */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <Heart className="w-5 h-5 text-red-500 fill-current" />
              <span className="font-medium">{post.likes.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-5 h-5 text-gray-600" />
              <span className="font-medium">{post.comments}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <motion.button
              className="flex-1 py-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View on Instagram
            </motion.button>
            <motion.button
              className="px-4 py-2 border border-gold text-gold hover:bg-gold hover:text-white transition-colors duration-200 rounded-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Heart className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Instagram Post Card Component
const InstagramPostCard = ({ post, onOpen, inView }: { post: any; onOpen: () => void; inView: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative aspect-square group cursor-pointer overflow-hidden rounded-lg"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6, delay: post.id * 0.1 }}
      whileHover={{ scale: 1.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpen}
    >
      {/* Image */}
      <Image
        src={post.image}
        alt={`Instagram post ${post.id}`}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Instagram Icon Overlay */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
          <Instagram className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Hover Overlay */}
      <motion.div
        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      >
        <div className="text-center text-white">
          <div className="flex items-center justify-center gap-6 mb-3">
            <motion.div
              className="flex items-center gap-2"
              initial={{ y: 20, opacity: 0 }}
              animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Heart className="w-5 h-5 fill-current" />
              <span className="font-medium">{post.likes.toLocaleString()}</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-2"
              initial={{ y: 20, opacity: 0 }}
              animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ delay: 0.2 }}
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">{post.comments}</span>
            </motion.div>
          </div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ExternalLink className="w-6 h-6 mx-auto" />
          </motion.div>
        </div>
      </motion.div>

      {/* Gradient Border Animation */}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
          padding: "2px",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      >
        <div className="w-full h-full bg-white rounded-lg" />
      </motion.div>
    </motion.div>
  );
};

// Main Instagram Feed Component
const InstagramFeed = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [selectedPost, setSelectedPost] = useState<any>(null);

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-pearl to-sand/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-serif text-midnight mb-6"
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Fashion Moments
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Follow our journey and get inspired by our latest collections and styling tips
          </motion.p>

          {/* Follow Button */}
          <motion.button
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-medium rounded-full hover:shadow-xl transition-all duration-300"
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Instagram className="w-5 h-5" />
            Follow @farihasabaya
          </motion.button>
        </motion.div>

        {/* Instagram Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {instagramPosts.map((post) => (
            <InstagramPostCard
              key={post.id}
              post={post}
              onOpen={() => setSelectedPost(post)}
              inView={inView}
            />
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <p className="text-gray-600 mb-6">
            Tag us in your photos wearing Fariha's Abaya for a chance to be featured!
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {["#FarihasAbaya", "#ModestFashion", "#ArabianElegance", "#LuxuryAbaya"].map((tag) => (
              <motion.span
                key={tag}
                className="px-4 py-2 bg-gold/10 text-gold rounded-full text-sm font-medium"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(212, 175, 55, 0.2)" }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Instagram Modal */}
      {selectedPost && (
        <InstagramModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </section>
  );
};

export { InstagramFeed };
