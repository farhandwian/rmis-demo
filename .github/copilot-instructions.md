<!-- # Risk Management Information System (RMIS) - Next.js Implementation Plan

## Overview

This document outlines the implementation plan for a Risk Management Information System (RMIS) using Next.js. The system will follow the Ministry of Public Works (PUPR) color scheme and provide comprehensive risk management capabilities as specified in the requirements. please make it ui ux as good as possible, dont forget using reusable components and clean code

### Key Features

- User authentication with role-based access control
- Risk management modules:
  - Context Setting (Penetapan Konteks)
  - Risk Identification (Identifikasi Risiko)
  - Risk Analysis (Analisis Risiko)
  - Priority Risks (Risiko Prioritas)
  - Risk Assessment (Penilaian Risiko)
- AI-powered suggestion features for risk data entry
- Responsive UI/UX design following Ministry of Public Works guidelines
- Data visualization and reporting capabilities
- PostgreSQL database connectivity
- Reusable components using shadcn/ui

### Technology Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Lucide React icons
- **State Management**: Zustand
- **Data Fetching**: SWR
- **Charts**: Chart.js with React Chart.js 2
- **Animations**: Framer Motion
- **Database**: PostgreSQL
- **ORM**: Prisma (for database connectivity)
- **Deployment**: Vercel

## UI/UX Design System

### Color Palette (Ministry of Public Works)

Based on the official PUPR color scheme:

```css
/* tailwind.config.js */
module.exports = {
  theme: {
    extend: {
      colors: {
        pu: {
          // Primary Colors
          yellow: '#F5B800',      // Kuning Kunyit
          'yellow-light': '#FFD700',
          'yellow-dark': '#E6A600',
          
          blue: '#1B365D',        // Biru Kehitaman
          'blue-light': '#2E5C8A',
          'blue-dark': '#0F1A2E',
          
          // Accent Colors
          accent: '#4A90B8',
          'accent-light': '#6BA8C7',
          'accent-dark': '#2C5A7A',
          
          // Status Colors
          success: '#28A745',
          warning: '#FFC107',
          danger: '#DC3545',
          info: '#17A2B8',
          
          // Neutral Colors
          gray: {
            50: '#F8F9FA',
            100: '#E9ECEF',
            200: '#DEE2E6',
            300: '#CED4DA',
            400: '#ADB5BD',
            500: '#6C757D',
            600: '#495057',
            700: '#343A40',
            800: '#212529',
            900: '#000000'
          }
        }
      }
    }
  }
}
```

### Typography

```css
/* globals.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@400;500;600;700&display=swap');

.text-hero {
  @apply text-4xl md:text-5xl lg:text-6xl font-bold font-heading;
}

.text-title {
  @apply text-2xl md:text-3xl font-semibold font-heading;
}

.text-subtitle {
  @apply text-lg md:text-xl font-medium;
}

.text-body {
  @apply text-base font-normal;
}

.text-small {
  @apply text-sm font-normal;
}

.text-caption {
  @apply text-xs font-medium;
}
```

### Component Variants

```css
/* Button Variants */
.btn-primary {
  @apply bg-pu-yellow text-pu-blue hover:bg-pu-yellow-dark 
         px-6 py-3 rounded-xl font-semibold transition-all duration-200
         shadow-pu hover:shadow-pu-lg transform hover:-translate-y-1;
}

.btn-secondary {
  @apply bg-pu-blue text-white hover:bg-pu-blue-light
         px-6 py-3 rounded-xl font-semibold transition-all duration-200
         shadow-pu hover:shadow-pu-lg transform hover:-translate-y-1;
}

.btn-outline {
  @apply border-2 border-pu-yellow text-pu-yellow hover:bg-pu-yellow hover:text-pu-blue
         px-6 py-3 rounded-xl font-semibold transition-all duration-200;
}

/* Card Variants */
.card-dashboard {
  @apply bg-white rounded-2xl shadow-pu border border-pu-gray-100 
         hover:shadow-pu-lg transition-all duration-300 p-6;
}

.card-metric {
  @apply bg-gradient-to-br from-pu-yellow/10 to-pu-blue/10 
         border border-pu-yellow/20 rounded-xl p-4
         hover:from-pu-yellow/20 hover:to-pu-blue/20 transition-all duration-300;
}
```

