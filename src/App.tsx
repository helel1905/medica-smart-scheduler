
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Appointments from "./pages/Appointments";
import MyAppointments from "./pages/MyAppointments";
import AppointmentDetail from "./pages/AppointmentDetail";
import AppointmentBooking from "./pages/AppointmentBooking";
import Records from "./pages/Records";
import RecordDetail from "./pages/RecordDetail";
import Payments from "./pages/Payments";
import AIDiagnosis from "./pages/AIDiagnosis";
import Profile from "./pages/Profile";
import PatientEdit from "./pages/PatientEdit";
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
          <Route path="/appointments/booking/:deptId/:doctorId" element={<AppointmentBooking />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
          <Route path="/my-appointments/detail/:id" element={<AppointmentDetail />} />
          <Route path="/records" element={<Records />} />
          <Route path="/records/:id" element={<RecordDetail />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/ai-diagnosis" element={<AIDiagnosis />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/patient-edit" element={<PatientEdit />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
