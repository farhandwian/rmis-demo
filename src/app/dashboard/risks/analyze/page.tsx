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
import { Plus, Search, Edit, Trash2, Sparkles, Calculator } from "lucide-react";
import { RisikoIdentifikasiItem } from "@/types/risk-identification";
import { RisikoAnalisisItem, HasilPenilaian } from "@/types/risk-analysis";
import { Konteks } from "@/types/risk-context";
import { AISuggestionModal } from "@/components/ai/AISuggestionModal";
import { aiSuggestions, analyzeRiskLevel } from "@/lib/ai-simulation";

export default function RiskAnalysisPage() {
  const [contexts, setContexts] = useState<Konteks[]>([]);
  const [identifications, setIdentifications] = useState<
    RisikoIdentifikasiItem[]
  >([]);
  const [analyses, setAnalyses] = useState<RisikoAnalisisItem[]>([]);
  const [selectedRisk, setSelectedRisk] = useState<string>("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [editingAnalysis, setEditingAnalysis] =
    useState<RisikoAnalisisItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    skala_dampak: 1,
    skala_kemungkinan: 1,
    pengendalian_uraian: "",
    pengendalian_hasil: "belum memadai" as HasilPenilaian,
  });

  // Auto-filled risk data
  const [riskData, setRiskData] = useState({
    kode_risiko: "",
    uraian_risiko: "",
    kategori_risiko: "",
    pemilik: "",
  });

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
  }, []);

  useEffect(() => {
    localStorage.setItem("risk_analyses", JSON.stringify(analyses));
  }, [analyses]);

  useEffect(() => {
    if (selectedRisk) {
      const risk = identifications.find((r) => r.id === selectedRisk);
      if (risk) {
        setRiskData({
          kode_risiko: risk.kode_risiko,
          uraian_risiko: risk.uraian_risiko,
          kategori_risiko: risk.kategori_risiko,
          pemilik: risk.pemilik,
        });
      }
    }
  }, [selectedRisk, identifications]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRisk) {
      alert("Pilih risiko terlebih dahulu!");
      return;
    }

    const skalaRisiko = formData.skala_dampak * formData.skala_kemungkinan;

    const newAnalysis: RisikoAnalisisItem = {
      id: editingAnalysis?.id || Date.now().toString(),
      identifikasi_id: selectedRisk,
      skala_dampak: formData.skala_dampak,
      skala_kemungkinan: formData.skala_kemungkinan,
      skala_risiko: skalaRisiko,
      pengendalian: {
        uraian: formData.pengendalian_uraian,
        hasil_penilaian: formData.pengendalian_hasil,
      },
      created_at: editingAnalysis?.created_at || new Date().toISOString(),
    };

    if (editingAnalysis) {
      setAnalyses((prev) =>
        prev.map((analysis) =>
          analysis.id === editingAnalysis.id ? newAnalysis : analysis
        )
      );
    } else {
      setAnalyses((prev) => [...prev, newAnalysis]);
    }

    handleCloseForm();
  };

  const handleEdit = (analysis: RisikoAnalisisItem) => {
    setSelectedRisk(analysis.identifikasi_id);
    setEditingAnalysis(analysis);
    setFormData({
      skala_dampak: analysis.skala_dampak,
      skala_kemungkinan: analysis.skala_kemungkinan,
      pengendalian_uraian: analysis.pengendalian.uraian,
      pengendalian_hasil: analysis.pengendalian.hasil_penilaian,
    });
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus analisis ini?")) {
      setAnalyses((prev) => prev.filter((analysis) => analysis.id !== id));
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingAnalysis(null);
    setSelectedRisk("");
    setRiskData({
      kode_risiko: "",
      uraian_risiko: "",
      kategori_risiko: "",
      pemilik: "",
    });
    setFormData({
      skala_dampak: 1,
      skala_kemungkinan: 1,
      pengendalian_uraian: "",
      pengendalian_hasil: "belum memadai",
    });
  };

  const handleAISuggestion = () => {
    setIsAIModalOpen(true);
  };

  const handleAISelect = (selectedSuggestions: string[]) => {
    const currentValue = formData.pengendalian_uraian;
    const newItems = selectedSuggestions.map((item) => `- ${item}`).join("\n");
    const updatedValue = currentValue
      ? `${currentValue}\n${newItems}`
      : newItems;

    setFormData((prev) => ({
      ...prev,
      pengendalian_uraian: updatedValue,
    }));
  };

  // Filter identifications that don't have analysis yet (unless editing)
  const availableRisks = identifications.filter((risk) => {
    const hasAnalysis = analyses.some(
      (analysis) => analysis.identifikasi_id === risk.id
    );
    return (
      !hasAnalysis ||
      (editingAnalysis && editingAnalysis.identifikasi_id === risk.id)
    );
  });

  const filteredAnalyses = analyses.filter((analysis) => {
    const risk = identifications.find((r) => r.id === analysis.identifikasi_id);
    if (!risk) return false;

    return (
      risk.uraian_risiko.toLowerCase().includes(searchTerm.toLowerCase()) ||
      risk.kode_risiko.toLowerCase().includes(searchTerm.toLowerCase()) ||
      risk.pemilik.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const currentRiskLevel = analyzeRiskLevel(
    formData.skala_kemungkinan,
    formData.skala_dampak
  );

  if (isFormOpen) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-title text-pu-blue mb-2">
              {editingAnalysis
                ? "Edit Analisis Risiko"
                : "Tambah Analisis Risiko"}
            </h1>
            <p className="text-pu-gray-600">
              Analisis kemungkinan dan dampak risiko serta strategi
              pengendaliannya
            </p>
          </div>
          <Button variant="outline" onClick={handleCloseForm}>
            Kembali
          </Button>
        </div>

        <Card className="card-dashboard">
          <CardHeader>
            <CardTitle className="text-pu-blue">Form Analisis Risiko</CardTitle>
            <CardDescription>
              Tentukan skala kemungkinan dan dampak serta strategi pengendalian
              risiko
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Bagian Pilih Risiko */}
              <div className="bg-pu-yellow/10 p-4 rounded-lg">
                <h3 className="font-semibold text-pu-blue mb-4">
                  Pilih Risiko untuk Dianalisis
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Risiko *</Label>
                    <select
                      value={selectedRisk}
                      onChange={(e) => setSelectedRisk(e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      required
                    >
                      <option value="">
                        Pilih Risiko yang Akan Dianalisis
                      </option>
                      {availableRisks.map((risk) => (
                        <option key={risk.id} value={risk.id}>
                          {risk.kode_risiko} -{" "}
                          {risk.uraian_risiko.substring(0, 80)}...
                        </option>
                      ))}
                    </select>
                  </div>

                  {riskData.kode_risiko && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Kode Risiko</Label>
                        <Input value={riskData.kode_risiko} disabled />
                      </div>

                      <div className="space-y-2">
                        <Label>Kategori</Label>
                        <Input value={riskData.kategori_risiko} disabled />
                      </div>

                      <div className="space-y-2">
                        <Label>Pemilik Risiko</Label>
                        <Input value={riskData.pemilik} disabled />
                      </div>
                    </div>
                  )}

                  {riskData.uraian_risiko && (
                    <div className="space-y-2">
                      <Label>Uraian Risiko</Label>
                      <textarea
                        value={riskData.uraian_risiko}
                        disabled
                        className="w-full px-3 py-2 border border-input rounded-md bg-pu-gray-50 text-pu-gray-600 min-h-[80px] resize-none"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Form Analisis */}
              <div className="space-y-6">
                <h3 className="font-semibold text-pu-blue">Penilaian Risiko</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Skala Kemungkinan *</Label>
                      <select
                        value={formData.skala_kemungkinan}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            skala_kemungkinan: parseInt(e.target.value),
                          }))
                        }
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        required
                      >
                        <option value={1}>1 - Sangat Jarang (0-5%)</option>
                        <option value={2}>2 - Jarang (6-25%)</option>
                        <option value={3}>3 - Mungkin (26-50%)</option>
                        <option value={4}>4 - Sering (51-75%)</option>
                        <option value={5}>5 - Sangat Sering (76-100%)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label>Skala Dampak *</Label>
                      <select
                        value={formData.skala_dampak}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            skala_dampak: parseInt(e.target.value),
                          }))
                        }
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        required
                      >
                        <option value={1}>1 - Sangat Rendah</option>
                        <option value={2}>2 - Rendah</option>
                        <option value={3}>3 - Sedang</option>
                        <option value={4}>4 - Tinggi</option>
                        <option value={5}>5 - Sangat Tinggi</option>
                      </select>
                    </div>
                  </div>

                  {/* Risk Level Calculator */}
                  <div className="space-y-4">
                    <div className="bg-pu-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Calculator className="w-5 h-5 text-pu-blue" />
                        <Label className="font-semibold">
                          Perhitungan Risiko
                        </Label>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p>
                          Kemungkinan:{" "}
                          <span className="font-medium">
                            {formData.skala_kemungkinan}
                          </span>
                        </p>
                        <p>
                          Dampak:{" "}
                          <span className="font-medium">
                            {formData.skala_dampak}
                          </span>
                        </p>
                        <p>
                          Skor Risiko:{" "}
                          <span className="font-bold text-lg">
                            {currentRiskLevel.score}
                          </span>
                        </p>
                        <div
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${currentRiskLevel.color}`}
                        >
                          {currentRiskLevel.level}
                        </div>
                        <p className="text-xs text-pu-gray-600 mt-2">
                          {currentRiskLevel.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-pu-blue">
                    Strategi Pengendalian
                  </h4>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label>Uraian Pengendalian *</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleAISuggestion}
                      >
                        <Sparkles className="w-4 h-4 mr-1" />
                        Saran AI
                      </Button>
                    </div>
                    <textarea
                      value={formData.pengendalian_uraian}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          pengendalian_uraian: e.target.value,
                        }))
                      }
                      placeholder="Jelaskan strategi pengendalian risiko..."
                      className="w-full px-3 py-2 border border-input rounded-md bg-background min-h-[120px] resize-y"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Hasil Penilaian Pengendalian *</Label>
                    <select
                      value={formData.pengendalian_hasil}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          pengendalian_hasil: e.target.value as HasilPenilaian,
                        }))
                      }
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      required
                    >
                      <option value="belum memadai">Belum Memadai</option>
                      <option value="memadai">Memadai</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="btn-primary">
                  {editingAnalysis ? "Update Analisis" : "Simpan Analisis"}
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

        <AISuggestionModal
          isOpen={isAIModalOpen}
          onClose={() => setIsAIModalOpen(false)}
          title="Saran AI - Strategi Pengendalian Risiko"
          description="Pilih strategi pengendalian risiko yang sesuai dengan konteks Anda"
          suggestions={aiSuggestions.riskAnalysis.pengendalianRisiko}
          onSelect={handleAISelect}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-title text-pu-blue mb-2">Analisis Risiko</h1>
          <p className="text-pu-gray-600">
            Kelola analisis kemungkinan dan dampak risiko serta strategi
            pengendaliannya
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleAISuggestion}
            variant="outline"
            className="border-pu-accent text-pu-accent hover:bg-pu-accent hover:text-white"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Saran AI
          </Button>
          <Button onClick={() => setIsFormOpen(true)} className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Analisis
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card className="card-dashboard">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pu-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari berdasarkan uraian risiko, kode, atau pemilik..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis List */}
      <div className="space-y-4">
        {filteredAnalyses.length === 0 ? (
          <Card className="card-dashboard">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <p className="text-pu-gray-500 mb-4">
                  {searchTerm
                    ? "Tidak ada analisis yang sesuai dengan pencarian"
                    : "Belum ada analisis risiko yang dibuat"}
                </p>
                {!searchTerm && (
                  <Button
                    onClick={() => setIsFormOpen(true)}
                    className="btn-primary"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Buat Analisis Pertama
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredAnalyses.map((analysis) => {
            const risk = identifications.find(
              (r) => r.id === analysis.identifikasi_id
            );
            const riskLevel = analyzeRiskLevel(
              analysis.skala_kemungkinan,
              analysis.skala_dampak
            );

            if (!risk) return null;

            return (
              <Card key={analysis.id} className="card-dashboard">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-pu-blue flex items-center gap-2">
                        <span className="bg-pu-yellow px-2 py-1 rounded text-xs font-medium text-pu-blue">
                          {risk.kode_risiko}
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${riskLevel.color}`}
                        >
                          {riskLevel.level} ({riskLevel.score})
                        </span>
                      </CardTitle>
                      <CardDescription>
                        {risk.kategori_risiko.toUpperCase()} • {risk.pemilik}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(analysis)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(analysis.id)}
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-pu-gray-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-pu-blue">
                          Kemungkinan
                        </p>
                        <p className="text-2xl font-bold text-pu-blue">
                          {analysis.skala_kemungkinan}
                        </p>
                        <p className="text-xs text-pu-gray-500">
                          dari skala 1-5
                        </p>
                      </div>
                      <div className="bg-pu-gray-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-pu-blue">
                          Dampak
                        </p>
                        <p className="text-2xl font-bold text-pu-blue">
                          {analysis.skala_dampak}
                        </p>
                        <p className="text-xs text-pu-gray-500">
                          dari skala 1-5
                        </p>
                      </div>
                      <div className="bg-pu-gray-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-pu-blue">
                          Skor Risiko
                        </p>
                        <p className="text-2xl font-bold text-pu-blue">
                          {analysis.skala_risiko}
                        </p>
                        <p className="text-xs text-pu-gray-500">
                          {riskLevel.level}
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-pu-blue">
                          Strategi Pengendalian:
                        </p>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            analysis.pengendalian.hasil_penilaian === "memadai"
                              ? "text-green-600 bg-green-100"
                              : "text-red-600 bg-red-100"
                          }`}
                        >
                          {analysis.pengendalian.hasil_penilaian}
                        </span>
                      </div>
                      <p className="text-sm text-pu-gray-600 whitespace-pre-line">
                        {analysis.pengendalian.uraian}
                      </p>
                    </div>

                    <div className="text-xs text-pu-gray-400 pt-2 border-t">
                      Dibuat:{" "}
                      {new Date(analysis.created_at).toLocaleDateString(
                        "id-ID"
                      )}
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
