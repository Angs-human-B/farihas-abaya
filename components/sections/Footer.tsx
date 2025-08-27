"use client";

import { motion } from "framer-motion";
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin, 
  Heart,
  Star
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  const footerLinks = {
    "Quick Links": [
      { name: "Home", href: "#home" },
      { name: "Collections", href: "#collections" },
      { name: "About Us", href: "#about" },
      { name: "Contact", href: "#contact" },
    ],
    "Categories": [
      { name: "Everyday Abayas", href: "#" },
      { name: "Formal Collection", href: "#" },
      { name: "Bridal Abayas", href: "#" },
      { name: "Limited Edition", href: "#" },
    ],
    "Customer Care": [
      { name: "Size Guide", href: "#" },
      { name: "Shipping Info", href: "#" },
      { name: "Returns", href: "#" },
      { name: "Care Instructions", href: "#" },
    ],
  };

  return (
    <footer className="relative bg-midnight text-pearl overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.1'%3E%3Cpath d='M30 30l15-15v30l-15-15zm0 0l-15 15V15l15 15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Logo */}
              <div className="space-y-4">
                <h3 className="text-2xl font-serif text-gold">Farihas Abaya</h3>
                <p className="text-lg font-arabic text-gold/80" dir="rtl">
                  فريحة العباية
                </p>
              </div>
              
              {/* Description */}
              <p className="text-sand/80 leading-relaxed max-w-md">
                Discover the perfect blend of tradition and contemporary elegance 
                in our handcrafted collection of premium abayas. Each piece tells 
                a story of Arabian heritage and modern sophistication.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sand/70">
                  <Mail className="w-4 h-4 text-gold" />
                  <span>info@farihasabaya.com</span>
                </div>
                <div className="flex items-center gap-3 text-sand/70">
                  <Phone className="w-4 h-4 text-gold" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-sand/70">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span>Dubai, United Arab Emirates</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-pearl">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sand/70 hover:text-gold transition-colors duration-300 block py-1"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gold/20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-semibold text-pearl mb-2">
                Stay Updated
              </h4>
              <p className="text-sand/70">
                Subscribe to receive updates about new collections and exclusive offers.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-deep-burgundy/30 border border-gold/20 rounded-lg text-pearl placeholder-sand/50 focus:outline-none focus:border-gold transition-colors duration-300"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-gold to-rose-gold text-midnight font-semibold rounded-lg hover:shadow-lg hover:shadow-gold/25 transition-all duration-300"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Social Links & Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gold/20"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            
            {/* Copyright */}
            <div className="text-sand/60 text-center lg:text-left">
              <p>&copy; {currentYear} Farihas Abaya. All rights reserved.</p>
              <p className="text-sm mt-1">
                Made with <Heart className="w-4 h-4 inline-block text-rose-gold mx-1" /> 
                for the modern Muslim woman
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-sand/60 text-sm">Follow us:</span>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-deep-burgundy/30 border border-gold/20 rounded-full flex items-center justify-center text-gold hover:bg-gold hover:text-midnight transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-8 pt-6 border-t border-gold/10"
        >
          <div className="flex flex-wrap justify-center lg:justify-between items-center gap-6 text-sand/40 text-sm">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-gold" />
              <span>Premium Quality Guaranteed</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🚚</span>
              <span>Free Worldwide Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🔒</span>
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <span>↩️</span>
              <span>30-Day Returns</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
    </footer>
  );
};

export { Footer };
