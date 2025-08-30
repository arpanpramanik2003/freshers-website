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
      <section className="min-h-screen bg-gradient-to-br from-black via-red-900 to-yellow-600 relative overflow-hidden flex items-center justify-center px-4 py-8">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-red-900/40 to-yellow-600/20"></div>
          <div className="absolute top-0 left-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-red-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-24 h-24 sm:w-48 sm:h-48 bg-yellow-400/10 rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-yellow-400 border-t-4 border-red-500 mx-auto mb-8"></div>
          <h2 className="text-2xl font-bold text-white">Loading Store...</h2>
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
              ✨ T-shirts & Goodies ✨
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 leading-tight drop-shadow-2xl">
            <span className="bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent block">
              EXCLUSIVE
            </span>
            <span className="bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 bg-clip-text text-transparent block">
              MERCHANDISE
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-yellow-100 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Get your <span className="text-yellow-300 font-bold">official</span> Bollywood Night merchandise and exclusive goodies
          </p>
        </div>

        {/* Cards Section */}
        <div className="pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* T-Shirts Card */}
            <div className="bg-gradient-to-br from-black/80 via-red-900/40 to-black/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-yellow-400/20 hover:border-yellow-400/60 transition-all duration-300 group hover:scale-105">
              
              {/* T-shirt Image */}
              <div className="mb-6 flex items-center justify-center">
                {data.tshirt_photo_url ? (
                  <img
                    src={data.tshirt_photo_url}
                    alt="Official T-shirts"
                    className="w-full max-w-xs h-64 object-cover rounded-2xl border-2 border-yellow-400/30 group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik02MCA2MEgxNDBWMTQwSDYwVjYwWiIgZmlsbD0iI0QxRDVEQiIvPgo8dGV4dCB4PSIxMDAiIHk9IjExMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSIjNjc2Nzc3IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn4+VPC90ZXh0Pgo8L3N2Zz4=';
                    }}
                  />
                ) : (
                  <div className="w-full max-w-xs h-64 bg-gradient-to-br from-red-900/30 to-yellow-900/30 rounded-2xl flex items-center justify-center border-2 border-dashed border-yellow-400/50">
                    <span className="text-yellow-400/70 text-6xl">👕</span>
                  </div>
                )}
              </div>
              
              {/* T-shirt Content */}
              <div className="text-center">
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 group-hover:text-yellow-400 transition-colors duration-300 drop-shadow-lg">
                  Buy T-shirts
                </h3>
                <p className="text-yellow-100/90 mb-6 leading-relaxed">
                  Official Bollywood Night T-shirts with exclusive designs. Limited edition merchandise for true fans!
                </p>
                
                {data.tshirt_form_url ? (
                  <a
                    href={data.tshirt_form_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-red-500 via-red-500 to-yellow-500 hover:from-red-600 hover:via-red-600 hover:to-yellow-600 text-white px-8 py-4 rounded-2xl font-black text-lg transition-all transform hover:scale-105 shadow-2xl border-2 border-white/20 uppercase tracking-wide"
                  >
                    🛒 Order Now
                  </a>
                ) : (
                  <div className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl border-2 border-gray-400/30 inline-block">
                    Coming Soon
                  </div>
                )}
              </div>
            </div>

            {/* Goodies Card */}
            <div className="bg-gradient-to-br from-black/80 via-red-900/40 to-black/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-yellow-400/20 hover:border-yellow-400/60 transition-all duration-300 group hover:scale-105">
              
              {/* Goodies Image */}
              <div className="mb-6 flex items-center justify-center">
                {data.goodies_photo_url ? (
                  <img
                    src={data.goodies_photo_url}
                    alt="Free Goodies"
                    className="w-full max-w-xs h-64 object-cover rounded-2xl border-2 border-yellow-400/30 group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik02MCA2MEgxNDBWMTQwSDYwVjYwWiIgZmlsbD0iI0QxRDVEQiIvPgo8dGV4dCB4PSIxMDAiIHk9IjExMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSIjNjc2Nzc3IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn4iIPC90ZXh0Pgo8L3N2Zz4=';
                    }}
                  />
                ) : (
                  <div className="w-full max-w-xs h-64 bg-gradient-to-br from-red-900/30 to-yellow-900/30 rounded-2xl flex items-center justify-center border-2 border-dashed border-yellow-400/50">
                    <span className="text-yellow-400/70 text-6xl">🎁</span>
                  </div>
                )}
              </div>
              
              {/* Goodies Content */}
              <div className="text-center">
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 group-hover:text-yellow-400 transition-colors duration-300 drop-shadow-lg">
                  Free Gifts
                </h3>
                <p className="text-yellow-100/90 mb-6 leading-relaxed">
                  Exclusive goodies for your love of Bollywood! Special surprises for our amazing community.
                </p>
                
                <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-xl p-4 border border-green-400/50">
                  <p className="text-green-300 font-bold text-lg mb-2">✨ Absolutely FREE!</p>
                  <p className="text-green-200/80 text-sm">
                    No purchase needed. Just show your love for Bollywood Night!
                  </p>
                </div>
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
