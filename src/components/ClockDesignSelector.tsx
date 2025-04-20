
import React from "react";
import { Clock } from "lucide-react";
import { clockDesigns, ClockDesign } from "../data/countries";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface ClockDesignSelectorProps {
  selectedDesign: ClockDesign;
  onChange: (design: ClockDesign) => void;
}

export const ClockDesignSelector: React.FC<ClockDesignSelectorProps> = ({ 
  selectedDesign, 
  onChange 
}) => {
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 flex flex-col gap-4">
      <TooltipProvider>
        {clockDesigns.map((design) => (
          <Tooltip key={design.id}>
            <TooltipTrigger asChild>
              <button
                className={cn(
                  "p-2 rounded-full transition-all hover:scale-110",
                  selectedDesign === design.id 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
                onClick={() => onChange(design.id as ClockDesign)}
                aria-pressed={selectedDesign === design.id}
              >
                <Clock className={cn(
                  "h-6 w-6",
                  design.id === "digital-modern" && "rotate-45",
                  design.id === "digital-minimal" && "-rotate-45"
                )} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              {design.name}
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
};

export default ClockDesignSelector;
