import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import { JEWELRY_IMAGES, img } from '../config/assets.js';

dotenv.config();

const categoriesData = [
  {
    name: 'Rings',
    description: 'Exquisite gold and diamond rings crafted for every occasion.',
    featured: true,
    image: img('ring'),
  },
  {
    name: 'Earrings',
    description: 'Timeless earrings from classic studs to elaborate jhumkas.',
    featured: true,
    image: img('jhumka'),
  },
  {
    name: 'Necklaces',
    description: 'Elegant necklaces combining traditional artistry with modern design.',
    featured: true,
    image: img('necklace'),
  },
  {
    name: 'Chains',
    description: 'Premium gold chains in various classic and contemporary designs.',
    featured: false,
    image: img('chain'),
  },
  {
    name: 'Bangles',
    description: 'Beautifully crafted bangles in gold, diamond, and traditional designs.',
    featured: true,
    image: img('bangle'),
  },
  {
    name: 'Bridal',
    description: 'Complete bridal jewelry sets for your most precious moments.',
    featured: true,
    image: img('bridalSet'),
  },
  {
    name: 'Nath',
    description: 'Traditional Indian nath nose rings that celebrate cultural elegance.',
    featured: false,
    image: img('pendant'),
  },
  {
    name: 'Pendants',
    description: 'Dazzling gold and diamond pendants with certified stones.',
    featured: true,
    image: img('pendant'),
  },
];

