
import React, { useState } from 'react';
import { Cat, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';

interface CatPhoto {
  id: string;
  url: string;
  name: string;
}

const OnlyCats = () => {
  const [catPhotos, setCatPhotos] = useState<CatPhoto[]>([]);

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
        setCatPhotos(prev => [...prev, newPhoto]);
        
        toast({
          title: "Photo uploaded",
          description: "Your cat photo has been added!",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-[#221F26] p-4 rounded-lg border border-gray-800">
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
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {catPhotos.map(photo => (
          <div
            key={photo.id}
            className="aspect-square rounded-lg overflow-hidden border border-gray-800 hover:border-gray-700 transition-colors"
          >
            <img
              src={photo.url}
              alt={photo.name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      
      {catPhotos.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <Cat className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>Upload your cat photos to display them here</p>
        </div>
      )}
    </div>
  );
};

export default OnlyCats;
