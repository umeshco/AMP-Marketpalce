import React, { useState, useEffect } from 'react';
import { 
  Building, Globe, Users, BookOpen, Box, MessageSquare, Wallet, Settings, 
  Plus, Search, Sparkles, TrendingUp, CheckCircle, Clock, ArrowRight, X, 
  FileText, Check, RotateCw, ExternalLink, RefreshCcw, Landmark, Download, ShieldCheck, Mail, Info, ChevronRight, HelpCircle, Loader2,
  User as UserIcon, Lock, Shield, Award, Calendar
} from 'lucide-react';
import { Site, Order, ChatMessage, OrderFile, BlogPost, AdminSettings, User, SimulatedEmail } from './types';
import LandingPage from './components/LandingPage';

import BacklinkScanner from './components/BacklinkScanner';
import ChatsView from './components/ChatsView';

export const AVAILABLE_NICHES = [
  "Technology",
  "SaaS & Software",
  "AI & Machine Learning",
  "Cybersecurity",
  "Digital Marketing",
  "SEO & Web Development",
  "Finance & Investing",
  "Crypto & Blockchain",
  "Business & Startups",
  "Real Estate",
  "Law & Legal Services",
  "Education & E-Learning",
  "E-commerce",
  "Home & Garden",
  "Fashion & Style",
  "Health & Wellness",
  "Medicine & Nutrition",
  "Mental Health",
  "Fitness & Exercise",
  "Travel & Tourism",
  "Gaming & Esports",
  "Beauty & Skincare",
  "Photography & Videography",
  "Music & Audio",
  "Food & Recipes",
  "Parenting & Family",
  "Pets & Animals",
  "Automotive & Vehicles",
  "Sports & Athletics",
  "Sustainability & Environment",
  "Science & Research",
  "Arts & Crafts",
  "Luxury & Lifestyle"
];

export const detectNicheFromDomain = (domain: string, description?: string): string => {
  const domLower = domain.toLowerCase().trim();
  if (!domLower) return 'Technology';

  // Extract the domain part specifically to avoid catching keywords in extension paths
  const cleanDomain = domLower
    .replace(/^(https?:\/\/)?(www\.)?/, '')
    .split('/')[0];

  const target = cleanDomain || domLower;
  const targetNoExt = target.split('.')[0];

  // Specific domain overrides to support high-fidelity matching
  const domainOverrides: { [key: string]: string[] } = {
    "vbtcafe.com": [
      "Business & Startups",
      "Technology",
      "SaaS & Software",
      "SEO & Web Development",
      "Education & E-Learning"
    ],
    "vbtcafe": [
      "Business & Startups",
      "Technology",
      "SaaS & Software",
      "SEO & Web Development",
      "Education & E-Learning"
    ]
  };

  if (domainOverrides[target]) {
    return domainOverrides[target].join(", ");
  }
  if (domainOverrides[targetNoExt]) {
    return domainOverrides[targetNoExt].join(", ");
  }

  const matches: string[] = [];

  // If a description is provided, scan it first for extremely high fidelity matches
  const descLower = (description || '').toLowerCase();
  if (descLower) {
    const nicheKeywords: { [key: string]: string[] } = {
      "AI & Machine Learning": ["artificial intelligence", "machine learning", "neural network", "deep learning", "large language model", "generative ai", "chatbot", "openai", "gpt-4", "llm", "claude"],
      "SaaS & Software": ["software as a service", "saas", "cloud software", "desktop app", "mobile app", "workflow automation", "api integration", "software tool"],
      "Cybersecurity": ["cybersecurity", "cyber security", "data privacy", "encryption", "network security", "antivirus", "malware", "firewall", "ransomware", "vault"],
      "Digital Marketing": ["digital marketing", "seo strategy", "search engine optimization", "social media marketing", "lead generation", "sales funnel", "conversion rate", "pay per click", "advertising campaign", "ppc", "influencer marketing"],
      "SEO & Web Development": ["web development", "web design", "wordpress development", "react", "website development", "frontend", "backend", "javascript", "hosting", "html/css", "coding", "software engineering"],
      "Finance & Investing": ["personal finance", "stock market", "investing", "wealth management", "credit score", "mortgage", "accounting", "banking", "mutual funds", "roth ira", "portfolio", "taxes", "tax preparation"],
      "Crypto & Blockchain": ["cryptocurrency", "blockchain", "bitcoin", "ethereum", "solana", "web3", "crypto wallet", "nft", "decentralized finance", "defi", "smart contract"],
      "Business & Startups": ["business & startups", "entrepreneurship", "b2b", "venture capital", "corporate strategy", "business plan", "ecommerce business", "startup growth"],
      "Real Estate": ["real estate", "property investment", "home buying", "mortgage calculator", "house hunting", "apartment rentals", "realtor", "commercial property", "condos"],
      "Law & Legal Services": ["legal services", "attorney", "law firm", "solicitor", "litigation", "intellectual property", "trademark", "patent", "compliance"],
      "Education & E-Learning": ["e-learning", "online courses", "education", "tutor", "homeschooling", "academic research", "curriculum", "study guides", "learn online"],
      "E-commerce": ["online store", "ecommerce", "shopping", "retail", "best deals", "discounts", "product reviews", "shoppers", "coupon codes"],
      "Home & Garden": ["home improvement", "interior design", "home decor", "gardening", "woodworking", "landscaping", "diy home", "backyard", "furniture", "remodeling", "renovations", "home designs", "decor"],
      "Fashion & Style": ["fashion trends", "clothing", "apparel", "designer wear", "style guide", "jewelry", "footwear", "streetwear", "accessories", "outfits"],
      "Health & Wellness": ["health and wellness", "holistic health", "healthy lifestyle", "personal care", "spa", "vitality", "natural healing", "organic living"],
      "Medicine & Nutrition": ["medicine", "clinical", "pharmaceutical", "nutritionist", "supplements", "vitamins", "doctor", "healthy diet", "meal plan", "medical research"],
      "Mental Health": ["mental health", "mindfulness", "meditation", "therapy", "anxiety relief", "stress management", "depression support", "zen", "counseling"],
      "Fitness & Exercise": ["workout", "gym", "fitness routine", "exercise", "weight loss", "bodybuilding", "yoga", "pilates", "cardio", "strength training"],
      "Travel & Tourism": ["travel guide", "vacation planning", "destination", "hotel booking", "wanderlust", "flights", "road trip", "tourism", "backpacking", "explore"],
      "Gaming & Esports": ["video games", "esports", "gaming console", "pc gaming", "playstation", "xbox", "nintendo", "walkthroughs", "multiplayer"],
      "Beauty & Skincare": ["skincare routine", "beauty products", "makeup", "cosmetics", "hair care", "anti-aging", "glow", "nail care", "salons"],
      "Photography & Videography": ["photography", "videography", "camera gear", "lenses", "composition", "editing software", "filmmaking", "photo gallery"],
      "Music & Audio": ["music player", "songs", "sound engineering", "playlists", "podcast", "instruments", "audio production", "beats", "melody"],
      "Food & Recipes": ["recipes", "cooking", "cuisine", "gourmet", "restaurant reviews", "baking", "chef", "meal ideas", "food blog", "cafe"],
      "Parenting & Family": ["parenting", "baby care", "toddler", "family activities", "pregnancy", "motherhood", "fatherhood", "kids activities"],
      "Pets & Animals": ["pet care", "dog training", "cat food", "veterinary", "animal rescue", "puppy", "aquarium", "wildlife", "paws"],
      "Automotive & Vehicles": ["automotive", "car reviews", "motorcycles", "electric vehicles", "evs", "auto repair", "engine", "tires", "tesla"],
      "Sports & Athletics": ["sports news", "football", "basketball", "soccer", "tennis", "golf", "athletics", "championship", "coaching"],
      "Sustainability & Environment": ["sustainability", "eco-friendly", "green living", "renewable energy", "climate change", "conservation", "recycling", "carbon footprint", "organic farming"],
      "Science & Research": ["scientific research", "laboratory", "physics", "chemistry", "biology", "space exploration", "astronomy", "quantum", "academic papers"],
      "Arts & Crafts": ["diy crafts", "painting", "drawing", "knitting", "woodworking crafts", "sculpture", "sketching", "handmade", "creative hobby", "woodworking"],
      "Luxury & Lifestyle": ["luxury lifestyle", "elite travel", "gourmet dining", "fine jewelry", "premium brands", "exclusive club", "high fashion", "lifestyle"]
    };

    for (const [niche, keywords] of Object.entries(nicheKeywords)) {
      for (const kw of keywords) {
        if (descLower.includes(kw)) {
          matches.push(niche);
          break; // Stop at first keyword match for this niche
        }
      }
    }
  }

  // TLD and extension-based helper detection
  if (cleanDomain.endsWith(".ai")) {
    matches.push("AI & Machine Learning", "Technology");
  }
  if (cleanDomain.endsWith(".tech")) {
    matches.push("Technology");
  }
  if (cleanDomain.endsWith(".app") || cleanDomain.endsWith(".io")) {
    matches.push("SaaS & Software", "Technology");
  }
  if (cleanDomain.endsWith(".store") || cleanDomain.endsWith(".shop") || cleanDomain.endsWith(".shopping")) {
    matches.push("E-commerce");
  }
  if (cleanDomain.endsWith(".edu")) {
    matches.push("Education & E-Learning");
  }
  if (cleanDomain.endsWith(".law") || cleanDomain.endsWith(".legal")) {
    matches.push("Law & Legal Services");
  }
  if (cleanDomain.endsWith(".org")) {
    matches.push("Science & Research", "Sustainability & Environment");
  }

  // General publication/news platforms indicator - covers multiple niches (Business, Technology, Finance, Health, Lifestyle)
  const hasGeneralIndicator = ["times", "news", "daily", "magazine", "journal", "blog", "press", "gazette", "review", "report", "hub", "world", "global", "portal", "weekly", "post", "bulletin", "chronicle", "herald", "tribune", "online", "today", "express", "media", "forum", "mag", "publishing", "pub", "buzz", "voice", "opinion", "digest", "observer", "inquirer", "advocate", "dispatch", "chronicles"].some(word => target.includes(word));

  // Note: hasGeneralIndicator will be evaluated at the end of the matching rules as a fallback to avoid false positives on specific domains.

  // Helper regex tests to prevent false substring matches (e.g. "vbtcafe" containing "btc", "html" containing "ml")
  const testSub = (sub: string, excludes: string[] = []) => {
    if (!target.includes(sub)) return false;
    if (excludes.some(ex => target.includes(ex))) return false;
    return true;
  };

  // Predefine safe word tests to avoid severe false substring collisions
  const hasApi = testSub("api", ["therapy", "theory", "rapid", "capital", "capita", "escape", "shaping", "tapping", "napier", "apiary", "apis", "maple", "papillons"]);
  const hasBot = testSub("bot", ["both", "bother", "bottle", "bottom", "sabotage", "button"]);
  const hasSem = testSub("sem", ["resemble", "semester", "ensemble", "semicolon", "search"]);
  const hasSite = testSub("site", ["opposite", "composite", "exquisite", "parasite", "requisite"]);
  const hasCoin = testSub("coin", ["coincidence", "coinage"]);
  const hasFirm = testSub("firm", ["confirm", "affirm", "firmware"]);
  const hasCondo = testSub("condo", ["condor"]);
  const hasCase = testSub("case", ["showcase", "briefcase", "staircase", "casein"]);
  const hasGrade = testSub("grade", ["upgrade", "downgrade", "ingredient"]);
  const hasCart = testSub("cart", ["cartoon", "cartography", "carter"]);
  const hasWear = testSub("wear", ["software", "hardware", "firmware", "spyware", "malware", "shareware", "everywhere", "weary", "middleware", "anywhere", "nowhere", "somewhere"]);
  const hasBoot = testSub("boot", ["bootstrap", "reboot", "bootcamp"]);
  const hasTrain = testSub("train", ["strain", "constrain", "restrain", "training"]);
  const hasMap = testSub("map", ["bitmap", "roadmap", "sitemap"]);
  const hasPlay = testSub("play", ["display"]);
  const hasFace = testSub("face", ["interface", "typeface", "boldface", "deface", "surface"]);
  const hasPic = testSub("pic", ["epic", "topic", "tropical", "atypical", "spicy", "conspicuous", "suspicious", "pelt", "depict"]);
  const hasTune = testSub("tune", ["fortune", "opportunity"]);
  const hasCar = testSub("car", ["career", "careful", "care", "cargo", "cart", "scary", "card", "cardiac", "carbohydrate", "carpet", "cartoon"]);
  const hasBall = testSub("ball", ["balloon", "ballot", "ballad"]);

  // 1. SaaS & Software
  // "app" should exclude common non-app words like "happy", "snappy", "apply", "appeal", "lapping"
  const hasApp = testSub("app", ["happy", "snappy", "apply", "appeal", "lapping"]);
  if (target.includes("saas") || target.includes("software") || hasApp || target.includes("tool") || target.includes("stack") || target.includes("platform") || target.includes("cloud") || target.includes("system") || hasApi || target.includes("crm") || target.includes("erp") || target.includes("dashboard") || target.includes("automation") || target.includes("integration") || target.includes("suite") || target.includes("workflow")) {
    matches.push("SaaS & Software");
  }

  // 2. AI & Machine Learning
  // "ai" is a massive false-positive in words like main, brain, daily, etc. Ensure it only matches as a safe segment or distinct ai word
  const hasAi = (target.startsWith("ai") && !["aid", "aim", "air", "aisle"].some(w => target.startsWith(w))) || 
                target.endsWith("ai") || 
                target.includes("-ai-") || target.includes("-ai") || target.includes("ai-") ||
                ["aitool", "aiwriter", "aibot", "aichat", "aitech", "chatai", "writerai", "toolai", "bestai", "easyai"].some(w => target.includes(w)) ||
                (/(^|[-_0-9])ai([-_0-9]|$)/.test(target));
                
  const hasMl = (/(^|[-_0-9])ml([-_0-9]|$)/.test(target)) || ["machinelearning", "mlops", "mlmodel"].some(w => target.includes(w));

  if (hasAi || hasMl || target.includes("neural") || target.includes("gpt") || target.includes("intelligence") || target.includes("robot") || hasBot || target.includes("deeplearn") || target.includes("cognitive") || target.includes("prompt") || target.includes("artificial") || target.includes("algorithm") || target.includes("openai") || target.includes("gemini") || target.includes("claude") || target.includes("copilot")) {
    matches.push("AI & Machine Learning");
  }

  // 3. Cybersecurity
  if (target.includes("cyber") || target.includes("security") || target.includes("shield") || target.includes("hack") || target.includes("protect") || target.includes("firewall") || target.includes("secure") || target.includes("privacy") || target.includes("vpn") || target.includes("malware") || target.includes("encryption") || target.includes("vault") || target.includes("defend")) {
    matches.push("Cybersecurity");
  }

  // 4. Digital Marketing
  // "ad" gets caught in shadow, download, upload, reader, etc.
  // "pr" gets caught in enterprise, press, wordpress, spring.
  const hasAd = (/(^|[-_0-9])ads?([-_0-9]|$)/.test(target)) || ["adwords", "adtech", "adspy", "advertising", "advertisement", "marketing", "promo"].some(w => target.includes(w));
  const hasPr = (/(^|[-_0-9])pr([-_0-9]|$)/.test(target)) || ["publicrelations", "pressrelease", "prnews", "pr-"].some(w => target.includes(w));
  
  if (target.includes("seo") || hasAd || target.includes("brand") || target.includes("social") || target.includes("traffic") || target.includes("click") || target.includes("lead") || target.includes("funnel") || hasPr || target.includes("agency") || hasSem || target.includes("content") || target.includes("campaign") || target.includes("growth") || target.includes("optimize") || target.includes("outreach") || target.includes("advertise")) {
    matches.push("Digital Marketing");
  }

  // 5. SEO & Web Development
  // "wp" is fine but we restrict false positives
  const hasWp = testSub("wp", ["howpost"]);
  const hasDesign = testSub("design", ["interior", "fashion", "home", "garden", "landscape", "decor", "architect", "dreamland"]);
  if (target.includes("web") || hasDesign || target.includes("css") || target.includes("html") || target.includes("react") || target.includes("node") || target.includes("wordpress") || hasWp || target.includes("hosting") || target.includes("code") || target.includes("dev") || target.includes("programmer") || target.includes("coder") || hasSite || target.includes("page") || target.includes("frontend") || target.includes("backend") || target.includes("javascript") || target.includes("python") || target.includes("typescript") || target.includes("server") || target.includes("domain")) {
    matches.push("SEO & Web Development");
  }

  // 6. Finance & Investing
  // "tax" gets caught in syntax, taxonomy, taxi
  const hasTax = testSub("tax", ["syntax", "taxonomy", "taxi"]);
  if (target.includes("finance") || target.includes("money") || target.includes("invest") || target.includes("capital") || target.includes("bank") || target.includes("wealth") || target.includes("stock") || target.includes("fund") || target.includes("equity") || hasTax || target.includes("advisor") || target.includes("pay") || target.includes("cash") || target.includes("save") || target.includes("credit") || target.includes("loan") || target.includes("mortgage") || target.includes("debt") || target.includes("budget") || target.includes("broker") || target.includes("accounting")) {
    matches.push("Finance & Investing");
  }

  // 7. Crypto & Blockchain
  // "btc" overlaps heavily with substrings like "vbtcafe" (v-btc-afe), "subtcloud" (su-btc-loud), "debtcalculator"
  const hasBtc = (/(^|[-_0-9])btc([-_0-9]|$)/.test(target)) || ["vbtc", "btcnews", "btcpay", "playbtc"].some(w => target.includes(w));
  // "eth" overlaps with methods, ethics, teeth, feather, something, standard health/wealth
  const hasEth = (/(^|[-_0-9])eth([-_0-9]|$)/.test(target)) || ["ethereum", "etherscan", "ether", "ethpay"].some(w => target.includes(w));
  // "nft" can overlap with generic non-crypto words
  const hasNft = (/(^|[-_0-9])nft([-_0-9]|$)/.test(target)) || target.includes("nfts");

  if (target.includes("crypto") || target.includes("blockchain") || hasCoin || target.includes("token") || target.includes("bitcoin") || hasEth || hasBtc || hasNft || target.includes("wallet") || target.includes("defi") || target.includes("solana") || target.includes("ledger") || target.includes("mining") || target.includes("web3")) {
    matches.push("Crypto & Blockchain");
  }

  // 8. Business & Startups
  // "inc" gets caught in include, increase, since, sincere, principle, zinc
  const hasInc = testSub("inc", ["include", "increase", "sincere", "since", "principle", "zinc", "province", "incentive", "incidence"]);
  if (target.includes("biz") || target.includes("business") || target.includes("startup") || target.includes("venture") || target.includes("corp") || hasFirm || target.includes("leader") || target.includes("manage") || target.includes("enterp") || target.includes("founder") || target.includes("b2b") || target.includes("b2c") || target.includes("industry") || target.includes("industrial") || target.includes("trade") || target.includes("trading") || target.includes("office") || target.includes("workplace") || target.includes("workspace") || target.includes("strategy") || target.includes("strategic") || target.includes("consult") || target.includes("executive") || target.includes("logistics") || target.includes("partner") || hasInc || target.includes("llc") || target.includes("sales") || target.includes("revenue") || target.includes("profit") || target.includes("audit") || target.includes("company") || target.includes("corporate") || target.includes("enterprise") || target.includes("b2btimes")) {
    matches.push("Business & Startups");
  }

  // 9. Real Estate
  const hasLand = (/(^|[-_0-9])lands?([-_0-9]|$)/.test(target)) || 
                  ["landfor", "landbuy", "landdeal", "landwatch", "landfarm", "landflip", "buyland", "landinvest", "sellland"].some(w => target.includes(w)) ||
                  (target.startsWith("land") && !["landscape", "landscaping"].some(ex => target.includes(ex)));

  const hasRent = (/(^|[-_0-9])rents?([-_0-9]|$)/.test(target)) || 
                  ["rentals", "renting", "rentalcars", "buyorrent", "rentflat", "rentroom", "apartmentrent", "houserent"].some(w => target.includes(w)) ||
                  (target.startsWith("rent") && !["rentry", "rentrant"].some(ex => target.includes(ex)));

  if (target.includes("estate") || target.includes("property") || target.includes("realtor") || hasCondo || target.includes("apartment") || hasLand || hasRent || target.includes("leasing") || target.includes("housing") || target.includes("building") || target.includes("mansion") || target.includes("villa") || target.includes("residence") || target.includes("brokerage")) {
    matches.push("Real Estate");
  }

  // 10. Law & Legal Services
  // "law" can end up in flaw, claw, lawn, flawless, bylaw
  const hasLaw = testSub("law", ["flaw", "claw", "lawn", "bylaw", "flawless"]);
  if (hasLaw || target.includes("legal") || target.includes("court") || target.includes("attorney") || target.includes("lawyer") || target.includes("justice") || target.includes("counsel") || target.includes("solicitor") || hasCase || target.includes("suit") || target.includes("jury") || target.includes("testimony") || target.includes("comply") || target.includes("compliance") || target.includes("patent") || target.includes("contract")) {
    matches.push("Law & Legal Services");
  }

  // 11. Education & E-Learning
  // "edu" gets caught in procedure, scheduled, reduced
  const hasEdu = (/(^|[-_0-9])edu([-_0-9]|$)/.test(target)) || target.endsWith(".edu") || ["e-learning", "elearning", "education", "educational"].some(w => target.includes(w));
  // "book" gets caught in "booking" which is Travel/Tourism
  const hasBook = testSub("book", ["booking"]);

  if (hasEdu || target.includes("learn") || target.includes("school") || target.includes("course") || target.includes("academy") || target.includes("teach") || target.includes("study") || target.includes("university") || hasBook || target.includes("college") || target.includes("tutor") || target.includes("lecture") || target.includes("class") || target.includes("lesson") || hasGrade || target.includes("exam") || target.includes("curriculum") || target.includes("scholar")) {
    matches.push("Education & E-Learning");
  }

  // 12. E-commerce
  // "deal" gets caught in ideal
  const hasDeal = testSub("deal", ["ideal"]);
  if (target.includes("shop") || target.includes("store") || target.includes("commerce") || hasDeal || hasCart || target.includes("retail") || target.includes("buy") || target.includes("sell") || target.includes("discount") || target.includes("checkout") || target.includes("sale") || target.includes("product") || target.includes("shipping") || target.includes("order") || target.includes("coupon") || target.includes("delivery") || target.includes("marketplace")) {
    matches.push("E-commerce");
  }

  // 13. Home & Garden
  const hasHomeDesign = target.includes("design") && ["home", "garden", "decor", "interior", "house", "mansion", "yard", "living", "landscape", "dreamland", "architect"].some(w => target.includes(w));
  const hasHome = testSub("home", ["homebusiness", "home-business", "homeoffice", "home-office"]);
  const hasHouse = testSub("house", ["warehouse"]);
  if (target.includes("garden") || target.includes("decor") || target.includes("furniture") || target.includes("yard") || target.includes("lawn") || target.includes("interior") || target.includes("living") || target.includes("patio") || target.includes("plant") || target.includes("flower") || hasHouse || hasHome || target.includes("backyard") || target.includes("bedroom") || target.includes("sofa") || target.includes("couch") || target.includes("rug") || target.includes("landscaping") || target.includes("renovation") || hasHomeDesign || target.includes("dreamland") || target.includes("dreamlands")) {
    matches.push("Home & Garden");
  }

  // 14. Fashion & Style
  if (target.includes("fashion") || target.includes("style") || hasWear || target.includes("cloth") || target.includes("outfit") || target.includes("dress") || target.includes("trend") || target.includes("vogue") || target.includes("apparel") || target.includes("jewelry") || target.includes("watch") || target.includes("shoe") || hasBoot || target.includes("sneaker") || target.includes("bag") || target.includes("purse") || target.includes("clothing") || target.includes("boutique")) {
    matches.push("Fashion & Style");
  }

  // 15. Medicine & Nutrition
  // "med" gets caught in media, medium, remedy, immediate
  const hasMed = testSub("med", ["media", "medium", "remedy", "immediate"]);
  if (target.includes("medicine") || target.includes("nutri") || target.includes("diet") || target.includes("doctor") || target.includes("pharma") || target.includes("clinical") || target.includes("hospital") || target.includes("supplement") || target.includes("vitamin") || hasMed || target.includes("physician") || target.includes("drug") || target.includes("prescription") || target.includes("nutritionist") || target.includes("mealplan")) {
    matches.push("Medicine & Nutrition");
  }

  // 16. Mental Health
  if (target.includes("mental") || target.includes("psycho") || target.includes("therapy") || target.includes("mindfulness") || target.includes("brain") || target.includes("stress") || target.includes("calm") || target.includes("anxiety") || target.includes("therapist") || target.includes("meditation") || target.includes("depression") || target.includes("counseling") || target.includes("peace") || target.includes("zen")) {
    matches.push("Mental Health");
  }

  // 17. Fitness & Exercise
  if (target.includes("exercise") || target.includes("yogi") || target.includes("yoga") || target.includes("gym") || target.includes("workout") || target.includes("lift") || hasTrain || target.includes("muscle") || target.includes("cardio") || target.includes("bodybuilding") || target.includes("runner") || target.includes("aerobic") || target.includes("pilates") || target.includes("strength") || target.includes("run") || target.includes("swim") || target.includes("cycle")) {
    matches.push("Fitness & Exercise");
  }

  // 18. Health & Wellness
  // "fit" gets caught in profit, benefit, outfits
  const hasFit = testSub("fit", ["profit", "benefit", "outfit"]);
  if (target.includes("health") || target.includes("well") || target.includes("life") || hasFit || target.includes("care") || target.includes("clinic") || target.includes("heal") || target.includes("mind") || target.includes("body") || target.includes("spa") || target.includes("wellness") || target.includes("vitality") || target.includes("organic") || target.includes("natural")) {
    matches.push("Health & Wellness");
  }

  // 19. Travel & Tourism
  if (target.includes("travel") || target.includes("trip") || target.includes("wander") || target.includes("tour") || target.includes("dest") || target.includes("explore") || target.includes("hotel") || target.includes("flight") || hasMap || target.includes("voyage") || target.includes("beach") || target.includes("resort") || target.includes("cruise") || target.includes("vacation") || target.includes("booking") || target.includes("guide") || target.includes("adventure")) {
    matches.push("Travel & Tourism");
  }

  // 20. Gaming & Esports
  if (target.includes("game") || hasPlay || target.includes("xbox") || target.includes("playstation") || target.includes("nintendo") || target.includes("steam") || target.includes("gamer") || target.includes("arcade") || target.includes("match") || target.includes("console") || target.includes("controller") || target.includes("multiplayer") || target.includes("esports") || target.includes("minecraft")) {
    matches.push("Gaming & Esports");
  }

  // 21. Beauty & Skincare
  if (target.includes("beauty") || target.includes("skin") || target.includes("makeup") || target.includes("cosmetic") || target.includes("hair") || target.includes("glow") || target.includes("nail") || target.includes("salon") || target.includes("perfume") || hasFace || target.includes("serum") || target.includes("moisturizer") || target.includes("shampoo")) {
    matches.push("Beauty & Skincare");
  }

  // 22. Photography & Videography
  if (target.includes("photo") || target.includes("video") || target.includes("cam") || target.includes("lens") || target.includes("shutter") || target.includes("film") || target.includes("shoot") || hasPic || target.includes("camera") || target.includes("aperture") || target.includes("cinematography") || target.includes("vlog") || target.includes("drone")) {
    matches.push("Photography & Videography");
  }

  // 23. Music & Audio
  if (target.includes("music") || target.includes("audio") || target.includes("sound") || target.includes("song") || hasTune || target.includes("studio") || target.includes("mic") || target.includes("beat") || target.includes("podcast") || target.includes("vibe") || target.includes("band") || target.includes("singer") || target.includes("track") || target.includes("playlist") || target.includes("headphone") || target.includes("speaker") || target.includes("melody")) {
    matches.push("Music & Audio");
  }

  // 24. Food & Recipes
  // "eat" is caught in great, creative, feature, repeat, sweat, heater, etc.
  const hasEat = testSub("eat", ["great", "creative", "feature", "repeat", "defeat", "sweat", "wheat", "heater", "theatre", "recreation", "neat", "threat", "weather"]);
  // "cafe" doesn't mean food/recipe if paired with computer terms or if it is the vbtcafe.com site
  const hasCafe = target.includes("cafe") && !["vbtcafe"].some(ex => target.includes(ex));

  if (target.includes("food") || target.includes("recipe") || target.includes("cook") || target.includes("kitchen") || hasEat || target.includes("bake") || target.includes("chef") || target.includes("taste") || target.includes("dish") || target.includes("meal") || target.includes("cooking") || target.includes("restaurant") || hasCafe || target.includes("gourmet")) {
    matches.push("Food & Recipes");
  }

  // 25. Parenting & Family
  // "kid" gets caught in kidney, skid, kidnap
  const hasKid = testSub("kid", ["kidney", "skid", "kidnap"]);
  // "mom" gets caught in moment, momentum
  const hasMom = testSub("mom", ["moment", "momentum"]);

  if (target.includes("parent") || target.includes("family") || hasMom || target.includes("dad") || hasKid || target.includes("baby") || target.includes("child") || target.includes("toddler") || target.includes("mother") || target.includes("father") || target.includes("maternity") || target.includes("pregnancy") || target.includes("pediatric")) {
    matches.push("Parenting & Family");
  }

  // 26. Pets & Animals
  // "pet" gets caught in competition, carpet, appetizer, repetitive, puppet
  const hasPet = testSub("pet", ["competition", "carpet", "appetizer", "repetitive", "puppet", "peter"]);
  // "vet" gets caught in veteran, velvet
  const hasVet = testSub("vet", ["veteran", "velvet"]);
  // "cat" gets caught in category, catalog
  const hasCat = testSub("cat", ["category", "catalog"]);

  if (hasPet || target.includes("dog") || hasCat || target.includes("animal") || hasVet || target.includes("puppy") || target.includes("kitten") || target.includes("bird") || target.includes("fish") || target.includes("paws") || target.includes("veterinary") || target.includes("hamster") || target.includes("wildlife")) {
    matches.push("Pets & Animals");
  }

  // 27. Automotive & Vehicles
  if (hasCar || target.includes("auto") || target.includes("vehicle") || target.includes("drive") || target.includes("motor") || target.includes("engine") || target.includes("wheel") || target.includes("mechanic") || target.includes("tire") || target.includes("truck") || target.includes("garage") || target.includes("motorcycle") || target.includes("hybrid") || target.includes("tesla")) {
    matches.push("Automotive & Vehicles");
  }

  // 28. Sports & Athletics
  if (target.includes("sport") || target.includes("athletic") || hasBall || target.includes("team") || target.includes("coach") || target.includes("football") || target.includes("soccer") || target.includes("basketball") || target.includes("tennis") || target.includes("esport") || target.includes("stadium") || target.includes("championship") || target.includes("golf") || target.includes("baseball")) {
    matches.push("Sports & Athletics");
  }

  // 29. Sustainability & Environment
  if (target.includes("green") || target.includes("eco") || target.includes("earth") || target.includes("climate") || target.includes("sustainable") || target.includes("renew") || target.includes("nature") || target.includes("solar") || target.includes("recycle") || target.includes("carbon") || target.includes("environment") || target.includes("conservation") || target.includes("biodiversity") || target.includes("energy")) {
    matches.push("Sustainability & Environment");
  }

  // 30. Science & Research
  // "lab" gets caught in collaboration, label, labor
  const hasLab = testSub("lab", ["collaboration", "label", "labor"]);
  // "bio" gets caught in biography, symbiosis
  const hasBio = testSub("bio", ["biography", "symbiosis"]);

  if (target.includes("science") || target.includes("research") || hasLab || target.includes("physics") || target.includes("chem") || hasBio || target.includes("space") || target.includes("galaxy") || target.includes("astronomy") || target.includes("scientific") || target.includes("experiment") || target.includes("theory") || target.includes("analysis") || target.includes("quantum")) {
    matches.push("Science & Research");
  }

  // 31. Arts & Crafts
  // "art" gets caught in start, part, smart, partner, department, earthquake, chart, particular
  const hasArt = testSub("art", ["start", "part", "smart", "partner", "department", "earthquake", "chart", "particular"]);

  if (hasArt || target.includes("craft") || target.includes("paint") || target.includes("draw") || target.includes("diy") || target.includes("creative") || target.includes("sculpt") || target.includes("knit") || target.includes("crafting") || target.includes("designing") || target.includes("artist") || target.includes("museum") || target.includes("gallery") || target.includes("sketch")) {
    matches.push("Arts & Crafts");
  }

  // 32. Luxury & Lifestyle
  if (target.includes("luxury") || target.includes("lifestyle") || target.includes("gold") || target.includes("elite") || target.includes("rich") || target.includes("class") || target.includes("glam") || target.includes("fancy") || target.includes("jewelry") || target.includes("wealthy") || target.includes("resort") || target.includes("vip") || target.includes("exclusive") || target.includes("premium")) {
    matches.push("Luxury & Lifestyle");
  }

  // 33. Technology
  if (target.includes("tech") || target.includes("gadget") || target.includes("device") || target.includes("gear") || target.includes("hardware") || target.includes("pixel") || target.includes("circuit") || target.includes("digital") || target.includes("computer") || target.includes("network") || target.includes("cellular") || target.includes("telecom") || target.includes("future") || target.includes("smart") || target.includes("gizmo")) {
    matches.push("Technology");
  }

  if (matches.length > 0) {
    return Array.from(new Set(matches)).join(", ");
  }

  return "Technology"; // Fallback default
};

