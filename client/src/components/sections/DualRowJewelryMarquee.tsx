import * as React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Heart, Sparkles, MessageCircle } from 'lucide-react';
import { SectionTitle } from '@/components/ui';
import { BlurImage } from '@/components/ui/BlurImage';
import { JEWELRY_IMAGES } from '@/config/assets';
import { BUSINESS } from '@/config/business';
import { useWishlistStore } from '@/store/wishlistStore';
import { useUIStore } from '@/store/uiStore';
import { cn } from '@/lib/utils';

export interface MarqueeJewelryItem {
  id: string;
  name: string;
  category: string;
  purity: string;
  image: string;
  slug: string;
  tag?: string;
}

const ROW_ONE_ITEMS: MarqueeJewelryItem[] = [
  {
    id: 'm1',
    name: 'Empress Solitaire Diamond Ring',
    category: 'Rings',
    purity: '22K & VVS Diamond',
    image: JEWELRY_IMAGES.ring,
    slug: 'rings',
    tag: 'SIGNATURE',
  },
  {
    id: 'm2',
    name: 'Royal Heritage Haar Set',
    category: 'Bridal',
    purity: '22K BIS Hallmarked',
    image: JEWELRY_IMAGES.haarSet,
    slug: 'bridal',
    tag: 'BRIDAL',
  },
  {
    id: 'm3',
    name: 'Diamond Solitaire Drop Studs',
    category: 'Earrings',
    purity: '18K Gold & Certified Diamonds',
    image: JEWELRY_IMAGES.earrings,
    slug: 'earrings',
    tag: 'BESTSELLER',
  },
  {
    id: 'm4',
    name: 'Artisan Kundan Bangle Set',
    category: 'Bangles',
    purity: '22K Handcrafted Gold',
    image: JEWELRY_IMAGES.bangle,
    slug: 'bangles',
    tag: 'HERITAGE',
  },
  {
    id: 'm5',
    name: 'Bridal Grace Choker Set',
    category: 'Bridal',
    purity: '22K Gold & Precious Gems',
    image: JEWELRY_IMAGES.bridalSet,
    slug: 'bridal',
    tag: 'NEW',
  },
  {
    id: 'm6',
    name: 'Carved Peacock Gold Locket',
    category: 'Pendants',
    purity: '22K BIS Gold',
    image: JEWELRY_IMAGES.birdLocket,
    slug: 'necklaces',
    tag: 'BESPOKE',
  },
];

const ROW_TWO_ITEMS: MarqueeJewelryItem[] = [
  {
    id: 'm7',
    name: 'Traditional Gold Jhumka Earrings',
    category: 'Earrings',
    purity: '22K BIS Hallmarked',
    image: JEWELRY_IMAGES.jhumka,
    slug: 'earrings',
    tag: 'POPULAR',
  },
  {
    id: 'm8',
    name: 'Diamond Link Gold Rope Chain',
    category: 'Chains',
    purity: '18K Yellow & White Gold',
    image: JEWELRY_IMAGES.chain,
    slug: 'chains',
    tag: 'ESSENTIAL',
  },
  {
    id: 'm9',
    name: 'Royal Emerald Cut Gold Pendant',
    category: 'Pendants',
    purity: '22K Gold & Gemstones',
    image: JEWELRY_IMAGES.pendantAlt,
    slug: 'necklaces',
    tag: 'FEATURED',
  },
  {
    id: 'm10',
    name: 'Empress Gold Bridal Choker',
    category: 'Necklaces',
    purity: '22K BIS Hallmarked',
    image: JEWELRY_IMAGES.necklace,
    slug: 'necklaces',
    tag: 'LUXURY',
  },
  {
    id: 'm11',
    name: 'Carved Royal Kada Bangle',
    category: 'Bangles',
    purity: '22K Solid Gold',
    image: JEWELRY_IMAGES.bangleAlt,
    slug: 'bangles',
    tag: 'ROYAL',
  },
  {
    id: 'm12',
    name: 'Solitaire Pearl & Gold Nath',
    category: 'Bridal',
    purity: '22K Gold & Natural Pearls',
    image: JEWELRY_IMAGES.pendantNath,
    slug: 'bridal',
    tag: 'BRIDAL',
  },
];

