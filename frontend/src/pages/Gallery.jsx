import { useEffect, useState } from "react";
import { API_BASE_URL } from '../config/api';

export default function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/gallery`)
      .then((res) => res.json())
      .then((data) => {
        setGallery(data);
        setLoading(false);
      })
      .catch(() => {
        const fallbackImages = [
          { id: 1, image_url: "/images/g1.jpg", caption: "Bollywood Night" },
          { id: 2, image_url: "/images/g2.jpg", caption: "Dance Performance" },
          { id: 3, image_url: "/images/g3.jpg", caption: "Cultural Show" },
          { id: 4, image_url: "/images/g4.jpg", caption: "Fashion Walk" },
        ];
        setGallery(fallbackImages);
        setLoading(false);
      });
  }, []);

  const navigateImage = (direction) => {
    const currentIndex = gallery.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? gallery.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === gallery.length - 1 ? 0 : currentIndex + 1;
    }
    
    setSelectedImage(gallery[newIndex]);
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
          <h2 className="text-2xl font-bold text-white drop-shadow-lg">Loading Gallery...</h2>
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
        <div className="absolute top-3/4 left-1/3 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-60" style={{animationDelay: '5s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-white drop-shadow-2xl">
            GALLERY
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/80 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Highlights from past editions and <span className="text-purple-300 font-bold">unforgettable</span> memories from our <span className="text-blue-300 font-bold">Bollywood Nights</span>
          </p>
        </div>

        {/* Gallery Content */}
        <div className="pb-16">
          {gallery.length > 0 ? (
            /* Main Gallery Container */
            <div className="bg-black/15 backdrop-blur-md rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/10 shadow-2xl">
              
              {/* Photo Grid - Enhanced */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {gallery.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="group cursor-pointer transform hover:scale-105 transition-all duration-500"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    {/* Photo Card */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600/20 via-blue-500/20 to-purple-800/20 backdrop-blur-sm border border-purple-400/20 hover:border-purple-400/50 hover:shadow-purple-500/20 hover:shadow-xl transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-purple-600/30 group-hover:via-blue-500/30 group-hover:to-purple-800/30"
                      onClick={() => setSelectedImage(item)}
                    >
                      
                      {/* Image Container - Fixed aspect ratio */}
                      <div className="aspect-square overflow-hidden relative">
                        {/* Glow effect on hover */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-blue-400 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse -z-10"></div>
                        
                        <img 
                          src={item.image_url} 
                          alt={item.caption || `Gallery ${item.id}`} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ2FsbGVyeUdyYWRpZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzkzMzNlYTtzdG9wLW9wYWNpdHk6MSIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSI1MCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMzYjgyZjY7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzkzMzNlYTtzdG9wLW9wYWNpdHk6MSIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ2FsbGVyeUdyYWRpZW50KSIgcng9IjI0Ii8+CiAgPGNpcmNsZSBjeD0iMTUwIiBjeT0iMTIwIiByPSI0MCIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC44Ii8+CiAgPHJlY3QgeD0iMTEwIiB5PSIxNzAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI2MCIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC44IiByeD0iOCIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iMjYwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIG9wYWNpdHk9IjAuOCI+R2FsbGVyeTwvdGV4dD4KPC9zdmc+Cg==';
                          }}
                        />
                        
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      
                      {/* Caption overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h4 className="font-bold text-white text-xs sm:text-sm drop-shadow-lg line-clamp-2">
                          {item.caption || "Bollywood Night"}
                        </h4>
                        <p className="text-blue-200 text-xs mt-1 hidden sm:block">Click to view</p>
                      </div>
                      
                      {/* Click indicator */}
                      <div className="absolute top-3 right-3 w-8 h-8 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-lg">🔍</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* No Gallery State */
            <div className="text-center py-20">
              <div className="bg-black/15 backdrop-blur-md rounded-3xl p-12 sm:p-16 border border-white/10 shadow-2xl max-w-2xl mx-auto hover:scale-105 hover:shadow-purple-500/20 hover:shadow-2xl transition-all duration-500">
                <div className="text-6xl sm:text-8xl mb-8 animate-bounce">📷</div>
                <h3 className="text-3xl sm:text-4xl font-black text-white mb-6 drop-shadow-lg">
                  Gallery Coming Soon!
                </h3>
                <p className="text-white/80 text-lg sm:text-xl leading-relaxed">
                  Amazing photos from Bollywood Night will be uploaded here.
                  <span className="block mt-2 text-purple-300 font-semibold">Stay tuned for the memories!</span>
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
      </div>

      {/* Enhanced Full Screen Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-lg flex items-center justify-center z-50 p-2 sm:p-4 animate-fade-in"
          style={{
            backgroundImage: 'url(/stage-background.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          {/* Dark overlay for modal */}
          <div className="absolute inset-0 bg-black/80"></div>
          
          {/* Modal Container */}
          <div className="relative w-full h-full max-w-6xl max-h-full flex items-center justify-center z-10">
            
            {/* Image Container */}
            <div className="relative max-w-full max-h-full flex items-center justify-center">
              {/* Glow effect around modal image */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-blue-400/20 to-purple-600/20 rounded-3xl blur-2xl animate-pulse"></div>
              
              <img 
                src={selectedImage.image_url} 
                alt={selectedImage.caption}
                className="relative max-w-full max-h-[85vh] sm:max-h-[90vh] w-auto h-auto object-contain rounded-2xl shadow-2xl border-2 border-purple-400/50 backdrop-blur-sm"
                style={{
                  minWidth: '300px',
                  minHeight: '200px',
                  maxWidth: '95vw',
                  maxHeight: '90vh'
                }}
              />
            </div>
            
            {/* Caption with glassmorphism */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 bg-black/40 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-white/20">
              <h4 className="text-white text-lg sm:text-xl md:text-2xl font-black text-center drop-shadow-lg">
                {selectedImage.caption || "Bollywood Night Memory"}
              </h4>
              <p className="text-purple-200 text-sm sm:text-base text-center mt-1">
                Image {gallery.findIndex(img => img.id === selectedImage.id) + 1} of {gallery.length}
              </p>
            </div>
            
            {/* Close button */}
            <button 
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 bg-gradient-to-r from-red-500/90 to-red-600/90 hover:from-red-600/90 hover:to-red-700/90 backdrop-blur-sm text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-2xl border-2 border-white/20 transition-all transform hover:scale-110"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              aria-label="Close modal"
            >
              ×
            </button>
            
            {/* Navigation buttons */}
            {gallery.length > 1 && (
              <>
                <button 
                  className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-purple-500/90 to-purple-600/90 hover:from-purple-600/90 hover:to-purple-700/90 backdrop-blur-sm text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-2xl border-2 border-white/20 transition-all transform hover:scale-110"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('prev');
                  }}
                  aria-label="Previous image"
                >
                  ‹
                </button>
                
                <button 
                  className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-blue-500/90 to-blue-600/90 hover:from-blue-600/90 hover:to-blue-700/90 backdrop-blur-sm text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-2xl border-2 border-white/20 transition-all transform hover:scale-110"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('next');
                  }}
                  aria-label="Next image"
                >
                  ›
                </button>
              </>
            )}
          </div>
          
          {/* Click outside to close */}
          <div 
            className="absolute inset-0 -z-10"
            onClick={() => setSelectedImage(null)}
          ></div>
        </div>
      )}

      {/* Bottom padding */}
      <div className="h-16 sm:h-20"></div>
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
