"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";

interface LogLine {
  cmd: string;
  status: "live" | "shipping";
  detail: string;
}

// Falls back to this if `profile/main` doesn't exist yet in Firestore (e.g.
// fresh clone, before you've seeded anything from /admin) — so the hero
// never looks broken or empty on a fresh setup.
const FALLBACK_LOG: LogLine[] = [
  {
    cmd: "deploy acadegrade-v2",
    status: "live",
    detail: "27 routes · AI-assisted grading",
  },
  {
    cmd: "deploy rollmark",
    status: "live",
    detail: "QR attendance · geofenced sessions",
  },
  {
    cmd: "deploy hscesut",
    status: "live",
    detail: "church platform · first paid client",
  },
  {
    cmd: "deploy vulnai",
    status: "live",
    detail: "scan output to pentest report",
  },
  {
    cmd: "status",
    status: "shipping",
    detail: "final year, ESUT — Aug 2026",
  },
];

export function BuildLog() {
  const [lines, setLines] = useState<LogLine[]>(FALLBACK_LOG);

  useEffect(() => {
    async function load() {
      try {
        const snap = await getDoc(doc(db, "profile", "main"));
        const data = snap.data();
        if (data?.buildLog?.length) {
          setLines(data.buildLog as LogLine[]);
        }
        // No doc yet, or no buildLog field → keep FALLBACK_LOG.
      } catch {
        // Firestore not configured yet, or rules not published — this is
        // decoration, not something worth surfacing an error for. Fail quiet.
      }
    }
    load();
  }, []);

  return (
    <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl bg-ink shadow-2xl shadow-ink/30">
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="ml-2 font-mono text-xs text-white/50">
          joshuazaza — deploy log
        </span>
      </div>
      <div className="space-y-3 px-4 py-4 text-left font-mono text-[13px] leading-relaxed">
        {lines.map((line) => (
          <div key={line.cmd}>
            <p className="text-white/40">
              <span className="text-gold">$</span> {line.cmd}
            </p>
            <p className="pl-4">
              <span
                className={line.status === "live" ? "text-ok" : "text-gold"}
              >
                {line.status === "live" ? "✓" : "…"} {line.status}
              </span>
              <span className="text-white/40"> · {line.detail}</span>
            </p>
          </div>
        ))}
        <p className="pl-1 text-white/30">
          <span className="animate-pulse text-gold">▍</span>
        </p>
      </div>
    </div>
  );
}
