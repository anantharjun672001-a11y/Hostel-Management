import React from "react";

const Footer = () => {

  const year = new Date().getFullYear();

  return (

    <footer className="bg-gray-900 text-gray-300 mt-10">

      <div className="max-w-7xl mx-auto px-6 py-4 text-center">

        <p className="text-sm">
          © {year} Hostel Management System
        </p>

        <p className="text-xs text-gray-400 mt-1">
          Built with React, Node.js, MongoDB
        </p>

      </div>

    </footer>

  );

};

export default Footer;