// API utility functions for RMIS

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface User {
  id: string;
  email: string;
  nama: string;
  tingkatan_jabatan?: string;
}

export interface RiskContext {
  id: string;
  nama_kl: string;
  tahun_penilaian: number;
  periode: string;
  sumber_data?: string;
  dja_yang_menilai?: string;
  tujuan_strategis: string;
  proses_bisnis: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface RiskIdentification {
  id: string;
  sifat_risiko: "uncontrollable" | "controllable";
  kode_risiko: string;
  pemilik: string;
  kategori_risiko: "kinerja" | "keuangan" | "reputasi";
  uraian_risiko: string;
  sumber_sebab: string;
  uraian_sebab: string;
  pihak_terkena: string;
  uraian_dampak: string;
  konteksId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface RiskAnalysis {
  id: string;
  skala_dampak: number;
  skala_kemungkinan: number;
  skala_risiko: number;
  uraian_pengendalian: string;
  hasil_penilaian: "belum memadai" | "memadai";
  identifikasiId: string;
  konteksId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface RiskAssessment {
  id: string;
  respon_risiko:
    | "mengurangi frekuensi"
    | "mengurangi dampak"
    | "membagi risiko"
    | "menghindari risiko"
    | "menerima risiko";
  pengendalian_sudah_ada: string;
  rencana_tindak_pengendalian: string;
  penanggung_jawab: string;
  target_penyelesaian: string;
  indikator_pengeluaran: string;
  kemungkinan_diharapkan: number;
  dampak_diharapkan: number;
  nilai_diharapkan: number;
  identifikasiId: string;
  analisisId: string;
  konteksId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

// Helper function to get current user
export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null;
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

// Auth API
export const authAPI = {
  async login(
    email: string,
    password: string
  ): Promise<ApiResponse<{ user: User }>> {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      return await response.json();
    } catch (error) {
      return { error: "Network error" };
    }
  },

  async register(userData: {
    email: string;
    password: string;
    nama: string;
    tingkatan_jabatan?: string;
  }): Promise<ApiResponse<{ user: User }>> {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      return await response.json();
    } catch (error) {
      return { error: "Network error" };
    }
  },
};

// Risk Context API
export const riskContextAPI = {
  async getAll(userId: string): Promise<ApiResponse<RiskContext[]>> {
    try {
      const response = await fetch(`/api/risk-contexts?userId=${userId}`);
      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      return { data };
    } catch (error) {
      return { error: "Failed to fetch contexts" };
    }
  },

  async create(
    contextData: Omit<RiskContext, "id" | "createdAt" | "updatedAt">
  ): Promise<ApiResponse<RiskContext>> {
    try {
      const response = await fetch("/api/risk-contexts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contextData),
      });

      const data = await response.json();
      return response.ok ? { data } : { error: data.error };
    } catch (error) {
      return { error: "Failed to create context" };
    }
  },

  async update(
    contextData: Partial<RiskContext> & { id: string; userId: string }
  ): Promise<ApiResponse<RiskContext>> {
    try {
      const response = await fetch("/api/risk-contexts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contextData),
      });

      const data = await response.json();
      return response.ok ? { data } : { error: data.error };
    } catch (error) {
      return { error: "Failed to update context" };
    }
  },

