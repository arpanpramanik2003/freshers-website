// import { useState, useEffect } from "react";

// export default function GalleryManager({ token }) {
//   const [gallery, setGallery] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     image_url: '', caption: ''
//   });

//   useEffect(() => {
//     fetchGallery();
//   }, []);

//   const fetchGallery = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:5000/api/gallery');
//       const data = await response.json();
//       setGallery(data);
//     } catch (error) {
//       console.error('Failed to fetch gallery:', error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://127.0.0.1:5000/api/admin/gallery', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         fetchGallery();
//         resetForm();
//       }
//     } catch (error) {
//       console.error('Failed to add gallery item:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!confirm('Are you sure you want to delete this image?')) return;
    
//     try {
//       const response = await fetch(`http://127.0.0.1:5000/api/admin/gallery/${id}`, {
//         method: 'DELETE',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       if (response.ok) {
//         fetchGallery();
//       }
//     } catch (error) {
//       console.error('Failed to delete gallery item:', error);
//     }
//   };

//   const resetForm = () => {
//     setShowForm(false);
//     setFormData({ image_url: '', caption: '' });
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-900">Gallery Management</h2>
//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium"
//         >
//           {showForm ? 'Cancel' : '+ Add Image'}
//         </button>
//       </div>

//       {showForm && (
//         <div className="bg-gray-50 rounded-lg p-6 mb-6">
//           <h3 className="text-lg font-semibold mb-4">Add New Image</h3>
//           <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
//             <input
//               type="url"
//               placeholder="Image URL"
//               value={formData.image_url}
//               onChange={(e) => setFormData({...formData, image_url: e.target.value})}
//               className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//               required
//             />
//             <input
//               type="text"
//               placeholder="Caption (optional)"
//               value={formData.caption}
//               onChange={(e) => setFormData({...formData, caption: e.target.value})}
//               className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//             />
//             <div>
//               <button
//                 type="submit"
//                 className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium mr-2"
//               >
//                 Add Image
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

//       {/* Gallery Grid */}
//       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
//         {gallery.map((item) => (
//           <div key={item.id} className="relative group">
//             <img
//               src={item.image_url}
//               alt={item.caption}
//               className="w-full h-32 object-cover rounded-lg"
//             />
//             <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
//               <button
//                 onClick={() => handleDelete(item.id)}
//                 className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity"
//               >
//                 Delete
//               </button>
//             </div>
//             {item.caption && (
//               <p className="text-xs text-gray-600 mt-1 truncate">{item.caption}</p>
//             )}
//           </div>
//         ))}
//         {gallery.length === 0 && (
//           <div className="md:col-span-4 lg:col-span-6 text-gray-500 text-center py-8">
//             No images found. Add your first image!
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
