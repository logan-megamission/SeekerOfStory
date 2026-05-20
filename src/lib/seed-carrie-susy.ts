import { db } from "@/db";
import { founders, posts } from "@/db/schema";
import { eq } from "drizzle-orm";

// ─── Episode links ────────────────────────────────────────────────────────────
const EPISODES = {
  "susy-gordon": {
    spotify: "https://open.spotify.com/episode/1G2dxZCQlpmfT4JBnu2BD5",
    apple: "https://podcasts.apple.com/us/podcast/susy-gordon-she-left-a-%24155k-salary-to-help-the/id1896645220?i=1000768662632",
  },
  "carrie-carter": {
    spotify: "https://open.spotify.com/episode/6024chWWEjuWJPb8QWpglC",
    apple: "https://podcasts.apple.com/us/podcast/carrie-carter-from-layoffs-to-launch-how-carrie-built/id1896645220?i=1000767697489",
  },
  "yoel-zehaie": {
    spotify: "https://open.spotify.com/episode/6XAhd0Tylujf8fccoiJ0fT",
    apple: "https://podcasts.apple.com/us/podcast/zehaie-law-criminal-defense-family-law-civil-litigation/id1896645220?i=1000767697523",
  },
  "lena-killion": {
    spotify: "https://open.spotify.com/episode/4DlANKsZcvjwEsSc5Qy313",
    apple: "https://podcasts.apple.com/us/podcast/lena-killion-mlk-pre-arrangements-she-took-the-power/id1896645220?i=1000768686251",
  },
};

