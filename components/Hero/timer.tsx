import React, { useEffect, useRef, useState } from 'react';
import './timer.css';

const Counter = () => {
  const [timerDays, setTimerDays] = useState<number | null>(null);
  const [timerHours, setTimerHours] = useState<number | null>(null);
  const [timerMinutes, setTimerMinutes] = useState<number | null>(null);
  const [timerSeconds, setTimerSeconds] = useState<number | null>(null);

  const interval = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    const countdownDate = new Date('September 20, 2023 00:00:00').getTime();

    interval.current = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, []);

  const flipAnimation = {
    animationName: 'flip',
    animationDuration: '0.5s',
  };

  return (
    <section className='timer-container text-white py-8 rounded-2xl shadow-4xl'>
      <section className='timer mx-5 text-center'>
        <div className='grid grid-cols-4 gap-4 items-center'>
          <div style={flipAnimation} className='text-4xl font-bold'>{timerDays}</div>
          <div style={flipAnimation} className='text-4xl font-bold'>{timerHours}</div>
          <div style={flipAnimation} className='text-4xl font-bold'>{timerMinutes}</div>
          <div style={flipAnimation} className='text-4xl font-bold'>{timerSeconds}</div>
        </div>
        <div className='grid grid-cols-4 gap-4 text-sm font-medium mt-2'>
          <div>Days</div>
          <div>Hours</div>
          <div>Minutes</div>
          <div>Seconds</div>
        </div>
      </section>
    </section>
  );
};

export default Counter;
