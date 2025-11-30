// app/components/MapWithPins.tsx
'use client';

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  useMap,
  useMapEvents,
} from 'react-leaflet';
// import L, { divIcon, Map as LeafletMap } from 'leaflet';
import L, { divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { projects } from '@/app/data/projects'; // Full project data for image & details

// Fix Leaflet default icon in Next.js
// delete (L.Icon.Default.prototype as any)._getIconUrl;
delete (L.Icon.Default.prototype as { _getIconUrl?: string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Active pulsing red icon
const pulseIcon = divIcon({
  html: `
    <div class="relative">
      <svg width="32" height="46" viewBox="0 0 28 40" class="drop-shadow-lg">
        <path d="M14 0C6.3 0 0 6.3 0 14c0 10.5 14 26 14 26s14-15.5 14-26c0-7.7-6.3-14-14-14z" fill="#ef4444"/>
        <circle cx="14" cy="14" r="7" fill="#fff"/>
      </svg>
      <div class="absolute inset-0 animate-ping">
        <svg width="32" height="46" viewBox="0 0 28 40">
          <path d="M14 0C6.3 0 0 6.3 0 14c0 10.5 14 26 14 26s14-15.5 14-26c0-7.7-6.3-14-14-14z" fill="#ef4444" opacity="0.4"/>
        </svg>
      </div>
    </div>
  `,
  className: '',
  iconSize: [32, 46],
  iconAnchor: [16, 46],
});

const defaultIcon = new L.Icon.Default();

// Fix map resize issues in Next.js tabs/layouts
function FixResize() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => map.invalidateSize(), 100);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}

// Auto-open popup + pan to active marker
function AutoOpenActiveMarker({ activeId }: { activeId: number }) {
  const map = useMap();
  const markerRefs = useRef<Map<number, L.Marker>>(new Map());

  useEffect(() => {
    const activeProject = projects.find(p => p.id === activeId);
    if (!activeProject) return;

    const latLng: [number, number] = [activeProject.lat, activeProject.lng];

    // Pan and zoom smoothly to the active pin
    map.setView(latLng, 15, { animate: true });

    // Open the popup after a tiny delay (ensures marker is rendered)
    setTimeout(() => {
      const marker = markerRefs.current.get(activeId);
      if (marker) {
        marker.openPopup();
      }
    }, 300);
  }, [activeId, map]);

  // Attach ref to each marker so we can open its popup
  useMapEvents({
    popupclose: () => {
      // Optional: reopen if user closes it manually? Or leave closed.
      // Currently allows user to close if they want.
    },
  });

  return null;
}

// Props
interface MapWithPinsProps {
  projects: typeof projects;
  activeId: number; // Always a number (you default to 1)
  onPinClick: (id: number) => void;
}

export default function MapWithPins({ projects, activeId, onPinClick }: MapWithPinsProps) {
  const center: [number, number] = [-1.2921, 36.8219];

  return (
    <div className="relative w-full h-full rounded-r-xl overflow-hidden">
      {/* Optional global styles for popups - add to globals.css if preferred */}
      <style jsx global>{`
        .custom-popup .leaflet-popup-content-wrapper {
          padding: 0;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
        .custom-popup .leaflet-popup-content {
          margin: 0;
          width: 260px !important;
        }
        .custom-popup .leaflet-popup-close-button {
          display: none !important;
        }
      `}</style>

      <MapContainer
        center={center}
        zoom={14}
        className="w-full h-full"
        scrollWheelZoom
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="topright" />
        <FixResize />
        <AutoOpenActiveMarker activeId={activeId} />

        {projects.map((project) => {
          const isActive = project.id === activeId;

          return (
            <Marker
              key={project.id}
              position={[project.lat, project.lng]}
              icon={isActive ? pulseIcon : defaultIcon}
              eventHandlers={{
                click: () => onPinClick(project.id),
              }}
              // ref={(ref) => {
              //   if (ref) {
              //     // Store reference to open popup programmatically
              //     (ref as any)._customId = project.id;
              //     // We'll use a simpler approach via AutoOpenActiveMarker
              //   }
              // }}
            >
              <Popup className="custom-popup">
                <div className="overflow-hidden rounded-lg">
                  {/* Hero Image */}
                  <div className="relative h-40 w-full bg-gray-100">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="260px"
                    />
                  </div>

                  {/* Content */}
                  <div className="px-4 py-2">
                    <h3 className="font-medium text-gray-900 text-sm leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">{project.county}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {project.population} • Updated {project.updated}
                    </p>
                  </div>

                  {/* Optional CTA */}
                  <div className="px-4 pb-2">
                    <button
                      onClick={() => onPinClick(project.id)}
                      className="text-xs font-medium text-[#044D5E] hover:underline"
                    >
                      View full details →
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}