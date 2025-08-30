// import { useState, useEffect } from "react";

// export default function ScheduleManager({ token }) {
//   const [schedule, setSchedule] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);
//   const [formData, setFormData] = useState({
//     time: '', title: '', status: 'upcoming'
//   });

//   useEffect(() => {
//     fetchSchedule();
//   }, []);

//   const fetchSchedule = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:5000/api/schedule');
//       const data = await response.json();
//       setSchedule(data);
//     } catch (error) {
//       console.error('Failed to fetch schedule:', error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const url = editingItem 
//         ? `http://127.0.0.1:5000/api/admin/schedule/${editingItem.id}`
//         : 'http://127.0.0.1:5000/api/admin/schedule';
      
//       const response = await fetch(url, {
//         method: editingItem ? 'PUT' : 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         fetchSchedule();
//         resetForm();
//       }
//     } catch (error) {
//       console.error('Failed to save schedule item:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!confirm('Are you sure you want to delete this schedule item?')) return;
    
//     try {
//       const response = await fetch(`http://127.0.0.1:5000/api/admin/schedule/${id}`, {
//         method: 'DELETE',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       if (response.ok) {
//         fetchSchedule();
//       }
//     } catch (error) {
//       console.error('Failed to delete schedule item:', error);
//     }
//   };

//   const handleEdit = (item) => {
//     setEditingItem(item);
//     setFormData({
//       time: item.time || '',
//       title: item.title || '',
//       status: item.status || 'upcoming'
//     });
//     setShowForm(true);
//   };

//   const resetForm = () => {
//     setShowForm(false);
//     setEditingItem(null);
//     setFormData({ time: '', title: '', status: 'upcoming' });
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-900">Schedule Management</h2>
//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium"
//         >
//           {showForm ? 'Cancel' : '+ Add Schedule Item'}
//         </button>
//       </div>

//       {showForm && (
//         <div className="bg-gray-50 rounded-lg p-6 mb-6">
//           <h3 className="text-lg font-semibold mb-4">
//             {editingItem ? 'Edit Schedule Item' : 'Add New Schedule Item'}
//           </h3>
//           <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <input
//               type="text"
//               placeholder="Time (e.g., 10:00 AM)"
//               value={formData.time}
//               onChange={(e) => setFormData({...formData, time: e.target.value})}
//               className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//               required
//             />
//             <input
//               type="text"
//               placeholder="Activity Title"
//               value={formData.title}
//               onChange={(e) => setFormData({...formData, title: e.target.value})}
//               className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//               required
//             />
//             <select
//               value={formData.status}
//               onChange={(e) => setFormData({...formData, status: e.target.value})}
//               className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//             >
//               <option value="upcoming">Upcoming</option>
//               <option value="ongoing">Ongoing</option>
//               <option value="done">Done</option>
//             </select>
//             <div className="md:col-span-3">
//               <button
//                 type="submit"
//                 className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium mr-2"
//               >
//                 {editingItem ? 'Update' : 'Create'} Schedule Item
//               </button>
//               {editingItem && (
//                 <button
//                   type="button"
//                   onClick={resetForm}
//                   className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium"
//                 >
//                   Cancel
//                 </button>
//               )}
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Schedule List */}
//       <div className="space-y-4">
//         {schedule.map((item) => (
//           <div key={item.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
//             <div className="flex justify-between items-start">
//               <div className="flex-1">
//                 <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
//                 <div className="flex gap-4 mt-2 text-sm">
//                   <span className="text-gray-600">⏰ {item.time}</span>
//                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                     item.status === 'done' ? 'bg-green-100 text-green-800' :
//                     item.status === 'ongoing' ? 'bg-yellow-100 text-yellow-800' :
//                     'bg-blue-100 text-blue-800'
//                   }`}>
//                     {item.status}
//                   </span>
//                 </div>
//               </div>
//               <div className="flex gap-2 ml-4">
//                 <button
//                   onClick={() => handleEdit(item)}
//                   className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(item.id)}
//                   className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//         {schedule.length === 0 && (
//           <p className="text-gray-500 text-center py-8">No schedule items found. Add your first item!</p>
//         )}
//       </div>
//     </div>
//   );
// }
