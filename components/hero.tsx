import Link from "next/link";
import { ArrowRight, BrainCircuit, TrendingUp, Shield } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <BrainCircuit className="h-4 w-4" />
            ML-Powered Loan Prediction
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tighter text-balance">
            <span className="bg-gradient-to-r from-[#7b8cf6] to-[#b0bbf6] text-transparent bg-clip-text inline-block">
              Smart Loan Approval
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#906df4] to-[#c7b7f1] text-transparent bg-clip-text inline-block">
              Predictions
            </span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
            Leverage advanced machine learning algorithms to predict loan
            approval outcomes. Our system analyzes 18+ financial parameters
            using Logistic Regression and KNN models, achieving 86.5% accuracy.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/predict"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
            >
              Check Eligibility
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-8 py-3.5 text-base font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-20 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="flex flex-col items-start justify-between rounded-2xl border border-[#27272a] bg-[#18181b] p-6 shadow-sm">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" /> Model Accuracy
            </h3>
            <div className="text-4xl font-bold text-[#2bd9a5] mb-1">86.5%</div>
            <p className="text-sm text-muted-foreground">Logistic Regression</p>
          </div>
          <div className="flex flex-col items-start justify-between rounded-2xl border border-[#27272a] bg-[#18181b] p-6 shadow-sm">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
              <BrainCircuit className="h-4 w-4" /> Parameters Analyzed
            </h3>
            <div className="text-4xl font-bold text-[#906df4] mb-1">18+</div>
            <p className="text-sm text-muted-foreground">Financial & Personal Data</p>
          </div>
          <div className="flex flex-col items-start justify-between rounded-2xl border border-[#27272a] bg-[#18181b] p-6 shadow-sm">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
              <Shield className="h-4 w-4" /> ML Models
            </h3>
            <div className="text-4xl font-bold text-[#7b8cf6] mb-1">2</div>
            <p className="text-sm text-muted-foreground">LogReg & KNN Comparison</p>
          </div>
        </div>
      </div>
    </section>
  );
}
