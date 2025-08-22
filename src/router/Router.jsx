import { Navigate, Routes, Route } from 'react-router-dom';
import useAuth from '../hook/useAuth';
import Header from '../layout/Header/Header';
import AdminDashboard from '../dashboard/AdminDashboard';
import CustomerDashboard from '../dashboard/CustomerDashboard';
import AgentDashboard from '../dashboard/AgentDashboard';
import ProtectedRoute from '../provider/ProtectedRoute';

const AppLayout = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated && <Header />}
      <main className={isAuthenticated ? '' : 'min-h-screen'}>
        {children}
      </main>
    </div>
  );
};

export const Router = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <AppLayout>
      <Routes>
        {/* Protected Routes */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/customer/dashboard" element={
          <ProtectedRoute requiredRole="customer">
            <CustomerDashboard />
          </ProtectedRoute>
        } />
        <Route path="/agent/dashboard" element={
          <ProtectedRoute requiredRole="agent">
            <AgentDashboard />
          </ProtectedRoute>
        } />

        {/* Placeholder routes for future features */}
        <Route path="/customer/book" element={
          <ProtectedRoute requiredRole="customer">
            <div className="p-6 text-center">
              <h1 className="text-2xl font-bold">Book Parcel</h1>
              <p>Parcel booking feature coming soon...</p>
            </div>
          </ProtectedRoute>
        } />
        <Route path="/customer/parcels" element={
          <ProtectedRoute requiredRole="customer">
            <div className="p-6 text-center">
              <h1 className="text-2xl font-bold">My Parcels</h1>
              <p>Parcel management feature coming soon...</p>
            </div>
          </ProtectedRoute>
        } />
        <Route path="/customer/track" element={
          <ProtectedRoute requiredRole="customer">
            <div className="p-6 text-center">
              <h1 className="text-2xl font-bold">Track Parcel</h1>
              <p>Real-time tracking feature coming soon...</p>
            </div>
          </ProtectedRoute>
        } />

        {/* Default redirects */}
        <Route path="/" element={
          isAuthenticated ?
            <Navigate to={`/${user?.role}/dashboard`} /> :
            <Navigate to="/login" />
        } />

        {/* 404 Page */}
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
              <p className="text-gray-600">Page not found</p>
            </div>
          </div>
        } />
      </Routes>
    </AppLayout>
  );
};
