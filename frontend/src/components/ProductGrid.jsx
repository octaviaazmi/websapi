import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ProductGrid = ({ categoryId, farmName, searchQuery }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const baseUrl = window.location.hostname === 'localhost'
          ? 'http://localhost:5000'
          : '';

        let url = `${baseUrl}/api/products?`;
        if (categoryId && categoryId !== 'Semua Kategori') url += `category=${categoryId}&`;
        if (farmName && farmName !== 'Semua Kandang') url += `farm=${farmName}&`;
        if (searchQuery) url += `search=${searchQuery}&`;

        const res = await fetch(url);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, farmName, searchQuery]);

  if (loading) {
    return (
      <div className="w-full py-20 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-300 border-t-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -6 }}
            onClick={() => navigate(`/catalog/detail/${product.id}`)}
            className="group bg-white rounded-3xl overflow-hidden border border-amber-100 shadow-xl shadow-amber-100/50 relative cursor-pointer hover:shadow-2xl hover:shadow-amber-200/60 transition-all duration-300"
          >
            {/* Top Badge */}
            <div className="relative h-48 bg-amber-50">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-1 rounded-b-2xl font-black text-sm z-10 text-center shadow-md">
                <div className="text-[10px] text-white/70 font-bold uppercase tracking-tighter">{product.jenis}</div>
                {product.kode_unik}
              </div>
              {product.image_url ? (
                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
                  <span className="text-6xl opacity-30">🐂</span>
                </div>
              )}
              <div className="absolute bottom-2 right-2 opacity-40 text-[10px] font-bold text-amber-600">#IngatQurban</div>
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex flex-col mb-4">
                <h3 className="text-xl font-black text-amber-900 line-clamp-1 mb-1">{product.name}</h3>
                <span className="text-amber-500 font-black text-2xl">
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    maximumFractionDigits: 0
                  }).format(product.harga)}
                </span>
              </div>

              {/* Farm Badge */}
              <div className="bg-amber-50 rounded-xl p-3 flex items-center gap-2 mb-4 border border-amber-100">
                <span className="text-sm">🏠</span>
                <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest line-clamp-1">{product.farm_name}</span>
              </div>

              {/* Action Button */}
              <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 border-b-4 border-orange-600 hover:from-amber-600 hover:to-orange-600 text-white py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-3 transition-all shadow-lg shadow-amber-200/50 active:translate-y-1 active:border-b-0">
                <span className="text-lg">💬</span>
                HUBUNGI KAMI
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="w-full py-20 text-center">
          <div className="text-5xl mb-4">🐄</div>
          <p className="text-amber-600 font-bold">Belum ada produk untuk filter ini.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
