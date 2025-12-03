import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Camera, Users, Cake, TreePine, Image, Sparkles, Check, ArrowRight } from "lucide-react";

const services = [
  {
    id: "wedding",
    icon: Camera,
    title: "Wedding Photography",
    tagline: "Your Love Story, Beautifully Told",
    description: "From the intimate pre-wedding moments to the grand celebration, we capture every emotion, every glance, every magical moment of your special day.",
    features: [
      "Full day coverage (up to 12 hours)",
      "Pre-wedding photoshoot included",
      "2 Professional photographers",
      "500+ edited high-resolution photos",
      "Premium photo album (40 pages)",
      "Online gallery with download access",
      "Same-day highlights video",
    ],
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    startingPrice: "₹75,000",
  },
  {
    id: "kids",
    icon: Users,
    title: "Kids & Family",
    tagline: "Memories That Grow With You",
    description: "Preserve the joy and laughter of growing families with heartwarming portraits that capture the essence of your family's unique bond.",
    features: [
      "2-3 hour session",
      "Studio or outdoor location",
      "Multiple outfit changes",
      "75+ edited photos",
      "Print-ready files",
      "Family portrait prints included",
    ],
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80",
    startingPrice: "₹15,000",
  },
  {
    id: "events",
    icon: Cake,
    title: "Birthday & Events",
    tagline: "Celebrate Every Milestone",
    description: "From milestone birthdays to corporate events, we document celebrations that matter with creativity and attention to detail.",
    features: [
      "4-6 hour coverage",
      "Candid & posed photography",
      "Event decoration shots",
      "200+ edited photos",
      "Quick turnaround (7 days)",
      "Social media-ready images",
    ],
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
    startingPrice: "₹25,000",
  },
  {
    id: "outdoor",
    icon: TreePine,
    title: "Outdoor Sessions",
    tagline: "Nature's Perfect Backdrop",
    description: "Natural light photography in beautiful locations that tell your unique story, from golden hour portraits to adventurous couple shoots.",
    features: [
      "2-hour golden hour session",
      "Location scouting included",
      "Travel within 50km",
      "50+ edited photos",
      "Professional color grading",
      "Quick delivery (5 days)",
    ],
    image: "https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?w=800&q=80",
    startingPrice: "₹12,000",
  },
  {
    id: "studio",
    icon: Image,
    title: "Studio Portraits",
    tagline: "Professional & Timeless",
    description: "Professional studio sessions for headshots, portfolios, and timeless portraits with precise lighting and artistic direction.",
    features: [
      "1-hour studio session",
      "Professional lighting setup",
      "Multiple backdrop options",
      "25+ edited photos",
      "Headshot retouching included",
      "LinkedIn/Corporate ready",
    ],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    startingPrice: "₹8,000",
  },
  {
    id: "editing",
    icon: Sparkles,
    title: "Photo Editing & Retouching",
    tagline: "Transform Your Images",
    description: "Professional photo editing and retouching services to transform your images with artistic enhancement and precision.",
    features: [
      "Professional color correction",
      "Skin retouching",
      "Background enhancement",
      "Object removal",
      "Before/After comparison",
      "48-hour turnaround",
    ],
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80",
    startingPrice: "₹500/photo",
  },
];

export default function Services() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              Our Services
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl font-semibold mt-3 mb-6">
              Photography Services
              <span className="text-primary"> for Every Occasion</span>
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed">
              From intimate portraits to grand celebrations, we offer comprehensive 
              photography services tailored to capture your most precious moments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="relative rounded-2xl overflow-hidden shadow-large group">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <div className="p-3 rounded-xl bg-primary/90 backdrop-blur-sm">
                        <service.icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <span className="text-primary font-medium text-sm">{service.tagline}</span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-semibold mt-2 mb-4">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground mb-6">{service.description}</p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="p-1 rounded-full bg-primary/10">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price & CTA */}
                  <div className="flex items-center gap-6">
                    <div>
                      <div className="text-sm text-muted-foreground">Starting from</div>
                      <div className="font-serif text-2xl font-semibold text-primary">
                        {service.startingPrice}
                      </div>
                    </div>
                    <Link to="/booking">
                      <Button variant="hero" size="lg">
                        Book Now
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
