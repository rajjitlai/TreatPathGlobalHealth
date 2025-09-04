/* eslint-disable react/prop-types */
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Dashboard from "./pages/personal/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Saved from "./pages/personal/Saved";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import Layout from "./Layout";
import { useEffect, useState } from "react";
import VerifyEmail from "./auth/VerifyEmail";
import VerifyPrompt from "./auth/VerifyPrompt";
import Search from "./pages/Search";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import AffiliateDisclosure from "./pages/AffiliateDisclosure";
import About from "./pages/About";
import FAQ from "./pages/FAQ";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    if (!loading && !user) {
      setRedirectPath(window.location.pathname);
    }
  }, [loading, user]);

  if (loading) return <div className="text-center flex items-center justify-center w-full h-screen">Loading...</div>;

  return user ? children : <Navigate to={`/login?redirect=${redirectPath || "/"}`} replace />;
};

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center flex items-center justify-center w-full h-screen">Loading...</div>;

  return user?.labels?.includes("admin") ? children : <Navigate to="/dashboard" replace />;
};

const App = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <Signup />} />

        <Route path="/product/:id" element={
          <Layout>
            <SingleProduct />
          </Layout>
        } />

        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/verify-prompt" element={<VerifyPrompt />} />

        <Route path="/search" element={<Search />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/affiliate-disclosure" element={<AffiliateDisclosure />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />

        <Route path="/dashboard" element={
          <PrivateRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/saved" element={
          <PrivateRoute>
            <Layout>
              <Saved />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/admin" element={
          <AdminRoute>
            <Layout>
              <AdminDashboard />
            </Layout>
          </AdminRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
