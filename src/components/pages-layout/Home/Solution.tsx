import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import AnimatedSvgIcon from "@/components/common/AnimatedSvgIcon";
const iconPaths = {
  users: "/icons/UserSpeakIcon.svg",
  tools: "/icons/MaintenanceIcon.svg",
  pending: "/icons/PendingUser.svg",
  clock: "/icons/TimeTracking.svg",
  task: "/icons/TaskClock.svg",
};
import NoSelector from "@/components/common/Noselector";
import { useInView } from "framer-motion";

interface Solution {
  icon: string;
  title: string;
  description: string;
}

const solutions: Solution[] = [
  {
    icon: iconPaths.users,
    title: "Leasing of Employees",
    description:
      "We provide you with a full-time workforce that is managed by us. This way, you can focus on your business goals without worrying about administrative details and legal complexities.",
  },
  {
    icon: iconPaths.tools,
    title: "Execution of Works",
    description:
      "A near-perfect solution for emergencies where our best employees come to work for you in just a few days. Our rapid deployment system ensures minimal disruption to your operations while maintaining quality standards.",
  },
  {
    icon: iconPaths.task,
    title: "Mediation in Employment",
    description:
      "You are the employer, and we take care of quality employee selection. Our comprehensive screening process ensures you get the right talent while we handle all the complexities of recruitment and compliance.",
  },
  {
    icon: iconPaths.pending,
    title: "Temporary Employment",
    description:
      "We find, select, and employ workers and assign them to your business entity. Our temporary staffing solutions provide flexibility while maintaining high standards of quality and reliability in workforce management.",
  },
  {
    icon: iconPaths.clock,
    title: "From Leasing to Mediation",
    description:
      "Avoid risk and save valuable time by having the agency become your employer during the probation period. This way you can focus on your business goals without worrying about administrative details and legal complexities.",
  },
];

const Solution = () => {
  const [titleIndex, setTitleIndex] = useState<number>(0);
  const titles = useMemo(() => ["Solution", "Support"], []);
  const [api, setApi] = useState<CarouselApi>();
  const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMouseOver = useRef(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.3 });

  // Title animation with optimized RAF
  useEffect(() => {
    if (!isInView) return;

    let rafId: number;
    const intervalTime = 3000;
    let lastAnimationTime = Date.now();

    const animate = () => {
      const now = Date.now();
      if (now - lastAnimationTime >= intervalTime) {
        setTitleIndex(prev => prev === 0 ? 1 : 0);
        lastAnimationTime = now;
      }
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isInView]);

  // Optimized autoplay
  const startAutoplay = useCallback(() => {
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
    }

    if (!isMouseOver.current && !isScrollingRef.current && isInView) {
      autoplayTimeoutRef.current = setTimeout(() => {
        api?.scrollNext();
      }, 4000);
    }
  }, [api, isInView]);

  // Optimized scroll handling with IntersectionObserver
  useEffect(() => {
    if (!api) return;

    const handleScroll = () => {
      if (scrollTimeoutRef.current) return;

      isScrollingRef.current = true;
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
        scrollTimeoutRef.current = null;
        if (isInView && !isMouseOver.current) {
          startAutoplay();
        }
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [api, isInView, startAutoplay]);

  // Pre-computed styles
  const cardStyles = useMemo(() => cn(
    "border-none h-full carousel-card",
    "hover:bg-primary/20",
    "cursor-grab active:cursor-grabbing",
    "transform-gpu will-change-transform"
  ), []);

  // Memoized card rendering
  const renderCard = useCallback((solution: Solution, index: number) => (
    <CarouselItem
      key={index}
      className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 will-change-transform"
    >
      <Card className={cardStyles}>
        <CardContent className="p-6 flex flex-col h-full">
          <div className="space-y-6 flex-1 flex flex-col">
            <div className="p-4 rounded-lg bg-primary/10 w-fit">
              <AnimatedSvgIcon
                iconSrc={solution.icon}
                className="w-10 h-10 sm:w-12 sm:h-12 relative transform-gpu"
              />
            </div>
            <NoSelector>
              <div className="flex-1 flex flex-col justify-between space-y-4">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 line-clamp-2">
                  {solution.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {solution.description}
                </p>
              </div>
            </NoSelector>
          </div>
        </CardContent>
      </Card>
    </CarouselItem>
  ), [cardStyles]);

  return (
    <section 
      ref={sectionRef} 
      className="py-20 relative transform-gpu"
    >
      <div className="container mx-auto px-4 relative">
        {/* Title with Animation */}
        <div className="text-center space-y-4 mb-12 relative">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Find{" "}
            <AnimatePresence mode="wait">
              {isInView && (
                <motion.span
                  key={titleIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ 
                    duration: 0.4,
                    ease: "easeOut"
                  }}
                  className="text-primary inline-block transform-gpu"
                >
                  {titles[titleIndex]}
                </motion.span>
              )}
            </AnimatePresence>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We have developed several business models that are fully tailored to
            your needs.
          </p>
        </div>

        {/* Optimized Solutions Carousel */}
        <div className="relative px-4 sm:px-12 transform-gpu">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              skipSnaps: true, 
              dragFree: true  
            }}
            setApi={setApi}
            className="w-full carousel-container relative"
          >
            <CarouselContent className="-ml-2 md:-ml-4 carousel-container relative">
              {solutions.map(renderCard)}
            </CarouselContent>

            {/* Updated Navigation Arrows */}
            <div className="absolute -left-4 sm:-left-12 -right-4 sm:-right-12 top-1/2 -translate-y-1/2 flex justify-between w-[calc(100%+2rem)] sm:w-[calc(100%+6rem)] z-10">
              <CarouselPrevious
                className={cn(
                  "h-8 w-8 sm:h-10 sm:w-10",
                  "rounded-full",
                  "border border-gray-200",
                  "bg-primary",
                  "absolute",
                  "-left-4 sm:-left-12",
                  "transform -translate-y-1/2",
                  "shadow-sm",
                  "opacity-100",
                  "!flex !items-center !justify-center"
                )}
              />
              <CarouselNext
                className={cn(
                  "h-8 w-8 sm:h-10 sm:w-10",
                  "rounded-full",
                  "border border-gray-200",
                  "bg-primary",
                  "absolute",
                  "-right-4 sm:-right-12",
                  "transform -translate-y-1/2",
                  "shadow-sm",
                  "opacity-100",
                  "!flex !items-center !justify-center"
                )}
              />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Solution;