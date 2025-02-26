import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-5">
      <div className="mb-4">
        <a href="#about" className="text-white hover:text-gray-400 mx-4">About</a>
        <a href="#contact" className="text-white hover:text-gray-400 mx-4">Contact</a>
        <a href="#privacy-policy" className="text-white hover:text-gray-400 mx-4">Privacy Policy</a>
      </div>
      <p>© 2025 TradeX - All Rights Reserved</p>
    </footer>
  );
};

export default Footer;