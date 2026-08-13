import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import type { ApiResponse, Product, Order, Inquiry } from '@/lib/types';
import { cn, formatCurrencyINR } from '@/lib/utils';
import { Button, AnimatedCounter, GoldDivider } from '@/components/ui';
import {
  Package,
  Star,
  ShoppingCart,
  MessageSquare,
  Plus,
  FolderOpen,
  Eye,
  ChevronRight,
} from 'lucide-react';

const StatCard: React.FC<{
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  delay: number;
}> = ({ icon: Icon, label, value, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="glass gold-border p-6 rounded-none relative overflow-hidden group"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -translate-y-16 translate-x-16 group-hover:bg-gold/10 transition-colors duration-300" />
    <div className="relative">
      <div className="flex items-start justify-between mb-4">
        <div className="w-14 h-14 rounded-full bg-gold/15 flex items-center justify-center shadow-gold-glow">
          <Icon className="w-7 h-7 text-gold" />
        </div>
      </div>
      <p className="text-xs uppercase tracking-[0.2em] text-text-muted mb-2 font-medium">{label}</p>
      <h3 className="text-3xl font-bold text-text">
        <AnimatedCounter end={value} />
      </h3>
    </div>
  </motion.div>
);

const StatusPill: React.FC<{ status: string }> = ({ status }) => {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    processing: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    shipped: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    delivered: 'bg-green-500/20 text-green-400 border-green-500/30',
    cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
    contacted: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    completed: 'bg-green-500/20 text-green-400 border-green-500/30',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border',
        colors[status] || 'bg-purple-700/50 text-text-muted border-purple-600/50'
      )}
    >
      {status}
    </span>
  );
};

const TableSkeleton: React.FC<{ rows?: number; cols?: number }> = ({ rows = 5, cols = 5 }) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex gap-4 items-center">
        {Array.from({ length: cols }).map((_, j) => (
          <div
            key={j}
            className="h-4 bg-purple-800/50 rounded animate-pulse"
            style={{ width: j === 0 ? '80px' : `${100 + j * 30}px` }}
          />
        ))}
      </div>
    ))}
  </div>
);

