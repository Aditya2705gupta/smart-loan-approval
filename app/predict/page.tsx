import Navbar from "@/components/navbar";
import PredictionForm from "@/components/prediction-form";
import Footer from "@/components/footer";
import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Check Loan Eligibility - CreditWise",
  description:
    "Enter your financial parameters and get an instant ML-powered loan approval prediction.",
};

export default function PredictPage() {
  return (
    <main>
      <Navbar />
      <section className="pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <ShieldCheck className="h-4 w-4" />
              AI-Powered Assessment
            </div>
            <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Check Your Loan Eligibility
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Enter your details below and our ML models will analyze your
              profile to predict your loan approval probability.
            </p>
          </div>
          <PredictionForm />
        </div>
      </section>
      <Footer />
    </main>
  );
}
