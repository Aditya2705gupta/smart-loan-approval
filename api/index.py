from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np
import os

app = FastAPI()

# Get the path to the models directory
# In Vercel, the current working directory might be different so we use __file__
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, 'models')

# Global variables to hold models
model = None
scaler = None
encoders = None
feature_columns = None

class LoanApplication(BaseModel):
    age: str
    gender: str
    maritalStatus: str
    dependents: str
    educationLevel: str
    employmentStatus: str
    employerCategory: str
    applicantIncome: str
    coapplicantIncome: str
    creditScore: str
    existingLoans: str
    dtiRatio: str
    savings: str
    collateralValue: str
    loanAmount: str
    loanTerm: str
    loanPurpose: str
    propertyArea: str

@app.on_event("startup")
def load_models():
    global model, scaler, encoders, feature_columns
    try:
        model = joblib.load(os.path.join(MODELS_DIR, 'logistic_regression_model.pkl'))
        scaler = joblib.load(os.path.join(MODELS_DIR, 'scaler.pkl'))
        encoders = joblib.load(os.path.join(MODELS_DIR, 'encoders.pkl'))
        feature_columns = joblib.load(os.path.join(MODELS_DIR, 'feature_columns.pkl'))
        print("Models loaded successfully")
    except Exception as e:
        print(f"Error loading models: {e}")

@app.post("/api/predict_ml")
async def predict_loan(application: LoanApplication):
    if not model or not scaler or not encoders or not feature_columns:
        # Try loading them again if missing (sometimes Vercel cold starts miss the startup event)
        load_models()
        if not model:
            raise HTTPException(status_code=500, detail="Models not loaded")

    try:
        # 1. Convert incoming JSON strictly to a DataFrame with same column names
        # Make sure the keys match the training data feature names EXACTLY.
        # This mapping assumes the frontend sends camelCase but notebook expects PascalCase (with underscores sometimes)
        
        # Based on df.info() shown earlier in the notebook:
        # 'Applicant_Income', 'Coapplicant_Income', 'Employment_Status', 'Age', 'Gender', ...
        input_data = {
            'Age': [float(application.age) if application.age else 30.0],
            'Applicant_Income': [float(application.applicantIncome) if application.applicantIncome else 0.0],
            'Coapplicant_Income': [float(application.coapplicantIncome) if application.coapplicantIncome else 0.0],
            'Credit_Score': [float(application.creditScore) if application.creditScore else 600.0],
            'Existing_Loans': [float(application.existingLoans) if application.existingLoans else 0.0],
            'DTI_Ratio': [float(application.dtiRatio) if application.dtiRatio else 0.4],
            'Savings': [float(application.savings) if application.savings else 0.0],
            'Collateral_Value': [float(application.collateralValue) if application.collateralValue else 0.0],
            'Loan_Amount': [float(application.loanAmount) if application.loanAmount else 0.0],
            'Loan_Term_Months': [float(application.loanTerm) if application.loanTerm else 60.0],
            
            # Categoricals
            'Gender': [application.gender],
            'Marital_Status': [application.maritalStatus],
            'Dependents': [application.dependents],
            'Education_Level': [application.educationLevel],
            'Employment_Status': [application.employmentStatus],
            'Employer_Category': [application.employerCategory],
            'Loan_Purpose': [application.loanPurpose],
            'Property_Area': [application.propertyArea],
        }
        
        df = pd.DataFrame(input_data)
        
        # Add any missing expected columns with default 0 to prevent pandas errors
        for col in feature_columns:
            if col not in df.columns:
                df[col] = 0

        # Ensure correct column order required by sklearn
        df = df[feature_columns]

        # 2. Preprocess categoricals using saved encoders
        for col, encoder in encoders.items():
            if col in df.columns:
                # Handle unseen labels by assigning the first class, or mode
                try:
                    df[col] = encoder.transform(df[col])
                except ValueError:
                    df[col] = 0 # Default fallback for unseen labels

        # 3. Scale numerical features
        X_scaled = scaler.transform(df)
        
        # 4. Predict
        prediction = model.predict(X_scaled)[0]
        probabilities = model.predict_proba(X_scaled)[0]
        
        # The positive class is typically at index 1
        confidence = probabilities[1] * 100 if len(probabilities) > 1 else 0
        approved = bool(prediction == 1)

        # 5. Generate high-level factors to explain the decision to UI
        factors = []
        if float(application.creditScore) >= 750:
             factors.append({"name": "Excellent credit score", "impact": "positive"})
        elif float(application.creditScore) < 600:
             factors.append({"name": "Poor credit score", "impact": "negative"})
             
        if float(application.dtiRatio) > 0.4:
            factors.append({"name": "High Debt-to-Income Ratio", "impact": "negative"})
            
        if float(application.collateralValue) > float(application.loanAmount):
             factors.append({"name": "Strong Collateral Value", "impact": "positive"})
             
        # Fallback if no factors created
        if len(factors) == 0:
            if approved:
                factors.append({"name": "Overall healthy profile", "impact": "positive"})
            else:
                 factors.append({"name": "High risk profile parameters", "impact": "negative"})

        return {
            "approved": approved,
            "confidence": round(confidence, 1),
            "factors": factors
        }

    except Exception as e:
        print(f"Error during prediction: {e}")
        raise HTTPException(status_code=500, detail=str(e))
