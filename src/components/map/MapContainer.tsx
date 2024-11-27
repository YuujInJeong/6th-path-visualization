'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'

interface MapContainerProps {
  markers: Array<{
    lat: number
    lng: number
    id: number
  }>
  pathNodes: number[]
  currentPathIndex: number
  onMarkerClick: (id: number) => void
}

export default function MapContainer({
  markers,
  pathNodes,
  currentPathIndex,
  onMarkerClick,
}: MapContainerProps) {
  const mapRef = useRef<L.Map | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return

    if (!mapRef.current) {
      mapRef.current = L.map(containerRef.current).setView([37.24781, 127.07594], 15)
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current)
    }

    const map = mapRef.current

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        map.removeLayer(layer)
      }
    })

    // Add markers and connect them
    markers.forEach((marker, index) => {
      if (index <= currentPathIndex) {
        L.marker([marker.lat, marker.lng])
          .addTo(map)
          .on('click', () => onMarkerClick(marker.id))
          .bindPopup(`Node: ${marker.id}`)

        if (index > 0) {
          const prevMarker = markers[index - 1]
          L.polyline(
            [
              [prevMarker.lat, prevMarker.lng],
              [marker.lat, marker.lng],
            ],
            { color: 'blue', weight: 3 }
          ).addTo(map)
        }
      }
    })

    // Fit bounds
    const bounds = L.latLngBounds(markers.map(m => [m.lat, m.lng]))
    map.fitBounds(bounds, { padding: [50, 50] })

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [markers, currentPathIndex])

  return <div ref={containerRef} className="w-full h-[600px]" />
}