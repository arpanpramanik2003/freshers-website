import { useEffect, useState } from "react";

export default function Sponsors() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchSponsors = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/sponsors");
      const data = await response.json();
      
      if (data && data.length > 0) {
        setSponsors(data);
      } else {
        // Fallback sponsors for demo
        setSponsors([
          { id: 1, name: "TechNova", logo_url: "/images/s1.png" },
          { id: 2, name: "Foodiez", logo_url: "/images/s2.png" },
          { id: 3, name: "StyleHub", logo_url: "/images/s3.png" },
          { id: 4, name: "MusicBeats", logo_url: "/images/s4.png" },
        ]);
      }
    } catch (error) {
      console.error('Failed to fetch sponsors:', error);
      // Fallback sponsors on error
      setSponsors([
        { id: 1, name: "TechNova", logo_url: "/images/s1.png" },
        { id: 2, name: "Foodiez", logo_url: "/images/s2.png" },
        { id: 3, name: "StyleHub", logo_url: "/images/s3.png" },
        { id: 4, name: "MusicBeats", logo_url: "/images/s4.png" },
      ]);
    } finally {
      setLoading(false);
    }
  };

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
          <h2 className="text-2xl font-bold text-white">Loading Sponsors...</h2>
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
        <div className="absolute bottom-0 right-1/4 w-24 h-24 sm:w-48 sm:h-48 bg-yellow-400/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 right-5 sm:top-20 sm:right-20 w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-16 left-5 sm:bottom-32 sm:left-16 w-1 h-1 sm:w-2 sm:h-2 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/4 left-3 sm:top-1/3 sm:left-10 w-1 h-1 bg-yellow-300 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-4 sm:mb-6">
            <div className="bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 text-white px-4 py-2 sm:px-8 sm:py-3 rounded-full text-xs sm:text-sm font-black uppercase tracking-widest border-2 border-yellow-400/50 shadow-2xl">
              ✨ Our Sponsors ✨
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 leading-tight drop-shadow-2xl">
            <span className="bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent block">
              AMAZING
            </span>
            <span className="bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 bg-clip-text text-transparent block">
              PARTNERS
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-yellow-100 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Thanks to our <span className="text-yellow-300 font-bold">incredible sponsors</span> who make Bollywood Night possible
          </p>
        </div>

        {/* Sponsors Content - FLEXIBLE LAYOUT */}
        <div className="pb-16">
          {sponsors.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
              {sponsors.map((sponsor, index) => (
                <div 
                  key={sponsor.id} 
                  className="bg-gradient-to-br from-black/80 via-red-900/40 to-black/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl hover:shadow-xl transition-all duration-300 group text-center border-2 border-yellow-400/20 hover:border-yellow-400/60 transform hover:-translate-y-2 hover:scale-105 min-w-[200px] max-w-[280px] flex-grow-0 flex-shrink-0"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    flex: '0 1 auto'
                  }}
                >
                  {/* Logo Container */}
                  <div className="mb-4 sm:mb-6 flex items-center justify-center h-16 sm:h-20">
                    <img 
                      src={sponsor.logo_url} 
                      alt={sponsor.name}
                      className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300 filter brightness-90 group-hover:brightness-100"
                      style={{ maxWidth: '150px', maxHeight: '60px' }}
                      onError={(e) => {
                        console.log('Failed to load sponsor image:', sponsor.name, sponsor.logo_url);
                        // Fallback to text if image fails
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                  
                  {/* Sponsor Name */}
                  <h4 className="font-bold text-white text-base sm:text-lg group-hover:text-yellow-400 transition-colors duration-300 drop-shadow-lg">
                    {sponsor.name}
                  </h4>
                  
                  {/* Bottom accent */}
                  <div className="mt-4 h-1 bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="bg-gradient-to-br from-black/80 via-red-900/40 to-black/80 backdrop-blur-sm rounded-3xl p-12 sm:p-16 border-2 border-yellow-400/30 shadow-2xl max-w-2xl mx-auto">
                <div className="text-6xl sm:text-8xl mb-8 animate-bounce">🤝</div>
                <h3 className="text-3xl sm:text-4xl font-black text-white mb-6 drop-shadow-lg">
                  <span className="bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
                    Sponsor Slots Available!
                  </span>
                </h3>
                <p className="text-yellow-100/80 text-lg sm:text-xl leading-relaxed mb-8">
                  Join us as a sponsor and be part of this amazing Bollywood Night celebration.
                  <span className="block mt-2 text-red-300 font-semibold">Let's create magic together!</span>
                </p>
                
                <button className="bg-gradient-to-r from-red-500 via-red-500 to-yellow-500 hover:from-red-600 hover:via-red-600 hover:to-yellow-600 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-black text-lg sm:text-xl transition-all transform hover:scale-105 shadow-2xl border-2 border-white/20 uppercase tracking-wide">
                  Contact Us to Sponsor
                </button>
                
                {/* Decorative elements */}
                <div className="flex justify-center gap-4 mt-8">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
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
