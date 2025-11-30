// components/LocationPicker.tsx
'use client';

import { MapContainer, TileLayer, useMapEvents, useMap, ZoomControl } from 'react-leaflet';
import { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icon issue
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Props to receive callback
type LocationPickerProps = {
    onCoordsChange?: (coords: { lat: number; lng: number }) => void;
};

export default function LocationPicker({ onCoordsChange }: LocationPickerProps) {
    const [center, setCenter] = useState({ lat: -1.28998, lng: 36.81553 });

    function FixMapResize() {
        const map = useMap();
        useEffect(() => {
            setTimeout(() => map.invalidateSize(), 100);
        }, [map]);
        return null;
    }

    function MapEvents() {
        const map = useMap();
        useMapEvents({
            moveend: () => {
                const newCenter = map.getCenter();
                const coords = { lat: newCenter.lat, lng: newCenter.lng };
                setCenter(coords);
                onCoordsChange?.(coords);
            },
            click: (e) => {
                const { lat, lng } = e.latlng;
                const coords = { lat, lng };
                setCenter(coords);
                onCoordsChange?.(coords);
                map.setView([lat, lng], map.getZoom());
            },
        });
        return null;
    }

    return (
        <div className="relative w-full h-[30vh] rounded-xl overflow-hidden z-0">
            <MapContainer
                center={[center.lat, center.lng]}
                zoom={17}
                className="w-full h-full"
                scrollWheelZoom
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ZoomControl position="topright" />
                <FixMapResize />
                <MapEvents />
            </MapContainer>

            {/* Center Pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none z-[1000]">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-red-600 drop-shadow-lg animate-pulse"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                </svg>
            </div>

            {/* Coordinates inside map */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 px-4 py-2 rounded-xl shadow text-base font-semibold text-gray-800">
                Lat: {center.lat.toFixed(6)} | Lng: {center.lng.toFixed(6)}
            </div>
        </div>
    );
}