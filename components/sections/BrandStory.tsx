"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { Scissors, Gem, Star } from "lucide-react";

// Custom hook for number counter animation
const useCounter = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const startCount = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * (end - startCount) + startCount));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return { count, setIsVisible };
};

// Progress bar component
const ProgressBar = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className="w-full h-1 bg-sand/30 overflow-hidden mb-16">
      <motion.div
        className="h-full bg-gradient-to-r from-gold to-rose-gold"
        initial={{ width: 0 }}
        animate={inView ? { width: "100%" } : { width: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
    </div>
  );
};

// Our Legacy Section
const OurLegacy = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <motion.section
      ref={ref}
      className="relative py-20 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Animated fabric texture background */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="w-full h-full bg-gradient-to-br from-gold/20 to-transparent"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212, 175, 55, 0.3) 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.blockquote
          className="text-center max-w-4xl mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-4xl md:text-6xl font-serif text-white leading-tight mb-8">
            {/* Word-by-word reveal animation */}
            {["\"Every", "thread", "tells", "a", "story", "of"].map((word, index) => (
              <motion.span
                key={index}
                className="inline-block mr-3"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.4 + (index * 0.15),
                  ease: "easeOut"
                }}
              >
                {word}
              </motion.span>
            ))}
            <motion.span 
              className="relative inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ 
                duration: 0.6, 
                delay: 1.3,
                ease: "easeOut"
              }}
            >
              <span className="bg-gradient-to-r from-gold via-rose-gold to-gold bg-clip-text text-transparent">
                elegance
              </span>
              {/* Shimmer effect only */}
              <motion.span
                className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/80 to-transparent"
                initial={{ x: "-100%" }}
                animate={inView ? { x: "100%" } : { x: "-100%" }}
                transition={{ 
                  duration: 2, 
                  delay: 2.7,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut"
                }}
              />
            </motion.span>
            <motion.span
              className="inline-block ml-2"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ 
                duration: 0.6, 
                delay: 1.4,
                ease: "easeOut"
              }}
            >
              "
            </motion.span>
          </div>
          <footer className="text-xl text-sand/70 font-light">
            — Fariha's Abaya Heritage
          </footer>
        </motion.blockquote>

        <motion.div
          className="mt-16 max-w-3xl mx-auto text-center"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-lg text-sand/80 leading-relaxed">
            For over a decade, Fariha's Abaya has been weaving dreams into reality, 
            creating exquisite pieces that honor the sacred tradition of modest fashion 
            while embracing contemporary elegance. Each abaya carries within its fabric 
            the whispers of Arabian heritage and the promise of timeless beauty.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