## Project Structure

```
rmis-demo/
├── README.md
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
├── prisma/                      # Prisma schema and migrations
│   ├── schema.prisma
│   └── migrations/
│
├── public/
│   ├── logo-pu.png
│   └── icons/
│
├── src/
│   ├── app/                     # App Router pages
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx             # Landing page
│   │   ├── login/
│   │   ├── dashboard/
│   │   │   ├── page.tsx         # Main dashboard
│   │   │   ├── risks/
│   │   │   │   ├── page.tsx     # Risk management main page
│   │   │   │   ├── context/
│   │   │   │   ├── identify/
│   │   │   │   ├── analyze/
│   │   │   │   ├── priority/
│   │   │   │   └── assessment/
│   │   │   └── users/
│   │   └── api/                 # API routes
│   │
│   ├── components/              # Reusable components
│   │   ├── ui/                  # shadcn/ui components
│   │   ├── layout/              # Layout components
│   │   ├── dashboard/           # Dashboard-specific components
│   │   ├── risks/               # Risk management components
│   │   ├── forms/               # Form components
│   │   └── ai/                  # AI simulation components
│   │
│   ├── lib/                     # Utilities and configurations
│   │   ├── utils.ts
│   │   ├── constants.ts
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   ├── db.ts                # Database connection
│   │   └── ai-simulation.ts
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useRiskContext.ts
│   │   ├── useRiskIdentification.ts
│   │   ├── useRiskAnalysis.ts
│   │   ├── useRiskPriority.ts
│   │   ├── useRiskAssessment.ts
│   │   └── useAI.ts
│   │
│   ├── stores/                  # Zustand stores
│   │   ├── authStore.ts
│   │   ├── riskStore.ts
│   │   └── aiStore.ts
│   │
│   └── types/                   # TypeScript type definitions
│       ├── user.ts
│       ├── risk-context.ts
│       ├── risk-identification.ts
│       ├── risk-analysis.ts
│       ├── risk-priority.ts
│       └── risk-assessment.ts
```

## Database Design

### PostgreSQL Connection

The application will connect to PostgreSQL using the following connection URL:
`POSTGRES_URL=postgres://postgres:yoontae93@127.0.0.1:5432/rmis-demo`

### Prisma Schema

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_URL")
}

sesuaikan dengan requirement
```

## Reusable Components with shadcn/ui

### Component Library Approach

All UI components will be built using shadcn/ui as the primary component library, with customizations to match the Ministry of Public Works color scheme. Where shadcn/ui components don't meet requirements, we'll create custom components that follow the same design patterns.

### Key Components

1. **Button** - Customized with PUPR color scheme
2. **Input** - Form inputs with validation
3. **Table** - Data tables with search, filter, and pagination
4. **Dialog** - Modal dialogs for forms and confirmations
5. **Select** - Dropdown selections for enums
6. **Card** - Content containers with PUPR styling
7. **Alert** - Notification components for errors and warnings
8. **Skeleton** - Loading states for data fetching
9. **Checkbox** - For selection controls
10. **Pagination** - For navigating through data

### Implementation Example

```tsx
// src/components/ui/button.tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-pu-yellow text-pu-blue hover:bg-pu-yellow-dark",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```


## AI Suggestion Features Implementation

### Overview

The AI suggestion features provide dummy recommendations for risk data entry based on the demo requirements. These features simulate AI intelligence using client-side algorithms.


## Requirement
### 0) Aturan Umum (untuk Copilot)

