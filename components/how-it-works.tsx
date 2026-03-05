import { ClipboardList, Cpu, CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Enter Your Details",
    description:
      "Fill in your financial parameters including income, credit score, loan amount, employment status, and other relevant details.",
  },
  {
    number: "02",
    icon: Cpu,
    title: "ML Model Processes",
    description:
      "Our trained Logistic Regression and KNN models analyze your data against patterns learned from 1,000+ historical loan applications.",
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Get Your Prediction",
    description:
      "Receive an instant prediction with a confidence score indicating the likelihood of your loan being approved.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#2bd9a5]">
            Process
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            <span className="bg-gradient-to-r from-[#7b8cf6] to-[#b0bbf6] text-transparent bg-clip-text">
              How CreditWise Works
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Three simple steps to predict your loan approval outcome using our
            machine learning system.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="relative flex flex-col items-center text-center">
              {index < steps.length - 1 && (
                <div className="absolute top-10 left-1/2 hidden h-0.5 w-full bg-[#27272a] lg:block" />
              )}
              <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#27272a] bg-[#18181b]">
                <step.icon className="h-8 w-8 text-[#7b8cf6]" />
              </div>
              <span className="mt-4 text-xs font-bold uppercase tracking-widest text-[#2bd9a5]">
                Step {step.number}
              </span>
              <h3 className="mt-2 text-xl font-bold text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
