import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import AudioProduction from "./pages/AudioProduction";
import VisualProduction from "./pages/VisualProduction";
import DigitalMarketing from "./pages/DigitalMarketing";
import StudioRecording from "./pages/audio/StudioRecording";
import PodcastRecording from "./pages/audio/PodcastRecording";
import VoiceoverProduction from "./pages/audio/VoiceoverProduction";
import MixingCoordination from "./pages/audio/MixingCoordination";
import ProductionManagement from "./pages/audio/ProductionManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/services/audio-production" element={<AudioProduction />} />
              <Route path="/services/visual-production" element={<VisualProduction />} />
              <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
              <Route path="/services/audio-production/studio-recording" element={<StudioRecording />} />
              <Route path="/services/audio-production/podcast-recording" element={<PodcastRecording />} />
              <Route path="/services/audio-production/voiceover-production" element={<VoiceoverProduction />} />
              <Route path="/services/audio-production/mixing-coordination" element={<MixingCoordination />} />
              <Route path="/services/audio-production/production-management" element={<ProductionManagement />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