- **Gunakan penamaan snake_case** untuk field (contoh: `tingkatan_jabatan`).
- **Enum selalu ditulis eksplisit** (lihat bagian “Konstanta & Enum”).
- **Semua halaman punya**: list (filter, search, pagination, actions), form (create/update), dan aksi (tambah/ubah/hapus) jika disebutkan.
- **Autofill**: field bertanda _autofill_ harus terisi otomatis setelah input kunci dipilih (jelas di setiap subfitur).
- **Tombol “Saran AI”**: buka modal berisi _dummy rekomendasi_. Multi-select → hasil ditambahkan sebagai bullet `-` ke input terkait.
- **Prioritas fitur**: fokus ke **Pengelolaan Risiko** (menu lain boleh placeholder saja).

---

### 1) Autentikasi — Login Page

#### Field pengguna
- `email` (string, required)
- `password` (string, required)
- `nama` (string)
- `tingkatan_jabatan` (enum bebas string, contoh: `T1`, `T2`, `T3`)

#### Seed (dummy user)
```json
{
  "email": "budi.direktur@example.com",
  "password": "Password123!",
  "nama": "Budi Santoso",
  "tingkatan_jabatan": "T2"
}
```

#### Acceptance Criteria
- Dapat login dengan dummy user di atas.
- Setelah login, diarahkan ke **Pengelolaan Risiko**.

---

### 2) Layout Website

#### Sidebar
- Dashboard _(tidak prioritas)_
- Struktur Organisasi _(tidak prioritas)_
- Root Cause Analysis (RCA) _(tidak prioritas)_
- **Pengelolaan Risiko** _(prioritas utama)_
  - Penetapan Konteks
  - Identifikasi Risiko
  - Analisis Risiko
  - Risiko Prioritas
  - Penilaian Risiko
- Pencatatan Kejadian
- Manajemen Pengguna

#### Topbar
- Buat menarik/rapi (brand, user menu). Fungsionalitas dasar saja.

---

### 3) Pengelolaan Risiko (Fitur Inti)

> Rute disarankan:
> - `/risks/context`
> - `/risks/identify`
> - `/risks/analyze`
> - `/risks/priority`
> - `/risks/assessment`

#### 3.1 Penetapan Konteks

##### List Page
- Tampilkan daftar _konteks_ (1 konteks bisa punya banyak risiko).
- Fitur: **filter, search, pagination**.
- Actions: **tambah, ubah, hapus**.

##### Form (Tambah/Update)
Field:
- `nama_kl` (string, required)
- `tahun_penilaian` (number, required)
- `periode` (string, required)
- `sumber_data` (string)
- `dja_yang_menilai` (string)
- `tujuan_strategis` (string, required)
- `proses_bisnis` (string, required)

**Acceptance Criteria**
- CRUD konteks bekerja, validasi minimal untuk field required.
- Data siap dipakai sebagai sumber pada fitur berikutnya.

---

#### 3.2 Identifikasi Risiko

##### List Page
- Data berinduk pada **Penetapan Konteks**.
- Fitur: **filter, search, pagination**, actions: **tambah, ubah, hapus**.
- Tombol **“Saran AI”** di samping tombol **Tambah**.

##### Form (Tambah/Update)

**Bagian Input Konteks (autofill)**
- `tujuan_strategis` (select dari konteks) → **memicu autofill**:
  - `tahun_penilaian` (disabled, autofill)
  - `periode` (disabled, autofill)
  - `proses_bisnis` (disabled, autofill)

**Bagian Tabel Identifikasi Risiko (di bawah input konteks)**
Header data per-baris:
```json
{
  "risiko": {
    "kategori_risiko": "",
    "uraian": "",
    "kode_risiko": "",
    "pemilik": ""
  },
  "sebab": {
    "uraian": "",
    "sumber": ""
  },
  "sifat_risiko": "",
  "dampak": {
    "pihak_terkena": "",
    "uraian_dampak": ""
  },
  "aksi": ""
}
```

**Modal Tambah/Update Item Risiko**
- **Risiko**
  - `sifat_risiko` → enum: `uncontrollable | controllable`
  - `kode_risiko` → string
  - `pemilik` → string
  - `kategori_risiko` → enum: `kinerja | keuangan | reputasi`
  - `uraian_risiko` → string + **Saran AI**
