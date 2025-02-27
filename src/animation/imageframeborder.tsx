import { motion } from "framer-motion";
import Image from "next/image";

export const ImageFrameBorder = () => {
  const animatedBorderVariants = {
    animate: {
      borderRadius: [
        "30% 70% 70% 30% / 30% 52% 48% 70%",
        "50% 50% 20% 80% / 25% 80% 20% 75%",
        "67% 33% 47% 53% / 37% 20% 80% 63%",
        "39% 61% 47% 53% / 37% 40% 60% 63%",
        "39% 61% 82% 18% / 74% 40% 60% 26%",
        "50% 50% 53% 47% / 72% 69% 31% 28%",
        "50% 50% 53% 47% / 26% 22% 78% 74%",
        "50% 50% 53% 47% / 26% 69% 31% 74%",
        "20% 80% 20% 80% / 20% 80% 20% 80%",
        "30% 70% 70% 30% / 30% 52% 48% 70%",
      ],
    },
  };

  return (
    <div className="relative aspect-square w-full">
      {/* Animated Border Container */}
      <motion.div
        className="absolute inset-0 z-0 rounded-[30px]"
        variants={animatedBorderVariants}
        animate="animate"
        initial={{
          background: `radial-gradient(circle at 50% 50%, 
            hsl(171 100% 50% / 0.8) 0%, 
            hsl(171 100% 50% / 0.4) 100%
          )`,
          borderRadius: "30% 70% 53% 47% / 26% 46% 54% 74%",
        }}
        style={{
          boxShadow: `
            0 -2vmin 4vmin hsl(171 100% 50% / 0.3) inset,
            0 1vmin 4vmin hsl(171 100% 50% / 0.2) inset,
            0 -2vmin 7vmin hsl(171 100% 50% / 0.4) inset,
            0 0 2vmin hsl(171 100% 50% / 0.2),
            0 0 4vmin hsl(171 100% 50% / 0.2),
            0 0 6vmin hsl(171 100% 50% / 0.2)
          `,
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      />

      <motion.div
        className="absolute inset-0 z-10 overflow-hidden rounded-[30px]"
        variants={animatedBorderVariants}
        animate="animate"
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        <div className="absolute inset-0 bg-black/10 z-10" />
        <div className="relative w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=2340&auto=format&fit=crop"
            alt="Professional team meeting in a modern corporate office"
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
            quality={100}
          />
        </div>
      </motion.div>
    </div>
  );
};
