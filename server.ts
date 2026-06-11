import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize Google GenAI client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

app.use(express.json());

// Lazy initialize Nodemailer transporter to prevent startup crashes when SMTP variables are not set
let transporter: any = null;
function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    try {
      console.log(`Initializing Nodemailer SMTP transport: ${host}:${port}`);
      transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: {
          user,
          pass,
        },
        tls: {
          rejectUnauthorized: false
        }
      });
    } catch (e) {
      console.error("Failed to create Nodemailer transport:", e);
    }
  }
  return transporter;
}

// API: Send signup and notification emails
app.post("/api/send-email", async (req, res) => {
  try {
    const { to, subject, html } = req.body;
    if (!to || !subject || !html) {
      return res.status(400).json({ error: "Required fields: to, subject, html" });
    }

    const t = getTransporter();
    if (t) {
      const fromAddress = process.env.SMTP_FROM || '"Authority Media Placement" <noreply@authorityplacement.com>';
      await t.sendMail({
        from: fromAddress,
        to,
        subject,
        html,
      });
      console.log(`REAL email sent to ${to} with subject: ${subject}`);
      return res.json({ success: true, mode: "smtp", message: `Email successfully sent to ${to} via SMTP.` });
    } else {
      console.log(`SIMULATED email to ${to}\nSubject: ${subject}\nSMTP is not configured yet in .env.`);
      return res.json({
        success: true,
        mode: "simulated",
        message: `SMTP not configured. Email logged in Admin Panel Outbox for testing. Send to: ${to}`,
      });
    }
  } catch (error: any) {
    console.error("Nodemailer error:", error);
    return res.status(500).json({ error: error.message || "Failed to deliver email" });
  }
});

// API: Generate a professional press release draft
app.post("/api/generate-draft", async (req, res) => {
  try {
    const { brandName, website, niche, keywords, instructions, angle } = req.body;

    if (!brandName) {
      return res.status(400).json({ error: "Brand name is required." });
    }

    const keywordList = Array.isArray(keywords) ? keywords.join(", ") : keywords || "None";
    
    // Construct a professional prompt for high-quality PR drafting
    const prompt = `You are a world-class senior Public Relations (PR) specialist and editorial writer for tier-1 publications like Forbes, Bloomberg, and Yahoo Finance.
Your task is to write a highly professional, engaging, and standard-compliant Press Release for a brand seeking media coverage.

=== Brand Information ===
Brand Name: ${brandName}
Target Website: ${website || "N/A"}
Niche/Industry: ${niche || "N/A"}
Target Keywords: ${keywordList}
Chosen Article Angle/Topic: ${angle || "General Announcement"}
Specific Client Instructions: ${instructions || "None provided. Focus on creating an authoritative, positive announcement about the brand's vision and impact."}

=== Editorial Guidelines ===
1. Tone: Authoritative, institutional, objective, third-person ("she/he/they/it", never "we/our/I"). It must sound like an independent journalist or wire service written piece.
2. Structure:
   - **HEADLINE**: Captivating, news-oriented, active voice (Caps-case or high-impact, bold). Do not use clickbait, keep it premium.
   - **SUBHEAD**: Expand on the headline, setting the scene for what is new.
   - **DATELINE**: Format strictly as: "CITY, STATE - June 10, 2026 -" followed by the lead hook immediately.
   - **LEAD PARAGRAPH**: Answer who, what, when, where, and why in a compelling news hook.
   - **BODY PARAGRAPHS**: Deepen the story, highlighting market pain points, solutions, metrics of success, and future growth.
   - **EXECUTIVE QUOTE**: Create a realistic, highly professional quote from a fictional executive or the founder (e.g. "CEO and Founder of ${brandName}"). Make the quote sound visionary, realistic, and completely free of sales-fluff.
   - **BOILERPLATE (About ${brandName})**: A 3-sentence institutional overview of the brand and its mission.
   - **MEDIA CONTACT**: Fictional placeholder media contact information including Name, Email, and Website.
3. Formatting: Output the result using beautiful Markdown formatting. Ensure target keywords are naturally integrated into the text and bolded. Also naturally insert hyperlinked anchor text for ${website} (e.g., "[visit ${brandName}](${website})") in the lead or boilerplate.

Write the complete press release now:`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.8,
      },
    });

    const textOutput = response.text || "Failed to generate content.";
    res.json({ draft: textOutput });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: error.message || "An error occurred while generating the draft." });
  }
});

// Setup dev server with Vite or static routing for production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