- **Sebab**
  - `sumber` → string
  - `uraian_sebab` → string + **Saran AI**
- **Dampak**
  - `pihak_terkena` → string + **Saran AI**
  - `uraian_dampak` → string + **Saran AI**

**Catatan**
- Tabel dapat **search/paginate**; item bisa **ubah/hapus**.
- Modal **Saran AI**: multi-select → append ke input sebagai `- item`.

---

#### 3.3 Analisis Risiko

##### List Page
- Berinduk pada **Penetapan Konteks**.
- Fitur: **filter, search, pagination**.
- Actions: **ubah, hapus** (tambahkan **Delete** di actions).
- Tombol **Saran AI** di samping **Tambah** (namun **tidak ada tombol tambah** untuk baris analisis; item berasal dari identifikasi).

##### Form (Update per-Item)
**Bagian Input Konteks (autofill seperti di 3.2)**
- `tujuan_strategis` (select) → autofill:
  `tahun_penilaian`, `periode`, `proses_bisnis` (disabled).

**Bagian Tabel Analisis Risiko (di dalam form)**
Header:
```json
{
  "risiko_teridentifikasi": {
    "kategori_risiko": "",
    "nama_risiko": "",
    "kode_risiko": ""
  },
  "aksi": ""
}
```

**Modal Ubah (per baris)**
- **Risiko Teridentifikasi** (semua **disabled**):
  - `kategori_risiko`, `nama_risiko`, `kode_risiko`
- **Analisis Risiko**
  - `skala_dampak` (number)
  - `skala_kemungkinan` (number)
  - `skala_risiko` (number) — bisa dihitung atau diinput
- **Pengendalian**
  - `uraian` (string) + **Saran AI**
  - `hasil_penilaian` → enum: `belum memadai | memadai`

**Catatan**
- Tidak ada tombol tambah; data analisis merefer ke identifikasi.
- Delete/Update berjalan.
- Modal **Saran AI**: multi-select → append ke input sebagai `- item`.

---

#### 3.4 Risiko Prioritas

##### List Page (kolom)
1. `nama_kementerian_lembaga`
2. `tahun`
3. `nama_penetapan_konteks`
4. `aksi` (detail, update, delete, **pilih_risiko**)

> **pilih_risiko** = checkbox agar pemilik risiko menandai mana yang jadi **risiko prioritas**.

##### Form (Page terpisah dalam sub-tab yang sama)
- Menampilkan hasil analisis + perhitungan **risiko prioritas** menggunakan **matriks** (warna mengikuti level).

**Matriks & Level (lihat juga “Konstanta & Enum”)**
```json
{
  "kemungkinan": [
    "Hampir tidak terjadi",
    "Jarang terjadi",
    "Kadang terjadi",
    "Sering terjadi",
    "Hampir pasti terjadi"
  ],
  "dampak": [
    "Tidak Signifikan",
    "Minor",
    "Moderat",
    "Signifikan",
    "Sangat Signifikan"
  ],
  "matriks": [
    [1, 3, 5, 9, 20],
    [2, 7, 10, 13, 21],
    [4, 8, 14, 17, 22],
    [6, 12, 16, 19, 24],
    [11, 15, 18, 23, 25]
  ],
  "level_risiko": [
    {"level": "Sangat Rendah", "skor": "1-5", "warna": "Hijau Tua"},
    {"level": "Rendah", "skor": "6-10", "warna": "Hijau Muda"},
    {"level": "Sedang", "skor": "11-15", "warna": "Kuning"},
    {"level": "Tinggi", "skor": "16-19", "warna": "Oranye"},
    {"level": "Sangat Tinggi", "skor": "20-25", "warna": "Merah"}
  ]
}
```

**Acceptance Criteria**
- Checkbox **pilih_risiko** menentukan daftar prioritas.
- Visualisasi warna sesuai range `level_risiko`.

---

#### 3.5 Penilaian Risiko

