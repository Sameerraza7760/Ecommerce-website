import React, { useState } from "react";

import "./style.css";
import { Input } from "antd";
function Footer() {
  const [value, setValue] = useState("");

  return (
    <footer className="bg-gray-800 text-white p-4 h-auto">
      <div className="container mx-auto">
        <div className="footer1Container flex flex-wrap gap-5 justify-center">
          <div className="innerFooterDiv mt-[10%] w-[30%]">
            <h3 className="footer-heading text-lg font-bold mb-2">About Us</h3>
            <p className="text-bold font-serif text-sm">
              GROOVY has set out to Infuse art, culture & purpose-driven
              clothing in each of its collectives. With a mission to diminish
              the line between high-end fashion & streetwear, to create a more
              unified & affordable clothing line.
            </p>
            <br />
            <br />

            <p>Join the mission today. #groovy</p>
            <span>email groovypakistan@gmail.com</span>
          </div>

          {/* Footer Column 2 */}
          <div className="innerFooterDiv mt-[10%] w-[30%]">
            <h1 className="text-lg font-semibold mb-2">
              Subscribe to our newsletter
            </h1>
            <p>Exclusive deals, coupon codes & much more</p>
            <br />
            <Input placeholder="Your Name" />
            <br />
            <br />
            <Input placeholder="Your Email" />
            <p>Email me with news and offers</p>
            <button className="h-[50px] w-[200px] text-grey-900 font-bold mt-2 text-black bg-slate-50 rounded-md shadow-md">
              SUBSCRIBE
            </button>
          </div>

          {/* Footer Column 3 */}
          <div className="innerFooterDiv mt-[10%] w-[30%]">
            <h1 className="text-lg font-semibold mb-2">Customer Support</h1>
            <ul>
              <li>
                <p>Contact Information</p>
              </li>
              <li>
                <p>Exchange/Return Policy</p>
              </li>
              <li>
                <p>Shipping Policy</p>
              </li>
              <li>
                <p>Privacy Policy</p>
              </li>
              <li>
                <p>Terms of Service</p>
              </li>
              {/* Add more links as needed */}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
