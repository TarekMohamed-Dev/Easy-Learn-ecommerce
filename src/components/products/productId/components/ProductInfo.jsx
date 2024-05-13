/* eslint-disable react/prop-types */
import { ShoppingCart, BadgeCheck, AlertOctagon } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { addToCart } from '@/redux/cartSlice'
import { useNavigate } from 'react-router-dom';
import { useUser } from "@clerk/clerk-react";

function ProductInfo({ product }) {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const {user} = useUser()
  // Check if product data is available
  if (!product) {
    // Return loading skeleton
    return (
      <div className="animate-pulse">
        <div className="h-8 w-64 bg-gray-200 rounded-lg mb-6"></div>
        <div className="h-6 w-48 bg-gray-200 rounded-lg mb-6"></div>
        <div className="h-4 w-80 bg-gray-200 rounded-lg mb-6"></div>
        <div className="h-4 w-72 bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  const handleClick = () => {
    if (!user) {
      navigate('/Signin')
    } else {
      dispatch(addToCart({
        id: product.id,
        title: product.attributes.title,
        description: product.attributes.description,
        price: product.attributes.price,
        category: product.attributes.category,
        image: product.attributes.image.data[0].attributes.url,
        rating: product.attributes.rating,
      }))
    };
  };

  // If product data is available, render product information
  return (
    <div>
      <div>
        <h2 className='text-[20px]'>{product.attributes.title}</h2>
        <h2 className='text-[15px] text-gray-400'>{product.attributes.category}</h2>
        <h2 className='text-[11px] mt-5'>{product.attributes.description}</h2>
        <h2 className='text-[11px] text-gray-500 flex items-center gap-2 mt-2'> {product.attributes.instantDelivery ? <BadgeCheck className='text-green-500 h-5 w-5' /> : <AlertOctagon className='text-red-500 h-5 w-5' />} Eligible Instant Delivery</h2>
        <div className='flex items-center gap-2'>
          <h2 className='text-[32px] text-primary mt-3'>${product.attributes.price}</h2>
          <h3 className='dark:text-neutral-900 line-through text-gray-500 text-md'>${product.attributes.oldprice}</h3>
        </div>

        <button onClick={handleClick} className="flex gap-2 px-4 py-2 rounded-md bg-theme-color text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-theme-color">
          <ShoppingCart /> Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ProductInfo;
