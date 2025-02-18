import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@/components/ui/visually-hidden";

const Navbar = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY === 0 || currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    let timeoutId: NodeJS.Timeout;
    const throttledControlNavbar = () => {
      if (timeoutId) return;

      timeoutId = setTimeout(() => {
        controlNavbar();
        timeoutId = undefined as unknown as NodeJS.Timeout;
      }, 50);
    };

    window.addEventListener("scroll", throttledControlNavbar);

    return () => {
      window.removeEventListener("scroll", throttledControlNavbar);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [lastScrollY]);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "For Companies", href: "/for-companies" },
    { label: "Find Job", href: "/find-job" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm",
        "transition-transform duration-300"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 relative">
          {/* Logo */}
          <Link href="/" className="font-bold flex items-center">
            <div className="relative w-[100px] h-[40px] sm:w-[120px] sm:h-[40px] md:w-[140px] md:h-[50px]">
              <Image
                src="/logo.svg"
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Items */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "text-base lg:text-lg font-semibold transition-all duration-200",
                  hoveredItem
                    ? hoveredItem === item.label
                      ? "text-red-600 scale-105"
                      : "text-gray-300"
                    : "text-gray-600"
                )}
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button (Desktop) */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "hidden md:block bg-red-600 text-white px-4 lg:px-6 py-2 rounded-md text-sm lg:text-base",
              "hover:bg-red-700 transition-colors"
            )}
          >
            Let&apos;s Collaborate
          </motion.button>

          {/* Mobile Menu */}
          <div className="md:hidden absolute right-0 top-1/2 -translate-y-1/2">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-2 hover:bg-gray-100"
                >
                  <Menu className="h-7 w-7 text-gray-700" />
                </Button>
              </SheetTrigger>
              <SheetContent className="flex flex-col h-full w-[280px] sm:w-[350px]">
                <VisuallyHidden>
                  <SheetTitle>Navigation Menu</SheetTitle>
                </VisuallyHidden>
                <div className="flex-1 overflow-y-auto">
                  <div className="flex justify-center mt-8 mb-6">
                    <div className="relative w-[120px] h-[40px]">
                      <Image
                        src="/logo.svg"
                        alt="Logo"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>

                  <SheetDescription className="text-sm text-center text-muted-foreground mb-8">
                    We connect the right workers with the right employers.
                  </SheetDescription>

                  <div className="flex flex-col gap-6">
                    {navItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="text-base font-semibold text-gray-600 hover:text-red-600 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Sticky Button */}
                <div className="sticky bottom-0 pb-6 pt-4 bg-background mt-auto border-t">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "bg-red-600 text-white px-6 py-2 rounded-md w-full",
                      "hover:bg-red-700 transition-colors"
                    )}
                  >
                    Let&apos;s Collaborate
                  </motion.button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
