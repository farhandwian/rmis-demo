"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Dummy authentication - check against seed user
    if (
      formData.email === "budi.direktur@example.com" &&
      formData.password === "Password123!"
    ) {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Store user session (in a real app, this would be handled by auth system)
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: "budi.direktur@example.com",
          nama: "Budi Santoso",
          tingkatan_jabatan: "T2",
        })
      );

      router.push("/dashboard/risks/context");
    } else {
      alert("Email atau password salah!");
    }

    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fillDemoData = () => {
    setFormData({
      email: "budi.direktur@example.com",
      password: "Password123!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pu-yellow/10 via-white to-pu-blue/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-pu-yellow rounded-full mb-4">
            <span className="text-2xl font-bold text-pu-blue">RM</span>
          </div>
          <h1 className="text-2xl font-bold text-pu-blue">RMIS Login</h1>
          <p className="text-pu-gray-600">Sistem Informasi Manajemen Risiko</p>
        </div>

        <Card className="card-dashboard">
          <CardHeader>
            <CardTitle className="text-pu-blue">Masuk ke Sistem</CardTitle>
            <CardDescription>
              Masukkan kredensial Anda untuk mengakses sistem
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="contoh@pupr.go.id"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Masukkan password"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full btn-primary"
                disabled={isLoading}
              >
                {isLoading ? "Memproses..." : "Masuk"}
              </Button>
            </form>

            {/* Demo Helper */}
            <div className="mt-6 p-4 bg-pu-yellow/10 rounded-lg">
              <p className="text-sm text-pu-gray-600 mb-2">
                <strong>Demo User:</strong>
              </p>
              <p className="text-xs text-pu-gray-500 mb-3">
                Email: budi.direktur@example.com
                <br />
                Password: Password123!
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={fillDemoData}
                className="w-full"
              >
                Isi Data Demo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-pu-gray-500">
          <p>&copy; 2025 Kementerian PUPR</p>
        </div>
      </div>
    </div>
  );
}
