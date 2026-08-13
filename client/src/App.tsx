import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/layout';
import { Suspense, lazy, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';

const Home = lazy(() => import('@/pages/Home'));
const Collections = lazy(() => import('@/pages/Collections'));
const ProductDetail = lazy(() => import('@/pages/ProductDetail'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const Login = lazy(() => import('@/pages/Login'));
const AdminLayout = lazy(() => import('@/components/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('@/components/admin/AdminDashboard'));
const AdminProducts = lazy(() => import('@/components/admin/AdminProducts'));
const AdminCategories = lazy(() => import('@/components/admin/AdminCategories'));
const AdminOrders = lazy(() => import('@/components/admin/AdminOrders'));
const AdminInquiries = lazy(() => import('@/components/admin/AdminInquiries'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Wishlist = lazy(() => import('@/pages/Wishlist'));
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('@/pages/TermsOfService'));

function AppRoutes() {
  const location = useLocation();
  const checkAuth = useAuthStore((s) => s.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const onResize = () => {
      useUIStore.getState().setIsMobile(window.innerWidth < 768);
    };
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotion = () => {
      useUIStore.getState().setReducedMotion(mq.matches);
    };
    onResize();
    onMotion();
    window.addEventListener('resize', onResize);
    mq.addEventListener?.('change', onMotion);
    return () => {
      window.removeEventListener('resize', onResize);
      mq.removeEventListener?.('change', onMotion);
    };
  }, []);


  return (
    <AnimatePresence mode="wait">
      <Suspense
        fallback={
          <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/collections"
            element={
              <Layout>
                <Collections />
              </Layout>
            }
          />
          <Route
            path="/jewelry"
            element={
              <Layout>
                <Collections />
              </Layout>
            }
          />
          <Route
            path="/product/:slug"
            element={
              <Layout>
                <ProductDetail />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />
          <Route
            path="/contact"
            element={
              <Layout>
                <Contact />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route
            path="/wishlist"
            element={
              <Layout>
                <Wishlist />
              </Layout>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <Layout>
                <PrivacyPolicy />
              </Layout>
            }
          />
          <Route
            path="/terms-of-service"
            element={
              <Layout>
                <TermsOfService />
              </Layout>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/products"
            element={
              <AdminLayout>
                <AdminProducts />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <AdminLayout>
                <AdminCategories />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AdminLayout>
                <AdminOrders />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/inquiries"
            element={
              <AdminLayout>
                <AdminInquiries />
              </AdminLayout>
            }
          />
          <Route
            path="*"
            element={
              <Layout>
                <NotFound />
              </Layout>
            }
          />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

function App() {
  return <AppRoutes />;
}

export default App;
