import { Link } from "react-router-dom";
import {
    FaFacebookF,
    FaTwitter,
    FaPinterestP,
    FaLinkedinIn,
    FaTelegramPlane,
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 mt-10">
            {/* TOP FOOTER */}
            <div className="container mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-600">
                {/* ONLINE SHOPPING */}
                <div>
                    <h4 className="text-gray-900 font-semibold mb-4 uppercase">
                        Online Shopping
                    </h4>
                    <ul className="space-y-2">
                        <li className="cursor-pointer hover:text-black">Dogs</li>
                        <li className="cursor-pointer hover:text-black">Cats</li>
                    </ul>
                </div>

                {/* EXPLORE */}
                <div>
                    <h4 className="text-gray-900 font-semibold mb-4 uppercase">
                        Explore
                    </h4>
                    <ul className="space-y-2">
                        <li className="cursor-pointer hover:text-black">Our Story</li>
                        <li className="cursor-pointer hover:text-black">Faqs</li>
                        <li className="cursor-pointer hover:text-black">Blog</li>
                        <li className="cursor-pointer hover:text-black">Contact Us</li>
                    </ul>
                </div>

                {/* QUICK LINKS */}
                <div>
                    <h4 className="text-gray-900 font-semibold mb-4 uppercase">
                        Quick Links
                    </h4>
                    <ul className="space-y-2">
                        <li className="cursor-pointer hover:text-black">
                            <Link to="/profile">My account</Link>
                        </li>
                    </ul>
                </div>

                {/* FOLLOW US */}
                <div>
                    <h4 className="text-gray-900 font-semibold mb-4 uppercase">
                        Follow Us
                    </h4>

                    <div className="flex items-center space-x-4 mb-6">
                        <FaFacebookF className="cursor-pointer hover:text-black" />
                        <FaTwitter className="cursor-pointer hover:text-black" />
                        <FaPinterestP className="cursor-pointer hover:text-black" />
                        <FaLinkedinIn className="cursor-pointer hover:text-black" />
                        <FaTelegramPlane className="cursor-pointer hover:text-black" />
                    </div>

                    <h4 className="text-gray-900 font-semibold mb-2 uppercase">
                        Get in Touch
                    </h4>
                    <p>Email:- support@petpashu.com</p>
                </div>
            </div>

                {/* BOTTOM FOOTER */}
                <div className="border-t border-gray-200 py-4">
                    <div className="container mx-auto px-6 flex flex-col items-center gap-3 text-sm text-gray-600">

                        {/* Copyright Text */}
                        <p className="text-center">
                            © 2025 <span className="font-semibold">Pet Pashu</span> | All Rights Reserved
                        </p>

                        {/* Payment Icons */}
                        <div className="flex items-center gap-3">
                            <img
                                src="https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png"
                                alt="Visa"
                                className="h-6 object-contain"
                            />
                            <img
                                src="https://www.mastercard.co.in/content/dam/public/mastercardcom/in/en/logos/mc-logo-52.svg"
                                alt="MasterCard"
                                className="h-6 object-contain"
                            />
                            <img
                                src="https://th.bing.com/th/id/ODF.taq6ViCNEcC8aKuGENH3-w?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2"
                                alt="PayPal"
                                className="h-6 object-contain"
                            />
                            <img
                                src="https://www.aexp-static.com/cdaas/one/statics/axp-static-assets/1.8.0/package/dist/img/logos/dls-logo-stack.svg"
                                alt="American Express"
                                className="h-6 object-contain"
                            />
                        </div>

                    </div>
                </div>
        </footer >
    );
};

export default Footer;
