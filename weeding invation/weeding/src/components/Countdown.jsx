import { useEffect, useState } from 'react';

function getTimeLeft(targetDate) {
  const difference = Math.max(0, new Date(targetDate).getTime() - Date.now());
  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
  };
}

export default function Countdown({ date }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(date.iso));

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft(date.iso)), 1000);
    return () => window.clearInterval(timer);
  }, [date.iso]);

  return (
    <section className="countdown-section" aria-label="Countdown to the wedding">
      <div className="countdown-section__inner">
        <p className="eyebrow eyebrow--light">The best day is almost here</p>
        <h2>Counting down to forever</h2>
        <div className="countdown">
          {[
            ['days', 'Days'],
            ['hours', 'Hours'],
            ['minutes', 'Minutes'],
            ['seconds', 'Seconds'],
          ].map(([unit, label]) => (
            <div className="countdown__unit" key={unit}>
              <span className="countdown__number">
                {String(timeLeft[unit]).padStart(unit === 'days' ? 1 : 2, '0')}
              </span>
              <span className="countdown__label">{label}</span>
            </div>
          ))}
        </div>
        <p className="countdown-section__date">{date.display}</p>
      </div>
    </section>
  );
}
