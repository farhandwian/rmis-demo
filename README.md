## Sistem Informasi Manajemen Risiko (RMIS)

Aplikasi RMIS Kementerian PUPR - Risk Management Information System

### 🚀 Fitur Utama

1. **Penetapan Konteks** - Menentukan konteks organisasi dan tujuan strategis
2. **Identifikasi Risiko** - Mengidentifikasi potensi risiko dengan bantuan AI
3. **Analisis Risiko** - Analisis kemungkinan dan dampak risiko
4. **Risiko Prioritas** - Penentuan prioritas berdasarkan matriks risiko
5. **Penilaian Risiko** - Penilaian komprehensif dan rencana tindak lanjut

### 🛠️ Teknologi yang Digunakan

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: TailwindCSS dengan tema PUPR
- **UI Components**: Radix UI components
- **Database**: Prisma ORM dengan SQLite
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod validation
- **Charts**: Chart.js + React Chart.js 2
- **Icons**: Lucide React

### 🎨 Design System

Aplikasi menggunakan design system yang konsisten dengan identitas visual Kementerian PUPR:
- **Primary Color**: PU Yellow (#F5B800)
- **Secondary Color**: PU Blue (#1B365D)
- **Accent Color**: PU Accent (#4A90B8)
- **Typography**: Poppins (headings) + Inter (body text)

### 📱 Fitur AI Suggestions

Sistem dilengkapi dengan simulasi AI suggestions untuk membantu:
- Identifikasi risiko potensial
- Saran strategi pengendalian
- Template uraian risiko
- Rekomendasi mitigasi

### 🚦 Status Pengembangan

- ✅ Setup proyek dan struktur folder
- ✅ Implementasi design system dan UI components
- ✅ Halaman login dan dashboard
- ✅ Modul Penetapan Konteks
- ✅ Modul Identifikasi Risiko dengan AI suggestions
- ✅ Modul Analisis Risiko
- ✅ Modul Risiko Prioritas dengan matriks visualisasi
- ✅ Modul Penilaian Risiko dan export laporan
- ✅ Layout responsif dan navigasi
- ⏳ Integrasi database real-time
- ⏳ Autentikasi dan autorisasi penuh
- ⏳ Dashboard analytics dan reporting
- ⏳ Notifikasi dan workflow approval

### 🔧 Cara Menjalankan

1. Install dependencies:
   ```bash
   npm install
   ```

2. Setup database:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

3. Jalankan development server:
   ```bash
   npm run dev
   ```

4. Buka browser di `http://localhost:3000`

### 👤 Demo User

Untuk testing, gunakan kredensial berikut:
- **Email**: budi.direktur@example.com
- **Password**: Password123!

### 📋 Workflow Penggunaan

1. **Login** dengan kredensial demo
2. **Penetapan Konteks** - Buat konteks organisasi terlebih dahulu
3. **Identifikasi Risiko** - Tambah risiko berdasarkan konteks
4. **Analisis Risiko** - Lakukan analisis untuk risiko yang sudah diidentifikasi
5. **Lihat Prioritas** - Cek matriks dan prioritas risiko
6. **Penilaian Risiko** - Buat penilaian dan rencana tindak lanjut

### 🏗️ Struktur Folder

```
src/
├── app/                 # Next.js App Router
│   ├── dashboard/       # Dashboard pages
│   │   └── risks/       # Risk management modules
│   ├── login/           # Login page
│   └── globals.css      # Global styles
├── components/          # Reusable components
│   ├── ui/             # Base UI components
│   ├── layout/         # Layout components
│   └── ai/             # AI-related components
├── lib/                # Utility libraries
├── types/              # TypeScript type definitions
├── hooks/              # Custom React hooks
└── stores/             # State management
```

### 📄 License

© 2025 Kementerian Pekerjaan Umum dan Perumahan Rakyat
