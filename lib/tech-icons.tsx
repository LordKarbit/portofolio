import type { ComponentType, SVGProps } from "react";
import { Cloud, Lock, Map, ShieldCheck, Smartphone, WifiOff, Workflow } from "lucide-react";
import { SiMysql, SiNextdotjs, SiPython, SiReact, SiSupabase } from "react-icons/si";

type TechIcon = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

// Brand icons where one exists and reads clearly at small sizes
// (react-icons/si); lucide concept icons everywhere else — including
// PWA, whose Simple Icons mark is a "PWA" wordmark that turns illegible
// once shrunk into a chip. Tags without an entry fall back to text only.
const techIcons: Record<string, TechIcon> = {
  "Next.js": SiNextdotjs,
  React: SiReact,
  Python: SiPython,
  Supabase: SiSupabase,
  MySQL: SiMysql,
  PWA: Smartphone,
  Geospatial: Map,
  Maps: Map,
  "Offline-first": WifiOff,
  RBAC: Lock,
  Security: ShieldCheck,
  "Cloud Storage": Cloud,
  Workflow: Workflow,
};

export function TechStackIcons({
  tags,
  limit,
  variant = "chip",
}: {
  tags: string[];
  limit?: number;
  variant?: "chip" | "compact";
}) {
  const visible = typeof limit === "number" ? tags.slice(0, limit) : tags;

  return (
    <div className={variant === "compact" ? "tech-stack-icons" : "tag-row"}>
      {visible.map((tag) => {
        const Icon = techIcons[tag];
        return (
          <span key={tag}>
            {Icon && <Icon size={variant === "compact" ? 12 : 13} aria-hidden="true" />}
            {tag}
          </span>
        );
      })}
    </div>
  );
}
