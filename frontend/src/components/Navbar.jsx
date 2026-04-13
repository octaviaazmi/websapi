import React, { useState, useEffect } from 'react';
import { Search, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';

const categories = ['Ekonomis', 'Premium', 'Medium', 'Kambing Domba', 'Sapi Bali'];
const farms = ['Semua Kandang', 'Indopalm Farm Tajurhalang', 'Mumbul Sari', 'Indopalm Farm Ciseeng'];

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Ekonomis');
  const [selectedFarm, setSelectedFarm] = useState('Semua Kandang');
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [farmOpen, setFarmOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReset = () => {
    setSelectedCategory('Semua Kategori');
    setSelectedFarm('Semua Kandang');
  };

  const handleClose = () => {
    setFilterOpen(false);
    setCategoryOpen(false);
    setFarmOpen(false);
  };

  const handleSearchClick = () => {
    navigate(`/catalog?search=${encodeURIComponent(searchQuery)}&category=${encodeURIComponent(selectedCategory)}&farm=${encodeURIComponent(selectedFarm)}`);
    setFilterOpen(false);
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-gradient-to-r from-amber-500/95 to-orange-500/95 backdrop-blur-md border-b border-amber-400/40 shadow-xl shadow-amber-300/20'
        : 'bg-gradient-to-r from-amber-500 to-orange-500 border-b border-amber-400/30'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-3">

        {/* === BARIS 1: Logo + Filter + Search Button === */}
        <div className="flex items-center gap-3">

          {/* Logo */}
          <Link to="/">
            <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0 cursor-pointer flex items-center gap-2">
              <img src="/Logo%20Farm.png" alt="Indopalm Logo" className="h-10 w-auto drop-shadow" />
              <span className="text-2xl font-black text-white tracking-tighter drop-shadow">
                indopalm<span className="text-yellow-200">Qu</span>
              </span>
            </motion.div>
          </Link>

          <div className="flex-1" />

          {/* Filter Button */}
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className={`flex items-center gap-2 px-4 py-2.5 font-extrabold rounded-xl border-b-4 transition-all text-sm ${
              filterOpen
                ? 'bg-amber-700 text-white border-amber-900'
                : 'bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm'
            }`}
          >
            <span>Filter</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Search Button */}
          <button
            onClick={handleSearchClick}
            className="p-2.5 bg-white/20 hover:bg-white/30 text-white rounded-xl border border-white/30 backdrop-blur-sm transition-all"
          >
            <Search className="h-5 w-5" />
          </button>

        </div>

        {/* === BARIS 2: Search Input (full width, baris sendiri) === */}
        <div className="mt-2.5">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
              className="w-full bg-white/95 border border-amber-200 rounded-xl px-4 py-2.5 text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all text-sm font-medium shadow-inner"
              placeholder="🔍  Cari sapi, kambing, atau jenis hewan qurban..."
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400 hover:text-red-500 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* === Filter Dropdown Row === */}
        <AnimatePresence>
          {filterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap items-center gap-2 pt-3">

                {/* Category Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => { setCategoryOpen(!categoryOpen); setFarmOpen(false); }}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-amber-800 rounded-xl font-bold text-sm shadow-md hover:bg-amber-50 transition-all border border-amber-200"
                  >
                    {selectedCategory}
                    <ChevronDown className={`h-4 w-4 transition-transform ${categoryOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {categoryOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full mt-1 left-0 bg-white rounded-xl shadow-xl border border-amber-100 overflow-hidden z-50 min-w-[160px]"
                      >
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => { setSelectedCategory(cat); setCategoryOpen(false); }}
                            className={`w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-amber-50 transition-colors ${selectedCategory === cat ? 'text-amber-600 font-bold bg-amber-50' : 'text-slate-700'}`}
                          >
                            {cat}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Farm Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => { setFarmOpen(!farmOpen); setCategoryOpen(false); }}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-amber-800 rounded-xl font-bold text-sm shadow-md hover:bg-amber-50 transition-all border border-amber-200"
                  >
                    {selectedFarm === 'Semua Kandang' ? 'Kandang' : selectedFarm.split(' ').slice(-1)[0]}
                    <ChevronDown className={`h-4 w-4 transition-transform ${farmOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {farmOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full mt-1 left-0 bg-white rounded-xl shadow-xl border border-amber-100 overflow-hidden z-50 min-w-[200px]"
                      >
                        {farms.map((farm) => (
                          <button
                            key={farm}
                            onClick={() => { setSelectedFarm(farm); setFarmOpen(false); }}
                            className={`w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-amber-50 transition-colors ${selectedFarm === farm ? 'text-amber-600 font-bold bg-amber-50' : 'text-slate-700'}`}
                          >
                            {farm}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Terapkan Button */}
                <button 
                   onClick={handleSearchClick}
                   className="px-5 py-2 bg-amber-700 text-white font-bold text-sm rounded-xl hover:bg-amber-800 transition-all shadow-sm"
                >
                  Terapkan
                </button>

                {/* Reset Button */}
                <button
                  onClick={handleReset}
                  className="px-5 py-2 bg-white/80 text-amber-700 font-bold text-sm rounded-xl border border-amber-200 hover:bg-white transition-all shadow-sm"
                >
                  Reset
                </button>

                {/* Close */}
                <button
                  onClick={handleClose}
                  className="ml-auto p-2 text-white/80 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </nav>
  );
};

export default Navbar;
