import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Presentation, ShoppingCart, MenuIcon } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { motion } from "framer-motion";
import {
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
} from "@material-tailwind/react";
import { useUser, UserButton } from "@clerk/clerk-react";
import Cart from "./Cart";
import { useSelector } from "react-redux";

function Header() {
  const [openCart, setOpenCart] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const product = useSelector((state) => state.cart.products);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 170);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { user } = useUser();

  return (
    <header
      className={` ${scrolled ? "backdrop-blur-md bg-main-color/60 !text-slate-100 dark:bg-transparent" : ""} w-full fixed top-0 z-20 h-wrapper transition-all ease-in text-slate-800 dark:text-white border-b-[3px] border-slate-300 dark:border-indigo-400`}
    >
      <motion.div
        initial={{ y: "-2rem", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", duration: 1 }}
        viewport={{ once: true }}
        className="flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8 !flex-nowrap   !justify-between "
      >
        <Link to={"/"}>
          <h1
            className="flex items-center gap-2 font-bold md:text-xl pl-3 md:pl-0"
            dir="ltr"
          >
            <Presentation className="inline text-theme-color sm:w-[37px] sm:h-[37px]" />
            Easy Learn
          </h1>
        </Link>

        <div className="hidden xl:flex flex-1 items-center justify-end">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-4 text-bold">
              <li>
                <Link
                  to={"/development"}
                  className="dark:text-white hover:text-theme-color dark:hover:text-orange-500"
                >
                  Development
                </Link>
              </li>
              <li>
                <Link
                  to={"/business"}
                  className="dark:text-white hover:text-theme-color dark:hover:text-orange-500"
                >
                  Business
                </Link>
              </li>
              <li>
                <Link
                  to={"/it&Software"}
                  className="dark:text-white hover:text-theme-color dark:hover:text-orange-500"
                >
                  IT & Software
                </Link>
              </li>
              <li>
                <Link
                  to={"/business"}
                  className="dark:text-white hover:text-theme-color dark:hover:text-orange-500"
                >
                  Business
                </Link>
              </li>
              <li>
                <Link
                  to={"/design"}
                  className="dark:text-white hover:text-theme-color dark:hover:text-orange-500"
                >
                  Design
                </Link>
              </li>
              <li>
                <Link
                  to={"/contactus"}
                  className="dark:text-white hover:text-theme-color dark:hover:text-orange-500"
                >
                  Contact Us
                </Link>
              </li>
              {/* Add other navigation links similarly */}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-4 ">
        <IconButton
    variant="text"
    className="relative rounded-full flex items-center justify-center" // Added flex properties
    onClick={() => setOpenCart(!openCart)}
  >
    {/* Removed unnecessary div */}
    <ShoppingCart className="text-slate-700 dark:text-slate-100" />
    <div className="absolute top-0 left-4 w-4 h-4 flex justify-center items-center bg-yellow-500 rounded-full text-black font-bold">
      {product.length}
    </div>
  </IconButton>
          {/* <div className="mx-1" /> */}
          {openCart || (product.length > 0 && <Cart setOpenCart={setOpenCart} />)}
          {/* Authentication links */}
          <div className="flex items-center gap-4">
            {!user ? (
              <div className="sm:flex sm:gap-4">
                <a
                  href="/SignIn"
                  className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-1 sm:px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                    Login
                  </span>
                </a>
                <a
                  href="/SignUp"
                  className="hidden sm:block relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                    Register
                  </span>
                </a>
              </div>
            ) : (
              <div className="flex items-center">
                <UserButton afterSignOutUrl="/" />
              </div>
            )}
          </div>

          <div className="flex">
            <ModeToggle />
            <Menu animate={{ mount: { y: 0 }, unmount: { y: 25 } }}>
              <MenuHandler className="flex items-center justify-center xl:hidden">
                <IconButton
                  variant="text"
                  className="mx-1.5 md:mx-4 block rounded-full"
                >
                  <MenuIcon
                    className={`${scrolled ? "text-slate-100" : "text-slate-900 dark:text-slate-400 transition-all ease-in-out duration-300"}`}
                  />
                </IconButton>
              </MenuHandler>
              <MenuList className="absolute end-0 z-10 mt-2 w-56 rounded-md  bg-white dark:bg-main-color  shadow-lg">
                <div>
                  <a
                    className="block rounded-lg px-4 py-2 text-sm text-gray-500 dark:text-white hover:bg-gray-50 hover:dark:text-black hover:dark:bg-gray-50 hover:text-gray-700"
                    to={"/development"}
                  >
                    Development
                  </a>
                  <a
                    href="#"
                    className="block rounded-lg px-4 py-2 text-sm text-gray-500 dark:text-white hover:bg-gray-50 hover:dark:text-black hover:text-gray-700"
                  >
                    Business
                  </a>
                  <a
                    href="#"
                    className="block rounded-lg px-4 py-2 text-sm text-gray-500 dark:text-white hover:bg-gray-50 hover:dark:text-black hover:text-gray-700"
                  >
                    Finance & Accounting
                  </a>
                  <a
                    href="#"
                    className="block rounded-lg px-4 py-2 text-sm text-gray-500 dark:text-white hover:bg-gray-50 hover:dark:text-black hover:text-gray-700"
                  >
                    IT & Software
                  </a>
                  <a
                    href="#"
                    className="block rounded-lg px-4 py-2 text-sm text-gray-500 dark:text-white hover:bg-gray-50 hover:dark:text-black hover:text-gray-700"
                  >
                    Design
                  </a>
                  <a
                    href="#"
                    className="block rounded-lg px-4 py-2 text-sm text-gray-500 dark:text-white hover:bg-gray-50 hover:dark:text-black hover:text-gray-700"
                  >
                    Contact Us
                  </a>
                  {/* Add other mobile menu items similarly */}
                </div>
              </MenuList>
            </Menu>
          </div>
        </div>
      </motion.div>
    </header>
  );
}

export default Header;
