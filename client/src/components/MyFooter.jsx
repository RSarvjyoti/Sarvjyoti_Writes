import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaFacebook, FaInstagram} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const MyFooter = () => {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1 ">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-700 to-pink-400 rounded-lg text-white">
                Sarvjyoti
              </span>
              Writes
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://sarvjyoti.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Portfolio
                </Footer.Link>
                <Footer.Link
                  href="https://leetcode.com/u/SARVJYOTI0508/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Leetcode
                </Footer.Link>
                <Footer.Link
                  href="https://medium.com/@sarvjyoti055"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Medium
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.linkedin.com/in/sarvjyoti05/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Footer.Link>
                <Footer.Link
                  href="https://github.com/RSarvjyoti"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Footer.Link>
                <Footer.Link
                  href="https://x.com/i/flow/login?redirect_after_login=%2FSarvjyoti4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  X
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="#"
                >
                  Privacy Policy
                </Footer.Link>
                <Footer.Link
                  href="#"
                >
                  Terms & Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>

        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="Sarvjyoti Writes" year={new Date().getFullYear()}/>
        </div>
        <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
          <Footer.Icon href="https://www.linkedin.com/in/sarvjyoti05/" icon={FaLinkedin} />
          <Footer.Icon href="https://x.com/i/flow/login?redirect_after_login=%2FSarvjyoti4" icon={FaXTwitter} />
          <Footer.Icon href="#" icon={FaFacebook} />
          <Footer.Icon href="#" icon={FaInstagram} />
        </div>
      </div>
    </Footer>
  );
};

export default MyFooter;