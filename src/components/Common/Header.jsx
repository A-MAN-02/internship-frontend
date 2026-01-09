import Topbar from "../Layout/Topbar";
import Navbar from "./Navbar";

const Header = () => {
    return (
        <div>
        <header className="border-b border-gray-200">
            {/* topbar */}
            <Topbar />
            {/* navbar */}
            <Navbar />
            {/* cart drawer */}
        </header>
        </div>
    )
};


export default Header