const AdminDashboard: React.FC = () => {
  const { data: productsData, isLoading: productsLoading } = useQuery<ApiResponse<Product[]>>({
    queryKey: ['admin-products-all'],
    queryFn: async () => {
      const res = await api.get('/products?limit=100');
      return res.data;
    },
  });

  const { data: ordersData, isLoading: ordersLoading } = useQuery<ApiResponse<Order[]>>({
    queryKey: ['admin-orders-all'],
    queryFn: async () => {
      const res = await api.get('/orders?limit=100');
      return res.data;
    },
  });

  const { data: inquiriesData, isLoading: inquiriesLoading } = useQuery<ApiResponse<Inquiry[]>>({
    queryKey: ['admin-inquiries-all'],
    queryFn: async () => {
      const res = await api.get('/inquiries?limit=100');
      return res.data;
    },
  });

  const products = productsData?.data || [];
  const orders = ordersData?.data || [];
  const inquiries = inquiriesData?.data || [];

  const totalProducts = productsData?.total || products.length || 0;
  const featuredProducts = products.filter((p) => p.featured || (p as unknown as { isFeatured?: boolean }).isFeatured).length;
  const totalOrders = ordersData?.total || orders.length || 0;
  const pendingInquiries = inquiries.filter((i) => i.status === 'pending').length;

  const recentOrders = orders.slice(0, 5);
  const recentInquiries = inquiries.slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="heading-serif text-3xl md:text-4xl font-bold text-gold-gradient mb-2">
          Admin Dashboard
        </h1>
        <p className="text-text-muted">
          Manage your jewelry store operations and view key metrics.
        </p>
      </div>

      <GoldDivider width={120} thickness={2} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon={Package} label="Total Products" value={totalProducts} delay={0.1} />
        <StatCard icon={Star} label="Featured Products" value={featuredProducts} delay={0.2} />
        <StatCard icon={ShoppingCart} label="Total Orders" value={totalOrders} delay={0.3} />
        <StatCard icon={MessageSquare} label="Pending Inquiries" value={pendingInquiries} delay={0.4} />
      </div>

      <div className="flex flex-wrap gap-3">
        <Button variant="primary" size="sm" asChild>
          <Link to="/admin/products">
            <Plus className="w-4 h-4" />
            Add Product
          </Link>
        </Button>
        <Button variant="secondary" size="sm" asChild>
          <Link to="/admin/categories">
            <FolderOpen className="w-4 h-4" />
            Add Category
          </Link>
        </Button>
        <Button variant="outline-gold" size="sm" asChild>
          <Link to="/admin/inquiries">
            <Eye className="w-4 h-4" />
            View All Inquiries
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass gold-border rounded-none overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-gold/20">
            <div>
              <h2 className="heading-serif text-lg font-semibold text-text">Recent Orders</h2>
              <p className="text-xs text-text-muted mt-0.5">Latest customer orders</p>
            </div>
            <Link
              to="/admin/orders"
              className="text-xs uppercase tracking-wider text-gold hover:text-gold-300 transition-colors flex items-center gap-1"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="p-6">
            {ordersLoading ? (
              <TableSkeleton rows={5} cols={4} />
            ) : recentOrders.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-12 h-12 text-purple-700 mx-auto mb-4" />
                <p className="text-text-muted text-sm">No orders yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full min-w-[500px]">
                  <thead>
                    <tr className="text-left">
                      <th className="pb-3 text-[11px] uppercase tracking-wider text-text-muted font-semibold">
                        Order ID
                      </th>
                      <th className="pb-3 text-[11px] uppercase tracking-wider text-text-muted font-semibold">
                        Total
                      </th>
                      <th className="pb-3 text-[11px] uppercase tracking-wider text-text-muted font-semibold">
                        Status
                      </th>
                      <th className="pb-3 text-[11px] uppercase tracking-wider text-text-muted font-semibold">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-800/50">
                    {recentOrders.map((order) => (
                      <tr key={order._id} className="hover:bg-purple-800/20 transition-colors">
                        <td className="py-3 pr-4">
                          <span className="text-sm font-medium text-text">
                            #{order._id.toString().slice(-6).toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 pr-4">
                          <span className="text-sm text-gold font-semibold">
                            {formatCurrencyINR(order.totalAmount)}
                          </span>
                        </td>
                        <td className="py-3 pr-4">
                          <StatusPill status={order.status} />
                        </td>
                        <td className="py-3 pr-4">
                          <span className="text-xs text-text-muted">
                            {new Date(order.createdAt).toLocaleDateString('en-IN')}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass gold-border rounded-none overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-gold/20">
            <div>
              <h2 className="heading-serif text-lg font-semibold text-text">Recent Inquiries</h2>
              <p className="text-xs text-text-muted mt-0.5">Latest customer messages</p>
            </div>
            <Link
              to="/admin/inquiries"
              className="text-xs uppercase tracking-wider text-gold hover:text-gold-300 transition-colors flex items-center gap-1"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="p-6">
            {inquiriesLoading ? (
              <TableSkeleton rows={5} cols={3} />
            ) : recentInquiries.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-purple-700 mx-auto mb-4" />
                <p className="text-text-muted text-sm">No inquiries yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentInquiries.map((inquiry) => (
                  <div
                    key={inquiry._id}
                    className="flex items-start gap-4 p-3 rounded-none hover:bg-purple-800/20 transition-colors border border-purple-800/30"
                  >
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MessageSquare className="w-5 h-5 text-gold-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="text-sm font-semibold text-text truncate">{inquiry.name}</p>
                        <StatusPill status={inquiry.status} />
                      </div>
                      <p className="text-xs text-text-muted mb-2">
                        {inquiry.phone} {inquiry.email && `· ${inquiry.email}`}
                      </p>
                      <p className="text-sm text-text-muted line-clamp-1">{inquiry.message}</p>
                      <p className="text-[10px] text-text-muted mt-2 uppercase tracking-wider">
                        {new Date(inquiry.createdAt).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
