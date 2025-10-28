import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Events from "./pages/Events";
import Schedule from "./pages/Schedule";
import Team from "./pages/Team";
import Prize from "./pages/Prize";
import Gallery from "./pages/Gallery";
import Sponsors from "./pages/Sponsors";
import TShirtsGoodies from './pages/TShirtsGoodies';
import Footer from "./components/Footer";
import AdminApp from "./admin/AdminApp";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  const isAdminRoute = window.location.pathname === '/admin';
  
  // Mobile viewport fix
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);
    
    return () => {
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('orientationchange', setViewportHeight);
    };
  }, []);
  
  if (isAdminRoute) {
    return (
      <ErrorBoundary>
        <AdminApp />
      </ErrorBoundary>
    );
  }

  return (
    <Router>
      <div className="bg-light text-dark min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-12">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/events" element={<Events />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/team" element={<Team />} />
            <Route path="/prizes" element={<Prize />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/tshirts-goodies" element={<TShirtsGoodies />} />
          </Routes>
        </main>
        <Footer />
        <Analytics />
      </div>
    </Router>
  );
}

export default App;
