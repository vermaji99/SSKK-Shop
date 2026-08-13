import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, User as UserIcon, Shield, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import SEO from '@/components/common/SEO';
import toast from 'react-hot-toast';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = useAuthStore((s) => s.login);
  const register = useAuthStore((s) => s.register);
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isRegister) {
        await register({ name, email, password, phone });
        toast.success('Account created successfully! Welcome to Shubham Swarn Kala Kendra.');
      } else {
        await login(email, password);
        toast.success('Welcome back to Shubham Swarn Kala Kendra!');
      }
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error('Auth error:', err);
      toast.error(err.response?.data?.message || 'Authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title={isRegister ? 'Register Account' : 'Sign In'} noIndex />

      <div className="min-h-screen pt-32 pb-20 bg-background flex items-center justify-center relative overflow-hidden px-4">
        {/* Background glow effects */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-900/30 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-amber-900/20 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-[#18082d]/90 backdrop-blur-xl border border-gold-500/30 rounded-2xl p-8 shadow-gold-glow-lg text-cream relative z-10"
        >
          <div className="text-center mb-8">
            <span className="text-[10px] uppercase font-semibold tracking-[0.3em] text-gold-400 block mb-2">
              Royal Portal
            </span>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-gold-gradient">
              {isRegister ? 'Create Your Account' : 'Welcome Back'}
            </h1>
            <p className="text-xs text-cream/70 mt-2 font-light">
              {isRegister
                ? 'Register to save custom jewelry wishlists and track showroom inquiries.'
                : 'Access your account or administrative dashboard.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isRegister && (
              <div>
                <label className="block text-xs uppercase tracking-wider text-cream/70 mb-1.5 font-medium">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Anand Verma"
                    className="w-full bg-[#240e44] border border-gold-500/30 focus:border-gold-400 rounded-xl py-3 pl-11 pr-4 text-sm text-cream placeholder:text-cream/30 focus:outline-none transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-wider text-cream/70 mb-1.5 font-medium">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@sskk.com or email@example.com"
                  className="w-full bg-[#240e44] border border-gold-500/30 focus:border-gold-400 rounded-xl py-3 pl-11 pr-4 text-sm text-cream placeholder:text-cream/30 focus:outline-none transition-all"
                />
              </div>
            </div>

            {isRegister && (
              <div>
                <label className="block text-xs uppercase tracking-wider text-cream/70 mb-1.5 font-medium">
                  Phone Number
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-gold-400 font-medium">+91</span>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9935178342"
                    className="w-full bg-[#240e44] border border-gold-500/30 focus:border-gold-400 rounded-xl py-3 pl-12 pr-4 text-sm text-cream placeholder:text-cream/30 focus:outline-none transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-wider text-cream/70 mb-1.5 font-medium">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#240e44] border border-gold-500/30 focus:border-gold-400 rounded-xl py-3 pl-11 pr-4 text-sm text-cream placeholder:text-cream/30 focus:outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 mt-4 text-sm"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-purple-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {isRegister ? 'Create Account' : 'Sign In'} <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gold-500/20 text-center text-xs text-cream/60">
            {isRegister ? 'Already have an account?' : "Don't have an account yet?"}{' '}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-gold-300 hover:text-gold-400 font-semibold underline underline-offset-4 ml-1 transition-colors"
            >
              {isRegister ? 'Sign In' : 'Register Now'}
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-[11px] text-cream/40 flex items-center justify-center gap-1">
              <Shield className="w-3 h-3 text-gold-400" /> Protected by Shubham Swarn Kala Kendra
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
