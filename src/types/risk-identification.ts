export type KategoriRisiko = "kinerja" | "keuangan" | "reputasi";
export type SifatRisiko = "uncontrollable" | "controllable";

export interface RisikoIdentifikasiItem {
  id: string;
  konteks_id: string; // relasi ke Konteks
  sifat_risiko: SifatRisiko;
  kode_risiko: string;
  pemilik: string;
  kategori_risiko: KategoriRisiko;
  uraian_risiko: string;
  sebab: {
    sumber: string;
    uraian_sebab: string;
  };
  dampak: {
    pihak_terkena: string;
    uraian_dampak: string;
  };
  created_at: string;
}
