import { useEffect, useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { CarouselApi } from "@/components/ui/carousel";
import NoSelector from "@/components/common/Noselector"; 
import dynamic from 'next/dynamic';
import { memo } from 'react';

// Lazy load motion components
const MotionDiv = dynamic(() => import('framer-motion').then(mod => mod.motion.div), {
  ssr: false
});

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

// Memoize CarouselSlide component
const CarouselSlide = memo(({ center }: { center: typeof centers[0] }) => (
  <CarouselItem className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3 cursor-grab active:cursor-grabbing">
    <Card className="border-none h-full transition-all duration-300 hover:bg-primary group">
      <CardContent className="p-6">
        <NoSelector>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={center.image}
              alt={center.country}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-all duration-300 grayscale group-hover:grayscale-0 group-hover:scale-110 pointer-events-none"
            />
          </div>
        </NoSelector>
        <NoSelector className="mt-6 space-y-3">
          <h3 className="text-lg sm:text-xl font-semibold text-black transition-colors duration-300 group-hover:text-white">
            {center.country}
          </h3>
          <p className="text-black text-sm leading-relaxed line-clamp-4 transition-colors duration-300 group-hover:text-white/90">
            {center.description}
          </p>
        </NoSelector>
      </CardContent>
    </Card>
  </CarouselItem>
));

CarouselSlide.displayName = 'CarouselSlide';

const AUTO_PLAY_INTERVAL = 5000;

// Use in both components
const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      duration: 0.3,
      staggerChildren: 0.1 
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  }
};

const RecruitmentCenters = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(false);
  }, []);
  
  useEffect(() => {
    if (!api) return;

    const handleSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", handleSelect);

    const timer = setInterval(() => api.scrollNext(), AUTO_PLAY_INTERVAL);

    return () => {
      api.off("select", handleSelect);
      clearInterval(timer);
    };
  }, [api]);

  const carouselItems = useMemo(() => (
    centers.map((center) => (
      <CarouselSlide
        key={center.country}
        center={center}
      />
    ))
  ), []);

  return (
    <section className="py-16 sm:py-20 lg:py-40 overflow-hidden">
      {!isLoading && (
        <div className="container mx-auto px-4">
          <MotionDiv 
            className="text-center mb-8 sm:mb-12 lg:mb-20"
            initial="initial"
            animate="animate"
            variants={pageVariants}
          >
            <MotionDiv 
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary"
              initial="initial"
              animate="animate"
              variants={itemVariants}
            >
              Recruitment Centers
            </MotionDiv>
            <MotionDiv 
              className="text-black max-w-2xl mx-auto mt-4"
              initial="initial"
              animate="animate"
              variants={itemVariants}
            >
              The choice of country depends on the required occupation of workers,
              working conditions as well as employer preferences.
            </MotionDiv>
          </MotionDiv>

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

            <div className="flex justify-center gap-2 mt-8">
              {centers.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all",
                    current === index
                      ? "bg-primary scale-125"
                      : "bg-gray-300 hover:bg-primary/50"
                  )}
                  onClick={() => api?.scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RecruitmentCenters;