"use client";

import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqItems = [
  {
    question: "Why collaborate with Recruitment4u?",
    answer: "Our role is to connect employers and workers. Working through a recruitment agency ensures greater security and transparency compared to searching for a job independently. We are your bridge to reliable employers."
  },
  {
    question: "Why is working through an agency safer?",
    answer: "Recruitment4u charges fees exclusively to employers. Therefore, we carefully select partners who offer market conditions and have positive financial results. Your safety and satisfaction are our top priorities."
  },
  {
    question: "Does Recruitment4u charge fees to job seekers?",
    answer: "Absolutely not! Our service is free for all candidates. Agencies that charge job seekers risk losing trust and their licenses. We provide access to quality jobs without any hidden costs."
  },
  {
    question: "What is mediation and what is leasing?",
    answer: "Mediation is a service where we connect workers and employers to establish an employment relationship. Leasing, on the other hand, means you are an employee of the agency while working for the employer. In both cases, your rights are protected."
  },
  {
    question: "What is the Net salary?",
    answer: "Net salary is the amount you receive after deductions for taxes, contributions, and surcharges. This is your actual earnings deposited into your account."
  },
  {
    question: "What is gross I and gross II?",
    answer: "Gross I is the base from which contributions and taxes are calculated. Gross II includes all costs that the employer incurs for your salary, including contributions to health insurance."
  },
  {
    question: "Is the salary of an agency worker different from that of a directly employed worker?",
    answer: "No. The employer is required to ensure that the working conditions and salary of an agency worker are equal to those they would have if they were directly employed."
  }
];

const FaqItem = ({ item, isOpen, onToggle }: {
  item: typeof faqItems[0];
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <div className="border-b border-gray-200 last:border-none">
      <button
        className="flex justify-between items-center w-full py-4 text-left"
        onClick={onToggle}
      >
        <span className="text-base md:text-lg font-medium text-black">
          {item.question}
        </span>
        <span className="ml-6 flex-shrink-0">
          {isOpen ? (
            <Minus className="h-6 w-6 text-primary" />
          ) : (
            <Plus className="h-6 w-6 text-primary" />
          )}
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-4 text-black">
          {item.answer}
        </p>
      </motion.div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <FaqItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;