import Login from '@/auth/login/Login';
import Register from '@/auth/register/Register';
import AdminAgents from '@/components/admin/AdminAgents';
import AdminParcels from '@/components/admin/AdminParcels';
import AdminReports from '@/components/admin/AdminReports';
import AgentParcels from '@/components/agent/AgentParcels';
import BookParcelForm from '@/components/booking/BookParcelForm';
import ParcelHistory from '@/components/customer/ParcelHistory';
import TrackParcel from '@/components/tracking/TrackParcel';
import { Navigate, Route, Routes } from 'react-router-dom';
import AdminDashboard from '../dashboard/AdminDashboard';
import AgentDashboard from '../dashboard/AgentDashboard';
import CustomerDashboard from '../dashboard/CustomerDashboard';
import useAuth from '../hooks/useAuth';
import Header from '../layout/Header/Header';
import ProtectedRoute from '../provider/ProtectedRoute';
import NotFound from '@/error/NotFound';

const AppLayout = ({ children }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {user && <Header />}
      <main className={user ? '' : 'min-h-screen'}>
        {children}
      </main>
    </div>
  );
};

export const Router = () => {
  const { user } = useAuth();

  return (
    <AppLayout>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={`/${user?.role}/dashboard`} />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to={`/${user?.role}/dashboard`} />}
        />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/parcels" element={
          <ProtectedRoute requiredRole="admin">
            <AdminParcels />
          </ProtectedRoute>
        } />
        <Route path="/admin/agents" element={
          <ProtectedRoute requiredRole="admin">
            <AdminAgents />
          </ProtectedRoute>
        } />
        <Route path="/admin/reports" element={
          <ProtectedRoute requiredRole="admin">
            <AdminReports />
          </ProtectedRoute>
        } />

        {/* Agent Routes */}
        <Route path="/agent/dashboard" element={
          <ProtectedRoute requiredRole="agent">
            <AgentDashboard />
          </ProtectedRoute>
        } />
        <Route path="/agent/parcels" element={
          <ProtectedRoute requiredRole="agent">
            <AgentParcels />
          </ProtectedRoute>
        } />

        {/* Customer Routes */}
        <Route path="/customer/dashboard" element={
          <ProtectedRoute requiredRole="customer">
            <CustomerDashboard />
          </ProtectedRoute>
        } />
        <Route path="/customer/book" element={
          <ProtectedRoute requiredRole="customer">
            <BookParcelForm />
          </ProtectedRoute>
        } />
        <Route path="/customer/parcels" element={
          <ProtectedRoute requiredRole="customer">
            <ParcelHistory />
          </ProtectedRoute>
        } />
        <Route path="/customer/track" element={
          <ProtectedRoute requiredRole="customer">
            <TrackParcel />
          </ProtectedRoute>
        } />
        <Route path="/customer/track/:trackingNumber" element={
          <ProtectedRoute requiredRole="customer">
            <TrackParcel />
          </ProtectedRoute>
        } />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 404 Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppLayout>
  );
};
