import { useEffect, useState } from "react";
import { API_BASE_URL } from '../config/api';

export default function Schedule() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/schedule`)
      .then((res) => res.json())
      .then((data) => {
        setSchedule(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Enhanced status styles with modern gradients
  const statusStyles = {
    done: {
      indicator: "bg-gradient-to-br from-green-400 to-emerald-600",
      dotStyle: "✓",
      dotColor: "text-white",
      statusText: "COMPLETED",
      glowColor: "shadow-green-500/50",
      borderColor: "border-green-400/30",
      badgeBg: "bg-gradient-to-r from-green-500/20 to-emerald-500/20",
      badgeBorder: "border-green-400/40"
    },
    ongoing: {
      indicator: "bg-gradient-to-br from-yellow-400 to-orange-500",
      dotStyle: "⚡",
      dotColor: "text-white",
      statusText: "HAPPENING NOW",
      glowColor: "shadow-yellow-500/50",
      borderColor: "border-yellow-400/30",
      badgeBg: "bg-gradient-to-r from-yellow-500/20 to-orange-500/20",
      badgeBorder: "border-yellow-400/40"
    },
    upcoming: {
      indicator: "bg-gradient-to-br from-red-400 to-pink-600",
      dotStyle: "⏱",
      dotColor: "text-white",
      statusText: "COMING SOON",
      glowColor: "shadow-red-500/50",
      borderColor: "border-red-400/30",
      badgeBg: "bg-gradient-to-r from-red-500/20 to-pink-500/20",
      badgeBorder: "border-red-400/40"
    },
    default: {
      indicator: "bg-gradient-to-br from-purple-400 to-indigo-600",
      dotStyle: "📅",
      dotColor: "text-white",
      statusText: "SCHEDULED",
      glowColor: "shadow-purple-500/50",
      borderColor: "border-purple-400/30",
      badgeBg: "bg-gradient-to-r from-purple-500/20 to-indigo-500/20",
      badgeBorder: "border-purple-400/40"
    }
  };

  if (loading) {
    return (
      <section 
        className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 py-8"
        style={{
          backgroundImage: 'url(/stage-background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-purple-900/30 to-black/60"></div>
        <div className="relative z-10 text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-t-4 border-purple-400 border-r-4 border-r-transparent mx-auto mb-8 shadow-2xl shadow-purple-500/50"></div>
            <div className="absolute inset-0 animate-ping rounded-full h-32 w-32 border-2 border-purple-300 opacity-20 mx-auto"></div>
          </div>
          <h2 className="text-3xl font-black text-white drop-shadow-2xl animate-pulse">
            Loading Amazing Schedule...
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="min-h-screen relative overflow-hidden px-4 py-12 sm:py-16 md:py-20"
      style={{
        backgroundImage: 'url(/stage-background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-purple-900/20 to-black/50"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Fixed Header - Solid White Text */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-block mb-6">
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md px-6 py-2 rounded-full border border-purple-400/30 shadow-xl">
              <span className="text-purple-300 font-bold text-sm tracking-widest uppercase">
                📅 Event Timeline
              </span>
            </div>
          </div>
          
          {/* Changed to solid white text like Events section */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 text-white drop-shadow-2xl animate-fadeInUp">
            SCHEDULE
          </h1>
          
          <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Your complete guide to ABHIGRAHA 2K25 events
          </p>
        </div>

        {/* Schedule Content */}
        {schedule.length > 0 ? (
          /* Ultra Modern Timeline Container */
          <div className="bg-gradient-to-br from-black/30 via-purple-900/10 to-black/30 backdrop-blur-xl rounded-3xl p-4 sm:p-6 md:p-10 border border-white/10 shadow-2xl">
            
            {/* Timeline */}
            <div className="relative">
              {/* Animated Vertical Line with Glow */}
              <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 rounded-full shadow-lg shadow-purple-500/50"></div>
              
              {/* Animated dots on the line */}
              <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-1 overflow-hidden">
                <div className="animate-pulse absolute w-2 h-2 bg-white rounded-full -left-0.5 top-0 shadow-lg shadow-white/50"></div>
              </div>
              
              {/* Timeline Items */}
              <div className="space-y-6 sm:space-y-8">
                {schedule.map((item, index) => {
                  const style = statusStyles[item.status] || statusStyles.default;
                  
                  return (
                    <div 
                      key={item.id} 
                      className="relative flex items-start group animate-fadeInUp"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      
                      {/* Enhanced Status Indicator Circle */}
                      <div className="relative z-10 flex-shrink-0">
                        {/* Outer glow ring */}
                        <div className={`absolute inset-0 rounded-full ${style.indicator} opacity-20 blur-xl group-hover:opacity-40 transition-all duration-500 scale-150`}></div>
                        
                        {/* Main circle */}
                        <div className={`relative w-12 h-12 sm:w-16 sm:h-16 ${style.indicator} rounded-full flex items-center justify-center shadow-2xl border-4 border-white/30 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 ${style.glowColor} group-hover:shadow-2xl`}>
                          <span className={`text-xl sm:text-2xl font-black ${style.dotColor} group-hover:scale-125 transition-transform duration-300`}>
                            {style.dotStyle}
                          </span>
                        </div>
                        
                        {/* Pulse effect */}
                        <div className={`absolute inset-0 rounded-full ${style.indicator} opacity-0 group-hover:opacity-20 group-hover:scale-150 transition-all duration-700`}></div>
                      </div>
                      
                      {/* Ultra Modern Event Card */}
                      <div className="ml-6 sm:ml-8 flex-1 min-w-0">
                        <div className={`bg-gradient-to-br from-black/40 via-black/30 to-black/20 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border ${style.borderColor} hover:border-white/40 transition-all duration-500 shadow-2xl hover:shadow-3xl group-hover:scale-[1.02] transform hover:${style.glowColor} hover:shadow-2xl cursor-pointer overflow-hidden`}>
                          
                          {/* Animated background gradient on hover */}
                          <div className={`absolute inset-0 ${style.indicator} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                          
                          {/* Mobile-First Responsive Layout */}
                          <div className="relative space-y-4">
                            
                            {/* Time Badge - Top on Mobile, Inline on Desktop */}
                            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                              <div className={`${style.badgeBg} backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full border ${style.badgeBorder} shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                                <span className="text-white font-black text-sm sm:text-base flex items-center gap-2">
                                  <span className="text-lg sm:text-xl">🕐</span>
                                  {item.time}
                                </span>
                              </div>
                              
                              {/* Status Badge - Mobile Friendly */}
                              <div className={`${style.badgeBg} backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full border ${style.badgeBorder} shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                                <span className={`font-black text-xs sm:text-sm uppercase tracking-wider transition-colors duration-300 ${
                                  item.status === 'done' ? 'text-green-300' :
                                  item.status === 'ongoing' ? 'text-yellow-300' :
                                  item.status === 'upcoming' ? 'text-red-300' :
                                  'text-purple-300'
                                }`}>
                                  {style.statusText}
                                </span>
                              </div>
                            </div>
                            
                            {/* Event Title - Fixed to White Text with Shadow */}
                            <div className="mt-4">
                              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white drop-shadow-lg group-hover:text-purple-200 transition-all duration-500 leading-tight break-words">
                                {item.title}
                              </h3>
                            </div>
                            
                            {/* Description - Enhanced Animation */}
                            {item.description && (
                              <div className="mt-4 overflow-hidden">
                                <div className="pt-4 border-t border-white/10 group-hover:border-white/20 transition-colors duration-300">
                                  <p className="text-white/90 text-sm sm:text-base leading-relaxed group-hover:text-white transition-colors duration-300">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                            )}
                            
                            {/* Decorative corner accent */}
                            <div className={`absolute top-0 right-0 w-20 h-20 ${style.indicator} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500 rounded-full`}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Timeline End Indicator */}
            <div className="flex justify-center mt-12">
              <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-md px-8 py-3 rounded-full border border-purple-400/30 shadow-xl">
                <span className="text-white/80 font-bold text-sm">
                  🎉 More events coming soon!
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Ultra Modern No Schedule State - Fixed White Text */}
          <div className="text-center py-12 sm:py-16">
            <div className="bg-gradient-to-br from-black/40 via-purple-900/20 to-black/40 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 md:p-16 border border-white/10 shadow-2xl max-w-3xl mx-auto hover:scale-105 hover:border-purple-400/30 transition-all duration-700 cursor-pointer group">
              
              {/* Animated icon */}
              <div className="relative inline-block mb-8">
                <div className="text-7xl sm:text-8xl md:text-9xl animate-bounce">📅</div>
                <div className="absolute inset-0 bg-purple-500 opacity-20 blur-3xl rounded-full animate-pulse"></div>
              </div>
              
              {/* Fixed to solid white text */}
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 drop-shadow-xl group-hover:text-purple-200 transition-all duration-500">
                Schedule Coming Soon!
              </h3>
              
              <p className="text-white/80 text-lg sm:text-xl md:text-2xl leading-relaxed max-w-xl mx-auto">
                Amazing <span className="font-black text-purple-300">ABHIGRAHA 2K25</span> schedule is being finalized.
              </p>
              
              <p className="mt-4 text-purple-300 font-bold text-base sm:text-lg">
                ✨ Stay tuned for the epic timeline! ✨
              </p>
              
              {/* Animated decorative elements */}
              <div className="flex justify-center gap-3 sm:gap-4 mt-10">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse shadow-lg shadow-purple-500/50"></div>
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50" style={{animationDelay: '0.2s'}}></div>
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-pulse shadow-lg shadow-pink-500/50" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
