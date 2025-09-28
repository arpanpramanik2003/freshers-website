import { useState } from "react";
import { API_BASE_URL } from '../config/api';

export default function Footer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [showContactForm, setShowContactForm] = useState(false);

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
      className="text-white relative overflow-hidden"
      style={{
        backgroundImage: 'url(/stage-background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Light overlay to keep background visible */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="text-2xl sm:text-3xl font-black mb-3">
              <span className="text-white drop-shadow-lg">ABHIGRAHA 2025</span>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-6">
              The ultimate fresher celebration with glamour, talent, unforgettable memories.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex gap-3 justify-center md:justify-start">
              <a 
                href="mailto:abhigraha2k25@gmail.com" 
                className="w-10 h-10 bg-red-600/90 backdrop-blur-sm rounded-lg flex items-center justify-center hover:scale-110 transition-transform"
              >
                <span className="text-white text-sm">📧</span>
              </a>
              <a 
                href="https://www.instagram.com/abhigraha_2k25?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 backdrop-blur-sm rounded-lg flex items-center justify-center hover:scale-110 transition-transform"
              >
                <span className="text-white text-sm">📸</span>
              </a>
              <div className="w-10 h-10 bg-blue-600/90 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">📍</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <div className="space-y-4">
              <div className="flex items-center justify-center md:justify-start">
                <div className="w-8 h-8 bg-red-600/90 backdrop-blur-sm rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-white text-sm">📧</span>
                </div>
                <span className="text-white text-sm break-all">abhigraha2k25@gmail.com</span>
              </div>
              
              <div className="flex items-center justify-center md:justify-start">
                <div className="w-8 h-8 bg-blue-600/90 backdrop-blur-sm rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-white text-sm">📍</span>
                </div>
                <span className="text-white text-sm">Main PlayGround</span>
              </div>
            </div>
          </div>

          {/* Contact Form Toggle */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-black text-white mb-2 uppercase tracking-wide">
              SEND MESSAGE
            </h4>
            <p className="text-gray-300 mb-4 text-sm">
              Have questions?
            </p>
            <button
              onClick={() => setShowContactForm(!showContactForm)}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wide transition-all transform hover:scale-105 w-full md:w-auto"
            >
              CONTACT US
            </button>
          </div>
        </div>

        {/* Contact Form */}
        {showContactForm && (
          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 sm:p-8 mb-8">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-black/40 backdrop-blur-sm border border-white/20 focus:outline-none focus:border-purple-400 text-white placeholder-gray-300 font-medium transition-colors"
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
                    className="w-full p-3 rounded-lg bg-black/40 backdrop-blur-sm border border-white/20 focus:outline-none focus:border-purple-400 text-white placeholder-gray-300 font-medium transition-colors"
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
                  rows="4" 
                  className="w-full p-3 rounded-lg bg-black/40 backdrop-blur-sm border border-white/20 focus:outline-none focus:border-purple-400 text-white placeholder-gray-300 font-medium resize-none transition-colors"
                  placeholder="Your Message"
                  required
                />
              </div>
              
              <div className="text-center">
                <button 
                  type="submit" 
                  disabled={status === 'sending'}
                  className="bg-purple-600/90 hover:bg-purple-700/90 disabled:bg-gray-600/90 backdrop-blur-sm text-white font-black px-8 py-3 rounded-lg uppercase tracking-wide transition-all transform hover:scale-105 shadow-xl"
                >
                  {status === 'sending' ? '⏳ SENDING...' : '🚀 SEND MESSAGE'}
                </button>
                
                {status === 'success' && (
                  <p className="text-green-400 mt-4 font-bold">
                    ✅ Message sent successfully!
                  </p>
                )}
                
                {status === 'error' && (
                  <p className="text-red-400 mt-4 font-bold">
                    ❌ Failed to send. Please try again.
                  </p>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Copyright */}
        <div className="text-center pt-6 border-t border-white/20">
          <p className="text-gray-300 text-sm">
            © {new Date().getFullYear()} <span className="text-white font-bold">BOLLYWOOD NIGHT</span> • All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
