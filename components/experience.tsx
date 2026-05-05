"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { Building2, CalendarDays, Gem, Handshake, Mail, MapPin, Menu, Sparkles, Users, X } from "lucide-react";
import { brands, conversionPaths, media, metrics, navItems, opportunities } from "@/lib/content";
import { CinematicVideo } from "@/components/cinematic-video";
import { EventForm, LeadForm, TextCta } from "@/components/conversion-form";
import { IntelligenceEngine } from "@/components/intelligence-engine";
import { ScrollProgress } from "@/components/scroll-progress";

gsap.registerPlugin(ScrollTrigger);

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export function Experience() {
  const mainRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.22], [0, 180]);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 46, opacity: 0, filter: "blur(12px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.15,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%" }
          }
        );
      });
      gsap.utils.toArray<HTMLElement>("[data-video-fade]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.35, scale: 1.04 },
          {
            opacity: 1,
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true }
          }
        );
      });
    }, mainRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <main ref={mainRef} className="bg-obsidian text-white">
      <ScrollProgress />
      <section className="relative min-h-screen overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <CinematicVideo src={media.heroVideo} poster={media.heroPoster} priority />
        </motion.div>
        <div className="relative z-10 flex min-h-screen flex-col justify-between px-5 py-6 md:px-10 md:py-8">
          <SiteHeader />
          <div className="max-w-5xl pb-16">
            <motion.p
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.75, ease }}
              className="mb-5 text-sm uppercase tracking-[0.38em] text-aureate"
            >
              The future of physical retail
            </motion.p>
            <motion.h1
              initial={{ y: 34, opacity: 0, filter: "blur(10px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.18, duration: 1.05, ease }}
              className="font-display text-6xl font-semibold leading-[0.9] tracking-normal text-white md:text-8xl lg:text-9xl"
            >
              Retail is Not Dead.
              <span className="block gold-text">It&apos;s Being Reimagined.</span>
            </motion.h1>
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.42, duration: 0.8, ease }}
              className="mt-9 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
            >
              <p className="max-w-2xl text-lg leading-8 text-white/72 md:text-xl">
                American Dream is a living stage for brands, families, culture, entertainment, and commerce at metropolitan scale.
              </p>
              <TextCta href="#shift">Explore Opportunity</TextCta>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="shift" className="section-pad relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div data-reveal>
            <p className="mb-4 text-sm uppercase tracking-[0.34em] text-aureate">The Shift</p>
            <h2 className="font-display text-5xl leading-none md:text-7xl">
              People don&apos;t just shop anymore. <span className="gold-text">They experience.</span>
            </h2>
          </div>
          <div data-reveal className="grid gap-6 text-lg leading-8 text-white/68">
            <p>
              The winning retail destinations are no longer collections of stores. They are emotional media channels: places where people gather, discover, post, celebrate, and remember.
            </p>
            <div className="hairline" />
            <p>
              For brands, the question is not whether physical retail matters. The question is where physical retail can command attention with enough gravity to change behavior.
            </p>
          </div>
        </div>
      </section>

      <section id="moment" className="relative min-h-screen overflow-hidden" data-video-fade>
        <CinematicVideo src={media.humanVideo} poster={media.peoplePoster} />
        <div className="relative z-10 flex min-h-screen items-center px-5 md:px-12">
          <div className="max-w-4xl" data-reveal>
            <p className="mb-6 font-display text-4xl text-white/86 md:text-6xl">More than a destination...</p>
            <h2 className="font-display text-6xl leading-none md:text-8xl">
              Moments. Energy. <span className="gold-text">Connection.</span>
            </h2>
            <p className="mt-7 max-w-2xl text-xl leading-9 text-white/72">
              Families, couples, friends, launches, concerts, first visits, repeat rituals. This is where the world comes alive in public.
            </p>
          </div>
        </div>
      </section>

      <section id="scale" className="section-pad">
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.34em] text-aureate">Scale & Impact</p>
              <h2 className="font-display text-5xl leading-none md:text-7xl">A physical platform with media-scale reach.</h2>
            </div>
            <TextCta href="#contact">Claim the audience</TextCta>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.value}
                data-reveal
                whileHover={{ y: -8, borderColor: "rgba(216,180,106,.55)" }}
                transition={{ ease }}
                className="glass min-h-64 rounded-[0.5rem] p-6"
              >
                <div className="mb-12 text-sm text-white/42">0{index + 1}</div>
                <div className="gold-text font-display text-6xl font-semibold">{metric.value}</div>
                <p className="mt-5 text-sm leading-6 text-white/62">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-y border-white/10 bg-black/35">
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.34em] text-aureate">Conversion Paths</p>
              <h2 className="font-display text-5xl leading-none md:text-7xl">Three ways to enter the opportunity.</h2>
            </div>
            <TextCta href="#contact">Start the conversation</TextCta>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {conversionPaths.map((path) => (
              <a
                data-reveal
                key={path.title}
                href={path.href}
                className="glass group rounded-[0.5rem] p-6 transition duration-500 ease-cinematic hover:-translate-y-2 hover:border-aureate/60 hover:shadow-gold"
              >
                <div className="mb-10 grid h-12 w-12 place-items-center rounded-full border border-aureate/35 text-aureate transition group-hover:bg-aureate group-hover:text-black">
                  {path.title === "Retail Leasing" && <Building2 size={19} />}
                  {path.title === "Sponsorship" && <Handshake size={19} />}
                  {path.title === "Events" && <CalendarDays size={19} />}
                </div>
                <h3 className="font-display text-4xl">{path.title}</h3>
                <p className="mt-4 text-sm leading-6 text-white/62">{path.body}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <IntelligenceEngine />

      <section id="retail" className="section-pad bg-[#080806]">
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="mb-12 max-w-4xl">
            <p className="mb-4 text-sm uppercase tracking-[0.34em] text-aureate">Retail Ecosystem</p>
            <h2 className="font-display text-5xl leading-none md:text-7xl">A neighborhood of desire, utility, and global signal.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {brands.map((brand) => (
              <motion.div
                key={brand.name}
                data-reveal
                whileHover={{ scale: 1.025, y: -6 }}
                transition={{ ease }}
                className={`group relative overflow-hidden rounded-[0.5rem] border border-white/10 bg-white/[0.045] p-6 shadow-none transition duration-700 ease-cinematic hover:border-aureate/70 hover:shadow-gold ${
                  brand.weight === "prime" ? "md:col-span-2 md:min-h-56" : "min-h-48"
                }`}
              >
                <Image
                  src={brand.image}
                  alt={brand.imageAlt}
                  fill
                  sizes={brand.weight === "prime" ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 100vw"}
                  className="object-cover opacity-75 transition duration-700 ease-cinematic group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-black/60 transition duration-700 ease-cinematic group-hover:bg-black/48" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                <div className="relative z-10 flex h-full min-h-[inherit] flex-col justify-between">
                  <Gem className="mb-8 text-aureate opacity-80 drop-shadow transition group-hover:opacity-100" size={22} />
                  <div>
                    <h3 className="font-display text-4xl text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.85)]">{brand.name}</h3>
                    <p className="mt-3 text-sm uppercase tracking-[0.22em] text-white/72">{brand.tier}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="attractions" className="grid min-h-screen scroll-mt-24 md:grid-cols-2">
        <Attraction
          title="DreamWorks Water Park"
          body="A year-round entertainment anchor that turns a shopping trip into an all-day family memory."
          image={media.waterPark}
          icon={<Users />}
        />
        <Attraction
          title="Big Snow American Dream"
          body="Indoor snow creates a category-defying reason to visit, return, share, and stay."
          image={media.snow}
          icon={<Sparkles />}
        />
      </section>

      <section id="events" className="relative min-h-screen overflow-hidden" data-video-fade>
        <CinematicVideo src={media.concertVideo} poster={media.luxuryInterior} />
        <div className="relative z-10 grid min-h-screen items-center gap-10 px-5 py-24 md:grid-cols-[1fr_0.9fr] md:px-12">
          <div data-reveal className="max-w-4xl">
            <p className="mb-5 text-sm uppercase tracking-[0.34em] text-aureate">Events Platform</p>
            <h2 className="font-display text-6xl leading-none md:text-8xl">
              This is a stage, <span className="gold-text">not a venue.</span>
            </h2>
            <p className="mt-7 max-w-2xl text-xl leading-9 text-white/72">
              Concerts, brand activations, product launches, fashion drops, private celebrations, creator moments, and sponsorship narratives can all be built into the destination.
            </p>
          </div>
          <div data-reveal className="glass rounded-[0.5rem] p-5 md:p-7">
            <EventForm />
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1fr_0.85fr]">
          <div data-reveal>
            <p className="mb-4 text-sm uppercase tracking-[0.34em] text-aureate">Future Vision</p>
            <h2 className="font-display text-5xl leading-none md:text-7xl">
              This is not a mall. <span className="gold-text">This is a media platform.</span>
            </h2>
          </div>
          <div className="grid gap-4">
            {opportunities.map((item, index) => (
              <div data-reveal key={item} className="flex gap-5 border-t border-white/10 py-6">
                <span className="font-display text-3xl text-aureate">0{index + 1}</span>
                <p className="text-lg leading-8 text-white/68">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section-pad relative overflow-hidden bg-[#090806]">
        <Image src={media.retailPoster} alt="" fill sizes="100vw" className="object-cover opacity-18" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/88 to-black/70" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.8fr_1fr] md:items-start">
          <div data-reveal>
            <p className="mb-4 text-sm uppercase tracking-[0.34em] text-aureate">Final CTA</p>
            <h2 className="font-display text-5xl leading-none md:text-7xl">
              Own Attention. Own Culture. <span className="gold-text">Own Footfall.</span>
            </h2>
            <div className="mt-10 grid gap-4 text-white/66">
              <p className="flex items-center gap-3"><Building2 size={18} className="text-aureate" /> Leasing inquiries</p>
              <p className="flex items-center gap-3"><Handshake size={18} className="text-aureate" /> Sponsorship partnerships</p>
              <p className="flex items-center gap-3"><CalendarDays size={18} className="text-aureate" /> Event bookings</p>
              <p className="flex items-center gap-3"><MapPin size={18} className="text-aureate" /> East Rutherford, New Jersey</p>
            </div>
          </div>
          <div data-reveal className="glass rounded-[0.5rem] p-5 md:p-7">
            <LeadForm />
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-40 px-5 py-4 md:px-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-xl">
        <a href="#" className="font-display text-2xl font-semibold tracking-wide text-white" onClick={() => setOpen(false)}>
          American <span className="gold-text">Dream</span>
        </a>
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-full px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/60 transition hover:bg-white/10 hover:text-aureate"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <a href="/admin/login" className="rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/48 transition hover:text-aureate">
            Admin
          </a>
          <a href="#contact" className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-xs uppercase tracking-[0.24em] text-aureate transition hover:bg-white/12">
            Inquire
          </a>
        </div>
        <button
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((value) => !value)}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-aureate md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open && (
        <div className="mx-auto mt-3 max-w-7xl rounded-[0.5rem] border border-white/10 bg-black/85 p-3 backdrop-blur-xl md:hidden">
          <nav className="grid gap-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="rounded-[0.5rem] px-4 py-3 text-sm uppercase tracking-[0.2em] text-white/70 transition hover:bg-white/10 hover:text-aureate"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/admin/login"
              onClick={() => setOpen(false)}
              className="rounded-[0.5rem] px-4 py-3 text-sm uppercase tracking-[0.2em] text-white/45 transition hover:bg-white/10 hover:text-aureate"
            >
              Admin
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black px-5 py-10 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <a href="#" className="font-display text-3xl font-semibold tracking-wide text-white">
            American <span className="gold-text">Dream</span>
          </a>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/48">
            A cinematic sales platform for retail leasing, sponsorship partnerships, and destination-scale events.
          </p>
        </div>
        <div className="grid gap-3 text-sm text-white/55 md:text-right">
          <p className="flex items-center gap-2 md:justify-end"><MapPin size={16} className="text-aureate" /> East Rutherford, New Jersey</p>
          <a href="mailto:partnerships@americandream.com" className="flex items-center gap-2 transition hover:text-aureate md:justify-end">
            <Mail size={16} className="text-aureate" />
            partnerships@americandream.com
          </a>
          <a href="/admin/login" className="text-white/35 transition hover:text-aureate">Admin dashboard</a>
        </div>
      </div>
    </footer>
  );
}

function Attraction({
  title,
  body,
  image,
  icon
}: {
  title: string;
  body: string;
  image: string;
  icon: React.ReactNode;
}) {
  return (
    <article className="group relative min-h-[72vh] overflow-hidden">
      <Image src={image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition duration-700 ease-cinematic group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/38 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-7 md:p-10" data-reveal>
        <div className="mb-7 grid h-12 w-12 place-items-center rounded-full border border-aureate/45 bg-black/30 text-aureate backdrop-blur-md">
          {icon}
        </div>
        <h3 className="font-display text-5xl leading-none md:text-6xl">{title}</h3>
        <p className="mt-5 max-w-xl text-lg leading-8 text-white/72">{body}</p>
      </div>
    </article>
  );
}
