// import { useState, useEffect } from "react";

// export default function MessagesManager({ token }) {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     fetchMessages();
//   }, []);

//   const fetchMessages = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:5000/api/contact-messages', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
//       setMessages(data);
//     } catch (error) {
//       console.error('Failed to fetch messages:', error);
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-900">Contact Messages</h2>
//         <button
//           onClick={fetchMessages}
//           className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium"
//         >
//           🔄 Refresh
//         </button>
//       </div>

//       {/* Messages List */}
//       <div className="space-y-4">
//         {messages.map((message) => (
//           <div key={message.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
//             <div className="flex justify-between items-start mb-2">
//               <h3 className="font-semibold text-gray-900">{message.name}</h3>
//               <span className="text-sm text-gray-500">#{message.id}</span>
//             </div>
//             <p className="text-sm text-gray-600 mb-2">📧 {message.email}</p>
//             <p className="text-gray-800">{message.message}</p>
//           </div>
//         ))}
//         {messages.length === 0 && (
//           <p className="text-gray-500 text-center py-8">No messages found.</p>
//         )}
//       </div>
//     </div>
//   );
// }
