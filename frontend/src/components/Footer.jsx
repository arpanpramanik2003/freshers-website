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
    <footer className="bg-gradient-to-t from-black via-red-900 to-black text-white relative overflow-hidden">
      
      {/* Background Effects - Responsive positioning */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-red-900/40 to-yellow-600/20"></div>
        <div className="absolute top-0 left-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-24 h-24 sm:w-48 sm:h-48 bg-yellow-400/10 rounded-full blur-2xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-3 sm:py-3">
        
        {/* Main Footer Content - Mobile optimized grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-4">
          
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4">
              <span className="bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">BOLLYWOOD</span><br/>
              <span className="bg-gradient-to-r from-red-500 to-yellow-400 bg-clip-text text-transparent">NIGHT</span>
            </div>
            <p className="text-yellow-100/90 leading-relaxed text-base sm:text-lg mb-4 sm:mb-6 max-w-md mx-auto md:mx-0">
              The ultimate freshers celebration with glamour, talent, and unforgettable memories.
            </p>
            
            {/* Social Media - Responsive sizing */}
            <div className="flex gap-3 sm:gap-4 justify-center md:justify-start">
              <a href="#" className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-red-500 to-red-700 hover:from-red-400 hover:to-red-600 rounded-lg sm:rounded-xl flex items-center justify-center transition-all transform hover:scale-110 border-2 border-yellow-400/30">
                <span className="text-xl sm:text-2xl">📷</span>
              </a>
              <a href="#" className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-yellow-500 to-yellow-700 hover:from-yellow-400 hover:to-yellow-600 rounded-lg sm:rounded-xl flex items-center justify-center transition-all transform hover:scale-110 border-2 border-red-400/30">
                <span className="text-xl sm:text-2xl">📘</span>
              </a>
              <a href="#" className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-red-600 to-yellow-600 hover:from-red-500 hover:to-yellow-500 rounded-lg sm:rounded-xl flex items-center justify-center transition-all transform hover:scale-110 border-2 border-white/30">
                <span className="text-xl sm:text-2xl">📺</span>
              </a>
            </div>
          </div>

          {/* Contact Info - Mobile optimized */}
          <div className="text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-black text-yellow-400 mb-4 sm:mb-6 uppercase tracking-wide">
              Get In Touch
            </h4>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-center md:justify-start group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500 to-yellow-500 rounded-lg flex items-center justify-center mr-3 sm:mr-4 group-hover:scale-110 transition-transform flex-shrink-0">
                  <span className="text-lg sm:text-xl">📧</span>
                </div>
                <span className="text-yellow-100 text-base sm:text-lg break-all">freshers@college.edu</span>
              </div>
              
              <div className="flex items-center justify-center md:justify-start group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-500 to-red-500 rounded-lg flex items-center justify-center mr-3 sm:mr-4 group-hover:scale-110 transition-transform flex-shrink-0">
                  <span className="text-lg sm:text-xl">📱</span>
                </div>
                <span className="text-yellow-100 text-base sm:text-lg">+91 98765 43210</span>
              </div>
              
              <div className="flex items-center justify-center md:justify-start group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-600 to-yellow-400 rounded-lg flex items-center justify-center mr-3 sm:mr-4 group-hover:scale-110 transition-transform flex-shrink-0">
                  <span className="text-lg sm:text-xl">📍</span>
                </div>
                <span className="text-yellow-100 text-base sm:text-lg">Main Auditorium</span>
              </div>
            </div>
          </div>

          {/* Contact Form Toggle - Mobile optimized */}
          <div className="text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-black text-yellow-400 mb-4 sm:mb-6 uppercase tracking-wide">
              Send Message
            </h4>
            <p className="text-yellow-100/80 mb-4 sm:mb-6 text-sm sm:text-base">
              Have questions? Send us a message and we'll get back to you.
            </p>
            <button
              onClick={() => setShowContactForm(!showContactForm)}
              className="bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 hover:from-red-700 hover:via-red-600 hover:to-yellow-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-sm sm:text-base uppercase tracking-wide transition-all transform hover:scale-105 border-2 border-yellow-400/50 shadow-xl w-full"
            >
              {showContactForm ? '✕ Close Form' : '✉ Contact Us'}
            </button>
          </div>
        </div>

        {/* Contact Form (Collapsible) - Mobile optimized */}
        {showContactForm && (
          <div className="bg-gradient-to-br from-black/80 via-red-900/40 to-black/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-8 mb-8 sm:mb-12 border-2 border-gradient-to-r border-yellow-400/30 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="sm:col-span-1">
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 sm:p-4 rounded-lg sm:rounded-xl bg-black/60 border-2 border-red-500/40 focus:outline-none focus:border-yellow-400 text-yellow-100 placeholder-yellow-200/60 font-medium transition-colors text-sm sm:text-base"
                    placeholder="Your Name"
                    required
                  />
                </div>
                
                <div className="sm:col-span-1">
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 sm:p-4 rounded-lg sm:rounded-xl bg-black/60 border-2 border-red-500/40 focus:outline-none focus:border-yellow-400 text-yellow-100 placeholder-yellow-200/60 font-medium transition-colors text-sm sm:text-base"
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
                  className="w-full p-3 sm:p-4 rounded-lg sm:rounded-xl bg-black/60 border-2 border-red-500/40 focus:outline-none focus:border-yellow-400 text-yellow-100 placeholder-yellow-200/60 font-medium resize-none transition-colors text-sm sm:text-base"
                  placeholder="Your Message"
                  required
                />
              </div>
              
              <div className="text-center">
                <button 
                  type="submit" 
                  disabled={status === 'sending'}
                  className="bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 disabled:from-gray-600 disabled:to-gray-700 text-black font-black px-8 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base uppercase tracking-wide transition-all transform hover:scale-105 shadow-xl w-full sm:w-auto"
                >
                  {status === 'sending' ? '⏳ SENDING...' : '🚀 SEND MESSAGE'}
                </button>
                
                {status === 'success' && (
                  <p className="text-yellow-400 mt-3 sm:mt-4 font-bold text-base sm:text-lg">
                    ✅ Message sent successfully! We'll be in touch soon.
                  </p>
                )}
                
                {status === 'error' && (
                  <p className="text-red-400 mt-3 sm:mt-4 font-bold text-base sm:text-lg">
                    ❌ Failed to send. Please try again or contact us directly.
                  </p>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Copyright - Mobile optimized */}
        <div className="border-t border-gradient-to-r border-yellow-400/30 pt- sm:pt-2 text-center">
          <p className="text-yellow-200/80 text-base sm:text-lg mb-2">
            © {new Date().getFullYear()} <span className="bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent font-black">BOLLYWOOD NIGHT</span> • All Rights Reserved
          </p>
          <p className="text-yellow-300/60 text-xs sm:text-sm">
            ✨ Made with passion for our amazing freshers ✨
          </p>
        </div>
      </div>
    </footer>
  );
}
