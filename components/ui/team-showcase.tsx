"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// Staggered photo grid + name list (adapted from the 21st.dev "team-showcase" component). Hovering a photo or a
// name colours that photo, dims the others and highlights the matching row. Under each name: what they said
// (instead of a job title). Social links from the original are not needed here, so react-icons isn't used.

export interface TeamMember {
  id: string;
  name: ReactNode;
  /** Small line next to the name (e.g. "Customer"). */
  tag?: ReactNode;
  /** What the person said; shown under the name. */
  quote: ReactNode;
  image: string;
  alt: string;
}

export default function TeamShowcase({ members, accent = "#111111" }: { members: TeamMember[]; accent?: string }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const col1 = members.filter((_, i) => i % 3 === 0);
  const col2 = members.filter((_, i) => i % 3 === 1);
  const col3 = members.filter((_, i) => i % 3 === 2);

  return (
    <div className="flex w-full select-none flex-col items-start gap-10 md:flex-row md:gap-12 lg:gap-16">
      {/* Left: photo grid */}
      <div className="flex flex-shrink-0 gap-2 overflow-x-auto pb-1 md:gap-3 md:pb-0">
        <div className="flex flex-col gap-2 md:gap-3">
          {col1.map((m) => (
            <PhotoCard key={m.id} member={m} className="h-[120px] w-[110px] sm:h-[150px] sm:w-[140px] md:h-[196px] md:w-[184px] lg:h-[256px] lg:w-[240px]" hoveredId={hoveredId} onHover={setHoveredId} />
          ))}
        </div>
        <div className="mt-[48px] flex flex-col gap-2 sm:mt-[60px] md:mt-[80px] lg:mt-[104px] md:gap-3">
          {col2.map((m) => (
            <PhotoCard key={m.id} member={m} className="h-[132px] w-[122px] sm:h-[164px] sm:w-[154px] md:h-[216px] md:w-[203px] lg:h-[282px] lg:w-[264px]" hoveredId={hoveredId} onHover={setHoveredId} />
          ))}
        </div>
        <div className="mt-[22px] flex flex-col gap-2 sm:mt-[28px] md:mt-[38px] lg:mt-[50px] md:gap-3">
          {col3.map((m) => (
            <PhotoCard key={m.id} member={m} className="h-[125px] w-[115px] sm:h-[156px] sm:w-[146px] md:h-[204px] md:w-[191px] lg:h-[266px] lg:w-[249px]" hoveredId={hoveredId} onHover={setHoveredId} />
          ))}
        </div>
      </div>

      {/* Right: names, each with what they said */}
      <div className="flex w-full flex-1 flex-col gap-9 md:pt-2 lg:gap-11 lg:pt-6">
        {members.map((m) => (
          <MemberRow key={m.id} member={m} hoveredId={hoveredId} onHover={setHoveredId} accent={accent} />
        ))}
      </div>
    </div>
  );
}

function PhotoCard({
  member,
  className,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  className: string;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;
  return (
    <div
      className={cn("flex-shrink-0 cursor-pointer overflow-hidden rounded-xl transition-opacity duration-500", className, isDimmed ? "opacity-60" : "opacity-100")}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={member.image}
        alt={member.alt}
        loading="lazy"
        className="h-full w-full object-cover transition-[filter] duration-500"
        style={{ filter: isActive ? "grayscale(0) brightness(1)" : "grayscale(1) brightness(0.77)" }}
      />
    </div>
  );
}

function MemberRow({
  member,
  hoveredId,
  onHover,
  accent,
}: {
  member: TeamMember;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
  accent: string;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;
  return (
    <div
      className={cn("cursor-pointer transition-opacity duration-300", isDimmed ? "opacity-50" : "opacity-100")}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex items-center gap-2.5">
        <span
          className={cn("h-3 flex-shrink-0 rounded-[5px] transition-all duration-300", isActive ? "w-5" : "w-4 opacity-25")}
          style={{ background: isActive ? accent : "#111111" }}
        />
        <span className={cn("text-[17px] font-semibold leading-none tracking-tight transition-colors duration-300 md:text-[19px]", isActive ? "text-[#111111]" : "text-[#111111]/80")}>
          {member.name}
        </span>
        {member.tag && <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#8a8a8a]">{member.tag}</span>}
      </div>
      <p className="mt-2 pl-[26px] text-[15px] leading-[1.55] text-[#8a8a8a] md:text-[16px]">{member.quote}</p>
    </div>
  );
}
