import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Camera, Users, TreePine, Check, ArrowRight } from "lucide-react";

const services = [
  {
    id: "wedding",
    icon: Camera,
    title: "Wedding Photography",
    tagline: "Capturing rituals, emotions, and grand celebrations",
    description:
      "We blend candid storytelling, traditional rituals, and cinematic portraits so every smile, tear, and dance floor moment becomes a memory you can feel forever.",
    features: [
      "Half-Day Coverage: ₹15,000 – ₹25,000",
      "Full-Day Collection: ₹30,000 – ₹60,000",
      "Premium Album Package from ₹75,000",
      "Creative candid + traditional storytelling",
      "Rich colors and cinematic edits",
      "Custom add-ons for films & albums",
    ],
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    startingPrice: "From ₹15,000",
  },
  {
    id: "kids",
    icon: Users,
    title: "Baby & Kids Shoots",
    tagline: "Soft lighting, safe setups, and joyful themes",
    description:
      "From newborn snuggles to toddler giggles, we create cozy studio or outdoor experiences with hygienic props, pastel palettes, and timeless storytelling for your family.",
    features: [
      "Studio Baby Shoot (1 hour): ₹3,000 – ₹6,000",
      "Theme / Props Session: ₹7,000 – ₹12,000",
      "Outdoor Kids Adventure: ₹8,000 – ₹15,000",
      "Safe props + sanitized setups",
      "Guided posing for parents & siblings",
      "High-resolution edits perfect for prints",
    ],
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80",
    startingPrice: "From ₹3,000",
  },
  {
    id: "outdoor",
    icon: TreePine,
    title: "Outdoor Portraits",
    tagline: "Cinematic lighting and natural locations",
    description:
      "Ideal for pre-wedding stories, couple portraits, or personal branding—expect vibrant frames, dramatic skies, and handcrafted edits that mirror your personality.",
    features: [
      "Basic Outdoor Session: ₹4,000 – ₹8,000",
      "Couple / Pre-Wedding: ₹10,000 – ₹25,000",
      "Cinematic Package from ₹30,000",
      "Golden-hour lighting & location scouting",
      "Professional retouching & album-ready edits",
      "Travel covered within 50 km of studio",
    ],
    image: "https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?w=800&q=80",
    startingPrice: "From ₹4,000",
  },
];

const whyChoosePoints = [
  {
    title: "High-quality professional editing",
    description:
      "Premium color grading, skin refinement, and album-ready exports so every frame feels polished and alive.",
  },
  {
    title: "Creative poses & modern lighting",
    description:
      "We experiment with contemporary lighting setups, cinematic framing, and guidance that keeps you relaxed.",
  },
  {
    title: "Friendly, comfortable experience",
    description:
      "Our team keeps shoots relaxed and joyful—perfect for kids, couples, and camera-shy families.",
  },
  {
    title: "On-time delivery & custom packages",
    description:
      "You’ll know exactly when galleries and albums arrive, with flexibility to tailor packages to your celebration.",
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

      {/* Why Choose Us */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              Why Choose Narmadha Studio
            </span>
            <h2 className="font-serif text-4xl font-semibold mt-3 mb-4">
              Capturing Moments, Creating Memories
            </h2>
            <p className="text-muted-foreground">
              Every session is designed to feel effortless, heartfelt, and uniquely yours.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {whyChoosePoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-background rounded-2xl p-8 border border-border shadow-soft"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold mb-2">{point.title}</h3>
                    <p className="text-muted-foreground text-sm">{point.description}</p>
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
