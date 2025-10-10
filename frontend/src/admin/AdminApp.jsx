import { useState, useEffect } from "react";
import { API_BASE_URL } from '../config/api';


export default function AdminApp() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({});

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'events', label: 'Events', icon: '🎪' },
    { id: 'schedule', label: 'Schedule', icon: '📅' },
    { id: 'team', label: 'Team', icon: '👥' },
    { id: 'freshers', label: 'Freshers Titles', icon: '👑' },
    { id: 'tshirts-goodies', label: 'T-shirts & Goodies', icon: '👕' },
    { id: 'gallery', label: 'Gallery', icon: '📸' },
    { id: 'sponsors', label: 'Sponsors', icon: '🤝' },
    { id: 'messages', label: 'Messages', icon: '💬' },
  ];
  

  useEffect(() => {
    console.log('AdminApp mounted');
    const savedToken = localStorage.getItem('admin_token');
    console.log('Saved token:', savedToken);
    if (savedToken) {
      setToken(savedToken);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (token) {
      fetchStats();
    }
  }, [token]);

  const fetchStats = async () => {
    try {
      const endpoints = ['events', 'schedule', 'team', 'gallery', 'sponsors'];
      const promises = endpoints.map(endpoint => 
        fetch(`${API_BASE_URL}/${endpoint}`).then(r => r.json())
      );
      
      const results = await Promise.all(promises);
      setStats({
        events: results[0].length || 0,
        schedule: results[1].length || 0,
        team: results[2].length || 0,
        gallery: results[3].length || 0,
        sponsors: results[4].length || 0,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('admin_token');
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-white text-xl">Loading Admin Panel...</div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark to-black flex items-center justify-center px-4">
        <div className="bg-black/60 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md border border-secondary/30">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">🎭 Admin Panel</h1>
            <p className="text-gray-300">Bollywood Night Dashboard</p>
          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const username = formData.get('username');
            const password = formData.get('password');

            fetch(`${API_BASE_URL}/login`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username, password }),
            })
            .then(res => res.json())
            .then(data => {
              if (data.access_token) {
                localStorage.setItem('admin_token', data.access_token);
                handleLogin(data.access_token);
              } else {
                alert('Login failed: ' + (data.msg || 'Invalid credentials'));
              }
            })
            .catch(err => {
              console.error('Login error:', err);
              alert('Login failed: Network error');
            });
          }} className="space-y-6">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                name="username"
                className="w-full p-3 bg-black/40 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                className="w-full p-3 bg-black/40 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
                placeholder="Enter password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 admin-panel">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                🎭 <span className="text-primary">Bollywood Night</span> Admin
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="text-2xl font-bold text-primary">{stats.events || 0}</div>
            <div className="text-sm text-gray-600">Events</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="text-2xl font-bold text-secondary">{stats.schedule || 0}</div>
            <div className="text-sm text-gray-600">Schedule Items</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="text-2xl font-bold text-green-600">{stats.team || 0}</div>
            <div className="text-sm text-gray-600">Team Members</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="text-2xl font-bold text-purple-600">{stats.gallery || 0}</div>
            <div className="text-sm text-gray-600">Gallery Images</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="text-2xl font-bold text-blue-600">{stats.sponsors || 0}</div>
            <div className="text-sm text-gray-600">Sponsors</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="border-b border-gray-200">
            {/* Navigation Tabs - RESPONSIVE VERSION */}
              <div className="bg-white rounded-lg shadow-sm border mb-6">
                <div className="border-b border-gray-200">
                  {/* Desktop Navigation */}
                  <nav className="hidden lg:flex space-x-8 px-6">
                    {tabs.map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === tab.id
                            ? 'border-primary text-primary'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <span className="mr-2">{tab.icon}</span>
                        {tab.label}
                      </button>
                    ))}
                  </nav>
              
                  {/* Mobile/Tablet Dropdown */}
                  <div className="lg:hidden px-4 py-3">
                    <label htmlFor="tab-select" className="sr-only">Select a tab</label>
                    <select
                      id="tab-select"
                      value={activeTab}
                      onChange={(e) => setActiveTab(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white"
                    >
                      {tabs.map(tab => (
                        <option key={tab.id} value={tab.id}>
                          {tab.icon} {tab.label}
                        </option>
                      ))}
                    </select>
                  </div>
              
                  {/* Medium Screen - Scrollable Tabs */}
                  <nav className="hidden md:flex lg:hidden overflow-x-auto scrollbar-hide px-4 py-2">
                    <div className="flex space-x-4 min-w-max">
                      {tabs.map(tab => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`py-2 px-4 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                            activeTab === tab.id
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <span className="mr-2">{tab.icon}</span>
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </nav>
              
                  {/* Small Mobile - Icon Only */}
                  <nav className="flex md:hidden overflow-x-auto scrollbar-hide px-2 py-2">
                    <div className="flex space-x-2 min-w-max">
                      {tabs.map(tab => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`py-2 px-3 rounded-lg font-medium text-sm transition-colors ${
                            activeTab === tab.id
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                          title={tab.label}
                        >
                          <span className="text-lg">{tab.icon}</span>
                        </button>
                      ))}
                    </div>
                  </nav>
                </div>
              </div>
          </div>
        </div>

        {/* Active Component */}
        <div className="bg-white rounded-lg shadow-sm border">
          {renderActiveComponent(activeTab, token)}
        </div>
      </div>
    </div>
  );
}

// Render Active Component Function
function renderActiveComponent(activeTab, token) {
  switch(activeTab) {
    case 'overview':
      return <OverviewSection />;
    case 'events':
      return <EventsSection token={token} />;
    case 'schedule':
      return <ScheduleSection token={token} />;
    case 'team':
      return <TeamSection token={token} />;
    case 'gallery':
      return <GallerySection token={token} />;
    case 'sponsors':
      return <SponsorsSection token={token} />;
    case 'messages':
      return <MessagesSection token={token} />;
    case 'freshers':
      return <FreshersTitlesSection token={token} />;
    case 'tshirts-goodies':
      return <TShirtsGoodiesSection token={token} />;
    default:
      return <OverviewSection />;
  }
}