async function run() {

  // ── 1. Update ALL episode links ────────────────────────────────────────────
  for (const [slug, links] of Object.entries(EPISODES)) {
    await db.update(founders)
      .set({ spotifyEpisodeUrl: links.spotify, applePodcastUrl: links.apple, updatedAt: new Date() })
      .where(eq(founders.slug, slug));
    console.log(`✓ ${slug} — Spotify + Apple URLs set`);
  }

  // ── 2. Update Carrie Carter full profile ──────────────────────────────────
  await db.update(founders).set({
    businessName: "Cowtown Tour Company",
    sector: "Hospitality",
    dfwCity: "Fort Worth",
    industryTags: ["Tourism", "Guided Tours", "Experiential Entertainment", "Fort Worth"],
    transitionFrom: "25 Years in Travel Tech",
    transitionTo: "Tour Company Founder",
    whoTheyWere: `Carrie Carter is a Fort Worth native — born and raised. She spent 25 years in the tech side of the travel industry, beginning her career at Travelscape, the company that became the platform Expedia purchased to grow into what it is today.

Her corporate career spanned some of the biggest names in travel technology: Travelscape, Expedia, Orbitz, a Las Vegas-based travel tech company (12 years), and Sabre (12 years). Her roles covered customer development, client relations, revenue management, marketing, and digital media.

Then she was laid off. Twice. Within three years. The first layoff took a full year to recover from. The second came after she had built systems at a new company, trained the entire team to use them, and was told, essentially — thank you, we've got it from here. Both felt like endings. Both turned out to be redirections.`,
    whatTheyBuilt: `Cowtown Tour Company is a guided tour experience based in Fort Worth, Texas. Carrie operates a mini bus — complete with longhorn horns on the front — that holds 11 passengers and takes groups all over the city, beyond the Cowtown stereotype, to show them what Fort Worth is truly about.

Fort Worth had a gap. No tour company was taking people around the full city. Visitors would arrive expecting only the stockyards and leave without seeing everything else. Carrie fills that gap by curating experiences: Barbecue & Breweries, Burgers & Breweries, Margarita Tours, and private custom tours built around each group's vision.

She launched in September 2024. Tours run every day.`,
    whyTheyBuiltIt: `After the second layoff, Carrie entered a season of quiet reflection, prayer, and soul searching. She went to ChatGPT and Claude, put in what she knew, what she believed in, and what she was good at — and asked for help thinking through what was next. The tour company concept emerged. She brought it to her personal network. Their reaction was immediate: "Oh my gosh, it's perfect."

Fort Worth is her hometown. She was born and raised there. Building a company that celebrates, shares, and elevates her city is not just a business — it is love made into a product.

She now understands that if a door does not open, there is a reason. Something else is waiting. She believes she is on the path she was always supposed to be on.`,
    blueprint: [
      { category: "Website", value: "cowtowntourco.com", url: "https://cowtowntourco.com" },
      { category: "Instagram", value: "@CowtownTourCo", url: "https://instagram.com/CowtownTourCo" },
      { category: "Facebook", value: "@CowtownTourCo", url: "https://facebook.com/CowtownTourCo" },
      { category: "Book a Tour", value: "Via website or DM on Instagram/Facebook" },
      { category: "Tours Offered", value: "BBQ & Breweries · Burgers & Breweries · Margarita Tours · Private Custom" },
      { category: "Bus Capacity", value: "11 passengers · Longhorn horns on the front" },
      { category: "Networking", value: "1 Million Cups — Fort Worth, every Wednesday morning" },
      { category: "2026 Opportunity", value: "FIFA World Cup host city — Fort Worth inbound tourism surge" },
    ],
    websiteUrl: "https://cowtowntourco.com",
    updatedAt: new Date(),
  }).where(eq(founders.slug, "carrie-carter"));
  console.log("✓ Carrie Carter — full profile updated");

  // ── 3. Blog post for Carrie ────────────────────────────────────────────────
  const [carrie] = await db.select({ id: founders.id }).from(founders).where(eq(founders.slug, "carrie-carter"));

  await db.insert(posts).values({
    slug: "carrie-carter-becoming",
    title: "Two Layoffs, One Mini Bus, and a City Worth Showing Off — How Carrie Carter Built Cowtown Tour Company",
    excerpt: "She spent 25 years in travel tech — Expedia, Orbitz, Sabre. Then she was laid off. Twice. She used AI to figure out what was next, and ended up putting longhorn horns on a bus.",
    founderId: carrie.id,
    sectorTags: ["Hospitality", "Tourism", "Corporate Pivot", "Fort Worth", "Female Founder"],
    status: "published",
    publishedAt: new Date("2026-05-20"),
    body: `Carrie Carter knows travel. She spent 25 years inside the technology that powers it — Travelscape before Expedia acquired it and turned it into what it is today, then Expedia itself, then Orbitz, then 12 years in Las Vegas working for a travel tech company, then 12 more at Sabre. Customer development, revenue management, digital media, client relations. She understood how the travel industry worked from the inside out.

Then the door closed.

The first layoff took a full year before she landed somewhere new. She rebuilt, found her footing, started contributing. Built systems. Trained the team. Made herself essential.

Then the door closed again.

---

**The Second Time**

The second layoff was harder to rationalize. She had done everything right. She had built the infrastructure, transferred the knowledge, developed the people around her. When she was let go, it felt less like a closing and more like a betrayal.

She will tell you now: it was neither. It was a redirection.

But she did not know that yet. So she did what more entrepreneurs should do and fewer actually admit — she sat with it. She prayed. She reflected. And then she went to ChatGPT and Claude, put in who she was, what she believed in, and what she knew how to do, and asked for help figuring out what was next.

---

**The AI Conversation That Started It**

The tour company concept came back in the output. She sat with it. She tried it on. She brought it to her personal network — not to pitch them, just to think out loud.

Their reaction was immediate.

*Oh my gosh. It's perfect.*

That was enough. Carrie Carter had spent 25 years understanding how people travel. She was a Fort Worth native who loved her city and knew it was undersold. And there was a gap — a real, obvious, unfilled gap. No tour company was showing people the full city. Visitors would arrive at the stockyards and leave thinking that was all there was.

She decided she was the person to fix that.

---

**The Bus**

She launched in September 2024. Mini bus. Eleven seats. Longhorn horns on the front.

The tours she runs are curated experiences: Barbecue & Breweries, Burgers & Breweries, Margarita Tours. And for groups who want something custom — a corporate outing, a bachelorette, a group of friends from three different states who want to see the city the way a local sees it — she builds the itinerary around them.

What makes it work is not the vehicle. It is Carrie herself. Born and raised in Fort Worth, she is not just a tour operator. She is a storyteller for her city. She takes people to places they would never have found on their own. Every tour is personal. Every group leaves with something to carry home.

"The joy on the bus," she says. "The pictures, the laughs, the connections between strangers. That's what keeps me going."

---

**On Closed Doors**

Carrie does not talk about the layoffs the way most people talk about layoffs. She talks about them like plot points that had to happen for the story to work.

If a door does not open, there is a reason. Something else is waiting.

She believes she is now on the path she was always supposed to be on. That the 25 years in corporate were not wasted — they were training. The revenue management, the client relations, the marketing, the deep understanding of how travel works as an industry: all of it is inside every tour she runs.

---

**What She Would Tell You**

Life is too short to not have fun and to not benefit the people around you. Find the silver lining. That is her tagline and she means it.

She attends 1 Million Cups in Fort Worth every Wednesday morning. If you are a founder, a seeker, or someone trying to figure out what is next in the DFW area — that room is worth walking into.

And if you want to see Fort Worth the way someone who genuinely loves it sees it: book a tour.

**cowtowntourco.com · @CowtownTourCo on Instagram and Facebook**

*Note: The 2026 FIFA World Cup is coming to Fort Worth. Carrie is ready.*`,
  }).onConflictDoNothing();
  console.log("✓ Carrie Carter — blog post created");

  // ── 4. Update Susy Gordon full profile ────────────────────────────────────
  await db.update(founders).set({
    businessName: "Mega Mission Media · Seeker of Story",
    sector: "Media",
    dfwCity: "Fort Worth",
    industryTags: ["Media Production", "Digital Branding", "Podcast", "Website Builds", "Creative Agency", "Community Platform"],
    transitionFrom: "Director of Strategy & Delivery (Tech Consulting)",
    transitionTo: "Media Founder & Platform Builder",
    whoTheyWere: `Before becoming a founder, Susy Gordon's career began in high school at Mesquite ISD, where she worked in television broadcasting — putting programming on the air for the school's TV station. She fell in love with broadcasting, storytelling, and news reporting and dreamed of becoming an international news reporter.

Her early media career included Univision Channel 23 (DFW), CBS Channel 11 (KTVT), and Clear Channel Radio — Kid Kritic Morning Show, Magic 102, KCBS, The Edge. After about 10 years in media, she transitioned to tech to support her growing family.

Over the next 20 to 25 years she worked as a Project Coordinator, Project Manager, Scrum Master, Agile Coach, SharePoint Admin, and ultimately Director of Strategy and Delivery for tech consulting firms — working with major corporations on business transformation and team development, earning up to $125/hour.

Then came profound personal hardship: the loss of her sister, addiction, and a period of homelessness. Titles and salaries meant nothing during a crisis. She began driving rideshare — what felt like a step backward became a repositioning. Instead of working behind a monitor, she was placed behind a wheel, meeting people, hearing stories, and finding her purpose again. She eventually left a $155,000 salary to pursue her calling full time.`,
    whatTheyBuilt: `Susy built two companies simultaneously.

**Mega Mission Media** is a creative digital media agency helping businesses expand their digital presence — website builds, social media content, video production, and podcast support. Her first client came from 30 cold calls in one day. He is still her client. After she built his digital presence, his phone would not stop ringing.

**Seeker of Story** is this platform — a free founder resource built on the Goodwill Principle. Founders share their real startup blueprints. Seekers consume that knowledge at no cost. No subscriptions, no gatekeeping, no $997 courses. Born from Susy's own experience as a seeker who could not find one central place to get real mentor guidance.

Fully bootstrapped. Launched March 2026, three months after two car wrecks grounded her and forced her to look inward. Monthly operating cost: approximately $300–$400 in tool subscriptions.`,
    whyTheyBuiltIt: `Two car wrecks in January and February took her off the road. Without her car — her mobile office, think tank, prayer closet, and conference room — she was forced to stop. She heard clearly: look within, Susy, look within.

She had already tried to return to corporate America. Thirty-five applications. Forty consulting opportunities. No doors opened. She had seen enough of God's hand in her life to recognize closed doors as direction, not rejection. She fully surrendered.

She was the seeker. She lived the experience of wanting to start and not being able to find affordable, accessible guidance. Seeker of Story is her answer to the gap she personally suffered through.

Her mission: help the lost launch.`,
    blueprint: [
      { category: "Agency Website", value: "megamissionmedia.com", url: "https://megamissionmedia.com" },
      { category: "Platform", value: "seekerofstory.com", url: "https://seekerofstory.com" },
      { category: "Booking", value: "Calendly (link via website)" },
      { category: "Payment", value: "Squarespace Payments" },
      { category: "AI Tools", value: "Claude Code · ChatGPT · HeyGen · Suno" },
      { category: "Video", value: "CapCut · Opus Clip · YouTube · Sprout (podcast)" },
      { category: "Operations", value: "Google Workspace · Squarespace · Calendly" },
      { category: "Networking", value: "1 Million Cups — Fort Worth (discovered via rideshare passenger)" },
      { category: "CPA", value: "Roseanne Divertos, Crane — Fort Worth, TX" },
      { category: "Monthly Cost", value: "~$300–$400 in subscriptions (biggest: Squarespace ~$249)" },
    ],
    websiteUrl: "https://megamissionmedia.com",
    updatedAt: new Date(),
  }).where(eq(founders.slug, "susy-gordon"));
  console.log("✓ Susy Gordon — full profile updated");

  // ── 5. Blog post for Susy ─────────────────────────────────────────────────
  const [susy] = await db.select({ id: founders.id }).from(founders).where(eq(founders.slug, "susy-gordon"));

  await db.insert(posts).values({
    slug: "susy-gordon-becoming",
    title: "She Left a $155K Salary, Survived Two Car Wrecks, and Built the Platform She Needed When She Had Nothing",
    excerpt: "Susy Gordon spent 25 years climbing the corporate ladder — then lost her sister, went through addiction, and experienced homelessness. What came next was never in the plan. It was better.",
    founderId: susy.id,
    sectorTags: ["Media", "Faith-Led Transition", "Fort Worth", "Female Founder", "Platform Builder"],
    status: "published",
    publishedAt: new Date("2026-05-20"),
    body: `Susy Gordon will tell you she is in pursuit of purpose. It is on her website, in the way she talks, in the way she listens. It is not a tagline she came up with at a branding session. It is a description of what the last several years have actually been.

The path to finding that purpose ran through places most career narratives skip: the loss of a sister. Addiction. Homelessness. A rideshare app that became, somehow, the beginning of everything.

---

**The Resume Most People See**

The version of Susy Gordon's story that fits on a LinkedIn profile is impressive by any standard. It starts in high school, where she worked in television broadcasting at Mesquite ISD — putting programming on the air, learning how stories get told and transmitted. She dreamed of becoming an international news reporter.

She worked in media for about ten years: Univision Channel 23, CBS Channel 11 (KTVT), Clear Channel Radio. She had the chops. She had the instincts. Then she transitioned to tech to support a growing family, and spent the next 20-plus years doing things most people do not fully understand — Project Manager, Scrum Master, Agile Coach, SharePoint Admin, Director of Strategy and Delivery for tech consulting firms. Working with major corporations. Earning up to $125 an hour. Eventually, $155,000 a year.

By that measure, she had made it.

---

**What the Resume Doesn't Say**

Profound personal hardship arrived anyway. The loss of her sister. A battle with addiction. A period of homelessness.

She will tell you now, plainly: titles and income mean nothing during a crisis.

When the corporate world stopped holding her up, she started driving rideshare. What looked like a step backward turned out to be a God-ordained repositioning. Instead of working behind a monitor giving directions, she was placed behind a wheel — meeting people, hearing stories, being reminded that her purpose had always been in connection and storytelling, not org charts.

A rideshare passenger became her employer. She returned to corporate America — sober, clear-minded, and grateful. She took a Director of Strategy and Delivery role. But she could not let go of rideshare. She began podcasting from her car, capturing stories, putting them out into the world.

She was finding her wings. And then she left the $155,000.

---

**Two Car Wrecks**

January. Then February. Two wrecks, back to back, that took her off the road.

Her car had been her mobile office, her think tank, her prayer closet, and her conference room. Without it, she was grounded. She had submitted 35 applications across 40 consulting opportunities. No doors opened.

She had seen enough of God's hand in her life to recognize that as direction, not rejection.

She heard it clearly: *Look within, Susy. Look within.*

She started calling potential clients. She made 30 cold calls in one day — a skill she had sharpened through a brief stint with two life insurance agencies that was never about closing policies. It was about learning how to talk to people, how to stay on the line, how to earn the conversation. One person called back from those 30 calls. She closed the deal. He is still her client today. After she built his digital presence, his phone would not stop ringing.

Revenue came in March — three months after the wrecks.

---

**What She Built**

Mega Mission Media is a creative digital media agency. Websites, social media content, video production, podcast support. Tools: Claude Code, ChatGPT, HeyGen, CapCut, Suno, Google Workspace, Squarespace, Calendly. Monthly overhead: approximately $300 to $400 in subscriptions.

She rebuilt a client's website in under 10 minutes using Claude Code — a capability she learned about from a rideshare passenger who explained it during a 45-minute traffic jam. She went home that night and did it. She says it lowered every technical barrier she had been worried about.

The second thing she built is this: Seeker of Story.

She was the seeker. She lived the experience of wanting to start and not being able to find one central place that gave real guidance at a price she could afford. No hidden fees. No subscriptions. No $997 courses. Founders give their real blueprints — the vendors, the tools, the timeline, the costs, the lessons. Seekers receive them freely.

She built the platform she needed when she had nothing.

---

**What She Knows Now**

She will tell you entrepreneurship is not expensive, exclusive, or reserved for people with degrees. She points to immigrant families who arrive with nothing and quickly launch businesses. If they can do it, she asks, why not you?

She will tell you subscriptions accumulate faster than you think. Add them up before you start.

She will tell you not to order multiple sets of business cards at every pivot — she did, and it was wasted money every time.

She will tell you the surrender journey is the whole thing. Not the destination. Not the revenue. The process of letting go of the need for control and trusting what is in front of you.

And she will tell you: start. Before you have the full plan. Before you feel ready. Go to 1 Million Cups on Wednesday morning in Fort Worth. Put your business out there. The confidence comes from doing, not from waiting.

If you need help with that — she can help you with that.

**megamissionmedia.com · seekerofstory.com**`,
  }).onConflictDoNothing();
  console.log("✓ Susy Gordon — blog post created");

  console.log("\nAll done.");
}

run().catch(console.error);
