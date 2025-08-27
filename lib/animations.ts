// Framer Motion animation variants for Farihas Abaya

export const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const slideInLeft = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const slideInRight = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const textReveal = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const shimmerEffect = {
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

export const floatAnimation = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const magneticHover = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.95,
  },
};

export const cardHover = {
  hover: {
    y: -8,
    boxShadow: '0 25px 50px -12px rgba(212, 175, 55, 0.25)',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

export const parallaxText = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const rotateIn = {
  hidden: {
    opacity: 0,
    rotate: -180,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const pageTransition = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

// Custom hooks for parallax and animations
import { useScroll, useTransform } from "framer-motion"
import { useEffect, useState } from "react"

interface ParallaxConfig {
  speed?: number
  offset?: number
  direction?: "up" | "down"
}

export function useParallax(config: ParallaxConfig = {}) {
  const { speed = 0.5, offset = 0, direction = "up" } = config
  const { scrollY } = useScroll()
  
  const y = useTransform(
    scrollY,
    [0, 1000],
    direction === "up" 
      ? [offset, offset - (1000 * speed)]
      : [offset, offset + (1000 * speed)]
  )

  return y
}

export function useScrollProgress() {
  const { scrollYProgress } = useScroll()
  return scrollYProgress
}

export function useElementParallax(
  elementRef: React.RefObject<HTMLElement>,
  config: ParallaxConfig = {}
) {
  const { speed = 0.5, offset = 0, direction = "up" } = config
  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "up" 
      ? [offset, offset - (200 * speed)]
      : [offset, offset + (200 * speed)]
  )

  return y
}

export function useMouseParallax() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / window.innerWidth
      const y = (e.clientY - window.innerHeight / 2) / window.innerHeight
      
      setMousePosition({ x: x * 50, y: y * 50 })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return mousePosition
}

// Custom hook for section reveal animations
export function useSectionReveal(threshold: number = 0.1) {
  const [isVisible, setIsVisible] = useState(false)
  const [ref, setRef] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold }
    )

    observer.observe(ref)

    return () => {
      if (ref) observer.unobserve(ref)
    }
  }, [ref, threshold])

  return { ref: setRef, isVisible }
}
