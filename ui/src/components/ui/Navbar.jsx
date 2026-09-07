import { Bell, Search } from "lucide-react"
import { useSelector } from "react-redux";

const Navbar = () => {
    const user =useSelector(state => state.user);
    return (
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-semibold">
                Dashboard
            </h2>

            <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg px-3 py-2">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="outline-none ml-2"
                    />
                </div>

                <Bell size={22} />
                <img src={user.profileImg} alt={user.userName}
                className="w-10 h-10 rounded-full" />

             
            </div>
        </header>
    );
};

export default Navbar;