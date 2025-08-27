"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  Search, 
  User, 
  ShoppingCart,
  Heart,
  Star
} from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationLinks = [
    { name: "Home", href: "#home" },
    { name: "Collections", href: "#collections" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-midnight/95 backdrop-blur-lg border-b border-gold/20" 
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <a href="#home" className="flex flex-col items-center">
              <span className="text-xl lg:text-2xl font-serif text-gold font-bold">
                Farihas Abaya
              </span>
              <span className="text-xs text-gold/70 font-arabic" dir="rtl">
                فريحة العباية
              </span>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-pearl hover:text-gold transition-colors duration-300 font-medium relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <motion.button
              className="p-2 text-pearl hover:text-gold transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              className="p-2 text-pearl hover:text-gold transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              className="p-2 text-pearl hover:text-gold transition-colors duration-300 relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-gold rounded-full text-xs flex items-center justify-center text-midnight font-bold">
                2
              </span>
            </motion.button>
            
            <motion.button
              className="p-2 text-pearl hover:text-gold transition-colors duration-300 relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-gold rounded-full text-xs flex items-center justify-center text-midnight font-bold">
                3
              </span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 text-pearl hover:text-gold transition-colors duration-300"
            onClick={toggleMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 z-40 bg-midnight/95 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {navigationLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-2xl text-pearl hover:text-gold transition-colors duration-300 font-medium"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
              
              {/* Mobile Actions */}
              <div className="flex items-center space-x-6 mt-8">
                <motion.button
                  className="p-3 text-pearl hover:text-gold transition-colors duration-300 bg-deep-burgundy/30 rounded-full"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  aria-label="Search"
                >
                  <Search className="w-6 h-6" />
                </motion.button>
                
                <motion.button
                  className="p-3 text-pearl hover:text-gold transition-colors duration-300 bg-deep-burgundy/30 rounded-full"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  aria-label="Account"
                >
                  <User className="w-6 h-6" />
                </motion.button>
                
                <motion.button
                  className="p-3 text-pearl hover:text-gold transition-colors duration-300 bg-deep-burgundy/30 rounded-full relative"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  aria-label="Wishlist"
                >
                  <Heart className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-gold rounded-full text-xs flex items-center justify-center text-midnight font-bold">
                    2
                  </span>
                </motion.button>
                
                <motion.button
                  className="p-3 text-pearl hover:text-gold transition-colors duration-300 bg-deep-burgundy/30 rounded-full relative"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  aria-label="Shopping Cart"
                >
                  <ShoppingCart className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold rounded-full text-xs flex items-center justify-center text-midnight font-bold">
                    3
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export { Navigation };
