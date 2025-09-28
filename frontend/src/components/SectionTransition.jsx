export default function SectionTransition() {
  return (
    <div 
      className="relative overflow-hidden h-16 sm:h-24 md:h-32"
      style={{
        backgroundImage: 'url(/stage-background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>
      
      {/* Decorative elements - Purple/Blue theme */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="flex gap-2 sm:gap-4">
          <div className="w-1 h-1 sm:w-2 sm:h-2 bg-purple-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="w-1 h-1 sm:w-2 sm:h-2 bg-purple-600 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
      </div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-blue-900/20"></div>
    </div>
  );
}
