export default function SectionTransition() {
  return (
    <div className="relative overflow-hidden">
      {/* Smooth gradient transition - Responsive height */}
      <div className="h-16 sm:h-24 md:h-32 bg-gradient-to-b from-black via-red-900 to-black"></div>
      
      {/* Decorative elements - Responsive sizing */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex gap-2 sm:gap-4">
          <div className="w-1 h-1 sm:w-2 sm:h-2 bg-red-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="w-1 h-1 sm:w-2 sm:h-2 bg-red-600 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
      </div>
      
      {/* Subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/5 to-transparent"></div>
    </div>
  );
}
