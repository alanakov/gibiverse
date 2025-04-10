import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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
import { PrivateRoute } from "./components/auth/PrivateRoute";
import { NotFound } from "./pages/NotFound";

const ProtectedRoutes = () => (
  <div className="flex">
    <DashboardSidebar />
    <PrivateRoute>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/comicbooks" element={<ComicBooksPage />} />
        <Route path="/genres" element={<GenresPage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PrivateRoute>
  </div>
);

const PublicRoutes = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  </div>
);

const AppContent = () => {
  const location = useLocation();
  const isPublicRoute = ["/login", "/signup", "/"].includes(location.pathname);

  return isPublicRoute ? <PublicRoutes /> : <ProtectedRoutes />;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ProfileProvider>
          <AppContent />
        </ProfileProvider>
      </Router>
      <Toaster richColors closeButton position="bottom-left" />
    </AuthProvider>
  );
}
