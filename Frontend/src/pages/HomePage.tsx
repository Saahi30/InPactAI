import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Handshake,
  Layers,
  MessageSquare,
  Rocket,
  Users,
  Plus,
  TrendingUp,
  Calendar,
  Star,
  Target,
  Zap,
  BookOpen,
  Award,
  TrendingDown,
  Eye,
  Heart,
  Share2,
  Play,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { MainNav } from "../components/main-nav";
import { ModeToggle } from "../components/mode-toggle";
import { UserNav } from "../components/user-nav";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../utils/supabase";

const features = [
  {
    icon: Handshake,
    title: "AI-Driven Matchmaking",
    desc: "Connect with brands based on audience demographics, engagement rates, and content style.",
    gradient: "from-blue-500 to-purple-600",
  },
  {
    icon: Users,
    title: "Creator Collaboration Hub",
    desc: "Find and partner with creators who have complementary audiences and content niches.",
    gradient: "from-green-500 to-blue-600",
  },
  {
    icon: Layers,
    title: "Smart Pricing Optimization",
    desc: "Get fair sponsorship pricing recommendations based on engagement and market trends.",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    icon: MessageSquare,
    title: "AI Contract Assistant",
    desc: "Structure deals, generate contracts, and optimize terms using AI insights.",
    gradient: "from-orange-500 to-red-600",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    desc: "Track sponsorship performance, audience engagement, and campaign success.",
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    icon: Rocket,
    title: "ROI Tracking",
    desc: "Measure and optimize return on investment for both creators and brands.",
    gradient: "from-teal-500 to-green-600",
  },
];

const dashboardFeatures = [
  {
    icon: TrendingUp,
    title: "Analytics Dashboard",
    desc: "Track your performance metrics, engagement rates, and growth trends.",
  },
  {
    icon: Handshake,
    title: "Active Collaborations",
    desc: "Manage your ongoing partnerships and track collaboration progress.",
  },
  {
    icon: Calendar,
    title: "Campaign Calendar",
    desc: "Schedule and organize your content campaigns and brand partnerships.",
  },
  {
    icon: MessageSquare,
    title: "Communication Hub",
    desc: "Connect with brands and creators through our integrated messaging system.",
  },
  {
    icon: BarChart3,
    title: "Performance Insights",
    desc: "Get detailed analytics and insights to optimize your content strategy.",
  },
  {
    icon: Plus,
    title: "Create New Campaign",
    desc: "Start new collaborations and campaigns with our AI-powered matching system.",
  },
];

const successStories = [
  {
    creator: "Sarah Chen",
    niche: "Tech & Lifestyle",
    followers: "2.1M",
    brand: "TechFlow",
    result: "500% ROI increase",
    story: "Sarah's authentic tech reviews helped TechFlow launch their new smartphone with record-breaking pre-orders.",
    avatar: "/avatars/sarah.jpg",
    platform: "YouTube",
  },
  {
    creator: "Marcus Rodriguez",
    niche: "Fitness & Wellness",
    followers: "850K",
    brand: "FitFuel",
    result: "300% engagement boost",
    story: "Marcus's workout challenges with FitFuel products generated over 10M views and 50K+ app downloads.",
    avatar: "/avatars/marcus.jpg",
    platform: "Instagram",
  },
  {
    creator: "Emma Thompson",
    niche: "Sustainable Fashion",
    followers: "1.2M",
    brand: "EcoStyle",
    result: "200% sales increase",
    story: "Emma's sustainable fashion content helped EcoStyle become the top eco-friendly brand in their category.",
    avatar: "/avatars/emma.jpg",
    platform: "TikTok",
  },
];

