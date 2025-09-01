"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { RisikoIdentifikasiItem } from "@/types/risk-identification";
import { RisikoAnalisisItem } from "@/types/risk-analysis";
import { Konteks } from "@/types/risk-context";
import { analyzeRiskLevel } from "@/lib/ai-simulation";

interface RiskWithAnalysis extends RisikoIdentifikasiItem {
  analysis: RisikoAnalisisItem;
  context: Konteks;
  riskLevel: ReturnType<typeof analyzeRiskLevel>;
}

export default function RiskPriorityPage() {
  const [contexts, setContexts] = useState<Konteks[]>([]);
  const [identifications, setIdentifications] = useState<
    RisikoIdentifikasiItem[]
  >([]);
  const [analyses, setAnalyses] = useState<RisikoAnalisisItem[]>([]);
  const [riskData, setRiskData] = useState<RiskWithAnalysis[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"score" | "category" | "date">("score");
  const [filterBy, setFilterBy] = useState<"all" | "high" | "medium" | "low">(
    "all"
  );

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
    // Combine all data
    const combinedData: RiskWithAnalysis[] = identifications
      .map((risk) => {
        const analysis = analyses.find((a) => a.identifikasi_id === risk.id);
        const context = contexts.find((c) => c.id === risk.konteks_id);

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
          };
        }
        return null;
      })
      .filter(Boolean) as RiskWithAnalysis[];

    setRiskData(combinedData);
  }, [identifications, analyses, contexts]);

  const filteredAndSortedRisks = riskData
    .filter((risk) => {
      // Search filter
      const matchesSearch =
        risk.uraian_risiko.toLowerCase().includes(searchTerm.toLowerCase()) ||
        risk.kode_risiko.toLowerCase().includes(searchTerm.toLowerCase()) ||
        risk.pemilik.toLowerCase().includes(searchTerm.toLowerCase()) ||
        risk.context.tujuan_strategis
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      // Level filter
      if (filterBy === "all") return true;

      const level = risk.riskLevel.level.toLowerCase();
      if (filterBy === "high") return level.includes("tinggi");
      if (filterBy === "medium") return level.includes("sedang");
      if (filterBy === "low") return level.includes("rendah");

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "score":
          return b.analysis.skala_risiko - a.analysis.skala_risiko;
        case "category":
          return a.kategori_risiko.localeCompare(b.kategori_risiko);
        case "date":
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        default:
          return 0;
      }
    });

  const riskStats = {
    total: riskData.length,
    high: riskData.filter((r) =>
      r.riskLevel.level.toLowerCase().includes("tinggi")
    ).length,
    medium: riskData.filter((r) =>
      r.riskLevel.level.toLowerCase().includes("sedang")
    ).length,
    low: riskData.filter((r) =>
      r.riskLevel.level.toLowerCase().includes("rendah")
    ).length,
  };

  const riskByCategory = riskData.reduce((acc, risk) => {
    const category = risk.kategori_risiko;
    if (!acc[category]) acc[category] = [];
    acc[category].push(risk);
    return acc;
  }, {} as Record<string, RiskWithAnalysis[]>);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-title text-pu-blue mb-2">Risiko Prioritas</h1>
        <p className="text-pu-gray-600">
          Analisis dan prioritas risiko berdasarkan tingkat kemungkinan dan
          dampak
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="card-metric">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-pu-gray-600">
                  Total Risiko
                </p>
                <p className="text-2xl font-bold text-pu-blue">
                  {riskStats.total}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-pu-blue" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-metric border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">
                  Risiko Tinggi
                </p>
                <p className="text-2xl font-bold text-red-700">
                  {riskStats.high}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-metric border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">
                  Risiko Sedang
                </p>
                <p className="text-2xl font-bold text-yellow-700">
                  {riskStats.medium}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-metric border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">
                  Risiko Rendah
                </p>
                <p className="text-2xl font-bold text-green-700">
                  {riskStats.low}
                </p>
              </div>
              <TrendingDown className="w-8 h-8 text-green-600" />
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
                placeholder="Cari risiko berdasarkan uraian, kode, pemilik, atau konteks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="score">Urutkan berdasarkan Skor</option>
              <option value="category">Urutkan berdasarkan Kategori</option>
              <option value="date">Urutkan berdasarkan Tanggal</option>
            </select>

            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as any)}
              className="px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="all">Semua Level</option>
              <option value="high">Risiko Tinggi</option>
              <option value="medium">Risiko Sedang</option>
              <option value="low">Risiko Rendah</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Risk Matrix Visualization */}
      <Card className="card-dashboard">
        <CardHeader>
          <CardTitle className="text-pu-blue">Matriks Risiko</CardTitle>
          <CardDescription>
            Visualisasi risiko berdasarkan kemungkinan dan dampak
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-1 w-full max-w-md mx-auto">
            {/* Header row */}
            <div className="p-2 text-center text-xs font-medium">Dampak →</div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="p-2 text-center text-xs font-medium bg-pu-gray-100"
              >
                {i}
              </div>
            ))}

            {/* Matrix rows */}
            {[5, 4, 3, 2, 1].map((kemungkinan) => (
              <React.Fragment key={kemungkinan}>
                <div className="p-2 text-center text-xs font-medium bg-pu-gray-100">
                  {kemungkinan === 5 ? "↑ Kemungkinan" : ""}
                  <br />
                  {kemungkinan}
                </div>
                {[1, 2, 3, 4, 5].map((dampak) => {
                  const score = kemungkinan * dampak;
                  const level = analyzeRiskLevel(kemungkinan, dampak);
                  const risksInCell = riskData.filter(
                    (r) =>
                      r.analysis.skala_kemungkinan === kemungkinan &&
                      r.analysis.skala_dampak === dampak
                  );

                  return (
                    <div
                      key={`${kemungkinan}-${dampak}`}
                      className={`p-2 text-center text-xs border relative ${level.color} cursor-pointer hover:opacity-80`}
                      title={`Kemungkinan: ${kemungkinan}, Dampak: ${dampak}, Skor: ${score}, Level: ${level.level}`}
                    >
                      <div className="font-medium">{score}</div>
                      {risksInCell.length > 0 && (
                        <div className="absolute -top-1 -right-1 bg-pu-blue text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                          {risksInCell.length}
                        </div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
          <div className="text-center text-xs text-pu-gray-500 mt-4">
            Angka di pojok kanan atas menunjukkan jumlah risiko pada sel
            tersebut
          </div>
        </CardContent>
      </Card>

      {/* Risk List by Priority */}
      <div className="space-y-4">
        {filteredAndSortedRisks.length === 0 ? (
          <Card className="card-dashboard">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <p className="text-pu-gray-500 mb-4">
                  {searchTerm || filterBy !== "all"
                    ? "Tidak ada risiko yang sesuai dengan filter pencarian"
                    : "Belum ada risiko yang dianalisis untuk diprioritaskan"}
                </p>
                <p className="text-sm text-pu-gray-400">
                  Risiko harus diidentifikasi dan dianalisis terlebih dahulu
                  sebelum dapat diprioritaskan.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredAndSortedRisks.map((risk, index) => (
            <Card key={risk.id} className="card-dashboard">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-pu-blue flex items-center gap-2">
                      <span className="bg-pu-gray-200 px-2 py-1 rounded text-xs font-medium text-pu-gray-700">
                        #{index + 1}
                      </span>
                      <span className="bg-pu-yellow px-2 py-1 rounded text-xs font-medium text-pu-blue">
                        {risk.kode_risiko}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${risk.riskLevel.color}`}
                      >
                        {risk.riskLevel.level} ({risk.riskLevel.score})
                      </span>
                    </CardTitle>
                    <CardDescription>
                      {risk.context.tujuan_strategis} • {risk.pemilik} •{" "}
                      {risk.kategori_risiko.toUpperCase()}
                    </CardDescription>
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
                      <p className="text-xl font-bold text-pu-blue">
                        {risk.analysis.skala_kemungkinan}
                      </p>
                      <p className="text-xs text-pu-gray-500">dari skala 1-5</p>
                    </div>
                    <div className="bg-pu-gray-50 p-3 rounded-lg">
                      <p className="text-xs font-medium text-pu-blue">Dampak</p>
                      <p className="text-xl font-bold text-pu-blue">
                        {risk.analysis.skala_dampak}
                      </p>
                      <p className="text-xs text-pu-gray-500">dari skala 1-5</p>
                    </div>
                    <div className="bg-pu-gray-50 p-3 rounded-lg">
                      <p className="text-xs font-medium text-pu-blue">
                        Skor Risiko
                      </p>
                      <p className="text-xl font-bold text-pu-blue">
                        {risk.analysis.skala_risiko}
                      </p>
                      <p className="text-xs text-pu-gray-500">
                        {risk.riskLevel.level}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-pu-blue">
                      Rekomendasi Prioritas:
                    </p>
                    <p className="text-sm text-pu-gray-600">
                      {risk.riskLevel.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-pu-blue">Sebab:</p>
                      <p className="text-pu-gray-600">
                        {risk.sebab.uraian_sebab}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-pu-blue">Dampak:</p>
                      <p className="text-pu-gray-600">
                        {risk.dampak.uraian_dampak}
                      </p>
                    </div>
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex items-center justify-between text-xs text-pu-gray-400">
                      <span>
                        Pengendalian:{" "}
                        {risk.analysis.pengendalian.hasil_penilaian}
                      </span>
                      <span>
                        Dibuat:{" "}
                        {new Date(risk.created_at).toLocaleDateString("id-ID")}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Summary by Category */}
      {Object.keys(riskByCategory).length > 0 && (
        <Card className="card-dashboard">
          <CardHeader>
            <CardTitle className="text-pu-blue">
              Ringkasan berdasarkan Kategori
            </CardTitle>
            <CardDescription>
              Distribusi risiko berdasarkan kategori dan level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(riskByCategory).map(([category, risks]) => (
                <div
                  key={category}
                  className="flex items-center justify-between p-3 bg-pu-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-pu-blue capitalize">
                      {category}
                    </p>
                    <p className="text-sm text-pu-gray-600">
                      {risks.length} risiko
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {["tinggi", "sedang", "rendah"].map((level) => {
                      const count = risks.filter((r) =>
                        r.riskLevel.level.toLowerCase().includes(level)
                      ).length;
                      const color =
                        level === "tinggi"
                          ? "bg-red-100 text-red-600"
                          : level === "sedang"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-green-100 text-green-600";
                      return (
                        <span
                          key={level}
                          className={`px-2 py-1 rounded text-xs font-medium ${color}`}
                        >
                          {level}: {count}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
