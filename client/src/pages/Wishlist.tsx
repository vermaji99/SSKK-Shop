import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ArrowRight, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { ProductCard, Button, SectionTitle } from '@/components/ui';
import SEO from '@/components/common/SEO';
import { useWishlistStore } from '@/store/wishlistStore';
import { useAuthStore } from '@/store/authStore';

const Wishlist = () => {
  const { items, fetchWishlist, removeFromWishlist, isLoading } = useWishlistStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      fetchWishlist();
    }
  }, [user, fetchWishlist]);

  const handleRemove = async (productId: string) => {
    try {
      await removeFromWishlist(productId);
      toast.success('Removed from wishlist');
    } catch {
      toast.error('Could not remove item');
    }
  };

  const displayItems = user ? items : items;

  return (
    <>
      <SEO
        title="Wishlist"
        description="Your saved jewelry pieces at Shubham Swarn Kala Kendra."
        noIndex
      />

      <section className="section-padding pt-32 min-h-screen">
        <div className="container">
          <SectionTitle
            label="Saved Pieces"
            title="Your Wishlist"
            subtitle="Curate your favorite gold and diamond creations — enquire anytime or visit our Doharighat showroom."
            className="mb-12"
          />

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[4/5] bg-purple-900/30 animate-pulse border border-purple-700/30"
                />
              ))}
            </div>
          ) : displayItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 glass max-w-lg mx-auto"
            >
              <Heart className="w-14 h-14 text-gold-400/60 mx-auto mb-6" strokeWidth={1.25} />
              <h2 className="heading-serif text-2xl text-cream mb-3">Your wishlist is empty</h2>
              <p className="text-text-muted text-sm mb-8">
                Explore our collections and save pieces you love.
              </p>
              <Button asChild>
                <Link to="/collections">
                  Browse Collections <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayItems.map((product) => (
                <div key={product._id} className="relative group">
                  <ProductCard product={product} />
                  <button
                    type="button"
                    onClick={() => handleRemove(product._id)}
                    className="absolute top-3 right-3 z-20 w-9 h-9 flex items-center justify-center bg-background/80 border border-red-400/40 text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Wishlist;
