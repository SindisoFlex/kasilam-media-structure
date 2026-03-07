import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Layout from "@/components/Layout";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import AudioProduction from "./pages/AudioProduction";
import VisualProduction from "./pages/VisualProduction";
import DigitalMarketing from "./pages/DigitalMarketing";
import Portfolio from "./pages/Portfolio";
import NotFound from "./pages/NotFound";

// Audio Sub-pages
import StudioRecording from "./pages/audio/StudioRecording";
import PodcastRecording from "./pages/audio/PodcastRecording";
import VoiceOverProduction from "./pages/audio/VoiceOverProduction";
import MixingMastering from "./pages/audio/MixingMastering";
import MusicProduction from "./pages/audio/MusicProduction";

// Digital Sub-pages
import SocialMediaManagement from "./pages/digital/SocialMediaManagement";
import PaidAdvertising from "./pages/digital/PaidAdvertising";
import ContentCreation from "./pages/digital/ContentCreation";
import WebDevelopment from "./pages/digital/WebDevelopment";
import AnalyticsReporting from "./pages/digital/AnalyticsReporting";

// Visual Sub-pages
import CommunityEvents from "./pages/visual/CommunityEvents";
import CreatorsArtists from "./pages/visual/CreatorsArtists";
import BusinessCorporate from "./pages/visual/BusinessCorporate";
import WeddingProduction from "./pages/visual/WeddingProduction";
import FuneralCoverage from "./pages/visual/FuneralCoverage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
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

              {/* Audio Sub-routes */}
              <Route path="/services/audio-production/studio-recording" element={<StudioRecording />} />
              <Route path="/services/audio-production/podcast-recording" element={<PodcastRecording />} />
              <Route path="/services/audio-production/voiceover-production" element={<VoiceOverProduction />} />
              <Route path="/services/audio-production/mixing-coordination" element={<MixingMastering />} />
              <Route path="/services/audio-production/production-management" element={<MusicProduction />} />

              {/* Digital Sub-routes */}
              <Route path="/services/social-media-management" element={<SocialMediaManagement />} />
              <Route path="/services/paid-advertising" element={<PaidAdvertising />} />
              <Route path="/services/content-creation" element={<ContentCreation />} />
              <Route path="/services/web-app-development" element={<WebDevelopment />} />
              <Route path="/services/analytics-reporting" element={<AnalyticsReporting />} />

              {/* Visual Sub-routes */}
              <Route path="/services/visual-production/community-events" element={<CommunityEvents />} />
              <Route path="/services/visual-production/creators-artists" element={<CreatorsArtists />} />
              <Route path="/services/visual-production/business-corporate" element={<BusinessCorporate />} />
              <Route path="/services/visual-production/wedding-production" element={<WeddingProduction />} />
              <Route path="/services/visual-production/funeral-coverage" element={<FuneralCoverage />} />

              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
