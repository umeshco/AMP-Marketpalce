export interface SiteChanges {
  price?: number;
  writingPrice?: number;
  traffic?: number;
  description?: string;
  allowLinkInsertion?: boolean;
  linkInsertionPrice?: number;
}

export interface Site {
  id: string;
  domain: string;
  da: number;
  dr: number;
  traffic: number;
  niche: string;
  price: number;
  writingPrice: number;
  status: "approved" | "pending" | "rejected";
  publisher: string;
  dofollow: boolean;
  turnaround: number;
  sponsoredTag: boolean;
  homepageFeature: boolean;
  samplePost: string;
  description: string;
  lifespan: string;
  allowLinkInsertion?: boolean;
  linkInsertionPrice?: number;
  pendingChanges?: SiteChanges;
}

export interface Order {
  id: string;
  site: string;
  advertiser: string;
  publisher: string;
  amount: number;
  commission: number;
  publisherEarning: number;
  status: "pending" | "in_progress" | "completed" | "rejected";
  date: string;
  type: "Guest Post" | "Sponsored Post" | "Link Insertion";
  targetUrl: string;
  anchorText: string;
  publishedUrl?: string;
  backlinkStatus: "success" | "pending" | "failed";
  lastChecked?: string;
  backlinkLogs?: string; // Serialized string of logs
  whoWrites: "advertiser" | "publisher";
  notes?: string;
}

export interface ChatMessage {
  id: string;
  room: string;
  senderId: string;
  senderName: string;
  senderRole: "admin" | "advertiser" | "publisher";
  text: string;
  timestamp: string;
}

export interface OrderFile {
  id: string;
  orderId: string;
  name: string;
  size: string;
  uploadedBy: string;
  uploadedByName: string;
  uploadedRole: string;
  timestamp: string;
  contentType: string;
  content: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

export interface AdminSettings {
  ourPaypal: string;
  adminEmail: string;
  googleChatWebhookUrl: string;
  emailNotificationsActive: boolean;
  googleChatNotificationsActive: boolean;
  adminPassword?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "advertiser" | "publisher";
  wallet: number;
}

export interface SimulatedEmail {
  id: string;
  to: string;
  from: string;
  subject: string;
  body: string;
  timestamp: string;
  read: boolean;
  type: "rejection" | "system" | "editorial";
  siteDomain?: string;
  proposedPrice?: number;
}

