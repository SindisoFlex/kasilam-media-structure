import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { BookingProvider } from "@/contexts/BookingContext";
import BookingFlow from "@/components/BookingFlow";
import Layout from "@/components/Layout";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import AudioProduction from "./pages/AudioProduction";
import VisualProduction from "./pages/VisualProduction";
import DigitalMarketing from "./pages/DigitalMarketing";
import Portfolio from "./pages/Portfolio";
import NotFound from "./pages/NotFound";
import FuneralHomeDemo from "./pages/portfolio/FuneralHomeDemo";
import SchoolDemo from "./pages/portfolio/SchoolDemo";
import RestaurantDemo from "./pages/portfolio/RestaurantDemo";
import ConstructionDemo from "./pages/portfolio/ConstructionDemo";
import FuneralPhotography from "./pages/portfolio/FuneralPhotography";
import FuneralPhotographer from "./pages/FuneralPhotographer";
import PhotographyHub from "./pages/portfolio/PhotographyHub";
import FuneralPhotographyPage from "./pages/portfolio/FuneralPhotographyPage";
import FuneralGalleryPage from "./pages/portfolio/FuneralGalleryPage";
import WeddingPhotographyPage from "./pages/portfolio/WeddingPhotographyPage";
import WeddingTraditionalPage from "./pages/portfolio/WeddingTraditionalPage";
import WeddingWhitePage from "./pages/portfolio/WeddingWhitePage";
import EventPhotographyPage from "./pages/portfolio/EventPhotographyPage";
import EventSubcategoryPage from "./pages/portfolio/EventSubcategoryPage";
import VideographyPage from "./pages/portfolio/VideographyPage";
import WeddingPhotographerPE from "./pages/seo/WeddingPhotographerPE";
import FuneralPhotographerPE from "./pages/seo/FuneralPhotographerPE";
import EventPhotographerPE from "./pages/seo/EventPhotographerPE";
import VideographerPE from "./pages/seo/VideographerPE";
import RecordingStudioPE from "./pages/seo/RecordingStudioPE";
import WebsiteDesignPE from "./pages/seo/WebsiteDesignPE";

// Audio Sub-pages
import StudioRecording from "./pages/audio/StudioRecording";
import PodcastRecording from "./pages/audio/PodcastRecording";
import VoiceOverProduction from "./pages/audio/VoiceoverProduction";
import MixingMastering from "./pages/audio/MixingMastering";
import MixingCoordination from "./pages/audio/MixingCoordination";
import ProductionManagement from "./pages/audio/ProductionManagement";
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

import ErrorBoundary from "@/components/ErrorBoundary";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <BookingProvider>
            <Toaster />
            <Sonner />
            <BookingFlow />
            <BrowserRouter>
              <ScrollToTop />
              <Layout>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/services/audio-production" element={<AudioProduction />} />
                  <Route path="/services/visual-production" element={<VisualProduction />} />
                  <Route path="/services/digital-marketing" element={<DigitalMarketing />} />

                  {/* Audio Sub-routes */}
                  <Route path="/services/audio-production/studio-recording" element={<StudioRecording />} />
                  <Route path="/services/audio-production/podcast-recording" element={<PodcastRecording />} />
                  <Route path="/services/audio-production/voiceover-production" element={<VoiceOverProduction />} />
                  <Route path="/services/audio-production/mixing-coordination" element={<MixingCoordination />} />
                  <Route path="/services/audio-production/mixing-mastering" element={<MixingMastering />} />
                  <Route path="/services/audio-production/production-management" element={<ProductionManagement />} />
                  <Route path="/services/audio-production/music-production" element={<MusicProduction />} />

                  {/* Digital Sub-routes */}
                  <Route path="/services/social-media-management" element={<SocialMediaManagement />} />
                  <Route path="/services/paid-advertising" element={<PaidAdvertising />} />
                  <Route path="/services/content-creation" element={<ContentCreation />} />
                  <Route path="/services/web-app-development" element={<WebDevelopment />} />
                  <Route path="/services/web-development" element={<WebDevelopment />} />
                  <Route path="/services/analytics-reporting" element={<AnalyticsReporting />} />

                  {/* Visual Sub-routes */}
                  <Route path="/services/visual-production/community-events" element={<CommunityEvents />} />
                  <Route path="/services/visual-production/creators-artists" element={<CreatorsArtists />} />
                  <Route path="/services/visual-production/business-corporate" element={<BusinessCorporate />} />
                  <Route path="/services/visual-production/wedding-production" element={<WeddingProduction />} />
                  <Route path="/services/visual-production/funeral-coverage" element={<FuneralCoverage />} />

                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/portfolio/photography" element={<PhotographyHub />} />
                  <Route path="/portfolio/photography/funeral" element={<FuneralPhotographyPage />} />
                  <Route path="/portfolio/photography/funeral/gallery" element={<FuneralGalleryPage />} />
                  <Route path="/portfolio/photography/wedding" element={<WeddingPhotographyPage />} />
                  <Route path="/portfolio/photography/wedding/traditional" element={<WeddingTraditionalPage />} />
                  <Route path="/portfolio/photography/wedding/white" element={<WeddingWhitePage />} />
                  <Route path="/portfolio/photography/events" element={<EventPhotographyPage />} />
                  <Route path="/portfolio/photography/events/:type" element={<EventSubcategoryPage />} />
                  <Route path="/portfolio/videography" element={<VideographyPage />} />
                  
                  {/* SEO Landing Pages */}
                  <Route path="/wedding-photographer-port-elizabeth" element={<WeddingPhotographerPE />} />
                  <Route path="/funeral-photographer-port-elizabeth" element={<FuneralPhotographerPE />} />
                  <Route path="/event-photographer-port-elizabeth" element={<EventPhotographerPE />} />
                  <Route path="/videographer-port-elizabeth" element={<VideographerPE />} />
                  <Route path="/recording-studio-port-elizabeth" element={<RecordingStudioPE />} />
                  <Route path="/website-design-port-elizabeth" element={<WebsiteDesignPE />} />

                  <Route path="/portfolio/funeral-photography" element={<FuneralPhotography />} />
                  <Route path="/portfolio/funeral-home-demo" element={<FuneralHomeDemo />} />
                  <Route path="/portfolio/school-demo" element={<SchoolDemo />} />
                  <Route path="/portfolio/restaurant-demo" element={<RestaurantDemo />} />
                  <Route path="/portfolio/construction-demo" element={<ConstructionDemo />} />
                  <Route path="/funeral-photographer" element={<FuneralPhotographer />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </BookingProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
