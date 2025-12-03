import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { cn } from "@/lib/utils";

interface PortfolioCardProps {
  id: string;
  title: string;
  category: string;
  image: string;
  beforeImage?: string;
  afterImage?: string;
  likes: number;
  comments: number;
  onClick?: () => void;
}

export function PortfolioCard({
  id,
  title,
  category,
  image,
  beforeImage,
  afterImage,
  likes,
  comments,
  onClick,
}: PortfolioCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const hasBeforeAfter = beforeImage && afterImage;

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative rounded-xl overflow-hidden shadow-soft hover:shadow-large transition-shadow duration-500">
        {/* Image or Before/After Slider */}
        <div className="aspect-[4/3]">
          {hasBeforeAfter ? (
            <BeforeAfterSlider
              beforeImage={beforeImage}
              afterImage={afterImage}
              className="h-full"
            />
          ) : (
            <div className="relative h-full">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1.5 bg-background/90 backdrop-blur-sm text-foreground text-xs font-medium rounded-full shadow-soft">
            {category}
          </span>
        </div>

        {/* View Button (shows on hover) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="p-4 rounded-full bg-primary/90 text-primary-foreground shadow-large">
            <Eye className="h-6 w-6" />
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/80 to-transparent">
          <h3 className="font-serif text-lg font-medium text-primary-foreground mb-2 line-clamp-1">
            {title}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                className="flex items-center gap-1.5 text-primary-foreground/90 hover:text-primary-foreground transition-colors"
              >
                <Heart
                  className={cn(
                    "h-5 w-5 transition-all",
                    isLiked && "fill-destructive text-destructive scale-110"
                  )}
                />
                <span className="text-sm font-medium">{likeCount}</span>
              </button>
              <div className="flex items-center gap-1.5 text-primary-foreground/90">
                <MessageCircle className="h-5 w-5" />
                <span className="text-sm font-medium">{comments}</span>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Share functionality
                if (navigator.share) {
                  navigator.share({
                    title: title,
                    url: window.location.href,
                  });
                }
              }}
              className="p-2 rounded-full bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30 transition-colors"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
