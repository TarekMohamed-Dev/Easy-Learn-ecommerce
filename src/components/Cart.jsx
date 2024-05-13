/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Star , Trash2 , ArchiveX  } from "lucide-react";
import {removeFromCart , reset } from "@/redux/cartSlice";
import {useDispatch} from "react-redux"
import { motion } from "framer-motion";

function Cart({setOpenCart}) {
  const products = useSelector((state) => state.cart.products);
  console.log(products);
  const dispatch = useDispatch()
  return (
    <motion.div
    initial={{ opacity: 0.0, y: -20 }}
      whileInView={{ opacity: 1, y: 20 }}
      transition={{
        delay: 0.3,
        duration: 0.2,
        ease: "easeInOut",
      }}
      className="h-auto max-h-[250px] sm-max-h-[300px] w-[200px] sm:w-[250px] bg-gray-100 z-10 rounded-md border shadow-sm absolute mx-10 right-10 top-12 p-5 overflow-auto"
      aria-modal="true"
      role="dialog"
      tabIndex="-1"
    >
      <button onClick={() => setOpenCart(true)} className="absolute end-4 top-4 text-gray-600 transition hover:rotate-90 hover:text-red-500 duration-300">
        <span className="sr-only">Close cart</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="mt-4 space-y-6">
        <ul className="space-y-4">
          {products.map((product) => (
             <li key={product.id} className="flex items-center gap-3">
              <img
                src={product.image}
                alt="dd"
                className="size-16 rounded object-cover"
              />

              <div>
                {/* Product title */}
                <h3 className="text-sm text-gray-900 line-clamp-1">
                  {product?.title}
                </h3>

                {/* Product details */}
                <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                  <div>
                    {/* Product category */}
                    <dt className="inline">Category: </dt>
                    <dd className="inline text-[8px] sm:text-[10px]">{product?.category}</dd>
                  </div>

                  <div>
                    {/* Product price */}
                    <dt className="inline">Price: </dt>
                    <dd className="inline">{product?.price}</dd>
                    <div className="flex">
                      {Array.from({ length: product.rating }).map((_, i) => (
                        <Star
                          key={i}
                          fill="#b4690e"
                          strokeWidth={0}
                          className="h-3 w-3"
                        />
                      ))}
                    </div>
                  </div>
                </dl>
              </div>
              <div>
              <Trash2 onClick={() => dispatch(removeFromCart({id:product.id}))} className="text-gray-600 h-5 w-5 hover:text-red-600 hover:scale-110 cursor-pointer" />
              </div>
            </li>
          ))}
          <div onClick={() => dispatch(reset())} className="flex justify-center">
          <ArchiveX className="text-red-500 h-8 w-8 hover:text-red-600 hover:scale-110 cursor-pointer" />
          </div>
        </ul>

        <div className=" text-center ">
          <Link
            to="/cartlist"
            className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600 mb-2"
          >
            View my cart ({products?.length})
          </Link>

          <Link
            to="/"
            className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default Cart;