// Overview Section Component
function OverviewSection() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 border border-primary/20">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">🎭 Event Management</h3>
          <p className="text-gray-600 mb-4">Manage all your Bollywood Night events, update details, and track registrations.</p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Create and edit events</li>
            <li>• Set dates and locations</li>
            <li>• Upload event images</li>
          </ul>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">📅 Schedule Control</h3>
          <p className="text-gray-600 mb-4">Keep your event timeline updated and organized for smooth execution.</p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Add schedule items</li>
            <li>• Update status (done/ongoing/upcoming)</li>
            <li>• Real-time schedule display</li>
          </ul>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 border border-green-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">👥 Team Management</h3>
          <p className="text-gray-600 mb-4">Showcase your organizing team with profiles and roles.</p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Add team member profiles</li>
            <li>• Assign roles and positions</li>
            <li>• Upload team photos</li>
          </ul>
        </div>
        
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">💬 Message Center</h3>
          <p className="text-gray-600 mb-4">View and respond to inquiries from website visitors.</p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Read contact messages</li>
            <li>• Track user inquiries</li>
            <li>• Manage communications</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-8 bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">🚀 Quick Start Guide</h3>
        <ol className="list-decimal list-inside text-gray-600 space-y-2">
          <li>Start by adding your events in the <strong>Events</strong> tab</li>
          <li>Create your event schedule in the <strong>Schedule</strong> tab</li>
          <li>Add your organizing team in the <strong>Team</strong> tab</li>
          <li>Upload photos in the <strong>Gallery</strong> tab</li>
          <li>Add sponsor information in the <strong>Sponsors</strong> tab</li>
          <li>Monitor messages in the <strong>Messages</strong> tab</li>
        </ol>
      </div>
    </div>
  );
}