##### List Page (kolom)
1. `nama_kementerian_lembaga`
2. `nama_penetapan_konteks`
3. `tahun`
4. `kode_risiko`
5. `penanggung_jawab`
6. `target_penyelesaian`
7. `aksi` (detail, update, delete)

##### Form (Page terpisah)

**Section 1 — Risiko Prioritas (readonly/linked)**
- `daftar_risiko_prioritas` (berdasarkan konteks)
- `kategori_risiko` (dari identifikasi)
- `uraian_risiko` (dari identifikasi)
- `sumber_sebab` (dari identifikasi)
- `uraian_sebab` (dari identifikasi)
- `pihak_terkena` (dari identifikasi)
- `uraian_dampak` (dari identifikasi)
- `respon_risiko` (dropdown):
  - `mengurangi frekuensi`
  - `mengurangi dampak`
  - `membagi risiko`
  - `menghindari risiko`
  - `menerima risiko`

**Section 2 — Penilaian Risiko**
- `pengendalian_sudah_ada` (dari analisis: “pengendalian yang sudah dilaksanakan”)
- `rencana_tindak_pengendalian` (string)
- `penanggung_jawab` (string)
- `target_penyelesaian` (date)
- `indikator_pengeluaran` (string)

**Section 3 — Nilai Risiko yang Diharapkan**
- `kemungkinan` (number)
- `dampak` (number)
- `nilai` (number, ambil dari matriks analisis risiko)

**Acceptance Criteria**
- Field yang diambil dari fitur sebelumnya tampil konsisten (readonly/linked).
- Simpan perubahan penilaian dan target.

---

### 4) Konstanta & Enum (untuk Copilot)

```ts
// Risiko
type KategoriRisiko = "kinerja" | "keuangan" | "reputasi";
type SifatRisiko = "uncontrollable" | "controllable";

// Analisis
type HasilPenilaian = "belum memadai" | "memadai";

// Respon risiko (Penilaian Risiko)
type ResponRisiko =
  | "mengurangi frekuensi"
  | "mengurangi dampak"
  | "membagi risiko"
  | "menghindari risiko"
  | "menerima risiko";

// Matriks risiko (lihat juga JSON pada 3.4)
const LEVEL_RISIKO = [
  { level: "Sangat Rendah", skor: [1, 5], warna: "Hijau Tua" },
  { level: "Rendah", skor: [6, 10], warna: "Hijau Muda" },
  { level: "Sedang", skor: [11, 15], warna: "Kuning" },
  { level: "Tinggi", skor: [16, 19], warna: "Oranye" },
  { level: "Sangat Tinggi", skor: [20, 25], warna: "Merah" }
] as const;
```

---

### 5) Tipe Data (contoh untuk Copilot)

> **Catatan**: ini contoh tipe untuk memandu Copilot saat membuat model/DTO.

```ts
export interface Konteks {
  id: string;
  nama_kl: string;
  tahun_penilaian: number;
  periode: string;
  sumber_data?: string;
  dja_yang_menilai?: string;
  tujuan_strategis: string;
  proses_bisnis: string;
  created_at: string;
}

export interface RisikoIdentifikasiItem {
  id: string;
  konteks_id: string; // relasi ke Konteks
  sifat_risiko: "uncontrollable" | "controllable";
  kode_risiko: string;
  pemilik: string;
  kategori_risiko: "kinerja" | "keuangan" | "reputasi";
  uraian_risiko: string;
  sebab: { sumber: string; uraian_sebab: string };
  dampak: { pihak_terkena: string; uraian_dampak: string };
  created_at: string;
}

export interface RisikoAnalisisItem {
  id: string;
  identifikasi_id: string; // relasi ke RisikoIdentifikasiItem
  skala_dampak: number;        // 1..5
  skala_kemungkinan: number;   // 1..5
  skala_risiko: number;        // hasil perhitungan
  pengendalian: {
    uraian: string;
    hasil_penilaian: "belum memadai" | "memadai";
  };
  created_at: string;
}

export interface RisikoPrioritasSelection {
  id: string;
  konteks_id: string;
  identifikasi_id: string;
  dipilih: boolean; // dari checkbox "pilih_risiko"
}

export interface PenilaianRisiko {
  id: string;
  konteks_id: string;
  identifikasi_id: string;
  kode_risiko: string;
  penanggung_jawab: string;
  target_penyelesaian: string; // ISO date
  respon_risiko:
    | "mengurangi frekuensi"
    | "mengurangi dampak"
    | "membagi risiko"
    | "menghindari risiko"
    | "menerima risiko";

  pengendalian_sudah_ada: string;
  rencana_tindak_pengendalian: string;
  indikator_pengeluaran: string;

  // Nilai diharapkan
  expected: { kemungkinan: number; dampak: number; nilai: number };

  created_at: string;
}
```

