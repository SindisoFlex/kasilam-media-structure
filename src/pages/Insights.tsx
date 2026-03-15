import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Video, Globe, PenTool } from "lucide-react";

const categories = [
  {
    title: "Photography Guides",
    desc: "Planning professional photoshoots, lighting techniques, and visual storytelling.",
    icon: Camera,
    link: "/services/visual-production",
  },
  {
    title: "Video Marketing",
    desc: "How businesses use video content to build trust, reach, and growth.",
    icon: Video,
    link: "/services/visual-production",
  },
  {
    title: "Website & Digital Strategy",
    desc: "Website development, SEO fundamentals, and online visibility best practices.",
    icon: Globe,
    link: "/services/web-development",
  },
  {
    title: "Content & Social Media",
    desc: "Content creation, social media growth, and brand positioning for digital platforms.",
    icon: PenTool,
    link: "/services/digital-marketing",
  },
];

const featuredArticles = [
  {
    title: "How Professional Photography Builds Brand Trust",
    summary:
      "Brands in Port Elizabeth (Gqeberha) and across the Eastern Cape grow credibility when their visuals reflect real quality. This guide explains how photography elevates trust for South African businesses.",
  },
  {
    title: "Why Video Content Dominates Social Media Marketing",
    summary:
      "From Port Elizabeth (Gqeberha) to national campaigns across South Africa, short-form and narrative video drives attention and conversions. Learn how to plan video with purpose.",
  },
  {
    title: "How Small Businesses Can Improve Their Online Presence",
    summary:
      "Small businesses in the Eastern Cape need clear websites, SEO basics, and consistent content. This article outlines the exact steps to strengthen online visibility in South Africa.",
  },
];

const Insights = () => {
  useEffect(() => {
    document.title = "Insights | KMP Creative Media & Digital Strategy Resources";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Creative insights and digital growth resources covering photography, videography, website development, and marketing for Port Elizabeth (Gqeberha), Eastern Cape, and South Africa."
      );
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20">
        <div className="absolute inset-0 z-0">
          <img
            src="/insights-hero.svg"
            alt="Creative workstations and professional media production environment"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background" />
        </div>
        <div className="content-width relative z-10 text-center">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-primary mb-6">
            Insights & Resources
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-foreground leading-[1.05] mb-6">
            Creative Insights & Digital Growth Resources
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Practical knowledge on photography, videography, digital marketing, website development, and content strategy for businesses and creators.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild variant="black" size="lg" className="h-12 px-8 text-xs font-black uppercase tracking-[0.3em]">
              <Link to="/services">View Services</Link>
            </Button>
            <Button asChild variant="outlineBlack" size="lg" className="h-12 px-8 text-xs font-black uppercase tracking-[0.3em]">
              <Link to="/contact">Start a Project</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding border-y border-foreground/5">
        <div className="content-width">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-4">Article Categories</h2>
            <p className="text-lg text-foreground/60">
              Organized insights across creative production and digital strategy to help teams make smarter decisions.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <div key={category.title} className="premium-card p-6 bg-background flex flex-col">
                <div className="mb-4 h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <category.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-black mb-3">{category.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed mb-6">{category.desc}</p>
                <Button asChild variant="link" className="mt-auto h-auto p-0 text-red-600 font-black uppercase tracking-[0.3em] text-[10px]">
                  <Link to={category.link}>Explore</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="section-padding bg-alternate/40">
        <div className="content-width">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-4">Featured Articles</h2>
              <p className="text-lg text-foreground/60">
                Practical guidance built from real production and digital growth experience.
              </p>
            </div>
            <span className="text-xs font-black uppercase tracking-[0.4em] text-primary/70">
              Updated Insights
            </span>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {featuredArticles.map((article) => (
              <article key={article.title} className="premium-card p-6 bg-background">
                <div className="h-40 rounded-2xl bg-gradient-to-br from-foreground/10 via-background to-foreground/5 border border-foreground/10 mb-6" />
                <h3 className="text-xl font-black mb-3">{article.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{article.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-background border-t border-foreground/5">
        <div className="content-width text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Build With Proven Expertise</h2>
          <p className="text-lg text-foreground/60 max-w-3xl mx-auto mb-10">
            If you need production, website development, or digital marketing in Port Elizabeth (Gqeberha), the Eastern Cape, or across South Africa, our team is ready to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="red" size="lg" className="h-12 px-8 text-xs font-black uppercase tracking-[0.3em]">
              <Link to="/contact">Start a Project</Link>
            </Button>
            <Button asChild variant="black" size="lg" className="h-12 px-8 text-xs font-black uppercase tracking-[0.3em]">
              <Link to="/portfolio">View Portfolio</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Insights;
