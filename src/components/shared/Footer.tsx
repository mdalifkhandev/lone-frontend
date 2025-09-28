import Link from "next/link";
import Image from "next/image";
import { CiLocationOn, CiPhone } from "react-icons/ci";
import { MdOutlineMailOutline } from "react-icons/md";

import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-red-950 w-full px-5 py-6 md:px-14 lg:px-18 text-gray-300">
      <div className="flex flex-col md:flex-row justify-start md:justify-between items-start gap-7 md:gap-0">
        <div>
          <Image 
            className="bg-white p-2 rounded-xl" 
            src={logo} 
            alt="Logo" 
            width={120} 
            height={40}
          />
          <p className="text-sm mt-2 max-w-sm">
            Empowering financial decisions through transparent credit scoring 
            and connecting borrowers with trusted lenders.
          </p>
        </div>
        <div>
          <h3 className="text-md font-medium">Quick Links</h3>
          <ul className="text-sm">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-md font-medium">Contact Us</h3>
          <ul className="text-sm">
            <li className="flex items-center gap-1">
              <CiLocationOn size={17}/>123 Finance Street Douala, Cameroon
            </li>
            <li className="flex items-center gap-1">
              <CiPhone size={17}/>+237 123 456 789
            </li>
            <li className="flex items-center gap-1">
              <MdOutlineMailOutline size={17}/>info@creditmatch.com
            </li>
          </ul>
        </div>
      </div>
      <div className="divider divider-primary h-px bg-gray-600 my-4 mt-20"></div>
      <div className="flex flex-col md:flex-row justify-between items-center text-sm">
        <p className="mb-2 md:mb-0">© 2025 GUEHI AND CO. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <p>|</p>
          <Link href="/terms-of-service">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;