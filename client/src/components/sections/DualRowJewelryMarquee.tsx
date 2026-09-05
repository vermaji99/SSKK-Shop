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
    tag: 'BRIDAL HERITAGE',
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
    tag: 'CRAFTSMANSHIP',
  },
  {
    id: 'm5',
    name: 'Bridal Grace Choker Set',
    category: 'Bridal',
    purity: '22K Gold & Precious Gems',
    image: JEWELRY_IMAGES.bridalSet,
    slug: 'bridal',
    tag: 'NEW ARRIVAL',
  },
  {
    id: 'm6',
    name: 'Carved Peacock Gold Locket',
    category: 'Pendants',
    purity: '22K BIS Hallmarked',
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
    <div className="group relative w-60 sm:w-68 md:w-76 lg:w-84 shrink-0 mx-3 sm:mx-4 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:scale-[1.02]">
      <Link
        to={`/collections/${item.slug}`}
        className="block w-full overflow-hidden bg-gradient-to-b from-[#140822]/90 via-[#0B0515]/95 to-[#07040B] border border-gold-400/[0.22] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-gold-400/[0.75] group-hover:shadow-[0_20px_50px_-16px_rgba(212,175,55,0.28)]"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <BlurImage
            src={item.image}
            alt={item.name}
            priority="auto"
            zoomHover
            wrapperClassName="w-full h-full"
          />

          {/* Ambient Gold Radial Spotlight Hover Effect */}
          <div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"
            style={{
              background:
                'radial-gradient(circle at 50% 45%, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.05) 50%, transparent 80%)',
            }}
            aria-hidden="true"
          />

          {/* Dark Luxury Backdrop Gradient */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{
              background:
                'linear-gradient(180deg, rgba(5,2,10,0.15) 0%, rgba(5,2,10,0.35) 45%, rgba(5,2,10,0.95) 100%)',
            }}
          />

          {/* Top Tag & Wishlist Action Button */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
            {item.tag && (
              <span className="px-3 py-1 bg-[#07040B]/90 backdrop-blur-md border border-gold-400/50 text-[9.5px] uppercase tracking-[0.22em] font-semibold text-gold-300 shadow-md">
                {item.tag}
              </span>
            )}
            <button
              type="button"
              onClick={handleWishlistClick}
              className={cn(
                'ml-auto w-8.5 h-8.5 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300',
                inWishlist
                  ? 'bg-gold-400 text-purple-950 border-gold-300 shadow-lg scale-105'
                  : 'bg-[#07040B]/80 border-gold-400/35 text-gold-300 hover:bg-gold-400/25 hover:border-gold-400/70'
              )}
              aria-label="Toggle wishlist"
            >
              <Heart size={15} className={inWishlist ? 'fill-current' : ''} />
            </button>
          </div>

          {/* Bottom Editorial Info Box */}
          <div className="absolute inset-0 flex flex-col justify-end p-4.5 sm:p-5.5 pointer-events-none">
            <div className="pointer-events-auto">
              <span className="text-[10px] uppercase tracking-[0.22em] text-gold-400/95 font-semibold block mb-1">
                {item.category} &middot; {item.purity}
              </span>

              <h4 className="font-serif text-base sm:text-lg text-cream font-medium leading-snug line-clamp-1 group-hover:text-gold-200 transition-colors">
                {item.name}
              </h4>

              {/* Gold Underline Indicator */}
              <div
                className="mt-1.5 h-[1.5px] gold-gradient transition-all duration-500 ease-out group-hover:w-full"
                style={{ width: '0px' }}
                aria-hidden="true"
              />

              <div className="mt-3.5 pt-3 border-t border-gold-400/20 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.18em] text-gold-300 font-semibold flex items-center gap-1.5 group-hover:text-gold-200">
                  Explore <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </span>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-950/60 border border-emerald-500/40 rounded-full text-[10px] uppercase tracking-[0.16em] text-emerald-300 hover:text-emerald-200 hover:bg-emerald-900/80 transition-all duration-300 shadow-sm"
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

  // Quadruple items for continuous 60fps infinite marquee loop without blank space
  const rowOneLoop = [...ROW_ONE_ITEMS, ...ROW_ONE_ITEMS, ...ROW_ONE_ITEMS, ...ROW_ONE_ITEMS];
  const rowTwoLoop = [...ROW_TWO_ITEMS, ...ROW_TWO_ITEMS, ...ROW_TWO_ITEMS, ...ROW_TWO_ITEMS];

  return (
    <section
      className="section-padding relative overflow-hidden bg-[#07040B] border-y border-gold-400/15"
      aria-label="Jewellery in Motion — Dual Direction Interactive Showcase"
    >
      {/* Background Ambient Champagne Gold Radial Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] h-[45vw] rounded-full opacity-[0.07] blur-[160px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }}
      />

      <div className="container relative mb-11 sm:mb-16 text-center">
        <SectionTitle
          label="ARTISTRY IN MOTION"
          title="Creations Moving in Harmony"
          subtitle="Experience our handcrafted 22K BIS hallmarked gold & diamond jewellery in continuous dual motion."
          align="center"
        />
      </div>

      {/* Main Interactive Marquee Outer Container */}
      <div className="relative w-full overflow-hidden group-pause select-none">
        {/* Left Edge Luxury Gradient Fade Mask */}
        <div
          className="absolute inset-y-0 left-0 w-20 sm:w-36 md:w-52 z-20 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(7,4,11,1) 0%, rgba(7,4,11,0.85) 45%, transparent 100%)',
          }}
        />

        {/* Right Edge Luxury Gradient Fade Mask */}
        <div
          className="absolute inset-y-0 right-0 w-20 sm:w-36 md:w-52 z-20 pointer-events-none"
          style={{
            background:
              'linear-gradient(to left, rgba(7,4,11,1) 0%, rgba(7,4,11,0.85) 45%, transparent 100%)',
          }}
        />

        {/* ROW 1 — Moving Left ⬅️ */}
        <div className="flex w-full overflow-hidden mb-6 sm:mb-8">
          <div
            className={cn(
              'flex py-3',
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
              'flex py-3',
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
