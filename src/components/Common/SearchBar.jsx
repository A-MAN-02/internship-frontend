import { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";

const SearchBar = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const handleSearchToggle = () => {
        setIsOpen(!isOpen);
    }
    const handlesearch = (e) => {
        e.preventDefault();
        console.log("Search Term:", searchTerm);
        setIsOpen(false);
    }

    return (

        <div className={`flex items-center justify-center w-full transition-all duration-300 ${isOpen ? "absolute top-0 left-0 w-full bg-white h-25 z-50" : "w-auto"} `}>
            {isOpen ? (
                <form onSubmit={handlesearch} className="relative flex items-center justify-center w-full">
                    <div className="relative w-1/2">

                        <input
                            type="text"
                            placeholder="Search..."
                            className="px-4 py-2 pl-12 rounded-lg  w-full border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-700 bg-gray-100 placeholder:text-gray-700 text-[#111]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <HiMagnifyingGlass className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />

                        {/* Search Icon */}
                        <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800">
                            <HiMagnifyingGlass className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Close Button */}
                    <button onClick={handleSearchToggle} className="ml-2 text-gray-600 hover:text-gray-800">
                        <HiMiniXMark className="h-6 w-6" />
                    </button>
                </form>
            ) : (
                <button onClick={handleSearchToggle}>
                    <HiMagnifyingGlass className="h-6 w-6 text-gray-200" />
                </button>
            )}
        </div>
    )
}

export default SearchBar;