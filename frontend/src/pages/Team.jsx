import { useEffect, useState } from "react";
import { API_BASE_URL } from '../config/api';

export default function Team() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/team`)
      .then((res) => res.json())
      .then((data) => {
        setTeam(data);
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
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-purple-400 border-t-4 border-blue-500 mx-auto mb-8"></div>
          <h2 className="text-2xl font-bold text-white drop-shadow-lg">Loading Team...</h2>
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

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-white drop-shadow-2xl">
            OUR TEAM
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/80 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            The amazing people behind Bollywood Night
          </p>
        </div>

        {/* Team Members */}
        <div className="pb-16">
          {team.length > 0 ? (
            <>
              {/* Team Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 lg:gap-8">
                {(showAll ? team : team.slice(0, 12)).map((member, index) => (
                  <div
                    key={member.id}
                    className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Team Member Card */}
                    <div className="bg-black/15 backdrop-blur-md rounded-3xl p-4 border border-white/10 hover:border-white/30 hover:bg-black/25 transition-all duration-300 shadow-xl hover:shadow-2xl">
                      
                      {/* Avatar */}
                      <div className="relative mb-4">
                        <div className="w-full aspect-square rounded-2xl overflow-hidden border-2 border-white/20 group-hover:border-purple-400/50 transition-all duration-300">
                          <img
                            src={member.image_url || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZDFkNWRiIiByeD0iMTYiLz4KICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSI3MCIgcj0iMzAiIGZpbGw9IiM5Y2EzYWYiLz4KICA8cGF0aCBkPSJNNjAgMTYwIEMgNjAgMTMwIDc1IDExMCAxMDAgMTEwIEMgMTI1IDExMCAxNDAgMTMwIDE0MCAxNjAgWiIgZmlsbD0iIzljYTNhZiIvPgo8L3N2Zz4K'}
                            alt={member.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            onError={(e) => {
                              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZDFkNWRiIiByeD0iMTYiLz4KICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSI3MCIgcj0iMzAiIGZpbGw9IiM5Y2EzYWYiLz4KICA8cGF0aCBkPSJNNjAgMTYwIEMgNjAgMTMwIDc1IDExMCAxMDAgMTEwIEMgMTI1IDExMCAxNDAgMTMwIDE0MCAxNjAgWiIgZmlsbD0iIzljYTNhZiIvPgo8L3N2Zz4K';
                            }}
                          />
                          
                          {/* Subtle overlay on hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      </div>

                      {/* Member Info */}
                      <div className="text-center">
                        <h3 className="text-white font-bold text-sm sm:text-base mb-1 drop-shadow-lg group-hover:text-purple-300 transition-colors duration-300 line-clamp-1">
                          {member.name}
                        </h3>
                        <p className="text-blue-300 text-xs sm:text-sm font-medium uppercase tracking-wide line-clamp-1">
                          {member.role}
                        </p>
                        
                        {/* Bio Preview - Shows on hover */}
                        {member.bio && (
                          <div className="mt-2 max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-300">
                            <p className="text-white/70 text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 line-clamp-3">
                              {member.bio}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* See More/Less Button */}
              {team.length > 12 && (
                <div className="text-center mt-12">
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="bg-purple-600/90 hover:bg-purple-700/90 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-black text-base sm:text-lg transition-all transform hover:scale-105 border border-purple-400/30 shadow-2xl uppercase tracking-wide"
                  >
                    {showAll ? '👥 Show Less' : '👥 Show All Team'}
                  </button>
                </div>
              )}
            </>
          ) : (
            /* No Team State */
            <div className="text-center py-20">
              <div className="bg-black/15 backdrop-blur-md rounded-3xl p-12 sm:p-16 border border-white/10 shadow-2xl max-w-2xl mx-auto hover:scale-105 hover:shadow-purple-500/20 hover:shadow-2xl transition-all duration-500">
                <div className="text-6xl sm:text-8xl mb-8 animate-bounce">👥</div>
                <h3 className="text-3xl sm:text-4xl font-black text-white mb-6 drop-shadow-lg">
                  Team Details Coming Soon!
                </h3>
                <p className="text-white/80 text-lg sm:text-xl leading-relaxed">
                  Meet the amazing people working hard to make Bollywood Night unforgettable.
                  <span className="block mt-2 text-purple-300 font-semibold">Stay tuned to meet our stars!</span>
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

        {/* Bottom padding */}
        <div className="h-16 sm:h-20"></div>
      </div>
    </section>
  );
}
