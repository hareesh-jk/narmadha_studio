import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Check, Star, Sparkles } from "lucide-react";

const packages = [
  {
    name: "Essential",
    description: "Perfect for small events and portrait sessions",
    price: "₹15,000",
    duration: "2 hours",
    popular: false,
    features: [
      "2-hour photo session",
      "1 photographer",
      "50+ edited photos",
      "Online gallery access",
      "Print-ready files",
      "7-day delivery",
    ],
  },
  {
    name: "Premium",
    description: "Ideal for celebrations and family events",
    price: "₹35,000",
    duration: "4 hours",
    popular: true,
    features: [
      "4-hour photo session",
      "1 photographer + assistant",
      "150+ edited photos",
      "Online gallery access",
      "Print-ready files",
      "Photo album (20 pages)",
      "5-day delivery",
      "Highlight video (2 min)",
    ],
  },
  {
    name: "Luxe",
    description: "Complete coverage for weddings and grand events",
    price: "₹75,000",
    duration: "Full day",
    popular: false,
    features: [
      "Full day coverage (12 hours)",
      "2 professional photographers",
      "500+ edited photos",
      "Premium photo album (40 pages)",
      "Online gallery with downloads",
      "Pre-event consultation",
      "Same-day highlights video",
      "Drone coverage included",
      "3-day express delivery",
    ],
  },
];

const addOns = [
  { name: "Additional hour of coverage", price: "₹5,000" },
  { name: "Second photographer", price: "₹10,000" },
  { name: "Drone photography", price: "₹8,000" },
  { name: "Same-day edits", price: "₹15,000" },
  { name: "Photo album upgrade", price: "₹5,000" },
  { name: "Rush delivery (24 hours)", price: "₹10,000" },
];

export default function Pricing() {
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
              Pricing
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl font-semibold mt-3 mb-6">
              Transparent
              <span className="text-primary"> Pricing</span>
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed">
              Choose a package that fits your needs. All packages include professional 
              editing and high-resolution files.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Packages */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl p-8 ${
                  pkg.popular
                    ? "bg-primary text-primary-foreground shadow-large scale-105"
                    : "bg-card border border-border shadow-soft"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-4 py-1.5 bg-gold text-accent-foreground text-sm font-medium rounded-full">
                      <Star className="h-4 w-4 fill-current" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="font-serif text-2xl font-semibold mb-2">{pkg.name}</h3>
                  <p className={`text-sm ${pkg.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    {pkg.description}
                  </p>
                </div>

                <div className="text-center mb-8">
                  <div className="font-serif text-5xl font-semibold">{pkg.price}</div>
                  <div className={`text-sm mt-1 ${pkg.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {pkg.duration}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className={`p-1 rounded-full ${pkg.popular ? "bg-primary-foreground/20" : "bg-primary/10"}`}>
                        <Check className={`h-4 w-4 ${pkg.popular ? "text-primary-foreground" : "text-primary"}`} />
                      </div>
                      <span className={`text-sm ${pkg.popular ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link to="/booking" className="block">
                  <Button
                    variant={pkg.popular ? "gold" : "hero"}
                    className="w-full"
                    size="lg"
                  >
                    Book This Package
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="pb-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              Customize Your Package
            </span>
            <h2 className="font-serif text-4xl font-semibold mt-3 mb-4">
              Add-On Services
            </h2>
            <p className="text-muted-foreground">
              Enhance your package with additional services to create the perfect experience.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {addOns.map((addon, index) => (
              <motion.div
                key={addon.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 bg-background rounded-xl border border-border"
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span className="font-medium">{addon.name}</span>
                </div>
                <span className="text-primary font-semibold">{addon.price}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Quote CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-serif text-3xl font-semibold mb-4">
              Need a Custom Quote?
            </h2>
            <p className="text-muted-foreground mb-8">
              Have specific requirements? Contact us for a personalized quote tailored 
              to your unique needs.
            </p>
            <Link to="/contact">
              <Button variant="hero" size="lg">
                Get Custom Quote
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