const MarqueeCard: React.FC<{ item: MarqueeJewelryItem }> = ({ item }) => {
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(item.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
      _id: item.id,
      name: item.name,
      slug: item.slug,
      description: item.purity,
      price: 0,
      category: item.category,
      images: [{ url: item.image }],
      isFeatured: true,
      stock: 1,
      createdAt: '',
      updatedAt: '',
    });
  };

  const whatsappMessage = encodeURIComponent(
    `Hi, I am interested in "${item.name}" (${item.purity}). Please share pricing and availability.`
  );
  const whatsappHref = `${BUSINESS.socials.whatsapp}?text=${whatsappMessage}`;

  return (
    <div className="group relative w-56 sm:w-64 md:w-72 lg:w-80 shrink-0 mx-2.5 sm:mx-3">
      <Link
        to={`/collections/${item.slug}`}
        className="block w-full overflow-hidden bg-[#0A0414] border border-gold-400/[0.16] transition-all duration-500 hover:border-gold-400/60 hover:shadow-[0_16px_40px_-16px_rgba(212,175,55,0.22)]"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <BlurImage
            src={item.image}
            alt={item.name}
            priority="auto"
            zoomHover
            wrapperClassName="w-full h-full"
          />

          {/* Dark Overlay Gradient */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{
              background:
                'linear-gradient(180deg, rgba(5,2,10,0.1) 0%, rgba(5,2,10,0.3) 50%, rgba(5,2,10,0.92) 100%)',
            }}
          />

          {/* Top Tag & Wishlist */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
            {item.tag && (
              <span className="px-2.5 py-1 bg-[#0B0515]/85 backdrop-blur-md border border-gold-400/40 text-[9px] uppercase tracking-[0.2em] font-semibold text-gold-300">
                {item.tag}
              </span>
            )}
            <button
              type="button"
              onClick={handleWishlistClick}
              className={cn(
                'ml-auto w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300',
                inWishlist
                  ? 'bg-gold-400 text-purple-950 border-gold-300 shadow-md'
                  : 'bg-[#0B0515]/75 border-gold-400/30 text-gold-300 hover:bg-gold-400/20'
              )}
              aria-label="Toggle wishlist"
            >
              <Heart size={14} className={inWishlist ? 'fill-current' : ''} />
            </button>
          </div>

          {/* Bottom Info Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 pointer-events-none">
            <div className="pointer-events-auto">
              <span className="text-[10px] uppercase tracking-[0.2em] text-gold-400 font-semibold block mb-1">
                {item.category} &middot; {item.purity}
              </span>
              <h4 className="font-serif text-base sm:text-lg text-cream font-medium leading-snug line-clamp-1 group-hover:text-gold-200 transition-colors">
                {item.name}
              </h4>

              <div className="mt-3 pt-2.5 border-t border-gold-400/20 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.16em] text-gold-300 font-semibold flex items-center gap-1">
                  Enquire <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </span>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.15em] text-emerald-400 hover:text-emerald-300 font-medium"
                >
                  <MessageCircle size={12} /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

const DualRowJewelryMarquee: React.FC = () => {
  const reducedMotionStore = useUIStore((s) => s.reducedMotion);
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = reducedMotionStore || prefersReducedMotion;

  // Duplicate items for continuous seamless 60fps infinite marquee loop
  const rowOneLoop = [...ROW_ONE_ITEMS, ...ROW_ONE_ITEMS, ...ROW_ONE_ITEMS];
  const rowTwoLoop = [...ROW_TWO_ITEMS, ...ROW_TWO_ITEMS, ...ROW_TWO_ITEMS];

  return (
    <section
      className="section-padding relative overflow-hidden bg-[#07040B] border-y border-gold-400/15"
      aria-label="Jewellery in Motion — Dual Direction Interactive Showcase"
    >
      {/* Background Ambient Gold Lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[40vw] rounded-full opacity-[0.06] blur-[150px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }}
      />

      <div className="container relative mb-10 sm:mb-14 text-center">
        <SectionTitle
          label="CREATIONS IN MOTION"
          title="Artistry in Every Detail"
          subtitle="Explore our signature handcrafted 22K gold & diamond jewellery in continuous motion."
          align="center"
        />
      </div>

      {/* Main Interactive Marquee Outer Wrapper */}
      <div className="relative w-full overflow-hidden group-pause select-none">
        {/* Left Edge Luxury Gradient Fade Mask */}
        <div
          className="absolute inset-y-0 left-0 w-16 sm:w-32 md:w-44 z-20 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(7,4,11,1) 0%, rgba(7,4,11,0.85) 40%, transparent 100%)',
          }}
        />

        {/* Right Edge Luxury Gradient Fade Mask */}
        <div
          className="absolute inset-y-0 right-0 w-16 sm:w-32 md:w-44 z-20 pointer-events-none"
          style={{
            background:
              'linear-gradient(to left, rgba(7,4,11,1) 0%, rgba(7,4,11,0.85) 40%, transparent 100%)',
          }}
        />

        {/* ROW 1 — Moving Left ⬅️ */}
        <div className="flex w-full overflow-hidden mb-5 sm:mb-6">
          <div
            className={cn(
              'flex py-2',
              reducedMotion ? 'overflow-x-auto w-full justify-start' : 'animate-marquee-left'
            )}
          >
            {rowOneLoop.map((item, idx) => (
              <MarqueeCard key={`row1-${item.id}-${idx}`} item={item} />
            ))}
          </div>
        </div>

        {/* ROW 2 — Moving Right ➡️ */}
        <div className="flex w-full overflow-hidden">
          <div
            className={cn(
              'flex py-2',
              reducedMotion ? 'overflow-x-auto w-full justify-start' : 'animate-marquee-right'
            )}
          >
            {rowTwoLoop.map((item, idx) => (
              <MarqueeCard key={`row2-${item.id}-${idx}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { DualRowJewelryMarquee };
export default DualRowJewelryMarquee;
