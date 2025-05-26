'use client'

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/contact", label: "Contact" },
];

const Navbar: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="border-b px-4 py-3 flex items-center justify-between w-full">
      <Link href="/" className="font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
        JISUB&apos;s Portfolio
      </Link>
      <div className="flex items-center gap-2">
        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1 md:gap-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    `px-3 py-1 rounded-md transition-colors ` +
                    (isActive
                      ? "underline underline-offset-4 text-primary font-semibold"
                      : "text-muted-foreground hover:text-primary/80")
                  }
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
        {/* Mobile nav: Hamburger menu */}
        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-56 p-0">
              <SheetHeader className="px-4 pt-4 pb-2">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <ul className="flex flex-col gap-1 px-4 pb-4">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={
                          `block w-full px-3 py-2 rounded-md transition-colors text-base ` +
                          (isActive
                            ? "underline underline-offset-4 text-primary font-semibold"
                            : "text-muted-foreground hover:text-primary/80")
                        }
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar; 