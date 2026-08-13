import * as React from 'react';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import { Button, Input, SectionTitle } from '@/components/ui';
import type { ApiResponse, Inquiry } from '@/lib/types';

interface FormData {
  name: string;
  phone: string;
  email: string;
  category: string;
  message: string;
}

const initial: FormData = {
  name: '',
  phone: '',
  email: '',
  category: '',
  message: '',
};

const HomeInquiry: React.FC = () => {
  const [form, setForm] = React.useState<FormData>(initial);
  const [errors, setErrors] = React.useState<Partial<FormData>>({});

  const mutation = useMutation({
    mutationFn: async (payload: FormData) => {
      const { data } = await api.post<ApiResponse<Inquiry>>('/inquiries', payload);
      return data;
    },
    onSuccess: (res) => {
      toast.success(res.message || 'Inquiry sent successfully!');
      setForm(initial);
      setErrors({});
    },
    onError: (err: unknown) => {
      const e = err as { response?: { data?: { message?: string } } };
      toast.error(e.response?.data?.message || 'Failed to send inquiry.');
    },
  });

  const validate = () => {
    const next: Partial<FormData> = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.phone.trim()) next.phone = 'Phone is required';
    else if (!/^[0-9+\s-]{10,15}$/.test(form.phone.replace(/\s/g, '')))
      next.phone = 'Enter a valid phone number';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = 'Enter a valid email';
    if (!form.message.trim()) next.message = 'Message is required';
    else if (form.message.length < 10) next.message = 'Message must be at least 10 characters';
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
    <section className="section-padding relative overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto glass p-8 md:p-12 border border-gold-400/20"
        >
          <SectionTitle
            label="Get In Touch"
            title="Send an Inquiry"
            subtitle="Tell us about the jewelry you're looking for — our experts will respond within 24 hours."
            align="center"
            className="mb-10"
          />

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                label="Full Name"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="Your name"
              />
              <Input
                label="Phone"
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
                label="Email"
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
                  Jewelry Category
                </label>
                <select
                  id="home-category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background-secondary/80 text-text text-sm border border-purple-700/50 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400/40"
                >
                  <option value="">Select category...</option>
                  <option value="Rings">Rings</option>
                  <option value="Earrings">Earrings</option>
                  <option value="Necklaces">Necklaces</option>
                  <option value="Chains">Chains</option>
                  <option value="Bangles">Bangles</option>
                  <option value="Bridal Jewelry">Bridal Jewelry</option>
                  <option value="Nath">Nath</option>
                  <option value="Diamond Jewelry">Diamond Jewelry</option>
                  <option value="Custom Design">Custom Design</option>
                </select>
              </div>
            </div>
            <Input
              label="Message"
              name="message"
              variant="textarea"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              error={errors.message}
              placeholder="Describe the piece, occasion, or budget..."
            />
            <Button
              type="submit"
              size="lg"
              disabled={mutation.isPending}
              loading={mutation.isPending}
              className="w-full md:w-auto min-w-[200px]"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" /> Send Inquiry
                </>
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export { HomeInquiry };
export default HomeInquiry;
