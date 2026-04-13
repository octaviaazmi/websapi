import React, { useState } from 'react';
import Hero from '../components/Hero';
import FeaturePanel from '../components/FeaturePanel';
import CategoryFilters from '../components/CategoryFilters';
import FarmList from '../components/FarmList';
import ProductGrid from '../components/ProductGrid';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Semua Kategori');
  const [activeFarm, setActiveFarm] = useState('Semua Kandang');

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
  };

  const handleFarmSelect = (farm) => {
    setActiveFarm(farm);
  };

  return (
    <div className="flex flex-col items-center">
      <Hero />
      <FeaturePanel />

      <CategoryFilters
        activeCategory={activeCategory}
        onSelect={handleCategorySelect}
      />

      {/* === KATALOG INLINE === */}
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex items-center justify-between mb-2 pt-2">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-amber-800 tracking-tight">
              🐄 Katalog Hewan Qurban
            </h2>
            <p className="text-amber-600 text-sm font-medium mt-1">
              {activeCategory !== 'Semua Kategori' ? `Menampilkan: ${activeCategory}` : 'Semua Kategori'}
              {activeFarm !== 'Semua Kandang' ? ` • ${activeFarm}` : ''}
            </p>
          </div>
          <button
            onClick={() => navigate('/catalog')}
            className="text-xs font-bold text-amber-700 border border-amber-300 bg-white/70 px-4 py-2 rounded-xl hover:bg-amber-50 transition-all flex-shrink-0"
          >
            Lihat Semua →
          </button>
        </div>
      </div>

      <ProductGrid
        categoryId={activeCategory}
        farmName={activeFarm}
        searchQuery=""
      />

      <FarmList
        activeFarm={activeFarm}
        onSelectFarm={handleFarmSelect}
      />
    </div>
  );
};

export default Home;
