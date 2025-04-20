
import React, { useState, useEffect } from 'react';
import { toast } from "@/components/ui/sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Water, Dumbbell, StretchHorizontal } from "lucide-react";

interface Reminder {
  type: 'water' | 'exercise' | 'stretch';
  interval: number; // in minutes
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

  const updateReminder = (index: number, updates: Partial<Reminder>) => {
    setReminders(prev => 
      prev.map((reminder, i) => 
        i === index ? { ...reminder, ...updates } : reminder
      )
    );
  };

  const getReminderIcon = (type: Reminder['type']) => {
    switch (type) {
      case 'water':
        return <Water className="h-5 w-5" />;
      case 'exercise':
        return <Dumbbell className="h-5 w-5" />;
      case 'stretch':
        return <StretchHorizontal className="h-5 w-5" />;
    }
  };

  return (
    <Card className="w-full bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-gray-200">Wellness Reminders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reminders.map((reminder, index) => (
            <div key={reminder.type} className="flex items-center gap-4 p-3 rounded-lg bg-gray-800/50">
              <div className="text-gray-400">
                {getReminderIcon(reminder.type)}
              </div>
              <div className="flex-1">
                <Input
                  type="number"
                  min="1"
                  max="240"
                  value={reminder.interval}
                  onChange={(e) => updateReminder(index, { interval: parseInt(e.target.value) })}
                  className="w-20 bg-gray-700 border-gray-600 text-gray-200"
                />
                <span className="ml-2 text-gray-400">minutes</span>
              </div>
              <Button
                variant={reminder.enabled ? "default" : "outline"}
                onClick={() => updateReminder(index, { enabled: !reminder.enabled })}
                className={`${
                  reminder.enabled 
                    ? 'bg-primary hover:bg-primary/90' 
                    : 'border-gray-700 text-gray-400 hover:bg-gray-800'
                } transition-all animate-soft-blink`}
              >
                {reminder.enabled ? 'Enabled' : 'Disabled'}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WellnessReminder;