---

### 6) Perilaku “Saran AI” (Modal)

- **Trigger**: tombol “Saran AI” pada field yang ditentukan.
- **Tampilan**: list rekomendasi **dummy** (checkbox).
- **Aksi**:
  - **Pilih**: semua item terpilih ditambahkan ke input target sebagai poin baru `- ...`.
  - **Batal**: tutup modal, tidak ada perubahan.
- **Catatan**: isi rekomendasi **disesuaikan saat demo** berdasarkan data risiko yang sedang diisi.

---

### 7) Dummy Data Risiko (untuk Demo)

```
no: 1
tujuan_kegiatan_utama: Tingkat kualitas pengelolaan tata naskah dinas, kearsipan, dan pengelolaan ketatausahaan sebesar 100%
pernyataan_risiko: Dokumen Arsip Hilang / Rusak
kategori_risiko: Kinerja
penyebab:
  - Penyusunan & rekap dokumen arsip tidak sesuai SOP
  - Faktor kelembaban ruang penyimpanan
dampak: Arsip rusak/tidak terbaca/tidak dapat ditemukan (gangguan layanan organisasi)
pengendalian:
  - Pencatatan & rekap dokumen
  - Permen PUPR No. 23/2016, 26/2021, 27/2021, 28/2020
hasil_penilaian: Belum Memadai
nilai_risiko_setelah_pengendalian:
  k: 3
  d: 3
  nilai: 14
prioritas_risiko: 17
respon_risiko: Mengurangi frekuensi & dampak
rtp:
  - Digitalisasi dokumen arsip
  - Fumigasi ruang arsip
alokasi_sumber_daya: Man, Method, Money
nilai_risiko_diharapkan:
  k: 2
  d: 2
  nilai: 7
penanggung_jawab: Kabag TU, Ketua Tim Pelaksana, Pengelola Arsip
target_waktu: Mei–September 2025
indikator_keluaran: Dokumen laporan, aplikasi
```

---

### 8) Catatan Implementasi (opsional, untuk Copilot)

- **Routing**: gunakan nested route sesuai sub-tab.
- **State**: simpan pilihan konteks aktif agar dipakai lintas sub-tab.
- **Styling**: bebas; prioritaskan kejelasan form, tabel, dan modal.
- **Testing**: siapkan seed minimal (dummy user + 1 konteks + 1 siklus risiko) agar alur demo lengkap.


## Sample AI Suggestion Data

