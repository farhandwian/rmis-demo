# GitHub Copilot Instruction — Risk Management Information System (Demo)

> Dokumen ini ditulis agar **ramah dibaca AI (GitHub Copilot)**: ringkas, eksplisit, konsisten, dengan skema data yang tegas, contoh payload, dan acceptance criteria per-fitur. Gunakan sebagai _spec_ untuk scaffold komponen, API, dan seed data.

---

## 0) Aturan Umum (untuk Copilot)

- **Gunakan penamaan snake_case** untuk field (contoh: `tingkatan_jabatan`).
- **Enum selalu ditulis eksplisit** (lihat bagian “Konstanta & Enum”).
- **Semua halaman punya**: list (filter, search, pagination, actions), form (create/update), dan aksi (tambah/ubah/hapus) jika disebutkan.
- **Autofill**: field bertanda _autofill_ harus terisi otomatis setelah input kunci dipilih (jelas di setiap subfitur).
- **Tombol “Saran AI”**: buka modal berisi _dummy rekomendasi_. Multi-select → hasil ditambahkan sebagai bullet `-` ke input terkait.
- **Prioritas fitur**: fokus ke **Pengelolaan Risiko** (menu lain boleh placeholder saja).

---

## 1) Autentikasi — Login Page

### Field pengguna
- `email` (string, required)
- `password` (string, required)
- `nama` (string)
- `tingkatan_jabatan` (enum bebas string, contoh: `T1`, `T2`, `T3`)

### Seed (dummy user)
```json
{
  "email": "budi.direktur@example.com",
  "password": "Password123!",
  "nama": "Budi Santoso",
  "tingkatan_jabatan": "T2"
}
```

### Acceptance Criteria
- Dapat login dengan dummy user di atas.
- Setelah login, diarahkan ke **Pengelolaan Risiko**.

---

## 2) Layout Website

### Sidebar
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

### Topbar
- Buat menarik/rapi (brand, user menu). Fungsionalitas dasar saja.

---

## 3) Pengelolaan Risiko (Fitur Inti)

> Rute disarankan:
> - `/risks/context`
> - `/risks/identify`
> - `/risks/analyze`
> - `/risks/priority`
> - `/risks/assessment`

### 3.1 Penetapan Konteks

#### List Page
- Tampilkan daftar _konteks_ (1 konteks bisa punya banyak risiko).
- Fitur: **filter, search, pagination**.
- Actions: **tambah, ubah, hapus**.

#### Form (Tambah/Update)
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

### 3.2 Identifikasi Risiko

#### List Page
- Data berinduk pada **Penetapan Konteks**.
- Fitur: **filter, search, pagination**, actions: **tambah, ubah, hapus**.
- Tombol **“Saran AI”** di samping tombol **Tambah**.

#### Form (Tambah/Update)

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

### 3.3 Analisis Risiko

#### List Page
- Berinduk pada **Penetapan Konteks**.
- Fitur: **filter, search, pagination**.
- Actions: **ubah, hapus** (tambahkan **Delete** di actions).
- Tombol **Saran AI** di samping **Tambah** (namun **tidak ada tombol tambah** untuk baris analisis; item berasal dari identifikasi).

#### Form (Update per-Item)
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


---

### 3.4 Risiko Prioritas

#### List Page (kolom)
1. `nama_kementerian_lembaga`
2. `tahun`
3. `nama_penetapan_konteks`
4. `aksi` (detail, update, delete, **pilih_risiko**)

> **pilih_risiko** = checkbox agar pemilik risiko menandai mana yang jadi **risiko prioritas**.

#### Form (Page terpisah dalam sub-tab yang sama)
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

### 3.5 Penilaian Risiko

#### List Page (kolom)
1. `nama_kementerian_lembaga`
2. `nama_penetapan_konteks`
3. `tahun`
4. `kode_risiko`
5. `penanggung_jawab`
6. `target_penyelesaian`
7. `aksi` (detail, update, delete)

#### Form (Page terpisah)

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

## 4) Konstanta & Enum (untuk Copilot)

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

## 5) Tipe Data (contoh untuk Copilot)

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

## 6) Perilaku “Saran AI” (Modal)

- **Trigger**: tombol “Saran AI” pada field yang ditentukan.
- **Tampilan**: list rekomendasi **dummy** (checkbox).
- **Aksi**:
  - **Pilih**: semua item terpilih ditambahkan ke input target sebagai poin baru `- ...`.
  - **Batal**: tutup modal, tidak ada perubahan.
- **Catatan**: isi rekomendasi **disesuaikan saat demo** berdasarkan data risiko yang sedang diisi.

---

## 7) Dummy Data Risiko (untuk Demo)

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

## 8) Acceptance Checklist (ringkas per halaman)

- **Penetapan Konteks**
  - [ ] CRUD konteks.
  - [ ] Validasi field wajib.
  - [ ] Data tersedia untuk modul lain.

- **Identifikasi Risiko**
  - [ ] `tujuan_strategis` memicu autofill (`tahun_penilaian`, `periode`, `proses_bisnis`).
  - [ ] Tabel punya search & pagination.
  - [ ] Item bisa tambah/ubah/hapus.
  - [ ] Modal **Saran AI** multi-select → append bullet.

- **Analisis Risiko**
  - [ ] Tidak ada tombol tambah item analisis.
  - [ ] Update & delete tersedia per item.
  - [ ] Modal **Saran AI** pada `pengendalian.uraian`.

- **Risiko Prioritas**
  - [ ] Checkbox **pilih_risiko** berfungsi.
  - [ ] Warna level sesuai matriks/level_risiko.

- **Penilaian Risiko**
  - [ ] Field yang bersumber dari modul lain tampil konsisten.
  - [ ] Simpan `rencana_tindak_pengendalian`, `penanggung_jawab`, `target_penyelesaian`, `indikator_pengeluaran`.
  - [ ] Hitung/simpan nilai **diharapkan** dari matriks.

---

## 9) Catatan Implementasi (opsional, untuk Copilot)

- **Routing**: gunakan nested route sesuai sub-tab.
- **State**: simpan pilihan konteks aktif agar dipakai lintas sub-tab.
- **Styling**: bebas; prioritaskan kejelasan form, tabel, dan modal.
- **Testing**: siapkan seed minimal (dummy user + 1 konteks + 1 siklus risiko) agar alur demo lengkap.
