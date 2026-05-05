import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  company: z.string().min(2).max(160),
  interest: z.enum(["leasing", "sponsorship", "events"]),
  message: z.string().min(10).max(1200)
});

export const eventSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  company: z.string().min(2).max(160),
  eventType: z.string().min(3).max(120),
  audience: z.string().min(2).max(80),
  date: z.string().min(4).max(80),
  notes: z.string().min(10).max(1200)
});

export type LeadInput = z.infer<typeof leadSchema>;
export type EventInput = z.infer<typeof eventSchema>;
