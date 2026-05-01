import React from 'react';
import Link from 'next/link'; // Import Link for multi-page navigation
import { UserCircle } from "lucide-react";

export default function Navbar() {
  // Navigation objects for better control over paths
  const navLinks = [
    { name: "About", path: "/about" },
    { name: "Faculty", path: "/faculty" },
    { name: "Resources", path: "/resources" }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full h-20 bg-[#FCF9F1] flex items-center justify-between px-12 z-50 border-b border-[#00236F]/10 shadow-sm">
      
      {/* Logo Container - Clicking the logo takes you home */}
      <Link href="/" className="flex items-center">
        <div className="h-14 w-auto overflow-hidden rounded-lg shadow-sm border border-[#00236F]/10 bg-[#00236F] flex items-center justify-center p-1">
            <img 
              src="/logo.png" 
              alt="Logo Dourous-Net" 
              className="h-full w-auto object-contain"
            />
        </div>
      </Link>

      {/* Central Links - Now using Next.js Link for multi-page routing */}
      <div className="hidden lg:flex items-center space-x-12">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.path}
            className="relative text-[#00236F]/80 font-medium transition-colors hover:text-[#00236F] group"
          >
            {link.name}
            <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-[#00236F] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}
      </div>

      {/* Profile Icon - Points to Login/Profile */}
      <div className="flex items-center">
        <Link href="/login">
          <UserCircle className="h-8 w-8 text-[#00236F] cursor-pointer hover:opacity-80 transition-opacity" />
        </Link>
      </div>
    </nav>
  );
}