// import { useState, useEffect } from "react";

// export default function TeamManager({ token }) {
//   const [team, setTeam] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editingMember, setEditingMember] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '', role: '', image_url: '', bio: ''
//   });

//   useEffect(() => {
//     fetchTeam();
//   }, []);

//   const fetchTeam = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:5000/api/team');
//       const data = await response.json();
//       setTeam(data);
//     } catch (error) {
//       console.error('Failed to fetch team:', error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const url = editingMember 
//         ? `http://127.0.0.1:5000/api/admin/team/${editingMember.id}`
//         : 'http://127.0.0.1:5000/api/admin/team';
      
//       const response = await fetch(url, {
//         method: editingMember ? 'PUT' : 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         fetchTeam();
//         resetForm();
//       }
//     } catch (error) {
//       console.error('Failed to save team member:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!confirm('Are you sure you want to delete this team member?')) return;
    
//     try {
//       const response = await fetch(`http://127.0.0.1:5000/api/admin/team/${id}`, {
//         method: 'DELETE',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       if (response.ok) {
//         fetchTeam();
//       }
//     } catch (error) {
//       console.error('Failed to delete team member:', error);
//     }
//   };

//   const handleEdit = (member) => {
//     setEditingMember(member);
//     setFormData({
//       name: member.name || '',
//       role: member.role || '',
//       image_url: member.image_url || '',
//       bio: member.bio || ''
//     });
//     setShowForm(true);
//   };

//   const resetForm = () => {
//     setShowForm(false);
//     setEditingMember(null);
//     setFormData({ name: '', role: '', image_url: '', bio: '' });
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-900">Team Management</h2>
//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium"
//         >
//           {showForm ? 'Cancel' : '+ Add Team Member'}
//         </button>
//       </div>

//       {showForm && (
//         <div className="bg-gray-50 rounded-lg p-6 mb-6">
//           <h3 className="text-lg font-semibold mb-4">
//             {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
//           </h3>
//           <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input
//               type="text"
//               placeholder="Full Name"
//               value={formData.name}
//               onChange={(e) => setFormData({...formData, name: e.target.value})}
//               className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//               required
//             />
//             <input
//               type="text"
//               placeholder="Role/Position"
//               value={formData.role}
//               onChange={(e) => setFormData({...formData, role: e.target.value})}
//               className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//               required
//             />
//             <input
//               type="url"
//               placeholder="Photo URL"
//               value={formData.image_url}
//               onChange={(e) => setFormData({...formData, image_url: e.target.value})}
//               className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary md:col-span-2"
//             />
//             <textarea
//               placeholder="Bio/Description"
//               value={formData.bio}
//               onChange={(e) => setFormData({...formData, bio: e.target.value})}
//               className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary md:col-span-2 h-24"
//             />
//             <div className="md:col-span-2">
//               <button
//                 type="submit"
//                 className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium mr-2"
//               >
//                 {editingMember ? 'Update' : 'Create'} Member
//               </button>
//               {editingMember && (
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

//       {/* Team List */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {team.map((member) => (
//           <div key={member.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
//             <div className="flex items-center mb-3">
//               {member.image_url && (
//                 <img
//                   src={member.image_url}
//                   alt={member.name}
//                   className="w-12 h-12 rounded-full object-cover mr-3"
//                 />
//               )}
//               <div>
//                 <h3 className="font-semibold text-gray-900">{member.name}</h3>
//                 <p className="text-sm text-primary">{member.role}</p>
//               </div>
//             </div>
//             {member.bio && (
//               <p className="text-gray-600 text-sm mb-3">{member.bio}</p>
//             )}
//             <div className="flex gap-2">
//               <button
//                 onClick={() => handleEdit(member)}
//                 className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(member.id)}
//                 className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//         {team.length === 0 && (
//           <div className="md:col-span-2 lg:col-span-3 text-gray-500 text-center py-8">
//             No team members found. Add your first member!
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
