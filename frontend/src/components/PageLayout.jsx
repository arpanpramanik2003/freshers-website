import { useEffect } from 'react';

export default function PageLayout({ children, title, description, className = "", showHeader = true }) {
  useEffect(() => {
    document.title = `${title} - Bollywood Night`;
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <div className={`min-h-screen ${className}`}>
      {showHeader && (
        <div className="bg-gradient-to-r from-red-600 via-black to-yellow-600 py-16 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-red-500/10 rounded-full blur-2xl"></div>
          </div>
          
          <div className="max-w-6xl mx-auto px-8 text-center relative z-10">
            <h1 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
              {title}
            </h1>
            {description && (
              <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>
      )}
      
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
