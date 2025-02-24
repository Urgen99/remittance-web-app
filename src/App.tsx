import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/shared/Footer/Footer";
import Header from "./components/shared/Header/Header";
import TailwindIndicator from "./components/shared/TailwindIndicator";
import useScrollToTop from "./hooks/scrollToTop";
import CreatePassword from "./pages/CreatePassword";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import VerifyOtp from "./pages/VerifyOtp";
const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col ">
        <Header />

        <div className="grow">
          <AppContent />
        </div>

        <TailwindIndicator />
        <Footer />
      </div>
    </Router>
  );
};

export default App;

const AppContent = () => {
  useScrollToTop();

  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/create-password" element={<CreatePassword />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
};
