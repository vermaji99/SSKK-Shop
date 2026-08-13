import SEO from '@/components/common/SEO';
import { BUSINESS } from '@/config/business';

const TermsOfService = () => (
  <>
    <SEO title="Terms of Service" description={`Terms of service for ${BUSINESS.name}`} />
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container max-w-3xl">
        <h1 className="heading-serif text-4xl text-gold-gradient font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-invert space-y-6 text-cream/80 text-sm leading-relaxed">
          <p>
            By using the {BUSINESS.name} website, you agree to use it for lawful purposes related to
            browsing our jewelry collections and submitting genuine inquiries.
          </p>
          <p>
            Product images, descriptions, and prices are indicative. Final pricing, availability, and
            specifications are confirmed in-store or via direct communication with our team.
          </p>
          <p>
            All jewelry is subject to hallmarking and quality standards as displayed at our showroom in{' '}
            {BUSINESS.city}, {BUSINESS.district}.
          </p>
          <p>
            For assistance, visit us at {BUSINESS.address} or call {BUSINESS.phonePrimaryFormatted}.
          </p>
        </div>
      </div>
    </div>
  </>
);

export default TermsOfService;
