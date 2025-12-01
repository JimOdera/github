"use client";

import { briefcase, coordinate, file, home, klima_logo_long, klima_logo_short } from "@/public";
import { ShoppingCart, Bell, X, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, type MouseEvent, useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const variants = { hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } };
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, status } = useSession();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("klimaUser");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const isGoogleLogin = status === "authenticated" && session?.user;
  const isOtpLogin = !!user && user.provider === "email";
  const isLoggedIn = isGoogleLogin || isOtpLogin;

  const getInitials = (email: string) => {
    const namePart = email.split("@")[0];
    const parts = namePart.split(/[\._-]/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return namePart.slice(0, 2).toUpperCase();
  };

  const userEmail = isGoogleLogin ? session!.user!.email! : user?.email || "";
  const initials = userEmail ? getInitials(userEmail) : "??";

  // FIXED LOGOUT — Works 100% after Google login
  const handleLogout = async () => {
    // 1. Clear Auth.js session (Google)
    if (isGoogleLogin) {
      await signOut({ redirect: false });
    }

    // 2. Clear your custom storage
    localStorage.removeItem("klimaUser");
    document.cookie = "klimaUser=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    // 3. Reset local state
    setUser(null);
    setShowDropdown(false);
    setShowMenu(false);

    // 4. Force session to reload on next render
    window.location.href = "/sign-up"; // Full reload = clean slate
    // OR use: router.push("/sign-up") + router.refresh() if you prefer SPA
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (ref.current && e.target === ref.current) setShowMenu(false);
  };

  const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: home, alt: "Dashboard" },
    { href: "/projects", label: "Projects", icon: briefcase, alt: "Projects", badge: "12 new", badgeColor: "green" },
    { href: "/activities", label: "Activities", icon: file, alt: "Activities", badge: "5 new", badgeColor: "blue" },
    { href: "/experts", label: "Experts", icon: coordinate, alt: "Experts" },
    { href: "/co-ordinates", label: "Coordinates", icon: coordinate, alt: "Coordinates" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#E4F3D1] border-b border-green-100 shadow-sm py-2">
      <div className="w-full md:w-[90vw] mx-auto px-4 py-2 flex justify-between items-center md:bg-white md:rounded-full">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-1">
            <Image src={klima_logo_long} alt="Klima Logo Long" width={180} className="hidden md:block" />
            <Image src={klima_logo_short} alt="Klima Logo Short" width={30} height={30} className="block md:hidden" />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-gray-700 text-sm font-medium">
          {navItems.map(({ href, label, icon, alt, badge, badgeColor }) => {
            const active = isActive(href);
            return (
              <Link key={href} href={href} className={`flex flex-col items-center space-y-2 transition-colors ${active ? "text-green-700" : "hover:text-green-700"}`}>
                <div className="flex items-center space-x-1">
                  <Image src={icon} alt={alt} width={href === "/activities" ? 10 : 16} height={href === "/activities" ? 10 : 16} />
                  <span className="text-xs font-medium">{label}</span>
                  {badge && (
                    <span className={`ml-1 text-xs px-1.5 rounded-full ${badgeColor === "green" ? "bg-green-200 text-green-800" : "bg-blue-200 text-blue-800"}`}>
                      {badge}
                    </span>
                  )}
                </div>
                <hr className={`w-full h-px bg-green-700 border-0 transition-all duration-300 origin-left ${active ? "scale-x-100" : "scale-x-0"}`} />
              </Link>
            );
          })}
        </nav>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <button className="p-2 bg-gray-100 hover:bg-[#E3FCEF] rounded-full transition-all duration-300">
            <ShoppingCart className="w-5 h-5 text-green-700" />
          </button>
          <button className="p-2 bg-gray-100 hover:bg-[#E3FCEF] rounded-full transition-all duration-300">
            <Bell className="w-5 h-5 text-green-700" />
          </button>

          {/* Avatar */}
          {isLoggedIn && (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg transition-all duration-300 ring-2 ring-white"
              >
                {initials}
              </button>

              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50"
                >
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900 truncate">{userEmail}</p>
                    <p className="text-xs text-gray-500">Signed in via {isGoogleLogin ? "Google" : "Email"}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-red-50 text-red-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Log out</span>
                  </button>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* Hamburger */}
        <div
          onClick={() => setShowMenu(true)}
          className="w-6 h-5 flex flex-col justify-between items-center text-4xl text-[#044D5E] md:hidden cursor-pointer overflow-hidden group"
        >
          <span className="w-full h-[2px] bg-[#044D5E] inline-flex transform group-hover:translate-x-2 transition-all ease-in-out duration-300"></span>
          <span className="w-full h-[2px] bg-[#044D5E] inline-flex transform translate-x-3 group-hover:translate-x-0 transition-all ease-in-out duration-300"></span>
          <span className="w-full h-[2px] bg-[#044D5E] inline-flex transform translate-x-1 group-hover:translate-x-3 transition-all ease-in-out duration-300"></span>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div ref={ref} onClick={handleClick} className="absolute md:hidden top-0 right-0 w-full h-screen bg-[#F9FBFC]/50 backdrop-blur-lg flex flex-col items-end z-50">
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="w-[80%] h-full overflow-y-scroll bg-[#F9FBFC]/10 flex flex-col items-center px-4 py-18 relative">
            <X onClick={() => setShowMenu(false)} className="text-3xl text-textGreen cursor-pointer hover:text-red-500 absolute top-4 right-4 duration-300" />
            <motion.div initial="hidden" animate="visible" variants={containerVariants} className="flex flex-col items-center gap-7">
              <ul className="flex flex-col text-[13px] gap-7">
                {navItems.map(({ href, label, icon, alt, badge, badgeColor }) => {
                  const active = isActive(href);
                  return (
                    <Link key={href} onClick={() => setShowMenu(false)} href={href} className={`flex items-center gap-1 font-medium transition-colors ${active ? "text-green-700" : "text-textDark hover:text-textGreen"}`}>
                      <motion.li variants={variants} className="flex items-center gap-2">
                        <Image src={icon} alt={alt} width={href === "/activities" ? 10 : 16} height={href === "/activities" ? 10 : 16} />
                        {label}
                        {badge && (
                          <span className={`ml-1 text-xs px-1.5 rounded-full ${badgeColor === "green" ? "bg-green-200 text-green-800" : "bg-blue-200 text-blue-800"}`}>
                            {badge}
                          </span>
                        )}
                      </motion.li>
                    </Link>
                  );
                })}
                {isLoggedIn && (
                  <button onClick={handleLogout} className="flex items-center gap-2 text-red-600 font-medium">
                    <LogOut className="w-4 h-4" />
                    Log out
                  </button>
                )}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      )}
    </header>
  );
};

export default Header;