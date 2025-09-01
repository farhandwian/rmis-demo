"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pu-yellow/10 via-white to-pu-blue/10">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-pu-accent to-pu-blue text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-pu-accent/90 to-pu-blue/90"></div>
        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-pu-yellow rounded-full mb-6">
              <span className="text-3xl font-bold text-pu-blue">RM</span>
            </div>
          </div>
          <h1 className="text-hero text-pu-blue mb-6">
            Risk Management Information System
          </h1>
          <p className="text-subtitle text-pu-gray-600 mb-8 max-w-3xl mx-auto">
            Sistem Informasi Manajemen Risiko untuk pengelolaan risiko yang
            komprehensif dan terintegrasi
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => router.push("/login")}
              className="btn-primary"
              size="lg"
            >
              Masuk ke Sistem
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push("/dashboard")}
            >
              Lihat Demo
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="card-dashboard hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <CardTitle className="text-pu-blue flex items-center gap-2">
                <div className="w-8 h-8 bg-pu-yellow rounded-lg flex items-center justify-center">
                  <span className="text-pu-blue font-bold">1</span>
                </div>
                Penetapan Konteks
              </CardTitle>
              <CardDescription>
                Menentukan konteks organisasi dan tujuan strategis untuk
                manajemen risiko
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="card-dashboard hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <CardTitle className="text-pu-blue flex items-center gap-2">
                <div className="w-8 h-8 bg-pu-yellow rounded-lg flex items-center justify-center">
                  <span className="text-pu-blue font-bold">2</span>
                </div>
                Identifikasi Risiko
              </CardTitle>
              <CardDescription>
                Mengidentifikasi potensi risiko yang dapat mempengaruhi
                pencapaian tujuan
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="card-dashboard hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <CardTitle className="text-pu-blue flex items-center gap-2">
                <div className="w-8 h-8 bg-pu-yellow rounded-lg flex items-center justify-center">
                  <span className="text-pu-blue font-bold">3</span>
                </div>
                Analisis Risiko
              </CardTitle>
              <CardDescription>
                Menganalisis kemungkinan dan dampak dari risiko yang telah
                diidentifikasi
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="card-dashboard hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <CardTitle className="text-pu-blue flex items-center gap-2">
                <div className="w-8 h-8 bg-pu-yellow rounded-lg flex items-center justify-center">
                  <span className="text-pu-blue font-bold">4</span>
                </div>
                Risiko Prioritas
              </CardTitle>
              <CardDescription>
                Menentukan prioritas risiko berdasarkan matriks risiko dan level
                dampak
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="card-dashboard hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <CardTitle className="text-pu-blue flex items-center gap-2">
                <div className="w-8 h-8 bg-pu-yellow rounded-lg flex items-center justify-center">
                  <span className="text-pu-blue font-bold">5</span>
                </div>
                Penilaian Risiko
              </CardTitle>
              <CardDescription>
                Melakukan penilaian komprehensif dan rencana tindak lanjut
                risiko
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="card-dashboard hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <CardTitle className="text-pu-blue flex items-center gap-2">
                <div className="w-8 h-8 bg-pu-accent rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">AI</span>
                </div>
                AI Suggestions
              </CardTitle>
              <CardDescription>
                Fitur saran AI untuk membantu proses identifikasi dan analisis
                risiko
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* About PUPR */}
        <div className="text-center">
          <Card className="card-dashboard max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-pu-blue">
                Kementerian Pekerjaan Umum dan Perumahan Rakyat
              </CardTitle>
              <CardDescription className="text-lg">
                Sistem ini dikembangkan untuk mendukung implementasi manajemen
                risiko di lingkungan Kementerian PUPR sesuai dengan standar dan
                regulasi yang berlaku.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-pu-gray-600">
                <span>• ISO 31000</span>
                <span>• COSO ERM</span>
                <span>• Peraturan Menteri PUPR</span>
                <span>• Standar Manajemen Risiko</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-pu-blue text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>
            &copy; 2025 Kementerian Pekerjaan Umum dan Perumahan Rakyat. All
            rights reserved.
          </p>
          <p className="text-pu-gray-300 text-sm mt-2">
            Risk Management Information System v1.0
          </p>
        </div>
      </footer>
    </div>
  );
}
