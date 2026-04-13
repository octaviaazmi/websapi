import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import { motion, useScroll, useSpring } from 'framer-motion';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <Router>
      <div className="min-h-screen font-sans selection:bg-amber-300/40 selection:text-amber-900">
        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 origin-left z-[100]"
          style={{ scaleX }}
        />

        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/detail/:id" element={<ProductDetail />} />
        </Routes>

        {/* Footer */}
        <footer className="py-12 bg-gradient-to-r from-amber-600 to-orange-500 border-t border-amber-400/30 text-center">
          <div className="mb-4">
            <span className="text-5xl font-black text-white tracking-tighter select-none drop-shadow-md">
              indopalm<span className="text-yellow-200">Qu</span>
            </span>
          </div>
          <p className="text-xs font-bold text-white/60 uppercase tracking-[0.4em]">
            © 2026 indopalmQu • Premium Sacrificial Animals
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
