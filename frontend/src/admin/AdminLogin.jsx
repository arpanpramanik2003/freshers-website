// import { useState } from "react";

// export default function AdminLogin({ onLogin }) {
//   const [credentials, setCredentials] = useState({ username: '', password: '' });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const response = await fetch('http://127.0.0.1:5000/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(credentials),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         localStorage.setItem('admin_token', data.access_token);
//         onLogin(data.access_token);
//       } else {
//         setError(data.msg || 'Login failed');
//       }
//     } catch (error) {
//       setError('Network error. Please try again.');
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-dark to-black flex items-center justify-center px-4">
//       <div className="bg-black/60 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md border border-secondary/30">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-white mb-2">🎭 Admin Panel</h1>
//           <p className="text-gray-300">Bollywood Night Dashboard</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-gray-300 text-sm font-medium mb-2">Username</label>
//             <input
//               type="text"
//               value={credentials.username}
//               onChange={(e) => setCredentials({...credentials, username: e.target.value})}
//               className="w-full p-3 bg-black/40 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
//               placeholder="Enter username"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-300 text-sm font-medium mb-2">Password</label>
//             <input
//               type="password"
//               value={credentials.password}
//               onChange={(e) => setCredentials({...credentials, password: e.target.value})}
//               className="w-full p-3 bg-black/40 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
//               placeholder="Enter password"
//               required
//             />
//           </div>

//           {error && (
//             <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-red-200 text-sm">
//               {error}
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
//           >
//             {loading ? 'Signing in...' : 'Sign In'}
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//           <p className="text-gray-400 text-sm">
//             Demo credentials: <span className="text-secondary">arpan / arpan</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
