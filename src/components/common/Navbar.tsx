import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, ChevronDown } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages = [
  {
    code: 'en',
    name: 'English',
    flag: 'https://flagcdn.com/w20/gb.png',
  },
  {
    code: 'hr',
    name: 'Hrvatski',
    flag: 'https://flagcdn.com/w20/hr.png',
  },
] as const;


const Navbar = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [language, setLanguage] = useState<'en' | 'hr'>('en');


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
    {
      label: {
        en: "Home",
        hr: "Početna"
      },
      href: "/"
    },
    {
      label: {
        en: "For Companies",
        hr: "Za tvrtke"
      },
      href: "/for-companies"
    },
    {
      label: {
        en: "Find Job",
        hr: "Pronađi posao"
      },
      href: "/find-job"
    },
    {
      label: {
        en: "Contact",
        hr: "Kontakt"
      },
      href: "/contact"
    },
  ];

  return (
    <nav
      className={cn(
        "fixed w-full top-0 z-50 bg-primary text-white backdrop-blur-sm shadow-sm",
        !isVisible && "-translate-y-full",
        "transition-transform duration-300"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 relative">
          {/* Logo */}
          <Link href="/" className="font-bold flex items-center">
            <div className="relative w-[100px] h-[40px] sm:w-[120px] sm:h-[40px] md:w-[180px] md:h-[80px] lg:w-[220px] lg:h-[100px]">
              <Image
                src="logo/Recruitment4u.svg"
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
              <motion.div
                key={item.label[language]}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "text-base lg:text-lg font-semibold transition-all duration-200",
                    "relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full",
                    "after:origin-left after:scale-x-0 after:bg-primary-secondary",
                    "after:transition-transform after:duration-300 hover:after:scale-x-100",
                    hoveredItem
                      ? hoveredItem === item.label[language]
                        ? "text-primary-secondary after:scale-x-100"
                        : "text-white/60"
                      : "text-white hover:text-primary-secondary"
                  )}
                  onMouseEnter={() => setHoveredItem(item.label[language])}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {item.label[language]}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {/* Updated CTA Button with Link */}
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "bg-primary-secondary text-primary px-4 lg:px-6 py-2 rounded-md text-sm lg:text-base",
                  "hover:bg-primary-secondary/90 transition-colors"
                )}
              >
                {language === 'en' ? "Let's Collaborate" : 'Započnimo suradnju'}
              </motion.button>
            </Link>
            
            {/* New Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "bg-white text-primary px-3 py-2 rounded-md text-sm lg:text-base font-medium",
                    "hover:bg-white/90 transition-colors flex items-center gap-2"
                  )}
                >
                  <Image 
                    src={languages.find(l => l.code === language)?.flag || ''} 
                    alt={`${languages.find(l => l.code === language)?.name} flag`}
                    width={20}
                    height={16}
                    className="object-cover rounded-sm"
                  />
                  <span className="hidden sm:inline">{languages.find(l => l.code === language)?.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[150px]">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    className={cn(
                      "flex items-center gap-2 cursor-pointer justify-center",
                      language === lang.code && "bg-primary-secondary/10"
                    )}
                    onClick={() => setLanguage(lang.code)}
                  >
                    <Image 
                      src={lang.flag} 
                      alt={`${lang.name} flag`}
                      width={20}
                      height={16}
                      className="object-cover rounded-sm"
                    />
                    <span>{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden absolute right-0 top-1/2 -translate-y-1/2">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-2 hover:bg-white/10"
                >
                  <Menu className="h-7 w-7 text-white" /> 
                </Button>
              </SheetTrigger>
              <SheetContent 
                className="flex flex-col h-full w-[280px] sm:w-[350px] bg-primary text-white"
                closeButtonProps={{
                  className: "text-white hover:text-white focus:text-white", 
                }}
              >
                <VisuallyHidden>
                  <SheetTitle>Navigation Menu</SheetTitle>
                </VisuallyHidden>
                <div className="flex-1 overflow-y-auto">
                  <div className="flex justify-center mt-8 mb-6">
                    <div className="relative w-[120px] h-[40px]">
                      <Image
                        src="logo/Recruitment4u.svg"
                        alt="Logo"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>

                  <SheetDescription className="text-sm text-center text-white mb-8">
                    We connect the right workers with the right employers.
                  </SheetDescription>

                  {/* Update mobile menu items */}
                  <div className="flex flex-col gap-6">
                    {navItems.map((item) => (
                      <Link
                        key={item.label[language]}
                        href={item.href}
                        className={cn(
                          "text-base font-semibold text-white hover:text-primary-secondary transition-all duration-200",
                          "relative w-fit after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full",
                          "after:origin-left after:scale-x-0 after:bg-primary-secondary",
                          "after:transition-transform after:duration-300 hover:after:scale-x-100"
                        )}
                      >
                        {item.label[language]}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Sticky Button Section in Mobile Menu */}
                <div className="sticky bottom-0 pb-6 pt-4 bg-primary mt-auto border-t border-white/10">
                  <div className="flex flex-col gap-3">
                    {/* Mobile Menu Language Selector */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={cn(
                            "bg-white text-primary px-6 py-2 rounded-md w-full",
                            "hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
                          )}
                        >
                          <Image 
                            src={languages.find(l => l.code === language)?.flag || ''} 
                            alt={`${languages.find(l => l.code === language)?.name} flag`}
                            width={20}
                            height={16}
                            className="object-cover rounded-sm"
                          />
                          <span>{languages.find(l => l.code === language)?.name}</span>
                          <ChevronDown className="h-4 w-4" />
                        </motion.button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="center" className="w-[200px]">
                        {languages.map((lang) => (
                          <DropdownMenuItem
                            key={lang.code}
                            className={cn(
                              "flex items-center gap-2 cursor-pointer justify-center",
                              language === lang.code && "bg-primary-secondary/10"
                            )}
                          >
                            <Image 
                              src={lang.flag} 
                              alt={`${lang.name} flag`}
                              width={20}
                              height={16}
                              className="object-cover rounded-sm"
                            />
                            <span>{lang.name}</span>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Update mobile CTA button */}
                    <Link href="/contact" className="w-full">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={cn(
                          "bg-primary-secondary text-primary px-6 py-2 rounded-md w-full",
                          "hover:bg-primary-secondary/90 transition-colors"
                        )}
                      >
                        {language === 'en' ? "Let's Collaborate" : 'Započnimo suradnju'}
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
