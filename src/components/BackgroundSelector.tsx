
import React from 'react';
import { cn } from "@/lib/utils";

export interface BackgroundOption {
  id: string;
  name: string;
  className: string;
}

export const backgroundOptions: BackgroundOption[] = [
  { id: 'bg-gray-900', name: 'Dark', className: 'bg-gray-900' },
  { id: 'bg-blue-900', name: 'Deep Blue', className: 'bg-blue-900' },
  { id: 'bg-purple-900', name: 'Purple', className: 'bg-purple-900' },
  { id: 'bg-green-900', name: 'Forest', className: 'bg-green-900' },
  { id: 'bg-red-900', name: 'Ruby', className: 'bg-red-900' },
  { id: 'bg-gradient-to-r from-blue-900 to-purple-900', name: 'Ocean Sunset', className: 'bg-gradient-to-r from-blue-900 to-purple-900' },
  { id: 'bg-gradient-to-r from-green-900 to-blue-900', name: 'Forest Sky', className: 'bg-gradient-to-r from-green-900 to-blue-900' },
  { id: 'bg-gradient-to-r from-purple-900 to-pink-900', name: 'Twilight', className: 'bg-gradient-to-r from-purple-900 to-pink-900' },
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
