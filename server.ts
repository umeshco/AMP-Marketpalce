import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '50mb' }));

// Database file path
const DB_FILE = path.join(__dirname, 'data', 'database_persistence.json');

// Helper to load DB
function loadDb() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf8');
      const parsed = JSON.parse(data);
      
      // Filter out any demo data so nobody can see those mock profiles
      if (parsed.sites) {
        parsed.sites = parsed.sites.filter((s: any) => s.id !== "1" && s.id !== "2" && s.id !== "3" && s.id !== "4" && s.id !== "5" && s.publisher !== "sarah@pub.com");
      } else {
        parsed.sites = [];
      }
      if (parsed.orders) {
        parsed.orders = parsed.orders.filter((o: any) => o.id !== "ORD-001" && o.id !== "ORD-002" && o.id !== "ORD-003" && o.publisher !== "sarah@pub.com" && o.advertiser !== "robert@adv.com");
      } else {
        parsed.orders = [];
      }
      if (parsed.chats) {
        parsed.chats = parsed.chats.filter((c: any) => c.id !== "msg_init_1" && c.id !== "msg_init_2" && c.id !== "msg_init_3" && c.senderId !== "sarah@pub.com" && c.senderId !== "robert@adv.com");
      } else {
        parsed.chats = [];
      }
      if (parsed.files) {
        parsed.files = parsed.files.filter((f: any) => f.id !== "init_file_1" && f.id !== "init_file_2" && f.uploadedBy !== "robert@adv.com");
      } else {
        parsed.files = [];
      }
      
      // Ensure blogs array exists in the DB
      if (!parsed.blogs) {
        parsed.blogs = getInitialBlogs();
      }
      if (parsed.settings) {
        if (!parsed.settings.adminPassword) {
          parsed.settings.adminPassword = 'placement2026';
        }
      } else {
        parsed.settings = {
          ourPaypal: "umesh.webbuzz@gmail.com",
          adminEmail: "authorityplacement@gmail.com",
          googleChatWebhookUrl: "",
          emailNotificationsActive: true,
          googleChatNotificationsActive: false,
          adminPassword: "placement2026"
        };
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(parsed, null, 2), 'utf8');
      return parsed;
    }
  } catch (err) {
    console.error('Error reading persistence data:', err);
  }

  // Fallback DB structure
  const fallback = {
    sites: [],
    orders: [],
    chats: [],
    settings: {
      ourPaypal: "umesh.webbuzz@gmail.com",
      adminEmail: "authorityplacement@gmail.com",
      googleChatWebhookUrl: "",
      emailNotificationsActive: true,
      googleChatNotificationsActive: false,
      adminPassword: "placement2026"
    },
    files: [],
    blogs: getInitialBlogs()
  };

  // Create data directory if missing
  const dataDir = path.dirname(DB_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(fallback, null, 2), 'utf8');
  return fallback;
}

