"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function JobForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    citizenship: '',
    residence: '',
    email: '',
    phone: '',
    desiredPosition: '',
    workLocation: '',
    expectedSalary: '',
    cv: null as File | null,
    note: '',
    agreeToPrivacy: false,
    agreeToDataRetention: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        cv: e.target.files![0]
      }));
    }
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
            Work Without Risk
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
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  Move Towards a Better Future
                </h2>
                <p className="text-base sm:text-lg text-black">
                  Apply for a job, and we will connect you with the right employer. Our mission is to ensure that every step of your employment journey is safe, transparent, and filled with trust.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {[
                    { id: 'fullName', label: 'Full Name', type: 'text' },
                    { id: 'citizenship', label: 'Citizenship', type: 'text' },
                    { id: 'residence', label: 'Place of Residence', type: 'text' },
                    { id: 'email', label: 'Email Address', type: 'email' },
                    { id: 'phone', label: 'Phone Number', type: 'tel' },
                    { id: 'desiredPosition', label: 'Desired Job Position', type: 'text' },
                    { id: 'workLocation', label: 'Desired Work Location', type: 'text' },
                    { id: 'expectedSalary', label: 'Expected Salary (40 hours per week)', type: 'text' },
                  ].map(field => (
                    <div key={field.id}>
                      <label htmlFor={field.id} className="block text-sm font-medium text-black mb-1.5 sm:mb-2">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        id={field.id}
                        name={field.id}
                        value={formData[field.id as keyof typeof formData] as string}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-sm sm:text-base"
                        required
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label htmlFor="cv" className="block text-sm font-medium text-black mb-1.5 sm:mb-2">
                    Please attach your CV
                  </label>
                  <input
                    type="file"
                    id="cv"
                    name="cv"
                    onChange={handleFileChange}
                     className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-sm sm:text-base text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    accept=".pdf,.doc,.docx"
                    required
                  />
                </div>

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
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-sm sm:text-base"
                  />
                </div>

                <div className="space-y-5"> {/* Reduced vertical spacing */}
                  <div className="flex items-start gap-3"> {/* Simplified spacing */}
                    <input
                      type="checkbox"
                      id="agreeToPrivacy"
                      name="agreeToPrivacy"
                      checked={formData.agreeToPrivacy}
                      onChange={handleChange}
                      className="mt-1.5 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      required
                    />
                    <label 
                      htmlFor="agreeToPrivacy" 
                      className="text-xs sm:text-sm leading-relaxed text-black max-w-2xl"
                    > 
                      I confirm that I have read, understood, and agree to the privacy and data processing terms found at the bottom of the page.
                    </label>
                  </div>

                  <div className="flex items-start gap-3"> {/* Simplified spacing */}
                    <input
                      type="checkbox"
                      id="agreeToDataRetention"
                      name="agreeToDataRetention"
                      checked={formData.agreeToDataRetention}
                      onChange={handleChange}
                      className="mt-1.5 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label 
                      htmlFor="agreeToDataRetention" 
                      className="text-xs sm:text-sm leading-relaxed text-black max-w-2xl"
                    > 
                      I would like Recruitment4u to keep my data for 60 months and inform me about future job opportunities. Additionally, I request that they assess my satisfaction with the working conditions at my current job and my expectations for future employment.
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