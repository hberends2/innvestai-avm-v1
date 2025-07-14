
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Market from "./pages/Market";
import Revenue from "./pages/Revenue";
import PropertyDetails from "./pages/PropertyDetails";
import SubjectOccupancy from "./pages/SubjectOccupancy";
import UnderConstruction from "./pages/UnderConstruction";
import OperatingStatistics from "./pages/OperatingStatistics";
import TransactionSummary from "./pages/TransactionSummary";
import Valuation from "./pages/Valuation";
import Documents from "./pages/Documents";
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
          <Route path="/market" element={<Market />} />
          <Route path="/revenue" element={<Revenue />} />
          <Route path="/property-details" element={<PropertyDetails />} />
          <Route path="/subject-occupancy" element={<SubjectOccupancy />} />
          <Route path="/operating-statistics" element={<OperatingStatistics />} />
          <Route path="/transaction-summary" element={<TransactionSummary />} />
          <Route path="/valuation" element={<Valuation />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/under-construction" element={<UnderConstruction />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