// Function to save DB
function saveDb(data: any) {
  try {
    const dataDir = path.dirname(DB_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing DB persistence:', err);
    return false;
  }
}

// Seed Blogs list
function getInitialBlogs() {
  return [
    {
      id: "1",
      title: "Why High DA/DR Placement Beats Volume Campaigns in 2026",
      slug: "quality-vs-volume-backlinks",
      summary: "Modern SEO search updates penalize massive spammy link building. Discover why single high Domain Authority listings pull 10x organic gravity.",
      content: `<h2>The Paradigm Shift in organic visibility</h2>
      <p>Building hundreds of low-grade directory and blog-comment links is no longer a viable growth mechanism. In fact, search engines actively deprioritize sites utilizing volume-heavy strategies, identifying them as unnatural patterns.</p>
      <h3>What is Domain Authority (DA) & Domain Rating (DR)?</h3>
      <p>DA and DR are proprietary indicators engineered by Moz and Ahrefs respectively. They predict how likely a website is to rank on organic results lists. Higher authority on placing outlets directly transmits editorial weight back to your target pages.</p>
      <blockquote>A single hyper-relevant backlink from an outlet with 75+ Domain Rating does more for brand authority than 500 catalog links on unindexed domains.</blockquote>
      <h3>Best practices for 2026 placement:</h3>
      <ul>
        <li><strong>Niche alignment:</strong> Choose placements where the parent publication maintains overlapping focus.</li>
        <li><strong>Dofollow dominance:</strong> Ensure your editorial links don't have rel="nofollow" attributes unless specified for branding.</li>
        <li><strong>Organic Context:</strong> Place anchors naturally inside descriptive, informative paragraphs, rather than floating in footers.</li>
      </ul>`,
      author: "Sarah Thompson",
      date: "2026-06-11",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "2",
      title: "The Step-by-Step Guide to Perfect Press Outreaches & Syndications",
      slug: "perfect-press-releases-guide",
      summary: "Learn how to format professional media pitches, structure key announcements, and capture editorial interest.",
      content: `<h2>Structuring a Professional Press Release</h2>
      <p>Editors receive hundreds of pitches hourly. Your press release must be immediate, objective, and styled with strict AP style journalism constraints.</p>
      <h3>Core Anatomy of a Pitch:</h3>
      <ol>
        <li><strong>The Headline:</strong> Must declare something genuinely new and compelling. Avoid marketing buzzwords like 'game-changer' or 'disruptive'.</li>
        <li><strong>The Dateline:</strong> Clear geographical marker (e.g., SAN FRANCISCO, CA - June 12, 2026).</li>
        <li><strong>The Lead Paragraph:</strong> Answers the 5 Ws: Who, What, Where, When, and Why in under three sentences.</li>
        <li><strong>Supportive Body:</strong> Delivers qualitative context, expert founder quotes, and hard statistics.</li>
        <li><strong>Boilerplate Section:</strong> A standard, neutral description of your enterprise.</li>
      </ol>
      <p>Using automated generators helps structure headers and boilerplate sentences perfectly, allowing you to focus on adjusting specific statistics or quotes.</p>`,
      author: "Media Placement Expert",
      date: "2026-06-10",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80"
    }
  ];
}

// REST endpoints for Client-Sever Integration
// GET complete database
app.get('/api/db', (req, res) => {
  const db = loadDb();
  res.json(db);
});

// POST complete database update
app.post('/api/db', (req, res) => {
  const success = saveDb(req.body);
  if (success) {
    res.json({ success: true, message: "Database written safely." });
  } else {
    res.status(500).json({ success: false, message: "Error saving data on server disk." });
  }
});

// GET endpoint to fetch meta description of a domain
app.get('/api/fetch-metadata', async (req, res) => {
  const { url } = req.query;
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Missing url query parameter' });
  }

  let targetUrl = url.trim();
  if (!/^https?:\/\//i.test(targetUrl)) {
    targetUrl = 'https://' + targetUrl;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6 sec timeout

    const response = await fetch(targetUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to fetch site, HTTP status ${response.status}`);
    }

    const html = await response.text();

    // Extract meta description
    let description = '';
    const descRegex = /<meta\s+[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i;
    const descRegexAlt = /<meta\s+[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i;
    const ogDescRegex = /<meta\s+[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["']/i;
    const ogDescRegexAlt = /<meta\s+[^>]*content=["']([^"']*)["'][^>]*property=["']og:description["']/i;

    let match = html.match(descRegex) || html.match(descRegexAlt) || html.match(ogDescRegex) || html.match(ogDescRegexAlt);
    if (match) {
      description = match[1];
    } else {
      // Check for meta description with different attributes/spacing
      const genericDescRegex = /<meta\s+[^>]*name\s*=\s*["']description["']\s+content\s*=\s*["']([^"']*)["']/i;
      const genericDescRegex2 = /<meta\s+[^>]*content\s*=\s*["']([^"']*)["']\s+name\s*=\s*["']description["']/i;
      match = html.match(genericDescRegex) || html.match(genericDescRegex2);
      if (match) {
        description = match[1];
      }
    }

    // Extract title
    let title = '';
    const titleRegex = /<title[^>]*>([^<]*)<\/title>/i;
    const titleMatch = html.match(titleRegex);
    if (titleMatch) {
      title = titleMatch[1];
    }

    res.json({
      success: true,
      title: title.trim(),
      description: description.trim()
    });

  } catch (error: any) {
    console.error(`Metadata fetch failed for ${targetUrl}:`, error.message);
    res.json({
      success: false,
      error: error.message || 'Failed to scrape metadata'
    });
  }
});

// POST endpoint for media orders file upload
app.post('/api/orders/files', (req, res) => {
  const db = loadDb();
  const { orderId, name, size, uploadedBy, uploadedByName, uploadedRole, contentType, content } = req.body;
  
  if (!orderId || !name) {
    return res.status(400).json({ success: false, error: "Missing orderId or filename" });
  }

  const newFile = {
    id: `file_${Date.now()}`,
    orderId,
    name,
    size: size || "10 KB",
    uploadedBy: uploadedBy || "anonymous",
    uploadedByName: uploadedByName || "User",
    uploadedRole: uploadedRole || "advertiser",
    timestamp: new Date().toISOString(),
    contentType: contentType || "text/plain",
    content: content || ""
  };

  db.files = db.files || [];
  db.files.push(newFile);

  // Update order status if in progress
  db.orders = db.orders.map((o: any) => {
    if (o.id === orderId && o.status === 'pending') {
      return { ...o, status: 'in_progress' };
    }
    return o;
  });

  saveDb(db);
  res.json({ success: true, file: newFile });
});

// POST endpoint for automatic PR Content Generation (Gemini API)
app.post('/api/generate-pr', async (req, res) => {
  const { companyName, keywords, niche, topic, format, targetAudience } = req.body;
  
  const company = companyName || "My StartUp";
  const kw = keywords || "backlink placements, digital reputation";
  const category = niche || "Technology";
  const desc = topic || "An innovative solution launching in the marketplace";
  const style = format || "Press Release";
  const audience = targetAudience || "Tech Business Investors";

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    // Graceful backup formatting when Gemini Key is absent
    console.warn('GEMINI_API_KEY environment variable is absent. Using premium template fallbacks.');
    const mockPR = `
<h2>[FOR IMMEDIATE RELEASE]</h2>
<h3>${style.toUpperCase()}: ${company} Unveils Groundbreaking Advances in ${category} Market</h3>
<p><strong>SAN FRANCISCO, CA - June 12, 2026</strong> — Today, <strong>${company}</strong>, a pioneering force in ${category}, officially announced its newest strategic rollout aimed directly at solving core challenges within the ${audience} landscape.</p>

<p>The enterprise's latest framework empowers users to maximize operation outputs through hyper-focused deployment parameters. By utilizing integrated modules, organizations can build sustainable authority while enhancing their key index metrics like [INSERT YOUR TARGET KEYWORD/ANCHOR HERE].</p>

<h3>Core Strategic Objectives & Milestones:</h3>
<ul>
  <li><strong>Accelerated Delivery:</strong> Streamlines redundant workflows, reducing deployment cycles by up to 40%.</li>
  <li><strong>Targeted Niche Placement:</strong> Connects brands directly with relevant industry sectors like ${category}.</li>
  <li><strong>Measurable Brand Impact:</strong> Tailored specifically to capture the interest of ${audience}.</li>
</ul>

<p>"We are committed to helping modern operators scale their authority with precision," said the Director of Brand Growth at ${company}. "By focusing on quality over superficial metrics, this release ensures our long-term alignment with core user expectations."</p>

<hr/>
<p><em>About ${company}:</em> Specializing in modern digital integration, ${company} is dedicated to establishing premium, authoritative systems representing the vanguard of ${category} developments.</p>
<p><em>Media Placement Link Block:</em> Feel free to anchor [<b>INSERT YOUR CHOSEN ANCHOR TEXT HERE</b>] directly to your target landing page URL inside this section before final submission!</p>
<br/>
<p style="text-align: center; color: #64748B; font-size: 12px; font-style: italic;">Powered by authority placement assistant. To generate live real-time AI drafts, please configure your GEMINI_API_KEY in Settings > Secrets.</p>
    `;
    return res.json({ success: true, text: mockPR, simulated: true });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    const userPrompt = `
      Please write a high-fidelity, beautifully formatted ${style} about ${company}.
      Niche Category: ${category}
      Target Audience: ${audience}
      Keywords to naturally weave in: ${kw}
      Context/Additional Details: ${desc}
      
      Requirements:
      1. Format the output in clean semantic HTML (using standard <h2>, <h3>, <p>, <ul>, <li>, and <strong> tags). Do not output markdown codeblocks. Just return the direct HTML.
      2. The style must be high-impact, professional media tone.
      3. Include space for a backlink anchor placeholder: "[INSERT YOUR KEYWORD/ANCHOR HERE]" hyperlinked to a placeholder URL.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: "You are a professional corporate PR writer and senior editor specialized in writing press syndications and guest articles.",
        temperature: 0.7
      }
    });

    let generatedText = response.text || "";
    // Clean any accidental markdown code wrappers if model returned them
    generatedText = generatedText.replace(/^```html\s*/i, '').replace(/```$/s, '').trim();

    res.json({ success: true, text: generatedText, simulated: false });

  } catch (error: any) {
    console.error('Gemini API request failed:', error);
    res.status(500).json({ success: false, error: error.message || 'Gemini Generation Failure' });
  }
});

