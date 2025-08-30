import { useEffect, useState } from "react";
import { API_BASE_URL } from '../config/api';

export default function Team() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false); // New state for show more

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
      <section className="min-h-screen bg-gradient-to-br from-black via-red-900 to-yellow-600 relative overflow-hidden flex items-center justify-center px-4 py-8">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-red-900/40 to-yellow-600/20"></div>
          <div className="absolute top-0 left-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-red-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-24 h-24 sm:w-48 sm:h-48 bg-yellow-400/10 rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-yellow-400 border-t-4 border-red-500 mx-auto mb-8"></div>
          <h2 className="text-2xl font-bold text-white">Loading Team...</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-red-900 to-yellow-600 relative overflow-hidden px-4 py-8">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-red-900/40 to-yellow-600/20"></div>
        <div className="absolute top-0 left-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-24 h-24 sm:w-48 sm:h-48 bg-yellow-400/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        {/* Floating Elements */}
        <div className="absolute top-10 right-5 sm:top-20 sm:right-20 w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full animate-pulse"></div>
        <div
          className="absolute bottom-16 left-5 sm:bottom-32 sm:left-16 w-1 h-1 sm:w-2 sm:h-2 bg-red-500 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/4 left-3 sm:top-1/3 sm:left-10 w-1 h-1 bg-yellow-300 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-4 sm:mb-6">
            <div className="bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 text-white px-4 py-2 sm:px-8 sm:py-3 rounded-full text-xs sm:text-sm font-black uppercase tracking-widest border-2 border-yellow-400/50 shadow-2xl">
              ✨ Meet Our Team ✨
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 leading-tight drop-shadow-2xl">
            <span className="bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
              OUR
            </span>{" "}
            <span className="bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 bg-clip-text text-transparent">
              TEAM
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-yellow-100 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            The <span className="text-yellow-300 font-bold">stars</span> behind
            Bollywood Night
          </p>
        </div>

        {/* Team Members */}
        <div className="pb-16">
          {team.length > 0 ? (
            <div className="bg-gradient-to-r from-red-900/20 via-black/40 to-yellow-900/20 backdrop-blur-lg rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-yellow-400/20">
              <div className="flex justify-center items-center gap-8 sm:gap-12 flex-wrap">
                {(showAll ? team : team.slice(0, 5)).map((member, index) => (
                  <div
                    key={member.id}
                    className="flex flex-col items-center group cursor-pointer transform hover:-translate-y-2 transition-all duration-300"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    {/* Avatar Container */}
                    <div className="relative mb-4">
                      {/* Hover glow effect */}
                      <div className="absolute -inset-2 bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>

                      {/* Main avatar */}
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-2xl group-hover:border-yellow-400 transition-all duration-300 group-hover:scale-110">
                        <img
                          src={member.image_url || "/images/default-avatar.jpg"}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* Overlay gradient on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-red-900/30 via-transparent to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      {/* Star decoration */}
                      <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                        <span className="text-black text-xs font-bold">★</span>
                      </div>
                    </div>

                    {/* Member Info */}
                    <div className="text-center group-hover:-translate-y-1 transition-transform duration-300">
                      <h3 className="text-white font-bold text-sm sm:text-base mb-1 drop-shadow-lg group-hover:text-yellow-400 transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="text-red-400 text-xs sm:text-sm font-semibold uppercase tracking-wide">
                        {member.role}
                      </p>
                    </div>

                    {/* Bio tooltip - appears on hover */}
                    {member.bio && (
                      <div className="absolute top-full mt-6 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs p-4 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-56 text-center pointer-events-none z-20 border-2 border-yellow-400/50 shadow-xl">
                        {member.bio}
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-600 rotate-45 border-l-2 border-t-2 border-yellow-400/50"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* See More Button */}
              {team.length > 5 && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 hover:from-red-700 hover:via-red-600 hover:to-yellow-600 text-white px-8 py-4 rounded-2xl font-black text-lg transition-all transform hover:scale-105 border-2 border-yellow-400/50 shadow-2xl uppercase tracking-wide"
                  >
                    {showAll ? "See Less" : "See More"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="bg-gradient-to-br from-black/80 via-red-900/40 to-black/80 backdrop-blur-sm rounded-3xl p-12 sm:p-16 border-2 border-yellow-400/30 shadow-2xl max-w-2xl mx-auto">
                <div className="text-6xl sm:text-8xl mb-8 animate-bounce">
                  👥
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-white mb-6 drop-shadow-lg">
                  <span className="bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
                    Team Details Coming Soon!
                  </span>
                </h3>
                <p className="text-yellow-100/80 text-lg sm:text-xl leading-relaxed">
                  Meet the amazing people working hard to make Bollywood Night
                  unforgettable.
                </p>

                {/* Decorative elements */}
                <div className="flex justify-center gap-4 mt-8">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <div
                    className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <div
                    className="w-3 h-3 bg-red-600 rounded-full animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Gradient Transition */}
      <div className="absolute bottom-0 left-0 w-full h-16 sm:h-24 bg-gradient-to-t from-black via-red-900/50 to-transparent"></div>
    </section>
  );
}
