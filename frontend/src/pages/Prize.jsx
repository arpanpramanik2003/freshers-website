import { useEffect, useState } from "react";
import { API_BASE_URL } from '../config/api';

export default function Prize() {
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTitles();
  }, []);

  const fetchTitles = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/freshers-titles`);
      const data = await response.json();
      setTitles(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch freshers titles:', error);
      setLoading(false);
    }
  };

  const getTitleData = (titleType) => {
    return titles.find(t => t.title === titleType) || { winner_name: null, winner_image: null, winner_bio: null };
  };

  const titlesList = [
    {
      title: "Mister Freshers 2025",
      icon: "👑",
      description: "The most charming gentleman",
      winner: getTitleData('mister'),
      gradientHeader: "from-purple-600 via-blue-500 to-purple-700",
      glowColor: "shadow-purple-500/30",
      accentColor: "purple-400",
      questionColor: "text-purple-300",
      highlightColor: "text-purple-300"
    },
    {
      title: "Miss Freshers 2025", 
      icon: "👸",
      description: "The most graceful lady",
      winner: getTitleData('miss'),
      gradientHeader: "from-blue-500 via-purple-600 to-blue-600",
      glowColor: "shadow-blue-500/30", 
      accentColor: "blue-400",
      questionColor: "text-blue-300",
      highlightColor: "text-blue-300"
    }
  ];

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
          <h2 className="text-2xl font-bold text-white drop-shadow-lg">Loading Winners...</h2>
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
        <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-purple-300 rounded-full animate-pulse opacity-50" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-white drop-shadow-2xl">
            PRIZES & CROWNS
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/80 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Celebrating the <span className="text-purple-300 font-bold">stars</span> of our freshers batch
          </p>
        </div>

        {/* Winners Cards - Main Container */}
        <div className="bg-black/15 backdrop-blur-md rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/10 shadow-2xl mb-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {titlesList.map((item, index) => (
              <div 
                key={index} 
                className="group cursor-pointer transform hover:scale-105 transition-all duration-500"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                
                {/* Winner Card */}
                <div className={`relative overflow-hidden rounded-3xl bg-black/20 backdrop-blur-lg border border-white/20 hover:border-white/40 shadow-2xl hover:${item.glowColor} hover:shadow-2xl transition-all duration-500`}>
                  
                  {/* Animated Header */}
                  <div className={`bg-gradient-to-r ${item.gradientHeader} p-6 sm:p-8 text-center relative overflow-hidden`}>
                    {/* Animated shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    
                    <div className="relative z-10">
                      <div className="text-4xl sm:text-5xl mb-3 group-hover:scale-110 transition-transform duration-500">
                        {item.icon}
                      </div>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-2 group-hover:text-blue-100 transition-colors duration-300 drop-shadow-lg">
                        {item.title}
                      </h3>
                      <p className="text-white/90 text-base sm:text-lg group-hover:text-white transition-colors duration-300 drop-shadow-md">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-6 sm:p-8 text-center">
                    {item.winner.winner_name ? (
                      /* Winner Announced */
                      <div className="group-hover:-translate-y-2 transition-transform duration-500">
                        <div className="relative w-32 h-32 sm:w-36 sm:h-36 mx-auto mb-6">
                          {/* Glow ring */}
                          <div className={`absolute -inset-2 bg-gradient-to-r ${index === 0 ? 'from-purple-400 to-purple-600' : 'from-blue-400 to-blue-600'} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse`}></div>
                          
                          {item.winner.winner_image ? (
                            <img
                              src={item.winner.winner_image}
                              alt={item.winner.winner_name}
                              className="relative w-full h-full rounded-full object-cover border-4 border-white/30 shadow-2xl group-hover:scale-110 group-hover:border-white/50 transition-all duration-500"
                            />
                          ) : (
                            <div className={`relative w-full h-full ${index === 0 ? 'bg-gradient-to-br from-purple-400/20 to-purple-500/20' : 'bg-gradient-to-br from-blue-400/20 to-blue-500/20'} rounded-full flex items-center justify-center border-4 border-white/30 shadow-2xl group-hover:border-white/50 transition-all duration-500`}>
                              <span className="text-white text-4xl sm:text-5xl">
                                {index === 0 ? '👤' : '👩'}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <h4 className={`text-2xl sm:text-3xl font-black text-white mb-4 ${index === 0 ? 'group-hover:text-purple-300' : 'group-hover:text-blue-300'} transition-colors duration-300 drop-shadow-lg`}>
                          {item.winner.winner_name}
                        </h4>
                        
                        {item.winner.winner_bio && (
                          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                            <p className="text-white/90 leading-relaxed text-sm sm:text-base">
                              {item.winner.winner_bio}
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      /* Winner TBA - FIXED VERSION */
                      <div className="group-hover:-translate-y-2 transition-transform duration-500">
                        <div className="relative w-32 h-32 sm:w-36 sm:h-36 mx-auto mb-6">
                          {/* Pulsing glow */}
                          <div className={`absolute -inset-2 ${index === 0 ? 'bg-gradient-to-r from-purple-400/30 to-purple-600/30' : 'bg-gradient-to-r from-blue-400/30 to-blue-600/30'} rounded-full animate-pulse`}></div>
                          
                          <div className={`relative w-full h-full ${index === 0 ? 'bg-gradient-to-br from-black/40 to-purple-400/20' : 'bg-gradient-to-br from-black/40 to-blue-400/20'} rounded-full flex items-center justify-center border-4 ${index === 0 ? 'border-dashed border-purple-400/60' : 'border-dashed border-blue-400/60'} shadow-2xl`}>
                            {/* FIXED: Question mark with proper color */}
                            <span className={`${index === 0 ? 'text-purple-300' : 'text-blue-300'} text-5xl sm:text-6xl animate-bounce font-black drop-shadow-lg`}>
                              ?
                            </span>
                          </div>
                        </div>
                        
                        {/* FIXED: Better contrast for "To be announced soon" */}
                        <div className="bg-black/50 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
                          <div className="flex items-center justify-center mb-3">
                            <span className="text-2xl mr-2 animate-pulse">✨</span>
                            {/* FIXED: Better color and contrast */}
                            <p className={`${index === 0 ? 'text-purple-200' : 'text-blue-200'} font-black text-lg sm:text-xl drop-shadow-lg`}>
                              To be announced soon!
                            </p>
                            <span className="text-2xl ml-2 animate-pulse">✨</span>
                          </div>
                          {/* FIXED: "queen" text with proper purple color */}
                          <p className="text-white text-base sm:text-lg drop-shadow-md">
                            The crown awaits our <span className={`${index === 0 ? 'text-purple-300' : 'text-blue-300'} font-black drop-shadow-lg`}>
                              {index === 0 ? 'king' : 'queen'}
                            </span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Decorative corner elements */}
                  <div className={`absolute top-0 right-0 w-20 h-20 ${index === 0 ? 'bg-purple-400/10' : 'bg-blue-400/10'} rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500`}></div>
                  <div className={`absolute bottom-0 left-0 w-16 h-16 bg-purple-500/10 rounded-full translate-y-8 -translate-x-8 group-hover:scale-150 transition-transform duration-500`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Selection Process - Enhanced */}
        <div className="bg-black/15 backdrop-blur-md rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/10 shadow-2xl">
          <div className="text-center max-w-4xl mx-auto">
            <h4 className="text-2xl sm:text-3xl font-black text-white mb-6 flex items-center justify-center group cursor-pointer drop-shadow-lg">
              <span className="mr-4 text-3xl sm:text-4xl group-hover:animate-spin transition-transform duration-500">🎭</span> 
              Selection Process
              <span className="ml-4 text-3xl sm:text-4xl group-hover:animate-spin transition-transform duration-500">🎭</span>
            </h4>
            
            <p className="text-white/90 leading-relaxed text-base sm:text-lg lg:text-xl mb-8 lg:mb-12 drop-shadow-md">
              Our Mister and Miss Freshers will be selected based on 
              <span className="text-purple-300 font-bold"> personality</span>, 
              <span className="text-blue-300 font-bold"> talent</span>, and 
              <span className="text-purple-300 font-bold"> stage presence</span>. 
              Stay tuned for the crowning ceremony during our grand ABHIGRAHA!
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
              <div className="bg-purple-500/20 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-purple-400/30 hover:border-purple-400/60 hover:bg-purple-500/30 hover:scale-105 transition-all duration-300 group cursor-pointer">
                <div className="text-4xl lg:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🏆</div>
                <h5 className="font-black text-white text-base lg:text-lg mb-2 drop-shadow-md">Competition</h5>
                <p className="text-purple-200 text-sm lg:text-base">Multiple exciting rounds</p>
              </div>
              
              <div className="bg-blue-500/20 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-blue-400/30 hover:border-blue-400/60 hover:bg-blue-500/30 hover:scale-105 transition-all duration-300 group cursor-pointer">
                <div className="text-4xl lg:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🎪</div>
                <h5 className="font-black text-white text-base lg:text-lg mb-2 drop-shadow-md">Talent Show</h5>
                <p className="text-blue-200 text-sm lg:text-base">Showcase your skills</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/30 hover:border-white/50 hover:from-purple-500/30 hover:to-blue-500/30 hover:scale-105 transition-all duration-300 group cursor-pointer">
                <div className="text-4xl lg:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">👑</div>
                <h5 className="font-black text-white text-base lg:text-lg mb-2 drop-shadow-md">Crowning</h5>
                <p className="text-white text-sm lg:text-base">Grand finale moment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom padding */}
        {/* <div className="h-16 sm:h-20"></div> */}
      </div>
    </section>
  );
}
