import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ShoppingBag, Search, Filter, RefreshCw, CheckCircle2, Truck, Clock, XCircle } from 'lucide-react';
import api from '@/lib/api';
import { Order, ApiResponse } from '@/lib/types';
import { formatCurrencyINR } from '@/lib/utils';
import toast from 'react-hot-toast';

export const AdminOrders: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['admin-orders', statusFilter],
    queryFn: async () => {
      const queryStr = statusFilter !== 'all' ? `?status=${statusFilter}` : '';
      const res = await api.get<ApiResponse<Order[]>>(`/orders${queryStr}`);
      return res.data;
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await api.put(`/orders/${id}/status`, { status });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
      toast.success('Order status updated successfully');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to update order status');
    },
  });

  const orders = data?.data || [];
  const filteredOrders = orders.filter(
    (o) =>
      o._id.toLowerCase().includes(search.toLowerCase()) ||
      o.shippingAddress?.name?.toLowerCase().includes(search.toLowerCase()) ||
      o.shippingAddress?.phone?.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="heading-serif text-2xl md:text-3xl font-bold text-gold-gradient">
            Order Management
          </h1>
          <p className="text-xs text-cream/70 mt-1">
            Track and process customer orders, update statuses, and review shipping details.
          </p>
        </div>

        <button
          onClick={() => refetch()}
          className="btn-secondary flex items-center gap-2 self-start sm:self-auto text-xs"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh List
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#1a0833] p-4 rounded-xl border border-gold-500/20">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Order ID, Customer Name, or Phone..."
            className="w-full bg-[#240e44] border border-gold-500/30 rounded-lg pl-10 pr-4 py-2 text-xs text-cream focus:outline-none focus:border-gold-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-gold-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#240e44] border border-gold-500/30 rounded-lg px-3 py-2 text-xs text-cream focus:outline-none focus:border-gold-400 w-full sm:w-auto"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="py-16 text-center text-gold-400">
          <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="py-16 text-center bg-[#17072d] rounded-xl border border-gold-500/20">
          <ShoppingBag className="w-12 h-12 text-gold-500/30 mx-auto mb-3" />
          <p className="font-serif text-lg text-cream">No orders found</p>
          <p className="text-xs text-cream/50 mt-1">Try clearing your filter or search query.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#190933] border border-gold-500/20 rounded-xl p-5 hover:border-gold-500/40 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gold-500/10 pb-4 mb-4 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-base font-bold text-gold-300">
                      Order #{order._id.slice(-8).toUpperCase()}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider border ${
                        order.status === 'delivered'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : order.status === 'shipped'
                          ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                          : order.status === 'processing'
                          ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                          : order.status === 'cancelled'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-cream/50 mt-1">
                    Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-serif text-lg font-bold text-gold-gradient">
                    {formatCurrencyINR(order.totalAmount)}
                  </span>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatusMutation.mutate({ id: order._id, status: e.target.value })
                    }
                    className="bg-[#2a124c] border border-gold-500/30 rounded-lg px-3 py-1.5 text-xs text-cream focus:outline-none focus:border-gold-400"
                  >
                    <option value="pending">Mark Pending</option>
                    <option value="processing">Mark Processing</option>
                    <option value="shipped">Mark Shipped</option>
                    <option value="delivered">Mark Delivered</option>
                    <option value="cancelled">Mark Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-gold-400 font-semibold mb-2">
                    Customer Information
                  </h4>
                  <p className="text-xs text-cream font-medium">{order.shippingAddress?.name || 'N/A'}</p>
                  <p className="text-xs text-cream/70 mt-0.5">📞 {order.shippingAddress?.phone || 'N/A'}</p>
                  <p className="text-xs text-cream/60 mt-1">
                    📍 {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-wider text-gold-400 font-semibold mb-2">
                    Ordered Items ({order.items?.length || 0})
                  </h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-gold-500/10">
                        <span className="text-cream/80 truncate max-w-[200px]">
                          {item.name} × {item.qty}
                        </span>
                        <span className="text-gold-300 font-semibold">{formatCurrencyINR(item.price * item.qty)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
