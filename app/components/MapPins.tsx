// app/components/MapPins.tsx
'use client';

import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import { Icon, divIcon, point, type LatLngExpression } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import L from 'leaflet';

// Fix Leaflet default icon in Next.js
// Fix Leaflet default icon in Next.js (no 'any'!)
delete (L.Icon.Default.prototype as { _getIconUrl?: string })._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Use a minimal local cluster type to avoid depending on a missing L.MarkerCluster export
const createCustomIcon = (cluster: { getChildCount: () => number }) => {
  const count = cluster.getChildCount();
  const size = count < 10 ? 40 : count < 100 ? 50 : 60;

  return divIcon({
    html: `
      <div class="relative flex items-center justify-center">
        <div class="absolute inset-0 animate-ping opacity-75 rounded-full bg-blue-500 w-full h-full"></div>
        <div style="width:${size}px; height:${size}px;" class="relative bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg border-4 border-white">
          ${count}
        </div>
      </div>
    `,
    className: '',
    iconSize: point(size, size),
    iconAnchor: point(size / 2, size / 2),
  });
};

// Single blue pin icon
const bluePinIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Type for your project data
interface Project {
  id: number;
  lat: number;
  lng: number;
  name: string;
  status: 'In Progress' | 'Completed' | 'Active';
}

const bostonProjects: Project[] = [
  // ... your existing data
  { id: 1, lat: 42.3601, lng: -71.0589, name: "Boston Common Restoration", status: "In Progress" },
  // ... rest unchanged
  ...Array.from({ length: 60 }, (_, i) => ({
    id: 100 + i,
    lat: 42.34 + Math.random() * 0.06,
    lng: -71.10 + Math.random() * 0.08,
    name: `Project Site #${100 + i}`,
    status: ["In Progress", "Completed", "Active"][Math.floor(Math.random() * 3)] as Project['status'],
  })),
];

export default function MapPins() {
  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }, []);

  const center: LatLngExpression = [42.3601, -71.0589];

  return (
    <div className="w-full h-96 md:h-[500px] rounded-xl overflow-hidden shadow-lg border border-gray-200">
      <MapContainer
        center={center}
        zoom={12}
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />

        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createCustomIcon}
          maxClusterRadius={50}
          spiderfyOnMaxZoom
          showCoverageOnHover={false}
        >
          {bostonProjects.map((project) => (
            <Marker
              key={project.id}
              position={[project.lat, project.lng] as LatLngExpression}
              icon={bluePinIcon}
            >
              <Popup>
                <div className="text-center p-2">
                  <h3 className="font-semibold text-sm text-teal-900">{project.name}</h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Status:{' '}
                    <span className={`font-medium ${project.status === 'Completed' ? 'text-green-600' : 'text-blue-600'}`}>
                      {project.status}
                    </span>
                  </p>
                  <button className="mt-3 text-xs text-[#044D5E] underline hover:no-underline">
                    View Details →
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}