import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
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

  useEffect(() => {
    return () => {
      scrollYProgress.destroy();
    };
  }, [scrollYProgress]);

  const translateLeft = useTransform(scrollYProgress, [0, 1], [100, -80]);
  const translateRight = useTransform(scrollYProgress, [0, 1], [100, -80]);
  const translateMiddleTop = useTransform(scrollYProgress, [0, 1], [0, 80]); 
  const translateTitle = useTransform(scrollYProgress, [0, 1], [100, -80]);

  return (
    <section className="py-8 md:py-16 lg:py-20 overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-7xl mx-auto">
          <div className="relative hidden md:block">
            <motion.div 
              className="absolute top-16 left-2 z-10" 
              style={{ y: translateTitle }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold text-primary mb-4">
                The Process of Hiring Foreign Workers
              </h2>
              <p className="text-sm lg:text-base text-gray-600">
                A comprehensive approach to international recruitment
              </p>
            </motion.div>

            <motion.div
              style={{ y: translateLeft }}
              className="h-full mt-52" 
            >
              <CardContainer className="w-full">
                <ProcessCard step={processSteps[0]} index={0} />
              </CardContainer>
            </motion.div>
          </div>

          {/* Middle Column - Second and Third Cards */}
          <div className="hidden md:flex flex-col space-y-8 lg:space-y-12 mt-32"> 
            {[1, 2].map((index) => (
              <motion.div
                key={processSteps[index].title}
                style={{ y: translateMiddleTop }}
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: "easeOut" 
                }}
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
            className="hidden md:block h-full mt-32" 
          >
            <CardContainer className="w-full">
              <ProcessCard step={processSteps[3]} index={3} />
            </CardContainer>
          </motion.div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            {/* Mobile Title */}
            <motion.div 
              className="mb-8" 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-lg sm:text-xl font-bold text-primary mb-1"> 
                The Process of Hiring Foreign Workers
              </h2>
              <p className="text-xs sm:text-sm text-gray-600"> 
                A comprehensive approach to international recruitment
              </p>
            </motion.div>

            {/* Mobile Cards */}
            <div className="space-y-6"> 
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-lg p-6 shadow-md"
                >
                  <div className="flex flex-col gap-4"> 
                    <div className="flex items-center justify-between"> 
                      <h3 className="font-semibold text-base text-gray-900"> 
                        {step.title}
                      </h3>
                      <div className="p-3 bg-primary/10 rounded-lg shrink-0"> 
                        <step.icon className="w-6 h-6 text-primary" /> 
                      </div>
                    </div>
                    
                    <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full w-fit"> 
                      {step.duration}
                    </span>
                    
                    <p className="text-sm text-gray-600 leading-relaxed mt-2"> 
                      {step.description}
                    </p>
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

const ProcessCard = ({ step }: { step: typeof processSteps[0]; index: number }) => {
  const Icon = step.icon;
  
  return (
    <CardBody className="bg-white rounded-xl p-4 sm:p-5 lg:p-6 shadow-lg flex flex-col h-full 
      min-h-[300px] lg:min-h-[320px] relative transition-all duration-300 hover:bg-primary/5 group">
      {/* Duration badge */}
      <div className="absolute top-3 right-3">
        <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium
          group-hover:bg-primary/20">
          {step.duration}
        </span>
      </div>

      {/* Icon and Title Container */}
      <div className="flex flex-col items-start text-left space-y-3">
        <div className="p-3 bg-primary/10 rounded-xl transform transition-all duration-300 
          hover:scale-110 group-hover:bg-primary/20">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="font-bold text-lg lg:text-xl text-gray-900
          group-hover:text-primary transition-colors duration-300">
          {step.title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed mt-3
        group-hover:text-gray-700 transition-colors duration-300">
        {step.description}
      </p>
    </CardBody>
  );
};

export default Process;