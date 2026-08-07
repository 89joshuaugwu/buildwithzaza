// Signature hero element: a "deploy log" instead of the generic
// 5+ years / 32+ projects / 57+ clients stat-card row. Real shipped work,
// dramatized as the terminal output it actually came from.
//
// Phase 1: static. Phase 2 upgrades this to pull `currentlyBuilding` and
// recent ships live from the `profile` doc in Firestore, with a typing
// animation and a subtle 3D tilt on hover/device-orientation.

const LOG_LINES = [
  {
    cmd: "deploy acadegrade-v2",
    status: "live" as const,
    detail: "27 routes · AI-assisted grading",
  },
  {
    cmd: "deploy rollmark",
    status: "live" as const,
    detail: "QR attendance · geofenced sessions",
  },
  {
    cmd: "deploy hscesut",
    status: "live" as const,
    detail: "church platform · first paid client",
  },
  {
    cmd: "deploy vulnai",
    status: "live" as const,
    detail: "scan output to pentest report",
  },
  {
    cmd: "status",
    status: "shipping" as const,
    detail: "final year, ESUT — Aug 2026",
  },
];

export function BuildLog() {
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
        {LOG_LINES.map((line) => (
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
