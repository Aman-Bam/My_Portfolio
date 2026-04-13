import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ImageKitProvider } from "@imagekit/react";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const urlEndpoint = import.meta.env.VITE_IK_URL_ENDPOINT || "";

const App = () => {
  if (!urlEndpoint) {
    console.warn("VITE_IK_URL_ENDPOINT is not defined in .env file");
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ImageKitProvider urlEndpoint={urlEndpoint}>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ImageKitProvider>
    </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
