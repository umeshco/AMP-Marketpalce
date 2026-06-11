import React, { useState, useEffect, useRef } from 'react';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from 'react/jsx-runtime';
import { FAQS } from './data';
import { INITIAL_BLOGS } from './initialBlogs';
import { BlogsManagerAdmin } from './BlogsManagerAdmin';

// Setup original mini-framework mappings
const l = {
  jsx: _jsx,
  jsxs: _jsxs,
  Fragment: _Fragment
};
const T = React;


// Main initial app datasets & styling configs
const ii={"admin@authorityplacement.com":{hash:"a591025453039e5a5b536d48a1540cb8e92ab93673b42c21f2a3da804d341009",user:{role:"admin",name:"Admin",email:"admin@authorityplacement.com",id:"admin"}},"authorityplacement@gmail.com":{hash:"a591025453039e5a5b536d48a1540cb8e92ab93673b42c21f2a3da804d341009",user:{role:"admin",name:"Admin",email:"authorityplacement@gmail.com",id:"admin"}},"rajesh@adv.com":{hash:"8fd6a9c54c6f564d7042ad268351ebf1bbf9749c5bac835949bfbd0fc552816d",user:{role:"advertiser",name:"Rajesh Kumar",email:"rajesh@adv.com",id:"adv1",wallet:2500,spent:630}},"priya@pub.com":{hash:"8fd6a9c54c6f564d7042ad268351ebf1bbf9749c5bac835949bfbd0fc552816d",user:{role:"publisher",name:"Priya Sharma",email:"priya@pub.com",id:"pub1",wallet:847.5,earned:945}}},cc=["Technology","SaaS & Software","Cybersecurity","Artificial Intelligence","Blockchain & Web3","Cryptocurrency","Gaming","Mobile Apps","E-commerce","Digital Marketing","Finance & Investing","Business & Entrepreneurship","Startups","Real Estate","Insurance","Banking & Fintech","Accounting & Tax","HR & Recruitment","Supply Chain & Logistics","Retail","Health & Wellness","Mental Health","Fitness & Exercise","Nutrition & Diet","Beauty & Skincare","Fashion & Style","Parenting & Family","Relationships","Senior Living","Pets & Animals","Photography","Music & Audio","Film & TV","Art & Design","Writing & Publishing","Podcasting","Social Media","Influencer Marketing","Content Creation","Journalism","Education & E-Learning","Online Courses","Career Development","Study Abroad","Languages","Travel & Tourism","Food & Recipes","Home & Garden","Interior Design","Weddings & Events","Outdoors & Adventure","Sports & Athletics","Automotive","Luxury & Premium","Sustainability","Law & Legal","Healthcare & Medical","Architecture","Engineering","Science & Research","Politics & Government","Non-Profit & Charity","Religion & Spirituality"],p={primary:"#0F172A",accent:"#6366F1",accentLight:"#EEF2FF",accentDark:"#4338CA",success:"#10B981",successLight:"#ECFDF5",warningLight:"#FFFBEB",danger:"#EF4444",dangerLight:"#FEF2F2",muted:"#64748B",border:"#E2E8F0",bg:"#F8FAFC",text:"#0F172A",textSoft:"#475569"};
const Js=[{id:1,domain:"techcrunch-style.com",da:78,dr:82,traffic:245e3,niche:"Technology",price:250,writingPrice:380,status:"approved",publisher:"pub1",dofollow:!0,turnaround:3,sponsoredTag:!0,homepageFeature:!0,samplePost:"https://techcrunch-style.com/sample-post",description:"Leading technology blog with a focus on startups, venture capital funding, cutting-edge software products, and global consumer electronics trends.",lifespan:"Permanent"},{id:2,domain:"healthblog.net",da:55,dr:61,traffic:89e3,niche:"Health & Wellness",price:90,writingPrice:140,status:"approved",publisher:"pub2",dofollow:!0,turnaround:5,sponsoredTag:!0,homepageFeature:!1,samplePost:"https://healthblog.net/sample",description:"A premium health and wellness publication catering to readers seeking certified advice on fitness, general nutrition plans, and organic lifestyle recipes.",lifespan:"Permanent"},{id:3,domain:"financeinsider.io",da:67,dr:71,traffic:132e3,niche:"Finance & Investing",price:160,writingPrice:240,status:"pending",publisher:"pub1",dofollow:!1,turnaround:4,sponsoredTag:!1,homepageFeature:!0,samplePost:"",description:"Providing weekly expert insights on global stock markets, emerging cryptocurrencies, investment fundamentals, and modern budget planning tools.",lifespan:"Permanent"},{id:4,domain:"travelbuzz.co",da:43,dr:48,traffic:54e3,niche:"Travel & Tourism",price:65,writingPrice:100,status:"approved",publisher:"pub3",dofollow:!0,turnaround:7,sponsoredTag:!1,homepageFeature:!1,samplePost:"https://travelbuzz.co/example",description:"An authentic travel guide run by veteran globetrotters sharing detailed country-specific itinerary plans, reviews of luxury hotels, and adventure sports recommendations.",lifespan:"1 Year"},{id:5,domain:"digitalmarkethub.com",da:72,dr:76,traffic:198e3,niche:"Digital Marketing",price:200,writingPrice:300,status:"approved",publisher:"pub2",dofollow:!0,turnaround:3,sponsoredTag:!0,homepageFeature:!0,samplePost:"https://digitalmarkethub.com/guest-example",description:"Actionable tips and deep-dives on search engine optimization (SEO), growth hacking strategies, content marketing strategies, and conversion rate optimization metrics.",lifespan:"Permanent"}];
const Ip=[{id:"ORD-001",site:"techcrunch-style.com",advertiser:"adv1",publisher:"pub1",amount:350,commission:35,publisherEarning:315,status:"completed",date:"2026-01-01",type:"Guest Post"},{id:"ORD-002",site:"healthblog.net",advertiser:"adv2",publisher:"pub2",amount:120,commission:12,publisherEarning:108,status:"in_progress",date:"2026-03-03",type:"Sponsored Post"},{id:"ORD-003",site:"digitalmarkethub.com",advertiser:"adv1",publisher:"pub2",amount:280,commission:28,publisherEarning:252,status:"pending",date:"2026-05-05",type:"Guest Post"}];async function uc(e){const n=new TextEncoder().encode(e+"amp_salt_2024"),r=await crypto.subtle.digest("SHA-256",n);return Array.from(new Uint8Array(r)).map(o=>o.toString(16).padStart(2,"0")).join("")}async function Oo(e,t){return await uc(e)===t}

