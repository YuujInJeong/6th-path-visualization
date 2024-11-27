'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const MapContainer = dynamic(() => import('./MapContainer'), { ssr: false })

const MARKERS = [
  { lat: 37.25188, lng: 127.07023, id: 352 },
  { lat: 37.25238, lng: 127.06945, id: 354 },
  { lat: 37.25367, lng: 127.06729, id: 357 },
  { lat: 37.25146, lng: 127.07088, id: 414 },
  { lat: 37.25222, lng: 127.06585, id: 417 },
  { lat: 37.25071, lng: 127.06378, id: 420 },
  { lat: 37.25052, lng: 127.0636, id: 422 },
  { lat: 37.24844, lng: 127.06157, id: 424 },
  { lat: 37.24775, lng: 127.06364, id: 435 },
  { lat: 37.24652, lng: 127.06386, id: 438 },
  { lat: 37.24683, lng: 127.06638, id: 440 },
  { lat: 37.24767, lng: 127.06266, id: 443 },
  { lat: 37.24807, lng: 127.06762, id: 463 },
  { lat: 37.24824, lng: 127.06783, id: 464 }
]

const PATH_NODES = [414, 464, 463, 440, 439, 438, 435, 443, 424, 422, 420, 417, 357, 354, 352, 414]

export default function MapVisualization() {
  const [currentPathIndex, setCurrentPathIndex] = useState(-1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [startNode, setStartNode] = useState('414')
  const [time, setTime] = useState('19')
  const [distance, setDistance] = useState('2.8')

  const handleVisualize = () => {
    setCurrentPathIndex(0)
    const interval = setInterval(() => {
      setCurrentPathIndex(prev => {
        if (prev >= PATH_NODES.length - 1) {
          clearInterval(interval)
          setIsPlaying(false)
          return prev
        }
        return prev + 1
      })
    }, 500)
    setIsPlaying(true)
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">경로 시각화</h1>
        
        <div className="space-y-4">
          {/* 입력 필드들 */}
          <div className="flex gap-4 mb-4">
            <input
              value={startNode}
              onChange={(e) => setStartNode(e.target.value)}
              placeholder="시작 노드"
              className="w-32 px-3 py-2 border rounded-md"
            />
            <input
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="시간 (분)"
              type="number"
              className="w-32 px-3 py-2 border rounded-md"
            />
            <input
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="거리 (km)"
              type="number"
              step="0.1"
              className="w-32 px-3 py-2 border rounded-md"
            />
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {isPlaying ? '일시정지' : '재생'}
            </button>
            <button
              onClick={handleVisualize}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              시각화 시작
            </button>
          </div>

          {/* 지도 */}
          <div className="h-[600px] border rounded-lg overflow-hidden">
            <MapContainer
              markers={MARKERS}
              pathNodes={PATH_NODES}
              currentPathIndex={currentPathIndex}
              onMarkerClick={(id) => setStartNode(id.toString())}
            />
          </div>

          {/* 현재 상태 */}
          <div className="text-sm text-gray-600">
            <p>총 거리: {distance}km</p>
            <p>소요 시간: {time}분</p>
            <p>현재 노드: {PATH_NODES[currentPathIndex]}</p>
          </div>
        </div>
      </div>
    </div>
  )
}