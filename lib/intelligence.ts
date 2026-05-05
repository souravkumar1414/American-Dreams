import { z } from "zod";

export const intelligenceSchema = z.object({
  brandType: z.string().min(2).max(140),
  targetAudience: z.string().min(2).max(180),
  budget: z.string().min(2).max(80),
  goals: z.string().min(8).max(900)
});

export type IntelligenceInput = z.infer<typeof intelligenceSchema>;

export type MallZone = {
  id: string;
  location: string;
  audience: string;
  strategy: string;
  rationale: string;
  budgetFit: "Lean" | "Growth" | "Premium" | "Flagship";
  tags: string[];
  profile: string;
};

export type IntelligenceResult = {
  location: string;
  strategy: string;
  audience: string;
  why: string;
  confidence: number;
  budgetFit: MallZone["budgetFit"];
  nextMove: string;
  source: "sentence-transformers" | "local-semantic";
};

export const mallZones: MallZone[] = [
  {
    id: "luxury-avenue",
    location: "Luxury Avenue near the fashion corridor",
    audience: "Affluent shoppers, international visitors, fashion collectors, premium gifting buyers",
    strategy:
      "Build an appointment-led retail salon with private styling, limited-edition drops, concierge gifting, and invite-only preview nights tied to luxury hospitality partners.",
    rationale:
      "This zone supports high-intent luxury discovery where dwell time, exclusivity, and brand theater matter more than raw traffic volume.",
    budgetFit: "Flagship",
    tags: ["luxury", "fashion", "premium", "vip", "high income", "exclusive", "designer"],
    profile:
      "Luxury fashion, jewelry, beauty, premium accessories, VIP clientele, high income shoppers, exclusive launches, concierge service, elevated store design, quiet prestige."
  },
  {
    id: "entertainment-atrium",
    location: "Entertainment Atrium between attractions and dining",
    audience: "Families, tourists, weekend visitors, social groups, high-energy destination guests",
    strategy:
      "Create a high-visibility activation with interactive demos, photo moments, timed performances, and bundled offers connected to attraction traffic.",
    rationale:
      "The atrium captures emotional peak moments when guests are already in exploration mode and open to shared experiences.",
    budgetFit: "Growth",
    tags: ["family", "tourism", "interactive", "entertainment", "kids", "group", "social"],
    profile:
      "Family entertainment, toys, food, beverage, travel, destination marketing, interactive brand activation, groups, tourists, kids, parents, shared memories."
  },
  {
    id: "tech-media-plaza",
    location: "Tech and Media Plaza near high-traffic digital surfaces",
    audience: "Creators, professionals, students, tech shoppers, early adopters, affluent commuters",
    strategy:
      "Launch a demo-rich product experience with guided trials, creator workshops, live commerce capture, and digital media takeovers around peak traffic windows.",
    rationale:
      "This placement works when the product needs education, hands-on interaction, and repeated exposure across digital and physical touchpoints.",
    budgetFit: "Premium",
    tags: ["technology", "electronics", "creator", "innovation", "media", "demo", "product launch"],
    profile:
      "Technology, electronics, software, creator economy, product demos, education, workshops, early adopters, innovation, media surfaces, launch events."
  },
  {
    id: "sport-culture-loop",
    location: "Sport Culture Loop near activewear and youth fashion",
    audience: "Gen Z, athletes, sneaker shoppers, wellness consumers, streetwear fans",
    strategy:
      "Use challenge-based retail: limited drops, training sessions, athlete appearances, membership capture, and social-first content zones.",
    rationale:
      "The loop concentrates movement, identity, and repeat shopping behavior, making it ideal for brands that trade in performance and culture.",
    budgetFit: "Growth",
    tags: ["sports", "sneakers", "wellness", "fitness", "youth", "streetwear", "athlete"],
    profile:
      "Sportswear, sneakers, wellness, fitness, streetwear, young shoppers, athletes, training, community, membership, drops, active lifestyle."
  },
  {
    id: "main-street-retail",
    location: "Main Street Retail Promenade",
    audience: "Broad-market shoppers, value-conscious families, regional visitors, everyday fashion buyers",
    strategy:
      "Open a conversion-focused pop-up or inline store with strong merchandising, promotional storytelling, loyalty capture, and seasonal campaign moments.",
    rationale:
      "The promenade gives accessible brands consistent traffic and a clear path from awareness to purchase without overbuilding the experience.",
    budgetFit: "Lean",
    tags: ["fashion", "accessible", "family", "value", "seasonal", "retail", "broad market"],
    profile:
      "Accessible fashion, department store, family shoppers, seasonal retail, value, broad audience, apparel, loyalty, high traffic, everyday purchase."
  },
  {
    id: "event-stage",
    location: "Event Stage and Brand Activation Court",
    audience: "Launch attendees, press, creators, fans, sponsors, nightlife and culture seekers",
    strategy:
      "Stage a launch moment with ticketed programming, sponsor integrations, live performance, media capture, VIP reception, and post-event lead nurturing.",
    rationale:
      "This zone is strongest when the goal is attention compression: turning one event into press, content, pipeline, and measurable audience capture.",
    budgetFit: "Premium",
    tags: ["event", "launch", "concert", "press", "creator", "sponsor", "activation"],
    profile:
      "Events, product launches, concerts, creator campaigns, press moments, sponsorship, VIP reception, brand activation, media capture, culture."
  }
];

