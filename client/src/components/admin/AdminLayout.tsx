import { useState } from 'react';
import { Navigate, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { cn, formatCurrencyINR } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  ShoppingCart,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
  User,
  Gem,
  TrendingUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import type { ApiResponse } from '@/lib/types';
import { AnimatedCounter } from '@/components/ui';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const sidebarLinks = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/products', icon: Package, label: 'Products' },
  { to: '/admin/categories', icon: FolderOpen, label: 'Categories' },
  { to: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
  { to: '/admin/inquiries', icon: MessageSquare, label: 'Inquiries' },
];

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [productsRes, ordersRes, inquiriesRes] = await Promise.all([
        api.get<ApiResponse<unknown>>('/products?limit=1'),
        api.get<ApiResponse<unknown>>('/orders?limit=1'),
        api.get<ApiResponse<unknown>>('/inquiries?status=pending&limit=1'),
      ]);
      return {
        totalProducts: productsRes.data.total ?? productsRes.data.count ?? 0,
        totalOrders: ordersRes.data.total ?? ordersRes.data.count ?? 0,
        pendingInquiries: inquiriesRes.data.total ?? inquiriesRes.data.count ?? 0,
        revenue: 0,
      };
    },
    refetchInterval: 30000,
  });

  const handleLogout = async () => {
    await logout();
    setSidebarOpen(false);
    setUserDropdownOpen(false);
  };

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <aside
      className={cn(
        'flex flex-col bg-background-tertiary border-r border-gold/30 min-h-screen',
        mobile ? 'w-full' : 'w-64 fixed top-0 left-0 z-40 hidden lg:flex'
      )}
    >
      <div className="flex items-center justify-between h-16 px-6 border-b border-gold/20">
        <Link to="/" className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
          <Gem className="w-7 h-7 text-gold-400" />
          <span className="heading-serif text-xl text-gold-gradient font-bold">SSKK</span>
        </Link>
        {mobile && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 text-text-muted hover:text-gold transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1">
        {sidebarLinks.map((link) => {
          const isActive = location.pathname === link.to;
          const Icon = link.icon;
          return (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-none transition-all duration-200 text-sm font-medium uppercase tracking-wider',
                isActive
                  ? 'bg-gold/10 text-gold border-l-2 border-gold shadow-gold-glow'
                  : 'text-text-muted hover:bg-purple-800/50 hover:text-gold border-l-2 border-transparent'
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gold/20">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-none transition-all duration-200 text-sm font-medium uppercase tracking-wider"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/70 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed inset-y-0 left-0 z-50 w-72 lg:hidden"
            >
              <Sidebar mobile />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="lg:ml-64 min-h-screen">
        <header className="sticky top-0 z-30 glass border-b border-gold/20">
          <div className="flex items-center justify-between h-16 px-4 md:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-text-muted hover:text-gold transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="heading-serif text-lg md:text-xl text-gold-gradient font-semibold">
                  Welcome, {user?.name}
                </h1>
                <p className="text-xs text-text-muted hidden sm:block">
                  {new Date().toLocaleDateString('en-IN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 text-text-muted hover:text-gold transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </button>

              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-2 rounded-none hover:bg-purple-800/50 transition-colors"
                >
                  <div className="w-9 h-9 gold-gradient rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-purple-900" />
                  </div>
                  <ChevronDown className={cn('w-4 h-4 text-text-muted transition-transform duration-200', userDropdownOpen && 'rotate-180')} />
                </button>

                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 glass gold-border rounded-none overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-gold/20">
                        <p className="text-sm font-semibold text-text">{user?.name}</p>
                        <p className="text-xs text-text-muted">{user?.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {location.pathname === '/admin' && (
          <div className="px-4 md:px-6 lg:px-8 pt-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass gold-border p-4 rounded-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center">
                    <Package className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-text-muted mb-1">Products</p>
                    <p className="text-xl font-bold text-text">
                      <AnimatedCounter end={stats?.totalProducts || 0} />
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass gold-border p-4 rounded-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-text-muted mb-1">Orders</p>
                    <p className="text-xl font-bold text-text">
                      <AnimatedCounter end={stats?.totalOrders || 0} />
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass gold-border p-4 rounded-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-text-muted mb-1">Pending</p>
                    <p className="text-xl font-bold text-text">
                      <AnimatedCounter end={stats?.pendingInquiries || 0} />
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass gold-border p-4 rounded-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-text-muted mb-1">Revenue</p>
                    <p className="text-xl font-bold text-text">
                      {formatCurrencyINR(stats?.revenue || 0)}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        <main className="p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
