import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Hash password for dummy user
  const hashedPassword = await bcrypt.hash("Password123!", 10);

  // Create dummy user
  const user = await prisma.user.upsert({
    where: { email: "budi.direktur@example.com" },
    update: {},
    create: {
      email: "budi.direktur@example.com",
      password: hashedPassword,
      nama: "Budi Santoso",
      tingkatan_jabatan: "T2",
    },
  });

  console.log("✅ Created user:", user.nama);

  // Create dummy risk context
  const context = await prisma.riskContext.upsert({
    where: { id: "context-1" },
    update: {},
    create: {
      id: "context-1",
      nama_kl: "Kementerian Pekerjaan Umum dan Perumahan Rakyat",
      tahun_penilaian: 2025,
      periode: "Januari - Desember 2025",
      sumber_data: "Dokumen RKP dan RPJP",
      dja_yang_menilai: "Direktorat Jenderal Cipta Karya",
      tujuan_strategis:
        "Tingkat kualitas pengelolaan tata naskah dinas, kearsipan, dan pengelolaan ketatausahaan sebesar 100%",
      proses_bisnis: "Pengelolaan Arsip dan Ketatausahaan",
      userId: user.id,
    },
  });

  console.log("✅ Created context:", context.nama_kl);

  // Create dummy risk identification
  const identification = await prisma.riskIdentification.upsert({
    where: { id: "identification-1" },
    update: {},
    create: {
      id: "identification-1",
      sifat_risiko: "controllable",
      kode_risiko: "RSK-001",
      pemilik: "Kabag TU",
      kategori_risiko: "kinerja",
      uraian_risiko: "Dokumen Arsip Hilang / Rusak",
      sumber_sebab: "Faktor kelembaban ruang penyimpanan",
      uraian_sebab:
        "Penyusunan & rekap dokumen arsip tidak sesuai SOP dan faktor kelembaban ruang penyimpanan",
      pihak_terkena: "Organisasi internal",
      uraian_dampak:
        "Arsip rusak/tidak terbaca/tidak dapat ditemukan (gangguan layanan organisasi)",
      konteksId: context.id,
      userId: user.id,
    },
  });

  console.log("✅ Created identification:", identification.uraian_risiko);

  // Create dummy risk analysis
  const analysis = await prisma.riskAnalysis.upsert({
    where: { id: "analysis-1" },
    update: {},
    create: {
      id: "analysis-1",
      skala_dampak: 3,
      skala_kemungkinan: 3,
      skala_risiko: 14, // From matrix calculation
      uraian_pengendalian:
        "Pencatatan & rekap dokumen dengan Permen PUPR No. 23/2016, 26/2021, 27/2021, 28/2020",
      hasil_penilaian: "belum memadai",
      konteksId: context.id,
      identifikasiId: identification.id,
      userId: user.id,
    },
  });

  console.log("✅ Created analysis:", analysis.id);

  // Create dummy risk assessment
  const assessment = await prisma.riskAssessment.upsert({
    where: { id: "assessment-1" },
    update: {},
    create: {
      id: "assessment-1",
      respon_risiko: "mengurangi frekuensi",
      pengendalian_sudah_ada:
        "Pencatatan & rekap dokumen dengan Permen PUPR No. 23/2016, 26/2021, 27/2021, 28/2020",
      rencana_tindak_pengendalian:
        "Digitalisasi dokumen arsip dan Fumigasi ruang arsip",
      penanggung_jawab: "Kabag TU, Ketua Tim Pelaksana, Pengelola Arsip",
      target_penyelesaian: new Date("2025-09-30"),
      indikator_pengeluaran: "Dokumen laporan, aplikasi",
      kemungkinan_diharapkan: 2,
      dampak_diharapkan: 2,
      nilai_diharapkan: 7, // From matrix calculation
      konteksId: context.id,
      identifikasiId: identification.id,
      analisisId: analysis.id, // Add missing analisisId
      userId: user.id,
    },
  });

  console.log("✅ Created assessment:", assessment.id);

  console.log("🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
