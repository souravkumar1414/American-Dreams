import { MongoClient } from "mongodb";
import { randomUUID } from "node:crypto";
import type { EventInput, LeadInput } from "@/lib/schemas";

type RecordBase = { _id?: string; createdAt: string };
type StoredLead = LeadInput & RecordBase;
type StoredEvent = EventInput & RecordBase;

const memory = {
  leads: [] as StoredLead[],
  events: [] as StoredEvent[]
};

let clientPromise: Promise<MongoClient> | null = null;

function getClient() {
  if (!process.env.MONGODB_URI) return null;
  clientPromise ??= new MongoClient(process.env.MONGODB_URI).connect();
  return clientPromise;
}

export async function insertLead(input: LeadInput) {
  const doc = { ...input, createdAt: new Date().toISOString() };
  const client = getClient();
  if (!client) {
    memory.leads.unshift({ ...doc, _id: randomUUID() });
    return doc;
  }
  await (await client).db().collection("leads").insertOne(doc);
  return doc;
}

export async function insertEvent(input: EventInput) {
  const doc = { ...input, createdAt: new Date().toISOString() };
  const client = getClient();
  if (!client) {
    memory.events.unshift({ ...doc, _id: randomUUID() });
    return doc;
  }
  await (await client).db().collection("events").insertOne(doc);
  return doc;
}

export async function getLeads() {
  const client = getClient();
  if (!client) return memory.leads;
  return (await client).db().collection("leads").find().sort({ createdAt: -1 }).limit(200).toArray();
}

export async function getEvents() {
  const client = getClient();
  if (!client) return memory.events;
  return (await client).db().collection("events").find().sort({ createdAt: -1 }).limit(200).toArray();
}