interface RecentSearch {
  id: string;
  query: string;
  niche: string;
  minDa: number;
  minDr: number;
  minTraffic: number;
  maxPrice: number;
  onlyLinkInsertion: boolean;
  timestamp: number;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  
  // Database States
  const [sites, setSites] = useState<Site[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [files, setFiles] = useState<OrderFile[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  
  // UI Loading States
  const [loadingDb, setLoadingDb] = useState(true);
  const [toastMessage, setToastMessage] = useState<{ msg: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [impersonatingAdmin, setImpersonatingAdmin] = useState<User | null>(null);
  
  // Selected site for purchase
  const [buyingSite, setBuyingSite] = useState<Site | null>(null);
  const [targetUrl, setTargetUrl] = useState('');
  const [anchorText, setAnchorText] = useState('');
  const [whoWrites, setWhoWrites] = useState<'advertiser' | 'publisher'>('advertiser');
  const [placementType, setPlacementType] = useState<'Guest Post' | 'Link Insertion'>('Guest Post');
  const [placementNotes, setPlacementNotes] = useState('');
  const [uploadContentText, setUploadContentText] = useState('');
  const [activeChatRoom, setActiveChatRoom] = useState<string | null>(null);

  // Publisher forms
  const [newDomain, setNewDomain] = useState('');
  const [newDa, setNewDa] = useState<number | ''>('');
  const [newDr, setNewDr] = useState<number | ''>('');
  const [newTraffic, setNewTraffic] = useState<number | ''>('');
  const [newNiche, setNewNiche] = useState('Technology');
  const [isNicheManuallySelected, setIsNicheManuallySelected] = useState(false);
  const [newPrice, setNewPrice] = useState<number | ''>('');
  const [newDesc, setNewDesc] = useState('');
  const [isFetchingMeta, setIsFetchingMeta] = useState(false);
  const [newAllowLinkInsertion, setNewAllowLinkInsertion] = useState(false);
  const [newLinkInsertionPrice, setNewLinkInsertionPrice] = useState(50);
  const [pubSiteFilter, setPubSiteFilter] = useState<'all' | 'approved' | 'pending' | 'rejected'>('all');
  const [newSitePublisherEmail, setNewSitePublisherEmail] = useState('');

  // Custom properties for admin onboard form
  const [newLifespan, setNewLifespan] = useState('Permanent');
  const [newSponsoredTag, setNewSponsoredTag] = useState(false);
  const [newHomepageFeature, setNewHomepageFeature] = useState(false);
  const [newSamplePost, setNewSamplePost] = useState('');
  const [newDofollow, setNewDofollow] = useState(true);

  // Bulk upload states
  const [bulkSitesMode, setBulkSitesMode] = useState<'single' | 'bulk'>('single');
  const [bulkUploadJson, setBulkUploadJson] = useState('');
  const [bulkUploadError, setBulkUploadError] = useState<string | null>(null);

  // Simulated Email & Rejection Notification states
  const [simulatedEmails, setSimulatedEmails] = useState<SimulatedEmail[]>(() => {
    try {
      const stored = localStorage.getItem('amp_simulated_emails');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (err) {
      console.error("Error reading simulated emails:", err);
    }
    // Return some sample/initial emails so the inbox isn't bare and represents typical platform onboarding
    return [
      {
        id: 'email_welcome',
        to: 'publisher@domain.com',
        from: 'editorial@authoritypro.net',
        subject: '🎉 Welcome to AuthorityPro Guild!',
        body: 'Dear Partner,\n\nWelcome to AuthorityPro Syndicate Portal!\n\nWe provide backlink sellers and digital media publishers with high-intent corporate guest-post and link insert order flows.\n\nYou can submit publication outlets in the "Publication Portfolio" tab. Kindly ensure you declare honest pricing, live sample posts, and clear link properties (such as dofollow/nofollow status).\n\nBest of luck,\nAuthorityPro Support Crew',
        timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
        read: true,
        type: 'system'
      }
    ];
  });

  const [adminRejectionTarget, setAdminRejectionTarget] = useState<{
    siteId: string;
    type: 'site_intake' | 'site_changes';
    domain: string;
    proposedPrice: number;
    publisherEmail: string;
  } | null>(null);

  const [rejectionReason, setRejectionReason] = useState<string>('Price is too high for the current metrics (DA/DR)');
  const [customRejectionText, setCustomRejectionText] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('amp_simulated_emails', JSON.stringify(simulatedEmails));
  }, [simulatedEmails]);

  // Compare feature state variables
  const [compareSiteIds, setCompareSiteIds] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // Publisher Profile & Verification state
  const [idStatus, setIdStatus] = useState<'unverified' | 'pending' | 'verified'>('unverified');
  const [idNumber, setIdNumber] = useState('');
  const [idType, setIdType] = useState('Passport');
  const [idFileName, setIdFileName] = useState('');
  const [idFileSize, setIdFileSize] = useState('');
  const [verificationStep, setVerificationStep] = useState(0);
  const [verificationError, setVerificationError] = useState('');

  useEffect(() => {
    if (user) {
      setIdStatus((localStorage.getItem(`id_status_${user.email}`) as any) || 'unverified');
      setIdNumber(localStorage.getItem(`id_number_${user.email}`) || '');
      setIdType(localStorage.getItem(`id_type_${user.email}`) || 'Passport');
      setIdFileName(localStorage.getItem(`id_filename_${user.email}`) || '');
      setIdFileSize(localStorage.getItem(`id_filesize_${user.email}`) || '');
      setVerificationStep(0);
      setVerificationError('');
    }
  }, [user]);

  const handleSubmitVerification = (num: string, docType: string, fileName: string, fileSize?: string) => {
    if (!num.trim()) {
      setVerificationError("Document or ID number is required to submit verification request");
      return;
    }
    const emailKey = user?.email || 'guest';
    setIdStatus('pending');
    setIdNumber(num);
    setIdType(docType);
    setIdFileName(fileName || 'id_proof.jpg');
    setIdFileSize(fileSize || '1.8 MB');
    
    localStorage.setItem(`id_status_${emailKey}`, 'pending');
    localStorage.setItem(`id_number_${emailKey}`, num);
    localStorage.setItem(`id_type_${emailKey}`, docType);
    localStorage.setItem(`id_filename_${emailKey}`, fileName || 'id_proof.jpg');
    localStorage.setItem(`id_filesize_${emailKey}`, fileSize || '1.8 MB');
    
    showToast('Identity verification files uploaded. Status updated to pending review!', 'info');
  };

  const handleSimulateIdApprove = (status: 'verified' | 'unverified') => {
    const emailKey = user?.email || 'guest';
    setIdStatus(status);
    localStorage.setItem(`id_status_${emailKey}`, status);
    if (status === 'unverified') {
      setIdNumber('');
      setIdFileName('');
      setIdFileSize('');
      localStorage.removeItem(`id_number_${emailKey}`);
      localStorage.removeItem(`id_filename_${emailKey}`);
      localStorage.removeItem(`id_filesize_${emailKey}`);
      showToast('ID verification status reset to unverified', 'info');
    } else {
      showToast('Simulated publisher ID successfully verified!', 'success');
    }
  };

  // Search, Filter & Sorting states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('All');
  const [sortBy, setSortBy] = useState('price-asc');
  const [orderFilterStatus, setOrderFilterStatus] = useState('all');
  const [filterMinDa, setFilterMinDa] = useState(0);
  const [filterMinDr, setFilterMinDr] = useState(0);
  const [filterMinTraffic, setFilterMinTraffic] = useState(0);
  const [filterMaxPrice, setFilterMaxPrice] = useState(1000);
  const [filterOnlyLinkInsertion, setFilterOnlyLinkInsertion] = useState(false);
  const [filterLifespan, setFilterLifespan] = useState('All'); // 'All' | 'Permanent' | '1 Year' | '2 Years'
  const [filterDofollow, setFilterDofollow] = useState('All'); // 'All' | 'Dofollow' | 'Nofollow'
  const [filterSponsored, setFilterSponsored] = useState('All'); // 'All' | 'Yes' | 'No'
  const [filterHomepage, setFilterHomepage] = useState('All'); // 'All' | 'Yes' | 'No'
  const [historySearchTerm, setHistorySearchTerm] = useState('');
  const [historySelectedNiche, setHistorySelectedNiche] = useState('All');

  // Recent Searches state and handlers for backlink research session persistence
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>(() => {
    try {
      const stored = localStorage.getItem('amp_recent_searches');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }
    // High-quality default structured searches to populate beautifully
    return [
      {
        id: 'rs_1',
        query: 'finance',
        niche: 'All',
        minDa: 0,
        minDr: 50,
        minTraffic: 0,
        maxPrice: 300,
        onlyLinkInsertion: false,
        timestamp: Date.now() - 1000 * 60 * 15
      },
      {
        id: 'rs_2',
        query: 'tech',
        niche: 'Technology',
        minDa: 40,
        minDr: 0,
        minTraffic: 10000,
        maxPrice: 500,
        onlyLinkInsertion: true,
        timestamp: Date.now() - 1000 * 60 * 120
      },
      {
        id: 'rs_3',
        query: 'wellness',
        niche: 'Health & Wellness',
        minDa: 30,
        minDr: 30,
        minTraffic: 5000,
        maxPrice: 200,
        onlyLinkInsertion: false,
        timestamp: Date.now() - 1000 * 60 * 1440
      }
    ];
  });

  const saveRecentSearch = (queryVal: string, nicheVal: string, daVal: number, drVal: number, trafficVal: number, priceVal: number, linkIVal: boolean) => {
    const term = queryVal.trim();
    // Allow saving empty query only if some other non-trivial parameter is changed
    const isDefault = term === '' && nicheVal === 'All' && daVal === 0 && drVal === 0 && trafficVal === 0 && priceVal === 1000 && !linkIVal;
    if (isDefault) return;

    const newSearch: RecentSearch = {
      id: 'rs_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      query: term,
      niche: nicheVal,
      minDa: daVal,
      minDr: drVal,
      minTraffic: trafficVal,
      maxPrice: priceVal,
      onlyLinkInsertion: linkIVal,
      timestamp: Date.now()
    };

    setRecentSearches((prev) => {
      const filtered = prev.filter(s => 
        s.query.toLowerCase() !== term.toLowerCase() ||
        s.niche !== nicheVal ||
        s.minDa !== daVal ||
        s.minDr !== drVal ||
        s.minTraffic !== trafficVal ||
        s.maxPrice !== priceVal ||
        s.onlyLinkInsertion !== linkIVal
      );
      const updated = [newSearch, ...filtered].slice(0, 6);
      localStorage.setItem('amp_recent_searches', JSON.stringify(updated));
      return updated;
    });
  };

  const removeRecentSearch = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches(prev => {
      const updated = prev.filter(item => item.id !== id);
      localStorage.setItem('amp_recent_searches', JSON.stringify(updated));
      return updated;
    });
  };

  const clearAllRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('amp_recent_searches');
    showToast('Recent searches history cleared', 'info');
  };

  const applyRecentSearch = (item: RecentSearch) => {
    setSearchQuery(item.query);
    setSelectedNiche(item.niche);
    setFilterMinDa(item.minDa);
    setFilterMinDr(item.minDr);
    setFilterMinTraffic(item.minTraffic);
    setFilterMaxPrice(item.maxPrice);
    setFilterOnlyLinkInsertion(item.onlyLinkInsertion);
    showToast(`Restored search context: ${item.query ? `"${item.query}"` : item.niche + ' filters'}`, 'info');
  };

  // Interactive transaction parameters in Purchase Form
  const [articleMinWords, setArticleMinWords] = useState(500);
  const [reqPreApproval, setReqPreApproval] = useState(false);

  // Publisher editable site management inline form/modal states
  const [editingSite, setEditingSite] = useState<Site | null>(null);
  const [editPrice, setEditPrice] = useState(0);
  const [editTraffic, setEditTraffic] = useState(0);
  const [editDesc, setEditDesc] = useState('');
  const [editAllowLinkInsertion, setEditAllowLinkInsertion] = useState(false);
  const [editLinkInsertionPrice, setEditLinkInsertionPrice] = useState(50);

  // Publisher detail viewer for advertiser draft text details
  const [viewingDraftOrder, setViewingDraftOrder] = useState<Order | null>(null);

  // Admin editing states for site updates
  const [adminEditingSite, setAdminEditingSite] = useState<Site | null>(null);
  const [adminEditPrice, setAdminEditPrice] = useState(0);
  const [adminEditDa, setAdminEditDa] = useState(0);
  const [adminEditDr, setAdminEditDr] = useState(0);

