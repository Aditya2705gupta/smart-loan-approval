import pandas as pd
import numpy as np
import os
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression

def train_and_save_model():
    print("Loading data...")
    # Load data
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    data_path = os.path.join(base_dir, 'loan_approval_data.csv')
    df = pd.read_csv(data_path)
    
    print("Preprocessing data...")
    # Drop irrelevant column
    if 'Applicant_ID' in df.columns:
        df = df.drop(columns=['Applicant_ID'])
        
    # Handle Missing Values exactly like notebook
    numerical_cols = df.select_dtypes(include=['number']).columns
    categorical_cols = df.select_dtypes(include=['object']).columns
    
    num_imp = SimpleImputer(strategy="median")
    df[numerical_cols] = num_imp.fit_transform(df[numerical_cols])
    
    cat_imp = SimpleImputer(strategy="most_frequent")
    df[categorical_cols] = cat_imp.fit_transform(df[categorical_cols])
    
    # Encode categorical variables
    encoders = {}
    for col in categorical_cols:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])
        encoders[col] = le
        
    # Split features and target
    X = df.drop('Loan_Approved', axis=1)
    y = df['Loan_Approved']
    
    print("Scaling and splitting...")
    # Scale numerical features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    X_scaled_df = pd.DataFrame(X_scaled, columns=X.columns)
    
    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(X_scaled_df, y, test_size=0.2, random_state=42)
    
    print("Training Logistic Regression Model...")
    # Train Logistic Regression
    lr_model = LogisticRegression(random_state=42, max_iter=1000)
    lr_model.fit(X_train, y_train)
    
    accuracy = lr_model.score(X_test, y_test)
    print(f"Model Training Complete. Test Accuracy: {accuracy:.4f}")
    
    # Create models directory if it doesn't exist
    models_dir = os.path.join(base_dir, 'api', 'models')
    os.makedirs(models_dir, exist_ok=True)
    
    print("Saving Models to /api/models...")
    # Save the artifacts
    joblib.dump(lr_model, os.path.join(models_dir, 'logistic_regression_model.pkl'))
    joblib.dump(scaler, os.path.join(models_dir, 'scaler.pkl'))
    joblib.dump(encoders, os.path.join(models_dir, 'encoders.pkl'))
    
    # Save expected feature columns order for the API
    joblib.dump(list(X.columns), os.path.join(models_dir, 'feature_columns.pkl'))
    
    print("Done! Artifacts saved successfully in api/models/")

if __name__ == "__main__":
    train_and_save_model()
