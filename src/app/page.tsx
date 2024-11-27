'use client'

import dynamic from 'next/dynamic'

const MapVisualization = dynamic(
  () => import('@/components/map/MapVisualization'),
  { ssr: false }
)

export default function Home() {
  return <MapVisualization />
}