import { useEffect, useState } from "react";

export default function Prize() {
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTitles();
  }, []);

  const fetchTitles = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/freshers-titles');
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
      color: "from-red-500 via-yellow-400 to-red-500" // Updated to match theme
    },
    {
      title: "Miss Freshers 2025", 
      icon: "👸",
      description: "The most graceful lady",
      winner: getTitleData('miss'),
      color: "from-yellow-500 via-red-400 to-yellow-500" // Updated to match theme
    }
  ];

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
          <h2 className="text-2xl font-bold text-white">Loading Winners...</h2>
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
              ✨ Mister & Miss Freshers ✨
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 leading-tight drop-shadow-2xl">
            <span className="bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent block">
              CROWNING
            </span>
            <span className="bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 bg-clip-text text-transparent block">
              CEREMONY
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-yellow-100 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Celebrating the <span className="text-yellow-300 font-bold">stars</span> of our freshers batch
          </p>
        </div>

        {/* Winners Cards */}
        <div className="pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {titlesList.map((item, index) => (
              <div key={index} className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-black/80 via-red-900/40 to-black/80 backdrop-blur-sm border-2 border-yellow-400/20 hover:border-yellow-400/60 shadow-2xl hover:scale-105 transition-all duration-300 group">
                
                {/* Header with gradient */}
                <div className={`bg-gradient-to-r ${item.color} p-6 sm:p-8 text-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                  <div className="relative z-10">
                    <div className="text-4xl sm:text-5xl mb-3">{item.icon}</div>
                    <h3 className="text-xl sm:text-2xl font-black text-white mb-2">{item.title}</h3>
                    <p className="text-white/90 text-base sm:text-lg">{item.description}</p>
                  </div>
                </div>
                
                {/* Card Content */}
                <div className="p-6 sm:p-8 text-center">
                  {item.winner.winner_name ? (
                    <div>
                      <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6">
                        {item.winner.winner_image ? (
                          <img
                            src={item.winner.winner_image}
                            alt={item.winner.winner_name}
                            className="w-full h-full rounded-full object-cover border-4 border-yellow-400 shadow-2xl group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-red-500/20 to-yellow-500/20 rounded-full flex items-center justify-center border-4 border-yellow-400 shadow-2xl">
                            <span className="text-white text-3xl sm:text-4xl">{index === 0 ? '👤' : '👩'}</span>
                          </div>
                        )}
                      </div>
                      <h4 className="text-xl sm:text-2xl font-black text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">{item.winner.winner_name}</h4>
                      {item.winner.winner_bio && (
                        <p className="text-yellow-100/90 leading-relaxed text-sm sm:text-base">{item.winner.winner_bio}</p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <div className="w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-br from-red-900/30 to-yellow-900/30 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center border-4 border-dashed border-yellow-400/50">
                        <span className="text-yellow-400/70 text-4xl sm:text-5xl">?</span>
                      </div>
                      <div className="bg-gradient-to-r from-yellow-500/10 to-red-500/10 rounded-xl p-4 sm:p-6 border border-yellow-400/30">
                        <p className="text-yellow-300 font-bold text-base sm:text-lg mb-2">✨ To be announced soon!</p>
                        <p className="text-yellow-100/80 text-sm sm:text-base">
                          The crown awaits our {index === 0 ? 'king' : 'queen'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-yellow-400/10 rounded-full -translate-y-8 translate-x-8"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 bg-red-500/10 rounded-full translate-y-6 -translate-x-6"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Selection Process Information */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-red-900/20 via-black/40 to-yellow-900/20 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-yellow-400/20 shadow-2xl">
            <h4 className="text-xl sm:text-2xl font-black text-yellow-400 mb-4 sm:mb-6 flex items-center justify-center">
              <span className="mr-3">🎭</span> Selection Process
            </h4>
            <p className="text-yellow-100/90 leading-relaxed text-base sm:text-lg mb-6 sm:mb-8">
              Our Mister and Miss Freshers will be selected based on <span className="text-yellow-300 font-semibold">personality</span>, <span className="text-red-300 font-semibold">talent</span>, and <span className="text-yellow-300 font-semibold">stage presence</span>. 
              Stay tuned for the crowning ceremony during our grand Bollywood Night!
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-red-500/20 rounded-xl p-4 sm:p-6 border border-red-400/50 hover:bg-red-500/30 transition-colors">
                <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🏆</div>
                <h5 className="font-bold text-white text-sm sm:text-base mb-1">Competition</h5>
                <p className="text-red-300/80 text-xs sm:text-sm">Multiple rounds</p>
              </div>
              <div className="bg-yellow-500/20 rounded-xl p-4 sm:p-6 border border-yellow-400/50 hover:bg-yellow-500/30 transition-colors">
                <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🎪</div>
                <h5 className="font-bold text-white text-sm sm:text-base mb-1">Talent Show</h5>
                <p className="text-yellow-300/80 text-xs sm:text-sm">Showcase skills</p>
              </div>
              <div className="bg-gradient-to-br from-red-500/20 to-yellow-500/20 rounded-xl p-4 sm:p-6 border border-yellow-400/50 hover:from-red-500/30 hover:to-yellow-500/30 transition-colors">
                <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">👑</div>
                <h5 className="font-bold text-white text-sm sm:text-base mb-1">Crowning</h5>
                <p className="text-white/80 text-xs sm:text-sm">Grand finale</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Transition */}
      <div className="absolute bottom-0 left-0 w-full h-16 sm:h-24 bg-gradient-to-t from-black via-red-900/50 to-transparent"></div>
    </section>
  );
}
