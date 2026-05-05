from functools import lru_cache
from typing import Literal

import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel, Field
from sentence_transformers import SentenceTransformer


class IntelligenceBrief(BaseModel):
    brandType: str = Field(min_length=2, max_length=140)
    targetAudience: str = Field(min_length=2, max_length=180)
    budget: str = Field(min_length=2, max_length=80)
    goals: str = Field(min_length=8, max_length=900)


class Zone(BaseModel):
    id: str
    location: str
    audience: str
    strategy: str
    rationale: str
    budgetFit: Literal["Lean", "Growth", "Premium", "Flagship"]
    profile: str


ZONES = [
    Zone(
        id="luxury-avenue",
        location="Luxury Avenue near the fashion corridor",
        audience="Affluent shoppers, international visitors, fashion collectors, premium gifting buyers",
        strategy="Build an appointment-led retail salon with private styling, limited-edition drops, concierge gifting, and invite-only preview nights tied to luxury hospitality partners.",
        rationale="This zone supports high-intent luxury discovery where dwell time, exclusivity, and brand theater matter more than raw traffic volume.",
        budgetFit="Flagship",
        profile="Luxury fashion jewelry beauty premium accessories VIP clientele high income shoppers exclusive launches concierge service elevated store design quiet prestige",
    ),
    Zone(
        id="entertainment-atrium",
        location="Entertainment Atrium between attractions and dining",
        audience="Families, tourists, weekend visitors, social groups, high-energy destination guests",
        strategy="Create a high-visibility activation with interactive demos, photo moments, timed performances, and bundled offers connected to attraction traffic.",
        rationale="The atrium captures emotional peak moments when guests are already in exploration mode and open to shared experiences.",
        budgetFit="Growth",
        profile="Family entertainment toys food beverage travel destination marketing interactive brand activation groups tourists kids parents shared memories",
    ),
    Zone(
        id="tech-media-plaza",
        location="Tech and Media Plaza near high-traffic digital surfaces",
        audience="Creators, professionals, students, tech shoppers, early adopters, affluent commuters",
        strategy="Launch a demo-rich product experience with guided trials, creator workshops, live commerce capture, and digital media takeovers around peak traffic windows.",
        rationale="This placement works when the product needs education, hands-on interaction, and repeated exposure across digital and physical touchpoints.",
        budgetFit="Premium",
        profile="Technology electronics software creator economy product demos education workshops early adopters innovation media surfaces launch events",
    ),
    Zone(
        id="sport-culture-loop",
        location="Sport Culture Loop near activewear and youth fashion",
        audience="Gen Z, athletes, sneaker shoppers, wellness consumers, streetwear fans",
        strategy="Use challenge-based retail: limited drops, training sessions, athlete appearances, membership capture, and social-first content zones.",
        rationale="The loop concentrates movement, identity, and repeat shopping behavior, making it ideal for brands that trade in performance and culture.",
        budgetFit="Growth",
        profile="Sportswear sneakers wellness fitness streetwear young shoppers athletes training community membership drops active lifestyle",
    ),
    Zone(
        id="main-street-retail",
        location="Main Street Retail Promenade",
        audience="Broad-market shoppers, value-conscious families, regional visitors, everyday fashion buyers",
        strategy="Open a conversion-focused pop-up or inline store with strong merchandising, promotional storytelling, loyalty capture, and seasonal campaign moments.",
        rationale="The promenade gives accessible brands consistent traffic and a clear path from awareness to purchase without overbuilding the experience.",
        budgetFit="Lean",
        profile="Accessible fashion department store family shoppers seasonal retail value broad audience apparel loyalty high traffic everyday purchase",
    ),
    Zone(
        id="event-stage",
        location="Event Stage and Brand Activation Court",
        audience="Launch attendees, press, creators, fans, sponsors, nightlife and culture seekers",
        strategy="Stage a launch moment with ticketed programming, sponsor integrations, live performance, media capture, VIP reception, and post-event lead nurturing.",
        rationale="This zone is strongest when the goal is attention compression: turning one event into press, content, pipeline, and measurable audience capture.",
        budgetFit="Premium",
        profile="Events product launches concerts creator campaigns press moments sponsorship VIP reception brand activation media capture culture",
    ),
]


app = FastAPI(title="AI Experience Intelligence Engine")


@lru_cache(maxsize=1)
def model() -> SentenceTransformer:
    return SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")


@lru_cache(maxsize=1)
def zone_embeddings() -> np.ndarray:
    texts = [f"{zone.profile}. {zone.strategy}. {zone.rationale}" for zone in ZONES]
    return model().encode(texts, normalize_embeddings=True)


@app.get("/health")
def health():
    return {"ok": True, "model": "sentence-transformers/all-MiniLM-L6-v2"}


@app.post("/recommend")
def recommend(brief: IntelligenceBrief):
    query = f"{brief.brandType}. Audience: {brief.targetAudience}. Budget: {brief.budget}. Goals: {brief.goals}."
    query_embedding = model().encode([query], normalize_embeddings=True)[0]
    scores = zone_embeddings() @ query_embedding
    best_index = int(np.argmax(scores))
    zone = ZONES[best_index]
    confidence = max(76, min(97, int(round(float(scores[best_index]) * 100))))

    return {
        "location": zone.location,
        "strategy": zone.strategy,
        "audience": zone.audience,
        "why": (
            f"{zone.rationale} Your brief combines {brief.brandType.lower()} with an audience of "
            f"{brief.targetAudience.lower()} and goals around {brief.goals.lower()}. The semantic match shows this "
            f"zone is best positioned to convert attention into measurable commercial action."
        ),
        "confidence": confidence,
        "budgetFit": zone.budgetFit,
        "nextMove": f"Build a 30-day activation plan for {zone.location}, then validate traffic windows, media inventory, staffing model, and lead-capture targets.",
    }
