import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isCalculated, setIsCalculated] = useState(false);

  useEffect(() => {
    const target = new Date("2025-10-15T17:31:00");

    const calculateTime = () => {
      const now = new Date();
      const diff = target - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTimeLeft("Event is Live!");
      }
      setIsCalculated(true);
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const isEventStarted = typeof timeLeft === 'string' || (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0);

  return (
    <section
      className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 py-16 sm:py-8"
      style={{
        backgroundImage: 'url(/stage-background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* VERY LIGHT overlay to keep background visible */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Main Content - Reduced spacing for mobile */}
      <div className="relative z-10 text-center max-w-6xl mx-auto w-full space-y-4 sm:space-y-6">

        {/* FRESHERS 2K25 - Outside blur */}
        <div className="mb-2 sm:mb-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white drop-shadow-2xl">
            FRESHERS 2K25
          </h2>
        </div>

        {/* BLUR RECTANGLE for BOLLYWOOD NIGHT + Subtitle */}
        <div className="bg-black/40 rounded-3xl px-6 py-6 sm:px-8 sm:py-8 mx-4 sm:mx-8 mb-4 sm:mb-6 border border-white/5">

          {/* Main Title - BOLLYWOOD NIGHT in single line */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-3 sm:mb-4 leading-tight">
            <span className="text-white drop-shadow-2xl font-black">
              <strong>BOLLYWOOD NIGHT</strong>
            </span>
          </h1>

          {/* Subtitle - Inside blur rectangle */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-light max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
            Turn up the volume | turn down the stress | let's make this night loud!
          </p>

        </div>

        {/* Countdown Timer - Outside blur */}
        {!isCalculated ? (
          <div className="mb-4 sm:mb-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 max-w-4xl mx-auto px-2">
              {['DAYS', 'HOURS', 'MINUTES', 'SECONDS'].map((label, index) => (
                <div key={label} className="relative">
                  <div className="bg-purple-600/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-2xl animate-pulse">
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white mb-1 font-mono">
                      --
                    </div>
                    <div className="text-white text-xs sm:text-sm font-bold uppercase tracking-widest">
                      {label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : !isEventStarted ? (
          <div className="mb-4 sm:mb-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 max-w-4xl mx-auto px-2">
              {[
                { value: timeLeft.days, label: 'DAYS' },
                { value: timeLeft.hours, label: 'HOURS' },
                { value: timeLeft.minutes, label: 'MINUTES' },
                { value: timeLeft.seconds, label: 'SECONDS' }
              ].map((item, index) => (
                <div key={item.label} className="relative group">
                  <div className="bg-purple-600/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-3 sm:p-4 transform group-hover:scale-105 transition-all duration-300 shadow-2xl">
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white mb-1 font-mono">
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <div className="text-white text-xs sm:text-sm font-bold uppercase tracking-widest">
                      {item.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-4 sm:mb-6">
            <div className="bg-green-600/90 backdrop-blur-sm text-white py-3 px-4 sm:py-4 sm:px-6 rounded-2xl sm:rounded-3xl inline-block shadow-2xl animate-bounce">
              <h2 className="text-lg sm:text-xl md:text-2xl font-black">🎉 EVENT IS LIVE! 🎉</h2>
            </div>
          </div>
        )}

        {/* Action Buttons - Outside blur */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-2xl mx-auto pt-2">
          <Link
            to="/events"
            className="w-full sm:w-auto bg-purple-600/90 hover:bg-purple-700/90 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl sm:rounded-3xl font-black text-base sm:text-lg transition-all transform hover:scale-105 shadow-2xl uppercase tracking-wide"
          >
            VIEW EVENTS
          </Link>

          <Link
            to="/team"
            className="w-full sm:w-auto bg-purple-800/90 hover:bg-purple-900/90 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl sm:rounded-3xl font-black text-base sm:text-lg transition-all transform hover:scale-105 shadow-2xl uppercase tracking-wide"
          >
            MEET TEAM
          </Link>
        </div>
      </div>
    </section>
  );
}
