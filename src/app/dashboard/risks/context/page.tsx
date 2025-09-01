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
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { Konteks } from "@/types/risk-context";

export default function RiskContextPage() {
  const [contexts, setContexts] = useState<Konteks[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingContext, setEditingContext] = useState<Konteks | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nama_kl: "",
    tahun_penilaian: new Date().getFullYear(),
    periode: "",
    sumber_data: "",
    dja_yang_menilai: "",
    tujuan_strategis: "",
    proses_bisnis: "",
  });

  // Get current user
  const getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    return JSON.parse(userStr);
  };

  // Load contexts from API
  const loadContexts = async () => {
    const user = getCurrentUser();
    if (!user) return;

    try {
      setIsLoading(true);
      const response = await fetch(`/api/risk-contexts?userId=${user.id}`);
      if (!response.ok) throw new Error("Failed to fetch contexts");

      const data = await response.json();
      setContexts(data);
    } catch (error) {
      console.error("Error loading contexts:", error);
      alert("Gagal memuat data konteks");
    } finally {
      setIsLoading(false);
    }
  };

  // Load contexts on component mount
  useEffect(() => {
    loadContexts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = getCurrentUser();
    if (!user) return;

    try {
      setIsLoading(true);

      const url = editingContext ? "/api/risk-contexts" : "/api/risk-contexts";

      const method = editingContext ? "PUT" : "POST";

      const body = editingContext
        ? { ...formData, id: editingContext.id, userId: user.id }
        : { ...formData, userId: user.id };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save context");
      }

      // Reload contexts after successful save
      await loadContexts();

      // Reset form
      setFormData({
        nama_kl: "",
        tahun_penilaian: new Date().getFullYear(),
        periode: "",
        sumber_data: "",
        dja_yang_menilai: "",
        tujuan_strategis: "",
        proses_bisnis: "",
      });
      setIsFormOpen(false);
      setEditingContext(null);
    } catch (error) {
      console.error("Error saving context:", error);
      alert(error instanceof Error ? error.message : "Gagal menyimpan konteks");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (context: Konteks) => {
    setEditingContext(context);
    setFormData({
      nama_kl: context.nama_kl,
      tahun_penilaian: context.tahun_penilaian,
      periode: context.periode,
      sumber_data: context.sumber_data || "",
      dja_yang_menilai: context.dja_yang_menilai || "",
      tujuan_strategis: context.tujuan_strategis,
      proses_bisnis: context.proses_bisnis,
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus konteks ini?")) return;

    const user = getCurrentUser();
    if (!user) return;

    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/risk-contexts?id=${id}&userId=${user.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete context");
      }

      // Reload contexts after successful delete
      await loadContexts();
    } catch (error) {
      console.error("Error deleting context:", error);
      alert(error instanceof Error ? error.message : "Gagal menghapus konteks");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingContext(null);
    setFormData({
      nama_kl: "",
      tahun_penilaian: new Date().getFullYear(),
      periode: "",
      sumber_data: "",
      dja_yang_menilai: "",
      tujuan_strategis: "",
      proses_bisnis: "",
    });
  };

  const filteredContexts = contexts.filter(
    (context) =>
      context.nama_kl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      context.tujuan_strategis
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      context.proses_bisnis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isFormOpen) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-title text-pu-blue mb-2">
              {editingContext ? "Edit Konteks" : "Tambah Konteks Baru"}
            </h1>
            <p className="text-pu-gray-600">
              Isi informasi konteks untuk pengelolaan risiko
            </p>
          </div>
          <Button variant="outline" onClick={handleCloseForm}>
            Kembali
          </Button>
        </div>

        <Card className="card-dashboard">
          <CardHeader>
            <CardTitle className="text-pu-blue">
              Form Penetapan Konteks
            </CardTitle>
            <CardDescription>
              Masukkan informasi konteks organisasi dan tujuan strategis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nama_kl">Nama Kementerian/Lembaga *</Label>
                  <Input
                    id="nama_kl"
                    value={formData.nama_kl}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        nama_kl: e.target.value,
                      }))
                    }
                    placeholder="Contoh: Kementerian PUPR"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tahun_penilaian">Tahun Penilaian *</Label>
                  <Input
                    id="tahun_penilaian"
                    type="number"
                    value={formData.tahun_penilaian}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        tahun_penilaian: parseInt(e.target.value),
                      }))
                    }
                    min="2020"
                    max="2030"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="periode">Periode *</Label>
                  <Input
                    id="periode"
                    value={formData.periode}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        periode: e.target.value,
                      }))
                    }
                    placeholder="Contoh: Januari - Desember 2025"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sumber_data">Sumber Data</Label>
                  <Input
                    id="sumber_data"
                    value={formData.sumber_data}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        sumber_data: e.target.value,
                      }))
                    }
                    placeholder="Contoh: Laporan kinerja tahunan"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dja_yang_menilai">DJA yang Menilai</Label>
                  <Input
                    id="dja_yang_menilai"
                    value={formData.dja_yang_menilai}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        dja_yang_menilai: e.target.value,
                      }))
                    }
                    placeholder="Contoh: Direktorat Jenderal Bina Marga"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tujuan_strategis">Tujuan Strategis *</Label>
                <Input
                  id="tujuan_strategis"
                  value={formData.tujuan_strategis}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      tujuan_strategis: e.target.value,
                    }))
                  }
                  placeholder="Contoh: Meningkatkan kualitas infrastruktur jalan nasional"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="proses_bisnis">Proses Bisnis *</Label>
                <Input
                  id="proses_bisnis"
                  value={formData.proses_bisnis}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      proses_bisnis: e.target.value,
                    }))
                  }
                  placeholder="Contoh: Perencanaan, pelaksanaan, dan pemeliharaan infrastruktur"
                  required
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="btn-primary"
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Menyimpan..."
                    : editingContext
                    ? "Update Konteks"
                    : "Simpan Konteks"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseForm}
                  disabled={isLoading}
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
          <h1 className="text-title text-pu-blue mb-2">Penetapan Konteks</h1>
          <p className="text-pu-gray-600">
            Kelola konteks organisasi untuk pengelolaan risiko
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Tambah Konteks
        </Button>
      </div>

      {/* Search */}
      <Card className="card-dashboard">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pu-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari berdasarkan nama, tujuan strategis, atau proses bisnis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Context List */}
      <div className="space-y-4">
        {filteredContexts.length === 0 ? (
          <Card className="card-dashboard">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <p className="text-pu-gray-500 mb-4">
                  {searchTerm
                    ? "Tidak ada konteks yang sesuai dengan pencarian"
                    : "Belum ada konteks yang dibuat"}
                </p>
                {!searchTerm && (
                  <Button
                    onClick={() => setIsFormOpen(true)}
                    className="btn-primary"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Konteks Pertama
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredContexts.map((context) => (
            <Card key={context.id} className="card-dashboard">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-pu-blue">
                      {context.nama_kl}
                    </CardTitle>
                    <CardDescription>
                      {context.tahun_penilaian} • {context.periode}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(context)}
                      disabled={isLoading}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(context.id)}
                      disabled={isLoading}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-pu-blue">
                      Tujuan Strategis:
                    </p>
                    <p className="text-sm text-pu-gray-600">
                      {context.tujuan_strategis}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-pu-blue">
                      Proses Bisnis:
                    </p>
                    <p className="text-sm text-pu-gray-600">
                      {context.proses_bisnis}
                    </p>
                  </div>
                  {context.sumber_data && (
                    <div>
                      <p className="text-sm font-medium text-pu-blue">
                        Sumber Data:
                      </p>
                      <p className="text-sm text-pu-gray-600">
                        {context.sumber_data}
                      </p>
                    </div>
                  )}
                  {context.dja_yang_menilai && (
                    <div>
                      <p className="text-sm font-medium text-pu-blue">
                        DJA yang Menilai:
                      </p>
                      <p className="text-sm text-pu-gray-600">
                        {context.dja_yang_menilai}
                      </p>
                    </div>
                  )}
                  <div className="text-xs text-pu-gray-400 pt-2 border-t">
                    Dibuat:{" "}
                    {new Date(context.created_at).toLocaleDateString("id-ID")}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
