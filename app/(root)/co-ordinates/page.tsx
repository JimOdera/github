// app/co-ordinates/page.tsx
'use client';

import Header from '@/app/components/Header';
import { message_circle_more } from '@/public';
import { ChevronRight, GalleryHorizontalEnd } from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { projects, Project } from '@/app/data/projects';

// Dynamic import – no SSR
const MapWithPins = dynamic(
  () => import('@/app/components/MapWithPins'),
  { ssr: false }
);

export default function Coordinates() {
  const [isMounted, setIsMounted] = useState(false);
//   const [activeProjectId, setActiveProjectId] = useState<number | null>(null);
const [activeProjectId, setActiveProjectId] = useState<number>(1);

  const activeProject: Project =
    projects.find((p) => p.id === activeProjectId) ?? projects[0];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#BFEFF8]/30 to-[#B1CA69]/30 flex flex-col">
      <Header />

      <section className="flex flex-col flex-1 overflow-hidden md:w-[90vw] mx-auto mt-17">
        <h1 className="text-xl md:text-2xl font-medium text-[#044D5E] px-6 py-3">
          View the Projects
        </h1>

        <div className="flex flex-1 overflow-hidden p-4">
          {/* ASIDE */}
          <aside className="bg-white w-130 flex-shrink-0 rounded-l-xl shadow-lg overflow-hidden flex flex-col h-full">
            {/* Make the entire aside take full height and hide overflow */}
            
            {/* Header Image */}
            <div className="relative flex-shrink-0">
              <Image
                src={activeProject.image}
                alt={activeProject.title}
                width={500}
                height={200}
                className="w-full h-64 object-cover rounded-tl-lg"
              />
              <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-medium shadow-lg border border-white/60">
                <GalleryHorizontalEnd size={16} />
                Show {projects.length}
              </div>
            </div>

            {/* Title & Updated */}
            <div className="p-5 border-b border-gray-100 flex-shrink-0">
              <h1 className="text-2xl font-medium text-gray-900">{activeProject.title}</h1>
              <p className="text-sm text-gray-500 mt-1">Last updated {activeProject.updated}</p>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex items-center justify-between px-5 py-3 text-sm font-medium text-gray-700 border-b border-gray-100 flex-shrink-0">
              <span className="text-[#044D5E]">About</span>
              <span className="text-gray-500">Stage & Financials</span>
              <span className="text-gray-500">GHG Reduction</span>
              <span className="flex items-center justify-center w-12 h-7 text-gray-400 border border-gray-300 rounded-full">
                <ChevronRight size={20} />
              </span>
            </nav>

            {/* Scrollable Description – Fixed visible height ≈ 4–6 lines */}
            <div 
              className="flex-1 overflow-y-auto p-5 space-y-4 min-h-40 lg:min-h-72
                        max-h-44   /* ← This is the key line */
                        lg:max-h-72   /* optional: a bit more on larger screens */"
            >
              {activeProject.description.map((para, i) => (
                <p 
                  key={i} 
                  className="text-sm text-gray-600 leading-relaxed"
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Fixed Location Footer */}
            <div className="p-5 border-t border-gray-100 bg-gray-50 flex-shrink-0">
              <h2 className="font-semibold text-gray-900 text-sm mb-2">Location</h2>
              <div className="text-sm text-gray-600">
                <p className="font-medium">{activeProject.county}</p>
                <p className="text-xs">Rural ({activeProject.population})</p>
              </div>
            </div>
          </aside>

          {/* MAP */}
          <main className="flex-1 bg-white rounded-r-xl overflow-hidden">
            {isMounted ? (
              <MapWithPins
                projects={projects}
                activeId={activeProjectId}
                onPinClick={setActiveProjectId}
              />
            ) : (
              <div className="w-full h-full bg-gray-100 animate-pulse" />
            )}
          </main>
        </div>
      </section>

      {/* Help Button */}
      <div className="fixed bottom-5 right-5 flex flex-col items-center">
        <div className="bg-white text-xs text-gray-700 px-3 py-1 rounded-lg shadow-md mb-2 relative cursor-pointer">
          need help?
          <span className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
        </div>
        <button className="bg-white shadow-md border border-gray-200 rounded-full p-3 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
          <Image src={message_circle_more} alt="Help" width={20} height={20} />
        </button>
      </div>
    </div>
  );
}