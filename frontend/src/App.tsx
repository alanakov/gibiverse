import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProfileProvider } from "./contexts/ProfileContext";
import { Login } from "./pages/public/Login";
import { Signup } from "./pages/public/SignUp";
import { HomePage } from "./pages/auth/Home/Page";
import { AuthorsPage } from "./pages/auth/Authors/Page";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ProfileProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/home" element={<HomePage />} />
            <Route path="/authors" element={<AuthorsPage />} />
          </Routes>
        </ProfileProvider>
      </Router>
    </AuthProvider>
  );
}
