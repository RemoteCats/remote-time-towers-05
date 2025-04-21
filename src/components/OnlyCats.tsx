
import React, { useState, useEffect, useRef } from 'react';
import { Cat, Upload, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';

interface CatPhoto {
  id: string;
  url: string;
  name: string;
}

const CAT_PHOTOS_KEY = 'global-cat-photos';

const OnlyCats = () => {
  const [catPhotos, setCatPhotos] = useState<CatPhoto[]>([]);
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load all cat photos from localStorage globally
  useEffect(() => {
    const stored = localStorage.getItem(CAT_PHOTOS_KEY);
    if (stored) {
      setCatPhotos(JSON.parse(stored));
    }
  }, []);

  // Auto slideshow logic
  useEffect(() => {
    if (catPhotos.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setCurrent((i) => (i + 1) % catPhotos.length);
    }, 3000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [catPhotos]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const newPhoto: CatPhoto = {
          id: Date.now().toString(),
          url: e.target?.result as string,
          name: file.name,
        };
        const updated = [...catPhotos, newPhoto];
        setCatPhotos(updated);
        localStorage.setItem(CAT_PHOTOS_KEY, JSON.stringify(updated));
        toast({
          title: "Photo uploaded",
          description: "Your cat photo has been added for all users!",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrev = () => setCurrent((i) => (i - 1 + catPhotos.length) % catPhotos.length);
  const handleNext = () => setCurrent((i) => (i + 1) % catPhotos.length);

  return (
    <div className="bg-black/60 backdrop-blur-md p-4 rounded-lg border border-gray-800 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-medium flex items-center gap-2">
          <Cat className="h-5 w-5" />
          Only Cats
        </h3>
        <Button
          variant="outline"
          className="bg-[#2A2530] hover:bg-[#332B3B] border-gray-800"
          onClick={() => document.getElementById('cat-photo-upload')?.click()}
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Cat Photo
        </Button>
        <input
          type="file"
          id="cat-photo-upload"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />
      </div>
      {/* Slideshow */}
      {catPhotos.length > 0 ? (
        <div className="relative flex flex-col items-center">
          <div className="aspect-square rounded-lg overflow-hidden border border-gray-800 w-full max-w-xs mb-1">
            <img
              src={catPhotos[current].url}
              alt={catPhotos[current].name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex justify-between w-full max-w-xs mt-2">
            <Button
              size="icon"
              variant="ghost"
              disabled={catPhotos.length <= 1}
              onClick={handlePrev}
              className="rounded-full"
              aria-label="Previous"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="text-xs text-[#999266] flex-1 text-center pt-1">
              {catPhotos[current]?.name}
            </div>
            <Button
              size="icon"
              variant="ghost"
              disabled={catPhotos.length <= 1}
              onClick={handleNext}
              className="rounded-full"
              aria-label="Next"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex justify-center gap-1 mt-2">
            {catPhotos.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full ${i === current ? 'bg-[#999266]' : 'bg-[#999266]/40'}`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">
          <Cat className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>Upload your cat photos to display them here</p>
        </div>
      )}
    </div>
  );
};

export default OnlyCats;
