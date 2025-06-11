'use client';
import { useEffect, useState } from 'react';

export default function DateTimeDisplay() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setDate(now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' }));
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center px-2 text-[14px]">
      <span className="font-medium">{date}</span>
      <span className="ml-4 font-medium">{time}</span>
    </div>
  );
}