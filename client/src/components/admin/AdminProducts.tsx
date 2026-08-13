import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import type { ApiResponse, Product, Category } from '@/lib/types';
import { cn, formatCurrencyINR, truncateText } from '@/lib/utils';
import { Button, Input, Badge } from '@/components/ui';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Package,
  X,
  Star,
  Flame,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';

interface ProductFormData {
  name: string;
  description: string;
  category: string;
  price: string;
  discountPrice: string;
  stock: string;
  featured: boolean;
  bestseller: boolean;
  goldPurity: string;
  weight: string;
  material: string;
  gemstones: string;
  imageUrls: string;
}

const initialFormData: ProductFormData = {
  name: '',
  description: '',
  category: '',
  price: '',
  discountPrice: '',
  stock: '',
  featured: false,
  bestseller: false,
  goldPurity: '',
  weight: '',
  material: '',
  gemstones: '',
  imageUrls: '',
};

const StatusBadge: React.FC<{ active: boolean; label: string }> = ({ active, label }) => (
  <span
    className={cn(
      'inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border',
      active
        ? 'bg-gold/15 text-gold border-gold/40 shadow-gold-glow'
        : 'bg-purple-800/50 text-text-muted border-purple-700/50'
    )}
  >
    {label}
  </span>
);

const SkeletonRow = () => (
  <tr>
    {Array.from({ length: 7 }).map((_, i) => (
      <td key={i} className="py-4 px-2">
        <div className="h-8 bg-purple-800/50 rounded animate-pulse" />
      </td>
    ))}
  </tr>
);