const vocabulary = Array.from(new Set(mallZones.flatMap((zone) => zone.tags).concat([
  "luxury",
  "family",
  "technology",
  "fashion",
  "event",
  "wellness",
  "sponsor",
  "launch",
  "premium",
  "youth",
  "tourist",
  "retail",
  "creator",
  "fitness",
  "beauty",
  "food",
  "experience",
  "awareness",
  "sales",
  "vip"
])));

export function localRecommend(input: IntelligenceInput): IntelligenceResult {
  const query = `${input.brandType} ${input.targetAudience} ${input.budget} ${input.goals}`;
  const queryVector = embedText(query);
  const scored = mallZones
    .map((zone) => ({
      zone,
      score: cosine(queryVector, embedText(`${zone.profile} ${zone.strategy} ${zone.rationale}`)) + budgetScore(input.budget, zone.budgetFit)
    }))
    .sort((a, b) => b.score - a.score);

  const best = scored[0];
  const confidence = Math.max(74, Math.min(96, Math.round(best.score * 72)));

  return {
    location: best.zone.location,
    strategy: best.zone.strategy,
    audience: best.zone.audience,
    why: `${best.zone.rationale} Your brief signals ${input.brandType.toLowerCase()} ambitions for ${input.targetAudience.toLowerCase()}, with goals centered on ${input.goals.toLowerCase()}. The match prioritizes audience intent, experiential fit, and a realistic ${best.zone.budgetFit.toLowerCase()} activation model.`,
    confidence,
    budgetFit: best.zone.budgetFit,
    nextMove: `Build a 30-day activation plan for ${best.zone.location}, then validate traffic windows, media inventory, staffing model, and lead-capture targets.`,
    source: "local-semantic"
  };
}

function embedText(text: string) {
  const normalized = text.toLowerCase();
  return vocabulary.map((term) => {
    const matches = normalized.match(new RegExp(`\\b${escapeRegExp(term)}\\b`, "g"));
    return matches ? matches.length : normalized.includes(term) ? 0.55 : 0;
  });
}

function cosine(a: number[], b: number[]) {
  const dot = a.reduce((sum, value, index) => sum + value * b[index], 0);
  const magA = Math.sqrt(a.reduce((sum, value) => sum + value * value, 0));
  const magB = Math.sqrt(b.reduce((sum, value) => sum + value * value, 0));
  if (!magA || !magB) return 0.35;
  return dot / (magA * magB);
}

function budgetScore(inputBudget: string, fit: MallZone["budgetFit"]) {
  const text = inputBudget.toLowerCase();
  const numeric = Number(text.replace(/[^0-9.]/g, ""));
  const budget =
    text.includes("m") || numeric >= 1000000
      ? "Flagship"
      : numeric >= 350000 || text.includes("premium")
        ? "Premium"
        : numeric >= 100000 || text.includes("growth")
          ? "Growth"
          : "Lean";
  const order = ["Lean", "Growth", "Premium", "Flagship"];
  const distance = Math.abs(order.indexOf(budget) - order.indexOf(fit));
  return Math.max(0, 0.18 - distance * 0.06);
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