// Craftsmanship Section
const Craftsmanship = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const yearsCounter = useCounter(15);
  const clientsCounter = useCounter(5000);
  const qualityCounter = useCounter(100);

  useEffect(() => {
    if (inView) {
      yearsCounter.setIsVisible(true);
      clientsCounter.setIsVisible(true);
      qualityCounter.setIsVisible(true);
    }
  }, [inView]);

  const craftmanshipCards = [
    {
      icon: Scissors,
      title: "Hand-stitching",
      description: "Every seam is carefully crafted by skilled artisans who have perfected their craft over generations.",
      delay: 0.2,
    },
    {
      icon: Gem,
      title: "Premium Fabric",
      description: "We source only the finest materials from renowned textile regions, ensuring unparalleled quality.",
      delay: 0.4,
    },
    {
      icon: Star,
      title: "Exclusive Designs",
      description: "Our designs blend traditional Arabian aesthetics with contemporary fashion sensibilities.",
      delay: 0.6,
    },
  ];

  const stats = [
    { 
      number: yearsCounter.count, 
      suffix: "+", 
      label: "Years of Excellence",
      delay: 0.8 
    },
    { 
      number: clientsCounter.count, 
      suffix: "+", 
      label: "Happy Clients",
      delay: 1.0 
    },
    { 
      number: qualityCounter.count, 
      suffix: "%", 
      label: "Premium Quality",
      delay: 1.2 
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-sand/30">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif text-black mb-6">
            Master Craftsmanship
          </h2>
          <p className="text-xl text-sand/70 max-w-2xl mx-auto">
            Where tradition meets innovation in every stitch
          </p>
        </motion.div>

        {/* Craftsmanship Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {craftmanshipCards.map((card, index) => (
            <motion.div
              key={index}
              className="group relative bg-white p-8 rounded-lg shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
              initial={{ x: 100, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
              transition={{ duration: 0.8, delay: card.delay }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(212, 175, 55, 0.25)",
              }}
            >
              {/* Golden border glow on hover */}
              <motion.div
                className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-gold/50 transition-all duration-500"
                whileHover={{
                  boxShadow: "inset 0 0 20px rgba(212, 175, 55, 0.2)",
                }}
              />
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-gold to-rose-gold rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <card.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-serif text-black mb-4 group-hover:text-gold transition-colors duration-300">
                  {card.title}
                </h3>
                
                <p className="text-midnight/100 dark:text-sand/90 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Statistics Counters */}
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.6, delay: stat.delay }}
            >
              <div className="text-5xl md:text-6xl font-bold text-gold mb-2">
                {stat.number}{stat.suffix}
              </div>
              <div className="text-lg text-sand/70 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Arabian Inspiration Section
const ArabianInspiration = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const words = [
    "Heritage", "flows", "through", "every", "thread,", "connecting", 
    "generations", "of", "Arabian", "elegance", "with", "modern", "sophistication."
  ];

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-black to-deep-burgundy relative overflow-hidden">
      {/* Rotating geometric pattern overlay */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.3'%3E%3Cpath d='M30 30l15-15v30l-15-15zm0 0l-15 15V15l15 15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="grid lg:grid-cols-2 gap-16 items-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Image with center-outward mask reveal */}
          <motion.div
            className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden"
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={inView ? { clipPath: "circle(70.7% at 50% 50%)" } : { clipPath: "circle(0% at 50% 50%)" }}
            transition={{ duration: 1.5, delay: 0.3 }}
          >
            <div className="w-full h-full bg-gradient-to-br from-gold/20 to-rose-gold/20 relative">
              {/* Placeholder for abaya image */}
              <div className="absolute inset-0 bg-gradient-to-br from-sand to-pearl flex items-center justify-center">
                <div className="text-4xl font-serif text-gold/50">
                  Arabian Heritage
                </div>
              </div>
              
              {/* Overlay pattern */}
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='0.2'%3E%3Cpath d='M20 20l10-10v20l-10-10zm0 0l-10 10V10l10 10z'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
            </div>
          </motion.div>

          {/* Text with typewriter effect */}
          <div className="text-white">
            <motion.h2
              className="text-4xl md:text-5xl font-serif mb-8"
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Arabian Inspiration
            </motion.h2>

            <div className="text-xl leading-relaxed space-y-2">
              {words.map((word, index) => (
                <motion.span
                  key={index}
                  className="inline-block mr-2"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ 
                    duration: 0.1, 
                    delay: 0.8 + (index * 0.1) 
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            <motion.div
              className="mt-8 p-6 border border-gold/30 rounded-lg bg-black/20"
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
            >
              <p className="text-sand/90 italic">
                "Each design is a tribute to the timeless beauty of Arabian culture, 
                carefully interpreted through contemporary lens to create pieces 
                that honor the past while embracing the future."
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Main Brand Story Component
const BrandStory = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className="relative">
      {/* Progress Bar */}
      <ProgressBar />
      
      {/* Background gradient shift */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-sand to-black"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.1 } : { opacity: 0 }}
        transition={{ duration: 2 }}
      />
      
      {/* Floating accent patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gold/20 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <OurLegacy />
        <Craftsmanship />
        <ArabianInspiration />
      </div>
    </div>
  );
};

export { BrandStory };
