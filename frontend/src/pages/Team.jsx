import { useEffect, useState } from "react";
import { API_BASE_URL } from '../config/api';

export default function Team() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  // FIXED: Combined Leadership section & better role hierarchy
  const roleHierarchy = [
    { 
      title: "LEADERSHIP", 
      roles: ["PRESIDENT", "VICE-PRESIDENT"], 
      icon: "👑", 
      color: "from-purple-600 to-purple-800",
      isLeadership: true  // Special flag for combined leadership layout
    },
    { title: "CORE MANAGEMENT", roles: ["TREASURER", "SECRETARY"], icon: "💼", color: "from-green-600 to-green-800" },
    { title: "DEPARTMENT HEADS", roles: ["EVENT MANAGER", "CULTURAL HEAD", "VOLUNTEER HEAD", "DECORATION HEAD", "MARKETING HEAD", "PHOTOGRAPHY HEAD", "SPONSOR HEAD"], icon: "🎯", color: "from-orange-600 to-red-600" },
    { title: "SPECIALIZED ROLES", roles: ["CREATIVE MANAGER", "STUDENT COORDINATOR", "SOCIAL-MEDIA MANAGER", "HOSPITALITY", "EXECUTIVE HEAD"], icon: "⭐", color: "from-teal-600 to-cyan-600" },
    { title: "TEAM MEMBERS", roles: ["EXECUTIVE MEMBERS"], icon: "👥", color: "from-indigo-600 to-purple-600" }
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

  // Group team members by role hierarchy - FIXED: No duplication
  const groupedTeam = roleHierarchy.map(section => ({
    ...section,
    members: team.filter(member => 
      section.roles.some(role => 
        member.role?.toUpperCase() === role.toUpperCase()
      )
    )
  })).filter(section => section.members.length > 0);

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

      {/* Floating animations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-1/3 w-3 h-3 bg-blue-400 rounded-full animate-bounce opacity-50" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/5 w-2 h-2 bg-purple-500 rounded-full animate-ping opacity-40" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-48 right-1/4 w-1 h-1 bg-blue-300 rounded-full animate-pulse opacity-70" style={{animationDelay: '3s'}}></div>
      </div>

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

        {/* Team Hierarchy */}
        <div className="pb-16">
          {groupedTeam.length > 0 ? (
            <div className="space-y-12 sm:space-y-16">
              {groupedTeam.map((section, sectionIndex) => (
                <div
                  key={section.title}
                  className="animate-fadeInUp"
                  style={{ animationDelay: `${sectionIndex * 0.3}s` }}
                >
                  {/* Section Header */}
                  <div className="text-center mb-8 sm:mb-12">
                    <div className={`inline-block bg-gradient-to-r ${section.color} rounded-2xl px-6 py-3 sm:px-8 sm:py-4 shadow-2xl border border-white/20 backdrop-blur-sm`}>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white flex items-center justify-center gap-3">
                        <span className="text-2xl sm:text-3xl">{section.icon}</span>
                        {section.title}
                      </h2>
                    </div>
                  </div>

                  {/* Section Members */}
                  <div className="bg-black/15 backdrop-blur-md rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/10 shadow-2xl">
                    
                    {/* FIXED: Combined Leadership Layout - Always side by side */}
                    {section.isLeadership ? (
                      <div className="grid grid-cols-1 min-[500px]:grid-cols-2 gap-8 sm:gap-12 max-w-4xl mx-auto">
                        {section.members.map((member, index) => (
                          <div
                            key={member.id}
                            className="group cursor-pointer transform hover:scale-110 hover:-translate-y-3 transition-all duration-500"
                            style={{ 
                              animationDelay: `${(sectionIndex * 3 + index) * 0.15}s`
                            }}
                          >
                            {/* Presidential Card - Enhanced */}
                            <div className="bg-gradient-to-br from-purple-600/30 via-blue-500/30 to-purple-800/30 backdrop-blur-sm rounded-3xl p-6 border border-purple-400/30 hover:border-purple-400/60 hover:shadow-purple-500/30 hover:shadow-2xl transition-all duration-500">
                              
                              {/* Avatar - Responsive leadership size */}
                              <div className="relative mb-6">
                                <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 via-blue-400 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                                
                                <div className="relative w-28 h-28 sm:w-36 sm:h-36 mx-auto rounded-3xl overflow-hidden border-3 border-white/40 group-hover:border-blue-400/70 transition-all duration-500 shadow-2xl">
                                  <img
                                    src={member.image_url || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojOTMzM2VhO3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMzYjgyZjY7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIgcng9IjE2Ii8+CiAgPGNpcmNsZSBjeD0iMTAwIiBjeT0iNzAiIHI9IjMwIiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjgiLz4KICA8cGF0aCBkPSJNNjAgMTYwIEMgNjAgMTMwIDc1IDExMCAxMDAgMTEwIEMgMTI1IDExMCAxNDAgMTMwIDE0MCAxNjAgWiIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC44Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSIxODUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgb3BhY2l0eT0iMC42Ij5UZWFtPC90ZXh0Pgo8L3N2Zz4K'}
                                    alt={member.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    onError={(e) => {
                                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojOTMzM2VhO3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMzYjgyZjY7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIgcng9IjE2Ii8+CiAgPGNpcmNsZSBjeD0iMTAwIiBjeT0iNzAiIHI9IjMwIiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjgiLz4KICA8cGF0aCBkPSJNNjAgMTYwIEMgNjAgMTMwIDc1IDExMCAxMDAgMTEwIEMgMTI1IDExMCAxNDAgMTMwIDE0MCAxNjAgWiIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC44Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSIxODUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgb3BhY2l0eT0iMC42Ij5UZWFtPC90ZXh0Pgo8L3N2Zz4K';
                                    }}
                                  />
                                </div>
                              </div>

                              {/* Member Info - Enhanced for leadership */}
                              <div className="text-center group-hover:-translate-y-1 transition-transform duration-500">
                                <h3 className="text-white font-black text-base sm:text-lg md:text-xl mb-2 drop-shadow-lg group-hover:text-blue-200 transition-colors duration-500">
                                  {member.name}
                                </h3>
                                <div className="inline-block bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-full px-3 py-1 mb-3 border border-purple-400/30">
                                  <p className="text-purple-300 text-xs sm:text-sm font-bold uppercase tracking-wide group-hover:text-blue-300 transition-colors duration-500">
                                    {member.role?.includes('PRESIDENT') ? '👑 ' + member.role : '🎖️ ' + member.role}
                                  </p>
                                </div>
                                
                                {member.bio && (
                                  <p className="text-white/80 text-sm leading-relaxed mt-2">
                                    {member.bio}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      /* Regular Grid Layout for Other Roles - IMPROVED RESPONSIVE */
                      <div className="grid grid-cols-2 min-[500px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4 sm:gap-6 justify-items-center">
                        {section.members.map((member, index) => (
                          <div
                            key={member.id}
                            className="group cursor-pointer transform hover:scale-110 hover:-translate-y-3 transition-all duration-500 animate-fadeInUp w-full max-w-[160px]"
                            style={{ 
                              animationDelay: `${(sectionIndex * 3 + index) * 0.15}s`
                            }}
                          >
                            {/* Regular Team Member Card */}
                            <div className="bg-gradient-to-br from-purple-600/20 via-blue-500/20 to-purple-800/20 backdrop-blur-sm rounded-3xl p-4 border border-purple-400/20 hover:border-purple-400/50 hover:shadow-purple-500/20 hover:shadow-2xl transition-all duration-500">
                              
                              {/* Avatar */}
                              <div className="relative mb-4">
                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-blue-400 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                                
                                <div className="relative w-full aspect-square rounded-2xl overflow-hidden border-2 border-white/30 group-hover:border-blue-400/60 transition-all duration-500 shadow-xl">
                                  <img
                                    src={member.image_url || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojOTMzM2VhO3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA<c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMzYjgyZjY7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIgcng9IjE2Ii8+CiAgPGNpcmNsZSBjeD0iMTAwIiBjeT0iNzAiIHI9IjMwIiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjgiLz4KICA8cGF0aCBkPSJNNjAgMTYwIEMgNjAgMTMwIDc1IDExMCAxMDAgMTEwIEMgMTI1IDExMCAxNDAgMTMwIDE0MCAxNjAgWiIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC44Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSIxODUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgb3BhY2l0eT0iMC42Ij5UZWFtPC90ZXh0Pgo8L3N2Zz4K'}
                                    alt={member.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    onError={(e) => {
                                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojOTMzM2VhO3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMzYjgyZjY7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIgcng9IjE2Ii8+CiAgPGNpcmNsZSBjeD0iMTAwIiBjeT0iNzAiIHI9IjMwIiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjgiLz4KICA8cGF0aCBkPSJNNjAgMTYwIEMgNjAgMTMwIDc1IDExMCAxMDAgMTEwIEMgMTI1IDExMCAxNDAgMTMwIDE0MCAxNjAgWiIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC44Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSIxODUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgb3BhY2l0eT0iMC42Ij5UZWFtPC90ZXh0Pgo8L3N2Zz4K';
                                    }}
                                  />
                                </div>
                              </div>

                              {/* Member Info */}
                              <div className="text-center group-hover:-translate-y-1 transition-transform duration-500">
                                <h3 className="text-white font-bold text-sm mb-1 drop-shadow-lg group-hover:text-blue-200 transition-colors duration-500 line-clamp-2">
                                  {member.name}
                                </h3>
                                <p className="text-purple-300 text-xs font-semibold uppercase tracking-wide group-hover:text-blue-300 transition-colors duration-500 line-clamp-1">
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
                </div>
              ))}
            </div>
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