const trendingNiches = [
  {
    name: "AI & Tech",
    growth: "+45%",
    creators: "12.5K",
    avgEngagement: "8.2%",
    icon: Zap,
    color: "from-blue-500 to-purple-600",
  },
  {
    name: "Sustainable Living",
    growth: "+38%",
    creators: "8.9K",
    avgEngagement: "9.1%",
    icon: Target,
    color: "from-green-500 to-teal-600",
  },
  {
    name: "Mental Health",
    growth: "+52%",
    creators: "15.2K",
    avgEngagement: "7.8%",
    icon: Heart,
    color: "from-pink-500 to-rose-600",
  },
  {
    name: "Gaming & Esports",
    growth: "+41%",
    creators: "22.1K",
    avgEngagement: "6.9%",
    icon: Play,
    color: "from-purple-500 to-indigo-600",
  },
  {
    name: "Personal Finance",
    growth: "+33%",
    creators: "6.8K",
    avgEngagement: "8.5%",
    icon: TrendingUp,
    color: "from-emerald-500 to-green-600",
  },
  {
    name: "Remote Work",
    growth: "+29%",
    creators: "9.3K",
    avgEngagement: "7.2%",
    icon: Users,
    color: "from-orange-500 to-red-600",
  },
];

const creatorResources = [
  {
    title: "Creator Economy Report 2024",
    desc: "Latest trends, platform changes, and monetization strategies",
    readTime: "8 min read",
    category: "Research",
    icon: BookOpen,
  },
  {
    title: "How to Negotiate Brand Deals",
    desc: "Master the art of pricing and contract negotiation",
    readTime: "12 min read",
    category: "Guide",
    icon: Handshake,
  },
  {
    title: "Content Calendar Templates",
    desc: "Free templates to organize your content strategy",
    readTime: "5 min read",
    category: "Template",
    icon: Calendar,
  },
  {
    title: "Platform Algorithm Updates",
    desc: "Stay ahead with latest social media changes",
    readTime: "6 min read",
    category: "News",
    icon: TrendingUp,
  },
];

const brandShowcase = [
  {
    name: "TechFlow",
    industry: "Technology",
    logo: "/brands/techflow.png",
    description: "Leading smartphone manufacturer seeking tech reviewers and lifestyle creators",
    followers: "2.5M",
    budget: "$5K - $50K",
    lookingFor: ["Tech Reviewers", "Lifestyle Creators", "Gaming Streamers"],
    activeCampaigns: 3,
  },
  {
    name: "FitFuel",
    industry: "Health & Fitness",
    logo: "/brands/fitfuel.png",
    description: "Premium fitness supplement brand looking for authentic fitness influencers",
    followers: "1.8M",
    budget: "$3K - $25K",
    lookingFor: ["Fitness Trainers", "Nutrition Experts", "Wellness Coaches"],
    activeCampaigns: 5,
  },
  {
    name: "EcoStyle",
    industry: "Sustainable Fashion",
    logo: "/brands/ecostyle.png",
    description: "Eco-friendly fashion brand seeking sustainable lifestyle advocates",
    followers: "950K",
    budget: "$2K - $20K",
    lookingFor: ["Fashion Influencers", "Sustainability Advocates", "Lifestyle Creators"],
    activeCampaigns: 2,
  },
  {
    name: "GameZone",
    industry: "Gaming",
    logo: "/brands/gamezone.png",
    description: "Gaming accessories company looking for esports and gaming content creators",
    followers: "3.2M",
    budget: "$4K - $40K",
    lookingFor: ["Gaming Streamers", "Esports Players", "Tech Reviewers"],
    activeCampaigns: 4,
  },
];

