import {
  pgTable,
  pgEnum,
  serial,
  text,
  boolean,
  integer,
  timestamp,
  jsonb,
  uuid,
} from "drizzle-orm/pg-core";

// ─── Enums ───────────────────────────────────────────────────────────────────

export const sectorEnum = pgEnum("sector", [
  "Legal",
  "Hospitality",
  "Tech",
  "Real Estate",
  "Health",
  "Media",
  "Retail",
  "Finance",
  "Other",
]);

export const dfwCityEnum = pgEnum("dfw_city", [
  "Fort Worth",
  "Dallas",
  "Arlington",
  "Frisco",
  "Plano",
  "McKinney",
  "Irving",
  "Garland",
  "Grand Prairie",
  "Other",
]);

export const founderStatusEnum = pgEnum("founder_status", [
  "draft",
  "pending_review",
  "published",
]);

export const seekerStatusEnum = pgEnum("seeker_status", [
  "new",
  "reviewed",
  "matched",
  "closed",
]);

export const postStatusEnum = pgEnum("post_status", ["draft", "published"]);

export const bookingStatusEnum = pgEnum("booking_status", [
  "active",
  "cancelled",
]);

export const socialPlatformEnum = pgEnum("social_platform", [
  "spotify",
  "youtube",
  "apple_podcasts",
  "instagram",
  "tiktok",
]);

export const inviteStatusEnum = pgEnum("invite_status", [
  "pending",
  "submitted",
  "published",
]);

export const subscriberSourceEnum = pgEnum("subscriber_source", [
  "footer",
  "homepage",
  "seek-form",
]);

// ─── Founders ────────────────────────────────────────────────────────────────

export type BlueprintItem = {
  category: string;
  value: string;
  url?: string;
};

export const founders = pgTable("founders", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  storyNumber: integer("story_number"),
  name: text("name").notNull(),
  businessName: text("business_name").notNull(),
  photoUrl: text("photo_url"),
  sector: sectorEnum("sector").notNull().default("Other"),
  industryTags: text("industry_tags").array().notNull().default([]),
  dfwCity: dfwCityEnum("dfw_city").notNull().default("Fort Worth"),
  transitionFrom: text("transition_from"),
  transitionTo: text("transition_to"),
  whoTheyWere: text("who_they_were"),
  whatTheyBuilt: text("what_they_built"),
  whyTheyBuiltIt: text("why_they_built_it"),
  blueprint: jsonb("blueprint").$type<BlueprintItem[]>().default([]),
  youtubeUrl: text("youtube_url"),
  spotifyEpisodeUrl: text("spotify_episode_url"),
  applePodcastUrl: text("apple_podcast_url"),
  buzzsproutUrl: text("buzzsprout_url"),
  contactEmail: text("contact_email"),
  websiteUrl: text("website_url"),
  linkedinUrl: text("linkedin_url"),
  status: founderStatusEnum("status").notNull().default("draft"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Founder = typeof founders.$inferSelect;
export type NewFounder = typeof founders.$inferInsert;

// ─── Founder Invites ─────────────────────────────────────────────────────────

export const founderInvites = pgTable("founder_invites", {
  id: serial("id").primaryKey(),
  token: uuid("token").notNull().unique().defaultRandom(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  status: inviteStatusEnum("status").notNull().default("pending"),
  founderId: integer("founder_id").references(() => founders.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  submittedAt: timestamp("submitted_at"),
});

export type FounderInvite = typeof founderInvites.$inferSelect;

// ─── Posts (Blog) ─────────────────────────────────────────────────────────────

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  body: text("body"),
  founderId: integer("founder_id").references(() => founders.id),
  coverImageUrl: text("cover_image_url"),
  sectorTags: text("sector_tags").array().notNull().default([]),
  status: postStatusEnum("status").notNull().default("draft"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;

// ─── Seekers ──────────────────────────────────────────────────────────────────

export const seekers = pgTable("seekers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  currentSituation: text("current_situation").notNull(),
  desiredDirection: text("desired_direction").notNull(),
  matchedFounderIds: integer("matched_founder_ids").array().default([]),
  status: seekerStatusEnum("status").notNull().default("new"),
  adminNotes: text("admin_notes"),
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
});

export type Seeker = typeof seekers.$inferSelect;

// ─── Founder Leads ────────────────────────────────────────────────────────────

export const founderLeads = pgTable("founder_leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  bestTime: text("best_time"),
  websiteLinkedin: text("website_linkedin"),
  status: text("status").notNull().default("new"),
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
});

export type FounderLead = typeof founderLeads.$inferSelect;

// ─── Content Blocks ───────────────────────────────────────────────────────────

export const contentBlocks = pgTable("content_blocks", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type ContentBlock = typeof contentBlocks.$inferSelect;

// ─── Bookings (Calendly mirror) ───────────────────────────────────────────────

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  calendlyEventId: text("calendly_event_id").notNull().unique(),
  eventType: text("event_type"),
  inviteeEmail: text("invitee_email"),
  inviteeName: text("invitee_name"),
  scheduledAt: timestamp("scheduled_at"),
  status: bookingStatusEnum("status").notNull().default("active"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Booking = typeof bookings.$inferSelect;

// ─── Subscribers ──────────────────────────────────────────────────────────────

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  source: subscriberSourceEnum("source").notNull().default("footer"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Subscriber = typeof subscribers.$inferSelect;

// ─── Social Links ─────────────────────────────────────────────────────────────

export const socialLinks = pgTable("social_links", {
  id: serial("id").primaryKey(),
  platform: socialPlatformEnum("platform").notNull().unique(),
  url: text("url").notNull(),
  isActive: boolean("is_active").notNull().default(true),
});

export type SocialLink = typeof socialLinks.$inferSelect;
