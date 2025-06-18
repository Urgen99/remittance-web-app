import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/layouts/DashboardLayout";
import DefaultLayout from "./components/layouts/DefaultLayout";
import ProtectedRoute from "./components/protected-route/ProtectedRoute";
import TailwindIndicator from "./components/shared/TailwindIndicator";
import { Toaster } from "./components/ui/sonner";
import useScrollToTop from "./hooks/scrollToTop";
import CompleteProfile from "./pages/private/complete-profile/CompleteProfile";
import Dashboard from "./pages/private/dashboard/Dashboard";
import DocumentExpired from "./pages/private/DocumentExpired";
import RecipientDetails from "./pages/private/recipients/RecipientDetails";
import Recipients from "./pages/private/recipients/Recipients";
import SendMoney from "./pages/private/send-money/SendMoney";
import TransactionDetails from "./pages/private/transactions/TransactionDetails";
import TransactionHistory from "./pages/private/transactions/TransactionHistory";
import CreatePassword from "./pages/public/CreatePassword";
import ForgotPassword from "./pages/public/ForgotPassword";
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import ResetPassword from "./pages/public/ResetPassword";
import VerifyOtp from "./pages/public/VerifyOtp";
const App = () => {
  return (
    <>
      <AppContent />
      <Toaster />
      <TailwindIndicator />
    </>
  );
};

export default App;

const AppContent = () => {
  useScrollToTop();

  return (
    <Routes>
      {/* ---------- DEFAULT LAYOUT PAGES  ---------- */}
      <Route path="/" element={<DefaultLayout />}>
        {/* Public Pages */}
        <Route index element={<Home />} />
        <Route path="create-password" element={<CreatePassword />} />
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="verify-otp" element={<VerifyOtp />} />
        <Route path="reset-password" element={<ResetPassword />} />

        {/* Private Pages */}
        <Route element={<ProtectedRoute />}>
          <Route path="complete-profile" element={<CompleteProfile />} />
          <Route path="document-expired" element={<DocumentExpired />} />
          <Route path="send-money" element={<SendMoney />} />
        </Route>
      </Route>

      {/* ---------- DASHBOARD LAYOUT PAGES  ---------- */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/transactions">
            <Route index element={<TransactionHistory />} />
            <Route path=":id" element={<TransactionDetails />} />
          </Route>

          <Route path="/recipients">
            <Route index element={<Recipients />} />
            <Route path=":id" element={<RecipientDetails />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
