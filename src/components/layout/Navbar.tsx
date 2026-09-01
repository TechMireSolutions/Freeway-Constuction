"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Menu, X, Phone, ArrowUpRight } from "lucide-react";
import { navigation } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { ClientSettings } from "@/types/sanity";
import { Logo } from "@/components/ui/Logo";

interface NavbarProps {
  settings: ClientSettings | null;
}

export function Navbar({ settings }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={reduce ? false : { y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled || open
            ? "border-b border-white/10 bg-ink/85 backdrop-blur-md"
            : "bg-gradient-to-b from-ink/70 via-ink/25 to-transparent",
        )}
      >
        <nav
          className={cn(
            "mx-auto flex h-20 max-w-7xl items-center justify-between px-5 transition-colors duration-500 sm:px-8",
          )}
          aria-label="Main navigation"
        >
          <Logo settings={settings} light />

          <div className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative py-2 text-sm font-medium tracking-wide transition-colors duration-300",
                    active ? "text-white" : "text-white/75 hover:text-white",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100",
                      active && "scale-x-100",
                    )}
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            {settings?.phone ? (
              <a
                href={`tel:${settings.phone}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-white/75 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4" strokeWidth={1.5} />
                {settings.phone}
              </a>
            ) : null}
            <Link
              href="/contact"
              className="group inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-accent hover:text-white"
            >
              Get a Quote
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition-colors lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col bg-base lg:hidden"
          >
            <div className="flex flex-1 flex-col justify-center px-8">
              <ul className="flex flex-col gap-2">
                {navigation.map((item, index) => {
                  const active = pathname === item.href;
                  return (
                    <motion.li
                      key={item.href}
                      initial={reduce ? false : { opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 + index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center justify-between py-3 text-3xl font-semibold tracking-tight transition-colors",
                          active ? "text-accent" : "text-ink",
                        )}
                      >
                        {item.label}
                        <ArrowUpRight className="h-5 w-5" />
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
            <div className="border-t border-divider px-8 py-6">
              {settings?.phone ? (
                <a
                  href={`tel:${settings.phone}`}
                  className="inline-flex items-center gap-2 text-base font-medium text-ink"
                >
                  <Phone className="h-5 w-5" strokeWidth={1.5} />
                  {settings.phone}
                </a>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}