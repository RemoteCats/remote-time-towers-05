
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipForward, SkipBack, Music, Volume2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  category: string;
}

const workMusic: Track[] = [
  {
    id: "1",
    title: "Focus Flow",
    artist: "Ambient Vibes",
    url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3",
    category: "Focus"
  },
  {
    id: "2",
    title: "Deep Work",
    artist: "Concentration Zone",
    url: "https://cdn.pixabay.com/download/audio/2022/01/20/audio_d16737d39e.mp3",
    category: "Focus"
  },
  {
    id: "3",
    title: "Coding Mode",
    artist: "Digital Waves",
    url: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_b1530bad04.mp3",
    category: "Coding"
  },
  {
    id: "4",
    title: "Relaxing Space",
    artist: "Calm Beats",
    url: "https://cdn.pixabay.com/download/audio/2021/11/25/audio_00278a2597.mp3",
    category: "Relax"
  },
  {
    id: "5",
    title: "Productive Morning",
    artist: "Energy Flow",
    url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8b8c542d2.mp3",
    category: "Energy"
  }
];

interface MusicPlayerProps {
  isCompact?: boolean;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ isCompact = false }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [volume, setVolume] = useState<number>(50);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [loop, setLoop] = useState<boolean>(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    
    audio.src = workMusic[currentTrackIndex].url;
    audio.volume = volume / 100;
    
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });
    audio.addEventListener('ended', handleTrackEnd);
    
    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', () => {});
      audio.removeEventListener('ended', handleTrackEnd);
    };
  }, [currentTrackIndex]);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);
  
  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  
  const handleTrackEnd = () => {
    if (loop) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      nextTrack();
    }
  };
  
  const playPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const nextTrack = () => {
    const newIndex = (currentTrackIndex + 1) % workMusic.length;
    setCurrentTrackIndex(newIndex);
    setIsPlaying(true);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    }, 100);
  };
  
  const prevTrack = () => {
    const newIndex = (currentTrackIndex - 1 + workMusic.length) % workMusic.length;
    setCurrentTrackIndex(newIndex);
    setIsPlaying(true);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    }, 100);
  };
  
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  const handleProgressChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const currentTrack = workMusic[currentTrackIndex];
  
  if (isCompact) {
    return (
      <Card className="w-full">
        <CardHeader className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Music className="h-4 w-4 mr-2" />
              <CardTitle className="text-sm">{currentTrack.title}</CardTitle>
            </div>
            <Button size="sm" variant="ghost" onClick={playPause}>
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
      </Card>
    );
  }
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Music className="mr-2 h-5 w-5" />
          Work Music Player
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="text-center">
            <h3 className="text-lg font-medium">{currentTrack.title}</h3>
            <p className="text-sm text-muted-foreground">{currentTrack.artist}</p>
          </div>
          
          <div className="w-full">
            <Slider 
              value={[currentTime]} 
              min={0} 
              max={duration || 100}
              step={1}
              onValueChange={handleProgressChange}
              className="my-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          
          <div className="flex justify-center items-center gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={prevTrack}
              aria-label="Previous Track"
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="default" 
              size="icon" 
              onClick={playPause}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="h-10 w-10 rounded-full"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={nextTrack}
              aria-label="Next Track"
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <Slider 
                value={[volume]} 
                min={0} 
                max={100}
                step={1}
                onValueChange={(value) => setVolume(value[0])}
                className="w-24"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="loop-mode" 
                checked={loop}
                onCheckedChange={setLoop}
              />
              <Label htmlFor="loop-mode">Loop</Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MusicPlayer;
