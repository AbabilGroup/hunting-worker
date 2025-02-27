"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactForm() {
  // Update the form fields with proper typing
  const [formData, setFormData] = useState({
    company: '',
    email: '',
    phone: '',
    jobPositions: '',
    workersCount: '',
    note: '',
    agreeToContact: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <>
      <div className="w-full min-w-full bg-primary py-8 sm:py-10 lg:py-12 -mt-24 overflow-hidden">
        <motion.div 
          className="container max-w-full px-4 sm:px-6 pb-8 sm:pb-10 lg:pb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-white pt-16 sm:pt-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            A New Beginning
          </motion.h1>
          <motion.div 
            className="w-24 sm:w-32 h-1 bg-white/20 mx-auto rounded-full mt-4 mb-6 sm:mb-8"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "8rem", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          />
        </motion.div>
      </div>
      
      <div className="w-full py-6 sm:py-8 lg:py-10 relative">
        <div className="container mx-auto px-4 sm:px-6 relative">
          <motion.div 
            className="max-w-4xl mx-auto bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden -mt-16 sm:-mt-20 lg:-mt-28"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-black mb-3">
                  Send us an inquiry
                </h2>
                <p className="text-base sm:text-lg text-black">
                  We will respond as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="space-y-4">
                  {[
                    { id: 'company', label: 'Company', type: 'text' },
                    { id: 'email', label: 'Email Address', type: 'email' },
                    { id: 'phone', label: 'Phone Number', type: 'tel' },
                    { id: 'jobPositions', label: 'Requested Job Positions', type: 'text' },
                    { id: 'workersCount', label: 'Approximate Number of Workers', type: 'text' },
                  ].map(field => (
                    <div key={field.id}>
                      <label htmlFor={field.id} className="block text-sm font-medium text-black mb-1.5 sm:mb-2">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        id={field.id}
                        name={field.id}
                        value={String(formData[field.id as keyof typeof formData])}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-sm sm:text-base text-black"
                        required
                      />
                    </div>
                  ))}

                  <div>
                    <label htmlFor="note" className="block text-sm font-medium text-black mb-1.5 sm:mb-2">
                      Note
                    </label>
                    <textarea
                      id="note"
                      name="note"
                      value={formData.note}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-sm sm:text-base text-black"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="agreeToContact"
                      name="agreeToContact"
                      checked={formData.agreeToContact}
                      onChange={handleChange}
                      className="mt-1.5 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      required
                    />
                    <label 
                      htmlFor="agreeToContact" 
                      className="text-xs sm:text-sm leading-relaxed text-black max-w-2xl"
                    >
                      I agree to be contacted regarding my inquiry. This new page structure provides clear communication about job-seeking services while ensuring users feel secure in their interactions with Recruitment4u.
                    </label>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-primary text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg hover:bg-primary/90 transition-all duration-200 font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}