"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Send, CheckCircle, Sparkles } from "lucide-react";
import { toast } from "react-hot-toast";

// Email validation schema
const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
});

type EmailFormData = z.infer<typeof emailSchema>;

// Confetti Animation Component
const ConfettiCanvas = ({ isActive }: { isActive: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      rotation: number;
      rotationSpeed: number;
    }> = [];

    const colors = ["#D4AF37", "#B76E79", "#F5E6D3", "#4A0E0E"];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        vx: (Math.random() - 0.5) * 4,
        vy: -Math.random() * 8 - 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
      });
    }

    let animationId: number;
    let startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.1; // gravity
        particle.rotation += particle.rotationSpeed;

        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate((particle.rotation * Math.PI) / 180);
        ctx.fillStyle = particle.color;
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        ctx.restore();

        // Remove particles that are off screen or after 3 seconds
        if (particle.y > canvas.height + 50 || elapsed > 3000) {
          particles.splice(index, 1);
        }
      });

      if (particles.length > 0 && elapsed < 3000) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isActive]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

// Fabric Animation Background
const FabricBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Floating fabric pieces */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute opacity-20"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
            width: `${40 + (i % 3) * 20}px`,
            height: `${60 + (i % 4) * 30}px`,
            background: `linear-gradient(${45 + i * 30}deg, #D4AF37, #B76E79)`,
            borderRadius: `${20 + i * 5}% ${30 + i * 5}% ${40 + i * 5}% ${25 + i * 5}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Flowing lines */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
                       radial-gradient(circle at 80% 30%, rgba(183, 110, 121, 0.1) 0%, transparent 50%)`,
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

// Main Newsletter Component
const Newsletter = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = async (data: EmailFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Here you would normally call your API
      // const response = await fetch('/api/newsletter', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });

      setIsSuccess(true);
      setShowConfetti(true);
      toast.success("Welcome to the Fariha's Abaya family! 🎉");
      reset();
      
      // Reset success state after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setShowConfetti(false);
      }, 5000);
      
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      ref={ref} 
      className="relative py-20 overflow-hidden bg-gradient-to-br from-midnight via-deep-burgundy to-midnight"
    >
      {/* Fabric Background Animation */}
      <FabricBackground />

      {/* Confetti */}
      {showConfetti && <ConfettiCanvas isActive={showConfetti} />}

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <motion.div
            className="mb-12"
            initial={{ y: 50, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 mb-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={inView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="p-3 bg-gold rounded-full">
                <Sparkles className="w-6 h-6 text-midnight" />
              </div>
            </motion.div>

            <motion.h2
              className="text-4xl md:text-6xl font-serif text-white mb-6"
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Be the First to Discover
            </motion.h2>

            <motion.p
              className="text-xl text-sand/90 max-w-2xl mx-auto leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Exclusive previews, member-only offers, and style inspiration delivered 
              to your inbox. Join our community of elegant women.
            </motion.p>
          </motion.div>

          {/* Newsletter Form */}
          <motion.div
            className="relative"
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {!isSuccess ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {/* First Name Input */}
                  <div className="relative">
                    <motion.input
                      type="text"
                      placeholder="First Name"
                      {...register("firstName")}
                      className="w-full px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300"
                      whileFocus={{ scale: 1.02 }}
                    />
                    {errors.firstName && (
                      <motion.p
                        className="absolute -bottom-6 left-0 text-red-400 text-sm"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errors.firstName.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <motion.input
                      type="email"
                      placeholder="Email Address"
                      {...register("email")}
                      className="w-full px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300"
                      whileFocus={{ scale: 1.02 }}
                    />
                    {errors.email && (
                      <motion.p
                        className="absolute -bottom-6 left-0 text-red-400 text-sm"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errors.email.message}
                      </motion.p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative px-8 py-4 bg-gradient-to-r from-gold to-rose-gold text-midnight font-medium rounded-xl overflow-hidden shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                      ease: "easeInOut",
                    }}
                  />
                  
                  <div className="relative flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-midnight border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                        <span>Join the Elite</span>
                      </>
                    )}
                  </div>
                </motion.button>
              </form>
            ) : (
              // Success State
              <motion.div
                className="py-12"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
              >
                <div className="mb-6">
                  <motion.div
                    className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-4"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <CheckCircle className="w-10 h-10 text-white" />
                  </motion.div>
                </div>
                
                <motion.h3
                  className="text-3xl font-serif text-white mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Welcome to the Family!
                </motion.h3>
                
                <motion.p
                  className="text-sand/90 mb-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  Thank you for joining us. Check your email for a special welcome offer!
                </motion.p>

                <motion.button
                  onClick={() => setIsSuccess(false)}
                  className="text-gold hover:text-white transition-colors duration-200"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  Subscribe another email →
                </motion.button>
              </motion.div>
            )}
          </motion.div>

          {/* Benefits List */}
          <motion.div
            className="mt-16 grid md:grid-cols-3 gap-8"
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {[
              {
                icon: "👑",
                title: "Exclusive Access",
                description: "First look at new collections and limited editions"
              },
              {
                icon: "💎",
                title: "Member Offers",
                description: "Special discounts and early bird pricing"
              },
              {
                icon: "✨",
                title: "Style Tips",
                description: "Seasonal styling guides and fashion inspiration"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h4 className="text-xl font-serif text-white mb-2">{benefit.title}</h4>
                <p className="text-sand/80">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Privacy Note */}
          <motion.p
            className="mt-12 text-sm text-sand/60 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            We respect your privacy. Unsubscribe at any time. Read our{" "}
            <a href="#" className="text-gold hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export { Newsletter };
