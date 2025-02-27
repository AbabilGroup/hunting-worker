"use client";

import { Mail, MapPin, Globe } from "lucide-react";
import { motion } from "framer-motion";

interface LocationInfo {
  country: string;
  email: string;
}

interface DepartmentInfo {
  name: string;
  email: string;
}

const locations: LocationInfo[] = [
  { country: "Dubai", email: "dubai@recruitment4u.com" },
  { country: "United Kingdom", email: "uk@recruitment4u.com" },
  { country: "Saudi Arabia", email: "ksa@recruitment4u.com" },
  { country: "Bangladesh", email: "bangladesh@recruitment4u.com" },
  { country: "Pakistan", email: "pakistan@recruitment4u.com" },
  { country: "Sri Lanka", email: "srilanka@recruitment4u.com" },
  { country: "Nepal", email: "nepal@recruitment4u.com" },
];

const departments: DepartmentInfo[] = [
  { name: "Sales Department", email: "info@recruitment4u.com" },
  { name: "Administration", email: "admin@recruitment4u.com" },
  { name: "Temporary Employment", email: "branko@recruitment4u.com" },
  { name: "Recruitment & Careers", email: "job@recruitment4u.com" },
];

export default function Location() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <Globe className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6 tracking-tight">
            Our Global Presence
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Depending on the nature of your request, you can reach out to different departments 
            to ensure we find the best solution as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Regional Offices */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-primary/10 rounded-lg">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Regional Offices</h3>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {locations.map((location, index) => (
                <motion.div
                  key={location.country}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 border border-gray-100 hover:border-primary/20"
                >
                  <h4 className="font-semibold text-gray-900 mb-2">{location.country}</h4>
                  <a
                    href={`mailto:${location.email}`}
                    className="text-gray-600 hover:text-primary transition-colors flex items-center gap-2 text-sm"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="group-hover:underline">{location.email}</span>
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Departments */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Departments</h3>
            </div>
            <div className="grid gap-6">
              {departments.map((dept, index) => (
                <motion.div
                  key={dept.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 border border-gray-100 hover:border-primary/20"
                >
                  <h4 className="font-semibold text-gray-900 mb-2">{dept.name}</h4>
                  <a
                    href={`mailto:${dept.email}`}
                    className="text-gray-600 hover:text-primary transition-colors flex items-center gap-2 text-sm"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="group-hover:underline">{dept.email}</span>
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}