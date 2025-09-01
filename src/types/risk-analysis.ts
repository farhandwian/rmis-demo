export type HasilPenilaian = "belum memadai" | "memadai";

export interface RisikoAnalisisItem {
  id: string;
  identifikasi_id: string; // relasi ke RisikoIdentifikasiItem
  skala_dampak: number; // 1..5
  skala_kemungkinan: number; // 1..5
  skala_risiko: number; // hasil perhitungan
  pengendalian: {
    uraian: string;
    hasil_penilaian: HasilPenilaian;
  };
  created_at: string;
}
