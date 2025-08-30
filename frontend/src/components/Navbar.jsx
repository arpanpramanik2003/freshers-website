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
    ["Winners", "/prizes"],
    ["T-shirts & Goodies", "/tshirts-goodies"],
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
        // Store token in localStorage
        localStorage.setItem('admin_token', data.access_token);
        
        // Navigate to admin panel
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
      <nav className="bg-dark/90 backdrop-blur text-light px-8 py-2 flex justify-between items-center fixed top-0 w-full shadow-lg z-50">
        <Link to="/" > 
          <img src="logo.png" alt="Logo" style={{ height: '40px', padding: '0px 0' }} />
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-1 text-sm font-medium">
            {items.map(([label, path]) => (
              <li key={label}>
                <Link 
                  to={path} 
                  className={`hover:text-secondary transition-colors duration-300 px-3 py-2 rounded-lg ${
                    location.pathname === path 
                      ? 'text-secondary font-bold bg-secondary/10' 
                      : 'hover:bg-white/10'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Admin Button - Desktop */}
          <button
            onClick={() => setShowAdminModal(true)}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black px-4 py-2 rounded-lg font-bold text-sm uppercase tracking-wide transition-all transform hover:scale-105 shadow-lg border border-yellow-400/30"
          >
            🔐 Admin
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-light"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-dark/95 backdrop-blur md:hidden">
            <ul className="py-4">
              {items.map(([label, path]) => (
                <li key={label}>
                  <Link 
                    to={path} 
                    className={`block px-8 py-3 hover:text-secondary transition-colors ${
                      location.pathname === path ? 'text-secondary font-bold' : ''
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              
              {/* Admin Button - Mobile */}
              <li className="px-8 py-3">
                <button
                  onClick={() => {
                    setShowAdminModal(true);
                    setIsOpen(false);
                  }}
                  className="block w-full text-center bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black px-4 py-3 rounded-lg font-bold text-sm uppercase tracking-wide transition-all shadow-lg border border-yellow-400/30"
                >
                  🔐 Admin Panel
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Admin Login Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
            {/* Background overlay */}
            <div 
              className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
              onClick={() => setShowAdminModal(false)}
            ></div>
            
            {/* Modal panel */}
            <div className="inline-block align-bottom bg-gradient-to-br from-black via-red-900/40 to-yellow-900/20 backdrop-blur-sm rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border-2 border-yellow-400/30">
              <div className="px-6 pt-6 pb-4 sm:p-8">
                <div className="w-full">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-black text-white mb-2">
                      🎭 Admin Login
                    </h3>
                    <p className="text-yellow-100/80">Bollywood Night Dashboard</p>
                  </div>
                  
                  <form onSubmit={handleAdminLogin} className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-yellow-400 mb-2">
                        Username
                      </label>
                      <input
                        type="text"
                        value={loginData.username}
                        onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                        className="w-full p-3 bg-black/60 border-2 border-yellow-400/40 rounded-lg focus:outline-none focus:border-yellow-400 text-white placeholder-yellow-200/60 transition-colors"
                        placeholder="Enter admin username"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-yellow-400 mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        className="w-full p-3 bg-black/60 border-2 border-yellow-400/40 rounded-lg focus:outline-none focus:border-yellow-400 text-white placeholder-yellow-200/60 transition-colors"
                        placeholder="Enter admin password"
                        required
                      />
                    </div>
                    
                    <div className="flex gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-3 rounded-lg font-bold transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none shadow-xl border border-red-400/30"
                      >
                        {loading ? '🔄 Logging in...' : '🚀 Login'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowAdminModal(false);
                          setLoginData({ username: '', password: '' });
                        }}
                        className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black px-4 py-3 rounded-lg font-bold transition-all transform hover:scale-105 shadow-xl border border-yellow-400/30"
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
