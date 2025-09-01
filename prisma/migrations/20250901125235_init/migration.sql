-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "tingkatan_jabatan" TEXT NOT NULL DEFAULT 'T1',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."risk_contexts" (
    "id" TEXT NOT NULL,
    "nama_kl" TEXT NOT NULL,
    "tahun_penilaian" INTEGER NOT NULL,
    "periode" TEXT NOT NULL,
    "sumber_data" TEXT,
    "dja_yang_menilai" TEXT,
    "tujuan_strategis" TEXT NOT NULL,
    "proses_bisnis" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "risk_contexts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."risk_identifications" (
    "id" TEXT NOT NULL,
    "sifat_risiko" TEXT NOT NULL,
    "kode_risiko" TEXT NOT NULL,
    "pemilik" TEXT NOT NULL,
    "kategori_risiko" TEXT NOT NULL,
    "uraian_risiko" TEXT NOT NULL,
    "sumber_sebab" TEXT NOT NULL,
    "uraian_sebab" TEXT NOT NULL,
    "pihak_terkena" TEXT NOT NULL,
    "uraian_dampak" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "konteksId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "risk_identifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."risk_analyses" (
    "id" TEXT NOT NULL,
    "skala_dampak" INTEGER NOT NULL,
    "skala_kemungkinan" INTEGER NOT NULL,
    "skala_risiko" INTEGER NOT NULL,
    "uraian_pengendalian" TEXT NOT NULL,
    "hasil_penilaian" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "identifikasiId" TEXT NOT NULL,
    "konteksId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "risk_analyses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."risk_assessments" (
    "id" TEXT NOT NULL,
    "respon_risiko" TEXT NOT NULL,
    "pengendalian_sudah_ada" TEXT NOT NULL,
    "rencana_tindak_pengendalian" TEXT NOT NULL,
    "penanggung_jawab" TEXT NOT NULL,
    "target_penyelesaian" TIMESTAMP(3) NOT NULL,
    "indikator_pengeluaran" TEXT NOT NULL,
    "kemungkinan_diharapkan" INTEGER NOT NULL,
    "dampak_diharapkan" INTEGER NOT NULL,
    "nilai_diharapkan" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "identifikasiId" TEXT NOT NULL,
    "analisisId" TEXT NOT NULL,
    "konteksId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "risk_assessments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "risk_analyses_identifikasiId_key" ON "public"."risk_analyses"("identifikasiId");

-- AddForeignKey
ALTER TABLE "public"."risk_contexts" ADD CONSTRAINT "risk_contexts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."risk_identifications" ADD CONSTRAINT "risk_identifications_konteksId_fkey" FOREIGN KEY ("konteksId") REFERENCES "public"."risk_contexts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."risk_identifications" ADD CONSTRAINT "risk_identifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."risk_analyses" ADD CONSTRAINT "risk_analyses_identifikasiId_fkey" FOREIGN KEY ("identifikasiId") REFERENCES "public"."risk_identifications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."risk_analyses" ADD CONSTRAINT "risk_analyses_konteksId_fkey" FOREIGN KEY ("konteksId") REFERENCES "public"."risk_contexts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."risk_analyses" ADD CONSTRAINT "risk_analyses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."risk_assessments" ADD CONSTRAINT "risk_assessments_identifikasiId_fkey" FOREIGN KEY ("identifikasiId") REFERENCES "public"."risk_identifications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."risk_assessments" ADD CONSTRAINT "risk_assessments_analisisId_fkey" FOREIGN KEY ("analisisId") REFERENCES "public"."risk_analyses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."risk_assessments" ADD CONSTRAINT "risk_assessments_konteksId_fkey" FOREIGN KEY ("konteksId") REFERENCES "public"."risk_contexts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."risk_assessments" ADD CONSTRAINT "risk_assessments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
