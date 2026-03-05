import {
  Wallet,
  UserCheck,
  BarChart3,
  Building,
  CreditCard,
  PieChart,
} from "lucide-react";

const features = [
  {
    icon: Wallet,
    title: "Income Analysis",
    description:
      "Evaluates applicant and co-applicant income to assess repayment capacity and financial stability.",
  },
  {
    icon: CreditCard,
    title: "Credit Assessment",
    description:
      "Analyzes credit score, existing loans, and DTI ratio to gauge creditworthiness and risk level.",
  },
  {
    icon: UserCheck,
    title: "Profile Evaluation",
    description:
      "Considers age, education, employment status, and personal details for a comprehensive applicant profile.",
  },
  {
    icon: Building,
    title: "Property & Collateral",
    description:
      "Assesses property area, collateral value, and employer category to determine loan security.",
  },
  {
    icon: BarChart3,
    title: "Multi-Model Prediction",
    description:
      "Uses both Logistic Regression and KNN algorithms, comparing results for more reliable predictions.",
  },
  {
    icon: PieChart,
    title: "Comprehensive Scoring",
    description:
      "Provides precision, accuracy, recall, and F1 scores for transparent and interpretable results.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-secondary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#2bd9a5]">
            Capabilities
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            <span className="bg-gradient-to-r from-[#7b8cf6] to-[#b0bbf6] text-transparent bg-clip-text">
              Data-Driven Loan Assessment
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Our ML models evaluate multiple dimensions of your financial profile to
            deliver accurate loan approval predictions.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-[#27272a] bg-[#18181b] p-8 shadow-sm transition-all hover:border-[#7b8cf6]/50 hover:bg-[#1f1f23]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#27272a] transition-colors group-hover:bg-[#7b8cf6]/20">
                <feature.icon className="h-6 w-6 text-[#7b8cf6]" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
