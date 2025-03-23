import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DashboardLayout from "./components/layouts/DashboardLayout";
import DefaultLayout from "./components/layouts/DefaultLayout";
import TailwindIndicator from "./components/shared/TailwindIndicator";
import useScrollToTop from "./hooks/scrollToTop";
import CompleteProfile from "./pages/CompleteProfile";
import CreatePassword from "./pages/CreatePassword";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import VerifyOtp from "./pages/VerifyOtp";
import Dashboard from "./pages/user/dashboard/Dashboard";
import RecipientDetails from "./pages/user/recipients/RecipientDetails";
import Recipients from "./pages/user/recipients/Recipients";
import TransactionDetails from "./pages/user/transactions/TransactionDetails";
import TransactionHistory from "./pages/user/transactions/TransactionHistory";
const App = () => {
  return (
    <Router>
      <AppContent />

      <TailwindIndicator />
    </Router>
  );
};

export default App;

const AppContent = () => {
  useScrollToTop();

  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Register />} />
        <Route path="/create-password" element={<CreatePassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
      </Route>

      {/* ---------- PROTECTED ROUTES Add (Authentication later) ---------- */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<TransactionHistory />} />
        <Route
          path="/transaction-details/:id"
          element={<TransactionDetails />}
        />
        <Route path="/recipients" element={<Recipients />} />
        <Route path="/recipient-details/:id" element={<RecipientDetails />} />
      </Route>

      <Route path="/test" element={<TestPaths />} />
    </Routes>
  );
};

const TestPaths = () => {
  const paths = [
    {
      title: "Register",
      to: "/",
    },
    { title: "Login", to: "/login" },
    { title: "Create Password", to: "/create-password" },
    { title: "Forgot Password", to: "/forgot-password" },
    { title: "Verify Otp", to: "/verify-otp" },
    { title: "Reset Password", to: "/reset-password" },
    { title: "Complete Profile", to: "/complete-profile" },
    { title: "Dashboard", to: "/dashboard" },
    { title: "Transactions", to: "/transactions" },
    { title: "Transaction Details", to: "/transaction-details" },
    { title: "Recipients", to: "/recipients" },
    { title: "Recipient Details", to: "/recipient-details" },
  ];

  return (
    <main className="h-[50vh] flex border border-red-500 items-center">
      <div className="w-full flex flex-wrap gap-4 justify-center items-center h-fit">
        {paths.map(({ title, to }) => (
          <Link to={to} className="bg-black text-white px-4 py-3">
            {title}
          </Link>
        ))}
      </div>
    </main>
  );
};
