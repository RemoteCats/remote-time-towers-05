import React from 'react';
import { cn } from "@/lib/utils";

export interface BackgroundOption {
  id: string;
  name: string;
  className: string;
}

export const backgroundOptions: BackgroundOption[] = [
  { id: 'bg-gray-900', name: 'Charcoal', className: 'bg-gray-900' },
  { id: 'bg-[#221F26]', name: 'Dark Night', className: 'bg-[#221F26]' },
  { id: 'bg-[#403E43]', name: 'Slate', className: 'bg-[#403E43]' },
  { id: 'bg-gradient-to-r from-gray-900 to-gray-800', name: 'Dark Gradient', className: 'bg-gradient-to-r from-gray-900 to-gray-800' },
  { id: 'bg-gradient-to-r from-[#221F26] to-gray-900', name: 'Night Fade', className: 'bg-gradient-to-r from-[#221F26] to-gray-900' },
  { id: 'bg-black', name: 'Pure Black', className: 'bg-black' },
];

interface BackgroundSelectorProps {
  selectedBackground: string;
  onChange: (background: string) => void;
}

export const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({ 
  selectedBackground,
  onChange
}) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {backgroundOptions.map((option) => (
        <button
          key={option.id}
          className={cn(
            "px-3 py-2 rounded-md text-xs transition-colors border",
            selectedBackground === option.id 
              ? "border-primary" 
              : "border-transparent",
            option.className,
            "text-white hover:opacity-90"
          )}
          onClick={() => onChange(option.id)}
          aria-pressed={selectedBackground === option.id}
        >
          {option.name}
        </button>
      ))}
    </div>
  );
};

export default BackgroundSelector;
