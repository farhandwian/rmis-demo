"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Search, Edit, Trash2, FileText, Download } from "lucide-react";
import { RisikoIdentifikasiItem } from "@/types/risk-identification";
import { RisikoAnalisisItem } from "@/types/risk-analysis";
import { Konteks } from "@/types/risk-context";
import { analyzeRiskLevel } from "@/lib/ai-simulation";

type StatusPenilaian = "draft" | "submitted" | "approved" | "rejected";
type TindakLanjut = "terima" | "mitigasi" | "transfer" | "hindari";

interface RiskAssessment {
  id: string;
  analysis_id: string;
  assessor_name: string;
  assessment_date: string;
  tindak_lanjut: TindakLanjut;
  rencana_mitigasi: string;
  target_completion: string;
  pic_responsible: string;
  monitoring_plan: string;
  status: StatusPenilaian;
  notes: string;
  created_at: string;
}

interface RiskWithFullData extends RisikoIdentifikasiItem {
  analysis: RisikoAnalisisItem;
  context: Konteks;
  riskLevel: ReturnType<typeof analyzeRiskLevel>;
  assessment?: RiskAssessment;
}

export default function RiskAssessmentPage() {
  const [contexts, setContexts] = useState<Konteks[]>([]);
  const [identifications, setIdentifications] = useState<
    RisikoIdentifikasiItem[]
  >([]);
  const [analyses, setAnalyses] = useState<RisikoAnalisisItem[]>([]);
  const [assessments, setAssessments] = useState<RiskAssessment[]>([]);
  const [riskData, setRiskData] = useState<RiskWithFullData[]>([]);
  const [selectedRisk, setSelectedRisk] = useState<string>("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAssessment, setEditingAssessment] =
    useState<RiskAssessment | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | StatusPenilaian>(
    "all"
  );
  const [formData, setFormData] = useState({
    assessor_name: "",
    assessment_date: new Date().toISOString().split("T")[0],
    tindak_lanjut: "mitigasi" as TindakLanjut,
    rencana_mitigasi: "",
    target_completion: "",
    pic_responsible: "",
    monitoring_plan: "",
    status: "draft" as StatusPenilaian,
    notes: "",
  });

  // Auto-filled risk data
  const [selectedRiskData, setSelectedRiskData] =
    useState<RiskWithFullData | null>(null);

  useEffect(() => {
    const savedContexts = localStorage.getItem("risk_contexts");
    if (savedContexts) {
      setContexts(JSON.parse(savedContexts));
    }

    const savedIdentifications = localStorage.getItem("risk_identifications");
    if (savedIdentifications) {
      setIdentifications(JSON.parse(savedIdentifications));
    }

    const savedAnalyses = localStorage.getItem("risk_analyses");
    if (savedAnalyses) {
      setAnalyses(JSON.parse(savedAnalyses));
    }

    const savedAssessments = localStorage.getItem("risk_assessments");
    if (savedAssessments) {
      setAssessments(JSON.parse(savedAssessments));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("risk_assessments", JSON.stringify(assessments));
  }, [assessments]);

  useEffect(() => {
    // Combine all data
    const combinedData: RiskWithFullData[] = identifications
      .map((risk) => {
        const analysis = analyses.find((a) => a.identifikasi_id === risk.id);
        const context = contexts.find((c) => c.id === risk.konteks_id);
        const assessment = assessments.find(
          (a) => a.analysis_id === analysis?.id
        );

        if (analysis && context) {
          const riskLevel = analyzeRiskLevel(
            analysis.skala_kemungkinan,
            analysis.skala_dampak
          );
          return {
            ...risk,
            analysis,
            context,
            riskLevel,
            assessment,
          };
        }
        return null;
      })
      .filter(Boolean) as RiskWithFullData[];

    setRiskData(combinedData);
  }, [identifications, analyses, contexts, assessments]);

  useEffect(() => {
    if (selectedRisk) {
      const risk = riskData.find((r) => r.analysis.id === selectedRisk);
      setSelectedRiskData(risk || null);
    }
  }, [selectedRisk, riskData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRisk) {
      alert("Pilih risiko terlebih dahulu!");
      return;
    }

    const newAssessment: RiskAssessment = {
      id: editingAssessment?.id || Date.now().toString(),
      analysis_id: selectedRisk,
      assessor_name: formData.assessor_name,
      assessment_date: formData.assessment_date,
      tindak_lanjut: formData.tindak_lanjut,
      rencana_mitigasi: formData.rencana_mitigasi,
      target_completion: formData.target_completion,
      pic_responsible: formData.pic_responsible,
      monitoring_plan: formData.monitoring_plan,
      status: formData.status,
      notes: formData.notes,
      created_at: editingAssessment?.created_at || new Date().toISOString(),
    };

    if (editingAssessment) {
      setAssessments((prev) =>
        prev.map((assessment) =>
          assessment.id === editingAssessment.id ? newAssessment : assessment
        )
      );
    } else {
      setAssessments((prev) => [...prev, newAssessment]);
    }

    handleCloseForm();
  };

  const handleEdit = (assessment: RiskAssessment) => {
    setSelectedRisk(assessment.analysis_id);
    setEditingAssessment(assessment);
    setFormData({
      assessor_name: assessment.assessor_name,
      assessment_date: assessment.assessment_date,
      tindak_lanjut: assessment.tindak_lanjut,
      rencana_mitigasi: assessment.rencana_mitigasi,
      target_completion: assessment.target_completion,
      pic_responsible: assessment.pic_responsible,
      monitoring_plan: assessment.monitoring_plan,
      status: assessment.status,
      notes: assessment.notes,
    });
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus penilaian ini?")) {
      setAssessments((prev) =>
        prev.filter((assessment) => assessment.id !== id)
      );
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingAssessment(null);
    setSelectedRisk("");
    setSelectedRiskData(null);
    setFormData({
      assessor_name: "",
      assessment_date: new Date().toISOString().split("T")[0],
      tindak_lanjut: "mitigasi",
      rencana_mitigasi: "",
      target_completion: "",
      pic_responsible: "",
      monitoring_plan: "",
      status: "draft",
      notes: "",
    });
  };

  const generateReport = () => {
    // Simple report generation - in real app, this would be more sophisticated
    const reportData = riskData.filter((r) => r.assessment);
    const reportContent = reportData
      .map(
        (risk) => `
Risiko: ${risk.kode_risiko}
Uraian: ${risk.uraian_risiko}
Level Risiko: ${risk.riskLevel.level} (${risk.riskLevel.score})
Tindak Lanjut: ${risk.assessment?.tindak_lanjut}
Rencana Mitigasi: ${risk.assessment?.rencana_mitigasi}
PIC: ${risk.assessment?.pic_responsible}
Target: ${risk.assessment?.target_completion}
Status: ${risk.assessment?.status}
---
`
      )
      .join("\n");

    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `laporan-penilaian-risiko-${
      new Date().toISOString().split("T")[0]
    }.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filter available risks for assessment (must have analysis but not assessment yet, unless editing)
  const availableRisks = riskData.filter((risk) => {
    const hasAssessment = assessments.some(
      (assessment) => assessment.analysis_id === risk.analysis.id
    );
    return (
      !hasAssessment ||
      (editingAssessment && editingAssessment.analysis_id === risk.analysis.id)
    );
  });

  const filteredAssessments = riskData.filter((risk) => {
    if (!risk.assessment) return false;

    // Search filter
    const matchesSearch =
      risk.uraian_risiko.toLowerCase().includes(searchTerm.toLowerCase()) ||
      risk.kode_risiko.toLowerCase().includes(searchTerm.toLowerCase()) ||
      risk.pemilik.toLowerCase().includes(searchTerm.toLowerCase()) ||
      risk.assessment.assessor_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    // Status filter
    if (filterStatus === "all") return true;
    return risk.assessment.status === filterStatus;
  });

  const assessmentStats = {
    total: assessments.length,
    draft: assessments.filter((a) => a.status === "draft").length,
    submitted: assessments.filter((a) => a.status === "submitted").length,
    approved: assessments.filter((a) => a.status === "approved").length,
    rejected: assessments.filter((a) => a.status === "rejected").length,
  };

  if (isFormOpen) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-title text-pu-blue mb-2">
              {editingAssessment
                ? "Edit Penilaian Risiko"
                : "Tambah Penilaian Risiko"}
            </h1>
            <p className="text-pu-gray-600">
              Lakukan penilaian komprehensif dan tentukan rencana tindak lanjut
              risiko
            </p>
          </div>
          <Button variant="outline" onClick={handleCloseForm}>
            Kembali
          </Button>
        </div>

        <Card className="card-dashboard">
          <CardHeader>
            <CardTitle className="text-pu-blue">
              Form Penilaian Risiko
            </CardTitle>
            <CardDescription>
              Lengkapi penilaian risiko dan rencana tindak lanjut
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Bagian Pilih Risiko */}
              <div className="bg-pu-yellow/10 p-4 rounded-lg">
                <h3 className="font-semibold text-pu-blue mb-4">
                  Pilih Risiko untuk Dinilai
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Risiko yang Akan Dinilai *</Label>
                    <select
                      value={selectedRisk}
                      onChange={(e) => setSelectedRisk(e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      required
                    >
                      <option value="">Pilih Risiko untuk Dinilai</option>
                      {availableRisks.map((risk) => (
                        <option key={risk.analysis.id} value={risk.analysis.id}>
                          {risk.kode_risiko} -{" "}
                          {risk.uraian_risiko.substring(0, 80)}... (Level:{" "}
                          {risk.riskLevel.level})
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedRiskData && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-pu-gray-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-pu-blue">
                          Skor Risiko
                        </p>
                        <p className="text-2xl font-bold text-pu-blue">
                          {selectedRiskData.riskLevel.score}
                        </p>
                        <p className="text-xs text-pu-gray-500">
                          {selectedRiskData.riskLevel.level}
                        </p>
                      </div>
                      <div className="bg-pu-gray-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-pu-blue">
                          Kategori
                        </p>
                        <p className="text-sm font-medium text-pu-blue">
                          {selectedRiskData.kategori_risiko.toUpperCase()}
                        </p>
                        <p className="text-xs text-pu-gray-500">
                          {selectedRiskData.pemilik}
                        </p>
                      </div>
                      <div className="bg-pu-gray-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-pu-blue">
                          Pengendalian
                        </p>
                        <p className="text-sm font-medium text-pu-blue">
                          {
                            selectedRiskData.analysis.pengendalian
                              .hasil_penilaian
                          }
                        </p>
                        <p className="text-xs text-pu-gray-500">
                          Status saat ini
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Penilaian */}
              <div className="space-y-6">
                <h3 className="font-semibold text-pu-blue">
                  Informasi Penilaian
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Nama Penilai *</Label>
                    <Input
                      value={formData.assessor_name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          assessor_name: e.target.value,
                        }))
                      }
                      placeholder="Nama lengkap penilai"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Tanggal Penilaian *</Label>
                    <Input
                      type="date"
                      value={formData.assessment_date}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          assessment_date: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Tindak Lanjut *</Label>
                    <select
                      value={formData.tindak_lanjut}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          tindak_lanjut: e.target.value as TindakLanjut,
                        }))
                      }
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      required
                    >
                      <option value="terima">Terima Risiko</option>
                      <option value="mitigasi">Mitigasi Risiko</option>
                      <option value="transfer">Transfer Risiko</option>
                      <option value="hindari">Hindari Risiko</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>Status Penilaian *</Label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          status: e.target.value as StatusPenilaian,
                        }))
                      }
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      required
                    >
                      <option value="draft">Draft</option>
                      <option value="submitted">Submitted</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Rencana Mitigasi *</Label>
                  <textarea
                    value={formData.rencana_mitigasi}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        rencana_mitigasi: e.target.value,
                      }))
                    }
                    placeholder="Jelaskan rencana mitigasi atau tindak lanjut secara detail..."
                    className="w-full px-3 py-2 border border-input rounded-md bg-background min-h-[120px] resize-y"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Target Penyelesaian</Label>
                    <Input
                      type="date"
                      value={formData.target_completion}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          target_completion: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>PIC Responsible</Label>
                    <Input
                      value={formData.pic_responsible}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          pic_responsible: e.target.value,
                        }))
                      }
                      placeholder="Person in Charge"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Rencana Monitoring</Label>
                  <textarea
                    value={formData.monitoring_plan}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        monitoring_plan: e.target.value,
                      }))
                    }
                    placeholder="Jelaskan rencana monitoring dan evaluasi..."
                    className="w-full px-3 py-2 border border-input rounded-md bg-background min-h-[100px] resize-y"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Catatan Tambahan</Label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        notes: e.target.value,
                      }))
                    }
                    placeholder="Catatan atau keterangan tambahan..."
                    className="w-full px-3 py-2 border border-input rounded-md bg-background min-h-[80px] resize-y"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="btn-primary">
                  {editingAssessment ? "Update Penilaian" : "Simpan Penilaian"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseForm}
                >
                  Batal
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-title text-pu-blue mb-2">Penilaian Risiko</h1>
          <p className="text-pu-gray-600">
            Kelola penilaian komprehensif dan rencana tindak lanjut untuk setiap
            risiko
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={generateReport}
            variant="outline"
            className="border-pu-accent text-pu-accent hover:bg-pu-accent hover:text-white"
            disabled={assessments.length === 0}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Laporan
          </Button>
          <Button onClick={() => setIsFormOpen(true)} className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Penilaian
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="card-metric">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-pu-gray-600">
                Total Penilaian
              </p>
              <p className="text-2xl font-bold text-pu-blue">
                {assessmentStats.total}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-metric border-gray-200 bg-gray-50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Draft</p>
              <p className="text-2xl font-bold text-gray-700">
                {assessmentStats.draft}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-metric border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-blue-600">Submitted</p>
              <p className="text-2xl font-bold text-blue-700">
                {assessmentStats.submitted}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-metric border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-green-600">Approved</p>
              <p className="text-2xl font-bold text-green-700">
                {assessmentStats.approved}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-metric border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-red-600">Rejected</p>
              <p className="text-2xl font-bold text-red-700">
                {assessmentStats.rejected}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="card-dashboard">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pu-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari berdasarkan risiko, kode, penilai, atau PIC..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="all">Semua Status</option>
              <option value="draft">Draft</option>
              <option value="submitted">Submitted</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Assessment List */}
      <div className="space-y-4">
        {filteredAssessments.length === 0 ? (
          <Card className="card-dashboard">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-pu-gray-400 mx-auto mb-4" />
                <p className="text-pu-gray-500 mb-4">
                  {searchTerm || filterStatus !== "all"
                    ? "Tidak ada penilaian yang sesuai dengan filter pencarian"
                    : "Belum ada penilaian risiko yang dibuat"}
                </p>
                {!searchTerm && filterStatus === "all" && (
                  <Button
                    onClick={() => setIsFormOpen(true)}
                    className="btn-primary"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Buat Penilaian Pertama
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredAssessments.map((risk) => {
            if (!risk.assessment) return null;

            const statusColors = {
              draft: "text-gray-600 bg-gray-100",
              submitted: "text-blue-600 bg-blue-100",
              approved: "text-green-600 bg-green-100",
              rejected: "text-red-600 bg-red-100",
            };

            const tindakLanjutColors = {
              terima: "text-blue-600 bg-blue-100",
              mitigasi: "text-orange-600 bg-orange-100",
              transfer: "text-purple-600 bg-purple-100",
              hindari: "text-red-600 bg-red-100",
            };

            return (
              <Card key={risk.assessment.id} className="card-dashboard">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-pu-blue flex items-center gap-2">
                        <span className="bg-pu-yellow px-2 py-1 rounded text-xs font-medium text-pu-blue">
                          {risk.kode_risiko}
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            statusColors[risk.assessment.status]
                          }`}
                        >
                          {risk.assessment.status.toUpperCase()}
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${risk.riskLevel.color}`}
                        >
                          {risk.riskLevel.level}
                        </span>
                      </CardTitle>
                      <CardDescription>
                        Penilai: {risk.assessment.assessor_name} •{" "}
                        {new Date(
                          risk.assessment.assessment_date
                        ).toLocaleDateString("id-ID")}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(risk.assessment!)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(risk.assessment!.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-pu-blue">
                        Uraian Risiko:
                      </p>
                      <p className="text-sm text-pu-gray-600">
                        {risk.uraian_risiko}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-pu-blue flex items-center gap-2">
                          Tindak Lanjut:
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              tindakLanjutColors[risk.assessment.tindak_lanjut]
                            }`}
                          >
                            {risk.assessment.tindak_lanjut.toUpperCase()}
                          </span>
                        </p>
                        <p className="text-sm text-pu-gray-600 mt-1">
                          {risk.assessment.rencana_mitigasi}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-pu-blue">
                          Detail Eksekusi:
                        </p>
                        <div className="text-sm text-pu-gray-600 space-y-1">
                          {risk.assessment.pic_responsible && (
                            <p>PIC: {risk.assessment.pic_responsible}</p>
                          )}
                          {risk.assessment.target_completion && (
                            <p>
                              Target:{" "}
                              {new Date(
                                risk.assessment.target_completion
                              ).toLocaleDateString("id-ID")}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {risk.assessment.monitoring_plan && (
                      <div>
                        <p className="text-sm font-medium text-pu-blue">
                          Rencana Monitoring:
                        </p>
                        <p className="text-sm text-pu-gray-600">
                          {risk.assessment.monitoring_plan}
                        </p>
                      </div>
                    )}

                    {risk.assessment.notes && (
                      <div>
                        <p className="text-sm font-medium text-pu-blue">
                          Catatan:
                        </p>
                        <p className="text-sm text-pu-gray-600">
                          {risk.assessment.notes}
                        </p>
                      </div>
                    )}

                    <div className="border-t pt-3">
                      <div className="flex items-center justify-between text-xs text-pu-gray-400">
                        <span>
                          Dibuat:{" "}
                          {new Date(
                            risk.assessment.created_at
                          ).toLocaleDateString("id-ID")}
                        </span>
                        <span>
                          Kategori: {risk.kategori_risiko} • Pemilik:{" "}
                          {risk.pemilik}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