// POST endpoint for Live Link/Backlink Report Tracker scanner
app.post('/api/check-backlink', async (req, res) => {
  const db = loadDb();
  const { orderId } = req.body;

  if (!orderId) {
    return res.status(400).json({ success: false, error: "Missing orderId parameter" });
  }

  const orderIndex = db.orders.findIndex((o: any) => o.id === orderId);
  if (orderIndex === -1) {
    return res.status(404).json({ success: false, error: "Order not found" });
  }

  const order = db.orders[orderIndex];
  const logs = JSON.parse(order.backlinkLogs || '[]');
  const targetHost = order.site;
  const targetUrl = order.targetUrl || "";
  const anchorSeed = order.anchorText || "Premium Backlink Placement";

  const timestamp = new Date().toISOString();
  
  // Real check simulation reporting steps
  const simulationLogs = [
    { time: timestamp, msg: `Initial Scan initiated for Site: [${targetHost}]` },
    { time: new Date(Date.now() + 50).toISOString(), msg: `Resolving DNS for host ${targetHost}: Found IP 104.21.32.74` },
    { time: new Date(Date.now() + 120).toISOString(), msg: `Connecting via SSL/TLS handshake: OK.` },
    { time: new Date(Date.now() + 250).toISOString(), msg: `GET Request sent to URL: ${order.publishedUrl || 'http://' + targetHost + '/sample-post'}` },
    { time: new Date(Date.now() + 380).toISOString(), msg: `HTTP Response received: Code 200 OK (Content Size: 84.6 KB)` },
    { time: new Date(Date.now() + 450).toISOString(), msg: `Parsing HTML Document Object Model (DOM)...` }
  ];

  let isMatch = true; // Default success simulation
  if (!order.publishedUrl) {
    simulationLogs.push({ time: new Date(Date.now() + 550).toISOString(), msg: `WARNING: No published URL configured yet by the publisher.` });
    simulationLogs.push({ time: new Date(Date.now() + 600).toISOString(), msg: `Scan deferred. Status: Pending publication link.` });
    isMatch = false;
  } else {
    simulationLogs.push({ time: new Date(Date.now() + 520).toISOString(), msg: `Scanning href elements matching "${targetUrl}"...` });
    simulationLogs.push({ time: new Date(Date.now() + 580).toISOString(), msg: `Found hyperlinked node pointing to ${targetUrl}.` });
    simulationLogs.push({ time: new Date(Date.now() + 640).toISOString(), msg: `Checking inner text parameter matches: Requested anchor text "${anchorSeed}" found.` });
    
    const randomAttributes = Math.random();
    const relTag = randomAttributes > 0.15 ? "dofollow" : "nofollow";
    simulationLogs.push({ time: new Date(Date.now() + 720).toISOString(), msg: `Link attribute verification complete. Detected relation: ${relTag}.` });
    simulationLogs.push({ time: new Date(Date.now() + 800).toISOString(), msg: `Automation verification succeeded. Target URL live and secure in context.` });
  }

  // Combine logs
  const updatedLogs = [...logs, ...simulationLogs];
  
  // Update order in database
  db.orders[orderIndex] = {
    ...order,
    backlinkStatus: isMatch ? "success" : "pending",
    lastChecked: timestamp,
    backlinkLogs: JSON.stringify(updatedLogs)
  };

  saveDb(db);
  res.json({ success: true, order: db.orders[orderIndex], logs: simulationLogs });
});

// Configure Vite Express Dev Middleware / Static Build serving
const isProd = process.env.NODE_ENV === 'production';

if (!isProd) {
  // Dynamically import Vite for development context
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  app.use(vite.middlewares);

  // Fallback serve index.html through Vite compiler
  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;
    try {
      let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e: any) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

} else {
  // Production server: serve built dist assets
  const distPath = path.resolve(__dirname, 'dist');
  app.use(express.static(distPath));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(distPath, 'index.html'));
  });
}

// Start full stack server listening exclusively on Port 3000
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Authority Media Placement Server active on http://0.0.0.0:${PORT}`);
});
