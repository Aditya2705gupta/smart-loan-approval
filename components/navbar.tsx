"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShieldCheck } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-[#5c6df2]" />
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-[#5c6df2] to-[#2bd9a5] text-transparent bg-clip-text">
            CreditWise
          </span>
        </Link>

        <div className="hidden md:flex md:items-center md:gap-8">
          <Link
            href="#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            How It Works
          </Link>
          <Link
            href="#models"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Models
          </Link>
          <Link
            href="/predict"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Check Eligibility
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="flex flex-col gap-4 px-6 py-6">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="#models"
              className="text-sm font-medium text-muted-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Models
            </Link>
            <Link
              href="/predict"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Check Eligibility
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
