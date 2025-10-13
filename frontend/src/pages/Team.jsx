import { useEffect, useState } from "react";
import { API_BASE_URL } from '../config/api';

export default function Team() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  // Exact role order as per your requirement - using actual designations as titles
  const roleHierarchy = [
    { title: "PRESIDENT", roles: ["PRESIDENT"], isPresidential: true },
    { title: "VICE-PRESIDENT", roles: ["VICE-PRESIDENT"], isPresidential: true },
    { title: "SECRETARY", roles: ["SECRETARY"] },
    { title: "TREASURER", roles: ["TREASURER"] },
    { title: "EVENT MANAGER", roles: ["EVENT MANAGER"] },
    { title: "CULTURAL HEAD", roles: ["CULTURAL HEAD"] },
    { title: "EXECUTIVE HEAD", roles: ["EXECUTIVE HEAD"] },
    { title: "VOLUNTEER HEAD", roles: ["VOLUNTEER HEAD"] },
    { title: "STUDENT COORDINATOR", roles: ["STUDENT COORDINATOR"] },
    { title: "SPONSOR HEAD", roles: ["SPONSOR HEAD"] },
    { title: "MARKETING HEAD", roles: ["MARKETING HEAD"] },
    { title: "DECORATION HEAD", roles: ["DECORATION HEAD"] },
    { title: "HOSPITALITY", roles: ["HOSPITALITY"] },
    { title: "PHOTOGRAPHY HEAD", roles: ["PHOTOGRAPHY HEAD"] },
    { title: "SOCIAL-MEDIA MANAGER", roles: ["SOCIAL-MEDIA MANAGER"] },
    { title: "EXECUTIVE MEMBERS", roles: ["EXECUTIVE MEMBERS"] }
  ];

  useEffect(() => {
    fetch(`${API_BASE_URL}/team`)
      .then((res) => res.json())
      .then((data) => {
        setTeam(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Group team members by role - exact matching
  const groupedTeam = roleHierarchy.map(section => ({
    ...section,
    members: team.filter(member => 
      section.roles.some(role => 
        member.role?.toUpperCase() === role.toUpperCase()
      )
    )
  })).filter(section => section.members.length > 0);

  const getPlaceholderImage = () => {
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%239333ea;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%233b82f6;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grad)' rx='16'/%3E%3Ccircle cx='100' cy='70' r='30' fill='%23ffffff' opacity='0.8'/%3E%3Cpath d='M60 160 C 60 130 75 110 100 110 C 125 110 140 130 140 160 Z' fill='%23ffffff' opacity='0.8'/%3E%3Ctext x='50%25' y='185' font-family='Arial, sans-serif' font-size='14' fill='%23ffffff' text-anchor='middle' opacity='0.6'%3ETeam%3C/text%3E%3C/svg%3E";
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
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-1/3 w-3 h-3 bg-blue-400 rounded-full animate-bounce opacity-50" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/5 w-2 h-2 bg-purple-500 rounded-full animate-ping opacity-40" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-48 right-1/4 w-1 h-1 bg-blue-300 rounded-full animate-pulse opacity-70" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-white drop-shadow-2xl">
            OUR TEAM
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/80 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            The amazing people behind Bollywood Night
          </p>
        </div>

        <div className="pb-16">
          {groupedTeam.length > 0 ? (
            <div className="space-y-12 sm:space-y-16">
              {groupedTeam.map((section, sectionIndex) => (
                <div
                  key={section.title}
                  className="animate-fadeInUp"
                  style={{ animationDelay: `${sectionIndex * 0.3}s` }}
                >
                  {/* FIXED: Green Banner Title (matching your image) */}
                  <div className="text-center mb-8 sm:mb-12">
                    <div className="inline-block bg-gradient-to-r from-green-500 to-green-600 rounded-full px-8 py-3 sm:px-12 sm:py-4 shadow-2xl">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase tracking-wide">
                        {section.title}
                      </h2>
                    </div>
                  </div>

                  {/* Presidential Cards - Special Large Layout */}
                  {section.isPresidential ? (
                    <div className="flex justify-center mb-12">
                      <div className="w-full max-w-md">
                        {section.members.map((member, index) => (
                          <div
                            key={member.id}
                            className="group cursor-pointer transform hover:scale-105 hover:-translate-y-2 transition-all duration-500"
                          >
                            <div className="bg-gradient-to-br from-purple-600/30 via-blue-500/30 to-purple-800/30 backdrop-blur-md rounded-3xl p-8 border border-purple-400/30 hover:border-purple-400/60 hover:shadow-purple-500/30 hover:shadow-2xl transition-all duration-500">
                              
                              <div className="relative mb-6">
                                <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 via-blue-400 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                                
                                <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto rounded-3xl overflow-hidden border-4 border-white/40 group-hover:border-blue-400/70 transition-all duration-500 shadow-2xl">
                                  <img
                                    src={member.image_url || getPlaceholderImage()}
                                    alt={member.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    onError={(e) => {
                                      e.target.src = getPlaceholderImage();
                                    }}
                                  />
                                </div>
                              </div>

                              <div className="text-center group-hover:-translate-y-1 transition-transform duration-500">
                                <h3 className="text-white font-black text-2xl sm:text-3xl mb-3 drop-shadow-lg group-hover:text-blue-200 transition-colors duration-500">
                                  {member.name}
                                </h3>
                                <div className="inline-block bg-gradient-to-r from-purple-500/30 to-blue-500/30 backdrop-blur-sm rounded-full px-4 py-2 mb-4 border border-purple-400/40">
                                  <p className="text-purple-200 text-base sm:text-lg font-bold uppercase tracking-wide">
                                    {member.role}
                                  </p>
                                </div>
                                
                                {member.bio && (
                                  <p className="text-white/90 text-base leading-relaxed mt-4">
                                    {member.bio}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Regular Member Cards - Centered Grid */
                    <div className="flex flex-wrap justify-center items-start gap-4 sm:gap-6">
                      {section.members.map((member, index) => (
                        <div
                          key={member.id}
                          className="group cursor-pointer transform hover:scale-110 hover:-translate-y-3 transition-all duration-500 animate-fadeInUp"
                          style={{ 
                            animationDelay: `${(sectionIndex * 3 + index) * 0.15}s`,
                            minWidth: '140px',
                            maxWidth: '180px',
                            flex: '0 0 auto'
                          }}
                        >
                          <div className="bg-gradient-to-br from-purple-600/20 via-blue-500/20 to-purple-800/20 backdrop-blur-sm rounded-3xl p-4 border border-purple-400/20 hover:border-purple-400/50 hover:shadow-purple-500/20 hover:shadow-2xl transition-all duration-500">
                            
                            <div className="relative mb-4">
                              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-blue-400 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                              
                              <div className="relative w-full aspect-square rounded-2xl overflow-hidden border-2 border-white/30 group-hover:border-blue-400/60 transition-all duration-500 shadow-xl">
                                <img
                                  src={member.image_url || getPlaceholderImage()}
                                  alt={member.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  onError={(e) => {
                                    e.target.src = getPlaceholderImage();
                                  }}
                                />
                              </div>
                            </div>

                            <div className="text-center group-hover:-translate-y-1 transition-transform duration-500">
                              <h3 className="text-white font-bold text-sm sm:text-base mb-1 drop-shadow-lg group-hover:text-blue-200 transition-colors duration-500 line-clamp-2">
                                {member.name}
                              </h3>
                              <p className="text-purple-300 text-xs sm:text-sm font-semibold uppercase tracking-wide group-hover:text-blue-300 transition-colors duration-500 line-clamp-1">
                                {member.role}
                              </p>
                              
                              {member.bio && (
                                <div className="mt-2 max-h-0 overflow-hidden group-hover:max-h-24 transition-all duration-700 ease-out">
                                  <div className="pt-2 border-t border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                    <p className="text-white/80 text-xs leading-relaxed line-clamp-3">
                                      {member.bio}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
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

                <div className="flex justify-center gap-4 mt-8">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <div className="w-3 h-3 bg-purple-600 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="h-16 sm:h-20"></div>
      </div>
    </section>
  );
}
