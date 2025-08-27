"use client";

import { motion } from "framer-motion";

const SimpleFooter = () => {
  return (
    <footer className="relative bg-midnight text-pearl py-16 border-t border-gold/20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            className="col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-serif text-gold mb-4">Fariha's Abaya</h3>
            <p className="text-sand/80 leading-relaxed max-w-md">
              Preserving the art of traditional Arabian elegance while embracing modern sophistication. 
              Every piece tells a story of heritage and grace.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Collections', 'About Us', 'Size Guide', 'Care Instructions'].map((link) => (
                <li key={link}>
                  <motion.a
                    href="#"
                    className="text-sand/80 hover:text-gold transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <div className="space-y-2 text-sand/80">
              <p>📧 info@farihasabaya.com</p>
              <p>📱 +880 XXX-XXXX</p>
              <p>📍 Dhaka, Bangladesh</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          className="border-t border-gold/20 mt-12 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-sand/60">
            © 2025 Fariha's Abaya. All rights reserved. | Crafted with ♥ in Bangladesh
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export { SimpleFooter };
