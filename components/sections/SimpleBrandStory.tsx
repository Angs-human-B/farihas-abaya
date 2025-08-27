"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const SimpleBrandStory = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-midnight via-deep-burgundy/20 to-midnight overflow-hidden">
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
            Our Heritage
          </h2>
          <p className="text-xl text-sand/90 max-w-3xl mx-auto">
            Discover the timeless elegance of Arabian craftsmanship, where tradition meets modern sophistication
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {/* Legacy */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl text-gold">✨</span>
            </div>
            <h3 className="text-2xl font-serif text-white mb-4">Legacy</h3>
            <p className="text-sand/80 leading-relaxed">
              Three generations of master artisans preserving the ancient art of abaya craftsmanship
            </p>
          </motion.div>

          {/* Craftsmanship */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl text-gold">✂️</span>
            </div>
            <h3 className="text-2xl font-serif text-white mb-4">Craftsmanship</h3>
            <p className="text-sand/80 leading-relaxed">
              Each piece hand-embroidered with golden threads, creating unique works of wearable art
            </p>
          </motion.div>

          {/* Innovation */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl text-gold">💎</span>
            </div>
            <h3 className="text-2xl font-serif text-white mb-4">Innovation</h3>
            <p className="text-sand/80 leading-relaxed">
              Modern fits and contemporary designs while honoring traditional Arabian elegance
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { SimpleBrandStory };
