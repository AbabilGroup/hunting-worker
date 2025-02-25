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
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import AnimatedSvgIcon from "@/components/common/AnimatedSvgIcon";
const iconPaths = {
  users: "/icons/UserSpeakIcon.svg",
  tools: "/icons/MaintenanceIcon.svg",
  pending: "/icons/PendingUser.svg",
  clock: "/icons/TimeTracking.svg",
  task: "/icons/TaskClock.svg",
};

const solutions = [
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
  const titles: string[] = ["Solution", "Support"];
  const [api, setApi] = useState<CarouselApi>();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScrolling = useRef(false);
  const lastScrollY = useRef(0);

  // Title animation interval
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev === 0 ? 1 : 0));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Carousel autoplay with scroll handling
  useEffect(() => {
    if (!api) return;

    const startAutoplay = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (!isScrolling.current) {
        intervalRef.current = setInterval(() => {
          api.scrollNext();
        }, 4000);
      }
    };

    const handleScroll = () => {
      // Get current scroll position
      const currentScrollY = window.scrollY;
      
      // Only process if scroll direction changed significantly
      if (Math.abs(currentScrollY - lastScrollY.current) > 50) {
        lastScrollY.current = currentScrollY;
        
        // Clear existing timers
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        isScrolling.current = true;

        // Debounced scroll end detection
        timeoutRef.current = setTimeout(() => {
          isScrolling.current = false;
          startAutoplay();
        }, 150);
      }
    };

    // Initial autoplay start
    startAutoplay();

    // Event listeners with passive flag for better performance 
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    api.on("select", startAutoplay);
    api.on("pointerDown", () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    });

    // Cleanup all timeouts and event listeners
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      api.off("select", startAutoplay);
    };
  }, [api]); // Only depends on api changes

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Title with Animation */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Find{" "}
            <AnimatePresence mode="wait">
              <motion.span
                key={titleIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-primary inline-block"
              >
                {titles[titleIndex]}
              </motion.span>
            </AnimatePresence>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We have developed several business models that are fully tailored to
            your needs.
          </p>
        </div>

        {/* Solutions Carousel */}
        <div className="relative px-4 sm:px-12">
          {" "}
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {solutions.map((solution, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <Card
                    className={cn(
                      "border-none h-full carousel-card group",
                      "transition-all duration-300",
                      "hover:bg-primary/20", // Increased opacity for hover
                      "cursor-grab active:cursor-grabbing"
                    )}
                  >
                    <CardContent
                      className={cn(
                        "p-6 flex flex-col h-full",
                        "group-hover:scale-[0.98]",
                        "transition-all duration-300",
                        "group-hover:bg-primary/15"
                      )}
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="space-y-6 flex-1 flex flex-col"
                      >
                        {/* Icon Container */}
                        <div className="p-4 rounded-lg bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors duration-300">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <AnimatedSvgIcon
                              iconSrc={solution.icon}
                              className="w-10 h-10 sm:w-12 sm:h-12 relative"
                            />
                          </motion.div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex flex-col justify-between space-y-4">
                          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                            {solution.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed text-sm sm:text-base group-hover:text-gray-700 transition-colors duration-300">
                            {solution.description}
                          </p>
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Updated Navigation Arrows */}
            <div className="absolute -left-4 sm:-left-12 -right-4 sm:-right-12 top-1/2 -translate-y-1/2 flex justify-between w-[calc(100%+2rem)] sm:w-[calc(100%+6rem)]">
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