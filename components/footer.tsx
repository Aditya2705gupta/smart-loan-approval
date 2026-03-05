import { ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <span className="font-serif text-lg font-bold text-foreground">
              CreditWise
            </span>
          </div>
          <div className="flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              How It Works
            </Link>
            <Link
              href="#models"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Models
            </Link>
            <Link
              href="/predict"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Predict
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">
            Built with Machine Learning
          </p>
        </div>
      </div>
    </footer>
  );
}
