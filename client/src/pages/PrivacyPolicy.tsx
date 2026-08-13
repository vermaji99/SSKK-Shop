import SEO from '@/components/common/SEO';
import { PAGE_SEO } from '@/config/seo';
import { BUSINESS } from '@/config/business';

const PrivacyPolicy = () => (
  <>
    <SEO
      title={PAGE_SEO.privacy.title}
      description={PAGE_SEO.privacy.description}
      canonical={PAGE_SEO.privacy.canonical}
    />
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container max-w-3xl">
        <h1 className="heading-serif text-4xl text-gold-gradient font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-invert space-y-6 text-cream/80 text-sm leading-relaxed">
          <p>
            {BUSINESS.name} respects your privacy. Information collected through our website inquiry forms
            (name, phone, email, message) is used solely to respond to your jewelry inquiries and provide
            customer service.
          </p>
          <p>
            We do not sell or share your personal information with third parties except as required to
            operate our services or comply with applicable law.
          </p>
          <p>
            For questions about this policy, contact us at{' '}
            <a href={`mailto:${BUSINESS.email}`} className="text-gold-400 hover:text-gold-300">
              {BUSINESS.email}
            </a>{' '}
            or call {BUSINESS.phonePrimaryFormatted}.
          </p>
        </div>
      </div>
    </div>
  </>
);

export default PrivacyPolicy;
