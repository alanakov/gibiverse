import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Login } from "./pages/public/Login";
import { Signup } from "./pages/public/SignUp";
import { HomePage } from "./pages/auth/Home/page";
import { AuthorsPage } from "./pages/auth/Authors/page";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/authors" element={<AuthorsPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