  async delete(
    id: string,
    userId: string
  ): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await fetch(
        `/api/risk-contexts?id=${id}&userId=${userId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      return response.ok ? { data } : { error: data.error };
    } catch (error) {
      return { error: "Failed to delete context" };
    }
  },
};

// Risk Identification API
export const riskIdentificationAPI = {
  async getAll(
    userId: string,
    konteksId?: string
  ): Promise<ApiResponse<RiskIdentification[]>> {
    try {
      const params = new URLSearchParams({ userId });
      if (konteksId) params.append("konteksId", konteksId);

      const response = await fetch(`/api/risk-identifications?${params}`);
      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      return { data };
    } catch (error) {
      return { error: "Failed to fetch identifications" };
    }
  },

  async create(
    identificationData: Omit<
      RiskIdentification,
      "id" | "createdAt" | "updatedAt"
    >
  ): Promise<ApiResponse<RiskIdentification>> {
    try {
      const response = await fetch("/api/risk-identifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(identificationData),
      });

      const data = await response.json();
      return response.ok ? { data } : { error: data.error };
    } catch (error) {
      return { error: "Failed to create identification" };
    }
  },

  async update(
    identificationData: Partial<RiskIdentification> & {
      id: string;
      userId: string;
    }
  ): Promise<ApiResponse<RiskIdentification>> {
    try {
      const response = await fetch("/api/risk-identifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(identificationData),
      });

      const data = await response.json();
      return response.ok ? { data } : { error: data.error };
    } catch (error) {
      return { error: "Failed to update identification" };
    }
  },

  async delete(
    id: string,
    userId: string
  ): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await fetch(
        `/api/risk-identifications?id=${id}&userId=${userId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      return response.ok ? { data } : { error: data.error };
    } catch (error) {
      return { error: "Failed to delete identification" };
    }
  },
};

// Risk Analysis API
export const riskAnalysisAPI = {
  async getAll(
    userId: string,
    konteksId?: string
  ): Promise<ApiResponse<RiskAnalysis[]>> {
    try {
      const params = new URLSearchParams({ userId });
      if (konteksId) params.append("konteksId", konteksId);

      const response = await fetch(`/api/risk-analyses?${params}`);
      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      return { data };
    } catch (error) {
      return { error: "Failed to fetch analyses" };
    }
  },

  async create(
    analysisData: Omit<RiskAnalysis, "id" | "createdAt" | "updatedAt">
  ): Promise<ApiResponse<RiskAnalysis>> {
    try {
      const response = await fetch("/api/risk-analyses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(analysisData),
      });

      const data = await response.json();
      return response.ok ? { data } : { error: data.error };
    } catch (error) {
      return { error: "Failed to create analysis" };
    }
  },

  async update(
    analysisData: Partial<RiskAnalysis> & { id: string; userId: string }
  ): Promise<ApiResponse<RiskAnalysis>> {
    try {
      const response = await fetch("/api/risk-analyses", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(analysisData),
      });

      const data = await response.json();
      return response.ok ? { data } : { error: data.error };
    } catch (error) {
      return { error: "Failed to update analysis" };
    }
  },

  async delete(
    id: string,
    userId: string
  ): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await fetch(
        `/api/risk-analyses?id=${id}&userId=${userId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      return response.ok ? { data } : { error: data.error };
    } catch (error) {
      return { error: "Failed to delete analysis" };
    }
  },
};

// Risk Assessment API
export const riskAssessmentAPI = {
  async getAll(
    userId: string,
    konteksId?: string
  ): Promise<ApiResponse<RiskAssessment[]>> {
    try {
      const params = new URLSearchParams({ userId });
      if (konteksId) params.append("konteksId", konteksId);

      const response = await fetch(`/api/risk-assessments?${params}`);
      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      return { data };
    } catch (error) {
      return { error: "Failed to fetch assessments" };
    }
  },

  async create(
    assessmentData: Omit<RiskAssessment, "id" | "createdAt" | "updatedAt">
  ): Promise<ApiResponse<RiskAssessment>> {
    try {
      const response = await fetch("/api/risk-assessments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(assessmentData),
      });

      const data = await response.json();
      return response.ok ? { data } : { error: data.error };
    } catch (error) {
      return { error: "Failed to create assessment" };
    }
  },

  async update(
    assessmentData: Partial<RiskAssessment> & { id: string; userId: string }
  ): Promise<ApiResponse<RiskAssessment>> {
    try {
      const response = await fetch("/api/risk-assessments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(assessmentData),
      });

      const data = await response.json();
      return response.ok ? { data } : { error: data.error };
    } catch (error) {
      return { error: "Failed to update assessment" };
    }
  },

  async delete(
    id: string,
    userId: string
  ): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await fetch(
        `/api/risk-assessments?id=${id}&userId=${userId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      return response.ok ? { data } : { error: data.error };
    } catch (error) {
      return { error: "Failed to delete assessment" };
    }
  },
};
