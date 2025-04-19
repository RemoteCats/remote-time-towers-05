
import { useState, useEffect } from 'react';

type TimeData = {
  hours: number;
  minutes: number;
  seconds: number;
  ampm: string;
  timeString: string;
};

export function useClock(timezone: string): TimeData {
  const [time, setTime] = useState<TimeData>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    ampm: 'AM',
    timeString: '00:00:00'
  });

  useEffect(() => {
    const getTime = () => {
      try {
        const date = new Date();
        
        // Format with the specified timezone
        const options: Intl.DateTimeFormatOptions = {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true,
          timeZone: timezone
        };
        
        const timeString = new Intl.DateTimeFormat('en-US', options).format(date);
        
        // Get the timezone-specific hours, minutes, seconds
        const timeOptions: Intl.DateTimeFormatOptions = {
          hour: 'numeric',
          hour12: false,
          timeZone: timezone
        };
        const hours24 = parseInt(new Intl.DateTimeFormat('en-US', timeOptions).format(date));
        
        const minuteOptions: Intl.DateTimeFormatOptions = {
          minute: 'numeric',
          timeZone: timezone
        };
        const minutes = parseInt(new Intl.DateTimeFormat('en-US', minuteOptions).format(date));
        
        const secondOptions: Intl.DateTimeFormatOptions = {
          second: 'numeric',
          timeZone: timezone
        };
        const seconds = parseInt(new Intl.DateTimeFormat('en-US', secondOptions).format(date));
        
        // Convert to 12-hour format
        const hours12 = hours24 > 12 ? hours24 - 12 : hours24 === 0 ? 12 : hours24;
        const ampm = hours24 >= 12 ? 'PM' : 'AM';
        
        setTime({
          hours: hours12,
          minutes,
          seconds,
          ampm,
          timeString
        });
      } catch (error) {
        console.error('Error formatting time for timezone:', timezone, error);
      }
    };

    getTime(); // Initial call
    const interval = setInterval(getTime, 1000);
    
    return () => clearInterval(interval);
  }, [timezone]);

  return time;
}

export default useClock;
