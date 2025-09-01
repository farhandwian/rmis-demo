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
import { Plus, Search, Edit, Trash2, Sparkles } from "lucide-react";
import { Konteks } from "@/types/risk-context";
import { RisikoIdentifikasiItem } from "@/types/risk-identification";
import { AISuggestionModal } from "@/components/ai/AISuggestionModal";
import { aiSuggestions } from "@/lib/ai-simulation";

export default function RiskIdentificationPage() {
  const [contexts, setContexts] = useState<Konteks[]>([]);
  const [risks, setRisks] = useState<RisikoIdentifikasiItem[]>([]);
  const [selectedContext, setSelectedContext] = useState<string>("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiModalConfig, setAIModalConfig] = useState<{
    field: string;
    title: string;
    description: string;
    suggestions: string[];
  } | null>(null);
  const [editingRisk, setEditingRisk] = useState<RisikoIdentifikasiItem | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    sifat_risiko: "controllable" as "uncontrollable" | "controllable",
    kode_risiko: "",
    pemilik: "",
    kategori_risiko: "kinerja" as "kinerja" | "keuangan" | "reputasi",
    uraian_risiko: "",
    sebab_sumber: "",
    sebab_uraian: "",
    dampak_pihak_terkena: "",
    dampak_uraian: "",
  });

  // Auto-filled context data
  const [contextData, setContextData] = useState({
    tahun_penilaian: "",
    periode: "",
    proses_bisnis: "",
  });

  useEffect(() => {
    const savedContexts = localStorage.getItem("risk_contexts");
    if (savedContexts) {
      setContexts(JSON.parse(savedContexts));
    }

    const savedRisks = localStorage.getItem("risk_identifications");
    if (savedRisks) {
      setRisks(JSON.parse(savedRisks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("risk_identifications", JSON.stringify(risks));
  }, [risks]);

  useEffect(() => {
    if (selectedContext) {
      const context = contexts.find(
        (ctx) => ctx.tujuan_strategis === selectedContext
      );
      if (context) {
        setContextData({
          tahun_penilaian: context.tahun_penilaian.toString(),
          periode: context.periode,
          proses_bisnis: context.proses_bisnis,
        });
      }
    }
  }, [selectedContext, contexts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedContext) {
      alert("Pilih tujuan strategis terlebih dahulu!");
      return;
    }

    const context = contexts.find(
      (ctx) => ctx.tujuan_strategis === selectedContext
    );
    if (!context) return;

    const newRisk: RisikoIdentifikasiItem = {
      id: editingRisk?.id || Date.now().toString(),
      konteks_id: context.id,
      sifat_risiko: formData.sifat_risiko,
      kode_risiko: formData.kode_risiko,
      pemilik: formData.pemilik,
      kategori_risiko: formData.kategori_risiko,
      uraian_risiko: formData.uraian_risiko,
      sebab: {
        sumber: formData.sebab_sumber,
        uraian_sebab: formData.sebab_uraian,
      },
      dampak: {
        pihak_terkena: formData.dampak_pihak_terkena,
        uraian_dampak: formData.dampak_uraian,
      },
      created_at: editingRisk?.created_at || new Date().toISOString(),
    };

    if (editingRisk) {
      setRisks((prev) =>
        prev.map((risk) => (risk.id === editingRisk.id ? newRisk : risk))
      );
    } else {
      setRisks((prev) => [...prev, newRisk]);
    }

    handleCloseForm();
  };

  const handleEdit = (risk: RisikoIdentifikasiItem) => {
    const context = contexts.find((ctx) => ctx.id === risk.konteks_id);
    if (context) {
      setSelectedContext(context.tujuan_strategis);
    }

    setEditingRisk(risk);
    setFormData({
      sifat_risiko: risk.sifat_risiko,
      kode_risiko: risk.kode_risiko,
      pemilik: risk.pemilik,
      kategori_risiko: risk.kategori_risiko,
      uraian_risiko: risk.uraian_risiko,
      sebab_sumber: risk.sebab.sumber,
      sebab_uraian: risk.sebab.uraian_sebab,
      dampak_pihak_terkena: risk.dampak.pihak_terkena,
      dampak_uraian: risk.dampak.uraian_dampak,
    });
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus risiko ini?")) {
      setRisks((prev) => prev.filter((risk) => risk.id !== id));
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingRisk(null);
    setSelectedContext("");
    setContextData({ tahun_penilaian: "", periode: "", proses_bisnis: "" });
    setFormData({
      sifat_risiko: "controllable",
      kode_risiko: "",
      pemilik: "",
      kategori_risiko: "kinerja",
      uraian_risiko: "",
      sebab_sumber: "",
      sebab_uraian: "",
      dampak_pihak_terkena: "",
      dampak_uraian: "",
    });
  };

  const handleAISuggestion = (field: string) => {
    let config;

    switch (field) {
      case "uraian_risiko":
        config = {
          field,
          title: "Saran AI - Uraian Risiko",
          description:
            "Pilih saran uraian risiko yang sesuai dengan konteks Anda",
          suggestions: aiSuggestions.riskIdentification.uraianRisiko,
        };
        break;
      case "sebab_sumber":
        config = {
          field,
          title: "Saran AI - Sumber Sebab",
          description: "Pilih sumber penyebab risiko yang relevan",
          suggestions: aiSuggestions.riskIdentification.sumberSebab,
        };
        break;
      case "sebab_uraian":
        config = {
          field,
          title: "Saran AI - Uraian Sebab",
          description: "Pilih uraian sebab risiko yang sesuai",
          suggestions: aiSuggestions.riskIdentification.uraianSebab,
        };
        break;
      case "dampak_pihak_terkena":
        config = {
          field,
          title: "Saran AI - Pihak Terkena Dampak",
          description: "Pilih pihak yang mungkin terkena dampak risiko",
          suggestions: aiSuggestions.riskIdentification.pihakTerkena,
        };
        break;
      case "dampak_uraian":
        config = {
          field,
          title: "Saran AI - Uraian Dampak",
          description: "Pilih uraian dampak risiko yang mungkin terjadi",
          suggestions: aiSuggestions.riskIdentification.uraianDampak,
        };
        break;
      default:
        return;
    }

    setAIModalConfig(config);
    setIsAIModalOpen(true);
  };

  const handleAISelect = (selectedSuggestions: string[]) => {
    if (!aiModalConfig) return;

    const field = aiModalConfig.field;
    const currentValue = formData[field as keyof typeof formData] as string;
    const newItems = selectedSuggestions.map((item) => `- ${item}`).join("\n");
    const updatedValue = currentValue
      ? `${currentValue}\n${newItems}`
      : newItems;

    setFormData((prev) => ({
      ...prev,
      [field]: updatedValue,
    }));
  };

  const filteredRisks = risks.filter((risk) => {
    const context = contexts.find((ctx) => ctx.id === risk.konteks_id);
    const contextMatch =
      context?.tujuan_strategis
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) || false;

    return (
      risk.uraian_risiko.toLowerCase().includes(searchTerm.toLowerCase()) ||
      risk.kode_risiko.toLowerCase().includes(searchTerm.toLowerCase()) ||
      risk.pemilik.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contextMatch
    );
  });

  if (isFormOpen) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-title text-pu-blue mb-2">
              {editingRisk
                ? "Edit Identifikasi Risiko"
                : "Tambah Identifikasi Risiko"}
            </h1>
            <p className="text-pu-gray-600">
              Identifikasi dan dokumentasi risiko yang dapat mempengaruhi
              pencapaian tujuan
            </p>
          </div>
          <Button variant="outline" onClick={handleCloseForm}>
            Kembali
          </Button>
        </div>

        <Card className="card-dashboard">
          <CardHeader>
            <CardTitle className="text-pu-blue">
              Form Identifikasi Risiko
            </CardTitle>
            <CardDescription>
              Lengkapi informasi risiko berdasarkan konteks yang telah
              ditetapkan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Bagian Input Konteks */}
              <div className="bg-pu-yellow/10 p-4 rounded-lg">
                <h3 className="font-semibold text-pu-blue mb-4">
                  Konteks Risiko
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tujuan Strategis *</Label>
                    <select
                      value={selectedContext}
                      onChange={(e) => setSelectedContext(e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      required
                    >
                      <option value="">Pilih Tujuan Strategis</option>
                      {contexts.map((context) => (
                        <option
                          key={context.id}
                          value={context.tujuan_strategis}
                        >
                          {context.tujuan_strategis}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>Tahun Penilaian</Label>
                    <Input value={contextData.tahun_penilaian} disabled />
                  </div>

                  <div className="space-y-2">
                    <Label>Periode</Label>
                    <Input value={contextData.periode} disabled />
                  </div>

                  <div className="space-y-2">
                    <Label>Proses Bisnis</Label>
                    <Input value={contextData.proses_bisnis} disabled />
                  </div>
                </div>
              </div>

              {/* Form Risiko */}
              <div className="space-y-6">
                <h3 className="font-semibold text-pu-blue">Informasi Risiko</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Sifat Risiko *</Label>
                    <select
                      value={formData.sifat_risiko}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          sifat_risiko: e.target.value as any,
                        }))
                      }
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      required
                    >
                      <option value="controllable">Controllable</option>
                      <option value="uncontrollable">Uncontrollable</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>Kode Risiko *</Label>
                    <Input
                      value={formData.kode_risiko}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          kode_risiko: e.target.value,
                        }))
                      }
                      placeholder="Contoh: R-001"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Pemilik Risiko *</Label>
                    <Input
                      value={formData.pemilik}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          pemilik: e.target.value,
                        }))
                      }
                      placeholder="Contoh: Direktorat Teknik"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Kategori Risiko *</Label>
                    <select
                      value={formData.kategori_risiko}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          kategori_risiko: e.target.value as any,
                        }))
                      }
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      required
                    >
                      <option value="kinerja">Kinerja</option>
                      <option value="keuangan">Keuangan</option>
                      <option value="reputasi">Reputasi</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label>Uraian Risiko *</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleAISuggestion("uraian_risiko")}
                    >
                      <Sparkles className="w-4 h-4 mr-1" />
                      Saran AI
                    </Button>
                  </div>
                  <textarea
                    value={formData.uraian_risiko}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        uraian_risiko: e.target.value,
                      }))
                    }
                    placeholder="Deskripsikan risiko secara detail..."
                    className="w-full px-3 py-2 border border-input rounded-md bg-background min-h-[100px] resize-y"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-pu-blue">Sebab Risiko</h4>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label>Sumber Sebab</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleAISuggestion("sebab_sumber")}
                        >
                          <Sparkles className="w-4 h-4 mr-1" />
                          Saran AI
                        </Button>
                      </div>
                      <Input
                        value={formData.sebab_sumber}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            sebab_sumber: e.target.value,
                          }))
                        }
                        placeholder="Contoh: Faktor eksternal"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label>Uraian Sebab</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleAISuggestion("sebab_uraian")}
                        >
                          <Sparkles className="w-4 h-4 mr-1" />
                          Saran AI
                        </Button>
                      </div>
                      <textarea
                        value={formData.sebab_uraian}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            sebab_uraian: e.target.value,
                          }))
                        }
                        placeholder="Jelaskan penyebab risiko..."
                        className="w-full px-3 py-2 border border-input rounded-md bg-background min-h-[80px] resize-y"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-pu-blue">Dampak Risiko</h4>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label>Pihak Terkena</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleAISuggestion("dampak_pihak_terkena")
                          }
                        >
                          <Sparkles className="w-4 h-4 mr-1" />
                          Saran AI
                        </Button>
                      </div>
                      <Input
                        value={formData.dampak_pihak_terkena}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            dampak_pihak_terkena: e.target.value,
                          }))
                        }
                        placeholder="Contoh: Masyarakat, Organisasi"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label>Uraian Dampak</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleAISuggestion("dampak_uraian")}
                        >
                          <Sparkles className="w-4 h-4 mr-1" />
                          Saran AI
                        </Button>
                      </div>
                      <textarea
                        value={formData.dampak_uraian}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            dampak_uraian: e.target.value,
                          }))
                        }
                        placeholder="Jelaskan dampak yang mungkin terjadi..."
                        className="w-full px-3 py-2 border border-input rounded-md bg-background min-h-[80px] resize-y"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="btn-primary">
                  {editingRisk ? "Update Risiko" : "Simpan Risiko"}
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
          title={aiModalConfig?.title || ""}
          description={aiModalConfig?.description || ""}
          suggestions={aiModalConfig?.suggestions || []}
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
          <h1 className="text-title text-pu-blue mb-2">Identifikasi Risiko</h1>
          <p className="text-pu-gray-600">
            Kelola identifikasi risiko yang dapat mempengaruhi pencapaian tujuan
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => handleAISuggestion("general")}
            variant="outline"
            className="border-pu-accent text-pu-accent hover:bg-pu-accent hover:text-white"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Saran AI
          </Button>
          <Button onClick={() => setIsFormOpen(true)} className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Risiko
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
                placeholder="Cari berdasarkan uraian risiko, kode, pemilik, atau konteks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk List */}
      <div className="space-y-4">
        {filteredRisks.length === 0 ? (
          <Card className="card-dashboard">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <p className="text-pu-gray-500 mb-4">
                  {searchTerm
                    ? "Tidak ada risiko yang sesuai dengan pencarian"
                    : "Belum ada risiko yang diidentifikasi"}
                </p>
                {!searchTerm && (
                  <Button
                    onClick={() => setIsFormOpen(true)}
                    className="btn-primary"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Identifikasi Risiko Pertama
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredRisks.map((risk) => {
            const context = contexts.find((ctx) => ctx.id === risk.konteks_id);
            return (
              <Card key={risk.id} className="card-dashboard">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-pu-blue flex items-center gap-2">
                        <span className="bg-pu-yellow px-2 py-1 rounded text-xs font-medium text-pu-blue">
                          {risk.kode_risiko}
                        </span>
                        {risk.kategori_risiko.toUpperCase()}
                      </CardTitle>
                      <CardDescription>
                        {context?.tujuan_strategis} • {risk.pemilik}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(risk)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(risk.id)}
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
                        <p className="text-sm font-medium text-pu-blue">
                          Sebab:
                        </p>
                        <p className="text-xs text-pu-gray-500">
                          Sumber: {risk.sebab.sumber}
                        </p>
                        <p className="text-sm text-pu-gray-600">
                          {risk.sebab.uraian_sebab}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-pu-blue">
                          Dampak:
                        </p>
                        <p className="text-xs text-pu-gray-500">
                          Pihak Terkena: {risk.dampak.pihak_terkena}
                        </p>
                        <p className="text-sm text-pu-gray-600">
                          {risk.dampak.uraian_dampak}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-pu-gray-400 pt-2 border-t">
                      <span>Sifat: {risk.sifat_risiko}</span>
                      <span>•</span>
                      <span>
                        Dibuat:{" "}
                        {new Date(risk.created_at).toLocaleDateString("id-ID")}
                      </span>
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
