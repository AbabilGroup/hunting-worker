"use client";

import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqItems = [
  {
    question: "From which countries do you hire workers?",
    answer: "Following models used in developed Middle Eastern countries, Recruitment4u specializes in importing workers from Nepal, the Philippines, and India."
  },
  {
    question: "How long does the process of hiring foreign workers take?",
    answer: "The process takes between 90 and 120 days, depending on the requested job position, choice of recruitment center, and location where the work permit is issued."
  },
  {
    question: "Do I need to arrange accommodation for foreign workers?",
    answer: "Foreign workers need accommodation upon arrival to work in their destinations. This can also be arranged by the agency in agreement with the employer."
  },
  {
    question: "What distinguishes hiring foreign workers?",
    answer: "Foreign workers require a residence permit and work visa to enter the UK, Croatia, Malta, Bulgaria, Poland, Romania, or any other European country. Additionally, the process of integrating them into their workplace is more extensive and includes arranging accommodation, registering residence, issuing residence cards (biometric residence permits), and opening bank accounts."
  },
  {
    question: "How does a foreign worker register for pension and health insurance?",
    answer: "Upon registering their residence, the Home Office issues a National Insurance Number based on which they can register for pension and health insurance. Before registration, employers must obtain a Work Permit for foreign workers."
  },
  {
    question: "What are the conditions for hiring foreign workers?",
    answer: "Several conditions must be met: The company must have been operating for more than six months, must have employed at least one UK citizen over that period, and must not have tax or contribution debts. Additionally, other elements are considered when hiring foreign workers: financial performance of the business entity, number of employees, and whether the employer is engaged in activities for which they are hiring foreigners."
  },
  {
    question: "What language do foreign workers speak?",
    answer: "To meet our criteria for coming to work in Europe, workers need basic or advanced knowledge of English, depending on their job position and employer preferences."
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