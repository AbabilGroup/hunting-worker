import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Twitter, MapPin } from 'lucide-react';

const Footer = () => {
  const locations = [
    {
      country: "UAE",
      address: "Omlaat Street - Trade Centre - DIFC - Dubai - United Arab Emirates"
    },
    {
      country: "KSA",
      address: "Ar Rayyan, Al-Kharj 16277, Saudi Arabia"
    },
    {
      country: "Bangladesh",
      address: "H # 34, R # 4 Sonargaon Janapath, Dhaka 1230"
    },
    {
      country: "Pakistan",
      address: "Quaid-E-Azam Rd, Block No. 8 Block 8, Dera Ghazi Khan, Punjab, Pakistan"
    },
    {
      country: "Sri Lanka",
      address: "136b High Level Rd, Nugegoda 10250, Sri Lanka"
    },
    {
      country: "Nepal",
      address: "Thamel Marg, Kathmandu 44600, Nepal"
    }
  ];

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Company Info & Social */}
          <div className="lg:col-span-4">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 md:mb-6">
                  About Us
                </h3>
                <div className="relative">
                  <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed md:leading-relaxed lg:leading-relaxed">
                    Hunting Worker is registered for activities related to employment mediation 
                    and temporary employment of workers.
                  </p>
                  <div className="absolute -left-4 top-0 bottom-0 w-1 bg-primary rounded-full"></div>
                </div>
              </div>
              
              {/* Social Icons */}
              <div className="flex space-x-4 md:space-x-6 pt-4 md:pt-6">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className="text-gray-400 hover:text-primary transition-all duration-300 transform hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Locations Grid */}
          <div className="lg:col-span-8">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 md:mb-6 lg:mb-8">
              Our Global Presence
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {locations.map((location, index) => (
                <div key={index} className="group flex items-start space-x-3 p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-300">
                  <MapPin className="h-5 w-5 md:h-6 md:w-6 text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h4 className="text-base md:text-lg font-semibold text-gray-800 mb-1 md:mb-2">
                      {location.country}
                    </h4>
                    <p className="text-xs md:text-sm lg:text-base text-gray-600 leading-relaxed">
                      {location.address}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-12 md:mt-16 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-xs md:text-sm lg:text-base text-gray-500 text-center md:text-left">
              Copyright © {new Date().getFullYear()} Huntingworker LLC. All rights reserved.
            </div>
            <div className="flex items-center space-x-6">
              <Link 
                href="/privacy" 
                className="text-gray-600 hover:text-primary transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <span className="text-gray-300">|</span>
              <Link 
                href="/policy" 
                className="text-gray-600 hover:text-primary transition-colors text-sm"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;