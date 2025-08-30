import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isCalculated, setIsCalculated] = useState(false); // Add this loading state

  useEffect(() => {
    const target = new Date("2025-09-28T17:31:00");
    
    // Calculate initial time immediately
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
      setIsCalculated(true); // Mark as calculated
    };

    // Calculate immediately
    calculateTime();

    // Then start interval
    const interval = setInterval(calculateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const isEventStarted = typeof timeLeft === 'string' || (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0);

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-red-900 to-yellow-600 relative overflow-hidden flex items-center justify-center px-4 py-8">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-black/70 via-red-500/20 to-yellow-400/30 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-red-500/10 to-black/50"></div>
        
        {/* Floating Elements - Responsive positioning */}
        <div className="absolute top-10 right-5 sm:top-20 sm:right-20 w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-16 left-5 sm:bottom-32 sm:left-16 w-1 h-1 sm:w-2 sm:h-2 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/4 left-3 sm:top-1/3 sm:left-10 w-1 h-1 bg-yellow-300 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>

        {/* Blinking Moving Stars */}
        <style>{`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.2; }
          }

          @keyframes moveStar {
            0% { transform: translateX(0) translateY(0); opacity: 1; }
            50% { opacity: 0.5; }
            100% { transform: translateX(100vw) translateY(-50vh); opacity: 0; }
          }

          .star {
            position: absolute;
            background: white;
            border-radius: 50%;
            width: 2px;
            height: 2px;
            opacity: 0.8;
            animation: blink 3s infinite ease-in-out alternate;
          }

          .star.slow {
            animation: moveStar 60s linear infinite, blink 3s infinite alternate;
            width: 3px;
            height: 3px;
            box-shadow: 0 0 8px 3px white;
          }

          .star1 {
            top: 20%;
            left: -10px;
            animation-delay: 0s, 0s;
          }

          .star2 {
            top: 40%;
            left: 10vw;
            animation-delay: 20s, 1s;
          }

          .star3 {
            top: 60%;
            left: 15vw;
            animation-delay: 40s, 2s;
          }
        `}</style>

        <div className="star slow star1" />
        <div className="star slow star2" />
        <div className="star slow star3" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto w-full">
        
        {/* Event Badge */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 text-white px-4 py-2 sm:px-8 sm:py-3 rounded-full text-xs sm:text-sm font-black uppercase tracking-widest border-2 border-yellow-400/50 shadow-2xl inline-block">
            ✨ Freshers 2025 ✨
          </div>
        </div>

        {/* Main Title - Responsive sizing */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-4 sm:mb-8 leading-tight sm:leading-none drop-shadow-2xl">
          <span className="bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent block">
            BOLLYWOOD
          </span>
          <span className="bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 bg-clip-text text-transparent block">
            NIGHT
          </span>
        </h1>

        {/* Subtitle - Responsive sizing */}
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-yellow-100 mb-8 sm:mb-12 font-light max-w-4xl mx-auto leading-relaxed drop-shadow-lg px-4">
          Where <span className="text-yellow-300 font-bold">dreams</span> meet <span className="text-red-300 font-bold">glamour</span>. 
          <span className="block sm:inline"> The most spectacular celebration awaits you.</span>
        </p>

        {/* Countdown Timer - Mobile optimized */}
        {!isCalculated ? (
          // Loading state - shows briefly while calculating
          <div className="mb-8 sm:mb-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 md:gap-8 max-w-4xl mx-auto px-2">
              {['DAYS', 'HOURS', 'MINS', 'SECS'].map((label, index) => (
                <div key={label} className="relative">
                  <div className="bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl sm:rounded-2xl p-3 sm:p-6 md:p-8 shadow-2xl border-2 border-gray-400/30 animate-pulse">
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-400 mb-1 sm:mb-2 font-mono">
                      --
                    </div>
                    <div className="text-gray-300 text-xs sm:text-sm md:text-base font-bold uppercase tracking-widest">
                      {label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : !isEventStarted ? (
          <div className="mb-8 sm:mb-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 md:gap-8 max-w-4xl mx-auto px-2">
              {[
                { value: timeLeft.days, label: 'DAYS', gradient: 'from-red-600 to-red-800' },
                { value: timeLeft.hours, label: 'HOURS', gradient: 'from-yellow-500 to-yellow-700' },
                { value: timeLeft.minutes, label: 'MINS', gradient: 'from-red-500 to-yellow-500' },
                { value: timeLeft.seconds, label: 'SECS', gradient: 'from-yellow-600 to-red-600' }
              ].map((item, index) => (
                <div key={item.label} className="relative group">
                  <div className={`bg-gradient-to-br ${item.gradient} rounded-xl sm:rounded-2xl p-3 sm:p-6 md:p-8 transform group-hover:scale-105 sm:group-hover:scale-110 transition-all duration-300 shadow-2xl border-2 border-yellow-400/30`}>
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-1 sm:mb-2 font-mono drop-shadow-lg">
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <div className="text-yellow-100 text-xs sm:text-sm md:text-base font-bold uppercase tracking-widest">
                      {item.label}
                    </div>
                  </div>
                  
                  {/* Glow effect - Only on larger screens */}
                  <div className="hidden sm:block absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-red-500/20 rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-8 sm:mb-12">
            <div className="bg-gradient-to-r from-green-500 via-green-400 to-yellow-400 text-black py-4 px-6 sm:py-6 sm:px-12 rounded-2xl sm:rounded-3xl inline-block border-4 border-yellow-300 shadow-2xl animate-bounce">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black">🎉 EVENT IS LIVE! 🎉</h2>
            </div>
          </div>
        )}

        {/* Action Buttons - Mobile stacked, desktop horizontal */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-2xl mx-auto">
          <Link
            to="/events"
            className="w-full sm:w-auto bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 hover:from-red-700 hover:via-red-600 hover:to-yellow-600 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black text-lg sm:text-xl transition-all transform hover:scale-105 border-2 border-yellow-400/50 shadow-2xl uppercase tracking-wide"
          >
            🎭 View Events
          </Link>
          
          <Link
            to="/team"
            className="w-full sm:w-auto bg-gradient-to-r from-black via-red-900 to-black hover:from-gray-900 hover:via-red-800 hover:to-gray-900 text-yellow-400 px-8 sm:px-12 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black text-lg sm:text-xl transition-all transform hover:scale-105 border-2 border-yellow-400 shadow-2xl uppercase tracking-wide"
          >
            👥 Meet Team
          </Link>
        </div>
      </div>

      {/* Bottom Gradient Transition */}
      <div className="absolute bottom-0 left-0 w-full h-16 sm:h-24 bg-gradient-to-t from-black via-red-900/50 to-transparent"></div>
    </section>
  );
}
