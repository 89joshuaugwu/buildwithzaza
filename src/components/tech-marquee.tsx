const STACK = [
  "Next.js",
  "TypeScript",
  "Firebase",
  "Cloudinary",
  "Tailwind CSS",
  "Paystack",
  "Python",
  "Django",
];

export function TechMarquee() {
  const items = [...STACK, ...STACK];

  return (
    <div className="overflow-hidden border-y border-border bg-surface py-4">
      <div className="flex w-max animate-marquee gap-10">
        {items.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="font-mono text-sm text-fg-muted"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
