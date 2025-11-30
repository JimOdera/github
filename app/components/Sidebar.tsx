'use client';

import { aside1, aside2, aside3, aside4, } from '@/public';
// import { aside1, aside2, aside3, aside4, aside5, aside6 } from '@/public';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useMemo } from 'react';

interface SidebarProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {
    const pathname = usePathname();

    const sidebarTextClass = `text-xs font-medium text-gray-700 transition-all duration-300 ease-in-out origin-left flex-shrink-0 whitespace-nowrap overflow-hidden ${isCollapsed ? 'scale-x-0 w-0 opacity-0' : 'scale-x-100 w-auto opacity-100'
        }`;

    // Determine if we're in 'projects' or 'activities'
    const isActivitiesSection = useMemo(() => {
        return pathname.startsWith('/activities');
    }, [pathname]);

    const basePath = isActivitiesSection ? 'activities' : 'projects';

    // Dynamic menu items based on section
    const menuItems = useMemo(() => {
        if (isActivitiesSection) {
            return [
                { icon: aside2, text: 'Create Activity', href: '/create-activities' },
                { icon: aside4, text: 'Activity List', href: '' },
                { icon: aside3, text: 'Sustainability Portfolio', href: '/summary' },
                // { icon: aside5, text: 'Transactions', href: '/transactions' },
                // { icon: aside6, text: 'Marketplace', href: '/marketplace' },
            ];
        }

        return [
            { icon: aside2, text: 'Create Project', href: '/create-projects' },
            { icon: aside4, text: 'Project List', href: '' },
            { icon: aside3, text: 'Green Portfolio', href: '/summary' },
            // { icon: aside5, text: 'Transactions', href: '/transactions' },
            // { icon: aside6, text: 'Marketplace', href: '/marketplace' },
        ];
    }, [isActivitiesSection]);

    const isActive = (href: string) => {
        const fullHref = href === '' ? `/${basePath}` : `/${basePath}${href}`;
        return pathname === fullHref;
    };

    useEffect(() => {
        localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed));
    }, [isCollapsed]);

    return (
        <aside
            className={`sticky top-0 self-start hidden md:block bg-white/5 backdrop-blur-sm border-r border-gray-200/50 flex-shrink-0 relative z-30 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-18' : 'w-58'
                }`}
        >
            <div className="h-full flex flex-col justify-between py-6 px-4">
                <div className="w-full flex flex-col space-y-12 mt-18">
                    {/* Menu Toggle */}
                    <div
                        className="flex items-center space-x-2 bg-gradient-to-br from-[#BFEFF8]/15 to-[#B1CA69]/15 p-2 rounded-md cursor-pointer hover:bg-gray-200/70 transition-all duration-300 ease-in-out"
                        onClick={toggleSidebar}
                    >
                        <Image src={aside1} alt="Menu" className="w-6 h-6 flex-shrink-0 transition-transform duration-300" />
                        <span className={sidebarTextClass}>Menu</span>
                    </div>

                    {/* Dynamic Menu Items */}
                    {menuItems.map((item, index) => {
                        const fullHref = item.href === '' ? `/${basePath}` : `/${basePath}${item.href}`;
                        const active = isActive(item.href);

                        return (
                            <Link
                                key={index}
                                href={fullHref}
                                scroll={false}
                                className={`
                                    flex items-center space-x-2 
                                    p-2 rounded-md 
                                    transition-all duration-300 ease-in-out 
                                    block w-full
                                    ${active
                                        ? 'bg-gradient-to-br from-[#BFEFF8]/80 to-[#B1CA69]/80 text-gray-800'
                                        : 'bg-gradient-to-br from-[#BFEFF8]/15 to-[#B1CA69]/15 hover:bg-gray-200/70 text-gray-700'
                                    }
                                `}
                            >
                                <Image
                                    src={item.icon}
                                    alt={item.text}
                                    className={`
                                        w-6 h-6 flex-shrink-0 transition-transform duration-300
                                        ${active ? 'scale-110' : ''}
                                    `}
                                />
                                <span
                                    className={`
                                        ${sidebarTextClass}
                                        ${active ? 'text-gray-800 font-semibold' : 'text-gray-700'}
                                    `}
                                >
                                    {item.text}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;