import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4 text-center">
      <div>
        Dreamers den - Library Management System &copy;{" "}
        {new Date().getFullYear()}
      </div>
    </footer>
  );
}

export default Footer;
