import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Send,
  Loader2,
  Mail,
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import { cn } from '@/lib/utils';
import type { ApiResponse, Inquiry } from '@/lib/types';
import { Button, SectionTitle, Input, GoldDivider } from '@/components/ui';
import SEO from '@/components/common/SEO';
import { PAGE_SEO } from '@/config/seo';
import { BUSINESS } from '@/config/business';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    lines: [BUSINESS.address.split(',')[0], `${BUSINESS.city}, ${BUSINESS.district}`, BUSINESS.country],
    color: 'text-gold-400',
  },
  {
    icon: Phone,
    title: 'Call Us',
    lines: [BUSINESS.phonePrimaryFormatted, BUSINESS.phoneSecondaryFormatted],
    href: `tel:+91${BUSINESS.phonePrimary}`,
    color: 'text-gold-300',
  },
  {
    icon: Clock,
    title: 'Store Hours',
    lines: BUSINESS.hours.split(': ').slice(1).length
      ? [BUSINESS.hours.split(': ')[0] + ':', BUSINESS.hours.split(': ').slice(1).join(': ')]
      : [BUSINESS.hours],
    color: 'text-gold-200',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    lines: ['Chat with us', BUSINESS.phonePrimaryFormatted],
    href: BUSINESS.socials.whatsapp,
    color: 'text-green-400',
  },
];

interface InquiryFormData {
  name: string;
  phone: string;
  email: string;
  category: string;
  message: string;
}

const initialFormData: InquiryFormData = {
  name: '',
  phone: '',
  email: '',
  category: '',
  message: '',
};

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<InquiryFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});

  const createInquiry = useMutation({
    mutationFn: async (payload: InquiryFormData) => {
      const { data } = await api.post<ApiResponse<Inquiry>>('/inquiries', payload);
      return data;
    },
    onSuccess: (res) => {
      toast.success(res.message || 'Inquiry submitted successfully!');
      setFormData(initialFormData);
      setErrors({});
    },
    onError: (err: unknown) => {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || 'Failed to submit inquiry. Please try again.');
    },
  });

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\s-]{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    createInquiry.mutate(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <>
      <SEO
        title={PAGE_SEO.contact.title}
        description={PAGE_SEO.contact.description}
        canonical={PAGE_SEO.contact.canonical}
      />
    <div className="min-h-screen bg-background">
      <section className="relative min-h-[45vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-purple-800/80 to-background" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 40% 30%, rgba(212, 175, 55, 0.25) 0%, transparent 45%), radial-gradient(ellipse at 60% 70%, rgba(75, 31, 111, 0.4) 0%, transparent 50%)',
          }}
        />
        <div className="relative container section-padding pt-40 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="inline-block text-gold uppercase tracking-[0.35em] text-xs md:text-sm font-medium mb-6">
              SSKK JEWELERS
            </span>
            <h1
              className="heading-serif font-bold text-gold-gradient leading-tight"
              style={{ fontSize: 'clamp(2.75rem, 7vw, 5rem)' }}
            >
              Get In Touch
            </h1>
            <p className="mt-8 text-text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              We'd love to hear from you. Whether you have questions about our collection,
              need expert guidance, or wish to book a private consultation — our team is
              here to help you every step of the way.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container section-padding pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <h2 className="heading-serif text-cream text-3xl md:text-4xl font-bold leading-tight mb-4">
                Connect With Us
              </h2>
              <p className="text-text-muted leading-relaxed">
                Reach out through any of the channels below, or fill out the inquiry form
                and our jewelry experts will get back to you within 24 hours.
              </p>
            </div>
            <GoldDivider width={80} thickness={2} className="justify-start" />
            <div className="space-y-5">
              {contactInfo.map((info, idx) => {
                const Icon = info.icon;
                const Wrapper: React.ElementType = info.href ? 'a' : 'div';
                const wrapperProps = info.href
                  ? { href: info.href, target: info.href.startsWith('http') ? '_blank' : undefined, rel: 'noopener noreferrer' }
                  : {};
                return (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <Wrapper
                      {...wrapperProps}
                      className={cn(
                        'group flex items-start gap-5 p-6 glass hover:border-gold-400/34 transition-all duration-500',
                        info.href && 'cursor-pointer'
                      )}
                    >
                      <div className="shrink-0 w-14 h-14 rounded-full border border-gold-400/30 bg-gold-400/5 flex items-center justify-center group-hover:bg-gold-400/10 group-hover:border-gold-400/60 transition-all duration-500">
                        <Icon className={cn('w-6 h-6 transition-transform duration-500 group-hover:scale-110', info.color)} strokeWidth={1.75} />
                      </div>
                      <div>
                        <h3 className="heading-serif text-cream text-lg font-semibold mb-2">
                          {info.title}
                        </h3>
                        <div className="space-y-1">
                          {info.lines.map((line, lineIdx) => (
                            <p key={lineIdx} className="text-text-muted text-sm leading-relaxed">
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    </Wrapper>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-6 p-6 border border-gold-400/20 bg-gold-400/5">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="heading-serif text-cream font-semibold mb-1">Email Us</h4>
                  <p className="text-text-muted text-sm leading-relaxed">
                    Prefer email? Drop us a message and we'll respond at the earliest.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-3"
          >
            <div className="glass p-8 md:p-10">
              <SectionTitle
                label="SEND AN INQUIRY"
                title="Let's Start a Conversation"
                align="left"
                subtitle="Tell us about your requirements and our experts will guide you through our exclusive collection."
              />
              <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    name="name"
                    placeholder="Your full name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                  />
                  <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                  />
                  <div className="w-full">
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium text-text-muted uppercase tracking-wider text-[12px]"
                    >
                      Inquiry Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background-secondary/80 text-text placeholder-text-muted/60 font-sans text-sm transition-all duration-300 outline-none border border-purple-700/50 hover:border-purple-600/70 focus:border-gold-400 focus:ring-1 focus:ring-gold-400/40"
                    >
                      <option value="">Select a category...</option>
                      <option value="Gold Jewelry">Gold Jewelry</option>
                      <option value="Diamond Jewelry">Diamond Jewelry</option>
                      <option value="Wedding Collection">Wedding Collection</option>
                      <option value="Custom Design">Custom Design</option>
                      <option value="Repair & Service">Repair & Service</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <Input
                  label="Your Message"
                  name="message"
                  variant="textarea"
                  placeholder="Tell us about the piece you're looking for — occasion, budget, preferred style, or any specific requirements..."
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  error={errors.message}
                />
                <div className="pt-2">
                  <Button
                    type="submit"
                    size="lg"
                    loading={createInquiry.isPending}
                    disabled={createInquiry.isPending}
                    className="w-full md:w-auto min-w-[200px]"
                  >
                    {createInquiry.isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Inquiry
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-text-muted text-xs pt-2 leading-relaxed">
                  By submitting this form, you consent to SSKK contacting you regarding your inquiry.
                  We respect your privacy and will never share your information.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container pb-24 md:pb-32 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="overflow-hidden border border-gold-400/25"
        >
          <iframe
            title="SSKK Jewelers - Doharighat Location"
            src={BUSINESS.googleMapsEmbed}
            width="100%"
            height="480"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </section>
    </div>
    </>
  );
};

export default Contact;
