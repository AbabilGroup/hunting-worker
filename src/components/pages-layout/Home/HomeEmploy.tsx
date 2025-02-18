import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CardContainer, CardBody } from "@/components/ui/3d-card";

const HomeEmploy = () => {
  const stats = [
    {
      number: "1",
      title: "3000 EMPLOYED WORKERS",
      description:
        "In the past two years, we have brought over 5000 third-country nationals to European Countries. With over 10% of the total market for foreign workers, we are a leading agency in mediating the employment of foreign workers.",
    },
    {
      number: "2",
      title: "450+ SATISFIED CLIENTS",
      description:
        "We take pride in having built cooperation with numerous large enterprises as well as small and medium-sized businesses that have had the greatest need for labor during the current economic expansion.",
    },
    {
      number: "3",
      title: "15 HUMAN RESOURCES EXPERTS",
      description:
        "Our team of 15 experts is constantly available to employers, providing maximum quality service for each area of human resources.",
    },
  ];

  return (
    <section className="py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Content and Image Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image Container */}
          <div className="order-1 lg:order-2 mb-8 lg:mb-0">
            <CardContainer className="w-full !p-0" containerClassName="!py-0">
              {" "}
              {/* Added containerClassName */}
              <CardBody className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-300/60 to-red-400/70">
                  <Image
                    src="/employ-1.png"
                    alt="Employment Services"
                    fill
                    className="object-contain p-2 sm:p-4 rounded-lg opacity-85 mix-blend-multiply hover:opacity-90 transition-all duration-300"
                    sizes="(max-width: 640px) 95vw, (max-width: 1024px) 50vw, 40vw"
                    priority
                  />
                </div>
                <div className="absolute inset-0 rounded-lg shadow-xl bg-gradient-to-r from-white/10 to-transparent" />
              </CardBody>
            </CardContainer>
          </div>
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1 space-y-6"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-gray-900">
              Your partner in{" "}
              <span className="text-primary block sm:inline">
                talent recruitment
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
              We specialize in recruiting and selecting foreign workers from
              recruitment centers such as <strong>Bangladesh</strong>, the{" "}
              <strong>Philippines</strong>, <strong>India</strong>,
              <strong>Nepal</strong>, <strong>Malaysia</strong>,{" "}
              <strong>Singapore</strong>, <strong>KSA</strong>,{" "}
              <strong>Qatar</strong>, and the{" "}
              <strong>United Arab Emirates</strong>. From our central offices in{" "}
              <strong>Dubai</strong>, we place workers in countries such as the{" "}
              <strong>UK</strong>, <strong>Croatia</strong>,{" "}
              <strong>Malta</strong>, <strong>Bulgaria</strong>,{" "}
              <strong>Poland</strong>,<strong>Romania</strong>, and other
              European Countries.
            </p>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative mt-12">
          {stats.map((stat, index) => (
            <React.Fragment key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{
                  once: true,
                  amount: 0.3,
                }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 70,
                  damping: 12,
                }}
                className={cn(
                  "p-6",
                  "bg-white shadow-sm",
                  "relative",
                  "hover:shadow-lg transition-all duration-300",
                  "transform hover:-translate-y-1",
                  "rounded-lg"
                )}
              >
                <div className="flex flex-row items-center gap-4 mb-4">
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-primary">
                      <span className="text-2xl font-bold text-primary group-hover:text-white transition-colors duration-300">
                        {stat.number}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {stat.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground pl-16 leading-relaxed">
                  {stat.description}
                </p>
              </motion.div>

              {/* divider position */}
              {(index === 0 || index === 1) && (
                <div
                  className="hidden lg:block absolute w-px bg-gray-200/70"
                  style={{
                    left: `${(index + 1) * (100 / 3)}%`,
                    transform: "translateX(-50%)",
                    height: "85%",
                    top: "8%",
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeEmploy;
