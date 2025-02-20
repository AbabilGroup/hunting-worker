import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { Calendar, Users, FileCheck2, Plane } from "lucide-react";
import { CardContainer, CardBody } from "@/components/ui/3d-card";

const processSteps = [
  {
    icon: Calendar,
    title: "Project Assessment",
    duration: "A few days",
    description: "Through joint communication, we precisely determine your needs and assess the project. After an assessment is completed, we begin cooperation through order fulfillment and contract signing.",
  },
  {
    icon: Users,
    title: "Recruitment and Selection",
    duration: "up to 30 days",
    description: "Upon signing the contract, we initiate recruitment and selection procedures. This process includes collecting candidate applications, conducting selection procedures, interviewing candidates, verifying worker documentation authenticity, and conducting testing in the worker's home country.",
  },
  {
    icon: FileCheck2,
    title: "Issuing Permits",
    duration: "up to 90 days",
    description: "Once we have precisely defined your needs and identified suitable workers, we can begin the process of issuing permits for them to work in the UK, Croatia, Malta, Bulgaria, Poland, Romania, and other European countries. This process is carried out in cooperation with relevant authorities.",
  },
  {
    icon: Plane,
    title: "Worker arrival",
    duration: "within 15 days",
    description: "The final step includes flight arrangements for workers, accommodation preparation, residence registration, issuance of residence cards, opening bank accounts, as well as additional activities such as medical examinations and occupational safety training.",
  },
];

const Process = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Modified transform values for desired scroll behavior
  const translateLeft = useTransform(scrollYProgress, [0, 1], [200, -150]);
  const translateRight = useTransform(scrollYProgress, [0, 1], [200, -150]);
  const translateMiddleTop = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section className="py-12 md:py-20 overflow-hidden" ref={containerRef}> {/* Reduced padding for mobile */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6  max-w-7xl mx-auto"> {/* Reduced gap for mobile */}
          {/* Desktop Layout - First Card with Title */}
          <div className="relative hidden md:block">
            {/* Title Section - Positioned above first card */}
            <motion.div 
              className="absolute top-32 left-2 z-10 mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                The Process of Hiring Foreign Workers
              </h2>
              <p className="text-sm md:text-base text-gray-600">
                A comprehensive approach to international recruitment
              </p>
            </motion.div>

            <motion.div
              style={{ y: translateLeft }}
              className="h-full lg:mt-18" 
            >
              <CardContainer className="w-full">
                <ProcessCard step={processSteps[0]} index={0} />
              </CardContainer>
            </motion.div>
          </div>

          {/* Middle Column - Second and Third Cards */}
          <div className="hidden md:flex flex-col -space-y-24 mt-20"> {/* Added mt-16 to move second card down */}
            {[1, 2].map((index) => (
              <motion.div
                key={processSteps[index].title}
                style={{ y: translateMiddleTop }}
                initial={{ opacity: 0, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="transform-gpu"
              >
                <CardContainer className="w-full">
                  <ProcessCard step={processSteps[index]} index={index} />
                </CardContainer>
              </motion.div>
            ))}
          </div>

          {/* Right Column - Fourth Card */}
          <motion.div
            style={{ y: translateRight }}
            className="hidden md:block h-full lg:mt-18" 
          >
            <CardContainer className="w-full">
              <ProcessCard step={processSteps[3]} index={3} />
            </CardContainer>
          </motion.div>

          {/* Mobile Layout - Title needs to be visible on mobile */}
          <div className="md:hidden">
            {/* Mobile Title */}
            <motion.div 
              className="mb-8" 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-lg sm:text-xl font-bold text-primary mb-1"> {/* Adjusted text size */}
                The Process of Hiring Foreign Workers
              </h2>
              <p className="text-xs sm:text-sm text-gray-600"> {/* Adjusted text size */}
                A comprehensive approach to international recruitment
              </p>
            </motion.div>

            {/* Mobile Cards */}
            <div className="space-y-3"> {/* Reduced space between cards */}
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-lg p-3 shadow-md" // Reduced padding
                >
                  <div className="flex items-start gap-2 sm:gap-3"> {/* Reduced gap */}
                    <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg shrink-0"> {/* Reduced padding */}
                      <step.icon className="w-4 h-4 text-primary" /> {/* Fixed icon size */}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1.5 gap-1"> {/* Reduced margin */}
                        <h3 className="font-semibold text-sm text-gray-900 line-clamp-1">
                          {step.title}
                        </h3>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full whitespace-nowrap self-start">
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Separate ProcessCard component for better organization
const ProcessCard = ({ step, index }: { step: typeof processSteps[0]; index: number }) => {
  const Icon = step.icon;
  
  return (
    <CardBody className="bg-white rounded-xl p-8 shadow-lg flex flex-col h-full min-h-[450px]">
      {/* Duration Badge */}
      <div className="absolute top-4 right-4">
        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
          {step.duration}
        </span>
      </div>

      {/* Icon and Title */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="p-4 bg-primary/10 rounded-xl mb-4 transform transition-transform duration-300 hover:scale-110">
          <Icon className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-bold text-xl md:text-2xl text-gray-900 mb-2">
          {step.title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-base leading-relaxed flex-grow">
        {step.description}
      </p>
    </CardBody>
  );
};

export default Process;