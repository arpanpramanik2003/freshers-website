import { useState, useEffect } from "react";
import { API_BASE_URL } from '../config/api';

export default function Footer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [showContactForm, setShowContactForm] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => {
          setShowContactForm(false);
          setStatus('');
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <footer 
      className="text-white relative overflow-hidden py-16"
      style={{
        backgroundImage: 'url(/stage-background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: isMobile ? 'scroll' : 'fixed'
      }}
    >
      <div className="absolute"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Main Footer Container */}
        <div className="bg-black/20 backdrop-blur-md rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/10 shadow-2xl mb-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
            
            {/* Left: Brand Section */}
            <div className="text-center lg:text-left">
              <div className="text-2xl sm:text-3xl font-black mb-4 text-white drop-shadow-lg">
                ABHIGRAHA 2025
              </div>
              <p className="text-white/80 leading-relaxed text-sm sm:text-base">
                The ultimate fresher celebration with glamour, talent, unforgettable memories.
              </p>
            </div>

            {/* Center: Contact Information with Custom Logos */}
            <div className="space-y-4">
              {/* Email with Gmail Logo */}
              <div className="flex items-center justify-center lg:justify-start">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mr-4 flex-shrink-0 p-1.5 shadow-lg hover:scale-110 transition-transform">
                  <img 
                    src="/gmail.png" 
                    alt="Gmail" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<span class="text-red-500 text-lg">📧</span>';
                    }}
                  />
                </div>
                <a 
                  href="mailto:abhigraha2k25@gmail.com"
                  className="text-white hover:text-purple-300 transition-colors text-sm sm:text-base font-medium"
                >
                  abhigraha2k25@gmail.com
                </a>
              </div>
              
              {/* Instagram with Custom Logo */}
              <div className="flex items-center justify-center lg:justify-start">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mr-4 flex-shrink-0 p-1.5 shadow-lg hover:scale-110 transition-transform">
                  <img 
                    src="/insta.png" 
                    alt="Instagram" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<span class="text-pink-500 text-lg">📸</span>';
                    }}
                  />
                </div>
                <a 
                  href="https://www.instagram.com/abhigraha_2k25?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-purple-300 transition-colors text-sm sm:text-base font-medium"
                >
                  @abhigraha_2k25
                </a>
              </div>
              
              {/* Location */}
              <div className="flex items-center justify-center lg:justify-start">
                <div className="w-10 h-10 bg-blue-500/80 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg">
                  <span className="text-white text-lg">📍</span>
                </div>
                <span className="text-white text-sm sm:text-base font-medium">main playground</span>
              </div>
            </div>

            {/* Right: Stay Connected Section */}
            <div className="text-center lg:text-right">
              <h4 className="text-lg sm:text-xl font-black text-white mb-2 uppercase tracking-wide">
                STAY CONNECTED
              </h4>
              <p className="text-purple-300 mb-6 text-xs sm:text-sm font-semibold">
                Get event updates & more!
              </p>
              <button
                onClick={() => setShowContactForm(!showContactForm)}
                className="bg-purple-600/90 hover:bg-purple-700/90 backdrop-blur-sm text-white px-8 py-3 rounded-full font-black text-sm uppercase tracking-wide transition-all transform hover:scale-105 shadow-lg border border-purple-500/30 flex items-center gap-2 mx-auto lg:ml-auto lg:mr-0"
              >
                <span>✉️</span>
                CONTACT US
              </button>
            </div>
          </div>
        </div>

        {/* Contact Form - Enhanced */}
        {showContactForm && (
          <div className="bg-black/20 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl mb-8 animate-fade-in">
            <h3 className="text-2xl font-black text-white mb-6 text-center">
              📝 Send us a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-4 rounded-xl bg-black/40 backdrop-blur-sm border border-white/20 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 text-white placeholder-gray-300 font-medium transition-all"
                    placeholder="Your Name"
                    required
                  />
                </div>
                
                <div>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-4 rounded-xl bg-black/40 backdrop-blur-sm border border-white/20 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 text-white placeholder-gray-300 font-medium transition-all"
                    placeholder="Your Email"
                    required
                  />
                </div>
              </div>
              
              <div>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5" 
                  className="w-full p-4 rounded-xl bg-black/40 backdrop-blur-sm border border-white/20 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 text-white placeholder-gray-300 font-medium resize-none transition-all"
                  placeholder="Your Message"
                  required
                />
              </div>
              
              <div className="text-center space-y-4">
                <div className="flex gap-4 justify-center">
                  <button 
                    type="submit" 
                    disabled={status === 'sending'}
                    className="bg-purple-600/90 hover:bg-purple-700/90 disabled:bg-gray-600/90 backdrop-blur-sm text-white font-black px-8 py-3 rounded-full uppercase tracking-wide transition-all transform hover:scale-105 shadow-xl border border-purple-500/30"
                  >
                    {status === 'sending' ? (
                      <span className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        SENDING...
                      </span>
                    ) : (
                      '🚀 SEND MESSAGE'
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="bg-gray-700/80 hover:bg-gray-600/80 backdrop-blur-sm text-white font-black px-6 py-3 rounded-full uppercase tracking-wide transition-all transform hover:scale-105 shadow-xl border border-gray-600/30"
                  >
                    Cancel
                  </button>
                </div>
                
                {status === 'success' && (
                  <div className="bg-green-500/20 backdrop-blur-sm border border-green-400/40 rounded-xl p-4 text-green-200">
                    <span className="text-2xl mr-2">✅</span>
                    Message sent successfully! We'll get back to you soon.
                  </div>
                )}
                
                {status === 'error' && (
                  <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/40 rounded-xl p-4 text-red-200">
                    <span className="text-2xl mr-2">❌</span>
                    Failed to send message. Please try again or contact us directly.
                  </div>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Copyright */}
        <div className="bg-black/15 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/10 shadow-xl text-center">
          <p className="text-white/80 text-sm sm:text-base">
            © {new Date().getFullYear()} <span className="text-white font-black">ABHIGRAHA</span> • All Rights Reserved
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </footer>
  );
}
