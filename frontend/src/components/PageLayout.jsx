import { useEffect } from 'react';

export default function PageLayout({ children, title, description, className = "", showHeader = true }) {
  useEffect(() => {
    document.title = `${title} - ABHIGRAHA`;
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <div className={`min-h-screen ${className}`}>
      {showHeader && (
        <div 
          className="py-16 sm:py-20 relative overflow-hidden"
          style={{
            backgroundImage: 'url(/stage-background.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
          
          {/* Background decorations - Purple/Blue theme */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-purple-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-24 h-24 sm:w-48 sm:h-48 bg-blue-500/10 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 right-1/3 w-20 h-20 sm:w-40 sm:h-40 bg-purple-600/10 rounded-full blur-2xl"></div>
          </div>
          
          <div className="max-w-6xl mx-auto px-4 sm:px-8 text-center relative z-10">
            {/* Transparent rectangle for title section */}
            <div className="bg-black/15 rounded-3xl px-6 py-8 sm:px-8 sm:py-10 border border-white/5">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-2xl">
                {title}
              </h1>
              {description && (
                <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
