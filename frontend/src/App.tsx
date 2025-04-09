import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProfileProvider } from "./contexts/ProfileContext";
import { Login } from "./pages/public/Login";
import { Signup } from "./pages/public/SignUp";
import { HomePage } from "./pages/auth/Home/Page";
import { AuthorsPage } from "./pages/auth/Authors/Page";
import { ComicBooksPage } from "./pages/auth/ComicBooks/Page";
import { GenresPage } from "./pages/auth/Genres/Page";
import { CollectionsPage } from "./pages/auth/Collections/Page";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ProfileProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/home" element={<HomePage />} />
            <Route path="/authors" element={<AuthorsPage />} />
            <Route path="/books" element={<ComicBooksPage />} />
            <Route path="/genres" element={<GenresPage />} />
            <Route path="/collections" element={<CollectionsPage />} />
          </Routes>
        </ProfileProvider>
      </Router>
    </AuthProvider>
  );
}
