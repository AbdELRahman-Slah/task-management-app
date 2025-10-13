import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/providers/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Board from "./pages/Board";
import NotFound from "./pages/NotFound";
import { useContext } from "react";
import AuthContext from "./contexts/AuthContext";
import AuthContextProvider from "./providers/AuthContextProvider";
import Loader from "./components/global/Loader";
import BoardList from "./components/dashboard/BoardList";
import Inbox from "./pages/Dashboard/Inbox";

const queryClient = new QueryClient();

const ProtectedRoute = () => {
  const { user, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

const PublicRoute = () => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loader />;
  }

  if (user) {
    return <Navigate to="/dashboard/boards" replace />;
  }

  return <Outlet />;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="taskflow-ui-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthContextProvider>
              <Routes>
                {/* Public-only routes */}
                <Route element={<PublicRoute />}>
                  <Route path="/" element={<Landing />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/login" element={<Login />} />
                </Route>

                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                  <Route element={<Dashboard />}>
                    <Route path="/dashboard/boards" element={<BoardList />} />
                    <Route path="/dashboard/inbox" element={<Inbox />} />
                    <Route
                      path="/dashboard/settings"
                      element={<div>Settings</div>}
                    />
                  </Route>
                  <Route path="/board/:boardId" element={<Board />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthContextProvider>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
