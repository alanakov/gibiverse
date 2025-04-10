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
import { Toaster } from "./components/ui/toaster";
import { DashboardSidebar } from "./components/custom/DashboardSidebar";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ProfileProvider>
          <div className="flex">
            <DashboardSidebar />

            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/authors" element={<AuthorsPage />} />
              <Route path="/comicbooks" element={<ComicBooksPage />} />
              path
              <Route path="/genres" element={<GenresPage />} />
              <Route path="/collections" element={<CollectionsPage />} />
            </Routes>
          </div>
        </ProfileProvider>
      </Router>
      <Toaster richColors closeButton position="bottom-left" />
    </AuthProvider>
  );
}
