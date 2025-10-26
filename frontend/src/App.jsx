import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
      </div>
    </Router>
  );
}

export default App;
