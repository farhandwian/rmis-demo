export enum RiskCategory {
  OPERATIONAL = "OPERATIONAL",
  FINANCIAL = "FINANCIAL",
  STRATEGIC = "STRATEGIC",
  COMPLIANCE = "COMPLIANCE",
  TECHNOLOGICAL = "TECHNOLOGICAL",
  REPUTATIONAL = "REPUTATIONAL",
}

export enum RiskStatus {
  IDENTIFIED = "IDENTIFIED",
  ANALYZED = "ANALYZED",
  PRIORITIZED = "PRIORITIZED",
  MITIGATED = "MITIGATED",
  MONITORED = "MONITORED",
}

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface Risk {
  id: string;
  title: string;
  description: string;
  category: RiskCategory;
  department: string;
  owner: string;
  status: RiskStatus;
  probability: number;
  impact: number;
  riskScore: number;
  context?: string | null;
  mitigation?: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface RiskAssessment {
  id: string;
  riskId: string;
  assessorId: string;
  probability: number;
  impact: number;
  riskScore: number;
  notes?: string | null;
  createdAt: Date;
}

export interface RiskWithAssessments extends Risk {
  assessments: RiskAssessment[];
  user: User;
}

export interface CreateRiskData {
  title: string;
  description: string;
  category: RiskCategory;
  department: string;
  owner: string;
  context?: string;
  probability: number;
  impact: number;
}

export interface UpdateRiskData extends Partial<CreateRiskData> {
  status?: RiskStatus;
  mitigation?: string;
}

export interface RiskMetrics {
  totalRisks: number;
  highRisks: number;
  mediumRisks: number;
  lowRisks: number;
  risksByCategory: Record<RiskCategory, number>;
  risksByStatus: Record<RiskStatus, number>;
}

export interface AIAnalysis {
  suggestions: string[];
  mitigationStrategies: string[];
  riskLevel: string;
  confidence: number;
}
