import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import type { ApiResponse, Category } from '@/lib/types';
import { cn, truncateText } from '@/lib/utils';
import { Button, Input } from '@/components/ui';
import {
  Plus,
  FolderOpen,
  Edit2,
  Trash2,
  X,
  Star,
  AlertTriangle,
} from 'lucide-react';

interface CategoryFormData {
  name: string;
  description: string;
  imageUrl: string;
  featured: boolean;
}

const initialFormData: CategoryFormData = {
  name: '',
  description: '',
  imageUrl: '',
  featured: false,
};

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
          className="fixed inset-4 md:inset-y-10 md:inset-x-1/4 lg:inset-x-1/3 z-50 glass gold-border rounded-none overflow-hidden flex flex-col"
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

const SkeletonRow = () => (
  <div className="flex items-center gap-4 p-4 animate-pulse">
    <div className="w-16 h-16 bg-purple-800/50 rounded-none" />
    <div className="flex-1 space-y-2">
      <div className="h-4 w-32 bg-purple-800/50 rounded" />
      <div className="h-3 w-24 bg-purple-800/50 rounded" />
      <div className="h-3 w-48 bg-purple-800/50 rounded" />
    </div>
    <div className="flex gap-2">
      <div className="w-9 h-9 bg-purple-800/50 rounded" />
      <div className="w-9 h-9 bg-purple-800/50 rounded" />
    </div>
  </div>
);

const AdminCategories: React.FC = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<CategoryFormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof CategoryFormData, string>>>({});
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<Category[]>>('/categories?limit=100');
      return data;
    },
  });

  const categories = data?.data || [];

  const createMutation = useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      const { data } = await api.post('/categories', payload);
      return data;
    },
    onSuccess: () => {
      toast.success('Category created successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
      queryClient.invalidateQueries({ queryKey: ['categories-select'] });
      closeModal();
    },
    onError: () => toast.error('Failed to create category'),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: Record<string, unknown> }) => {
      const { data } = await api.put(`/categories/${id}`, payload);
      return data;
    },
    onSuccess: () => {
      toast.success('Category updated successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
      queryClient.invalidateQueries({ queryKey: ['categories-select'] });
      closeModal();
    },
    onError: () => toast.error('Failed to update category'),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete(`/categories/${id}`);
      return data;
    },
    onSuccess: () => {
      toast.success('Category deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
      queryClient.invalidateQueries({ queryKey: ['categories-select'] });
      setDeleteTarget(null);
    },
    onError: () => toast.error('Failed to delete category'),
  });

  const openAddModal = () => {
    setEditingCategory(null);
    setFormData(initialFormData);
    setFormErrors({});
    setIsModalOpen(true);
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
      imageUrl: category.image?.url || '',
      featured: !!category.featured,
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof CategoryFormData, string>> = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload: Record<string, unknown> = {
      name: formData.name.trim(),
      description: formData.description.trim() || undefined,
      featured: formData.featured,
    };

    if (formData.imageUrl.trim()) {
      payload.image = { url: formData.imageUrl.trim() };
    }

    if (editingCategory) {
      updateMutation.mutate({ id: editingCategory._id, payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="heading-serif text-3xl md:text-4xl font-bold text-gold-gradient mb-1">Categories</h1>
          <p className="text-text-muted text-sm">Organize your jewelry collections</p>
        </div>
        <Button variant="primary" size="sm" onClick={openAddModal}>
          <Plus className="w-4 h-4" />
          Add Category
        </Button>
      </div>

      <div className="glass gold-border rounded-none overflow-hidden">
        {isLoading ? (
          <div className="divide-y divide-purple-800/50">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonRow key={i} />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <FolderOpen className="w-14 h-14 text-purple-700 mx-auto mb-4" />
            <p className="text-text-muted font-medium">No categories found</p>
            <p className="text-xs text-text-muted/70 mt-1 mb-6">Create your first category to organize products</p>
            <Button variant="primary" size="sm" onClick={openAddModal}>
              <Plus className="w-4 h-4" />
              Create Category
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="bg-background-tertiary/80 border-b border-gold/20">
                <tr className="text-left">
                  <th className="px-6 py-4 text-[11px] uppercase tracking-wider text-text-muted font-semibold w-24">Image</th>
                  <th className="px-6 py-4 text-[11px] uppercase tracking-wider text-text-muted font-semibold">Name</th>
                  <th className="px-6 py-4 text-[11px] uppercase tracking-wider text-text-muted font-semibold">Slug</th>
                  <th className="px-6 py-4 text-[11px] uppercase tracking-wider text-text-muted font-semibold">Description</th>
                  <th className="px-6 py-4 text-[11px] uppercase tracking-wider text-text-muted font-semibold">Featured</th>
                  <th className="px-6 py-4 text-[11px] uppercase tracking-wider text-text-muted font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-800/50">
                {categories.map((category) => (
                  <tr key={category._id} className="hover:bg-purple-800/20 transition-colors">
                    <td className="px-6 py-4">
                      {category.image?.url ? (
                        <img
                          src={category.image.url}
                          alt={category.name}
                          className="w-16 h-16 rounded-none object-cover border border-gold/30"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-16 h-16 bg-background-tertiary border border-purple-700/50 flex items-center justify-center">
                          <FolderOpen className="w-7 h-7 text-purple-600" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-text mb-0.5">{category.name}</p>
                      <p className="text-xs text-text-muted">
                        {new Date(category.createdAt).toLocaleDateString('en-IN')}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-xs text-gold-400 bg-purple-900/50 px-2 py-1 border border-gold/20">
                        /{category.slug}
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-text-muted max-w-xs truncate">
                        {category.description || 'No description'}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      {category.featured ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-gold/15 text-gold border border-gold/40">
                          <Star className="w-3 h-3" />
                          Featured
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-purple-800/50 text-text-muted border border-purple-700/50">
                          Standard
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(category)}
                          className="p-2 text-text-muted hover:text-gold hover:bg-gold/10 rounded-none transition-all"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(category)}
                          className="p-2 text-text-muted hover:text-red-400 hover:bg-red-500/10 rounded-none transition-all"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        title={editingCategory ? 'Edit Category' : 'Add New Category'}
      >
        <form onSubmit={handleSubmit} className="space-y-5 max-w-lg mx-auto">
          <Input
            label="Category Name"
            name="name"
            placeholder="e.g., Gold Necklaces"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={formErrors.name}
            required
          />
          <Input
            label="Description"
            name="description"
            variant="textarea"
            rows={4}
            placeholder="Brief description of this category..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <Input
            label="Image URL"
            name="imageUrl"
            placeholder="https://example.com/category.jpg"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          />
          <label className="flex items-center gap-3 p-4 bg-background-secondary/80 border border-purple-700/50 cursor-pointer hover:border-gold/50 transition-colors">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 accent-gold-400"
            />
            <Star className="w-4 h-4 text-gold-400" />
            <span className="text-sm text-text">Featured Category</span>
          </label>

          <div className="flex justify-end gap-3 pt-4 border-t border-gold/20">
            <Button variant="ghost" size="sm" type="button" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" loading={isSubmitting}>
              {editingCategory ? 'Update Category' : 'Create Category'}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget && deleteMutation.mutate(deleteTarget._id)}
        title="Delete Category"
        message={`Are you sure you want to delete "${truncateText(deleteTarget?.name || '', 40)}"? Products in this category may be affected.`}
        loading={deleteMutation.isPending}
      />
    </div>
  );
};

export default AdminCategories;
