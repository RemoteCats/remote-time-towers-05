
import React, { useState, useEffect } from 'react';
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Droplet, Dumbbell, StretchHorizontal, X } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Reminder {
  type: 'water' | 'exercise' | 'stretch';
  interval: number;
  enabled: boolean;
}

const WellnessReminder = () => {
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const saved = localStorage.getItem('wellness-reminders');
    return saved ? JSON.parse(saved) : [
      { type: 'water', interval: 30, enabled: false },
      { type: 'exercise', interval: 60, enabled: false },
      { type: 'stretch', interval: 45, enabled: false },
    ];
  });

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    localStorage.setItem('wellness-reminders', JSON.stringify(reminders));

    const intervals = reminders.map(reminder => {
      if (!reminder.enabled) return null;

      return setInterval(() => {
        const messages = {
          water: "Time to hydrate! 💧",
          exercise: "Quick exercise break! 💪",
          stretch: "Time to stretch! 🧘‍♂️",
        };

        toast(messages[reminder.type], {
          description: `Take care of yourself - you've been working for ${reminder.interval} minutes.`,
        });
      }, reminder.interval * 60 * 1000);
    });

    return () => {
      intervals.forEach(interval => interval && clearInterval(interval));
    };
  }, [reminders]);

  if (!isVisible) return null;

  const getReminderIcon = (type: Reminder['type']) => {
    switch (type) {
      case 'water':
        return <Droplet className="h-5 w-5" />;
      case 'exercise':
        return <Dumbbell className="h-5 w-5" />;
      case 'stretch':
        return <StretchHorizontal className="h-5 w-5" />;
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-2 -top-2 z-10 h-8 w-8 rounded-full bg-gray-900/50"
        onClick={() => setIsVisible(false)}
      >
        <X className="h-4 w-4" />
      </Button>
      
      <Carousel className="w-full">
        <CarouselContent>
          {reminders.map((reminder, index) => (
            <CarouselItem key={reminder.type}>
              <div className="p-1">
                <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-800/50">
                  <div className="text-gray-400">
                    {getReminderIcon(reminder.type)}
                  </div>
                  <div className="flex-1">
                    <Input
                      type="number"
                      min="1"
                      max="240"
                      value={reminder.interval}
                      onChange={(e) => {
                        const newReminders = [...reminders];
                        newReminders[index].interval = parseInt(e.target.value);
                        setReminders(newReminders);
                      }}
                      className="w-20 bg-gray-700 border-gray-600 text-gray-200"
                    />
                    <span className="ml-2 text-gray-400">minutes</span>
                  </div>
                  <Button
                    variant={reminder.enabled ? "default" : "outline"}
                    onClick={() => {
                      const newReminders = [...reminders];
                      newReminders[index].enabled = !reminder.enabled;
                      setReminders(newReminders);
                    }}
                    className={`${
                      reminder.enabled 
                        ? 'bg-gray-700 hover:bg-gray-600' 
                        : 'border-gray-700 text-gray-400 hover:bg-gray-800'
                    } transition-all animate-soft-blink`}
                  >
                    {reminder.enabled ? 'Enabled' : 'Disabled'}
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default WellnessReminder;
