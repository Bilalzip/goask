import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
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
              <p>960 William Street, Thunder Bay, Ontario</p>
            </address>
            <div className="mb-4">
              <p>Contact</p>
              <a href="tel:18001234567" className="text-green-500">
                1800 123 4567
              </a>
            </div>
            <div className="flex space-x-6 mb-6">
              <a
                href="https://www.instagram.com/hilarious_bilal/"
                aria-label="Instagram"
                className="text-green-500 text-2xl"
              >
                <FaInstagram />
              </a>
                            <a
                href="https://www.linkedin.com/in/mohd-bilal-b9a0b71a8/"
                aria-label="LinkedIn"
                className="text-green-500 text-2xl"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://www.youtube.com/@Codewithbilal123"
                aria-label="YouTube"
                className="text-green-500 text-2xl"
              >
                <FaYoutube />
              </a>
            </div>
            <div className="text-center text-gray-400 mb-4">
  <p>Built with <span className="text-red-500">{'\u2764'}</span> by <a href="https://www.cloudbybilal.com/" className="text-yellow-400 hover:underline">Cloud By Bilal</a></p>
</div>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;



