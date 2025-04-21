
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./hooks/useTheme";
import { AuthProvider } from "./hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Tools from "./pages/Tools";
import RCDeals from "./pages/RCDeals";
import Analytics from "./pages/Analytics";
import MusicPlayer from "./components/MusicPlayer";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";

// Create a new QueryClient instance outside of the component
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <BrowserRouter>
          <AuthProvider>
            <TooltipProvider>
              <div className="fixed bottom-4 right-4 z-50">
                <MusicPlayer isCompact />
              </div>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/rc-deals" element={<RCDeals />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
