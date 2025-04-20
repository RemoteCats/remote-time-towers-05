
import React, { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import ClockCard from "../components/ClockCard";
import CountrySelector from "../components/CountrySelector";
import ClockDesignSelector from "../components/ClockDesignSelector";
import { countries, Country, ClockDesign } from "../data/countries";
import CustomCountryForm from "../components/CustomCountryForm";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import BackgroundSelector, { backgroundOptions } from "../components/BackgroundSelector";
import MusicPlayer from "../components/MusicPlayer";
import WellnessReminder from "../components/WellnessReminder";
import LanguageLearner from "../components/LanguageLearner";

const Index: React.FC = () => {
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [clockDesign, setClockDesign] = useState<ClockDesign>("digital-classic");
  const [showSelector, setShowSelector] = useState(false);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [customCountries, setCustomCountries] = useState<Country[]>([]);
  const [isCompact, setIsCompact] = useState(false);
  const [selectedBackground, setSelectedBackground] = useState(backgroundOptions[0].id);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  
  // Load custom countries from localStorage on mount
  useEffect(() => {
    const savedCustomCountries = localStorage.getItem("customCountries");
    if (savedCustomCountries) {
      setCustomCountries(JSON.parse(savedCustomCountries));
    }
    
    const savedSelectedCountries = localStorage.getItem("selectedCountries");
    if (savedSelectedCountries) {
      setSelectedCountries(JSON.parse(savedSelectedCountries));
    } else {
      // Initialize with top 5 countries by default
      const topCountries = [...countries]
        .sort((a, b) => b.remoteRank - a.remoteRank)
        .slice(0, 5);
      
      setSelectedCountries(topCountries);
    }
    
    const savedClockDesign = localStorage.getItem("clockDesign");
    if (savedClockDesign) {
      setClockDesign(savedClockDesign as ClockDesign);
    }
    
    const savedIsCompact = localStorage.getItem("isCompact");
    if (savedIsCompact) {
      setIsCompact(JSON.parse(savedIsCompact));
    }
    
    const savedBackground = localStorage.getItem("clockBackground");
    if (savedBackground) {
      setSelectedBackground(savedBackground);
    }
  }, []);
  
  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("customCountries", JSON.stringify(customCountries));
  }, [customCountries]);
  
  useEffect(() => {
    localStorage.setItem("selectedCountries", JSON.stringify(selectedCountries));
  }, [selectedCountries]);
  
  useEffect(() => {
    localStorage.setItem("clockDesign", clockDesign);
  }, [clockDesign]);
  
  useEffect(() => {
    localStorage.setItem("isCompact", JSON.stringify(isCompact));
  }, [isCompact]);
  
  useEffect(() => {
    localStorage.setItem("clockBackground", selectedBackground);
  }, [selectedBackground]);

  const handleAddCustomCountry = (countryData: Omit<Country, "id">) => {
    const id = `custom-${Date.now()}`;
    const newCustomCountry = { 
      id, 
      ...countryData 
    };
    
    setCustomCountries(prev => [...prev, newCustomCountry]);
    setSelectedCountries(prev => [...prev, newCustomCountry]);
    setShowCustomForm(false);
    
    toast({
      title: "Country added",
      description: `${countryData.name} has been added to your clocks`,
    });
  };

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
    
    // If it's a custom country, also remove it from custom countries list
    if (countryId.startsWith("custom-")) {
      setCustomCountries(prev => prev.filter(c => c.id !== countryId));
    }
  };
  
  const filteredCountries = selectedCountries.filter(country => 
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNameChange = (country: Country, newName: string) => {
    setSelectedCountries(prev => 
      prev.map(c => 
        c.id === country.id ? { ...c, displayName: newName } : c
      )
    );
    
    // Also update in custom countries if applicable
    if (country.id.startsWith("custom-")) {
      setCustomCountries(prev =>
        prev.map(c =>
          c.id === country.id ? { ...c, displayName: newName } : c
        )
      );
    }

    // Save changes to localStorage
    localStorage.setItem("selectedCountries", JSON.stringify(
      selectedCountries.map(c => 
        c.id === country.id ? { ...c, displayName: newName } : c
      )
    ));
  };

  return (
    <MainLayout>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Remote Clocker</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Track the time in countries with the highest number of remote workers. Customize your view to focus on the regions that matter to you.
        </p>
      </div>
      
      <div className="mb-8">
        <div className="flex flex-wrap gap-4 justify-center items-center mb-4">
          <ClockDesignSelector 
            selectedDesign={clockDesign}
            onChange={setClockDesign}
          />
          
          <Button
            variant="outline"
            onClick={() => {
              setShowSelector(!showSelector);
              setShowCustomForm(false);
            }}
          >
            {showSelector ? "Hide Countries" : "Select Countries"}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => {
              setShowCustomForm(!showCustomForm);
              setShowSelector(false);
            }}
          >
            {showCustomForm ? "Hide Custom Form" : "Add Custom Location"}
          </Button>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="compact-mode"
              checked={isCompact}
              onCheckedChange={setIsCompact}
            />
            <Label htmlFor="compact-mode">Compact View</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="music-player"
              checked={showMusicPlayer}
              onCheckedChange={setShowMusicPlayer}
            />
            <Label htmlFor="music-player">Music Player</Label>
          </div>
        </div>
        
        <div className="max-w-md mx-auto mb-4">
          <Input
            type="search"
            placeholder="Search your clocks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
        </div>
        
        <div className="max-w-md mx-auto mb-4">
          <h3 className="text-center text-sm font-medium mb-2">Clock Background</h3>
          <BackgroundSelector 
            selectedBackground={selectedBackground}
            onChange={setSelectedBackground}
          />
        </div>
        
        {showMusicPlayer && (
          <div className="max-w-md mx-auto my-8">
            <MusicPlayer />
          </div>
        )}
        
        <div className="max-w-2xl mx-auto mb-8">
          <WellnessReminder />
        </div>
      
        <div className="max-w-2xl mx-auto mb-8">
          <LanguageLearner countries={selectedCountries} />
        </div>

      
        {showSelector && (
          <div className="mb-8 p-4 border rounded-lg bg-card">
            <h3 className="text-lg font-medium mb-4 text-center">
              Select Countries to Display
            </h3>
            <CountrySelector 
              selectedCountries={selectedCountries}
              onToggleCountry={toggleCountry}
              customCountries={customCountries}
            />
          </div>
        )}
        
        {showCustomForm && (
          <div className="mb-8 p-4 border rounded-lg bg-card">
            <h3 className="text-lg font-medium mb-4 text-center">
              Add Custom Location
            </h3>
            <CustomCountryForm onAddCountry={handleAddCustomCountry} />
          </div>
        )}
        
        {filteredCountries.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No countries selected. Please select at least one country to display.</p>
          </div>
        ) : (
          <>
            <div className={`grid grid-cols-1 ${isCompact ? 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' : 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'} gap-6 justify-items-center`}>
              {filteredCountries.map((country) => (
                <ClockCard
                  key={country.id}
                  country={country}
                  design={clockDesign}
                  onRemove={() => handleRemoveClock(country.id)}
                  isCompact={isCompact}
                  backgroundColor={selectedBackground}
                  onNameChange={(name) => handleNameChange(country, name)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Index;
