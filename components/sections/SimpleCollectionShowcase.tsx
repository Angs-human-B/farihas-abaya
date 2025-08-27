"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const SimpleCollectionShowcase = () => {
  const collections = [
    {
      id: 1,
      title: "Royal Elegance",
      description: "Luxurious abayas for special occasions",
      image: "/api/placeholder/400/600",
      featured: true
    },
    {
      id: 2,
      title: "Everyday Grace",
      description: "Comfortable daily wear collection",
      image: "/api/placeholder/400/600",
      featured: false
    },
    {
      id: 3,
      title: "Bridal Majesty",
      description: "Exquisite bridal abaya designs",
      image: "/api/placeholder/400/600",
      featured: true
    },
    {
      id: 4,
      title: "Modern Classic",
      description: "Contemporary cuts with traditional charm",
      image: "/api/placeholder/400/600",
      featured: false
    }
  ];

  return (
    <section className="relative py-20 bg-midnight overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-serif text-white mb-6">
            Our Collections
          </h2>
          <p className="text-xl text-sand/90 max-w-3xl mx-auto">
            Explore our curated selection of premium abayas, each collection telling its own story of elegance
          </p>
        </motion.div>

        {/* Collections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-sand/5 to-gold/5 p-6 hover:from-gold/10 hover:to-sand/10 transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="aspect-[3/4] bg-gradient-to-br from-sand/20 to-gold/20 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-6xl text-gold/50">👗</span>
              </div>
              
              <h3 className="text-xl font-serif text-white mb-2">{collection.title}</h3>
              <p className="text-sand/80 text-sm leading-relaxed">{collection.description}</p>
              
              {collection.featured && (
                <div className="absolute top-2 right-2 bg-gold text-black px-2 py-1 rounded-full text-xs font-medium">
                  Featured
                </div>
              )}
              
              <motion.button
                className="mt-4 text-gold hover:text-white transition-colors duration-300 text-sm font-medium"
                whileHover={{ x: 5 }}
              >
                View Collection →
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { SimpleCollectionShowcase };
