import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";

const categories = [
  "All",
  "Wedding",
  "Kids",
  "Events",
  "Outdoor",
  "Studio",
  "Editing",
];

const portfolioItems = [
  {
    id: "1",
    title: "Rahul & Priya's Wedding",
    category: "Wedding",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    likes: 234,
    comments: 18,
  },
  {
    id: "2",
    title: "Little Arjun's First Birthday",
    category: "Kids",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&q=80",
    likes: 189,
    comments: 24,
  },
  {
    id: "3",
    title: "Sunset Portrait Session",
    category: "Outdoor",
    image: "https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?w=800&q=80",
    beforeImage: "https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=800&q=80",
    likes: 312,
    comments: 31,
  },
  {
    id: "4",
    title: "Corporate Headshots",
    category: "Studio",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    likes: 156,
    comments: 12,
  },
  {
    id: "5",
    title: "Ananya's Mehndi Ceremony",
    category: "Events",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80",
    likes: 278,
    comments: 22,
  },
  {
    id: "6",
    title: "Professional Retouching",
    category: "Editing",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
    beforeImage: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
    likes: 423,
    comments: 45,
  },
];

export function PortfolioShowcase() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All"
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            Our Portfolio
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold mt-3 mb-4">
            Recent Work
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore our collection of cherished moments and artistic creations.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <PortfolioCard
                key={item.id}
                {...item}
                onClick={() => {
                  // Navigate to portfolio detail
                }}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link to="/portfolio">
            <Button variant="hero" size="lg">
              View Full Portfolio
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
