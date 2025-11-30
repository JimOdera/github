'use client';

import Header from '@/app/components/Header';
import ProjectDetailChart from '@/app/components/ProjectDetailChart/ProjectDetailChart';
import {
  folder,
  message_circle_more,
  badgeCheck,
  ghp2,
  ghp3,
  trendingUp,
  projectIcon5,
  projectIcon6,
  projectIcon7,
  projectIcon8,
  projectIcon9,
  projectIcon10,
  projectIcon11,
  acticon1,
  acticon2,
  forest1,
  forest2,
  forest3,
  forest4,
  forest5,
  forest6,
  forest7,
  forest8,
  forest9,
  forest10,
} from '@/public';
import {
  ArrowRight,
  ChevronRight,
  CircleCheckBig,
  Clock,
  GalleryHorizontalEnd,
  UploadCloud,
  MapPin,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import { use } from 'react';

// Dummy projects data (same as in projects page)
const dummyProjects = [
  {
    id: 1,
    image: forest1,
    name: "Mangrove Restoration & Blue Carbon Project",
    title: "Mangrove Restoration & Blue Carbon Project",
    location: "Gazi Bay, Kwale County",
    lastUpdated: "10th Nov, 2025",
    categories: ["Blue Carbon", "Mangroves", "Coastal Restoration"],
    fundingProgress: 78,
    status: "Active",
  },
  {
    id: 2,
    image: forest2,
    name: "Mikoko Pamoja Community Mangrove Conservation",
    title: "Mikoko Pamoja Community Mangrove Conservation",
    location: "Gazi & Vanga, Kwale County",
    lastUpdated: "18th Nov, 2025",
    categories: ["Community-Led", "Carbon Credits", "Mangroves"],
    fundingProgress: 92,
    status: "Active",
  },
  {
    id: 3,
    image: forest3,
    name: "Mount Kenya Forest Rehabilitation Initiative",
    title: "Mount Kenya Forest Rehabilitation Initiative",
    location: "Nyeri & Meru Counties",
    lastUpdated: "5th Nov, 2025",
    categories: ["Reforestation", "Water Catchment", "Biodiversity"],
    fundingProgress: 64,
    status: "Active",
  },
  {
    id: 4,
    image: forest4,
    name: "Kakamega Forest Indigenous Tree Planting",
    title: "Kakamega Forest Indigenous Tree Planting",
    location: "Kakamega County",
    lastUpdated: "22nd Oct, 2025",
    categories: ["Tropical Rainforest", "Biodiversity Hotspot", "Community"],
    fundingProgress: 71,
    status: "Pending",
  },
  {
    id: 5,
    image: forest5,
    name: "Maasai Mara Conservancies Reforestation",
    title: "Maasai Mara Conservancies Reforestation",
    location: "Narok County",
    lastUpdated: "14th Nov, 2025",
    categories: ["Wildlife Corridors", "Agroforestry", "Community Conservancies"],
    fundingProgress: 55,
    status: "Active",
  },
  {
    id: 6,
    image: forest6,
    name: "Aberdare Range Cloud Forest Protection",
    title: "Aberdare Range Cloud Forest Protection",
    location: "Nyandarua & Murang'a Counties",
    lastUpdated: "27th Nov, 2025",
    categories: ["Water Towers", "REDD+", "Indigenous Forest"],
    fundingProgress: 49,
    status: "Pending",
  },
  {
    id: 7,
    image: forest7,
    name: "Lake Victoria Basin Riparian Restoration",
    title: "Lake Victoria Basin Riparian Restoration",
    location: "Kisumu & Siaya Counties",
    lastUpdated: "20th Nov, 2025",
    categories: ["Wetlands", "Water Quality", "Community"],
    fundingProgress: 83,
    status: "Active",
  },
  {
    id: 8,
    image: forest8,
    name: "Chyulu Hills REDD+ Carbon Project",
    title: "Chyulu Hills REDD+ Carbon Project",
    location: "Makueni & Kajiado Counties",
    lastUpdated: "25th Nov, 2025",
    categories: ["REDD+", "Wildlife", "Volcanic Landscape"],
    fundingProgress: 88,
    status: "Completed",
  },
  {
    id: 9,
    image: forest9,
    name: "Arabuko Sokoke Forest Conservation",
    title: "Arabuko Sokoke Forest Conservation",
    location: "Kilifi County",
    lastUpdated: "12th Nov, 2025",
    categories: ["Coastal Forest", "Endangered Species", "Eco-Tourism"],
    fundingProgress: 67,
    status: "Active",
  },
  {
    id: 10,
    image: forest10,
    name: "Tana Delta Wetland & Mangrove Recovery",
    title: "Tana Delta Wetland & Mangrove Recovery",
    location: "Tana River County",
    lastUpdated: "27th Nov, 2025",
    categories: ["Ramsar Site", "Mangroves", "Flood Mitigation"],
    fundingProgress: 41,
    status: "Pending",
  },
];

export default function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  // Properly unwrap the params promise
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  
  // Load real projects data (similar to projects page)
  const realProjects = useMemo(() => {
    if (!isMounted) return [];

    const projects: any[] = [];

    // Load submitted projects
    try {
      const submittedStr = localStorage.getItem('submittedProjects');
      if (submittedStr) {
        const submitted = JSON.parse(submittedStr);
        if (Array.isArray(submitted)) {
          submitted.forEach((proj: any) => {
            const overview = proj.overview || {};
            const timestamp = proj.id.match(/_(\d+)_\w+/)?.[1];
            const date = timestamp
              ? new Date(Number(timestamp)).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
              : 'Recently';

            projects.push({
              id: proj.id,
              name: overview.projectTitle || 'Submitted Project',
              title: overview.projectTitle || 'Submitted Project',
              location: overview.county ? `${overview.county} County` : 'Kenya',
              lastUpdated: date,
              categories: [overview.taxonomyCategory || 'Climate Action', overview.subCategory || ''].filter(Boolean),
              fundingProgress: 100,
              status: 'Completed',
              image: null,
              isSubmitted: true,
            });
          });
        }
      }
    } catch (e) {
      console.warn('Failed to load submittedProjects', e);
    }

    // Load drafts
    Object.keys(localStorage).forEach(key => {
      const match = key.match(/^projectDraft_(.+)_step1$/);
      if (!match) return;
      const projectId = match[1];
      if (projects.some(p => p.id === projectId)) return;

      try {
        const step1Data = JSON.parse(localStorage.getItem(key) || '{}');
        if (!step1Data.projectTitle) return;

        let filledSteps = 0;
        for (let i = 1; i <= 4; i++) {
          if (localStorage.getItem(`projectDraft_${projectId}_step${i}`)) filledSteps++;
        }
        const progress = Math.round((filledSteps / 4) * 100);

        projects.push({
          id: projectId,
          name: step1Data.projectTitle || 'Untitled Draft',
          title: step1Data.projectTitle || 'Untitled Draft',
          location: step1Data.county ? `${step1Data.county} County` : 'Location not set',
          lastUpdated: 'In Progress',
          categories: [step1Data.taxonomyCategory || 'Draft'],
          fundingProgress: progress,
          status: progress === 100 ? 'Active' : progress >= 50 ? 'Active' : 'Pending',
          image: null,
          isSubmitted: false,
        });
      } catch (e) {
        console.warn('Failed to parse draft:', key);
      }
    });

    return projects;
  }, [isMounted]);

  // Now you can safely use `id` instead of `params.id`
  const allProjects = useMemo(() => {
    const dummies = dummyProjects.map(p => ({
      ...p,
      id: p.id.toString(),
      isDummy: true,
    }));
    return [...realProjects, ...dummies];
  }, [realProjects]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Find the project using the resolved `id`
  const project = allProjects.find(p =>
    p.id.toString() === id ||
    (p.isDummy && p.id === Number(id))
  );

  // Handle navigation for real projects
  const handleEditProject = () => {
    if (project && !project.isDummy) {
      router.push(`/projects/forms?id=${project.id}`);
    }
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#BFEFF8]/30 to-[#B1CA69]/30 flex items-center justify-center">
        Loading project details...
      </div>
    );
  }

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#BFEFF8]/30 to-[#B1CA69]/30 flex flex-col">
      <div className="flex-1 flex flex-col relative z-10">
        <Header />

        <div className="flex w-full md:w-[90vw] mx-auto pt-17 bg-[#FBFDFB] relative">
          {/* Hero Banner */}
          <section className="absolute inset-x-0 top-17 w-full h-52 md:h-64 bg-cover bg-center z-20">
            <Image src="/images/projects/summary.png" alt="Summary Banner" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#B1CA69]/30 via-transparent to-[#FBFDFB]/30 flex items-center p-6">
              <div className="flex items-end justify-between w-full">
                <div className="flex flex-col items-start">
                  <Image
                    src={folder}
                    alt="folder Icon"
                    className="block md:hidden w-4 h-4 mb-2 cursor-pointer"
                  />
                  <h2 className="text-lg md:text-3xl font-medium text-teal-900">
                    {project.name}
                    {project.isSubmitted && (
                      <span className="ml-2 text-xs text-emerald-600 font-bold">[Submitted]</span>
                    )}
                  </h2>
                  <div className="flex items-center gap-2 text-xs text-teal-700 mt-1">
                    <MapPin size={14} />
                    <span>{project.location}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {!project.isDummy && (
                    <button
                      onClick={handleEditProject}
                      className="bg-[#E2FFF2] hover:bg-[#E2FFF2]/90 text-xs text-[#044D5E] border border-[#044D5E] px-4 py-2 rounded-md flex items-center gap-2"
                    >
                      Edit Project
                    </button>
                  )}
                  <Link
                    href=""
                    className="bg-[#044D5E] hover:bg-[#044D5E]/90 text-xs text-white border border-[#044D5E] px-5 py-2 rounded-md flex items-center gap-2"
                  >
                    KGFT Alignment <Image src={badgeCheck} alt="badgeCheck" className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <main className="w-full space-y-6 bg-[#FBFDFB] relative z-10 pt-64 md:pt-72">
            <div className="w-full mx-auto px-4 py-6 space-y-8">
              {/* Tabs */}
              <div className="w-full flex items-center justify-between gap-4">
                <div className="w-full flex items-center justify-center bg-[#F8F9F8] border-b-2 border-gray-300 px-3 py-2">
                  <span>About</span>
                </div>
                <div className="w-full flex items-center justify-center bg-[#F8F9F8] border-b-2 border-gray-300 px-3 py-2">
                  <span>Stage & Financials</span>
                </div>
                <div className="w-full flex items-center justify-center bg-[#F8F9F8] border-b-2 border-gray-300 px-3 py-2">
                  <span>GHG Reduction</span>
                </div>
                <div className="w-full flex items-center justify-center bg-[#F8F9F8] border-b-2 border-gray-300 px-3 py-2">
                  <span>Revenue Potential</span>
                </div>
                <div className="flex items-center justify-center border border-gray-300 px-3 py-2 rounded-lg">
                  <ChevronRight />
                </div>
              </div>

              <hr className="border-t border-gray-200 my-6" />

              <div className="flex flex-col lg:flex-row gap-8">
                {/* LEFT COLUMN - Project Details */}
                <div className="flex-1 space-y-6">
                  {/* Image Grid Section */}
                  <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <div className="md:col-span-2 relative">
                      <Image
                        src={project.image || forest1}
                        alt={project.title}
                        width={800}
                        height={400}
                        className="w-full h-64 md:h-80 object-cover rounded-xl"
                      />
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="relative">
                        <Image
                          src={ghp2}
                          alt="Forest 1"
                          width={400}
                          height={200}
                          className="w-full h-32 md:h-40 object-cover rounded-xl"
                        />
                      </div>
                      <div className="relative">
                        <Image
                          src={ghp3}
                          alt="Forest 2"
                          width={400}
                          height={200}
                          className="w-full h-32 md:h-40 object-cover rounded-xl"
                        />
                        <button className="absolute bottom-3 left-3 bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/20 text-white text-sm font-medium px-3 py-1 rounded-md shadow-sm flex items-center gap-1 cursor-pointer transition-all duration-300">
                          <GalleryHorizontalEnd /> Show 12
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Update Images Upload Section */}
                  <div className="mb-6">
                    <p className="text-xs text-gray-700 mb-2 font-medium">Update Images**</p>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-24 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 focus:outline-none focus:border-gray-400 transition">
                        <div className="flex flex-col items-center space-x-2">
                          <UploadCloud className="w-6 h-6 text-gray-500" />
                          <span className="text-xs text-gray-500">
                            Update Images (PDF, PNG, JPG)
                          </span>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.png,.jpg,.jpeg"
                          multiple
                        />
                      </label>
                    </div>
                  </div>

                  {/* About the project section */}
                  <div className="bg-white p-6 rounded-xl border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">About the project</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      {project.isDummy ? (
                        <>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis viverra, aliquet mi non, gravida risus.
                          Suspendisse potenti. In hac habitasse platea dictumst. Proin sed finibus mauris. Aliquam erat volutpat.
                          Aenean blandit magna at sem sagittis, sed pretium mauris tincidunt. Integer ac dolor a turpis cursus tempor nec vel magna.
                        </>
                      ) : (
                        `This ${project.categories[0]?.toLowerCase() || 'climate'} project located in ${project.location} focuses on sustainable environmental impact.`
                      )}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {project.isDummy ? (
                        <>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet felis viverra, aliquet mi non, gravida risus.
                          Suspendisse potenti. In hac habitasse platea dictumst. Proin sed finibus mauris. Aliquam erat volutpat.
                          Aenean blandit magna at sem sagittis, sed pretium mauris tincidunt.
                        </>
                      ) : (
                        `Project status: ${project.status} with ${project.fundingProgress}% completion.`
                      )}
                    </p>
                  </div>

                  {/* Stage & Financials */}
                  <div className="bg-white border border-gray-100 rounded-xl p-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Stage & Financials</h3>
                      <ProjectDetailChart percentage={project.fundingProgress} />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-800 mb-3">Investment needs</h3>
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        <div className="w-full flex flex-col gap-4">
                          <div className="w-full flex items-center justify-start gap-2 bg-[#F8F9F8] px-3 py-2">
                            <CircleCheckBig size={16} color='#1ECEC9' />
                            <span className='text-sm'>Conversion to drip irrigation</span>
                          </div>
                          <div className="w-full flex items-center justify-start gap-2 bg-[#F8F9F8] px-3 py-2">
                            <CircleCheckBig size={16} color='#1ECEC9' />
                            <span className='text-sm'>Conversion to drip irrigation</span>
                          </div>
                        </div>
                        <div className="w-full flex flex-col gap-4">
                          <div className="w-full flex items-center justify-start gap-2 bg-[#F8F9F8] px-3 py-2">
                            <CircleCheckBig size={16} color='#1ECEC9' />
                            <span className='text-sm'>Installation of Solar Panels</span>
                          </div>
                          <div className="w-full flex items-center justify-start gap-2 bg-[#F8F9F8] px-3 py-2">
                            <CircleCheckBig size={16} color='#1ECEC9' />
                            <span className='text-sm'>Energy-efficient machinery</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* GHG Reduction */}
                  <div className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col space-y-6">
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Greenhouse Gas Reduction</h3>
                      <div className="w-fit flex items-center gap-4">
                        <div className="flex items-center justify-center bg-[#E8EFF0] rounded-xl p-4">
                          <Image src={projectIcon5} alt="projectIcon5" />
                        </div>
                        <div>
                          <p className="text-sm">Scale</p>
                          <h2 className="text-2xl font-medium">20,000 MWh/year</h2>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-800 mb-3">Emission factors used</h3>
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        <div className="w-full flex flex-col gap-4">
                          <div className="w-full flex items-center justify-start gap-2 bg-[#F8F9F8] px-3 py-2">
                            <CircleCheckBig size={16} color='#1ECEC9' />
                            <span className='text-sm'>0.72 tCO₂e/MWh for grid electricity</span>
                          </div>
                          <div className="w-full flex items-center justify-start gap-2 bg-[#F8F9F8] px-3 py-2">
                            <CircleCheckBig size={16} color='#1ECEC9' />
                            <span className='text-sm'>0.15 tCO₂e/liter for diesel fuel</span>
                          </div>
                        </div>
                        <div className="w-full flex flex-col gap-4">
                          <div className="w-full flex items-center justify-start gap-2 bg-[#F8F9F8] px-3 py-2">
                            <CircleCheckBig size={16} color='#1ECEC9' />
                            <span className='text-sm'>1.5 tCO₂e/ha for land use</span>
                          </div>
                          <div className="w-full flex items-center justify-start gap-2 bg-[#F8F9F8] px-3 py-2">
                            <CircleCheckBig size={16} color='#1ECEC9' />
                            <span className='text-sm'>0.25 tCO₂e/km for freight transport</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Revenue Potential */}
                  <div className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col space-y-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Revenue Potential</h3>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                      <div className="w-full flex flex-col gap-4">
                        <div className="w-full flex items-center justify-start gap-4 bg-white border border-gray-100 rounded-xl px-3 py-2">
                          <div className='bg-[#ECFDF5] rounded-xl p-4'>
                            <Image src={projectIcon6} alt='project icon' />
                          </div>
                          <div>
                            <p className='text-sm text-gray-500'>Annual Offset</p>
                            <h2 className='text-xl font-semibold'>750,000 tCO2e</h2>
                          </div>
                        </div>
                        <div className="w-full flex items-center justify-start gap-4 bg-white border border-gray-100 rounded-xl px-3 py-2">
                          <div className='bg-[#EFF6FF] rounded-xl p-4'>
                            <Image src={projectIcon7} alt='project icon' />
                          </div>
                          <div>
                            <p className='text-sm text-gray-500'>Estimated Revenue (USD/year)</p>
                            <h2 className='text-xl font-semibold'>USD 20,000</h2>
                          </div>
                        </div>
                      </div>
                      <div className="w-full flex flex-col gap-4">
                        <div className="w-full flex items-center justify-start gap-4 bg-white border border-gray-100 rounded-xl px-3 py-2">
                          <div className='bg-[#ECFEFF] rounded-xl p-4'>
                            <Image src={projectIcon8} alt='project icon' />
                          </div>
                          <div>
                            <p className='text-sm text-gray-500'>Estimated Carbon Value Per Credit</p>
                            <h2 className='text-xl font-semibold'>USD 20</h2>
                          </div>
                        </div>
                        <div className="w-full flex items-center justify-start gap-4 bg-white border border-gray-100 rounded-xl px-3 py-2">
                          <div className='bg-[#FAF5FF] rounded-xl p-4'>
                            <Image src={projectIcon9} alt='project icon' />
                          </div>
                          <div>
                            <p className='text-sm text-gray-500'>Verified Standard</p>
                            <h2 className='text-xl font-semibold'>VERRA</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Climate Threats addressed */}
                  <div className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col space-y-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Climate Threats addressed</h3>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                      <div className="w-full flex items-center gap-4">
                        <div className="w-full flex items-center justify-start gap-4 bg-white border border-gray-100 rounded-xl px-3 py-2">
                          <div className='bg-[#53D8F5] rounded-xl p-2'>
                            <Image src={projectIcon11} alt='project icon' />
                          </div>
                          <div>
                            <p className='text-sm text-gray-500'>Annual Offset</p>
                            <h2 className='text-xl font-semibold'>750,000 tCO2e</h2>
                          </div>
                        </div>
                        <div className="w-full flex items-center justify-start gap-4 bg-white border border-gray-100 rounded-xl px-3 py-2">
                          <div className='bg-[#00C587] rounded-xl p-2'>
                            <Image src={projectIcon10} alt='project icon' />
                          </div>
                          <div>
                            <p className='text-sm text-gray-500'>Estimated Revenue (USD/year)</p>
                            <h2 className='text-xl font-semibold'>USD 20,000</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Use of Proceeds */}
                  <div className='bg-white border border-gray-100 rounded-xl p-6 flex flex-col space-y-6'>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Use of Proceeds</h3>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                      <div className="w-full flex flex-col gap-4">
                        <div className="w-full flex items-center justify-start gap-2 bg-[#F8F9F8] px-3 py-2">
                          <CircleCheckBig size={16} color='#1ECEC9' />
                          <span className='text-sm'>Installation of solar panels</span>
                        </div>
                        <div className="w-full flex items-center justify-start gap-2 bg-[#F8F9F8] px-3 py-2">
                          <CircleCheckBig size={16} color='#1ECEC9' />
                          <span className='text-sm'>Conversion to drip irrigation</span>
                        </div>
                      </div>
                      <div className="w-full flex flex-col gap-4">
                        <div className="w-full flex items-center justify-start gap-2 bg-[#F8F9F8] px-3 py-2">
                          <CircleCheckBig size={16} color='#1ECEC9' />
                          <span className='text-sm'>Energy-efficient machinery</span>
                        </div>
                        <div className="w-full flex items-center justify-start gap-2 bg-[#F8F9F8] px-3 py-2">
                          <CircleCheckBig size={16} color='#1ECEC9' />
                          <span className='text-sm'>Afforestation project</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Responsibility & Oversight */}
                  <div className='bg-white border border-gray-100 rounded-xl p-6 flex flex-col space-y-6'>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Responsibility & Oversight</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className='space-y-2 border border-gray-100 bg-[#FDFFFC] rounded-lg px-8 py-4'>
                        <div className='flex items-center gap-2'>
                          <Image src={acticon1} alt='icon1' width={18} />
                          <p className='text-xs'>Implementation</p>
                        </div>
                        <div className='flex flex-col gap-1'>
                          <h1 className='text-lg font-semibold'>HGRS Institute</h1>
                          <p className='text-xs text-[#4ABEA6]'>Dr Rebbeca Cheplemoli</p>
                        </div>
                      </div>
                      <div className='space-y-2 border border-gray-100 bg-[#FDFFFC] rounded-lg px-8 py-4'>
                        <div className='flex items-center gap-2'>
                          <Image src={acticon2} alt='icon1' width={18} />
                          <p className='text-xs'>Validation</p>
                        </div>
                        <div className='flex flex-col gap-1'>
                          <h1 className='text-lg font-semibold'>Carbon Credit Bureau</h1>
                          <p className='text-xs text-[#4ABEA6]'>John Doe</p>
                        </div>
                      </div>
                      <div className='space-y-2 border border-gray-100 bg-[#FDFFFC] rounded-lg px-8 py-4'>
                        <div className='flex items-center gap-2'>
                          <Image src={acticon1} alt='icon1' width={18} />
                          <p className='text-xs'>Supply</p>
                        </div>
                        <div className='flex flex-col gap-1'>
                          <h1 className='text-lg font-semibold'>BHTP Corporation</h1>
                          <p className='text-xs text-[#4ABEA6]'>Iris West Alen</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN - Financials Card */}
                <div className="w-full lg:w-96 h-fit bg-white rounded-2xl shadow-sm overflow-hidden">
                  <div className="w-full bg-gradient-to-br from-[#BFEFF8]/30 to-[#B1CA69]/30 flex flex-col gap-3 p-5">
                    <div className="flex items-center justify-between w-full">
                      <div className="bg-[#BDEBE7] px-3 py-4 rounded-lg">
                        <Image src={trendingUp} alt="trendingUp" width={20} height={20} />
                      </div>
                      <h2 className="text-[#044D5E] text-lg font-semibold">Update Financials</h2>
                    </div>

                    <div className="w-full flex flex-col space-y-2">
                      <div className="flex items-center justify-between w-full">
                        <p className="text-sm text-gray-600">Current Stage</p>
                        <p className="text-sm text-gray-600">% Drawn</p>
                      </div>
                      <div className="flex items-center justify-between w-full">
                        <p className="text-base font-semibold text-[#4ABEA6]">{project.status}</p>
                        <p className="text-2xl font-bold text-orange-500">{project.fundingProgress}%</p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full p-6 space-y-6 bg-[#F8F9F8]">
                    <div className="space-y-5 w-full">
                      <div className="flex items-center gap-3 w-full">
                        <div className="bg-green-500 p-1 rounded-full">
                          <svg className="w-4 h-4 text-[#044D5E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">BANKING STAGE</p>
                          <div className="flex items-center justify-between mt-1 w-full">
                            <p className="text-sm text-gray-600">In Progress</p>
                            <div className="bg-gray-200 p-1 rounded-full">
                              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 w-full">
                        <Clock />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">PERCENTAGE DRAWN</p>
                          <div className="mt-1 w-full">
                            <input
                              type="text"
                              defaultValue={`${project.fundingProgress}%`}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 w-full">
                        <Clock />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">ROADBLOCKS</p>
                          <div className="flex items-center mt-1 gap-2 w-full">
                            <input
                              type="text"
                              placeholder="Add roadblocks"
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                            <button className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition">
                              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 w-full">
                      <button className="w-full bg-[#E2EFD6] text-[#044D5E] font-medium py-3 rounded-full flex items-center justify-center gap-2">
                        Submit
                        <ArrowRight width={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Floating Help Button */}
      <div className="fixed bottom-5 right-5 flex flex-col items-center">
        <div className="bg-white text-xs text-gray-700 px-3 py-1 rounded-lg shadow-md mb-2 relative cursor-pointer">
          need help?
          <span
            className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45"
            aria-hidden="true"
          ></span>
        </div>
        <button className="bg-white shadow-md border border-gray-200 bg-gray-200/50 p-3 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300">
          <Image src={message_circle_more} alt="Help" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}