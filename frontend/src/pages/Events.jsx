import { useEffect, useState } from "react";
import { API_BASE_URL } from '../config/api';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/events`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

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
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-purple-400 border-t-4 border-blue-500 mx-auto mb-8"></div>
          <h2 className="text-2xl font-bold text-white drop-shadow-lg">Loading Events...</h2>
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
      {/* Light overlay for better text readability while showing background */}
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-white drop-shadow-2xl">
            EVENTS
          </h1>
        </div>

        {/* Events Content */}
        <div className="pb-16">
          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {events.map((event, index) => (
                <div 
                  key={event.id} 
                  className="group transform hover:scale-105 transition-all duration-300"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  {/* Transparent Event Card - Fixed Height */}
                  <div className="bg-black/15 backdrop-blur-md rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/10 hover:border-white/20 transition-all duration-300 h-full flex flex-col">
                    
                    {/* Event Image with Padding */}
                    <div className="relative overflow-hidden rounded-2xl mb-4 sm:mb-6 flex-shrink-0">
                      <img 
                        src={event.image_url} 
                        alt={event.title} 
                        className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500" 
                        onError={(e) => {
                          // Fallback placeholder image with better styling
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZDFkNWRiIiByeD0iMTIiLz4KICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmaWxsPSIjNjc3NDgzIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Ly9JTUFHRTU8L3RleHQ+Cjwvc3ZnPgo=';
                        }}
                      />
                    </div>
                    
                    {/* Event Content - Fixed Layout */}
                    <div className="px-2 flex-grow flex flex-col">
                      {/* Event Title - Fixed Height */}
                      <h3 className="text-xl sm:text-2xl font-black mb-2 text-white drop-shadow-lg line-clamp-2 min-h-[3rem] sm:min-h-[3.5rem]">
                        {event.title}
                      </h3>
                      
                      {/* Dotted Line Separator */}
                      <div className="border-b border-dotted border-white/30 mb-3 flex-shrink-0"></div>
                      
                      {/* Event Description - EXACTLY 2 LINES */}
                      <div className="flex-grow">
                        <p className="text-white/90 leading-relaxed text-sm sm:text-base font-medium line-clamp-2 h-[2.5rem] sm:h-[3rem] overflow-hidden">
                          {event.description || "SHORT DESCRIPTION"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* No Events State */
            <div className="text-center py-20">
              <div className="bg-black/15 backdrop-blur-md rounded-3xl p-12 sm:p-16 border border-white/10 shadow-2xl max-w-2xl mx-auto">
                <div className="text-6xl sm:text-8xl mb-8 animate-bounce">🎭</div>
                <h3 className="text-3xl sm:text-4xl font-black text-white mb-6 drop-shadow-lg">
                  Events Coming Soon!
                </h3>
                <p className="text-white/80 text-lg sm:text-xl leading-relaxed">
                  Amazing ABHIGRAHA events are being planned. 
                  <span className="block mt-2 text-purple-300 font-semibold">Stay tuned for the magic!</span>
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
        </div>

        {/* Add some padding at bottom for mobile */}
        <div className="h-16 sm:h-20"></div>
      </div>
    </section>
  );
}
