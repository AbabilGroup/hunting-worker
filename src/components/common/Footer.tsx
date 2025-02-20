import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 py-6 sm:py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Main Text */}
          <div className="max-w-2xl text-gray-600 text-center md:text-left text-sm sm:text-base md:text-lg lg:text-xl">
            Hunting Worker is registered for activities related to employment mediation 
            and temporary employment of workers.
          </div>

          {/* Links and Copyright */}
          <div className="flex flex-col items-center md:items-end space-y-3 md:space-y-4">
            <div className="space-x-6 text-sm sm:text-base md:text-lg">
              <Link 
                href="/privacy" 
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Privacy
              </Link>
              <Link 
                href="/policy" 
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Policy
              </Link>
            </div>
            <div className="text-gray-500 text-sm sm:text-base md:text-lg">
              © {currentYear} Hunting Worker. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;