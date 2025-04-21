import React, { useState, useEffect, useRef } from "react";
import MainLayout from "../layouts/MainLayout";
import SearchBar from "../components/SearchBar";
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
import OnlyCats from "../components/OnlyCats";

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
  
  const [catUsers] = useState([
    { id: '1', name: 'Whiskers', photoUrl: '/placeholder.svg' },
    { id: '2', name: 'Luna', photoUrl: '/placeholder.svg' },
    // Add more mock cat users as needed
  ]);

  const countrySelectorRef = useRef<HTMLDivElement>(null);

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

  const handleSearchCountrySelect = (country: Country) => {
    if (!selectedCountries.some(c => c.id === country.id)) {
      setSelectedCountries(prev => [...prev, country]);
      toast({
        title: "Country added",
        description: `${country.name} has been added to your clocks`,
      });
    }
  };

  const handleScrollToSelector = () => {
    setShowSelector(true);
    setShowCustomForm(false);
    setTimeout(() => {
      if (countrySelectorRef.current) {
        countrySelectorRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100); // after render
  };

  return (
    <MainLayout>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 font-josefin text-gray-200">RemoteCats</h1>
        <p className="text-muted-foreground max-w-lg mx-auto mb-8">
          Track the time in countries with the highest number of remote workers. Customize your view to focus on the regions that matter to you.
        </p>
        <SearchBar 
          onSelectCountry={handleSearchCountrySelect}
          catUsers={catUsers}
        />
      </div>

      <div className="mb-8 grid md:grid-cols-12 gap-4">
        {/* Main Clock Section */}
        <div className="md:col-span-8 space-y-4">
          <div className="flex flex-wrap gap-4 justify-center items-center mb-4">
            <ClockDesignSelector 
              selectedDesign={clockDesign}
              onChange={setClockDesign}
            />
            
            <Button
              variant="outline"
              className="bg-[#2A2530] hover:bg-[#332B3B] border-gray-800"
              onClick={handleScrollToSelector}
            >
              {showSelector ? "Hide Countries" : "Select Countries"}
            </Button>
            
            <Button
              variant="outline"
              className="bg-[#2A2530] hover:bg-[#332B3B] border-gray-800"
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
          </div>

          {/* Clock Display */}
          {filteredCountries.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No countries selected. Please select at least one country to display.</p>
            </div>
          ) : (
            <div className={`grid grid-cols-1 ${isCompact ? 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3'} gap-6 justify-items-center`}>
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
          )}
        </div>

        {/* Sidebar */}
        <div className="md:col-span-4 space-y-4">
          <OnlyCats />
          
          {showMusicPlayer && (
            <div className="mb-4">
              <MusicPlayer />
            </div>
          )}
          
          <div className="bg-[#221F26] p-4 rounded-lg border border-gray-800">
            <WellnessReminder />
          </div>
          
          <div className="bg-[#221F26] p-4 rounded-lg border border-gray-800">
            <LanguageLearner countries={selectedCountries} />
          </div>
          
          <div className="flex items-center justify-center">
            <Switch 
              id="music-player"
              checked={showMusicPlayer}
              onCheckedChange={setShowMusicPlayer}
            />
            <Label htmlFor="music-player" className="ml-2">Music Player</Label>
          </div>
        </div>
      </div>

      {/* Selector and Forms */}
      {showSelector && (
        <div
          ref={countrySelectorRef}
          className="mb-8 p-4 border rounded-lg bg-[#221F26] border-gray-800"
        >
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
        <div className="mb-8 p-4 border rounded-lg bg-[#221F26] border-gray-800">
          <h3 className="text-lg font-medium mb-4 text-center">
            Add Custom Location
          </h3>
          <CustomCountryForm onAddCountry={handleAddCustomCountry} />
        </div>
      )}
    </MainLayout>
  );
};

export default Index;
