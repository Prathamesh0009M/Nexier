import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 mt-10 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Us Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Nexier</h3>
            <p className="text-gray-400">
              Nexier is an innovative platform where students can buy and sell academic Old items Join us with DBATU Community. And explore your Friend.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul>
              <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-white">Shop</a></li>
              <li><a href="/dashboard/add-item" className="text-gray-400 hover:text-white">Sell</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white">Contact Us</a></li>
              <li><a href="/T&C" className="text-gray-400 hover:text-white">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="text-gray-400">
              <li>Email: prathameshj776@gmail.com</li>
              {/* <li>Phone: 7499477290</li> */}
              <li>Address: Dbatu University Campus, Lonere</li>
              <li>Contact: 7385077290</li>
              
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400">
          © 2024 Nexier. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
