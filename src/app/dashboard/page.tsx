"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Target, AlertTriangle, CheckCircle } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-title text-pu-blue mb-2">Dashboard</h1>
        <p className="text-pu-gray-600">
          Selamat datang di Sistem Informasi Manajemen Risiko Kementerian PUPR
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-metric">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Konteks</CardTitle>
            <Target className="h-4 w-4 text-pu-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-pu-blue">5</div>
            <p className="text-xs text-pu-gray-500">Konteks risiko aktif</p>
          </CardContent>
        </Card>

        <Card className="card-metric">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Risiko Teridentifikasi
            </CardTitle>
            <Shield className="h-4 w-4 text-pu-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-pu-blue">23</div>
            <p className="text-xs text-pu-gray-500">Risiko dalam database</p>
          </CardContent>
        </Card>

        <Card className="card-metric">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Risiko Prioritas
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-pu-danger" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-pu-blue">8</div>
            <p className="text-xs text-pu-gray-500">Memerlukan perhatian</p>
          </CardContent>
        </Card>

        <Card className="card-metric">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Penilaian Selesai
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-pu-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-pu-blue">12</div>
            <p className="text-xs text-pu-gray-500">Penilaian terkomplesi</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-dashboard">
          <CardHeader>
            <CardTitle className="text-pu-blue">
              Mulai Pengelolaan Risiko
            </CardTitle>
            <CardDescription>
              Akses cepat ke modul-modul utama pengelolaan risiko
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => router.push("/dashboard/risks/context")}
              className="w-full justify-start btn-primary"
            >
              <Target className="w-4 h-4 mr-2" />
              Penetapan Konteks
            </Button>
            <Button
              onClick={() => router.push("/dashboard/risks/identify")}
              className="w-full justify-start btn-secondary"
            >
              <Shield className="w-4 h-4 mr-2" />
              Identifikasi Risiko
            </Button>
            <Button
              onClick={() => router.push("/dashboard/risks/analyze")}
              className="w-full justify-start"
              variant="outline"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Analisis Risiko
            </Button>
          </CardContent>
        </Card>

        <Card className="card-dashboard">
          <CardHeader>
            <CardTitle className="text-pu-blue">Status Sistem</CardTitle>
            <CardDescription>
              Informasi status dan aktivitas terkini
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-pu-gray-600">Database</span>
              <span className="flex items-center text-sm text-pu-success">
                <CheckCircle className="w-4 h-4 mr-1" />
                Terhubung
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-pu-gray-600">AI Suggestions</span>
              <span className="flex items-center text-sm text-pu-success">
                <CheckCircle className="w-4 h-4 mr-1" />
                Aktif
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-pu-gray-600">Last Update</span>
              <span className="text-sm text-pu-gray-500">
                {new Date().toLocaleDateString("id-ID")}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="card-dashboard">
        <CardHeader>
          <CardTitle className="text-pu-blue">Aktivitas Terkini</CardTitle>
          <CardDescription>
            Riwayat aktivitas pengelolaan risiko terbaru
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-pu-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-pu-success rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-pu-blue">
                  Konteks "Manajemen Kualitas Infrastruktur" telah dibuat
                </p>
                <p className="text-xs text-pu-gray-500">2 jam yang lalu</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-pu-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-pu-warning rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-pu-blue">
                  5 risiko baru telah diidentifikasi pada proyek infrastruktur
                </p>
                <p className="text-xs text-pu-gray-500">5 jam yang lalu</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-pu-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-pu-accent rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-pu-blue">
                  Analisis risiko untuk "Keterlambatan Material" selesai
                </p>
                <p className="text-xs text-pu-gray-500">1 hari yang lalu</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
