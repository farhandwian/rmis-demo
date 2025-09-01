"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Building,
  Search,
  Shield,
  FileText,
  Users,
  ChevronDown,
  ChevronRight,
  LogOut,
  User,
} from "lucide-react";

interface User {
  email: string;
  nama: string;
  tingkatan_jabatan: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isRiskMenuOpen, setIsRiskMenuOpen] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      disabled: true,
    },
    {
      title: "Struktur Organisasi",
      icon: Building,
      href: "/dashboard/organization",
      disabled: true,
    },
    {
      title: "Root Cause Analysis",
      icon: Search,
      href: "/dashboard/rca",
      disabled: true,
    },
    {
      title: "Pengelolaan Risiko",
      icon: Shield,
      href: "/dashboard/risks",
      hasSubmenu: true,
      submenu: [
        {
          title: "Penetapan Konteks",
          href: "/dashboard/risks/context",
        },
        {
          title: "Identifikasi Risiko",
          href: "/dashboard/risks/identify",
        },
        {
          title: "Analisis Risiko",
          href: "/dashboard/risks/analyze",
        },
        {
          title: "Risiko Prioritas",
          href: "/dashboard/risks/priority",
        },
        {
          title: "Penilaian Risiko",
          href: "/dashboard/risks/assessment",
        },
      ],
    },
    {
      title: "Pencatatan Kejadian",
      icon: FileText,
      href: "/dashboard/incidents",
      disabled: true,
    },
    {
      title: "Manajemen Pengguna",
      icon: Users,
      href: "/dashboard/users",
      disabled: true,
    },
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pu-yellow mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pu-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`bg-white border-r border-pu-gray-200 transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="p-4">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-pu-yellow rounded-lg flex items-center justify-center">
              <span className="text-pu-blue font-bold text-lg">RM</span>
            </div>
            {isSidebarOpen && (
              <div>
                <h1 className="font-bold text-pu-blue">RMIS</h1>
                <p className="text-xs text-pu-gray-500">Risk Management</p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              <div key={index}>
                {item.hasSubmenu ? (
                  <div>
                    <button
                      onClick={() => setIsRiskMenuOpen(!isRiskMenuOpen)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm font-medium rounded-lg transition-colors ${
                        pathname.startsWith("/dashboard/risks")
                          ? "bg-pu-yellow/20 text-pu-blue"
                          : "text-pu-gray-600 hover:bg-pu-gray-100"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {isSidebarOpen && (
                        <>
                          <span className="flex-1">{item.title}</span>
                          {isRiskMenuOpen ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </>
                      )}
                    </button>
                    {isRiskMenuOpen && isSidebarOpen && item.submenu && (
                      <div className="ml-8 mt-2 space-y-1">
                        {item.submenu.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.href}
                            className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                              pathname === subItem.href
                                ? "bg-pu-yellow text-pu-blue font-medium"
                                : "text-pu-gray-600 hover:bg-pu-gray-100"
                            }`}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      item.disabled
                        ? "text-pu-gray-400 cursor-not-allowed"
                        : pathname === item.href
                        ? "bg-pu-yellow text-pu-blue"
                        : "text-pu-gray-600 hover:bg-pu-gray-100"
                    }`}
                    onClick={
                      item.disabled ? (e) => e.preventDefault() : undefined
                    }
                  >
                    <item.icon className="w-5 h-5" />
                    {isSidebarOpen && <span>{item.title}</span>}
                    {item.disabled && isSidebarOpen && (
                      <span className="text-xs bg-pu-gray-200 px-2 py-1 rounded text-pu-gray-500 ml-auto">
                        Soon
                      </span>
                    )}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white border-b border-pu-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <LayoutDashboard className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-pu-blue">
                  Sistem Informasi Manajemen Risiko
                </h1>
                <p className="text-sm text-pu-gray-600">
                  Kementerian Pekerjaan Umum dan Perumahan Rakyat
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-pu-blue">{user.nama}</p>
                <p className="text-xs text-pu-gray-500">
                  {user.tingkatan_jabatan}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
