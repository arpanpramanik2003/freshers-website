import { useEffect, useState } from "react";
import { API_BASE_URL } from '../config/api';

export default function Team() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);

  const roleHierarchy = [
    { title: "", roles: ["PRESIDENT", "VICE-PRESIDENT"], isLeadership: true },
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
    { title: "CREATIVE MANAGER", roles: ["CREATIVE MANAGER"] },
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
            The amazing people behind ABHIGRAHA
          </p>
        </div>

        <div className="pb-16">
          {groupedTeam.length > 0 ? (
            <div className="space-y-12 sm:space-y-16">
              {groupedTeam.map((section, sectionIndex) => (
                <div
                  key={section.title || 'leadership'}
                  className="animate-fadeInUp"
                  style={{ animationDelay: `${sectionIndex * 0.3}s` }}
                >
                  {!section.isLeadership && section.title && (
                    <div className="text-center mb-8 sm:mb-12">
                      <div className="inline-block relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 rounded-2xl blur-xl opacity-50"></div>
                        <div className="relative bg-gradient-to-r from-purple-600/90 via-blue-500/90 to-purple-700/90 backdrop-blur-sm rounded-2xl px-8 py-3 sm:px-12 sm:py-4 shadow-2xl border border-purple-400/30">
                          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase tracking-wider">
                            {section.title}
                          </h2>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* FIXED: Leadership Cards - Same Height with Fixed Dimensions */}
                  {section.isLeadership ? (
                    <div className="flex flex-wrap justify-center items-stretch gap-8 sm:gap-12 mb-12">
                      {section.members.map((member) => (
                        <div
                          key={member.id}
                          onClick={() => setSelectedMember(member)}
                          className="group cursor-pointer transform hover:scale-105 hover:-translate-y-2 transition-all duration-500"
                          style={{ width: '280px' }} /* FIXED WIDTH */
                        >
                          <div className="bg-gradient-to-br from-purple-600/30 via-blue-500/30 to-purple-800/30 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-purple-400/30 hover:border-purple-400/60 hover:shadow-purple-500/30 hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                            
                            <div className="relative mb-6">
                              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 via-blue-400 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                              
                              {/* FIXED: Exact square dimensions */}
                              <div className="relative w-40 h-40 mx-auto rounded-3xl overflow-hidden border-4 border-white/40 group-hover:border-blue-400/70 transition-all duration-500 shadow-2xl">
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

                            {/* FIXED: Name with line-clamp to prevent height variation */}
                            <div className="text-center group-hover:-translate-y-1 transition-transform duration-500 flex-grow flex flex-col justify-center">
                              <h3 className="text-white font-black text-xl sm:text-2xl mb-2 drop-shadow-lg group-hover:text-blue-200 transition-colors duration-500 line-clamp-2 min-h-[3.5rem]">
                                {member.name}
                              </h3>
                              <div className="inline-block bg-gradient-to-r from-purple-500/30 to-blue-500/30 backdrop-blur-sm rounded-full px-4 py-2 mx-auto border border-purple-400/40">
                                <p className="text-purple-200 text-sm sm:text-base font-bold uppercase tracking-wide">
                                  {member.role}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* FIXED: Regular Member Cards - Same Height */
                    <div className="flex flex-wrap justify-center items-stretch gap-4 sm:gap-6">
                      {section.members.map((member, index) => (
                        <div
                          key={member.id}
                          onClick={() => setSelectedMember(member)}
                          className="group cursor-pointer transform hover:scale-110 hover:-translate-y-3 transition-all duration-500 animate-fadeInUp"
                          style={{ 
                            animationDelay: `${(sectionIndex * 3 + index) * 0.15}s`,
                            width: '160px' /* FIXED WIDTH */
                          }}
                        >
                          {/* FIXED: h-full makes all cards same height */}
                          <div className="bg-gradient-to-br from-purple-600/20 via-blue-500/20 to-purple-800/20 backdrop-blur-sm rounded-3xl p-4 border border-purple-400/20 hover:border-purple-400/50 hover:shadow-purple-500/20 hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                            
                            <div className="relative mb-4">
                              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-blue-400 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                              
                              {/* FIXED: Perfect square */}
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

                            {/* FIXED: Text container with min-height */}
                            <div className="text-center group-hover:-translate-y-1 transition-transform duration-500 flex-grow flex flex-col justify-center">
                              {/* FIXED: line-clamp-2 with min-height ensures same space */}
                              <h3 className="text-white font-bold text-sm sm:text-base mb-1 drop-shadow-lg group-hover:text-blue-200 transition-colors duration-500 line-clamp-2 min-h-[2.5rem]">
                                {member.name}
                              </h3>
                              {/* FIXED: line-clamp-1 prevents role from wrapping */}
                              <p className="text-purple-300 text-xs font-semibold uppercase tracking-wide group-hover:text-blue-300 transition-colors duration-500 line-clamp-1">
                                {member.role}
                              </p>
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
                  Meet the amazing people working hard to make ABHIGRAHA unforgettable.
                  <span className="block mt-2 text-purple-300 font-semibold">Stay tuned to meet our stars!</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Popup */}
      {selectedMember && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setSelectedMember(null)}
        >
          <div 
            className="relative bg-gradient-to-br from-purple-600/40 via-blue-500/40 to-purple-800/40 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-10 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-purple-400/30 shadow-2xl animate-fadeInUp"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-red-500/90 hover:bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl transition-all hover:scale-110"
            >
              ✕
            </button>

            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mx-auto mb-6 rounded-3xl overflow-hidden border-4 border-white/40 shadow-2xl">
              <img
                src={selectedMember.image_url || getPlaceholderImage()}
                alt={selectedMember.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = getPlaceholderImage();
                }}
              />
            </div>

            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 drop-shadow-lg">
                {selectedMember.name}
              </h2>
              
              <div className="inline-block bg-gradient-to-r from-purple-500/40 to-blue-500/40 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-purple-400/40">
                <p className="text-purple-200 text-base sm:text-lg font-bold uppercase tracking-wide">
                  {selectedMember.role}
                </p>
              </div>

              {selectedMember.bio && (
                <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <p className="text-white/90 text-base sm:text-lg leading-relaxed">
                    {selectedMember.bio}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