export default function HomePage() {
  const { isAuthenticated, user } = useAuth();
  
  // Refs for scroll detection
  const featuresRef = useRef(null);
  const successStoriesRef = useRef(null);
  const trendingRef = useRef(null);
  const resourcesRef = useRef(null);
  const footerRef = useRef(null);

  // State to track visibility (for one-time animation)
  const [isFeaturesVisible, setIsFeaturesVisible] = useState(false);
  const [isSuccessStoriesVisible, setIsSuccessStoriesVisible] = useState(false);
  const [isTrendingVisible, setIsTrendingVisible] = useState(false);
  const [isResourcesVisible, setIsResourcesVisible] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  // One-time animation state
  const [hasAnimatedTrending, setHasAnimatedTrending] = useState(false);
  const [hasAnimatedBrands, setHasAnimatedBrands] = useState(false);

  // Test Supabase connection
  const [isTesting, setIsTesting] = useState(false);
  
  const testSupabase = async () => {
    if (isTesting) return;
    setIsTesting(true);
    try {
      console.log("Testing Supabase connection...");
      const { data, error } = await supabase.from('users').select('count').limit(1);
      if (error) {
        console.error("Supabase test failed:", error);
        alert("Supabase test failed: " + error.message);
      } else {
        console.log("Supabase test successful:", data);
        alert("Supabase test successful!");
      }
    } catch (error) {
      console.error("Supabase test error:", error);
      alert("Supabase test error: " + error);
    } finally {
      setTimeout(() => setIsTesting(false), 2000);
    }
  };

  // Set up intersection observer for scroll detection (one-time animation)
  useEffect(() => {
    const trendingObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimatedTrending) {
          setIsTrendingVisible(true);
          setHasAnimatedTrending(true);
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.1 }
    );
    const brandsObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimatedBrands) {
          setIsSuccessStoriesVisible(true);
          setHasAnimatedBrands(true);
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.1 }
    );
    if (trendingRef.current) trendingObserver.observe(trendingRef.current);
    if (successStoriesRef.current) brandsObserver.observe(successStoriesRef.current);
    return () => {
      if (trendingRef.current) trendingObserver.unobserve(trendingRef.current);
      if (successStoriesRef.current) brandsObserver.unobserve(successStoriesRef.current);
    };
  }, [hasAnimatedTrending, hasAnimatedBrands]);

  // ... keep other observers for footer, etc. if needed ...
  useEffect(() => {
    const footerObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsFooterVisible(entry.isIntersecting);
      },
      { root: null, rootMargin: "0px", threshold: 0.1 }
    );
    if (footerRef.current) footerObserver.observe(footerRef.current);
    return () => {
      if (footerRef.current) footerObserver.unobserve(footerRef.current);
    };
  }, []);

  // Logged-in user homepage
  if (isAuthenticated && user) {
    return (
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-900">
        {/* Header with glassmorphism */}
        <header className="fixed top-0 z-50 w-full border-b border-white/20 bg-white/10 backdrop-blur-xl px-6">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-6 md:gap-10">
              <Link to="/" className="flex items-center space-x-2">
                <div className="relative">
                  <Rocket className="h-6 w-6 text-purple-600" />
                  <div className="absolute -inset-1 bg-purple-600/20 rounded-full blur-sm"></div>
                </div>
                <span className="font-bold text-xl text-gray-900">Inpact</span>
              </Link>
              <MainNav />
            </div>
            <div className="flex items-center gap-4">
              <ModeToggle />
              <UserNav />
            </div>
          </div>
        </header>

        {/* Hero Section - Image Left, Text Right, Text More Centered */}
        <main className="flex-1">
          <section className="w-full min-h-screen flex items-center relative pt-16 overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 via-blue-100/50 to-indigo-100/50"></div>
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
            
            <div className="container relative z-10 px-0 md:px-0 max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-24 items-center">
                {/* Left Image */}
                <div className="relative order-first">
                  <div className="relative">
                    {/* 3D Glow Effect */}
                    <div className="absolute -inset-8 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-indigo-600/20 rounded-3xl blur-2xl animate-pulse"></div>
                    <div className="absolute -inset-4 bg-gradient-to-r from-purple-400/30 to-blue-400/30 rounded-2xl blur-xl"></div>
                    {/* Main Image */}
                    <div className="relative bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30 shadow-2xl">
                      <img
                        src="/Home.png"
                        alt="Dashboard Preview"
                        className="rounded-xl object-cover w-full h-auto shadow-lg"
                      />
                    </div>
                    {/* Floating Elements */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                      <TrendingUp className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{animationDelay: '0.5s'}}>
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div className="absolute top-1/2 -right-8 w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{animationDelay: '1s'}}>
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>
                {/* Right Content */}
                <div className="flex flex-col items-center lg:items-start justify-center w-full h-full space-y-8 order-last px-6 md:px-12 lg:px-24">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-6">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-700">Welcome back!</span>
                  </div>
                  <div className="space-y-6 w-full">
                    <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-tight w-full text-center lg:text-left">
                      Welcome back,{" "}
                      <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
                        {user.user_metadata?.name || user.email?.split('@')[0]}
                      </span>
                    </h1>
                    <p className="text-xl lg:text-2xl text-gray-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed w-full text-center lg:text-left">
                      Ready to grow your creator business? Explore new opportunities, track your performance, and connect with brands.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4 text-lg"
                    >
                      <Link to="/dashboard" className="flex items-center">
                        Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-white/30 bg-white/10 backdrop-blur-sm text-gray-900 hover:bg-white/20 transition-all duration-300 px-8 py-4 text-lg"
                    >
                      <Link to="/dashboard/sponsorships" className="flex items-center">
                        Browse Opportunities
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Trending Niches Section - Centered Grid, No Extra Right Space */}
          <section ref={trendingRef} className="w-full py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-blue-50/50"></div>
            <div
              className={`max-w-7xl mx-auto relative z-10 px-2 sm:px-4 md:px-8 text-center transition-all duration-1000 transform ${
                isTrendingVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-20"
              }`}
            >
              <h2 className="text-3xl font-bold sm:text-4xl text-gray-900 mb-4">
                Trending Niches
              </h2>
              <p className="mt-4 text-lg text-gray-700 mb-12">
                Discover the fastest-growing content categories and opportunities.
              </p>
              <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {trendingNiches.map((niche, idx) => (
                  <div
                    key={idx}
                    className="group p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:bg-white/80 w-full max-w-xs"
                  >
                    <div className={`flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br ${niche.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <niche.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {niche.name}
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Growth</p>
                        <p className="font-semibold text-green-600">{niche.growth}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Creators</p>
                        <p className="font-semibold text-gray-900">{niche.creators}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Avg Engagement</p>
                        <p className="font-semibold text-blue-600">{niche.avgEngagement}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Opportunity</p>
                        <p className="font-semibold text-purple-600">High</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Brand Showcase Section - Centered Grid, No Extra Right Space */}
          <section ref={successStoriesRef} className="w-full py-24 relative">
            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm"></div>
            <div
              className={`max-w-7xl mx-auto relative z-10 px-2 sm:px-4 md:px-8 text-center transition-all duration-1000 transform ${
                isSuccessStoriesVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-20"
              }`}
            >
              <h2 className="text-3xl font-bold sm:text-4xl text-gray-900 mb-4">
                Brands Seeking Creators
              </h2>
              <p className="mt-4 text-lg text-gray-700 mb-12">
                Connect with companies actively looking for creators like you.
              </p>
              <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
                {brandShowcase.map((brand, idx) => (
                  <div
                    key={idx}
                    className="group p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:bg-white/90 w-full max-w-xl"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-500 rounded-xl flex items-center justify-center">
                          <span className="text-white font-bold text-xl">
                            {brand.name.split('').slice(0, 2).join('')}
                          </span>
                        </div>
                        <div className="absolute -inset-1 bg-gradient-to-br from-purple-400/20 to-blue-500/20 rounded-xl blur-sm"></div>
                      </div>
                      <div className="text-left flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg">{brand.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{brand.industry}</p>
                        <p className="text-gray-700 text-sm">{brand.description}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-gray-600">Followers</p>
                        <p className="font-semibold text-gray-900">{brand.followers}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Budget Range</p>
                        <p className="font-semibold text-green-600">{brand.budget}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Active Campaigns</p>
                        <p className="font-semibold text-blue-600">{brand.activeCampaigns}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Looking For</p>
                        <p className="font-semibold text-purple-600">{brand.lookingFor.length} types</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {brand.lookingFor.map((type, typeIdx) => (
                        <span
                          key={typeIdx}
                          className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                    >
                      <Link to="/dashboard/sponsorships" className="flex items-center justify-center">
                        View Opportunities <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer ref={footerRef} className="w-full py-12 bg-gradient-to-r from-gray-900 to-gray-800 text-white relative">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
            <div
              className={`container relative z-10 px-6 md:px-12 text-center transition-all duration-1000 transform ${
                isFooterVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-20"
              }`}
            >
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="relative">
                  <Rocket className="h-6 w-6 text-purple-400" />
                  <div className="absolute -inset-1 bg-purple-400/20 rounded-full blur-sm"></div>
                </div>
                <span className="font-bold text-xl">Inpact</span>
              </div>
              <p className="text-gray-400">
                Empowering creators to build meaningful partnerships and grow their businesses.
              </p>
              <div className="mt-6 flex justify-center space-x-6 text-sm text-gray-400">
                <Link to="/dashboard" className="hover:text-white transition-colors">
                  Dashboard
                </Link>
                <Link to="/dashboard/sponsorships" className="hover:text-white transition-colors">
                  Opportunities
                </Link>
                <Link to="/dashboard/analytics" className="hover:text-white transition-colors">
                  Analytics
                </Link>
                <Link to="/dashboard/messages" className="hover:text-white transition-colors">
                  Messages
                </Link>
              </div>
            </div>
          </footer>
        </main>
      </div>
    );
  }

  // Non-logged-in user homepage (redesigned)
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-900">
      {/* Header with glassmorphism */}
      <header className="fixed top-0 z-50 w-full border-b border-white/20 bg-white/10 backdrop-blur-xl px-6">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <Link to="/" className="flex items-center space-x-2">
              <div className="relative">
                <Rocket className="h-6 w-6 text-purple-600" />
                <div className="absolute -inset-1 bg-purple-600/20 rounded-full blur-sm"></div>
              </div>
              <span className="font-bold text-xl text-gray-900">Inpact</span>
            </Link>
            <MainNav />
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <div className="hidden md:flex gap-2">
              <Button variant="ghost" className="text-gray-900 hover:bg-white/20">
                <Link to="/login">Login</Link>
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
            <UserNav />
          </div>
        </div>
      </header>

      {/* Hero Section - Completely Redesigned */}
      <main className="flex-1">
        <section className="w-full min-h-screen flex items-center relative pt-16 overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 via-blue-100/50 to-indigo-100/50"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
          
          <div className="container relative z-10 px-6 md:px-12">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              {/* Left Content */}
              <div className="text-center lg:text-left space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-6">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">AI-Powered Platform</span>
                </div>
                
                <div className="space-y-6">
                  {/* 3D Text Effect for "Inpact AI" */}
                  <div className="relative">
                    <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-gray-900 leading-tight">
                      <span className="relative">
                        <span className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-lg blur opacity-75 animate-pulse"></span>
                        <span className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
                          Inpact AI
                        </span>
                      </span>
                    </h1>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mt-4">
                      Creator Collaboration Platform
                    </h2>
                  </div>
                  
                  <p className="text-xl lg:text-2xl text-gray-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                    Connect with brands, collaborate with creators, and optimize your partnerships through data-driven insights.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4 text-lg group"
                  >
                    <Link to="/signup" className="flex items-center">
                      Get Started <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/30 bg-white/10 backdrop-blur-sm text-gray-900 hover:bg-white/20 transition-all duration-300 px-8 py-4 text-lg"
                    onClick={testSupabase}
                    disabled={isTesting}
                  >
                    {isTesting ? "Testing..." : "Test Connection"}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/30 bg-white/10 backdrop-blur-sm text-gray-900 hover:bg-white/20 transition-all duration-300 px-8 py-4 text-lg"
                  >
                    Learn More
                  </Button>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">10K+</div>
                    <div className="text-sm text-gray-600">Creators</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">500+</div>
                    <div className="text-sm text-gray-600">Brands</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">$2M+</div>
                    <div className="text-sm text-gray-600">Revenue</div>
                  </div>
                </div>
              </div>
              
              {/* Right Image */}
              <div className="relative order-first lg:order-last">
                <div className="relative">
                  {/* 3D Glow Effect */}
                  <div className="absolute -inset-8 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-indigo-600/20 rounded-3xl blur-2xl animate-pulse"></div>
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-400/30 to-blue-400/30 rounded-2xl blur-xl"></div>
                  
                  {/* Main Image */}
                  <div className="relative bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30 shadow-2xl">
                    <img
                      src="/Home.png"
                      alt="Hero Image"
                      className="rounded-xl object-cover w-full h-auto shadow-lg"
                    />
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{animationDelay: '0.5s'}}>
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute top-1/2 -right-8 w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{animationDelay: '1s'}}>
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Revealed on Scroll */}
        <section ref={featuresRef} className="w-full py-24 relative">
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm"></div>
          <div
            className={`container relative z-10 px-6 md:px-12 text-center transition-all duration-1000 transform ${
              isFeaturesVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-20"
            }`}
          >
            <h2 className="text-3xl font-bold sm:text-4xl text-gray-900 mb-4">
              Key Features
            </h2>
            <p className="mt-4 text-lg text-gray-700 mb-12">
              Leverage AI to transform your creator partnerships and brand sponsorships.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map(({ icon: Icon, title, desc, gradient }, idx) => (
                <div
                  key={idx}
                  className="group p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:bg-white/80"
                >
                  <div className={`flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br ${gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {title}
                  </h3>
                  <p className="text-gray-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section ref={successStoriesRef} className="w-full py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-blue-50/50"></div>
          <div
            className={`container relative z-10 px-6 md:px-12 text-center transition-all duration-1000 transform ${
              isSuccessStoriesVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-20"
            }`}
          >
            <h2 className="text-3xl font-bold sm:text-4xl text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="mt-4 text-lg text-gray-700 mb-12">
              Real creators achieving amazing results with brand partnerships.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {successStories.map((story, idx) => (
                <div
                  key={idx}
                  className="group p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:bg-white/90"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                          {story.creator.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-br from-purple-400/20 to-blue-500/20 rounded-full blur-sm"></div>
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900">{story.creator}</h3>
                      <p className="text-sm text-gray-600">{story.niche}</p>
                    </div>
                  </div>
                  <div className="text-left mb-4">
                    <p className="text-gray-700 mb-3">{story.story}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4 text-gray-500" />
                        {story.followers}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        {story.platform}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-3 border border-green-200">
                    <p className="text-sm font-semibold text-green-800">
                      Result: {story.result}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Niches Section */}
        <section ref={trendingRef} className="w-full py-24 relative">
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm"></div>
          <div
            className={`container relative z-10 px-6 md:px-12 text-center transition-all duration-1000 transform ${
              isTrendingVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-20"
            }`}
          >
            <h2 className="text-3xl font-bold sm:text-4xl text-gray-900 mb-4">
              Trending Niches
            </h2>
            <p className="mt-4 text-lg text-gray-700 mb-12">
              Discover the fastest-growing content categories and opportunities.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingNiches.map((niche, idx) => (
                <div
                  key={idx}
                  className="group p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:bg-white/80"
                >
                  <div className={`flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br ${niche.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <niche.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {niche.name}
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Growth</p>
                      <p className="font-semibold text-green-600">{niche.growth}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Creators</p>
                      <p className="font-semibold text-gray-900">{niche.creators}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Avg Engagement</p>
                      <p className="font-semibold text-blue-600">{niche.avgEngagement}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Opportunity</p>
                      <p className="font-semibold text-purple-600">High</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Creator Resources Section */}
        <section ref={resourcesRef} className="w-full py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50"></div>
          <div
            className={`container relative z-10 px-6 md:px-12 text-center transition-all duration-1000 transform ${
              isResourcesVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-20"
            }`}
          >
            <h2 className="text-3xl font-bold sm:text-4xl text-gray-900 mb-4">
              Creator Resources
            </h2>
            <p className="mt-4 text-lg text-gray-700 mb-12">
              Stay ahead with the latest insights, tools, and strategies.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {creatorResources.map((resource, idx) => (
                <div
                  key={idx}
                  className="group p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:bg-white/90"
                >
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <resource.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <span className="inline-block px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full mb-2">
                      {resource.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">{resource.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{resource.readTime}</span>
                      <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                        Read More →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer ref={footerRef} className="w-full py-12 bg-gradient-to-r from-gray-900 to-gray-800 text-white relative">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
          <div
            className={`container relative z-10 px-6 md:px-12 text-center transition-all duration-1000 transform ${
              isFooterVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-20"
            }`}
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="relative">
                <Rocket className="h-6 w-6 text-purple-400" />
                <div className="absolute -inset-1 bg-purple-400/20 rounded-full blur-sm"></div>
              </div>
              <span className="font-bold text-xl">Inpact</span>
            </div>
            <p className="text-gray-400">
              Empowering creators to build meaningful partnerships and grow their businesses.
            </p>
            <div className="mt-6 flex justify-center space-x-6 text-sm text-gray-400">
              <Link to="/login" className="hover:text-white transition-colors">
                Login
              </Link>
              <Link to="/signup" className="hover:text-white transition-colors">
                Sign Up
              </Link>
              <Link to="/about" className="hover:text-white transition-colors">
                About
              </Link>
              <Link to="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
