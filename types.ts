export enum EducationLevel {
  HighSchool = "High School",
  Bachelor = "Bachelor's Degree",
  Master = "Master's Degree",
  PhD = "PhD",
  Vocational = "Vocational Training",
  None = "None",
}

export enum MaritalStatus {
  Single = "Single",
  Married = "Married",
  Divorced = "Divorced",
  Widowed = "Widowed",
  DomesticPartnership = "Domestic Partnership",
}

export enum ResidenceType {
  Urban = "Urban",
  Suburban = "Suburban",
  Rural = "Rural",
}

export enum EmploymentStatus {
  EmployedFullTime = "Employed (Full-time)",
  EmployedPartTime = "Employed (Part-time)",
  SelfEmployed = "Self-Employed",
  Unemployed = "Unemployed",
  Retired = "Retired",
  Student = "Student",
}

export interface RegistryData {
  age: number;
  gender: string;
  education: EducationLevel;
  maritalStatus: MaritalStatus;
  income: number;
  employmentStatus: EmploymentStatus;
  residenceType: ResidenceType;
  yearsAtResidence: number;
  healthCondition: string; // Free text for description
  dependents: number;
}

export interface LifeEventPrediction {
  eventName: string;
  probability: number; // 0-100
  timeframe: string; // e.g., "1-2 years"
  reasoning: string;
  impactLevel: "Low" | "Medium" | "High";
}

export interface AnalysisResult {
  overview: string;
  predictions: LifeEventPrediction[];
  riskFactors: string[];
  recommendations: string[];
}
