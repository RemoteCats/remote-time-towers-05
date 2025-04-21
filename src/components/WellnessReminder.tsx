
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
    <div className="bg-black/60 backdrop-blur-md rounded-lg border border-gray-800 shadow-lg p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg font-semibold text-[#999266] flex items-center gap-2">
          Wellness
        </span>
        <Button
          size="icon"
          variant="ghost"
          className="h-7 w-7 bg-gray-900/50"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <Carousel className="">
        <CarouselContent>
          {reminders.map((reminder, index) => (
            <CarouselItem key={reminder.type} className="">
              <div className="px-1">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-800/60">
                  <div className="text-gray-400">{getReminderIcon(reminder.type)}</div>
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
                    className="w-14 bg-gray-700 border-gray-600 text-gray-200 text-xs"
                  />
                  <span className="ml-2 text-gray-400 text-xs">min</span>
                  <Button
                    variant={reminder.enabled ? "default" : "outline"}
                    onClick={() => {
                      const newReminders = [...reminders];
                      newReminders[index].enabled = !reminder.enabled;
                      setReminders(newReminders);
                    }}
                    className={`h-8 px-2 py-1 text-xs rounded ${reminder.enabled ? 'bg-[#999266]/20 text-[#999266]' : 'border-[#999266]/40 text-gray-400'} transition-all`}
                  >
                    {reminder.enabled ? 'On' : 'Off'}
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
