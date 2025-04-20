
import React from "react";
import useClock from "../hooks/useClock";
import { Country, ClockDesign } from "../data/countries";
import { cn } from "@/lib/utils";
import { X, Edit, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ClockCardProps {
  country: Country;
  design: ClockDesign;
  onRemove?: () => void;
  isCompact?: boolean;
  backgroundColor?: string;
  onNameChange?: (name: string) => void;
}

export const ClockCard: React.FC<ClockCardProps> = ({ 
  country, 
  design,
  onRemove,
  isCompact = false,
  backgroundColor = "bg-gray-900",
  onNameChange
}) => {
  const { timeString } = useClock(country.timezone);
  const [isEditing, setIsEditing] = React.useState(false);
  const [tempName, setTempName] = React.useState(country.displayName || country.name);

  const handleNameSubmit = () => {
    if (onNameChange && tempName.trim()) {
      onNameChange(tempName.trim());
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameSubmit();
    }
  };

  const renderCard = () => {
    switch (design) {
      case "digital-classic":
        return (
          <div className="bg-black border border-gray-700 rounded-md p-4 font-mono text-center">
            <div className={cn(
              "tracking-wider text-green-400",
              isCompact ? "text-xl" : "text-3xl"
            )}>
              {timeString}
            </div>
          </div>
        );
      case "digital-modern":
        return (
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 border border-blue-700 rounded-md p-4 font-mono text-center shadow-inner">
            <div className={cn(
              "tracking-wider text-blue-300",
              isCompact ? "text-xl" : "text-3xl"
            )}>
              {timeString}
            </div>
          </div>
        );
      case "digital-minimal":
        return (
          <div className="bg-transparent border-b-2 border-gray-600 p-4 font-mono text-center">
            <div className={cn(
              "tracking-wider text-white",
              isCompact ? "text-xl" : "text-3xl"
            )}>
              {timeString}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn(
      "relative p-4 rounded-lg shadow-md w-full transition-all",
      isCompact ? "max-w-[200px]" : "max-w-xs",
      backgroundColor
    )}>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <span className="text-xl mr-2">{country.flag}</span>
          {isEditing ? (
            <div className="flex items-center">
              <Input
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onKeyPress={handleKeyPress}
                className="h-8 w-32 mr-1"
                autoFocus
              />
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={handleNameSubmit}
              >
                <Check className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center">
              <h3 className="font-medium text-sm text-white mr-2">
                {country.displayName || country.name}
              </h3>
              {onNameChange && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="h-3 w-3" />
                </Button>
              )}
            </div>
          )}
        </div>
        {onRemove && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onRemove}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      {renderCard()}
      <div className="mt-2 text-xs text-gray-400 text-center">
        {country.timezone.replace('_', ' ')}
      </div>
    </div>
  );
};

export default ClockCard;
