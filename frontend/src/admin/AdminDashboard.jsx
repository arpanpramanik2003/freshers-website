// import { useState, useEffect } from "react";
// import EventsManager from "./EventsManager";
// import ScheduleManager from "./ScheduleManager";
// import TeamManager from "./TeamManager";
// import GalleryManager from "./GalleryManager";
// import SponsorsManager from "./SponsorsManager";
// import MessagesManager from "./MessagesManager";

// export default function AdminDashboard({ token, onLogout }) {
//   const [activeTab, setActiveTab] = useState('events');
//   const [stats, setStats] = useState({});

//   const tabs = [
//     { id: 'events', label: 'Events', icon: '🎪' },
//     { id: 'schedule', label: 'Schedule', icon: '📅' },
//     { id: 'team', label: 'Team', icon: '👥' },
//     { id: 'gallery', label: 'Gallery', icon: '📸' },
//     { id: 'sponsors', label: 'Sponsors', icon: '🤝' },
//     { id: 'messages', label: 'Messages', icon: '💬' },
//   ];

//   useEffect(() => {
//     // Fetch basic stats
//     fetchStats();
//   }, []);

//   const fetchStats = async () => {
//     try {
//       const endpoints = ['events', 'schedule', 'team', 'gallery', 'sponsors'];
//       const promises = endpoints.map(endpoint => 
//         fetch(`http://127.0.0.1:5000/api/${endpoint}`).then(r => r.json())
//       );
      
//       const results = await Promise.all(promises);
//       setStats({
//         events: results[0].length,
//         schedule: results[1].length,
//         team: results[2].length,
//         gallery: results[3].length,
//         sponsors: results[4].length,
//       });
//     } catch (error) {
//       console.error('Failed to fetch stats:', error);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('admin_token');
//     onLogout();
//   };

//   const renderActiveComponent = () => {
//     const props = { token };
//     switch(activeTab) {
//       case 'events': return <EventsManager {...props} />;
//       case 'schedule': return <ScheduleManager {...props} />;
//       case 'team': return <TeamManager {...props} />;
//       case 'gallery': return <GalleryManager {...props} />;
//       case 'sponsors': return <SponsorsManager {...props} />;
//       case 'messages': return <MessagesManager {...props} />;
//       default: return <EventsManager {...props} />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center">
//               <h1 className="text-xl font-bold text-gray-900">
//                 🎭 <span className="text-primary">Bollywood Night</span> Admin
//               </h1>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
//           {Object.entries(stats).map(([key, value]) => (
//             <div key={key} className="bg-white rounded-lg p-4 shadow-sm border">
//               <div className="text-2xl font-bold text-primary">{value || 0}</div>
//               <div className="text-sm text-gray-600 capitalize">{key}</div>
//             </div>
//           ))}
//         </div>

//         {/* Navigation Tabs */}
//         <div className="bg-white rounded-lg shadow-sm border mb-6">
//           <div className="border-b border-gray-200">
//             <nav className="flex space-x-8 px-6">
//               {tabs.map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
//                     activeTab === tab.id
//                       ? 'border-primary text-primary'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   }`}
//                 >
//                   <span className="mr-2">{tab.icon}</span>
//                   {tab.label}
//                 </button>
//               ))}
//             </nav>
//           </div>
//         </div>

//         {/* Active Component */}
//         <div className="bg-white rounded-lg shadow-sm border">
//           {renderActiveComponent()}
//         </div>
//       </div>
//     </div>
//   );
// }
