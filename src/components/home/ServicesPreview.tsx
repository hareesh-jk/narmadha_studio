import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Camera, Users, Cake, TreePine, Image, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Camera,
    title: "Wedding Photography",
    description: "Capture every emotion, every glance, every magical moment of your special day.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
    href: "/services#wedding",
  },
  {
    icon: Users,
    title: "Kids & Family",
    description: "Preserve the joy and laughter of growing families with heartwarming portraits.",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=600&q=80",
    href: "/services#kids",
  },
  {
    icon: Cake,
    title: "Birthday & Events",
    description: "From milestone birthdays to corporate events, we document celebrations that matter.",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80",
    href: "/services#events",
  },
  {
    icon: TreePine,
    title: "Outdoor Sessions",
    description: "Natural light photography in beautiful locations that tell your unique story.",
    image: "https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?w=600&q=80",
    href: "/services#outdoor",
  },
  {
    icon: Image,
    title: "Studio Portraits",
    description: "Professional studio sessions for headshots, portfolios, and timeless portraits.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    href: "/services#studio",
  },
  {
    icon: Sparkles,
    title: "Photo Editing",
    description: "Transform your photos with professional retouching and artistic enhancement.",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&q=80",
    href: "/services#editing",
  },
];

export function ServicesPreview() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            Our Services
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold mt-3 mb-4">
            What We Offer
          </h2>
          <p className="text-muted-foreground text-lg">
            From weddings to portraits, we bring your vision to life with professional 
            photography services tailored to your needs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={service.href} className="group block">
                <div className="relative rounded-2xl overflow-hidden shadow-soft hover:shadow-large transition-all duration-500">
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-primary/20 backdrop-blur-sm">
                        <service.icon className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <h3 className="font-serif text-xl font-semibold text-primary-foreground">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-primary-foreground/80 text-sm line-clamp-2 mb-4">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-gold-light text-sm font-medium group-hover:gap-3 transition-all">
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link to="/services">
            <Button variant="hero" size="lg">
              View All Services
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
