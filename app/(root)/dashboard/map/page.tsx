'use client';

import dynamic from 'next/dynamic';

// ✅ Dynamically import the component — disable SSR
const LocationPicker = dynamic(() => import('../../../components/LocationPicker'), {
    ssr: false,
});

export default function MapPage() {
    return (
        <main className="p-4">
            <h1 className="text-2xl font-bold mb-4">Location Picker</h1>
            <LocationPicker />
        </main>
    );
}
