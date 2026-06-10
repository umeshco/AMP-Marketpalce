export interface Publication {
  id: string;
  name: string;
  logo: string;
  price: number;
  domainAuthority: number;
  monthlyTraffic: string;
  deliveryTime: string;
  description: string;
  publishingGuarantee: string;
  category: "premium" | "finance" | "tech" | "general";
}

export interface Bundle {
  id: string;
  name: string;
  tagline: string;
  price: number;
  savings: string;
  publications: string[]; // publication IDs
  description: string;
  isPopular?: boolean;
}

export interface BriefData {
  brandName: string;
  website: string;
  niche: string;
  keywords: string[];
  angle: "founder-story" | "product-launch" | "funding" | "general" | string;
  instructions: string;
}

export interface PRDraft {
  id: string;
  orderId: string;
  title: string;
  content: string;
  status: "pending_generation" | "generated" | "approved";
  createdAt: string;
}

export interface PlacementOrder {
  id: string;
  brandName: string;
  website: string;
  niche: string;
  keywords: string[];
  angle: string;
  instructions: string;
  selectedPlacements: string[]; // publication IDs
  bundleId?: string; // if ordered via a pre-made bundle
  totalPrice: number;
  status: "brief_submitted" | "drafting" | "client_review" | "editorial_queue" | "live";
  draft?: PRDraft;
  createdAt: string;
  liveLinks: {
    publicationId: string;
    url: string;
    liveAt: string;
    domainAuthority: number;
    metrics: { views: number; backlinksCount: number };
  }[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  content: string;
  featuredPlacements: string[];
}
