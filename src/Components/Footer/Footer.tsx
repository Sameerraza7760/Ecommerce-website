import React, { useState } from "react";

import "./style.css";
import { Input, Button } from "antd";

// import 'antd/dist/antd.css'
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
  const [value, setValue] = useState("");

  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="mb-8 lg:mb-0 lg:mr-12 lg:w-1/3">
          <h2 className="text-4xl font-bold mb-4">Shop Now</h2>
          <p>Your one-stop shop for all your needs.</p>
        </div>

        <div className="mb-8 lg:mb-0 lg:w-1/3">
          <h2 className="text-4xl font-bold mb-4">Quick Links</h2>
          <ul className="list-none p-0">
            <li className="mb-3">
              <a
                href="/"
                className="hover:text-gray-400 transition duration-300"
              >
                Home
              </a>
            </li>
            <li className="mb-3">
              <a
                href="/shop"
                className="hover:text-gray-400 transition duration-300"
              >
                Shop
              </a>
            </li>
            <li className="mb-3">
              <a
                href="/about"
                className="hover:text-gray-400 transition duration-300"
              >
                About Us
              </a>
            </li>
            <li className="mb-3">
              <a
                href="/contact"
                className="hover:text-gray-400 transition duration-300"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        <div className="mb-8 lg:mb-0 lg:w-1/3">
          <h2 className="text-4xl font-bold mb-4">Connect With Us</h2>
          <div className="flex items-center">
            <a href="#" className="mr-4">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a href="#" className="mr-4">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
          </div>
        </div>

        <div className="text-center">
          <p className="text-lg mb-4">
            &copy; {new Date().getFullYear()} Shop Now. All rights reserved.
          </p>
          <div className="flex items-center">
            <Input
              placeholder="Subscribe to newsletter"
              style={{ width: "200px", padding: "8px" }}
            />
            <Button
              type="primary"
              className="bg-blue-900"
              style={{ marginLeft: "8px" }}
            >
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
