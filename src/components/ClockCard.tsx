
import React from "react";
import useClock from "../hooks/useClock";
import { Country, ClockDesign } from "../data/countries";
import { cn } from "@/lib/utils";

interface ClockCardProps {
  country: Country;
  design: ClockDesign;
  onRemove?: () => void;
}

export const ClockCard: React.FC<ClockCardProps> = ({ 
  country, 
  design,
  onRemove 
}) => {
  const { hours, minutes, seconds, ampm, timeString } = useClock(country.timezone);

  // Calculate rotations for analog clock hands
  const secondsDegrees = seconds * 6; // 6 degrees per second
  const minutesDegrees = minutes * 6 + seconds * 0.1; // 6 degrees per minute + slight movement based on seconds
  const hoursDegrees = hours * 30 + minutes * 0.5; // 30 degrees per hour + slight movement based on minutes

  if (design === "digital") {
    return (
      <div className="relative bg-gray-900 text-white p-4 rounded-lg shadow-md w-full max-w-xs">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <span className="text-xl mr-2">{country.flag}</span>
            <h3 className="font-medium text-sm">{country.name}</h3>
          </div>
          <button 
            onClick={onRemove}
            className="text-gray-400 hover:text-white"
            aria-label={`Remove ${country.name} clock`}
          >
            ✕
          </button>
        </div>
        <div className="bg-black border border-gray-700 rounded-md p-4 font-mono text-center">
          <div className="text-3xl tracking-wider text-green-400">
            {timeString}
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-400 text-center">
          {country.timezone.replace('_', ' ')}
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md w-full max-w-xs">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <span className="text-xl mr-2">{country.flag}</span>
          <h3 className="font-medium text-sm">{country.name}</h3>
        </div>
        <button 
          onClick={onRemove}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          aria-label={`Remove ${country.name} clock`}
        >
          ✕
        </button>
      </div>
      
      <div className="flex justify-center">
        <div 
          className={cn(
            "clock-container w-36 h-36", 
            {
              "clock-classic": design === "classic",
              "clock-modern": design === "modern",
              "clock-minimal": design === "minimal"
            }
          )}
        >
          {/* Clock Face */}
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className="absolute h-full w-full" 
              style={{ transform: `rotate(${i * 30}deg)` }}
            >
              <div className={cn(
                "absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1.5 rounded-full",
                design === "minimal" ? "bg-gray-400" : "bg-gray-700"
              )} />
            </div>
          ))}
          
          {/* Hour markers */}
          {[0, 3, 6, 9].map((hour) => (
            <div 
              key={hour} 
              className="absolute h-full w-full" 
              style={{ transform: `rotate(${hour * 30}deg)` }}
            >
              <div className={cn(
                "absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-2 rounded-full",
                design === "minimal" ? "bg-gray-600" : "bg-gray-900"
              )} />
            </div>
          ))}
          
          {/* Clock Hands */}
          <div 
            className="clock-hand hour-hand absolute top-1/2 left-1/2 -ml-[1.75px] -translate-y-[50%] rounded-full" 
            style={{ transform: `rotate(${hoursDegrees}deg)` }}
          />
          <div 
            className="clock-hand minute-hand absolute top-1/2 left-1/2 -ml-[1.25px] -translate-y-[50%] rounded-full" 
            style={{ transform: `rotate(${minutesDegrees}deg)` }}
          />
          <div 
            className="clock-hand second-hand absolute top-1/2 left-1/2 -ml-[0.5px] w-1 -translate-y-[50%] rounded-full" 
            style={{ transform: `rotate(${secondsDegrees}deg)` }}
          />
          
          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-gray-800 dark:bg-gray-200 rounded-full" />
        </div>
      </div>
      
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
        {hours}:{minutes < 10 ? `0${minutes}` : minutes} {ampm}
      </div>
    </div>
  );
};

export default ClockCard;