const createProducts = (categoryMap) => [
  {
    name: 'Royal Solitaire Gold Ring',
    description:
      'An exquisite 22K gold ring featuring a brilliant-cut diamond centerpiece surrounded by micro-pavé diamonds. Perfect for engagements and special celebrations.',
    category: categoryMap['Rings'],
    price: 125000,
    discountPrice: 118000,
    featured: true,
    bestseller: true,
    stock: 5,
    goldPurity: '22K',
    weight: 5.2,
    material: 'Yellow Gold',
    gemstones: ['Diamond (0.85ct)', 'Diamond (0.30ct pavé)'],
    images: [img('ring'), img('necklace')],
  },
  {
    name: '22K Gold Bridal Haar Set',
    description:
      'A magnificent bridal necklace set featuring intricate filigree work with embedded kundan and ruby gemstone highlights. A showstopper centerpiece for weddings.',
    category: categoryMap['Bridal'],
    price: 485000,
    discountPrice: 465000,
    featured: true,
    bestseller: true,
    stock: 2,
    goldPurity: '22K',
    weight: 45.8,
    material: 'Yellow Gold',
    gemstones: ['Kundan', 'Ruby', 'Emerald', 'Pearl'],
    images: [img('bridalSet'), img('necklace')],
  },
  {
    name: 'Traditional Royal Jhumkas',
    description:
      'Handcrafted traditional jhumka earrings in 22K hallmark gold with micro diamond accents and dangling pearls. Captures true Indian heritage.',
    category: categoryMap['Earrings'],
    price: 78000,
    discountPrice: 72500,
    featured: true,
    bestseller: true,
    stock: 8,
    goldPurity: '22K',
    weight: 12.4,
    material: 'Yellow Gold',
    gemstones: ['Diamond (0.60ct total)', 'Cultured Pearl'],
    images: [img('jhumka')],
  },
  {
    name: 'Classic Chhatrapati Gold Bangles',
    description:
      'Timeless 22K gold bangles with a polished finish and delicate hand engravings. Traditional wardrobe essential designed for daily grace or grand festivities.',
    category: categoryMap['Bangles'],
    price: 92000,
    featured: true,
    bestseller: false,
    stock: 12,
    goldPurity: '22K',
    weight: 22.5,
    material: 'Yellow Gold',
    gemstones: [],
    images: [img('bangle'), img('bangleAlt')],
  },
  {
    name: 'Heavy Royal Rope Chain',
    description:
      'A sophisticated 22K gold rope chain with a smooth satin sheen. Hand-polished links engineered for comfort and lasting radiance.',
    category: categoryMap['Chains'],
    price: 58000,
    discountPrice: 54000,
    featured: true,
    bestseller: true,
    stock: 15,
    goldPurity: '22K',
    weight: 14.8,
    material: 'Yellow Gold',
    gemstones: [],
    images: [img('chain')],
  },
  {
    name: 'Heritage Kundan Nath',
    description:
      'A stunning traditional bridal nath nose ring crafted in 22K gold with pearl string and diamond drop detailing. An iconic symbol of bridal splendour.',
    category: categoryMap['Nath'],
    price: 42000,
    featured: false,
    bestseller: false,
    stock: 4,
    goldPurity: '22K',
    weight: 3.6,
    material: 'Yellow Gold',
    gemstones: ['Pearl', 'Diamond (0.15ct)'],
    images: [img('pendant')],
  },
  {
    name: 'Celestial Diamond Pendant',
    description:
      'A breathtaking 18K white gold pendant featuring a brilliant round solitaire diamond set inside a starburst motif. Includes matching white gold chain.',
    category: categoryMap['Pendants'],
    price: 185000,
    discountPrice: 175000,
    featured: true,
    bestseller: true,
    stock: 3,
    goldPurity: '18K',
    weight: 3.8,
    material: 'White Gold',
    gemstones: ['Diamond (1.00ct VVS1)'],
    images: [img('pendant')],
  },
  {
    name: 'Empress Choker Necklace',
    description:
      'Intricately forged 22K gold choker necklace with royal floral motifs, ruby stones, and hanging gold beads. Designed for heirloom collections.',
    category: categoryMap['Necklaces'],
    price: 360000,
    discountPrice: 340000,
    featured: true,
    bestseller: true,
    stock: 3,
    goldPurity: '22K',
    weight: 38.2,
    material: 'Yellow Gold',
    gemstones: ['Ruby', 'Pearls'],
    images: [img('necklace')],
  },
  {
    name: 'Royal Heritage Kundan Set',
    description:
      'A grand 22K hallmark gold bridal set including heavy necklace, matching chandelier earrings, maang tikka, and armlets.',
    category: categoryMap['Bridal'],
    price: 625000,
    discountPrice: 590000,
    featured: true,
    bestseller: true,
    stock: 2,
    goldPurity: '22K',
    weight: 78.0,
    material: 'Yellow Gold',
    gemstones: ['Kundan', 'Uncut Diamonds', 'Emeralds'],
    images: [img('bridalSet'), img('jhumka')],
  },
  {
    name: 'Solitaire Diamond Studs',
    description:
      'Everyday luxury diamond studs set in 18K hallmarked white gold. Timeless brilliance certified by IGI.',
    category: categoryMap['Earrings'],
    price: 68000,
    featured: true,
    bestseller: false,
    stock: 10,
    goldPurity: '18K',
    weight: 1.8,
    material: 'White Gold',
    gemstones: ['Diamond (0.50ct total, VVS)'],
    images: [img('earrings')],
  },
  {
    name: 'Vintage Carved Gold Band',
    description:
      'An antique-inspired 22K gold ring with hand-carved floral filigree motifs. A timeless statement of understated royalty.',
    category: categoryMap['Rings'],
    price: 52000,
    discountPrice: 48500,
    featured: false,
    bestseller: false,
    stock: 4,
    goldPurity: '22K',
    weight: 7.5,
    material: 'Yellow Gold',
    gemstones: [],
    images: [img('ring')],
  },
  {
    name: 'Diamond Lotus Locket Pendant',
    description:
      'An intricately detailed 18K yellow gold locket pendant shaped like a blooming lotus, encrusted with diamonds.',
    category: categoryMap['Pendants'],
    price: 135000,
    discountPrice: 125000,
    featured: true,
    bestseller: false,
    stock: 4,
    goldPurity: '18K',
    weight: 6.2,
    material: 'Yellow Gold',
    gemstones: ['Diamond (0.75ct)'],
    images: [img('pendant'), img('chain')],
  },
];

const seed = async () => {
  try {
    await connectDB();

    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Product.deleteMany({});
    await Category.deleteMany({});

    console.log('Creating admin user...');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      name: 'Shubham Verma',
      email: 'admin@sskk.com',
      phone: '9935178342',
      password: hashedPassword,
      role: 'admin',
    });
    console.log(`Admin created: ${admin.email} / admin123`);

    await User.create({
      name: 'Test Customer',
      email: 'customer@sskk.com',
      phone: '7459956483',
      password: await bcrypt.hash('customer123', 10),
      role: 'customer',
    });
    console.log('Test customer created: customer@sskk.com / customer123');

    console.log('Creating categories...');
    const createdCategories = await Category.create(categoriesData);
    const categoryMap = {};
    createdCategories.forEach((cat) => {
      categoryMap[cat.name] = cat._id;
    });
    console.log(`Created ${createdCategories.length} categories`);

    console.log('Creating products...');
    const products = createProducts(categoryMap);
    const createdProducts = await Product.create(products);
    console.log(`Created ${createdProducts.length} products`);
    console.log('Using local public images:', Object.values(JEWELRY_IMAGES).slice(0, 3).join(', '), '...');

    console.log('\n========================================');
    console.log('SEEDING COMPLETED SUCCESSFULLY!');
    console.log('========================================\n');

    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seed();
