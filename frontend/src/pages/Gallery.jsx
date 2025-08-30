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
      <section className="min-h-screen bg-gradient-to-br from-black via-red-900 to-yellow-600 relative overflow-hidden flex items-center justify-center px-4 py-8">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-red-900/40 to-yellow-600/20"></div>
          <div className="absolute top-0 left-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-red-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-24 h-24 sm:w-48 sm:h-48 bg-yellow-400/10 rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-yellow-400 border-t-4 border-red-500 mx-auto mb-8"></div>
          <h2 className="text-2xl font-bold text-white">Loading Gallery...</h2>
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

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-4 sm:mb-6">
            <div className="bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 text-white px-4 py-2 sm:px-8 sm:py-3 rounded-full text-xs sm:text-sm font-black uppercase tracking-widest border-2 border-yellow-400/50 shadow-2xl">
              ✨ Our Gallery ✨
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 leading-tight drop-shadow-2xl">
            <span className="bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent block">
              MEMORABLE
            </span>
            <span className="bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 bg-clip-text text-transparent block">
              MOMENTS
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-yellow-100 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Highlights from past editions and <span className="text-yellow-300 font-bold">unforgettable</span> memories
          </p>
        </div>

        {/* Gallery Content */}
        <div className="pb-16">
          {gallery.length > 0 ? (
            <>
              {/* Photo Grid - Fixed aspect ratio containers */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                {gallery.map((item, index) => (
                  <figure 
                    key={item.id} 
                    className="relative group overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer bg-gradient-to-br from-black/80 via-red-900/40 to-yellow-900/20 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-yellow-400/20 hover:border-yellow-400/60"
                    onClick={() => setSelectedImage(item)}
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    {/* Fixed aspect ratio container */}
                    <div className="aspect-square overflow-hidden relative">
                      <img 
                        src={item.image_url} 
                        alt={item.caption || `Gallery ${item.id}`} 
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        style={{
                          minHeight: '100%',
                          minWidth: '100%'
                        }}
                      />
                    </div>
                    
                    {/* Hover Caption Overlay */}
                    <figcaption className="absolute inset-0 bg-gradient-to-t from-black/90 via-red-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-3 sm:p-4">
                      <div className="text-center">
                        <h4 className="font-bold text-white text-xs sm:text-sm md:text-lg mb-1 drop-shadow-lg line-clamp-2">
                          {item.caption || "Bollywood Night"}
                        </h4>
                        <p className="text-yellow-200/90 text-xs hidden sm:block">Click to view</p>
                      </div>
                    </figcaption>
                    
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl sm:rounded-2xl"></div>
                  </figure>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="bg-gradient-to-br from-black/80 via-red-900/40 to-black/80 backdrop-blur-sm rounded-3xl p-12 sm:p-16 border-2 border-yellow-400/30 shadow-2xl max-w-2xl mx-auto">
                <div className="text-6xl sm:text-8xl mb-8 animate-bounce">📷</div>
                <h3 className="text-3xl sm:text-4xl font-black text-white mb-6 drop-shadow-lg">
                  <span className="bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
                    Gallery Coming Soon!
                  </span>
                </h3>
                <p className="text-yellow-100/80 text-lg sm:text-xl leading-relaxed">
                  Amazing photos from Bollywood Night will be uploaded here.
                  <span className="block mt-2 text-red-300 font-semibold">Stay tuned for the memories!</span>
                </p>
                
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

      {/* Enhanced Full Screen Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/96 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 animate-fade-in">
          
          {/* Modal Container with controlled dimensions */}
          <div className="relative w-full h-full max-w-6xl max-h-full flex items-center justify-center">
            
            {/* Image Container with fixed dimensions */}
            <div className="relative max-w-full max-h-full flex items-center justify-center">
              <img 
                src={selectedImage.image_url} 
                alt={selectedImage.caption}
                className="max-w-full max-h-[85vh] sm:max-h-[90vh] w-auto h-auto object-contain rounded-2xl shadow-2xl border-2 border-yellow-400/50"
                style={{
                  minWidth: '300px',
                  minHeight: '200px',
                  maxWidth: '95vw',
                  maxHeight: '90vh'
                }}
              />
              
              {/* Loading overlay for image transitions */}
              <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 rounded-2xl"></div>
            </div>
            
            {/* Caption at bottom */}
            <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 sm:p-6 rounded-2xl">
              <h4 className="text-white text-lg sm:text-xl md:text-2xl font-bold text-center drop-shadow-lg">
                {selectedImage.caption || "Bollywood Night Memory"}
              </h4>
              <p className="text-yellow-200/80 text-sm sm:text-base text-center mt-1">
                Image {gallery.findIndex(img => img.id === selectedImage.id) + 1} of {gallery.length}
              </p>
            </div>
            
            {/* Close button */}
            <button 
              className="absolute top-2 right-2 sm:top-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold shadow-2xl border-2 border-white/20 transition-all transform hover:scale-110 z-10"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              aria-label="Close modal"
            >
              ×
            </button>
            
            {/* Navigation buttons - Only show if multiple images */}
            {gallery.length > 1 && (
              <>
                {/* Previous button */}
                <button 
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold shadow-2xl border-2 border-white/20 transition-all transform hover:scale-110 z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('prev');
                  }}
                  aria-label="Previous image"
                >
                  ‹
                </button>
                
                {/* Next button */}
                <button 
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold shadow-2xl border-2 border-white/20 transition-all transform hover:scale-110 z-10"
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

      {/* Bottom Gradient Transition */}
      <div className="absolute bottom-0 left-0 w-full h-16 sm:h-24 bg-gradient-to-t from-black via-red-900/50 to-transparent"></div>
      
      {/* Custom CSS for animations and utilities */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
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
