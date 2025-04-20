
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "./ui/use-toast";
import { Country } from "../data/countries";

interface CustomCountryFormProps {
  onAddCountry: (country: Omit<Country, "id">) => void;
}

const CustomCountryForm: React.FC<CustomCountryFormProps> = ({ onAddCountry }) => {
  const [name, setName] = useState("");
  const [timezone, setTimezone] = useState("");
  const [flag, setFlag] = useState("🌍");
  const [remoteRank, setRemoteRank] = useState<number>(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !timezone) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    onAddCountry({
      name,
      timezone,
      flag,
      remoteRank,
    });

    // Reset form
    setName("");
    setTimezone("");
    setFlag("🌍");
    setRemoteRank(5);

    toast({
      title: "Country added",
      description: `${name} has been added to your clocks`,
    });
  };

  // Common timezones for quick selection
  const commonTimezones = [
    "America/New_York",
    "America/Los_Angeles",
    "America/Chicago",
    "America/Denver",
    "Europe/London",
    "Europe/Paris",
    "Europe/Berlin",
    "Asia/Tokyo",
    "Asia/Shanghai",
    "Asia/Dubai",
    "Australia/Sydney",
    "Pacific/Auckland",
  ];

  // Common flag emojis
  const commonFlags = [
    "🌍", "🌎", "🌏", "🇺🇸", "🇬🇧", "🇨🇦", "🇦🇺", "🇩🇪", 
    "🇫🇷", "🇯🇵", "🇮🇳", "🇧🇷", "🇲🇽", "🇿🇦", "🇰🇷", "🇸🇬"
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="country-name">Country/City Name</Label>
          <Input
            id="country-name"
            placeholder="e.g., France or Paris, France"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="timezone">Timezone</Label>
          <div className="flex space-x-2">
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                {commonTimezones.map((tz) => (
                  <SelectItem key={tz} value={tz}>
                    {tz.replace("_", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Or enter custom timezone"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="flex-1"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Format: Continent/City (e.g., Europe/Paris)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Flag</Label>
          <div className="flex flex-wrap gap-2">
            {commonFlags.map((flagEmoji) => (
              <Button
                key={flagEmoji}
                type="button"
                variant={flag === flagEmoji ? "default" : "outline"}
                className="w-10 h-10 text-lg"
                onClick={() => setFlag(flagEmoji)}
              >
                {flagEmoji}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="remote-rank">Remote Work Rank (1-10)</Label>
          <div className="flex items-center space-x-4">
            <Input
              id="remote-rank"
              type="range"
              min="1"
              max="10"
              value={remoteRank}
              onChange={(e) => setRemoteRank(parseInt(e.target.value))}
              className="flex-1"
            />
            <span className="w-8 text-center font-medium">{remoteRank}</span>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full">Add Custom Location</Button>
    </form>
  );
};

export default CustomCountryForm;
