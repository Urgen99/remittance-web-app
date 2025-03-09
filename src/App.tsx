import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DashboardLayout from "./components/layouts/DashboardLayout";
import DefaultLayout from "./components/layouts/DefaultLayout";
import TailwindIndicator from "./components/shared/TailwindIndicator";
import useScrollToTop from "./hooks/scrollToTop";
import CreatePassword from "./pages/CreatePassword";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import PersonalDetails from "./pages/PersonalDetails";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import SelectDocument from "./pages/SelectDocument";
import StepperPage from "./pages/StepperPage";
import UploadDocument from "./pages/UploadDocument";
import VerifyOtp from "./pages/VerifyOtp";
import Dashboard from "./pages/user/dashboard/Dashboard";
import Recipients from "./pages/user/dashboard/Recipients";
import TransactionHistory from "./pages/user/dashboard/TransactionHistory";
import CompleteProfile from "./pages/CompleteProfile";
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

        <Route path="/select-documents" element={<SelectDocument />} />
        <Route path="/upload-documents" element={<UploadDocument />} />
        <Route path="/personal-details" element={<PersonalDetails />} />
        <Route path="/stepper-page" element={<StepperPage />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
      </Route>

      {/* ---------- PROTECTED ROUTES Add (Authentication later) ---------- */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<TransactionHistory />} />
        <Route path="/recipients" element={<Recipients />} />
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
    { title: "Select Documents", to: "/select-documents" },
    { title: "Upload Documents", to: "/upload-documents" },
    { title: "Personal Details", to: "/personal-details" },
    { title: "Dashboard", to: "/dashboard" },
    { title: "Complete Profile", to: "/complete-profile" },
    { title: "Stepper Page", to: "/stepper-page" },
  ];

  return (
    <main className="h-screen flex border border-red-500 ">
      <div className="w-full flex flex-wrap gap-4 justify-center items-center">
        {paths.map(({ title, to }) => (
          <Link to={to} className="bg-black text-white px-4 py-3">
            {title}
          </Link>
        ))}
      </div>
    </main>
  );
};
