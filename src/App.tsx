import { useSelector } from "react-redux";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DashboardLayout from "./components/layouts/DashboardLayout";
import DefaultLayout from "./components/layouts/DefaultLayout";
import ProtectedRoute from "./components/protected-route/ProtectedRoute";
import TailwindIndicator from "./components/shared/TailwindIndicator";
import { Toaster } from "./components/ui/sonner";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "./features/auth/auth.slice";
import useScrollToTop from "./hooks/scrollToTop";
import CompleteProfile from "./pages/CompleteProfile";
import CreatePassword from "./pages/CreatePassword";
import DocumentExpired from "./pages/DocumentExpired";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import SendMoney from "./pages/SendMoney";
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

      <Toaster />
      <TailwindIndicator />
    </Router>
  );
};

export default App;

const AppContent = () => {
  useScrollToTop();

  return (
    <Routes>
      <Route path="/" element={<TestPaths />} />

      <Route element={<DefaultLayout />}>
        <Route path="/register" element={<Home />} />
        <Route path="/create-password" element={<CreatePassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/document-expired" element={<DocumentExpired />} />
        <Route path="/send-money" element={<SendMoney />} />
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

        <Route element={<ProtectedRoute />}>
          <Route path="/test-protected" element={<TestRoute />} />
        </Route>
      </Route>
    </Routes>
  );
};

const TestPaths = () => {
  const paths = [
    { title: "Home", to: "/" },
    { title: "Register", to: "/register" },
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
    { title: "Document Expired", to: "/document-expired" },
    { title: "Send Money", to: "/send-money" },
  ];

  return (
    <main className="w-full flex flex-col gap-8 items-center">
      <div className="space-y-8 mx-auto p-6">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          🚧 Under Construction - Development Preview 🚧
        </h1>

        <p className="text-lg text-gray-700 mb-4">
          Welcome to our early development preview! This is a{" "}
          <strong>test environment only</strong>
          and not a live application. Please note:
        </p>

        <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-400">
          <p className="text-red-600 font-semibold">
            ⚠️ DO NOT submit any real personal information ⚠️
          </p>
          <p className="mt-2 text-gray-600">
            All data in this system will be periodically wiped and is not
            secure. This preview is meant for layout testing and user flow
            validation only.
          </p>
        </div>

        <p className="text-blue-700 font-medium">
          Explore our current page prototypes below ↓
        </p>
      </div>

      <div className="w-full flex flex-wrap gap-4 justify-center items-center h-fit">
        {paths.map(({ title, to }) => (
          <Link key={to} to={to} className="bg-black text-white px-4 py-3">
            {title}
          </Link>
        ))}
      </div>
    </main>
  );
};

const TestRoute = () => {
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);

  return (
    <div className="min-h-screen flex flex-col gap-6">
      <h1 className="text-2xl">Protected Route</h1>

      <div className="max-w-96 w-full p-6 border border-gray-300 shadow-sm rounded-lg flex flex-col gap-4">
        <p>
          <span className="font-semibold">User: </span> {JSON.stringify(user)}
        </p>
        <p>
          <span className="font-semibold">Token:</span>
          {token?.slice(0, 20)}...
        </p>
      </div>
    </div>
  );
};
