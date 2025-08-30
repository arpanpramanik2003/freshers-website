import { useState } from "react";
import PageLayout from "../components/PageLayout";
import { API_BASE_URL } from '../config/api';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

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
    <PageLayout 
      title="Contact Us" 
      description="Get in touch with the Bollywood Night team"
      className="bg-dark text-light"
    >
      <section className="py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-8">
          {/* Contact Form */}
          <div className="bg-black/40 rounded-2xl p-8 border border-red-500/20">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="mr-3">📝</span> Send us a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2 font-medium">Your Name</label>
                <input 
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-4 rounded-lg bg-black/60 border border-gray-700 focus:outline-none focus:border-red-500 text-white placeholder-gray-400 transition-colors"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2 font-medium">Email Address</label>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 rounded-lg bg-black/60 border border-gray-700 focus:outline-none focus:border-red-500 text-white placeholder-gray-400 transition-colors"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2 font-medium">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6" 
                  className="w-full p-4 rounded-lg bg-black/60 border border-gray-700 focus:outline-none focus:border-red-500 text-white placeholder-gray-400 transition-colors resize-none"
                  placeholder="Tell us what's on your mind..."
                  required
                />
              </div>
              
              <button 
                type="submit" 
                disabled={status === 'sending'}
                className="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg transition-all transform hover:scale-105"
              >
                {status === 'sending' ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
              
              {status === 'success' && (
                <div className="bg-green-600/20 border border-green-500 rounded-lg p-4 text-green-400 text-center">
                  <span className="text-2xl mr-2">🎉</span>
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}
              
              {status === 'error' && (
                <div className="bg-red-600/20 border border-red-500 rounded-lg p-4 text-red-400 text-center">
                  <span className="text-2xl mr-2">❌</span>
                  Failed to send message. Please try again or contact us directly.
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-black/40 rounded-2xl p-8 border border-yellow-500/20">
              <h3 className="text-xl font-bold mb-6 text-white flex items-center">
                <span className="mr-3">📍</span> Event Details
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-yellow-400 mb-2">Venue</h4>
                  <p className="text-gray-300">Main Auditorium, Your College</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-yellow-400 mb-2">Email</h4>
                  <p className="text-gray-300">freshers@college.edu</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-yellow-400 mb-2">Phone</h4>
                  <p className="text-gray-300">+91 98765 43210</p>
                </div>
              </div>
            </div>
            
            <div className="bg-black/40 rounded-2xl p-8 border border-red-500/20">
              <h3 className="text-xl font-bold mb-6 text-white flex items-center">
                <span className="mr-3">📱</span> Follow Us
              </h3>
              
              <div className="grid grid-cols-3 gap-4">
                <a href="#" className="bg-gradient-to-r from-pink-500 to-red-500 p-4 rounded-xl text-center hover:scale-105 transition-transform">
                  <div className="text-3xl mb-2">📷</div>
                  <div className="text-sm font-medium">Instagram</div>
                </a>
                
                <a href="#" className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-xl text-center hover:scale-105 transition-transform">
                  <div className="text-3xl mb-2">📘</div>
                  <div className="text-sm font-medium">Facebook</div>
                </a>
                
                <a href="#" className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-xl text-center hover:scale-105 transition-transform">
                  <div className="text-3xl mb-2">📺</div>
                  <div className="text-sm font-medium">YouTube</div>
                </a>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-red-900/20 to-yellow-900/20 rounded-2xl p-8 border border-white/20">
              <h3 className="text-xl font-bold mb-4 text-white flex items-center">
                <span className="mr-3">🎭</span> Event Theme
              </h3>
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-yellow-400">Bollywood Night</strong> - Come dressed in your favorite Bollywood style! 
                From classic Bollywood glamour to modern fusion, express your style and be part of the magic.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
