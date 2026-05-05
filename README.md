# American Dream — The Future of Physical Retail

A cinematic, browser-based sales platform for American Dream Mall. The experience combines immersive video storytelling, luxury interaction design, lead capture, event booking, and a secure admin dashboard.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion, GSAP, Lenis
- MongoDB
- JWT session cookie auth

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Admin

- Route: `/admin/login`
- Default credentials are read from `.env.local`:
  - `ADMIN_EMAIL`
  - `ADMIN_PASSWORD`

## API

- `POST /api/leads`
- `POST /api/events`
- `GET /api/leads` authenticated admin
- `GET /api/events` authenticated admin
- `POST /api/intelligence`

Lead and event submissions store in MongoDB when `MONGODB_URI` is configured. For local review without a database, the app falls back to an in-memory store during the server process.

## AI Experience Intelligence Engine

The website includes an ML-powered recommendation workflow for brand placement strategy. The Next.js API uses `ML_SERVICE_URL` when a Python service is available and falls back to a local semantic matcher for instant demos.

Run the Sentence Transformers service:

```bash
cd ml-service
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --host 127.0.0.1 --port 8000
```

Then set:

```bash
ML_SERVICE_URL=http://127.0.0.1:8000
```

## Media Notes

The platform uses remote cinematic media from Pexels and Unsplash-style images with poster fallbacks. Replace `lib/content.ts` media URLs with licensed brand-owned American Dream footage before a commercial launch.

## Production Checklist

- Set a strong `JWT_SECRET`.
- Set `COOKIE_SECURE=true` when deploying behind HTTPS.
- Configure a persistent MongoDB database.
- Replace demo media with final licensed footage.
- Run `npm run build`.
- Deploy to Vercel or any Node-compatible host.
