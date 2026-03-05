import { Activity, Target, Gauge, BarChart3 } from "lucide-react";

const models = [
  {
    name: "Logistic Regression",
    description:
      "A statistical model that uses a logistic function to model binary outcomes. It provides probabilistic predictions and is well-suited for linearly separable data.",
    metrics: [
      { label: "Precision", value: "78.3%", icon: Target },
      { label: "Accuracy", value: "86.5%", icon: Gauge },
      { label: "Recall", value: "77.0%", icon: Activity },
      { label: "F1 Score", value: "77.7%", icon: BarChart3 },
    ],
  },
  {
    name: "K-Nearest Neighbors",
    description:
      "A non-parametric algorithm that classifies data points based on the majority class of their k-nearest neighbors. It captures complex decision boundaries.",
    metrics: [
      { label: "Precision", value: "78.3%", icon: Target },
      { label: "Accuracy", value: "86.5%", icon: Gauge },
      { label: "Recall", value: "77.0%", icon: Activity },
      { label: "F1 Score", value: "77.7%", icon: BarChart3 },
    ],
  },
];

export default function ModelsSection() {
  return (
    <section id="models" className="py-20 lg:py-28 bg-secondary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Technology
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Our ML Models
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            CreditWise uses two proven machine learning algorithms trained on
            real loan application data for reliable predictions.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2">
          {models.map((model) => (
            <div
              key={model.name}
              className="rounded-xl border border-border bg-card p-8 shadow-sm"
            >
              <h3 className="font-serif text-2xl font-bold text-foreground">
                {model.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {model.description}
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {model.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="flex items-center gap-3 rounded-lg bg-secondary p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10">
                      <metric.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-foreground">
                        {metric.value}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {metric.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
