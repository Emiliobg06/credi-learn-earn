import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DemoPage } from './components/DemoPage';
import Index from "@/pages/Index";
import LearnHub from "@/pages/LearnHub";         
import LearnPymes from "@/pages/LearnPymes";     
import LearnPersonal from "@/pages/LearnPersonal"; 
import Pitch from "@/pages/Pitch";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pitch" element={<Pitch />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/learn" element={<LearnHub />} />
          <Route path="/learn/pymes" element={<LearnPymes />} />
          <Route path="/learn/personal" element={<LearnPersonal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
