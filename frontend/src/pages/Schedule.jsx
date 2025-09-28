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

  // Status styles matching your design
  const statusStyles = {
    done: {
      indicator: "bg-green-500",
      dotStyle: "✓",
      dotColor: "text-white",
      statusText: "COMPLETED"
    },
    ongoing: {
      indicator: "bg-yellow-500",
      dotStyle: "●",
      dotColor: "text-white", 
      statusText: "ONGOING"
    },
    upcoming: {
      indicator: "bg-red-500",
      dotStyle: "⏱",
      dotColor: "text-white",
      statusText: "UPCOMING"
    },
    default: {
      indicator: "bg-purple-500",
      dotStyle: "●",
      dotColor: "text-white",
      statusText: "SCHEDULED"
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
                    <div key={item.id} className="relative flex items-center">
                      
                      {/* Status Indicator Circle */}
                      <div className="relative z-10 flex-shrink-0">
                        <div className={`w-12 h-12 ${style.indicator} rounded-full flex items-center justify-center shadow-lg border-2 border-white/20`}>
                          <span className={`text-lg font-black ${style.dotColor}`}>
                            {style.dotStyle}
                          </span>
                        </div>
                      </div>
                      
                      {/* Event Card - HIGH BLUR */}
                      <div className="ml-6 flex-1">
                        <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 hover:border-white/30 transition-all duration-300 shadow-xl">
                          
                          {/* Event Content - Matching Your Format */}
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            
                            {/* Time */}
                            <div className="flex items-center gap-2">
                              <span className="text-white/70 text-sm font-mono">
                                //time
                              </span>
                              <span className="text-purple-300 font-bold text-sm">
                                {item.time}
                              </span>
                            </div>
                            
                            {/* Event Name */}
                            <div className="flex-1 text-center">
                              <h3 className="text-xl sm:text-2xl font-black text-white drop-shadow-lg">
                                {item.title}
                              </h3>
                            </div>
                            
                            {/* Status */}
                            <div className="flex items-center gap-2">
                              <span className="text-white/70 text-sm font-mono">
                                //status
                              </span>
                              <span className="text-blue-300 font-bold text-sm">
                                {style.statusText}
                              </span>
                            </div>
                          </div>
                          
                          {/* Description (if exists) */}
                          {item.description && (
                            <div className="mt-3 pt-3 border-t border-white/10">
                              <p className="text-white/80 text-sm leading-relaxed">
                                {item.description}
                              </p>
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
          /* No Schedule State - Same as Events */
          <div className="text-center py-20">
            <div className="bg-black/15 backdrop-blur-md rounded-3xl p-12 sm:p-16 border border-white/10 shadow-2xl max-w-2xl mx-auto">
              <div className="text-6xl sm:text-8xl mb-8 animate-bounce">📅</div>
              <h3 className="text-3xl sm:text-4xl font-black text-white mb-6 drop-shadow-lg">
                Schedule Coming Soon!
              </h3>
              <p className="text-white/80 text-lg sm:text-xl leading-relaxed">
                Amazing Bollywood Night schedule is being finalized. 
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
