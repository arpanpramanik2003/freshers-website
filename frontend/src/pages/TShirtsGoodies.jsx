import { useEffect, useState } from "react";
import { API_BASE_URL } from '../config/api';

export default function TShirtsGoodies() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/tshirts-goodies`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback data
        setData({
          tshirt_photo_url: "/images/default-tshirt.jpg",
          tshirt_form_url: "https://forms.google.com/",
          goodies_photo_url: "/images/default-gifts.jpg"
        });
        setLoading(false);
      });
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
          <h2 className="text-2xl font-bold text-white drop-shadow-lg">Loading Store...</h2>
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

      {/* Floating animations - Enhanced */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-1/4 w-3 h-3 bg-purple-400 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-32 right-1/3 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-50" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-1/5 w-4 h-4 bg-purple-500 rounded-full animate-ping opacity-40" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 right-1/4 w-2 h-2 bg-blue-300 rounded-full animate-bounce opacity-70" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 right-1/6 w-1 h-1 bg-purple-300 rounded-full animate-pulse opacity-50" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-white drop-shadow-2xl">
            MERCHANDISE
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/80 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Get your <span className="text-purple-300 font-bold">official</span> ABHIGRAHA merchandise and exclusive <span className="text-blue-300 font-bold">goodies</span>
          </p>
        </div>

        {/* Cards Section - COMPACT SIZE */}
        <div className="bg-black/15 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl mb-12">
          
          {/* COMPACT: Smaller grid with equal heights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch max-w-4xl mx-auto">
            
            {/* T-Shirts Card - COMPACT */}
            <div className="group cursor-pointer transform hover:scale-105 transition-all duration-500 h-full">
              <div className="bg-gradient-to-br from-purple-600/20 via-blue-500/20 to-purple-800/20 backdrop-blur-lg rounded-2xl p-5 border border-purple-400/20 hover:border-purple-400/50 hover:shadow-purple-500/20 hover:shadow-xl transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-purple-600/30 group-hover:via-blue-500/30 group-hover:to-purple-800/30 h-full flex flex-col">
                
                {/* T-shirt Image - SMALLER */}
                <div className="mb-4 flex items-center justify-center flex-shrink-0">
                  <div className="relative">
                    {/* Glow ring */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-blue-400 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                    
                    {data.tshirt_photo_url ? (
                      <img
                        src={data.tshirt_photo_url}
                        alt="Official T-shirts"
                        className="relative w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-2xl border-2 border-white/30 group-hover:border-blue-400/60 group-hover:scale-110 transition-all duration-500 shadow-xl"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojOTMzM2VhO3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMzYjgyZjY7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIgcng9IjE2Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIzNiIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkZU8L3RleHQ+Cjwvc3ZnPgo=';
                        }}
                      />
                    ) : (
                      <div className="relative w-40 h-40 sm:w-48 sm:h-48 bg-gradient-to-br from-purple-600/30 to-blue-600/30 rounded-2xl flex items-center justify-center border-2 border-dashed border-purple-400/50 shadow-xl">
                        <span className="text-purple-300 text-4xl sm:text-5xl animate-bounce">👕</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* T-shirt Content - COMPACT */}
                <div className="text-center group-hover:-translate-y-1 transition-transform duration-500 flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl font-black text-white mb-3 group-hover:text-purple-200 transition-colors duration-300 drop-shadow-lg">
                    Official T-Shirts
                  </h3>
                  
                  {/* Description - SHORTER */}
                  <div className="flex-grow mb-4">
                    <p className="text-white/90 leading-relaxed text-sm">
                      Exclusive designs with premium quality fabric. Limited edition!
                    </p>
                  </div>
                  
                  {/* Button - Always at bottom */}
                  <div className="mt-auto">
                    {data.tshirt_form_url ? (
                      <a
                        href={data.tshirt_form_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 hover:from-purple-700 hover:via-purple-600 hover:to-blue-700 backdrop-blur-sm text-white px-5 py-3 rounded-xl font-bold text-sm transition-all transform hover:scale-105 shadow-xl border border-white/20 uppercase tracking-wide"
                      >
                        🛒 Order Now
                      </a>
                    ) : (
                      <div className="bg-black/40 backdrop-blur-sm text-white px-5 py-3 rounded-xl font-bold text-sm shadow-xl border border-white/20 inline-block">
                        <span className="animate-pulse">⏳ Coming Soon</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Goodies Card - COMPACT */}
            <div className="group cursor-pointer transform hover:scale-105 transition-all duration-500 h-full">
              <div className="bg-gradient-to-br from-blue-600/20 via-purple-500/20 to-blue-800/20 backdrop-blur-lg rounded-2xl p-5 border border-blue-400/20 hover:border-blue-400/50 hover:shadow-blue-500/20 hover:shadow-xl transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-blue-600/30 group-hover:via-purple-500/30 group-hover:to-blue-800/30 h-full flex flex-col">
                
                {/* Goodies Image - SMALLER (same size as T-shirt) */}
                <div className="mb-4 flex items-center justify-center flex-shrink-0">
                  <div className="relative">
                    {/* Glow ring */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-400 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                    
                    {data.goodies_photo_url ? (
                      <img
                        src={data.goodies_photo_url}
                        alt="Free Goodies"
                        className="relative w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-2xl border-2 border-white/30 group-hover:border-purple-400/60 group-hover:scale-110 transition-all duration-500 shadow-xl"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQyIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzNiODJmNjtzdG9wLW9wYWNpdHk6MSIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojOTMzM2VhO3N0b3Atb3BhY2l0eToxIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmFkaWVudDIpIiByeD0iMTYiLz4KICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjM2IiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+8J+OgTwvdGV4dD4KPC9zdmc+Cg==';
                        }}
                      />
                    ) : (
                      <div className="relative w-40 h-40 sm:w-48 sm:h-48 bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-2xl flex items-center justify-center border-2 border-dashed border-blue-400/50 shadow-xl">
                        <span className="text-blue-300 text-4xl sm:text-5xl animate-bounce">🎁</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Goodies Content - COMPACT */}
                <div className="text-center group-hover:-translate-y-1 transition-transform duration-500 flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl font-black text-white mb-3 group-hover:text-blue-200 transition-colors duration-300 drop-shadow-lg">
                    Exclusive Goodies
                  </h3>
                  
                  {/* Description - SHORTER */}
                  <div className="flex-grow mb-4">
                    <p className="text-white/90 leading-relaxed text-sm">
                      Amazing freebies and surprise gifts for our community!
                    </p>
                  </div>
                  
                  {/* FREE Badge - Always at bottom, COMPACT */}
                  <div className="mt-auto">
                    <div className="bg-gradient-to-r from-green-500/30 to-emerald-500/30 backdrop-blur-sm rounded-xl p-3 border border-green-400/40 hover:border-green-400/60 transition-colors duration-300">
                      <div className="flex items-center justify-center mb-1">
                        <span className="text-lg mr-1 animate-pulse">✨</span>
                        <p className="text-green-200 font-black text-sm drop-shadow-md">
                          Absolutely FREE!
                        </p>
                        <span className="text-lg ml-1 animate-pulse">✨</span>
                      </div>
                      <p className="text-green-100 text-xs leading-relaxed">
                        No purchase needed. Just show your love!
                      </p>
                    </div>
                  </div>
                </div>
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
