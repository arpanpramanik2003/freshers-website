// import { useState, useEffect } from "react";

// export default function SponsorsManager({ token }) {
//   const [sponsors, setSponsors] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '', logo_url: ''
//   });

//   useEffect(() => {
//     fetchSponsors();
//   }, []);

//   const fetchSponsors = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:5000/api/sponsors');
//       const data = await response.json();
//       setSponsors(data);
//     } catch (error) {
//       console.error('Failed to fetch sponsors:', error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://127.0.0.1:5000/api/admin/sponsors', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         fetchSponsors();
//         resetForm();
//       }
//     } catch (error) {
//       console.error('Failed to add sponsor:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!confirm('Are you sure you want to delete this sponsor?')) return;
    
//     try {
//       const response = await fetch(`http://127.0.0.1:5000/api/admin/sponsors/${id}`, {
//         method: 'DELETE',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       if (response.ok) {
//         fetchSponsors();
//       }
//     } catch (error) {
//       console.error('Failed to delete sponsor:', error);
//     }
//   };

//   const resetForm = () => {
//     setShowForm(false);
//     setFormData({ name: '', logo_url: '' });
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-900">Sponsors Management</h2>
//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium"
//         >
//           {showForm ? 'Cancel' : '+ Add Sponsor'}
//         </button>
//       </div>

//       {showForm && (
//         <div className="bg-gray-50 rounded-lg p-6 mb-6">
//           <h3 className="text-lg font-semibold mb-4">Add New Sponsor</h3>
//           <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input
//               type="text"
//               placeholder="Sponsor Name"
//               value={formData.name}
//               onChange={(e) => setFormData({...formData, name: e.target.value})}
//               className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//               required
//             />
//             <input
//               type="url"
//               placeholder="Logo URL"
//               value={formData.logo_url}
//               onChange={(e) => setFormData({...formData, logo_url: e.target.value})}
//               className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//               required
//             />
//             <div className="md:col-span-2">
//               <button
//                 type="submit"
//                 className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium mr-2"
//               >
//                 Add Sponsor
//               </button>
//               <button
//                 type="button"
//                 onClick={resetForm}
//                 className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Sponsors List */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {sponsors.map((sponsor) => (
//           <div key={sponsor.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <img
//                   src={sponsor.logo_url}
//                   alt={sponsor.name}
//                   className="w-12 h-12 object-contain mr-3"
//                 />
//                 <h3 className="font-semibold text-gray-900">{sponsor.name}</h3>
//               </div>
//               <button
//                 onClick={() => handleDelete(sponsor.id)}
//                 className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//         {sponsors.length === 0 && (
//           <div className="md:col-span-2 lg:col-span-3 text-gray-500 text-center py-8">
//             No sponsors found. Add your first sponsor!
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
