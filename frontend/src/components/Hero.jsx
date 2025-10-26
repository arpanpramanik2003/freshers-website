import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isCalculated, setIsCalculated] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const words = ["WELCOME", "FRESHERS"];

  useEffect(() => {
    const target = new Date("2025-11-13T15:30:00");

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

    // Trigger landing animation
    setTimeout(() => setHasAnimated(true), 100);

    return () => clearInterval(interval);
  }, []);

  // Typing Animation Effect - NO CURSOR
  useEffect(() => {
    const currentWord = words[wordIndex];
    const typingSpeed = isDeleting ? 100 : 150;
    const pauseTime = isDeleting ? 500 : 2000;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (typedText.length < currentWord.length) {
          setTypedText(currentWord.substring(0, typedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (typedText.length > 0) {
          setTypedText(currentWord.substring(0, typedText.length - 1));
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, wordIndex]);

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
      <div className="absolute"></div>

      <div className={`relative z-10 text-center max-w-6xl mx-auto w-full space-y-4 sm:space-y-6 transition-all duration-1000 ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

        {/* ABHIGRAHA 2K25 - ENHANCED VISIBILITY with Background Box */}
        <div className="mb-2 sm:mb-4 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <div className="inline-block relative">
            {/* Glow effect behind */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 rounded-2xl blur-2xl opacity-60 animate-pulse"></div>
            
            {/* Background box for text */}
            <div className="relative bg-gradient-to-r from-purple-600/80 via-blue-500/80 to-purple-600/80 backdrop-blur-md rounded-2xl px-8 py-4 sm:px-12 sm:py-5 border border-white/30 shadow-2xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white drop-shadow-2xl tracking-wider">
                ABHIGRAHA 2K25
              </h2>
            </div>
          </div>
        </div>

        {/* Typing Animation - WELCOME/FRESHERS - NO CURSOR */}
        <div className="bg-black/40 backdrop-blur-md rounded-3xl px-6 py-6 sm:px-8 sm:py-8 mx-4 sm:mx-8 mb-4 sm:mb-6 border border-white/10 shadow-2xl animate-slideUp" style={{ animationDelay: '0.4s' }}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-3 sm:mb-4 leading-tight min-h-[1.2em]">
            <span className="text-white drop-shadow-2xl">
              {typedText}
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 font-light max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
            Turn up the volume | turn down the stress | let's make this night loud!
          </p>
        </div>

        {/* Enhanced Countdown Timer with Stagger Animation */}
        {!isCalculated ? (
          <div className="mb-4 sm:mb-6 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 max-w-4xl mx-auto px-2">
              {['DAYS', 'HOURS', 'MINUTES', 'SECONDS'].map((label, index) => (
                <div key={label} className="relative animate-scaleIn" style={{ animationDelay: `${0.6 + index * 0.1}s` }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl sm:rounded-3xl blur-xl opacity-30 animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-purple-600/90 to-blue-600/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-2xl border border-purple-400/30">
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white mb-1 font-mono">
                      --
                    </div>
                    <div className="text-purple-200 text-xs sm:text-sm font-bold uppercase tracking-widest">
                      {label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : !isEventStarted ? (
          <div className="mb-4 sm:mb-6 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 max-w-4xl mx-auto px-2">
              {[
                { value: timeLeft.days, label: 'DAYS', color: 'from-purple-600 to-purple-700' },
                { value: timeLeft.hours, label: 'HOURS', color: 'from-blue-600 to-blue-700' },
                { value: timeLeft.minutes, label: 'MINUTES', color: 'from-purple-500 to-blue-600' },
                { value: timeLeft.seconds, label: 'SECONDS', color: 'from-blue-500 to-purple-600' }
              ].map((item, index) => (
                <div key={item.label} className="relative group animate-scaleIn" style={{ animationDelay: `${0.6 + index * 0.1}s` }}>
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-2xl sm:rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300`}></div>
                  <div className={`relative bg-gradient-to-br ${item.color} backdrop-blur-sm rounded-2xl sm:rounded-3xl p-3 sm:p-4 transform group-hover:scale-105 transition-all duration-300 shadow-2xl border border-white/20`}>
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white mb-1 font-mono drop-shadow-lg">
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <div className="text-white/90 text-xs sm:text-sm font-bold uppercase tracking-widest">
                      {item.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* FIXED: Event Live - Removed conflicting animate-bounceIn */
          <div className="mb-4 sm:mb-6 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl sm:rounded-3xl blur-2xl opacity-60 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 backdrop-blur-sm text-white py-3 px-6 sm:py-4 sm:px-8 rounded-2xl sm:rounded-3xl shadow-2xl border border-purple-400/50">
                <h2 className="text-lg sm:text-xl md:text-2xl font-black flex items-center gap-3">
                  {/* <span className="text-2xl animate-spin">🎭</span> */}
                  FLASHMOB IS LIVE!
                  {/* <span className="text-2xl animate-spin">🎉</span> */}
                </h2>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Action Buttons with Stagger Animation */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-3xl mx-auto pt-2">
          
          {/* Button 1: VIEW EVENTS */}
          <Link
            to="/events"
            className="group relative w-full sm:w-auto overflow-hidden animate-slideUp"
            style={{ animationDelay: '1s' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl sm:rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl sm:rounded-3xl font-black text-base sm:text-lg transition-all transform group-hover:scale-105 shadow-2xl border border-purple-400/30 flex items-center justify-center gap-2">
              {/* <span className="text-xl">🎪</span> */}
              VIEW EVENTS
            </div>
          </Link>

          {/* Button 2: MEET TEAM */}
          <Link
            to="/team"
            className="group relative w-full sm:w-auto overflow-hidden animate-slideUp"
            style={{ animationDelay: '1.1s' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl sm:rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl sm:rounded-3xl font-black text-base sm:text-lg transition-all transform group-hover:scale-105 shadow-2xl border border-blue-400/30 flex items-center justify-center gap-2">
              {/* <span className="text-xl">👥</span> */}
              MEET TEAM
            </div>
          </Link>

          {/* FIXED: Button 3: REGISTER NOW - Removed conflicting animate-pulse */}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfkLr0MsWKZwFOlNmYqxRP04IOUq8JCHsKeT7RIdqXpFx9_Vg/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-full sm:w-auto overflow-hidden animate-slideUp"
            style={{ animationDelay: '1.2s' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-600 rounded-2xl sm:rounded-3xl blur-lg opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-r from-purple-500 via-blue-500 to-purple-600 hover:from-purple-600 hover:via-blue-600 hover:to-purple-700 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl sm:rounded-3xl font-black text-base sm:text-lg transition-all transform group-hover:scale-110 shadow-2xl border-2 border-white/30 flex items-center justify-center gap-2">
              {/* <span className="text-xl">📝</span> */}
              REGISTER NOW
              <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </a>
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-scaleIn {
          animation: scaleIn 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}
