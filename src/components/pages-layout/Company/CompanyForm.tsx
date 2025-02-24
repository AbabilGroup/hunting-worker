"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CompanyForm() {
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
    // Handle form submission logic here
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <>
      <div className="w-full min-w-full bg-primary py-8 sm:py-10 lg:py-12 -mt-16 overflow-hidden">
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
            Your Partner
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
                <p className="text-base sm:text-lg text-gray-600">
                  Send us an inquiry and we will get back to you as soon as possible
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-sm sm:text-base"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-sm sm:text-base"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-sm sm:text-base"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="jobPositions" className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Requested Job Positions
                    </label>
                    <input
                      type="text"
                      id="jobPositions"
                      name="jobPositions"
                      value={formData.jobPositions}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-sm sm:text-base"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="workersCount" className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Approximate Number of Workers
                    </label>
                    <input
                      type="number"
                      id="workersCount"
                      name="workersCount"
                      value={formData.workersCount}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
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

                <div className="flex items-start space-x-2 sm:space-x-3">
                  <input
                    type="checkbox"
                    id="agreeToContact"
                    name="agreeToContact"
                    checked={formData.agreeToContact}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 sm:h-5 sm:w-5 rounded border-gray-300 text-primary focus:ring-primary"
                    required
                  />
                  <label htmlFor="agreeToContact" className="text-xs sm:text-sm text-gray-600">
                    I agree to be contacted regarding my inquiry. More information can be found in our Privacy Policy at the bottom of the page.
                  </label>
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-primary text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg hover:bg-primary/90 transition-all duration-200 font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Inquiry
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}