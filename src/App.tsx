import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/shared/Footer/Footer";
import Header from "./components/shared/Header/Header";
import TailwindIndicator from "./components/shared/TailwindIndicator";
import useScrollToTop from "./hooks/scrollToTop";
import Login from "./pages/Login";
const App = () => {
  return (
    <Router>
      <Header />
      <AppContent />
      <TailwindIndicator />
      <Footer />
    </Router>
  );
};

export default App;

const AppContent = () => {
  useScrollToTop();

  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
};
