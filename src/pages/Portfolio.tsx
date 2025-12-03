import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

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
    title: "Rahul & Priya's Royal Wedding",
    category: "Wedding",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    likes: 234,
    comments: 18,
  },
  {
    id: "2",
    title: "Amit & Sneha's Beach Wedding",
    category: "Wedding",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80",
    likes: 312,
    comments: 25,
  },
  {
    id: "3",
    title: "Little Arjun's First Birthday",
    category: "Kids",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&q=80",
    likes: 189,
    comments: 24,
  },
  {
    id: "4",
    title: "The Sharma Family Portrait",
    category: "Kids",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80",
    likes: 145,
    comments: 12,
  },
  {
    id: "5",
    title: "Ananya's Mehndi Ceremony",
    category: "Events",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
    likes: 278,
    comments: 22,
  },
  {
    id: "6",
    title: "Corporate Annual Gala",
    category: "Events",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    likes: 167,
    comments: 8,
  },
  {
    id: "7",
    title: "Sunset Portrait Session",
    category: "Outdoor",
    image: "https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?w=800&q=80",
    beforeImage: "https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=800&q=80",
    likes: 312,
    comments: 31,
  },
  {
    id: "8",
    title: "Mountain Couple Shoot",
    category: "Outdoor",
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80",
    likes: 289,
    comments: 19,
  },
  {
    id: "9",
    title: "Corporate Headshots",
    category: "Studio",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    likes: 156,
    comments: 12,
  },
  {
    id: "10",
    title: "Fashion Portfolio",
    category: "Studio",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
    likes: 398,
    comments: 45,
  },
  {
    id: "11",
    title: "Professional Retouching",
    category: "Editing",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
    beforeImage: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
    likes: 423,
    comments: 45,
  },
  {
    id: "12",
    title: "Color Grading Mastery",
    category: "Editing",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80",
    beforeImage: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1524638431109-93d95c968f03?w=800&q=80",
    likes: 356,
    comments: 28,
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredItems = activeCategory === "All"
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

  const lightboxSlides = filteredItems.map(item => ({
    src: item.image,
    title: item.title,
  }));

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              Our Portfolio
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl font-semibold mt-3 mb-6">
              Captured
              <span className="text-primary"> Moments</span>
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed">
              Browse through our collection of cherished memories and artistic creations.
              Each photograph tells a unique story.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-card text-muted-foreground hover:bg-muted border border-border"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <PortfolioCard
                  key={item.id}
                  {...item}
                  onClick={() => {
                    setLightboxIndex(index);
                    setLightboxOpen(true);
                  }}
                />
              ))}
            </AnimatePresence>
          </div>

          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground text-lg">
                No items found in this category.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={lightboxSlides}
      />
    </Layout>
  );
}