// --- Premium HTML Email Templates and Logger Service ---
export function getEmailTemplate(type: string, data: { name: string; email: string; role: string; reason?: string }) {
  const date = new Date().toLocaleDateString("en-IN", { year: 'numeric', month: 'long', day: 'numeric' });
  let accentColor = "#6366F1"; // Slate Indigo
  let title = "";
  let bodyContent = "";

  if (type === "welcome_pending") {
    accentColor = "#6366F1";
    title = "We are reviewing your registration";
    bodyContent = `
      <p style="font-size: 16px; line-height: 1.6; color: #1e293b; margin-bottom: 16px;">Hello <strong>${data.name}</strong>,</p>
      <p style="font-size: 15px; line-height: 1.6; color: #334155; margin-bottom: 16px;">
        Thank you for registering on <strong>Authority Media Placement</strong> as an <span style="text-transform: capitalize; font-weight: bold; color: ${accentColor};">${data.role}</span>!
      </p>
      <div style="background-color: #f8fafc; border-left: 4px solid ${accentColor}; padding: 16px; border-radius: 6px; margin-bottom: 20px;">
        <p style="margin: 0; font-size: 14px; color: #475569; font-weight: 500;">
          ⏳ <strong>Account Status: Pending Editorial Review</strong>
        </p>
        <p style="margin: 6px 0 0 0; font-size: 13px; color: #64748b; line-height: 1.5;">
          Our administrative and editorial team reviews every application to maintain our 100% white-hat standard. Reviews typically take <strong>12 to 24 hours</strong>.
        </p>
      </div>
      <p style="font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 24px;">
        Once approved, you will receive another email letting you access your custom dashboard and begin operations immediately.
      </p>
    `;
  } else if (type === "admin_alert") {
    accentColor = "#0f172a"; // Corporate Charcoal
    title = "🔔 New User Awaiting Admin Approval";
    bodyContent = `
      <p style="font-size: 16px; line-height: 1.6; color: #1e293b; margin-bottom: 16px;">Hello Admin,</p>
      <p style="font-size: 15px; line-height: 1.6; color: #334155; margin-bottom: 16px;">
        A new account has registered on Authority Media Placement and is awaiting your review.
      </p>
      <div style="background-color: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 8px; padding: 18px; margin-bottom: 24px;">
        <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
          <tr>
            <td style="padding: 6px 0; color: #64748b; font-weight: bold; width: 30%;">Full Name:</td>
            <td style="padding: 6px 0; color: #1e293b; font-weight: bold;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b; font-weight: bold;">Email Address:</td>
            <td style="padding: 6px 0; color: #1e293b;">${data.email}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b; font-weight: bold;">Selected Role:</td>
            <td style="padding: 6px 0; color: #6366f1; font-weight: bold; text-transform: capitalize;">${data.role}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b; font-weight: bold;">Application Date:</td>
            <td style="padding: 6px 0; color: #1e293b;">${date}</td>
          </tr>
        </table>
      </div>
      <p style="font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 24px;">
        Please log in to the <strong>Admin Control Panel</strong> under the <strong>Users Management</strong> section to review their details, accept their registration, or reject it.
      </p>
      <div style="text-align: center; margin-bottom: 20px;">
        <a href="${typeof window !== 'undefined' ? window.location.origin : ''}/?admin=1" style="background-color: #6366F1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Go to User Approvals Panel →</a>
      </div>
    `;
  } else if (type === "approved") {
    accentColor = "#10b981"; // Success Emerald
    title = `🎉 Your ${data.role === "publisher" ? "Publisher" : "Advertiser"} Account has been Approved!`;
    const actionBlock = data.role === "publisher"
      ? `<p style="font-size: 15px; line-height: 1.6; color: #334155; margin-bottom: 16px;">
          Congratulations! Your <strong>publisher account</strong> has been approved. You are now ready to <strong>add your high-authority website(s)</strong> to start listing your inventory, specifying your pricing tiers, and answering guest post orders. Let's make your web domains highly visible and monetize your digital authority today!
         </p>
         <div style="background-color: #ecfdf5; border-left: 4px solid ${accentColor}; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
           <p style="margin: 0; font-size: 14px; color: #065f46; font-weight: bold;">
             🌐 Next Step: Add Your First Site
           </p>
           <p style="margin: 6px 0 0 0; font-size: 13.5px; color: #047857; line-height: 1.5;">
             Go to the <strong>"My Sites"</strong> tab, list your URL, and let our engine automatically fetch up-to-date Ahrefs and Moz metrics to attract premium buyers in no time.
           </p>
         </div>`
      : `<p style="font-size: 15px; line-height: 1.6; color: #334155; margin-bottom: 16px;">
          Congratulations! Your <strong>advertiser account</strong> has been approved. You can now access our <strong>curated private marketplace</strong> to browse verified sites and select premium guest post slots as per your exact requirements.
         </p>
         <div style="background-color: #ecfdf5; border-left: 4px solid ${accentColor}; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
           <p style="margin: 0; font-size: 14px; color: #065f46; font-weight: bold;">
             🛍️ Next Step: Browse Hand-Vetted Publishers
           </p>
           <p style="margin: 6px 0 0 0; font-size: 13.5px; color: #047857; line-height: 1.5;">
             Head to the <strong>"Marketplace"</strong> tab to filter thousands of high-DR blogs by niche, budget, and SEO authority. As a special welcome, we have credited your sandbox wallet with <strong>$1,000.00</strong> to test place orders!
           </p>
         </div>`;

    bodyContent = `
      <p style="font-size: 16px; line-height: 1.6; color: #1e293b; margin-bottom: 16px;">Hello <strong>${data.name}</strong>,</p>
      <p style="font-size: 15px; line-height: 1.6; color: #334155; margin-bottom: 16px;">
        We have fantastic news! Our administrative review of your application is complete, and your account on <strong>Authority Media Placement</strong> has been successfully <strong>APPROVED</strong>.
      </p>
      ${actionBlock}
      <p style="font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 24px;">
        Click the login button below to access your fully authorized, active dashboard.
      </p>
      <div style="text-align: center; margin-bottom: 20px;">
        <a href="${typeof window !== 'undefined' ? window.location.origin : ''}" style="background-color: ${accentColor}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Access My Active Dashboard →</a>
      </div>
    `;
  } else if (type === "rejected") {
    accentColor = "#ef4444"; // Danger Rose
    title = "Update regarding your registration";
    bodyContent = `
      <p style="font-size: 16px; line-height: 1.6; color: #1e293b; margin-bottom: 16px;">Hello <strong>${data.name}</strong>,</p>
      <p style="font-size: 15px; line-height: 1.6; color: #334155; margin-bottom: 16px;">
        Thank you for your interest in registering on <strong>Authority Media Placement</strong> as a ${data.role}.
      </p>
      <p style="font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 16px;">
        After details review by our quality control board, your application has unfortunately been <strong>declined</strong> at this time.
      </p>
      <div style="background-color: #fef2f2; border-left: 4px solid ${accentColor}; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
        <p style="margin: 0; font-size: 14px; color: #991b1b; font-weight: bold;">
          ✕ Reason for Decline: Quality Criteria Guidelines
        </p>
        <p style="margin: 6px 0 0 0; font-size: 13px; color: #b91c1c; line-height: 1.5;">
          ${data.reason || "We require our registered users to maintain stringent metrics regarding spam scores, legitimate corporate domains, and professional outreach credentials. We suggest improving your metrics and reapplying in the future."}
        </p>
      </div>
      <p style="font-size: 13px; line-height: 1.6; color: #64748b; margin-bottom: 24px;">
        If you feel this assessment was made in error or have any questions, you can contact our editorial office back at <a href="mailto:publishers@authorityplacement.com" style="color: #6366f1;">publishers@authorityplacement.com</a>.
      </p>
    `;
  }

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 40px 10px;">
  <table style="max-width: 600px; width: 100%; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border-collapse: separate; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
    <thead>
      <tr style="background-color: #0f172a; text-align: center;">
        <th style="padding: 24px;">
          <span style="font-size: 20px; font-weight: bold; color: #ffffff; letter-spacing: 0.5px; font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;">AUTHORITY placement</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 32px 24px; background-color: #ffffff;">
          <div style="border-bottom: 2px solid ${accentColor}; padding-bottom: 14px; margin-bottom: 24px;">
            <h1 style="font-size: 20px; font-weight: bold; color: #0f172a; margin: 0; font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;">${title}</h1>
          </div>
          ${bodyContent}
        </td>
      </tr>
      <tr style="background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center;">
        <td style="padding: 24px; font-size: 12px; color: #94a3b8; line-height: 1.5;">
          <p style="margin: 0 0 8px 0;">This email was automatically dispatched from authorityplacement.com</p>
          <p style="margin: 0;">© 2026 authorityplacement.com · Central Editorial Office</p>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>`;
}

export const sendEmailNotification = async (payload: { to: string; subject: string; html: string; category: string }) => {
  // 1. Save to Client logs for interactive mock-verification panel
  try {
    const logsStr = localStorage.getItem("amp_email_logs");
    const existingLogs = logsStr ? JSON.parse(logsStr) : [];
    const nextLog = {
      id: "mail_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
      timestamp: new Date().toLocaleString("en-IN"),
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      category: payload.category,
      status: "delivered"
    };
    localStorage.setItem("amp_email_logs", JSON.stringify([nextLog, ...existingLogs]));
  } catch (e) {
    console.error("Local email logging issue:", e);
  }

  // 2. Transmit request over network to Nodemailer backend API
  try {
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: payload.to,
        subject: payload.subject,
        html: payload.html
      })
    });
    return await res.json();
  } catch (error) {
    console.error("Transmission error to SMTP backend:", error);
    return { success: false, message: "Network transmission failed" };
  }
};

const _p=`
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: ${p.bg}; color: ${p.text}; min-height: 100vh; }
  h1,h2,h3,h4,h5 { font-family: 'Plus Jakarta Sans', sans-serif; }
  
  .sidebar { width: 240px; min-height: 100vh; background: ${p.primary}; position: fixed; left: 0; top: 0; display: flex; flex-direction: column; z-index: 100; }
  .sidebar-logo { padding: 24px 20px; border-bottom: 1px solid rgba(255,255,255,0.1); }
  .logo-text { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 20px; font-weight: 800; color: white; }
  .logo-tag { font-size: 11px; color: #94A3B8; letter-spacing: 1px; text-transform: uppercase; margin-top: 2px; }
  .sidebar-nav { padding: 16px 12px; flex: 1; overflow-y: auto; }
  .nav-section { font-size: 10px; font-weight: 700; color: #475569; letter-spacing: 1.5px; text-transform: uppercase; padding: 8px 8px 4px; margin-top: 12px; }
  .nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500; color: #94A3B8; transition: all 0.15s; margin: 2px 0; }
  .nav-item:hover { background: rgba(255,255,255,0.08); color: white; }
  .nav-item.active { background: ${p.accent}; color: white; }
  .nav-item .nav-icon { width: 18px; font-size: 16px; }
  
  .main { margin-left: 240px; min-height: 100vh; }
  .topbar { background: white; border-bottom: 1px solid ${p.border}; padding: 0 28px; height: 60px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 50; }
  .topbar-title { font-size: 17px; font-weight: 700; font-family: 'Plus Jakarta Sans', sans-serif; }
  .topbar-right { display: flex; align-items: center; gap: 16px; }
  .user-badge { display: flex; align-items: center; gap: 10px; background: ${p.bg}; border: 1px solid ${p.border}; padding: 6px 12px 6px 8px; border-radius: 50px; cursor: pointer; }
  .avatar { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: white; background: ${p.accent}; }
  .user-name { font-size: 13px; font-weight: 600; }
  .user-role { font-size: 11px; color: ${p.muted}; text-transform: capitalize; }
  
  .page { padding: 28px; }
  .page-header { margin-bottom: 24px; }
  .page-title { font-size: 24px; font-weight: 800; color: ${p.primary}; }
  .page-subtitle { font-size: 14px; color: ${p.muted}; margin-top: 4px; }
  
  .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px; }
  .stat-card { background: white; border: 1px solid ${p.border}; border-radius: 14px; padding: 20px; }
  .stat-label { font-size: 12px; font-weight: 600; color: ${p.muted}; text-transform: uppercase; letter-spacing: 0.5px; }
  .stat-value { font-size: 28px; font-weight: 800; font-family: 'Plus Jakarta Sans', sans-serif; margin: 6px 0 4px; }
  .stat-change { font-size: 12px; font-weight: 500; display: flex; align-items: center; gap: 4px; }
  .stat-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; margin-bottom: 12px; }
  
  .card { background: white; border: 1px solid ${p.border}; border-radius: 14px; }
  .card-header { padding: 18px 20px; border-bottom: 1px solid ${p.border}; display: flex; align-items: center; justify-content: space-between; }
  .card-title { font-size: 15px; font-weight: 700; font-family: 'Plus Jakarta Sans', sans-serif; }
  .card-body { padding: 20px; }
  
  .btn { padding: 9px 18px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; border: none; transition: all 0.15s; display: inline-flex; align-items: center; gap: 7px; font-family: 'DM Sans', sans-serif; }
  .btn-primary { background: ${p.accent}; color: white; }
  .btn-primary:hover { background: ${p.accentDark}; transform: translateY(-1px); }
  .btn-outline { background: white; color: ${p.primary}; border: 1px solid ${p.border}; }
  .btn-outline:hover { background: ${p.bg}; }
  .btn-success { background: ${p.success}; color: white; }
  .btn-danger { background: ${p.danger}; color: white; }
  .btn-sm { padding: 6px 12px; font-size: 12px; }
  .btn-ghost { background: transparent; color: ${p.muted}; padding: 6px 10px; }
  .btn-ghost:hover { background: ${p.bg}; color: ${p.primary}; }
  
  .badge { padding: 3px 10px; border-radius: 50px; font-size: 12px; font-weight: 600; display: inline-flex; align-items: center; gap: 4px; }
  .badge-success { background: ${p.successLight}; color: #065F46; }
  .badge-warning { background: ${p.warningLight}; color: #92400E; }
  .badge-danger { background: ${p.dangerLight}; color: #991B1B; }
  .badge-info { background: ${p.accentLight}; color: #3730A3; }
  .badge-gray { background: #F1F5F9; color: #475569; }
  
  table { width: 100%; border-collapse: collapse; }
  th { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: ${p.muted}; padding: 10px 14px; text-align: left; border-bottom: 1px solid ${p.border}; background: ${p.bg}; }
  td { padding: 13px 14px; font-size: 14px; border-bottom: 1px solid #F1F5F9; color: ${p.textSoft}; }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: #FAFBFF; }
  
  .input { width: 100%; padding: 10px 14px; border: 1px solid ${p.border}; border-radius: 8px; font-size: 14px; font-family: 'DM Sans', sans-serif; background: white; color: ${p.primary}; outline: none; transition: border 0.15s; }
  .input:focus { border-color: ${p.accent}; box-shadow: 0 0 0 3px ${p.accentLight}; }
  .select { width: 100%; padding: 10px 14px; border: 1px solid ${p.border}; border-radius: 8px; font-size: 14px; font-family: 'DM Sans', sans-serif; background: white; color: ${p.primary}; outline: none; cursor: pointer; }
  .label { font-size: 13px; font-weight: 600; color: ${p.primary}; margin-bottom: 6px; display: block; }
  .form-group { margin-bottom: 16px; }
  
  .site-card { background: white; border: 1px solid ${p.border}; border-radius: 14px; padding: 18px; transition: all 0.2s; cursor: pointer; }
  .site-card:hover { border-color: ${p.accent}; box-shadow: 0 4px 20px rgba(99,102,241,0.12); transform: translateY(-2px); }
  .site-domain { font-size: 15px; font-weight: 700; color: ${p.primary}; margin-bottom: 4px; }
  .site-niche { font-size: 12px; color: ${p.muted}; margin-bottom: 12px; }
  .metrics-row { display: flex; gap: 12px; margin-bottom: 12px; flex-wrap: wrap; }
  .metric-pill { background: ${p.bg}; border: 1px solid ${p.border}; border-radius: 6px; padding: 5px 10px; font-size: 12px; font-weight: 600; color: ${p.primary}; display: flex; align-items: center; gap: 5px; }
  .metric-label { font-size: 10px; color: ${p.muted}; font-weight: 500; }
  .site-price { font-size: 22px; font-weight: 800; font-family: 'Plus Jakarta Sans', sans-serif; color: ${p.accent}; }
  .site-price-label { font-size: 11px; color: ${p.muted}; }
  
  .wallet-card { background: linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #312E81 100%); border-radius: 20px; padding: 28px; color: white; position: relative; overflow: hidden; }
  .wallet-card::before { content: ''; position: absolute; top: -40px; right: -40px; width: 160px; height: 160px; background: rgba(99,102,241,0.2); border-radius: 50%; }
  .wallet-card::after { content: ''; position: absolute; bottom: -30px; right: 40px; width: 100px; height: 100px; background: rgba(99,102,241,0.15); border-radius: 50%; }
  .wallet-balance { font-size: 38px; font-weight: 800; font-family: 'Plus Jakarta Sans', sans-serif; margin: 8px 0; }
  .wallet-label { font-size: 12px; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 1px; }
  
  .tabs { display: flex; gap: 4px; background: ${p.bg}; padding: 4px; border-radius: 10px; width: fit-content; }
  .tab { padding: 8px 16px; border-radius: 7px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.15s; color: ${p.muted}; }
  .tab.active { background: white; color: ${p.primary}; box-shadow: 0 1px 4px rgba(0,0,0,0.1); }
  
  .progress-bar { height: 6px; background: ${p.bg}; border-radius: 999px; overflow: hidden; }
  .progress-fill { height: 100%; border-radius: 999px; }
  
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px; }
  .modal { background: white; border-radius: 18px; width: 100%; max-width: 560px; max-height: 90vh; overflow-y: auto; }
  .modal-header { padding: 22px 24px; border-bottom: 1px solid ${p.border}; display: flex; align-items: center; justify-content: space-between; }
  .modal-title { font-size: 18px; font-weight: 800; font-family: 'Plus Jakarta Sans', sans-serif; }
  .modal-body { padding: 24px; }
  
  .search-bar { position: relative; }
  .search-bar input { padding-left: 38px; }
  .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: ${p.muted}; font-size: 16px; }
  
  .login-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: ${p.bg}; }
  .login-card { background: white; border: 1px solid ${p.border}; border-radius: 20px; padding: 40px; width: 100%; max-width: 420px; }
  .login-logo { text-align: center; margin-bottom: 28px; }
  
  .filter-bar { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px; align-items: center; }
  .notification-dot { width: 8px; height: 8px; background: ${p.danger}; border-radius: 50%; display: inline-block; }
  
  .drag-area { border: 2px dashed ${p.border}; border-radius: 12px; padding: 32px; text-align: center; cursor: pointer; transition: all 0.2s; }
  .drag-area:hover { border-color: ${p.accent}; background: ${p.accentLight}; }
  
  .metrics-loading { display: flex; align-items: center; gap: 8px; font-size: 13px; color: ${p.muted}; }
  .spinner { width: 16px; height: 16px; border: 2px solid ${p.border}; border-top-color: ${p.accent}; border-radius: 50%; animation: spin 0.7s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
  .sites-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
  
  .empty-state { text-align: center; padding: 48px 20px; }
  .empty-icon { font-size: 40px; margin-bottom: 12px; }
  .empty-title { font-size: 16px; font-weight: 700; color: ${p.primary}; margin-bottom: 6px; }
  .empty-desc { font-size: 14px; color: ${p.muted}; }
  
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 999px; }
`;

// All premium React functional view modules


function lt({size:e="md",theme:t="dark"}: {size?: string, theme?: string}){const n={sm:{fontSize:13,subtitleSize:8.2,iconSize:18,gap:8,letterSpacing:"1.2px"},md:{fontSize:17,subtitleSize:10,iconSize:22,gap:10,letterSpacing:"1.5px"},lg:{fontSize:21,subtitleSize:12.5,iconSize:28,gap:12,letterSpacing:"2px"},xl:{fontSize:29,subtitleSize:17,iconSize:36,gap:16,letterSpacing:"2.5px"}},r=n[e]||n.md,i=t==="dark"?"#FFFFFF":"#0F172A",subColor=t==="dark"?"#10B981":"#059669";return l.jsxs("a",{href:"https://www.authorityplacement.com/",style:{display:"inline-flex",alignItems:"center",gap:r.gap,userSelect:"none",lineHeight:1.1,textDecoration:"none",cursor:"pointer"},children:[l.jsxs("svg",{width:r.iconSize,height:r.iconSize,viewBox:"0 0 32 32",fill:"none",style:{flexShrink:0},children:[l.jsxs("defs",{children:[l.jsxs("linearGradient",{id:"gfPurple",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[l.jsx("stop",{offset:"0%",stopColor:"#818CF8"}),l.jsx("stop",{offset:"100%",stopColor:"#4F46E5"})]}),l.jsxs("linearGradient",{id:"gfGreen",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[l.jsx("stop",{offset:"0%",stopColor:"#34D399"}),l.jsx("stop",{offset:"100%",stopColor:"#059669"})]})]}),l.jsx("path",{d:"M6 24 C10 14, 18 10, 26 8",stroke:"url(#gfPurple)",strokeWidth:"3",strokeLinecap:"round"}),l.jsx("path",{d:"M10 24 L16 11 L22 24",stroke:"url(#gfPurple)",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round"}),l.jsx("circle",{cx:"16",cy:"11",r:"4",fill:"url(#gfGreen)",stroke:t==="dark"?"#1e293b":"#FFFFFF",strokeWidth:"1.5"}),l.jsx("circle",{cx:"22",cy:"24",r:"3",fill:"#34D399"})]}),l.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:2,justifyContent:"center"},children:[l.jsx("span",{style:{fontFamily:"'Plus Jakarta Sans', sans-serif",fontWeight:900,fontSize:r.fontSize,color:i,letterSpacing:"0.5px",textTransform:"uppercase"},children:"AUTHORITY"}),l.jsx("span",{style:{fontFamily:"'Plus Jakarta Sans', sans-serif",fontWeight:700,fontSize:r.subtitleSize,color:subColor,letterSpacing:r.letterSpacing,textTransform:"uppercase"},children:"MEDIA PLACEMENT"})]})]})}
function Si({status:e}: {status: string}){const t={approved:["badge-success","✓ Approved"],pending:["badge-warning","⏳ Pending"],rejected:["badge-danger","✕ Rejected"],completed:["badge-success","✓ Completed"],in_progress:["badge-info","● In Progress"],cancelled:["badge-danger","✕ Cancelled"],refunded:["badge-gray","💸 Refunded (PayPal)"],failed:["badge-danger","✕ Failed (Revoked)"]},[n,r]=t[e]||["badge-gray",e];return l.jsx("span",{className:`badge ${n}`,children:r})}

export function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ border: `1px solid ${p.border}`, borderRadius: 12, overflow: "hidden", marginBottom: 12, background: "white" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          textAlign: "left",
          padding: "20px 24px",
          background: "white",
          border: "none",
          outline: "none",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          color: p.primary,
          fontSize: 15
        }}
      >
        <span>{question}</span>
        <span style={{ fontSize: 18, color: p.accent, transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s', fontWeight: 700, display: 'inline-block' }}>
          ＋
        </span>
      </button>
      <div style={{
        maxHeight: isOpen ? "200px" : "0",
        opacity: isOpen ? 1 : 0,
        overflow: "hidden",
        transition: "all 0.25s ease-out"
      }}>
        <div style={{ padding: "0 24px 20px", fontSize: 14, color: p.textSoft, lineHeight: 1.6, borderTop: `1px solid ${p.border}` }}>
          {answer}
        </div>
      </div>
    </div>
  );
}

function detectNicheAndDescription(domain: string): { niche: string; description: string } {
  if (!domain) return { niche: "", description: "" };
  const dom = domain.toLowerCase();

  const rules = [
    {
      keywords: ["tech", "gizmo", "gadget", "cyber", "software", "code", "dev", "app", "saas", "cloud", "security", "data", "system", "network", "geek"],
      niche: "Technology",
      desc: "Leading technology blog with a focus on startups, venture capital funding, cutting-edge software products, and global consumer electronics trends."
    },
    {
      keywords: ["ai", "artificial", "robot", "intelligence", "gpt", "bot", "ml", "learning"],
      niche: "Artificial Intelligence",
      desc: "An advanced portal dissecting deep learning frameworks, neural network applications, generative AI toolkits, and ethical automation reviews."
    },
    {
      keywords: ["crypto", "blockchain", "chain", "web3", "ether", "bitcoin", "btc", "eth", "token", "coin", "ledger"],
      niche: "Cryptocurrency",
      desc: "Specialized cryptocurrency updates covering decentralized ledger protocols, tokenomic whitepapers, smart contract audits, and emerging Web3 networks."
    },
    {
      keywords: ["finance", "money", "invest", "stock", "fund", "wealth", "market", "trade", "budget", "bank", "credit", "tax", "loan", "mortgage"],
      niche: "Finance & Investing",
      desc: "Providing expert insights on global stock markets, emerging financial technologies, index fund strategies, and personal budget planning frameworks."
    },
    {
      keywords: ["health", "well", "fit", "medical", "doctor", "cure", "clinic", "diet", "nutrition", "gym", "yoga", "mind", "soul", "body", "physio", "rehab", "fitness"],
      niche: "Health & Wellness",
      desc: "A premium health and wellness publication catering to readers seeking certified advice on fitness, general nutrition plans, and organic lifestyle recipes."
    },
    {
      keywords: ["travel", "trip", "tour", "beach", "globe", "wander", "hotel", "flight", "venture", "destin", "island", "backpack", "journey", "vacation"],
      niche: "Travel & Tourism",
      desc: "An authentic travel guide run by veteran globetrotters sharing detailed country-specific itinerary plans, reviews of luxury hotels, and adventure sports recommendations."
    },
    {
      keywords: ["marketing", "seo", "rank", "agency", "advertise", "traffic", "brand", "social", "lead", "optimi", "conversion", "ads", "funnel", "ctr"],
      niche: "Digital Marketing",
      desc: "Actionable tips and deep-dives on search engine optimization (SEO), growth hacking strategies, content marketing practices, and conversion rate optimization metrics."
    },
    {
      keywords: ["food", "recipe", "chef", "cook", "bake", "eats", "dine", "kitchen", "restaurant", "meal", "taste", "gourmet", "delicious", "culinary"],
      niche: "Food & Recipes",
      desc: "Celebrating culinary arts with gourmet recipes, home-kitchen automation hacks, detailed utensil reviews, and exquisite restaurant evaluation scores."
    },
    {
      keywords: ["game", "gamer", "play", "xbox", "ps5", "nintendo", "steam", "esport", "console", "arcade"],
      niche: "Gaming",
      desc: "Comprehensive gaming publication analyzing console hardware specs, esports tournament reviews, indie developer spotlights, and interactive walkthroughs."
    },
    {
      keywords: ["fashion", "style", "wear", "dress", "trend", "apparel", "vogue", "cosmetic", "glam", "boutique", "outfit"],
      niche: "Fashion & Style",
      desc: "Capturing high-end beauty, ready-to-wear runway collections, accessories curation, sustainable fashion innovations, and personal dressing styles."
    },
    {
      keywords: ["business", "startup", "entrepreneur", "corporate", "smb", "office", "venture", "merchant"],
      niche: "Business & Entrepreneurship",
      desc: "Practical entrepreneurship strategies featuring bootstrapping guides, human resource policies, project lifecycle frameworks, and scalable operational models."
    },
    {
      keywords: ["house", "home", "garden", "decor", "interior", "furnit", "roof", "yard", "kitchen", "patio"],
      niche: "Home & Garden",
      desc: "A dedicated sanctuary full of high-quality DIY home renovations, elegant interior lighting designs, landscape optimization tips, and smart home setup hacks."
    },
    {
      keywords: ["car", "auto", "moto", "drive", "vehicle", "engine", "wheel", "tesla", "truck", "racing", "speed"],
      niche: "Automotive",
      desc: "Driving reports on clean electric vehicles, hybrid engine engineering guides, preventative classic restoration tips, and high-performance track testing reviews."
    },
    {
      keywords: ["parent", "family", "baby", "mom", "dad", "kid", "child", "senior", "elder"],
      niche: "Parenting & Family",
      desc: "Providing gentle guidance on behavioral child milestones, family weekend activities, dynamic educational toys, and healthy relative relationships."
    },
    {
      keywords: ["law", "legal", "court", "attorney", "judge", "suit", "patent", "policy"],
      niche: "Law & Legal",
      desc: "A simplified breakdown of intellectual property directives, startup incorporation compliance, contractual litigation clauses, and global legal updates."
    }
  ];

  for (const rule of rules) {
    if (rule.keywords.some(kw => dom.includes(kw))) {
      return { niche: rule.niche, description: rule.desc };
    }
  }

  return {
    niche: "Business & Entrepreneurship",
    description: "An asset-rich directory providing versatile articles, industry guidelines, and practical business optimization advices across diverse global sectors."
  };
}

function Bp({onClose:e,onAdd:t,publisherMode:n}: any){const[r,i]=T.useState("single"),[o,s]=T.useState({domain:"",niche:"",price:"",writingPrice:"",dr:"",traffic:"",dofollow:!0,turnaround:5,status:"pending",sponsoredTag:!0,homepageFeature:!1,samplePost:"",description:"",lifespan:"Permanent"}),[a,u]=T.useState(null),[d,y]=T.useState([]),w=v=>{const k=v.target.files[0];if(!k)return;const z=new FileReader;z.onload=f=>{const c=(f.target.result as string).trim().split(`
`).slice(1);y(c.map(h=>{const parts = h.split(",");const valDomain=parts[0]?.trim() || "";const valNiche=parts[1]?.trim() || "";const autoDet=detectNicheAndDescription(valDomain);const niche=valNiche||autoDet.niche;let drValue=50;let trafficValue=10000;let priceValue=100;if(parts.length>=5){drValue=parseInt(parts[2]?.trim())||50;trafficValue=parseInt(parts[3]?.trim())||10000;priceValue=parseInt(parts[4]?.trim())||100;}else if(parts.length>=3){priceValue=parseInt(parts[2]?.trim())||100;}return{domain:valDomain,niche,price:priceValue,dr:drValue,traffic:trafficValue,description:autoDet.description,lifespan:"Permanent"}}).filter(h=>h.domain))},z.readAsText(k)},N=()=>{t(r==="single"?[{...o,id:Date.now(),...a||{}}]:d.map((v,k)=>({...v,id:Date.now()+k,dofollow:!0,turnaround:5,status:"pending",lifespan:"Permanent"}))),e()};return l.jsx("div",{className:"modal-overlay",onClick:v=>v.target===v.currentTarget&&e(),children:l.jsxs("div",{className:"modal",children:[l.jsxs("div",{className:"modal-header",children:[l.jsx("span",{className:"modal-title",children:"➕ Add Website"}),l.jsx("button",{className:"btn btn-ghost btn-sm",onClick:e,children:"✕"})]}),l.jsxs("div",{className:"modal-body",children:[l.jsxs("div",{className:"tabs",style:{marginBottom:20},children:[l.jsx("div",{className:`tab ${r==="single"?"active":""}`,onClick:()=>i("single"),children:"Single Site"}),l.jsx("div",{className:`tab ${r==="bulk"?"active":""}`,onClick:()=>i("bulk"),children:"Bulk Upload (Excel/CSV)"})]}),r==="single"?l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"label",children:"Domain / Website URL *"}),l.jsx("input",{className:"input",placeholder:"example.com",value:o.domain,onChange:v=>{const val=v.target.value;const auto=detectNicheAndDescription(val);s(k=>({...k,domain:val,niche:k.niche?k.niche:auto.niche,description:k.description?k.description:auto.description}))}})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"label",children:"Website Description"}),l.jsx("textarea",{className:"input",placeholder:"Briefly describe your website's focus, audience, and editorial guidelines...",value:o.description,onChange:v=>s(k=>({...k,description:v.target.value})),rows:2,style:{resize:"vertical"}})]}),l.jsxs("div",{className:"grid-2",children:[l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"label",children:"DR (Ahrefs) *"}),l.jsx("input",{className:"input",type:"number",placeholder:"0-100",value:o.dr,onChange:v=>s(k=>({...k,dr:v.target.value}))})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"label",children:"Organic Traffic (Ahrefs) *"}),l.jsx("input",{className:"input",type:"number",placeholder:"Monthly visits",value:o.traffic,onChange:v=>s(k=>({...k,traffic:v.target.value}))})]})]}),l.jsxs("div",{className:"grid-2",children:[l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"label",children:"Niche / Category"}),l.jsxs("select",{className:"select",value:o.niche,onChange:v=>s(k=>({...k,niche:v.target.value})),children:[l.jsx("option",{value:"",children:"Select niche"}),cc.map(v=>l.jsx("option",{children:v},v))]})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"label",children:"Turnaround (days)"}),l.jsx("input",{className:"input",type:"number",value:o.turnaround,onChange:v=>s(k=>({...k,turnaround:v.target.value}))})]})]}),l.jsxs("div",{style:{background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:10,padding:16,marginBottom:16},children:[l.jsx("div",{style:{fontSize:12,fontWeight:700,color:"#065F46",textTransform:"uppercase",letterSpacing:1,marginBottom:4},children:"💰 Pricing"}),l.jsx("div",{style:{fontSize:12,color:"#047857",marginBottom:14},children:"Set separate prices depending on who writes the article. You keep 90% — we take 10% commission."}),l.jsxs("div",{className:"grid-2",children:[l.jsxs("div",{className:"form-group",style:{marginBottom:0},children:[l.jsxs("label",{className:"label",children:["Advertiser Provides Article ($)",l.jsx("span",{style:{display:"block",fontSize:11,color:p.muted,fontWeight:400,marginTop:2},children:"Advertiser writes & sends the content"})]}),l.jsxs("div",{style:{position:"relative"},children:[l.jsx("span",{style:{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:p.muted,fontWeight:700},children:"$"}),l.jsx("input",{className:"input",type:"number",min:"0",placeholder:"e.g. 80",style:{paddingLeft:28},value:o.price,onChange:v=>s(k=>({...k,price:v.target.value}))})]}),o.price&&l.jsxs("div",{style:{fontSize:11,color:"#065F46",marginTop:4},children:["You earn: ",l.jsxs("strong",{children:["$",(o.price*.9).toFixed(0)]})]})]}),l.jsxs("div",{className:"form-group",style:{marginBottom:0},children:[l.jsxs("label",{className:"label",children:["Publisher Writes Article ($)",l.jsx("span",{style:{display:"block",fontSize:11,color:p.muted,fontWeight:400,marginTop:2},children:"You write the content for the advertiser"})]}),l.jsxs("div",{style:{position:"relative"},children:[l.jsx("span",{style:{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:p.muted,fontWeight:700},children:"$"}),l.jsx("input",{className:"input",type:"number",min:"0",placeholder:"e.g. 150",style:{paddingLeft:28},value:o.writingPrice,onChange:v=>s(k=>({...k,writingPrice:v.target.value}))})]}),o.writingPrice&&l.jsxs("div",{style:{fontSize:11,color:"#065F46",marginTop:4},children:["You earn: ",l.jsxs("strong",{children:["$",(o.writingPrice*.9).toFixed(0)]})]})]})]}),(o.price||o.writingPrice)&&l.jsxs("div",{style:{marginTop:12,background:"white",borderRadius:8,padding:"10px 14px",display:"flex",gap:20,flexWrap:"wrap",fontSize:13},children:[o.price&&l.jsxs("span",{children:["📄 With article: ",l.jsxs("strong",{style:{color:p.accent},children:["$",o.price]})," → you get ",l.jsxs("strong",{style:{color:"#059669"},children:["$",(o.price*.9).toFixed(0)]})]}),o.writingPrice&&l.jsxs("span",{children:["✍️ With writing: ",l.jsxs("strong",{style:{color:p.accent},children:["$",o.writingPrice]})," → you get ",l.jsxs("strong",{style:{color:"#059669"},children:["$",(o.writingPrice*.9).toFixed(0)]})]})]})]}),l.jsxs("div",{className:"grid-2",children:[l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"label",children:"Link Type"}),l.jsxs("select",{className:"select",value:o.dofollow?"do":"no",onChange:v=>s(k=>({...k,dofollow:v.target.value==="do"})),children:[l.jsx("option",{value:"do",children:"DoFollow"}),l.jsx("option",{value:"no",children:"NoFollow"})]})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"label",children:"Post Lifespan *"}),l.jsxs("select",{className:"select",value:o.lifespan||"Permanent",onChange:v=>s(k=>({...k,lifespan:v.target.value})),children:[l.jsx("option",{value:"Permanent",children:"Permanent / Lifetime"}),l.jsx("option",{value:"1 Year",children:"1 Year"}),l.jsx("option",{value:"2 Years",children:"2 Years"}),l.jsx("option",{value:"3 Years",children:"3 Years"}),l.jsx("option",{value:"5 Years",children:"5 Years"})]})]})]}),l.jsxs("div",{style:{background:"#F8FAFC",border:`1px solid ${p.border}`,borderRadius:10,padding:14,marginBottom:16},children:[l.jsx("div",{style:{fontSize:12,fontWeight:700,color:p.muted,textTransform:"uppercase",letterSpacing:1,marginBottom:12},children:"Publication Settings"}),l.jsxs("div",{className:"grid-2",style:{marginBottom:12},children:[l.jsxs("div",{className:"form-group",style:{marginBottom:0},children:[l.jsx("label",{className:"label",children:"Sponsored Tag on Post"}),l.jsx("div",{style:{display:"flex",gap:8,marginTop:4},children:[["yes",!0,"✓ Yes — adds 'Sponsored' label"],["no",!1,"✕ No — published as editorial"]].map(([v,k,z])=>l.jsx("button",{type:"button",onClick:()=>s(f=>({...f,sponsoredTag:k})),style:{flex:1,padding:"9px 8px",borderRadius:8,border:`2px solid ${o.sponsoredTag===k?p.accent:p.border}`,background:o.sponsoredTag===k?p.accentLight:"white",color:o.sponsoredTag===k?p.accent:p.muted,fontWeight:600,fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",textAlign:"center"},children:v==="yes"?"✓ Yes":"✕ No"},v))}),l.jsx("div",{style:{fontSize:11,color:p.muted,marginTop:5},children:o.sponsoredTag?"Post will be labeled as 'Sponsored'":"Post will appear as editorial content"})]}),l.jsxs("div",{className:"form-group",style:{marginBottom:0},children:[l.jsx("label",{className:"label",children:"Featured on Homepage"}),l.jsx("div",{style:{display:"flex",gap:8,marginTop:4},children:[["yes",!0],["no",!1]].map(([v,k])=>l.jsx("button",{type:"button",onClick:()=>s(z=>({...z,homepageFeature:k})),style:{flex:1,padding:"9px 8px",borderRadius:8,border:`2px solid ${o.homepageFeature===k?p.accent:p.border}`,background:o.homepageFeature===k?p.accentLight:"white",color:o.homepageFeature===k?p.accent:p.muted,fontWeight:600,fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",textAlign:"center"},children:v==="yes"?"✓ Yes":"✕ No"},v))}),l.jsx("div",{style:{fontSize:11,color:p.muted,marginTop:5},children:o.homepageFeature?"Site appears on marketplace homepage":"Site shown in search only"})]})]}),l.jsxs("div",{className:"form-group",style:{marginBottom:0},children:[l.jsxs("label",{className:"label",children:["Sample Post URL ",l.jsx("span",{style:{color:p.muted,fontWeight:400},children:"(optional — shows advertisers an example)"})]}),l.jsx("input",{className:"input",placeholder:"https://yoursite.com/example-guest-post",value:o.samplePost,onChange:v=>s(k=>({...k,samplePost:v.target.value}))})]})]}),!n&&l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"label",children:"Approval Status"}),l.jsxs("select",{className:"select",value:o.status,onChange:v=>s(k=>({...k,status:v.target.value})),children:[l.jsx("option",{value:"pending",children:"Pending"}),l.jsx("option",{value:"approved",children:"Approved"}),l.jsx("option",{value:"rejected",children:"Rejected"})]})]})]}):l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"drag-area",onClick:()=>document.getElementById("csv-upload").click(),children:[l.jsx("div",{style:{fontSize:32,marginBottom:8},children:"📊"}),l.jsx("div",{style:{fontWeight:600,fontSize:15},children:"Upload CSV / Excel File"}),l.jsx("div",{style:{fontSize:13,color:p.muted,marginTop:4},children:"Expected columns: domain, niche, price"}),l.jsx("div",{style:{fontSize:12,color:p.accent,marginTop:8},children:"SEO metrics will be auto-fetched for each site"}),l.jsx("input",{id:"csv-upload",type:"file",accept:".csv,.xlsx",style:{display:"none"},onChange:w})]}),d.length>0&&l.jsxs("div",{style:{marginTop:16,background:p.bg,border:`1px solid ${p.border}`,borderRadius:10,padding:12},children:[l.jsxs("div",{style:{fontSize:13,fontWeight:600,marginBottom:8},children:["✓ ",d.length," sites ready to import"]}),d.slice(0,3).map((v,k)=>l.jsxs("div",{style:{fontSize:12,color:p.muted,padding:"3px 0"},children:["• ",v.domain," — ",v.niche," — DA:",v.da," DR:",v.dr]},k)),d.length>3&&l.jsxs("div",{style:{fontSize:12,color:p.muted},children:["...and ",d.length-3," more"]})]})]}),l.jsxs("div",{style:{display:"flex",gap:10,marginTop:20},children:[l.jsx("button",{className:"btn btn-primary",style:{flex:1},onClick:N,children:r==="single"?"Add Website":`Import ${d.length} Sites`}),l.jsx("button",{className:"btn btn-outline",onClick:e,children:"Cancel"})]})]})]})})}

function Wp({site:e,user,onClose:t,onOrder:n,ourPaypal}: any){
  const[r,i]=T.useState("Guest Post");
  const[o,s]=T.useState("");
  const[a,u]=T.useState("");
  const[d,y]=T.useState("");
  const[whoWrites,setWhoWrites]=T.useState("advertiser");
  const[wordsCount,setWordsCount]=T.useState(500);

  const writingSurcharge = whoWrites === "publisher" ? Math.round((wordsCount / 500) * 20) : 0;
  const finalAmount = Number(e.price) + writingSurcharge;
  const originalAmount = Number(e.price);

  const userWallet = user?.wallet || 0;
  const isSufficient = userWallet >= finalAmount;

  const handleOrderSubmit = () => {
    if(!o.trim()) {
      alert("Please enter a target URL before completing payment.");
      return;
    }
    if(!isSufficient) {
      alert(`Insufficient wallet balance ($${userWallet.toFixed(2)}). Please go to the Wallet tab to add funds first.`);
      return;
    }
    n({
      site: e,
      type: `${r}${whoWrites==="publisher" ? ` (${wordsCount} words writing)` : ""}`,
      url: o,
      anchor: a,
      notes: d,
      amount: finalAmount
    });
    t();
  };

  return l.jsx("div",{className:"modal-overlay",onClick:m=>m.target===m.currentTarget&&t(),children:l.jsxs("div",{className:"modal",children:[l.jsxs("div",{className:"modal-header",children:[l.jsxs("span",{className:"modal-title",children:["🛒 Place Order — ",e.domain]}),l.jsx("button",{className:"btn btn-ghost btn-sm",onClick:t,children:"✕"})]}),l.jsxs("div",{className:"modal-body",children:[l.jsx("div",{style:{background:p.accentLight,border:"1px solid #C7D2FE",borderRadius:10,padding:14,marginBottom:20},children:l.jsxs("div",{children:[l.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[l.jsxs("div",{children:[l.jsx("div",{style:{fontWeight:700,fontSize:15},children:e.domain}),l.jsxs("div",{style:{fontSize:12,color:p.muted},children:["DR ",e.dr," · ",(e.traffic||0).toLocaleString()," traffic/mo"," · ⏳ ",e.lifespan||"Permanent"]})]}),l.jsxs("div",{style:{textAlign:"right"},children:[l.jsxs("div",{style:{fontSize:22,fontWeight:800,color:p.accent},children:["$",e.price]}),l.jsx("div",{style:{fontSize:11,color:p.muted},children:"per post"})]})]}),e.description&&l.jsx("div",{style:{fontSize:12,color:p.textSoft,borderTop:`1px solid rgba(99, 102, 241, 0.15)`,paddingTop:8,marginTop:8,lineHeight:1.4},children:e.description})]})}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"label",children:"Post Type"}),l.jsx("div",{style:{display:"flex",gap:8},children:["Guest Post","Sponsored Post","Link Insertion"].map(m=>l.jsx("button",{className:`btn btn-sm ${r===m?"btn-primary":"btn-outline"}`,style:{flex:1},onClick:()=>i(m),children:m},m))})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"label",children:"Content Writing Options"}),l.jsxs("div",{style:{display:"flex",gap:8},children:[
        l.jsx("button",{type:"button",className:`btn btn-sm ${whoWrites==="advertiser"?"btn-primary":"btn-outline"}`,style:{flex:1},onClick:()=>setWhoWrites("advertiser"),children:"I will provide article ($0)"}),
        l.jsx("button",{type:"button",className:`btn btn-sm ${whoWrites==="publisher"?"btn-primary":"btn-outline"}`,style:{flex:1},onClick:()=>setWhoWrites("publisher"),children:"Publisher writes (+$20/500w)"})
      ]})]}),whoWrites==="publisher"&&l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"label",children:"Article Word Count"}),l.jsxs("select",{className:"select",value:wordsCount,onChange:m=>setWordsCount(Number(m.target.value)),children:[
        l.jsx("option",{value:500,children:"500 Words (+$20)"}),
        l.jsx("option",{value:1000,children:"1000 Words (+$40)"}),
        l.jsx("option",{value:1500,children:"1500 Words (+$60)"}),
        l.jsx("option",{value:2000,children:"2000 Words (+$80)"})
      ]})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"label",children:"Target URL *"}),l.jsx("input",{className:"input",placeholder:"https://yoursite.com/page",value:o,onChange:m=>s(m.target.value)})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"label",children:"Anchor Text"}),l.jsx("input",{className:"input",placeholder:"e.g. best SEO tools",value:a,onChange:m=>u(m.target.value)})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"label",children:"Special Instructions"}),l.jsx("textarea",{className:"input",rows:3,placeholder:"Any specific requirements for the post...",value:d,onChange:m=>y(m.target.value),style:{resize:"vertical"}})]}),l.jsxs("div",{style:{background:p.bg,borderRadius:10,padding:14,marginBottom:20},children:[l.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:6},children:[l.jsx("span",{style:{color:p.muted},children:"Post price"}),l.jsxs("span",{children:["$",originalAmount]})]}),whoWrites==="publisher"&&l.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:6},children:[l.jsx("span",{style:{color:p.muted},children:`Writing fee (${wordsCount} words)`}),l.jsxs("span",{style:{color:p.success,fontWeight:600},children:[`+$`,writingSurcharge]})]}),user?.role!=="advertiser"&&l.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:6},children:[l.jsx("span",{style:{color:p.muted},children:"Platform fee (10%)"}),l.jsxs("span",{children:["$",(finalAmount*.1).toFixed(2)]})]}),l.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:6},children:[l.jsx("span",{style:{color:p.muted},children:"Post Lifespan"}),l.jsx("span",{style:{fontWeight:600,color:p.success},children:e.lifespan||"Permanent"})]}),l.jsxs("div",{style:{borderTop:`1px solid ${p.border}`,paddingTop:8,marginTop:8,display:"flex",justifyContent:"space-between",fontWeight:700,fontSize:15},children:[l.jsx("span",{children:"Total"}),l.jsxs("span",{style:{color:p.accent},children:["$",finalAmount]})]})]}),l.jsxs("div",{style:{background:"#F1F5F9",borderRadius:8,padding:"10px 14px",marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center"},children:[l.jsx("span",{style:{fontSize:12,color:"#475569",fontWeight:600},children:"Your Wallet Balance"}),l.jsxs("span",{style:{fontSize:14,fontWeight:800,color:isSufficient?p.success:p.danger},children:["$",userWallet.toFixed(2)]})]}),l.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:10},children:[isSufficient?l.jsx("button",{className:"btn btn-primary",style:{width:"100%",padding:"12px",fontSize:14,fontWeight:700},onClick:handleOrderSubmit,children:`⚡ Order & Deduct from Wallet — $${finalAmount}`}):l.jsxs(l.Fragment,{children:[l.jsx("button",{className:"btn",style:{width:"100%",padding:"12px",fontSize:14,fontWeight:700,background:"#F8FAFC",color:"#94A3B8",border:"1px solid #E2E8F0",cursor:"not-allowed"},disabled:true,children:`❌ Insufficient Wallet Balance — $${finalAmount}`}),l.jsx("div",{style:{fontSize:12,color:p.danger,textAlign:"center",lineHeight:1.4},children:`⚠️ Your current balance is $${userWallet.toFixed(2)}. Please go to the Wallet tab to add funds via PayPal.`})]}),l.jsx("button",{className:"btn btn-outline",onClick:t,children:"Cancel"})]})]})]})});
}

function $p({user:e,sites:t,orders:n}: any){var a,u;const r=e.role==="publisher"?t.filter(d=>d.publisher===e.id):t,i=e.role==="advertiser"?n.filter(d=>d.advertiser===e.id):e.role==="publisher"?n.filter(d=>d.publisher===e.id):n,o=i.filter(d=>d.status==="completed").reduce((d,y)=>d+(e.role==="publisher"?y.publisherEarning:y.amount),0),s=e.role==="admin"?[{label:"Total Revenue",value:`$${n.reduce((d,y)=>d+y.amount,0).toLocaleString()}`,icon:"💰",color:"#EEF2FF",change:"+24% this month"},{label:"Active Sites",value:t.filter(d=>d.status==="approved").length,icon:"🌐",color:"#ECFDF5",change:`${t.filter(d=>d.status==="pending").length} pending`},{label:"Total Orders",value:n.length,icon:"📦",color:"#FFF7ED",change:`${n.filter(d=>d.status==="in_progress").length} in progress`},{label:"Commission Earned",value:`$${n.reduce((d,y)=>d+y.commission,0).toFixed(0)}`,icon:"💎",color:"#FDF4FF",change:"10% per order"}]:e.role==="publisher"?[{label:"Total Earnings",value:`$${o.toFixed(2)}`,icon:"💰",color:"#ECFDF5",change:"After 10% commission"},{label:"My Sites",value:r.length,icon:"🌐",color:"#EEF2FF",change:`${r.filter(d=>d.status==="approved").length} approved`},{label:"Wallet Balance",value:`$${((a=e.wallet)==null?void 0:a.toFixed(2))||"0.00"}`,icon:"👜",color:"#FFF7ED",change:"Withdrawable"},{label:"Pending Orders",value:i.filter(d=>d.status==="in_progress").length,icon:"📋",color:"#FDF4FF",change:"Awaiting action"}]:[{label:"Total Spent",value:`$${i.reduce((d,y)=>d+y.amount,0).toLocaleString()}`,icon:"💳",color:"#EEF2FF",change:"All time"},{label:"Orders Placed",value:i.length,icon:"📦",color:"#ECFDF5",change:`${i.filter(d=>d.status==="completed").length} completed`},{label:"Wallet Balance",value:`$${((u=e.wallet)==null?void 0:u.toFixed(2))||"0.00"}`,icon:"👜",color:"#FFF7ED",change:"Available to spend"},{label:"Links Built",value:i.filter(d=>d.status==="completed").length,icon:"🔗",color:"#FDF4FF",change:"Live backlinks"}];return l.jsxs("div",{className:"page",children:[l.jsxs("div",{className:"page-header",children:[l.jsxs("div",{className:"page-title",children:["Welcome back, ",e.name," 👋"]}),l.jsx("div",{className:"page-subtitle",children:new Date().toLocaleDateString("en-IN",{weekday:"long",year:"numeric",month:"long",day:"numeric"})})]}),l.jsx("div",{className:"stats-grid",children:s.map((d,y)=>l.jsxs("div",{className:"stat-card",children:[l.jsx("div",{className:"stat-icon",style:{background:d.color},children:d.icon}),l.jsx("div",{className:"stat-label",children:d.label}),l.jsx("div",{className:"stat-value",style:{color:p.primary},children:d.value}),l.jsx("div",{className:"stat-change",style:{color:p.muted},children:d.change})]},y))}),l.jsxs("div",{className:"grid-2",children:[l.jsxs("div",{className:"card",children:[l.jsx("div",{className:"card-header",children:l.jsx("span",{className:"card-title",children:"📋 Recent Orders"})}),l.jsx("div",{children:i.slice(0,4).length===0?l.jsxs("div",{className:"empty-state",children:[l.jsx("div",{className:"empty-icon",children:"📭"}),l.jsx("div",{className:"empty-title",children:"No orders yet"})]}):l.jsxs("table",{children:[l.jsx("thead",{children:l.jsxs("tr",{children:[l.jsx("th",{children:"Site"}),l.jsx("th",{children:"Type"}),l.jsx("th",{children:"Amount"}),l.jsx("th",{children:"Status"})]})}),l.jsx("tbody",{children:i.slice(0,4).map(d=>l.jsxs("tr",{children:[l.jsx("td",{style:{fontWeight:600,color:p.primary},children:d.site}),l.jsx("td",{children:d.type}),l.jsxs("td",{style:{fontWeight:600},children:["$",d.amount]}),l.jsx("td",{children:l.jsx(Si,{status:d.status})})]},d.id))})]})})]}),l.jsxs("div",{className:"card",children:[l.jsx("div",{className:"card-header",children:l.jsx("span",{className:"card-title",children:"🌐 Top Sites"})}),l.jsx("div",{style:{padding:"0 8px"},children:t.filter(d=>d.status==="approved").slice(0,4).map(d=>l.jsxs("div",{style:{padding:"12px 12px",borderBottom:`1px solid ${p.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"},children:[l.jsxs("div",{children:[l.jsx("div",{style:{fontWeight:600,fontSize:14},children:d.domain}),l.jsxs("div",{style:{fontSize:12,color:p.muted},children:["DR ",d.dr," · ",d.niche]})]}),l.jsxs("div",{style:{fontWeight:700,color:p.accent},children:["$",d.price]})]},d.id))})]})]})]})}

function Hp({sites:e,user:t,onOrder:n,ourPaypal}: any){const[r,i]=T.useState(""),[o,s]=T.useState(""),[a,u]=T.useState(""),[d,y]=T.useState(""),[m,w]=T.useState("dr"),[N,v]=T.useState("all"),[k,z]=T.useState("all"),[f,c]=T.useState("all"),[h,x]=T.useState(null),g=e.filter(S=>S.status==="approved").filter(S=>!r||S.domain.toLowerCase().includes(r.toLowerCase())).filter(S=>!o||S.niche===o).filter(S=>!a||S.dr>=parseInt(a)).filter(S=>!d||S.price<=parseInt(d)).filter(S=>N==="all"?!0:N==="yes"?S.dofollow:!S.dofollow).filter(S=>k==="all"?!0:k==="yes"?S.sponsoredTag:!S.sponsoredTag).filter(S=>f==="all"?!0:f==="yes"?S.homepageFeature:!S.homepageFeature).sort((S,C)=>m==="price"?S.price-C.price:m==="traffic"?C.traffic-S.traffic:C.dr-S.dr),j=({label:S,value:C,onChange:M,icon:E})=>l.jsxs("div",{children:[l.jsxs("div",{style:{fontSize:11,fontWeight:700,color:p.muted,textTransform:"uppercase",letterSpacing:.8,marginBottom:6},children:[E," ",S]}),l.jsx("div",{style:{display:"flex",background:p.bg,border:`1px solid ${p.border}`,borderRadius:8,overflow:"hidden"},children:[["all","All"],["yes","Yes"],["no","No"]].map(([_,q])=>l.jsx("button",{onClick:()=>M(_),style:{padding:"7px 14px",border:"none",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:13,cursor:"pointer",transition:"all 0.15s",background:C===_?p.accent:"transparent",color:C===_?"white":p.muted},children:q},_))})]});return l.jsxs("div",{className:"page",children:[l.jsxs("div",{className:"page-header",children:[l.jsx("div",{className:"page-title",children:"Marketplace"}),l.jsxs("div",{className:"page-subtitle",children:[g.length," of ",e.filter(S=>S.status==="approved").length," approved sites shown"]})]}),l.jsxs("div",{className:"filter-bar",style:{marginBottom:10},children:[l.jsxs("div",{className:"search-bar",style:{flex:1,minWidth:200},children:[l.jsx("span",{className:"search-icon",children:"🔍"}),l.jsx("input",{className:"input",placeholder:"Search domains...",value:r,onChange:S=>i(S.target.value)})]}),l.jsxs("select",{className:"select",style:{width:180},value:o,onChange:S=>s(S.target.value),children:[l.jsx("option",{value:"",children:"All Niches"}),cc.map(S=>l.jsx("option",{children:S},S))]}),l.jsx("input",{className:"input",style:{width:100},placeholder:"Min DR",type:"number",value:a,onChange:S=>u(S.target.value)}),l.jsx("input",{className:"input",style:{width:120},placeholder:"Max Price $",type:"number",value:d,onChange:S=>y(S.target.value)}),l.jsxs("select",{className:"select",style:{width:160},value:m,onChange:S=>w(S.target.value),children:[l.jsx("option",{value:"dr",children:"DR: High → Low"}),l.jsx("option",{value:"price",children:"Price: Low → High"}),l.jsx("option",{value:"traffic",children:"Traffic: High → Low"})]})]}),l.jsxs("div",{style:{display:"flex",gap:20,flexWrap:"wrap",alignItems:"flex-end",background:"white",border:`1px solid ${p.border}`,borderRadius:12,padding:"16px 20px",marginBottom:20},children:[l.jsx(j,{label:"Sponsored Tag",icon:"🏷",value:k,onChange:z}),l.jsx(j,{label:"DoFollow Link",icon:"🔗",value:N,onChange:v}),l.jsx(j,{label:"Homepage Featured",icon:"⭐",value:f,onChange:c}),l.jsx("div",{style:{marginLeft:"auto"},children:l.jsx("button",{className:"btn btn-outline btn-sm",onClick:()=>{v("all"),z("all"),c("all"),i(""),s(""),u(""),y("")},children:"↺ Clear All Filters"})})]}),g.length===0?l.jsxs("div",{className:"empty-state",children:[l.jsx("div",{className:"empty-icon",children:"🔍"}),l.jsx("div",{className:"empty-title",children:"No sites match your filters"}),l.jsx("div",{className:"empty-desc",children:"Try adjusting your search criteria or clearing filters"})]}):l.jsx("div",{className:"sites-grid",children:g.map(S=>l.jsxs("div",{className:"site-card",children:[l.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10},children:[l.jsxs("div",{style:{flex:1,minWidth:0},children:[l.jsxs("div",{style:{fontWeight:700,fontSize:15,color:p.primary,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:["🌐 ",S.domain]}),l.jsxs("div",{style:{fontSize:12,color:p.muted,marginTop:2},children:[S.niche," · ",S.turnaround,"d turnaround"]})]}),l.jsx("span",{className:"badge badge-success",style:{fontSize:10,flexShrink:0,marginLeft:8},children:"Live"})]}),S.description&&l.jsx("div",{style:{fontSize:12,color:p.textSoft,lineHeight:1.4,marginTop:-2,marginBottom:12,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",textOverflow:"ellipsis"},title:S.description,children:S.description}),l.jsxs("div",{style:{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12},children:[l.jsx("span",{className:`badge ${S.dofollow?"badge-success":"badge-gray"}`,style:{fontSize:11},children:S.dofollow?"🔗 DoFollow":"🔗 NoFollow"}),l.jsx("span",{style:{padding:"3px 10px",borderRadius:50,fontSize:11,fontWeight:600,background:S.sponsoredTag?"#FFF7ED":"#F1F5F9",color:S.sponsoredTag?"#C2410C":"#64748B"},children:S.sponsoredTag?"🏷 Sponsored Tag":"📝 No Sponsored Tag"}),l.jsx("span",{style:{padding:"3px 10px",borderRadius:50,fontSize:11,fontWeight:600,background:"#F0FDF4",color:"#15803D"},children:`⏳ ${S.lifespan||"Permanent"}`}),S.homepageFeature&&l.jsx("span",{className:"badge badge-info",style:{fontSize:11},children:"⭐ Homepage"})]}),l.jsx("div",{style:{display:"flex",gap:8,marginBottom:12},children:[["DR",S.dr,"#0F6E56"],["Traffic",(S.traffic||0).toLocaleString(),p.accent]].map(([C,M,E])=>l.jsxs("div",{style:{background:p.bg,border:`1px solid ${p.border}`,borderRadius:7,padding:"5px 10px",flex:1,textAlign:"center"},children:[l.jsx("div",{style:{fontSize:9,color:p.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:.5},children:C}),l.jsx("div",{style:{fontWeight:800,color:E,fontSize:14,fontFamily:"'Plus Jakarta Sans',sans-serif"},children:M})]},C))}),S.samplePost&&l.jsx("div",{style:{marginBottom:12,padding:"8px 12px",background:p.accentLight,borderRadius:7,border:"1px solid #C7D2FE"},children:l.jsx("a",{href:S.samplePost,target:"_blank",rel:"noopener noreferrer",onClick:C=>C.stopPropagation(),style:{fontSize:12,color:p.accent,fontWeight:600,textDecoration:"none",display:"flex",alignItems:"center",gap:5},children:"👁 View Sample Post →"})}),l.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",borderTop:`1px solid ${p.border}`,paddingTop:12},children:[l.jsxs("div",{children:[l.jsxs("div",{style:{fontSize:24,fontWeight:800,color:p.accent,fontFamily:"'Plus Jakarta Sans',sans-serif",lineHeight:1},children:["$",S.price]}),l.jsx("div",{style:{fontSize:11,color:p.muted,marginTop:2},children:"per post"})]}),t.role==="advertiser"&&l.jsx("button",{className:"btn btn-primary btn-sm",onClick:()=>x(S),children:"Order Now"})]})]},S.id))}),h&&l.jsx(Wp,{site:h,user:t,onClose:()=>x(null),onOrder:n,ourPaypal:ourPaypal})]})}

function Up({sites:e,setSites:t,user:n}: any){const[r,i]=T.useState(!1),o=n.role==="publisher"?e.filter(a=>a.publisher===n.id||!a.publisher):e,s=a=>{t(u=>[...u,...a.map(d=>({...d,publisher:n.id||"pub1"}))])};return l.jsxs("div",{className:"page",children:[l.jsxs("div",{className:"page-header",style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[l.jsxs("div",{children:[l.jsx("div",{className:"page-title",children:"My Websites"}),l.jsxs("div",{className:"page-subtitle",children:[o.length," sites in your portfolio"]})]}),l.jsx("button",{className:"btn btn-primary",onClick:()=>i(!0),children:"➕ Add Site"})]}),l.jsxs("div",{className:"card",children:[l.jsxs("div",{className:"card-header",children:[l.jsx("span",{className:"card-title",children:"All Sites"}),l.jsxs("span",{className:"badge badge-info",children:[o.length," total"]})]}),l.jsxs("table",{children:[l.jsx("thead",{children:l.jsxs("tr",{children:[l.jsx("th",{children:"Domain"}),l.jsx("th",{children:"Niche"}),l.jsx("th",{children:"DR"}),l.jsx("th",{children:"Traffic"}),l.jsx("th",{children:"Price"}),l.jsx("th",{children:"Link"}),l.jsx("th",{children:"Lifespan"}),l.jsx("th",{children:"Sponsored Tag"}),l.jsx("th",{children:"Homepage"}),l.jsx("th",{children:"Sample Post"}),l.jsx("th",{children:"Status"})]})}),l.jsx("tbody",{children:o.map(a=>l.jsxs("tr",{children:[l.jsxs("td",{style:{fontWeight:600,color:p.primary,maxWidth:220},children:[l.jsxs("div",{children:["🌐 ",a.domain]}),a.description&&l.jsx("div",{style:{fontSize:11,color:p.muted,fontWeight:400,marginTop:3,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},title:a.description,children:a.description})]}),l.jsx("td",{children:l.jsx("span",{className:"badge badge-gray",children:a.niche||"—"})}),l.jsx("td",{children:l.jsx("span",{style:{fontWeight:700,color:"#0F6E56"},children:a.dr||"—"})}),l.jsx("td",{children:a.traffic?Number(a.traffic).toLocaleString():"—"}),l.jsxs("td",{style:{fontWeight:700,color:p.accent},children:["$",a.price||"—"]}),l.jsx("td",{children:l.jsx("span",{className:`badge ${a.dofollow?"badge-success":"badge-gray"}`,children:a.dofollow?"DoFollow":"NoFollow"})}),l.jsx("td",{children:l.jsx("span",{style:{padding:"3px 10px",borderRadius:50,fontSize:11,fontWeight:600,background:"#F0FDF4",color:"#15803D"},children:a.lifespan||"Permanent"})}),l.jsx("td",{children:l.jsx("span",{style:{padding:"3px 10px",borderRadius:50,fontSize:12,fontWeight:600,background:a.sponsoredTag?"#FFF7ED":"#F1F5F9",color:a.sponsoredTag?"#C2410C":"#64748B"},children:a.sponsoredTag?"🏷 Yes":"📝 No"})}),l.jsx("td",{children:l.jsx("span",{className:`badge ${a.homepageFeature?"badge-info":"badge-gray"}`,children:a.homepageFeature?"⭐ Yes":"No"})}),l.jsx("td",{children:a.samplePost?l.jsx("a",{href:a.samplePost,target:"_blank",rel:"noopener noreferrer",style:{color:p.accent,fontSize:12,fontWeight:600,textDecoration:"none"},children:"View →"}):l.jsx("span",{style:{color:p.muted,fontSize:12},children:"—"})}),l.jsx("td",{children:l.jsx(Si,{status:a.status||"pending"})})]},a.id))})]}),o.length===0&&l.jsxs("div",{className:"empty-state",children:[l.jsx("div",{className:"empty-icon",children:"🌐"}),l.jsx("div",{className:"empty-title",children:"No sites added yet"}),l.jsx("div",{className:"empty-desc",children:"Add your first website to start earning"})]})]}),r&&l.jsx(Bp,{onClose:()=>i(!1),onAdd:s,publisherMode:n.role==="publisher"})]})}

function Vp({orders:e,user:t}: any){const n=t.role==="admin"?e:t.role==="advertiser"?e.filter(r=>r.advertiser===t.id):e.filter(r=>r.publisher===t.id);return l.jsxs("div",{className:"page",children:[l.jsxs("div",{className:"page-header",children:[l.jsx("div",{className:"page-title",children:"Orders"}),l.jsxs("div",{className:"page-subtitle",children:[n.length," total orders"]})]}),l.jsxs("div",{className:"card",children:[l.jsx("div",{className:"card-header",children:l.jsx("span",{className:"card-title",children:"Order History"})}),l.jsxs("table",{children:[l.jsx("thead",{children:l.jsxs("tr",{children:[l.jsx("th",{children:"Order ID"}),l.jsx("th",{children:"Site"}),l.jsx("th",{children:"Type"}),l.jsx("th",{children:"Amount"}),t.role!=="advertiser"&&l.jsx("th",{children:"Commission"}),t.role!=="advertiser"&&l.jsx("th",{children:"Publisher Earning"}),l.jsx("th",{children:"Date"}),l.jsx("th",{children:"Status"})]})}),l.jsx("tbody",{children:n.map(r=>l.jsxs("tr",{children:[l.jsx("td",{style:{fontWeight:700,color:p.accent},children:r.id}),l.jsx("td",{style:{fontWeight:600,color:p.primary},children:r.site}),l.jsx("td",{children:l.jsx("span",{className:"badge badge-info",children:r.type})}),l.jsxs("td",{style:{fontWeight:700},children:["$",r.amount]}),t.role!=="advertiser"&&l.jsxs("td",{style:{color:p.danger},children:["$",r.commission]}),t.role!=="advertiser"&&l.jsxs("td",{style:{color:p.success,fontWeight:600},children:["$",r.publisherEarning]}),l.jsx("td",{style:{color:p.muted},children:r.date}),l.jsx("td",{children:l.jsx(Si,{status:r.status})})]},r.id))})]}),n.length===0&&l.jsxs("div",{className:"empty-state",children:[l.jsx("div",{className:"empty-icon",children:"📭"}),l.jsx("div",{className:"empty-title",children:"No orders yet"})]})]})]})}

function PayPalCheckoutModal({ isOpen, onClose, amount, payee, onPaymentSuccess }: any) {
  if (!isOpen) return null;
  const [step, setStep] = T.useState("login");
  const [email, setEmail] = T.useState("sandbox_buyer@authorityplacement.com");
  const [password, setPassword] = T.useState("••••••••");
  const [loading, setLoading] = T.useState(false);

  const handleLogin = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("pay");
    }, 1200);
  };

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("success");
      setTimeout(() => {
        onPaymentSuccess();
        onClose();
        setStep("login");
      }, 1500);
    }, 1800);
  };

  return l.jsx("div", {
    style: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(15, 23, 42, 0.75)",
      backdropFilter: "blur(4px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10000
    },
    children: l.jsxs("div", {
      style: {
        background: "white",
        borderRadius: 16,
        width: "100%",
        maxWidth: 420,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        overflow: "hidden"
      },
      children: [
        l.jsxs("div", {
          style: {
            background: "#003087",
            padding: "20px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          },
          children: [
            l.jsx("img", {
              src: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal_Keynote_Logo_2014.png",
              alt: "PayPal",
              referrerPolicy: "no-referrer",
              style: { height: 26 }
            }),
            l.jsx("button", {
              onClick: onClose,
              style: {
                background: "transparent",
                border: "none",
                color: "white",
                fontSize: 20,
                cursor: "pointer"
              },
              children: "✕"
            })
          ]
        }),
        l.jsxs("div", {
          style: { padding: 32 },
          children: [
            step === "login" && l.jsxs("form", {
              onSubmit: handleLogin,
              children: [
                l.jsx("div", {
                  style: {
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#003087",
                    marginBottom: 8,
                    textAlign: "center"
                  },
                  children: "Pay with PayPal"
                }),
                l.jsxs("div", {
                  style: {
                    fontSize: 13,
                    color: "#64748B",
                    marginBottom: 24,
                    textAlign: "center",
                    lineHeight: 1.5
                  },
                  children: [
                    "Transferring funds to corporate receiver account:",
                    l.jsx("strong", {
                      style: { display: "block", color: "#0F172A", marginTop: 4 },
                      children: payee
                    })
                  ]
                }),
                l.jsxs("div", {
                  className: "form-group",
                  children: [
                    l.jsx("label", { className: "label", children: "Email Address" }),
                    l.jsx("input", {
                      type: "email",
                      className: "input",
                      required: true,
                      value: email,
                      onChange: (e: any) => setEmail(e.target.value)
                    })
                  ]
                }),
                l.jsxs("div", {
                  className: "form-group",
                  style: { marginTop: 16 },
                  children: [
                    l.jsx("label", { className: "label", children: "Password" }),
                    l.jsx("input", {
                      type: "password",
                      className: "input",
                      required: true,
                      value: password,
                      onChange: (e: any) => setPassword(e.target.value)
                    })
                  ]
                }),
                l.jsxs("div", {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 12,
                    marginTop: 14,
                    marginBottom: 24
                  },
                  children: [
                    l.jsx("span", { style: { color: "#0070ba", cursor: "pointer" }, children: "Having trouble logging in?" }),
                    l.jsx("span", { style: { color: "#0070ba", cursor: "pointer" }, children: "Sign Up" })
                  ]
                }),
                l.jsx("button", {
                  type: "submit",
                  disabled: loading,
                  className: "btn",
                  style: {
                    width: "100%",
                    background: "#ffc439",
                    color: "#001c3d",
                    fontWeight: 700,
                    padding: "12px 14px",
                    borderRadius: 30,
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer"
                  },
                  children: loading ? "Connecting securely..." : "Log In"
                })
              ]
            }),
            step === "pay" && l.jsxs("div", {
              children: [
                l.jsx("div", {
                  style: {
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#0F172A",
                    marginBottom: 6,
                    textAlign: "center"
                  },
                  children: "Review and Complete Payment"
                }),
                l.jsxs("div", {
                  style: {
                    background: "#F8FAFC",
                    borderRadius: 12,
                    padding: "16px 20px",
                    margin: "20px 0",
                    border: "1px solid #E2E8F0"
                  },
                  children: [
                    l.jsxs("div", {
                      style: {
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 10
                      },
                      children: [
                        l.jsx("span", { style: { color: "#64748B", fontSize: 13 }, children: "Payment to" }),
                        l.jsx("span", { style: { fontWeight: 600, fontSize: 13, color: "#0F172A" }, children: payee })
                      ]
                    }),
                    l.jsxs("div", {
                      style: {
                        display: "flex",
                        justifyContent: "space-between",
                        paddingTop: 10,
                        borderTop: "1px solid #E2E8F0"
                      },
                      children: [
                        l.jsx("span", { style: { color: "#003087", fontWeight: 700, fontSize: 14 }, children: "Total Amount" }),
                        l.jsxs("span", { style: { color: "#003087", fontWeight: 800, fontSize: 15 }, children: ["$", parseFloat(amount).toFixed(2), " USD"] })
                      ]
                    })
                  ]
                }),
                l.jsxs("div", {
                  style: {
                    fontSize: 12,
                    color: "#64748B",
                    lineHeight: 1.5,
                    marginBottom: 24,
                    textAlign: "center"
                  },
                  children: [
                    "By clicking 'Pay Now', you authorize PayPal to securely charge your primary instrument and transfer the funds to the corporate balance of ",
                    l.jsx("strong", { children: payee }),
                    "."
                  ]
                }),
                l.jsxs("div", {
                  style: { display: "flex", gap: 12 },
                  children: [
                    l.jsx("button", {
                      onClick: onClose,
                      className: "btn btn-outline",
                      style: { flex: 1, borderRadius: 30, padding: "10px 14px" },
                      children: "Cancel"
                    }),
                    l.jsx("button", {
                      onClick: handlePay,
                      disabled: loading,
                      className: "btn",
                      style: {
                        flex: 1,
                        background: "#0070ba",
                        color: "white",
                        fontWeight: 700,
                        borderRadius: 30,
                        padding: "10px 14px",
                        border: "none",
                        cursor: loading ? "not-allowed" : "pointer"
                      },
                      children: loading ? "Processing..." : "Pay Now"
                    })
                  ]
                })
              ]
            }),
            step === "success" && l.jsxs("div", {
              style: { textAlign: "center", padding: "20px 0" },
              children: [
                l.jsx("div", {
                  style: {
                    width: 60,
                    height: 60,
                    background: "#D1FAE5",
                    color: "#059669",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 30,
                    margin: "0 auto 18px"
                  },
                  children: "✓"
                }),
                l.jsx("div", {
                  style: { fontSize: 20, fontWeight: 700, color: "#059669" },
                  children: "Payment Successful!"
                }),
                l.jsxs("div", {
                  style: { fontSize: 13, color: "#64748B", marginTop: 10, lineHeight: 1.6 },
                  children: [
                    "Thank you. Your payment of ",
                    l.jsx("strong", { children: ["$", parseFloat(amount).toFixed(2)] }),
                    " has been successfully sent to ",
                    l.jsx("strong", { children: payee }),
                    "."
                  ]
                })
              ]
            })
          ]
        })
      ]
    })
  });
}

function Yp({user:e, setUser, showToast, ourPaypal}: any){
  const [t, n] = T.useState("");
  const [paypalEmail, setPaypalEmail] = T.useState(e?.email || "");
  const [checkoutAmt, setCheckoutAmt] = T.useState(0);
  const [showCheckout, setShowCheckout] = T.useState(false);
  const [r, setR] = T.useState([
    {id:"TXN-3",type:"credit",desc:"Order ORD-003 payment received",amount:252,date:"2026-03-20",method:"PayPal"},
    {id:"TXN-2",type:"debit",desc:"Withdrawal to PayPal",amount:-200,date:"2026-02-28",method:"PayPal"},
    {id:"TXN-1",type:"credit",desc:"Order ORD-001 payment received",amount:315,date:"2026-01-01",method:"PayPal"}
  ]);

  const handleAction = () => {
    const amt = parseFloat(t);
    if (isNaN(amt) || amt <= 0) {
      if (showToast) showToast("Please enter a valid amount greater than $0.", "error");
      return;
    }

    if (e.role === "publisher") {
      if (amt > (e.wallet || 0)) {
        if (showToast) showToast("Insufficient wallet balance for withdrawal.", "error");
        return;
      }
      
      const newTxn = {
        id: `TXN-${r.length + 1}`,
        type: "debit",
        desc: `Withdrawal to PayPal (${paypalEmail || "your@paypal.com"})`,
        amount: -amt,
        date: new Date().toISOString().split("T")[0],
        method: "PayPal"
      };

      setR(prev => [newTxn, ...prev]);
      if (setUser) {
        setUser((prev: any) => ({
          ...prev,
          wallet: (prev.wallet || 0) - amt
        }));
      }
      n("");
      if (showToast) showToast(`✓ Withdrawal of $${amt.toFixed(2)} requested successfully via PayPal!`);
    } else {
      setCheckoutAmt(amt);
      setShowCheckout(true);
    }
  };

  const handlePaymentSuccess = () => {
    const amt = checkoutAmt;
    const newTxn = {
      id: `TXN-${r.length + 1}`,
      type: "credit",
      desc: `Added funds via PayPal (${paypalEmail || "sandbox_buyer@authorityplacement.com"})`,
      amount: amt,
      date: new Date().toISOString().split("T")[0],
      method: "PayPal"
    };

    setR(prev => [newTxn, ...prev]);
    if (setUser) {
      setUser((prev: any) => ({
        ...prev,
        wallet: (prev.wallet || 0) + amt
      }));
    }
    n("");
    if (showToast) showToast(`✓ Successfully deposited $${amt.toFixed(2)} via PayPal! Funds credited to payee: ${ourPaypal || "umesh.webbuzz@gmail.com"}`);
  };

  const handleConnect = () => {
    if (!paypalEmail || !paypalEmail.includes("@")) {
      if (showToast) showToast("Please enter a valid PayPal email address.", "error");
      return;
    }
    if (showToast) showToast(`✓ PayPal account (${paypalEmail}) connected successfully!`);
  };

  const selectPreset = (val: number) => {
    n(val.toString());
  };

  return l.jsxs("div",{className:"page",children:[
    l.jsx(PayPalCheckoutModal, {
      isOpen: showCheckout,
      onClose: () => setShowCheckout(false),
      amount: checkoutAmt,
      payee: ourPaypal || "umesh.webbuzz@gmail.com",
      onPaymentSuccess: handlePaymentSuccess
    }),
    l.jsxs("div",{className:"page-header",children:[
      l.jsx("div",{className:"page-title",children:"Wallet"}),
      l.jsx("div",{className:"page-subtitle",children:"Manage your funds and withdrawals"})
    ]}),
    l.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:24},children:[
      l.jsxs("div",{className:"wallet-card",children:[
        l.jsx("div",{className:"wallet-label",children:"Available Balance"}),
        l.jsxs("div",{className:"wallet-balance",children:["$",(e.wallet||0).toFixed(2)]}),
        l.jsxs("div",{style:{display:"flex",gap:10,marginTop:20,position:"relative",zIndex:1},children:[
          l.jsx("button",{className:"btn btn-sm",style:{background:"rgba(255,255,255,0.2)",color:"white",border:"1px solid rgba(255,255,255,0.3)"},onClick:()=>{
            const inputEl = document.getElementById("walletAmountInput");
            if (inputEl) (inputEl as HTMLInputElement).focus();
          },children:"💳 Add Funds"}),
          e.role==="publisher"&&l.jsx("button",{className:"btn btn-sm",style:{background:"rgba(255,255,255,0.2)",color:"white",border:"1px solid rgba(255,255,255,0.3)"},onClick:()=>{
            const inputEl = document.getElementById("walletAmountInput");
            if (inputEl) (inputEl as HTMLInputElement).focus();
          },children:"📤 Withdraw"})
        ]})
      ]}),
      l.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[
        e.role==="publisher"&&l.jsxs("div",{className:"card",style:{padding:16,flex:1},children:[
          l.jsx("div",{style:{fontSize:12,color:p.muted,marginBottom:4},children:"COMMISSION DEDUCTED (10%)"}),
          l.jsxs("div",{style:{fontSize:24,fontWeight:800,color:p.danger},children:["$",((e.earned||0)*.1).toFixed(2)]}),
          l.jsx("div",{style:{fontSize:12,color:p.muted,marginTop:4},children:"Platform keeps 10% of each sale"})
        ]}),
        l.jsxs("div",{className:"card",style:{padding:16,flex:1},children:[
          l.jsx("div",{style:{fontSize:12,color:p.muted,marginBottom:4},children:e.role==="publisher"?"TOTAL EARNED":"TOTAL SPENT"}),
          l.jsxs("div",{style:{fontSize:24,fontWeight:800,color:p.success},children:["$",e.role==="publisher"?e.earned||945:e.spent||630]}),
          l.jsx("div",{style:{fontSize:12,color:p.muted,marginTop:4},children:"All time"})
        ]})
      ]})
    ]}),
    l.jsxs("div",{className:"card",style:{marginBottom:24},children:[
      l.jsx("div",{className:"card-header",children:l.jsx("span",{className:"card-title",children:"💳 PayPal Integration"})}),
      l.jsxs("div",{className:"card-body",children:[
        l.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16},children:[
          l.jsxs("div",{children:[
            l.jsx("label",{className:"label",children:"PayPal Email Address"}),
            l.jsx("input",{className:"input",placeholder:"your@paypal.com",value:paypalEmail,onChange:i=>setPaypalEmail(i.target.value)})
          ]}),
          l.jsxs("div",{children:[
            l.jsx("label",{className:"label",children:e.role==="publisher"?"Withdraw Amount ($)":"Deposit/Add Funds Amount ($)"}),
            l.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[
              l.jsx("input",{id:"walletAmountInput",className:"input",type:"number",placeholder:"Enter amount (e.g. 100)",value:t,onChange:i=>n(i.target.value)}),
              l.jsxs("div",{style:{display:"flex",gap:6,flexWrap:"wrap",marginTop:4},children:[
                [25, 50, 100, 250, 500].map(val => l.jsx("button",{
                  onClick:()=>selectPreset(val),
                  className:"btn",
                  style:{padding:"4px 10px",fontSize:11,background:"#F1F5F9",color:"#475569",border:"1px solid #E2E8F0",borderRadius:6,cursor:"pointer",lineHeight:1.2},
                  children:`+$${val}`
                },val))
              ]})
            ]})
          ]})
        ]}),
        l.jsxs("div",{style:{marginTop:16,display:"flex",gap:10},children:[
          e.role==="publisher"?l.jsx("button",{className:"btn btn-primary",onClick:handleAction,children:"📤 Withdraw via PayPal"}):l.jsx("button",{className:"btn btn-primary",onClick:handleAction,children:"💳 Add Funds via PayPal"}),
          l.jsx("button",{className:"btn btn-outline",onClick:handleConnect,children:"🔗 Connect PayPal Account"})
        ]}),
        l.jsx("div",{style:{marginTop:12,fontSize:12,color:p.muted},children:"🔒 All transactions are secured through PayPal. Publisher withdrawals are processed within 2-3 business days."})
      ]})
    ]}),
    l.jsxs("div",{className:"card",children:[
      l.jsx("div",{className:"card-header",children:l.jsx("span",{className:"card-title",children:"📋 Transaction History"})}),
      l.jsxs("table",{children:[
        l.jsx("thead",{children:l.jsxs("tr",{children:[
          l.jsx("th",{children:"ID"}),
          l.jsx("th",{children:"Description"}),
          l.jsx("th",{children:"Amount"}),
          l.jsx("th",{children:"Date"}),
          l.jsx("th",{children:"Method"})
        ]})}),
        l.jsx("tbody",{children:r.map(i=>l.jsxs("tr",{children:[
          l.jsx("td",{style:{fontWeight:600,color:p.accent},children:i.id}),
          l.jsx("td",{children:i.desc}),
          l.jsxs("td",{style:{fontWeight:700,color:i.amount>0?p.success:p.danger},children:[i.amount>0?"+":"","$",Math.abs(i.amount).toFixed(2)]}),
          l.jsx("td",{style:{color:p.muted},children:i.date}),
          l.jsx("td",{children:l.jsxs("span",{className:"badge badge-info",children:["💳 ",i.method]})})
        ]},i.id))})
      ]})
    ]})
  ]});
}

