import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { MessageSquare, Phone, Mail, Clock, CheckCircle, RefreshCw, MessageCircle } from 'lucide-react';
import api from '@/lib/api';
import { Inquiry, ApiResponse } from '@/lib/types';
import { BUSINESS } from '@/config/business';
import toast from 'react-hot-toast';

export const AdminInquiries: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['admin-inquiries', filter],
    queryFn: async () => {
      const queryStr = filter !== 'all' ? `?status=${filter}` : '';
      const res = await api.get<ApiResponse<Inquiry[]>>(`/inquiries${queryStr}`);
      return res.data;
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await api.patch(`/inquiries/${id}/status`, { status });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-inquiries'] });
      toast.success('Inquiry status updated');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to update inquiry status');
    },
  });

  const inquiries = data?.data || [];

  const getWhatsAppReplyLink = (inquiry: Inquiry) => {
    const text = `Hello ${inquiry.name}, thank you for contacting Shubham Swarn Kala Kendra regarding your inquiry. How can we assist you today?`;
    const cleanPhone = inquiry.phone.replace(/\D/g, '');
    const formattedPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="heading-serif text-2xl md:text-3xl font-bold text-gold-gradient">
            Showroom Customer Inquiries
          </h1>
          <p className="text-xs text-cream/70 mt-1">
            Review and respond to direct product inquiries from Doharighat & online visitors.
          </p>
        </div>

        <button
          onClick={() => refetch()}
          className="btn-secondary flex items-center gap-2 self-start sm:self-auto text-xs"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh List
        </button>
      </div>

      <div className="flex items-center gap-3 bg-[#1a0833] p-4 rounded-xl border border-gold-500/20">
        <span className="text-xs font-semibold text-gold-400 uppercase tracking-wider">Filter By Status:</span>
        <div className="flex flex-wrap gap-2">
          {['all', 'pending', 'contacted', 'completed'].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-all ${
                filter === st
                  ? 'bg-gold-500 text-purple-950 font-bold'
                  : 'bg-[#240e44] text-cream/70 hover:text-gold-300 border border-gold-500/20'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="py-16 text-center text-gold-400">
          <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      ) : inquiries.length === 0 ? (
        <div className="py-16 text-center bg-[#17072d] rounded-xl border border-gold-500/20">
          <MessageSquare className="w-12 h-12 text-gold-500/30 mx-auto mb-3" />
          <p className="font-serif text-lg text-cream">No customer inquiries found</p>
          <p className="text-xs text-cream/50 mt-1">New showroom customer inquiries will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {inquiries.map((inquiry) => (
            <motion.div
              key={inquiry._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#190933] border border-gold-500/20 rounded-xl p-5 hover:border-gold-500/40 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gold-500/10 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-gold-400" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-gold-300">{inquiry.name}</h3>
                    <p className="text-xs text-cream/50">
                      Category: <span className="text-gold-400 font-medium">{inquiry.category || 'General'}</span> •{' '}
                      {new Date(inquiry.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider border ${
                      inquiry.status === 'completed'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : inquiry.status === 'contacted'
                        ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    }`}
                  >
                    {inquiry.status}
                  </span>

                  <select
                    value={inquiry.status}
                    onChange={(e) =>
                      updateStatusMutation.mutate({ id: inquiry._id, status: e.target.value })
                    }
                    className="bg-[#2a124c] border border-gold-500/30 rounded-lg px-3 py-1.5 text-xs text-cream focus:outline-none focus:border-gold-400"
                  >
                    <option value="pending">Mark Pending</option>
                    <option value="contacted">Mark Contacted</option>
                    <option value="completed">Mark Completed</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-[#230d43] p-4 rounded-lg border border-gold-500/10 text-cream/90 text-sm font-light">
                  "{inquiry.message}"
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex flex-wrap items-center gap-4 text-xs text-cream/70">
                    <a
                      href={`tel:${inquiry.phone}`}
                      className="flex items-center gap-1.5 hover:text-gold-300 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-gold-400" /> {inquiry.phone}
                    </a>
                    {inquiry.email && (
                      <a
                        href={`mailto:${inquiry.email}`}
                        className="flex items-center gap-1.5 hover:text-gold-300 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 text-gold-400" /> {inquiry.email}
                      </a>
                    )}
                  </div>

                  <a
                    href={getWhatsAppReplyLink(inquiry)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60 transition-colors text-xs font-semibold"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" /> Reply via WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminInquiries;
