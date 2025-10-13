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

  // Status styles
  const statusStyles = {
    done: {
      indicator: "bg-green-500",
      dotStyle: "✓",
      dotColor: "text-white",
      statusText: "COMPLETED",
      glowColor: "shadow-green-500/50"
    },
    ongoing: {
      indicator: "bg-yellow-500",
      dotStyle: "●",
      dotColor: "text-white", 
      statusText: "ONGOING",
      glowColor: "shadow-yellow-500/50"
    },
    upcoming: {
      indicator: "bg-red-500",
      dotStyle: "⏱",
      dotColor: "text-white",
      statusText: "UPCOMING",
      glowColor: "shadow-red-500/50"
    },
    default: {
      indicator: "bg-purple-500",
      dotStyle: "●",
      dotColor: "text-white",
      statusText: "SCHEDULED",
      glowColor: "shadow-purple-500/50"
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
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-purple-400 border-t-4 border-blue-500 mx-auto mb-8"></div>
          <h2 className="text-2xl font-bold text-white drop-shadow-lg">Loading Schedule...</h2>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="min-h-screen relative overflow-hidden px-4 py-16 sm:py-20"
      style={{
        backgroundImage: 'url(/stage-background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Light overlay for better readability */}
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-white drop-shadow-2xl">
            SCHEDULE
          </h1>
        </div>

        {/* Schedule Content */}
        {schedule.length > 0 ? (
          /* Main Timeline Container - LOW BLUR */
          <div className="bg-black/10 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-white/10">
            
            {/* Timeline */}
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-white/30"></div>
              
              {/* Timeline Items */}
              <div className="space-y-6">
                {schedule.map((item, index) => {
                  const style = statusStyles[item.status] || statusStyles.default;
                  
                  return (
                    <div key={item.id} className="relative flex items-center group">
                      
                      {/* Status Indicator Circle - Enhanced Hover */}
                      <div className="relative z-10 flex-shrink-0">
                        <div className={`w-12 h-12 ${style.indicator} rounded-full flex items-center justify-center shadow-lg border-2 border-white/20 group-hover:scale-125 group-hover:shadow-2xl transition-all duration-300 ${style.glowColor} group-hover:shadow-xl`}>
                          <span className={`text-lg font-black ${style.dotColor} group-hover:scale-110 transition-transform duration-300`}>
                            {style.dotStyle}
                          </span>
                        </div>
                      </div>
                      
                      {/* Event Card - ENHANCED HOVER EFFECTS */}
                      <div className="ml-6 flex-1">
                        <div className={`bg-black/20 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 hover:border-white/40 hover:bg-black/30 hover:backdrop-blur-lg transition-all duration-500 shadow-xl hover:shadow-2xl hover:scale-105 transform hover:${style.glowColor} hover:shadow-xl cursor-pointer`}>
                          
                          {/* Event Content - Professional Layout */}
                          <div className="flex items-center justify-between flex-wrap gap-4">
                            
                            {/* Time - Clean and Professional */}
                            <div className="flex items-center">
                              <div className="bg-purple-600/80 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-400/30">
                                <span className="text-white font-bold text-sm sm:text-base">
                                  {item.time}
                                </span>
                              </div>
                            </div>
                            
                            {/* Event Name - Larger on Hover */}
                            <div className="flex-1 text-center">
                              <h3 className="text-xl sm:text-2xl font-black text-white drop-shadow-lg group-hover:text-2xl sm:group-hover:text-3xl group-hover:text-purple-200 transition-all duration-300">
                                {item.title}
                              </h3>
                            </div>
                            
                            {/* Status - Clean and Professional */}
                            <div className="flex items-center">
                              <div className={`bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 group-hover:border-white/40 transition-all duration-300`}>
                                <span className={`font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors duration-300 ${
                                  item.status === 'done' ? 'text-green-400 group-hover:text-green-300' :
                                  item.status === 'ongoing' ? 'text-yellow-400 group-hover:text-yellow-300' :
                                  item.status === 'upcoming' ? 'text-red-400 group-hover:text-red-300' :
                                  'text-purple-400 group-hover:text-purple-300'
                                }`}>
                                  {style.statusText}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Description - Slides down on hover */}
                          {item.description && (
                            <div className="mt-0 max-h-0 overflow-hidden group-hover:mt-4 group-hover:max-h-40 transition-all duration-500 ease-out">
                              <div className="pt-4 border-t border-white/20">
                                <p className="text-white/80 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* No Schedule State */
          <div className="text-center py-20">
            <div className="bg-black/15 backdrop-blur-md rounded-3xl p-12 sm:p-16 border border-white/10 shadow-2xl max-w-2xl mx-auto hover:scale-105 hover:shadow-purple-500/20 hover:shadow-2xl transition-all duration-500 cursor-pointer">
              <div className="text-6xl sm:text-8xl mb-8 animate-bounce">📅</div>
              <h3 className="text-3xl sm:text-4xl font-black text-white mb-6 drop-shadow-lg">
                Schedule Coming Soon!
              </h3>
              <p className="text-white/80 text-lg sm:text-xl leading-relaxed">
                Amazing ABHIGRAHA schedule is being finalized. 
                <span className="block mt-2 text-purple-300 font-semibold">Stay tuned for the timeline!</span>
              </p>
              
              {/* Decorative elements */}
              <div className="flex justify-center gap-4 mt-8">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="w-3 h-3 bg-purple-600 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom padding */}
        <div className="h-16 sm:h-20"></div>
      </div>
    </section>
  );
}
