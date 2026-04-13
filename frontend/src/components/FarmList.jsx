import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FarmList = ({ onSelectFarm, activeFarm }) => {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const baseUrl = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';
        const res = await fetch(`${baseUrl}/api/farms`);
        const data = await res.json();
        setFarms(data);
      } catch (err) {
        console.error('Error fetching farms:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFarms();
  }, []);

  if (loading) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 w-full flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-12 md:pb-16 border-b-[8px] md:border-b-[12px] border-amber-700/30 shadow-2xl shadow-amber-300/40 w-full flex flex-col items-center overflow-hidden"
      >
        <div className="flex flex-col items-center mb-10 md:mb-14">
          <p className="text-[10px] md:text-sm font-[1000] text-white/80 uppercase tracking-[0.4em] mb-4 text-center">
            KANDANG KOLABORASI MITRA BISNIS INDOPALMQU
          </p>
          <div className="w-24 h-2 bg-white/40 rounded-full"></div>
        </div>

        <div className="bg-white/20 backdrop-blur-md rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-10 w-full max-w-6xl border border-white/30 shadow-inner">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 w-full">
            {farms.map((farm, index) => (
              <motion.button
                key={farm.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => onSelectFarm(farm.name)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group flex items-center gap-5 p-5 md:p-8 rounded-[2rem] border-4 transition-all text-left w-full ${
                  activeFarm === farm.name
                    ? 'bg-white border-yellow-200 shadow-2xl text-amber-800 scale-[1.02]'
                    : 'bg-white/80 border-white/30 shadow-xl hover:bg-white hover:shadow-2xl'
                }`}
              >
                <div className="w-14 h-14 md:w-20 md:h-20 bg-amber-50 rounded-2xl md:rounded-3xl flex items-center justify-center p-2.5 md:p-3 shadow-inner border border-amber-100 flex-none overflow-hidden">
                  <img
                    src={farm.logo_url || "https://cdn-icons-png.flaticon.com/512/619/619153.png"}
                    alt="farm icon"
                    className={`w-full h-full object-contain transition-all duration-500 ${
                      activeFarm === farm.name ? 'opacity-100' : 'opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100'
                    }`}
                  />
                </div>
                <p className={`flex-1 font-[1000] text-xs md:text-sm uppercase tracking-wider leading-tight transition-colors ${
                  activeFarm === farm.name ? 'text-amber-800' : 'text-amber-700/70'
                }`}>
                  {farm.name}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FarmList;
