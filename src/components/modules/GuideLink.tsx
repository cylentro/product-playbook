"use client";

import Link from "next/link";
import { useAppStore } from "@/store/appStore";

interface GuideLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function GuideLink({ href, children, className }: GuideLinkProps) {
  const mode = useAppStore((state) => state.mode);

  return (
    <Link href={`${href}?mode=${mode}`} className={className}>
      {children}
    </Link>
  );
}
