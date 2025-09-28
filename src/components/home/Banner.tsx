'use client';

import Image from "next/image";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";

import banner from "../assets/banner.png";
import Stat from "./Stat";

const Banner = () => {
  return (
    <div className="relative mb-30 md:mb-96 lg:mb-36" style={{marginBottom:'-47px'}}>
      <div className="bg-red-950 flex justify-between flex-col md:flex-row items-center py-8 md:py-11 lg:py-17 px-5 md:px-16 lg:px-20 gap-10">
        <div className="md:space-y-3 space-y-1 w-full md:w-1/2">
          <p className="bg-white/10 text-white font-light rounded-xl text-sm px-2 backdrop-blur-xl inline-block">
            Trusted by 10,000+ clients and lenders
          </p>
          <h1 className="text-3xl leading-20 md:text-4xl lg:text-5xl font-bold text-white">
            Revolutionizing Lending Solutions
          </h1>
          <p className="text-white text-sm">
            Our platform helps clients get fair credit ratings and connects them
            with trusted lenders for faster, more transparent lending decisions
            across multiple industries.
          </p>
          <Link href="/">
            <button className="text-sm text-black bg-[#DBCBB9] px-3 flex justify-between items-center gap-2 py-1 rounded-sm cursor-pointer">
              Get Started as Client <FaLongArrowAltRight size={16} />
            </button>
          </Link>
        </div>
        <div>
          <Image
            src={banner}
            alt="Revolutionizing Lending Solutions banner"
            className="w-full md:w-[400px] lg:w-[600px]"
          />
        </div>
      </div>
      <div className="w-full absolute lg:-bottom-[90px] md:-bottom-[370px] -bottom-[100px]">
        <Stat />
      </div>
    </div>
  );
};

export default Banner;