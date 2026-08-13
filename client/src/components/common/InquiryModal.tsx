import React, { useState } from 'react';
import { X, Send, Phone, MessageCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/lib/types';
import { BUSINESS } from '@/config/business';
import api from '@/lib/api';
import toast from 'react-hot-toast';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(
    product
      ? `Hello, I am interested in "${product.name}" (${product.goldPurity || '22K Gold'}, Weight: ${product.weight || 'N/A'}g). Please share price details and availability.`
      : 'Hello, I would like to inquire about your gold jewelry collections.'
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast.error('Please enter your name and phone number');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/inquiries', {
        name,
        phone,
        email,
        category: product?.category ? (typeof product.category === 'object' ? product.category.name : product.category) : 'General',
        message: `${message}${product ? ` [Product: ${product.name} (ID: ${product._id})]` : ''}`,
      });
      setSubmitted(true);
      toast.success('Inquiry submitted! Our showroom team will contact you shortly.');
    } catch (err: any) {
      console.error('Inquiry error:', err);
      toast.error(err.response?.data?.message || 'Failed to submit inquiry. Please call or WhatsApp us.');
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappDirectUrl = `https://wa.me/${BUSINESS.whatsappPrimary}?text=${encodeURIComponent(
    `Hello Shubham Swarn Kala Kendra, I want to inquire about ${product ? `"${product.name}"` : 'your gold collections'}.\nName: ${name || 'Customer'}\nPhone: ${phone}`
  )}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9990] bg-[#0c0517]/85 backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            className="relative w-full max-w-lg bg-[#18092d] border border-gold-500/30 rounded-2xl p-6 md:p-8 shadow-gold-glow-lg text-cream"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-cream/50 hover:text-gold-400 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-gold-300">
                  Thank You, {name}!
                </h3>
                <p className="text-sm text-cream/70 max-w-xs mx-auto">
                  Your inquiry has been sent to Shubham Swarn Kala Kendra in Doharighat. We will connect with you via phone or WhatsApp shortly.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center justify-center gap-2 text-xs"
                  >
                    <MessageCircle className="w-4 h-4" /> Open WhatsApp
                  </a>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      onClose();
                    }}
                    className="btn-secondary text-xs"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-400 block mb-1">
                    Showroom Inquiry
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-gold-gradient">
                    {product ? `Enquire About ${product.name}` : 'Connect With Our Artisans'}
                  </h3>
                  {product && (
                    <div className="mt-3 p-3 rounded-lg bg-[#240e44] border border-gold-500/20 flex items-center gap-3">
                      {product.images?.[0] && (
                        <img
                          src={product.images[0].url}
                          alt={product.name}
                          className="w-12 h-12 rounded object-cover"
                        />
                      )}
                      <div>
                        <div className="text-xs font-serif font-semibold text-cream">{product.name}</div>
                        <div className="text-[11px] text-gold-400">
                          ₹{product.price.toLocaleString('en-IN')} • {product.goldPurity || '22K Gold'}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-cream/70 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rajesh Verma"
                      className="w-full bg-[#240e44] border border-gold-500/30 focus:border-gold-400 rounded-lg px-4 py-2.5 text-sm text-cream placeholder:text-cream/30 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-cream/70 mb-1">
                      Phone / Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 9935178342"
                      className="w-full bg-[#240e44] border border-gold-500/30 focus:border-gold-400 rounded-lg px-4 py-2.5 text-sm text-cream placeholder:text-cream/30 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-cream/70 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. rajesh@example.com"
                      className="w-full bg-[#240e44] border border-gold-500/30 focus:border-gold-400 rounded-lg px-4 py-2.5 text-sm text-cream placeholder:text-cream/30 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-cream/70 mb-1">
                      Inquiry Details
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-[#240e44] border border-gold-500/30 focus:border-gold-400 rounded-lg px-4 py-2.5 text-sm text-cream placeholder:text-cream/30 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col gap-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary w-full flex items-center justify-center gap-2 py-3"
                    >
                      {submitting ? (
                        <div className="w-5 h-5 border-2 border-purple-950 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4" /> Send Direct Inquiry
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-2 my-1">
                      <div className="h-px bg-gold-500/20 flex-1" />
                      <span className="text-[10px] uppercase text-cream/40">Or Connect Directly</span>
                      <div className="h-px bg-gold-500/20 flex-1" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <a
                        href={whatsappDirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60 transition-colors text-xs font-semibold"
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-400" /> WhatsApp
                      </a>
                      <a
                        href={`tel:${BUSINESS.phonePrimary}`}
                        className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-purple-950/60 border border-gold-500/40 text-gold-300 hover:bg-purple-900/60 transition-colors text-xs font-semibold"
                      >
                        <Phone className="w-4 h-4 text-gold-400" /> Call Showroom
                      </a>
                    </div>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InquiryModal;