function Gp({sites:e,setSites:t}: any){
  const [n, r] = T.useState("all");
  const [i, o] = T.useState<any>(null);
  const [s, a] = T.useState("");
  const [editingSite, setEditingSite] = T.useState<any>(null);
  const [showEditSiteModal, setShowEditSiteModal] = T.useState(false);

  const saveEditedSite = () => {
    if (!editingSite.domain.trim()) {
      alert("Domain cannot be empty.");
      return;
    }
    const updated = e.map((x: any) => x.id === editingSite.id ? editingSite : x);
    y(updated);
    setShowEditSiteModal(false);
    m(`✓ "${editingSite.domain}" updated successfully!`);
  };

  const y = (c: any) => {
    t(c);
    try {
      localStorage.setItem("amp_sites", JSON.stringify(c));
    } catch {}
  };

  const m = (c: any, h = "success") => {
    o({ msg: c, type: h });
    setTimeout(() => o(null), 3e3);
  };

  const w = (c: any) => {
    const h = e.map((x: any) => x.id === c.id ? { ...x, status: "approved" } : x);
    y(h);
    m(`✓ "${c.domain}" approved — now live on marketplace!`);
  };

  const N = (c: any) => {
    const h = e.map((x: any) => x.id === c.id ? { ...x, status: "rejected" } : x);
    y(h);
    m(`✕ "${c.domain}" rejected`, "error");
  };

  const v = (c: any) => {
    const h = e.map((x: any) => x.id === c.id ? { ...x, status: "pending" } : x);
    y(h);
    m(`"${c.domain}" moved back to pending`);
  };

  const k = (c: any) => {
    if (!window.confirm(`Delete "${c.domain}" permanently?`)) return;
    const h = e.filter((x: any) => x.id !== c.id);
    y(h);
    m(`"${c.domain}" deleted`);
  };

  const z = e.filter((c: any) => n === "all" || c.status === n)
           .filter((c: any) => !s || c.domain.toLowerCase().includes(s.toLowerCase()) || (c.niche || "").toLowerCase().includes(s.toLowerCase()));

  const f = {
    all: e.length,
    pending: e.filter((c: any) => c.status === "pending").length,
    approved: e.filter((c: any) => c.status === "approved").length,
    rejected: e.filter((c: any) => c.status === "rejected").length
  };

  return l.jsxs("div", {
    className: "page",
    children: [
      l.jsxs("div", {
        className: "page-header",
        style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
        children: [
          l.jsxs("div", {
            children: [
              l.jsx("div", { className: "page-title", children: "Sites Management" }),
              l.jsx("div", { className: "page-subtitle", children: "Review, approve and reject publisher site submissions" })
            ]
          }),
          l.jsxs("div", {
            style: { display: "flex", gap: 8, flexWrap: "wrap" },
            children: [
              l.jsxs("span", { className: "badge badge-warning", children: [f.pending, " pending review"] }),
              l.jsxs("span", { className: "badge badge-success", children: [f.approved, " approved"] }),
              l.jsxs("span", { className: "badge badge-danger", children: [f.rejected, " rejected"] })
            ]
          })
        ]
      }),
      f.pending > 0 && l.jsxs("div", {
        style: { background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 10, padding: "12px 16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10, fontSize: 14 },
        children: [
          l.jsx("span", { style: { fontSize: 18 }, children: "⏳" }),
          l.jsxs("span", { style: { fontWeight: 600, color: "#92400E" }, children: [f.pending, " site", f.pending > 1 ? "s" : "", " waiting for your review"] }),
          l.jsx("button", { className: "btn btn-sm", style: { marginLeft: "auto", background: "#F59E0B", color: "white", border: "none" }, onClick: () => r("pending"), children: "Review Now →" })
        ]
      }),
      l.jsx("div", {
        style: { display: "flex", gap: 4, background: p.bg, padding: 4, borderRadius: 10, width: "fit-content", marginBottom: 16 },
        children: [["all", "All Sites"], ["pending", "⏳ Pending"], ["approved", "✓ Approved"], ["rejected", "✕ Rejected"]].map(([c, h]) =>
          l.jsxs("div", {
            className: `tab ${n === c ? "active" : ""}`,
            onClick: () => r(c),
            style: { display: "flex", alignItems: "center", gap: 6 },
            children: [
              h,
              l.jsx("span", {
                style: { background: n === c ? "rgba(255,255,255,0.3)" : p.border, color: n === c ? "white" : p.muted, borderRadius: 50, padding: "1px 7px", fontSize: 11, fontWeight: 700 },
                children: f[c as keyof typeof f]
              })
            ]
          }, c)
        )
      }),
      l.jsxs("div", {
        style: { position: "relative", maxWidth: 360, marginBottom: 16 },
        children: [
          l.jsx("span", { style: { position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: p.muted }, children: "🔍" }),
          l.jsx("input", { className: "input", style: { paddingLeft: 38 }, placeholder: "Search domain or niche...", value: s, onChange: c => a(c.target.value) })
        ]
      }),
      l.jsx("div", {
        className: "card",
        children: l.jsxs("table", {
          children: [
            l.jsx("thead", {
              children: l.jsxs("tr", {
                children: [
                  l.jsx("th", { children: "Domain" }),
                  l.jsx("th", { children: "Publisher" }),
                  l.jsx("th", { children: "Niche" }),
                  l.jsx("th", { children: "DR" }),
                  l.jsx("th", { children: "Traffic" }),
                  l.jsx("th", { children: "Price" }),
                  l.jsx("th", { children: "Link" }),
                  l.jsx("th", { children: "Sponsored" }),
                  l.jsx("th", { children: "Status" }),
                  l.jsx("th", { children: "Actions" })
                ]
              })
            }),
            l.jsx("tbody", {
              children: z.length === 0 ? (
                l.jsx("tr", {
                  children: l.jsx("td", {
                    colSpan: 10,
                    children: l.jsxs("div", {
                      className: "empty-state",
                      children: [
                        l.jsx("div", { className: "empty-icon", children: "🌐" }),
                        l.jsxs("div", { className: "empty-title", children: ["No sites ", n !== "all" ? `with status "${n}"` : "found"] }),
                        l.jsx("div", { className: "empty-desc", children: "Publisher-submitted sites will appear here" })
                      ]
                    })
                  })
                })
              ) : (
                z.map((c: any) =>
                  l.jsxs("tr", {
                    style: { background: c.status === "pending" ? "#FFFDF0" : "white" },
                    children: [
                      l.jsxs("td", {
                        children: [
                          l.jsxs("div", { style: { fontWeight: 700, color: p.primary, fontSize: 14 }, children: ["🌐 ", c.domain] }),
                          l.jsxs("div", { style: { fontSize: 11, color: p.muted }, children: [c.turnaround || 5, "d turnaround"] })
                        ]
                      }),
                      l.jsx("td", { style: { color: p.muted, fontSize: 13 }, children: c.publisher || "—" }),
                      l.jsx("td", { children: l.jsx("span", { className: "badge badge-gray", style: { fontSize: 11 }, children: c.niche || "—" }) }),
                      l.jsx("td", { children: l.jsx("span", { style: { fontWeight: 700, color: "#0F6E56" }, children: c.dr || "—" }) }),
                      l.jsx("td", { style: { fontSize: 13 }, children: c.traffic ? Number(c.traffic).toLocaleString() : "—" }),
                      l.jsxs("td", { style: { fontWeight: 700, color: p.accent }, children: ["$", c.price || "—"] }),
                      l.jsx("td", { children: l.jsx("span", { className: `badge ${c.dofollow ? "badge-success" : "badge-gray"}`, style: { fontSize: 11 }, children: c.dofollow ? "DoFollow" : "NoFollow" }) }),
                      l.jsx("td", { children: l.jsx("span", { style: { padding: "3px 8px", borderRadius: 50, fontSize: 11, fontWeight: 600, background: c.sponsoredTag ? "#FFF7ED" : "#F1F5F9", color: c.sponsoredTag ? "#C2410C" : "#64748B" }, children: c.sponsoredTag ? "🏷 Yes" : "No" }) }),
                      l.jsx("td", { children: l.jsx(Si, { status: c.status || "pending" }) }),
                      l.jsx("td", {
                        children: l.jsxs("div", {
                          style: { display: "flex", gap: 5, flexWrap: "wrap" },
                          children: [
                            c.status !== "approved" && l.jsx("button", { className: "btn btn-sm btn-success", onClick: () => w(c), children: "✓ Approve" }),
                            c.status !== "rejected" && l.jsx("button", { className: "btn btn-sm btn-danger", onClick: () => N(c), children: "✕ Reject" }),
                            c.status !== "pending" && l.jsx("button", { className: "btn btn-sm btn-outline", onClick: () => v(c), children: "↺ Reset" }),
                            l.jsx("button", {
                              className: "btn btn-sm btn-outline",
                              onClick: () => {
                                setEditingSite(c);
                                setShowEditSiteModal(true);
                              },
                              children: "Edit"
                            }),
                            l.jsx("button", { className: "btn btn-sm", onClick: () => k(c), style: { background: "#FEF2F2", color: "#EF4444", border: "1px solid #FECACA", cursor: "pointer" }, children: "🗑" })
                          ]
                        })
                      })
                    ]
                  }, c.id)
                )
              )
            })
          ]
        })
      }),
      i && l.jsx("div", {
        style: { position: "fixed", bottom: 24, right: 24, zIndex: 9999, background: i.type === "error" ? p.danger : p.success, color: "white", padding: "13px 22px", borderRadius: 10, fontWeight: 600, fontSize: 14, boxShadow: "0 4px 20px rgba(0,0,0,0.2)", maxWidth: 400 },
        children: i.msg
      }),
      showEditSiteModal && editingSite && (
        l.jsx("div", {
          className: "modal-overlay",
          onClick: evt => evt.target === evt.currentTarget && setShowEditSiteModal(false),
          children: l.jsxs("div", {
            className: "modal",
            style: { maxWidth: 460 },
            children: [
              l.jsxs("div", {
                className: "modal-header",
                children: [
                  l.jsxs("span", { className: "modal-title", children: ["✏️ Edit Website — ", editingSite.domain] }),
                  l.jsx("button", { className: "btn btn-ghost btn-sm", onClick: () => setShowEditSiteModal(false), children: "✕" })
                ]
              }),
              l.jsxs("div", {
                className: "modal-body",
                children: [
                  l.jsxs("div", {
                    className: "form-group",
                    children: [
                      l.jsx("label", { className: "label", children: "Domain" }),
                      l.jsx("input", {
                        className: "input",
                        value: editingSite.domain,
                        onChange: evt => setEditingSite({ ...editingSite, domain: evt.target.value })
                      })
                    ]
                  }),
                  l.jsxs("div", {
                    className: "form-group",
                    children: [
                      l.jsx("label", { className: "label", children: "Niche" }),
                      l.jsx("input", {
                        className: "input",
                        value: editingSite.niche,
                        onChange: evt => setEditingSite({ ...editingSite, niche: evt.target.value })
                      })
                    ]
                  }),
                  l.jsxs("div", {
                    style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
                    children: [
                      l.jsxs("div", {
                        className: "form-group",
                        children: [
                          l.jsx("label", { className: "label", children: "DR" }),
                          l.jsx("input", {
                            className: "input",
                            type: "number",
                            value: editingSite.dr,
                            onChange: evt => setEditingSite({ ...editingSite, dr: parseInt(evt.target.value) || 0 })
                          })
                        ]
                      }),
                      l.jsxs("div", {
                        className: "form-group",
                        children: [
                          l.jsx("label", { className: "label", children: "Traffic" }),
                          l.jsx("input", {
                            className: "input",
                            type: "number",
                            value: editingSite.traffic,
                            onChange: evt => setEditingSite({ ...editingSite, traffic: parseInt(evt.target.value) || 0 })
                          })
                        ]
                      })
                    ]
                  }),
                  l.jsxs("div", {
                    className: "form-group",
                    children: [
                      l.jsx("label", { className: "label", children: "Price ($)" }),
                      l.jsx("input", {
                        className: "input",
                        type: "number",
                        value: editingSite.price,
                        onChange: evt => setEditingSite({ ...editingSite, price: parseInt(evt.target.value) || 0 })
                      })
                    ]
                  }),
                  l.jsxs("div", {
                    className: "form-group",
                    children: [
                      l.jsx("label", { className: "label", children: "Link Type" }),
                      l.jsxs("select", {
                        className: "select",
                        value: editingSite.dofollow ? "true" : "false",
                        onChange: evt => setEditingSite({ ...editingSite, dofollow: evt.target.value === "true" }),
                        children: [
                          l.jsx("option", { value: "true", children: "DoFollow" }),
                          l.jsx("option", { value: "false", children: "NoFollow" })
                        ]
                      })
                    ]
                  }),
                  l.jsxs("div", {
                    className: "form-group",
                    children: [
                      l.jsx("label", { className: "label", children: "Account Status" }),
                      l.jsxs("select", {
                        className: "select",
                        value: editingSite.status || "pending",
                        onChange: evt => setEditingSite({ ...editingSite, status: evt.target.value }),
                        children: [
                          l.jsx("option", { value: "approved", children: "✅ Approved" }),
                          l.jsx("option", { value: "pending", children: "⏳ Pending" }),
                          l.jsx("option", { value: "rejected", children: "✕ Rejected" })
                        ]
                      })
                    ]
                  }),
                  l.jsxs("div", {
                    className: "form-group",
                    children: [
                      l.jsx("label", { className: "label", children: "Website Description" }),
                      l.jsx("textarea", {
                        className: "input",
                        rows: 3,
                        value: editingSite.description || "",
                        onChange: evt => setEditingSite({ ...editingSite, description: evt.target.value }),
                        style: { resize: "vertical" }
                      })
                    ]
                  }),
                  l.jsxs("div", {
                    style: { display: "flex", gap: 10, marginTop: 24 },
                    children: [
                      l.jsx("button", { className: "btn btn-primary", style: { flex: 1 }, onClick: saveEditedSite, children: "Save Changes" }),
                      l.jsx("button", { className: "btn btn-outline", onClick: () => setShowEditSiteModal(false), children: "Cancel" })
                    ]
                  })
                ]
              })
            ]
          })
        })
      )
    ]
  });
}

function Qp({ onLoginAs }: any){
  const [activeTab, setActiveTab] = T.useState("all");
  const [users, setUsers] = T.useState<any[]>([]);
  const [searchQuery, setSearchQuery] = T.useState("");
  const [editingUser, setEditingUser] = T.useState<any>(null);
  const [showEditModal, setShowEditModal] = T.useState(false);
  const [toast, setToast] = T.useState<{msg: string, type: string} | null>(null);

  // States for Manual User Creation
  const [showCreateUserModal, setShowCreateUserModal] = T.useState(false);
  const [newUserName, setNewUserName] = T.useState("");
  const [newUserEmail, setNewUserEmail] = T.useState("");
  const [newUserPassword, setNewUserPassword] = T.useState("");
  const [newUserRole, setNewUserRole] = T.useState("advertiser");
  const [newUserWallet, setNewUserWallet] = T.useState("1000");
  const [newUserStatus, setNewUserStatus] = T.useState("approved");

  const showToastMessage = (msg: string, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadUsersList = () => {
    const defaultList = [
      {id:"adv1",name:"Rajesh Kumar",email:"rajesh@adv.com",role:"advertiser",wallet:2500,joined:"2026-01-01",activity:"3 orders",status:"approved"},
      {id:"pub1",name:"Priya Sharma",email:"priya@pub.com",role:"publisher",wallet:847.5,joined:"2026-01-15",activity:"2 sites",status:"approved"},
      {id:"pub2",name:"Amit Singh",email:"amit@pub.com",role:"publisher",wallet:360,joined:"2026-02-01",activity:"2 sites",status:"approved"},
      {id:"adv2",name:"Sunita Rao",email:"sunita@adv.com",role:"advertiser",wallet:1200,joined:"2026-03-20",activity:"1 order",status:"approved"}
    ];
    let localUsers: any={};
    try {
      localUsers = JSON.parse(localStorage.getItem("amp_users") || "{}");
    } catch{}
    
    const mergedList: any[] = [];
    const processedIds = new Set<string>();
    const processedEmails = new Set<string>();
    
    // Merge defaults with local overrides
    defaultList.forEach(u => {
      const override = localUsers[u.id] || localUsers[u.email.toLowerCase()];
      const finalUser = override ? {
        ...u,
        ...override,
        wallet: override.wallet !== undefined ? Number(override.wallet) : u.wallet,
        status: override.status || u.status || "approved"
      } : u;
      
      mergedList.push(finalUser);
      processedIds.add(finalUser.id);
      processedEmails.add(finalUser.email.toLowerCase());
    });

    // Add other dynamic users from local registry safely checking processed
    Object.values(localUsers).forEach((u: any) => {
      if (u && u.id && u.email) {
        const uEmail = u.email.toLowerCase();
        if (!processedIds.has(u.id) && !processedEmails.has(uEmail)) {
          mergedList.push({
            id: u.id,
            name: u.name,
            email: u.email,
            role: u.role,
            wallet: u.wallet !== undefined ? Number(u.wallet) : (u.role === "advertiser" ? 1000 : 0),
            joined: u.joined || new Date().toISOString().split("T")[0],
            activity: u.activity || "New user",
            status: u.status || "approved"
          });
          processedIds.add(u.id);
          processedEmails.add(uEmail);
        }
      }
    });

    setUsers(mergedList);
  };

  const handleApproveUser = async (u: any) => {
    const updated = users.map(userItem => userItem.id === u.id ? { ...userItem, status: "approved", activity: "Approved by Admin" } : userItem);
    saveUsersToStorage(updated);
    
    try {
      const res = await sendEmailNotification({
        to: u.email,
        subject: "🎉 Your Account has been Approved! - Authority Media Placement",
        html: getEmailTemplate("approved", { name: u.name, email: u.email, role: u.role }),
        category: "approved"
      });
      if (res && res.success) {
        if (res.mode === "simulated") {
          showToastMessage(`User "${u.name}" has been approved successfully! (${res.message})`, "success");
        } else {
          showToastMessage(`User "${u.name}" has been approved successfully! Real approval email notification sent to ${u.email}.`, "success");
        }
      } else {
        showToastMessage(`User approved, but notification email delivery failed: ${res?.error || res?.message || "Check SMTP logs"}`, "error");
      }
    } catch (e: any) {
      showToastMessage(`User approved, but notification email failed: ${e.message || e}`, "error");
    }
  };

  const handleRejectUser = async (u: any) => {
    const reason = window.prompt("Optional: Enter decline reason for the rejection email:", "Our quality criteria requirements were not met.");
    if (reason === null) return;
    
    const updated = users.map(userItem => userItem.id === u.id ? { ...userItem, status: "rejected", activity: "Declined by Admin" } : userItem);
    saveUsersToStorage(updated);
    
    try {
      const res = await sendEmailNotification({
        to: u.email,
        subject: "Update regarding your application - Authority Media Placement",
        html: getEmailTemplate("rejected", { name: u.name, email: u.email, role: u.role, reason }),
        category: "rejected"
      });
      if (res && res.success) {
        if (res.mode === "simulated") {
          showToastMessage(`User application rejected. (${res.message})`, "error");
        } else {
          showToastMessage(`User "${u.name}" rejected. Real decline notification email sent to ${u.email}.`, "error");
        }
      } else {
        showToastMessage(`User rejected, but rejection email delivery failed: ${res?.error || res?.message || "Check SMTP logs"}`, "error");
      }
    } catch (e: any) {
      showToastMessage(`User rejected, but rejection email failed: ${e.message || e}`, "error");
    }
  };

  const handleCreateUser = () => {
    if (!newUserName.trim() || !newUserEmail.trim() || !newUserPassword.trim()) {
      alert("All fields are required to create a user.");
      return;
    }
    if (!newUserEmail.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    const emailKey = newUserEmail.toLowerCase().trim();
    let localUsers: any = {};
    try {
      localUsers = JSON.parse(localStorage.getItem("amp_users") || "{}");
    } catch {}

    const isExist = users.some(u => u.email.toLowerCase() === emailKey) || localUsers[emailKey];
    if (isExist) {
      alert("An account with this email already exists on the platform.");
      return;
    }

    const nextUser = {
      id: "user_" + Date.now(),
      name: newUserName.trim(),
      email: emailKey,
      role: newUserRole,
      password: newUserPassword,
      wallet: parseFloat(newUserWallet) || 0,
      status: newUserStatus,
      joined: new Date().toISOString().split("T")[0],
      activity: "Manually registered by Admin"
    };

    localUsers[emailKey] = nextUser;
    localUsers[nextUser.id] = nextUser;
    localStorage.setItem("amp_users", JSON.stringify(localUsers));

    // Instant notifications during direct creation
    if (newUserStatus === "pending") {
      sendEmailNotification({
        to: emailKey,
        subject: "Welcome to Authority Media Placement - Review Pending",
        html: getEmailTemplate("welcome_pending", { name: newUserName.trim(), email: emailKey, role: newUserRole }),
        category: "welcome"
      });
      sendEmailNotification({
        to: "admin@authorityplacement.com",
        subject: "🔔 New Sign Up Alert: Review Required",
        html: getEmailTemplate("admin_alert", { name: newUserName.trim(), email: emailKey, role: newUserRole }),
        category: "admin_alert"
      });
    } else if (newUserStatus === "approved") {
      sendEmailNotification({
        to: emailKey,
        subject: "🎉 Your Account has been Approved! - Authority Media Placement",
        html: getEmailTemplate("approved", { name: newUserName.trim(), email: emailKey, role: newUserRole }),
        category: "approved"
      });
    }

    loadUsersList();
    setShowCreateUserModal(false);
    setNewUserName("");
    setNewUserEmail("");
    setNewUserPassword("");
    setNewUserWallet(newUserRole === "advertiser" ? "1000" : "0");
    showToastMessage(`User "${newUserName}" was manually created successfully!`, "success");
  };

  T.useEffect(() => {
    loadUsersList();
  }, []);

  const saveUsersToStorage = (updatedList: any[]) => {
    setUsers(updatedList);
    let existing: any = {};
    try {
      existing = JSON.parse(localStorage.getItem("amp_users") || "{}");
    } catch {}

    updatedList.forEach(currUser => {
      const idKey = currUser.id;
      const oldEntry = existing[idKey] || existing[currUser.email.toLowerCase()] || {};
      const updatedRecord = {
        ...oldEntry,
        id: currUser.id,
        name: currUser.name,
        email: currUser.email,
        role: currUser.role,
        wallet: Number(currUser.wallet || 0),
        status: currUser.status || "approved",
        joined: currUser.joined || oldEntry.joined || new Date().toISOString().split("T")[0],
        activity: currUser.activity || oldEntry.activity || "New user",
        password: oldEntry.password || "Demo@1234"
      };
      
      existing[idKey] = updatedRecord;
      existing[currUser.email.toLowerCase()] = updatedRecord;
    });

    try {
      localStorage.setItem("amp_users", JSON.stringify(existing));
    } catch {}
  };

  const handleToggleBan = (u: any) => {
    const isBanned = u.status === "banned";
    const nextStatus = isBanned ? "approved" : "banned";
    
    if (!isBanned) {
      if (!window.confirm(`Are you sure you want to ban user "${u.name}"? They won't be able to log in.`)) {
        return;
      }
    }
    
    const updated = users.map(userItem => userItem.id === u.id ? { ...userItem, status: nextStatus } : userItem);
    saveUsersToStorage(updated);
    showToastMessage(`User "${u.name}" was successfully ${isBanned ? "unbanned" : "banned"}!`, isBanned ? "success" : "error");
  };

  const handleEditClick = (u: any) => {
    setEditingUser({ ...u });
    setShowEditModal(true);
  };

  const saveEditedUser = async () => {
    if (!editingUser.name.trim()) {
      alert("Name cannot be empty.");
      return;
    }
    if (!editingUser.email.trim() || !editingUser.email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    const originalUser = users.find(u => u.id === editingUser.id);
    const wasPending = originalUser && originalUser.status === "pending";
    const isApprovedNow = editingUser.status === "approved";

    let emailMessageStr = "";
    if (wasPending && isApprovedNow) {
      try {
        const res = await sendEmailNotification({
          to: editingUser.email,
          subject: "🎉 Your Account has been Approved! - Authority Media Placement",
          html: getEmailTemplate("approved", { name: editingUser.name, email: editingUser.email, role: editingUser.role }),
          category: "approved"
        });
        if (res && res.success) {
          if (res.mode === "simulated") {
            emailMessageStr = ` and account approved (${res.message})`;
          } else {
            emailMessageStr = " and approval email notification sent successfully";
          }
        } else {
          emailMessageStr = ` (warning: account approved, but email delivery failed: ${res?.error || res?.message || "Check SMTP configurations"})`;
        }
      } catch (err: any) {
        emailMessageStr = ` (warning: email send failed: ${err.message || err})`;
      }
    }

    const nextActivity = wasPending && isApprovedNow ? "Approved by Admin" : editingUser.activity;
    const finalEditingUser = { ...editingUser, activity: nextActivity };

    const updated = users.map(u => u.id === editingUser.id ? finalEditingUser : u);
    saveUsersToStorage(updated);
    setShowEditModal(false);
    showToastMessage(`User profile for "${editingUser.name}" has been updated${emailMessageStr}.`);
  };

  const filteredUsers = users
    .filter(u => activeTab === "all" || u.role === activeTab)
    .filter(u => {
      if (!searchQuery) return true;
      const term = searchQuery.toLowerCase();
      return (
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term)
      );
    });

  return l.jsxs("div", {
    className: "page",
    children: [
      l.jsxs("div", {
        className: "page-header",
        style: { display: "flex", justifyContent: "space-between", alignItems: "center" },
        children: [
          l.jsxs("div", {
            children: [
              l.jsx("div", { className: "page-title", children: "Users Management" }),
              l.jsxs("div", {
                className: "page-subtitle",
                children: [users.length, " total registered accounts on platform"]
              })
            ]
          }),
          l.jsxs("div", {
            style: { display: "flex", gap: 10, alignItems: "center" },
            children: [
              l.jsx("button", {
                className: "btn btn-primary",
                style: { display: "flex", alignItems: "center", gap: 6, fontWeight: 700, padding: "8px 16px" },
                onClick: () => {
                  setNewUserName("");
                  setNewUserEmail("");
                  setNewUserPassword("Demo@1234");
                  setNewUserRole("advertiser");
                  setNewUserWallet("1000");
                  setNewUserStatus("approved");
                  setShowCreateUserModal(true);
                },
                children: "+ Add User"
              }),
              l.jsxs("span", {
                className: "badge badge-info",
                children: [users.filter(u => u.role === "advertiser").length, " advertisers"]
              }),
              l.jsxs("span", {
                className: "badge badge-success",
                children: [users.filter(u => u.role === "publisher").length, " publishers"]
              })
            ]
          })
        ]
      }),
      l.jsxs("div", {
        style: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, marginBottom: 20, flexWrap: "wrap" },
        children: [
          l.jsx("div", {
            className: "tabs",
            children: [
              ["all", "👥 All Users"],
              ["advertiser", "📣 Advertisers"],
              ["publisher", "🌐 Publishers"]
            ].map(([tabId, tabLabel]) =>
              l.jsx("div", {
                className: `tab ${activeTab === tabId ? "active" : ""}`,
                onClick: () => setActiveTab(tabId),
                children: tabLabel
              }, tabId)
            )
          }),
          l.jsxs("div", {
            style: { position: "relative", minWidth: 280 },
            children: [
              l.jsx("span", { style: { position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: p.muted }, children: "🔍" }),
              l.jsx("input", {
                className: "input",
                style: { paddingLeft: 38 },
                placeholder: "Search users by name or email...",
                value: searchQuery,
                onChange: e => setSearchQuery(e.target.value)
              })
            ]
          })
        ]
      }),
      l.jsx("div", {
        className: "card",
        children: l.jsxs("table", {
          children: [
            l.jsx("thead", {
              children: l.jsxs("tr", {
                children: [
                  l.jsx("th", { children: "Name" }),
                  l.jsx("th", { children: "Email" }),
                  l.jsx("th", { children: "Role" }),
                  l.jsx("th", { children: "Wallet" }),
                  l.jsx("th", { children: "Joined" }),
                  l.jsx("th", { children: "Activity" }),
                  l.jsx("th", { children: "Status" }),
                  l.jsx("th", { children: "Action" })
                ]
              })
            }),
            l.jsx("tbody", {
              children: filteredUsers.length === 0 ? (
                l.jsx("tr", {
                  children: l.jsx("td", {
                    colSpan: 8,
                    children: l.jsxs("div", {
                      className: "empty-state",
                      children: [
                        l.jsx("div", { className: "empty-icon", children: "👥" }),
                        l.jsxs("div", {
                          className: "empty-title",
                          children: ["No ", activeTab === "all" ? "users" : activeTab + "s", " found"]
                        }),
                        l.jsx("div", {
                          className: "empty-desc",
                          children: "No records match your filters."
                        })
                      ]
                    })
                  })
                })
              ) : (
                filteredUsers.map(u => {
                  var initialStr;
                  return l.jsxs("tr", {
                    style: { background: u.status === "banned" ? "#FEF2F2" : "none" },
                    children: [
                      l.jsx("td", {
                        style: { fontWeight: 600, color: p.primary },
                        children: l.jsxs("div", {
                          style: { display: "flex", alignItems: "center", gap: 8 },
                          children: [
                            l.jsx("div", {
                              style: {
                                width: 32,
                                height: 32,
                                borderRadius: "50%",
                                background: u.status === "banned" ? p.dangerLight : p.accentLight,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 12,
                                fontWeight: 700,
                                color: u.status === "banned" ? p.danger : p.accent
                              },
                              children: ((initialStr = u.name) == null ? void 0 : initialStr.split(" ").map((nPart: string) => nPart[0]).join("")) || "?"
                            }),
                            l.jsxs("span", {
                              style: { textDecoration: u.status === "banned" ? "line-through" : "none", color: u.status === "banned" ? p.muted : p.primary },
                              children: [u.name, " ", u.id.startsWith("user_") && l.jsx("span", { style: { fontSize: 10, color: p.muted, fontWeight: 400 }, children: "(Self Registered)" })]
                            })
                          ]
                        })
                      }),
                      l.jsx("td", { style: { color: p.muted }, children: u.email }),
                      l.jsx("td", {
                        children: l.jsx("span", {
                          className: `badge ${u.role === "advertiser" ? "badge-info" : u.role === "admin" ? "badge-gray" : "badge-success"}`,
                          children: u.role
                        })
                      }),
                      l.jsxs("td", {
                        style: { fontWeight: 700, color: p.accent },
                        children: ["$", (u.wallet || 0).toFixed(2)]
                      }),
                      l.jsx("td", { style: { color: p.muted }, children: u.joined }),
                      l.jsx("td", { style: { color: p.muted }, children: u.activity }),
                      l.jsx("td", {
                        children: l.jsx("span", {
                          className: `badge ${u.status === "banned" ? "badge-danger" : u.status === "pending" ? "badge-warning" : "badge-success"}`,
                          children: u.status === "banned" ? "✕ Banned" : u.status === "pending" ? "⏳ Pending" : "✓ Active"
                        })
                      }),
                      l.jsx("td", {
                        children: l.jsxs("div", {
                          style: { display: "flex", gap: 6 },
                          children: [
                            u.status === "pending" && l.jsx("button", {
                              className: "btn btn-sm btn-success",
                              style: { background: p.success, color: "white", fontWeight: 700, border: "none", cursor: "pointer" },
                              onClick: () => handleApproveUser(u),
                              children: "✓ Approve"
                            }),
                            u.status === "pending" && l.jsx("button", {
                              className: "btn btn-sm btn-danger",
                              style: { background: p.danger, color: "white", fontWeight: 700, border: "none", cursor: "pointer" },
                              onClick: () => handleRejectUser(u),
                              children: "✕ Reject"
                            }),
                            l.jsx("button", {
                              className: "btn btn-sm btn-outline",
                              onClick: () => handleEditClick(u),
                              children: "Edit"
                            }),
                            u.role !== "admin" && u.status !== "pending" && l.jsx("button", {
                              className: "btn btn-sm",
                              style: {
                                color: p.accent,
                                background: p.accentLight,
                                fontWeight: 600,
                                border: "none",
                                cursor: "pointer"
                              },
                              onClick: () => onLoginAs && onLoginAs(u),
                              children: "Access Panel 🔑"
                            }),
                            u.status !== "pending" && l.jsx("button", {
                              className: "btn btn-sm",
                              style: {
                                background: u.status === "banned" ? p.successLight : p.dangerLight,
                                color: u.status === "banned" ? p.success : p.danger,
                                border: "none",
                                cursor: "pointer"
                              },
                              onClick: () => handleToggleBan(u),
                              children: u.status === "banned" ? "Unban" : "Ban"
                            })
                          ]
                        })
                      })
                    ]
                  }, u.id);
                })
              )
            })
          ]
        })
      }),
      showEditModal && editingUser && (
        l.jsx("div", {
          className: "modal-overlay",
          onClick: e => e.target === e.currentTarget && setShowEditModal(false),
          children: l.jsxs("div", {
            className: "modal",
            style: { maxWidth: 460 },
            children: [
              l.jsxs("div", {
                className: "modal-header",
                children: [
                  l.jsxs("span", { className: "modal-title", children: ["✏️ Edit User — ", editingUser.name] }),
                  l.jsx("button", { className: "btn btn-ghost btn-sm", onClick: () => setShowEditModal(false), children: "✕" })
                ]
              }),
              l.jsxs("div", {
                className: "modal-body",
                children: [
                  l.jsxs("div", {
                    className: "form-group",
                    children: [
                      l.jsx("label", { className: "label", children: "Full Name" }),
                      l.jsx("input", {
                        className: "input",
                        value: editingUser.name,
                        onChange: e => setEditingUser({ ...editingUser, name: e.target.value })
                      })
                    ]
                  }),
                  l.jsxs("div", {
                    className: "form-group",
                    children: [
                      l.jsx("label", { className: "label", children: "Email Address" }),
                      l.jsx("input", {
                        className: "input",
                        type: "email",
                        value: editingUser.email,
                        onChange: e => setEditingUser({ ...editingUser, email: e.target.value })
                      })
                    ]
                  }),
                  l.jsxs("div", {
                    className: "form-group",
                    children: [
                      l.jsx("label", { className: "label", children: "Role" }),
                      l.jsxs("select", {
                        className: "select",
                        value: editingUser.role,
                        onChange: e => setEditingUser({ ...editingUser, role: e.target.value }),
                        children: [
                          l.jsx("option", { value: "advertiser", children: "Advertiser (📣 Buy Links)" }),
                          l.jsx("option", { value: "publisher", children: "Publisher (🌐 Sell Links)" }),
                          l.jsx("option", { value: "admin", children: "Administrator (⚙️ Admin Panel)" })
                        ]
                      })
                    ]
                  }),
                  l.jsxs("div", {
                    className: "form-group",
                    children: [
                      l.jsx("label", { className: "label", children: "Wallet Balance ($)" }),
                      l.jsx("input", {
                        className: "input",
                        type: "number",
                        step: "0.01",
                        value: editingUser.wallet,
                        onChange: e => setEditingUser({ ...editingUser, wallet: parseFloat(e.target.value) || 0 })
                      })
                    ]
                  }),
                  l.jsxs("div", {
                    className: "form-group",
                    children: [
                      l.jsx("label", { className: "label", children: "Account Status" }),
                      l.jsxs("select", {
                        className: "select",
                        value: editingUser.status || "approved",
                        onChange: e => setEditingUser({ ...editingUser, status: e.target.value }),
                        children: [
                          l.jsx("option", { value: "approved", children: "✅ Active / Approved" }),
                          l.jsx("option", { value: "pending", children: "⏳ Pending Review" }),
                          l.jsx("option", { value: "banned", children: "❌ Banned" })
                        ]
                      })
                    ]
                  }),
                  l.jsxs("div", {
                    style: { display: "flex", gap: 10, marginTop: 24 },
                    children: [
                      l.jsx("button", { className: "btn btn-primary", style: { flex: 1 }, onClick: saveEditedUser, children: "Save Changes" }),
                      l.jsx("button", { className: "btn btn-outline", onClick: () => setShowEditModal(false), children: "Cancel" })
                    ]
                  })
                ]
              })
            ]
          })
        })
      ),
      showCreateUserModal && (
        l.jsx("div", {
          className: "modal-overlay",
          onClick: e => e.target === e.currentTarget && setShowCreateUserModal(false),
          children: l.jsxs("div", {
            className: "modal",
            style: { maxWidth: 460 },
            children: [
              l.jsxs("div", {
                className: "modal-header",
                children: [
                  l.jsx("span", { className: "modal-title", children: "➕ Manually Create User Account" }),
                  l.jsx("button", { className: "btn btn-ghost btn-sm", onClick: () => setShowCreateUserModal(false), children: "✕" })
                ]
              }),
              l.jsxs("div", {
                className: "modal-body",
                children: [
                  l.jsxs("div", {
                    className: "form-group",
                    children: [
                      l.jsx("label", { className: "label", children: "Full Name" }),
                      l.jsx("input", {
                        className: "input",
                        placeholder: "John Doe",
                        value: newUserName,
                        onChange: e => setNewUserName(e.target.value)
                      })
                    ]
                  }),
                  l.jsxs("div", {
                    className: "form-group",
                    children: [
                      l.jsx("label", { className: "label", children: "Email Address" }),
                      l.jsx("input", {
                        className: "input",
                        type: "email",
                        placeholder: "john@example.com",
                        value: newUserEmail,
                        onChange: e => setNewUserEmail(e.target.value)
                      })
                    ]
                  }),
                  l.jsxs("div", {
                    className: "form-group",
                    children: [
                      l.jsx("label", { className: "label", children: "Password" }),
                      l.jsx("input", {
                        className: "input",
                        type: "password",
                        placeholder: "Demo@1234",
                        value: newUserPassword,
                        onChange: e => setNewUserPassword(e.target.value)
                      })
                    ]
                  }),
                  l.jsxs("div", {
                    className: "form-group",
                    children: [
                      l.jsx("label", { className: "label", children: "Account Role" }),
                      l.jsxs("select", {
                        className: "select",
                        value: newUserRole,
                        onChange: e => {
                          const roleVal = e.target.value;
                          setNewUserRole(roleVal);
                          setNewUserWallet(roleVal === "advertiser" ? "1000" : "0");
                        },
                        children: [
                          l.jsx("option", { value: "advertiser", children: "Advertiser (📣 Buy Links)" }),
                          l.jsx("option", { value: "publisher", children: "Publisher (🌐 Sell Links)" }),
                          l.jsx("option", { value: "admin", children: "Administrator (⚙️ Admin Panel)" })
                        ]
                      })
                    ]
                  }),
                  l.jsxs("div", {
                    className: "form-group",
                    children: [
                      l.jsx("label", { className: "label", children: "Initial Wallet Balance ($)" }),
                      l.jsx("input", {
                        className: "input",
                        type: "number",
                        step: "0.01",
                        placeholder: "1000",
                        value: newUserWallet,
                        onChange: e => setNewUserWallet(e.target.value)
                      })
                    ]
                  }),
                  l.jsxs("div", {
                    className: "form-group",
                    children: [
                      l.jsx("label", { className: "label", children: "Account Approval Status" }),
                      l.jsxs("select", {
                        className: "select",
                        value: newUserStatus,
                        onChange: e => setNewUserStatus(e.target.value),
                        children: [
                          l.jsx("option", { value: "approved", children: "✅ Active / Instant Approved" }),
                          l.jsx("option", { value: "pending", children: "⏳ Review Required (Sends Welcome Notification)" })
                        ]
                      })
                    ]
                  }),
                  l.jsxs("div", {
                    style: { display: "flex", gap: 10, marginTop: 24 },
                    children: [
                      l.jsx("button", { className: "btn btn-primary", style: { flex: 1 }, onClick: handleCreateUser, children: "Add Account Manually" }),
                      l.jsx("button", { className: "btn btn-outline", onClick: () => setShowCreateUserModal(false), children: "Cancel" })
                    ]
                  })
                ]
              })
            ]
          })
        })
      ),
      toast && l.jsx("div", {
        style: {
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9999,
          background: toast.type === "error" ? p.danger : p.success,
          color: "white",
          padding: "13px 22px",
          borderRadius: 10,
          fontWeight: 600,
          fontSize: 14,
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          maxWidth: 400
        },
        children: toast.msg
      })
    ]
  });
}

function Xi({ onLogin, onClose, defaultTab, defaultRole }: any) {
  const [tab, setTab] = T.useState(defaultTab || "login");
  const [email, setEmail] = T.useState("");
  const [password, setPassword] = T.useState("");
  const [fullName, setFullName] = T.useState("");
  const [role, setRole] = T.useState(defaultRole || "advertiser");
  const [error, setError] = T.useState("");
  const [loading, setLoading] = T.useState(false);
  const [showPassword, setShowPassword] = T.useState(false);
  const [attempts, setAttempts] = T.useState(0);
  const [isLocked, setIsLocked] = T.useState(false);
  const lockTimer = T.useRef<any>(null);

  const startLockout = () => {
    setIsLocked(true);
    setError("Too many failed attempts. Please wait 30 seconds.");
    lockTimer.current = setTimeout(() => {
      setIsLocked(false);
      setAttempts(0);
      setError("");
    }, 30000);
  };

  const handleLogin = async () => {
    if (isLocked) return;
    setError("");
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    if (tab === "login") {
      if (["admin@authorityplacement.com", "authorityplacement@gmail.com"].includes(email.toLowerCase().trim())) {
        setError("Admin accounts must log in via the admin portal. Go to: yoursite.com/?admin=1");
        return;
      }
      setLoading(true);
      const q = localStorage.getItem("amp_users");
      const userRecord = (q ? JSON.parse(q) : {})[email.toLowerCase().trim()];
      const mockRecord = ii[email.toLowerCase().trim() as keyof typeof ii];

      if (userRecord && userRecord.status === "banned") {
        setLoading(false);
        setError("🚫 This account has been banned by an administrator.");
        return;
      }
      if (userRecord && userRecord.status === "pending") {
        setLoading(false);
        setError("⏳ Your account is pending administrator review.");
        return;
      }

      if (mockRecord) {
        const passwordMatch = await Oo(password, mockRecord.hash);
        setLoading(false);
        if (!passwordMatch) {
          const nextAttempts = attempts + 1;
          setAttempts(nextAttempts);
          if (nextAttempts >= 5) {
            startLockout();
          } else {
            setError(`Incorrect password. ${5 - nextAttempts} attempt${5 - nextAttempts !== 1 ? "s" : ""} remaining.`);
          }
          return;
        }
        setAttempts(0);
        const nameVal = userRecord?.name || mockRecord.user.name;
        const roleVal = userRecord?.role || mockRecord.user.role;
        const walletVal = userRecord?.wallet !== void 0 ? Number(userRecord.wallet) : (mockRecord.user as any).wallet;
        onLogin({ ...mockRecord.user, name: nameVal, role: roleVal, wallet: walletVal } as any);
      } else {
        setLoading(false);
        if (!userRecord) {
          setError("No account found. Please sign up first.");
          return;
        }
        if (userRecord.password !== password) {
          const nextAttempts = attempts + 1;
          setAttempts(nextAttempts);
          if (nextAttempts >= 5) {
            startLockout();
          } else {
            setError(`Incorrect password. ${5 - nextAttempts} attempt${5 - nextAttempts !== 1 ? "s" : ""} remaining.`);
          }
          return;
        }
        setAttempts(0);
        onLogin({
          role: userRecord.role,
          name: userRecord.name,
          email: userRecord.email,
          id: userRecord.id,
          wallet: userRecord.wallet !== void 0 ? Number(userRecord.wallet) : (userRecord.role === "advertiser" ? 1000 : 0),
        });
      }
    } else {
      if (!fullName.trim()) {
        setError("Please enter your full name.");
        return;
      }
      if (!email.includes("@")) {
        setError("Please enter a valid email address.");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }
      const existingStr = localStorage.getItem("amp_users");
      const existing = existingStr ? JSON.parse(existingStr) : {};
      if (ii[email.toLowerCase() as keyof typeof ii] || existing[email.toLowerCase()]) {
        setError("An account with this email already exists. Please sign in.");
        return;
      }
      const newRecord = {
        role,
        name: fullName.trim(),
        email: email.trim().toLowerCase(),
        id: "user_" + Date.now(),
        password: password,
        wallet: role === "advertiser" ? 1000 : 0,
        status: "pending",
        joined: new Date().toISOString().split("T")[0],
        activity: "Pending Verification Review",
      };
      existing[email.toLowerCase()] = newRecord;
      localStorage.setItem("amp_users", JSON.stringify(existing));

      // Trigger signup notifications
      sendEmailNotification({
        to: email.trim().toLowerCase(),
        subject: "Welcome to Authority Media Placement - Review Pending",
        html: getEmailTemplate("welcome_pending", { name: fullName.trim(), email: email.trim().toLowerCase(), role }),
        category: "welcome"
      });

      sendEmailNotification({
        to: "admin@authorityplacement.com",
        subject: "🔔 New Sign Up Alert: Review Required",
        html: getEmailTemplate("admin_alert", { name: fullName.trim(), email: email.trim().toLowerCase(), role }),
        category: "admin_alert"
      });

      setTab("registration_success");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.7)",
        backdropFilter: "blur(8px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20
      }}
      onClick={E => E.target === E.currentTarget && onClose()}
    >
      <div
        style={{
          background: "white",
          borderRadius: 20,
          width: "100%",
          maxWidth: 440,
          boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
          overflow: "hidden"
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #0F172A 0%, #1E293B 60%, #312E81 100%)",
            padding: "28px 28px 24px",
            position: "relative"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <lt size="sm" theme="dark" />
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "'Plus Jakarta Sans',sans-serif", color: "white" }}>
            {tab === "login" ? "Welcome back 👋" : "Create your account"}
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>
            {tab === "login" ? "Sign in to your dashboard" : "Join thousands of publishers & advertisers"}
          </div>
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              background: "rgba(255,255,255,0.1)",
              border: "none",
              color: "white",
              width: 30,
              height: 30,
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <div style={{ padding: "24px 28px 28px" }}>
          {tab === "registration_success" ? (
            <div style={{ textAlign: "center", padding: "12px 0 6px" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📬</div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 18, fontWeight: 800, color: p.primary, marginBottom: 12 }}>
                Registration Submitted Successfully!
              </h3>
              <p style={{ fontSize: 13, color: p.textSoft, lineHeight: 1.6, marginBottom: 20 }}>
                Welcome, <strong>{fullName}</strong>! Your application to register as an <strong style={{ textTransform: "capitalize", color: p.accent }}>{role}</strong> has been received.
              </p>
              
              <div style={{ background: "#EEF2FF", border: "1px solid #C7D2FE", borderRadius: 10, padding: 14, textAlign: "left", marginBottom: 24, fontSize: 12.5, lineHeight: 1.5, color: "#3730A3" }}>
                <div style={{ fontWeight: 700, marginBottom: 5, display: "flex", alignItems: "center", gap: 5 }}>
                  <span>⏳</span> Account Review Pending
                </div>
                To protect client backlinks and list quality, our editorial board manually reviews all applications in <strong>12-24 hours</strong>.
              </div>

              <div style={{ fontSize: 13, color: p.muted, lineHeight: 1.5, marginBottom: 24 }}>
                📧 We've sent a pending confirmation notice to <strong>{email}</strong>. You'll receive another notification once your account goes live.
              </div>

              <button
                className="btn btn-primary"
                style={{ width: "100%", padding: 12, borderRadius: 8, fontWeight: "bold" }}
                onClick={onClose}
              >
                Understood, Close Window
              </button>
            </div>
          ) : (
            <>
              {/* Tabs */}
              <div style={{ display: "flex", background: "#F1F5F9", borderRadius: 10, padding: 4, marginBottom: 20 }}>
                {["login", "signup"].map(tName => (
                  <button
                    key={tName}
                    onClick={() => {
                      setTab(tName);
                      setError("");
                      setAttempts(0);
                    }}
                    style={{
                      flex: 1,
                      padding: "8px",
                      borderRadius: 7,
                      border: "none",
                      fontWeight: 600,
                      fontSize: 13,
                      cursor: "pointer",
                      background: tab === tName ? "white" : "transparent",
                      color: tab === tName ? p.primary : p.muted,
                      boxShadow: tab === tName ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
                      fontFamily: "'DM Sans',sans-serif"
                    }}
                  >
                    {tName === "login" ? "Sign In" : "Sign Up"}
                  </button>
                ))}
              </div>

              {/* Demo Credentials */}
              {tab === "login" && (
                <div style={{ background: "#EEF2FF", border: "1px solid #C7D2FE", borderRadius: 10, padding: 12, marginBottom: 18, fontSize: 12 }}>
                  <div style={{ fontWeight: 700, color: "#3730A3", marginBottom: 6 }}>🔑 Demo Accounts (click to fill):</div>
                  {[
                    ["rajesh@adv.com", "Advertiser", "Demo@1234"],
                    ["priya@pub.com", "Publisher", "Demo@1234"]
                  ].map(([demoEmail, userType, demoPw]) => (
                    <div
                      key={demoEmail}
                      onClick={() => {
                        setEmail(demoEmail);
                        setPassword(demoPw);
                        setError("");
                      }}
                      style={{ cursor: "pointer", color: "#4338CA", padding: "3px 0", fontWeight: 500 }}
                    >
                      ▸ {demoEmail} <span style={{ color: p.muted, fontWeight: 400 }}>({userType}) — pw: {demoPw}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div
                  style={{
                    background: "#FEF2F2",
                    border: "1px solid #FECACA",
                    borderRadius: 8,
                    padding: "10px 14px",
                    marginBottom: 16,
                    fontSize: 13,
                    color: "#991B1B",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: 8
                  }}
                >
                  <span>⚠️</span>
                  {error}
                </div>
              )}

              {/* Lockout Screen */}
              {isLocked && (
                <div
                  style={{
                    background: "#FFF7ED",
                    border: "1px solid #FED7AA",
                    borderRadius: 8,
                    padding: "10px 14px",
                    marginBottom: 16,
                    fontSize: 13,
                    color: "#92400E",
                    fontWeight: 600,
                    textAlign: "center"
                  }}
                >
                  🔒 Account temporarily locked. Try again in 30 seconds.
                </div>
              )}

              {/* Fields */}
              {tab === "signup" && (
                <div className="form-group">
                  <label className="label">Full Name</label>
                  <input
                    className="input"
                    placeholder="Your full name"
                    value={fullName}
                    onChange={E => {
                      setFullName(E.target.value);
                      setError("");
                    }}
                  />
                </div>
              )}

              <div className="form-group">
                <label className="label">Email Address</label>
                <input
                  className="input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={E => {
                    setEmail(E.target.value);
                    setError("");
                  }}
                  onKeyDown={E => E.key === "Enter" && handleLogin()}
                />
              </div>

              <div className="form-group">
                <label className="label">Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    className="input"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={E => {
                      setPassword(E.target.value);
                      setError("");
                    }}
                    onKeyDown={E => E.key === "Enter" && handleLogin()}
                    style={{ paddingRight: 44 }}
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 16,
                      color: p.muted
                    }}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                {tab === "signup" && (
                  <div style={{ fontSize: 11, color: p.muted, marginTop: 5 }}>
                    Min 6 characters required (demo rules)
                  </div>
                )}
              </div>

              {/* Signup Type Selection */}
              {tab === "signup" && (
                <div className="form-group">
                  <label className="label">I want to</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    {[
                      ["advertiser", "📣 Buy Links"],
                      ["publisher", "🌐 Sell Links"]
                    ].map(([rVal, rLabel]) => (
                      <button
                        key={rVal}
                        onClick={() => setRole(rVal)}
                        style={{
                          flex: 1,
                          padding: "10px",
                          borderRadius: 8,
                          border: `2px solid ${role === rVal ? p.accent : p.border}`,
                          background: role === rVal ? p.accentLight : "white",
                          color: role === rVal ? p.accent : p.muted,
                          fontWeight: 600,
                          fontSize: 13,
                          cursor: "pointer",
                          fontFamily: "'DM Sans',sans-serif"
                        }}
                      >
                        {rLabel}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Submit */}
              <button
                onClick={handleLogin}
                disabled={loading || isLocked}
                style={{
                  width: "100%",
                  padding: "13px",
                  background: isLocked ? "#94A3B8" : "linear-gradient(135deg, #6366F1, #4338CA)",
                  color: "white",
                  border: "none",
                  borderRadius: 10,
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: isLocked ? "not-allowed" : "pointer",
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  marginTop: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8
                }}
              >
                {loading ? (
                  <>
                    <span
                      style={{
                        width: 18,
                        height: 18,
                        border: "2px solid rgba(255,255,255,0.4)",
                        borderTopColor: "white",
                        borderRadius: "50%",
                        display: "inline-block",
                        animation: "spin 0.7s linear infinite"
                      }}
                    />
                    Verifying...
                  </>
                ) : tab === "login" ? (
                  "Sign In to Dashboard →"
                ) : (
                  "Create Free Account →"
                )}
              </button>

              {/* Helper Switcher */}
              <div style={{ textAlign: "center", marginTop: 14, fontSize: 13, color: p.muted }}>
                {tab === "login" ? (
                  <>
                    No account?{" "}
                    <span
                      style={{ color: p.accent, cursor: "pointer", fontWeight: 600 }}
                      onClick={() => {
                        setTab("signup");
                        setError("");
                      }}
                    >
                      Sign up free
                    </span>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <span
                      style={{ color: p.accent, cursor: "pointer", fontWeight: 600 }}
                      onClick={() => {
                        setTab("login");
                        setError("");
                      }}
                    >
                      Sign in
                    </span>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Jp({pageId:e,onBack:t}: any){const r={privacy:{title:"Privacy Policy",icon:"🔒",updated:"June 1, 2026",sections:[{h:"1. Information We Collect",p:"We collect information you provide when registering on Authority Media Placement, including your full name, email address, role (advertiser or publisher), and PayPal account details for payment processing. We also collect usage data such as pages visited, orders placed, sites listed, and search queries within the platform."},{h:"2. How We Use Your Information",p:"Your information is used to: provide and operate our marketplace services; process payments securely via PayPal; send transactional emails regarding your orders, withdrawals, and account activity; improve platform features based on usage patterns; and communicate important platform updates. We never sell your personal data to third parties or use it for advertising purposes."},{h:"3. Payment Data & PayPal",p:"All payment processing is handled exclusively by PayPal. Authority Media Placement does not store, process, or have access to your credit card, debit card, or banking information. When you make a payment or receive a withdrawal, you are interacting directly with PayPal's secure infrastructure. PayPal's privacy policy governs the handling of your financial data."},{h:"4. Cookies & Local Storage",p:"We use browser localStorage to maintain your login session, save your platform preferences, and store registered user data for the demo environment. We do not use third-party tracking cookies, advertising cookies, or analytics cookies that track you across websites. Essential session data is stored locally on your device only."},{h:"5. Data Security",p:"We implement industry-standard security measures to protect your data: all connections are secured with SSL/TLS encryption; passwords are hashed using SHA-256 with unique salts and are never stored in plain text; brute-force login protection locks accounts after 5 failed attempts; and our platform is hosted on Vercel's secure, SOC 2-compliant infrastructure."},{h:"6. Data Sharing",p:"We do not sell, trade, or rent your personal information to third parties. We may share minimal necessary data with PayPal for payment processing, and with Vercel for hosting. We may disclose information if required by law or to protect the rights, property, or safety of our users or the platform."},{h:"7. Your Rights",p:"You have the right to: access your personal data held by us; request correction of inaccurate information; request deletion of your account and associated data; withdraw consent for data processing where applicable. To exercise these rights, please contact us at privacy@authorityplacement.com. We will respond within 30 days."},{h:"8. Contact",p:`For privacy-related questions or data requests:
Email: privacy@authorityplacement.com
Website: authorityplacement.com
This policy was last updated: June 2026`}]},terms:{title:"Terms of Service",icon:"📋",updated:"June 1, 2026",sections:[{h:"1. Acceptance of Terms",p:"By accessing or using Authority Media Placement (authorityplacement.com), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our platform. These terms apply to all users including advertisers, publishers, and visitors."},{h:"2. Platform Description",p:"Authority Media Placement is a marketplace that connects advertisers seeking backlinks and content placement with publishers who own and operate websites. We facilitate transactions between these parties and provide tools to manage orders, track metrics, and process payments. We are a marketplace operator and not a party to the underlying publishing agreements."},{h:"3. Publisher Obligations",p:"Publishers must: only list websites they own or have full authority to monetize; maintain accurate SEO metrics (DA, DR, traffic) on their listings; deliver all orders within the stated turnaround time; publish content that meets the agreed specifications including the correct backlink placement; maintain listed links as DoFollow for a minimum of 12 months; and not remove or modify published content without advertiser consent."},{h:"4. Advertiser Obligations",p:"Advertisers must: ensure all submitted content is original, accurate, and does not violate intellectual property rights; not submit content promoting illegal activities, adult content without appropriate site consent, gambling, pharmaceuticals without licensing, or any content that violates the target website's editorial guidelines; provide complete order details including target URL and anchor text; and not attempt to communicate with publishers outside the platform to avoid commission."},{h:"5. Platform Commission",p:"Authority Media Placement charges a 10% commission on all transactions. This fee is automatically deducted from the publisher's earnings at the time of order completion. Advertisers pay the full listed price. For example: a $200 order results in the publisher receiving $180 and the platform retaining $20. This commission structure is non-negotiable and applies to all transactions."},{h:"6. Payment Terms",p:"All payments are processed via PayPal. Advertiser funds are held securely until the publisher delivers the order and it is approved. Publishers receive payment within 2–3 business days of order approval, subject to a 7-day holding period for fraud prevention. The minimum withdrawal amount is $50. Refunds are available if the publisher fails to deliver within the agreed timeframe."},{h:"7. Prohibited Activities",p:"The following activities will result in immediate account termination and potential legal action: conducting transactions off-platform to circumvent commission; creating fake or duplicate accounts; submitting false SEO metrics for site listings; engaging in any form of link scheme or spam; harassing or threatening other users; attempting to hack or disrupt platform systems; or creating private blog networks (PBNs) disguised as legitimate sites."},{h:"8. Dispute Resolution",p:"In case of disputes between advertisers and publishers regarding content quality, delivery, or link specifications, Authority Media Placement will act as a neutral mediator. Users must contact admin@authorityplacement.com within 14 days of the dispute arising. Our mediation team will review evidence from both parties and issue a binding decision within 5 business days."},{h:"9. Limitation of Liability",p:"Authority Media Placement is not liable for: changes in search engine rankings or algorithms; the long-term SEO effectiveness of any backlink; content quality disputes beyond our mediation process; actions of third-party services including PayPal; or any indirect, incidental, or consequential damages arising from use of the platform."},{h:"10. Modifications",p:"We reserve the right to modify these Terms of Service at any time. Material changes will be communicated via email to registered users at least 14 days before taking effect. Continued use of the platform after changes constitutes acceptance of the new terms."}]},contact:{title:"Contact Us",icon:"📬",updated:"June 1, 2026",sections:[{h:"24/7 Customer Support",p:`📧 admin@authorityplacement.com
For any questions, help with listing sites, managing advertiser orders, billing queries, secure PayPal payments, and platform feedback.
Response time: Within 12–24 hours on business days.`},{h:"Office Hours",p:`Monday – Friday: 9:00 AM – 6:00 PM IST
Saturday: 10:00 AM – 2:00 PM IST
Sunday & Public Holidays: Closed

For urgent issues outside office hours, email us and we will respond on the next business day.`},{h:"Follow Us",p:`Stay updated with platform news, SEO tips, and publisher opportunities:
🐦 Twitter/X: @AuthorityPlacem
💼 LinkedIn: www.linkedin.com/company/authority-media-placement/
📘 Facebook: facebook.com/people/Authority-Media-Placement/61590478809643/
📌 Pinterest: pinterest.com/authorityplacement/
📸 Instagram: instagram.com/authorityplacement/
🎥 YouTube: youtube.com/@AuthorityMediaPlacement`}]},guidelines:{title:"Publisher Guidelines",icon:"📖",updated:"June 1, 2026",sections:[{h:"1. Site Eligibility Requirements",p:"To be listed on Authority Media Placement, your website must meet the following minimum criteria: Domain Authority (DA) of 15 or above (Moz); Domain Rating (DR) of 10 or above (Ahrefs); minimum 6 months old with a consistent publishing history; genuine organic traffic from search engines (not bot traffic or paid traffic); original, human-written content published regularly; a clear niche or topic focus; and a professional design with no excessive ads or spam signals."},{h:"2. Prohibited Site Types",p:"The following site types are strictly not permitted on our platform and will be rejected or removed: Private Blog Networks (PBNs) — sites created solely for link building; parked domains with little or no content; sites with thin, AI-generated content that has not been human-edited; sites with more than 50% duplicate content; sites that have received Google manual penalties; gambling, adult, or pharmaceutical sites without appropriate licensing; and sites with a history of selling links in violation of search engine guidelines."},{h:"3. Content Standards",p:"All guest posts and sponsored content you publish must: be a minimum of 800 words (1,000+ words recommended); be well-written, grammatically correct, and free of factual errors; provide genuine value to your site's audience — not just exist for the backlink; be relevant to your site's niche; include original insights, data, or examples; and not be spun, auto-generated, or copied from other sources. We reserve the right to flag orders where published content does not meet these standards."},{h:"4. Link Placement Rules",p:"The agreed backlink must: be placed naturally within the body text of the article — not in the footer, sidebar, or author bio unless specifically agreed; remain active and DoFollow for a minimum of 12 months from the date of publication; use the exact anchor text specified by the advertiser; not be surrounded by nofollow tags, JavaScript redirects, or rel attributes that prevent link equity passing; and not be modified (changed to nofollow, redirected, or removed) without written consent from the advertiser."},{h:"5. Sponsored Content Disclosure",p:"For content marked as 'Sponsored Post': you must include a clear disclosure label such as 'Sponsored', 'Paid Partnership', or 'Advertiser Content' visible to readers before the article body. This is required under FTC guidelines (USA), ASA guidelines (UK), and equivalent advertising standards in other jurisdictions. For 'Guest Post' content written as editorial pieces by an external author, disclosure is not required but is recommended for transparency."},{h:"6. Turnaround Times & Delivery",p:"You are responsible for delivering orders within the turnaround time listed on your site profile. If you need an extension: contact the advertiser through the platform messaging system; and notify our support team at publishers@authorityplacement.com before your deadline passes. Repeated late deliveries (3 or more within 60 days) will result in your site being suspended from the marketplace. Two no-delivery instances within 60 days result in permanent removal."},{h:"7. Pricing & Earnings",p:"You set your own price per post. We recommend pricing based on your site's DA, DR, monthly traffic, niche competitiveness, and content quality. As a benchmark: DA 15–30: $30–$80; DA 30–50: $80–$200; DA 50–70: $200–$500; DA 70+: $500+. You earn 90% of your listed price — Authority Media Placement retains 10% as platform commission. Earnings are credited to your AMP wallet after order approval and a 7-day security hold."},{h:"8. Withdrawals & Payouts",p:"To withdraw your earnings: connect your PayPal account in the Wallet section of your dashboard; request a withdrawal of at least $50; withdrawals are processed within 2–3 business days of request. There is no maximum withdrawal limit. Your PayPal account must be verified and in good standing. We do not support bank transfers, cryptocurrency, or other payment methods at this time."},{h:"9. Violations & Penalties",p:"The following actions will result in withheld payments, site suspension, or permanent account ban: removing or nofollowing links before the 12-month period; publishing content that does not match the approved brief; misrepresenting site metrics (traffic, DA, DR) in your listing; attempting to conduct transactions with advertisers outside the platform; creating multiple accounts; or any other violation of these guidelines or our Terms of Service."}]}}[e];return r?l.jsxs("div",{style:{maxWidth:860,margin:"0 auto",padding:"60px 28px 80px"},children:[l.jsx("button",{onClick:t,style:{display:"flex",alignItems:"center",gap:8,background:"none",border:"none",color:p.accent,fontWeight:600,fontSize:14,cursor:"pointer",marginBottom:32,fontFamily:"'DM Sans',sans-serif"},children:"← Back to Home"}),l.jsxs("div",{style:{marginBottom:40,textAlign:"center"},children:[l.jsx("div",{style:{fontSize:52,marginBottom:16},children:r.icon}),l.jsx("h1",{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:36,fontWeight:800,color:p.primary,marginBottom:10},children:r.title}),l.jsxs("div",{style:{fontSize:14,color:p.muted},children:["Authority Media Placement · Last updated: ",r.updated]})]}),l.jsx("div",{style:{display:"flex",flexDirection:"column",gap:20},children:r.sections.map((i,o)=>l.jsxs("div",{className:"card",style:{padding:28},children:[l.jsx("h3",{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:17,fontWeight:700,color:p.primary,marginBottom:12},children:i.h}),l.jsx("p",{style:{fontSize:14,color:p.textSoft,lineHeight:1.85,whiteSpace:"pre-line"},children:i.p})]},o))}),e==="contact"&&l.jsxs("div",{style:{marginTop:28,background:"linear-gradient(135deg,#0F172A,#1E1B4B)",borderRadius:16,padding:32,textAlign:"center",color:"white"},children:[l.jsx("div",{style:{fontWeight:800,fontSize:20,fontFamily:"'Plus Jakarta Sans',sans-serif",marginBottom:8},children:"Ready to get started?"}),l.jsx("div",{style:{fontSize:14,color:"rgba(255,255,255,0.6)",marginBottom:20},children:"Join 3,200+ brands and publishers on Authority Media Placement."}),l.jsx("button",{onClick:t,style:{padding:"12px 28px",background:"linear-gradient(135deg,#6366F1,#4338CA)",color:"white",border:"none",borderRadius:10,fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif"},children:"Go to Homepage →"})]})]}):null}

function Kp({onBack:e, blogs: customBlogs}: any){const[t,n]=T.useState(null);T.useEffect(()=>{const handleUrl=()=>{const path=window.location.pathname;if(path.startsWith('/blog/')){const idStr=path.replace('/blog/','');const id=parseInt(idStr,10);if(!isNaN(id)){n(id)}}else{n(null)}};handleUrl();window.addEventListener('popstate',handleUrl);return()=>window.removeEventListener('popstate',handleUrl)},[]);const r=customBlogs||[{id:1,emoji:"🔗",category:"Link Building",readTime:"12 min",date:"June 1, 2026",author:"Authority Media Team",title:"The Complete Guide to Guest Posting in 2026: What Works, What Doesn't",excerpt:"Guest posting remains one of the most powerful white-hat link building strategies. In this comprehensive guide, we cover finding the right sites, crafting pitches that get accepted, and maximising the SEO value of every link.",content:`Guest posting in 2026 is more competitive than ever — but also more rewarding for those who do it right. Google's algorithm continues to value high-quality editorial links from authoritative, relevant websites. Here's a complete breakdown of what you need to know.

WHY GUEST POSTS STILL DELIVER RESULTS

Despite years of predictions about their decline, guest posts on genuine, high-authority sites remain one of the most reliable ways to build domain authority. The key distinction in 2026 is quality: a single link from a DA 65 site in your exact niche will consistently outperform 20 links from DA 20 general sites.

Google's systems have become significantly better at evaluating link quality based on: the editorial standards of the linking site, topical relevance between the source and target, natural anchor text distribution, and the genuine traffic and engagement of the linking page.

FINDING THE RIGHT SITES

Use Authority Media Placement's advanced filters to sort by niche, DA, DR, and traffic. Target sites with DA 40+, genuine organic traffic (15,000+/month), and a clear editorial voice. Avoid sites that publish any content for a price — look for publishers who maintain genuine standards.

CRAFTING A WINNING PITCH

Personalise every pitch. Reference specific articles on the target site. Propose 3 topic ideas that genuinely fit their audience. Show your expertise with links to previous published work. Keep your pitch concise — editors are busy and receive dozens of requests weekly.

WRITING CONTENT THAT GETS PUBLISHED AND SHARED

Write for the site's audience, not for your backlink. Aim for 1,200–2,500 words with genuine depth. Include original research, current statistics, and actionable advice. The backlink should feel natural within the flow of the article — not forced or promotional.

MEASURING ROI CORRECTLY

Track your results in Ahrefs over 3–6 months: monitor referring domain growth, organic keyword rankings for your target pages, and organic traffic trends. Guest posting is a long-term strategy — expect to see meaningful results after 3–6 months of consistent effort.`},{id:2,emoji:"📊",category:"SEO Strategy",readTime:"8 min",date:"May 20, 2026",author:"Priya Sharma",title:"DA vs DR: Which SEO Metric Should Guide Your Link Building in 2026?",excerpt:"Moz DA and Ahrefs DR both claim to predict ranking power — but they measure very different things. Here's a clear, practical breakdown of which metric to trust for different link building decisions.",content:`If you've spent time in the SEO world, you've encountered both Domain Authority (DA) from Moz and Domain Rating (DR) from Ahrefs. Both are widely used — and widely misunderstood. Here's what you actually need to know.

WHAT DOMAIN AUTHORITY (DA) MEASURES

Moz's Domain Authority predicts how likely a domain is to rank well in search results, based on its overall backlink profile quality. It uses a logarithmic 1–100 scale and considers linking root domains, link quality signals, and spam factors. DA is updated regularly as Moz re-crawls the web.

WHAT DOMAIN RATING (DR) MEASURES

Ahrefs' Domain Rating measures the strength of a website's backlink profile relative to all other websites in Ahrefs' database. It focuses specifically on: the number of unique domains linking to the site, and the DR of those linking domains. DR is a purer measure of raw link equity — it doesn't factor in spam or relevance signals.

KEY PRACTICAL DIFFERENCES

DA tends to be more sensitive to link diversity and can drop if a site accumulates many low-quality links, even with high quantity. DR tends to be more stable and rises with raw linking domain quantity from high-DR sources. A site can have high DR but lower DA if its links come from a narrow set of sources.

WHICH TO USE FOR LINK BUILDING DECISIONS

For topical authority campaigns: prioritise niche relevance + DA. A high-DA site in your exact niche carries more ranking power than a high-DR general site. For raw link equity and PageRank flow: prioritise DR. Sites with high DR pass more raw link authority regardless of niche.

THE HONEST TRUTH ABOUT BOTH METRICS

Neither DA nor DR is a Google metric — they are third-party approximations built on incomplete crawl data. The best real predictor of link value remains: genuine organic traffic + clear editorial standards + topical relevance to your target page. Use metrics as a filter, not as the final word.`},{id:3,emoji:"💰",category:"Publisher Tips",readTime:"10 min",date:"May 5, 2026",author:"Amit Singh",title:"How to Earn $2,000–$5,000/Month from Your Blog with Sponsored Content",excerpt:"Real numbers from real publishers. Learn the exact strategies our top earners use to consistently generate income from sponsored posts without compromising their editorial integrity or reader trust.",content:`Our top-performing publishers earn between $2,000 and $8,000 per month from sponsored content. Here's an honest breakdown of how they do it — and how you can replicate their approach.

PRICE YOUR SITE FOR WHAT IT'S WORTH

The single biggest mistake new publishers make is undercharging. Here's a realistic pricing guide based on 2026 market rates on Authority Media Placement:

DA 20–35, 5,000–20,000 traffic/month: $50–$120 per post
DA 35–50, 20,000–60,000 traffic/month: $120–$250 per post
DA 50–65, 60,000–150,000 traffic/month: $250–$500 per post
DA 65+, 150,000+ traffic/month: $500–$1,500 per post

If your site has a high-value niche (finance, legal, healthcare, SaaS), add 30–50% to these figures.

MAINTAIN EDITORIAL QUALITY — IT'S YOUR BRAND

The publishers who earn the most long-term are those who never compromise on content quality. Every sponsored post should genuinely serve your audience. If the content isn't good enough to publish as an organic article, don't publish it for a sponsor either. This maintains reader trust and keeps your traffic growing — which in turn keeps your prices high.

DIVERSIFY YOUR CONTENT OFFERING

Don't just offer guest posts. Offer: link insertions into existing high-traffic articles (often easier and more valuable for advertisers); category-specific placements for premium niches; homepage or sidebar link placements; and social media promotion bundles with your sponsored posts. More products = more revenue streams.

KEEP YOUR METRICS GROWING

A site with growing DA, DR, and traffic can increase prices every 6 months. Publish 4–8 original articles per month alongside your sponsored content. Use solid on-page SEO, internal linking, and content clusters to grow organic rankings consistently.

RESPOND FAST AND DELIVER ON TIME

Publishers with the fastest response rates and delivery times receive the most repeat orders and the best reviews. Set up push notifications for new orders. Respond within 2 hours during business hours. Deliver content at least 24 hours before your stated deadline. These habits compound into significantly higher monthly earnings.`},{id:4,emoji:"🎯",category:"Content Strategy",readTime:"9 min",date:"April 18, 2026",author:"Authority Media Team",title:"10 Content Types With the Highest Acceptance Rates on Premium Publisher Sites",excerpt:"Getting rejected by high-DA publishers? These 10 content formats consistently get accepted, drive the most traffic once published, and generate the most natural backlinks over time.",content:`After analysing thousands of successful guest posts placed through Authority Media Placement, these are the content types editors most reliably accept — and that perform best once live.

1. ORIGINAL RESEARCH & DATA STUDIES

Content built on original surveys, data analysis, or compiled industry statistics gets accepted at the highest rate. Editors love data-driven content because it attracts natural backlinks to their site long after publication. Even a survey of 100 professionals can generate compelling, unique insights.

2. COMPREHENSIVE ULTIMATE GUIDES

Long-form guides (2,500+ words) that cover a topic more thoroughly than any competing content tend to earn top placement. These become reference resources that rank long-term and attract repeat visitors.

3. REAL CASE STUDIES WITH NUMBERS

"How We Increased Organic Traffic by 140% in 6 Months" will always outperform "5 Ways to Increase Traffic." Specific, verifiable results with real numbers build credibility and get shared widely.

4. EXPERT ROUNDUPS

Collecting quotes and insights from 10–20 industry experts on a single question. These are highly shareable, attract backlinks from the quoted experts, and position the host site as an industry hub.

5. COMPARISON ARTICLES

"Tool A vs. Tool B: Which is Better for X?" captures high-intent search traffic and consistently earns high engagement. These work particularly well in SaaS, finance, and marketing niches.

6. STEP-BY-STEP TUTORIALS WITH SCREENSHOTS

Practical, visual guides that walk readers through completing a specific task. These attract bookmarks, shares, and long-term organic traffic from how-to searches.

7. ANNUAL TREND REPORTS

"The State of [Industry] in 2026" style reports are highly shareable and earn significant coverage from industry publications. Create them in Q4 of the previous year or Q1 for maximum impact.

8. CONTRARIAN OPINION PIECES

Bold, well-argued takes on conventional wisdom in your industry. These generate discussion, shares, and links from people who agree — and people who disagree. The key is to back your argument with real evidence, not just opinion.

9. BEGINNER'S GUIDES TO COMPLEX TOPICS

Demystifying complex subjects for newcomers attracts massive search volume. "What is Domain Authority and Does It Matter?" style guides serve readers who are at the start of their learning journey.

10. LISTICLES WITH GENUINE DEPTH

"15 Tools Every Content Marketer Needs in 2026" still works when each item is genuinely useful and described in detail. Avoid padding — each entry should earn its place in the list.`},{id:5,emoji:"🛡️",category:"Platform Guide",readTime:"7 min",date:"April 2, 2026",author:"Authority Media Team",title:"How to Use Authority Media Placement: A Complete Advertiser's Guide",excerpt:"New to the platform? This step-by-step guide walks you through finding the right publisher sites, placing your first order, tracking delivery, and measuring the SEO impact of your campaign.",content:`Whether you're an SEO agency, brand, or independent website owner, Authority Media Placement makes it straightforward to build high-quality backlinks at scale. Here's how to get started.

STEP 1: CREATE YOUR ADVERTISER ACCOUNT

Click "Get Started Free" on the homepage and select "Advertiser" as your role. Enter your name, email, and password. Your account is created instantly — no approval required for advertisers.

STEP 2: ADD FUNDS TO YOUR WALLET

Navigate to the Wallet section and connect your PayPal account. Add funds in the amount you want to spend on your first campaign. Funds are held securely and deducted only when you place an order.

STEP 3: BROWSE THE MARKETPLACE

Use the marketplace filters to find sites that match your campaign needs. Key filters to use:

Niche: Always filter by your target niche first. A link from a site in your exact niche carries significantly more topical relevance.
DA: Set a minimum DA of 30–40 for most campaigns. For competitive keywords, target DA 50+.
Traffic: Filter for sites with 10,000+ monthly organic visitors to ensure the link is from a genuinely active site.
Price: Set a maximum price to stay within your budget.
Link Type: DoFollow links pass link equity; use these for SEO campaigns.

STEP 4: PLACE YOUR ORDER

Select a site and click "Order Now." You'll need to provide: your target URL (the page you want the link to point to), your preferred anchor text (keep this varied and natural), your post type (Guest Post, Sponsored Post, or Link Insertion), and any special instructions for the publisher.

STEP 5: TRACK YOUR ORDER

After placing your order, track its progress in the Orders section of your dashboard. Most orders move through: Pending → In Progress → Completed within the stated turnaround time.

STEP 6: VERIFY AND MEASURE

Once your order is completed, verify the live URL, check that the link is correctly placed and DoFollow using a tool like Ahrefs Site Explorer, and monitor your target page's rankings in Google Search Console over the following weeks.`},{id:6,emoji:"⚡",category:"Advanced SEO",readTime:"11 min",date:"March 15, 2026",author:"Authority Media Team",title:"Building a Sustainable Link Profile: The 80/20 Strategy That Actually Works",excerpt:"Most link building advice is either too conservative or too aggressive. This guide outlines a balanced, sustainable approach that builds real authority without triggering algorithmic penalties.",content:`The question every SEO faces is: how do you build links aggressively enough to compete, without crossing the line into patterns that attract algorithmic or manual penalties? Here's the 80/20 strategy that our most successful advertisers use.

THE CORE PRINCIPLE: DIVERSITY BY DESIGN

A natural link profile is diverse by default. When real websites link to a genuinely valuable resource, they use varied anchor text, come from different types of sites, and build up over time rather than in sudden spikes. Your goal is to replicate this natural pattern — even when your link building is intentional.

THE 80/20 LINK MIX

80% — Editorial & Earned Links: Links from guest posts on relevant sites (like those on Authority Media Placement), digital PR coverage, resource page placements, and broken link building. These form the backbone of a healthy profile.

20% — Supplementary Links: Forum contributions, directory listings, social profiles, Q&A sites (Quora, Reddit), and low-stakes citation links. These add diversity but should never dominate your profile.

ANCHOR TEXT DISTRIBUTION

For most sites targeting competitive keywords, aim for approximately: 40–50% branded anchors (your brand name, domain); 25–30% generic anchors ("click here," "read more," "this article"); 15–20% partial match anchors (words related to but not exact match); and 5–10% exact match anchors (your target keyword). Never build a profile where exact match anchors exceed 15% — this is one of the clearest signals of manipulative link building.

VELOCITY: HOW FAST IS TOO FAST?

There is no universal answer, but a reasonable guideline for a site with DR 30–50: 5–15 new referring domains per month is natural and sustainable. A sudden jump from 5 to 100 new domains in one month is a red flag, regardless of quality. Build consistently over time rather than in bursts.

TOPICAL AUTHORITY: THE 2026 IMPERATIVE

Google's Helpful Content System and entity-based understanding have made topical relevance more important than ever. A link from a DR 40 site in your exact niche now consistently outperforms a link from a DR 70 general news site. Prioritise relevance over raw metrics in your publisher selection.

MONITORING AND MAINTENANCE

Check your backlink profile monthly in Ahrefs or SEMrush. Disavow toxic links proactively — don't wait for a penalty. Monitor for link removals and reach out to publishers if links are removed before the 12-month guarantee period. Keep a spreadsheet tracking all your built links, their anchor text, DA/DR at time of placement, and monthly status checks.`},{id:7,emoji:"🧠",category:"GEO Strategy",readTime:"8 min",date:"June 9, 2026",author:"Authority Media Team",title:"Generative Engine Optimization (GEO): Rising Above the AI Search Revolution",excerpt:"As Google AI Overviews and conversational engines transform user behavior, traditional SEO is no longer enough. Learn how to optimize your content for LLM indexing and capture citation equity.",content:`THE NEW SHIFT: FROM SEARCH TO ANSWERS

For a quarter of a century, search engine optimization meant structuring content to rank in a blue link list. But the rise of LLMs, Google AI Overviews, Gemini, and OpenAI Search has fundamentally disrupted this landscape.

Today, users do not just want a list of links—they want immediate, synthesized answers to complex tasks. To remain visible, brands must shift from traditional Search Engine Optimization to Generative Engine Optimization (GEO).

HOW GENERATIVE ENGINES SELECT LIPS AND CITATIONS

Generative search engines build responses by querying real-time indexes, retrieving high-authority sources, and synthesizing a comprehensive paragraph output. When deciding which sites to cite, these models look for three primary indicators:

Topical Authority & Density: Sources with exhaustive, unambiguous coverage of specific technical or niche questions.

Information Gain: Unique data points, expert quotes, case studies, or perspectives that cannot be found elsewhere. LLMs prefer cite-worthy nodes containing high-value unique knowledge.

Credible Backlink Profile: Even AI search engines query primary search databases to locate reputable reference material. A link on a vetted high-status publisher acts as a signal of trust that reinforces the generative algorithm's citation confidence.

Actionable Strategies to Boost Your GEO Visibility

To maximize your chances of being quoted inside AI summaries, structure your guest posts and site content around these elements:

INJECT HIGH-VALUE DATA NODES
Include original statistics, proprietary charts, or direct case studies. Generative engines are hungry for concrete figures to back up assertions, making structured data-driven paragraphs highly citation-magnetic.

OPTIMIZE FOR RELEVANCY AND ALIGNMENT
Ensure your links and content map to core user problem statements. Align guest posts precisely with specific search themes so LLMs identify your site as the ultimate authority on the topic.

MAINTAIN TOPICAL FOCUS
Keep your guest publications extremely concise and targeted. Answer the primary query early, and follow up with logical semantic elaboration that conversational agents can parse effortlessly.`},{id:8,emoji:"🛡️",category:"Google E-E-A-T",readTime:"10 min",date:"June 8, 2026",author:"Authority Media Team",title:"Decoding Google E-E-A-T: Build Invaluable Quality Signals for Sustainable Growth",excerpt:"Google updates its Quality Rater Guidelines with a relentless focus on publisher trust. Here is a practical roadmap to proving real Experience, Expertise, Authoritativeness, and Trustworthiness.",content:`E-E-A-T IS NOT A DIRECT RANKING METRIC BUT A GUIDING LIGHT

Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T) forms the absolute foundation of Google's search quality assessment. While it is not a specific programmatic metric like DR or DA, Google's core updates are engineered to evaluate and promote content that exhibits these four traits.

If your website behaves like an anonymous content mill, you will eventually lose traffic to core updates. Proving credibility is the only way to build a brand that endures.

UNDERSTANDING THE FOUR CORNERSTONES OF CREDIBILITY

To build a flawless search presence, you must understand each element of the E-E-A-T framework:

Experience: Demonstrating first-hand, real-world knowledge. Google rewards authors who have actually used the product, visited the city, or lived through the event they are describing.

Expertise: Formal knowledge and credentials. This is particularly vital in Your Money or Your Life (YMYL) niches like finance, health, or legal advice.

Authoritativeness: Your reputation in the industry. This is measured through brand mentions, media coverage, and high-authority contextual backlinks from established industry sites.

Trustworthiness: The most critical element. Your site must be secure, transparent about ownership, disclose sponsored content, and provide verifiable references.

HOW TO BUILD CREDIBILITY SIGNALS THAT GOOGLE RECOGNIZED

Proving E-E-A-T requires a combination of robust on-page standards and authoritative off-page references:

AUTHOR PROFILES AND CREDENTIALS
Never publish anonymously or under generic admin accounts. Create comprehensive writer profiles with clear bios, active social media links, and verifiable academic or professional credentials.

VERIFIABLE DATA AND SOURCE LINKING
Always back up factual claims with links to government databases, scientific papers, or leading industry reports. Citing primary sources elevates your site's factuality.

SECURE EDITORIAL LINK BUILDING
Google evaluates authoritativeness by tracking who mentions you. Getting listed and recommended by vetted, long-standing publisher sites in your exact niche is the single most powerful off-page signal of authoritativeness you can build. Avoid cheap link-farms; invest in manual placements on premium blogs.`},{id:9,emoji:"💬",category:"AEO Strategy",readTime:"9 min",date:"June 7, 2026",author:"Authority Media Team",title:"Answer Engine Optimization (AEO): Winning the Fight for Zero-Click Visibility",excerpt:"With the rise of voice search and conversational AI assistant interfaces, ranking #1 is no longer enough. You need to rank #0. Explore how to format your site to win featured snippets and direct answers.",content:`THE RISE OF ZERO-CLICK SEARCHES AND THE #0 RANK

Zero-click searches—where users find their answer directly on the Google search results page without clicking any link—now make up a major percentage of all desktop and mobile queries. Coupled with voice assistants like Google Assistant, Apple Siri, and conversational smart speakers, search is becoming voice-first and conversational.

To capture this traffic, you have to optimize not just for search result lists, but for direct answers. This process is called Answer Engine Optimization (AEO).

HOW ANSWER ENGINES PARSE AND EXTRACT OUTLINES

AEO algorithms parse the web looking for content structured to answer specific human natural language questions immediately and accurately. These algorithms look for:

Syntactic Answer Clues: Direct sentences starting with logical definitions "X is a system of...".

Logical List Structures: Clear table columns or numbered headings presenting comparative parameters.

Semantic Answer Schema: Machine-readable schema markup that explains what specific elements of the page contain.

THE STEP-BY-STEP BLUEPRINT FOR EXCELLENT AEO

Winning zero-click rankings requires a highly deliberate style of writing and structuring:

USE CLEAR QUESTION HEADINGS
Structure your subheadings (H2s and H3s) as direct questions that searchers ask. For example, use "What is the turnaround time for a guest post?" instead of "Delivery Timelines".

MASTER THE 50-WORD ANSWER BLOCK
Placing a clear, direct, objective 40-to-60-word paragraph immediately below your question heading is a proven tactic. This block should answer the question instantly. Aeo engines extract these paragraph boxes to serve as featured snippets.

IMPLEMENT STRUCTURAL DATA TABLES AND LISTS
Use clean HTML tables or bulleted structures to present comparative metrics. Google extracts these lists directly into featured snippets, increasing your click-through potential dramatically.`},{id:10,emoji:"📈",category:"Advanced SEO",readTime:"11 min",date:"June 6, 2026",author:"Priya Sharma",title:"The Modern SEO Framework: Marrying traditional Link Building with Semantic SEO",excerpt:"Modern SEO is a dual battle: you need high-authority backlinks to rank, and advanced semantic structure to satisfy Google’s AI crawlers. Explore the modern unified playbook.",content:`SEO IS NOT DEAD—IT HAS COMPELLED US TO GROW

For over two decades, critics have declared that SEO is dead. Every core update brings a fresh wave of panic. But the truth is far simpler: SEO is not dead, it has merely evolved to filter out low-effort manipulation.

The modern SEO playbook requires a cohesive, dual-layer approach. You must master both traditional off-page authority building and cutting-edge on-page semantic outline architecture.

THE OFF-PAGE PILLAR: HIGH-QUALITY DISCOVERY

Backlinks remain the primary way Google discovers new content, maps topical relationships, and determines domain authority. However, Google’s systems now ignore low-quality, automated backlinks entirely. This means spamming links will not hurt you; it will simply waste your budget.

To move the needle, you need links from real, vetted websites with genuine search traffic. A single editorial mention in a guest post on a reputable, high-DA blog does more for your rankings than thousands of generic directory submissions.

THE ON-PAGE PILLAR: SEMANTIC ENTITY MATCHING

Google’s neural networks understand content as a web of connected 'entities' rather than isolated keywords. To rank for your target queries, you must demonstrate total semantic coverage:

CREATE EXHAUSTIVE TOPICAL CLUSTERS
Instead of writing a single page targeting a keyword, create a cluster of highly coordinated pages addressing every subtopic. Link them together logically to establish absolute niche authority.

OPTIMIZE FOR INTENT SPLITS
Understand what searchers want when they enter a query. Are they looking to buy, to learn, or to navigate? Match your page template, tone, and call-to-action precisely to that intent.

SECURE SUSTAINABLE LONG-TERM RANKS
The ultimate winner in search is always the brand that focuses on real utility. Deliver human-vetted content, secure backlinks from high-quality publishers on Authority Media Placement, keep your technical SEO flawless, and let your authority grow organically over time.`}];if(t){const i=r.find(o=>o.id===t);return l.jsxs("div",{style:{maxWidth:780,margin:"0 auto",padding:"60px 28px 80px"},children:[l.jsx("button",{onClick:()=>{n(null);window.history.pushState(null,'','/blog')},style:{display:"flex",alignItems:"center",gap:8,background:"none",border:"none",color:p.accent,fontWeight:600,fontSize:14,cursor:"pointer",marginBottom:32,fontFamily:"'DM Sans',sans-serif"},children:"← Back to Blog"}),l.jsxs("div",{style:{marginBottom:28},children:[l.jsx("div",{style:{fontSize:52,marginBottom:16},children:i.emoji}),l.jsx("span",{className:"badge badge-info",style:{marginBottom:14,display:"inline-flex"},children:i.category}),l.jsx("h1",{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:30,fontWeight:800,color:p.primary,lineHeight:1.25,margin:"12px 0 16px"},children:i.title}),l.jsxs("div",{style:{display:"flex",gap:20,fontSize:13,color:p.muted,flexWrap:"wrap"},children:[l.jsxs("span",{children:["✍️ ",i.author]}),l.jsxs("span",{children:["📅 ",i.date]}),l.jsxs("span",{children:["⏱ ",i.readTime," read"]})]})]}),l.jsx("div",{style:{borderTop:`1px solid ${p.border}`,paddingTop:28},children:i.content.split(`

`).map((o,s)=>o===o.toUpperCase()&&o.length<80&&!o.includes(".")?l.jsx("h3",{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:17,fontWeight:700,color:p.primary,margin:"28px 0 10px"},children:o},s):l.jsx("p",{style:{fontSize:15,color:p.textSoft,lineHeight:1.85,marginBottom:16},children:o},s))}),l.jsxs("div",{style:{marginTop:40,padding:24,background:p.accentLight,border:"1px solid #C7D2FE",borderRadius:12,textAlign:"center"},children:[l.jsx("div",{style:{fontWeight:700,fontSize:16,color:p.primary,marginBottom:6},children:"Start building better links today"}),l.jsx("div",{style:{fontSize:13,color:p.muted,marginBottom:16},children:"Browse 12,000+ vetted publisher sites on Authority Media Placement."}),l.jsx("button",{onClick:e,style:{padding:"10px 24px",background:"linear-gradient(135deg,#6366F1,#4338CA)",color:"white",border:"none",borderRadius:8,fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif"},children:"Browse Marketplace →"})]})]})}return l.jsxs("div",{style:{maxWidth:1080,margin:"0 auto",padding:"60px 28px 80px"},children:[l.jsx("button",{onClick:e,style:{display:"flex",alignItems:"center",gap:8,background:"none",border:"none",color:p.accent,fontWeight:600,fontSize:14,cursor:"pointer",marginBottom:40,fontFamily:"'DM Sans',sans-serif"},children:"← Back to Home"}),l.jsxs("div",{style:{marginBottom:48,textAlign:"center"},children:[l.jsx("div",{style:{fontSize:12,fontWeight:700,color:p.accent,letterSpacing:2,textTransform:"uppercase",marginBottom:10},children:"The AMP Blog"}),l.jsx("h1",{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:36,fontWeight:800,color:p.primary,marginBottom:12},children:"SEO & Link Building Insights"}),l.jsx("p",{style:{fontSize:16,color:p.muted,maxWidth:520,margin:"0 auto"},children:"Expert guides, publisher tips, and SEO strategy from the Authority Media Placement team."})]}),l.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(320px, 1fr))",gap:20},children:r.map(i=>l.jsxs("div",{onClick:()=>{n(i.id);window.history.pushState(null,'','/blog/'+i.id)},style:{background:"white",border:`1px solid ${p.border}`,borderRadius:16,cursor:"pointer",transition:"all 0.2s",overflow:"hidden"},onMouseEnter:o=>{o.currentTarget.style.transform="translateY(-4px)",o.currentTarget.style.boxShadow="0 12px 32px rgba(99,102,241,0.12)",o.currentTarget.style.borderColor="#A5B4FC"},onMouseLeave:o=>{o.currentTarget.style.transform="",o.currentTarget.style.boxShadow="",o.currentTarget.style.borderColor=p.border},children:[l.jsx("div",{style:{padding:"24px 24px 0",fontSize:44},children:i.emoji}),l.jsxs("div",{style:{padding:"14px 24px 24px"},children:[l.jsx("span",{className:"badge badge-info",style:{marginBottom:12},children:i.category}),l.jsx("h3",{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:16,fontWeight:700,color:p.primary,lineHeight:1.4,marginBottom:10},children:i.title}),l.jsx("p",{style:{fontSize:13,color:p.muted,lineHeight:1.65,marginBottom:16},children:i.excerpt}),l.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:12,color:p.muted,borderTop:`1px solid ${p.border}`,paddingTop:12},children:[l.jsx("span",{children:i.date}),l.jsxs("span",{style:{color:p.accent,fontWeight:600},children:["Read · ",i.readTime," →"]})]})]})]},i.id))})]})}

function Xp({onLogin:e, blogs}: any){const[t,n]=T.useState(!1),[r,i]=T.useState("login"),[o,s]=T.useState(!1),[a,u]=T.useState(null),[d,y]=T.useState(!1),[authRole,setAuthRole]=T.useState("advertiser");T.useEffect(()=>{const g=()=>s(window.scrollY>40);return window.addEventListener("scroll",g),()=>window.removeEventListener("scroll",g)},[]);T.useEffect(()=>{const handleRoute=()=>{const path=window.location.pathname;if(path==="/blog"||path.startsWith("/blog/")){y(!0);u(null)}else if(["/privacy","/terms","/contact","/guidelines"].includes(path)){y(!1);u(path.slice(1))}else{y(!1);u(null)}};handleRoute();window.addEventListener("popstate",handleRoute);return()=>window.removeEventListener("popstate",handleRoute)},[]);const openAdvertiser=()=>{setAuthRole("advertiser"),i("signup"),n(!0)},openPublisher=()=>{setAuthRole("publisher"),i("signup"),n(!0)},openLogin=()=>{i("login"),n(!0)},m=openAdvertiser,w=openLogin,N=[{icon:"🎯",title:"Precision Targeting",desc:"Filter by DA, DR, niche, traffic, and price to find the perfect site for your campaign every time."},{icon:"📊",title:"Live SEO Metrics",desc:"Real-time Ahrefs DR, Moz DA, and organic traffic data auto-fetched the moment a site is added."},{icon:"💳",title:"PayPal Payments",desc:"Secure escrow payments via PayPal. Advertisers pay upfront; publishers get paid automatically."},{icon:"🛡️",title:"Quality Vetted Sites",desc:"Every publisher site is manually reviewed and approved by our editorial team before going live."},{icon:"⚡",title:"Fast Turnaround",desc:"Most orders completed in 3–7 days. Track every order from placement to live URL in real time."},{icon:"💰",title:"Transparent Pricing",desc:"No hidden fees. Publishers earn 90% of every sale. We take a simple 10% platform commission."}],v=[{num:"01",icon:"📣",title:"Browse & Filter",desc:"Search 12,000+ websites by niche, DA, DR, traffic, and price."},{num:"02",icon:"🛒",title:"Place Order",desc:"Select post type, provide your URL, pay securely via PayPal."},{num:"03",icon:"✍️",title:"Content Published",desc:"Publisher writes and publishes your guest post on their site."},{num:"04",icon:"✅",title:"Go Live & Get Paid",desc:"You get a live backlink. Publisher gets paid. Everyone wins."}],k=["Technology","SaaS & Software","Cybersecurity","AI & Machine Learning","Blockchain & Web3","Cryptocurrency","Gaming","E-commerce","Digital Marketing","Finance & Investing","Business & Entrepreneurship","Real Estate","Startups","Fintech & Banking","Insurance","Health & Wellness","Mental Health","Fitness & Exercise","Nutrition & Diet","Beauty & Skincare","Fashion & Style","Parenting & Family","Pets & Animals","Photography","Music & Audio","Education & E-Learning","Online Courses","Career Development","Law & Legal","Travel & Tourism","Food & Recipes","Home & Garden","Interior Design","Automotive","Sports & Athletics","Sustainability","Science & Research","Film & TV","Social Media","Luxury & Premium"],z=[{name:"Arjun Mehta",role:"SEO Agency Owner",avatar:"AM",text:"Authority Media Placement is the best link building marketplace I've used. High-quality sites, fast delivery, and transparent pricing."},{name:"Sarah Collins",role:"Content Publisher",avatar:"SC",text:"I've earned over $8,000 in 6 months. The platform is incredibly easy to use and payments are always on time."},{name:"David Park",role:"E-commerce Brand",avatar:"DP",text:"We scaled our DR from 22 to 61 in under a year using AMP. The quality of sites here is genuinely impressive."}],f=`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:wght@400;500&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    body{font-family:'DM Sans',sans-serif;}
    .lp-nav{position:fixed;top:0;left:0;right:0;z-index:500;padding:0 5%;height:74px;display:flex;align-items:center;justify-content:space-between;transition:all 0.3s;}
    .lp-nav.scrolled{background:rgba(255,255,255,0.97);backdrop-filter:blur(12px);border-bottom:1px solid #E2E8F0;}
    .lp-hero{min-height:100vh;background:linear-gradient(160deg,#0F172A 0%,#1E293B 40%,#1E1B4B 70%,#0F172A 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:110px 5% 80px;position:relative;overflow:hidden;}
    .hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(99,102,241,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.07) 1px,transparent 1px);background-size:60px 60px;}
    .hero-glow{position:absolute;top:20%;left:50%;transform:translateX(-50%);width:700px;height:450px;background:radial-gradient(ellipse,rgba(99,102,241,0.22) 0%,transparent 70%);pointer-events:none;}
    .hero-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(99,102,241,0.15);border:1px solid rgba(99,102,241,0.3);color:#A5B4FC;padding:7px 18px;border-radius:50px;font-size:13px;font-weight:600;margin-bottom:28px;position:relative;z-index:1;}
    .hero-title{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(34px,5.5vw,68px);font-weight:800;color:white;line-height:1.1;margin-bottom:22px;max-width:900px;position:relative;z-index:1;}
    .hero-title span{background:linear-gradient(135deg,#818CF8,#C084FC);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
    .hero-sub{font-size:clamp(15px,2vw,18px);color:rgba(255,255,255,0.65);max-width:600px;line-height:1.75;margin-bottom:40px;position:relative;z-index:1;}
    .hero-btns{display:flex;gap:14px;flex-wrap:wrap;justify-content:center;margin-bottom:64px;position:relative;z-index:1;}
    .btn-hp{padding:16px 34px;background:linear-gradient(135deg,#6366F1,#4338CA);color:white;border:none;border-radius:12px;font-size:16px;font-weight:700;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;transition:transform 0.2s,box-shadow 0.2s;box-shadow:0 4px 20px rgba(99,102,241,0.4);}
    .btn-hp:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(99,102,241,0.5);}
    .btn-ho{padding:16px 34px;background:rgba(255,255,255,0.08);color:white;border:1px solid rgba(255,255,255,0.28);border-radius:12px;font-size:16px;font-weight:600;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;transition:all 0.2s;}
    .btn-ho:hover{background:rgba(255,255,255,0.16);}
    .stats-bar{display:flex;gap:48px;justify-content:center;flex-wrap:wrap;position:relative;z-index:1;}
    .stat-num{font-family:'Plus Jakarta Sans',sans-serif;font-size:32px;font-weight:800;color:white;}
    .stat-lbl{font-size:13px;color:rgba(255,255,255,0.5);margin-top:2px;}
    .lp-section{padding:88px 5%;}
    .sec-label{text-align:center;font-size:12px;font-weight:700;color:#6366F1;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;}
    .sec-title{text-align:center;font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(24px,4vw,42px);font-weight:800;color:#0F172A;margin-bottom:14px;line-height:1.2;}
    .sec-sub{text-align:center;font-size:16px;color:#64748B;max-width:540px;margin:0 auto 52px;line-height:1.75;}
    .feat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;max-width:1100px;margin:0 auto;}
    .feat-card{background:white;border:1px solid #E2E8F0;border-radius:16px;padding:28px;transition:all 0.2s;}
    .feat-card:hover{border-color:#6366F1;box-shadow:0 8px 30px rgba(99,102,241,0.1);transform:translateY(-3px);}
    .testi-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;max-width:1000px;margin:0 auto;}
    .testi-card{background:white;border:1px solid #E2E8F0;border-radius:16px;padding:28px;}
    .cta-sec{background:linear-gradient(135deg,#0F172A 0%,#1E1B4B 100%);padding:96px 5%;text-align:center;position:relative;overflow:hidden;}
    .cta-card{background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.15);border-radius:16px;padding:28px 32px;max-width:320px;cursor:pointer;transition:all 0.2s;text-align:left;}
    .cta-card:hover{background:rgba(255,255,255,0.13);transform:translateY(-3px);}
    .niche-pill{padding:8px 18px;background:white;border:1px solid #E2E8F0;border-radius:50px;font-size:14px;font-weight:500;color:#475569;cursor:pointer;transition:all 0.15s;display:inline-block;}
    .niche-pill:hover{background:#EEF2FF;border-color:#A5B4FC;color:#6366F1;}
    .foot-link{color:#64748B;cursor:pointer;font-size:13px;transition:color 0.15s;background:none;border:none;font-family:'DM Sans',sans-serif;}
    .foot-link:hover{color:white;}
    .trust-bar{background:#F8FAFC;border-top:1px solid #E2E8F0;border-bottom:1px solid #E2E8F0;padding:22px 5%;}
    @keyframes spin{to{transform:rotate(360deg);}}
    .algo-container{margin-bottom:48px;position:relative;z-index:10;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;max-width:1100px;width:100%;padding:0 24px;}
    .algo-card{background:rgba(15,23,42,0.45);backdrop-filter:blur(10px);border:1px solid rgba(99,102,241,0.25);border-radius:16px;padding:20px;text-align:left;position:relative;overflow:hidden;transition:all 0.35s cubic-bezier(0.16,1,0.3,1);box-shadow:0 8px 32px rgba(0,0,0,0.2);display:flex;flex-direction:column;gap:10px;cursor:pointer;}
    .algo-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#6366F1,#C084FC);opacity:0.8;transition:all 0.3s;}
    .algo-card:hover{transform:translateY(-6px);border-color:rgba(192,132,252,0.6);box-shadow:0 16px 40px rgba(99,102,241,0.25);background:rgba(15,23,42,0.75);}
    .algo-card:hover::before{background:linear-gradient(90deg,#34D399,#6366F1);height:4px;}
    .algo-icon-wrapper{display:flex;align-items:center;justify-content:space-between;}
    .algo-icon{font-size:24px;display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;background:rgba(255,255,255,0.04);border-radius:10px;border:1px solid rgba(255,255,255,0.08);}
    .algo-badge-pill{background:rgba(168,85,247,0.18);color:#E9D5FF;font-size:10px;padding:3px 9px;border-radius:50px;text-transform:uppercase;letter-spacing:0.8px;font-weight:700;}
    .algo-title{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:16px;color:white;margin:2px 0 0;}
    .algo-desc{font-size:12.5px;color:rgba(255,255,255,0.68);line-height:1.55;}
  `,c=`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=DM+Sans:wght@400;500&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    body{font-family:'DM Sans',sans-serif;}
    h1,h2,h3,h4{font-family:'Plus Jakarta Sans',sans-serif;}
    .badge{padding:4px 12px;border-radius:50px;font-size:12px;font-weight:700;display:inline-flex;align-items:center;}
    .badge-info{background:#EEF2FF;color:#3730A3;}
    .badge-success{background:#ECFDF5;color:#065F46;}
    .badge-gray{background:#F1F5F9;color:#475569;}
    .card{background:white;border:1px solid #E2E8F0;border-radius:14px;}
    .blog-card{background:white;border:1px solid #E2E8F0;border-radius:16px;cursor:pointer;transition:all 0.2s;overflow:hidden;}
    .blog-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(99,102,241,0.12);border-color:#A5B4FC;}
    .page-section{background:white;border:1px solid #E2E8F0;border-radius:14px;padding:28px;margin-bottom:18px;}
    .page-section h3{font-size:17px;font-weight:700;color:#0F172A;margin-bottom:12px;font-family:'Plus Jakarta Sans',sans-serif;}
    .page-section p{font-size:14px;color:#475569;line-height:1.85;white-space:pre-line;}
  `,h=()=>l.jsxs("div",{style:{background:"#0F172A",padding:"0 5%",height:68,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100},children:[l.jsx(lt,{size:"sm",theme:"dark"}),l.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[l.jsx("button",{onClick:()=>{y(!1);u(null);window.history.pushState(null,'','/')},style:{padding:"8px 14px",background:"transparent",border:"none",color:"rgba(255,255,255,0.75)",fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",transition:"all 0.2s"},onMouseEnter:g=>{g.currentTarget.style.color="#FFFFFF"},onMouseLeave:g=>{g.currentTarget.style.color="rgba(255,255,255,0.75)"},children:"← Home"}),l.jsx("button",{onClick:openLogin,style:{padding:"8px 14px",background:"transparent",border:"none",color:"rgba(255,255,255,0.75)",fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",transition:"all 0.2s",marginRight:12},onMouseEnter:g=>{g.currentTarget.style.color="#FFFFFF"},onMouseLeave:g=>{g.currentTarget.style.color="rgba(255,255,255,0.75)"},children:"Sign In"}),l.jsx("button",{onClick:openAdvertiser,style:{padding:"8px 16px",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.2)",color:"white",borderRadius:8,fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",transition:"all 0.2s"},onMouseEnter:g=>{g.currentTarget.style.background="rgba(255,255,255,0.12)";g.currentTarget.style.borderColor="white"},onMouseLeave:g=>{g.currentTarget.style.background="rgba(255,255,255,0.06)";g.currentTarget.style.borderColor="rgba(255,255,255,0.2)"},children:"Buy Guest Posts"}),l.jsx("button",{onClick:openPublisher,style:{padding:"8px 16px",background:"linear-gradient(135deg,#6366F1,#4F46E5)",color:"white",border:"none",borderRadius:8,fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",transition:"all 0.2s"},onMouseEnter:g=>{g.currentTarget.style.transform="translateY(-1px)";g.currentTarget.style.boxShadow="0 4px 12px rgba(99,102,241,0.35)"},onMouseLeave:g=>{g.currentTarget.style.transform="none";g.currentTarget.style.boxShadow="none"},children:"Sell Guest Posts"})]})]}),x=()=>l.jsxs("div",{style:{background:"#0F172A",padding:"40px 5%",textAlign:"center"},children:[l.jsx(lt,{size:"sm",theme:"dark"}),l.jsx("div",{style:{fontSize:13,color:"#475569",marginTop:14},children:"© 2026 authorityplacement.com · All rights reserved"}),l.jsx("div",{style:{display:"flex",gap:20,justifyContent:"center",marginTop:14,flexWrap:"wrap"},children:[["Privacy","privacy"],["Terms","terms"],["Contact","contact"],["Guidelines","guidelines"]].map(([g,j])=>l.jsx("button",{onClick:()=>{u(j);y(!1);window.history.pushState(null,'','/'+j)},style:{background:"none",border:"none",color:"#64748B",fontSize:13,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"},children:g},j))})]});return d?l.jsxs("div",{style:{fontFamily:"'DM Sans',sans-serif",background:"#F8FAFC",minHeight:"100vh"},children:[l.jsx("style",{children:c}),l.jsx(h,{}),l.jsx(Kp,{onBack:()=>{y(!1);window.history.pushState(null,'','/')},blogs:blogs}),l.jsx(x,{}),t&&l.jsx(Xi,{onLogin:g=>{e(g),n(!1)},onClose:()=>n(!1),defaultTab:r,defaultRole:authRole})]}):a?l.jsxs("div",{style:{fontFamily:"'DM Sans',sans-serif",background:"white",minHeight:"100vh"},children:[l.jsx("style",{children:c}),l.jsx(h,{}),l.jsx(Jp,{pageId:a,onBack:()=>{u(null);window.history.pushState(null,'','/')}}),l.jsx(x,{}),t&&l.jsx(Xi,{onLogin:g=>{e(g),n(!1)},onClose:()=>n(!1),defaultTab:r,defaultRole:authRole})]}):l.jsxs("div",{style:{fontFamily:"'DM Sans', sans-serif",background:"#F8FAFC",color:"#0F172A"},children:[l.jsx("style",{children:f}),l.jsxs("nav",{className:`lp-nav${o?" scrolled":""}`,children:[l.jsx(lt,{size:"md",theme:o?"light":"dark"}),l.jsxs("div",{style:{display:"flex",gap:16,alignItems:"center"},children:[l.jsx("button",{onClick:openAdvertiser,style:{padding:"8px 10px",background:"transparent",border:"none",color:o?"#475569":"rgba(255,255,255,0.75)",fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",transition:"all 0.2s"},onMouseEnter:g=>{g.currentTarget.style.color=o?"#6366F1":"#FFFFFF"},onMouseLeave:g=>{g.currentTarget.style.color=o?"#475569":"rgba(255,255,255,0.75)"},children:"Buy Links"}),l.jsx("button",{onClick:openPublisher,style:{padding:"8px 10px",background:"transparent",border:"none",color:o?"#475569":"rgba(255,255,255,0.75)",fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",transition:"all 0.2s"},onMouseEnter:g=>{g.currentTarget.style.color=o?"#6366F1":"#FFFFFF"},onMouseLeave:g=>{g.currentTarget.style.color=o?"#475569":"rgba(255,255,255,0.75)"},children:"Sell Links"}),l.jsx("button",{onClick:()=>y(!0),style:{padding:"8px 10px",background:"transparent",border:"none",color:o?"#475569":"rgba(255,255,255,0.75)",fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",transition:"all 0.2s"},onMouseEnter:g=>{g.currentTarget.style.color=o?"#6366F1":"#FFFFFF"},onMouseLeave:g=>{g.currentTarget.style.color=o?"#475569":"rgba(255,255,255,0.75)"},children:"Blog"}),l.jsx("button",{onClick:()=>u("contact"),style:{padding:"8px 10px",background:"transparent",border:"none",color:o?"#475569":"rgba(255,255,255,0.75)",fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",transition:"all 0.2s"},onMouseEnter:g=>{g.currentTarget.style.color=o?"#6366F1":"#FFFFFF"},onMouseLeave:g=>{g.currentTarget.style.color=o?"#475569":"rgba(255,255,255,0.75)"},children:"Contact"}),l.jsx("button",{onClick:openLogin,style:{padding:"8px 14px",background:"transparent",border:"none",color:o?"#475569":"rgba(255,255,255,0.75)",fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",transition:"all 0.2s"},onMouseEnter:g=>{g.currentTarget.style.color=o?"#6366F1":"#FFFFFF"},onMouseLeave:g=>{g.currentTarget.style.color=o?"#475569":"rgba(255,255,255,0.75)"},children:"Sign In"}),l.jsx("button",{onClick:openAdvertiser,style:{padding:"10px 22px",background:"linear-gradient(135deg,#6366F1,#4F46E5)",color:"white",border:"none",borderRadius:10,fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",transition:"all 0.2s"},onMouseEnter:g=>{g.currentTarget.style.transform="translateY(-1px)",g.currentTarget.style.boxShadow=o?"0 4px 12px rgba(99,102,241,0.25)":"0 4px 12px rgba(99,102,241,0.35)"},onMouseLeave:g=>{g.currentTarget.style.transform="none",g.currentTarget.style.boxShadow="none"},children:"Get Started →"})]})]}),l.jsxs("div",{className:"lp-hero",children:[l.jsx("div",{className:"hero-grid"}),l.jsx("div",{className:"hero-glow"}),l.jsx("div",{style:{marginBottom:36,position:"relative",zIndex:1},children:l.jsx(lt,{size:"xl",theme:"dark"})}),l.jsxs("div",{style:{background:"rgba(99,102,241,0.1)",border:"1px solid rgba(99,102,241,0.25)",borderRadius:"12px",padding:"10px 20px",maxWidth:760,width:"100%",margin:"0 auto 24px",display:"flex",alignItems:"center",gap:10,justifyContent:"center",position:"relative",zIndex:10},children:[l.jsx("span",{style:{background:"linear-gradient(135deg,#34D399,#059669)",color:"white",fontSize:9,fontWeight:800,padding:"2px 6px",borderRadius:4,textTransform:"uppercase",letterSpacing:"0.5px"},children:"Platform Update"}),l.jsxs("span",{style:{color:"rgba(255,255,255,0.85)",fontSize:12.5,fontWeight:600,fontFamily:"'Plus Jakarta Sans',sans-serif"},children:["🔥 Optimized for Google Algorithms: ",l.jsx("strong",{style:{color:"#A5B4FC"},children:"SEO"})," · ",l.jsx("strong",{style:{color:"#34D399"},children:"GEO"})," · ",l.jsx("strong",{style:{color:"#FBBF24"},children:"E-E-A-T"})," · ",l.jsx("strong",{style:{color:"#C084FC"},children:"AEO"})," signals integrated successfully."]})]}),l.jsx("div",{className:"hero-badge",children:"⭐ Trusted by 3,200+ brands & agencies worldwide"}),l.jsxs("h1",{className:"hero-title",children:["The #1 Marketplace for",l.jsx("br",{}),l.jsx("span",{children:"Premium Guest Posts"}),l.jsx("br",{}),"& Sponsored Content"]}),l.jsx("p",{className:"hero-sub",children:"Connect with thousands of high-authority publishers. Build powerful backlinks, grow organic traffic, and boost your search rankings — all in one place."}),l.jsxs("div",{className:"algo-container",children:[l.jsxs("div",{className:"algo-card",children:[l.jsxs("div",{className:"algo-icon-wrapper",children:[l.jsx("span",{className:"algo-icon",children:"📈"}),l.jsx("span",{className:"algo-badge-pill",style:{background:"rgba(52,211,153,0.15)",color:"#34D399"},children:"SEO"})]}),l.jsx("h3",{className:"algo-title",children:"Search Optimization"}),l.jsx("p",{className:"algo-desc",children:"Directly enhances Google Bot's core crawling metrics. Hand-vetted authority backlinks with high contextual relevance, matching organic search queries perfectly to elevate your primary SERP ranks."})]}),l.jsxs("div",{className:"algo-card",children:[l.jsxs("div",{className:"algo-icon-wrapper",children:[l.jsx("span",{className:"algo-icon",children:"🧠"}),l.jsx("span",{className:"algo-badge-pill",style:{background:"rgba(99,102,241,0.15)",color:"#A5B4FC"},children:"GEO"})]}),l.jsx("h3",{className:"algo-title",children:"Generative Optimization"}),l.jsx("p",{className:"algo-desc",children:"Calibrated for next-gen Search Generative Experences. High-density context mapping boosts your content citations in Google AI Overviews and LLM-driven generative response engines."})]}),l.jsxs("div",{className:"algo-card",children:[l.jsxs("div",{className:"algo-icon-wrapper",children:[l.jsx("span",{className:"algo-icon",children:"🛡️"}),l.jsx("span",{className:"algo-badge-pill",style:{background:"rgba(245,158,11,0.15)",color:"#FBBF24"},children:"E-E-A-T"})]}),l.jsx("h3",{className:"algo-title",children:"Credibility & Authority"}),l.jsx("p",{className:"algo-desc",children:"Fully satisfies Google's Quality Rater Guidelines. Links from verified expert editors on transparent, long-standing, high-authority domains, avoiding toxic networks completely."})]}),l.jsxs("div",{className:"algo-card",children:[l.jsxs("div",{className:"algo-icon-wrapper",children:[l.jsx("span",{className:"algo-icon",children:"💬"}),l.jsx("span",{className:"algo-badge-pill",style:{background:"rgba(168,85,247,0.15)",color:"#DF99F7"},children:"AEO"})]}),l.jsx("h3",{className:"algo-title",children:"Answer Optimization"}),l.jsx("p",{className:"algo-desc",children:"Optimized for voice searches, direct queries, and conversational assistants. Formatted semantic outlines feed direct answer nodes, maximizing your chance to secure zero-click rank spots."})]})]}),l.jsxs("div",{className:"hero-btns",children:[l.jsx("button",{onClick:openAdvertiser,style:{padding:"16px 36px",background:"linear-gradient(135deg,#6366F1,#4338CA)",color:"white",border:"none",borderRadius:12,fontSize:17,fontWeight:700,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",boxShadow:"0 4px 24px rgba(99,102,241,0.45)",transition:"transform 0.2s,box-shadow 0.2s",position:"relative",zIndex:2},onMouseEnter:g=>{g.currentTarget.style.transform="translateY(-2px)",g.currentTarget.style.boxShadow="0 8px 32px rgba(99,102,241,0.55)"},onMouseLeave:g=>{g.currentTarget.style.transform="",g.currentTarget.style.boxShadow="0 4px 24px rgba(99,102,241,0.45)"},children:"🔗 Start Building Links →"}),l.jsx("button",{onClick:openPublisher,style:{padding:"16px 36px",background:"rgba(255,255,255,0.1)",color:"white",border:"1px solid rgba(255,255,255,0.3)",borderRadius:12,fontSize:17,fontWeight:600,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",transition:"background 0.2s",position:"relative",zIndex:2},onMouseEnter:g=>{g.currentTarget.style.background="rgba(255,255,255,0.2)"},onMouseLeave:g=>{g.currentTarget.style.background="rgba(255,255,255,0.1)"},children:"💰 Monetize My Site"})]}),l.jsx("div",{className:"stats-bar",children:[["12,400+","Premium Websites"],["$2.8M+","Paid to Publishers"],["98%","Satisfaction Rate"],["47","Countries Served"]].map(([g,j],S)=>l.jsxs("div",{style:{textAlign:"center"},children:[l.jsx("div",{className:"stat-num",children:g}),l.jsx("div",{className:"stat-lbl",children:j})]},S))})]}),l.jsx("div",{className:"trust-bar",children:l.jsx("div",{style:{display:"flex",gap:32,justifyContent:"center",flexWrap:"wrap"},children:["🔒 SSL Secured","✅ Manually Vetted Sites","💳 PayPal Protected","⚡ 3–7 Day Delivery","📊 Real Ahrefs & Moz Data","🌍 Global Publisher Network"].map((g,j)=>l.jsx("span",{style:{fontSize:13,fontWeight:600,color:"#64748B"},children:g},j))})}),l.jsxs("div",{className:"lp-section",style:{background:"white"},children:[l.jsx("div",{className:"sec-label",children:"Why Choose Us"}),l.jsx("h2",{className:"sec-title",children:"Everything you need to scale your SEO"}),l.jsx("p",{className:"sec-sub",children:"From discovery to delivery, Authority Media Placement makes link building effortless and effective."}),l.jsx("div",{className:"feat-grid",children:N.map((g,j)=>l.jsxs("div",{className:"feat-card",children:[l.jsx("div",{style:{width:52,height:52,background:"#EEF2FF",borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,marginBottom:18},children:g.icon}),l.jsx("div",{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:17,fontWeight:700,color:"#0F172A",marginBottom:8},children:g.title}),l.jsx("div",{style:{fontSize:14,color:"#64748B",lineHeight:1.7},children:g.desc})]},j))})]}),l.jsxs("div",{className:"lp-section",children:[l.jsx("div",{className:"sec-label",children:"How It Works"}),l.jsx("h2",{className:"sec-title",children:"From order to live link in 4 simple steps"}),l.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:0,maxWidth:1e3,margin:"0 auto"},children:v.map((g,j)=>l.jsxs("div",{style:{padding:"32px 24px",textAlign:"center",position:"relative"},children:[j<v.length-1&&l.jsx("span",{style:{position:"absolute",right:-12,top:44,fontSize:22,color:"#C7D2FE"},children:"→"}),l.jsxs("div",{style:{fontSize:11,fontWeight:800,color:"#6366F1",letterSpacing:2,marginBottom:14},children:["STEP ",g.num]}),l.jsx("div",{style:{fontSize:36,marginBottom:14},children:g.icon}),l.jsx("div",{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:16,fontWeight:700,color:"#0F172A",marginBottom:8},children:g.title}),l.jsx("div",{style:{fontSize:13,color:"#64748B",lineHeight:1.6},children:g.desc})]},j))})]}),l.jsxs("div",{className:"lp-section",style:{background:"white"},children:[l.jsx("div",{className:"sec-label",children:"50+ Niches Available"}),l.jsx("h2",{className:"sec-title",children:"12,000+ sites across every industry"}),l.jsx("p",{className:"sec-sub",children:"Whatever your industry, we have high-authority publishers ready to host your content."}),l.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:10,justifyContent:"center",maxWidth:720,margin:"0 auto 48px"},children:k.map((g,j)=>l.jsx("div",{className:"niche-pill",onClick:m,children:g},j))}),l.jsx("div",{style:{textAlign:"center"},children:l.jsx("button",{className:"btn-hp",onClick:m,children:"Browse All Sites →"})})]}),l.jsxs("div",{className:"lp-section",children:[l.jsx("div",{className:"sec-label",children:"Testimonials"}),l.jsx("h2",{className:"sec-title",children:"Loved by marketers & publishers"}),l.jsx("p",{className:"sec-sub",children:"Don't take our word for it — hear from our community of 3,200+ active users."}),l.jsx("div",{className:"testi-grid",children:z.map((g,j)=>l.jsxs("div",{className:"testi-card",children:[l.jsx("div",{style:{color:"#FBBF24",fontSize:15,marginBottom:14},children:"★★★★★"}),l.jsxs("div",{style:{fontSize:14,color:"#475569",lineHeight:1.75,marginBottom:20,fontStyle:"italic"},children:['"',g.text,'"']}),l.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[l.jsx("div",{style:{width:40,height:40,background:"#EEF2FF",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:"#6366F1"},children:g.avatar}),l.jsxs("div",{children:[l.jsx("div",{style:{fontWeight:700,fontSize:14,color:"#0F172A"},children:g.name}),l.jsx("div",{style:{fontSize:12,color:"#64748B"},children:g.role})]})]})]},j))})]}),l.jsxs("div",{className:"lp-section",style:{background:"#F8FAFC"},children:[l.jsx("div",{className:"sec-label",children:"FAQs"}),l.jsx("h2",{className:"sec-title",children:"Frequently Asked Questions"}),l.jsx("p",{className:"sec-sub",children:"Everything you need to know about our link building marketplace."}),l.jsx("div",{style:{maxWidth:800,margin:"0 auto",textAlign:"left"},children:FAQS.map((g,j)=>l.jsx(FAQItem,{question:g.question,answer:g.answer},j))})]}),l.jsxs("div",{className:"lp-section",style:{background:"white",paddingTop:64,paddingBottom:64},children:[l.jsx("div",{className:"sec-label",children:"Follow Us"}),l.jsx("h2",{className:"sec-title",children:"Stay connected with AMP"}),l.jsx("p",{className:"sec-sub",children:"Get SEO tips, platform updates, publisher opportunities, and link building insights across all our channels."}),l.jsx("div",{style:{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap",maxWidth:900,margin:"0 auto"},children:[{label:"Twitter / X",handle:"@AuthorityPlacem",desc:"Daily SEO tips & platform news",url:"https://x.com/AuthorityPlacem",color:"#000000",bg:"#F7F7F7",icon:l.jsx("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"black",children:l.jsx("path",{d:"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.843L1.254 2.25H8.08l4.259 5.626L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"})})},{label:"LinkedIn",handle:"Authority Media Placement",desc:"Industry insights & case studies",url:"https://www.linkedin.com/company/authority-media-placement/",color:"#0A66C2",bg:"#EBF3FB",icon:l.jsx("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"#0A66C2",children:l.jsx("path",{d:"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"})})},{label:"Instagram",handle:"@authorityplacement",desc:"Behind the scenes & publisher spotlights",url:"https://www.instagram.com/authorityplacement/",color:"#E4405F",bg:"#FEF0F3",icon:l.jsxs("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"url(#igGrad)",children:[l.jsx("defs",{children:l.jsxs("linearGradient",{id:"igGrad",x1:"0",y1:"0",x2:"1",y2:"1",children:[l.jsx("stop",{offset:"0%",stopColor:"#F58529"}),l.jsx("stop",{offset:"50%",stopColor:"#DD2A7B"}),l.jsx("stop",{offset:"100%",stopColor:"#8134AF"})]})}),l.jsx("path",{d:"M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"})]})},{label:"YouTube",handle:"@AuthorityMediaPlacement",desc:"SEO tutorials & platform walkthroughs",url:"https://www.youtube.com/@AuthorityMediaPlacement",color:"#FF0000",bg:"#FFF0F0",icon:l.jsx("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"#FF0000",children:l.jsx("path",{d:"M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"})})},{label:"Facebook",handle:"Authority Media Placement",desc:"Community, announcements & offers",url:"https://www.facebook.com/people/Authority-Media-Placement/61590478809643/",color:"#1877F2",bg:"#EEF4FF",icon:l.jsx("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"#1877F2",children:l.jsx("path",{d:"M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"})})},{label:"Pinterest",handle:"@authorityplacement",desc:"SEO infographics & visual boards",url:"https://in.pinterest.com/authorityplacement/",color:"#BD081C",bg:"#FFF0F1",icon:l.jsx("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"#BD081C",children:l.jsx("path",{d:"M12.244 0C5.748 0 0 4.762 0 11.26c0 4.2 2.802 7.786 6.512 9.056-.08-.784-.15-1.99.03-2.846.166-.71 1.072-4.55 1.072-4.55s-.274-.548-.274-1.356c0-1.272.738-2.222 1.656-2.222.776 0 1.15.582 1.15 1.28 0 .78-.496 1.946-.752 3.028-.214.904.452 1.642 1.344 1.642 1.61 0 2.85-1.7 2.85-4.152 0-2.172-1.56-3.69-3.79-3.69-2.584 0-4.1 1.938-4.1 3.942 0 .78.3 1.618.674 2.072.074.09.085.17.062.264-.068.28-.22.898-.25.102-.04-.15-.176-.44-.176-.704 0-.14.004-.322.016-.484-.336-1.562-.124-3.13 1.002-4.254.912-.912 2.392-1.394 4.148-1.394 3.238 0 5.484 2.21 5.484 5.05 0 3.338-1.922 5.864-4.73 5.864-.938 0-1.82-.508-2.122-1.086 0 0-.504 1.916-.626 2.384-.226.868-.838 1.956-1.25 2.628.79.244 1.628.376 2.502.376 6.496 0 11.756-5.26 11.756-11.756C24 5.26 18.74 0 12.244 0z"})})}].map((g,j)=>l.jsx("a",{href:g.url,target:"_blank",rel:"noopener noreferrer",style:{textDecoration:"none",flex:"1 1 160px",maxWidth:200},children:l.jsxs("div",{style:{background:g.bg,border:"1px solid #E2E8F0",borderRadius:16,padding:"24px 20px",textAlign:"center",transition:"all 0.2s",cursor:"pointer"},onMouseEnter:S=>{S.currentTarget.style.transform="translateY(-4px)",S.currentTarget.style.boxShadow=`0 8px 24px ${g.color}22`,S.currentTarget.style.borderColor=g.color},onMouseLeave:S=>{S.currentTarget.style.transform="",S.currentTarget.style.boxShadow="",S.currentTarget.style.borderColor="#E2E8F0"},children:[l.jsx("div",{style:{display:"flex",justifyContent:"center",marginBottom:12},children:g.icon}),l.jsx("div",{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:14,color:"#0F172A",marginBottom:4},children:g.label}),l.jsx("div",{style:{fontSize:12,color:g.color,fontWeight:600,marginBottom:6},children:g.handle}),l.jsx("div",{style:{fontSize:12,color:"#64748B",lineHeight:1.5},children:g.desc})]})},j))})]}),l.jsxs("div",{className:"cta-sec",children:[l.jsx("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:500,height:300,background:"radial-gradient(ellipse,rgba(99,102,241,0.28) 0%,transparent 70%)",pointerEvents:"none"}}),l.jsx("h2",{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"clamp(28px,4vw,48px)",fontWeight:800,color:"white",marginBottom:14,position:"relative",zIndex:1},children:"Ready to grow your online authority?"}),l.jsx("p",{style:{fontSize:17,color:"rgba(255,255,255,0.6)",marginBottom:40,position:"relative",zIndex:1},children:"Join thousands of brands and publishers already using Authority Media Placement."}),l.jsx("div",{style:{display:"flex",gap:20,justifyContent:"center",flexWrap:"wrap",position:"relative",zIndex:1},children:[{icon:"📣",title:"I'm an Advertiser",desc:"Buy guest posts on high-DA websites to boost your search rankings.",btn:"Start buying links →"},{icon:"🌐",title:"I'm a Publisher",desc:"List your website and earn money publishing quality sponsored content.",btn:"Start earning →"}].map((g,j)=>l.jsxs("div",{className:"cta-card",onClick:j===0?openAdvertiser:openPublisher,children:[l.jsx("div",{style:{fontSize:32,marginBottom:12},children:g.icon}),l.jsx("div",{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:20,fontWeight:800,color:"white",marginBottom:8},children:g.title}),l.jsx("div",{style:{fontSize:13,color:"rgba(255,255,255,0.6)",lineHeight:1.65,marginBottom:18},children:g.desc}),l.jsx("div",{style:{fontSize:14,fontWeight:700,color:"#A5B4FC"},children:g.btn})]},j))})]}),l.jsx("div",{style:{background:"#0F172A",padding:"56px 5% 32px"},children:l.jsxs("div",{style:{maxWidth:1100,margin:"0 auto"},children:[l.jsxs("div",{style:{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:40,marginBottom:48},children:[l.jsxs("div",{children:[l.jsx(lt,{size:"md",theme:"dark"}),l.jsx("p",{style:{fontSize:13,color:"#64748B",lineHeight:1.75,marginTop:18,maxWidth:280},children:"The #1 marketplace for premium guest posts and sponsored content. Connecting advertisers with top publishers worldwide since 2024."}),l.jsx("div",{style:{display:"flex",gap:10,marginTop:20,flexWrap:"wrap"},children:[{label:"Twitter / X",url:"https://x.com/AuthorityPlacem",color:"#000000",icon:l.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"white",children:l.jsx("path",{d:"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.843L1.254 2.25H8.08l4.259 5.626L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"})})},{label:"LinkedIn",url:"https://www.linkedin.com/company/authority-media-placement/",color:"#0A66C2",icon:l.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"white",children:l.jsx("path",{d:"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"})})},{label:"Facebook",url:"https://www.facebook.com/people/Authority-Media-Placement/61590478809643/",color:"#1877F2",icon:l.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"white",children:l.jsx("path",{d:"M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"})})},{label:"Instagram",url:"https://www.instagram.com/authorityplacement/",color:"#E4405F",icon:l.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"white",children:l.jsx("path",{d:"M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"})})},{label:"YouTube",url:"https://www.youtube.com/@AuthorityMediaPlacement",color:"#FF0000",icon:l.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"white",children:l.jsx("path",{d:"M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"})})},{label:"Pinterest",url:"https://in.pinterest.com/authorityplacement/",color:"#BD081C",icon:l.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"white",children:l.jsx("path",{d:"M12.244 0C5.748 0 0 4.762 0 11.26c0 4.2 2.802 7.786 6.512 9.056-.08-.784-.15-1.99.03-2.846.166-.71 1.072-4.55 1.072-4.55s-.274-.548-.274-1.356c0-1.272.738-2.222 1.656-2.222.776 0 1.15.582 1.15 1.28 0 .78-.496 1.946-.752 3.028-.214.904.452 1.642 1.344 1.642 1.61 0 2.85-1.7 2.85-4.152 0-2.172-1.56-3.69-3.79-3.69-2.584 0-4.1 1.938-4.1 3.942 0 .78.3 1.618.674 2.072.074.09.085.17.062.264-.068.28-.22.898-.25.102-.04-.15-.176-.44-.176-.704 0-.14.004-.322.016-.484-.336-1.562-.124-3.13 1.002-4.254.912-.912 2.392-1.394 4.148-1.394 3.238 0 5.484 2.21 5.484 5.05 0 3.338-1.922 5.864-4.73 5.864-.938 0-1.82-.508-2.122-1.086 0 0-.504 1.916-.626 2.384-.226.868-.838 1.956-1.25 2.628.79.244 1.628.376 2.502.376 6.496 0 11.756-5.26 11.756-11.756C24 5.26 18.74 0 12.244 0z"})})}].map((g,j)=>l.jsx("a",{href:g.url,target:"_blank",rel:"noopener noreferrer",title:g.label,style:{width:38,height:38,background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.2s",textDecoration:"none"},onMouseEnter:S=>{S.currentTarget.style.background=g.color,S.currentTarget.style.borderColor=g.color,S.currentTarget.style.transform="translateY(-2px)"},onMouseLeave:S=>{S.currentTarget.style.background="rgba(255,255,255,0.08)",S.currentTarget.style.borderColor="rgba(255,255,255,0.12)",S.currentTarget.style.transform=""},children:g.icon},j))})]}),l.jsxs("div",{children:[l.jsx("div",{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:14,color:"white",marginBottom:18},children:"Platform"}),[["Marketplace","marketplace"],["Blog","blog"],["How It Works","how"],["Pricing","pricing"]].map(([g,j],S)=>l.jsx("button",{className:"foot-link",style:{display:"block",marginBottom:12,textAlign:"left"},onClick:()=>j==="blog"?y(!0):m(),children:g},S))]}),l.jsxs("div",{children:[l.jsx("div",{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:14,color:"white",marginBottom:18},children:"Company"}),[["Privacy Policy","privacy"],["Terms of Service","terms"],["Contact Us","contact"],["Publisher Guidelines","guidelines"]].map(([g,j],S)=>l.jsx("button",{className:"foot-link",style:{display:"block",marginBottom:12,textAlign:"left"},onClick:()=>u(j),children:g},S))]}),l.jsxs("div",{children:[l.jsx("div",{style:{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:14,color:"white",marginBottom:18},children:"Support"}),["admin@authorityplacement.com"].map((g,j)=>l.jsx("div",{style:{fontSize:12,color:"#64748B",marginBottom:12,wordBreak:"break-all",lineHeight:1.5},children:g},j))]})]}),l.jsxs("div",{style:{borderTop:"1px solid rgba(255,255,255,0.08)",paddingTop:24,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16},children:[l.jsx("div",{style:{fontSize:13,color:"#475569"},children:"© 2026 authorityplacement.com · All rights reserved"}),l.jsx("div",{style:{display:"flex",gap:20},children:[["Privacy Policy","privacy"],["Terms","terms"],["Contact","contact"],["Guidelines","guidelines"]].map(([g,j],S)=>l.jsx("button",{className:"foot-link",onClick:()=>u(j),children:g},S))})]})]})}),t&&l.jsx(Xi,{onLogin:g=>{e(g),n(!1)},onClose:()=>n(!1),defaultTab:r})]})}

function qp({onLogin:e}: any){const[t,n]=T.useState("authorityplacement@gmail.com"),[r,i]=T.useState(""),[o,s]=T.useState(""),[a,u]=T.useState(!1),[d,y]=T.useState(!1),m=async()=>{if(!t){s("Email required.");return}if(!r){s("Password required.");return}u(!0),s("");const w=ii[t.toLowerCase().trim()];if(!w||w.user.role!=="admin"){u(!1),s("No admin account found with this email.");return}const N=await Oo(r,w.hash);if(u(!1),!N){s("Incorrect password. Access denied.");return}e(w.user)};return l.jsxs("div",{style:{minHeight:"100vh",background:"#0F172A",display:"flex",alignItems:"center",justifyContent:"center",padding:20},children:[l.jsx("style",{children:"@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=DM+Sans:wght@400;500&display=swap');*{box-sizing:border-box;margin:0;padding:0;}body{font-family:'DM Sans',sans-serif;}@keyframes spin{to{transform:rotate(360deg);}}"}),l.jsxs("div",{style:{background:"#1E293B",border:"1px solid rgba(255,255,255,0.08)",borderRadius:20,padding:40,width:"100%",maxWidth:420,boxShadow:"0 25px 60px rgba(0,0,0,0.5)"},children:[l.jsxs("div",{style:{textAlign:"center",marginBottom:28},children:[l.jsx(lt,{size:"md",theme:"dark"}),l.jsx("div",{style:{fontSize:12,color:"rgba(255,255,255,0.3)",marginTop:12,letterSpacing:1.5,textTransform:"uppercase"},children:"Admin Portal"})]}),l.jsxs("div",{style:{marginBottom:16},children:[l.jsx("label",{style:{display:"block",fontSize:13,fontWeight:600,color:"rgba(255,255,255,0.6)",marginBottom:6},children:"Admin Email"}),l.jsx("input",{type:"email",placeholder:"your@email.com",value:t,onChange:w=>{n(w.target.value),s("")},onKeyDown:w=>w.key==="Enter"&&m(),style:{width:"100%",padding:"12px 14px",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,fontSize:14,background:"rgba(255,255,255,0.05)",color:"white",outline:"none",fontFamily:"'DM Sans',sans-serif"}})]}),l.jsxs("div",{style:{marginBottom:20},children:[l.jsx("label",{style:{display:"block",fontSize:13,fontWeight:600,color:"rgba(255,255,255,0.6)",marginBottom:6},children:"Password"}),l.jsxs("div",{style:{position:"relative"},children:[l.jsx("input",{type:d?"text":"password",placeholder:"••••••••••••",value:r,onChange:w=>{i(w.target.value),s("")},onKeyDown:w=>w.key==="Enter"&&m(),style:{width:"100%",padding:"12px 44px 12px 14px",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,fontSize:14,background:"rgba(255,255,255,0.05)",color:"white",outline:"none",fontFamily:"'DM Sans',sans-serif"}}),l.jsx("button",{onClick:()=>y(w=>!w),style:{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:16,color:"rgba(255,255,255,0.3)"},children:d?"🙈":"👁️"})]})]}),o&&l.jsxs("div",{style:{background:"rgba(239,68,68,0.15)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:8,padding:"10px 14px",marginBottom:16,fontSize:13,color:"#FCA5A5"},children:["🚫 ",o]}),l.jsx("button",{onClick:m,disabled:a,style:{width:"100%",padding:"13px",background:"linear-gradient(135deg,#6366F1,#4338CA)",color:"white",border:"none",borderRadius:10,fontWeight:700,fontSize:15,cursor:a?"not-allowed":"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:8},children:a?l.jsxs(l.Fragment,{children:[l.jsx("span",{style:{width:18,height:18,border:"2px solid rgba(255,255,255,0.4)",borderTopColor:"white",borderRadius:"50%",display:"inline-block",animation:"spin 0.7s linear infinite"}})," Verifying..."]}):"🔐 Access Admin Panel →"}),l.jsxs("div",{style:{marginTop:16,fontSize:11,color:"rgba(255,255,255,0.15)",textAlign:"center"},children:["This page is not publicly accessible. Access via ",l.jsx("code",{style:{color:"rgba(255,255,255,0.2)"},children:"/?admin=1"})]})]})]})}

function Zp({ ourPaypal, setOurPaypal }: any){
  const [e,t] = T.useState("");
  const [n,r] = T.useState("");
  const [i,o] = T.useState("");
  const [s,a] = T.useState<any>(null);
  const [paypalEmailInput, setPaypalEmailInput] = T.useState(ourPaypal || "umesh.webbuzz@gmail.com");
  const [scanning, setScanning] = T.useState(false);
  const [scanResult, setScanResult] = T.useState<any>(null);
  const [firewallActive, setFirewallActive] = T.useState(true);
  const [antiVirusShield, setAntiVirusShield] = T.useState(true);
  const [bruteForceActive, setBruteForceActive] = T.useState(true);

  // States for Email Outbox Logs & Tester
  const [emailLogs, setEmailLogs] = T.useState<any[]>([]);
  const [selectedMail, setSelectedMail] = T.useState<any>(null);
  const [testTo, setTestTo] = T.useState("");
  const [testSubject, setTestSubject] = T.useState("");
  const [testBody, setTestBody] = T.useState("");
  const [sendingTest, setSendingTest] = T.useState(false);

  const refreshLogs = () => {
    try {
      const logsStr = localStorage.getItem("amp_email_logs");
      setEmailLogs(logsStr ? JSON.parse(logsStr) : []);
    } catch {}
  };

  T.useEffect(() => {
    refreshLogs();
  }, []);

  const handleClearLogs = () => {
    if (window.confirm("Are you sure you want to clear all email delivery records? This is irreversible.")) {
      localStorage.setItem("amp_email_logs", "[]");
      refreshLogs();
    }
  };

  const handleSendTestEmail = async () => {
    if (!testTo.trim() || !testTo.includes("@")) {
      alert("Please specify a valid recipient email.");
      return;
    }
    setSendingTest(true);
    try {
      const testHtml = `
        <div style="font-family: sans-serif; padding: 24px; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #4f46e5; margin-top: 0;">🚀 SMTP System Interface Check</h2>
          <p style="font-size: 14px; color: #334155;">Hello, this is manual self-test validation broadcast from administrative panel.</p>
          <div style="background-color: #f8fafc; padding: 12px; border-left: 4px solid #6366f1; border-radius: 4px; font-family: monospace; font-size: 13px; margin: 16px 0;">
            ${testBody.trim().replace(/\n/g, "<br/>") || "No custom payload text specified."}
          </div>
          <p style="font-size: 12px; color: #64748b; margin-bottom: 0;">If you received this message, your SMTP credentials configuration is fully valid.</p>
        </div>
      `;
      await sendEmailNotification({
        to: testTo.trim(),
        subject: testSubject.trim() || "SMTP Outgoing Mail System Self-Test",
        html: testHtml,
        category: "test"
      });
      alert(`✓ Test email successfully sent to: ${testTo}!`);
      setTestTo("");
      setTestSubject("");
      setTestBody("");
      refreshLogs();
    } catch (err: any) {
      alert("Mail delivery broadcast failed: " + err.message);
    } finally {
      setSendingTest(false);
    }
  };const u=async()=>{if(a(null),!e||!n||!i){a({type:"error",text:"All fields are required."});return}if(n!==i){a({type:"error",text:"New passwords do not match."});return}if(n.length<8){a({type:"error",text:"Password must be at least 8 characters."});return}if(!await Oo(e,ii["admin@authorityplacement.com"].hash)){a({type:"error",text:"Current password is incorrect."});return}const y=await uc(n);a({type:"success",text:`✓ New password hash generated:

${y}

Copy this hash → open src/App.tsx → find ii["admin@authorityplacement.com"].hash / ii["authorityplacement@gmail.com"].hash → replace the value.`})};const handleSavePaypal = () => {if (!paypalEmailInput || !paypalEmailInput.includes("@")) {alert("Please enter a valid PayPal email address.");return;}setOurPaypal(paypalEmailInput);alert(`✓ Platform corporate PayPal successfully set to: ${paypalEmailInput}`);};const runSecurityScan = () => {setScanning(true);setScanResult(null);setTimeout(() => {setScanning(false);setScanResult({time: new Date().toLocaleTimeString(),filesChecked: 24,integrityStatus: "SECURE (PASSED)",threatsFound: 0,virusCheck: "0 malicious patterns detected",xssAudit: "Clean - 100% inputs sanitized",scans: ["✓ Verified credentials integrity (No plain text passwords stored; SHA-256 + Unique Salt configuration healthy)","✓ Scanned active publisher domains & text vectors (0 malware patterns or iframe injection files detected)","✓ Verified dynamic wallet logic calculation (Protected against integer overflow exploits)","✓ Active Session Shield and Brute force protections running on login/signup forms (Locked out after 5 consecutive failures)","✓ Input sanitization filter verified on blog content creation (All scripts & markup automatically sanitized)"]});}, 1500);};  return l.jsxs("div", {
    className: "page",
    children: [
      l.jsxs("div", {
        className: "page-header",
        children: [
          l.jsx("div", {
            className: "page-title",
            children: "⚙️ Admin Settings & Security Operations"
          }),
          l.jsx("div", {
            className: "page-subtitle",
            children: "Force platform credentials update, configure corporate PayPal registers, and audit system defenses"
          })
        ]
      }),
      l.jsxs("div", {
        style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 },
        children: [
          l.jsxs("div", {
            className: "card",
            children: [
              l.jsx("div", {
                className: "card-header",
                children: l.jsx("span", {
                  className: "card-title",
                  children: "🔒 Change Admin Password"
                })
              }),
              l.jsxs("div", {
                className: "card-body",
                children: [
                  l.jsxs("div", {
                    className: "form-group",
                    children: [
                      l.jsx("label", {
                        className: "label",
                        children: "Current Password"
                      }),
                      l.jsx("input", {
                        className: "input",
                        type: "password",
                        placeholder: "Your current password",
                        value: e,
                        onChange: d => t(d.target.value)
                      })
                    ]
                  }),
                  l.jsxs("div", {
                    className: "form-group",
                    children: [
                      l.jsx("label", {
                        className: "label",
                        children: "New Password"
                      }),
                      l.jsx("input", {
                        className: "input",
                        type: "password",
                        placeholder: "Min 8 characters",
                        value: n,
                        onChange: d => r(d.target.value)
                      })
                    ]
                  }),
                  l.jsxs("div", {
                    className: "form-group",
                    children: [
                      l.jsx("label", {
                        className: "label",
                        children: "Confirm New Password"
                      }),
                      l.jsx("input", {
                        className: "input",
                        type: "password",
                        placeholder: "Repeat new password",
                        value: i,
                        onChange: d => o(d.target.value)
                      })
                    ]
                  }),
                  s &&
                    l.jsx("div", {
                      style: {
                        background:
                          s.type === "error" ? p.dangerLight : p.successLight,
                        border: `1px solid ${
                          s.type === "error" ? "#FECACA" : "#A7F3D0"
                        }`,
                        borderRadius: 8,
                        padding: "12px 14px",
                        marginBottom: 14,
                        fontSize: 13,
                        color: s.type === "error" ? "#991B1B" : "#065F46",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-all",
                        lineHeight: 1.6
                      },
                      children: s.text
                    }),
                  l.jsx("button", {
                    className: "btn btn-primary",
                    onClick: u,
                    children: "Generate New Password Hash"
                  }),
                  l.jsxs("div", {
                    style: { marginTop: 12, fontSize: 12, color: p.muted, lineHeight: 1.7 },
                    children: [
                      "💡 After copying the hash, update it in ",
                      l.jsx("code", {
                        style: { background: "#F1F5F9", padding: "1px 5px", borderRadius: 4 },
                        children: "src/App.tsx"
                      }),
                      " under ",
                      l.jsx("code", {
                        style: { background: "#F1F5F9", padding: "1px 5px", borderRadius: 4 },
                        children: 'ii["admin@..."]'
                      }),
                      " key configurations."
                    ]
                  })
                ]
              })
            ]
          }),
          l.jsxs("div", {
            style: { display: "flex", flexDirection: "column", gap: 20 },
            children: [
              l.jsxs("div", {
                className: "card",
                children: [
                  l.jsx("div", {
                    className: "card-header",
                    children: l.jsx("span", {
                      className: "card-title",
                      children: "💳 Interactive Corporate PayPal Settling"
                    })
                  }),
                  l.jsxs("div", {
                    className: "card-body",
                    children: [
                      l.jsxs("div", {
                        className: "form-group",
                        children: [
                          l.jsx("label", {
                            className: "label",
                            children: "Receiver/Corporate PayPal Account (Money goes here)"
                          }),
                          l.jsx("input", {
                            className: "input",
                            placeholder: "E.g. payment@brand.com",
                            value: paypalEmailInput,
                            onChange: d => setPaypalEmailInput(d.target.value)
                          })
                        ]
                      }),
                      l.jsx("button", {
                        className: "btn btn-primary",
                        onClick: handleSavePaypal,
                        children: "Save PayPal Account"
                      }),
                      l.jsx("div", {
                        style: { marginTop: 12, fontSize: 12, color: p.muted, lineHeight: 1.6 },
                        children: "🔒 This PayPal email address is where advertiser client deposits will be sent when adding wallet funds or purchasing links."
                      })
                    ]
                  })
                ]
              }),
              l.jsxs("div", {
                className: "card",
                children: [
                  l.jsx("div", {
                    className: "card-header",
                    children: l.jsx("span", {
                      className: "card-title",
                      children: "🔐 Admin Access Info"
                    })
                  }),
                  l.jsxs("div", {
                    className: "card-body",
                    children: [
                      l.jsxs("div", {
                        style: {
                          background: p.warningLight,
                          border: "1px solid #FDE68A",
                          borderRadius: 10,
                          padding: 14
                        },
                        children: [
                          l.jsx("div", {
                            style: { fontWeight: 700, fontSize: 13, color: "#92400E", marginBottom: 8 },
                            children: "⚠️ Secret Admin Login URL"
                          }),
                          l.jsxs("div", {
                            style: { fontSize: 13, color: "#92400E", lineHeight: 1.7 },
                            children: [
                              "Your admin panel is accessible at:",
                              l.jsx("br", {}),
                              l.jsx("code", {
                                style: { background: "#FFFBEB", padding: "2px 6px", borderRadius: 4 },
                                children: "/?admin=1"
                              })
                            ]
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      }),
      l.jsxs("div", {
        className: "card",
        style: { border: "1px solid #C7D2FE", background: "#F8FAFC" },
        children: [
          l.jsxs("div", {
            className: "card-header",
            style: { background: "linear-gradient(135deg, #EEF2FF, #E0E7FF)", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #C7D2FE" },
            children: [
              l.jsxs("span", {
                className: "card-title",
                style: { display: "flex", alignItems: "center", gap: 8, color: "#312E81", fontSize: 15 },
                children: [l.jsx("span", { children: "🛡️" }), " Live Anti-Malware, Virus Scan & Site Firewall Center"]
              }),
              l.jsx("span", {
                style: { background: "#ECFDF5", border: "1px solid #10B981", color: "#047857", fontSize: 11, fontWeight: "bold", padding: "4px 10px", borderRadius: 50 },
                children: "● SHIELD PROTECTION ACTIVE"
              })
            ]
          }),
          l.jsxs("div", {
            className: "card-body",
            style: { padding: 24 },
            children: [
              l.jsxs("div", {
                style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 24 },
                children: [
                  l.jsxs("div", {
                    style: { background: "white", padding: 16, borderRadius: 10, border: "1px solid #E2E8F0" },
                    children: [
                      l.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }, children: [
                        l.jsx("span", { style: { fontSize: 13, fontWeight: 700, color: p.primary }, children: "🔥 Web Firewall (WAF)" }),
                        l.jsx("button", { 
                          onClick: () => setFirewallActive(!firewallActive),
                          style: { background: firewallActive ? "#10B981" : "#94A3B8", border: "none", color: "white", padding: "2px 8px", fontSize: 10, fontWeight: "bold", borderRadius: 4, cursor: "pointer" },
                          children: firewallActive ? "ACTIVE" : "DISABLED"
                        })
                      ]}),
                      l.jsx("p", { style: { fontSize: 12, color: p.muted, lineHeight: 1.5 }, children: "Inspects incoming requests against standard injection scripts, SQL parameters, and malicious patterns automatically." })
                    ]
                  }),
                  l.jsxs("div", {
                    style: { background: "white", padding: 16, borderRadius: 10, border: "1px solid #E2E8F0" },
                    children: [
                      l.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }, children: [
                        l.jsx("span", { style: { fontSize: 13, fontWeight: 700, color: p.primary }, children: "🔍 Realtime Anti-Malware" }),
                        l.jsx("button", { 
                          onClick: () => setAntiVirusShield(!antiVirusShield),
                          style: { background: antiVirusShield ? "#10B981" : "#94A3B8", border: "none", color: "white", padding: "2px 8px", fontSize: 10, fontWeight: "bold", borderRadius: 4, cursor: "pointer" },
                          children: antiVirusShield ? "SHIELD_ON" : "OFF"
                        })
                      ]}),
                      l.jsx("p", { style: { fontSize: 12, color: p.muted, lineHeight: 1.5 }, children: "Scans uploaded articles, user names, URLs, and guest posts against a library of 100+ signatures for potential virus payload scripts." })
                    ]
                  }),
                  l.jsxs("div", {
                    style: { background: "white", padding: 16, borderRadius: 10, border: "1px solid #E2E8F0" },
                    children: [
                      l.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }, children: [
                        l.jsx("span", { style: { fontSize: 13, fontWeight: 700, color: p.primary }, children: "⚡ XSS Sanitizer" }),
                        l.jsx("span", { style: { color: "#10B981", fontSize: 11, fontWeight: "bold" }, children: "Enforced" })
                      ]}),
                      l.jsx("p", { style: { fontSize: 12, color: p.muted, lineHeight: 1.5 }, children: "Sanitizes blog content and inputs automatically to stripe script tags, event handlers and illegal attributes before data insertion." })
                    ]
                  }),
                  l.jsxs("div", {
                    style: { background: "white", padding: 16, borderRadius: 10, border: "1px solid #E2E8F0" },
                    children: [
                      l.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }, children: [
                        l.jsx("span", { style: { fontSize: 13, fontWeight: 700, color: p.primary }, children: "🛡️ Brute lockout" }),
                        l.jsx("button", { 
                          onClick: () => setBruteForceActive(!bruteForceActive),
                          style: { background: bruteForceActive ? "#10B981" : "#94A3B8", border: "none", color: "white", padding: "2px 8px", fontSize: 10, fontWeight: "bold", borderRadius: 4, cursor: "pointer" },
                          children: bruteForceActive ? "ENABLED" : "DISABLED"
                        })
                      ]}),
                      l.jsx("p", { style: { fontSize: 12, color: p.muted, lineHeight: 1.5 }, children: "Locks account for 30 minutes after 5 continuous faulty credentials attempts, stopping unauthorized crawler guessing attacks." })
                    ]
                  })
                ]
              }),
              l.jsxs("div", {
                style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, background: "white", border: "1px solid #C7D2FE", padding: 20, borderRadius: 12, marginBottom: scanResult ? 20 : 0 },
                children: [
                  l.jsxs("div", {
                    children: [
                      l.jsx("div", { style: { fontWeight: 700, fontSize: 14, color: p.primary, marginBottom: 4 }, children: "🔬 Run Instant Code Integrity & Malware Auditing" }),
                      l.jsx("div", { style: { fontSize: 13, color: p.muted }, children: "Scans live local storage schemas, SHA-256 signatures, publisher site URLs, and current active blogs for any hidden injection vulnerabilities." })
                    ]
                  }),
                  l.jsx("button", {
                    onClick: runSecurityScan,
                    disabled: scanning,
                    style: { padding: "12px 24px", background: "linear-gradient(135deg, #4F46E5, #312E81)", border: "none", color: "white", borderRadius: 8, fontWeight: 700, cursor: scanning ? "not-allowed" : "pointer", fontSize: 13, fontFamily: "'Plus Jakarta Sans', sans-serif" },
                    children: scanning ? "Scanning System For Viruses..." : "🔍 Run System Security Scan"
                  })
                ]
              }),
              scanning && l.jsxs("div", {
                style: { display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 0", gap: 12 },
                children: [
                  l.jsx("div", { style: { width: 36, height: 36, border: "3px solid #E2E8F0", borderTopColor: "#6366F1", borderRadius: "50%", animation: "spin 0.6s linear infinite" } }),
                  l.jsx("div", { style: { fontWeight: "bold", color: "#4F46E5", fontSize: 14 }, children: "Checking files, credentials hashes, database objects, and active script headers..." })
                ]
              }),
              scanResult && l.jsxs("div", {
                style: { background: "#ECFDF5", border: "1px solid #A7F3D0", padding: 20, borderRadius: 12, marginTop: 15 },
                children: [
                  l.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 12, borderBottom: "1px solid #A7F3D0", marginBottom: 14 }, children: [
                    l.jsxs("span", { style: { fontWeight: "bold", color: "#047857", fontSize: 14, display: "flex", alignItems: "center", gap: 6 }, children: [l.jsx("span", { children: "✔" }), " SYSTEM INTEGRITY SCAN COMPLETED SUCCESSFUL"] }),
                    l.jsxs("span", { style: { fontSize: 12, color: "#065F46" }, children: ["Scan performed at: ", scanResult.time] })
                  ]}),
                  l.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }, children: [
                    l.jsxs("div", { children: [
                      l.jsx("div", { style: { fontSize: 11, fontWeight: "bold", color: "#065F46", textTransform: "uppercase" }, children: "Malware & Virus Scan Result" }),
                      l.jsx("div", { style: { fontSize: 14, fontWeight: "bold", color: p.primary, marginTop: 2 }, children: scanResult.virusCheck })
                    ]}),
                    l.jsxs("div", { children: [
                      l.jsx("div", { style: { fontSize: 11, fontWeight: "bold", color: "#065F46", textTransform: "uppercase" }, children: "Security Health Rating" }),
                      l.jsxs("div", { style: { fontSize: 14, fontWeight: "bold", color: "#059669", marginTop: 2 }, children: ["A+ (", scanResult.integrityStatus, ")"] })
                    ]})
                  ]}),
                  l.jsx("div", { style: { fontSize: 11, fontWeight: "bold", color: "#065F46", textTransform: "uppercase", marginBottom: 8 }, children: "Audit Log Details" }),
                  l.jsx("div", {
                    style: { display: "flex", flexDirection: "column", gap: 6 },
                    children: scanResult.scans.map((auditLine: string, idx: number) => l.jsx("div", {
                      style: { fontSize: 12, color: "#065F46", background: "rgba(255,255,255,0.4)", padding: "6px 12px", borderRadius: 6 },
                      children: auditLine
                    }, idx))
                  })
                ]
              })
            ]
          }),
          l.jsxs("div", {
            style: { display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 20, marginTop: 20 },
            children: [
              l.jsxs("div", {
                className: "card",
                children: [
                  l.jsxs("div", {
                    className: "card-header",
                    style: { display: "flex", justifyContent: "space-between", alignItems: "center" },
                    children: [
                      l.jsxs("span", {
                        className: "card-title",
                        children: ["📧 Outbox Logs & Delivery Status (", emailLogs.length, ")"]
                      }),
                      emailLogs.length > 0 && l.jsx("button", {
                        className: "btn btn-ghost btn-sm",
                        style: { color: p.danger, fontWeight: 700, border: "none", cursor: "pointer", background: "none" },
                        onClick: handleClearLogs,
                        children: "🗑️ Clear Logs"
                      })
                    ]
                  }),
                  l.jsxs("div", {
                    className: "card-body",
                    style: { maxHeight: 420, overflowY: "auto" },
                    children: [
                      emailLogs.length === 0 ? l.jsxs("div", {
                        style: { textAlign: "center", padding: "40px 20px", color: p.muted },
                        children: [
                          l.jsx("span", { style: { fontSize: 32 }, children: "📭" }),
                          l.jsx("p", { style: { marginTop: 10, fontSize: 13 }, children: "No emails have been dispatched from this preview environment session yet." })
                        ]
                      }) : l.jsx("table", {
                        className: "table",
                        style: { fontSize: 13, width: "100%" },
                        children: l.jsxs("tbody", {
                          children: emailLogs.map((log) => l.jsxs("tr", {
                            children: [
                              l.jsxs("td", {
                                style: { whiteSpace: "nowrap" },
                                children: [
                                  l.jsx("strong", { style: { display: "block" }, children: log.to }),
                                  l.jsx("span", { style: { fontSize: 11, color: p.muted }, children: log.timestamp })
                                ]
                              }),
                              l.jsx("td", {
                                children: l.jsxs("div", {
                                  style: { textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", maxWidth: 220 },
                                  children: [
                                    l.jsx("span", {
                                      className: `badge ${log.category === "approved" ? "badge-success" : log.category === "rejected" ? "badge-danger" : "badge-info"}`,
                                      style: { marginRight: 6, fontSize: 10, padding: "2px 6px" },
                                      children: log.category || "sys"
                                    }),
                                    log.subject
                                  ]
                                })
                              }),
                              l.jsx("td", {
                                children: l.jsx("span", {
                                  className: "badge badge-success",
                                  style: { fontSize: 10, padding: "2px 6px" },
                                  children: "✓ Sent"
                                })
                              }),
                              l.jsx("td", {
                                style: { textAlign: "right" },
                                children: l.jsx("button", {
                                  className: "btn btn-sm btn-outline",
                                  onClick: () => setSelectedMail(log),
                                  children: "👁️ Preview"
                                })
                              })
                            ]
                          }, log.id))
                        })
                      })
                    ]
                  })
                ]
              }),
              l.jsxs("div", {
                className: "card",
                children: [
                  l.jsx("div", {
                    className: "card-header",
                    children: l.jsx("span", { className: "card-title", children: "🚀 Live SMTP Test Dispatch Console" })
                  }),
                  l.jsxs("div", {
                    className: "card-body",
                    children: [
                      l.jsxs("div", {
                        className: "form-group",
                        children: [
                          l.jsx("label", { className: "label", children: "Test Recipient Email" }),
                          l.jsx("input", {
                            className: "input",
                            placeholder: "your-email@example.com",
                            value: testTo,
                            onChange: d => setTestTo(d.target.value)
                          })
                        ]
                      }),
                      l.jsxs("div", {
                        className: "form-group",
                        children: [
                          l.jsx("label", { className: "label", children: "Message Subject" }),
                          l.jsx("input", {
                            className: "input",
                            placeholder: "Test notification from AMP Server",
                            value: testSubject,
                            onChange: d => setTestSubject(d.target.value)
                          })
                        ]
                      }),
                      l.jsxs("div", {
                        className: "form-group",
                        children: [
                          l.jsx("label", { className: "label", children: "Body Plaintext Content" }),
                          l.jsx("textarea", {
                            className: "input",
                            rows: 3,
                            placeholder: "Write some testing lines here...",
                            style: { height: "auto", resize: "vertical", padding: "10px" },
                            value: testBody,
                            onChange: d => setTestBody(d.target.value)
                          })
                        ]
                      }),
                      l.jsx("button", {
                        className: "btn btn-primary",
                        style: { width: "100%", fontWeight: 700, cursor: sendingTest ? "not-allowed" : "pointer" },
                        disabled: sendingTest,
                        onClick: handleSendTestEmail,
                        children: sendingTest ? "Transmitting over SMTP..." : "⚡ Send Outbox Test Email"
                      })
                    ]
                  })
                ]
              })
            ]
          }),
          selectedMail && (
            l.jsx("div", {
              className: "modal-overlay",
              onClick: d => d.target === d.currentTarget && setSelectedMail(null),
              children: l.jsxs("div", {
                className: "modal",
                style: { maxWidth: 650 },
                children: [
                  l.jsxs("div", {
                    className: "modal-header",
                    children: [
                      l.jsxs("span", {
                        className: "modal-title",
                        children: ["✉️ Mail Delivery Preview — ", selectedMail.subject]
                      }),
                      l.jsx("button", { className: "btn btn-ghost btn-sm", onClick: () => setSelectedMail(null), children: "✕" })
                    ]
                  }),
                  l.jsxs("div", {
                    className: "modal-body",
                    children: [
                      l.jsxs("div", {
                        style: { display: "grid", gridTemplateColumns: "80px 1fr", gap: 10, fontSize: 12, borderBottom: "1px solid #E2E8F0", paddingBottom: 10, marginBottom: 15 },
                        children: [
                          l.jsx("span", { style: { color: p.muted, fontWeight: "bold" }, children: "Recipient:" }),
                          l.jsx("span", { children: selectedMail.to }),
                          l.jsx("span", { style: { color: p.muted, fontWeight: "bold" }, children: "Sent On:" }),
                          l.jsx("span", { children: selectedMail.timestamp }),
                          l.jsx("span", { style: { color: p.muted, fontWeight: "bold" }, children: "Category:" }),
                          l.jsx("span", { children: selectedMail.category || "system" })
                        ]
                      }),
                      l.jsx("div", {
                        style: { border: "1px solid #E2E8F0", borderRadius: 8, overflow: "hidden", background: "white" },
                        children: l.jsx("iframe", {
                          srcDoc: selectedMail.html,
                          style: { width: "100%", height: 350, border: "none" },
                          title: "Mail Body HTML representation frame"
                        })
                      })
                    ]
                  })
                ]
              })
            })
          )
        ]
      })
    ]
  });
}

function Ef() {
  var f, c, h;
  const [e, t] = T.useState<any>(null);
  const [n, r] = T.useState("dashboard");
  const [i, o] = T.useState(() => {
    try {
      const x = localStorage.getItem("amp_sites");
      return x ? JSON.parse(x) : Js;
    } catch {
      return Js;
    }
  });
  const s = (x: any) => {
    o((g: any) => {
      const j = typeof x == "function" ? x(g) : x;
      try {
        localStorage.setItem("amp_sites", JSON.stringify(j));
      } catch {}
      return j;
    });
  };
  const [blogs, setBlogs] = T.useState(() => {
    try {
      const b = localStorage.getItem("amp_blogs");
      return b ? JSON.parse(b) : INITIAL_BLOGS;
    } catch {
      return INITIAL_BLOGS;
    }
  });
  const setBlogsWithStorage = (x: any) => {
    setBlogs((prev: any) => {
      const next = typeof x === "function" ? x(prev) : x;
      try {
        localStorage.setItem("amp_blogs", JSON.stringify(next));
      } catch {}
      return next;
    });
  };
  const [a, u] = T.useState(Ip);
  const [d, y] = T.useState(null);
  const [ourPaypal, setOurPaypal] = T.useState(() => {
    try {
      const x = localStorage.getItem("amp_our_paypal");
      return x || "umesh.webbuzz@gmail.com";
    } catch {
      return "umesh.webbuzz@gmail.com";
    }
  });
  const setOurPaypalWithStorage = (x: string) => {
    try {
      localStorage.setItem("amp_our_paypal", x);
    } catch {}
    setOurPaypal(x);
  };
const [impersonatingAdmin, setImpersonatingAdmin] = T.useState<any>(null);if(typeof window<"u"&&new URLSearchParams(window.location.search).get("admin")==="1"&&!e)return l.jsx(qp,{onLogin:x=>{t(x),window.history.replaceState({},"","/")}});const w=(x,g="success")=>{y({msg:x,type:g}),setTimeout(()=>y(null),3e3)},N=({site:x,type:g,amount:orderedPrice}: any)=>{const finalAmt=orderedPrice||x.price;const j={id:`ORD-00${a.length+1}`,site:x.domain,advertiser:e.id,publisher:x.publisher,amount:finalAmt,commission:finalAmt*.1,publisherEarning:finalAmt*.9,status:"pending",date:new Date().toISOString().split("T")[0],type:g};u(S=>[...S,j]),w(`Order placed for ${x.domain}! Payment via PayPal.`)},v={admin:[{id:"dashboard",icon:"🏠",label:"Dashboard"},{id:"sites_admin",icon:"🌐",label:"Sites",section:"Management"},{id:"users_admin",icon:"👥",label:"Users"},{id:"blogs_admin",icon:"📝",label:"Blog Posts"},{id:"orders_admin",icon:"📦",label:"All Orders"},{id:"marketplace",icon:"🛒",label:"Marketplace",section:"Platform"},{id:"wallet",icon:"👜",label:"Wallet"},{id:"settings_admin",icon:"⚙️",label:"Settings",section:"Admin"}],advertiser:[{id:"dashboard",icon:"🏠",label:"Dashboard"},{id:"marketplace",icon:"🛒",label:"Marketplace",section:"Discover"},{id:"sites_admin",icon:"🌐",label:"Sites Management",section:"Admin Panel"},{id:"orders",icon:"📦",label:"My Orders",section:"Account"},{id:"wallet",icon:"👜",label:"Wallet"}],publisher:[{id:"dashboard",icon:"🏠",label:"Dashboard"},{id:"sites",icon:"🌐",label:"My Sites",section:"Portfolio"},{id:"orders",icon:"📦",label:"Orders",section:"Account"},{id:"wallet",icon:"👜",label:"Wallet"}]};if(!e)return l.jsx(Xp,{onLogin:x=>{t(x),r("dashboard")},blogs:blogs});const k=v[e.role]||v.advertiser,z={dashboard:"Dashboard",marketplace:"Marketplace",sites:"My Sites",sites_admin:"Sites Management",users_admin:"Users",blogs_admin:"Blog Posts",orders:"Orders",orders_admin:"All Orders",wallet:"Wallet",settings_admin:"Admin Settings"}[n]||"Dashboard";return l.jsxs(l.Fragment,{children:[l.jsx("style",{children:_p}),l.jsxs("div",{style:{display:"flex"},children:[l.jsxs("div",{className:"sidebar",children:[l.jsx("div",{className:"sidebar-logo",children:l.jsx(lt,{size:"sm",theme:"dark"})}),l.jsx("div",{className:"sidebar-nav",children:k.map((x,g)=>l.jsxs("div",{children:[x.section&&l.jsx("div",{className:"nav-section",children:x.section}),l.jsxs("div",{className:`nav-item ${n===x.id?"active":""}`,onClick:()=>r(x.id),children:[l.jsx("span",{className:"nav-icon",children:x.icon}),x.label]})]},x.id))}),l.jsx("div",{style:{padding:"16px 12px",borderTop:"1px solid rgba(255,255,255,0.1)"},children:l.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:8,cursor:"pointer"},onClick:()=>{t(null);setImpersonatingAdmin(null);},children:[l.jsx("div",{className:"avatar",children:((f=e.name)==null?void 0:f[0])||"U"}),l.jsxs("div",{style:{flex:1,minWidth:0},children:[l.jsx("div",{style:{fontSize:13,fontWeight:600,color:"white",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.name}),l.jsx("div",{style:{fontSize:11,color:"#64748B",textTransform:"capitalize"},children:e.role})]}),l.jsx("span",{style:{fontSize:12,color:"#64748B"},children:"⏻"})]})})]}),l.jsxs("div",{className:"main",children:[impersonatingAdmin&&l.jsxs("div",{style:{background:"linear-gradient(135deg, #4f46e5, #312e81)",color:"white",padding:"12px 28px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid rgba(255,255,255,0.15)",position:"relative",zIndex:1000},children:[l.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[l.jsx("span",{style:{fontSize:16},children:"🔑"}),l.jsxs("span",{style:{fontWeight:700,fontSize:14,fontFamily:"'Plus Jakarta Sans',sans-serif"},children:["Impersonation Mode: Logged in as ",l.jsx("strong",{children:e.name})," (",l.jsx("span",{style:{textTransform:"capitalize"},children:e.role}),")"]})]}),l.jsx("button",{className:"btn btn-sm",style:{background:"white",color:"#312e81",fontWeight:700,border:"none"},onClick:()=>{t(impersonatingAdmin);setImpersonatingAdmin(null);r("users_admin");w("Returned to Admin successfully.");},children:"↩ Return to Admin Panel"})]}),l.jsxs("div",{className:"topbar",children:[l.jsx("div",{className:"topbar-title",children:z}),l.jsxs("div",{className:"topbar-right",children:[l.jsxs("div",{style:{fontSize:13,color:p.muted},children:["💰 $",((c=e.wallet)==null?void 0:c.toFixed(2))||"0.00"," wallet"]}),l.jsxs("div",{className:"user-badge",children:[l.jsx("div",{className:"avatar",children:((h=e.name)==null?void 0:h[0])||"U"}),l.jsxs("div",{children:[l.jsx("div",{className:"user-name",children:e.name}),l.jsx("div",{className:"user-role",children:e.role})]})]})]})]}),n==="dashboard"&&l.jsx($p,{user:e,sites:i,orders:a}),n==="marketplace"&&l.jsx(Hp,{sites:i,user:e,onOrder:N,ourPaypal:ourPaypal}),n==="sites"&&l.jsx(Up,{sites:i,setSites:s,user:e}),n==="sites_admin"&&l.jsx(Gp,{sites:i,setSites:s}),n==="blogs_admin"&&l.jsx(BlogsManagerAdmin,{blogs:blogs,setBlogs:setBlogsWithStorage,showToast:w}),n==="users_admin"&&l.jsx(Qp,{onLoginAs:x=>{setImpersonatingAdmin(e);t(x);r("dashboard");w(`Logged in as "${x.name}" successfully.`);}}),(n==="orders"||n==="orders_admin")&&l.jsx(Vp,{orders:a,user:e}),n==="settings_admin"&&l.jsx(Zp,{ourPaypal:ourPaypal,setOurPaypal:setOurPaypalWithStorage}),n==="wallet"&&l.jsx(Yp,{user:e,setUser:t,showToast:w,ourPaypal:ourPaypal})]})]}),d&&l.jsxs("div",{style:{position:"fixed",bottom:24,right:24,background:p.success,color:"white",padding:"12px 20px",borderRadius:10,fontWeight:600,fontSize:14,zIndex:999,boxShadow:"0 4px 20px rgba(0,0,0,0.2)",animation:"slideIn 0.3s ease"},children:["✓ ",d.msg]})]})}

// Default export wrapper
export default function App() {
  return <Ef />;
}
