import { FaInstagram, FaWindows, FaLinkedin, FaYoutube } from "react-icons/fa";
import Logo from "@/assets/logo.png";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="items-start">
          <div className="flex flex-col">
            <div className="mb-6">
              <Image
                src={Logo}
                alt="Logo"
                className="h-12"
                height={50}
                width={50}
              />
            </div>
            <address className="not-italic mb-4">
              <p>Level 1, 12 Sample St, Sydney NSW 2000</p>
            </address>
            <div className="mb-4">
              <p>Contact</p>
              <a href="tel:18001234567" className="text-green-500">
                1800 123 4567
              </a>
            </div>
            <div className="flex space-x-6 mb-6">
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="text-green-500 text-2xl"
              >
                <FaInstagram />
              </a>
              <a
                href="https://windows.com"
                aria-label="Windows"
                className="text-green-500 text-2xl"
              >
                <FaWindows />
              </a>
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="text-green-500 text-2xl"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://youtube.com"
                aria-label="YouTube"
                className="text-green-500 text-2xl"
              >
                <FaYoutube />
              </a>
            </div>
            <div className="text-center text-gray-500 mb-4">
              <p>© 2024 Pdt. All rights reserved.</p>
            </div>
          </div>
          <div className="flex space-x-6 text-gray-500 items-end">
            <a href="/privacy-policy" className="hover:text-green-500">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="hover:text-green-500">
              Terms of Service
            </a>
            <a href="/cookies-settings" className="hover:text-green-500">
              Cookies Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
