import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { API_BASE_URL } from '../config/api';

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  
  const items = [
    ["HOME", "/"],
    ["EVENTS", "/events"],
    ["SCHEDULE", "/schedule"],
    ["TEAM", "/team"],
    ["PRIZES", "/prizes"],
    ["T-SHIRTS & GOODIES", "/tshirts-goodies"],
    ["GALLERY", "/gallery"],
    ["SPONSORS", "/sponsors"],
  ];

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('admin_token', data.access_token);
        window.location.href = '/admin';
      } else {
        alert(data.msg || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* NAVBAR with Perfect Alignment */}
      <nav 
        className="text-white px-4 sm:px-8 py-3 flex justify-between items-center fixed top-0 w-full shadow-2xl z-50"
        style={{
          backgroundImage: 'url(/stage-background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Light overlay for better readability */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        <div className="relative z-10 flex justify-between items-center w-full max-w-7xl mx-auto">
          
          {/* Left: Logo - FIXED CENTERING */}
          <Link to="/" className="flex-shrink-0"> 
            <div className="text-xl font-black text-center">
              <div className="text-white drop-shadow-lg">ABHIGRAHA</div>
              <div className="text-white drop-shadow-lg text-sm -mt-1">2K25</div>
            </div>
          </Link>
          
          {/* Center: Navigation Items - PERFECTLY CENTERED */}
          <div className="hidden lg:flex justify-center items-center flex-1">
            {/* FIXED POSITIONING - Perfectly centered container */}
            <div className="bg-black/20 backdrop-blur-md rounded-full px-5 py-2.5 border border-white/10 shadow-2xl">
              <ul className="flex items-center gap-1">
                {items.map(([label, path]) => (
                  <li key={label}>
                    <Link 
                      to={path} 
                      className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                        location.pathname === path 
                          ? 'bg-purple-600 text-white shadow-lg' 
                          : 'text-gray-300 hover:bg-purple-700/60 hover:text-white'
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
            
          {/* Right: Admin Button - Properly aligned */}
          <div className="hidden lg:flex flex-shrink-0">
            <button
              onClick={() => setShowAdminModal(true)}
              className="bg-purple-600/80 backdrop-blur-sm hover:bg-purple-700 text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all transform hover:scale-105 shadow-lg border border-purple-500/30 flex items-center gap-2"
            >
              <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xs">👤</span>
              </div>
              ADMIN
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-white relative z-10 flex-shrink-0 p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div 
            className="absolute top-full left-0 w-full lg:hidden shadow-2xl"
            style={{
              backgroundImage: 'url(/stage-background.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed'
            }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
            
            <div className="p-4 relative z-10">
              <div className="bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                <ul className="py-2">
                  {items.map(([label, path]) => (
                    <li key={label}>
                      <Link 
                        to={path} 
                        className={`block px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
                          location.pathname === path 
                            ? 'text-purple-300 bg-purple-600/30 border-r-4 border-purple-400' 
                            : 'text-gray-300 hover:text-white hover:bg-purple-700/30'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                  
                  <li className="px-4 py-3 border-t border-white/10 mt-2">
                    <button
                      onClick={() => {
                        setShowAdminModal(true);
                        setIsOpen(false);
                      }}
                      className="w-full bg-purple-600/80 backdrop-blur-sm hover:bg-purple-700 text-white px-4 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-lg border border-purple-500/30 flex items-center justify-center gap-2"
                    >
                      <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-xs">👤</span>
                      </div>
                      Admin Panel
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Admin Login Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
            <div 
              className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
              onClick={() => setShowAdminModal(false)}
            ></div>
            
            <div className="inline-block align-bottom bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-purple-500/30 relative z-10">
              <div className="px-6 pt-6 pb-4 sm:p-8">
                <div className="w-full">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <span className="text-2xl">🎭</span>
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2">
                      Admin Login
                    </h3>
                    <p className="text-purple-300">Bollywood Night Dashboard</p>
                  </div>
                  
                  <form onSubmit={handleAdminLogin} className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-purple-300 mb-2">
                        Username
                      </label>
                      <input
                        type="text"
                        value={loginData.username}
                        onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                        className="w-full p-3 bg-gray-800/60 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 text-white placeholder-gray-400 transition-all"
                        placeholder="Enter admin username"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-purple-300 mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        className="w-full p-3 bg-gray-800/60 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 text-white placeholder-gray-400 transition-all"
                        placeholder="Enter admin password"
                        required
                      />
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-bold transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none shadow-xl border border-purple-500/30"
                      >
                        {loading ? (
                          <span className="flex items-center justify-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Logging in...
                          </span>
                        ) : (
                          '🚀 Login'
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowAdminModal(false);
                          setLoginData({ username: '', password: '' });
                        }}
                        className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-bold transition-all transform hover:scale-105 shadow-xl border border-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
