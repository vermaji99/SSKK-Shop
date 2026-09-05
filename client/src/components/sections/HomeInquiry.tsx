import * as React from 'react';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Send, Loader2, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import { Button, Input, SectionTitle } from '@/components/ui';
import type { ApiResponse, Inquiry } from '@/lib/types';
import { WHATSAPP_PREFILLS, buildWhatsAppUrl } from '@/config/business';

interface FormData {
  name: string;
  phone: string;
  email: string;
  category: string;
  preferredContact: string;
  message: string;
}

const initial: FormData = {
  name: '',
  phone: '',
  email: '',
  category: '',
  preferredContact: 'WhatsApp',
  message: '',
};

const INQUIRY_WHATSAPP_URL = buildWhatsAppUrl(WHATSAPP_PREFILLS.header);

const HomeInquiry: React.FC = () => {
  const [form, setForm] = React.useState<FormData>(initial);
  const [errors, setErrors] = React.useState<Partial<FormData>>({});

  const mutation = useMutation({
    mutationFn: async (payload: FormData) => {
      const { data } = await api.post<ApiResponse<Inquiry>>('/inquiries', payload);
      return data;
    },
    onSuccess: (res) => {
      toast.success(res.message || 'Enquiry submitted successfully! We will contact you shortly.');
      setForm(initial);
      setErrors({});
    },
    onError: (err: unknown) => {
      const e = err as { response?: { data?: { message?: string } } };
      toast.error(e.response?.data?.message || 'Failed to submit enquiry. Please try again.');
    },
  });

  const validate = () => {
    const next: Partial<FormData> = {};
    if (!form.name.trim()) next.name = 'Full Name is required';
    if (!form.phone.trim()) next.phone = 'Phone number is required';
    else if (!/^[0-9+\s-]{10,15}$/.test(form.phone.replace(/\s/g, '')))
      next.phone = 'Enter a valid phone number';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = 'Enter a valid email address';
    if (!form.message.trim()) next.message = 'Message is required';
    else if (form.message.length < 5) next.message = 'Message must be at least 5 characters';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    mutation.mutate(form);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((p) => ({ ...p, [name]: undefined }));
    }
  };

  return (
    <section id="home-inquiry" className="section-padding relative overflow-hidden bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto bg-[#0C0617] p-8 sm:p-12 border border-gold-400/25 shadow-2xl"
        >
          <SectionTitle
            label="EXPERT GUIDANCE"
            title="Let's Find Your Perfect Piece."
            subtitle="Tell us what you're looking for and our jewellery experts will help you with the next step."
            align="center"
            className="mb-10"
          />

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                label="Full Name *"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="Enter your full name"
              />
              <Input
                label="Phone *"
                name="phone"
                type="tel"
                required
                value={form.phone}
                onChange={handleChange}
                error={errors.phone}
                placeholder="+91 XXXXX XXXXX"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                label="Email (Optional)"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="your@email.com"
              />
              <div className="w-full">
                <label
                  htmlFor="home-category"
                  className="block mb-2 text-[12px] font-medium text-text-muted uppercase tracking-wider"
                >
                  Jewellery Category
                </label>
                <select
                  id="home-category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#05020A] text-text placeholder-text-muted/60 font-sans text-sm transition-all duration-300 outline-none border border-gold-400/20 hover:border-gold-400/40 focus:border-gold-400 focus:ring-1 focus:ring-gold-400/40"
                >
                  <option value="">Select category...</option>
                  <option value="Rings">Rings</option>
                  <option value="Earrings">Earrings</option>
                  <option value="Necklaces">Necklaces</option>
                  <option value="Chains">Chains</option>
                  <option value="Bangles">Bangles</option>
                  <option value="Bridal Jewelry">Bridal Jewellery</option>
                  <option value="Nath">Nath</option>
                  <option value="Diamond Jewelry">Diamond Jewellery</option>
                  <option value="Custom Design">Custom Design</option>
                </select>
              </div>
            </div>

            <div className="w-full">
              <label
                htmlFor="home-preferredContact"
                className="block mb-2 text-[12px] font-medium text-text-muted uppercase tracking-wider"
              >
                Preferred Contact Method
              </label>
              <select
                id="home-preferredContact"
                name="preferredContact"
                value={form.preferredContact}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#05020A] text-text font-sans text-sm outline-none border border-gold-400/20 focus:border-gold-400"
              >
                <option value="WhatsApp">WhatsApp Message</option>
                <option value="Phone Call">Phone Call</option>
                <option value="Email">Email</option>
              </select>
            </div>

            <Input
              label="Message *"
              name="message"
              variant="textarea"
              required
              rows={4}
              value={form.message}
              onChange={handleChange}
              error={errors.message}
              placeholder="Describe your design requirement, gold purity preference (22K/18K), or budget..."
            />

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <Button
                type="submit"
                size="lg"
                variant="primary"
                disabled={mutation.isPending}
                loading={mutation.isPending}
                className="min-w-[210px]"
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> SUBMITTING...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> SEND ENQUIRY →
                  </>
                )}
              </Button>

              <a
                href={INQUIRY_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 text-xs uppercase tracking-widest font-semibold transition-all"
              >
                <MessageCircle size={16} /> OR CONTINUE ON WHATSAPP
              </a>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export { HomeInquiry };
export default HomeInquiry;
