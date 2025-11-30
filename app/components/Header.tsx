"use client";

import { briefcase, coordinate, file, home, klima_logo_long, klima_logo_short } from "@/public";
import { ShoppingCart, Bell, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

/* ────────────────────── Animation variants ────────────────────── */
const variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

/* ────────────────────── Header component ────────────────────── */
const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);
    const pathname = usePathname();

    /* Close mobile menu when clicking the backdrop */
    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        if (ref.current && e.target === ref.current) {
            setShowMenu(false);
        }
    };

    /* ---- Active detection (exact match OR child route) ---- */
    const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

    /* ---- Navigation data (shared by desktop & mobile) ---- */
    const navItems = [
        { href: "/dashboard", label: "Dashboard", icon: home, alt: "Dashboard" },
        {
            href: "/projects",
            label: "Projects",
            icon: briefcase,
            alt: "Projects",
            badge: "12 new",
            badgeColor: "green",
        },
        {
            href: "/activities",
            label: "Activities",
            icon: file,
            alt: "Activities",
            badge: "5 new",
            badgeColor: "blue",
        },
        {
            href: "/experts",
            label: "Experts",
            icon: coordinate,
            alt: "Experts",
            badgeColor: "blue",
        },
        { href: "/co-ordinates", label: "Coordinates", icon: coordinate, alt: "Coordinates" },
        // {
        //     href: "/reports",
        //     label: "Reports",
        //     icon: briefcase,
        //     alt: "Reports",
        // },
    ];

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-[#E4F3D1] border-b border-green-100 shadow-sm py-2">
            <div className="w-full md:w-[90vw] mx-auto px-4 py-2 flex justify-between items-center md:bg-white md:rounded-full">
                {/* ───── Logo ───── */}
                <div className="flex items-center space-x-2">
                    <Link href="/" className="flex items-center space-x-1 hover:text-green-700 transition">
                        <Image src={klima_logo_long} alt="Klima Logo Long" width={180} className="hidden md:block" />
                    </Link>
                    <Link href="/" className="flex items-center space-x-1 hover:text-green-700 transition">
                        <Image src={klima_logo_short} alt="Klima Logo Short" width={30} height={30} className="block md:hidden" />
                    </Link>
                </div>

                {/* ───── Desktop Nav ───── */}
                <nav className="hidden md:flex space-x-8 text-gray-700 text-sm font-medium">
                    {navItems.map(({ href, label, icon, alt, badge, badgeColor }) => {
                        const active = isActive(href);

                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`flex flex-col items-center space-y-2 transition-colors ${active ? "text-green-700" : "hover:text-green-700"
                                    }`}
                            >
                                <div className="flex items-center space-x-1">
                                    <Image
                                        src={icon}
                                        alt={alt}
                                        width={href === "/activities" ? 10 : 16}
                                        height={href === "/activities" ? 10 : 16}
                                    />
                                    <span className="text-xs font-medium">{label}</span>
                                    {badge && (
                                        <span
                                            className={`ml-1 text-xs px-1.5 rounded-full ${badgeColor === "green" ? "bg-green-200 text-green-800" : "bg-blue-200 text-blue-800"
                                                }`}
                                        >
                                            {badge}
                                        </span>
                                    )}
                                </div>

                                {/* Underline – only on active parent */}
                                <hr
                                    className={`w-full h-px bg-green-700 border-0 transition-all duration-300 origin-left ${active ? "scale-x-100" : "scale-x-0"
                                        }`}
                                />
                            </Link>
                        );
                    })}
                </nav>

                {/* ───── Right icons ───── */}
                <div className="flex items-center space-x-4">
                    <button className="p-2 bg-gray-100 hover:bg-[#E3FCEF] rounded-full transition-all duration-300 cursor-pointer">
                        <ShoppingCart className="w-5 h-5 text-green-700" />
                    </button>
                    <button className="p-2 bg-gray-100 hover:bg-[#E3FCEF] rounded-full transition-all duration-300 cursor-pointer">
                        <Bell className="w-5 h-5 text-green-700" />
                    </button>
                    <div className="w-9 h-9 bg-gray-100 hover:bg-[#E3FCEF] rounded-full flex items-center justify-center text-green-700 font-bold transition-all duration-300 cursor-pointer">
                        <span className="text-sm">IW</span>
                    </div>
                </div>

                {/* ───── Hamburger (mobile) ───── */}
                <div
                    onClick={() => setShowMenu(true)}
                    className="w-6 h-5 flex flex-col justify-between items-center text-4xl text-[#044D5E] md:hidden cursor-pointer overflow-hidden group"
                >
                    <span className="w-full h-[2px] bg-[#044D5E] inline-flex transform group-hover:translate-x-2 transition-all ease-in-out duration-300"></span>
                    <span className="w-full h-[2px] bg-[#044D5E] inline-flex transform translate-x-3 group-hover:translate-x-0 transition-all ease-in-out duration-300"></span>
                    <span className="w-full h-[2px] bg-[#044D5E] inline-flex transform translate-x-1 group-hover:translate-x-3 transition-all ease-in-out duration-300"></span>
                </div>
            </div>

            {/* ───── Mobile Menu ───── */}
            {showMenu && (
                <div
                    ref={ref}
                    onClick={handleClick}
                    className="absolute md:hidden top-0 right-0 w-full h-screen bg-[#F9FBFC]/50 backdrop-blur-lg flex flex-col items-end z-50"
                >
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.1 }}
                        className="w-[80%] h-full overflow-y-scroll bg-[#F9FBFC]/10 flex flex-col items-center px-4 py-18 relative"
                    >
                        <X
                            onClick={() => setShowMenu(false)}
                            className="text-3xl text-textGreen cursor-pointer hover:text-red-500 absolute top-4 right-4 duration-300"
                        />

                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                            className="flex flex-col items-center gap-7"
                        >
                            <ul className="flex flex-col text-[13px] gap-7">
                                {navItems.map(({ href, label, icon, alt, badge, badgeColor }, idx) => {
                                    const active = isActive(href);

                                    return (
                                        <Link
                                            key={href}
                                            onClick={() => setShowMenu(false)}
                                            href={href}
                                            className={`flex items-center gap-1 font-medium transition-colors ${active ? "text-green-700" : "text-textDark hover:text-textGreen"
                                                } cursor-pointer duration-300 nav-link`}
                                        >
                                            <motion.li
                                                variants={variants}
                                                initial="hidden"
                                                animate="visible"
                                                transition={{ duration: 0.2, delay: 0.1 + idx * 0.1, ease: "easeIn" }}
                                                className="flex items-center gap-2"
                                            >
                                                <Image
                                                    src={icon}
                                                    alt={alt}
                                                    width={href === "/activities" ? 10 : 16}
                                                    height={href === "/activities" ? 10 : 16}
                                                />
                                                {label}
                                                {badge && (
                                                    <span
                                                        className={`ml-1 text-xs px-1.5 rounded-full ${badgeColor === "green"
                                                            ? "bg-green-200 text-green-800"
                                                            : "bg-blue-200 text-blue-800"
                                                            }`}
                                                    >
                                                        {badge}
                                                    </span>
                                                )}
                                            </motion.li>
                                        </Link>
                                    );
                                })}
                            </ul>
                        </motion.div>
                    </motion.div>
                </div>
            )}
        </header>
    );
};

export default Header;