// Simple CRUD Sections (we'll keep them simple for now)
function EventsSection({ token }) {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '', description: '', date: '', location: '', image_url: ''
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/events`);
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingEvent 
        ? `${API_BASE_URL}/admin/events/${editingEvent.id}`
        : `${API_BASE_URL}/admin/events`;
      
      const response = await fetch(url, {
        method: editingEvent ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchEvents();
        resetForm();
        alert(editingEvent ? 'Event updated successfully!' : 'Event created successfully!');
      } else {
        alert('Failed to save event');
      }
    } catch (error) {
      console.error('Failed to save event:', error);
      alert('Failed to save event');
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title || '',
      description: event.description || '',
      date: event.date || '',
      location: event.location || '',
      image_url: event.image_url || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (eventId) => {
    if (!confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/admin/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchEvents();
        alert('Event deleted successfully!');
      } else {
        alert('Failed to delete event');
      }
    } catch (error) {
      console.error('Failed to delete event:', error);
      alert('Failed to delete event');
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingEvent(null);
    setFormData({ title: '', description: '', date: '', location: '', image_url: '' });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Events Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium"
        >
          {showForm ? 'Cancel' : '+ Add Event'}
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 rounded-lg p-6 mb-6 border">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            {editingEvent ? '✏️ Edit Event' : '➕ Add New Event'}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Event Title *"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="text"
              placeholder="Date & Time (e.g., 2025-09-15 19:00)"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="url"
              placeholder="Image URL"
              value={formData.image_url}
              onChange={(e) => setFormData({...formData, image_url: e.target.value})}
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <textarea
              placeholder="Event Description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary md:col-span-2 h-24 resize-none"
              required
            />
            <div className="md:col-span-2 flex gap-3">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                {editingEvent ? '💾 Update Event' : '✨ Create Event'}
              </button>
              {editingEvent && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Events List */}
      <div className="space-y-4">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="border rounded-lg p-5 hover:shadow-md transition-shadow bg-white">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    {event.image_url && (
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="w-20 h-16 object-cover rounded-lg border"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                      <p className="text-gray-600 mb-3 leading-relaxed">{event.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        {event.date && (
                          <span className="flex items-center text-blue-600">
                            <span className="mr-1">📅</span> {event.date}
                          </span>
                        )}
                        {event.location && (
                          <span className="flex items-center text-green-600">
                            <span className="mr-1">📍</span> {event.location}
                          </span>
                        )}
                        <span className="text-gray-400">ID: {event.id}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(event)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                    title="Edit Event"
                  >
                    <span>✏️</span> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                    title="Delete Event"
                  >
                    <span>🗑️</span> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-4xl mb-4">🎪</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No Events Yet</h3>
            <p className="text-gray-500 mb-4">Start by creating your first Bollywood Night event!</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-medium"
            >
              + Create First Event
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


function ScheduleSection({ token }) {
  const [schedule, setSchedule] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    time: '', title: '', status: 'upcoming'
  });

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/schedule`);
      const data = await response.json();
      setSchedule(data);
    } catch (error) {
      console.error('Failed to fetch schedule:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingItem 
        ? `${API_BASE_URL}/admin/schedule/${editingItem.id}`
        : `${API_BASE_URL}/admin/schedule`;
      
      const response = await fetch(url, {
        method: editingItem ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchSchedule();
        resetForm();
        alert(editingItem ? 'Schedule item updated successfully!' : 'Schedule item created successfully!');
      } else {
        alert('Failed to save schedule item');
      }
    } catch (error) {
      console.error('Failed to save schedule item:', error);
      alert('Failed to save schedule item');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      time: item.time || '',
      title: item.title || '',
      status: item.status || 'upcoming'
    });
    setShowForm(true);
  };

  const handleDelete = async (itemId) => {
    if (!confirm('Are you sure you want to delete this schedule item? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/admin/schedule/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchSchedule();
        alert('Schedule item deleted successfully!');
      } else {
        alert('Failed to delete schedule item');
      }
    } catch (error) {
      console.error('Failed to delete schedule item:', error);
      alert('Failed to delete schedule item');
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingItem(null);
    setFormData({ time: '', title: '', status: 'upcoming' });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'done': return 'bg-green-100 text-green-800 border-green-200';
      case 'ongoing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'done': return '✅';
      case 'ongoing': return '🎬';
      case 'upcoming': return '⏰';
      default: return '📅';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Schedule Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium"
        >
          {showForm ? 'Cancel' : '+ Add Schedule Item'}
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 rounded-lg p-6 mb-6 border">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            {editingItem ? '✏️ Edit Schedule Item' : '➕ Add New Schedule Item'}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Time (e.g., 10:00 AM) *"
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="text"
              placeholder="Activity Title *"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="upcoming">⏰ Upcoming</option>
              <option value="ongoing">🎬 Ongoing</option>
              <option value="done">✅ Done</option>
            </select>
            <div className="md:col-span-3 flex gap-3">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                {editingItem ? '💾 Update Schedule Item' : '✨ Create Schedule Item'}
              </button>
              {editingItem && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Schedule List */}
      <div className="space-y-4">
        {schedule.length > 0 ? (
          schedule.map((item) => (
            <div key={item.id} className="border rounded-lg p-5 hover:shadow-md transition-shadow bg-white">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${
                      item.status === 'done' ? 'bg-green-100' :
                      item.status === 'ongoing' ? 'bg-yellow-100' :
                      'bg-blue-100'
                    }`}>
                      {getStatusIcon(item.status)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center text-blue-600 font-medium">
                        <span className="mr-1">🕐</span> {item.time}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(item.status)}`}>
                        {getStatusIcon(item.status)} {item.status.toUpperCase()}
                      </span>
                      <span className="text-gray-400">ID: {item.id}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                    title="Edit Schedule Item"
                  >
                    <span>✏️</span> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                    title="Delete Schedule Item"
                  >
                    <span>🗑️</span> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No Schedule Items Yet</h3>
            <p className="text-gray-500 mb-4">Start by creating your first schedule item for Bollywood Night!</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-medium"
            >
              + Create First Schedule Item
            </button>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {schedule.length > 0 && (
        <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">📋 Schedule Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-white rounded-lg p-4 border">
              <div className="text-2xl font-bold text-green-600">
                {schedule.filter(item => item.status === 'done').length}
              </div>
              <div className="text-sm text-gray-600">✅ Completed</div>
            </div>
            <div className="bg-white rounded-lg p-4 border">
              <div className="text-2xl font-bold text-yellow-600">
                {schedule.filter(item => item.status === 'ongoing').length}
              </div>
              <div className="text-sm text-gray-600">🎬 Ongoing</div>
            </div>
            <div className="bg-white rounded-lg p-4 border">
              <div className="text-2xl font-bold text-blue-600">
                {schedule.filter(item => item.status === 'upcoming').length}
              </div>
              <div className="text-sm text-gray-600">⏰ Upcoming</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


function TeamSection({ token }) {
  const [team, setTeam] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '', role: '', image_url: '', bio: ''
  });

  // Predefined roles list
  const availableRoles = [
    'PRESIDENT',
    'VICE-PRESIDENT', 
    'TREASURER',
    'SECRETARY',
    'EVENT MANAGER',
    'CULTURAL HEAD',
    'VOLUNTEER HEAD',
    'DECORATION HEAD',
    'MARKETING HEAD',
    'CREATIVE MANAGER',
    'STUDENT COORDINATOR',
    'PHOTOGRAPHY HEAD',
    'SOCIAL-MEDIA MANAGER',
    'HOSPITALITY',
    'SPONSOR HEAD',
    'EXECUTIVE HEAD',
    'EXECUTIVE MEMBERS'
  ];

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/team`);
      const data = await response.json();
      setTeam(data);
    } catch (error) {
      console.error('Failed to fetch team:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingMember
        ? `${API_BASE_URL}/admin/team/${editingMember.id}`
        : `${API_BASE_URL}/admin/team`;

      const response = await fetch(url, {
        method: editingMember ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchTeam();
        resetForm();
        alert(editingMember ? 'Team member updated successfully!' : 'Team member added successfully!');
      } else {
        alert('Failed to save team member');
      }
    } catch (error) {
      console.error('Failed to save team member:', error);
      alert('Failed to save team member');
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name || '',
      role: member.role || '',
      image_url: member.image_url || '',
      bio: member.bio || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (memberId) => {
    if (!confirm('Are you sure you want to delete this team member? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/admin/team/${memberId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchTeam();
        alert('Team member deleted successfully!');
      } else {
        alert('Failed to delete team member');
      }
    } catch (error) {
      console.error('Failed to delete team member:', error);
      alert('Failed to delete team member');
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingMember(null);
    setFormData({ name: '', role: '', image_url: '', bio: '' });
  };

  const getRoleColor = (role) => {
    const lowerRole = role?.toLowerCase() || '';
    if (lowerRole.includes('president')) return 'bg-purple-100 text-purple-800 border-purple-200';
    if (lowerRole.includes('vice') || lowerRole.includes('deputy')) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (lowerRole.includes('secretary') || lowerRole.includes('treasurer')) return 'bg-green-100 text-green-800 border-green-200';
    if (lowerRole.includes('head') || lowerRole.includes('manager')) return 'bg-orange-100 text-orange-800 border-orange-200';
    if (lowerRole.includes('coordinator') || lowerRole.includes('executive')) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getRoleIcon = (role) => {
    const lowerRole = role?.toLowerCase() || '';
    if (lowerRole.includes('president')) return '👑';
    if (lowerRole.includes('vice')) return '🎖️';
    if (lowerRole.includes('secretary')) return '📝';
    if (lowerRole.includes('treasurer')) return '💰';
    if (lowerRole.includes('manager') || lowerRole.includes('head')) return '🎯';
    if (lowerRole.includes('coordinator')) return '⭐';
    if (lowerRole.includes('member')) return '👤';
    return '🎪';
  };

  // Group team members by role for better overview
  const groupedTeam = availableRoles.map(role => ({
    role,
    members: team.filter(member => member.role?.toUpperCase() === role),
    count: team.filter(member => member.role?.toUpperCase() === role).length
  })).filter(group => group.count > 0);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Team Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium"
        >
          {showForm ? 'Cancel' : '+ Add Team Member'}
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 rounded-lg p-6 mb-6 border">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            {editingMember ? '✏️ Edit Team Member' : '➕ Add New Team Member'}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name *"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            
            {/* ROLE DROPDOWN - Main Change */}
            <select
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select Role/Position *</option>
              {availableRoles.map((role) => (
                <option key={role} value={role}>
                  {role.replace(/-/g, ' ')}
                </option>
              ))}
            </select>
            
            <input
              type="url"
              placeholder="Photo URL (optional)"
              value={formData.image_url}
              onChange={(e) => setFormData({...formData, image_url: e.target.value})}
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary md:col-span-2"
            />
            <textarea
              placeholder="Bio/Description (optional)"
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary md:col-span-2 h-24 resize-none"
            />
            <div className="md:col-span-2 flex gap-3">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                {editingMember ? '💾 Update Member' : '✨ Add Member'}
              </button>
              {editingMember && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Hierarchical Team Display */}
      {groupedTeam.length > 0 ? (
        <div className="space-y-6">
          {groupedTeam.map((group) => (
            <div key={group.role} className="bg-white rounded-lg border shadow-sm">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 px-6 py-3 border-b">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  {getRoleIcon(group.role)} {group.role.replace(/-/g, ' ')} 
                  <span className="bg-primary text-white px-2 py-1 rounded-full text-xs">
                    {group.count}
                  </span>
                </h3>
              </div>
              <div className="p-4 space-y-3">
                {group.members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        {member.image_url ? (
                          <img
                            src={member.image_url}
                            alt={member.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border-2 border-gray-200">
                            <span className="text-lg">👤</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{member.name}</h4>
                        {member.bio && (
                          <p className="text-sm text-gray-600 line-clamp-2">{member.bio}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(member)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No Team Members Yet</h3>
          <p className="text-gray-500 mb-4">Start by adding your first team member for Bollywood Night!</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-medium"
          >
            + Add First Team Member
          </button>
        </div>
      )}

      {/* Team Statistics */}
      {team.length > 0 && (
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">👥 Team Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white rounded-lg p-4 border">
              <div className="text-2xl font-bold text-purple-600">
                {groupedTeam.find(g => g.role === 'PRESIDENT')?.count || 0}
              </div>
              <div className="text-sm text-gray-600">👑 President</div>
            </div>
            <div className="bg-white rounded-lg p-4 border">
              <div className="text-2xl font-bold text-blue-600">
                {groupedTeam.filter(g => g.role.includes('HEAD')).reduce((sum, g) => sum + g.count, 0)}
              </div>
              <div className="text-sm text-gray-600">🎯 Heads</div>
            </div>
            <div className="bg-white rounded-lg p-4 border">
              <div className="text-2xl font-bold text-green-600">
                {team.filter(m => m.image_url && m.image_url.trim() !== '').length}
              </div>
              <div className="text-sm text-gray-600">📸 With Photos</div>
            </div>
            <div className="bg-white rounded-lg p-4 border">
              <div className="text-2xl font-bold text-gray-600">
                {team.length}
              </div>
              <div className="text-sm text-gray-600">👤 Total Members</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


function GallerySection({ token }) {
  const [gallery, setGallery] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    image_url: '', caption: ''
  });
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/gallery`);
      const data = await response.json();
      setGallery(data);
    } catch (error) {
      console.error('Failed to fetch gallery:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingItem 
        ? `${API_BASE_URL}/admin/gallery/${editingItem.id}`
        : `${API_BASE_URL}/admin/gallery`;
      
      const response = await fetch(url, {
        method: editingItem ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchGallery();
        resetForm();
        alert(editingItem ? 'Gallery item updated successfully!' : 'Gallery item added successfully!');
      } else {
        alert('Failed to save gallery item');
      }
    } catch (error) {
      console.error('Failed to save gallery item:', error);
      alert('Failed to save gallery item');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      image_url: item.image_url || '',
      caption: item.caption || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (itemId) => {
    if (!confirm('Are you sure you want to delete this image? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/admin/gallery/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchGallery();
        alert('Gallery item deleted successfully!');
      } else {
        alert('Failed to delete gallery item');
      }
    } catch (error) {
      console.error('Failed to delete gallery item:', error);
      alert('Failed to delete gallery item');
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingItem(null);
    setFormData({ image_url: '', caption: '' });
  };

  const isValidImageUrl = (url) => {
    return url.match(/\.(jpeg|jpg|gif|png|svg|webp)$/i) || url.includes('images/');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gallery Management</h2>
        <div className="flex gap-3">
          <div className="bg-gray-100 rounded-lg p-1 flex">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === 'grid' ? 'bg-white text-primary shadow-sm' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              🔳 Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === 'list' ? 'bg-white text-primary shadow-sm' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              📋 List
            </button>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium"
          >
            {showForm ? 'Cancel' : '+ Add Image'}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-gray-50 rounded-lg p-6 mb-6 border">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            {editingItem ? '✏️ Edit Gallery Item' : '➕ Add New Image'}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL *</label>
              <input
                type="url"
                placeholder="https://example.com/image.jpg or /images/photo.jpg"
                value={formData.image_url}
                onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              {formData.image_url && (
                <div className="mt-2">
                  {isValidImageUrl(formData.image_url) ? (
                    <div className="flex items-center text-green-600 text-sm">
                      <span>✅ Valid image URL</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-amber-600 text-sm">
                      <span>⚠️ URL may not be a valid image format</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Caption (Optional)</label>
              <input
                type="text"
                placeholder="Describe this image..."
                value={formData.caption}
                onChange={(e) => setFormData({...formData, caption: e.target.value})}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Image Preview */}
            {formData.image_url && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
                <div className="border rounded-lg p-4 bg-white">
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="w-32 h-24 object-cover rounded-lg border"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9Ijk2IiB2aWV3Qm94PSIwIDAgMTI4IDk2IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTI4IiBoZWlnaHQ9Ijk2IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00OCA0MEw2NCA1NkwxMDQgMTZWODBIOEw0OCA0MFoiIGZpbGw9IiNEMUQ1REIiLz4KPC9zdmc+';
                      e.target.title = 'Failed to load image';
                    }}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                {editingItem ? '💾 Update Image' : '✨ Add Image'}
              </button>
              {editingItem && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Gallery Display */}
      <div className="space-y-4">
        {gallery.length > 0 ? (
          viewMode === 'grid' ? (
            /* Grid View */
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {gallery.map((item) => (
                <div key={item.id} className="relative group bg-white rounded-lg border overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.caption || `Gallery item ${item.id}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00OCA0MEw2NCA1NkwxMDQgMTZWMTEySDhMNDggNDBaIiBmaWxsPSIjRDFENURCIi8+Cjwvc3ZnPg==';
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg text-sm font-medium transition-colors"
                          title="Edit Image"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg text-sm font-medium transition-colors"
                          title="Delete Image"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                  {item.caption && (
                    <div className="p-2">
                      <p className="text-xs text-gray-600 truncate" title={item.caption}>
                        {item.caption}
                      </p>
                    </div>
                  )}
                  <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                    #{item.id}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-3">
              {gallery.map((item) => (
                <div key={item.id} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={item.image_url}
                        alt={item.caption || `Gallery item ${item.id}`}
                        className="w-16 h-16 object-cover rounded-lg border"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCAyMEwzMiAyOEw1MiA4VjU2SDRMMjQgMjBaIiBmaWxsPSIjRDFENURCIi8+Cjwvc3ZnPg==';
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-500">ID: {item.id}</span>
                        <span className="text-gray-300">•</span>
                        <a
                          href={item.image_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 truncate max-w-xs"
                          title={item.image_url}
                        >
                          {item.image_url}
                        </a>
                      </div>
                      {item.caption && (
                        <p className="text-gray-700 text-sm">{item.caption}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-4xl mb-4">📸</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No Gallery Images Yet</h3>
            <p className="text-gray-500 mb-4">Start by adding your first image for Bollywood Night!</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-medium"
            >
              + Add First Image
            </button>
          </div>
        )}
      </div>

      {/* Gallery Statistics */}
      {gallery.length > 0 && (
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Gallery Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white rounded-lg p-4 border">
              <div className="text-2xl font-bold text-purple-600">{gallery.length}</div>
              <div className="text-sm text-gray-600">📸 Total Images</div>
            </div>
            <div className="bg-white rounded-lg p-4 border">
              <div className="text-2xl font-bold text-blue-600">
                {gallery.filter(item => item.caption && item.caption.trim() !== '').length}
              </div>
              <div className="text-sm text-gray-600">📝 With Captions</div>
            </div>
            <div className="bg-white rounded-lg p-4 border">
              <div className="text-2xl font-bold text-green-600">
                {gallery.filter(item => item.image_url.includes('http')).length}
              </div>
              <div className="text-sm text-gray-600">🌐 External URLs</div>
            </div>
            <div className="bg-white rounded-lg p-4 border">
              <div className="text-2xl font-bold text-orange-600">
                {gallery.filter(item => item.image_url.includes('/images/')).length}
              </div>
              <div className="text-sm text-gray-600">💻 Local Images</div>
            </div>
          </div>
        </div>
      )}

      {/* Image URL Tips */}
      {showForm && (
        <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">💡 Image URL Tips:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• <strong>Local images:</strong> /images/photo1.jpg, /images/gallery/pic.png</li>
            <li>• <strong>External URLs:</strong> https://example.com/image.jpg</li>
            <li>• <strong>Supported formats:</strong> .jpg, .png, .gif, .webp, .svg</li>
            <li>• <strong>Recommended size:</strong> 800x600 pixels or larger for best quality</li>
          </ul>
        </div>
      )}
    </div>
  );
}


function SponsorsSection({ token }) {
  const [sponsors, setSponsors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState(null);
  const [formData, setFormData] = useState({
    name: '', logo_url: ''
  });

  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchSponsors = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/sponsors`);
      const data = await response.json();
      setSponsors(data);
    } catch (error) {
      console.error('Failed to fetch sponsors:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingSponsor 
        ? `${API_BASE_URL}/admin/sponsors/${editingSponsor.id}`
        : `${API_BASE_URL}/admin/sponsors`;
      
      const response = await fetch(url, {
        method: editingSponsor ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchSponsors();
        resetForm();
        alert(editingSponsor ? 'Sponsor updated successfully!' : 'Sponsor added successfully!');
      } else {
        alert('Failed to save sponsor');
      }
    } catch (error) {
      console.error('Failed to save sponsor:', error);
      alert('Failed to save sponsor');
    }
  };

  const handleEdit = (sponsor) => {
    setEditingSponsor(sponsor);
    setFormData({
      name: sponsor.name || '',
      logo_url: sponsor.logo_url || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (sponsorId) => {
    if (!confirm('Are you sure you want to delete this sponsor? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/admin/sponsors/${sponsorId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchSponsors();
        alert('Sponsor deleted successfully!');
      } else {
        alert('Failed to delete sponsor');
      }
    } catch (error) {
      console.error('Failed to delete sponsor:', error);
      alert('Failed to delete sponsor');
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingSponsor(null);
    setFormData({ name: '', logo_url: '' });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Sponsors Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium"
        >
          {showForm ? 'Cancel' : '+ Add Sponsor'}
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 rounded-lg p-6 mb-6 border">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            {editingSponsor ? '✏️ Edit Sponsor' : '➕ Add New Sponsor'}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Company Name *"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="url"
              placeholder="Logo URL"
              value={formData.logo_url}
              onChange={(e) => setFormData({...formData, logo_url: e.target.value})}
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="md:col-span-2 flex gap-3">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                {editingSponsor ? '💾 Update Sponsor' : '✨ Add Sponsor'}
              </button>
              {editingSponsor && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Sponsors List - EXACTLY LIKE EVENTS */}
      <div className="space-y-4">
        {sponsors.length > 0 ? (
          sponsors.map((sponsor) => (
            <div key={sponsor.id} className="border rounded-lg p-5 hover:shadow-md transition-shadow bg-white">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    {sponsor.logo_url && (
                      <img
                        src={sponsor.logo_url}
                        alt={sponsor.name}
                        className="w-20 h-16 object-cover rounded-lg border"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{sponsor.name}</h3>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="text-gray-400">ID: {sponsor.id}</span>
                        {sponsor.logo_url && (
                          <span className="flex items-center text-blue-600">
                            <span className="mr-1">🔗</span> Logo URL
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(sponsor)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                    title="Edit Sponsor"
                  >
                    <span>✏️</span> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(sponsor.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                    title="Delete Sponsor"
                  >
                    <span>🗑️</span> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No Sponsors Yet</h3>
            <p className="text-gray-500 mb-4">Start by adding your first sponsor for Bollywood Night!</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-medium"
            >
              + Add First Sponsor
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


function MessagesSection({ token }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [markingAsRead, setMarkingAsRead] = useState(new Set());

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/admin/contact-messages`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        alert('Failed to fetch messages');
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      alert('Failed to fetch messages');
    }
    setLoading(false);
  };

  // Since your backend doesn't have read/unread status, we'll simulate it with localStorage
  const getReadStatus = (messageId) => {
    const readMessages = JSON.parse(localStorage.getItem('readMessages') || '[]');
    return readMessages.includes(messageId);
  };

  const markAsRead = (messageId) => {
    const readMessages = JSON.parse(localStorage.getItem('readMessages') || '[]');
    if (!readMessages.includes(messageId)) {
      readMessages.push(messageId);
      localStorage.setItem('readMessages', JSON.stringify(readMessages));
    }
  };

  const markAsUnread = (messageId) => {
    const readMessages = JSON.parse(localStorage.getItem('readMessages') || '[]');
    const updatedMessages = readMessages.filter(id => id !== messageId);
    localStorage.setItem('readMessages', JSON.stringify(updatedMessages));
  };

  const toggleReadStatus = (messageId) => {
    setMarkingAsRead(prev => new Set(prev).add(messageId));
    setTimeout(() => {
      const isRead = getReadStatus(messageId);
      if (isRead) {
        markAsUnread(messageId);
      } else {
        markAsRead(messageId);
      }
      setMarkingAsRead(prev => {
        const newSet = new Set(prev);
        newSet.delete(messageId);
        return newSet;
      });
    }, 300);
  };

  // Filter messages based on search and status
  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message?.toLowerCase().includes(searchTerm.toLowerCase());

    const isRead = getReadStatus(message.id);
    const matchesStatus = 
      statusFilter === 'all' ||
      (statusFilter === 'read' && isRead) ||
      (statusFilter === 'unread' && !isRead);

    return matchesSearch && matchesStatus;
  });

  const unreadCount = messages.filter(m => !getReadStatus(m.id)).length;

  // Reply email function
  const sendReplyEmail = (message) => {
    const subject = encodeURIComponent('Thank you for your inquiry about Bollywood Night');
    const body = encodeURIComponent(`Dear ${message.name},

Thank you for reaching out to us about our Bollywood Night event!

We really appreciate your interest and will get back to you soon with more details.

Best regards,
Arpan Pramanik
Bollywood Night Team
arpan.pramanik23@tnu.in`);
    
    const mailtoLink = `mailto:${message.email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Contact Messages</h2>
          <p className="text-gray-600 text-sm mt-1">
            {messages.length} total messages • {unreadCount} unread
          </p>
        </div>
        <button
          onClick={fetchMessages}
          disabled={loading}
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {loading ? '🔄 Loading...' : '🔄 Refresh'}
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-4 sm:space-y-0 sm:flex sm:gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="🔍 Search messages by name, email, or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">📧 All Messages</option>
            <option value="unread">🔵 Unread ({unreadCount})</option>
            <option value="read">✅ Read ({messages.length - unreadCount})</option>
          </select>
        </div>
      </div>

      {/* Messages List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📬</div>
          <p className="text-gray-600">Loading messages...</p>
        </div>
      ) : filteredMessages.length > 0 ? (
        <div className="space-y-4">
          {filteredMessages.map((message) => {
            const isRead = getReadStatus(message.id);
            const isMarking = markingAsRead.has(message.id);
            
            return (
              <div
                key={message.id}
                className={`border rounded-lg p-5 transition-all duration-200 ${
                  isRead 
                    ? 'bg-white hover:shadow-md border-gray-200' 
                    : 'bg-blue-50 hover:shadow-md border-blue-200 border-l-4 border-l-blue-500'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${isRead ? 'bg-gray-300' : 'bg-blue-500'}`}></div>
                    <div>
                      <h3 className={`font-bold ${isRead ? 'text-gray-700' : 'text-gray-900'}`}>
                        {message.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>📧 {message.email}</span>
                        <span>•</span>
                        <span>ID: {message.id}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleReadStatus(message.id)}
                      disabled={isMarking}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        isRead
                          ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
                      }`}
                      title={isRead ? 'Mark as unread' : 'Mark as read'}
                    >
                      {isMarking ? '⏳' : isRead ? '👁️ Read' : '🔵 New'}
                    </button>
                    
                    <button
                      onClick={() => sendReplyEmail(message)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                      title="Reply via email"
                    >
                      📤 Reply
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-l-gray-300">
                  <p className={`whitespace-pre-wrap leading-relaxed ${isRead ? 'text-gray-600' : 'text-gray-800'}`}>
                    {message.message}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-4xl mb-4">
            {searchTerm || statusFilter !== 'all' ? '🔍' : '📭'}
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            {searchTerm || statusFilter !== 'all' ? 'No messages found' : 'No messages yet'}
          </h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search terms or filters'
              : 'Messages from your website contact form will appear here'
            }
          </p>
          {(searchTerm || statusFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
              }}
              className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}

      {/* Statistics */}
      {messages.length > 0 && (
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">💬 Messages Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white rounded-lg p-4 border">
              <div className="text-2xl font-bold text-blue-600">{messages.length}</div>
              <div className="text-sm text-gray-600">📧 Total Messages</div>
            </div>
            <div className="bg-white rounded-lg p-4 border">
              <div className="text-2xl font-bold text-orange-600">{unreadCount}</div>
              <div className="text-sm text-gray-600">🔵 Unread</div>
            </div>
            <div className="bg-white rounded-lg p-4 border">
              <div className="text-2xl font-bold text-green-600">{messages.length - unreadCount}</div>
              <div className="text-sm text-gray-600">✅ Read</div>
            </div>
            <div className="bg-white rounded-lg p-4 border">
              <div className="text-2xl font-bold text-purple-600">
                {new Set(messages.map(m => m.email)).size}
              </div>
              <div className="text-sm text-gray-600">👤 Unique Contacts</div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      {messages.length > 0 && (
        <div className="mt-6 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">💡 Quick Actions:</h4>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                messages.forEach(m => markAsRead(m.id));
                window.location.reload();
              }}
              className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded border transition-colors"
            >
              Mark All as Read
            </button>
            <button
              onClick={() => {
                messages.forEach(m => markAsUnread(m.id));
                window.location.reload();
              }}
              className="text-xs bg-orange-100 hover:bg-orange-200 text-orange-700 px-3 py-1 rounded border transition-colors"
            >
              Mark All as Unread
            </button>
            <button
              onClick={() => {
                const csvContent = messages.map(m => 
                  `"${m.id}","${m.name}","${m.email}","${m.message.replace(/"/g, '""')}"`
                ).join('\n');
                const blob = new Blob([`ID,Name,Email,Message\n${csvContent}`], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'contact-messages.csv';
                a.click();
              }}
              className="text-xs bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded border transition-colors"
            >
              📄 Export to CSV
            </button>
          </div>
        </div>
      )}

      {/* Email Instructions */}
      <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">📧 Email Reply Instructions:</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• Click the <strong>📤 Reply</strong> button to open your email client</p>
          <p>• The email will be pre-filled with a thank you message</p>
          <p>• Your email signature (arpan.pramanik23@tnu.in) is included</p>
          <p>• Just add any specific details and send!</p>
        </div>
      </div>
    </div>
  );
}


function FreshersTitlesSection({ token }) {
  const [titles, setTitles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTitle, setEditingTitle] = useState(null);
  const [formData, setFormData] = useState({
    title: 'mister', winner_name: '', winner_image: '', winner_bio: '', year: 2025
  });

  useEffect(() => {
    fetchTitles();
  }, []);

  const fetchTitles = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/freshers-titles`);
      const data = await response.json();
      
      // Ensure we have both mister and miss entries
      let misterTitle = data.find(t => t.title === 'mister');
      let missTitle = data.find(t => t.title === 'miss');
      
      const titles = [];
      if (misterTitle) titles.push(misterTitle);
      if (missTitle) titles.push(missTitle);
      
      // Create empty entries if they don't exist
      if (!misterTitle) {
        await createEmptyTitle('mister');
        titles.push({ id: null, title: 'mister', winner_name: null, winner_image: null, winner_bio: null, year: 2025 });
      }
      if (!missTitle) {
        await createEmptyTitle('miss');
        titles.push({ id: null, title: 'miss', winner_name: null, winner_image: null, winner_bio: null, year: 2025 });
      }
      
      setTitles(titles);
    } catch (error) {
      console.error('Failed to fetch titles:', error);
      // Initialize with empty titles if API fails
      setTitles([
        { id: null, title: 'mister', winner_name: null, winner_image: null, winner_bio: null, year: 2025 },
        { id: null, title: 'miss', winner_name: null, winner_image: null, winner_bio: null, year: 2025 }
      ]);
    }
  };

  const createEmptyTitle = async (titleType) => {
    try {
      await fetch(`${API_BASE_URL}/admin/freshers-titles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: titleType,
          winner_name: null,
          winner_image: null,
          winner_bio: null,
          year: 2025
        }),
      });
    } catch (error) {
      console.error(`Failed to create empty ${titleType} title:`, error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const existingTitle = titles.find(t => t.title === formData.title);
      
      if (existingTitle && existingTitle.id) {
        // Update existing
        const response = await fetch(`${API_BASE_URL}/admin/freshers-titles/${existingTitle.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formData),
        });
        
        if (response.ok) {
          fetchTitles();
          resetForm();
          alert('Winner updated successfully!');
        } else {
          alert('Failed to update winner');
        }
      } else {
        // Create new
        const response = await fetch(`${API_BASE_URL}/admin/freshers-titles`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formData),
        });
        
        if (response.ok) {
          fetchTitles();
          resetForm();
          alert('Winner added successfully!');
        } else {
          alert('Failed to add winner');
        }
      }
    } catch (error) {
      console.error('Failed to save winner:', error);
      alert('Failed to save winner');
    }
  };

  const handleEdit = (title) => {
    setEditingTitle(title);
    setFormData({
      title: title.title,
      winner_name: title.winner_name || '',
      winner_image: title.winner_image || '',
      winner_bio: title.winner_bio || '',
      year: title.year || 2025
    });
    setShowForm(true);
  };

  const handleClear = async (titleType) => {
    if (!confirm(`Are you sure you want to clear ${titleType === 'mister' ? 'Mister' : 'Miss'} Freshers data?`)) {
      return;
    }

    try {
      const existingTitle = titles.find(t => t.title === titleType);
      if (existingTitle && existingTitle.id) {
        const response = await fetch(`${API_BASE_URL}/admin/freshers-titles/${existingTitle.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            title: titleType,
            winner_name: null,
            winner_image: null,
            winner_bio: null,
            year: 2025
          }),
        });

        if (response.ok) {
          fetchTitles();
          alert('Winner data cleared successfully!');
        } else {
          alert('Failed to clear winner data');
        }
      }
    } catch (error) {
      console.error('Failed to clear winner:', error);
      alert('Failed to clear winner data');
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingTitle(null);
    setFormData({ title: 'mister', winner_name: '', winner_image: '', winner_bio: '', year: 2025 });
  };

  const getTitleData = (titleType) => {
    return titles.find(t => t.title === titleType) || { winner_name: null, winner_image: null, winner_bio: null };
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Freshers Titles Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium"
        >
          {showForm ? 'Cancel' : '👑 Update Winners'}
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 rounded-lg p-6 mb-6 border">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            {editingTitle ? `✏️ Edit ${editingTitle.title === 'mister' ? 'Mister' : 'Miss'} Freshers` : '👑 Update Freshers Winner'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!editingTitle && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <select
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="mister">👑 Mister Freshers 2025</option>
                  <option value="miss">👸 Miss Freshers 2025</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Winner Name *</label>
              <input
                type="text"
                placeholder="Enter winner's full name"
                value={formData.winner_name}
                onChange={(e) => setFormData({...formData, winner_name: e.target.value})}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Winner Photo URL</label>
              <input
                type="url"
                placeholder="https://example.com/winner-photo.jpg or /images/winner.jpg"
                value={formData.winner_image}
                onChange={(e) => setFormData({...formData, winner_image: e.target.value})}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio/Achievement</label>
              <textarea
                placeholder="Brief description about the winner..."
                value={formData.winner_bio}
                onChange={(e) => setFormData({...formData, winner_bio: e.target.value})}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary h-24 resize-none"
              />
            </div>

            {/* Photo Preview */}
            {formData.winner_image && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Photo Preview</label>
                <div className="border rounded-lg p-4 bg-white w-fit">
                  <img
                    src={formData.winner_image}
                    alt="Winner Preview"
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDgiIGN5PSI0OCIgcj0iNDgiIGZpbGw9IiNGM0Y0RjYiLz4KPGNpcmNsZSBjeD0iNDgiIGN5PSI0MCIgcj0iMTIiIGZpbGw9IiNEMUQ1REIiLz4KPHBhdGggZD0iTTI0IDcyQzI0IDY0IDMzLjYgNTYgNDggNTZTNzIgNjQgNzIgNzJWODhIMjRWNzJaIiBmaWxsPSIjRDFENURCIi8+Cjwvc3ZnPg==';
                    }}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                👑 {editingTitle ? 'Update Winner' : 'Set Winner'}
              </button>
              {editingTitle && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Current Winners Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {['mister', 'miss'].map((titleType) => {
          const titleData = getTitleData(titleType);
          const hasWinner = titleData.winner_name;

          return (
            <div key={titleType} className="bg-white rounded-lg border overflow-hidden shadow-sm">
              <div className={`p-4 text-center text-white ${
                titleType === 'mister' ? 'bg-gradient-to-r from-blue-600 to-blue-800' : 'bg-gradient-to-r from-pink-600 to-pink-800'
              }`}>
                <div className="text-3xl mb-2">{titleType === 'mister' ? '👑' : '👸'}</div>
                <h3 className="text-xl font-bold">
                  {titleType === 'mister' ? 'Mister' : 'Miss'} Freshers 2025
                </h3>
              </div>

              <div className="p-6 text-center">
                {hasWinner ? (
                  <div>
                    <div className="mb-4">
                      {titleData.winner_image ? (
                        <img
                          src={titleData.winner_image}
                          alt={titleData.winner_name}
                          className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-gray-200"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDgiIGN5PSI0OCIgcj0iNDgiIGZpbGw9IiNGM0Y0RjYiLz4KPGNpcmNsZSBjeD0iNDgiIGN5PSI0MCIgcj0iMTIiIGZpbGw9IiNEMUQ1REIiLz4KPHBhdGggZD0iTTI0IDcyQzI0IDY0IDMzLjYgNTYgNDggNTZTNzIgNjQgNzIgNzJWODhIMjRWNzJaIiBmaWxsPSIjRDFENURCIi8+Cjwvc3ZnPg==';
                          }}
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full mx-auto bg-gray-200 flex items-center justify-center border-4 border-gray-300">
                          <span className="text-3xl">{titleType === 'mister' ? '👤' : '👩'}</span>
                        </div>
                      )}
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{titleData.winner_name}</h4>
                    {titleData.winner_bio && (
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{titleData.winner_bio}</p>
                    )}
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleEdit(titleData)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        ✏️ Edit Winner
                      </button>
                      <button
                        onClick={() => handleClear(titleType)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        🗑️ Clear Winner
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-dashed border-gray-400">
                      <span className="text-gray-400 text-2xl">?</span>
                    </div>
                    <div className="bg-secondary/10 rounded-xl p-4 mb-4">
                      <p className="text-gray-600 font-medium">👑 To be announced!</p>
                      <p className="text-gray-500 text-sm mt-2">
                        The crown awaits our {titleType === 'mister' ? 'king' : 'queen'}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setFormData({ title: titleType, winner_name: '', winner_image: '', winner_bio: '', year: 2025 });
                        setShowForm(true);
                      }}
                      className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      👑 Set Winner
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Instructions */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h4 className="text-lg font-semibold text-gray-700 mb-3">💡 How to Use:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <h5 className="font-semibold text-gray-700 mb-2">Setting Winners:</h5>
            <ul className="space-y-1">
              <li>• Click "Set Winner" to add a new winner</li>
              <li>• Upload winner photos for better presentation</li>
              <li>• Add a brief bio or achievement description</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-gray-700 mb-2">Managing Data:</h5>
            <ul className="space-y-1">
              <li>• Click "Edit Winner" to update existing winners</li>
              <li>• Use "Clear Winner" to remove winner data</li>
              <li>• Changes automatically reflect on the main website</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function TShirtsGoodiesSection({ token }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    tshirt_photo_url: '',
    tshirt_form_url: '',
    goodies_photo_url: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/tshirts-goodies`);
      const data = await response.json();
      setData(data);
      setFormData({
        tshirt_photo_url: data.tshirt_photo_url || '',
        tshirt_form_url: data.tshirt_form_url || '',
        goodies_photo_url: data.goodies_photo_url || ''
      });
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/admin/tshirts-goodies`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchData();
        setShowForm(false);
        alert('T-shirts & Goodies updated successfully!');
      } else {
        alert('Failed to update T-shirts & Goodies');
      }
    } catch (error) {
      console.error('Failed to update:', error);
      alert('Failed to update T-shirts & Goodies');
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="text-4xl mb-4">👕</div>
        <p className="text-gray-600">Loading T-shirts & Goodies...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">T-shirts & Goodies Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium"
        >
          {showForm ? 'Cancel' : '👕 Update Store'}
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 rounded-lg p-6 mb-6 border">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            ✏️ Update T-shirts & Goodies
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">T-shirt Photo URL</label>
              <input
                type="url"
                placeholder="https://example.com/tshirt-image.jpg or /images/tshirt.jpg"
                value={formData.tshirt_photo_url}
                onChange={(e) => setFormData({...formData, tshirt_photo_url: e.target.value})}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">T-shirt Google Form URL *</label>
              <input
                type="url"
                placeholder="https://forms.google.com/..."
                value={formData.tshirt_form_url}
                onChange={(e) => setFormData({...formData, tshirt_form_url: e.target.value})}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Goodies Photo URL</label>
              <input
                type="url"
                placeholder="https://example.com/goodies-image.jpg or /images/goodies.jpg"
                value={formData.goodies_photo_url}
                onChange={(e) => setFormData({...formData, goodies_photo_url: e.target.value})}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Preview Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.tshirt_photo_url && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">T-shirt Preview</label>
                  <img
                    src={formData.tshirt_photo_url}
                    alt="T-shirt Preview"
                    className="w-full h-32 object-cover rounded-lg border"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00OCA0MEw2NCA1NkwxMDQgMTZWMTEySDhMNDggNDBaIiBmaWxsPSIjRDFENURCIi8+Cjwvc3ZnPg==';
                    }}
                  />
                </div>
              )}
              
              {formData.goodies_photo_url && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Goodies Preview</label>
                  <img
                    src={formData.goodies_photo_url}
                    alt="Goodies Preview"
                    className="w-full h-32 object-cover rounded-lg border"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00OCA0MEw2NCA1NkwxMDQgMTZWMTEySDhMNDggNDBaIiBmaWxsPSIjRDFENURCIi8+Cjwvc3ZnPg==';
                    }}
                  />
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                💾 Update Store
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Current Data Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* T-shirts Section */}
        <div className="bg-white rounded-lg border overflow-hidden shadow-sm">
          <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center">
            <div className="text-3xl mb-2">👕</div>
            <h3 className="text-xl font-bold">T-shirts</h3>
          </div>

          <div className="p-6 text-center">
            <div className="mb-4">
              {data.tshirt_photo_url ? (
                <img
                  src={data.tshirt_photo_url}
                  alt="T-shirts"
                  className="w-32 h-32 mx-auto object-cover border-4 border-gray-200 rounded-lg"
                />
              ) : (
                <div className="w-32 h-32 mx-auto bg-gray-200 flex items-center justify-center border-4 border-gray-300 rounded-lg">
                  <span className="text-3xl">👕</span>
                </div>
              )}
            </div>
            
            {data.tshirt_form_url ? (
              <div>
                <p className="text-green-600 font-medium mb-2">✅ Form URL Set</p>
                <a
                  href={data.tshirt_form_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm break-all"
                >
                  {data.tshirt_form_url}
                </a>
              </div>
            ) : (
              <p className="text-gray-500">No form URL set</p>
            )}
          </div>
        </div>

        {/* Goodies Section */}
        <div className="bg-white rounded-lg border overflow-hidden shadow-sm">
          <div className="p-4 bg-gradient-to-r from-green-600 to-green-800 text-white text-center">
            <div className="text-3xl mb-2">🎁</div>
            <h3 className="text-xl font-bold">Free Goodies</h3>
          </div>

          <div className="p-6 text-center">
            <div className="mb-4">
              {data.goodies_photo_url ? (
                <img
                  src={data.goodies_photo_url}
                  alt="Goodies"
                  className="w-32 h-32 mx-auto object-cover border-4 border-gray-200 rounded-lg"
                />
              ) : (
                <div className="w-32 h-32 mx-auto bg-gray-200 flex items-center justify-center border-4 border-gray-300 rounded-lg">
                  <span className="text-3xl">🎁</span>
                </div>
              )}
            </div>
            
            <div className="bg-green-50 rounded-lg p-3 border border-green-200">
              <p className="text-green-600 font-medium">Free Gifts Available!</p>
            </div>
          </div>
        </div>

      </div>

      {/* Instructions */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h4 className="text-lg font-semibold text-gray-700 mb-3">💡 Instructions:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <h5 className="font-semibold text-gray-700 mb-2">T-shirts Management:</h5>
            <ul className="space-y-1">
              <li>• Add T-shirt photo URL to display product image</li>
              <li>• Set Google Form URL for order collection</li>
              <li>• Form URL is required for "Order Now" button to work</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-gray-700 mb-2">Goodies Management:</h5>
            <ul className="space-y-1">
              <li>• Add goodies photo URL to showcase free items</li>
              <li>• No form needed - these are promotional gifts</li>
              <li>• Changes reflect immediately on main website</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