  // Admin Blog manager forms
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogSummary, setNewBlogSummary] = useState('');
  const [newBlogContent, setNewBlogContent] = useState('');

  // Selected Order for backlink scan reporting
  const [scanningOrder, setScanningOrder] = useState<Order | null>(null);

  // Admin user directory state & impersonation variables
  const [users, setUsers] = useState<User[]>([]);
  const [originalAdminUser, setOriginalAdminUser] = useState<User | null>(null);
  const [newUserFormOpen, setNewUserFormOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<'publisher' | 'advertiser'>('publisher');
  const [newUserWallet, setNewUserWallet] = useState<number>(500);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [userDirectoryActiveDmEmail, setUserDirectoryActiveDmEmail] = useState<string | null>(null);
  const [userDirectoryInlineMsgText, setUserDirectoryInlineMsgText] = useState('');

  // Admin Settings Fields
  const [settingsPaypal, setSettingsPaypal] = useState('');
  const [settingsAdminEmail, setSettingsAdminEmail] = useState('');
  const [settingsWebhookUrl, setSettingsWebhookUrl] = useState('');
  const [settingsEmailActive, setSettingsEmailActive] = useState(true);
  const [settingsChatActive, setSettingsChatActive] = useState(false);
  const [settingsAdminPassword, setSettingsAdminPassword] = useState('');

  // Security OTP validation states
  const [settingsOtpCode, setSettingsOtpCode] = useState<string | null>(null);
  const [pendingSettings, setPendingSettings] = useState<AdminSettings | null>(null);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [userEnteredOtp, setUserEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState<string | null>(null);

  useEffect(() => {
    if (settings) {
      setSettingsPaypal(settings.ourPaypal || 'umesh.webbuzz@gmail.com');
      setSettingsAdminEmail(settings.adminEmail || 'authorityplacement@gmail.com');
      setSettingsWebhookUrl(settings.googleChatWebhookUrl || '');
      setSettingsEmailActive(settings.emailNotificationsActive ?? true);
      setSettingsChatActive(settings.googleChatNotificationsActive ?? false);
      setSettingsAdminPassword(settings.adminPassword || 'placement2026');
    }
  }, [settings]);

  // Load database from API
  useEffect(() => {
    fetchDb();
  }, []);

  const fetchDb = async () => {
    setLoadingDb(true);
    try {
      const resp = await fetch('/api/db');
      const data = await resp.json();
      setSites(data.sites || []);
      setOrders(data.orders || []);
      setChats(data.chats || []);
      setSettings(data.settings || null);
      setFiles(data.files || []);
      setBlogs(data.blogs || []);
      
      const fetchedUsers = data.users || [];
      if (fetchedUsers.length === 0) {
        const defaultUsers: User[] = [
          { id: 'usr_pub_1', name: 'Global News Network', email: 'publisher@authorityplacement.com', role: 'publisher', wallet: 1250.00 },
          { id: 'usr_adv_1', name: 'Apex Media Group', email: 'advertiser@authorityplacement.com', role: 'advertiser', wallet: 500.00 }
        ];
        setUsers(defaultUsers);
        // Sync these to database
        const payload = {
          sites: data.sites || [],
          orders: data.orders || [],
          chats: data.chats || [],
          settings: data.settings || {
            ourPaypal: "umesh.webbuzz@gmail.com",
            adminEmail: "authorityplacement@gmail.com",
            googleChatWebhookUrl: "",
            emailNotificationsActive: true,
            googleChatNotificationsActive: false,
            adminPassword: "placement2026"
          },
          files: data.files || [],
          blogs: data.blogs || [],
          users: defaultUsers
        };
        await fetch('/api/db', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        setUsers(fetchedUsers);
      }
    } catch (err) {
      console.error('Error fetching database:', err);
      showToast('Error syncing with database server.', 'error');
    } finally {
      setLoadingDb(false);
    }
  };

  // Central trigger to update local state AND write to backend disk
  const updateDbOnServer = async (
    updatedSites: Site[],
    updatedOrders: Order[],
    updatedChats: ChatMessage[],
    updatedSettings: AdminSettings,
    updatedFiles: OrderFile[],
    updatedBlogs: BlogPost[],
    updatedUsers?: User[]
  ) => {
    try {
      const payload = {
        sites: updatedSites,
        orders: updatedOrders,
        chats: updatedChats,
        settings: updatedSettings,
        files: updatedFiles,
        blogs: updatedBlogs,
        users: updatedUsers !== undefined ? updatedUsers : users
      };
      
      const resp = await fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await resp.json();
      if (!data.success) {
        showToast('Local sync warning: disk storage delayed.', 'info');
      }
    } catch (e) {
      console.error('Failed to sync DB with server:', e);
    }
  };

  const showToast = (msg: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Advertiser Order Placements
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyingSite || !user) return;

    const price = placementType === 'Link Insertion'
      ? (buyingSite.linkInsertionPrice || 50)
      : (whoWrites === 'publisher' ? Math.round(buyingSite.price * 1.35) : buyingSite.price);

    if (user.wallet < price) {
      showToast('Insufficient wallet balance. Please add funds.', 'error');
      return;
    }

    const orderId = `ORD-00${orders.length + 1}`;
    const newOrder: Order = {
      id: orderId,
      site: buyingSite.domain,
      advertiser: user.email,
      publisher: buyingSite.publisher,
      amount: price,
      commission: price * 0.1,
      publisherEarning: price * 0.9,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      type: placementType === 'Link Insertion' ? 'Link Insertion' : 'Guest Post',
      targetUrl: targetUrl || `https://${buyingSite.domain}`,
      anchorText: anchorText || 'Premium Backlink Placement',
      whoWrites: placementType === 'Link Insertion' ? 'advertiser' : whoWrites,
      notes: `${placementNotes ? placementNotes + " | " : ""}${reqPreApproval ? "⚠️ PRE-PUB REVIEW REQUESTED" : "Direct Publication allowed"}${placementType === 'Link Insertion' ? " | 🔗 (EXISTING LINK INSERTION ORDER)" : ` | 📏 Min length: ${articleMinWords} words`}`,
      backlinkStatus: 'pending',
      backlinkLogs: JSON.stringify([])
    };

    // Deduct user wallet
    const updatedUser: User = { ...user, wallet: user.wallet - price };
    setUser(updatedUser);

    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);

    // Save uploaded draft script as an order attachment if text is written
    let updatedFiles = [...files];
    if (uploadContentText) {
      const orderFile: OrderFile = {
        id: `file_${Date.now()}`,
        orderId: orderId,
        name: `${buyingSite.domain}_Pitch_Brief.txt`,
        size: '12 KB',
        uploadedBy: user.email,
        uploadedByName: user.name,
        uploadedRole: user.role,
        timestamp: new Date().toISOString(),
        contentType: 'text/plain',
        content: uploadContentText
      };
      updatedFiles.push(orderFile);
      setFiles(updatedFiles);
    }

    // Save and sync
    if (settings) {
      await updateDbOnServer(sites, updatedOrders, chats, settings, updatedFiles, blogs);
    }

    setBuyingSite(null);
    setTargetUrl('');
    setAnchorText('');
    setPlacementNotes('');
    setUploadContentText('');
    
    showToast(`Order Placed Securely for ${buyingSite.domain}! Deducted $${price}.`, 'success');
    setActiveTab('orders');
  };

  // Messenger message Dispatcher
  const handleSendMessage = async (room: string, text: string) => {
    if (!user || !settings) return;

    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      room,
      senderId: user.email,
      senderName: user.name,
      senderRole: user.role,
      text,
      timestamp: new Date().toISOString()
    };

    const updatedChats = [...chats, newMessage];
    setChats(updatedChats);

    await updateDbOnServer(sites, orders, updatedChats, settings, files, blogs);
  };

  const handleDomainChange = (domain: string) => {
    setNewDomain(domain);
    const domLower = domain.toLowerCase().trim();
    if (!domLower) {
      setNewDesc('');
      setIsNicheManuallySelected(false);
      return;
    }

    const guessedNiche = detectNicheFromDomain(domLower);

    if (!isNicheManuallySelected) {
      setNewNiche(guessedNiche);
      setNewDesc(`${domain.trim()} is an authoritative digital platform featuring curated premium articles, regular industry news, and high-impact resources on ${guessedNiche.toLowerCase()} trends.`);
    } else {
      setNewDesc(`${domain.trim()} is an authoritative digital platform featuring curated premium articles, regular industry news, and high-impact resources on ${newNiche.toLowerCase()} trends.`);
    }
  };

  const fetchDomainMetadata = async () => {
    const domTrimmed = newDomain.trim();
    if (!domTrimmed) return;
    setIsFetchingMeta(true);
    showToast(`Attempting to scrape real-time meta metadata for ${domTrimmed}...`, 'info');
    try {
      const response = await fetch(`/api/fetch-metadata?url=${encodeURIComponent(domTrimmed)}`);
      const data = await response.json();
      if (data.success) {
        if (data.description && data.description.trim()) {
          const fetchedDesc = data.description.trim();
          setNewDesc(fetchedDesc);
          
          // Auto-detect using both domain AND the fetched meta description
          const guessedNiche = detectNicheFromDomain(domTrimmed, fetchedDesc);
          setNewNiche(guessedNiche);
          setIsNicheManuallySelected(false);
          showToast(`Successfully extracted metadata! Detected category: ${guessedNiche}`, 'success');
        } else {
          // No description found
          const guessedNiche = detectNicheFromDomain(domTrimmed);
          setNewNiche(guessedNiche);
          showToast(`Site fetched successfully but no HTML meta description was found. Defaulted category to: ${guessedNiche}`, 'info');
        }
      } else {
        const guessedNiche = detectNicheFromDomain(domTrimmed);
        setNewNiche(guessedNiche);
        showToast(`Could not scrape live metadata (${data.error || 'Connection failed'}). Fallback category auto-detected as: ${guessedNiche}`, 'info');
      }
    } catch (err: any) {
      console.error("Error scraping domain metadata:", err);
      const guessedNiche = detectNicheFromDomain(domTrimmed);
      setNewNiche(guessedNiche);
      showToast(`Scraper error: ${err.message || 'Domain offline or blocked'}. Fallback category: ${guessedNiche}`, 'info');
    } finally {
      setIsFetchingMeta(false);
    }
  };

  const handleNicheChange = (niche: string) => {
    setNewNiche(niche);
    setIsNicheManuallySelected(true);
    if (newDomain.trim()) {
      setNewDesc(`${newDomain.trim()} is an authoritative digital platform featuring curated premium articles, regular industry news, and high-impact resources on ${niche.toLowerCase()} trends.`);
    }
  };

  const handleToggleNiche = (niche: string) => {
    setIsNicheManuallySelected(true);
    const list = newNiche ? newNiche.split(',').map(n => n.trim()).filter(Boolean) : [];
    let newList: string[];
    if (list.includes(niche)) {
      newList = list.filter(n => n !== niche);
      if (newList.length === 0) {
        newList = [niche]; // keep at least one
      }
    } else {
      newList = [...list, niche];
    }
    const merged = newList.join(', ');
    setNewNiche(merged);
    if (newDomain.trim()) {
      setNewDesc(`${newDomain.trim()} is an authoritative digital platform featuring curated premium articles, regular industry news, and high-impact resources on ${merged.toLowerCase()} trends.`);
    }
  };

  // Admin Add Publication Domain Site
  const handleAddSite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newDomain || !settings) return;
    
    if (user.role !== 'admin') {
      showToast('Access Denied: Only Platform Administrators are authorized to add or register publication outlets.', 'error');
      return;
    }

    const targetPublisherEmail = newSitePublisherEmail.trim() || user.email;
    const siteId = `${sites.length + 1}`;
    const newSite: Site = {
      id: siteId,
      domain: newDomain,
      da: newDa === '' ? 0 : Number(newDa),
      dr: newDr === '' ? 0 : Number(newDr),
      traffic: newTraffic === '' ? 0 : Number(newTraffic),
      niche: newNiche,
      price: newPrice === '' ? 0 : Number(newPrice),
      writingPrice: Math.round((newPrice === '' ? 0 : Number(newPrice)) * 1.5),
      status: 'approved',
      publisher: targetPublisherEmail,
      dofollow: newDofollow,
      turnaround: 5,
      sponsoredTag: newSponsoredTag,
      homepageFeature: newHomepageFeature,
      samplePost: newSamplePost.trim() || `https://${newDomain}/sample`,
      description: newDesc || `${newDomain} offers authoritative coverage of ${newNiche} insights.`,
      lifespan: newLifespan,
      allowLinkInsertion: newAllowLinkInsertion,
      linkInsertionPrice: newAllowLinkInsertion ? Number(newLinkInsertionPrice) : undefined
    };

    const updatedSites = [...sites, newSite];
    setSites(updatedSites);

    await updateDbOnServer(updatedSites, orders, chats, settings, files, blogs);

    setNewDomain('');
    setNewDa('');
    setNewDr('');
    setNewTraffic('');
    setNewPrice('');
    setNewDesc('');
    setNewAllowLinkInsertion(false);
    setNewLinkInsertionPrice(50);
    setNewSitePublisherEmail('');
    setNewLifespan('Permanent');
    setNewSponsoredTag(false);
    setNewHomepageFeature(false);
    setNewSamplePost('');
    setNewDofollow(true);
    setIsNicheManuallySelected(false);
    showToast(`Domain ${newDomain} registered successfully and added to active index!`, 'success');
  };

  // Admin Bulk Add Publication Sites via JSON
  const handleBulkSitesUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setBulkUploadError(null);
    if (!user || !settings) return;

    if (user.role !== 'admin') {
      showToast('Access Denied: Only Platform Administrators are authorized to bulk onboard outlets.', 'error');
      return;
    }

    if (!bulkUploadJson.trim()) {
      setBulkUploadError('JSON payload cannot be empty.');
      return;
    }

    try {
      const parsed = JSON.parse(bulkUploadJson);
      if (!Array.isArray(parsed)) {
        setBulkUploadError('JSON structure must be a flat array of publication sites (Objects). Please check your syntax tree.');
        return;
      }

      if (parsed.length === 0) {
        setBulkUploadError('The provided JSON array is empty. Please supply one or more site entries.');
        return;
      }

      const verifiedSites: Site[] = [];
      let nextIdIdx = sites.length + 1;

      for (let i = 0; i < parsed.length; i++) {
        const item = parsed[i];
        if (typeof item !== 'object' || item === null) {
          setBulkUploadError(`Item at position #${i + 1} is not a valid JSON Object.`);
          return;
        }

        const rawDomain = item.domain || item.site || item.url;
        if (!rawDomain || typeof rawDomain !== 'string' || !rawDomain.trim()) {
          setBulkUploadError(`Validation failed at Item #${i + 1}: "domain" (string) is required.`);
          return;
        }

        const domainVal = rawDomain.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0].toLowerCase().trim();

        let nicheVal = 'Technology';
        if (item.niche && typeof item.niche === 'string' && item.niche.trim()) {
          const items = item.niche.split(',').map((n: string) => n.trim()).filter(Boolean);
          const foundNiches: string[] = [];
          for (const itemNiche of items) {
            const found = AVAILABLE_NICHES.find(n => n.toLowerCase() === itemNiche.toLowerCase());
            if (found) {
              foundNiches.push(found);
            }
          }
          if (foundNiches.length > 0) {
            nicheVal = Array.from(new Set(foundNiches)).join(', ');
          } else {
            nicheVal = detectNicheFromDomain(domainVal, item.description || item.bio || item.about || '');
          }
        } else {
          nicheVal = detectNicheFromDomain(domainVal, item.description || item.bio || item.about || '');
        }

        const daVal = typeof item.da === 'number' ? item.da : 50;
        const drVal = typeof item.dr === 'number' ? item.dr : 50;
        const trafficVal = typeof item.traffic === 'number' ? item.traffic : 10000;
        const priceVal = typeof item.price === 'number' ? item.price : 150;
        const writingPriceVal = typeof item.writingPrice === 'number' ? item.writingPrice : Math.round(priceVal * 1.5);
        
        const publisherVal = item.publisher && typeof item.publisher === 'string' && item.publisher.trim() 
          ? item.publisher.trim() 
          : 'publisher@domain.com';

        const dofollowVal = typeof item.dofollow === 'boolean' ? item.dofollow : true;
        const sponsoredVal = typeof item.sponsoredTag === 'boolean' ? item.sponsoredTag : false;
        const homepageVal = typeof item.homepageFeature === 'boolean' ? item.homepageFeature : false;
        const allowLinkInsertionVal = typeof item.allowLinkInsertion === 'boolean' ? item.allowLinkInsertion : false;
        const linkInsertionPriceVal = typeof item.linkInsertionPrice === 'number' ? item.linkInsertionPrice : 50;

        const samplePostVal = item.samplePost && typeof item.samplePost === 'string' && item.samplePost.trim()
          ? item.samplePost.trim()
          : `https://${domainVal}/article-example`;

        const descVal = item.description && typeof item.description === 'string' && item.description.trim()
          ? item.description.trim()
          : `${domainVal} offers high DA guest posting outreach assets focusing heavily on ${nicheVal} topics.`;

        const turnaroundVal = typeof item.turnaround === 'number' ? item.turnaround : 5;
        const lifespanVal = item.lifespan && typeof item.lifespan === 'string' ? item.lifespan : 'Permanent';

        verifiedSites.push({
          id: `${nextIdIdx++}`,
          domain: domainVal,
          da: daVal,
          dr: drVal,
          traffic: trafficVal,
          niche: nicheVal,
          price: priceVal,
          writingPrice: writingPriceVal,
          status: 'approved',
          publisher: publisherVal,
          dofollow: dofollowVal,
          turnaround: turnaroundVal,
          sponsoredTag: sponsoredVal,
          homepageFeature: homepageVal,
          samplePost: samplePostVal,
          description: descVal,
          lifespan: lifespanVal,
          allowLinkInsertion: allowLinkInsertionVal,
          linkInsertionPrice: allowLinkInsertionVal ? linkInsertionPriceVal : undefined
        });
      }

      // Concat and update backend database
      const updatedSites = [...sites, ...verifiedSites];
      setSites(updatedSites);
      await updateDbOnServer(updatedSites, orders, chats, settings, files, blogs);

      setBulkUploadJson('');
      setBulkUploadError(null);
      showToast(`Successfully bulk imported and onboarded ${verifiedSites.length} websites to the marketplace!`, 'success');

    } catch (parseErr: any) {
      setBulkUploadError(`Standard JSON Parsing Exception: ${parseErr?.message || 'Invalid format'}`);
    }
  };

  // Publisher Update Live Link for completions
  const handlePublisherUpdateLiveLink = async (orderId: string, url: string) => {
    if (!settings || !url) return;

    const targetOrder = orders.find(o => o.id === orderId);
    if (!targetOrder) return;

    const updatedOrders = orders.map((o) => {
      if (o.id === orderId) {
        return { 
          ...o, 
          publishedUrl: url, 
          status: 'completed' as const,
          backlinkStatus: 'success' as const
        };
      }
      return o;
    });

    setOrders(updatedOrders);

    // Give payout funds to the publisher
    if (user && user.email === targetOrder.publisher) {
      const payoutAmount = targetOrder.publisherEarning || (targetOrder.amount * 0.9);
      setUser({
        ...user,
        wallet: user.wallet + payoutAmount
      });
      showToast(`Published live! Escrow payout of $${payoutAmount.toFixed(2)} disbursed to your publisher wallet!`, 'success');
    } else {
      showToast('Published Live Backlink updated successfully!', 'success');
    }

    await updateDbOnServer(sites, updatedOrders, chats, settings, files, blogs);
  };

  // Publisher rejects a pending placement order
  const handlePublisherRejectOrder = async (orderId: string) => {
    if (!settings) return;
    const ordToReject = orders.find(o => o.id === orderId);
    if (!ordToReject) return;

    const updatedOrders = orders.map(o => o.id === orderId ? { ...o, status: 'rejected' as const } : o);
    setOrders(updatedOrders);

    // Refund advertiser escrow if matched with logged in advertiser session
    if (user && user.email === ordToReject.advertiser) {
      setUser({ ...user, wallet: user.wallet + ordToReject.amount });
    }

    await updateDbOnServer(sites, updatedOrders, chats, settings, files, blogs);
    showToast(`Order ${orderId} rejected. Escrow balance ($${ordToReject.amount.toFixed(2)}) returned to the advertiser.`, 'info');
  };

  // Admin Rejection Email Sender Helper
  const sendSimulatedRejectionEmail = (
    publisherEmail: string,
    domain: string,
    rejectedPrice: number,
    feedbackReason: string,
    customFeedback: string,
    type: 'site_intake' | 'site_changes'
  ) => {
    const combinedReason = customFeedback.trim() 
      ? customFeedback.trim() 
      : feedbackReason;

    const emailSubject = type === 'site_intake' 
      ? `⚠️ Outlet Submission Price Rejected: ${domain}`
      : `⚠️ Proposed Price Update Rejected: ${domain}`;

    const emailBody = `Dear Publisher,

Our editorial administration team has audited your placement listing for https://${domain}.

We regret to inform you that your proposed pricing rate of $${rejectedPrice} has been REJECTED.

REASON FOR REJECTION: 
👉 "${combinedReason}"

To list your site successfully in active guest post indexes or maintain dynamic search views, please optimize your placement pricing fees so they are more aligned with current advertiser budgets. Balancing standard rates ensures continuous advertiser purchase flows.

You can modify your outlet details or submit a lower price easily via your Publication Portfolio.

Best regards,
Editorial Admin Team
AuthorityPro Syndicate Desk`;

    const newEmail: SimulatedEmail = {
      id: `email_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      to: publisherEmail,
      from: settings?.adminEmail || 'admin@authoritypro.com',
      subject: emailSubject,
      body: emailBody,
      timestamp: new Date().toISOString(),
      read: false,
      type: 'rejection',
      siteDomain: domain,
      proposedPrice: rejectedPrice
    };

    setSimulatedEmails(prev => [newEmail, ...prev]);
  };

  // Trigger open of rejection modal
  const triggerAdminRejectSiteModal = (id: string, type: 'site_intake' | 'site_changes') => {
    const site = sites.find(s => s.id === id);
    if (!site) return;
    const proposedPrice = type === 'site_changes' 
      ? (site.pendingChanges?.price ?? site.price) 
      : site.price;

    setAdminRejectionTarget({
      siteId: id,
      type,
      domain: site.domain,
      proposedPrice,
      publisherEmail: site.publisher
    });
    // Default reason fits "price too high"
    setRejectionReason('Proposed price is too high for current metrics (DA/DR)');
    setCustomRejectionText('');
  };

  const handleConfirmRejectionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminRejectionTarget || !settings) return;

    const { siteId, type, domain, proposedPrice, publisherEmail } = adminRejectionTarget;
    const combinedReason = customRejectionText.trim() ? customRejectionText.trim() : rejectionReason;

    let updatedSites: Site[] = [];

    if (type === 'site_intake') {
      updatedSites = sites.map(s => s.id === siteId ? { ...s, status: 'rejected' as const } : s);
    } else {
      updatedSites = sites.map(s => s.id === siteId ? { ...s, pendingChanges: undefined } : s);
    }

    setSites(updatedSites);
    sendSimulatedRejectionEmail(publisherEmail, domain, proposedPrice, rejectionReason, customRejectionText, type);

    await updateDbOnServer(updatedSites, orders, chats, settings, files, blogs);

    setAdminRejectionTarget(null);
    showToast(`Publication request rejected. Publisher (${publisherEmail}) notified via simulated email!`, 'success');
  };

  // Admin Actions: Approve Site
  const handleAdminApproveSite = async (id: string, status: 'approved' | 'rejected') => {
    if (!settings) return;

    if (status === 'rejected') {
      triggerAdminRejectSiteModal(id, 'site_intake');
      return;
    }

    const updatedSites = sites.map(s => s.id === id ? { ...s, status } : s);
    setSites(updatedSites);

    await updateDbOnServer(updatedSites, orders, chats, settings, files, blogs);
    showToast(`Publication request approved successfully!`, 'success');
  };

  // Admin Actions: Approve Pending Site Edits/Changes
  const handleAdminApproveSiteChanges = async (id: string) => {
    if (!settings) return;
    const updatedSites = sites.map(s => {
      if (s.id === id && s.pendingChanges) {
        return {
          ...s,
          price: s.pendingChanges.price ?? s.price,
          writingPrice: s.pendingChanges.writingPrice ?? s.writingPrice,
          traffic: s.pendingChanges.traffic ?? s.traffic,
          description: s.pendingChanges.description ?? s.description,
          allowLinkInsertion: s.pendingChanges.allowLinkInsertion ?? s.allowLinkInsertion,
          linkInsertionPrice: s.pendingChanges.linkInsertionPrice ?? s.linkInsertionPrice,
          pendingChanges: undefined
        };
      }
      return s;
    });
    setSites(updatedSites);
    await updateDbOnServer(updatedSites, orders, chats, settings, files, blogs);
    showToast('Publisher site changes approved and applied successfully!', 'success');
  };

  // Admin Actions: Reject Pending Site Edits/Changes
  const handleAdminRejectSiteChanges = async (id: string) => {
    triggerAdminRejectSiteModal(id, 'site_changes');
  };

  // Admin Actions: Delete Site Link
  const handleAdminDeleteSite = async (id: string) => {
    if (!settings) return;

    const updatedSites = sites.filter(s => s.id !== id);
    setSites(updatedSites);

    await updateDbOnServer(updatedSites, orders, chats, settings, files, blogs);
    showToast('Publication removed from directory.', 'info');
  };

  // Publisher save updated site settings
  const handleSavePublisherSite = async (siteId: string) => {
    if (!settings) return;
    let isPendingModeration = false;
    const updatedSites = sites.map(s => {
      if (s.id === siteId) {
        if (s.status === 'approved') {
          isPendingModeration = true;
          return {
            ...s,
            pendingChanges: {
              price: Number(editPrice),
              writingPrice: Math.round(Number(editPrice) * 1.5),
              traffic: Number(editTraffic),
              description: editDesc,
              allowLinkInsertion: editAllowLinkInsertion,
              linkInsertionPrice: editAllowLinkInsertion ? Number(editLinkInsertionPrice) : undefined
            }
          };
        } else {
          return {
            ...s,
            price: Number(editPrice),
            writingPrice: Math.round(Number(editPrice) * 1.5),
            traffic: Number(editTraffic),
            description: editDesc,
            allowLinkInsertion: editAllowLinkInsertion,
            linkInsertionPrice: editAllowLinkInsertion ? Number(editLinkInsertionPrice) : undefined
          };
        }
      }
      return s;
    });
    setSites(updatedSites);
    await updateDbOnServer(updatedSites, orders, chats, settings, files, blogs);
    setEditingSite(null);
    if (isPendingModeration) {
      showToast('Changes submitted! Since this site is active/approved, edits will show after Admin moderation.', 'info');
    } else {
      showToast('Publisher listing successfully updated!', 'success');
    }
  };

  // Admin save updated site settings
  const handleAdminSaveSite = async (siteId: string) => {
    if (!settings) return;
    const updatedSites = sites.map(s => {
      if (s.id === siteId) {
        return {
          ...s,
          price: Number(adminEditPrice),
          da: Number(adminEditDa),
          dr: Number(adminEditDr)
        };
      }
      return s;
    });
    setSites(updatedSites);
    await updateDbOnServer(updatedSites, orders, chats, settings, files, blogs);
    setAdminEditingSite(null);
    showToast('Site metrics/price successfully updated by Admin!', 'success');
  };

  // Admin action: Cancel/Refund Order
  const handleAdminCancelOrder = async (orderId: string) => {
    if (!settings) return;
    const ordToCancel = orders.find(o => o.id === orderId);
    if (!ordToCancel) return;

    // Set to rejected
    const updatedOrders = orders.map(o => o.id === orderId ? { ...o, status: 'rejected' as const } : o);
    setOrders(updatedOrders);

    // Refund advertiser
    if (user && user.email === ordToCancel.advertiser) {
      setUser({ ...user, wallet: user.wallet + ordToCancel.amount });
    }

    await updateDbOnServer(sites, updatedOrders, chats, settings, files, blogs);
    showToast(`Order ${orderId} cancelled & escrow refunded successfully!`, 'info');
  };

  // Admin action: Save Settings to database disk (with secure Verification Code authorization)
  const handleSaveSettings = async () => {
    if (!settings) return;
    const isPasswordChanging = settingsAdminPassword !== (settings.adminPassword || 'placement2026');

    const updatedSettings: AdminSettings = {
      ourPaypal: settingsPaypal,
      adminEmail: settingsAdminEmail,
      googleChatWebhookUrl: settingsWebhookUrl,
      emailNotificationsActive: settingsEmailActive,
      googleChatNotificationsActive: settingsChatActive,
      adminPassword: settingsAdminPassword,
    };

    if (isPasswordChanging) {
      // Generate 6-digit numeric verification code
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setSettingsOtpCode(generatedOtp);
      setPendingSettings(updatedSettings);
      setUserEnteredOtp('');
      setOtpError(null);
      setIsOtpModalOpen(true);

      // Construct a highly professional security audit email
      const securityEmail: SimulatedEmail = {
        id: `email_otp_${Date.now()}`,
        to: settingsAdminEmail || 'authorityplacement@gmail.com',
        from: 'security@authorityplacement.com',
        subject: '🛡️ SECURITY ALERT: Admin Password Change Verification Code',
        body: `Hello AuthorityPlacement Administrator,

We received a request to modify the Administrative security access password credential key for your account.

To authorize this security modification, please enter the following 6-digit verification code on the control console:

🔐 VERIFICATION SECURITY KEY: ${generatedOtp}

This code was dispatched to verify owner authenticity and prevent fraudulent or unauthorized access to platform databases. If you did not initiate this change, please immediately review your administrative configurations and security keys.

Best regards,
Security Audit Desk
AuthorityPlacement Syndicate Node`,
        timestamp: new Date().toISOString(),
        read: false,
        type: 'system'
      };

      setSimulatedEmails(prev => [securityEmail, ...prev]);
      showToast(`Security Verification Code dispatched to ${settingsAdminEmail || 'your administrative email'}!`, 'info');
    } else {
      // No security credentials changed, save directly
      setSettings(updatedSettings);
      await updateDbOnServer(sites, orders, chats, updatedSettings, files, blogs);
      showToast('Platform configuration saved to database successfully!', 'success');
    }
  };

  // Verify OTP and complete Settings save
  const handleVerifySaveSettingsOtp = async () => {
    if (!settingsOtpCode || !pendingSettings) return;
    setOtpError(null);

    if (userEnteredOtp.trim() === settingsOtpCode) {
      setSettings(pendingSettings);
      await updateDbOnServer(sites, orders, chats, pendingSettings, files, blogs);
      
      // Send secondary confirm notification
      const successEmail: SimulatedEmail = {
        id: `email_otp_success_${Date.now()}`,
        to: pendingSettings.adminEmail || 'authorityplacement@gmail.com',
        from: 'security@authorityplacement.com',
        subject: '✅ CONFIRMED: Admin Security Password Updated',
        body: `Hello Administrator,

This email confirms that your administrative access password has been successfully updated and saved to the secure server database.

New access credentials are active immediately. Standard authentication is now restricted exclusively to this modified key.

If you suspect any unauthorized administrative changes, please contact the cybersecurity team immediately.

Timestamp: ${new Date().toLocaleString()}
IP-Ref: Secure Container Ingress Network`,
        timestamp: new Date().toISOString(),
        read: false,
        type: 'system'
      };

      setSimulatedEmails(prev => [successEmail, ...prev]);
      
      setIsOtpModalOpen(false);
      setSettingsOtpCode(null);
      setPendingSettings(null);
      showToast('Security Key updated! Platform configuration saved successfully.', 'success');
    } else {
      setOtpError('Invalid 6-digit security code. Please check and try again.');
    }
  };

  // Admin action: Register or Update a User in user directory
  const handleRegisterUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim() || !settings) {
      showToast('Please fill out all user profile details.', 'error');
      return;
    }

    const emailLower = newUserEmail.trim().toLowerCase();

    // Check duplicate email
    if (!editingUser && users.some(u => u.email.toLowerCase() === emailLower)) {
      showToast('An active account with this email address already exists.', 'error');
      return;
    }

    let updatedUsersList: User[] = [];

    if (editingUser) {
      // Update existing
      updatedUsersList = users.map(u => u.id === editingUser.id ? {
        ...u,
        name: newUserName.trim(),
        email: emailLower,
        role: newUserRole,
        wallet: Number(newUserWallet)
      } : u);
      showToast(`Account for ${newUserName} updated successfully!`, 'success');
    } else {
      // Create new
      const newUserRecord: User = {
        id: `usr_${Date.now()}`,
        name: newUserName.trim(),
        email: emailLower,
        role: newUserRole,
        wallet: Number(newUserWallet)
      };
      updatedUsersList = [...users, newUserRecord];
      showToast(`Account registered successfully for ${newUserName}!`, 'success');
    }

    setUsers(updatedUsersList);
    await updateDbOnServer(sites, orders, chats, settings, files, blogs, updatedUsersList);

    // Reset forms
    setNewUserName('');
    setNewUserEmail('');
    setNewUserRole('publisher');
    setNewUserWallet(500);
    setNewUserFormOpen(false);
    setEditingUser(null);
  };

  // Admin action: Adjust a User's Wallet balance directly
  const handleAdjustUserWallet = async (userId: string, changeAmount: number) => {
    if (!settings) return;
    const updatedUsersList = users.map(u => {
      if (u.id === userId) {
        const newBal = Math.max(0, u.wallet + changeAmount);
        return { ...u, wallet: newBal };
      }
      return u;
    });
    setUsers(updatedUsersList);
    await updateDbOnServer(sites, orders, chats, settings, files, blogs, updatedUsersList);
    showToast(`Adjusted wallet balance by $${changeAmount.toFixed(2)}`, 'success');
  };

  // Admin action: Delete user account from directory
  const handleDeleteUser = async (userId: string) => {
    if (!settings) return;
    const target = users.find(u => u.id === userId);
    if (!target) return;
    
    if (window.confirm(`Are you absolutely sure you want to permanently delete user "${target.name}" (${target.email})?`)) {
      const updatedUsersList = users.filter(u => u.id !== userId);
      setUsers(updatedUsersList);
      await updateDbOnServer(sites, orders, chats, settings, files, blogs, updatedUsersList);
      showToast(`Deleted user account: ${target.name}`, 'info');
    }
  };

  // Admin action: Impersonate user profile
  const handleImpersonateUser = (targetUser: User) => {
    if (!user) return;
    // Set current admin as original
    setOriginalAdminUser(user);
    // Switch to target user
    setUser(targetUser);
    // Move active tab to dashboard
    setActiveTab('dashboard');
    showToast(`Now impersonating ${targetUser.name} (${targetUser.email}). Enjoy your testing session!`, 'success');
  };

  // Publisher transitions pending order to in_progress (Start Drafting)
  const handlePublisherAcceptOrder = async (orderId: string) => {
    if (!settings) return;
    const updatedOrders = orders.map(o => o.id === orderId ? { ...o, status: 'in_progress' as const } : o);
    setOrders(updatedOrders);
    await updateDbOnServer(sites, updatedOrders, chats, settings, files, blogs);
    showToast('Order status updated: Drafting commenced!', 'success');
  };

  // Admin Actions: Create Blog Article (feeds landing page in real-time)
  const handleAdminCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlogTitle || !newBlogSummary || !newBlogContent || !settings) return;

    const newBlog: BlogPost = {
      id: `${blogs.length + 1}`,
      title: newBlogTitle,
      slug: newBlogTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      summary: newBlogSummary,
      content: newBlogContent,
      author: user?.name || "Senior Editor",
      date: new Date().toISOString().split('T')[0],
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
    };

    const updatedBlogs = [newBlog, ...blogs];
    setBlogs([...blogs, newBlog]);

    await updateDbOnServer(sites, orders, chats, settings, files, updatedBlogs);

    setNewBlogTitle('');
    setNewBlogSummary('');
    setNewBlogContent('');
    showToast('Resource Blog published onto landing page!', 'success');
  };

  // Wallet Top Up deposit
  const handleAddFunds = async (amount: number) => {
    if (!user || !settings) return;
    const updatedUser = { ...user, wallet: user.wallet + amount };
    setUser(updatedUser);
    showToast(`Invested $${amount.toFixed(2)} deposit into wallet successfully!`, 'success');
  };

  // Wallet Payout transfer
  const handleRequestPayout = async (amount: number) => {
    if (!user || !settings) return;
    if (user.wallet < amount) {
      showToast('Insufficient wallet account balance.', 'error');
      return;
    }
    const updatedUser = { ...user, wallet: user.wallet - amount };
    setUser(updatedUser);
    showToast(`Payout receipt pending: $${amount.toFixed(2)} transfer processing!`, 'success');
  };

  // Logged-out state
  if (!user) {
    return <LandingPage onLogin={(u) => setUser(u)} blogs={blogs} />;
  }

  // Sidebar access rules based on user role
  const sidebarItemsMap: Record<'admin' | 'advertiser' | 'publisher', any[]> = {
    admin: [
      { id: 'dashboard', label: 'Monitor Dashboard', icon: <TrendingUp size={16} /> },
      { id: 'marketplace', label: 'Explore Marketplace', icon: <Globe size={16} />, section: 'Platform' },
      { id: 'orders_admin', label: 'All Orders', icon: <Box size={16} /> },
      { id: 'sites_admin', label: 'Sites Intake', icon: <Building size={16} />, section: 'Management' },
      { id: 'users_admin', label: 'User Directory', icon: <Users size={16} /> },
      { id: 'blogs_admin', label: 'SEO Blogs Editor', icon: <BookOpen size={16} /> },
      { id: 'chats', label: 'Messages Desk', icon: <MessageSquare size={16} /> },
      { id: 'admin_emails', label: 'Sent Mail Dispatch', icon: <Mail size={16} /> },
      { id: 'wallet', label: 'Global Wallet Tracker', icon: <Wallet size={16} />, section: 'Account' },
      { id: 'settings_admin', label: 'Admin Settings', icon: <Settings size={16} /> }
    ],
    advertiser: [
      { id: 'dashboard', label: 'Account Dashboard', icon: <TrendingUp size={16} /> },
      { id: 'marketplace', label: 'Search Marketplace', icon: <Globe size={16} />, section: 'Discovery' },
      { id: 'orders', label: 'My Backlink Orders', icon: <Box size={16} />, section: 'Account' },
      { id: 'chats', label: 'Communications', icon: <MessageSquare size={16} /> },
      { id: 'wallet', label: 'Deposits Wallet', icon: <Wallet size={16} /> }
    ],
    publisher: [
      { id: 'dashboard', label: 'Earnings Dashboard', icon: <TrendingUp size={16} /> },
      { id: 'publisher_profile', label: 'Publisher Profile', icon: <UserIcon size={16} />, section: 'Publishing' },
      { id: 'sites', label: 'Publication Portfolio', icon: <Building size={16} /> },
      { id: 'publisher_emails', label: 'Mail Inbox & Alerts', icon: <Mail size={16} /> },
      { id: 'orders', label: 'Placement Orders', icon: <Box size={16} />, section: 'Account' },
      { id: 'chats', label: 'Direct Messages', icon: <MessageSquare size={16} /> },
      { id: 'wallet', label: 'Payouts Wallet', icon: <Wallet size={16} /> }
    ]
  };
  const sidebarItems = sidebarItemsMap[user.role as 'admin' | 'advertiser' | 'publisher'] || [];

  // Helper stats calculating metrics
  const baseApprovedSites = sites.filter(s => s.status === 'approved');
  const comparedSites = sites.filter(s => compareSiteIds.includes(s.id));
  
  // Dynamic search, niche filters and metrics sorting computed list
  const approvedSitesList = baseApprovedSites.filter(site => {
    const query = searchQuery.toLowerCase().trim();
    
    // Defensive normalization
    const rawDomain = (site.domain || '').toLowerCase();
    const rawNiche = (site.niche || '').toLowerCase();
    const rawDescription = (site.description || '').toLowerCase();
    const rawPublisher = (site.publisher || '').toLowerCase();

    // Protocol and slash stripping for both the site domain and query
    const cleanSiteDomain = rawDomain
      .replace(/^(https?:\/\/)?(www\.)?/, '')
      .split('/')[0]
      .trim();

    const cleanQuery = query
      .replace(/^(https?:\/\/)?(www\.)?/, '')
      .split('/')[0]
      .trim();

    const matchesSearch = !query || 
                          rawDomain.includes(query) || 
                          cleanSiteDomain.includes(cleanQuery) ||
                          rawNiche.includes(query) || 
                          rawDescription.includes(query) ||
                          rawPublisher.includes(query);

    const matchesNiche = selectedNiche === 'All' || 
                         rawNiche.split(',').map(n => n.trim().toLowerCase()).includes(selectedNiche.toLowerCase());

    // Defensive coercion to numbers for safety
    const daNum = Number(site.da) || 0;
    const drNum = Number(site.dr) || 0;
    const trafficNum = Number(site.traffic) || 0;
    const priceNum = Number(site.price) || 0;

    const matchesDa = daNum >= filterMinDa;
    const matchesDr = drNum >= filterMinDr;
    const matchesTraffic = trafficNum >= filterMinTraffic;
    const matchesPrice = priceNum <= filterMaxPrice;
    const matchesLinkInsertion = !filterOnlyLinkInsertion || site.allowLinkInsertion === true;
    
    const matchesLifespan = filterLifespan === 'All' || 
                            (site.lifespan || '').toLowerCase() === filterLifespan.toLowerCase();

    const matchesDofollow = filterDofollow === 'All' || 
                            (filterDofollow === 'Dofollow' && site.dofollow === true) || 
                            (filterDofollow === 'Nofollow' && site.dofollow === false);

    const matchesSponsored = filterSponsored === 'All' || 
                             (filterSponsored === 'Yes' && site.sponsoredTag === true) || 
                             (filterSponsored === 'No' && site.sponsoredTag === false);

    const matchesHomepage = filterHomepage === 'All' || 
                            (filterHomepage === 'Yes' && site.homepageFeature === true) || 
                            (filterHomepage === 'No' && site.homepageFeature === false);

    return matchesSearch && matchesNiche && matchesDa && matchesDr && matchesTraffic && matchesPrice && matchesLinkInsertion && matchesLifespan && matchesDofollow && matchesSponsored && matchesHomepage;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'da-desc') return b.da - a.da;
    if (sortBy === 'dr-desc') return b.dr - a.dr;
    if (sortBy === 'traffic-desc') return b.traffic - a.traffic;
    return 0;
  });

  const userOrdersList = orders.filter(o => {
    if (user.role === 'admin') return true;
    if (user.role === 'advertiser') return o.advertiser === user.email;
    if (user.role === 'publisher') return o.publisher === user.email;
    return false;
  });

  // Dynamic filter for display list
  const filteredUserOrdersList = userOrdersList.filter(o => {
    if (orderFilterStatus === 'all') return true;
    return o.status === orderFilterStatus;
  });
  
  const verifiedPlacementsCount = userOrdersList.filter(o => o.backlinkStatus === 'success' && o.status === 'completed').length;
  const inProgressPlacements = userOrdersList.filter(o => o.status === 'in_progress' || o.status === 'pending').length;

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden">
      
      {/* Sidebar panel */}
      <aside className="w-64 bg-slate-950 text-slate-400 flex flex-col shrink-0 border-r border-slate-900 shadow-xl">
        <div className="p-5 border-b border-slate-900 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 via-indigo-500 to-indigo-600 rounded-xl blur opacity-75 animate-pulse" />
              <div className="relative bg-gradient-to-br from-slate-900 to-indigo-950 text-white w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs tracking-wider border border-white/20 shadow-lg select-none">
                👑
              </div>
            </div>
            <div>
              <h2 className="text-xs font-black tracking-widest uppercase text-white leading-none flex items-center gap-1.5">
                <span>AUTHORITY</span>
                <span className="text-[9px] bg-gradient-to-r from-amber-400 to-amber-200 text-slate-950 font-black px-1.5 py-0.5 rounded-md shadow-sm">PRO</span>
              </h2>
              <span className="text-[8px] font-black uppercase tracking-widest text-[#818CF8] mt-1.5 block">SYNDICATION FORUM</span>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto px-3.5 py-4 space-y-1">
          {sidebarItems?.map((item: any, idx: number) => (
            <div key={item.id}>
              {item.section && (
                <span className="block text-[9.5px] font-extrabold text-slate-600 uppercase tracking-widest mt-4 mb-2.5 px-3">
                  {item.section}
                </span>
              )}
              <button
                type="button"
                onClick={() => {
                  setActiveTab(item.id);
                  setScanningOrder(null);
                  // Auto mark all user's emails as read when visiting inbox
                  if (item.id === 'publisher_emails') {
                    setSimulatedEmails(prev => prev.map(e => e.to === user.email ? { ...e, read: true } : e));
                  }
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2 text-xs font-medium rounded-lg transition-all text-left ${
                  activeTab === item.id 
                    ? 'bg-slate-900 text-white font-bold border border-slate-800/80 shadow-md' 
                    : 'hover:bg-slate-900/50 hover:text-slate-205 text-slate-400'
                }`}
              >
                <span className={activeTab === item.id ? 'text-indigo-400' : 'text-slate-500'}>
                  {item.icon}
                </span>
                <span className="flex-1">{item.label}</span>
                {item.id === 'publisher_emails' && (() => {
                  const unread = simulatedEmails.filter(e => e.to === user.email && !e.read).length;
                  return unread > 0 ? (
                    <span className="px-2 py-0.5 text-[9px] font-black bg-amber-500 text-slate-950 rounded-md">
                      {unread} new
                    </span>
                  ) : null;
                })()}
                {item.id === 'admin_emails' && simulatedEmails.length > 0 && (
                  <span className="px-2 py-0.5 text-[9px] font-bold bg-slate-800 text-slate-300 rounded-md">
                    {simulatedEmails.length} sent
                  </span>
                )}
              </button>
            </div>
          ))}
        </nav>

        {/* User profile capsule bottom strip */}
        <div className="p-4 border-t border-slate-900 bg-slate-905 flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-indigo-950 font-bold text-indigo-300 text-xs flex items-center justify-center border border-indigo-900">
            {user.name[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0 select-none">
            <h4 className="text-xs font-bold text-slate-200 truncate">{user.name}</h4>
            <span className="text-[10px] text-indigo-455 font-semibold capitalize tracking-wide">{user.role} Portal</span>
          </div>
          <button
            type="button"
            onClick={() => setUser(null)}
            title="Log Out"
            className="p-1.5 text-slate-500 hover:text-white hover:bg-slate-900 rounded-lg transition-all"
          >
            ⏻
          </button>
        </div>
      </aside>

      {/* Main Content frame */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {originalAdminUser && (
          <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white px-6 py-2.5 flex items-center justify-between gap-4 font-sans text-xs shadow-md shrink-0 animate-in slide-in-from-top duration-200 select-none">
            <div className="flex items-center gap-2">
              <span className="text-sm">🕵️</span>
              <div>
                <span className="font-bold">Administrative Impersonation Session Active:</span>{' '}
                Viewing portal as <span className="underline font-black">{user.name}</span> ({user.email}) [{user.role.toUpperCase()}]
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setUser(originalAdminUser);
                setOriginalAdminUser(null);
                setActiveTab('users_admin');
                showToast('Returned to Administrative Console successfully.', 'success');
              }}
              className="px-3 py-1 bg-white text-indigo-950 hover:bg-slate-50 rounded-lg font-black text-[10px] uppercase tracking-wide transition-all cursor-pointer shadow-sm shrink-0"
            >
              ← Back to Admin Console
            </button>
          </div>
        )}

        {/* Topbar strip with active path info and wallet status (Refined Dark Header) */}
        <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex justify-between items-center shrink-0 shadow-md z-10 select-none">
          <div>
            <h3 className="text-sm font-black text-slate-100 uppercase tracking-widest flex items-center gap-1.5">
              <span>{activeTab.replace('_', ' ')}</span>
            </h3>
            <p className="text-[9.5px] text-[#818CF8] font-black uppercase tracking-wider mt-0.5">Synced and verified live via Cloud Run</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-slate-800/80 border border-slate-700 px-4 py-1.5 rounded-xl flex items-center gap-2.5 shadow-inner">
              <span className="text-amber-400 text-xs">💰</span>
              <div>
                <span className="block text-[8px] font-black text-slate-400 uppercase tracking-wide leading-none">Wallet Balance</span>
                <span className="text-xs font-black text-white mt-0.5 block">${user.wallet.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Inner Tab container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {loadingDb ? (
            <div className="text-slate-500 py-24 text-center space-y-2">
              <Loader2 className="animate-spin text-slate-400 mx-auto" size={32} />
              <p className="text-xs font-medium">Retrieving placements index database...</p>
            </div>
          ) : (
            <>
              {/* BACKLINK SCANNER ACTIVE REPORT CONTAINER IF REPORT TRACKER INITIATED */}
              {scanningOrder && (
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={() => setScanningOrder(null)}
                    className="text-xs font-bold text-indigo-650 hover:text-indigo-805 flex items-center gap-1 bg-white border border-slate-200 rounded px-3 py-1 cursor-pointer"
                  >
                    ← Back to Tab Dashboard
                  </button>
                  <BacklinkScanner
                    order={scanningOrder}
                    onScanComplete={(updated) => {
                      const updatedOrders = orders.map(o => o.id === updated.id ? updated : o);
                      setOrders(updatedOrders);
                    }}
                  />
                </div>
              )}

              {!scanningOrder && activeTab === 'dashboard' && (
                <div className="space-y-6">
                  {/* ADMIN EXCLUSIVE SUMMARY BANNER */}
                  {user.role === 'admin' && (
                    <div className="bg-slate-900 border border-slate-800 text-slate-100 rounded-2xl p-5 mb-2 text-left relative overflow-hidden">
                      <div className="relative z-10 animate-fade-in">
                        <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20 uppercase tracking-widest">
                          👮 Authority Platform Control Desk
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                          <div className="p-4 bg-slate-800/40 border border-slate-800/60 rounded-xl space-y-1">
                            <span className="block text-[9.5px] font-bold text-slate-400 uppercase tracking-wide">Placements Directory</span>
                            <span className="text-base font-black text-white">{sites.length} Active Domains</span>
                          </div>
                          <div className="p-4 bg-slate-800/40 border border-slate-800/60 rounded-xl space-y-1">
                            <span className="block text-[9.5px] font-bold text-slate-400 uppercase tracking-wide">Commissions Collected</span>
                            <span className="text-base font-black text-emerald-400">
                              ${orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + (o.amount * 0.15), 0).toFixed(2)}
                            </span>
                          </div>
                          <div className="p-4 bg-slate-800/40 border border-slate-800/60 rounded-xl space-y-1">
                            <span className="block text-[9.5px] font-bold text-slate-400 uppercase tracking-wide">Escrow Ledger Pool</span>
                            <span className="text-base font-black text-indigo-400">
                              ${orders.filter(o => o.status === 'pending' || o.status === 'in_progress').reduce((sum, o) => sum + o.amount, 0).toFixed(2)}
                            </span>
                          </div>
                          <div className="p-4 bg-slate-800/40 border border-slate-800/60 rounded-xl space-y-1">
                            <span className="block text-[9.5px] font-bold text-slate-400 uppercase tracking-wide">Awaiting Publishing</span>
                            <span className="text-base font-black text-amber-500">
                              {orders.filter(o => o.status === 'in_progress' && !o.publishedUrl).length} Placements
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Greeting header */}
                  <div className="bg-gradient-to-tr from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-3xl p-6.5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden border border-indigo-950">
                    <div className="absolute right-0 top-0 h-full w-2/5 bg-radial from-violet-600/15 via-transparent to-transparent pointer-events-none" />
                    <div className="space-y-1.5 relative z-10 text-left max-w-2xl">
                      <span className="text-[9.5px] uppercase font-black tracking-widest text-[#F59E0B] bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 shadow-sm inline-block">
                        ⚡ PREMIUM PLACEMENTS PORTAL ACTIVE
                      </span>
                      <h4 className="text-2xl font-black tracking-tight mt-1 bg-gradient-to-r from-white via-indigo-100 to-indigo-200 bg-clip-text text-transparent">Welcome back, {user.name}!</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {user.role === 'publisher' 
                          ? 'Monetize your outlet properties. Specify Guest Post and Link Insertion pricing parameters in the publisher control tab to secure direct advertiser orders.'
                          : 'Identify high traffic authority platforms, configure automated pitch briefs, check dofollow verification integrity, and coordinate with verified site publishers.'
                        }
                      </p>
                      {user.role === 'publisher' && (
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => setActiveTab('sites')}
                            className="bg-gradient-to-r from-indigo-600 to-violet-605 hover:opacity-95 text-white text-xs font-bold py-2.5 px-4 rounded-xl border border-indigo-500/30 transition-all flex items-center gap-1.5 shadow-md shadow-indigo-950/50 cursor-pointer"
                          >
                            <Plus size={14} /> Add / List Your Website Outlet Now
                          </button>
                        </div>
                      )}
                    </div>
                    {/* Visual Badge Overlay inside header card */}
                    <div className="relative z-10 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 shrink-0 text-left md:w-56 space-y-2">
                      <span className="block text-[9px] uppercase font-black tracking-widest text-indigo-400">CURRENT USER SCORE</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-white">{user.role === 'publisher' ? 'A+' : '99.9%'}</span>
                        <span className="text-xs text-slate-400">credibility</span>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-snug">Excellent platform service standing and payout tier status active.</p>
                    </div>
                  </div>

                  {/* Metrics panels */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="bg-gradient-to-br from-indigo-50/50 via-white to-white border border-indigo-100/60 border-l-4 border-l-indigo-600 rounded-2xl p-5 flex items-center gap-4 shadow-sm text-left transition-all hover:scale-[1.01]">
                      <div className="w-11 h-11 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold shrink-0 shadow-md shadow-indigo-500/20">
                        🔗
                      </div>
                      <div>
                        <span className="block text-[9.5px] font-bold text-indigo-605 uppercase tracking-wider leading-none mb-1">Ordered Placements</span>
                        <h4 className="text-xl font-black text-slate-900 leading-none">{userOrdersList.length}</h4>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50/40 via-white to-white border border-emerald-100/60 border-l-4 border-l-emerald-500 rounded-2xl p-5 flex items-center gap-4 shadow-sm text-left transition-all hover:scale-[1.01]">
                      <div className="w-11 h-11 bg-emerald-500 text-white rounded-xl flex items-center justify-center font-bold shrink-0 shadow-md shadow-emerald-500/20">
                        ✓
                      </div>
                      <div>
                        <span className="block text-[9.5px] font-bold text-emerald-600 uppercase tracking-wider leading-none mb-1">Pass Verified Live</span>
                        <h4 className="text-xl font-black text-slate-900 leading-none">{verifiedPlacementsCount}</h4>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50/40 via-white to-white border border-amber-100/60 border-l-4 border-l-amber-500 rounded-2xl p-5 flex items-center gap-4 shadow-sm text-left transition-all hover:scale-[1.01]">
                      <div className="w-11 h-11 bg-amber-500 text-white rounded-xl flex items-center justify-center font-bold shrink-0 shadow-md shadow-amber-500/20">
                        ⏳
                      </div>
                      <div>
                        <span className="block text-[9.5px] font-bold text-amber-600 uppercase tracking-wider leading-none mb-1">Drafting & Queue</span>
                        <h4 className="text-xl font-black text-slate-900 leading-none">{inProgressPlacements}</h4>
                      </div>
                    </div>
                  </div>

                  {/* Responsive custom SVG graph spline for brand gravity tracking */}
                  <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
                      <div className="text-left">
                        <h4 className="text-sm font-bold text-slate-900">Brand Authority & Place Metrics</h4>
                        <p className="text-[11px] text-slate-500">Domain Authority (DA) reference index trends over past quarters.</p>
                      </div>
                      <div className="flex gap-4 items-center text-xs">
                        <span className="inline-flex items-center gap-1 text-indigo-600 font-semibold">
                          <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full inline-block"></span> DA Index
                        </span>
                        <span className="inline-flex items-center gap-1 text-slate-400">
                          <span className="w-2.5 h-2.5 bg-slate-300 rounded-full inline-block"></span> DR Index
                        </span>
                      </div>
                    </div>

                    {/* Responsive custom clean SVG Spline */}
                    <div className="h-48 w-full relative">
                      <svg viewBox="0 0 500 120" className="w-full h-full overflow-visible">
                        {/* Grid lines */}
                        <line x1="0" y1="20" x2="500" y2="20" stroke="#f1f5f9" strokeDasharray="3" />
                        <line x1="0" y1="60" x2="500" y2="60" stroke="#f1f5f9" strokeDasharray="3" />
                        <line x1="0" y1="100" x2="500" y2="100" stroke="#f1f5f9" strokeDasharray="3" />

                        {/* Spline curve for DA Index */}
                        <path
                          d="M0,100 C80,80 150,40 250,30 S420,15 500,10"
                          fill="none"
                          stroke="#4f46e5"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        {/* Gradient shaded fill beneath spline */}
                        <path
                          d="M0,100 C80,80 150,40 250,30 S420,15 500,10 L500,120 L0,120 Z"
                          fill="url(#indigo-grad)"
                          opacity="0.08"
                        />
                        {/* Spline curve for DR Index */}
                        <path
                          d="M0,110 C80,95 150,70 250,55 S420,40 500,35"
                          fill="none"
                          stroke="#cbd5e1"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeDasharray="4"
                        />

                        {/* Node Intersections Highlights */}
                        <circle cx="250" cy="30" r="4.5" fill="#4f46e5" stroke="#ffffff" strokeWidth="1.5" />
                        <text x="250" y="20" fontSize="8" fontWeight="bold" fill="#4f46e5" textAnchor="middle">Current Q2 Peak: DA 78</text>

                        {/* Definitions */}
                        <defs>
                          <linearGradient id="indigo-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#4f46e5" />
                            <stop offset="100%" stopColor="#ffffff" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>

                  {/* Active Orders Quick Table view */}
                  <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-sm">
                    <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                      <h4 className="font-bold text-sm text-slate-800 text-left">Your Placements Tracklist</h4>
                      <button type="button" onClick={() => setActiveTab('orders')} className="text-xs font-bold text-indigo-650 hover:text-indigo-805">
                        View All Orders →
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-slate-400 font-semibold border-b border-slate-100 uppercase text-[9.5px]">
                          <tr>
                            <th className="p-3.5">ID</th>
                            <th className="p-3.5">Outlet Domain</th>
                            <th className="p-3.5">Date</th>
                            <th className="p-3.5">Anchor word</th>
                            <th className="p-3.5">Placements progress</th>
                            <th className="p-3.5">Backlink Check</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-105">
                          {userOrdersList.slice(0, 4).map((o) => (
                            <tr key={o.id} className="hover:bg-slate-50/50">
                              <td className="p-3.5 font-bold text-slate-900">{o.id}</td>
                              <td className="p-3.5 text-slate-700">{o.site}</td>
                              <td className="p-3.5 text-slate-500">{o.date}</td>
                              <td className="p-3.5 text-slate-800 font-medium">"{o.anchorText}"</td>
                              <td className="p-3.5">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold capitalize ${
                                  o.status === 'completed'
                                    ? 'bg-emerald-50 text-emerald-600'
                                    : o.status === 'in_progress'
                                    ? 'bg-indigo-50 text-indigo-600'
                                    : 'bg-slate-100 text-slate-600'
                                }`}>
                                  {o.status.replace('_', ' ')}
                                </span>
                              </td>
                              <td className="p-3.5">
                                {o.status === 'completed' ? (
                                  <button
                                    type="button"
                                    onClick={() => setScanningOrder(o)}
                                    className="px-2.5 py-1 bg-slate-900 border border-slate-905 hover:bg-slate-800 text-white text-[10px] font-bold rounded flex items-center gap-1 cursor-pointer"
                                  >
                                    ⚡ Scan Now
                                  </button>
                                ) : (
                                  <span className="text-slate-400 italic text-[11px]">Awaiting link Live publish...</span>
                                )}
                              </td>
                            </tr>
                          ))}

                          {userOrdersList.length === 0 && (
                            <tr>
                              <td colSpan={6} className="text-center py-12 text-slate-400">
                                No ordered placements placed. Search the Directory to lock your first feature!
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* MARKETPLACE SEARCH DIRECTORY WITH AI WRITER WIDGETS */}
              {!scanningOrder && activeTab === 'marketplace' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Left directory index column */}
                  <div className="lg:col-span-5 space-y-5">
                    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm space-y-4">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 text-left">Placement Outlets Directory</h4>
                        <p className="text-xs text-slate-500 mt-0.5">Filter of approved premium outlets in real-time database.</p>
                      </div>

                      {/* Search & Filters */}
                      <div className="space-y-3.5 border-b border-slate-100 pb-4">
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <input
                              type="text"
                              placeholder="Search domains, niches, descriptions..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  saveRecentSearch(searchQuery, selectedNiche, filterMinDa, filterMinDr, filterMinTraffic, filterMaxPrice, filterOnlyLinkInsertion);
                                  showToast(`Search Saved: "${searchQuery || 'Current Filter'}" added to Recent Searches`, 'success');
                                }
                              }}
                              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 bg-slate-50/50"
                            />
                            <span className="absolute left-3 top-2.5 text-slate-400">
                              <Search size={14} />
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              saveRecentSearch(searchQuery, selectedNiche, filterMinDa, filterMinDr, filterMinTraffic, filterMaxPrice, filterOnlyLinkInsertion);
                              showToast(`Current search criteria saved!`, 'success');
                            }}
                            className="px-2.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-150 text-indigo-700 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1 shrink-0"
                            title="Save current search criteria to history"
                          >
                            Save
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[9.5px] font-bold text-slate-400 uppercase mb-1">Niche Category</label>
                            <select
                              value={selectedNiche}
                              onChange={(e) => setSelectedNiche(e.target.value)}
                              className="w-full p-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 bg-white"
                            >
                              <option value="All">All Niches</option>
                              {AVAILABLE_NICHES.map(niche => (
                                <option key={niche} value={niche}>{niche}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-[9.5px] font-bold text-slate-400 uppercase mb-1">Sort Outlets</label>
                            <select
                              value={sortBy}
                              onChange={(e) => setSortBy(e.target.value)}
                              className="w-full p-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 bg-white"
                            >
                              <option value="price-asc">Price: Low to High</option>
                              <option value="price-desc">Price: High to Low</option>
                              <option value="da-desc">Domain Authority (DA)</option>
                              <option value="dr-desc">Domain Rating (DR)</option>
                              <option value="traffic-desc">Traffic</option>
                            </select>
                          </div>
                        </div>

                        {/* Advanced Metric Filters */}
                        <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/50 space-y-3">
                          <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest text-left">📊 Advanced Metric Filters</span>
                          
                          <div className="space-y-2.5">
                            {/* DA & DR Slider */}
                            <div className="grid grid-cols-2 gap-3.5 flex-wrap">
                              <div>
                                <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase mb-1">
                                  <span>Min DA</span>
                                  <span className="text-indigo-650 bg-indigo-50/70 border border-indigo-150 rounded px-1">{filterMinDa}+</span>
                                </div>
                                <input
                                  type="range"
                                  min="0"
                                  max="105"
                                  value={filterMinDa}
                                  onChange={(e) => setFilterMinDa(Number(e.target.value))}
                                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                />
                              </div>
                              <div>
                                <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase mb-1">
                                  <span>Min DR</span>
                                  <span className="text-indigo-650 bg-indigo-50/70 border border-indigo-150 rounded px-1">{filterMinDr}+</span>
                                </div>
                                <input
                                  type="range"
                                  min="0"
                                  max="105"
                                  value={filterMinDr}
                                  onChange={(e) => setFilterMinDr(Number(e.target.value))}
                                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                />
                              </div>
                            </div>

                            {/* Min Traffic & Max Price Slider */}
                            <div className="grid grid-cols-2 gap-3.5 flex-wrap">
                              <div>
                                <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase mb-1">
                                  <span>Min Traffic</span>
                                  <span className="text-emerald-700 bg-emerald-50 border border-emerald-150 rounded px-1 flex shrink-0">{(filterMinTraffic / 1000).toFixed(0)}K+</span>
                                </div>
                                <input
                                  type="range"
                                  min="0"
                                  max="200000"
                                  step="5000"
                                  value={filterMinTraffic}
                                  onChange={(e) => setFilterMinTraffic(Number(e.target.value))}
                                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                />
                              </div>
                              <div>
                                <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase mb-1">
                                  <span>Max Price</span>
                                  <span className="text-amber-700 bg-amber-50 border border-amber-150 rounded px-1 flex shrink-0">${filterMaxPrice}</span>
                                </div>
                                <input
                                  type="range"
                                  min="10"
                                  max="1000"
                                  step="10"
                                  value={filterMaxPrice}
                                  onChange={(e) => setFilterMaxPrice(Number(e.target.value))}
                                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                                />
                              </div>
                            </div>

                            {/* Lifespan, follow, sponsored, homepage selects */}
                            <div className="grid grid-cols-2 gap-2.5 pt-2.5 border-t border-slate-200">
                              <div>
                                <label className="block text-[8.5px] font-bold text-slate-400 uppercase tracking-widest mb-1 text-left">Lifespan/Duration</label>
                                <select
                                  value={filterLifespan}
                                  onChange={(e) => setFilterLifespan(e.target.value)}
                                  className="w-full px-2 py-1.5 text-[11px] border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 bg-white cursor-pointer font-semibold text-slate-700"
                                >
                                  <option value="All">All Lifespans</option>
                                  <option value="Permanent">Permanent</option>
                                  <option value="1 Year">1 Year</option>
                                  <option value="2 Years">2 Years</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-[8.5px] font-bold text-slate-400 uppercase tracking-widest mb-1 text-left">Link Attribute</label>
                                <select
                                  value={filterDofollow}
                                  onChange={(e) => setFilterDofollow(e.target.value)}
                                  className="w-full px-2 py-1.5 text-[11px] border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 bg-white cursor-pointer font-semibold text-slate-700"
                                >
                                  <option value="All">All Types</option>
                                  <option value="Dofollow">Dofollow Only</option>
                                  <option value="Nofollow">Nofollow Only</option>
                                </select>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2.5">
                              <div>
                                <label className="block text-[8.5px] font-bold text-slate-400 uppercase tracking-widest mb-1 text-left">Sponsored Tag</label>
                                <select
                                  value={filterSponsored}
                                  onChange={(e) => setFilterSponsored(e.target.value)}
                                  className="w-full px-2 py-1.5 text-[11px] border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 bg-white cursor-pointer font-semibold text-slate-700"
                                >
                                  <option value="All">All (Spon/Clean)</option>
                                  <option value="No">No Sponsored (Clean)</option>
                                  <option value="Yes">Sponsored Allowed</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-[8.5px] font-bold text-slate-400 uppercase tracking-widest mb-1 text-left">Homepage Spot</label>
                                <select
                                  value={filterHomepage}
                                  onChange={(e) => setFilterHomepage(e.target.value)}
                                  className="w-full px-2 py-1.5 text-[11px] border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 bg-white cursor-pointer font-semibold text-slate-700"
                                >
                                  <option value="All">All Placements</option>
                                  <option value="No">Standard Only</option>
                                  <option value="Yes">Homepage Slots</option>
                                </select>
                              </div>
                            </div>

                            {/* Checkbox Link Insertion & Reset */}
                            <div className="flex justify-between items-center pt-1.5 border-t border-slate-200/60 flex-wrap gap-2">
                              <label className="flex items-center gap-1.5 text-[10.5px] font-bold text-slate-600 cursor-pointer select-none">
                                <input
                                  type="checkbox"
                                  checked={filterOnlyLinkInsertion}
                                  onChange={(e) => setFilterOnlyLinkInsertion(e.target.checked)}
                                  className="rounded border-slate-350 text-[#4f46e5] focus:ring-indigo-500"
                                />
                                <span>🔗 Link Insertion Rate</span>
                              </label>
 
                              {(filterMinDa > 0 || filterMinDr > 0 || filterMinTraffic > 0 || filterMaxPrice < 1000 || filterOnlyLinkInsertion || filterLifespan !== 'All' || filterDofollow !== 'All' || filterSponsored !== 'All' || filterHomepage !== 'All') && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setFilterMinDa(0);
                                    setFilterMinDr(0);
                                    setFilterMinTraffic(0);
                                    setFilterMaxPrice(1000);
                                    setFilterOnlyLinkInsertion(false);
                                    setFilterLifespan('All');
                                    setFilterDofollow('All');
                                    setFilterSponsored('All');
                                    setFilterHomepage('All');
                                  }}
                                  className="text-[9.5px] font-extrabold text-rose-600 hover:text-rose-700 uppercase cursor-pointer"
                                >
                                  Reset
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Compare Sites Selection Dashboard Widget */}
                      {compareSiteIds.length > 0 && (
                        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3.5 text-left flex items-center justify-between gap-3 shadow-sm animate-in fade-in slide-in-from-top-2 duration-200">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5">
                              <span className="inline-flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
                              <h5 className="text-[11.5px] font-extrabold text-indigo-900 uppercase tracking-wide">
                                Side-By-Side Comparison
                              </h5>
                            </div>
                            <p className="text-[11px] text-indigo-750">
                              Selected <span className="font-bold underline">{compareSiteIds.length}</span> of <span className="font-bold">2</span> publication outlets
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                setCompareSiteIds([]);
                                showToast("Comparison selection cleared", "info");
                              }}
                              className="px-2.5 py-1.5 text-[10px] font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-200/50 rounded-lg transition-all cursor-pointer"
                            >
                              Clear
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (compareSiteIds.length < 2) {
                                  showToast("Please choose 2 sites to launch side-by-side comparison.", "info");
                                } else {
                                  setShowCompareModal(true);
                                }
                              }}
                              className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-sm transition-all flex items-center gap-1 cursor-pointer ${
                                compareSiteIds.length === 2
                                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                                  : 'bg-indigo-200 text-indigo-455 cursor-not-allowed'
                              }`}
                            >
                              <span>Compare</span>
                              <Sparkles size={11.5} className="stroke-[2.5]" />
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="space-y-3 max-h-[850px] overflow-y-auto pr-1">
                        {/* High Traffic Sportlights Section */}
                        {approvedSitesList.filter(s => s.traffic >= 40000).length > 0 && (
                          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-[1.5px] rounded-xl shadow-sm mb-4">
                            <div className="bg-white rounded-[10px] p-2.5 text-left space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="text-[9.5px] font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600 uppercase tracking-widest flex items-center gap-1">
                                  🔥 High Traffic Spotlights
                                </span>
                                <span className="text-[8px] font-extrabold text-orange-500 bg-orange-50 px-1 py-0.2 rounded animate-pulse">40K+ traffic</span>
                              </div>
                              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin select-none">
                                {approvedSitesList.filter(s => s.traffic >= 40000).map((hs) => (
                                  <div
                                    key={hs.id}
                                    onClick={() => setBuyingSite(hs)}
                                    className={`px-2.5 py-1.5 border rounded-lg flex flex-col items-start gap-0.5 transition-all cursor-pointer min-w-[125px] shrink-0 ${
                                      buyingSite?.id === hs.id
                                        ? 'border-orange-500 bg-orange-50/20 shadow-sm'
                                        : 'border-slate-100 bg-slate-50 hover:bg-orange-50/10'
                                    }`}
                                  >
                                    <span className="text-[11px] font-bold text-slate-800 truncate w-full">{hs.domain}</span>
                                    <div className="flex items-center gap-1">
                                      <span className="text-[9px] font-semibold text-orange-600 italic">{(hs.traffic / 1000).toFixed(0)}K traffic</span>
                                    </div>
                                    <span className="text-[9.5px] font-extrabold text-slate-950">${hs.price}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {approvedSitesList.map((site) => {
                          const publisherOrders = orders.filter(o => o.publisher === site.publisher);
                          const completedOrders = publisherOrders.filter(o => o.status === 'completed');
                          const rejectedOrders = publisherOrders.filter(o => o.status === 'rejected');
                          const totalConcluded = completedOrders.length + rejectedOrders.length;
                          const completionRateByOrders = totalConcluded > 0 ? Math.round((completedOrders.length / totalConcluded) * 100) : 100;
                          const turnaroundByDays = site.turnaround || 5;

                          // Verified Publisher: Completion rate >= 90%
                          // Top Performer: Turnaround time <= 5 days and DA >= 55
                          const isVerifiedPublisher = completionRateByOrders >= 90;
                          const isTopPerformer = turnaroundByDays <= 5 && site.da >= 55;

                          return (
                            <div
                              key={site.id}
                              onClick={() => {
                                setBuyingSite(site);
                                // Auto seed generators with target domain's niche context
                              }}
                              className={`p-4 rounded-xl cursor-pointer border text-left transition-all relative ${
                                buyingSite?.id === site.id
                                  ? 'bg-indigo-50/40 border-indigo-500 shadow-sm'
                                  : 'bg-slate-50 hover:bg-slate-100/50 border-slate-200'
                              }`}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="text-sm font-bold text-slate-900">{site.domain}</h4>
                                  <div className="flex flex-wrap gap-1.5 items-center mt-1.5">
                                    {(site.niche || '').split(',').map(n => n.trim()).filter(Boolean).map(n => (
                                      <span key={n} className="text-[10px] font-bold bg-slate-200 px-1.5 py-0.5 rounded text-slate-600 capitalize">
                                        {n}
                                      </span>
                                    ))}
                                    {isVerifiedPublisher && (
                                      <span 
                                        className="text-[8.5px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-250/20 px-1.5 py-0.5 rounded inline-flex items-center gap-0.5" 
                                        title={`Verified publisher: ${completionRateByOrders}% order completion rate`}
                                      >
                                        <ShieldCheck size={11} className="text-emerald-600 stroke-[2.5]" />
                                        Verified Publisher
                                      </span>
                                    )}
                                    {isTopPerformer && (
                                      <span 
                                        className="text-[8.5px] font-extrabold text-amber-700 bg-amber-50 border border-amber-250/20 px-1.5 py-0.5 rounded inline-flex items-center gap-0.5" 
                                        title={`High metrics (DA ${site.da}) and lightning-fast ${turnaroundByDays}d delivery`}
                                      >
                                        <Sparkles size={11} className="text-amber-500 stroke-[2.5]" />
                                        Top Performer
                                      </span>
                                    )}
                                  </div>
                                </div>
                              <div className="text-right">
                                <span className="block text-indigo-600 font-black text-sm">${site.price}</span>
                                <span className="text-[9px] text-slate-400 font-semibold block uppercase">Placements</span>
                              </div>
                            </div>
                            <p className="text-[11.5px] text-slate-500 leading-relaxed mt-2 line-clamp-2">
                              {site.description}
                            </p>
                            <div className="grid grid-cols-3 gap-2 mt-3 text-[10px] bg-white border border-slate-250/20 p-2 rounded-lg text-center font-semibold text-slate-600">
                              <div>
                                <span className="block text-slate-400 text-[8.5px] uppercase">DA</span>
                                <span>{site.da || 'N/A'}</span>
                              </div>
                              <div>
                                <span className="block text-slate-400 text-[8.5px] uppercase">DR</span>
                                <span>{site.dr || 'N/A'}</span>
                              </div>
                              <div>
                                <span className="block text-slate-400 text-[8.5px] uppercase">Traffic</span>
                                <span>{(site.traffic / 1000).toFixed(0)}K</span>
                              </div>
                            </div>

                            {/* Detailed Placement Parameters Badges */}
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              <span className={`text-[8.5px] font-bold px-2 py-0.5 rounded ${site.dofollow ? 'text-emerald-700 bg-emerald-50 border border-emerald-100' : 'text-amber-700 bg-amber-50 border border-amber-100'}`}>
                                {site.dofollow ? 'Dofollow' : 'Nofollow'}
                              </span>
                              <span className="text-[8.5px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100/50 px-2 py-0.5 rounded">
                                ⏱️ {site.turnaround}d delivery
                              </span>
                              <span className="text-[8.5px] font-bold text-slate-600 bg-slate-100 border border-slate-200/40 px-2 py-0.5 rounded">
                                {site.lifespan || 'Permanent'} Link
                              </span>
                              {site.sponsoredTag && (
                                <span className="text-[8.5px] font-extrabold text-orange-700 bg-orange-50 border border-orange-200/40 px-2 py-0.5 rounded">
                                  📢 Sponsored
                                </span>
                              )}
                              {site.homepageFeature && (
                                <span className="text-[8.5px] font-extrabold text-blue-700 bg-blue-50 border border-blue-200/40 px-2 py-0.5 rounded">
                                  🏠 Featured Homepage Slot
                                </span>
                              )}
                              {site.allowLinkInsertion && (
                                <span className="text-[8.5px] font-extrabold text-violet-700 bg-violet-50 border border-violet-150 px-2 py-0.5 rounded flex items-center gap-0.5">
                                  🔗 Link Insert: ${site.linkInsertionPrice}
                                </span>
                              )}
                              {site.traffic >= 40000 && (
                                <span className="text-[8.5px] font-black text-rose-600 bg-rose-50 border border-rose-150 px-2 py-0.5 rounded animate-pulse">
                                  🔥 High Traffic Spot
                                </span>
                              )}
                            </div>

                            {/* Sample Post Link */}
                            {site.samplePost && (
                              <div className="mt-2.5 pt-1.5 border-t border-slate-100/60 flex items-center justify-between text-[11px]">
                                <span className="text-slate-400 font-bold text-[9px] uppercase tracking-wide">Live Sample Post</span>
                                <a
                                  href={site.samplePost}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="text-indigo-600 hover:text-indigo-700 hover:underline transition-all font-semibold flex items-center gap-0.5"
                                >
                                  <span>View Sample Post</span>
                                  <span className="text-[9px]">↗</span>
                                </a>
                              </div>
                            )}

                            {/* Side-by-Side Compare Action Toggle */}
                            <div className="mt-3.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                              <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Side-by-side Specs</span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const isSelected = compareSiteIds.includes(site.id);
                                  if (isSelected) {
                                    setCompareSiteIds(compareSiteIds.filter(id => id !== site.id));
                                  } else {
                                    if (compareSiteIds.length >= 2) {
                                      showToast("You can compare up to 2 outlets. Deselect one to add another.", "info");
                                    } else {
                                      setCompareSiteIds([...compareSiteIds, site.id]);
                                    }
                                  }
                                }}
                                className={`px-2.5 py-1 rounded text-[9px] font-black uppercase tracking-wider transition-all border shrink-0 flex items-center gap-1 cursor-pointer shadow-sm ${
                                  compareSiteIds.includes(site.id)
                                    ? 'bg-indigo-600 border-indigo-650 text-white'
                                    : 'bg-white border-slate-200 text-indigo-600 hover:bg-indigo-50/40'
                                }`}
                              >
                                {compareSiteIds.includes(site.id) ? (
                                  <>
                                    <Check size={9.5} className="stroke-[3]" />
                                    <span>Selected</span>
                                  </>
                                ) : (
                                  <span>+ Compare</span>
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      })}

                        {approvedSitesList.length === 0 && (
                          <div className="text-center py-10 text-slate-400 text-xs">
                            No domains matching your current filters.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Recent Searches Sidebar Widget */}
                    <div id="recent-search-history-widget" className="bg-slate-950 border border-slate-900 rounded-xl p-5 shadow-xl space-y-4 text-slate-400">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-1 px-1.5 bg-slate-900 border border-slate-800 rounded-lg text-indigo-400 flex items-center justify-center">
                            <Clock size={13} className="text-indigo-400" />
                          </div>
                          <div className="text-left">
                            <h4 className="text-xs font-bold text-slate-100">Recent Discoveries</h4>
                            <p className="text-[10px] text-slate-550">Restorable search configurations</p>
                          </div>
                        </div>
                        {recentSearches.length > 0 && (
                          <button
                            type="button"
                            onClick={clearAllRecentSearches}
                            className="text-[10px] text-slate-500 hover:text-rose-410 transition-colors font-bold uppercase tracking-wider cursor-pointer"
                          >
                            Clear
                          </button>
                        )}
                      </div>

                      {/* Search History Filter Field */}
                      {recentSearches.length > 0 && (
                        <div className="space-y-2.5 bg-slate-900/60 p-2.5 rounded-lg border border-slate-900">
                          <div className="relative">
                            <input
                              type="text"
                              value={historySearchTerm}
                              onChange={(e) => setHistorySearchTerm(e.target.value)}
                              placeholder="Search history term..."
                              className="w-full pl-8 pr-7 py-1.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg text-[11px] text-slate-200 focus:outline-none placeholder-slate-500 transition-all shadow-xs"
                            />
                            <div className="absolute left-2.5 top-[9px] text-slate-500 pointer-events-none">
                              <Search size={11} className="stroke-[2.5]" />
                            </div>
                            {historySearchTerm && (
                              <button
                                type="button"
                                onClick={() => setHistorySearchTerm('')}
                                className="absolute right-2.5 top-2 hover:bg-slate-800 p-0.5 rounded text-slate-400 hover:text-rose-400 cursor-pointer transition-colors"
                                title="Clear history term filter"
                              >
                                <X size={10} />
                              </button>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between gap-1 text-[11px]">
                            <span className="text-[9.5px] uppercase font-bold text-slate-500 tracking-wider shrink-0">Niche:</span>
                            <div className="relative w-full max-w-[170px]">
                              <select
                                value={historySelectedNiche}
                                onChange={(e) => setHistorySelectedNiche(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 text-slate-300 rounded-lg py-1 px-2 pr-6 text-[10.5px] focus:outline-none focus:border-indigo-500 cursor-pointer appearance-none transition-all font-semibold"
                              >
                                <option value="All">All Categories</option>
                                {AVAILABLE_NICHES.map((niche) => (
                                  <option key={niche} value={niche}>
                                    {niche}
                                  </option>
                                ))}
                              </select>
                              <div className="absolute right-2 top-2 text-[8px] text-slate-500 pointer-events-none">▼</div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="space-y-2 max-h-[290px] overflow-y-auto pr-1">
                        {(() => {
                          const filtered = recentSearches.filter(item => {
                            let passSearch = true;
                            if (historySearchTerm) {
                              const term = historySearchTerm.toLowerCase();
                              const matchesNiche = item.niche.toLowerCase().includes(term);
                              const matchesQuery = item.query ? item.query.toLowerCase().includes(term) : false;
                              passSearch = matchesNiche || matchesQuery;
                            }

                            let passNiche = true;
                            if (historySelectedNiche !== 'All') {
                              passNiche = item.niche.toLowerCase() === historySelectedNiche.toLowerCase();
                            }

                            return passSearch && passNiche;
                          });

                          if (filtered.length === 0) {
                            return (
                              <div className="text-center py-6 px-4 bg-slate-900/30 border border-dashed border-slate-900 rounded-lg">
                                <Search size={14} className="text-slate-600 mx-auto mb-1" />
                                <p className="text-[10.5px] text-slate-450 font-medium">No matching history found</p>
                                <p className="text-[9px] text-slate-500 mt-0.5">Try a different category filter</p>
                              </div>
                            );
                          }

                          return filtered.map((item) => {
                            const minutesAgo = Math.max(1, Math.round((Date.now() - item.timestamp) / 60000));
                            let timeString = `${minutesAgo}m ago`;
                            if (minutesAgo >= 60) {
                              const hours = Math.round(minutesAgo / 60);
                              timeString = hours === 1 ? '1h ago' : `${hours}h ago`;
                              if (hours >= 24) {
                                timeString = 'Yesterday';
                              }
                            }

                            return (
                              <div
                                key={item.id}
                                onClick={() => applyRecentSearch(item)}
                                className="group p-2.5 bg-slate-900/50 hover:bg-slate-900 border border-slate-900 hover:border-slate-800 rounded-lg cursor-pointer transition-all text-left flex justify-between items-start gap-2 shadow-sm"
                                title="Restore this deep-filtered outlet view"
                              >
                                <div className="space-y-1 w-full min-w-0">
                                  <div className="flex items-center justify-between gap-1 w-full">
                                    <span className="text-[11.5px] font-bold text-slate-200 truncate flex items-center gap-1 group-hover:text-indigo-400 transition-colors">
                                      <Search size={11} className="text-slate-500 shrink-0" />
                                      {item.query ? `"${item.query}"` : 'All Outlets Search'}
                                    </span>
                                    <span className="text-[9px] font-medium text-slate-500 shrink-0 select-none">
                                      {timeString}
                                    </span>
                                  </div>

                                  <div className="flex flex-wrap gap-1">
                                    <span className="text-[9px] font-bold bg-slate-800 text-slate-400 px-1 py-0.2 rounded capitalize">
                                      📂 {item.niche === 'All' ? 'All Niches' : item.niche}
                                    </span>

                                    {item.minDa > 0 && (
                                      <span className="text-[9px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-900/40 px-1 py-0.2 rounded">
                                        DA {item.minDa}+
                                      </span>
                                    )}
                                    {item.minDr > 0 && (
                                      <span className="text-[9px] font-bold bg-purple-950 text-purple-300 border border-purple-900/40 px-1 py-0.2 rounded">
                                        DR {item.minDr}+
                                      </span>
                                    )}
                                    {item.minTraffic > 0 && (
                                      <span className="text-[9px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-900/40 px-1 py-0.2 rounded">
                                        {(item.minTraffic / 1000).toFixed(0)}k+ Tra
                                      </span>
                                    )}
                                    {item.maxPrice < 1000 && (
                                      <span className="text-[9px] font-bold bg-amber-950 text-amber-300 border border-amber-900/40 px-1 py-0.2 rounded">
                                        &lt;${item.maxPrice}
                                      </span>
                                    )}
                                    {item.onlyLinkInsertion && (
                                      <span className="text-[9px] font-bold bg-violet-950 text-violet-300 border border-violet-900/40 px-1 py-0.2 rounded">
                                        🔗 Link Inserts
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={(e) => removeRecentSearch(item.id, e)}
                                  className="p-1 hover:bg-slate-800 hover:text-rose-400 text-slate-500 rounded transition-colors shrink-0 cursor-pointer"
                                  title="Remove search from history"
                                >
                                  <X size={11} />
                                </button>
                              </div>
                            );
                          });
                        })()}

                        {recentSearches.length === 0 && (
                          <div className="text-center py-6 px-4 bg-slate-900/20 border border-dashed border-slate-900 rounded-lg">
                            <Clock size={16} className="text-slate-600 mx-auto mb-1.5" />
                            <p className="text-[10px] text-slate-400 font-medium">No recent discoveries</p>
                            <p className="text-[9px] text-slate-500 mt-0.5 leading-normal">
                              Type queries or adjust metrics, then press Enter or Save to log histories.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Purchase details forms columns */}
                  <div className="lg:col-span-7 space-y-6">
                    {buyingSite ? (
                      <div className="bg-white border border-slate-200/80 rounded-xl w-full overflow-hidden shadow-sm">
                        
                        {/* Selected publication badge */}
                        <div className="p-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                          <div className="text-left">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-650 bg-indigo-50 px-2 py-0.5 rounded">
                              Selected Placement Outlet
                            </span>
                            <h3 className="text-base font-bold text-slate-900 mt-1">{buyingSite.domain}</h3>
                            {(() => {
                              const pubOrders = orders.filter(o => o.publisher === buyingSite.publisher);
                              const compOrders = pubOrders.filter(o => o.status === 'completed');
                              const rejOrders = pubOrders.filter(o => o.status === 'rejected');
                              const totConcl = compOrders.length + rejOrders.length;
                              const complRate = totConcl > 0 ? Math.round((compOrders.length / totConcl) * 105) : 100;
                              // bounded at 100 max
                              const finalComplRate = complRate > 100 ? 100 : complRate;
                              const isVerified = finalComplRate >= 90;
                              const isTop = (buyingSite.turnaround || 5) <= 5 && buyingSite.da >= 55;
                              return (
                                <div className="flex flex-wrap gap-1.5 items-center mt-2">
                                  <span className="text-[9px] font-bold bg-slate-200 px-1.5 py-0.5 rounded text-slate-600 capitalize">
                                    {buyingSite.niche}
                                  </span>
                                  {isVerified && (
                                    <span className="text-[9px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-250/20 px-1.5 py-0.5 rounded-md inline-flex items-center gap-1">
                                      <ShieldCheck size={11} className="text-emerald-600 stroke-[2.5]" />
                                      Verified Publisher ({finalComplRate}% completion)
                                    </span>
                                  )}
                                  {isTop && (
                                    <span className="text-[9px] font-extrabold text-amber-700 bg-amber-50 border border-amber-250/20 px-1.5 py-0.5 rounded-md inline-flex items-center gap-1">
                                      <Sparkles size={11} className="text-amber-500 stroke-[2.5]" />
                                      Top Performer (Fast Delivery)
                                    </span>
                                  )}
                                </div>
                              );
                            })()}
                          </div>
                          <button
                            type="button"
                            onClick={() => setBuyingSite(null)}
                            className="p-1.5 hover:bg-slate-200 rounded-full transition-all text-slate-400 hover:text-slate-700"
                          >
                            <X size={16} />
                          </button>
                        </div>

                        <form onSubmit={handlePlaceOrder} className="p-6 space-y-6">
                          {buyingSite.allowLinkInsertion && (
                            <div className="bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100 rounded-xl p-4 text-left">
                              <label className="block text-[10px] uppercase font-bold text-indigo-850 tracking-wider mb-2">⚡ ORDER TYPE SELECTION</label>
                              <div className="grid grid-cols-2 gap-3">
                                <button
                                  type="button"
                                  onClick={() => setPlacementType('Guest Post')}
                                  className={`py-2.5 px-4 text-xs font-bold rounded-lg border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                                    placementType === 'Guest Post'
                                      ? 'border-indigo-600 bg-white text-indigo-755 shadow-sm'
                                      : 'border-slate-200 bg-white/70 hover:bg-slate-100 text-slate-500'
                                  }`}
                                >
                                  <span className="font-extrabold flex items-center gap-1">✍️ Standard Guest Post</span>
                                  <span className="text-[10px] font-normal text-slate-400">Regular article placement (${buyingSite.price})</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setPlacementType('Link Insertion')}
                                  className={`py-2.5 px-4 text-xs font-bold rounded-lg border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                                    placementType === 'Link Insertion'
                                      ? 'border-violet-600 bg-white text-violet-755 shadow-sm'
                                      : 'border-slate-200 bg-white/70 hover:bg-slate-100 text-slate-500'
                                  }`}
                                >
                                  <span className="font-extrabold flex items-center gap-1">🔗 Existing Link Insertion</span>
                                  <span className="text-[10px] font-normal text-slate-400">Niche edit on premium page (${buyingSite.linkInsertionPrice || 50})</span>
                                </button>
                              </div>
                            </div>
                          )}

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">Target Destination URL</label>
                              <input
                                type="url"
                                placeholder="e.g. https://yoursite.com/services"
                                value={targetUrl}
                                onChange={e => setTargetUrl(e.target.value)}
                                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">Anchor placing text</label>
                              <input
                                type="text"
                                placeholder="e.g. Acme Cloud solutions"
                                value={anchorText}
                                onChange={e => setAnchorText(e.target.value)}
                                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
                                required
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {placementType === 'Link Insertion' ? (
                              <div className="bg-emerald-50 border border-emerald-250/20 rounded-xl p-3 text-left flex items-start gap-2 select-none">
                                <span className="text-emerald-600 font-bold text-base mt-0.5">💡</span>
                                <div>
                                  <span className="block text-xs font-black text-emerald-800 uppercase tracking-wide">Existing Niche edit</span>
                                  <p className="text-[10.5px] text-emerald-600 mt-0.5 leading-normal">
                                    No content creation is needed. The publisher will insert your backlink and anchor text directly into an existing, indexed post.
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1.5">Who writes the editorial pitch?</label>
                                <div className="grid grid-cols-2 gap-3">
                                  <button
                                    type="button"
                                    onClick={() => setWhoWrites('advertiser')}
                                    className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all ${
                                      whoWrites === 'advertiser'
                                        ? 'border-indigo-600 bg-indigo-50 text-indigo-755 font-bold'
                                        : 'border-slate-200 hover:bg-slate-150 text-slate-650'
                                    }`}
                                  >
                                    I provide draft (Advertiser)
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setWhoWrites('publisher')}
                                    className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all ${
                                      whoWrites === 'publisher'
                                        ? 'border-indigo-600 bg-indigo-50 text-indigo-755 font-bold'
                                        : 'border-slate-200 hover:bg-slate-150 text-slate-650'
                                    }`}
                                  >
                                    Publisher writes (+35% cost)
                                  </button>
                                </div>
                              </div>
                            )}
                            <div>
                              <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">Additional instructions or briefs</label>
                              <input
                                type="text"
                                placeholder={placementType === 'Link Insertion' ? "e.g. Please insert into healthy lifestyle blogs" : "e.g. Keep it in third person, focus on security issues"}
                                value={placementNotes}
                                onChange={e => setPlacementNotes(e.target.value)}
                                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
                              />
                            </div>
                          </div>

                          {/* Rich Placement Custom Options */}
                          {placementType !== 'Link Insertion' ? (
                            <div className="bg-slate-50/70 border border-slate-200/60 rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
                              <div>
                                <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Required Article Word Count</label>
                                <div className="flex gap-2">
                                  {[500, 800, 1200].map((num) => (
                                    <button
                                      key={num}
                                      type="button"
                                      onClick={() => setArticleMinWords(num)}
                                      className={`flex-1 py-1.5 px-2.5 text-xs font-bold rounded-lg border text-center transition-all ${
                                        articleMinWords === num
                                          ? 'border-indigo-600 bg-indigo-100/30 text-indigo-700'
                                          : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-100'
                                      }`}
                                    >
                                      {num} Words
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div className="flex items-center justify-between bg-white p-3 border border-slate-200/60 rounded-lg">
                                <div>
                                  <span className="block text-xs font-bold text-slate-700">Pre-pub Manual Review</span>
                                  <span className="text-[10px] text-slate-400 block leading-tight mt-0.5">Publisher must forward preview links before syndication.</span>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer select-none">
                                  <input
                                    type="checkbox"
                                    checked={reqPreApproval}
                                    onChange={(e) => setReqPreApproval(e.target.checked)}
                                    className="sr-only peer"
                                  />
                                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                                </label>
                              </div>
                            </div>
                          ) : null}

                          {/* Dynamic Content draft block */}
                          <div className="space-y-3.5 border-t border-slate-100 pt-5">
                            {placementType === 'Link Insertion' ? (
                              <div>
                                <h4 className="text-xs font-bold text-slate-900 text-left">Link Insertion Anchor Context Guidelines (Optional)</h4>
                                <p className="text-[11px] text-slate-500">Provide preferred surrounding text or describe existing articles you want this link placed in.</p>
                                <div className="space-y-1 mt-3">
                                  <textarea
                                    rows={3}
                                    placeholder="e.g. Try to place it in articles discussing remote dev teams or SaaS tools..."
                                    value={uploadContentText}
                                    onChange={e => setUploadContentText(e.target.value)}
                                    className="w-full p-3 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 bg-slate-50/50 resize-none"
                                  />
                                </div>
                              </div>
                            ) : (
                              <>
                                <div>
                                  <h4 className="text-xs font-bold text-slate-900 text-left">Syndication Content Brief & Draft</h4>
                                  <p className="text-[11px] text-slate-500">Provide an editorial brief or final draft text content below.</p>
                                </div>



                                <div className="space-y-1 mt-4">
                                  <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">Finalized Content Output (HTML or formatted text)</label>
                                  <textarea
                                    rows={4}
                                    placeholder="Finalized draft script text content..."
                                    value={uploadContentText}
                                    onChange={e => setUploadContentText(e.target.value)}
                                    className="w-full p-3 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 font-mono bg-slate-50/50 resize-none"
                                  />
                                </div>
                              </>
                            )}
                          </div>

                          {/* Submit controls */}
                          {(() => {
                            const currentPrice = placementType === 'Link Insertion'
                              ? (buyingSite.linkInsertionPrice || 50)
                              : (whoWrites === 'publisher' ? Math.round(buyingSite.price * 1.35) : buyingSite.price);
                            return (
                              <div className="border-t border-slate-100 pt-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="space-y-1 text-left">
                                  <span className="block text-xs text-slate-500">
                                    Total cost: <span className="font-extrabold text-slate-900 text-sm">${currentPrice.toFixed(2)}</span>
                                  </span>
                                  {user.wallet < currentPrice && (
                                    <span className="text-[10px] font-bold text-red-500 block">⚠️ Insufficient Wallet Balance!</span>
                                  )}
                                </div>
                                <button
                                  type="submit"
                                  disabled={user.wallet < currentPrice}
                                  className="bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-semibold text-xs px-5 py-3 rounded-xl shadow transition-all"
                                >
                                  Place Placement Order & Pay
                                </button>
                              </div>
                            );
                          })()}
                        </form>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-slate-200 rounded-2xl p-16 text-center text-slate-405 flex flex-col items-center justify-center gap-3">
                        <Globe size={48} className="text-slate-200" />
                        <h4 className="text-sm font-bold text-slate-800">No Outlet domain selected</h4>
                        <p className="text-xs text-slate-500 max-w-sm">
                          Select a publication site from the marketplace directory index on the left panel to configure layout pitches.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* MY SITES SCREEN (PUBLISHERS) */}
              {!scanningOrder && activeTab === 'sites' && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  {/* Sites list portfolio */}
                  <div className="md:col-span-8 space-y-4">
                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-4">
                        <div className="text-left">
                          <h4 className="text-sm font-black text-slate-900">Your Publication Portfolio</h4>
                          <p className="text-[11px] text-slate-400 font-medium">Manage and audit approval statuses of listed domains.</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-50 border border-slate-150 rounded-xl">
                          {(['all', 'approved', 'pending', 'rejected'] as const).map((filterVal) => {
                            const count = sites.filter(s => s.publisher === user.email && (filterVal === 'all' || s.status === filterVal)).length;
                            const isActive = pubSiteFilter === filterVal;
                            return (
                              <button
                                key={filterVal}
                                type="button"
                                onClick={() => setPubSiteFilter(filterVal)}
                                className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                                  isActive
                                    ? filterVal === 'approved'
                                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/15'
                                      : filterVal === 'rejected'
                                      ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/15'
                                      : filterVal === 'pending'
                                      ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/15'
                                      : 'bg-slate-900 text-white shadow-sm'
                                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-105'
                                }`}
                              >
                                <span>{filterVal}</span>
                                <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                                  isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                                }`}>
                                  {count}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      <div className="divide-y divide-slate-100">
                        {sites.filter(site => {
                          const isMine = site.publisher === user.email;
                          if (!isMine) return false;
                          if (pubSiteFilter === 'all') return true;
                          return site.status === pubSiteFilter;
                        }).map((site) => {
                          const isEditing = editingSite?.id === site.id;
                          return (
                            <div key={site.id} className="py-4 border-b border-slate-100 last:border-0 first:pt-0 last:pb-0">
                              {isEditing ? (
                                <div className="space-y-3.5 bg-slate-50/70 p-4 rounded-xl border border-slate-200/65 text-left mt-1">
                                  <div className="flex justify-between items-center">
                                    <h5 className="font-bold text-xs text-slate-700">Configure Listing Details: <span className="text-slate-900 underline font-black">{site.domain}</span></h5>
                                    <button
                                      type="button"
                                      onClick={() => setEditingSite(null)}
                                      className="text-[10px] font-bold text-slate-450 hover:text-slate-700 uppercase"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                  <div className="grid grid-cols-2 gap-3">
                                    <div>
                                      <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Placement Rate ($)</label>
                                      <input
                                        type="number"
                                        value={editPrice}
                                        onChange={(e) => setEditPrice(Number(e.target.value))}
                                        className="w-full p-2 text-xs border border-slate-200 rounded-lg block focus:outline-none focus:border-indigo-500 bg-white font-bold"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Monthly Organic Traffic</label>
                                      <input
                                        type="number"
                                        value={editTraffic}
                                        onChange={(e) => setEditTraffic(Number(e.target.value))}
                                        className="w-full p-2 text-xs border border-slate-200 rounded-lg block focus:outline-none focus:border-indigo-500 bg-white font-bold"
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Outlet Description</label>
                                    <textarea
                                      rows={2}
                                      value={editDesc}
                                      onChange={(e) => setEditDesc(e.target.value)}
                                      className="w-full p-2 text-xs border border-slate-200 rounded-lg block focus:outline-none focus:border-indigo-500 bg-white resize-none"
                                    />
                                  </div>
                                  <div className="bg-white/50 border border-slate-200/50 p-2.5 rounded-lg space-y-2">
                                    <label className="flex items-center gap-2 text-[10.5px] font-bold text-slate-600 cursor-pointer select-none">
                                      <input
                                        type="checkbox"
                                        checked={editAllowLinkInsertion}
                                        onChange={(e) => setEditAllowLinkInsertion(e.target.checked)}
                                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 text-xs"
                                      />
                                      Allow Existing Link Insertion / Niche Edits?
                                    </label>
                                    {editAllowLinkInsertion && (
                                      <div className="animated ease-out pl-6 space-y-1">
                                        <label className="block text-[9px] font-extrabold text-slate-500 uppercase">Link Insertion Rate ($)</label>
                                        <div className="relative max-w-[120px]">
                                          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">$</span>
                                          <input
                                            type="number"
                                            value={editLinkInsertionPrice}
                                            onChange={(e) => setEditLinkInsertionPrice(Number(e.target.value))}
                                            className="w-full pl-6 pr-2 py-1.5 text-xs border border-slate-200 rounded-lg block focus:outline-none focus:border-indigo-500 bg-white font-bold text-slate-800"
                                          />
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => handleSavePublisherSite(site.id)}
                                    className="px-3.5 py-1.5 bg-slate-900 border border-slate-900 hover:bg-slate-800 text-white font-bold text-[10.5px] rounded-lg transition-all shadow-sm"
                                  >
                                    Apply Listing Updates
                                  </button>
                                </div>
                              ) : (
                                <div className="flex justify-between items-center gap-4">
                                  <div className="text-left">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <h5 className="font-bold text-sm text-slate-900">{site.domain}</h5>
                                      {(() => {
                                        const publisherOrders = orders.filter(o => o.publisher === site.publisher);
                                        const completedOrders = publisherOrders.filter(o => o.status === 'completed');
                                        const rejectedOrders = publisherOrders.filter(o => o.status === 'rejected');
                                        const totalConcluded = completedOrders.length + rejectedOrders.length;
                                        const completionRateByOrders = totalConcluded > 0 ? Math.round((completedOrders.length / totalConcluded) * 100) : 100;
                                        const turnaroundByDays = site.turnaround || 5;

                                        const isVerifiedPublisher = completionRateByOrders >= 90;
                                        const isTopPerformer = turnaroundByDays <= 5 && site.da >= 55;

                                        return (
                                          <div className="flex flex-wrap gap-1 items-center">
                                            {isVerifiedPublisher && (
                                              <span className="text-[8px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200/40 px-1.5 py-0.5 rounded flex items-center gap-0.5" title={`Completion: ${completionRateByOrders}%`}>
                                                <ShieldCheck size={9} className="text-emerald-600" />
                                                Verified
                                              </span>
                                            )}
                                            {isTopPerformer && (
                                              <span className="text-[8px] font-extrabold text-amber-700 bg-amber-50 border border-amber-200/40 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                                <Sparkles size={9} className="text-amber-500" />
                                                Top Performer
                                              </span>
                                            )}
                                          </div>
                                        );
                                      })()}
                                    </div>
                                    <p className="text-[11.5px] text-slate-500 mt-1 line-clamp-1 max-w-md">{site.description}</p>
                                    <div className="flex flex-wrap gap-2.5 items-center mt-2 text-[10.5px] text-slate-400 font-bold">
                                      {(site.niche || '').split(',').map(n => n.trim()).filter(Boolean).map(n => (
                                        <span key={n} className="font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.2 rounded capitalize">{n}</span>
                                      ))}
                                      <span>DA Index: {site.da}</span>
                                      <span>DR Index: {site.dr}</span>
                                      <span>Traffic: {(site.traffic / 1000).toFixed(0)}K/mo</span>
                                      {site.allowLinkInsertion && (
                                        <span className="text-violet-600 bg-violet-50 border border-violet-150 px-1.5 py-0.2 rounded text-[10px] font-extrabold flex items-center gap-0.5 animate-pulse">
                                          🔗 Link Insert: ${site.linkInsertionPrice}
                                        </span>
                                      )}
                                    </div>
                                    {site.pendingChanges && (
                                      <div className="text-[10px] text-amber-700 mt-2.5 font-normal p-2.5 bg-amber-500/5 rounded-lg border border-amber-500/15 space-y-1 max-w-md text-left">
                                        <div className="font-bold underline text-[9.5px] uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                                          <span className="inline-block w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                                          Edits Pending Admin Moderation:
                                        </div>
                                        {site.pendingChanges.price !== undefined && site.pendingChanges.price !== site.price && (
                                          <div>• Proposed Price: <span className="line-through text-slate-400 font-medium">${site.price}</span> → <span className="font-bold text-slate-900">${site.pendingChanges.price}</span></div>
                                        )}
                                        {site.pendingChanges.traffic !== undefined && site.pendingChanges.traffic !== site.traffic && (
                                          <div>• Proposed Traffic: <span className="line-through text-slate-400 font-medium">{(site.traffic / 1000).toFixed(0)}K</span> → <span className="font-bold text-slate-900">{(site.pendingChanges.traffic / 1000).toFixed(0)}K</span></div>
                                        )}
                                        {site.pendingChanges.description !== undefined && site.pendingChanges.description !== site.description && (
                                          <div className="text-slate-500 italic">• Proposed Description: "{site.pendingChanges.description}"</div>
                                        )}
                                        {site.pendingChanges.allowLinkInsertion !== undefined && site.pendingChanges.allowLinkInsertion !== site.allowLinkInsertion && (
                                          <div>• Proposed Link Insertion: {site.pendingChanges.allowLinkInsertion ? 'Enabled' : 'Disabled'}</div>
                                        )}
                                        {site.pendingChanges.linkInsertionPrice !== undefined && site.pendingChanges.linkInsertionPrice !== site.linkInsertionPrice && (
                                          <div>• Proposed Insertion Price: <span className="line-through text-slate-400 font-medium">${site.linkInsertionPrice || 0}</span> → <span className="font-bold text-slate-900">${site.pendingChanges.linkInsertionPrice}</span></div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-3.5 shrink-0">
                                    <div className="text-right">
                                      <span className="block font-black text-slate-900 text-sm">${site.price} / placement</span>
                                      <span className={`px-2 py-[1.5px] rounded text-[9px] font-bold uppercase tracking-wider block mt-1.5 w-fit ml-auto ${
                                        site.status === 'approved'
                                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                          : site.status === 'pending'
                                          ? 'bg-amber-50 text-amber-600 border border-amber-100'
                                          : 'bg-red-50 text-red-600 border border-red-100'
                                      }`}>
                                        {site.status}
                                      </span>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setEditingSite(site);
                                        setEditPrice(site.pendingChanges?.price ?? site.price);
                                        setEditTraffic(site.pendingChanges?.traffic ?? site.traffic);
                                        setEditDesc(site.pendingChanges?.description ?? site.description);
                                        setEditAllowLinkInsertion(site.pendingChanges?.allowLinkInsertion ?? site.allowLinkInsertion ?? false);
                                        setEditLinkInsertionPrice(site.pendingChanges?.linkInsertionPrice ?? site.linkInsertionPrice ?? 50);
                                      }}
                                      className="px-2.5 py-1.5 text-[10px] font-extrabold border border-indigo-200 bg-indigo-50/45 hover:bg-slate-50 text-indigo-700 rounded-lg transition-all"
                                    >
                                      Manage Price / Info
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}

                        {sites.filter(site => {
                          const isMine = site.publisher === user.email;
                          if (!isMine) return false;
                          if (pubSiteFilter === 'all') return true;
                          return site.status === pubSiteFilter;
                        }).length === 0 && (
                          <div className="text-slate-400 text-center py-12 text-xs select-none space-y-1">
                            <p className="font-bold text-slate-500">No publication outlets found</p>
                            <p className="text-[11px] text-slate-400">There are no listing entries matching the filter tab.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Add Domain Intake Notice (Restricted to Admin Only) */}
                  <div className="md:col-span-4 bg-slate-50 border border-slate-200 rounded-xl p-5 text-left h-fit flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-black text-slate-900 mb-1">Add Publication Outlet</h4>
                      <p className="text-[11px] text-slate-400 mb-4 leading-normal">Publication outlet listings can only be created and registered by platform administrators.</p>
                      
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 space-y-2.5 text-left select-none mb-4">
                        <div className="flex items-center gap-1.5 text-amber-600">
                          <span className="text-sm font-bold">⚠️</span>
                          <span className="text-[10.5px] font-extrabold uppercase tracking-wide">Admin Intake Only</span>
                        </div>
                        <p className="text-[10.5px] text-slate-600 leading-normal">
                          Per community syndication rules, publishers can no longer directly submit self-add domains to prevent sandbox spam. 
                        </p>
                        <p className="text-[10.5px] text-slate-600 leading-normal">
                          Please contact an active **Platform Admin** directly inside the communications channel. Supply your website domain, category niche, performance stats (DA/DR/traffic), and placement rates for immediate professional onboarding.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <span className="block text-[9.5px] font-black uppercase text-slate-400 tracking-wider">Verified Publisher Score</span>
                        <div className="p-3 bg-white/85 border border-slate-200/60 rounded-xl flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-600">Account Payout Tier</span>
                          <span className="text-xs font-bold bg-amber-505/10 text-amber-650 px-2 py-0.5 rounded border border-amber-500/20">Premier A+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SITES INTAKE SCREEN (ADMINS ONLY) */}
              {!scanningOrder && activeTab === 'sites_admin' && (
                <div className="space-y-6">
                  {/* Register New Outlet Form Panel */}
                  <div className="bg-slate-900 text-slate-100 border border-slate-800 rounded-2xl p-6 shadow-lg text-left relative overflow-hidden">
                    <div className="absolute right-0 top-0 h-full w-1/4 bg-radial from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
                      <div>
                        <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                          <span className="bg-gradient-to-r from-amber-400 to-amber-200 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded-full">ADMIN</span>
                          <span>Onboard Website Publication Outlet</span>
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-1">Register domains, performance statistics and assign ownership to a publisher account.</p>
                      </div>

                      {/* Bulk Mode Toggle Switch */}
                      <div className="flex bg-slate-950/80 p-1 rounded-xl border border-slate-850 self-start sm:self-auto">
                        <button
                          type="button"
                          onClick={() => setBulkSitesMode('single')}
                          className={`px-3 py-1.5 rounded-lg text-[10.5px] font-black tracking-wide transition-all cursor-pointer ${
                            bulkSitesMode === 'single'
                              ? 'bg-indigo-600 text-white shadow-md'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          Single Site
                        </button>
                        <button
                          type="button"
                          onClick={() => setBulkSitesMode('bulk')}
                          className={`px-3 py-1.5 rounded-lg text-[10.5px] font-black tracking-wide transition-all cursor-pointer ${
                            bulkSitesMode === 'bulk'
                              ? 'bg-indigo-600 text-white shadow-md'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          Bulk JSON Onboarding
                        </button>
                      </div>
                    </div>

                    {bulkSitesMode === 'single' ? (
                      <form onSubmit={handleAddSite} className="grid grid-cols-1 md:grid-cols-12 gap-5 text-xs">
                        {/* Left: 4cols */}
                        <div className="md:col-span-4 space-y-3.5">
                          <div>
                            <label className="block text-[9.5px] font-black text-slate-400 uppercase tracking-widest mb-1">Website Domain Name</label>
                            <input
                              type="text"
                              placeholder="e.g. techblog.net"
                              value={newDomain}
                              onChange={e => handleDomainChange(e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                              required
                            />
                            <div className="flex justify-between items-center mt-1.5">
                              <button
                                type="button"
                                onClick={fetchDomainMetadata}
                                disabled={isFetchingMeta || !newDomain.trim()}
                                className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 px-2.5 py-1 rounded-lg border border-indigo-500/30 transition-all cursor-pointer disabled:opacity-50"
                              >
                                {isFetchingMeta ? (
                                  <>
                                    <span className="inline-block animate-spin">⏳</span> Fetching...
                                  </>
                                ) : (
                                  <>
                                    <span>🔍</span> Fetch Meta Details & Adapt Niche
                                  </>
                                )}
                              </button>
                            </div>
                          </div>

                          <div>
                            <label className="block text-[9.5px] font-black text-slate-400 uppercase tracking-widest mb-1">Assign Publisher Email</label>
                            <input
                              type="email"
                              placeholder="e.g. sarah@pub.com"
                              value={newSitePublisherEmail}
                              onChange={e => setNewSitePublisherEmail(e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-505 transition-colors"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-[9.5px] font-black text-slate-400 uppercase tracking-widest mb-1">Sample Post URL</label>
                            <input
                              type="url"
                              placeholder="e.g. https://techblog.net/sample-post"
                              value={newSamplePost}
                              onChange={e => setNewSamplePost(e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-505 transition-colors"
                            />
                          </div>

                          <div>
                            <label className="block text-[9.5px] font-black text-slate-400 uppercase tracking-widest mb-1">Description (Auto-selected)</label>
                            <textarea
                              rows={2}
                              placeholder="Auto-generated summary banner..."
                              value={newDesc}
                              onChange={e => setNewDesc(e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-505 transition-colors resize-none"
                            />
                          </div>
                        </div>

                        {/* Middle: 4cols */}
                        <div className="md:col-span-4 space-y-3.5">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[9.5px] font-black text-slate-400 uppercase tracking-widest mb-1">Domain Auth (DA)</label>
                              <input
                                type="number"
                                placeholder="e.g. 35"
                                value={newDa}
                                onChange={e => setNewDa(e.target.value === '' ? '' : Number(e.target.value))}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-[9.5px] font-black text-slate-400 uppercase tracking-widest mb-1">Domain Rating (DR)</label>
                              <input
                                type="number"
                                placeholder="e.g. 40"
                                value={newDr}
                                onChange={e => setNewDr(e.target.value === '' ? '' : Number(e.target.value))}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                required
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[9.5px] font-black text-slate-400 uppercase tracking-widest mb-1">Placing Price ($)</label>
                              <input
                                type="number"
                                placeholder="e.g. 120"
                                value={newPrice}
                                onChange={e => setNewPrice(e.target.value === '' ? '' : Number(e.target.value))}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-[9.5px] font-black text-slate-400 uppercase tracking-widest mb-1">Est. Traffic</label>
                              <input
                                type="number"
                                placeholder="e.g. 25000"
                                value={newTraffic}
                                onChange={e => setNewTraffic(e.target.value === '' ? '' : Number(e.target.value))}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                required
                              />
                            </div>
                          </div>

                          <div className="p-3.5 bg-slate-950/50 border border-slate-800 rounded-xl space-y-2.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[9.5px] font-black text-slate-400 uppercase tracking-widest">Allow Link Insertion</span>
                              <input
                                type="checkbox"
                                checked={newAllowLinkInsertion}
                                onChange={e => setNewAllowLinkInsertion(e.target.checked)}
                                className="w-4 h-4 text-indigo-650 bg-slate-950 border-slate-800 rounded focus:ring-indigo-500 cursor-pointer"
                              />
                            </div>
                            {newAllowLinkInsertion && (
                              <div className="flex items-center justify-between gap-2.5 animate-fadeIn">
                                <span className="text-[9.5px] font-bold text-slate-500">Insertion Rate ($)</span>
                                <input
                                  type="number"
                                  value={newLinkInsertionPrice}
                                  onChange={e => setNewLinkInsertionPrice(Number(e.target.value) || 0)}
                                  className="w-20 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-indigo-500 text-right"
                                />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Right: 4cols */}
                        <div className="md:col-span-4 space-y-3.5 flex flex-col justify-between">
                          <div className="space-y-3">
                            <div>
                              <label className="block text-[9.5px] font-black text-slate-400 uppercase tracking-widest mb-1">Category Niche(s)</label>
                              <select
                                value=""
                                onChange={e => {
                                  if (e.target.value) {
                                    handleToggleNiche(e.target.value);
                                  }
                                }}
                                className={`w-full bg-slate-950 border rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition-colors cursor-pointer ${
                                  isNicheManuallySelected 
                                    ? 'border-amber-500/60 focus:border-amber-500' 
                                    : 'border-slate-800 focus:border-indigo-500'
                                }`}
                              >
                                <option value="" disabled>+ Toggle Niche Category...</option>
                                {AVAILABLE_NICHES.map(niche => {
                                  const isSelected = newNiche.split(',').map(n => n.trim()).includes(niche);
                                  return (
                                    <option key={niche} value={niche}>
                                      {isSelected ? `✓ ${niche}` : niche}
                                    </option>
                                  );
                                })}
                              </select>

                              <div className="flex flex-wrap gap-1.5 mt-2 max-h-[80px] overflow-y-auto pr-1">
                                {newNiche.split(',').map(n => n.trim()).filter(Boolean).map(n => (
                                  <span 
                                    key={n} 
                                    className="inline-flex items-center gap-1 text-[9.5px] font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2 py-0.5 rounded-full"
                                  >
                                    {n}
                                    <button
                                      type="button"
                                      onClick={() => handleToggleNiche(n)}
                                      className="hover:text-rose-450 font-bold ml-0.5 text-[11px] cursor-pointer"
                                    >
                                      ×
                                    </button>
                                  </span>
                                ))}
                              </div>
                              
                              <div className="flex items-center gap-1.5 mt-2 text-[10px]">
                                {isNicheManuallySelected ? (
                                  <span className="inline-flex items-center gap-1 text-amber-400 animate-fadeIn font-medium">
                                    <span>✏️</span> Manually set
                                    <button 
                                      type="button" 
                                      onClick={() => {
                                        setIsNicheManuallySelected(false);
                                        const guessed = detectNicheFromDomain(newDomain, newDesc);
                                        setNewNiche(guessed);
                                        if (newDomain.trim()) {
                                          setNewDesc(`${newDomain.trim()} is an authoritative digital platform featuring curated premium articles, regular industry news, and high-impact resources on ${guessed.toLowerCase()} trends.`);
                                        }
                                      }} 
                                      className="text-[9px] hover:underline text-indigo-400 ml-1.5 cursor-pointer font-bold uppercase tracking-wider bg-transparent border-none p-0"
                                    >
                                      [Reset to Auto]
                                    </button>
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                                    <span>✨</span> Auto-detected from domain
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3.5">
                              <div>
                                <label className="block text-[9.5px] font-black text-slate-400 uppercase tracking-widest mb-1">Lifespan</label>
                                <select
                                  value={newLifespan}
                                  onChange={e => setNewLifespan(e.target.value)}
                                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                                >
                                  <option value="Permanent">Permanent</option>
                                  <option value="1 Year">1 Year</option>
                                  <option value="2 Years">2 Years</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-[9.5px] font-black text-slate-400 uppercase tracking-widest mb-1">Link Follow</label>
                                <select
                                  value={newDofollow ? 'true' : 'false'}
                                  onChange={e => setNewDofollow(e.target.value === 'true')}
                                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                                >
                                  <option value="true">Dofollow</option>
                                  <option value="false">Nofollow</option>
                                </select>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3.5">
                              <div>
                                <label className="block text-[9.5px] font-black text-slate-400 uppercase tracking-widest mb-1">Sponsored placement?</label>
                                <select
                                  value={newSponsoredTag ? 'true' : 'false'}
                                  onChange={e => setNewSponsoredTag(e.target.value === 'true')}
                                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                                >
                                  <option value="false">No (Clean)</option>
                                  <option value="true">Yes (Sponsored)</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-[9.5px] font-black text-slate-400 uppercase tracking-widest mb-1">Homepage Slot?</label>
                                <select
                                  value={newHomepageFeature ? 'true' : 'false'}
                                  onChange={e => setNewHomepageFeature(e.target.value === 'true')}
                                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-505 cursor-pointer"
                                >
                                  <option value="false">No (Standard)</option>
                                  <option value="true">Yes (Featured)</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          <div className="pt-2">
                            <button
                              type="submit"
                              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[11px] uppercase tracking-wider py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer border border-indigo-500"
                            >
                              <Plus size={14} /> Add Publication Outlet
                            </button>
                          </div>
                        </div>
                      </form>
                    ) : (
                      <form onSubmit={handleBulkSitesUpload} className="space-y-4 text-xs animate-fadeIn pb-2">
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <h5 className="font-extrabold text-[#818CF8] text-xs">Import Payload Ledger (JSON Array)</h5>
                              <p className="text-[10px] text-slate-400 mt-0.5">Supply multiple publication domains at once in a structured array formatting.</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const template = [
                                  {
                                    "domain": "huffpost-special.com",
                                    "da": 78,
                                    "dr": 82,
                                    "traffic": 140000,
                                    "niche": "News & Media",
                                    "price": 280,
                                    "publisher": "media@huffpost-special.com",
                                    "dofollow": true,
                                    "sponsoredTag": false,
                                    "homepageFeature": true,
                                    "description": "Premium news outlet focusing heavily on international currents and lifestyle reviews.",
                                    "allowLinkInsertion": true,
                                    "linkInsertionPrice": 90
                                  },
                                  {
                                    "domain": "smashingtech.org",
                                    "da": 62,
                                    "dr": 65,
                                    "traffic": 45000,
                                    "niche": "Technology",
                                    "price": 135,
                                    "publisher": "admin@smashingtech.org",
                                    "dofollow": true,
                                    "sponsoredTag": false,
                                    "homepageFeature": false
                                  }
                                ];
                                setBulkUploadJson(JSON.stringify(template, null, 2));
                                setBulkUploadError(null);
                                showToast("Populated bulk onboarding JSON template!", "info");
                              }}
                              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-850 text-indigo-400 hover:text-indigo-300 border border-indigo-950/80 rounded-lg text-[10px] font-bold transition-all cursor-pointer"
                            >
                              📋 Load Template Preset
                            </button>
                          </div>

                          <textarea
                            rows={8}
                            value={bulkUploadJson}
                            onChange={e => {
                              setBulkUploadJson(e.target.value);
                              if (bulkUploadError) setBulkUploadError(null);
                            }}
                            placeholder='[\n  {\n    "domain": "example.com",\n    "da": 45,\n    "dr": 42,\n    "traffic": 8500,\n    "niche": "Business",\n    "price": 95,\n    "publisher": "owner@example.com"\n  }\n]'
                            className="w-full bg-slate-900 border border-slate-850 rounded-xl p-3.5 text-xs text-indigo-300 font-mono focus:outline-none focus:border-indigo-500 transition-colors"
                          />

                          {bulkUploadError && (
                            <div className="p-3 bg-rose-950/40 border border-rose-900/50 text-rose-400 rounded-lg text-[10.5px] font-medium leading-relaxed font-mono">
                              ⚠️ {bulkUploadError}
                            </div>
                          )}

                          <div className="text-[10px] text-slate-400 leading-relaxed space-y-1 bg-slate-900/40 p-3 rounded-lg border border-slate-850">
                            <span className="block font-bold text-slate-300">💡 Field Schema Guide:</span>
                            <ul className="list-disc list-inside space-y-0.5">
                              <li><b className="text-white">domain</b> (required, string): e.g. "techblog.net"</li>
                              <li><b className="text-white">da / dr</b> (optional, number): Default is 50</li>
                              <li><b className="text-white">traffic</b> (optional, number): Monthly organic sessions, Default 10000</li>
                              <li><b className="text-white">niche</b> (optional, string): Technology, Health, Business, Fashion, Travel, Lifestyle, etc.</li>
                              <li><b className="text-white">price</b> (optional, number): Listing placement rate in USD, Default 150</li>
                              <li><b className="text-white">publisher</b> (optional, string): Onboarding owner email</li>
                              <li><b className="text-white">dofollow / sponsoredTag / allowLinkInsertion</b> (optional, boolean)</li>
                            </ul>
                          </div>
                        </div>

                        <div className="flex justify-end gap-3 text-xs pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              try {
                                if (!bulkUploadJson.trim()) {
                                  showToast("Please provide JSON data first.", "error");
                                  return;
                                }
                                const parsed = JSON.parse(bulkUploadJson);
                                if (!Array.isArray(parsed)) {
                                  setBulkUploadError("JSON must be a flat array of objects.");
                                  return;
                                }
                                showToast(`Syntax is perfectly valid! Found ${parsed.length} items ready for onboarding.`, "success");
                                setBulkUploadError(null);
                              } catch (err: any) {
                                setBulkUploadError(`Syntax check failed: ${err.message}`);
                              }
                            }}
                            className="px-4 py-2 bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-850 rounded-xl font-bold text-[11px] transition-all cursor-pointer"
                          >
                            🔍 Test Validate JSON
                          </button>
                          <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-750 text-white px-5 py-2 rounded-xl font-black text-[11px] uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md cursor-pointer border border-indigo-505"
                          >
                            🚀 Commit & Onboard Ledger
                          </button>
                        </div>
                      </form>
                    )}
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                      <h4 className="font-bold text-sm text-slate-800 text-left">Manage Listing Directory Admissions</h4>
                      <span className="text-xs text-slate-400 font-semibold">{sites.length} total domains registered</span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-slate-400 font-semibold border-b border-slate-100 uppercase text-[9.5px]">
                          <tr>
                            <th className="p-3.5">Outlet Domain</th>
                            <th className="p-3.5">Niche</th>
                            <th className="p-3.5">Metrics (DA/DR)</th>
                            <th className="p-3.5">publisher email</th>
                            <th className="p-3.5">Registered price</th>
                            <th className="p-3.5">Intake status</th>
                            <th className="p-3.5 text-right">Moderations actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-105">
                          {sites.map((site) => (
                            <tr key={site.id} className="hover:bg-slate-50/50">
                              {adminEditingSite?.id === site.id ? (
                                <>
                                  <td className="p-3.5 font-bold text-slate-900">{site.domain}</td>
                                  <td className="p-3.5">
                                    <div className="flex flex-wrap gap-1 max-w-[120px]">
                                      {(site.niche || '').split(',').map(n => n.trim()).filter(Boolean).map(n => (
                                        <span key={n} className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-semibold capitalize text-[9.5px] whitespace-nowrap">{n}</span>
                                      ))}
                                    </div>
                                  </td>
                                  <td className="p-3.5 space-y-1">
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-[10px] text-slate-400 font-bold">DA:</span>
                                      <input
                                        type="number"
                                        value={adminEditDa}
                                        onChange={(e) => setAdminEditDa(parseInt(e.target.value) || 0)}
                                        className="w-12 px-1.5 py-0.5 border border-slate-200 rounded text-[11px] font-bold focus:border-indigo-500 focus:outline-none"
                                      />
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-[10px] text-slate-400 font-bold">DR:</span>
                                      <input
                                        type="number"
                                        value={adminEditDr}
                                        onChange={(e) => setAdminEditDr(parseInt(e.target.value) || 0)}
                                        className="w-12 px-1.5 py-0.5 border border-slate-200 rounded text-[11px] font-bold focus:border-indigo-500 focus:outline-none"
                                      />
                                    </div>
                                  </td>
                                  <td className="p-3.5 text-slate-400 text-[11px] truncate max-w-[120px]" title={site.publisher}>
                                    {site.publisher}
                                  </td>
                                  <td className="p-3.5">
                                    <div className="flex items-center gap-1">
                                      <span className="text-slate-450 text-[10px] font-extrabold">$</span>
                                      <input
                                        type="number"
                                        value={adminEditPrice}
                                        onChange={(e) => setAdminEditPrice(parseInt(e.target.value) || 0)}
                                        className="w-16 px-1.5 py-0.5 border border-slate-200 rounded text-[11px] font-extrabold text-slate-850 focus:border-indigo-500 focus:outline-none"
                                      />
                                    </div>
                                  </td>
                                  <td className="p-3.5">
                                    <span className="px-2 py-0.5 rounded text-[9px] font-extrabold uppercase bg-indigo-50 text-indigo-600 border border-indigo-100 animate-pulse">
                                      MOD EDITING
                                    </span>
                                  </td>
                                  <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                                    <button
                                      type="button"
                                      onClick={() => handleAdminSaveSite(site.id)}
                                      className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[10px] rounded cursor-pointer transition-all shadow-sm"
                                    >
                                      Save
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setAdminEditingSite(null)}
                                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-[10px] rounded cursor-pointer transition-all border border-slate-200/40"
                                    >
                                      Cancel
                                    </button>
                                  </td>
                                </>
                              ) : (
                                <>
                                  <td className="p-3.5 font-bold text-slate-900">
                                    <div>{site.domain}</div>
                                    {site.pendingChanges && (
                                      <div className="text-[10px] text-amber-700 mt-2 font-normal p-2.5 bg-amber-500/5 rounded-lg border border-amber-500/15 space-y-1 max-w-[220px]">
                                        <div className="font-extrabold text-[9px] uppercase tracking-wider text-amber-800">Proposed Edits:</div>
                                        {site.pendingChanges.price !== undefined && site.pendingChanges.price !== site.price && (
                                          <div>• Price: <span className="line-through text-slate-400">${site.price}</span> → <span className="font-bold text-slate-900">${site.pendingChanges.price}</span></div>
                                        )}
                                        {site.pendingChanges.traffic !== undefined && site.pendingChanges.traffic !== site.traffic && (
                                          <div>• Traffic: <span className="line-through text-slate-400">{(site.traffic / 1000).toFixed(0)}K</span> → <span className="font-bold text-slate-900">{(site.pendingChanges.traffic / 1000).toFixed(0)}K</span></div>
                                        )}
                                        {site.pendingChanges.description !== undefined && site.pendingChanges.description !== site.description && (
                                          <div className="text-slate-500 italic truncate max-w-[200px]" title={site.pendingChanges.description}>• Bio: "{site.pendingChanges.description}"</div>
                                        )}
                                        {site.pendingChanges.allowLinkInsertion !== undefined && site.pendingChanges.allowLinkInsertion !== site.allowLinkInsertion && (
                                          <div>• Link Insertion: {site.pendingChanges.allowLinkInsertion ? 'Enabled' : 'Disabled'}</div>
                                        )}
                                        {site.pendingChanges.linkInsertionPrice !== undefined && site.pendingChanges.linkInsertionPrice !== site.linkInsertionPrice && (
                                          <div>• LI Price: <span className="line-through text-slate-400">${site.linkInsertionPrice || 0}</span> → <span className="font-bold text-slate-900">${site.pendingChanges.linkInsertionPrice}</span></div>
                                        )}
                                      </div>
                                    )}
                                  </td>
                                  <td className="p-3.5">
                                    <div className="flex flex-wrap gap-1 max-w-[140px]">
                                      {(site.niche || '').split(',').map(n => n.trim()).filter(Boolean).map(n => (
                                        <span key={n} className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-semibold capitalize text-[10px] whitespace-nowrap">{n}</span>
                                      ))}
                                    </div>
                                  </td>
                                  <td className="p-3.5">DA {site.da} • DR {site.dr}</td>
                                  <td className="p-3.5 text-slate-500">{site.publisher}</td>
                                  <td className="p-3.5 font-black text-slate-850">${site.price}</td>
                                  <td className="p-3.5">
                                    <div className="space-y-1">
                                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase block w-fit ${
                                        site.status === 'approved'
                                          ? 'bg-emerald-50 text-emerald-600'
                                          : site.status === 'pending'
                                          ? 'bg-amber-50 text-amber-600'
                                          : 'bg-red-50 text-red-600'
                                      }`}>
                                        {site.status}
                                      </span>
                                      {site.pendingChanges && (
                                        <span className="px-1.5 py-0.5 rounded text-[8.5px] font-extrabold uppercase bg-amber-500/10 text-amber-700 border border-amber-500/10 block w-fit animate-pulse">
                                          Changes Proposed
                                        </span>
                                      )}
                                    </div>
                                  </td>
                                  <td className="p-3.5 text-right whitespace-nowrap">
                                    <div className="flex flex-wrap items-center justify-end gap-1 px-1">
                                      {site.status === 'pending' && (
                                        <>
                                          <button
                                            type="button"
                                            onClick={() => handleAdminApproveSite(site.id, 'approved')}
                                            className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded cursor-pointer"
                                          >
                                            Approve
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => handleAdminApproveSite(site.id, 'rejected')}
                                            className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white font-bold text-[10px] rounded cursor-pointer"
                                          >
                                            Reject
                                          </button>
                                        </>
                                      )}
                                      {site.pendingChanges && (
                                        <div className="flex gap-1 bg-amber-500/15 p-1 rounded border border-amber-500/10 mr-1.5">
                                          <button
                                            type="button"
                                            onClick={() => handleAdminApproveSiteChanges(site.id)}
                                            className="px-2 py-1 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-[10px] rounded cursor-pointer"
                                            title="Approve Proposed Edits"
                                          >
                                            Approve Edits
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => handleAdminRejectSiteChanges(site.id)}
                                            className="px-2 py-1 bg-slate-500 hover:bg-slate-600 text-white font-bold text-[10px] rounded cursor-pointer"
                                            title="Reject Proposed Edits"
                                          >
                                            Reject Edits
                                          </button>
                                        </div>
                                      )}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setAdminEditingSite(site);
                                        setAdminEditPrice(site.price);
                                        setAdminEditDa(site.da);
                                        setAdminEditDr(site.dr);
                                      }}
                                      className="px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-750 font-bold text-[10px] rounded cursor-pointer border border-indigo-100/50"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleAdminDeleteSite(site.id)}
                                      className="px-2 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-[10px] rounded cursor-pointer"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </td>
                                </>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* RESOURCE BLOGS EDITOR (ADMIN ONLY) */}
              {!scanningOrder && activeTab === 'blogs_admin' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Create Blog Form */}
                  <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-sm text-left">
                    <h4 className="text-sm font-bold text-slate-900 mb-1">Publish Blog Post</h4>
                    <p className="text-[11px] text-slate-500 mb-4">Blog posts are displayed directly on the logged-out landing page.</p>

                    <form onSubmit={handleAdminCreateBlog} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Article title</label>
                        <input
                          type="text"
                          placeholder="e.g. Backlink trends for Q2 2026"
                          value={newBlogTitle}
                          onChange={e => setNewBlogTitle(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Brief Summary</label>
                        <input
                          type="text"
                          placeholder="e.g. A quick guide detailing dofollow attributes..."
                          value={newBlogSummary}
                          onChange={e => setNewBlogSummary(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Article Body Content (Markdown/HTML Support)</label>
                        <textarea
                          rows={6}
                          placeholder="<h2>Introduce your sub-topics</h2><p>Provide insights...</p>"
                          value={newBlogContent}
                          onChange={e => setNewBlogContent(e.target.value)}
                          className="w-full p-2.5 text-xs font-serif border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 resize-none bg-white font-light text-slate-700"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-2.5 px-4 rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-sm"
                      >
                        <Check size={14} /> Commit & Sync Blog Post
                      </button>
                    </form>
                  </div>

                  {/* Active Blogs List */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm text-left">
                      <h4 className="text-sm font-bold text-slate-900 mb-4">Live SEO Resource Articles</h4>
                      <div className="divide-y divide-slate-100">
                        {blogs.map(blog => (
                          <div key={blog.id} className="py-4 first:pt-0 last:pb-0 flex justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <h5 className="font-bold text-sm text-slate-905 truncate">{blog.title}</h5>
                              <p className="text-slate-500 text-xs line-clamp-2 mt-1 leading-relaxed">{blog.summary}</p>
                              <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-400 font-bold">
                                <span>PUBLISHED BY: {blog.author.toUpperCase()}</span>
                                <span>•</span>
                                <span>{blog.date}</span>
                              </div>
                            </div>
                            <span className="text-[10px] bg-indigo-50 text-indigo-650 h-5 px-2 py-0.5 rounded font-bold shrink-0">
                              Live
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ORDERS SCREEN (ADVERTISERS & PUBLISHERS & ADMINS) */}
              {!scanningOrder && (activeTab === 'orders' || activeTab === 'orders_admin') && (
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-slate-50/50">
                    <div className="text-left">
                      <h4 className="font-bold text-sm text-slate-800">Placement Orders Checklist</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Manage backlink placements, submit live articles, and execute scans.</p>
                    </div>
                    <span className="text-xs bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-3 py-1 rounded-full font-bold self-start sm:self-auto border border-indigo-100">
                      {userOrdersList.length} Total Placements
                    </span>
                  </div>

                  {/* Dynamic Status Filters row */}
                  <div className="flex flex-wrap border-b border-slate-100 bg-slate-50 p-2 gap-1 justify-start">
                    {['all', 'pending', 'in_progress', 'completed', 'rejected'].map((statusKey) => (
                      <button
                        key={statusKey}
                        type="button"
                        onClick={() => setOrderFilterStatus(statusKey)}
                        className={`px-3.5 py-1.5 text-[11px] font-bold rounded-lg transition-all capitalize ${
                          orderFilterStatus === statusKey
                            ? 'bg-slate-900 text-white shadow-sm'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                        }`}
                      >
                        {statusKey.replace('_', ' ')} ({
                          statusKey === 'all' 
                            ? userOrdersList.length 
                            : userOrdersList.filter(o => o.status === statusKey).length
                        })
                      </button>
                    ))}
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-400 font-semibold border-b border-slate-100 uppercase text-[9.5px]">
                        <tr>
                          <th className="p-3.5">ID</th>
                          <th className="p-3.5">Domain</th>
                          <th className="p-3.5">Target link / Anchor</th>
                          <th className="p-3.5">Amount ($)</th>
                          <th className="p-3.5">Status Checking</th>
                          <th className="p-3.5">Published url</th>
                          <th className="p-3.5 text-right">Syndication actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-105">
                        {filteredUserOrdersList.map((ord) => {
                          const orderFiles = files.filter(f => f.orderId === ord.id);
                          return (
                            <tr key={ord.id} className="hover:bg-slate-50/50">
                              <td className="p-3.5 text-left">
                                <div className="font-bold text-slate-900">{ord.id}</div>
                                <span className="text-[9.5px] text-slate-400 block">{ord.date}</span>
                              </td>
                              <td className="p-3.5 text-left">
                                <span className="font-bold text-slate-800">{ord.site}</span>
                                <span className="block text-[10px] text-slate-400 lowercase italic">Via: {ord.whoWrites === 'advertiser' ? 'brief' : 'copywriting'}</span>
                              </td>
                              <td className="p-3.5 max-w-xs text-left">
                                <div className="font-bold text-indigo-700 truncate" title={ord.targetUrl}>
                                  {ord.targetUrl}
                                </div>
                                <div className="text-slate-500 font-medium truncate mt-0.5">
                                  Anchor: "{ord.anchorText}"
                                </div>
                                {orderFiles.length > 0 && (
                                  <div className="mt-1 flex items-center gap-1 text-[10px] text-indigo-650 bg-indigo-50/60 font-bold px-1.5 py-0.5 rounded w-fit inline-flex border border-indigo-100">
                                    📄 Pitch Brief Attached
                                  </div>
                                )}
                              </td>
                              <td className="p-3.5 font-bold text-slate-850">
                                ${ord.amount.toFixed(2)}
                              </td>
                              <td className="p-3.5 text-left font-semibold">
                                <div className="space-y-1.5">
                                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase max-w-fit block ${
                                    ord.status === 'completed'
                                      ? 'bg-emerald-50 text-emerald-600'
                                      : ord.status === 'in_progress'
                                      ? 'bg-indigo-50 text-indigo-600'
                                      : ord.status === 'rejected'
                                      ? 'bg-rose-50 text-rose-600'
                                      : 'bg-slate-100 text-slate-600'
                                  }`}>
                                    {ord.status.replace('_', ' ')}
                                  </span>
                                  {ord.status === 'completed' && (
                                    <span className={`inline-flex items-center gap-1.5 text-[9.5px] font-extrabold tracking-wide uppercase px-1.5 py-0.2 rounded ${
                                      ord.backlinkStatus === 'success' ? 'text-emerald-600' : 'text-amber-500'
                                    }`}>
                                      🛡️ {ord.backlinkStatus === 'success' ? 'Scanner live' : 'scan pending'}
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="p-3.5 max-w-xs text-left text-xs font-semibold">
                                {ord.publishedUrl ? (
                                  <a
                                    href={ord.publishedUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-600 hover:text-indigo-600 flex items-center gap-1 underline break-all font-semibold"
                                  >
                                    View Article <ExternalLink size={12} />
                                  </a>
                                ) : (
                                  <span className="text-slate-400 italic">None submitted yet</span>
                                )}
                              </td>
                              <td className="p-3.5 text-right space-y-1.5 min-w-[155px]">
                                {user.role === 'publisher' && ord.status !== 'completed' && ord.status !== 'rejected' && (
                                  <div className="flex flex-col items-end gap-1.5">
                                    {ord.status === 'pending' && (
                                      <div className="flex gap-1 w-full">
                                        <button
                                          type="button"
                                          onClick={() => handlePublisherAcceptOrder(ord.id)}
                                          className="flex-1 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold rounded cursor-pointer transition-all shadow-sm"
                                        >
                                          Accept
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => handlePublisherRejectOrder(ord.id)}
                                          className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 text-[10px] font-bold rounded cursor-pointer border border-rose-100/50 transition-all text-center"
                                        >
                                          Reject
                                        </button>
                                      </div>
                                    )}
                                    {ord.status === 'in_progress' && (
                                      <>
                                        <input
                                          type="url"
                                          placeholder="https://live-link.com/article"
                                          id={`liveUrl_${ord.id}`}
                                          className="w-full px-2 py-1 text-xs border border-slate-205 rounded font-medium focus:outline-none focus:border-slate-800"
                                        />
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const el = document.getElementById(`liveUrl_${ord.id}`) as HTMLInputElement;
                                            if (el?.value) {
                                              handlePublisherUpdateLiveLink(ord.id, el.value);
                                            } else {
                                              showToast('Please type a live URL before submitting.', 'info');
                                            }
                                          }}
                                          className="w-full px-2.5 py-1 bg-slate-900 border border-slate-905 hover:bg-slate-800 text-white text-[10px] font-bold rounded cursor-pointer shrink-0 transition-all shadow-sm"
                                        >
                                          Submit Live Link
                                        </button>
                                      </>
                                    )}
                                  </div>
                                )}

                                {orderFiles.length > 0 && (
                                  <button
                                    type="button"
                                    onClick={() => setViewingDraftOrder(ord)}
                                    className="w-full px-2.5 py-1 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 text-[10px] font-bold rounded block text-center"
                                  >
                                    View Editorial Draft
                                  </button>
                                )}

                                {user.role === 'admin' && ord.status !== 'rejected' && (
                                  <button
                                    type="button"
                                    onClick={() => handleAdminCancelOrder(ord.id)}
                                    className="w-full px-2.5 py-1 text-red-700 bg-red-50 hover:bg-red-100 border border-red-100 text-[10px] font-bold rounded block text-center"
                                  >
                                    Refund & Cancel Order
                                  </button>
                                )}

                                {ord.status === 'completed' && (
                                  <button
                                    type="button"
                                    onClick={() => setScanningOrder(ord)}
                                    className="px-2.5 py-1.5 bg-indigo-600 border border-indigo-700 hover:bg-indigo-700 text-white text-[10.5px] font-extrabold rounded flex items-center gap-1 cursor-pointer w-full justify-center shadow"
                                  >
                                    ⚡ Run verification scanner
                                  </button>
                                )}

                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveTab('chats');
                                    setActiveChatRoom(ord.id);
                                  }}
                                  className="px-2.5 py-1 text-slate-705 border border-slate-200 hover:bg-slate-50 text-[10.5px] font-bold rounded block w-full text-center"
                                >
                                  Discuss Briefly
                                </button>
                              </td>
                            </tr>
                          );
                        })}

                        {filteredUserOrdersList.length === 0 && (
                          <tr>
                            <td colSpan={7} className="text-center py-16 text-slate-400">
                              No orders linked to your profile in placements checklist.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Dynamic Inspect Content Popup/Modal Drawer */}
                  {viewingDraftOrder && (
                    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-100 shadow-2xl flex flex-col max-h-[85vh]">
                        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-2xl bg-slate-50">
                          <div className="text-left bg-slate-50">
                            <span className="text-[9px] uppercase font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Inspect Editorial Draft</span>
                            <h3 className="text-sm font-bold text-slate-900 mt-1">Pitch Brief for Order: {viewingDraftOrder.id}</h3>
                          </div>
                          <button
                            type="button"
                            onClick={() => setViewingDraftOrder(null)}
                            className="p-1 px-2.5 text-xs text-slate-500 hover:text-slate-850 border border-slate-200 rounded-lg hover:bg-slate-100 font-bold transition-all"
                          >
                            Close Viewer
                          </button>
                        </div>
                        <div className="p-6 overflow-y-auto space-y-4 text-left">
                          <div>
                            <span className="block text-[10px] font-bold text-slate-400 uppercase">Target Domain</span>
                            <span className="text-xs font-bold text-slate-800">{viewingDraftOrder.site}</span>
                          </div>
                          <div>
                            <span className="block text-[10px] font-bold text-slate-400 uppercase">Metadata Notes</span>
                            <span className="text-xs font-semibold text-slate-700 bg-slate-50 p-2.5 rounded block border border-slate-200/50 mt-1">{viewingDraftOrder.notes || 'None provided'}</span>
                          </div>
                          <div>
                            <span className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Draft HTML Script Content</span>
                            <div className="bg-slate-950 text-slate-150 rounded-xl p-4 font-mono text-[11px] leading-relaxed select-all whitespace-pre-wrap max-h-[300px] overflow-y-auto border border-slate-800">
                              {files.find(f => f.orderId === viewingDraftOrder.id)?.content || 'No text content loaded.'}
                            </div>
                            <span className="text-[9px] text-slate-400 block mt-2 text-right">💡 Tip: Double-click inside the dark box to select all text to paste onto your CMS.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* MESSAGES SCREEN */}
              {!scanningOrder && activeTab === 'chats' && (
                <ChatsView
                  user={user}
                  orders={orders}
                  chats={chats}
                  onSendMessage={handleSendMessage}
                  activeRoomId={activeChatRoom}
                  onSetActiveRoomId={setActiveChatRoom}
                  users={users}
                />
              )}

              {/* WALLET DEPOSITS & payouts MANAGER */}
              {!scanningOrder && activeTab === 'wallet' && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  {/* Account overview card */}
                  <div className="md:col-span-8 space-y-6">
                    <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 relative overflow-hidden text-left">
                      <div className="relative z-10 space-y-4">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Authority Media Escrow</span>
                          <h4 className="text-base font-bold text-slate-100 flex items-center gap-1.5 mt-1">
                            <Landmark size={18} /> Placements Wallet Account
                          </h4>
                        </div>
                        
                        <div>
                          <span className="block text-slate-400 text-xs">Available Escrow Balance</span>
                          <span className="text-3xl font-black text-white">$ {user.wallet.toFixed(2)} USD</span>
                        </div>

                        <div className="border-t border-slate-800 pt-4 flex justify-between text-xs text-slate-400">
                          <span>Verified Placements Value: ${(userOrdersList.filter(o => o.status === 'completed').reduce((acc, curr) => acc + curr.amount, 0)).toFixed(2)}</span>
                          <span>Compliance Status: Secured</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200/85 rounded-xl p-6 shadow-sm text-left">
                      <h4 className="text-sm font-bold text-slate-900 mb-4">Payout Transaction History</h4>
                      <div className="overflow-x-auto text-xs">
                        <table className="w-full text-left">
                          <thead className="bg-slate-50 text-slate-400 font-semibold border-b border-slate-100 uppercase text-[9.5px]">
                            <tr>
                              <th className="p-3">Reference ID</th>
                              <th className="p-3">Channel Option</th>
                              <th className="p-3">Verification Logs</th>
                              <th className="p-3">Deduction amount</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 divide-dotted">
                            {userOrdersList.map((ord) => (
                              <tr key={ord.id} className="hover:bg-slate-50/50">
                                <td className="p-3 font-semibold text-slate-700">PAY-REF-{(Math.random() * 1000).toFixed(0)}-{ord.id}</td>
                                <td className="p-3 text-slate-500">PayPal Express Syndi</td>
                                <td className="p-3">
                                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                                    ✓ Escrow Disbursed
                                  </span>
                                </td>
                                <td className="p-3 font-bold text-slate-800">${ord.amount}</td>
                              </tr>
                            ))}

                            {userOrdersList.length === 0 && (
                              <tr>
                                <td colSpan={4} className="text-center py-6 text-slate-400 italic">
                                  No escrow balances disbursed.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Actions column based on Role (Deposit or Widthraw simulation) */}
                  <div className="md:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-sm text-left">
                    {user.role === 'advertiser' || user.role === 'admin' ? (
                      <div className="space-y-4">
                        <h4 className="text-sm font-bold text-slate-900 mb-1">Replenish Escrow Balance</h4>
                        <p className="text-[11px] text-slate-500 mb-4">Simulate instant deposit to clear publication backlog.</p>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => handleAddFunds(500)}
                            className="bg-slate-50 hover:bg-slate-100 border border-slate-200 p-3 rounded-lg text-center"
                          >
                            <span className="block text-slate-400 text-[10px] font-bold">REPLENISH DEP</span>
                            <span className="text-xs font-black text-slate-900">+$ 500</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAddFunds(1000)}
                            className="bg-slate-50 hover:bg-slate-100 border border-slate-200 p-3 rounded-lg text-center"
                          >
                            <span className="block text-slate-400 text-[10px] font-bold">REPLENISH DEP</span>
                            <span className="text-xs font-black text-slate-900">+$ 1,000</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAddFunds(2500)}
                            className="col-span-2 bg-indigo-50 hover:bg-indigo-100/50 border border-indigo-150 p-3.5 rounded-lg text-center transition-all"
                          >
                            <span className="block text-indigo-500 text-[10px] font-bold">ENTERPRISE ROLLOUT</span>
                            <span className="text-xs font-black text-indigo-900">+$ 2,500</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <h4 className="text-sm font-bold text-indigo-900 mb-1">Initiate Payout Transfer</h4>
                        <p className="text-[11px] text-slate-500 mb-4">Request disbursement of accrued publisher commission balance.</p>
                        
                        <button
                          type="button"
                          disabled={user.wallet < 300}
                          onClick={() => handleRequestPayout(300)}
                          className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-semibold text-xs py-3 px-4 rounded-xl shadow transition-all block text-center"
                        >
                          Disburse Min Threshold: $300.00
                        </button>
                        <button
                          type="button"
                          disabled={user.wallet < 1000}
                          onClick={() => handleRequestPayout(1000)}
                          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold text-xs py-3 px-4 rounded-xl shadow transition-all block text-center"
                        >
                          Disburse Batch Earning: $1,000.00
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* PUBLISHER PROFILE & TRUST CENTER (PUBLISHERS) */}
              {!scanningOrder && activeTab === 'publisher_profile' && (
                <div className="space-y-6 text-left max-w-5xl mx-auto">
                  {/* Top Header Card */}
                  <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 overflow-hidden text-white rounded-2xl p-6 shadow-md border border-slate-850 relative">
                    <div className="absolute right-0 top-0 h-full w-1/3 bg-radial from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div>
                        <span className="text-[9px] uppercase font-black tracking-widest text-indigo-400 bg-indigo-950/80 px-2.5 py-1 rounded border border-indigo-900/45">
                          PLATFORM VERIFICATION & REPUTATION ENGINE
                        </span>
                        <h3 className="text-xl font-bold text-white mt-2 flex items-center gap-2">
                          <span>Verified Publisher Hub</span>
                          {idStatus === 'verified' && (
                            <span className="text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full px-2 py-0.5 flex items-center gap-0.5 animate-pulse">
                              ✓ SECURED
                            </span>
                          )}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">Manage corporate identity papers, measure order fulfillments, and progress your platform credibility status tiered badges.</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleSimulateIdApprove('verified')}
                          className="px-2.5 py-1.5 rounded-lg border border-emerald-500/35 bg-emerald-950/20 text-emerald-400 hover:bg-emerald-950/50 text-[10px] font-black transition-all"
                        >
                          Simulate Verify
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSimulateIdApprove('unverified')}
                          className="px-2.5 py-1.5 rounded-lg border border-red-500/35 bg-red-955/20 text-rose-400 hover:bg-red-955/50 text-[10px] font-black transition-all"
                        >
                          Simulate Reset
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Two Column Layout Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Left Column: Trusted Publisher Badge progress */}
                    <div className="md:col-span-6 space-y-6">
                      {/* Rep Center */}
                      {(() => {
                        const myOrders = orders.filter(o => o.publisher === user?.email);
                        const myCompletedCount = myOrders.filter(o => o.status === 'completed').length;
                        
                        // Tier threshold calculations
                        let currentTier = 'Bronze Publisher';
                        let currentTierDesc = 'Beginner outlet seller establishing turnaround trust metrics.';
                        let nextTierName = 'Silver Trusted Publisher';
                        let targetCount = 3;
                        let badgeGradient = 'from-amber-700 via-amber-850 to-orange-750';
                        let badgeShadow = 'shadow-amber-500/10';

                        if (myCompletedCount >= 20) {
                          currentTier = 'Platinum Elite Publisher';
                          currentTierDesc = 'Top platform performer displaying absolute operational excellence.';
                          nextTierName = 'Max Level Reached';
                          targetCount = 20;
                          badgeGradient = 'from-teal-300 via-indigo-400 to-emerald-450';
                          badgeShadow = 'shadow-indigo-500/20';
                        } else if (myCompletedCount >= 10) {
                          currentTier = 'Gold Trusted Publisher';
                          currentTierDesc = 'Premium ranking seller with superb fulfillment and metrics scores.';
                          nextTierName = 'Platinum Elite Publisher';
                          targetCount = 20;
                          badgeGradient = 'from-yellow-405 via-amber-500 to-yellow-600';
                          badgeShadow = 'shadow-yellow-500/15';
                        } else if (myCompletedCount >= 3) {
                          currentTier = 'Silver Trusted Publisher';
                          currentTierDesc = 'Acreed placement outlets provider driving stable publication rates.';
                          nextTierName = 'Gold Trusted Publisher';
                          targetCount = 10;
                          badgeGradient = 'from-slate-400 via-slate-500 to-zinc-650';
                          badgeShadow = 'shadow-slate-400/10';
                        }

                        const progressPercent = Math.min((myCompletedCount / targetCount) * 100, 100);

                        return (
                          <div className="bg-white border border-slate-205 rounded-2xl p-6 shadow-sm space-y-5">
                            <div className="border-b border-slate-100 pb-3">
                              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">PLATFORM RANKING BADGE</h4>
                              <p className="text-xs text-slate-500 mt-0.5">Automated quality badge level evaluated via verified publisher order deliveries.</p>
                            </div>

                            {/* Badge visual banner */}
                            <div className={`p-4 rounded-xl bg-gradient-to-br ${badgeGradient} text-white shadow-md ${badgeShadow} flex gap-4 items-center`}>
                              <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-xl shrink-0 border border-white/20">
                                {myCompletedCount >= 20 ? '👑' : myCompletedCount >= 10 ? '🥇' : myCompletedCount >= 3 ? '🥈' : '🥉'}
                              </div>
                              <div className="text-left space-y-0.5">
                                <span className="text-[9px] font-black uppercase tracking-widest text-white/80">TRUST LEVEL</span>
                                <h3 className="text-base font-extrabold text-white">{currentTier}</h3>
                                <p className="text-[11px] text-white/90 leading-tight">{currentTierDesc}</p>
                              </div>
                            </div>

                            {/* Stats Counter Row */}
                            <div className="grid grid-cols-2 gap-4 text-center">
                              <div className="bg-slate-50 border border-slate-150 p-3.5 rounded-xl">
                                <span className="block text-[10px] font-bold text-slate-405 uppercase">DELIVERED PLACEMENTS</span>
                                <span className="text-xl font-black text-slate-900 mt-1 inline-block">{myCompletedCount} Orders</span>
                              </div>
                              <div className="bg-slate-50 border border-slate-150 p-3.5 rounded-xl">
                                <span className="block text-[10px] font-bold text-slate-405 uppercase">SUCCESS FULFILLMENT</span>
                                <span className="text-xl font-black text-slate-900 mt-1 inline-block">
                                  {myOrders.length > 0 ? Math.round((myCompletedCount / myOrders.length) * 100) : 100}%
                                </span>
                              </div>
                            </div>

                            {/* Next Level progress tracker */}
                            <div className="bg-indigo-50/50 rounded-xl p-3.5 border border-indigo-100/60 text-xs text-left text-indigo-900">
                              <div className="flex justify-between font-bold">
                                <span>🚀 Next Status Increment Milestones</span>
                                <span>{myCompletedCount} / {targetCount} Placements</span>
                              </div>
                              <p className="text-[11px] text-indigo-700/80 mt-1 leading-normal">
                                Progress towards <span className="font-extrabold">{nextTierName}</span>. Upgraded ranks provide premium search badges in the Marketplace to win client assignments.
                              </p>
                              <div className="w-full bg-slate-200/50 rounded-full h-1.5 mt-2.5 overflow-hidden">
                                <div className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Right Column: Identity Verification proof documents flow */}
                    <div className="md:col-span-6">
                      <div className="bg-white border border-slate-205 rounded-2xl p-6 shadow-sm space-y-4">
                        <div className="border-b border-slate-100 pb-3">
                          <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">GOVERNMENT ID ATTACHMENT PROOF</h4>
                          <p className="text-xs text-slate-500 mt-0.5">Upload mandatory tax or state ID information to ensure client transactions payouts remain tax-compliant.</p>
                        </div>

                        {/* Case 1: Status Unverified */}
                        {idStatus === 'unverified' && (
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              const formData = new FormData(e.currentTarget);
                              const type = formData.get('id_type') as string;
                              const numStr = formData.get('id_number') as string;
                              const file = formData.get('id_filename') as string;
                              handleSubmitVerification(numStr || 'TX-950183', type || 'Passport', file || 'Identity_Scan.png');
                            }}
                            className="space-y-4 text-xs"
                          >
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Document Class</label>
                                <select name="id_type" className="w-full p-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-lg">
                                  <option value="Passport">Passport (Corporate / Personal)</option>
                                  <option value="Driver License">Driver's License</option>
                                  <option value="National Agency Card">National Identification Card</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Document Ref #</label>
                                <input
                                  type="text"
                                  name="id_number"
                                  placeholder="e.g. ZA-901844-TX"
                                  required
                                  className="w-full p-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 font-bold"
                                />
                              </div>
                            </div>

                            {/* Drag & Drop simulated field */}
                            <div className="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-xl p-6 text-center space-y-1.5 cursor-pointer bg-slate-50/50 hover:bg-indigo-50/5 transition-all">
                              <span className="text-2xl">📇</span>
                              <span className="block text-xs font-bold text-slate-700">Drag & Drop ID PDF scans or images</span>
                              <span className="block text-[10.5px] text-slate-400 leading-tight">Must include clear signature stamp and high-res selfie portrait (Max 5MB)</span>
                              <input
                                type="text"
                                name="id_filename"
                                placeholder="simulated_file_capture.pdf"
                                className="w-48 mx-auto mt-2 text-center text-[10px] border border-slate-200 p-1 rounded font-mono block focus:outline-none"
                              />
                            </div>

                            <button
                              type="submit"
                              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all uppercase tracking-wider"
                            >
                              Submit Identity Paper for Verification
                            </button>
                          </form>
                        )}

                        {/* Case 2: Status Pending Review */}
                        {idStatus === 'pending' && (
                          <div className="py-6 text-center space-y-4">
                            <div className="w-14 h-14 bg-indigo-50 text-indigo-650 rounded-full flex items-center justify-center text-xl mx-auto border border-indigo-200 animate-bounce">
                              ⏳
                            </div>
                            <div className="space-y-1.5 max-w-sm mx-auto">
                              <span className="inline-block text-[9.5px] font-black uppercase text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-150">
                                ID PROOF SUBMISSION RECEIVED
                              </span>
                              <h4 className="text-sm font-extrabold text-slate-800">Verification Screening Underway</h4>
                              <p className="text-xs text-slate-500 leading-relaxed">
                                Our legal and tax compliance desk is reviewing your uploaded <span className="font-bold underline">{idType}</span> paper details. Verified accounts unlock premium payouts processing.
                              </p>
                            </div>
                            
                            <div className="bg-slate-50 p-3.5 border border-slate-200 rounded-xl text-left font-mono text-[10px] text-slate-500 max-w-sm mx-auto">
                              <div className="flex justify-between">
                                <span>Ref:</span>
                                <span className="font-bold text-slate-800">{idNumber || 'LNK-9018'}</span>
                              </div>
                              <div className="flex justify-between mt-1">
                                <span>Proof Attachment:</span>
                                <span className="font-bold text-indigo-600 truncate max-w-[170px]">{idFileName || 'id_document_proof.pdf'}</span>
                              </div>
                              <div className="flex justify-between mt-1">
                                <span>Submitted At:</span>
                                <span>Today (UTC timezone)</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Case 3: Status Verified */}
                        {idStatus === 'verified' && (
                          <div className="py-5 text-center space-y-4">
                            <div className="w-14 h-14 bg-emerald-50 text-emerald-650 rounded-full flex items-center justify-center text-xl mx-auto border border-emerald-200">
                              🛡️
                            </div>
                            <div className="space-y-1.5 max-w-sm mx-auto">
                              <span className="inline-block text-[9.5px] font-black uppercase text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-150">
                                IDENTITY OFFICIALLY VERIFIED
                              </span>
                              <h4 className="text-sm font-extrabold text-slate-900">Legal Compliance Validated</h4>
                              <p className="text-xs text-slate-500 leading-relaxed">
                                Thank you for your tax submission proof. Your publisher account has been mapped to <span className="font-bold text-emerald-600">SECURE PLACEMENT OUTLET INSTANT PAYOUTS</span>.
                              </p>
                            </div>

                            <div className="bg-emerald-50/50 p-4 border border-emerald-100 rounded-xl text-left font-mono text-[10px] text-emerald-700 max-w-sm mx-auto space-y-1">
                              <div className="flex justify-between">
                                <span className="font-medium text-emerald-600">Document Approved:</span>
                                <span className="font-bold text-emerald-800">{idType} ({idNumber})</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium text-emerald-600">Sign Proof Certificate:</span>
                                <span className="font-bold text-emerald-800 truncate max-w-[160px]">{idFileName || 'Platform_Sign_Verified_Paper.pdf'}</span>
                              </div>
                              <div className="flex justify-between text-slate-400 mt-1 border-t border-emerald-200 pt-1">
                                <span>Status Key:</span>
                                <span className="font-black text-emerald-600">APPROVED_TRUST_CERT</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PUBLISHER SIMULATED EMAIL INBOX */}
              {!scanningOrder && activeTab === 'publisher_emails' && (() => {
                const myEmails = simulatedEmails.filter(e => e.to === user.email);
                const [selectedEmailId, setSelectedEmailId] = useState<string | null>(
                  myEmails.length > 0 ? myEmails[0].id : null
                );
                const [emailFilter, setEmailFilter] = useState<'all' | 'rejection' | 'system'>('all');
                const [emailSearch, setEmailSearch] = useState('');

                const filtered = myEmails.filter(e => {
                  const matchesFilter = emailFilter === 'all' || e.type === emailFilter;
                  const matchesSearch = !emailSearch.trim() || 
                    e.subject.toLowerCase().includes(emailSearch.toLowerCase()) ||
                    e.body.toLowerCase().includes(emailSearch.toLowerCase()) ||
                    (e.siteDomain && e.siteDomain.toLowerCase().includes(emailSearch.toLowerCase()));
                  return matchesFilter && matchesSearch;
                });

                const activeEmail = myEmails.find(e => e.id === selectedEmailId);

                return (
                  <div className="space-y-6 text-left max-w-5xl mx-auto animate-in fade-in duration-200">
                    <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-6 border border-slate-800 shadow-md">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div>
                          <span className="text-[9.5px] uppercase font-black tracking-widest text-[#818CF8] bg-indigo-950/85 px-2.5 py-1 rounded border border-indigo-900">
                            DIGITAL MAILROOM CLIENT
                          </span>
                          <h3 className="text-lg font-black text-white mt-1.5 flex items-center gap-2">
                            <span>Your Platform Notification Inbox</span>
                            <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/25 px-2 py-0.5 rounded-full font-bold">
                              {myEmails.filter(e => !e.read).length} Unread Alerts
                            </span>
                          </h3>
                          <p className="text-xs text-slate-400 mt-1">
                            This panel displays actual emails, rejections, and system notifications dispatched to <span className="text-indigo-300 font-bold underline">{user.email}</span>.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 min-h-[480px]">
                      {/* Left list container */}
                      <div className="md:col-span-5 bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col shadow-sm">
                        <div className="p-3 border-b border-slate-100 space-y-3 bg-slate-50">
                          {/* Search */}
                          <div className="relative">
                            <Search size={13} className="absolute left-3 top-3 text-slate-400" />
                            <input
                              type="text"
                              value={emailSearch}
                              onChange={(e) => setEmailSearch(e.target.value)}
                              placeholder="Search list..."
                              className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-xs focus:outline-none focus:border-indigo-400"
                            />
                          </div>
                          {/* Quick filters */}
                          <div className="flex gap-1.5 text-[11px]">
                            {(['all', 'rejection', 'system'] as const).map(f => (
                              <button
                                key={f}
                                type="button"
                                onClick={() => setEmailFilter(f)}
                                className={`px-2.5 py-1 rounded-lg border font-bold capitalize transition-all cursor-pointer ${
                                  emailFilter === f
                                    ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                                    : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-600'
                                }`}
                              >
                                {f === 'all' ? 'All' : f === 'rejection' ? 'Rejections' : 'System'}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* List */}
                        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 max-h-[400px]">
                          {filtered.map(mail => {
                            const isSelected = selectedEmailId === mail.id;
                            return (
                              <div
                                key={mail.id}
                                onClick={() => {
                                  setSelectedEmailId(mail.id);
                                  setSimulatedEmails(prev => prev.map(e => e.id === mail.id ? { ...e, read: true } : e));
                                }}
                                className={`p-3.5 cursor-pointer text-xs transition-all relative text-left ${
                                  isSelected ? 'bg-indigo-50/70 border-l-4 border-indigo-600' : 'hover:bg-slate-50'
                                } ${!mail.read ? 'font-bold text-slate-950' : 'text-slate-650'}`}
                              >
                                <div className="flex justify-between items-baseline mb-1">
                                  <span className="text-slate-500 font-bold text-[10.5px] truncate max-w-[140px]">{mail.from}</span>
                                  <span className="text-[9px] text-slate-400 font-medium whitespace-nowrap">
                                    {new Date(mail.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                                  </span>
                                </div>
                                <h4 className={`text-slate-800 text-[11px] truncate ${!mail.read ? 'font-extrabold text-slate-950' : ''}`}>
                                  {mail.subject}
                                </h4>
                                <p className="text-[10px] text-slate-400 truncate mt-1">
                                  {mail.body.replace(/\n/g, ' ')}
                                </p>
                                {!mail.read && (
                                  <span className="absolute right-3.5 bottom-3.5 w-2 h-2 rounded-full bg-amber-505" />
                                )}
                              </div>
                            );
                          })}

                          {filtered.length === 0 && (
                            <div className="p-8 text-center text-slate-400 text-xs">
                              <Mail size={24} className="mx-auto text-slate-300 mb-2" />
                              <p>No matches inside this folder.</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right detail view */}
                      <div className="md:col-span-7 bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col shadow-sm">
                        {activeEmail ? (
                          <div className="flex-1 flex flex-col text-xs">
                            {/* Header details */}
                            <div className="p-5 border-b border-slate-100 bg-slate-50 space-y-2">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="text-sm font-black text-slate-900 leading-tight">{activeEmail.subject}</h4>
                                  <div className="flex items-center gap-1 mt-1 text-[11px] text-slate-500">
                                    <span>From:</span>
                                    <span className="font-bold text-slate-700">{activeEmail.from}</span>
                                  </div>
                                </div>
                                <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase border tracking-wider ${
                                  activeEmail.type === 'rejection'
                                    ? 'bg-rose-50 text-rose-700 border-rose-150'
                                    : 'bg-indigo-50 text-indigo-700 border-indigo-150'
                                }`}>
                                  {activeEmail.type}
                                </span>
                              </div>
                              <div className="text-[10px] text-slate-405 border-t border-slate-200 pt-1.5 flex justify-between">
                                <span>Prepared for: <b>{activeEmail.to}</b></span>
                                <span>{new Date(activeEmail.timestamp).toLocaleString()}</span>
                              </div>
                            </div>

                            {/* Body contents */}
                            <div className="p-5 flex-1 overflow-y-auto bg-white min-h-[250px]">
                              <p className="whitespace-pre-line text-slate-700 leading-relaxed text-[11.5px] font-medium font-sans">
                                {activeEmail.body}
                              </p>
                            </div>

                            {/* Call to actions */}
                            {activeEmail.type === 'rejection' && activeEmail.siteDomain && (
                              <div className="p-4 bg-rose-50 border-t border-rose-100 flex flex-col sm:flex-row items-center justify-between gap-3 px-5">
                                <div className="text-left">
                                  <h5 className="font-bold text-rose-950 text-[11px]">Proposed Price: ${activeEmail.proposedPrice} rejected!</h5>
                                  <p className="text-[10px] text-rose-800 leading-relaxed font-semibold">Consider listing at lower fees to invite instant buyer placements.</p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setActiveTab('sites')}
                                  className="w-full sm:w-auto bg-rose-650 hover:bg-rose-750 text-white text-[10.5px] font-black px-4 py-2 rounded-xl border border-rose-500 shadow-sm cursor-pointer whitespace-nowrap transition-all"
                                >
                                  👉 Lower Outlet Price Here
                                </button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="flex-1 flex flex-col items-center justify-center p-8 text-slate-405">
                            <Mail size={32} className="text-slate-200 mb-2 animate-bounce" />
                            <h5 className="font-bold text-xs text-slate-500">Pick an Email Message</h5>
                            <p className="text-[11px] text-slate-400">Select any advisory email on the left panel to review placement logs.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* ADMIN SIMULATED SENT OUTBOX */}
              {!scanningOrder && activeTab === 'admin_emails' && (() => {
                const [selectedEmailId, setSelectedEmailId] = useState<string | null>(
                  simulatedEmails.length > 0 ? simulatedEmails[0].id : null
                );
                const [emailSearch, setEmailSearch] = useState('');

                const filtered = simulatedEmails.filter(e => {
                  const matchesSearch = !emailSearch.trim() || 
                    e.to.toLowerCase().includes(emailSearch.toLowerCase()) ||
                    e.subject.toLowerCase().includes(emailSearch.toLowerCase()) ||
                    e.body.toLowerCase().includes(emailSearch.toLowerCase()) ||
                    (e.siteDomain && e.siteDomain.toLowerCase().includes(emailSearch.toLowerCase()));
                  return matchesSearch;
                });

                const activeEmail = simulatedEmails.find(e => e.id === selectedEmailId);

                return (
                  <div className="space-y-6 text-left max-w-5xl mx-auto animate-in fade-in duration-200">
                    <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-6 border border-slate-800 shadow-md">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[9.5px] uppercase font-black tracking-widest text-[#818CF8] bg-indigo-950/85 px-2.5 py-1 rounded border border-indigo-900">
                            ADMIN SYSTEM OUTBOX
                          </span>
                          <h3 className="text-lg font-black text-white mt-1.5 flex items-center gap-2">
                            <span>Sent Mail Dispatch logs</span>
                            <span className="text-xs bg-indigo-500/15 text-indigo-350 border border-indigo-500/20 px-2 py-0.5 rounded-full font-bold">
                              {simulatedEmails.length} Outbound Messages
                            </span>
                          </h3>
                          <p className="text-xs text-slate-400 mt-1">
                            This panel provides administrator audit visibility into automated transactional emails sent to publishers.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm("Are you sure you want to clear simulated email logs?")) {
                              setSimulatedEmails([]);
                              setSelectedEmailId(null);
                              showToast("Cleared simulated outbox database!", "info");
                            }
                          }}
                          className="px-3 py-1.5 bg-rose-950/40 text-rose-400 hover:bg-rose-950/70 border border-rose-900/50 rounded-xl text-xs font-bold transition-all cursor-pointer"
                        >
                          Clear Log Ledger
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 min-h-[480px]">
                      {/* Left list container */}
                      <div className="md:col-span-5 bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col shadow-sm">
                        <div className="p-3 border-b border-slate-100 bg-slate-50">
                          <div className="relative">
                            <Search size={13} className="absolute left-3 top-3 text-slate-400" />
                            <input
                              type="text"
                              value={emailSearch}
                              onChange={(e) => setEmailSearch(e.target.value)}
                              placeholder="Search sent logs, publishers, domains..."
                              className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-xs focus:outline-none focus:border-indigo-400"
                            />
                          </div>
                        </div>

                        {/* List */}
                        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 max-h-[400px]">
                          {filtered.map(mail => {
                            const isSelected = selectedEmailId === mail.id;
                            return (
                              <div
                                key={mail.id}
                                onClick={() => setSelectedEmailId(mail.id)}
                                className={`p-3.5 cursor-pointer text-xs transition-all text-left ${
                                  isSelected ? 'bg-slate-50 border-l-4 border-slate-800' : 'hover:bg-slate-50/50'
                                }`}
                              >
                                <div className="flex justify-between items-baseline mb-1">
                                  <span className="text-indigo-600 font-extrabold text-[10.5px] truncate max-w-[145px]">To: {mail.to}</span>
                                  <span className="text-[9px] text-slate-400 font-medium">
                                    {new Date(mail.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                                  </span>
                                </div>
                                <h4 className="text-slate-800 text-[11px] font-bold truncate">
                                  {mail.subject}
                                </h4>
                                <p className="text-[10px] text-slate-400 truncate mt-1">
                                  {mail.body.replace(/\n/g, ' ')}
                                </p>
                              </div>
                            );
                          })}

                          {filtered.length === 0 && (
                            <div className="p-8 text-center text-slate-400 text-xs">
                              <Mail size={24} className="mx-auto text-slate-300 mb-2" />
                              <p>No messages sent yet.</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right detail view */}
                      <div className="md:col-span-7 bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col shadow-sm">
                        {activeEmail ? (
                          <div className="flex-1 flex flex-col text-xs">
                            {/* Header details */}
                            <div className="p-5 border-b border-slate-100 bg-slate-50 space-y-2">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="text-sm font-black text-slate-900 leading-tight">{activeEmail.subject}</h4>
                                  <div className="flex items-center gap-1 mt-1 text-[11px] text-slate-500">
                                    <span>Recipient:</span>
                                    <span className="font-extrabold text-indigo-700">{activeEmail.to}</span>
                                  </div>
                                </div>
                                <span className="bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-0.5 rounded-full text-[9px] font-bold">
                                  SENT OUTBOX
                                </span>
                              </div>
                              <div className="text-[10px] text-slate-405 border-t border-slate-200 pt-1.5 flex justify-between">
                                <span>Sent From: <b>{activeEmail.from}</b></span>
                                <span>{new Date(activeEmail.timestamp).toLocaleString()}</span>
                              </div>
                            </div>

                            {/* Body contents */}
                            <div className="p-5 flex-1 overflow-y-auto bg-white min-h-[250px]">
                              <p className="whitespace-pre-line text-slate-700 leading-relaxed text-[11.5px] font-semibold font-sans font-medium">
                                {activeEmail.body}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex-1 flex flex-col items-center justify-center p-8 text-slate-400">
                            <Mail size={32} className="text-slate-200 mb-2 animate-bounce" />
                            <h5 className="font-bold text-xs text-slate-500">Select Sent Email Log</h5>
                            <p className="text-[11px] text-slate-400 font-semibold text-center">Select any dispatch from the outbox list to audit outbound pricing feedback.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* PUBLISHER PROMOTION ONBOARDING FOR BUYERS / ADVERTISERS */}
              {!scanningOrder && activeTab === 'list_site_promo' && (
                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm max-w-3xl mx-auto text-left space-y-6">
                  <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-xl shrink-0">
                      🌐
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">List Your Websites & Sell Placements</h4>
                      <p className="text-xs text-slate-500">Monetize your high Domain Authority (DA) and high Domain Rating (DR) domains immediately.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-650">
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-2.5">
                      <h5 className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span className="text-emerald-500">✓</span> 90% Keep Rate
                      </h5>
                      <p className="leading-relaxed text-slate-500">
                        We only deduct a slim 10% platform facilitation fee on orders placed by advertisers. The remaining 90% goes straight to your escrow wallet.
                      </p>
                    </div>

                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-2.5">
                      <h5 className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span className="text-emerald-500">✓</span> Set Your Own Prices
                      </h5>
                      <p className="leading-relaxed text-slate-500">
                        You have total autonomy. Set a custom price for single editorial link features, plus premium up-charges if you draft the article.
                      </p>
                    </div>

                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-2.5">
                      <h5 className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span className="text-emerald-500">✓</span> Direct Placement Messages
                      </h5>
                      <p className="leading-relaxed text-slate-500">
                        Receive real-time briefs directly inside our secure messaging rooms and coordinate with buyers to complete publications quickly.
                      </p>
                    </div>

                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-2.5">
                      <h5 className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span className="text-emerald-500">✓</span> Automated Backlink Reports
                      </h5>
                      <p className="leading-relaxed text-slate-500">
                        Once live links are submitted, our integrated crawler continuously checks indexing status and reports active pass metrics automatically.
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    {user.role === 'advertiser' ? (
                      <div className="bg-rose-50/75 border border-rose-105 rounded-xl p-4 text-left w-full">
                        <p className="text-xs font-black text-rose-800 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                          <span>⚠️</span>
                          <span>Security Restriction</span>
                        </p>
                        <p className="text-[11.5px] text-slate-600 leading-normal font-medium">
                          Advertisers are strictly restricted from registering publication outlets, altering clearance levels, or changing mode workspace workspaces. If you require publisher onboarding, please submit an escalation ticket to a Platform Moderator.
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-1">
                          <h5 className="text-xs font-bold text-slate-800">Ready to toggle your current active workspace?</h5>
                          <p className="text-[11px] text-slate-400">This will switch your dashboard to Publisher Mode, opening the site listing intake form.</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const updatedUser = { ...user, role: 'publisher' as const };
                            setUser(updatedUser);
                            setActiveTab('sites');
                            showToast('Switched to Publisher Mode workspace!', 'success');
                          }}
                          className="bg-[#4F46E5] hover:bg-opacity-90 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                        >
                          Enable Publisher Mode & Add Site
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* USER DIRECTORY MODULE */}
              {!scanningOrder && activeTab === 'users_admin' && (() => {
                const filteredUsers = users.filter(u => 
                  u.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
                  u.email.toLowerCase().includes(userSearchQuery.toLowerCase())
                );
                
                const totalPublishers = users.filter(u => u.role === 'publisher').length;
                const totalAdvertisers = users.filter(u => u.role === 'advertiser').length;
                const collectiveEscrow = users.reduce((acc, curr) => acc + curr.wallet, 0);

                return (
                  <div className="space-y-6 animate-in fade-in duration-150 text-left">
                    {/* Header bar */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-md">
                      <div>
                        <h4 className="text-base font-extrabold flex items-center gap-2">
                          <span>👥 User Directory Control Desk</span>
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">
                          Directly manage global Publisher & Advertiser accounts, update secure wallet balances, and impersonate live client sessions for verification.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingUser(null);
                          setNewUserName('');
                          setNewUserEmail('');
                          setNewUserRole('publisher');
                          setNewUserWallet(500);
                          setNewUserFormOpen(!newUserFormOpen);
                        }}
                        className="bg-indigo-600 hover:bg-indigo-500 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 self-start md:self-auto shadow-md shadow-indigo-900/20"
                      >
                        <span>✨ Register New User Profile</span>
                      </button>
                    </div>

                    {/* Stats overview bento row */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm space-y-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Registered Accounts</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl font-black text-slate-900">{users.length}</span>
                          <span className="text-[10px] text-slate-500 font-medium">active members</span>
                        </div>
                      </div>
                      <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm space-y-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Publishers Network</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl font-black text-indigo-650">{totalPublishers}</span>
                          <span className="text-[10px] text-slate-500 font-medium">list owners</span>
                        </div>
                      </div>
                      <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm space-y-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Advertisers Network</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl font-black text-emerald-650">{totalAdvertisers}</span>
                          <span className="text-[10px] text-slate-500 font-medium">brand buyers</span>
                        </div>
                      </div>
                      <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm space-y-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Collective Escrow Assets</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl font-black text-slate-900">${collectiveEscrow.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                          <span className="text-[10px] text-slate-500 font-medium">USD pooled</span>
                        </div>
                      </div>
                    </div>

                    {/* New/Edit User Form container */}
                    {(newUserFormOpen || editingUser) && (
                      <form 
                        onSubmit={handleRegisterUser}
                        className="bg-slate-50 rounded-3xl border border-slate-200 p-6 space-y-4 animate-in slide-in-from-top-4 duration-200"
                      >
                        <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                          <h5 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
                            {editingUser ? `✏️ Modify Profile: ${editingUser.name}` : '✨ Register New Authority Platform Account'}
                          </h5>
                          <button
                            type="button"
                            onClick={() => {
                              setNewUserFormOpen(false);
                              setEditingUser(null);
                            }}
                            className="text-slate-400 hover:text-slate-600 font-bold text-xs"
                          >
                            Close Form
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-sans text-xs">
                          <div>
                            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Full User Name / Network Title</label>
                            <input
                              type="text"
                              required
                              value={newUserName}
                              onChange={(e) => setNewUserName(e.target.value)}
                              placeholder="e.g. Acme Media Corp"
                              className="w-full bg-white px-3 py-2 border border-slate-250 rounded-xl outline-none focus:border-indigo-500 font-semibold"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Secure Contact Email Address</label>
                            <input
                              type="email"
                              required
                              value={newUserEmail}
                              onChange={(e) => setNewUserEmail(e.target.value)}
                              placeholder="e.g. acme@authoritypro.com"
                              className="w-full bg-white px-3 py-2 border border-slate-250 rounded-xl outline-none focus:border-indigo-500 font-semibold"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Platform Workflow Role</label>
                            <select
                              value={newUserRole}
                              onChange={(e) => setNewUserRole(e.target.value as any)}
                              className="w-full bg-white px-3 py-2 border border-slate-250 rounded-xl outline-none focus:border-indigo-500 font-semibold cursor-pointer"
                            >
                              <option value="publisher">Publisher (Sell Backlinks / List Outlets)</option>
                              <option value="advertiser">Advertiser (Buy Backlinks / Order Placements)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Escrow Wallet Balance ($ USD)</label>
                            <input
                              type="number"
                              min={0}
                              step={0.01}
                              required
                              value={newUserWallet}
                              onChange={(e) => setNewUserWallet(Number(e.target.value))}
                              placeholder="500"
                              className="w-full bg-white px-3 py-2 border border-slate-250 rounded-xl outline-none focus:border-indigo-500 font-bold"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-2.5 pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              setNewUserFormOpen(false);
                              setEditingUser(null);
                            }}
                            className="bg-white hover:bg-slate-100 border border-slate-200 font-bold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer text-slate-600"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer"
                          >
                            {editingUser ? 'Update Account Settings' : 'Create Live Account'}
                          </button>
                        </div>
                      </form>
                    )}

                    {/* Filter controls row */}
                    <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
                      <div className="relative w-full md:w-80">
                        <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
                        <input
                          type="text"
                          value={userSearchQuery}
                          onChange={(e) => setUserSearchQuery(e.target.value)}
                          placeholder="Search users by name, contact email..."
                          className="w-full font-sans text-xs pl-8 pr-4 py-2 border border-slate-200 bg-white rounded-xl outline-none focus:border-indigo-500 font-semibold"
                        />
                      </div>
                      <span className="text-[10.5px] text-slate-400 font-semibold">
                        Showing {filteredUsers.length} of {users.length} registered system users
                      </span>
                    </div>

                    {/* Directory grid */}
                    {filteredUsers.length === 0 ? (
                      <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-2">
                        <span className="text-2xl">👥</span>
                        <h5 className="font-extrabold text-slate-900 text-sm">No Accounts Match Filter Parameters</h5>
                        <p className="text-xs text-slate-400 max-w-sm mx-auto">
                          Try adjusting your search criteria or register a new Publisher/Advertiser account directly using the register panel.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-4 text-left">
                        {filteredUsers.map((item) => {
                          const initial = item.name.charAt(0).toUpperCase();
                          const isPublisher = item.role === 'publisher';
                          const isDmOpen = userDirectoryActiveDmEmail === item.email;

                          return (
                            <div 
                              key={item.id}
                              className="bg-white border border-slate-200 rounded-3xl p-5 hover:shadow-md hover:border-slate-300 transition-all flex flex-col gap-5 text-left"
                            >
                              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                {/* Left side: Avatar and Info details */}
                                <div className="flex items-center gap-4">
                                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm text-white shrink-0 ${
                                    isPublisher 
                                      ? 'bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-md shadow-indigo-900/10' 
                                      : 'bg-gradient-to-tr from-emerald-600 to-teal-500 shadow-md shadow-emerald-900/10'
                                  }`}>
                                    {initial}
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <h5 className="font-extrabold text-slate-950 text-xs">{item.name}</h5>
                                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                                        isPublisher 
                                          ? 'bg-indigo-50 border-indigo-150 text-indigo-700' 
                                          : 'bg-emerald-50 border-emerald-150 text-emerald-700'
                                      }`}>
                                        {item.role}
                                      </span>
                                    </div>
                                    <p className="text-xs text-slate-500 font-mono font-medium">{item.email}</p>
                                    <div className="text-[10px] text-slate-400 font-semibold flex items-center gap-2">
                                      <span>ID: {item.id}</span>
                                      <span>•</span>
                                      <span>Direct Access Portal ready</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Right side: Wallet Balance modifiers and Impersonator trigger */}
                                <div className="flex flex-wrap items-center gap-4 lg:self-auto self-start border-t lg:border-t-0 pt-4 lg:pt-0 w-full lg:w-auto justify-between lg:justify-end">
                                  
                                  {/* Wallet Manager */}
                                  <div className="bg-slate-50 border border-slate-150 rounded-2xl px-4 py-2.5 flex items-center gap-3.5">
                                    <div className="text-left">
                                      <span className="block text-[9px] uppercase font-bold text-slate-400 tracking-wider">Escrow Balance</span>
                                      <span className="font-mono font-extrabold text-xs text-slate-900">
                                        ${item.wallet.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                      </span>
                                    </div>
                                    
                                    {/* Fast adjustment shortcuts */}
                                    <div className="flex gap-1">
                                      <button
                                        type="button"
                                        onClick={() => handleAdjustUserWallet(item.id, 100)}
                                        className="bg-white hover:bg-indigo-50 text-indigo-700 font-extrabold text-[9px] px-2 py-1 rounded border border-slate-200 transition-colors shadow-sm cursor-pointer"
                                        title="Add $100.00"
                                      >
                                        +$100
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleAdjustUserWallet(item.id, -100)}
                                        className="bg-white hover:bg-rose-50 text-rose-700 font-extrabold text-[9px] px-2 py-1 rounded border border-slate-200 transition-colors shadow-sm cursor-pointer"
                                        title="Deduct $100.00"
                                      >
                                        -$100
                                      </button>
                                    </div>
                                  </div>

                                  {/* Interactive actions button group */}
                                  <div className="flex items-center gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (isDmOpen) {
                                          setUserDirectoryActiveDmEmail(null);
                                        } else {
                                          setUserDirectoryActiveDmEmail(item.email);
                                          setUserDirectoryInlineMsgText('');
                                        }
                                      }}
                                      className={`font-bold text-[10px] uppercase tracking-wide px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1 border ${
                                        isDmOpen
                                          ? 'bg-slate-900 text-white border-slate-900'
                                          : 'bg-indigo-50 hover:bg-indigo-105 text-indigo-700 border border-indigo-150'
                                      }`}
                                      title="Send individual direct message to this user"
                                    >
                                      <span>💬 Message</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleImpersonateUser(item)}
                                      className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[10px] uppercase tracking-wide px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1 border border-indigo-150"
                                      title="Impersonate user session to buy or sell backlinks"
                                    >
                                      <span>🕵️ Login As</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setEditingUser(item);
                                        setNewUserName(item.name);
                                        setNewUserEmail(item.email);
                                        setNewUserRole(item.role === 'admin' ? 'publisher' : item.role);
                                        setNewUserWallet(item.wallet);
                                        setNewUserFormOpen(true);
                                      }}
                                      className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer"
                                      title="Edit account details"
                                    >
                                      ✏️
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteUser(item.id)}
                                      className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl border border-rose-100 transition-colors cursor-pointer"
                                      title="Permanently remove user"
                                    >
                                      🗑️
                                    </button>
                                  </div>

                                </div>
                              </div>

                              {/* Collapsible Direct Message feed */}
                              {isDmOpen && (
                                <div className="border-t border-slate-100 pt-5 space-y-4 animate-in slide-in-from-top-3 duration-200 text-left">
                                  <div className="flex items-center justify-between">
                                    <span className="font-extrabold text-[11px] text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                                      <span>💬 Secure DM Feed: {item.name}</span>
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-semibold font-mono">{item.email}</span>
                                  </div>

                                  {/* Chat bubble list */}
                                  <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 max-h-[220px] overflow-y-auto space-y-3">
                                    {chats.filter(m => m.room === `dm_${item.email}`).map(msg => {
                                      const isMe = msg.senderRole === 'admin';
                                      return (
                                        <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                          <div className={`max-w-[75%] rounded-2xl p-3 text-[11px] text-left ${
                                            isMe 
                                              ? 'bg-slate-900 text-white rounded-br-none shadow-sm shadow-indigo-950/10'
                                              : 'bg-white text-slate-800 rounded-bl-none border border-slate-200 shadow-sm'
                                          }`}>
                                            <div className="flex items-center gap-1 opacity-70 text-[9px] font-black pb-0.5">
                                              <span>{msg.senderName}</span>
                                              <span className="uppercase text-[7px] bg-slate-300/40 px-1 py-0.1 rounded">
                                                {msg.senderRole}
                                              </span>
                                            </div>
                                            <p className="leading-relaxed break-words font-medium">{msg.text}</p>
                                            <span className="block text-right text-[7px] opacity-40 mt-1">
                                              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                          </div>
                                        </div>
                                      );
                                    })}

                                    {chats.filter(m => m.room === `dm_${item.email}`).length === 0 && (
                                      <div className="text-center text-slate-400 py-8 text-[11px] flex flex-col items-center gap-1">
                                        <span>💬 No message history. Send the first direct chat to {item.name}!</span>
                                      </div>
                                    )}
                                  </div>

                                  {/* Quick input reply */}
                                  <form 
                                    onSubmit={(e) => {
                                      e.preventDefault();
                                      if (!userDirectoryInlineMsgText.trim()) return;
                                      handleSendMessage(`dm_${item.email}`, userDirectoryInlineMsgText.trim());
                                      setUserDirectoryInlineMsgText('');
                                      showToast(`Message dispatched individually to ${item.name}!`, 'success');
                                    }}
                                    className="flex gap-2"
                                  >
                                    <input
                                      type="text"
                                      placeholder={`Send secure, individual note to ${item.name}...`}
                                      value={userDirectoryInlineMsgText}
                                      onChange={(e) => setUserDirectoryInlineMsgText(e.target.value)}
                                      className="flex-1 rounded-xl border border-slate-205 bg-white px-3.5 py-2 text-xs focus:outline-none focus:border-indigo-500 font-semibold"
                                      required
                                    />
                                    <button
                                      type="submit"
                                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-[11px] uppercase px-4 py-2 rounded-xl transition-all cursor-pointer shadow-md shadow-indigo-900/10"
                                    >
                                      Send Message
                                    </button>
                                  </form>
                                </div>
                              )}

                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })()}
              
              {/* SETTINGS MODULE AND INFORMATION CHANNELS */}
              {!scanningOrder && activeTab === 'settings_admin' && (
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm max-w-2xl mx-auto text-left space-y-6 animate-in fade-in duration-150">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">🔑 Authority Platform Settings</h4>
                    <p className="text-xs text-slate-500">Configure global admin settings, notifications, and manage administrative credentials.</p>
                  </div>

                  <div className="space-y-4 font-sans text-xs">
                    <div>
                      <label className="block text-[10.5px] uppercase font-bold text-slate-400 mb-1">Administrative PayPal Recipient Email</label>
                      <input
                        type="email"
                        value={settingsPaypal}
                        onChange={(e) => setSettingsPaypal(e.target.value)}
                        placeholder="e.g. paypal@authorityplacement.com"
                        className="w-full px-3 py-2 text-xs border border-slate-250 rounded-lg outline-none focus:border-[#4F46E5]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10.5px] uppercase font-bold text-slate-400 mb-1">Federated Administrator email contacts</label>
                      <input
                        type="email"
                        value={settingsAdminEmail}
                        onChange={(e) => setSettingsAdminEmail(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-250 rounded-lg outline-none focus:border-[#4F46E5]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10.5px] uppercase font-bold text-slate-400 mb-1">Google Chat Webhook API Endpoint</label>
                      <input
                        type="text"
                        value={settingsWebhookUrl}
                        onChange={(e) => setSettingsWebhookUrl(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-250 rounded-lg outline-none font-mono text-slate-500 focus:border-[#4F46E5]"
                        placeholder="https://chat.googleapis.com/v1/spaces/..."
                      />
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/50 space-y-3">
                      <div className="flex items-center gap-1.5 font-bold text-slate-900 text-[10.5px] uppercase tracking-wider mb-1">
                        <span>🛡️ Administrative Credentials</span>
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Admin Access Password Key</label>
                        <input
                          type="text"
                          value={settingsAdminPassword}
                          onChange={(e) => setSettingsAdminPassword(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-slate-250 rounded-lg outline-none font-mono focus:border-[#4F46E5] bg-white text-slate-800 font-bold"
                          placeholder="placement2026"
                        />
                        <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                          This security key authorizes access through the secret admin routing pathway. Changing this will immediately update the credential gate on the portal landing screen.
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-col gap-2 border-t border-slate-100 font-semibold text-slate-600">
                      <label className="flex items-center gap-2.5 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={settingsEmailActive} 
                          onChange={(e) => setSettingsEmailActive(e.target.checked)}
                          className="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" 
                        />
                        Send hourly link status updates to Admins
                      </label>
                      <label className="flex items-center gap-2.5 cursor-pointer mt-1">
                        <input 
                          type="checkbox" 
                          checked={settingsChatActive} 
                          onChange={(e) => setSettingsChatActive(e.target.checked)}
                          className="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" 
                        />
                        Enable Google Chat status pinging on backlink disconnects
                      </label>
                    </div>

                    <div className="pt-4 border-t border-slate-100 text-right">
                      <button
                        type="button"
                        onClick={handleSaveSettings}
                        className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-4 py-2 rounded-lg cursor-pointer transition-colors"
                      >
                        Save Configuration Settings
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </main>

      {/* Side-by-Side Comparison Modal */}
      {showCompareModal && comparedSites.length >= 2 && (() => {
        const sA = comparedSites[0];
        const sB = comparedSites[1];
        
        // Highlight helper indicators
        const winDa = sA.da > sB.da ? 'A' : sB.da > sA.da ? 'B' : 'tie';
        const winDr = sA.dr > sB.dr ? 'A' : sB.dr > sA.dr ? 'B' : 'tie';
        const winTraffic = sA.traffic > sB.traffic ? 'A' : sB.traffic > sA.traffic ? 'B' : 'tie';
        const winPrice = sA.price < sB.price ? 'A' : sB.price < sA.price ? 'B' : 'tie';
        const winTurnaround = (sA.turnaround || 5) < (sB.turnaround || 5) ? 'A' : (sB.turnaround || 5) < (sA.turnaround || 5) ? 'B' : 'tie';
        
        return (
          <div id="compare-modal" className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-4xl w-full border border-slate-150 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
              
              {/* Header */}
              <div className="p-6 border-b border-rose-100/50 bg-gradient-to-r from-slate-50 via-slate-100/50 to-slate-50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600">
                    <Sparkles size={18} className="stroke-[2.5]" />
                  </div>
                  <div className="text-left bg-transparent">
                    <h3 className="text-base font-black text-slate-900 leading-tight">Side-by-Side Placement Comparison</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Objective metric evaluation between selection candidates.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCompareModal(false)}
                  className="p-1 px-3 text-xs font-bold text-slate-500 hover:text-slate-850 border border-slate-200 hover:bg-slate-100 rounded-lg cursor-pointer transition-all shrink-0"
                >
                  ✕ Close Compare
                </button>
              </div>

              {/* Comparison Grid Matrix */}
              <div className="p-6 overflow-y-auto space-y-6">
                
                {/* Upper Domain Cards */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Site A */}
                  <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl text-left relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 right-0 bg-indigo-600 text-white font-extrabold text-[9px] px-3.5 py-1 uppercase tracking-widest rounded-bl-xl">
                      Site A
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase text-indigo-650 bg-indigo-50 px-2 py-0.5 rounded-md">
                        {sA.niche}
                      </span>
                      <h4 className="text-lg font-black text-slate-900 mt-2 truncate">{sA.domain}</h4>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-3">
                        {sA.description || 'No description available for this target outlet.'}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Base Price</span>
                        <span className="text-lg font-black text-slate-900">${sA.price}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setBuyingSite(sA);
                          setShowCompareModal(false);
                          showToast(`Selected ${sA.domain} for placement guest blogging!`, 'success');
                        }}
                        className="px-3.5 py-1.5 bg-indigo-650 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-all shadow-sm"
                      >
                        Select Site A
                      </button>
                    </div>
                  </div>

                  {/* Site B */}
                  <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl text-left relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 right-0 bg-indigo-700 text-white font-extrabold text-[9px] px-3.5 py-1 uppercase tracking-widest rounded-bl-xl">
                      Site B
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase text-indigo-650 bg-indigo-50 px-2 py-0.5 rounded-md">
                        {sB.niche}
                      </span>
                      <h4 className="text-lg font-black text-slate-900 mt-2 truncate">{sB.domain}</h4>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-3">
                        {sB.description || 'No description available for this target outlet.'}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Base Price</span>
                        <span className="text-lg font-black text-slate-900">${sB.price}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setBuyingSite(sB);
                          setShowCompareModal(false);
                          showToast(`Selected ${sB.domain} for placement guest blogging!`, 'success');
                        }}
                        className="px-3.5 py-1.5 bg-indigo-650 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-all shadow-sm"
                      >
                        Select Site B
                      </button>
                    </div>
                  </div>
                </div>

                {/* Metric Rows Table */}
                <div className="border border-slate-250/60 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 text-[10px] uppercase font-black">
                        <th className="p-3.5 text-left w-1/3">Target Metrics</th>
                        <th className="p-3.5 text-center w-1/3">Site A : {sA.domain}</th>
                        <th className="p-3.5 text-center w-1/3">Site B : {sB.domain}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150 font-medium text-slate-700">
                      
                      {/* DA */}
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-3.5 text-left font-bold text-slate-500">
                          <div>Domain Authority (DA)</div>
                          <div className="text-[10px] text-slate-400 font-normal">Moz domain value strength score estimate.</div>
                        </td>
                        <td className={`p-3.5 text-center text-sm font-bold ${winDa === 'A' ? 'bg-emerald-500/5 text-emerald-700' : ''}`}>
                          <div className="flex items-center justify-center gap-1.5">
                            <span>{sA.da}</span>
                            {winDa === 'A' && <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.2 rounded font-black uppercase">Winner</span>}
                          </div>
                        </td>
                        <td className={`p-3.5 text-center text-sm font-bold ${winDa === 'B' ? 'bg-emerald-500/5 text-emerald-700' : ''}`}>
                          <div className="flex items-center justify-center gap-1.5">
                            <span>{sB.da}</span>
                            {winDa === 'B' && <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.2 rounded font-black uppercase">Winner</span>}
                          </div>
                        </td>
                      </tr>

                      {/* DR */}
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-3.5 text-left font-bold text-slate-500">
                          <div>Ahrefs Domain Rating (DR)</div>
                          <div className="text-[10px] text-slate-400 font-normal">Backlink profile strength authority standard.</div>
                        </td>
                        <td className={`p-3.5 text-center text-sm font-bold ${winDr === 'A' ? 'bg-emerald-500/5 text-emerald-700' : ''}`}>
                          <div className="flex items-center justify-center gap-1.5">
                            <span>{sA.dr}</span>
                            {winDr === 'A' && <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.2 rounded font-black uppercase">Winner</span>}
                          </div>
                        </td>
                        <td className={`p-3.5 text-center text-sm font-bold ${winDr === 'B' ? 'bg-emerald-500/5 text-emerald-700' : ''}`}>
                          <div className="flex items-center justify-center gap-1.5">
                            <span>{sB.dr}</span>
                            {winDr === 'B' && <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.2 rounded font-black uppercase">Winner</span>}
                          </div>
                        </td>
                      </tr>

                      {/* Traffic */}
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-3.5 text-left font-bold text-slate-500">
                          <div>Monthly Organic Traffic</div>
                          <div className="text-[10px] text-slate-400 font-normal">Estimated monthly organic dynamic visitors count.</div>
                        </td>
                        <td className={`p-3.5 text-center text-sm font-bold ${winTraffic === 'A' ? 'bg-emerald-500/5 text-emerald-700' : ''}`}>
                          <div className="flex items-center justify-center gap-1.5">
                            <span>{(sA.traffic / 1000).toFixed(0)}K visitors/mo</span>
                            {winTraffic === 'A' && <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.2 rounded font-black uppercase">Winner</span>}
                          </div>
                        </td>
                        <td className={`p-3.5 text-center text-sm font-bold ${winTraffic === 'B' ? 'bg-emerald-500/5 text-emerald-700' : ''}`}>
                          <div className="flex items-center justify-center gap-1.5">
                            <span>{(sB.traffic / 1000).toFixed(0)}K visitors/mo</span>
                            {winTraffic === 'B' && <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.2 rounded font-black uppercase">Winner</span>}
                          </div>
                        </td>
                      </tr>

                      {/* Base Pricing */}
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-3.5 text-left font-bold text-slate-500">
                          <div>Guest Post Pricing</div>
                          <div className="text-[10px] text-slate-400 font-normal">Total publication fees.</div>
                        </td>
                        <td className={`p-3.5 text-center text-sm font-bold ${winPrice === 'A' ? 'bg-emerald-500/5 text-emerald-700' : ''}`}>
                          <div className="flex items-center justify-center gap-1.5">
                            <span>${sA.price}</span>
                            {winPrice === 'A' && <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.2 rounded font-black uppercase">Best Price</span>}
                          </div>
                        </td>
                        <td className={`p-3.5 text-center text-sm font-bold ${winPrice === 'B' ? 'bg-emerald-500/5 text-emerald-700' : ''}`}>
                          <div className="flex items-center justify-center gap-1.5">
                            <span>${sB.price}</span>
                            {winPrice === 'B' && <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.2 rounded font-black uppercase">Best Price</span>}
                          </div>
                        </td>
                      </tr>

                      {/* Turnaround Time */}
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-3.5 text-left font-bold text-slate-500">
                          <div>Turnaround Delivery Time</div>
                          <div className="text-[10px] text-slate-400 font-normal">Target lead time before publication proof.</div>
                        </td>
                        <td className={`p-3.5 text-center text-sm font-bold ${winTurnaround === 'A' ? 'bg-emerald-500/5 text-emerald-700' : ''}`}>
                          <div className="flex items-center justify-center gap-1.5">
                            <span>{sA.turnaround || 5} Days</span>
                            {winTurnaround === 'A' && <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.2 rounded font-black uppercase">Faster</span>}
                          </div>
                        </td>
                        <td className={`p-3.5 text-center text-sm font-bold ${winTurnaround === 'B' ? 'bg-emerald-500/5 text-emerald-700' : ''}`}>
                          <div className="flex items-center justify-center gap-1.5">
                            <span>{sB.turnaround || 5} Days</span>
                            {winTurnaround === 'B' && <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.2 rounded font-black uppercase">Faster</span>}
                          </div>
                        </td>
                      </tr>

                      {/* Link Insertion Capabilities */}
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-3.5 text-left font-bold text-slate-500">
                          <div>Link Insertion Options</div>
                          <div className="text-[10px] text-slate-400 font-normal">Pricing for editing live posts.</div>
                        </td>
                        <td className="p-3.5 text-center font-bold">
                          {sA.allowLinkInsertion ? (
                            <span className="text-emerald-700 bg-emerald-50 border border-emerald-150 px-2 py-0.5 rounded-lg text-[10.5px]">
                              Available (${sA.linkInsertionPrice})
                            </span>
                          ) : (
                            <span className="text-slate-400 italic">None</span>
                          )}
                        </td>
                        <td className="p-3.5 text-center font-bold">
                          {sB.allowLinkInsertion ? (
                            <span className="text-emerald-700 bg-emerald-50 border border-emerald-150 px-2 py-0.5 rounded-lg text-[10.5px]">
                              Available (${sB.linkInsertionPrice})
                            </span>
                          ) : (
                            <span className="text-slate-400 italic">None</span>
                          )}
                        </td>
                      </tr>

                      {/* Follow Type */}
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-3.5 text-left font-bold text-slate-500">
                          <div>Link Equity SEO Indexing</div>
                          <div className="text-[10px] text-slate-400 font-normal">Value pass-down equity indicator.</div>
                        </td>
                        <td className="p-3.5 text-center">
                          <span className="text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-lg text-[10.5px]">
                            {sA.dofollow ? 'Dofollow' : 'Nofollow'}
                          </span>
                        </td>
                        <td className="p-3.5 text-center">
                          <span className="text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-lg text-[10.5px]">
                            {sB.dofollow ? 'Dofollow' : 'Nofollow'}
                          </span>
                        </td>
                      </tr>

                      {/* Backlink Lifespan */}
                      <tr className="hover:bg-slate-50/50 transition-colors font-semibold">
                        <td className="p-3.5 text-left font-bold text-slate-500">
                          <div>Agreed Backlink Lifespan</div>
                          <div className="text-[10px] text-slate-400 font-normal">Indexing expiration metrics.</div>
                        </td>
                        <td className="p-3.5 text-center">
                          <span>{sA.lifespan || 'Permanent'}</span>
                        </td>
                        <td className="p-3.5 text-center">
                          <span>{sB.lifespan || 'Permanent'}</span>
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>

              </div>

              {/* Footer controls */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 text-right flex justify-between items-center px-6">
                <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">
                  * Higher strength indicator cells automatically highlighted in green
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setCompareSiteIds([]);
                    setShowCompareModal(false);
                    showToast("Cleared comparison list!", "success");
                  }}
                  className="bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 font-bold px-4 py-1.5 rounded-xl text-xs cursor-pointer transition-colors"
                >
                  Reset Comparative Selection
                </button>
              </div>

            </div>
          </div>
        );
      })()}

      {/* Admin Rejection & Price Alert Modal */}
      {adminRejectionTarget && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4">
          <form 
            onSubmit={handleConfirmRejectionSubmit}
            className="bg-white rounded-3xl max-w-md w-full border border-slate-150 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 text-left"
          >
            {/* Header */}
            <div className="p-5 border-b border-rose-100 bg-gradient-to-r from-rose-50 to-white flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-rose-100 rounded-xl text-rose-700">
                  <Shield size={18} className="stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-950 leading-tight">Reject Publication Proposal</h3>
                  <p className="text-[10.5px] text-slate-500 mt-0.5">Notify publisher with active metrics email advisory.</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setAdminRejectionTarget(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4">
              <div className="p-3.5 bg-slate-50 border border-slate-150 rounded-2xl space-y-1">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <span>OUTLET DOMAIN</span>
                  <span>PROPOSED RATE</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="font-extrabold text-xs text-slate-800">{adminRejectionTarget.domain}</span>
                  <span className="font-black text-sm text-rose-600">${adminRejectionTarget.proposedPrice}</span>
                </div>
                <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-200/50 mt-1.5">
                  Publisher Contact: <span className="font-bold">{adminRejectionTarget.publisherEmail}</span>
                </div>
              </div>

              {/* Form Options */}
              <div className="space-y-1.5 text-xs">
                <label className="block text-[9.5px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                  Rejection Code / Preset Reason
                </label>
                <select
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-bold focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                >
                  <option value="Proposed price is too high for current metrics (DA/DR)">Proposed price is too high for current metrics (DA/DR)</option>
                  <option value="Rate exceeds maximum platform regional thresholds">Proposed rate exceeds maximum platform regional thresholds</option>
                  <option value="Organic traffic volume does not support this level of pricing">Organic traffic volume does not support this level of pricing</option>
                  <option value="Outlet template was flagged as spammy or low indexing index score">Outlet template was flagged as spammy</option>
                </select>
              </div>

              <div className="space-y-1.5 text-xs">
                <label className="block text-[9.5px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                  Custom Advisory Content (Optional overlay)
                </label>
                <textarea
                  rows={3}
                  value={customRejectionText}
                  onChange={(e) => setCustomRejectionText(e.target.value)}
                  placeholder="e.g. Your metrics qualify for max $60. Kindly reduce rates to auto-approve..."
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-rose-400 resize-none font-medium"
                />
              </div>

              <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 flex gap-2">
                <Mail size={16} className="text-indigo-650 shrink-0 mt-0.5" />
                <p className="text-[10px] text-indigo-800 leading-normal font-semibold">
                  This action generates a formal real-time simulated email alert delivered instantly to the publisher's digital inbox.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 px-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setAdminRejectionTarget(null)}
                className="bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 font-bold px-4 py-2 rounded-xl text-xs cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-rose-600 hover:bg-rose-700 text-white font-black px-4 py-2 rounded-xl text-xs cursor-pointer transition-all shadow-sm"
              >
                Confirm Rejection & Email Publisher
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SECURITY OTP VERIFICATION DIALOG */}
      {isOtpModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 text-left">
            <div className="p-5 border-b border-indigo-100 bg-gradient-to-r from-indigo-50/50 to-white flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-indigo-100 rounded-xl text-indigo-700">
                  <Shield size={18} className="stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-950 leading-tight">🛡️ Security Verification Authorized</h3>
                  <p className="text-[10.5px] text-slate-500 mt-0.5">Dual-factor password protection protocol active.</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => {
                  setIsOtpModalOpen(false);
                  setSettingsOtpCode(null);
                  setPendingSettings(null);
                }}
                className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 space-y-4 font-sans text-xs">
              <p className="text-slate-600 leading-relaxed">
                To complete the administration credential update and save the new password key, please enter the 6-digit verification code dispatched to <span className="font-bold text-slate-900 underline">{settingsAdminEmail || 'authorityplacement@gmail.com'}</span>.
              </p>

              <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-xl flex gap-2">
                <div className="text-sm">🔑</div>
                <div className="text-[10.5px] leading-relaxed">
                  <span className="font-bold">Security Note:</span> To verify immediately without checking the "Sent Mail Dispatch" tab, your generated OTP code is: <span className="font-mono font-black text-slate-900 bg-white px-2 py-0.5 rounded border border-amber-300 shadow-sm text-xs select-all">{settingsOtpCode}</span>.
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Enter 6-Digit OTP Security Code</label>
                <input
                  type="text"
                  maxLength={6}
                  value={userEnteredOtp}
                  onChange={(e) => {
                    setUserEnteredOtp(e.target.value.replace(/\D/g, ''));
                    setOtpError(null);
                  }}
                  placeholder="e.g. 529304"
                  className="w-full text-center tracking-[0.5em] font-mono font-black text-xl px-4 py-3 border border-slate-250 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15 bg-slate-50 focus:bg-white transition-all text-slate-800"
                />
                {otpError && (
                  <p className="text-[11px] font-semibold text-rose-600 mt-1 flex items-center gap-1 animate-pulse">
                    <span>⚠️</span> {otpError}
                  </p>
                )}
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 px-6 flex justify-between items-center">
              <span className="text-[10px] text-slate-400 font-medium">Expires in 15 minutes</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsOtpModalOpen(false);
                    setSettingsOtpCode(null);
                    setPendingSettings(null);
                  }}
                  className="bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 font-bold px-4 py-2 rounded-xl text-xs cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleVerifySaveSettingsOtp}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-black px-4 py-2 rounded-xl text-xs cursor-pointer transition-all shadow-sm flex items-center gap-1.5"
                >
                  <span>Verify & Update Key</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slide-in toast notification layout */}
      {toastMessage && (
        <div className={`fixed bottom-6 right-6 px-4 py-3 rounded-xl z-50 font-semibold text-xs shadow-lg animate-bounce border flex items-center gap-2 ${
          toastMessage.type === 'success' 
            ? 'bg-emerald-900 border-emerald-800 text-white' 
            : toastMessage.type === 'error'
            ? 'bg-red-900 border-red-800 text-white'
            : 'bg-slate-900 border-slate-800 text-white'
        }`}>
          <span>{toastMessage.type === 'success' ? '✓' : toastMessage.type === 'error' ? '❌' : 'ℹ️'}</span>
          <span>{toastMessage.msg}</span>
        </div>
      )}

    </div>
  );
}