const Modal: React.FC<{
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ open, onClose, title, children }) => (
  <AnimatePresence>
    {open && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-4 md:inset-10 lg:inset-20 z-50 glass gold-border rounded-none overflow-hidden flex flex-col"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-gold/20 flex-shrink-0">
            <h2 className="heading-serif text-xl font-semibold text-gold-gradient">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 text-text-muted hover:text-gold hover:bg-purple-800/50 rounded-none transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">{children}</div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const ConfirmDialog: React.FC<{
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  loading?: boolean;
}> = ({ open, onCancel, onConfirm, title, message, loading }) => (
  <AnimatePresence>
    {open && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md glass gold-border rounded-none p-6"
        >
          <div className="flex items-start gap-4 mb-5">
            <div className="w-12 h-12 rounded-full bg-red-500/15 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h3 className="heading-serif text-lg font-semibold text-text mb-1">{title}</h3>
              <p className="text-sm text-text-muted">{message}</p>
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <Button variant="ghost" size="sm" onClick={onCancel} disabled={loading}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={onConfirm}
              loading={loading}
              className="!bg-red-500 !text-white hover:!bg-red-600"
            >
              Delete
            </Button>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const AdminProducts: React.FC = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [featuredFilter, setFeaturedFilter] = useState(false);
  const [bestsellerFilter, setBestsellerFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ProductFormData, string>>>({});

  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const { data: categoriesData } = useQuery({
    queryKey: ['categories-select'],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<Category[]>>('/categories?limit=100');
      return data;
    },
  });
  const categories = categoriesData?.data || [];

  const { data, isLoading } = useQuery({
    queryKey: ['admin-products', currentPage, search, categoryFilter, featuredFilter, bestsellerFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set('page', String(currentPage));
      params.set('limit', String(pageSize));
      if (search) params.set('search', search);
      if (categoryFilter) params.set('category', categoryFilter);
      const { data } = await api.get<ApiResponse<Product[]>>(`/products?${params.toString()}`);
      return data;
    },
  });

  const products = data?.data || [];
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (featuredFilter && !p.featured && !p.isFeatured) return false;
      if (bestsellerFilter && !p.bestseller && !p.isBestseller) return false;
      return true;
    });
  }, [products, featuredFilter, bestsellerFilter]);

  const totalPages = data?.pages || Math.ceil((data?.total || 0) / pageSize);

  const createMutation = useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      const { data } = await api.post('/products', payload);
      return data;
    },
    onSuccess: () => {
      toast.success('Product created successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['admin-products-all'] });
      closeModal();
    },
    onError: () => toast.error('Failed to create product'),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: Record<string, unknown> }) => {
      const { data } = await api.put(`/products/${id}`, payload);
      return data;
    },
    onSuccess: () => {
      toast.success('Product updated successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['admin-products-all'] });
      closeModal();
    },
    onError: () => toast.error('Failed to update product'),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete(`/products/${id}`);
      return data;
    },
    onSuccess: () => {
      toast.success('Product deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['admin-products-all'] });
      setDeleteTarget(null);
    },
    onError: () => toast.error('Failed to delete product'),
  });

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData(initialFormData);
    setFormErrors({});
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    const catId = typeof product.category === 'object' ? product.category._id : product.category;
    setFormData({
      name: product.name,
      description: product.description,
      category: catId,
      price: String(product.price),
      discountPrice: product.discountPrice ? String(product.discountPrice) : '',
      stock: product.stock ? String(product.stock) : '',
      featured: !!product.featured || !!product.isFeatured,
      bestseller: !!product.bestseller || !!product.isBestseller,
      goldPurity: product.goldPurity || '',
      weight: product.weight ? String(product.weight) : '',
      material: product.material || '',
      gemstones: product.gemstones?.join(', ') || '',
      imageUrls: product.images?.map((i) => i.url).join('\n') || '',
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof ProductFormData, string>> = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.category) errors.category = 'Category is required';
    if (!formData.price || Number(formData.price) <= 0) errors.price = 'Valid price is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const images = formData.imageUrls
      .split('\n')
      .map((u) => u.trim())
      .filter(Boolean)
      .map((url) => ({ url }));

    const payload: Record<string, unknown> = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      category: formData.category,
      price: Number(formData.price),
      discountPrice: formData.discountPrice ? Number(formData.discountPrice) : undefined,
      stock: formData.stock ? Number(formData.stock) : undefined,
      featured: formData.featured,
      bestseller: formData.bestseller,
      goldPurity: formData.goldPurity.trim() || undefined,
      weight: formData.weight ? Number(formData.weight) : undefined,
      material: formData.material.trim() || undefined,
      gemstones: formData.gemstones
        ? formData.gemstones.split(',').map((g) => g.trim()).filter(Boolean)
        : undefined,
      images: images.length > 0 ? images : undefined,
    };

    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct._id, payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="heading-serif text-3xl md:text-4xl font-bold text-gold-gradient mb-1">Products</h1>
          <p className="text-text-muted text-sm">Manage your jewelry catalog</p>
        </div>
        <Button variant="primary" size="sm" onClick={openAddModal}>
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      <div className="glass gold-border p-4 rounded-none">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-background-secondary/80 text-text placeholder-text-muted/60 text-sm border border-purple-700/50 focus:border-gold-400 focus:ring-1 focus:ring-gold-400/40 outline-none transition-all"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-4 py-2.5 bg-background-secondary/80 text-text text-sm border border-purple-700/50 focus:border-gold-400 focus:ring-1 focus:ring-gold-400/40 outline-none transition-all"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          <label className="flex items-center gap-3 px-4 py-2.5 bg-background-secondary/80 border border-purple-700/50 cursor-pointer hover:border-purple-600 transition-colors">
            <input
              type="checkbox"
              checked={featuredFilter}
              onChange={(e) => {
                setFeaturedFilter(e.target.checked);
                setCurrentPage(1);
              }}
              className="w-4 h-4 accent-gold-400"
            />
            <Star className="w-4 h-4 text-gold-400" />
            <span className="text-sm text-text">Featured Only</span>
          </label>
          <label className="flex items-center gap-3 px-4 py-2.5 bg-background-secondary/80 border border-purple-700/50 cursor-pointer hover:border-purple-600 transition-colors">
            <input
              type="checkbox"
              checked={bestsellerFilter}
              onChange={(e) => {
                setBestsellerFilter(e.target.checked);
                setCurrentPage(1);
              }}
              className="w-4 h-4 accent-gold-400"
            />
            <Flame className="w-4 h-4 text-gold-400" />
            <span className="text-sm text-text">Bestsellers Only</span>
          </label>
        </div>
      </div>

      <div className="glass gold-border rounded-none overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-background-tertiary/80 border-b border-gold/20">
              <tr className="text-left">
                <th className="px-4 py-4 text-[11px] uppercase tracking-wider text-text-muted font-semibold">Image</th>
                <th className="px-4 py-4 text-[11px] uppercase tracking-wider text-text-muted font-semibold">Name</th>
                <th className="px-4 py-4 text-[11px] uppercase tracking-wider text-text-muted font-semibold">Category</th>
                <th className="px-4 py-4 text-[11px] uppercase tracking-wider text-text-muted font-semibold">Price</th>
                <th className="px-4 py-4 text-[11px] uppercase tracking-wider text-text-muted font-semibold">Stock</th>
                <th className="px-4 py-4 text-[11px] uppercase tracking-wider text-text-muted font-semibold">Status</th>
                <th className="px-4 py-4 text-[11px] uppercase tracking-wider text-text-muted font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-800/50">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-16 text-center">
                    <Package className="w-14 h-14 text-purple-700 mx-auto mb-4" />
                    <p className="text-text-muted font-medium">No products found</p>
                    <p className="text-xs text-text-muted/70 mt-1">Try adjusting your filters or add a new product</p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => {
                  const catName = typeof product.category === 'object' ? product.category.name : 'Uncategorized';
                  const imgUrl = product.images?.[0]?.url;
                  return (
                    <tr key={product._id} className="hover:bg-purple-800/20 transition-colors">
                      <td className="px-4 py-4">
                        {imgUrl ? (
                          <img
                            src={imgUrl}
                            alt={product.name}
                            className="w-14 h-14 rounded-none object-cover border border-gold/30"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-14 h-14 bg-background-tertiary border border-purple-700/50 flex items-center justify-center">
                            <Package className="w-6 h-6 text-purple-600" />
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm font-medium text-text mb-0.5">{truncateText(product.name, 40)}</p>
                        <p className="text-xs text-text-muted">#{product._id.slice(-6)}</p>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm text-text">{catName}</span>
                      </td>
                      <td className="px-4 py-4">
                        {product.discountPrice ? (
                          <div>
                            <p className="text-sm font-semibold text-gold">
                              {formatCurrencyINR(product.discountPrice)}
                            </p>
                            <p className="text-xs text-text-muted line-through">
                              {formatCurrencyINR(product.price)}
                            </p>
                          </div>
                        ) : (
                          <p className="text-sm font-semibold text-text">{formatCurrencyINR(product.price)}</p>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={cn(
                            'text-sm font-medium',
                            (product.stock ?? 0) <= 5 ? 'text-red-400' : 'text-text'
                          )}
                        >
                          {product.stock ?? '—'}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          <StatusBadge active={!!product.featured || !!product.isFeatured} label="Featured" />
                          <StatusBadge active={!!product.bestseller || !!product.isBestseller} label="Bestseller" />
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(product)}
                            className="p-2 text-text-muted hover:text-gold hover:bg-gold/10 rounded-none transition-all"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(product)}
                            className="p-2 text-text-muted hover:text-red-400 hover:bg-red-500/10 rounded-none transition-all"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gold/20">
            <p className="text-xs text-text-muted">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-purple-700/50 text-text-muted hover:text-gold hover:border-gold/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={cn(
                      'w-9 h-9 text-sm font-medium transition-all border',
                      currentPage === page
                        ? 'bg-gold/15 text-gold border-gold/50'
                        : 'border-purple-700/50 text-text-muted hover:text-gold hover:border-gold/50'
                    )}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 border border-purple-700/50 text-text-muted hover:text-gold hover:border-gold/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
      >
        <form onSubmit={handleSubmit} className="space-y-5 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <Input
                label="Product Name"
                name="name"
                placeholder="e.g., 22K Gold Temple Necklace Set"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={formErrors.name}
                required
              />
            </div>
            <div className="md:col-span-2">
              <Input
                label="Description"
                name="description"
                variant="textarea"
                rows={4}
                placeholder="Detailed product description..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                error={formErrors.description}
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-text-muted uppercase tracking-wider text-[12px]">
                Category <span className="text-gold-400">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={cn(
                  'w-full px-4 py-3 bg-background-secondary/80 text-text text-sm border outline-none transition-all',
                  formErrors.category
                    ? 'border-red-500/70 focus:border-red-500 focus:ring-1 focus:ring-red-500/50'
                    : 'border-purple-700/50 focus:border-gold-400 focus:ring-1 focus:ring-gold-400/40'
                )}
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {formErrors.category && (
                <p className="mt-1.5 text-xs text-red-400 font-medium tracking-wide">{formErrors.category}</p>
              )}
            </div>
            <div>
              <Input
                label="Price (INR)"
                name="price"
                type="text"
                placeholder="e.g., 45000"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value.replace(/[^0-9.]/g, '') })}
                error={formErrors.price}
                required
              />
            </div>
            <div>
              <Input
                label="Discount Price (INR)"
                name="discountPrice"
                type="text"
                placeholder="e.g., 42500 (optional)"
                value={formData.discountPrice}
                onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value.replace(/[^0-9.]/g, '') })}
              />
            </div>
            <div>
              <Input
                label="Stock Quantity"
                name="stock"
                type="text"
                placeholder="e.g., 10"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value.replace(/[^0-9]/g, '') })}
              />
            </div>
            <div>
              <Input
                label="Gold Purity"
                name="goldPurity"
                placeholder="e.g., 22K, 18K"
                value={formData.goldPurity}
                onChange={(e) => setFormData({ ...formData, goldPurity: e.target.value })}
              />
            </div>
            <div>
              <Input
                label="Weight (grams)"
                name="weight"
                type="text"
                placeholder="e.g., 15.5"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value.replace(/[^0-9.]/g, '') })}
              />
            </div>
            <div>
              <Input
                label="Material"
                name="material"
                placeholder="e.g., Yellow Gold, Rose Gold"
                value={formData.material}
                onChange={(e) => setFormData({ ...formData, material: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <Input
                label="Gemstones (comma-separated)"
                name="gemstones"
                placeholder="e.g., Diamonds, Emeralds, Rubies"
                value={formData.gemstones}
                onChange={(e) => setFormData({ ...formData, gemstones: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <Input
                label="Image URLs (one per line)"
                name="imageUrls"
                variant="textarea"
                rows={3}
                placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                value={formData.imageUrls}
                onChange={(e) => setFormData({ ...formData, imageUrls: e.target.value })}
              />
            </div>
            <div className="md:col-span-2 grid grid-cols-2 gap-4">
              <label className="flex items-center gap-3 p-4 bg-background-secondary/80 border border-purple-700/50 cursor-pointer hover:border-gold/50 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 accent-gold-400"
                />
                <Star className="w-4 h-4 text-gold-400" />
                <span className="text-sm text-text">Featured Product</span>
              </label>
              <label className="flex items-center gap-3 p-4 bg-background-secondary/80 border border-purple-700/50 cursor-pointer hover:border-gold/50 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.bestseller}
                  onChange={(e) => setFormData({ ...formData, bestseller: e.target.checked })}
                  className="w-4 h-4 accent-gold-400"
                />
                <Flame className="w-4 h-4 text-gold-400" />
                <span className="text-sm text-text">Bestseller</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gold/20">
            <Button variant="ghost" size="sm" type="button" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" loading={isSubmitting}>
              {editingProduct ? 'Update Product' : 'Create Product'}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget && deleteMutation.mutate(deleteTarget._id)}
        title="Delete Product"
        message={`Are you sure you want to delete "${truncateText(deleteTarget?.name || '', 40)}"? This action cannot be undone.`}
        loading={deleteMutation.isPending}
      />
    </div>
  );
};

export default AdminProducts;
