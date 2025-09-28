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
    ["Home", "/"],
    ["Events", "/events"],
    ["Schedule", "/schedule"],
    ["Team", "/team"],
    ["Prizes", "/prizes"],
    ["T-SHIRTS & GOODIES", "/tshirts-goodies"],
    ["Gallery", "/gallery"],
    ["Sponsors", "/sponsors"],
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
      <nav 
        className="text-white px-4 sm:px-8 py-3 flex justify-between items-center fixed top-0 w-full shadow-2xl z-50"
        style={{
          backgroundImage: 'url(/stage-background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* LIGHT overlay to keep background visible */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        <div className="relative z-10 flex justify-between items-center w-full">
          
          {/* Left: Logo */}
          <Link to="/" className="flex-shrink-0"> 
            <div className="text-xl font-black">
              <span className="text-white drop-shadow-lg">ABHIGRAHA</span>
              <span className="block text-white -mt-1 drop-shadow-lg text-sm">2K25</span>
            </div>
          </Link>
          
          {/* Center: Navigation Menu with Transparent Rectangle - Desktop */}
          <div className="hidden md:flex justify-center flex-1 mx-8">
            {/* TRANSPARENT RECTANGLE for Navigation */}
            <div className="bg-black/15 rounded-full px-4 py-2 border border-white/5">
              <ul className="flex gap-2 text-sm font-bold">
                {items.map(([label, path]) => (
                  <li key={label}>
                    <Link 
                      to={path} 
                      className={`px-4 py-2 rounded-full transition-all duration-300 ${
                        location.pathname === path 
                          ? 'bg-purple-600/90 text-white shadow-lg' 
                          : 'bg-purple-800/40 text-white hover:bg-purple-700/60'
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
            
          {/* Right: Admin Button */}
          <div className="hidden md:flex flex-shrink-0">
            <button
              onClick={() => setShowAdminModal(true)}
              className="bg-black/15 hover:bg-black/25 text-white px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wide transition-all transform hover:scale-105 shadow-lg border border-white/5"
            >
              👤 ADMIN
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white relative z-10 flex-shrink-0"
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
            className="absolute top-full left-0 w-full md:hidden shadow-2xl"
            style={{
              backgroundImage: 'url(/stage-background.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed'
            }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
            
            {/* Mobile Menu with Transparent Rectangle */}
            <div className="p-4 relative z-10">
              <div className="bg-black/15 rounded-2xl border border-white/5">
                <ul className="py-4">
                  {items.map(([label, path]) => (
                    <li key={label}>
                      <Link 
                        to={path} 
                        className={`block px-6 py-3 hover:text-purple-300 transition-colors rounded-lg mx-2 ${
                          location.pathname === path ? 'text-purple-300 font-bold bg-purple-600/30' : ''
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                  
                  <li className="px-6 py-3">
                    <button
                      onClick={() => {
                        setShowAdminModal(true);
                        setIsOpen(false);
                      }}
                      className="block w-full text-center bg-black/20 hover:bg-black/30 text-white px-4 py-3 rounded-full font-bold text-sm uppercase tracking-wide transition-all shadow-lg border border-white/5"
                    >
                      👤 Admin Panel
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
              className="fixed inset-0 transition-opacity"
              style={{
                backgroundImage: 'url(/stage-background.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              onClick={() => setShowAdminModal(false)}
            >
              <div className="absolute inset-0 bg-black/60"></div>
            </div>
            
            <div className="inline-block align-bottom bg-black/80 backdrop-blur-lg rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-white/20 relative z-10">
              <div className="px-6 pt-6 pb-4 sm:p-8">
                <div className="w-full">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-black text-white mb-2">
                      🎭 Admin Login
                    </h3>
                    <p className="text-gray-300">Bollywood Night Dashboard</p>
                  </div>
                  
                  <form onSubmit={handleAdminLogin} className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-purple-400 mb-2">
                        Username
                      </label>
                      <input
                        type="text"
                        value={loginData.username}
                        onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                        className="w-full p-3 bg-black/40 border border-white/20 rounded-lg focus:outline-none focus:border-purple-400 text-white placeholder-gray-400 transition-colors"
                        placeholder="Enter admin username"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-purple-400 mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        className="w-full p-3 bg-black/40 border border-white/20 rounded-lg focus:outline-none focus:border-purple-400 text-white placeholder-gray-400 transition-colors"
                        placeholder="Enter admin password"
                        required
                      />
                    </div>
                    
                    <div className="flex gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-purple-600/90 hover:bg-purple-700/90 text-white px-4 py-3 rounded-lg font-bold transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none shadow-xl"
                      >
                        {loading ? '🔄 Logging in...' : '🚀 Login'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowAdminModal(false);
                          setLoginData({ username: '', password: '' });
                        }}
                        className="flex-1 bg-black/40 hover:bg-black/60 text-white px-4 py-3 rounded-lg font-bold transition-all transform hover:scale-105 shadow-xl border border-white/20"
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
