
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Appointments from "./pages/Appointments";
import AppointmentBooking from "./pages/AppointmentBooking";
import Records from "./pages/Records";
import Payments from "./pages/Payments";
import AIDiagnosis from "./pages/AIDiagnosis";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/appointments/booking" element={<AppointmentBooking />} />
          <Route path="/records" element={<Records />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/ai-diagnosis" element={<AIDiagnosis />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
