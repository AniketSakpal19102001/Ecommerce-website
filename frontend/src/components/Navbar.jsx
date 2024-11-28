import { FaUser, FaSearch } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import CartIcon from "./CartIcon";
import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/slice/authSlice.js";
import {
  getCart,
  selectCart,
  selectLoading,
  selectError,
  logoutCart,
} from "../store/slice/cartSlice.js";
import { selectIsAuthenticated } from "../store/slice/authSlice.js";

function Navbar() {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [topwearDropdownOpen, setTopwearDropdownOpen] = useState(false);
  const [bottomwearDropdownOpen, setBottomwearDropdownOpen] = useState(false);
  const [isSearchVisible, setisSearchVisible] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  // console.log(cart);
  // cart && console.log(cart[0].items.length);
  const userDropdownRef = useRef(null);
  const topwearDropdownRef = useRef(null);
  const bottomwearDropdownRef = useRef(null);
  const bgref = useRef(null);

  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      await dispatch(logoutCart()).unwrap();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleMobileMenu = () => {
    setMobileMenu((prev) => !prev);
  };
  const toggleSearch = () => {
    setisSearchVisible((prev) => !prev);
    if (bgref.current) {
      bgref.current.classList.toggle("bg-yellow-500");
    }
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen((prev) => !prev);
  };

  const toggleTopwearDropdown = () => {
    setTopwearDropdownOpen((prev) => !prev);
  };

  const toggleBottomwearDropdown = () => {
    setBottomwearDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      userDropdownRef.current &&
      !userDropdownRef.current.contains(event.target)
    ) {
      setUserDropdownOpen(false);
    }
    if (
      topwearDropdownRef.current &&
      !topwearDropdownRef.current.contains(event.target)
    ) {
      setTopwearDropdownOpen(false);
    }
    if (
      bottomwearDropdownRef.current &&
      !bottomwearDropdownRef.current.contains(event.target)
    ) {
      setBottomwearDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bgref.current && !bgref.current.contains(event.target)) {
        setisSearchVisible(false); // Close search
        if (bgref.current) {
          bgref.current.classList.remove("bg-yellow-500"); // Remove background color
        }
      }
    };

    // Attach event listener to document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="flex justify-between items-center border-b border-gray-600 py-1 bg-yellow-300">
        <div className="flex justify-center items-center gap-2 text-lg md:text-xl py-2 font-bold md:ml-16 ml-3">
          <div className="text-2xl md:hidden block " onClick={handleMobileMenu}>
            <MdOutlineMenu />
          </div>
          <p className="whitespace-nowrap">
            <NavLink to={"/"}>Urban Threads</NavLink>
          </p>
        </div>
        <div className="text-lg md:text-xl py-2 font-bold flex justify-center items-center gap-4 md:gap-6 px-3">
          <li
            className="list-none relative"
            onClick={toggleTopwearDropdown}
            ref={topwearDropdownRef}
          >
            <p className="hidden lg:block cursor-pointer">Topwear</p>
            {topwearDropdownOpen && (
              <ul className="absolute right-0 bg-white border rounded shadow-lg mt-2 text-md">
                <NavLink to={"/products?category=Oversized+T-Shirts"}>
                  <li className="p-2 hover:bg-gray-200 cursor-pointer whitespace-nowrap">
                    Oversized T-shirt
                  </li>
                </NavLink>
                <NavLink to={"/products?category=Shirts"}>
                  <li className="p-2 hover:bg-gray-200 cursor-pointer">
                    Shirt
                  </li>
                </NavLink>
                <NavLink to={"/products?category=Polos"}>
                  <li className="p-2 hover:bg-gray-200 cursor-pointer">
                    Polos
                  </li>
                </NavLink>
                <NavLink to={"/products?category=Hoodies"}>
                  <li className="p-2 hover:bg-gray-200 cursor-pointer">
                    Hoodies
                  </li>
                </NavLink>
              </ul>
            )}
          </li>
          <li
            className="list-none relative"
            onClick={toggleBottomwearDropdown}
            ref={bottomwearDropdownRef}
          >
            <p className="hidden lg:block cursor-pointer">Bottomwear</p>
            {bottomwearDropdownOpen && (
              <ul className="absolute right-0 bg-white border rounded shadow-lg mt-2 text-md">
                <NavLink to={"/products?category=Jeans"}>
                  <li className="p-2 hover:bg-gray-200 cursor-pointer">
                    Jeans
                  </li>
                </NavLink>
                <NavLink to={"/products?category=Shorts"}>
                  <li className="p-2 hover:bg-gray-200 cursor-pointer">
                    Shorts
                  </li>
                </NavLink>
                <NavLink to={"/products?category=Joggers"}>
                  {" "}
                  <li className="p-2 hover:bg-gray-200 cursor-pointer">
                    Joggers
                  </li>
                </NavLink>
              </ul>
            )}
          </li>
          <p className="hidden lg:block">
            <NavLink to={"/products?category=Sneakers"}>Sneakers</NavLink>
          </p>
          <p className="hidden xl:block">
            <a href="#bestseller">Best Sellers</a>
          </p>
          <div className="hidden md:flex gap-2 justify-between items-center bg-yellow-500 p-1 sm:p-2 rounded-lg">
            <input
              type="text"
              placeholder="Search Here"
              className="pl-2 border border-gray-300 rounded-lg w-full lg:w-56"
            />
            <FaSearch className="cursor-pointer" />
          </div>
        </div>

        <div className="flex justify-between items-center text-lg md:text-xl md:mr-16 mr-3 gap-4 md:gap-6 font-bold">
          <li
            className="hidden md:block list-none relative"
            title="feature available soon"
            onClick={toggleUserDropdown}
            ref={userDropdownRef}
          >
            <FaUser className="cursor-pointer" />
            {userDropdownOpen && (
              <ul className="absolute right-0 bg-white border rounded shadow-lg mt-2 text-md">
                {isAuthenticated && (
                  <NavLink to={"/profile"}>
                    <li className="p-2 hover:bg-gray-200 cursor-pointer">
                      Profile
                    </li>
                  </NavLink>
                )}
                {isAuthenticated && (
                  <NavLink to={"/myorders"}>
                    <li className="p-2 hover:bg-gray-200 cursor-pointer whitespace-nowrap">
                      My Orders
                    </li>
                  </NavLink>
                )}
                {!isAuthenticated && (
                  <NavLink to={"/login"}>
                    <li className="p-2 hover:bg-gray-200 cursor-pointer whitespace-nowrap">
                      Log in
                    </li>
                  </NavLink>
                )}
                {isAuthenticated && (
                  <li
                    className="p-2 hover:bg-gray-200 cursor-pointer whitespace-nowrap"
                    onClick={handleLogout}
                  >
                    Log out
                  </li>
                )}
              </ul>
            )}
          </li>
          <div
            ref={bgref}
            className="flex md:hidden gap-2 justify-between items-center  p-1 sm:p-2 rounded-lg"
          >
            {isSearchVisible && (
              <input
                type="text"
                placeholder=""
                autoFocus
                className="pl-2 border border-gray-300 rounded-lg w-full lg:w-56"
              />
            )}
            <FaSearch className="cursor-pointer" onClick={toggleSearch} />
          </div>
          <NavLink to={"/cart"}>
            <li className="list-none">
              <CartIcon count={cart?.[0]?.items?.length || 0} />
            </li>
          </NavLink>
        </div>
      </nav>
      {mobileMenu && (
        <div className="fixed z-50 bg-white left-0 top-0 bottom-0">
          <div className="py-[0.8rem] pl-3 text-2xl" onClick={handleMobileMenu}>
            <IoClose />
          </div>
          <div className="pl-3 flex flex-col gap-2 pr-12">
            {!isAuthenticated ? (
              <button
                className="rounded-md bg-blue-500 px-2 py-1"
                onClick={() => {
                  handleMobileMenu();
                  navigate("/login");
                }}
              >
                Sign in
              </button>
            ) : (
              <button
                className="rounded-md bg-red-400 border px-2 py-1"
                onClick={() => {
                  handleMobileMenu();
                  handleLogout();
                }}
              >
                Logout
              </button>
            )}
            {isAuthenticated && (
              <NavLink to={"/profile"}>
                <li className="list-none" onClick={handleMobileMenu}>
                  Profile
                </li>
              </NavLink>
            )}
            {isAuthenticated && (
              <NavLink to={"/myorders"}>
                <li className="list-none" onClick={handleMobileMenu}>
                  My Orders
                </li>
              </NavLink>
            )}
            <NavLink to={"/products?category=Oversized+T-Shirts"}>
              <li
                className="list-none pr-4 hover:bg-gray-200 cursor-pointer whitespace-nowrap"
                onClick={handleMobileMenu}
              >
                Oversized T-shirt
              </li>
            </NavLink>
            <NavLink to={"/products?category=Shirts"}>
              <li
                className="list-none pr-4 hover:bg-gray-200 cursor-pointer"
                onClick={handleMobileMenu}
              >
                Shirt
              </li>
            </NavLink>
            <NavLink to={"/products?category=Polos"}>
              <li
                className="list-none pr-4 hover:bg-gray-200 cursor-pointer"
                onClick={handleMobileMenu}
              >
                Polos
              </li>
            </NavLink>
            <NavLink to={"/products?category=Hoodies"}>
              <li
                className="list-none pr-4 hover:bg-gray-200 cursor-pointer"
                onClick={handleMobileMenu}
              >
                Hoodies
              </li>
            </NavLink>
            <NavLink to={"/products?category=Jeans"}>
              <li
                className="list-none pr-4 hover:bg-gray-200 cursor-pointer"
                onClick={handleMobileMenu}
              >
                Jeans
              </li>
            </NavLink>
            <NavLink to={"/products?category=Shorts"}>
              <li
                className="list-none pr-4 hover:bg-gray-200 cursor-pointer"
                onClick={handleMobileMenu}
              >
                Shorts
              </li>
            </NavLink>
            <NavLink to={"/products?category=Joggers"}>
              {" "}
              <li
                className="list-none pr-4 hover:bg-gray-200 cursor-pointer"
                onClick={handleMobileMenu}
              >
                Joggers
              </li>
            </NavLink>
            <NavLink to={"/products?category=Sneakers"}>
              <li
                className="list-none pr-4 hover:bg-gray-200 cursor-pointer"
                onClick={handleMobileMenu}
              >
                Sneakers
              </li>
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
