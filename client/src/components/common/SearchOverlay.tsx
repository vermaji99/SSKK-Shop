import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useUIStore } from '@/store/uiStore';
import { Product } from '@/lib/types';
import api from '@/lib/api';
import { DEFAULT_PRODUCT_IMAGE } from '@/config/assets';

export const SearchOverlay: React.FC = () => {
  const searchOpen = useUIStore((s) => s.searchOpen);
  const setSearchOpen = useUIStore((s) => s.setSearchOpen);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [searchOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.get(`/products?keyword=${encodeURIComponent(query)}&limit=6`);
        if (res.data?.data) {
          setResults(res.data.data);
        } else if (res.data?.products) {
          setResults(res.data.products);
        }
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchOpen(false);
      navigate(`/collections?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const categories = ['Rings', 'Earrings', 'Necklaces', 'Chains', 'Bangles', 'Bridal', 'Nath', 'Pendants'];

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9990] bg-[#0c0517]/95 backdrop-blur-xl flex flex-col p-4 md:p-8"
        >
          <div className="max-w-4xl w-full mx-auto flex items-center justify-between py-4 border-b border-gold-500/20">
            <span className="font-serif text-sm tracking-widest uppercase text-gold-300">
              Shubham Swarn Kala Kendra Search
            </span>
            <button
              onClick={() => setSearchOpen(false)}
              className="p-2 text-cream/70 hover:text-gold-400 rounded-full border border-gold-500/20 hover:border-gold-400 transition-colors"
              aria-label="Close search"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="max-w-3xl w-full mx-auto mt-8 md:mt-12 flex-1 flex flex-col">
            <form onSubmit={handleSearchSubmit} className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gold-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search gold rings, bridal necklaces, bangles, nath..."
                className="w-full bg-[#1b0c33]/80 border-2 border-gold-500/30 focus:border-gold-400 rounded-2xl py-4 pl-14 pr-12 text-cream text-lg md:text-xl placeholder:text-cream/40 focus:outline-none focus:ring-2 focus:ring-gold-400/20 transition-all"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/50 hover:text-cream"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </form>

            {!query && (
              <div className="space-y-6">
                <h3 className="text-xs uppercase tracking-widest text-gold-400 font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Popular Categories
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSearchOpen(false);
                        navigate(`/collections?category=${cat.toLowerCase()}`);
                      }}
                      className="px-4 py-2 rounded-full bg-[#200d3d] border border-gold-500/20 hover:border-gold-400 text-cream/90 hover:text-gold-300 text-sm transition-all"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {loading && (
              <div className="py-12 flex items-center justify-center text-gold-400">
                <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {!loading && query && results.length === 0 && (
              <div className="py-12 text-center text-cream/60">
                <p className="text-lg font-serif">No jewelry pieces matching "{query}"</p>
                <p className="text-xs mt-2 text-cream/40">Try searching for "22k Gold Ring", "Bridal Necklace", or "Bangles"</p>
              </div>
            )}

            {!loading && results.length > 0 && (
              <div className="space-y-4 overflow-y-auto max-h-[50vh] pr-2">
                <h3 className="text-xs uppercase tracking-widest text-gold-400 font-semibold">
                  Found Products ({results.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {results.map((product) => (
                    <Link
                      key={product._id}
                      to={`/product/${product.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-4 p-3 rounded-xl bg-[#1d0e36] border border-gold-500/20 hover:border-gold-400/60 transition-all group"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-purple-950 flex-shrink-0">
                        <img
                          src={product.images?.[0]?.url || DEFAULT_PRODUCT_IMAGE}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-sm font-semibold text-cream truncate group-hover:text-gold-300 transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-xs text-gold-400 font-medium mt-0.5">
                          ₹{product.price.toLocaleString('en-IN')}
                        </p>
                        <span className="text-[10px] text-cream/50 uppercase tracking-wider block mt-0.5">
                          {product.goldPurity || '22K Gold'}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gold-400/40 group-hover:text-gold-400 group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
