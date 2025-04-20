
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from './ui/command';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { countries, Country } from '../data/countries';

interface CatUser {
  id: string;
  name: string;
  photoUrl: string;
}

interface SearchBarProps {
  onSelectCountry: (country: Country) => void;
  catUsers: CatUser[];
}

const SearchBar: React.FC<SearchBarProps> = ({ onSelectCountry, catUsers }) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="w-full max-w-2xl mx-auto mb-8">
          <div className="relative flex items-center">
            <div className="w-full flex items-center gap-2 px-4 py-3 rounded-xl bg-[#221F26] border border-gray-800 text-left cursor-pointer hover:bg-[#2A2530] transition-colors">
              <Search className="h-5 w-5 text-gray-400" />
              <span className="text-gray-400">Search countries or cat users...</span>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-2xl p-0">
        <Command className="rounded-lg border border-gray-800 bg-[#1A1F2C]">
          <CommandInput 
            placeholder="Type to search..." 
            value={searchValue}
            onValueChange={setSearchValue}
            className="border-b border-gray-800"
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Countries">
              {countries
                .filter(country => 
                  country.name.toLowerCase().includes(searchValue.toLowerCase())
                )
                .map(country => (
                  <CommandItem
                    key={country.id}
                    onSelect={() => {
                      onSelectCountry(country);
                      setOpen(false);
                    }}
                    className="flex items-center gap-2 hover:bg-[#2A2530]"
                  >
                    <span className="text-2xl">{country.flag}</span>
                    <span>{country.name}</span>
                  </CommandItem>
                ))}
            </CommandGroup>
            <CommandGroup heading="Cat Users">
              {catUsers
                .filter(user => 
                  user.name.toLowerCase().includes(searchValue.toLowerCase())
                )
                .map(user => (
                  <CommandItem
                    key={user.id}
                    className="flex items-center gap-2 hover:bg-[#2A2530]"
                  >
                    <img 
                      src={user.photoUrl} 
                      alt={user.name} 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span>{user.name}</span>
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default SearchBar;
