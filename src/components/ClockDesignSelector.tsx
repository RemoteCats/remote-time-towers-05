
import React from "react";
import { clockDesigns, ClockDesign } from "../data/countries";
import { cn } from "@/lib/utils";

interface ClockDesignSelectorProps {
  selectedDesign: ClockDesign;
  onChange: (design: ClockDesign) => void;
}

export const ClockDesignSelector: React.FC<ClockDesignSelectorProps> = ({ 
  selectedDesign, 
  onChange 
}) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {clockDesigns.map((design) => (
        <button
          key={design.id}
          className={cn(
            "px-4 py-2 rounded-md text-sm transition-colors",
            selectedDesign === design.id 
              ? "bg-primary text-primary-foreground" 
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
          onClick={() => onChange(design.id as ClockDesign)}
          aria-pressed={selectedDesign === design.id}
        >
          {design.name}
        </button>
      ))}
    </div>
  );
};

export default ClockDesignSelector;
