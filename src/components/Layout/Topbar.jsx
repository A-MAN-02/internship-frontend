import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io5";
import { RiTwitterXLine } from "react-icons/ri";
import { FiPhoneCall } from "react-icons/fi";

const Topbar = () => {
    return (
        <div className="bg-[#111] text-white">
            <div className="container mx-auto flex justify-between items-center py-2 px-4">
                <div className="hidden md:flex items-center space-x-4">
                    <a href="#" className="hover:text-gray-300">
                        <TbBrandMeta className="h-5 w-5" />
                    </a>
                    <a href="#" className="hover:text-gray-300">
                        <IoLogoInstagram className="h-4 w-4" />
                    </a>
                    <a href="#" className="hover:text-gray-300">
                        <RiTwitterXLine className="h-4 w-4" />
                    </a>
                </div>
                <div className="text-sm text-center ">
                    <span>Pet Pursu – Reliable, caring, and committed to the happiness of every pet and pet parent</span>
                </div>
                <div className="text-sm hidden md:block">
                    <FiPhoneCall className = "inline-block mr-2 cursor-pointer" />
                    <a href="tel:+91 7488 336 950" className="hover:text-gray-300">+91 7488336950</a>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
