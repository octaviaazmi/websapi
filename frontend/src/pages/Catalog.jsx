import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import CategoryFilters from '../components/CategoryFilters';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const category = searchParams.get('category') || 'Semua Kategori';
  const farm = searchParams.get('farm') || 'Semua Kandang';
  const search = searchParams.get('search') || '';

  const [searchQueryLocal, setSearchQueryLocal] = useState(search);

  const handleCategorySelect = (newCat) => {
    setSearchParams({ category: newCat, farm, search });
  };

  const handleSearchSubmit = () => {
    setSearchParams({ category, farm, search: searchQueryLocal });
  };

  const handleReset = () => {
    setSearchParams({ category: 'Semua Kategori', farm: 'Semua Kandang', search: '' });
    setSearchQueryLocal('');
  };

  return (
    <div className="max-w-7xl mx-auto pb-8 px-4">
      
      {/* Header - Back button & judul di baris sendiri */}
      <div className="py-4 border-b border-amber-200/60 mb-4">
        {/* Baris 1: Back + Judul */}
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-4 py-2 rounded-xl font-black text-xs uppercase shadow-sm transition-all flex-none"
          >
            <ChevronLeft className="w-4 h-4 stroke-[3px]" />
            Kembali
          </button>
          <h2 className="text-xl md:text-2xl font-black text-amber-800 tracking-tight">
            {category === 'Semua Kategori' ? '🐄 Semua Katalog' : `Kategori ${category}`}
          </h2>
        </div>

        {/* Baris 2: Search bar — full width sendiri */}
        <div className="flex items-stretch gap-2 rounded-xl overflow-hidden border border-amber-200 shadow-sm bg-white">
          <input
            type="text"
            value={searchQueryLocal}
            onChange={(e) => setSearchQueryLocal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
            className="flex-1 px-4 py-2.5 text-sm text-amber-800 focus:outline-none placeholder-amber-300"
            placeholder="Cari hewan qurban..."
          />
          <button
            onClick={handleSearchSubmit}
            className="px-6 py-2.5 bg-amber-50 border-l border-amber-200 text-amber-700 font-bold hover:bg-amber-100 transition-colors text-sm"
          >
            Cari
          </button>
          {(category !== 'Semua Kategori' || farm !== 'Semua Kandang' || search) && (
            <button
              onClick={handleReset}
              className="px-4 py-2.5 bg-amber-50 border-l border-amber-200 text-amber-500 font-bold hover:bg-amber-100 transition-colors text-xs"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      <CategoryFilters activeCategory={category} onSelect={handleCategorySelect} />

      <ProductGrid
        categoryId={category}
        farmName={farm}
        searchQuery={search}
      />

      {/* Pagination */}
      <div className="mt-8 flex justify-center items-center gap-2">
        {[1, 2, '»'].map((page, i) => (
          <button
            key={i}
            className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm transition-all ${
              page === 1
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-300/40'
                : 'bg-white border border-amber-200 text-amber-600 hover:bg-amber-50'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
