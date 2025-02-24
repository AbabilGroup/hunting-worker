import dynamic from 'next/dynamic';
import { useEffect, useState, useRef, useMemo, memo, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
const Card = dynamic(() => import("@/components/ui/card").then(mod => mod.Card));
const CardContent = dynamic(() => import("@/components/ui/card").then(mod => mod.CardContent));
const Carousel = dynamic(() => import("@/components/ui/carousel").then(mod => mod.Carousel));
const CarouselContent = dynamic(() => import("@/components/ui/carousel").then(mod => mod.CarouselContent));
const CarouselItem = dynamic(() => import("@/components/ui/carousel").then(mod => mod.CarouselItem));
import { CarouselApi } from "@/components/ui/carousel";
const NoSelector = dynamic(() => import("@/components/common/Noselector"));

const centers = [
  {
    country: "India",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da",
    description:
      "India is a country with a rich culture and history known among other things as a global leader in metal production. Indian workers are renowned for their excellence in this field as well as in information technology and engineering.",
  },
  {
    country: "Philippines",
    image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86",
    description:
      "The Philippines is an island nation in Southeast Asia known for its beautiful beaches and exotic tourism. Filipino workers are known for their dedication and professionalism in the tourism industry as well as in healthcare.",
  },
  {
    country: "Nepal",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
    description:
      "Nepal is known for its high mountains and beautiful landscapes. Since Nepali workers are accustomed to demanding living conditions in high altitudes, they are ideal for jobs in agriculture, manufacturing or warehousing.",
  },
  {
    country: "UAE and Qatar",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
    description:
      "The UAE and Qatar are developed countries where over 90% of the working population consists of foreign workers, most often from Nepal, India, Bangladesh or the Philippines. They serve as a good filter for qualified labor that gains experience, knowledge, and skills from cutting-edge technologies and practices.",
  },
];

const CarouselSlide = memo(({ center, index }: { 
  center: typeof centers[0], 
  index: number 
}) => (
  <CarouselItem
    className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
  >
    <Card className="border-none carousel-card group cursor-grab active:cursor-grabbing h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="space-y-6 flex flex-col h-full"
        >
          <NoSelector>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={center.image}
                alt={center.country}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover filter grayscale hover:grayscale-0 transition-all duration-300 transform group-hover:scale-105"
              />
            </div>
            {/* Content */}
            <div className="space-y-3 mt-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                {center.country}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 line-clamp-4">
                {center.description}
              </p>
            </div>
          </NoSelector>
        </motion.div>
      </CardContent>
    </Card>
  </CarouselItem>
));

CarouselSlide.displayName = 'CarouselSlide';

const RecruitmentCenters = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize carousel items
  const carouselItems = useMemo(() => (
    centers.map((center, index) => (
      <CarouselSlide
        key={center.country}
        center={center}
        index={index}
      />
    ))
  ), []);

  // Memoize navigation dots
  const navigationDots = useMemo(() => (
    centers.map((_, index) => (
      <button
        key={index}
        className={cn(
          "w-2.5 h-2.5 rounded-full transition-all duration-300",
          current === index
            ? "bg-primary scale-125"
            : "bg-gray-300 hover:bg-primary/50"
        )}
        onClick={() => api?.scrollTo(index)}
        aria-label={`Go to slide ${index + 1}`}
      />
    ))
  ), [current, api]);

  // Optimize autoplay with useCallback
  const handleAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      api?.scrollNext();
    }, 5000);
  }, [api]);

  // Cleanup and event handlers
  useEffect(() => {
    if (!api) return;

    handleAutoplay();

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
      handleAutoplay();
    };

    const handlePointerDown = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };

    api.on("select", handleSelect);
    api.on("pointerDown", handlePointerDown);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      api.off("select", handleSelect);
      api.off("pointerDown", handlePointerDown);
    };
  }, [api, handleAutoplay]);

  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
              Recruitment Centers
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The choice of country depends on the required occupation of workers,
              working conditions as well as employer preferences.
            </p>
          </div>
        </div>

        <div className="relative px-4">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent>{carouselItems}</CarouselContent>
          </Carousel>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {navigationDots}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecruitmentCenters;