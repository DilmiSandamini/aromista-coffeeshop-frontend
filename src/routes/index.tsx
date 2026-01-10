import { lazy, Suspense, type ReactNode } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { useAuth } from "../context/authContext"

const Index = lazy(() => import("../pages"))
const Login = lazy(() => import("../pages/Login"))
const Register = lazy(() => import("../pages/Register"))
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"))
const Home = lazy(() => import("../pages"))
const AdminLayout = lazy(() => import("../components/layout/AdminLayout"))
const AdminUserManage = lazy(() => import("../pages/admin/AdminUserManage"))
const AdminItemManage = lazy(() => import("../pages/admin/AdminItemManage"))
const AdminOthers = lazy(() => import("../pages/admin/AdminOthers"))
const CustomerLayout = lazy(() => import("../components/layout/CustomerLayout"))
const CustomerDashBoard = lazy(() => import("../pages/customer/CustomerDashBoard"))
const CustomerAbout = lazy(() => import("../pages/customer/CustomerAbout"))
const CustomerOrders = lazy(() => import("../pages/customer/CustomerOrders"))
const CustomerBooking = lazy(() => import("../pages/customer/CustomerBooking"))
const CustomerService = lazy(() => import("../pages/customer/CustomerService"))
const CustomerContact = lazy(() => import("../pages/customer/CustomerContact"))
const AdminOrdersManage = lazy(() => import("../pages/admin/AdminOrder"))
const AdminSettings = lazy(() => import("../pages/admin/AdminSettings"))
const BaristorDashboard = lazy(() => import("../pages/baristor/BaristorDashboard"))
const AdminBooking = lazy(() => import("../pages/admin/AdminBooking"))

type RequireAuthTypes = { children: ReactNode; roles?: string[] }

const RequireAuth = ({ children, roles }: RequireAuthTypes) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#faf7f2]">
        <div className="w-12 h-12 border-4 border-[#4a6741] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-[#3e2723] font-medium italic">Brewing your experience...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.some((role) => user.roles?.includes(role))) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center bg-[#faf7f2] px-6">
        <h2 className="text-3xl font-serif font-bold text-[#3e2723] mb-2">Access Denied</h2>
        <p className="text-gray-600">You do not have permission to view this page.</p>
        <Navigate to="/" replace />
      </div>
    );
  }

  return <>{children}</>;
};

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen bg-[#faf7f2]">
            <div className="w-12 h-12 border-4 border-[#4a6741] border-t-transparent rounded-full animate-spin"></div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route 
            path="/home" 
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            } 
          />

          <Route
            element={
              <RequireAuth roles={["CUSTOMER"]}>
                <CustomerLayout />
              </RequireAuth>
            }
          >
            <Route path="/customer/home" element={<CustomerDashBoard />} />
            <Route path="/customer/about" element={<CustomerAbout />} />
            <Route path="/customer/orders" element={<CustomerOrders />} />
            <Route path="/customer/booking" element={<CustomerBooking />} />
            <Route path="/customer/service" element={<CustomerService />} />
            <Route path="/customer/contact" element={<CustomerContact />} />
          </ Route>

          <Route
            element={
              <RequireAuth roles={["ADMIN"]}>
                <AdminLayout />
              </RequireAuth>
            }
          >
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUserManage />} />
            <Route path="/admin/items" element={<AdminItemManage />} />
            <Route path="/admin/orders" element={<AdminOrdersManage />} />
            <Route path="/admin/others" element={<AdminOthers />} />
            <Route path="/admin/bookings" element={<AdminBooking />} />
            <Route path="/admin/settings" element={<AdminSettings />} />

          </ Route>

          <Route>
            <Route path="/baristor/dashboard" element={<BaristorDashboard />} />
          </ Route>

        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}