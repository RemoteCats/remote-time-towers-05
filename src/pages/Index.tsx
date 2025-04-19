
import React, { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import ClockCard from "../components/ClockCard";
import CountrySelector from "../components/CountrySelector";
import ClockDesignSelector from "../components/ClockDesignSelector";
import { countries, Country, ClockDesign } from "../data/countries";

const Index: React.FC = () => {
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [clockDesign, setClockDesign] = useState<ClockDesign>("classic");
  const [showSelector, setShowSelector] = useState(false);

  // Initialize with top 5 countries by default
  useEffect(() => {
    const topCountries = [...countries]
      .sort((a, b) => b.remoteRank - a.remoteRank)
      .slice(0, 5);
    
    setSelectedCountries(topCountries);
  }, []);

  const toggleCountry = (country: Country) => {
    setSelectedCountries((prev) => {
      const isSelected = prev.some((c) => c.id === country.id);
      
      if (isSelected) {
        return prev.filter((c) => c.id !== country.id);
      } else {
        return [...prev, country];
      }
    });
  };

  const handleRemoveClock = (countryId: string) => {
    setSelectedCountries((prev) => prev.filter((c) => c.id !== countryId));
  };

  return (
    <MainLayout>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Remote Work Global Time</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Track the time in countries with the highest number of remote workers. Customize your view to focus on the regions that matter to you.
        </p>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-center">Customize Your View</h2>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <div>
            <ClockDesignSelector 
              selectedDesign={clockDesign}
              onChange={setClockDesign}
            />
          </div>
          <div>
            <button
              className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
              onClick={() => setShowSelector(!showSelector)}
            >
              {showSelector ? "Hide Countries" : "Select Countries"}
            </button>
          </div>
        </div>
      </div>
      
      {showSelector && (
        <div className="mb-8 p-4 border rounded-lg bg-card">
          <h3 className="text-lg font-medium mb-4 text-center">
            Select Countries to Display
          </h3>
          <CountrySelector 
            selectedCountries={selectedCountries}
            onToggleCountry={toggleCountry}
          />
        </div>
      )}
      
      {selectedCountries.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>No countries selected. Please select at least one country to display.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {selectedCountries.map((country) => (
              <ClockCard
                key={country.id}
                country={country}
                design={clockDesign}
                onRemove={() => handleRemoveClock(country.id)}
              />
            ))}
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default Index;
