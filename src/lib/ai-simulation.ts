export const aiSuggestions = {
  riskIdentification: {
    uraianRisiko: [
      "Keterlambatan dalam penyelesaian proyek infrastruktur jalan",
      "Kualitas material konstruksi yang tidak sesuai standar",
      "Kekurangan anggaran untuk pemeliharaan infrastruktur",
      "Kerusakan infrastruktur akibat bencana alam",
      "Konflik lahan dalam pembangunan infrastruktur baru",
      "Kenaikan harga material konstruksi yang tidak terduga",
      "Keterbatasan sumber daya manusia yang kompeten",
      "Perubahan regulasi yang mempengaruhi pelaksanaan proyek",
      "Gangguan cuaca ekstrem yang menghambat konstruksi",
      "Koordinasi yang tidak optimal antar instansi terkait",
      "Protes masyarakat terhadap pembangunan infrastruktur",
      "Kesulitan dalam proses perizinan dan sertifikat",
      "Keterlambatan pembayaran kepada kontraktor",
      "Kerusakan infrastruktur eksisting selama konstruksi",
      "Risiko keselamatan kerja pada proyek konstruksi",
    ],
    sumberSebab: [
      "Faktor internal organisasi",
      "Faktor eksternal lingkungan",
      "Kebijakan pemerintah",
      "Kondisi ekonomi makro",
      "Faktor teknologi",
      "Faktor sosial masyarakat",
      "Kondisi geografis dan iklim",
      "Regulasi dan peraturan",
      "Dinamika politik",
      "Kompetisi pasar",
      "Perubahan demografi",
      "Perkembangan digital",
    ],
    uraianSebab: [
      "Kurangnya perencanaan yang matang dan komprehensif",
      "Keterbatasan kemampuan teknis dan manajerial",
      "Proses pengadaan yang tidak efisien",
      "Koordinasi yang lemah antar unit kerja",
      "Sistem monitoring dan evaluasi yang belum optimal",
      "Perubahan prioritas kebijakan yang mendadak",
      "Ketergantungan pada supplier tunggal",
      "Kurangnya cadangan anggaran untuk kontinjensi",
      "Proses birokrasi yang berbelit-belit",
      "Kurangnya partisipasi stakeholder",
      "Tidak adanya sistem early warning",
      "Kapasitas SDM yang belum memadai",
    ],
    pihakTerkena: [
      "Masyarakat pengguna infrastruktur",
      "Pemerintah daerah",
      "Kontraktor dan vendor",
      "Kementerian PUPR",
      "Instansi terkait lainnya",
      "Pengguna jasa transportasi",
      "Pelaku ekonomi lokal",
      "Lingkungan sekitar proyek",
      "Generasi mendatang",
      "Investor dan pemangku kepentingan",
      "Media dan opini publik",
      "Organisasi non-pemerintah",
    ],
    uraianDampak: [
      "Penurunan kualitas layanan publik infrastruktur",
      "Kerugian finansial dan pemborosan anggaran negara",
      "Gangguan aktivitas ekonomi dan sosial masyarakat",
      "Penurunan kepercayaan publik terhadap kinerja pemerintah",
      "Keterlambatan pencapaian target pembangunan nasional",
      "Potensi tuntutan hukum dan sanksi administratif",
      "Kerusakan lingkungan dan ekosistem",
      "Risiko kecelakaan dan keselamatan publik",
      "Peningkatan biaya operasional dan pemeliharaan",
      "Penurunan daya saing ekonomi regional",
      "Gangguan mobilitas dan aksesibilitas masyarakat",
      "Dampak negatif terhadap citra organisasi",
    ],
  },
  riskAnalysis: {
    pengendalianRisiko: [
      "Implementasi sistem manajemen kualitas ISO 9001",
      "Pengembangan prosedur operasional standar (SOP)",
      "Pembentukan tim pengawas dan monitoring proyek",
      "Diversifikasi supplier dan kontraktor",
      "Penerapan teknologi digital untuk monitoring",
      "Pelatihan berkelanjutan untuk SDM",
      "Sistem peringatan dini (early warning system)",
      "Audit internal berkala",
      "Mekanisme feedback dari stakeholder",
      "Contingency planning dan risk mitigation",
      "Sistem dokumentasi dan pelaporan terpadu",
      "Kolaborasi dengan instansi terkait",
    ],
  },
};

// Fungsi simulasi AI untuk memberikan saran
export const generateAISuggestion = (
  context: string,
  riskType?: string
): string[] => {
  // Simulasi AI suggestions berdasarkan context
  const suggestions = aiSuggestions.riskIdentification.uraianRisiko;

  // Filter berdasarkan context atau riskType jika diperlukan
  return suggestions.slice(0, Math.floor(Math.random() * 5) + 3); // Return 3-7 suggestions
};

export const analyzeRiskLevel = (
  probability: number,
  impact: number
): {
  score: number;
  level: string;
  color: string;
  description: string;
} => {
  const score = probability * impact;

  if (score <= 5) {
    return {
      score,
      level: "Rendah",
      color: "text-green-600 bg-green-100",
      description: "Risiko dapat diterima dengan pengendalian minimal",
    };
  } else if (score <= 12) {
    return {
      score,
      level: "Sedang",
      color: "text-yellow-600 bg-yellow-100",
      description: "Risiko memerlukan pengendalian dan monitoring",
    };
  } else if (score <= 20) {
    return {
      score,
      level: "Tinggi",
      color: "text-orange-600 bg-orange-100",
      description: "Risiko memerlukan penanganan prioritas",
    };
  } else {
    return {
      score,
      level: "Sangat Tinggi",
      color: "text-red-600 bg-red-100",
      description: "Risiko memerlukan penanganan segera dan komprehensif",
    };
  }
};
