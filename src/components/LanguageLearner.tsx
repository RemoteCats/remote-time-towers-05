
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Globe } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface Word {
  original: string;
  translation: string;
  language: string;
}

const wordsData: Record<string, Word[]> = {
  "United States": [
    { original: "Hello", translation: "Hello", language: "English" },
    { original: "Thank you", translation: "Thank you", language: "English" },
  ],
  "Japan": [
    { original: "こんにちは", translation: "Hello", language: "Japanese" },
    { original: "ありがとう", translation: "Thank you", language: "Japanese" },
  ],
  "Germany": [
    { original: "Hallo", translation: "Hello", language: "German" },
    { original: "Danke", translation: "Thank you", language: "German" },
  ],
};

const LanguageLearner: React.FC<{ countries: Array<{ name: string }> }> = ({ countries }) => {
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [isShowingTranslation, setIsShowingTranslation] = useState(false);

  const getRandomWord = () => {
    const availableCountries = countries.filter(country => wordsData[country.name]);
    if (availableCountries.length === 0) return null;
    
    const randomCountry = availableCountries[Math.floor(Math.random() * availableCountries.length)];
    const countryWords = wordsData[randomCountry.name];
    return countryWords[Math.floor(Math.random() * countryWords.length)];
  };

  const showNewWord = () => {
    const word = getRandomWord();
    if (word) {
      setCurrentWord(word);
      setIsShowingTranslation(false);
    } else {
      toast("No words available for selected countries");
    }
  };

  useEffect(() => {
    showNewWord();
  }, [countries]);

  if (!currentWord) return null;

  return (
    <Card className="w-full bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-gray-200 flex items-center gap-2">
          <Book className="h-5 w-5" />
          Language Learning
          <Globe className="h-5 w-5" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-2xl font-ibm-mono mb-2">{currentWord.original}</p>
            {isShowingTranslation && (
              <p className="text-xl text-gray-400 font-ibm-mono">{currentWord.translation}</p>
            )}
            <p className="text-sm text-gray-500 font-ibm-mono mt-2">{currentWord.language}</p>
          </div>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setIsShowingTranslation(!isShowingTranslation)}
              variant="outline"
              className="bg-gray-800/50 hover:bg-gray-700/50 border-gray-700"
            >
              {isShowingTranslation ? "Hide Translation" : "Show Translation"}
            </Button>
            <Button
              onClick={showNewWord}
              className="bg-gray-800/50 hover:bg-gray-700/50 border-gray-700"
            >
              Next Word
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LanguageLearner;
