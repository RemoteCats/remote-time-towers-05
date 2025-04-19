
import React, { useState } from "react";
import { countries, Country } from "../data/countries";
import { cn } from "@/lib/utils";

interface CountrySelectorProps {
  selectedCountries: Country[];
  onToggleCountry: (country: Country) => void;
}

export const CountrySelector: React.FC<CountrySelectorProps> = ({ 
  selectedCountries, 
  onToggleCountry 
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort countries by remote rank (highest first)
  const sortedCountries = [...filteredCountries].sort((a, b) => b.remoteRank - a.remoteRank);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search countries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
        />
      </div>
      
      <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2">
        {sortedCountries.map((country) => {
          const isSelected = selectedCountries.some(c => c.id === country.id);
          
          return (
            <button
              key={country.id}
              className={cn(
                "flex items-center justify-between p-3 rounded-md transition-colors",
                isSelected 
                  ? "bg-primary/10 border border-primary/30" 
                  : "bg-card hover:bg-muted/50 border border-transparent"
              )}
              onClick={() => onToggleCountry(country)}
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">{country.flag}</span>
                <span>{country.name}</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs text-muted-foreground mr-2">
                  Rank: {country.remoteRank}
                </span>
                <div className={cn(
                  "w-4 h-4 rounded border flex items-center justify-center",
                  isSelected 
                    ? "bg-primary border-primary" 
                    : "border-gray-300 dark:border-gray-600"
                )}>
                  {isSelected && <span className="text-white text-xs">✓</span>}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CountrySelector;
