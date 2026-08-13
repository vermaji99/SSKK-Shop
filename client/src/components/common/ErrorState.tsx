import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw, ArrowLeft, Search, WifiOff, AlertTriangle, PackageX } from 'lucide-react';
import { Link } from 'react-router-dom';

export type ErrorType =
  | '404'
  | 'network'
  | 'product-not-found'
  | 'api-error'
  | 'empty-collection'
  | 'no-search-results';

interface ErrorStateProps {
  type?: ErrorType;
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  type = '404',
  title,
  message,
  onRetry,
}) => {
  const getDefaults = () => {
    switch (type) {
      case '404':
        return {
          icon: Sparkles,
          defaultTitle: '404 — Page Not Found',
          defaultMessage: 'The requested piece of gold or page could not be located in our royal archive.',
          showHomeBtn: true,
        };
      case 'network':
        return {
          icon: WifiOff,
          defaultTitle: 'Network Connection Lost',
          defaultMessage: 'Unable to connect to Shubham Swarn Kala Kendra servers. Please check your internet connection.',
          showRetry: true,
        };
      case 'product-not-found':
        return {
          icon: PackageX,
          defaultTitle: 'Jewelry Piece Not Found',
          defaultMessage: 'This product might have been moved or is currently reserved at our Doharighat showroom.',
          showCollectionBtn: true,
        };
      case 'api-error':
        return {
          icon: AlertTriangle,
          defaultTitle: 'Showroom Service Error',
          defaultMessage: 'We experienced an issue fetching data. Our artisans are on it.',
          showRetry: true,
        };
      case 'empty-collection':
        return {
          icon: PackageX,
          defaultTitle: 'Collection Empty',
          defaultMessage: 'No jewelry items are currently listed in this specific category.',
          showCollectionBtn: true,
        };
      case 'no-search-results':
        return {
          icon: Search,
          defaultTitle: 'No Matching Jewelry Found',
          defaultMessage: 'We could not find any ornaments matching your search keywords. Try searching for rings, necklaces, or bangles.',
          showCollectionBtn: true,
        };
      default:
        return {
          icon: AlertTriangle,
          defaultTitle: 'Something Went Wrong',
          defaultMessage: 'An unexpected error occurred.',
          showHomeBtn: true,
        };
    }
  };

  const config = getDefaults();
  const Icon = config.icon;
  const displayTitle = title || config.defaultTitle;
  const displayMessage = message || config.defaultMessage;

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-[#18082e]/80 border border-gold-500/30 rounded-2xl p-8 shadow-gold-glow text-cream"
      >
        <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto mb-6 text-gold-400">
          <Icon className="w-8 h-8" />
        </div>

        <span className="text-[10px] uppercase font-semibold tracking-[0.3em] text-gold-400 block mb-2">
          Shubham Swarn Kala Kendra
        </span>
        <h2 className="font-serif text-2xl font-bold text-gold-gradient mb-3">
          {displayTitle}
        </h2>
        <p className="text-cream/70 text-sm leading-relaxed mb-8 font-light">
          {displayMessage}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {onRetry && (
            <button onClick={onRetry} className="btn-primary inline-flex items-center gap-2 text-xs">
              <RefreshCw className="w-4 h-4" /> Try Again
            </button>
          )}

          {config.showHomeBtn && (
            <Link to="/" className="btn-primary inline-flex items-center gap-2 text-xs">
              <ArrowLeft className="w-4 h-4" /> Back To Showroom
            </Link>
          )}

          {config.showCollectionBtn && (
            <Link to="/collections" className="btn-secondary inline-flex items-center gap-2 text-xs">
              Explore All Collections
            </Link>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorState;
