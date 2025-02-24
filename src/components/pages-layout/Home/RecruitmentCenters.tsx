import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import { useEffect, useState, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import NoSelector from "@/components/common/Noselector";

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

const RecruitmentCenters = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const carouselItems = useMemo(() => {
    return centers.map((center, index) => (
      <CarouselItem
        key={center.country}
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
                {/* Image container */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={center.image}
                    alt={center.country}
                    fill
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
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
  }, []);

  const navigationDots = useMemo(() => {
    return centers.map((_, index) => (
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
    ));
  }, [current, api]);

  useEffect(() => {
    if (!api) return;

    const autoplay = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        api.scrollNext();
      }, 5000);
    };

    autoplay();

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
      autoplay();
    });

    api.on("pointerDown", () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    });

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      api.off("select", autoplay);
    };
  }, [api]);

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