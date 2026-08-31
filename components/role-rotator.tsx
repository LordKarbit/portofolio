"use client";

import { useEffect, useMemo, useState } from "react";

type Phase = "typing" | "deleting" | "waiting";

export function RoleRotator({ roles, summary }: { roles: readonly string[]; summary: string }) {
  const characters = useMemo(() => roles.map((role) => Array.from(role)), [roles]);
  const [roleIndex, setRoleIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const current = characters[roleIndex] ?? [];
    if (reducedMotion) return;

    let delay = length === 0 && phase === "typing" ? 420 : 55;
    let action = () => setLength((value) => value + 1);

    if (phase === "typing" && length >= current.length) {
      delay = 2200;
      action = () => setPhase("deleting");
    } else if (phase === "deleting" && length > 0) {
      delay = 30;
      action = () => setLength((value) => value - 1);
    } else if (phase === "deleting" && length === 0) {
      delay = 380;
      action = () => setPhase("waiting");
    } else if (phase === "waiting") {
      delay = 1;
      action = () => {
        setRoleIndex((value) => (value + 1) % characters.length);
        setPhase("typing");
      };
    }

    const timer = window.setTimeout(action, delay);
    return () => window.clearTimeout(timer);
  }, [characters, length, phase, reducedMotion, roleIndex]);

  const visibleRole = reducedMotion
    ? (characters[0] ?? []).join("")
    : (characters[roleIndex] ?? []).slice(0, length).join("");

  return (
    <span className="role-rotator">
      <span className="role-rotator-words" aria-hidden="true">
        <span className="typewriter-text">{visibleRole}</span>
        <span className="typewriter-cursor" />
      </span>
      <span className="sr-only">{summary}</span>
    </span>
  );
}
