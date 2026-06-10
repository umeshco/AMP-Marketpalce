import { Publication, Bundle, Testimonial } from "./types";

export const PUBLICATIONS: Publication[] = [
  {
    id: "forbes",
    name: "Forbes",
    logo: "FRB",
    price: 1499,
    domainAuthority: 94,
    monthlyTraffic: "120M+",
    deliveryTime: "7-10 Days",
    description: "The gold standard of authority. Highly exclusive editorial feature on the world's leading business network.",
    publishingGuarantee: "Yes, fully editorial reviewed",
    category: "premium"
  },
  {
    id: "bloomberg",
    name: "Bloomberg",
    logo: "BBG",
    price: 499,
    domainAuthority: 93,
    monthlyTraffic: "85M+",
    deliveryTime: "3-5 Days",
    description: "The ultimate platform for financial credibility, executive announcements, and investor relations.",
    publishingGuarantee: "Guaranteed publication index",
    category: "finance"
  },
  {
    id: "business-insider",
    name: "Business Insider",
    logo: "BI",
    price: 749,
    domainAuthority: 92,
    monthlyTraffic: "95M+",
    deliveryTime: "4-6 Days",
    description: "Get featured on one of the fastest-growing modern business news hubs on the web. Outstanding SEO backlink.",
    publishingGuarantee: "Guaranteed editorial inclusion",
    category: "premium"
  },
  {
    id: "yahoo-finance",
    name: "Yahoo Finance",
    logo: "YF",
    price: 349,
    domainAuthority: 93,
    monthlyTraffic: "150M+",
    deliveryTime: "2-3 Days",
    description: "Guaranteed syndicate inclusion. Outstanding indexation value. Essential for digital launches and tickers.",
    publishingGuarantee: "100% Guaranteed syndication",
    category: "finance"
  },
  {
    id: "ap-news",
    name: "Associated Press",
    logo: "AP",
    price: 199,
    domainAuthority: 91,
    monthlyTraffic: "40M+",
    deliveryTime: "1-2 Days",
    description: "Global wire agency distribution. Instant syndication to hundreds of major regional platforms and search portals.",
    publishingGuarantee: "Guaranteed wire pickup",
    category: "general"
  },
  {
    id: "digital-journal",
    name: "Digital Journal",
    logo: "DJ",
    price: 129,
    domainAuthority: 87,
    monthlyTraffic: "5M+",
    deliveryTime: "1-2 Days",
    description: "Highly authoritative modern tech & business journal, ideal for rapid product announcements and feature links.",
    publishingGuarantee: "100% Guaranteed index",
    category: "tech"
  },
  {
    id: "marketwatch",
    name: "MarketWatch",
    logo: "MW",
    price: 249,
    domainAuthority: 92,
    monthlyTraffic: "60M+",
    deliveryTime: "2-3 Days",
    description: "Premium investment and financial news dashboard. Outstanding for tech launches and enterprise press.",
    publishingGuarantee: "Guaranteed syndication link",
    category: "finance"
  },
  {
    id: "regional- syndicates",
    name: "150+ Affiliate Networks",
    logo: "CBS",
    price: 149,
    domainAuthority: 84,
    monthlyTraffic: "10M+",
    deliveryTime: "1-2 Days",
    description: "Syndicated placements spanning CBS, Fox, NBC, and ABC local affiliates across the USA. Dominates local SEO search.",
    publishingGuarantee: "Guaranteed multiple pickups",
    category: "general"
  }
];

export const BUNDLES: Bundle[] = [
  {
    id: "starter",
    name: "SEO Kickstart Bundle",
    tagline: "Perfect for new brands seeking high DA links and indexation booster",
    price: 299,
    savings: "Save $49",
    publications: ["ap-news", "regional- syndicates"],
    description: "Ideal for launches seeking immediate organic indexing. Covers a massive list of regional affiliates plus Associated Press global wire distribution."
  },
  {
    id: "authority-gold",
    name: "Financial & Tech Authority Pack",
    tagline: "Our most requested package for high credibility in finance & technology",
    price: 899,
    savings: "Save $248",
    publications: ["bloomberg", "yahoo-finance", "marketwatch", "ap-news"],
    description: "Dominate the business & investing segment. Features guaranteed indexes on Bloomberg, MarketWatch, Yahoo Finance, and news wires.",
    isPopular: true
  },
  {
    id: "executive-suite",
    name: "Pinnacle Enterprise Suite",
    tagline: "The absolute zenith of digital authority. Secure placements on top tier outlets.",
    price: 2199,
    savings: "Save $896",
    publications: ["forbes", "business-insider", "bloomberg", "yahoo-finance", "ap-news"],
    description: "Unparalleled corporate brand prestige. Includes editorial review features on Forbes, Business Insider, financial networks, and global wire coverage."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah Jenkins",
    role: "Founder & CEO",
    company: "ScribeFlow AI",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    rating: 5,
    content: "Publishing our founder feature on Forbes and Tech syndicate drove over $18k in inbound pipeline in the first 2 weeks. The blue checkmark on our Instagram was approved just 3 days after showing our news coverage! Outstanding speed.",
    featuredPlacements: ["forbes", "ap-news", "regional- syndicates"]
  },
  {
    id: "t2",
    name: "David Chen",
    role: "Chief of Growth",
    company: "Apex Ledger Corp",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    rating: 5,
    content: "The premium financial placements on Yahoo Finance and Bloomberg transformed our seed round interactions. Investors search your name first, and if Bloomberg shows up, you win instant trust. This tool is a literal game-changer for startups.",
    featuredPlacements: ["bloomberg", "yahoo-finance", "marketwatch"]
  }
];

export const FAQS = [
  {
    question: "How are you able to guarantee press publishing?",
    answer: "We maintain direct, enterprise-level editorial and syndication arrangements with media outlets. Where normal PR pitches fail 99% of the time, our pre-vetted slots guarantee publication for content that meets our transparent editorial standards."
  },
  {
    question: "Do you write the articles or do I have to provide them?",
    answer: "Both! You can upload your own completed press release or draft brief. What's even better is that our built-in Gemini-powered AI Copywriting suite instantly generates premium, standard-compliant press releases based on your brand niche and target keywords."
  },
  {
    question: "Are these links permanent or do they expire?",
    answer: "Almost all links are fully permanent. Outlets like Bloomberg, Forbes, and Business Insider index articles permanently. Some smaller local syndicates may archive news releases after 24 months, but your major authority links remain active forever."
  },
  {
    question: "Will these links help with our SEO and organic authority?",
    answer: "Absolutely. High-Domain Authority links (such as Yahoo Finance with DA 93 and Bloomberg with DA 93) pass immense link authority. You will see a measurable rise in your brand name keyword rankings, domain authority metrics, and search footprint."
  }
];
