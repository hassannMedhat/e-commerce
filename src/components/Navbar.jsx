/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Navbar.jsx
import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from '../assets/frontend_assets/assets';

const Navbar = () => {
  const { currentUser, logout } = useContext(ShopContext);
  const { getCartCount } = useContext(ShopContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);



  return (
    <div className="flex justify-between items-center py-5 font-medium">
      <NavLink to='/'><img src={assets.logo} className="w-36" alt="Logo" /></NavLink>
      {/* للpc
       والشاشات الكبيرة */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" hidden />
        </NavLink>

        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTIONS</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" hidden />
        </NavLink>

        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" hidden />
        </NavLink>

        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" hidden />
        </NavLink>

        {!currentUser && (
          <NavLink to="/login" className="flex flex-col items-center gap-1">
            <p>LOGIN</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" hidden />
          </NavLink>
        )}
        {currentUser && (
          <NavLink to="/dashboard" className="flex flex-col items-center gap-1">
          <p>DASHBOARD</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" hidden />
        </NavLink>
        )}
      </ul>

      <div className="flex gap-6 items-center">
        <Link to="/collection"><img src={assets.search_icon} className="w-5 cursor-pointer" alt="Search" /></Link>

        <div className="group relative">
          <img
            className="w-5 cursor-pointer"
            src={assets.profile_icon}
            alt="Profile"
          />
          <div className="group-hover:block hidden dropdown-menu absolute p-5 right-0 pt-4">
            <div className="flex flex-col gap-3 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <Link to="/profile" className="cursor-pointer hover:text-black">My Profile</Link>
              <Link to="/orders" className="cursor-pointer hover:text-black">Orders</Link>
              <Link onClick={logout} className="cursor-pointer hover:text-black">Logout</Link>
            </div>
          </div>
        </div>

        <NavLink to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart" />
          <p className="absolute right-[-5px] bottom-[5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </NavLink>

        <img
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        
        {/* القائمة الجانبية للتليفون */}
        {isMenuOpen && (
          <div className="fixed top-0 left-0 bottom-0 h-screen w-64 bg-white shadow-lg lg:hidden transition-transform transform translate-x-0 z-40">
            <div className="p-4 flex flex-col gap-6">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" hidden />
        </NavLink>

        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTIONS</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" hidden />
        </NavLink>

        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" hidden />
        </NavLink>

        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" hidden />
        </NavLink>

        {!currentUser && (
          <NavLink to="/login" className="flex flex-col items-center gap-1">
            <p>LOGIN</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" hidden />
          </NavLink>
        )}

        <NavLink to="/dashboard" className="flex flex-col items-center gap-1">
          <p>DASHBOARD</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" hidden />
        </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
