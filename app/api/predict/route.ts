import { NextResponse } from "next/server";

/**
 * CreditWise Loan Prediction API
 *
 * This implements a rule-based scoring system that mirrors the patterns
 * learned by the Logistic Regression and KNN models trained in the
 * Jupyter notebook. The scoring is based on the correlation analysis
 * and feature importance from the trained ML models.
 *
 * Key features from the notebook analysis:
 * - Credit Score is a strong predictor
 * - DTI Ratio inversely correlates with approval
 * - Higher income and savings improve approval chances
 * - Collateral value provides loan security
 * - Employment status and education matter
 */

interface FormData {
  age: string;
  gender: string;
  maritalStatus: string;
  dependents: string;
  educationLevel: string;
  employmentStatus: string;
  employerCategory: string;
  applicantIncome: string;
  coapplicantIncome: string;
  creditScore: string;
  existingLoans: string;
  dtiRatio: string;
  savings: string;
  collateralValue: string;
  loanAmount: string;
  loanTerm: string;
  loanPurpose: string;
  propertyArea: string;
}

interface Factor {
  name: string;
  impact: "positive" | "negative" | "neutral";
}

export async function POST(request: Request) {
  try {
    const data: FormData = await request.json();

    const age = parseFloat(data.age) || 30;
    const applicantIncome = parseFloat(data.applicantIncome) || 0;
    const coapplicantIncome = parseFloat(data.coapplicantIncome) || 0;
    const creditScore = parseFloat(data.creditScore) || 600;
    const existingLoans = parseFloat(data.existingLoans) || 0;
    const dtiRatio = parseFloat(data.dtiRatio) || 0.4;
    const savings = parseFloat(data.savings) || 0;
    const collateralValue = parseFloat(data.collateralValue) || 0;
    const loanAmount = parseFloat(data.loanAmount) || 0;
    const loanTerm = parseFloat(data.loanTerm) || 60;

    let score = 50; // Base score
    const factors: Factor[] = [];

    // Credit Score (most important factor from correlation analysis)
    // Range: 300-900, median ~660
    if (creditScore >= 750) {
      score += 18;
      factors.push({ name: "Excellent credit score", impact: "positive" });
    } else if (creditScore >= 700) {
      score += 12;
      factors.push({ name: "Good credit score", impact: "positive" });
    } else if (creditScore >= 650) {
      score += 5;
      factors.push({ name: "Fair credit score", impact: "neutral" });
    } else if (creditScore >= 600) {
      score -= 5;
      factors.push({ name: "Below average credit score", impact: "negative" });
    } else {
      score -= 15;
      factors.push({ name: "Poor credit score", impact: "negative" });
    }

    // DTI Ratio (inversely correlated with approval)
    if (dtiRatio <= 0.2) {
      score += 12;
      factors.push({ name: "Low debt-to-income ratio", impact: "positive" });
    } else if (dtiRatio <= 0.35) {
      score += 6;
      factors.push({ name: "Manageable debt-to-income ratio", impact: "positive" });
    } else if (dtiRatio <= 0.5) {
      score -= 4;
      factors.push({ name: "High debt-to-income ratio", impact: "negative" });
    } else {
      score -= 12;
      factors.push({ name: "Very high debt-to-income ratio", impact: "negative" });
    }

    // Income Assessment
    const totalIncome = applicantIncome + coapplicantIncome;
    const incomeToLoanRatio = loanAmount > 0 ? totalIncome / loanAmount : 1;

    if (incomeToLoanRatio >= 1) {
      score += 10;
      factors.push({ name: "Strong income relative to loan amount", impact: "positive" });
    } else if (incomeToLoanRatio >= 0.5) {
      score += 4;
      factors.push({ name: "Adequate income for loan amount", impact: "positive" });
    } else if (incomeToLoanRatio >= 0.25) {
      score -= 3;
      factors.push({ name: "Moderate income relative to loan", impact: "neutral" });
    } else {
      score -= 10;
      factors.push({ name: "Low income relative to loan amount", impact: "negative" });
    }

    // Savings
    if (savings >= 15000) {
      score += 6;
      factors.push({ name: "Substantial savings", impact: "positive" });
    } else if (savings >= 5000) {
      score += 2;
      factors.push({ name: "Moderate savings", impact: "neutral" });
    } else {
      score -= 4;
      factors.push({ name: "Low savings", impact: "negative" });
    }

    // Collateral Value
    const loanToCollateral = collateralValue > 0 ? loanAmount / collateralValue : 2;
    if (loanToCollateral <= 0.5) {
      score += 8;
      factors.push({ name: "High collateral coverage", impact: "positive" });
    } else if (loanToCollateral <= 1) {
      score += 3;
      factors.push({ name: "Adequate collateral", impact: "positive" });
    } else {
      score -= 5;
      factors.push({ name: "Insufficient collateral", impact: "negative" });
    }

    // Existing Loans
    if (existingLoans === 0) {
      score += 5;
      factors.push({ name: "No existing loans", impact: "positive" });
    } else if (existingLoans <= 2) {
      score += 1;
    } else {
      score -= 5;
      factors.push({ name: "Multiple existing loans", impact: "negative" });
    }

    // Employment Status
    if (data.employmentStatus === "Salaried") {
      score += 4;
      factors.push({ name: "Stable salaried employment", impact: "positive" });
    } else if (data.employmentStatus === "Self-employed") {
      score += 1;
    } else if (data.employmentStatus === "Unemployed") {
      score -= 10;
      factors.push({ name: "Currently unemployed", impact: "negative" });
    }

    // Education Level
    if (data.educationLevel === "Graduate") {
      score += 3;
      factors.push({ name: "Graduate education", impact: "positive" });
    }

    // Employer Category
    if (data.employerCategory === "Government" || data.employerCategory === "MNC") {
      score += 3;
      factors.push({ name: "Stable employer category", impact: "positive" });
    }

    // Loan Term (shorter terms are slightly favorable)
    if (loanTerm <= 36) {
      score += 2;
    } else if (loanTerm >= 84) {
      score -= 2;
    }

    // Age factor
    if (age >= 25 && age <= 55) {
      score += 2;
    } else if (age < 22 || age > 60) {
      score -= 3;
    }

    // Clamp score between 0 and 100
    score = Math.max(0, Math.min(100, score));

    // Determine approval (threshold based on model's ~0.305 approval rate in data)
    const approved = score >= 62;

    // Return top factors (max 5)
    const topFactors = factors
      .sort((a, b) => {
        const order = { negative: 0, neutral: 1, positive: 2 };
        if (!approved) return order[a.impact] - order[b.impact];
        return order[b.impact] - order[a.impact];
      })
      .slice(0, 5);

    return NextResponse.json({
      approved,
      confidence: score,
      factors: topFactors,
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request data" },
      { status: 400 }
    );
  }
}
