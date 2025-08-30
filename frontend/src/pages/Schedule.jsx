import { useEffect, useState } from "react";

export default function Schedule() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/schedule")
      .then((res) => res.json())
      .then((data) => {
        setSchedule(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Gradient/color/style helpers
  const statusStyles = {
    done: {
      node: "bg-green-500 shadow-lg",
      badge: "bg-green-500/20 border border-green-400 text-green-400",
      border: "bg-gradient-to-br from-green-400 to-green-700",
      icon: "✅",
      text: "text-white",
    },
    ongoing: {
      node: "bg-yellow-500 shadow-lg",
      badge: "bg-yellow-500/20 border border-yellow-400 text-yellow-400",
      border: "bg-gradient-to-br from-yellow-500 via-yellow-400 to-red-400",
      icon: "🎬",
      text: "text-yellow-200",
    },
    upcoming: {
      node: "bg-red-500 shadow-lg",
      badge: "bg-red-500/20 border border-red-400 text-red-400",
      border: "bg-gradient-to-br from-yellow-400 to-red-500",
      icon: "⏰",
      text: "text-yellow-400",
    },
    default: {
      node: "bg-gray-500 shadow",
      badge: "bg-gray-500/20 border border-gray-400 text-gray-400",
      border: "bg-gradient-to-br from-gray-400 to-gray-600",
      icon: "📅",
      text: "text-white",
    }
  };

  if (loading) {
    return (
      <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-red-900 to-yellow-600">
        <div className="animate-spin rounded-full h-24 w-24 border-b-4 border-yellow-400 border-t-4 border-red-500"></div>
      </section>
    );
  }

  return (
    <section className="flex flex-col min-h-screen bg-gradient-to-br from-black via-red-900 to-yellow-600 py-12 px-2 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-center mb-12 bg-gradient-to-r from-yellow-400 via-white to-red-500 bg-clip-text text-transparent drop-shadow">
          Bollywood Night Roadmap
        </h1>

        {/* Timeline vertical line */}
        <div className="relative pl-7 sm:pl-16">
          {/* Line */}
          <div className="absolute left-6 sm:left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 via-red-400 to-yellow-400 rounded-full"></div>

          {/* Timeline Items */}
          <div className="flex flex-col gap-16">
            {schedule.map((item, idx) => {
              const st = statusStyles[item.status] || statusStyles.default;

              return (
                <div key={item.id} className="relative flex items-center group">
                  {/* Timeline node/circle */}
                  <div className="absolute left-0 sm:left-6 z-10 flex flex-col items-center">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-2xl sm:text-3xl ${st.node} ring-2 ring-yellow-300`} style={{ boxShadow: "0 2px 16px 0 #2226" }}>
                      {st.icon}
                    </div>
                    {/* vertical line continues */}
                  </div>

                  {/* Card */}
                  <div
                    className={`ml-20 sm:ml-28 flex-1 rounded-3xl p-5 sm:p-8 shadow-xl bg-gradient-to-br from-black/90 via-red-900/50 to-yellow-800/10 relative transition-all
                    `}
                    style={{
                      border: "3px solid",
                      borderImage: `linear-gradient(135deg, #FFD600, #FF5630) 1`, // fallback if not tailwind
                      ...(item.status === 'upcoming' && { borderImage: "linear-gradient(135deg, #FF9F1A, #FF5630) 1" }),
                      ...(item.status === 'done' && { borderImage: "linear-gradient(135deg, #A7FF83, #00BFAE) 1" }),
                    }}
                  >
                    {/* Time pill */}
                    <div className="flex flex-row items-center gap-4 mb-2">
                      <span className={`px-4 py-1 rounded-lg font-black text-lg sm:text-xl bg-gradient-to-r from-yellow-300 to-red-400 text-black drop-shadow inline-block`}>
                        {item.time}
                      </span>
                      <span className={`uppercase px-4 py-1 rounded-full font-bold text-xs tracking-wider ${st.badge}`}>
                        {item.status === "done" ? "COMPLETED" : item.status === "upcoming" ? "UPCOMING" : item.status === "ongoing" ? "ONGOING" : "SCHEDULED"}
                      </span>
                    </div>
                    {/* Title */}
                    <div className={`font-black text-2xl sm:text-3xl mt-2 mb-2 ${st.text} drop-shadow`}>
                      {item.title}
                    </div>
                    {/* Description */}
                    {item.description && (
                      <div className="text-yellow-200/80 text-base mt-1">{item.description}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
