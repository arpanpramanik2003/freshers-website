import { useEffect, useState } from "react";
import { API_BASE_URL } from '../config/api';

export default function Sponsors() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchSponsors = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/sponsors`);
      const data = await response.json();
      
      // Only set sponsors if data exists from backend
      if (data && data.length > 0) {
        setSponsors(data);
      } else {
        setSponsors([]); // Empty array if no sponsors
      }
    } catch (error) {
      console.error('Failed to fetch sponsors:', error);
      setSponsors([]); // Empty array on error
    } finally {
      setLoading(false);
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
          <h2 className="text-2xl font-bold text-white drop-shadow-lg">Loading Sponsors...</h2>
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
      <div className="absolute"></div>

      {/* Floating animations - Enhanced */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-1/4 w-3 h-3 bg-purple-400 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-32 right-1/3 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-50" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-1/5 w-4 h-4 bg-purple-500 rounded-full animate-ping opacity-40" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 right-1/4 w-2 h-2 bg-blue-300 rounded-full animate-bounce opacity-70" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 right-1/6 w-1 h-1 bg-purple-300 rounded-full animate-pulse opacity-50" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-3/4 left-1/3 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-60" style={{animationDelay: '5s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-white drop-shadow-2xl">
            OUR SPONSORS
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/80 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Thanks to our <span className="text-purple-300 font-bold">incredible sponsors</span> who make ABHIGRAHA <span className="text-blue-300 font-bold">possible</span>
          </p>
        </div>

        {/* Sponsors Content */}
        <div className="pb-16">
          {sponsors.length > 0 ? (
            /* Main Sponsors Container */
            <div className="bg-black/15 backdrop-blur-md rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/10 shadow-2xl">
              
              {/* Sponsors Grid - FIXED ALIGNMENT */}
              <div className="flex flex-wrap justify-center gap-8 sm:gap-12 lg:gap-16">
                {sponsors.map((sponsor, index) => (
                  <div 
                    key={sponsor.id} 
                    className="group cursor-pointer transform hover:scale-110 transition-all duration-500 text-center"
                    style={{
                      animationDelay: `${index * 0.15}s`,
                      minWidth: '120px',
                      maxWidth: '160px'
                    }}
                  >
                    {/* FIXED: Circular Logo Container with Perfect Alignment */}
                    <div className="relative mb-4 mx-auto w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28">
                      
                      {/* FIXED: Outer Glow Ring - Perfectly Centered */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-400 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse blur-sm scale-110"></div>
                      
                      {/* FIXED: Outer Ring - Perfectly Aligned */}
                      <div className="absolute inset-0 border border-white/10 group-hover:border-white/30 rounded-full transition-colors duration-500 scale-105"></div>
                      
                      {/* Main Circle Container - Base Size */}
                      <div className="relative w-full h-full bg-gradient-to-br from-purple-600/30 via-blue-500/30 to-purple-800/30 backdrop-blur-lg rounded-full border-2 border-white/20 group-hover:border-purple-400/60 shadow-2xl group-hover:shadow-purple-500/30 transition-all duration-500 flex items-center justify-center overflow-hidden">
                        
                        {/* Logo Image */}
                        <img 
                          src={sponsor.logo_url} 
                          alt={sponsor.name}
                          loading="lazy"
                          className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain group-hover:scale-110 transition-transform duration-500 filter brightness-90 group-hover:brightness-110"
                          onError={(e) => {
                            // Fallback to company initial if image fails
                            e.target.style.display = 'none';
                            const fallback = e.target.nextElementSibling;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                        
                        {/* Fallback Text (hidden by default) */}
                        <div className="hidden w-full h-full items-center justify-center text-white font-black text-base sm:text-lg lg:text-xl">
                          {sponsor.name.charAt(0)}
                        </div>
                        
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Company Name */}
                    <h4 className="font-bold text-white text-sm sm:text-base lg:text-lg group-hover:text-purple-200 transition-colors duration-300 drop-shadow-lg px-2">
                      {sponsor.name}
                    </h4>
                    
                    {/* Animated underline */}
                    <div className="mt-2 h-0.5 bg-gradient-to-r from-purple-500 via-blue-400 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 mx-auto w-0 group-hover:w-full"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* No Sponsors State - Similar to Events/Team/Gallery */
            <div className="text-center py-20">
              <div className="bg-black/15 backdrop-blur-md rounded-3xl p-12 sm:p-16 border border-white/10 shadow-2xl max-w-2xl mx-auto">
                <div className="text-6xl sm:text-8xl mb-8 animate-bounce">🤝</div>
                <h3 className="text-3xl sm:text-4xl font-black text-white mb-6 drop-shadow-lg">
                  Sponsors Coming Soon!
                </h3>
                <p className="text-white/80 text-lg sm:text-xl leading-relaxed">
                  Amazing partnerships are being planned for ABHIGRAHA.
                  <span className="block mt-2 text-purple-300 font-semibold">Stay tuned for updates!</span>
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

        {/* Partnership Benefits Section */}
        <div className="bg-black/15 backdrop-blur-md rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/10 shadow-2xl">
          <div className="text-center max-w-4xl mx-auto">
            <h4 className="text-2xl sm:text-3xl font-black text-white mb-6 flex items-center justify-center group cursor-pointer">
              <span className="mr-4 text-3xl sm:text-4xl group-hover:animate-spin transition-transform duration-500">🎯</span> 
              Why Partner With Us?
              <span className="ml-4 text-3xl sm:text-4xl group-hover:animate-spin transition-transform duration-500">🎯</span>
            </h4>
            
            <p className="text-white/90 leading-relaxed text-base sm:text-lg lg:text-xl mb-8 lg:mb-12 drop-shadow-md">
              Partner with ABHIGRAHA to reach a 
              <span className="text-purple-300 font-bold"> vibrant community</span> and 
              showcase your brand to our 
              <span className="text-blue-300 font-bold"> enthusiastic audience</span>!
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
              <div className="bg-purple-500/20 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-purple-400/30 hover:border-purple-400/60 hover:bg-purple-500/30 hover:scale-105 transition-all duration-300 group cursor-pointer">
                <div className="text-4xl lg:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🎤</div>
                <h5 className="font-black text-white text-base lg:text-lg mb-2 drop-shadow-md">Brand Visibility</h5>
                <p className="text-purple-200 text-sm lg:text-base">Maximum exposure to our audience</p>
              </div>
              
              <div className="bg-blue-500/20 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-blue-400/30 hover:border-blue-400/60 hover:bg-blue-500/30 hover:scale-105 transition-all duration-300 group cursor-pointer">
                <div className="text-4xl lg:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🌟</div>
                <h5 className="font-black text-white text-base lg:text-lg mb-2 drop-shadow-md">Community Impact</h5>
                <p className="text-blue-200 text-sm lg:text-base">Support cultural celebrations</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/30 hover:border-white/50 hover:from-purple-500/30 hover:to-blue-500/30 hover:scale-105 transition-all duration-300 group cursor-pointer">
                <div className="text-4xl lg:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🤝</div>
                <h5 className="font-black text-white text-base lg:text-lg mb-2 drop-shadow-md">Long-term Partnership</h5>
                <p className="text-white text-sm lg:text-base">Build lasting relationships</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom padding */}
        <div className="h-16 sm:h-20"></div>
      </div>
    </section>
  );
}
