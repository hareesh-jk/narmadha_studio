import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0">
        {/* Video background if available */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover hidden"
          onError={(e) => {
            // Hide video if not available, show image instead
            const target = e.target as HTMLVideoElement;
            target.style.display = 'none';
            const img = target.nextElementSibling as HTMLImageElement;
            if (img) img.style.display = 'block';
          }}
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
        {/* Fallback image */}
        <img
          src="/hero-bg.jpg"
          alt="Narmadha Studio Photography"
          className="w-full h-full object-cover"
          onError={(e) => {
            // Use placeholder if custom image not found
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1920&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-primary-foreground/90 bg-primary/30 backdrop-blur-sm rounded-full border border-primary-foreground/20">
              Professional Photography Services
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold text-primary-foreground leading-tight mb-6"
          >
            Capturing Your
            <span className="block text-gold-light">Precious Moments</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-primary-foreground/80 max-w-xl mb-10 leading-relaxed"
          >
            From intimate portraits to grand celebrations, we transform fleeting moments 
            into timeless memories with artistry and passion.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/booking">
              <Button variant="hero" size="xl" className="group">
                Book Your Session
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button variant="hero-outline" size="xl" className="group">
                <Play className="h-5 w-5" />
                View Portfolio
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-8 sm:gap-12 mt-16 pt-8 border-t border-primary-foreground/20"
          >
            {[
              { value: "500+", label: "Happy Clients" },
              { value: "8+", label: "Years Experience" },
              { value: "50+", label: "Awards Won" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="font-serif text-3xl sm:text-4xl font-semibold text-gold-light">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-foreground/70 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1.5 h-3 bg-primary-foreground/50 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
