import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import { cn } from "@/lib/utils";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  className,
}: BeforeAfterSliderProps) {
  return (
    <div className={cn("relative rounded-lg overflow-hidden shadow-medium", className)}>
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage
            src={beforeImage}
            alt={beforeLabel}
            className="object-cover w-full h-full"
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src={afterImage}
            alt={afterLabel}
            className="object-cover w-full h-full"
          />
        }
        handle={
          <div className="h-full w-1 bg-primary-foreground/80 backdrop-blur-sm flex items-center justify-center cursor-ew-resize">
            <div className="h-12 w-12 rounded-full bg-primary-foreground/90 shadow-lg flex items-center justify-center">
              <div className="flex gap-1">
                <div className="w-0.5 h-4 bg-primary rounded-full" />
                <div className="w-0.5 h-4 bg-primary rounded-full" />
              </div>
            </div>
          </div>
        }
        style={{ height: "100%" }}
      />
      
      {/* Labels */}
      <div className="absolute top-4 left-4 px-3 py-1.5 bg-foreground/80 backdrop-blur-sm text-primary-foreground text-xs font-medium rounded-full">
        {beforeLabel}
      </div>
      <div className="absolute top-4 right-4 px-3 py-1.5 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-medium rounded-full">
        {afterLabel}
      </div>
    </div>
  );
}
