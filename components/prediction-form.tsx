"use client";

import { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  User,
  Briefcase,
  DollarSign,
  Home,
} from "lucide-react";

interface PredictionResult {
  approved: boolean;
  confidence: number;
  factors: { name: string; impact: "positive" | "negative" | "neutral" }[];
}

const EMPLOYMENT_OPTIONS = ["Salaried", "Self-employed", "Contract", "Unemployed"];
const MARITAL_OPTIONS = ["Married", "Single"];
const LOAN_PURPOSE_OPTIONS = ["Home", "Car", "Business", "Personal", "Education"];
const PROPERTY_AREA_OPTIONS = ["Urban", "Semiurban", "Rural"];
const EDUCATION_OPTIONS = ["Graduate", "Not Graduate"];
const GENDER_OPTIONS = ["Male", "Female"];
const EMPLOYER_OPTIONS = ["Private", "Government", "MNC", "Business", "Unemployed"];

const steps = [
  { id: 1, title: "Personal Details", icon: User },
  { id: 2, title: "Employment & Income", icon: Briefcase },
  { id: 3, title: "Financial Details", icon: DollarSign },
  { id: 4, title: "Loan Details", icon: Home },
];

export default function PredictionForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const [formData, setFormData] = useState({
    age: "",
    gender: "Male",
    maritalStatus: "Single",
    dependents: "0",
    educationLevel: "Graduate",
    employmentStatus: "Salaried",
    employerCategory: "Private",
    applicantIncome: "",
    coapplicantIncome: "",
    creditScore: "700",
    existingLoans: "0",
    dtiRatio: "",
    savings: "",
    collateralValue: "",
    loanAmount: "",
    loanTerm: "60",
    loanPurpose: "Home",
    propertyArea: "Urban",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResult(data);
    } catch {
      setResult({
        approved: false,
        confidence: 0,
        factors: [{ name: "Error processing request", impact: "negative" }],
      });
    }
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setResult(null);
    setCurrentStep(1);
    setFormData({
      age: "",
      gender: "Male",
      maritalStatus: "Single",
      dependents: "0",
      educationLevel: "Graduate",
      employmentStatus: "Salaried",
      employerCategory: "Private",
      applicantIncome: "",
      coapplicantIncome: "",
      creditScore: "700",
      existingLoans: "0",
      dtiRatio: "",
      savings: "",
      collateralValue: "",
      loanAmount: "",
      loanTerm: "60",
      loanPurpose: "Home",
      propertyArea: "Urban",
    });
  };

  if (result) {
    return <ResultView result={result} onReset={handleReset} />;
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Step Indicator */}
      <div className="mb-10 flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <button
                onClick={() => {
                  if (step.id < currentStep) setCurrentStep(step.id);
                }}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${
                  step.id === currentStep
                    ? "bg-primary text-primary-foreground shadow-md"
                    : step.id < currentStep
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step.id < currentStep ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  step.id
                )}
              </button>
              <span className="mt-2 hidden text-xs font-medium text-muted-foreground sm:block">
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`mx-2 h-0.5 flex-1 rounded ${
                  step.id < currentStep ? "bg-primary/40" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form Steps */}
      <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
        <h2 className="font-serif text-2xl font-bold text-foreground">
          {steps[currentStep - 1].title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {currentStep === 1 && "Tell us about yourself"}
          {currentStep === 2 && "Provide your employment and income details"}
          {currentStep === 3 && "Share your financial information"}
          {currentStep === 4 && "Specify your loan requirements"}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Step 1: Personal Details */}
          {currentStep === 1 && (
            <>
              <FormInput
                label="Age"
                type="number"
                value={formData.age}
                onChange={(v) => updateField("age", v)}
                placeholder="e.g. 30"
                min="18"
                max="70"
              />
              <FormSelect
                label="Gender"
                value={formData.gender}
                onChange={(v) => updateField("gender", v)}
                options={GENDER_OPTIONS}
              />
              <FormSelect
                label="Marital Status"
                value={formData.maritalStatus}
                onChange={(v) => updateField("maritalStatus", v)}
                options={MARITAL_OPTIONS}
              />
              <FormInput
                label="Dependents"
                type="number"
                value={formData.dependents}
                onChange={(v) => updateField("dependents", v)}
                placeholder="e.g. 2"
                min="0"
                max="10"
              />
              <FormSelect
                label="Education Level"
                value={formData.educationLevel}
                onChange={(v) => updateField("educationLevel", v)}
                options={EDUCATION_OPTIONS}
              />
            </>
          )}

          {/* Step 2: Employment & Income */}
          {currentStep === 2 && (
            <>
              <FormSelect
                label="Employment Status"
                value={formData.employmentStatus}
                onChange={(v) => updateField("employmentStatus", v)}
                options={EMPLOYMENT_OPTIONS}
              />
              <FormSelect
                label="Employer Category"
                value={formData.employerCategory}
                onChange={(v) => updateField("employerCategory", v)}
                options={EMPLOYER_OPTIONS}
              />
              <FormInput
                label="Applicant Income (in rupees)"
                type="number"
                value={formData.applicantIncome}
                onChange={(v) => updateField("applicantIncome", v)}
                placeholder="e.g. 50000"
                prefix="₹"
              />
              <FormInput
                label="Co-applicant Income (in rupees)"
                type="number"
                value={formData.coapplicantIncome}
                onChange={(v) => updateField("coapplicantIncome", v)}
                placeholder="e.g. 20000"
                prefix="₹"
              />
            </>
          )}

          {/* Step 3: Financial Details */}
          {currentStep === 3 && (
            <>
              <FormSlider
                label="Credit Score"
                value={formData.creditScore}
                onChange={(v) => updateField("creditScore", v)}
                min="300"
                max="900"
              />
              <FormInput
                label="Existing Loans"
                type="number"
                value={formData.existingLoans}
                onChange={(v) => updateField("existingLoans", v)}
                placeholder="e.g. 1"
                min="0"
                max="10"
              />
              <FormInput
                label="DTI Ratio"
                type="number"
                value={formData.dtiRatio}
                onChange={(v) => updateField("dtiRatio", v)}
                placeholder="e.g. 0.35"
                step="0.01"
                min="0"
                max="1"
              />
              <FormInput
                label="Savings (in rupees)"
                type="number"
                value={formData.savings}
                onChange={(v) => updateField("savings", v)}
                placeholder="e.g. 100000"
                prefix="₹"
              />
              <FormInput
                label="Collateral Value (in rupees)"
                type="number"
                value={formData.collateralValue}
                onChange={(v) => updateField("collateralValue", v)}
                placeholder="e.g. 500000"
                prefix="₹"
              />
            </>
          )}

          {/* Step 4: Loan Details */}
          {currentStep === 4 && (
            <>
              <FormInput
                label="Loan Amount (in rupees)"
                type="number"
                value={formData.loanAmount}
                onChange={(v) => updateField("loanAmount", v)}
                placeholder="e.g. 1000000"
                prefix="₹"
              />
              <FormSlider
                label="Loan Term (months)"
                value={formData.loanTerm}
                onChange={(v) => updateField("loanTerm", v)}
                min="12"
                max="360"
                step="12"
              />
              <FormSelect
                label="Loan Purpose"
                value={formData.loanPurpose}
                onChange={(v) => updateField("loanPurpose", v)}
                options={LOAN_PURPOSE_OPTIONS}
              />
              <FormSelect
                label="Property Area"
                value={formData.propertyArea}
                onChange={(v) => updateField("propertyArea", v)}
                options={PROPERTY_AREA_OPTIONS}
              />
            </>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-between">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          {currentStep < 4 ? (
            <button
              onClick={() => setCurrentStep((prev) => Math.min(4, prev + 1))}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  Predict Eligibility
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ResultView({
  result,
  onReset,
}: {
  result: PredictionResult;
  onReset: () => void;
}) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-xl border border-border bg-card p-10 shadow-sm text-center">
        <div
          className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full ${
            result.approved
              ? "bg-success/10"
              : "bg-destructive/10"
          }`}
        >
          {result.approved ? (
            <CheckCircle2 className="h-12 w-12 text-success" />
          ) : (
            <XCircle className="h-12 w-12 text-destructive" />
          )}
        </div>

        <h2 className="mt-6 font-serif text-3xl font-bold text-foreground">
          {result.approved ? "Loan Likely Approved" : "Loan Likely Rejected"}
        </h2>

        <p className="mt-3 text-muted-foreground">
          {result.approved
            ? "Based on our ML analysis, your loan application is likely to be approved."
            : "Based on our ML analysis, your loan application may face challenges."}
        </p>

        {/* Confidence */}
        <div className="mt-8 rounded-lg bg-secondary p-6">
          <p className="text-sm font-medium text-muted-foreground">
            Confidence Score
          </p>
          <div className="mt-3 flex items-center justify-center gap-4">
            <div className="h-3 flex-1 rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  result.approved ? "bg-success" : "bg-destructive"
                }`}
                style={{ width: `${result.confidence}%` }}
              />
            </div>
            <span className="text-2xl font-bold text-foreground">
              {result.confidence}%
            </span>
          </div>
        </div>

        {/* Key Factors */}
        <div className="mt-8">
          <h3 className="font-serif text-lg font-semibold text-foreground">
            Key Factors
          </h3>
          <div className="mt-4 space-y-3">
            {result.factors.map((factor, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-lg border border-border px-4 py-3"
              >
                <div
                  className={`h-2.5 w-2.5 rounded-full ${
                    factor.impact === "positive"
                      ? "bg-success"
                      : factor.impact === "negative"
                      ? "bg-destructive"
                      : "bg-warning"
                  }`}
                />
                <span className="text-sm text-foreground">{factor.name}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onReset}
          className="mt-10 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-8 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
        >
          <RotateCcw className="h-4 w-4" />
          Start New Prediction
        </button>
      </div>
    </div>
  );
}

function FormInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  prefix,
  min,
  max,
  step,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  prefix?: string;
  min?: string;
  max?: string;
  step?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className={`w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
            prefix ? "pl-8" : ""
          }`}
        />
      </div>
    </div>
  );
}

function FormSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function FormSlider({
  label,
  value,
  onChange,
  min,
  max,
  step = "1",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  min: string;
  max: string;
  step?: string;
}) {
  return (
    <div className="flex flex-col gap-2 relative">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <span className="text-sm font-bold text-primary">{value}</span>
      </div>
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        max={max}
        step={step}
        className="w-full h-2 bg-input rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
      />
      <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
