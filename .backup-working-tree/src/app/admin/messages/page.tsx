"use client";

import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { Mail, MailOpen, Trash2 } from "lucide-react";

interface Message {
  id: string;
  type: "contact" | "hire";
  name: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  subject?: string;
  description: string;
  projectType?: string;
  contactPrefs?: string[];
  read: boolean;
  createdAt?: Timestamp;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [filter, setFilter] = useState<"all" | "contact" | "hire">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Message));
    });
    return unsub;
  }, []);

  async function markRead(id: string, read: boolean) {
    await updateDoc(doc(db, "messages", id), { read });
  }

  async function remove(id: string) {
    if (!confirm("Delete this message?")) return;
    await deleteDoc(doc(db, "messages", id));
  }

  const filtered = messages.filter((m) => filter === "all" || m.type === filter);
  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-fg">Inbox</h1>
          <p className="mt-1 text-sm text-fg-muted">
            {unreadCount} unread of {messages.length}
          </p>
        </div>
        <div className="flex gap-2">
          {(["all", "hire", "contact"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                filter === f
                  ? "bg-accent text-accent-fg"
                  : "border border-border text-fg-muted"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {filtered.length === 0 && (
          <p className="py-12 text-center text-sm text-fg-muted">
            No messages here.
          </p>
        )}
        {filtered.map((m) => {
          const expanded = expandedId === m.id;
          return (
            <div
              key={m.id}
              className={`rounded-xl border p-4 ${
                m.read ? "border-border" : "border-accent bg-accent/5"
              }`}
            >
              <div
                className="flex cursor-pointer items-start justify-between gap-3"
                onClick={() => {
                  setExpandedId(expanded ? null : m.id);
                  if (!m.read) markRead(m.id, true);
                }}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-bg px-2 py-0.5 font-mono text-[10px] uppercase text-fg-muted">
                      {m.type}
                    </span>
                    <p className="truncate text-sm font-semibold text-fg">
                      {m.name}
                    </p>
                  </div>
                  <p className="mt-1 truncate text-sm text-fg-muted">
                    {m.subject || m.description}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      markRead(m.id, !m.read);
                    }}
                    className="text-fg-muted hover:text-accent"
                    title={m.read ? "Mark unread" : "Mark read"}
                  >
                    {m.read ? <MailOpen size={16} /> : <Mail size={16} />}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      remove(m.id);
                    }}
                    className="text-fg-muted hover:text-red-500"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {expanded && (
                <div className="mt-3 space-y-2 border-t border-border pt-3 text-sm">
                  <p className="text-fg-muted">{m.description}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-fg-muted">
                    <span>{m.email}</span>
                    {m.phone && <span>{m.phone}</span>}
                    {m.whatsapp && <span>WA: {m.whatsapp}</span>}
                    {m.projectType && <span>Type: {m.projectType}</span>}
                    {m.contactPrefs && (
                      <span>Prefers: {m.contactPrefs.join(", ")}</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
