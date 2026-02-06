import type { Data } from "@puckeditor/core";
import type { DraftType } from "../lib/drafts";

// ============================================================
// TEMPLATE TYPE
// ============================================================
export type Template = {
  id: string;
  name: string;
  description: string;
  type: DraftType;
  data: Data;
  icon: string;
};

// ============================================================
// BLANK
// ============================================================
export const blankTemplate: Data = {
  content: [],
  root: { props: {} },
};

// ============================================================
// EMAIL TEMPLATES
// ============================================================

// --- 1. Welcome Email ---
export const welcomeEmailTemplate: Data = {
  content: [
    { type: "Section", props: { id: "e1-header", backgroundColor: "#4361ee", paddingTop: "32px", paddingBottom: "32px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "600px" } },
    { type: "Section", props: { id: "e1-body", backgroundColor: "#ffffff", paddingTop: "32px", paddingBottom: "32px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "600px" } },
    { type: "Section", props: { id: "e1-footer", backgroundColor: "#f8f9fa", paddingTop: "16px", paddingBottom: "16px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "600px" } },
  ],
  root: { props: {} },
  zones: {
    "e1-header:section-content": [
      { type: "Heading", props: { id: "e1-h1", text: "Welcome to Our Platform!", level: "h1", alignment: "center", color: "#ffffff" } },
      { type: "Text", props: { id: "e1-t1", content: "We're thrilled to have you on board. Get started by exploring all the features we have to offer.", alignment: "center", fontSize: "16px", color: "#e0e0ff" } },
    ],
    "e1-body:section-content": [
      { type: "Image", props: { id: "e1-img", src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80", alt: "Team collaboration", width: "100%", alignment: "center", borderRadius: "8px" } },
      { type: "Spacer", props: { id: "e1-s1", height: "16px" } },
      { type: "Heading", props: { id: "e1-h2", text: "Get Started in 3 Easy Steps", level: "h2", alignment: "center", color: "#1a1a2e" } },
      { type: "Text", props: { id: "e1-t2", content: "1. Complete your profile\n2. Explore our features\n3. Start creating amazing content", alignment: "center", fontSize: "16px", color: "#555555" } },
      { type: "Spacer", props: { id: "e1-s2", height: "16px" } },
      { type: "Button", props: { id: "e1-btn", label: "Get Started Now", url: "#", variant: "primary", size: "large", alignment: "center", color: "#4361ee", borderRadius: "50px" } },
    ],
    "e1-footer:section-content": [
      { type: "SocialLinks", props: { id: "e1-social", facebook: "https://facebook.com", twitter: "https://twitter.com", instagram: "https://instagram.com", linkedin: "https://linkedin.com", youtube: "", size: "small", alignment: "center", color: "#888888" } },
      { type: "Text", props: { id: "e1-t3", content: "\u00a9 2026 Your Company. All rights reserved.", alignment: "center", fontSize: "14px", color: "#999999" } },
    ],
  },
};

// --- 2. Newsletter ---
export const newsletterTemplate: Data = {
  content: [
    { type: "Section", props: { id: "nl-header", backgroundColor: "#1a1a2e", paddingTop: "24px", paddingBottom: "24px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "600px" } },
    { type: "Section", props: { id: "nl-featured", backgroundColor: "#ffffff", paddingTop: "32px", paddingBottom: "16px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "600px" } },
    { type: "Section", props: { id: "nl-articles", backgroundColor: "#f8f9fa", paddingTop: "24px", paddingBottom: "24px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "600px" } },
    { type: "Section", props: { id: "nl-footer", backgroundColor: "#1a1a2e", paddingTop: "16px", paddingBottom: "16px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "600px" } },
  ],
  root: { props: {} },
  zones: {
    "nl-header:section-content": [
      { type: "Heading", props: { id: "nl-h1", text: "Weekly Newsletter", level: "h2", alignment: "center", color: "#ffffff" } },
      { type: "Text", props: { id: "nl-t1", content: "February 2026 \u2022 Issue #42", alignment: "center", fontSize: "14px", color: "#8888aa" } },
    ],
    "nl-featured:section-content": [
      { type: "Image", props: { id: "nl-img", src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80", alt: "Featured article", width: "100%", alignment: "center", borderRadius: "8px" } },
      { type: "Spacer", props: { id: "nl-s1", height: "16px" } },
      { type: "Heading", props: { id: "nl-h2", text: "Featured: The Future of Visual Editing", level: "h3", alignment: "left", color: "#1a1a2e" } },
      { type: "Text", props: { id: "nl-t2", content: "Discover how visual block editors are changing the way teams create content. From drag-and-drop email builders to full landing page designers, the landscape is evolving fast.", alignment: "left", fontSize: "15px", color: "#555555" } },
      { type: "Button", props: { id: "nl-btn1", label: "Read Full Article", url: "#", variant: "primary", size: "medium", alignment: "left", color: "#4361ee", borderRadius: "6px" } },
    ],
    "nl-articles:section-content": [
      { type: "Heading", props: { id: "nl-h3", text: "More Stories", level: "h3", alignment: "left", color: "#1a1a2e" } },
      { type: "Divider", props: { id: "nl-d1", style: "solid", color: "#e0e0e0", thickness: "1px", width: "100%", alignment: "center", spacing: "8px" } },
      { type: "Text", props: { id: "nl-t3", content: "5 Tips for Better Email Campaigns\nLearn how to improve open rates and click-throughs with simple design principles.", alignment: "left", fontSize: "14px", color: "#555555" } },
      { type: "Divider", props: { id: "nl-d2", style: "solid", color: "#e0e0e0", thickness: "1px", width: "100%", alignment: "center", spacing: "8px" } },
      { type: "Text", props: { id: "nl-t4", content: "Product Update: New Block Types\nWe've added video embeds, social links, and multi-column layouts to the editor.", alignment: "left", fontSize: "14px", color: "#555555" } },
      { type: "Divider", props: { id: "nl-d3", style: "solid", color: "#e0e0e0", thickness: "1px", width: "100%", alignment: "center", spacing: "8px" } },
      { type: "Text", props: { id: "nl-t5", content: "Community Spotlight: User Templates\nSee what our community has been building with the Visual Block Editor.", alignment: "left", fontSize: "14px", color: "#555555" } },
    ],
    "nl-footer:section-content": [
      { type: "SocialLinks", props: { id: "nl-social", facebook: "https://facebook.com", twitter: "https://twitter.com", instagram: "https://instagram.com", linkedin: "https://linkedin.com", youtube: "", size: "small", alignment: "center", color: "#888888" } },
      { type: "Text", props: { id: "nl-t6", content: "You're receiving this because you subscribed. Unsubscribe anytime.", alignment: "center", fontSize: "12px", color: "#666666" } },
    ],
  },
};

// --- 3. Product Launch ---
export const productLaunchTemplate: Data = {
  content: [
    { type: "Section", props: { id: "pl-hero", backgroundColor: "#0f172a", paddingTop: "48px", paddingBottom: "48px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "600px" } },
    { type: "Section", props: { id: "pl-features", backgroundColor: "#ffffff", paddingTop: "32px", paddingBottom: "32px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "600px" } },
    { type: "Section", props: { id: "pl-cta", backgroundColor: "#4361ee", paddingTop: "32px", paddingBottom: "32px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "600px" } },
    { type: "Section", props: { id: "pl-footer", backgroundColor: "#f8f9fa", paddingTop: "16px", paddingBottom: "16px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "600px" } },
  ],
  root: { props: {} },
  zones: {
    "pl-hero:section-content": [
      { type: "Text", props: { id: "pl-t0", content: "INTRODUCING", alignment: "center", fontSize: "14px", color: "#4361ee" } },
      { type: "Heading", props: { id: "pl-h1", text: "The All-New Product Name", level: "h1", alignment: "center", color: "#ffffff" } },
      { type: "Text", props: { id: "pl-t1", content: "Reimagined from the ground up. Faster, smarter, and more beautiful than ever before.", alignment: "center", fontSize: "16px", color: "#94a3b8" } },
      { type: "Spacer", props: { id: "pl-s1", height: "16px" } },
      { type: "Image", props: { id: "pl-img", src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&q=80", alt: "Product shot", width: "100%", alignment: "center", borderRadius: "8px" } },
    ],
    "pl-features:section-content": [
      { type: "Heading", props: { id: "pl-h2", text: "What's New", level: "h2", alignment: "center", color: "#1a1a2e" } },
      { type: "Spacer", props: { id: "pl-s2", height: "8px" } },
      { type: "Text", props: { id: "pl-t2", content: "\u2705 Lightning-fast performance — 3x faster than before\n\u2705 Beautiful new interface — redesigned for clarity\n\u2705 AI-powered features — smart suggestions built-in\n\u2705 Team collaboration — work together in real time", alignment: "left", fontSize: "15px", color: "#444444" } },
    ],
    "pl-cta:section-content": [
      { type: "Heading", props: { id: "pl-h3", text: "Available Now", level: "h2", alignment: "center", color: "#ffffff" } },
      { type: "Text", props: { id: "pl-t3", content: "Be among the first to try it. Early adopters get 30% off.", alignment: "center", fontSize: "16px", color: "#d0d0ff" } },
      { type: "Spacer", props: { id: "pl-s3", height: "8px" } },
      { type: "Button", props: { id: "pl-btn", label: "Get Early Access", url: "#", variant: "outline", size: "large", alignment: "center", color: "#ffffff", borderRadius: "50px" } },
    ],
    "pl-footer:section-content": [
      { type: "Text", props: { id: "pl-t4", content: "\u00a9 2026 Your Company. All rights reserved.", alignment: "center", fontSize: "12px", color: "#999999" } },
    ],
  },
};

// --- 4. Event Invitation ---
export const eventInvitationTemplate: Data = {
  content: [
    { type: "Section", props: { id: "ev-header", backgroundColor: "#7c3aed", paddingTop: "48px", paddingBottom: "32px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "600px" } },
    { type: "Section", props: { id: "ev-details", backgroundColor: "#ffffff", paddingTop: "32px", paddingBottom: "32px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "600px" } },
    { type: "Section", props: { id: "ev-footer", backgroundColor: "#faf5ff", paddingTop: "16px", paddingBottom: "16px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "600px" } },
  ],
  root: { props: {} },
  zones: {
    "ev-header:section-content": [
      { type: "Text", props: { id: "ev-t0", content: "YOU'RE INVITED", alignment: "center", fontSize: "14px", color: "#c4b5fd" } },
      { type: "Heading", props: { id: "ev-h1", text: "Annual Tech Summit 2026", level: "h1", alignment: "center", color: "#ffffff" } },
      { type: "Text", props: { id: "ev-t1", content: "Join industry leaders for a day of insights, networking, and innovation.", alignment: "center", fontSize: "16px", color: "#ddd6fe" } },
    ],
    "ev-details:section-content": [
      { type: "Heading", props: { id: "ev-h2", text: "Event Details", level: "h3", alignment: "left", color: "#1a1a2e" } },
      { type: "Divider", props: { id: "ev-d1", style: "solid", color: "#e0e0e0", thickness: "1px", width: "100%", alignment: "center", spacing: "8px" } },
      { type: "Text", props: { id: "ev-t2", content: "\uD83D\uDCC5 Date: March 15, 2026\n\uD83D\uDD52 Time: 9:00 AM \u2013 5:00 PM\n\uD83D\uDCCD Location: Convention Center, San Francisco\n\uD83C\uDF9F\uFE0F Admission: Free (registration required)", alignment: "left", fontSize: "15px", color: "#444444" } },
      { type: "Spacer", props: { id: "ev-s1", height: "16px" } },
      { type: "Heading", props: { id: "ev-h3", text: "Featured Speakers", level: "h3", alignment: "left", color: "#1a1a2e" } },
      { type: "Text", props: { id: "ev-t3", content: "\u2022 Jane Smith \u2014 CEO, TechCorp\n\u2022 Alex Johnson \u2014 VP of Engineering, BuildCo\n\u2022 Maria Garcia \u2014 Lead Designer, CreativeLab", alignment: "left", fontSize: "14px", color: "#555555" } },
      { type: "Spacer", props: { id: "ev-s2", height: "16px" } },
      { type: "Button", props: { id: "ev-btn", label: "RSVP Now", url: "#", variant: "primary", size: "large", alignment: "center", color: "#7c3aed", borderRadius: "50px" } },
    ],
    "ev-footer:section-content": [
      { type: "Text", props: { id: "ev-t4", content: "Can't make it? Share this invitation with a colleague.", alignment: "center", fontSize: "13px", color: "#888888" } },
      { type: "SocialLinks", props: { id: "ev-social", facebook: "https://facebook.com", twitter: "https://twitter.com", instagram: "", linkedin: "https://linkedin.com", youtube: "", size: "small", alignment: "center", color: "#7c3aed" } },
    ],
  },
};

// --- 5. Order Confirmation ---
export const orderConfirmationTemplate: Data = {
  content: [
    { type: "Section", props: { id: "oc-header", backgroundColor: "#10b981", paddingTop: "32px", paddingBottom: "32px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "600px" } },
    { type: "Section", props: { id: "oc-body", backgroundColor: "#ffffff", paddingTop: "32px", paddingBottom: "32px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "600px" } },
    { type: "Section", props: { id: "oc-footer", backgroundColor: "#f0fdf4", paddingTop: "16px", paddingBottom: "16px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "600px" } },
  ],
  root: { props: {} },
  zones: {
    "oc-header:section-content": [
      { type: "Heading", props: { id: "oc-h1", text: "\u2705 Order Confirmed!", level: "h1", alignment: "center", color: "#ffffff" } },
      { type: "Text", props: { id: "oc-t1", content: "Thank you for your purchase. Your order is being processed.", alignment: "center", fontSize: "16px", color: "#d1fae5" } },
    ],
    "oc-body:section-content": [
      { type: "Heading", props: { id: "oc-h2", text: "Order Summary", level: "h3", alignment: "left", color: "#1a1a2e" } },
      { type: "Text", props: { id: "oc-t2", content: "Order #: 2026-0215-4837\nDate: February 6, 2026", alignment: "left", fontSize: "14px", color: "#666666" } },
      { type: "Divider", props: { id: "oc-d1", style: "solid", color: "#e0e0e0", thickness: "1px", width: "100%", alignment: "center", spacing: "16px" } },
      { type: "Text", props: { id: "oc-t3", content: "Premium Plan (Annual)  . . . . .  $199.00\nSetup Fee  . . . . . . . . . . . . . . . .  $0.00\n\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\nTotal: $199.00", alignment: "left", fontSize: "14px", color: "#333333" } },
      { type: "Divider", props: { id: "oc-d2", style: "solid", color: "#e0e0e0", thickness: "1px", width: "100%", alignment: "center", spacing: "16px" } },
      { type: "Text", props: { id: "oc-t4", content: "A receipt has been sent to your email address. You can access your account immediately.", alignment: "left", fontSize: "14px", color: "#555555" } },
      { type: "Spacer", props: { id: "oc-s1", height: "8px" } },
      { type: "Button", props: { id: "oc-btn", label: "Go to Dashboard", url: "#", variant: "primary", size: "medium", alignment: "center", color: "#10b981", borderRadius: "6px" } },
    ],
    "oc-footer:section-content": [
      { type: "Text", props: { id: "oc-t5", content: "Questions? Contact support@yourcompany.com\n\u00a9 2026 Your Company", alignment: "center", fontSize: "12px", color: "#888888" } },
    ],
  },
};

// --- 6. Password Reset ---
export const passwordResetTemplate: Data = {
  content: [
    { type: "Section", props: { id: "pr-header", backgroundColor: "#ffffff", paddingTop: "48px", paddingBottom: "16px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "600px" } },
    { type: "Section", props: { id: "pr-body", backgroundColor: "#ffffff", paddingTop: "16px", paddingBottom: "48px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "600px" } },
    { type: "Section", props: { id: "pr-footer", backgroundColor: "#f8f9fa", paddingTop: "16px", paddingBottom: "16px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "600px" } },
  ],
  root: { props: {} },
  zones: {
    "pr-header:section-content": [
      { type: "Heading", props: { id: "pr-h1", text: "\uD83D\uDD12 Password Reset", level: "h2", alignment: "center", color: "#1a1a2e" } },
    ],
    "pr-body:section-content": [
      { type: "Text", props: { id: "pr-t1", content: "Hi there,\n\nWe received a request to reset your password. Click the button below to choose a new password. This link will expire in 24 hours.", alignment: "center", fontSize: "15px", color: "#555555" } },
      { type: "Spacer", props: { id: "pr-s1", height: "16px" } },
      { type: "Button", props: { id: "pr-btn", label: "Reset My Password", url: "#", variant: "primary", size: "large", alignment: "center", color: "#ef4444", borderRadius: "50px" } },
      { type: "Spacer", props: { id: "pr-s2", height: "16px" } },
      { type: "Text", props: { id: "pr-t2", content: "If you didn't request this, you can safely ignore this email. Your password will not be changed.", alignment: "center", fontSize: "13px", color: "#999999" } },
    ],
    "pr-footer:section-content": [
      { type: "Divider", props: { id: "pr-d1", style: "solid", color: "#e0e0e0", thickness: "1px", width: "50%", alignment: "center", spacing: "8px" } },
      { type: "Text", props: { id: "pr-t3", content: "This is an automated message. Please do not reply.\n\u00a9 2026 Your Company", alignment: "center", fontSize: "12px", color: "#aaaaaa" } },
    ],
  },
};


// ============================================================
// WEB PAGE TEMPLATES
// ============================================================

// --- 1. Landing Page (existing) ---
export const landingPageTemplate: Data = {
  content: [
    { type: "Section", props: { id: "lp-hero", backgroundColor: "#1a1a2e", paddingTop: "64px", paddingBottom: "64px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "100%" } },
    { type: "Section", props: { id: "lp-features", backgroundColor: "#ffffff", paddingTop: "48px", paddingBottom: "48px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "1000px" } },
    { type: "Section", props: { id: "lp-cta", backgroundColor: "#4361ee", paddingTop: "48px", paddingBottom: "48px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "100%" } },
    { type: "Section", props: { id: "lp-footer", backgroundColor: "#1a1a2e", paddingTop: "32px", paddingBottom: "32px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "100%" } },
  ],
  root: { props: {} },
  zones: {
    "lp-hero:section-content": [
      { type: "Menu", props: { id: "lp-menu", items: "Home | #\nFeatures | #features\nPricing | #pricing\nContact | #contact", alignment: "center", color: "#ffffff", fontSize: "15px", separator: "\u00b7" } },
      { type: "Spacer", props: { id: "lp-s1", height: "32px" } },
      { type: "Heading", props: { id: "lp-h1", text: "Build Beautiful Pages in Minutes", level: "h1", alignment: "center", color: "#ffffff" } },
      { type: "Text", props: { id: "lp-t1", content: "The visual block editor that empowers your team to create stunning emails and web pages \u2014 no coding required.", alignment: "center", fontSize: "18px", color: "#b0b0cc" } },
      { type: "Spacer", props: { id: "lp-s2", height: "16px" } },
      { type: "Button", props: { id: "lp-btn1", label: "Start Building Free", url: "#", variant: "primary", size: "large", alignment: "center", color: "#4361ee", borderRadius: "50px" } },
    ],
    "lp-features:section-content": [
      { type: "Heading", props: { id: "lp-h2", text: "Everything You Need", level: "h2", alignment: "center", color: "#1a1a2e" } },
      { type: "Text", props: { id: "lp-t2", content: "A complete visual editor with all the blocks you need to create professional content.", alignment: "center", fontSize: "16px", color: "#666666" } },
      { type: "Spacer", props: { id: "lp-s3", height: "32px" } },
      { type: "Columns", props: { id: "lp-cols", layout: "33-33-33", gap: "24px", verticalAlign: "top" } },
    ],
    "lp-cols:column-0": [
      { type: "Heading", props: { id: "lp-f1h", text: "Drag & Drop", level: "h3", alignment: "center", color: "#4361ee" } },
      { type: "Text", props: { id: "lp-f1t", content: "Intuitive drag-and-drop interface. Build pages by simply moving blocks around.", alignment: "center", fontSize: "14px", color: "#666666" } },
    ],
    "lp-cols:column-1": [
      { type: "Heading", props: { id: "lp-f2h", text: "Responsive", level: "h3", alignment: "center", color: "#4361ee" } },
      { type: "Text", props: { id: "lp-f2t", content: "Every page looks great on desktop, tablet, and mobile. Automatically responsive.", alignment: "center", fontSize: "14px", color: "#666666" } },
    ],
    "lp-cols:column-2": [
      { type: "Heading", props: { id: "lp-f3h", text: "Brand Ready", level: "h3", alignment: "center", color: "#4361ee" } },
      { type: "Text", props: { id: "lp-f3t", content: "Lock in your brand colors, fonts, and styles. Every piece of content stays on-brand.", alignment: "center", fontSize: "14px", color: "#666666" } },
    ],
    "lp-cta:section-content": [
      { type: "Heading", props: { id: "lp-h3", text: "Ready to Get Started?", level: "h2", alignment: "center", color: "#ffffff" } },
      { type: "Text", props: { id: "lp-t3", content: "Join thousands of businesses building better content with our visual editor.", alignment: "center", fontSize: "18px", color: "#d0d0ff" } },
      { type: "Spacer", props: { id: "lp-s4", height: "16px" } },
      { type: "Button", props: { id: "lp-btn2", label: "Try It Free", url: "#", variant: "outline", size: "large", alignment: "center", color: "#ffffff", borderRadius: "50px" } },
    ],
    "lp-footer:section-content": [
      { type: "SocialLinks", props: { id: "lp-social", facebook: "https://facebook.com", twitter: "https://twitter.com", instagram: "https://instagram.com", linkedin: "https://linkedin.com", youtube: "https://youtube.com", size: "small", alignment: "center", color: "#888888" } },
      { type: "Divider", props: { id: "lp-d1", style: "solid", color: "#333355", thickness: "1px", width: "50%", alignment: "center", spacing: "16px" } },
      { type: "Text", props: { id: "lp-t4", content: "\u00a9 2026 Your Company. All rights reserved. | Privacy Policy | Terms of Service", alignment: "center", fontSize: "14px", color: "#777777" } },
    ],
  },
};

// --- 2. Business Homepage ---
export const businessHomepageTemplate: Data = {
  content: [
    { type: "Section", props: { id: "bh-nav", backgroundColor: "#ffffff", paddingTop: "16px", paddingBottom: "16px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "100%" } },
    { type: "Section", props: { id: "bh-hero", backgroundColor: "#f0f4ff", paddingTop: "64px", paddingBottom: "64px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "100%" } },
    { type: "Section", props: { id: "bh-services", backgroundColor: "#ffffff", paddingTop: "48px", paddingBottom: "48px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "1000px" } },
    { type: "Section", props: { id: "bh-about", backgroundColor: "#f8f9fa", paddingTop: "48px", paddingBottom: "48px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "800px" } },
    { type: "Section", props: { id: "bh-contact-cta", backgroundColor: "#4361ee", paddingTop: "48px", paddingBottom: "48px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "100%" } },
    { type: "Section", props: { id: "bh-footer", backgroundColor: "#1a1a2e", paddingTop: "24px", paddingBottom: "24px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "100%" } },
  ],
  root: { props: {} },
  zones: {
    "bh-nav:section-content": [
      { type: "Menu", props: { id: "bh-menu", items: "Your Brand | #\nServices | #services\nAbout | #about\nContact | #contact", alignment: "center", color: "#1a1a2e", fontSize: "15px", separator: "\u00b7" } },
    ],
    "bh-hero:section-content": [
      { type: "Heading", props: { id: "bh-h1", text: "We Help Businesses Grow", level: "h1", alignment: "center", color: "#1a1a2e" } },
      { type: "Text", props: { id: "bh-t1", content: "Professional services tailored to your needs. From strategy to execution, we're your trusted partner.", alignment: "center", fontSize: "18px", color: "#555555" } },
      { type: "Spacer", props: { id: "bh-s1", height: "16px" } },
      { type: "Button", props: { id: "bh-btn1", label: "Get a Free Consultation", url: "#contact", variant: "primary", size: "large", alignment: "center", color: "#4361ee", borderRadius: "6px" } },
    ],
    "bh-services:section-content": [
      { type: "Heading", props: { id: "bh-h2", text: "Our Services", level: "h2", alignment: "center", color: "#1a1a2e" } },
      { type: "Spacer", props: { id: "bh-s2", height: "24px" } },
      { type: "Columns", props: { id: "bh-cols", layout: "33-33-33", gap: "24px", verticalAlign: "top" } },
    ],
    "bh-cols:column-0": [
      { type: "Heading", props: { id: "bh-sv1h", text: "Consulting", level: "h3", alignment: "center", color: "#4361ee" } },
      { type: "Text", props: { id: "bh-sv1t", content: "Strategic guidance to help you make the right decisions and grow your business effectively.", alignment: "center", fontSize: "14px", color: "#666666" } },
    ],
    "bh-cols:column-1": [
      { type: "Heading", props: { id: "bh-sv2h", text: "Development", level: "h3", alignment: "center", color: "#4361ee" } },
      { type: "Text", props: { id: "bh-sv2t", content: "Custom software development and integrations built to scale with your business.", alignment: "center", fontSize: "14px", color: "#666666" } },
    ],
    "bh-cols:column-2": [
      { type: "Heading", props: { id: "bh-sv3h", text: "Marketing", level: "h3", alignment: "center", color: "#4361ee" } },
      { type: "Text", props: { id: "bh-sv3t", content: "Data-driven marketing strategies that connect you with your ideal customers.", alignment: "center", fontSize: "14px", color: "#666666" } },
    ],
    "bh-about:section-content": [
      { type: "Heading", props: { id: "bh-h3", text: "About Us", level: "h2", alignment: "center", color: "#1a1a2e" } },
      { type: "Text", props: { id: "bh-t2", content: "Founded in 2020, we've helped over 500 businesses transform their digital presence. Our team of experts brings decades of combined experience in technology, design, and business strategy.\n\nWe believe in building lasting partnerships with our clients, delivering measurable results, and staying ahead of industry trends.", alignment: "center", fontSize: "15px", color: "#555555" } },
    ],
    "bh-contact-cta:section-content": [
      { type: "Heading", props: { id: "bh-h4", text: "Let's Work Together", level: "h2", alignment: "center", color: "#ffffff" } },
      { type: "Text", props: { id: "bh-t3", content: "Ready to take your business to the next level? Reach out for a free consultation.", alignment: "center", fontSize: "16px", color: "#d0d0ff" } },
      { type: "Spacer", props: { id: "bh-s3", height: "8px" } },
      { type: "Button", props: { id: "bh-btn2", label: "Contact Us", url: "#", variant: "outline", size: "large", alignment: "center", color: "#ffffff", borderRadius: "6px" } },
    ],
    "bh-footer:section-content": [
      { type: "Text", props: { id: "bh-t4", content: "\u00a9 2026 Your Brand. All rights reserved.", alignment: "center", fontSize: "13px", color: "#888888" } },
    ],
  },
};

// --- 3. Portfolio / Showcase ---
export const portfolioTemplate: Data = {
  content: [
    { type: "Section", props: { id: "pf-hero", backgroundColor: "#0f172a", paddingTop: "64px", paddingBottom: "64px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "100%" } },
    { type: "Section", props: { id: "pf-work", backgroundColor: "#ffffff", paddingTop: "48px", paddingBottom: "48px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "1000px" } },
    { type: "Section", props: { id: "pf-about", backgroundColor: "#f8f9fa", paddingTop: "48px", paddingBottom: "48px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "800px" } },
    { type: "Section", props: { id: "pf-contact", backgroundColor: "#0f172a", paddingTop: "48px", paddingBottom: "48px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "100%" } },
  ],
  root: { props: {} },
  zones: {
    "pf-hero:section-content": [
      { type: "Text", props: { id: "pf-t0", content: "PORTFOLIO", alignment: "center", fontSize: "14px", color: "#4361ee" } },
      { type: "Heading", props: { id: "pf-h1", text: "Hi, I'm Alex. I Design Digital Experiences.", level: "h1", alignment: "center", color: "#ffffff" } },
      { type: "Text", props: { id: "pf-t1", content: "UI/UX Designer & Frontend Developer based in San Francisco", alignment: "center", fontSize: "16px", color: "#94a3b8" } },
      { type: "Spacer", props: { id: "pf-s1", height: "16px" } },
      { type: "Button", props: { id: "pf-btn1", label: "View My Work", url: "#work", variant: "primary", size: "large", alignment: "center", color: "#4361ee", borderRadius: "50px" } },
    ],
    "pf-work:section-content": [
      { type: "Heading", props: { id: "pf-h2", text: "Selected Work", level: "h2", alignment: "center", color: "#1a1a2e" } },
      { type: "Spacer", props: { id: "pf-s2", height: "24px" } },
      { type: "Columns", props: { id: "pf-cols", layout: "50-50", gap: "24px", verticalAlign: "top" } },
    ],
    "pf-cols:column-0": [
      { type: "Image", props: { id: "pf-img1", src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80", alt: "Project 1", width: "100%", alignment: "center", borderRadius: "8px" } },
      { type: "Heading", props: { id: "pf-p1h", text: "E-Commerce Redesign", level: "h4", alignment: "left", color: "#1a1a2e" } },
      { type: "Text", props: { id: "pf-p1t", content: "Complete UX overhaul for an online retailer, resulting in 40% increase in conversions.", alignment: "left", fontSize: "14px", color: "#666666" } },
    ],
    "pf-cols:column-1": [
      { type: "Image", props: { id: "pf-img2", src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80", alt: "Project 2", width: "100%", alignment: "center", borderRadius: "8px" } },
      { type: "Heading", props: { id: "pf-p2h", text: "SaaS Dashboard", level: "h4", alignment: "left", color: "#1a1a2e" } },
      { type: "Text", props: { id: "pf-p2t", content: "Analytics dashboard design for a B2B SaaS platform with 10,000+ daily users.", alignment: "left", fontSize: "14px", color: "#666666" } },
    ],
    "pf-about:section-content": [
      { type: "Heading", props: { id: "pf-h3", text: "About Me", level: "h2", alignment: "center", color: "#1a1a2e" } },
      { type: "Text", props: { id: "pf-t2", content: "With 8+ years of experience in digital design, I specialize in creating user-centered interfaces that balance aesthetics with functionality. I've worked with startups and Fortune 500 companies alike.", alignment: "center", fontSize: "15px", color: "#555555" } },
    ],
    "pf-contact:section-content": [
      { type: "Heading", props: { id: "pf-h4", text: "Let's Connect", level: "h2", alignment: "center", color: "#ffffff" } },
      { type: "Text", props: { id: "pf-t3", content: "Interested in working together? I'd love to hear from you.", alignment: "center", fontSize: "16px", color: "#94a3b8" } },
      { type: "Spacer", props: { id: "pf-s3", height: "8px" } },
      { type: "Button", props: { id: "pf-btn2", label: "Get in Touch", url: "mailto:hello@example.com", variant: "outline", size: "large", alignment: "center", color: "#ffffff", borderRadius: "50px" } },
      { type: "Spacer", props: { id: "pf-s4", height: "16px" } },
      { type: "SocialLinks", props: { id: "pf-social", facebook: "", twitter: "https://twitter.com", instagram: "https://instagram.com", linkedin: "https://linkedin.com", youtube: "", size: "medium", alignment: "center", color: "#888888" } },
    ],
  },
};

// --- 4. Coming Soon ---
export const comingSoonTemplate: Data = {
  content: [
    { type: "Section", props: { id: "cs-main", backgroundColor: "#0f172a", paddingTop: "0", paddingBottom: "0", paddingLeft: "32px", paddingRight: "32px", maxWidth: "100%" } },
  ],
  root: { props: {} },
  zones: {
    "cs-main:section-content": [
      { type: "Spacer", props: { id: "cs-s1", height: "96px" } },
      { type: "Text", props: { id: "cs-t0", content: "SOMETHING AMAZING IS", alignment: "center", fontSize: "14px", color: "#4361ee" } },
      { type: "Heading", props: { id: "cs-h1", text: "Coming Soon", level: "h1", alignment: "center", color: "#ffffff" } },
      { type: "Spacer", props: { id: "cs-s2", height: "8px" } },
      { type: "Text", props: { id: "cs-t1", content: "We're working hard to bring you something extraordinary.\nBe the first to know when we launch.", alignment: "center", fontSize: "18px", color: "#94a3b8" } },
      { type: "Spacer", props: { id: "cs-s3", height: "32px" } },
      { type: "Columns", props: { id: "cs-countdown", layout: "25-25-25-25", gap: "12px", verticalAlign: "center" } },
      { type: "Spacer", props: { id: "cs-s4", height: "32px" } },
      { type: "Button", props: { id: "cs-btn", label: "Notify Me at Launch", url: "#", variant: "primary", size: "large", alignment: "center", color: "#4361ee", borderRadius: "50px" } },
      { type: "Spacer", props: { id: "cs-s5", height: "32px" } },
      { type: "SocialLinks", props: { id: "cs-social", facebook: "https://facebook.com", twitter: "https://twitter.com", instagram: "https://instagram.com", linkedin: "", youtube: "", size: "medium", alignment: "center", color: "#555577" } },
      { type: "Spacer", props: { id: "cs-s6", height: "96px" } },
    ],
    "cs-countdown:column-0": [
      { type: "Heading", props: { id: "cs-d", text: "30", level: "h1", alignment: "center", color: "#4361ee" } },
      { type: "Text", props: { id: "cs-dl", content: "DAYS", alignment: "center", fontSize: "13px", color: "#94a3b8" } },
    ],
    "cs-countdown:column-1": [
      { type: "Heading", props: { id: "cs-h", text: "12", level: "h1", alignment: "center", color: "#4361ee" } },
      { type: "Text", props: { id: "cs-hl", content: "HOURS", alignment: "center", fontSize: "13px", color: "#94a3b8" } },
    ],
    "cs-countdown:column-2": [
      { type: "Heading", props: { id: "cs-m", text: "45", level: "h1", alignment: "center", color: "#4361ee" } },
      { type: "Text", props: { id: "cs-ml", content: "MINUTES", alignment: "center", fontSize: "13px", color: "#94a3b8" } },
    ],
    "cs-countdown:column-3": [
      { type: "Heading", props: { id: "cs-sec", text: "08", level: "h1", alignment: "center", color: "#4361ee" } },
      { type: "Text", props: { id: "cs-sl", content: "SECONDS", alignment: "center", fontSize: "13px", color: "#94a3b8" } },
    ],
  },
};

// --- 5. Pricing Page ---
export const pricingPageTemplate: Data = {
  content: [
    { type: "Section", props: { id: "pp-header", backgroundColor: "#1a1a2e", paddingTop: "48px", paddingBottom: "48px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "100%" } },
    { type: "Section", props: { id: "pp-plans", backgroundColor: "#ffffff", paddingTop: "48px", paddingBottom: "48px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "1000px" } },
    { type: "Section", props: { id: "pp-faq", backgroundColor: "#f8f9fa", paddingTop: "48px", paddingBottom: "48px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "800px" } },
    { type: "Section", props: { id: "pp-footer", backgroundColor: "#1a1a2e", paddingTop: "24px", paddingBottom: "24px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "100%" } },
  ],
  root: { props: {} },
  zones: {
    "pp-header:section-content": [
      { type: "Heading", props: { id: "pp-h1", text: "Simple, Transparent Pricing", level: "h1", alignment: "center", color: "#ffffff" } },
      { type: "Text", props: { id: "pp-t1", content: "No hidden fees. No surprises. Choose the plan that works for you.", alignment: "center", fontSize: "16px", color: "#b0b0cc" } },
    ],
    "pp-plans:section-content": [
      { type: "Columns", props: { id: "pp-cols", layout: "33-33-33", gap: "24px", verticalAlign: "top" } },
    ],
    "pp-cols:column-0": [
      { type: "Heading", props: { id: "pp-p1h", text: "Starter", level: "h3", alignment: "center", color: "#1a1a2e" } },
      { type: "Heading", props: { id: "pp-p1price", text: "$9/mo", level: "h2", alignment: "center", color: "#4361ee" } },
      { type: "Divider", props: { id: "pp-p1d", style: "solid", color: "#e0e0e0", thickness: "1px", width: "80%", alignment: "center", spacing: "8px" } },
      { type: "Text", props: { id: "pp-p1t", content: "\u2713 5 pages\n\u2713 Basic blocks\n\u2713 Email export\n\u2713 Community support", alignment: "center", fontSize: "14px", color: "#555555" } },
      { type: "Spacer", props: { id: "pp-p1s", height: "16px" } },
      { type: "Button", props: { id: "pp-p1btn", label: "Choose Starter", url: "#", variant: "outline", size: "medium", alignment: "center", color: "#4361ee", borderRadius: "6px" } },
    ],
    "pp-cols:column-1": [
      { type: "Heading", props: { id: "pp-p2h", text: "Professional", level: "h3", alignment: "center", color: "#1a1a2e" } },
      { type: "Heading", props: { id: "pp-p2price", text: "$29/mo", level: "h2", alignment: "center", color: "#4361ee" } },
      { type: "Divider", props: { id: "pp-p2d", style: "solid", color: "#e0e0e0", thickness: "1px", width: "80%", alignment: "center", spacing: "8px" } },
      { type: "Text", props: { id: "pp-p2t", content: "\u2713 Unlimited pages\n\u2713 All blocks\n\u2713 Email + Web export\n\u2713 Priority support\n\u2713 Custom branding", alignment: "center", fontSize: "14px", color: "#555555" } },
      { type: "Spacer", props: { id: "pp-p2s", height: "16px" } },
      { type: "Button", props: { id: "pp-p2btn", label: "Choose Professional", url: "#", variant: "primary", size: "medium", alignment: "center", color: "#4361ee", borderRadius: "6px" } },
    ],
    "pp-cols:column-2": [
      { type: "Heading", props: { id: "pp-p3h", text: "Enterprise", level: "h3", alignment: "center", color: "#1a1a2e" } },
      { type: "Heading", props: { id: "pp-p3price", text: "Custom", level: "h2", alignment: "center", color: "#4361ee" } },
      { type: "Divider", props: { id: "pp-p3d", style: "solid", color: "#e0e0e0", thickness: "1px", width: "80%", alignment: "center", spacing: "8px" } },
      { type: "Text", props: { id: "pp-p3t", content: "\u2713 Everything in Pro\n\u2713 SSO & API access\n\u2713 Dedicated account manager\n\u2713 SLA guarantee\n\u2713 White-label option", alignment: "center", fontSize: "14px", color: "#555555" } },
      { type: "Spacer", props: { id: "pp-p3s", height: "16px" } },
      { type: "Button", props: { id: "pp-p3btn", label: "Contact Sales", url: "#", variant: "outline", size: "medium", alignment: "center", color: "#4361ee", borderRadius: "6px" } },
    ],
    "pp-faq:section-content": [
      { type: "Heading", props: { id: "pp-h2", text: "Frequently Asked Questions", level: "h2", alignment: "center", color: "#1a1a2e" } },
      { type: "Spacer", props: { id: "pp-s1", height: "16px" } },
      { type: "Heading", props: { id: "pp-q1", text: "Can I switch plans anytime?", level: "h4", alignment: "left", color: "#1a1a2e" } },
      { type: "Text", props: { id: "pp-a1", content: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.", alignment: "left", fontSize: "14px", color: "#666666" } },
      { type: "Divider", props: { id: "pp-fd1", style: "solid", color: "#e0e0e0", thickness: "1px", width: "100%", alignment: "center", spacing: "8px" } },
      { type: "Heading", props: { id: "pp-q2", text: "Is there a free trial?", level: "h4", alignment: "left", color: "#1a1a2e" } },
      { type: "Text", props: { id: "pp-a2", content: "All plans come with a 14-day free trial. No credit card required to start.", alignment: "left", fontSize: "14px", color: "#666666" } },
      { type: "Divider", props: { id: "pp-fd2", style: "solid", color: "#e0e0e0", thickness: "1px", width: "100%", alignment: "center", spacing: "8px" } },
      { type: "Heading", props: { id: "pp-q3", text: "Do you offer refunds?", level: "h4", alignment: "left", color: "#1a1a2e" } },
      { type: "Text", props: { id: "pp-a3", content: "We offer a 30-day money-back guarantee on all plans. If you're not satisfied, contact our support team.", alignment: "left", fontSize: "14px", color: "#666666" } },
    ],
    "pp-footer:section-content": [
      { type: "Text", props: { id: "pp-ft", content: "\u00a9 2026 Your Company. All rights reserved.", alignment: "center", fontSize: "13px", color: "#888888" } },
    ],
  },
};

// --- 6. Contact Page ---
export const contactPageTemplate: Data = {
  content: [
    { type: "Section", props: { id: "cp-header", backgroundColor: "#4361ee", paddingTop: "48px", paddingBottom: "48px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "100%" } },
    { type: "Section", props: { id: "cp-body", backgroundColor: "#ffffff", paddingTop: "48px", paddingBottom: "48px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "900px" } },
    { type: "Section", props: { id: "cp-footer", backgroundColor: "#1a1a2e", paddingTop: "24px", paddingBottom: "24px", paddingLeft: "32px", paddingRight: "32px", maxWidth: "100%" } },
  ],
  root: { props: {} },
  zones: {
    "cp-header:section-content": [
      { type: "Heading", props: { id: "cp-h1", text: "Get in Touch", level: "h1", alignment: "center", color: "#ffffff" } },
      { type: "Text", props: { id: "cp-t1", content: "We'd love to hear from you. Reach out and we'll respond as soon as we can.", alignment: "center", fontSize: "16px", color: "#d0d0ff" } },
    ],
    "cp-body:section-content": [
      { type: "Columns", props: { id: "cp-cols", layout: "50-50", gap: "36px", verticalAlign: "top" } },
    ],
    "cp-cols:column-0": [
      { type: "Heading", props: { id: "cp-h2", text: "Contact Information", level: "h3", alignment: "left", color: "#1a1a2e" } },
      { type: "Spacer", props: { id: "cp-s1", height: "8px" } },
      { type: "Text", props: { id: "cp-t2", content: "\uD83D\uDCE7 Email\nhello@yourcompany.com", alignment: "left", fontSize: "14px", color: "#555555" } },
      { type: "Spacer", props: { id: "cp-s2", height: "8px" } },
      { type: "Text", props: { id: "cp-t3", content: "\uD83D\uDCDE Phone\n+1 (555) 123-4567", alignment: "left", fontSize: "14px", color: "#555555" } },
      { type: "Spacer", props: { id: "cp-s3", height: "8px" } },
      { type: "Text", props: { id: "cp-t4", content: "\uD83D\uDCCD Address\n123 Business Street\nSan Francisco, CA 94105", alignment: "left", fontSize: "14px", color: "#555555" } },
      { type: "Spacer", props: { id: "cp-s4", height: "16px" } },
      { type: "SocialLinks", props: { id: "cp-social", facebook: "https://facebook.com", twitter: "https://twitter.com", instagram: "https://instagram.com", linkedin: "https://linkedin.com", youtube: "", size: "medium", alignment: "left", color: "#4361ee" } },
    ],
    "cp-cols:column-1": [
      { type: "Heading", props: { id: "cp-h3", text: "Send Us a Message", level: "h3", alignment: "left", color: "#1a1a2e" } },
      { type: "Spacer", props: { id: "cp-s5", height: "8px" } },
      { type: "HtmlEmbed", props: { id: "cp-form", code: '<div style="display: flex; flex-direction: column; gap: 12px;"><input type="text" placeholder="Your Name" style="padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; font-family: inherit;"/><input type="email" placeholder="Your Email" style="padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; font-family: inherit;"/><textarea placeholder="Your Message" rows="5" style="padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; font-family: inherit; resize: vertical;"></textarea><button style="padding: 12px 24px; background-color: #4361ee; color: white; border: none; border-radius: 6px; font-size: 15px; font-weight: 600; cursor: pointer;">Send Message</button></div>' } },
    ],
    "cp-footer:section-content": [
      { type: "Text", props: { id: "cp-ft", content: "\u00a9 2026 Your Company. All rights reserved.", alignment: "center", fontSize: "13px", color: "#888888" } },
    ],
  },
};


// ============================================================
// TEMPLATES REGISTRY
// ============================================================
export const emailTemplates: Template[] = [
  { id: "welcome-email", name: "Welcome Email", description: "Onboarding email with header, body, CTA, and footer", type: "email", data: welcomeEmailTemplate, icon: "\u2709\uFE0F" },
  { id: "newsletter", name: "Newsletter", description: "Weekly digest with featured article and story links", type: "email", data: newsletterTemplate, icon: "\uD83D\uDCF0" },
  { id: "product-launch", name: "Product Launch", description: "Announce a new product with features and CTA", type: "email", data: productLaunchTemplate, icon: "\uD83D\uDE80" },
  { id: "event-invitation", name: "Event Invitation", description: "Event details, speakers, and RSVP button", type: "email", data: eventInvitationTemplate, icon: "\uD83C\uDF89" },
  { id: "order-confirmation", name: "Order Confirmation", description: "Purchase receipt with order summary", type: "email", data: orderConfirmationTemplate, icon: "\uD83D\uDED2" },
  { id: "password-reset", name: "Password Reset", description: "Secure password reset with action button", type: "email", data: passwordResetTemplate, icon: "\uD83D\uDD12" },
];

export const webPageTemplates: Template[] = [
  { id: "landing-page", name: "Landing Page", description: "Marketing page with hero, features, CTA, and footer", type: "webpage", data: landingPageTemplate, icon: "\uD83C\uDF10" },
  { id: "business-homepage", name: "Business Homepage", description: "Company site with services, about, and contact CTA", type: "webpage", data: businessHomepageTemplate, icon: "\uD83C\uDFE2" },
  { id: "portfolio", name: "Portfolio / Showcase", description: "Personal portfolio with projects and contact info", type: "webpage", data: portfolioTemplate, icon: "\uD83C\uDFA8" },
  { id: "coming-soon", name: "Coming Soon", description: "Pre-launch page with countdown and notify CTA", type: "webpage", data: comingSoonTemplate, icon: "\u23F3" },
  { id: "pricing-page", name: "Pricing Page", description: "Three-tier pricing cards with FAQ section", type: "webpage", data: pricingPageTemplate, icon: "\uD83D\uDCB0" },
  { id: "contact-page", name: "Contact Page", description: "Contact form with company information", type: "webpage", data: contactPageTemplate, icon: "\uD83D\uDCEC" },
];

export const allTemplates: Template[] = [
  { id: "blank", name: "Blank Canvas", description: "Start from scratch", type: "webpage", data: blankTemplate, icon: "\uD83D\uDCC4" },
  ...emailTemplates,
  ...webPageTemplates,
];