```typescript
// src/lib/ai-simulation.ts
export const aiSuggestions = {
  riskIdentification: {
    uraianRisiko: [
      "Keterlambatan penyelesaian proyek karena cuaca buruk",
      "Kenaikan harga material secara signifikan",
      "Kekurangan tenaga kerja terampil",
      "Masalah kualitas material yang diterima",
      "Perubahan regulasi yang mempengaruhi pelaksanaan proyek"
    ],
    sumberSebab: [
      "Faktor cuaca ekstrem",
      "Fluktuasi pasar global",
      "Kebijakan ketenagakerjaan",
      "Supplier material tidak terpercaya",
      "Perubahan kebijakan pemerintah"
    ],
    uraianSebab: [
      "Hujan deras yang berkepanjangan menghambat aktivitas konstruksi",
      "Kenaikan harga minyak dunia mempengaruhi biaya material",
      "Tingginya tingkat turnover karyawan di industri konstruksi",
      "Material yang diterima tidak sesuai spesifikasi teknis",
      "Perubahan peraturan lingkungan yang memperketat prosedur"
    ],
    pihakTerkena: [
      "Masyarakat sekitar proyek",
      "Pemilik proyek",
      "Kontraktor pelaksana",
      "Pemerintah daerah",
      "Stakeholder keuangan"
    ],
    uraianDampak: [
      "Keterlambatan pemanfaatan fasilitas publik",
      "Peningkatan biaya proyek secara signifikan",
      "Penurunan kualitas hasil akhir proyek",
      "Terhentinya sementara aktivitas konstruksi",
      "Peningkatan risiko hukum dan reputasi"
    ]
  },
  riskAnalysis: {
    uraianPengendalian: [
      "Mengembangkan rencana darurat untuk kondisi cuaca ekstrem",
      "Menggunakan kontrak harga tetap dengan penyesuaian tertentu",
      "Meningkatkan program rekrutmen dan retensi tenaga kerja",
      "Menerapkan sistem pemeriksaan kualitas yang ketat",
      "Melakukan pemantauan regulasi secara berkala"
    ]
  }
};
```

## Deployment and Testing Procedures

### Development Environment Setup

1. Install Node.js (version 18 or higher)
2. Install PostgreSQL database
3. Set up PostgreSQL with the connection URL: `POSTGRES_URL=postgres://postgres:yoontae93@127.0.0.1:5432/rmis-demo`
4. Install dependencies:
   ```bash
   npm install
   ```
5. Set up Prisma:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```
6. Run development server:
   ```bash
   npm run dev
   ```

### Production Build

1. Create production build:
   ```bash
   npm run build
   ```
2. Start production server:
   ```bash
   npm start
   ```

### Deployment to Vercel

1. Push code to GitHub repository
2. Connect repository to Vercel
3. Configure environment variables:
   - `POSTGRES_URL` with the PostgreSQL connection URL
4. Deploy automatically on push to main branch

### Database Migration

1. Update Prisma schema as needed
2. Generate Prisma client:
   ```bash
   npx prisma generate
   ```
3. Create migration:
   ```bash
   npx prisma migrate dev
   ```
4. Apply migrations to production database:
   ```bash
   npx prisma migrate deploy
   ```

### Testing Procedures

1. Unit testing with Jest for utility functions
2. Component testing with React Testing Library
3. End-to-end testing with Cypress
4. Manual testing of all user flows:
   - Login flow
   - Risk context management
   - Risk identification process
   - Risk analysis workflow
   - Priority risk selection
   - Risk assessment completion
5. Database integration testing with PostgreSQL

### Quality Assurance Checklist

- [ ] All forms have proper validation
- [ ] All tables have search, filter, and pagination
- [ ] AI suggestion features work correctly
- [ ] Data persists between sessions in PostgreSQL database
- [ ] Responsive design works on all screen sizes
- [ ] Color scheme follows Ministry of Public Works guidelines
- [ ] All navigation links work correctly
- [ ] Error handling is implemented for all user actions
- [ ] Loading states are shown during data operations
- [ ] Accessibility standards are followed
- [ ] Database connections are properly handled
- [ ] Prisma ORM is correctly configured

## Conclusion

This implementation plan provides a comprehensive roadmap for developing the Risk Management Information System using Next.js with PostgreSQL database connectivity and reusable components using shadcn/ui. The system will feature a modern, responsive UI following Ministry of Public Works color guidelines, with all required risk management modules and AI-powered suggestion features for an enhanced user experience.

The modular architecture allows for easy maintenance and future enhancements, while the consistent design patterns ensure a cohesive user experience across all modules. The use of modern technologies like Next.js, TypeScript, Tailwind CSS, shadcn/ui, and Prisma ensures a performant and maintainable application with proper database integration. -->