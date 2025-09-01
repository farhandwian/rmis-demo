# SIMONIC Next.js Demo - UI/UX Focused Specification
## Sistem Monitoring, Evaluasi, dan Pengendalian Irigasi Cerdas

### Version: 1.0 DEMO (Next.js)
### Date: August 2025
### Focus: UI/UX Excellence with Simulated AI

---

## Table of Contents

1. [Demo Overview](#demo-overview)
2. [Next.js Project Structure](#nextjs-project-structure)
3. [UI/UX Design System](#uiux-design-system)
4. [Component Library](#component-library)
5. [Page Specifications](#page-specifications)
6. [Simulated AI Agents](#simulated-ai-agents)
7. [Demo Data & Scenarios](#demo-data--scenarios)
8. [Deployment Specification](#deployment-specification)

---

## 1. Demo Overview

### 1.1 Demo Objectives
- Showcase stunning UI/UX with PU official colors
- Demonstrate all 7 modules with realistic interactions
- Simulate AI intelligence using client-side algorithms
- Present compelling demo scenarios for stakeholders
- Provide responsive design for all devices

### 1.2 Technology Stack
```json
{
  "frontend": {
    "framework": "Next.js 14 (App Router)",
    "language": "TypeScript",
    "styling": "Tailwind CSS + Styled Components",
    "ui_library": "shadcn/ui + Custom Components",
    "charts": "Chart.js + React Chart.js 2",
    "maps": "Leaflet + React Leaflet",
    "animations": "Framer Motion",
    "icons": "Lucide React + Heroicons"
  },
  "data": {
    "state_management": "Zustand",
    "data_fetching": "SWR",
    "storage": "Local Storage + JSON files",
    "mock_api": "MSW (Mock Service Worker)"
  },
  "deployment": {
    "platform": "Vercel",
    "domain": "simonic-demo.vercel.app",
    "environment": "Production-ready demo"
  }
}
```

### 1.3 Demo Features
- **7 Complete Modules** with full UI/UX
- **Multi-role Access** (PUPR Admin, BWS, Pemda, Contractor)
- **Simulated AI Insights** with realistic recommendations
- **Interactive Dashboards** with real-time updates
- **Mobile Responsive** design
- **Offline Capability** for demos
- **Export Features** (PDF, Excel reports)

---

## 2. Next.js Project Structure

### 2.1 Directory Structure
```
simonic-demo/
├── README.md
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
│
├── public/
│   ├── logo-pu.png
│   ├── maps/
│   ├── sample-photos/
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
│   │   │   ├── progress/
│   │   │   ├── reports/
│   │   │   ├── communication/
│   │   │   ├── finance/
│   │   │   ├── risk/
│   │   │   └── evaluation/
│   │   └── api/                 # API routes for demo data
│   │
│   ├── components/              # Reusable components
│   │   ├── ui/                  # Base UI components
│   │   ├── layout/              # Layout components
│   │   ├── dashboard/           # Dashboard-specific components
│   │   ├── charts/              # Chart components
│   │   ├── maps/                # Map components
│   │   ├── forms/               # Form components
│   │   └── ai/                  # AI simulation components
│   │
│   ├── lib/                     # Utilities and configurations
│   │   ├── utils.ts
│   │   ├── constants.ts
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   └── ai-simulation.ts
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useProjects.ts
│   │   ├── useAI.ts
│   │   └── useDemo.ts
│   │
│   ├── stores/                  # Zustand stores
│   │   ├── authStore.ts
│   │   ├── projectStore.ts
│   │   ├── dashboardStore.ts
│   │   └── aiStore.ts
│   │
│   ├── data/                    # Mock data for demo
│   │   ├── projects.json
│   │   ├── users.json
│   │   ├── progress.json
│   │   ├── financial.json
│   │   ├── risks.json
│   │   └── kpis.json
│   │
│   └── types/                   # TypeScript type definitions
│       ├── project.ts
│       ├── user.ts
│       ├── dashboard.ts
│       └── ai.ts
```

### 2.2 Package.json Dependencies
```json
{
  "name": "simonic-demo",
  "version": "1.0.0",
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "typescript": "^5.0.0",
    "@types/react": "^18.0.0",
    "@types/node": "^20.0.0",
    
    "tailwindcss": "^3.4.0",
    "styled-components": "^6.0.0",
    "@radix-ui/react-*": "latest",
    "lucide-react": "^0.300.0",
    "@heroicons/react": "^2.0.0",
    
    "chart.js": "^4.4.0",
    "react-chartjs-2": "^5.2.0",
    "leaflet": "^1.9.0",
    "react-leaflet": "^4.2.0",
    
    "framer-motion": "^10.16.0",
    "zustand": "^4.4.0",
    "swr": "^2.2.0",
    "msw": "^2.0.0",
    
    "jspdf": "^2.5.0",
    "xlsx": "^0.18.0",
    "date-fns": "^3.0.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  },
  "devDependencies": {
    "@types/leaflet": "^1.9.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0",
    "prettier": "^3.0.0"
  }
}
```

---

## 3. UI/UX Design System

### 3.1 Color System (PU Official)
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
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Inter', 'Poppins', 'sans-serif']
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem'
      },
      boxShadow: {
        'pu': '0 10px 15px -3px rgba(27, 54, 93, 0.1)',
        'pu-lg': '0 20px 25px -5px rgba(27, 54, 93, 0.1)',
        'pu-yellow': '0 10px 15px -3px rgba(245, 184, 0, 0.2)'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s infinite'
      }
    }
  }
}
```

### 3.2 Typography System
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

### 3.3 Component Variants
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
/* .card-dashboard {
  @apply bg-white rounded-2xl shadow-pu border border-pu-gray-100 
         hover:shadow-pu-lg transition-all duration-300 p-6;
} */

.card-metric {
  @apply bg-gradient-to-br from-pu-yellow/10 to-pu-blue/10 
         border border-pu-yellow/20 rounded-xl p-4
         hover:from-pu-yellow/20 hover:to-pu-blue/20 transition-all duration-300;
}
```

---

## 4. Component Library

### 4.1 Dashboard Components

#### Executive Summary Card
```tsx
// src/components/dashboard/ExecutiveSummaryCard.tsx
'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ExecutiveSummaryCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
    label: string;
  };
  icon: React.ReactNode;
  color?: 'yellow' | 'blue' | 'green' | 'red';
  loading?: boolean;
}

export default function ExecutiveSummaryCard({
  title,
  value,
  trend,
  icon,
  color = 'blue',
  loading = false
}: ExecutiveSummaryCardProps) {
  const colorClasses = {
    yellow: 'bg-gradient-to-br from-pu-yellow/10 to-pu-yellow/5 border-pu-yellow/20 text-pu-yellow',
    blue: 'bg-gradient-to-br from-pu-blue/10 to-pu-blue/5 border-pu-blue/20 text-pu-blue',
    green: 'bg-gradient-to-br from-pu-success/10 to-pu-success/5 border-pu-success/20 text-pu-success',
    red: 'bg-gradient-to-br from-pu-danger/10 to-pu-danger/5 border-pu-danger/20 text-pu-danger'
  };

  const getTrendIcon = () => {
    switch (trend?.direction) {
      case 'up': return <TrendingUp className="w-4 h-4" />;
      case 'down': return <TrendingDown className="w-4 h-4" />;
      default: return <Minus className="w-4 h-4" />;
    }
  };

  const getTrendColor = () => {
    switch (trend?.direction) {
      case 'up': return 'text-pu-success';
      case 'down': return 'text-pu-danger';
      default: return 'text-pu-gray-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`card-dashboard ${colorClasses[color]} relative overflow-hidden`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] bg-repeat" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl ${colorClasses[color]} bg-opacity-20`}>
            {icon}
          </div>
          {trend && (
            <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
              {getTrendIcon()}
              <span className="text-sm font-medium">{trend.value}%</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-pu-gray-600 text-sm font-medium">{title}</h3>
          {loading ? (
            <div className="animate-pulse bg-pu-gray-200 h-8 w-24 rounded" />
          ) : (
            <div className="text-3xl font-bold text-pu-gray-900">
              {typeof value === 'number' ? value.toLocaleString('id-ID') : value}
            </div>
          )}
          {trend && (
            <p className="text-xs text-pu-gray-500">{trend.label}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
```

#### Interactive Indonesia Map
```tsx
// src/components/maps/IndonesiaMap.tsx
'use client';

import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

interface MapProject {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  progress: number;
  status: 'planning' | 'ongoing' | 'completed' | 'delayed';
  budget: number;
}

interface IndonesiaMapProps {
  projects: MapProject[];
  selectedProvince?: string;
  onProjectClick?: (project: MapProject) => void;
  onProvinceClick?: (province: string) => void;
  heatmapEnabled?: boolean;
  filterBy?: 'progress' | 'budget' | 'status';
}

export default function IndonesiaMap({
  projects,
  selectedProvince,
  onProjectClick,
  onProvinceClick,
  heatmapEnabled = false,
  filterBy = 'progress'
}: IndonesiaMapProps) {
  const getMarkerColor = (project: MapProject) => {
    switch (filterBy) {
      case 'progress':
        if (project.progress >= 80) return '#28A745'; // Green
        if (project.progress >= 50) return '#FFC107'; // Yellow
        return '#DC3545'; // Red
      case 'status':
        switch (project.status) {
          case 'completed': return '#28A745';
          case 'ongoing': return '#17A2B8';
          case 'delayed': return '#DC3545';
          default: return '#6C757D';
        }
      default:
        return '#F5B800';
    }
  };

  const createCustomIcon = (project: MapProject) => {
    const color = getMarkerColor(project);
    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          background-color: ${color};
          border: 3px solid white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        "></div>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full h-[600px] rounded-2xl overflow-hidden shadow-pu-lg"
    >
      <MapContainer
        center={[-2.5, 118]} // Indonesia center
        zoom={5}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        
        {/* Project Markers */}
        {projects.map((project) => (
          <Marker
            key={project.id}
            position={[project.latitude, project.longitude]}
            icon={createCustomIcon(project)}
            eventHandlers={{
              click: () => onProjectClick?.(project)
            }}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-semibold text-pu-blue mb-2">{project.name}</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Progress:</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className={`font-medium capitalize ${
                      project.status === 'completed' ? 'text-pu-success' :
                      project.status === 'delayed' ? 'text-pu-danger' :
                      'text-pu-info'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Budget:</span>
                    <span className="font-medium">
                      Rp {(project.budget / 1000000000).toFixed(1)}M
                    </span>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map Legend */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-pu p-3 z-[1000]">
        <h4 className="text-sm font-semibold text-pu-blue mb-2">Legend</h4>
        <div className="space-y-1 text-xs">
          {filterBy === 'progress' && (
            <>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-pu-success rounded-full"></div>
                <span>Progress ≥ 80%</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-pu-warning rounded-full"></div>
                <span>Progress 50-79%</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-pu-danger rounded-full"></div>
                <span>Progress &lt; 50%</span>
              </div>
            </>
          )}
          {filterBy === 'status' && (
            <>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-pu-success rounded-full"></div>
                <span>Completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-pu-info rounded-full"></div>
                <span>Ongoing</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-pu-danger rounded-full"></div>
                <span>Delayed</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-pu-gray-500 rounded-full"></div>
                <span>Planning</span>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
```

#### S-Curve Progress Chart
```tsx
// src/components/charts/SCurveChart.tsx
'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface SCurveData {
  labels: string[];
  baseline: number[];
  actual: number[];
  forecast: number[];
}

interface SCurveChartProps {
  data: SCurveData;
  projectName: string;
  className?: string;
}

export default function SCurveChart({ data, projectName, className }: SCurveChartProps) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Baseline Plan',
        data: data.baseline,
        borderColor: '#6C757D',
        backgroundColor: 'rgba(108, 117, 125, 0.1)',
        borderDash: [5, 5],
        fill: false,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6
      },
      {
        label: 'Actual Progress',
        data: data.actual,
        borderColor: '#F5B800',
        backgroundColor: 'rgba(245, 184, 0, 0.1)',
        borderWidth: 3,
        fill: '+1',
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 8,
        pointBackgroundColor: '#F5B800',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2
      },
      {
        label: 'AI Forecast',
        data: data.forecast,
        borderColor: '#1B365D',
        backgroundColor: 'rgba(27, 54, 93, 0.1)',
        borderDash: [10, 5],
        fill: false,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointStyle: 'triangle'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: `${projectName} - S-Curve Progress Analysis`,
        font: {
          size: 16,
          weight: 'bold' as const
        },
        color: '#1B365D'
      },
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1B365D',
        bodyColor: '#1B365D',
        borderColor: '#F5B800',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(1)}%`;
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Timeline',
          font: {
            size: 14,
            weight: 'bold' as const
          },
          color: '#1B365D'
        },
        grid: {
          color: 'rgba(108, 117, 125, 0.1)'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Progress (%)',
          font: {
            size: 14,
            weight: 'bold' as const
          },
          color: '#1B365D'
        },
        min: 0,
        max: 100,
        grid: {
          color: 'rgba(108, 117, 125, 0.1)'
        },
        ticks: {
          callback: function(value: any) {
            return value + '%';
          }
        }
      }
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false
    },
    elements: {
      line: {
        tension: 0.4
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`card-dashboard ${className}`}
    >
      <div className="h-[400px]">
        <Line data={chartData} options={options} />
      </div>
      
      {/* Progress Indicators */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-pu-gray-50 rounded-lg">
          <div className="text-sm text-pu-gray-600">Schedule Variance</div>
          <div className="text-lg font-bold text-pu-blue">
            {data.actual[data.actual.length - 1] - data.baseline[data.baseline.length - 1] > 0 ? '+' : ''}
            {(data.actual[data.actual.length - 1] - data.baseline[data.baseline.length - 1]).toFixed(1)}%
          </div>
        </div>
        <div className="text-center p-3 bg-pu-gray-50 rounded-lg">
          <div className="text-sm text-pu-gray-600">Current Progress</div>
          <div className="text-lg font-bold text-pu-yellow">
            {data.actual[data.actual.length - 1]?.toFixed(1) || 0}%
          </div>
        </div>
        <div className="text-center p-3 bg-pu-gray-50 rounded-lg">
          <div className="text-sm text-pu-gray-600">Forecasted Completion</div>
          <div className="text-lg font-bold text-pu-blue">
            {data.forecast[data.forecast.length - 1]?.toFixed(1) || 0}%
          </div>
        </div>
      </div>
    </motion.div>
  );
}
```

### 4.2 AI Simulation Components

#### AI Insight Card
```tsx
// src/components/ai/AIInsightCard.tsx
'use client';

import { motion } from 'framer-motion';
import { Bot, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface AIInsight {
  id: string;
  type: 'trend' | 'anomaly' | 'recommendation' | 'alert' | 'success';
  title: string;
  description: string;
  confidence: number;
  priority: 'high' | 'medium' | 'low';
  aiAgent: string;
  actionable: boolean;
  timestamp: string;
}

interface AIInsightCardProps {
  insight: AIInsight;
  onAction?: (insight: AIInsight) => void;
  className?: string;
}

export default function AIInsightCard({ insight, onAction, className }: AIInsightCardProps) {
  const getIcon = () => {
    switch (insight.type) {
      case 'trend': return <TrendingUp className="w-5 h-5" />;
      case 'anomaly': return <AlertTriangle className="w-5 h-5" />;
      case 'success': return <CheckCircle className="w-5 h-5" />;
      case 'alert': return <AlertTriangle className="w-5 h-5" />;
      default: return <Bot className="w-5 h-5" />;
    }
  };

  const getColorClasses = () => {
    switch (insight.type) {
      case 'trend':
        return 'border-pu-info/30 bg-pu-info/5 text-pu-info';
      case 'anomaly':
        return 'border-pu-warning/30 bg-pu-warning/5 text-pu-warning';
      case 'alert':
        return 'border-pu-danger/30 bg-pu-danger/5 text-pu-danger';
      case 'success':
        return 'border-pu-success/30 bg-pu-success/5 text-pu-success';
      default:
        return 'border-pu-blue/30 bg-pu-blue/5 text-pu-blue';
    }
  };

  const getPriorityBadge = () => {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
    switch (insight.priority) {
      case 'high':
        return `${baseClasses} bg-pu-danger/10 text-pu-danger border border-pu-danger/20`;
      case 'medium':
        return `${baseClasses} bg-pu-warning/10 text-pu-warning border border-pu-warning/20`;
      case 'low':
        return `${baseClasses} bg-pu-success/10 text-pu-success border border-pu-success/20`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`border rounded-xl p-4 ${getColorClasses()} ${className}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${getColorClasses()} bg-opacity-20`}>
            {getIcon()}
          </div>
          <div>
            <h3 className="font-semibold text-pu-gray-900 text-sm">{insight.title}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs text-pu-gray-500">by {insight.aiAgent}</span>
              <span className={getPriorityBadge()}>{insight.priority}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-pu-gray-500">{insight.timestamp}</div>
          <div className="text-xs text-pu-gray-600 mt-1">
            Confidence: {insight.confidence}%
          </div>
        </div>
      </div>

      {/* Content */}
      <p className="text-sm text-pu-gray-700 mb-3 leading-relaxed">
        {insight.description}
      </p>

      {/* Confidence Bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-xs text-pu-gray-500 mb-1">
          <span>AI Confidence</span>
          <span>{insight.confidence}%</span>
        </div>
        <div className="w-full bg-pu-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${insight.confidence}%` }}
            transition={{ duration: 1, delay: 0.3 }}
            className={`h-2 rounded-full ${
              insight.confidence >= 80 ? 'bg-pu-success' :
              insight.confidence >= 60 ? 'bg-pu-warning' : 'bg-pu-danger'
            }`}
          />
        </div>
      </div>

      {/* Action Button */}
      {insight.actionable && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onAction?.(insight)}
          className="w-full bg-pu-yellow text-pu-blue px-4 py-2 rounded-lg font-medium text-sm
                     hover:bg-pu-yellow-dark transition-colors duration-200"
        >
          Take Action
        </motion.button>
      )}
    </motion.div>
  );
}
```

---

## 5. Page Specifications

### 5.1 Dashboard Page
```tsx
// src/app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  TrendingUp, 
  DollarSign, 
  AlertTriangle,
  Users,
  Calendar,
  BarChart3
} from 'lucide-react';

import ExecutiveSummaryCard from '@/components/dashboard/ExecutiveSummaryCard';
import IndonesiaMap from '@/components/maps/IndonesiaMap';
import SCurveChart from '@/components/charts/SCurveChart';
import AIInsightCard from '@/components/ai/AIInsightCard';
import { useDashboard } from '@/hooks/useDashboard';
import { useAI } from '@/hooks/useAI';

export default function DashboardPage() {
  const { 
    summaryData, 
    projectsData, 
    progressData, 
    loading 
  } = useDashboard();
  
  const { 
    insights, 
    generateInsights, 
    loading: aiLoading 
  } = useAI();

  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');

  useEffect(() => {
    generateInsights('dashboard', selectedTimeRange);
  }, [selectedTimeRange, generateInsights]);

  return (
    <div className="space-y-8 p-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-hero text-pu-blue">Dashboard SIMONIC</h1>
          <p className="text-subtitle text-pu-gray-600 mt-2">
            Monitoring & Evaluasi Proyek Irigasi Nasional
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-4 py-2 border border-pu-gray-300 rounded-xl focus:ring-2 focus:ring-pu-yellow"
          >
            <option value="7d">7 Hari</option>
            <option value="30d">30 Hari</option>
            <option value="90d">90 Hari</option>
            <option value="1y">1 Tahun</option>
          </select>
        </div>
      </motion.div>

      {/* Executive Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <ExecutiveSummaryCard
          title="Total Proyek"
          value={summaryData?.totalProjects || 0}
          trend={{
            value: 12,
            direction: 'up',
            label: 'Dari bulan lalu'
          }}
          icon={<MapPin className="w-6 h-6" />}
          color="blue"
          loading={loading}
        />
        
        <ExecutiveSummaryCard
          title="Progress Rata-rata"
          value={`${summaryData?.averageProgress || 0}%`}
          trend={{
            value: 2.3,
            direction: 'up',
            label: 'Peningkatan mingguan'
          }}
          icon={<TrendingUp className="w-6 h-6" />}
          color="green"
          loading={loading}
        />
        
        <ExecutiveSummaryCard
          title="Anggaran Terserap"
          value={`Rp ${((summaryData?.budgetAbsorption || 0) / 1000000000).toFixed(1)}T`}
          trend={{
            value: 85.4,
            direction: 'up',
            label: 'Dari target tahunan'
          }}
          icon={<DollarSign className="w-6 h-6" />}
          color="yellow"
          loading={loading}
        />
        
        <ExecutiveSummaryCard
          title="Risiko Tinggi"
          value={summaryData?.highRiskProjects || 0}
          trend={{
            value: 5,
            direction: 'down',
            label: 'Penurunan minggu ini'
          }}
          icon={<AlertTriangle className="w-6 h-6" />}
          color="red"
          loading={loading}
        />
      </motion.div>

      {/* Interactive Map & S-Curve */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Interactive Map */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="card-dashboard">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-title text-pu-blue">Peta Proyek Nasional</h2>
              <div className="flex space-x-2">
                <button className="btn-outline text-sm px-3 py-1">
                  Progress
                </button>
                <button className="btn-outline text-sm px-3 py-1">
                  Status
                </button>
                <button className="btn-outline text-sm px-3 py-1">
                  Budget
                </button>
              </div>
            </div>
            <IndonesiaMap
              projects={projectsData}
              filterBy="progress"
              heatmapEnabled={true}
            />
          </div>
        </motion.div>

        {/* AI Insights Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-6"
        >
          <div className="card-dashboard">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-pu-blue">AI Insights</h3>
              <span className="text-xs text-pu-gray-500">Real-time</span>
            </div>
            
            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              {aiLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pu-yellow"></div>
                </div>
              ) : (
                insights.map((insight) => (
                  <AIInsightCard
                    key={insight.id}
                    insight={insight}
                    onAction={(insight) => console.log('Action:', insight)}
                  />
                ))
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* S-Curve Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <SCurveChart
          data={progressData}
          projectName="Portfolio Nasional"
          className="w-full"
        />
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="card-dashboard text-center">
          <Users className="w-12 h-12 text-pu-yellow mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-pu-blue mb-2">Koordinasi Tim</h3>
          <p className="text-sm text-pu-gray-600 mb-4">
            Kelola komunikasi dan tugas antar stakeholder
          </p>
          <button className="btn-primary w-full">
            Buka Komunikasi
          </button>
        </div>

        <div className="card-dashboard text-center">
          <BarChart3 className="w-12 h-12 text-pu-blue mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-pu-blue mb-2">Laporan</h3>
          <p className="text-sm text-pu-gray-600 mb-4">
            Generate laporan otomatis dengan AI
          </p>
          <button className="btn-secondary w-full">
            Buat Laporan
          </button>
        </div>

        <div className="card-dashboard text-center">
          <Calendar className="w-12 h-12 text-pu-yellow mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-pu-blue mb-2">Jadwal Rapat</h3>
          <p className="text-sm text-pu-gray-600 mb-4">
            AI-powered meeting scheduling
          </p>
          <button className="btn-primary w-full">
            Jadwalkan Rapat
          </button>
        </div>
      </motion.div>
    </div>
  );
}
```

---

## 6. Simulated AI Agents

### 6.1 AI Simulation Engine
```typescript
// src/lib/ai-simulation.ts

export interface AIInsight {
  id: string;
  type: 'trend' | 'anomaly' | 'recommendation' | 'alert' | 'success';
  title: string;
  description: string;
  confidence: number;
  priority: 'high' | 'medium' | 'low';
  aiAgent: string;
  actionable: boolean;
  timestamp: string;
  data?: any;
}

export class AISimulation {
  private static generateRandomId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private static getRandomConfidence(): number {
    return Math.floor(Math.random() * 30) + 70; // 70-100%
  }

  static generateDashboardInsights(timeRange: string): AIInsight[] {
    const insights: AIInsight[] = [];
    const now = new Date();

    // DASH-AI insights
    insights.push({
      id: this.generateRandomId(),
      type: 'trend',
      title: 'Akselerasi Progress Detected',
      description: 'Rata-rata progress proyek meningkat 15% dalam 2 minggu terakhir. Tren positif ini kemungkinan karena cuaca yang mendukung dan peningkatan alokasi SDM.',
      confidence: this.getRandomConfidence(),
      priority: 'medium',
      aiAgent: 'DASH-AI',
      actionable: false,
      timestamp: '2 menit yang lalu'
    });

    insights.push({
      id: this.generateRandomId(),
      type: 'anomaly',
      title: 'Anomali Budget Absorption',
      description: 'Proyek di Jawa Barat menunjukkan penyerapan anggaran 23% di atas rata-rata. Memerlukan investigasi lebih lanjut untuk memastikan efisiensi pengeluaran.',
      confidence: this.getRandomConfidence(),
      priority: 'high',
      aiAgent: 'DASH-AI',
      actionable: true,
      timestamp: '5 menit yang lalu'
    });

    insights.push({
      id: this.generateRandomId(),
      type: 'alert',
      title: 'Weather Warning Alert',
      description: 'Prediksi curah hujan tinggi di Sumatera Utara dalam 5 hari ke depan. 12 proyek berpotensi mengalami keterlambatan jika tidak ada mitigasi.',
      confidence: this.getRandomConfidence(),
      priority: 'high',
      aiAgent: 'DASH-AI',
      actionable: true,
      timestamp: '8 menit yang lalu'
    });

    return insights;
  }

  static generateProgressInsights(projectId: string): AIInsight[] {
    const insights: AIInsight[] = [];

    // PROGRESS-AI insights
    insights.push({
      id: this.generateRandomId(),
      type: 'recommendation',
      title: 'Resource Reallocation Suggested',
      description: 'Berdasarkan analisis kemajuan, disarankan untuk mengalokasikan 2 unit excavator tambahan dari proyek lain yang sedang idle untuk mempercepat progres.',
      confidence: this.getRandomConfidence(),
      priority: 'medium',
      aiAgent: 'PROGRESS-AI',
      actionable: true,
      timestamp: '1 jam yang lalu'
    });

    insights.push({
      id: this.generateRandomId(),
      type: 'alert',
      title: 'Critical Path Delay Risk',
      description: 'Aktivitas penggalian saluran primer berisiko delay 5 hari. Hal ini akan berdampak pada keseluruhan timeline proyek jika tidak segera ditangani.',
      confidence: this.getRandomConfidence(),
      priority: 'high',
      aiAgent: 'PROGRESS-AI',
      actionable: true,
      timestamp: '2 jam yang lalu'
    });

    return insights;
  }

  static generateFinancialInsights(projectId: string): AIInsight[] {
    const insights: AIInsight[] = [];

    // FINANCE-AI insights
    insights.push({
      id: this.generateRandomId(),
      type: 'alert',
      title: 'Budget Overrun Prediction',
      description: 'Model AI memprediksi kemungkinan 78% proyek akan mengalami overbudget sebesar 12-15% jika tren pengeluaran saat ini berlanjut.',
      confidence: this.getRandomConfidence(),
      priority: 'high',
      aiAgent: 'FINANCE-AI',
      actionable: true,
      timestamp: '30 menit yang lalu'
    });

    insights.push({
      id: this.generateRandomId(),
      type: 'recommendation',
      title: 'Cash Flow Optimization',
      description: 'Disarankan untuk menunda pembayaran vendor non-kritis selama 2 minggu untuk menjaga cash flow yang optimal.',
      confidence: this.getRandomConfidence(),
      priority: 'medium',
      aiAgent: 'FINANCE-AI',
      actionable: true,
      timestamp: '45 menit yang lalu'
    });

    return insights;
  }

  static generateRiskInsights(projectId: string): AIInsight[] {
    const insights: AIInsight[] = [];

    // RISK-AI insights
    insights.push({
      id: this.generateRandomId(),
      type: 'alert',
      title: 'Emerging Environmental Risk',
      description: 'Terdeteksi peningkatan keluhan masyarakat terkait kualitas air. Risiko social license to operate perlu dimitigasi segera.',
      confidence: this.getRandomConfidence(),
      priority: 'high',
      aiAgent: 'RISK-AI',
      actionable: true,
      timestamp: '15 menit yang lalu'
    });

    insights.push({
      id: this.generateRandomId(),
      type: 'recommendation',
      title: 'Vendor Risk Mitigation',
      description: 'Berdasarkan analisis historis, disarankan untuk memiliki backup vendor untuk material agregat mengingat track record keterlambatan supplier saat ini.',
      confidence: this.getRandomConfidence(),
      priority: 'medium',
      aiAgent: 'RISK-AI',
      actionable: true,
      timestamp: '1 jam yang lalu'
    });

    return insights;
  }

  static predictCompletionDate(currentProgress: number, targetDate: string): {
    optimistic: string;
    realistic: string;
    pessimistic: string;
    confidence: number;
  } {
    const target = new Date(targetDate);
    const now = new Date();
    const remainingDays = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    // Simple simulation based on current progress
    const progressRate = currentProgress / 100;
    const remainingProgress = 1 - progressRate;
    
    // Calculate different scenarios
    const optimisticDays = Math.ceil(remainingDays * remainingProgress * 0.8);
    const realisticDays = Math.ceil(remainingDays * remainingProgress * 1.1);
    const pessimisticDays = Math.ceil(remainingDays * remainingProgress * 1.4);

    const optimisticDate = new Date(now.getTime() + optimisticDays * 24 * 60 * 60 * 1000);
    const realisticDate = new Date(now.getTime() + realisticDays * 24 * 60 * 60 * 1000);
    const pessimisticDate = new Date(now.getTime() + pessimisticDays * 24 * 60 * 60 * 1000);

    return {
      optimistic: optimisticDate.toISOString().split('T')[0],
      realistic: realisticDate.toISOString().split('T')[0],
      pessimistic: pessimisticDate.toISOString().split('T')[0],
      confidence: this.getRandomConfidence()
    };
  }

  static generateAutomaticReport(projectData: any): {
    executiveSummary: string;
    progressAnalysis: string;
    riskAssessment: string;
    recommendations: string[];
  } {
    const progressRate = projectData.progress || 0;
    const budgetUtilization = projectData.budgetUtilization || 0;
    
    return {
      executiveSummary: `Proyek ${projectData.name} menunjukkan progress sebesar ${progressRate}% dengan tingkat penyerapan anggaran ${budgetUtilization}%. 
      ${progressRate > 80 ? 'Proyek dalam kondisi baik dan on-track untuk penyelesaian tepat waktu.' : 
        progressRate > 50 ? 'Proyek memerlukan perhatian lebih untuk memastikan ketepatan waktu.' :
        'Proyek berisiko mengalami keterlambatan signifikan.'}`,
        
      progressAnalysis: `Berdasarkan analisis kurva-S, proyek menunjukkan ${progressRate > 60 ? 'tren positif' : 'tren yang memerlukan perhatian'} 
      dengan velocity rate ${(progressRate * 1.2).toFixed(1)}% per bulan. Critical path analysis menunjukkan 
      ${Math.floor(Math.random() * 3) + 1} aktivitas yang memerlukan monitoring ketat.`,
      
      riskAssessment: `Dari total ${Math.floor(Math.random() * 15) + 5} risiko yang teridentifikasi, 
      ${Math.floor(Math.random() * 3) + 1} berada pada kategori tinggi dan memerlukan mitigasi segera. 
      Risiko utama meliputi faktor cuaca, ketersediaan material, dan koordinasi stakeholder.`,
      
      recommendations: [
        'Intensifkan koordinasi dengan stakeholder terkait untuk mengatasi bottleneck yang teridentifikasi',
        'Implementasikan contingency plan untuk mengantisipasi risiko cuaca pada periode mendatang',
        'Optimalkan alokasi sumber daya dengan memfokuskan pada critical path activities',
        'Tingkatkan frekuensi monitoring dan reporting untuk early detection masalah potensial'
      ]
    };
  }
}
```

### 6.2 AI Hook Implementation
```typescript
// src/hooks/useAI.ts
'use client';

import { useState, useCallback } from 'react';
import { AISimulation, AIInsight } from '@/lib/ai-simulation';

export function useAI() {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(false);

  const generateInsights = useCallback(async (
    context: 'dashboard' | 'progress' | 'finance' | 'risk' | 'communication' | 'evaluation',
    timeRange?: string,
    projectId?: string
  ) => {
    setLoading(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    let newInsights: AIInsight[] = [];
    
    switch (context) {
      case 'dashboard':
        newInsights = AISimulation.generateDashboardInsights(timeRange || '30d');
        break;
      case 'progress':
        newInsights = AISimulation.generateProgressInsights(projectId || '');
        break;
      case 'finance':
        newInsights = AISimulation.generateFinancialInsights(projectId || '');
        break;
      case 'risk':
        newInsights = AISimulation.generateRiskInsights(projectId || '');
        break;
      default:
        newInsights = AISimulation.generateDashboardInsights('30d');
    }
    
    setInsights(newInsights);
    setLoading(false);
  }, []);

  const predictCompletion = useCallback((currentProgress: number, targetDate: string) => {
    return AISimulation.predictCompletionDate(currentProgress, targetDate);
  }, []);

  const generateReport = useCallback((projectData: any) => {
    return AISimulation.generateAutomaticReport(projectData);
  }, []);

  return {
    insights,
    loading,
    generateInsights,
    predictCompletion,
    generateReport
  };
}
```

---

## 7. Demo Data & Scenarios

### 7.1 Sample Data Structure
```json
// src/data/projects.json
{
  "projects": [
    {
      "id": "proj-001",
      "sipuriId": "SIPURI-2025-001",
      "name": "Pembangunan Irigasi Daerah Subang",
      "type": "PEMBANGUNAN",
      "status": "ONGOING",
      "priority": "HIGH",
      "location": {
        "province": "Jawa Barat",
        "city": "Subang",
        "district": "Pagaden",
        "latitude": -6.4925,
        "longitude": 107.7538
      },
      "timeline": {
        "plannedStart": "2025-01-15",
        "plannedEnd": "2025-12-30",
        "actualStart": "2025-01-15",
        "actualEnd": null
      },
      "budget": {
        "total": 15000000000,
        "spent": 8500000000,
        "committed": 2000000000,
        "remaining": 4500000000
      },
      "progress": {
        "physical": 65.5,
        "financial": 56.7,
        "quality": 88.2
      },
      "technical": {
        "irrigationArea": 2500,
        "canalLength": 15.5,
        "beneficiaryFarmers": 1250
      },
      "stakeholders": {
        "contractor": "PT. Irigasi Nusantara",
        "projectManager": "Ir. Budi Santoso",
        "bwsCoordinator": "Ir. Siti Rahman",
        "pemdaLiaison": "Drs. Ahmad Wijaya"
      },
      "milestones": [
        {
          "id": "ms-001",
          "name": "Penyelesaian Survey Topografi",
          "plannedDate": "2025-02-28",
          "actualDate": "2025-02-25",
          "status": "COMPLETED",
          "weight": 10
        },
        {
          "id": "ms-002", 
          "name": "Pembebasan Lahan",
          "plannedDate": "2025-04-30",
          "actualDate": "2025-05-15",
          "status": "COMPLETED",
          "weight": 15
        },
        {
          "id": "ms-003",
          "name": "Penggalian Saluran Primer",
          "plannedDate": "2025-08-31",
          "actualDate": null,
          "status": "IN_PROGRESS",
          "weight": 35
        },
        {
          "id": "ms-004",
          "name": "Konstruksi Bangunan Utama",
          "plannedDate": "2025-11-30",
          "actualDate": null,
          "status": "PENDING",
          "weight": 40
        }
      ],
      "risks": [
        {
          "id": "risk-001",
          "title": "Keterlamb
atan Material",
          "category": "TECHNICAL",
          "probability": 3,
          "impact": 4,
          "riskScore": 12,
          "status": "MITIGATED",
          "description": "Risiko keterlambatan pengiriman material agregat dari supplier",
          "mitigation": "Menggunakan supplier alternatif sebagai backup"
        },
        {
          "id": "risk-002",
          "title": "Cuaca Ekstrem",
          "category": "ENVIRONMENTAL",
          "probability": 4,
          "impact": 3,
          "riskScore": 12,
          "status": "MONITORED",
          "description": "Risiko gangguan cuaca ekstrem selama musim hujan",
          "mitigation": "Penyesuaian jadwal kerja dan persiapan covering area"
        }
      ]
    },
    {
      "id": "proj-002",
      "sipuriId": "SIPURI-2025-002",
      "name": "Rehabilitasi Bendung Citarum",
      "type": "REHABILITASI",
      "status": "ONGOING",
      "priority": "HIGH",
      "location": {
        "province": "Jawa Barat",
        "city": "Bandung",
        "district": "Dayeuhkolot",
        "latitude": -6.9806,
        "longitude": 107.6320
      },
      "timeline": {
        "plannedStart": "2024-11-01",
        "plannedEnd": "2025-10-31",
        "actualStart": "2024-11-01",
        "actualEnd": null
      },
      "budget": {
        "total": 25000000000,
        "spent": 12300000000,
        "committed": 3200000000,
        "remaining": 9500000000
      },
      "progress": {
        "physical": 48.2,
        "financial": 49.2,
        "quality": 92.1
      },
      "technical": {
        "irrigationArea": 4200,
        "canalLength": 8.2,
        "beneficiaryFarmers": 2800
      },
      "stakeholders": {
        "contractor": "PT. Konstruksi Prima",
        "projectManager": "Ir. Siti Rahma",
        "bwsCoordinator": "Ir. Bambang Susilo",
        "pemdaLiaison": "Ir. Rina Sari"
      }
    },
    {
      "id": "proj-003",
      "sipuriId": "SIPURI-2025-003",
      "name": "Peningkatan Jaringan Irigasi Demak",
      "type": "PENINGKATAN",
      "status": "PLANNING",
      "priority": "MEDIUM",
      "location": {
        "province": "Jawa Tengah",
        "city": "Demak",
        "district": "Demak",
        "latitude": -6.8914,
        "longitude": 110.6396
      },
      "timeline": {
        "plannedStart": "2025-03-01",
        "plannedEnd": "2025-11-30",
        "actualStart": null,
        "actualEnd": null
      },
      "budget": {
        "total": 8500000000,
        "spent": 0,
        "committed": 0,
        "remaining": 8500000000
      },
      "progress": {
        "physical": 0,
        "financial": 0,
        "quality": 0
      },
      "technical": {
        "irrigationArea": 1800,
        "canalLength": 12.5,
        "beneficiaryFarmers": 950
      }
    }
  ],
  "kpis": [
    {
      "code": "SPI",
      "name": "Schedule Performance Index",
      "category": "TIME",
      "target": 1.0,
      "current": 0.95,
      "trend": "down"
    },
    {
      "code": "CPI",
      "name": "Cost Performance Index", 
      "category": "COST",
      "target": 1.0,
      "current": 1.08,
      "trend": "up"
    },
    {
      "code": "QPI",
      "name": "Quality Performance Index",
      "category": "QUALITY",
      "target": 0.9,
      "current": 0.89,
      "trend": "stable"
    }
  ],
  "users": [
    {
      "id": "user-001",
      "username": "admin.pupr",
      "email": "admin@pu.go.id",
      "fullName": "Dr. Ir. Basuki Hadimuljono",
      "role": "PUPR_ADMIN",
      "organization": "Kementerian PUPR",
      "permissions": ["full_access"],
      "avatar": "/avatars/admin.jpg"
    },
    {
      "id": "user-002",
      "username": "bws.citarum",
      "email": "bws.citarum@pu.go.id",
      "fullName": "Ir. Agus Maryoto",
      "role": "BWS_COORDINATOR",
      "organization": "BWS Citarum",
      "permissions": ["read", "write", "verify"],
      "avatar": "/avatars/bws.jpg"
    },
    {
      "id": "user-003",
      "username": "pemda.jabar",
      "email": "irigasi@jabarprov.go.id",
      "fullName": "Ir. Siti Nurbaya",
      "role": "PEMDA_OPERATOR",
      "organization": "Pemerintah Provinsi Jawa Barat",
      "permissions": ["read", "write"],
      "avatar": "/avatars/pemda.jpg"
    }
  ]
}
```

### 7.2 Mock API Implementation
```typescript
// src/lib/api.ts
import { projects, kpis, users } from '@/data/projects.json';

export class MockAPI {
  static async getDashboardSummary(timeRange: string = '30d') {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const totalProjects = projects.length;
    const ongoingProjects = projects.filter(p => p.status === 'ONGOING').length;
    const completedProjects = projects.filter(p => p.status === 'COMPLETED').length;
    const averageProgress = projects.reduce((sum, p) => sum + p.progress.physical, 0) / totalProjects;
    const totalBudget = projects.reduce((sum, p) => sum + p.budget.total, 0);
    const budgetSpent = projects.reduce((sum, p) => sum + p.budget.spent, 0);
    const highRiskProjects = projects.filter(p => 
      p.risks && p.risks.some(r => r.riskScore >= 12)
    ).length;

    return {
      totalProjects,
      ongoingProjects,
      completedProjects,
      averageProgress: Math.round(averageProgress * 10) / 10,
      totalBudget,
      budgetSpent,
      budgetAbsorption: budgetSpent,
      highRiskProjects,
      lastUpdated: new Date().toISOString()
    };
  }

  static async getProjects(filters?: any) {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    let filteredProjects = [...projects];
    
    if (filters?.status) {
      filteredProjects = filteredProjects.filter(p => p.status === filters.status);
    }
    
    if (filters?.province) {
      filteredProjects = filteredProjects.filter(p => p.location.province === filters.province);
    }
    
    return {
      projects: filteredProjects,
      total: filteredProjects.length,
      page: filters?.page || 1,
      limit: filters?.limit || 20
    };
  }

  static async getProject(id: string) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const project = projects.find(p => p.id === id);
    if (!project) {
      throw new Error('Project not found');
    }
    
    return project;
  }

  static async getProgressData(projectId?: string) {
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Generate sample S-curve data
    const labels = [];
    const baseline = [];
    const actual = [];
    const forecast = [];
    
    for (let i = 0; i <= 12; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - 6 + i);
      labels.push(date.toLocaleDateString('id-ID', { month: 'short', year: '2-digit' }));
      
      // S-curve simulation
      const progress = Math.min(100, (i / 12) * 100);
      const sCurve = 100 * (1 / (1 + Math.exp(-0.8 * (i - 6))));
      
      baseline.push(Math.round(sCurve * 10) / 10);
      
      if (i <= 6) {
        // Actual data (slightly behind baseline)
        actual.push(Math.round((sCurve * 0.9) * 10) / 10);
      } else {
        actual.push(null);
      }
      
      if (i >= 6) {
        // Forecast (optimistic recovery)
        forecast.push(Math.round((sCurve * 0.95) * 10) / 10);
      } else {
        forecast.push(null);
      }
    }
    
    return {
      labels,
      baseline,
      actual: actual.filter(v => v !== null),
      forecast: forecast.filter(v => v !== null)
    };
  }

  static async generateReport(projectId: string, type: string) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const project = projects.find(p => p.id === projectId);
    if (!project) {
      throw new Error('Project not found');
    }
    
    return {
      id: `report-${Date.now()}`,
      type,
      projectId,
      projectName: project.name,
      generatedAt: new Date().toISOString(),
      aiAgent: 'REPORT-AI',
      content: {
        executiveSummary: `Laporan ${type} untuk proyek ${project.name} per ${new Date().toLocaleDateString('id-ID')}. 
        Proyek menunjukkan progress fisik ${project.progress.physical}% dengan tingkat penyerapan anggaran ${project.progress.financial}%.`,
        
        progressDetail: `Progress fisik saat ini mencapai ${project.progress.physical}% dari target. 
        Milestone yang telah diselesaikan: ${project.milestones?.filter(m => m.status === 'COMPLETED').length || 0} dari ${project.milestones?.length || 0} milestone.`,
        
        financialSummary: `Total anggaran Rp ${(project.budget.total / 1000000000).toFixed(1)} miliar dengan realisasi Rp ${(project.budget.spent / 1000000000).toFixed(1)} miliar (${project.progress.financial}%).`,
        
        recommendations: [
          'Tingkatkan koordinasi dengan kontraktor untuk akselerasi progress',
          'Monitor ketat penggunaan anggaran untuk mencegah overrun',
          'Antisipasi risiko cuaca pada periode mendatang'
        ]
      },
      downloadUrl: `/api/reports/download/${Date.now()}.pdf`
    };
  }
}
```

---

## 8. Demo Scenarios & User Journeys

### 8.1 Executive Demo Scenario (15 minutes)

#### Scenario 1: PUPR Minister Dashboard Review
**Persona**: Dr. Ir. Basuki Hadimuljono (Menteri PUPR)
**Goal**: Quick overview of national irrigation projects status

**Journey:**
1. **Login** as PUPR Admin
2. **Dashboard Overview** (2 min)
   - Review executive summary cards
   - Observe real-time KPI metrics
   - Check AI alerts and insights
3. **National Map Interaction** (3 min)
   - Explore project distribution across Indonesia
   - Filter by progress, budget, and status
   - Drill down to provincial level
4. **AI Insights Review** (2 min)
   - Read DASH-AI generated insights
   - Review anomaly detections
   - Check weather warnings and predictions
5. **Critical Project Deep Dive** (5 min)
   - Select high-priority project from map
   - Review S-curve progress analysis
   - Check milestone status and risks
6. **Quick Report Generation** (2 min)
   - Generate executive summary report
   - Preview AI-written content
   - Export to PDF for distribution
7. **Communication Check** (1 min)
   - Review stakeholder communications
   - Check meeting schedules

**Key Demo Points:**
- Real-time data visualization
- AI-powered insights and predictions
- Multi-level geographic drill-down
- Automated report generation
- Executive decision support

#### Scenario 2: BWS Coordinator Field Operations
**Persona**: Ir. Agus Maryoto (BWS Citarum Coordinator)
**Goal**: Monitor and update field progress

**Journey:**
1. **Login** as BWS Coordinator
2. **Regional Dashboard** (2 min)
   - View BWS Citarum project portfolio
   - Check progress against targets
3. **Progress Update Entry** (3 min)
   - Select active project
   - Upload progress photos with GPS
   - Update milestone completion
   - Enter quality control data
4. **AI Progress Analysis** (2 min)
   - Review PROGRESS-AI recommendations
   - Check resource optimization suggestions
   - Validate anomaly detections
5. **Risk Management** (3 min)
   - Review active risks
   - Update mitigation status
   - Add new environmental concerns
6. **Stakeholder Communication** (3 min)
   - Send progress update to team
   - Schedule coordination meeting
   - Share technical documents
7. **Mobile Responsiveness** (2 min)
   - Demonstrate mobile access
   - Field data entry simulation

**Key Demo Points:**
- Field-friendly mobile interface
- GPS-enabled photo documentation
- AI-assisted progress analysis
- Real-time stakeholder coordination
- Offline capability demonstration

### 8.2 Stakeholder Demo Scenarios

#### Scenario 3: Pemda Regional Monitoring
**Persona**: Ir. Siti Nurbaya (Pemda Jawa Barat)
**Goal**: Regional oversight and coordination

**Journey:**
1. **Provincial Dashboard** (2 min)
   - View Jawa Barat projects overview
   - Check regional KPIs
2. **Budget Monitoring** (3 min)
   - Review regional budget allocation
   - Check absorption rates
   - Analyze spending patterns
3. **Farmer Impact Assessment** (2 min)
   - View beneficiary farmer statistics
   - Check irrigation area coverage
   - Review agricultural productivity data
4. **Coordination Tasks** (3 min)
   - Review pending approvals
   - Check land acquisition status
   - Coordinate with local communities

#### Scenario 4: Contractor Project Execution
**Persona**: Project Manager from PT. Irigasi Nusantara
**Goal**: Project execution and reporting

**Journey:**
1. **Project Dashboard** (2 min)
   - View assigned projects
   - Check current milestones
2. **Progress Reporting** (4 min)
   - Submit weekly progress report
   - Upload construction photos
   - Update resource utilization
3. **Issue Management** (2 min)
   - Report technical challenges
   - Request support from BWS
   - Update risk status

### 8.3 AI Simulation Demonstrations

#### AI Agent Showcase Scenarios

**DASH-AI Intelligence:**
- Automatic anomaly detection in progress patterns
- Weather impact predictions and alerts
- Cross-project performance benchmarking
- Resource optimization recommendations

**PROGRESS-AI Capabilities:**
- S-curve completion predictions
- Critical path delay warnings
- Resource reallocation suggestions
- Quality vs. speed trade-off analysis

**FINANCE-AI Features:**
- Budget overrun predictions
- Cash flow optimization
- Cost efficiency analysis
- Payment schedule recommendations

**RISK-AI Functions:**
- Environmental risk emergence detection
- Social risk pattern recognition
- Technical risk probability scoring
- Mitigation effectiveness tracking

**COORD-AI Services:**
- Meeting time optimization
- Document routing automation
- Communication bottleneck identification
- Task assignment recommendations

**REPORT-AI Automation:**
- Natural language report generation
- Multi-format export capabilities
- Template customization
- Narrative quality assessment

---

## 9. Deployment Specification for Demo

### 9.1 Vercel Deployment Configuration

#### Environment Variables
```env
# .env.local
NEXT_PUBLIC_APP_NAME="SIMONIC Demo"
NEXT_PUBLIC_APP_VERSION="1.0.0"
NEXT_PUBLIC_API_URL="/api"
NEXT_PUBLIC_DEMO_MODE="true"

# AI Simulation Settings
NEXT_PUBLIC_AI_DELAY_MIN=1000
NEXT_PUBLIC_AI_DELAY_MAX=3000
NEXT_PUBLIC_AI_CONFIDENCE_MIN=70
NEXT_PUBLIC_AI_CONFIDENCE_MAX=95

# Demo Data Settings
NEXT_PUBLIC_DEMO_PROJECTS_COUNT=25
NEXT_PUBLIC_DEMO_USERS_COUNT=12
NEXT_PUBLIC_REFRESH_INTERVAL=30000

# Feature Flags
NEXT_PUBLIC_ENABLE_OFFLINE_MODE=true
NEXT_PUBLIC_ENABLE_EXPORT_FEATURES=true
NEXT_PUBLIC_ENABLE_AI_SIMULATION=true
```

#### Vercel Configuration
```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "regions": ["sin1"],
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, s-maxage=60, stale-while-revalidate=300"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/",
      "destination": "/dashboard",
      "permanent": false
    }
  ]
}
```

### 9.2 Performance Optimization

#### Next.js Configuration
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    optimizePackageImports: ['lucide-react', '@heroicons/react']
  },
  images: {
    domains: ['simonic-demo.vercel.app'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60
  },
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle size for demo
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }
    return config;
  },
  // Demo-specific optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  trailingSlash: false
};

module.exports = nextConfig;
```

### 9.3 Demo-Specific Features

#### Offline Support
```typescript
// src/lib/offline-support.ts
import { useEffect, useState } from 'react';

export function useOfflineSupport() {
  const [isOnline, setIsOnline] = useState(true);
  const [demoData, setDemoData] = useState(null);

  useEffect(() => {
    // Check online status
    setIsOnline(navigator.onLine);
    
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Cache demo data for offline use
    if (isOnline) {
      cacheEssentialData();
    }
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const cacheEssentialData = async () => {
    try {
      const data = await fetch('/api/demo/essential-data').then(res => res.json());
      localStorage.setItem('simonic-demo-cache', JSON.stringify(data));
      setDemoData(data);
    } catch (error) {
      console.warn('Failed to cache demo data:', error);
    }
  };

  return { isOnline, demoData };
}
```

#### Demo Mode Indicator
```tsx
// src/components/layout/DemoModeIndicator.tsx
'use client';

import { motion } from 'framer-motion';
import { Monitor, Wifi, WifiOff } from 'lucide-react';
import { useOfflineSupport } from '@/lib/offline-support';

export default function DemoModeIndicator() {
  const { isOnline } = useOfflineSupport();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 right-4 z-50"
    >
      <div className="bg-pu-yellow text-pu-blue px-4 py-2 rounded-xl shadow-pu font-medium text-sm flex items-center space-x-2">
        <Monitor className="w-4 h-4" />
        <span>DEMO MODE</span>
        {isOnline ? (
          <Wifi className="w-4 h-4 text-pu-success" />
        ) : (
          <WifiOff className="w-4 h-4 text-pu-danger" />
        )}
      </div>
    </motion.div>
  );
}
```

### 9.4 Build and Deployment Scripts

#### Package.json Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "build:demo": "NODE_ENV=production NEXT_PUBLIC_DEMO_MODE=true next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "export": "next export",
    "demo:deploy": "npm run build:demo && vercel deploy --prod",
    "demo:preview": "vercel deploy",
    "analyze": "ANALYZE=true npm run build",
    "generate-demo-data": "node scripts/generate-demo-data.js"
  }
}
```

#### Demo Data Generation Script
```javascript
// scripts/generate-demo-data.js
const fs = require('fs');
const path = require('path');

function generateDemoData() {
  const projects = [];
  const indonesianProvinces = [
    'Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'Sumatera Utara', 
    'Sumatera Selatan', 'Kalimantan Timur', 'Sulawesi Selatan'
  ];
  
  for (let i = 1; i <= 25; i++) {
    const project = {
      id: `proj-${i.toString().padStart(3, '0')}`,
      sipuriId: `SIPURI-2025-${i.toString().padStart(3, '0')}`,
      name: `Proyek Irigasi Demo ${i}`,
      type: ['PEMBANGUNAN', 'REHABILITASI', 'PENINGKATAN'][Math.floor(Math.random() * 3)],
      status: ['PLANNING', 'ONGOING', 'COMPLETED'][Math.floor(Math.random() * 3)],
      location: {
        province: indonesianProvinces[Math.floor(Math.random() * indonesianProvinces.length)],
        latitude: -8 + Math.random() * 10,
        longitude: 95 + Math.random() * 45
      },
      budget: {
        total: Math.floor(Math.random() * 20000000000) + 5000000000,
        spent: 0,
        remaining: 0
      },
      progress: {
        physical: Math.floor(Math.random() * 100),
        financial: Math.floor(Math.random() * 100),
        quality: 80 + Math.floor(Math.random() * 20)
      }
    };
    
    project.budget.spent = Math.floor(project.budget.total * (project.progress.financial / 100));
    project.budget.remaining = project.budget.total - project.budget.spent;
    
    projects.push(project);
  }
  
  const demoData = {
    projects,
    generatedAt: new Date().toISOString(),
    version: '1.0.0'
  };
  
  fs.writeFileSync(
    path.join(__dirname, '../src/data/generated-demo.json'),
    JSON.stringify(demoData, null, 2)
  );
  
  console.log(`Generated ${projects.length} demo projects`);
}

generateDemoData();
```

---

## 10. Demo Presentation Guide

### 10.1 Demo Flow (30-minute presentation)

#### Opening (3 minutes)
1. **Welcome & Context**
   - Introduce SIMONIC as solution for Presidential Instruction No. 2/2025
   - Highlight focus on irrigation project monitoring & evaluation
   - Emphasize AI-powered automation and multi-stakeholder coordination

2. **Demo Environment**
   - Show demo mode indicator
   - Explain that this is a fully functional prototype
   - Mention responsive design for all devices

#### Core Demonstration (22 minutes)

**Phase 1: Executive Dashboard (8 minutes)**
- Login as PUPR Minister
- Executive summary cards with real-time metrics
- Interactive Indonesia map with project visualization
- AI insights panel with live recommendations
- Drill-down capabilities from national to project level

**Phase 2: AI Intelligence Showcase (8 minutes)**
- DASH-AI: Anomaly detection and trend analysis
- PROGRESS-AI: S-curve predictions and resource optimization
- FINANCE-AI: Budget overrun warnings and cash flow optimization
- RISK-AI: Emerging risk identification and early warnings
- REPORT-AI: Automated report generation with natural language

**Phase 3: Multi-Stakeholder Access (6 minutes)**
- BWS Coordinator: Field progress updates with photo geotagging
- Pemda Official: Regional monitoring and coordination
- Contractor: Project execution and reporting
- Role-based access control demonstration

#### Technology Highlights (3 minutes)
- Next.js performance and responsiveness
- Real-time data visualization
- Offline capability for field work
- Export capabilities (PDF, Excel)
- Mobile-first design approach

#### Closing (2 minutes)
- Implementation roadmap
- Scaling potential across Indonesia
- Questions and discussion

### 10.2 Key Selling Points

#### For Government Leadership:
- **Strategic Oversight**: Real-time national view of irrigation projects
- **AI-Powered Insights**: Automated analysis and recommendations
- **Risk Mitigation**: Early warning systems for project delays
- **Accountability**: Transparent progress tracking and reporting

#### For Technical Teams:
- **Modern Technology**: Next.js, TypeScript, modern UI/UX
- **Scalable Architecture**: Cloud-native, microservices-ready
- **AI Integration**: Simulated but realistic AI capabilities
- **Developer-Friendly**: Well-documented, maintainable codebase

#### For Field Operations:
- **Mobile-First**: Responsive design for field access
- **Offline Capability**: Works without internet connection
- **GPS Integration**: Location-based photo documentation
- **Real-Time Updates**: Immediate synchronization when online

---

## 11. Success Metrics & KPIs

### 11.1 Demo Success Indicators

**User Engagement:**
- Time spent in demo session
- Feature interaction rates
- Mobile vs. desktop usage patterns
- Export feature utilization

**Technical Performance:**
- Page load times under 3 seconds
- Mobile responsiveness scores
- Offline functionality reliability
- AI simulation response times

**Stakeholder Feedback:**
- Usability ratings by role
- Feature request priorities
- Implementation interest level
- Technology stack approval

### 11.2 Production Readiness Checklist

**Frontend Optimization:**
- [ ] Bundle size optimization (<1MB gzipped)
- [ ] Image optimization and lazy loading
- [ ] Service worker for offline support
- [ ] Progressive Web App capabilities

**Performance Monitoring:**
- [ ] Core Web Vitals tracking
- [ ] Error boundary implementation
- [ ] Analytics integration
- [ ] User behavior tracking

**Security & Compliance:**
- [ ] Authentication flow validation
- [ ] Role-based access testing
- [ ] Data privacy compliance
- [ ] Security headers configuration

---

## Conclusion

This Next.js-focused specification provides a comprehensive blueprint for implementing a stunning SIMONIC demo that prioritizes UI/UX excellence while showcasing realistic AI capabilities through client-side simulation. The demo will effectively demonstrate the potential of the SIMONIC platform to support Indonesia's irrigation development goals while providing stakeholders with an engaging, interactive experience.

**Key Deliverables:**
- ✅ Complete Next.js project structure
- ✅ Production-ready UI component library with PU branding
- ✅ Simulated AI agents with realistic intelligence
- ✅ Comprehensive demo scenarios for all stakeholder types
- ✅ Mobile-responsive design with offline capabilities
- ✅ Vercel deployment configuration
- ✅ Demo presentation guide and success metrics

**Next Steps:**
1. Stakeholder approval of UI/UX approach
2. Next.js development environment setup
3. Component library implementation
4. AI simulation engine development
5. Demo content creation and testing
6. Deployment and stakeholder training

The demo will serve as both a proof-of-concept and a powerful tool for securing buy-in from stakeholders across the irrigation project ecosystem, ultimately supporting the achievement of Indonesia's food self-sufficiency goals.