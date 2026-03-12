import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageTransition from "./PageTransition";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const isDemoRoute = /^\/portfolio\/.+-demo\/?$/.test(pathname) || pathname === "/portfolio/funeral-photography";

  if (isDemoRoute) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
