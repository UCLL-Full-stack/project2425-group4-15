import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white text-black py-6 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Cinescope. All Rights Reserved.</p>
        <div className="footer-links mt-2">
          <a href="/privacy-policy" className="hover:text-gray-700 mx-2">Privacy Policy</a> |
          <a href="/terms-of-service" className="hover:text-gray-700 mx-2">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
