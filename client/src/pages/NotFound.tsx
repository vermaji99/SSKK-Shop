import React from 'react';
import { ErrorState } from '@/components/common/ErrorState';
import SEO from '@/components/common/SEO';

export const NotFound: React.FC = () => {
  return (
    <>
      <SEO title="Page Not Found | Shubham Swarn Kala Kendra" />
      <div className="pt-28 pb-16 min-h-screen bg-background flex items-center justify-center">
        <ErrorState type="404" />
      </div>
    </>
  );
};

export default NotFound;
