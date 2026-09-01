import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.98]";

const variants = {
  primary:
    "bg-ink text-base hover:bg-accent hover:text-white px-8 py-4 text-sm",
  light:
    "bg-white text-ink hover:bg-accent hover:text-white px-8 py-4 text-sm",
  outline:
    "border border-divider bg-transparent text-ink hover:border-ink px-8 py-4 text-sm",
  ghost: "text-ink hover:text-accent px-4 py-2 text-sm",
} as const;

interface ButtonProps {
  href?: string;
  as?: "link" | "button" | "submit";
  variant?: keyof typeof variants;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  ariaLabel?: string;
}

export function Pill({
  href,
  as = "link",
  variant = "primary",
  className,
  children,
  onClick,
  type = "button",
  ariaLabel,
}: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  if (href && as === "link") {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  if (as === "submit") {
    return (
      <button type="submit" className={classes} aria-label={ariaLabel}>
        {children}
      </button>
    );
  }

  return (
    <button type={as === "button" ? type : type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}