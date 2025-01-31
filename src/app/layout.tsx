// src/app/layout.tsx
import type { Metadata } from 'next'
import 'leaflet/dist/leaflet.css'  // 반드시 필요
import './globals.css'  // 경로 수정

export const metadata: Metadata = {
  title: 'Path Visualization',
  description: 'Path visualization with OpenStreetMap',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body>{children}</body>
    </html>
  )
}