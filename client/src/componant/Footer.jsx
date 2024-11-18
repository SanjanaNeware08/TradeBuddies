import React from 'react';

function Footer() {
  return (
    <div className="bg-transparent text-black py-6">
      <div className="flex justify-center space-x-6 mb-4">
        <i className="fa-brands fa-square-instagram text-2xl hover:text-pink-500"></i>
        <i className="fa-brands fa-square-whatsapp text-2xl hover:text-green-500"></i>
        <i className="fa-brands fa-twitter text-2xl hover:text-blue-400"></i>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-sm text-gray-400 mb-1">
          <i className="fa-regular fa-copyright"></i> 2024
        </div>
        <p className="text-black-300 font-light">Made by - Sanjana</p>
      </div>
    </div>
  );
}

export default Footer;
