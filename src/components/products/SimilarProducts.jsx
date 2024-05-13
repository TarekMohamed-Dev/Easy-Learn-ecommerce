import { List, Star } from 'lucide-react';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";

const SimilarProducts = ({ category }) => {
    const [products, setProducts] = useState([]);
    const { data, loading, error } = useFetch(`/products?filters[category][$eq]=${category}&populate=*`);

    useEffect(() => {
        if (data) {
            setProducts(data);
        }
    }, [data]);

    return (
        <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto gap-5">
            {loading
                ? (
                    // Display loading placeholders
                    Array.from({ length: products.length }).map((_, index) => (
                      <div key={index} className="animate-pulse">
                        <div className="w-[300px] h-[200px] bg-gray-200 rounded-lg mb-4"></div>
                        <div className="h-6 w-48 bg-gray-200 rounded-lg mb-4"></div>
                        <div className="h-4 w-32 bg-gray-200 rounded-lg mb-4"></div>
                      </div>
                    ))
                  )
                : products.map(product => (
                    <div key={product.id} className='rounded shadow-lg hover:shadow-md transition-all duration-700 hover:scale-110'>
                        <Link to={`/ProductDetails/${product.id}`} className='cursor-pointer'>
                            <img src={product.attributes.image.data[0].attributes.url} alt="Product Image" width={400} height={350} className="rounded-t-lg h-[170px] w-full object-fit" />
                            <div className='flex items-center justify-between p-3 rounded-b-lg bg-gray-50'>
                                <div>
                                    <h2 className='text-[12px] font-medium line-clamp-1 dark:text-neutral-900'>{product.attributes.title}</h2>
                                    <div className='flex'>
                                        {Array.from({ length: product.attributes.rating }).map((_, i) => (
                                            <Star key={i} fill="#b4690e" strokeWidth={0} className="h-5" />
                                        ))}
                                    </div>
                                    <h2 className='text-[10px] text-gray-400 flex gap-1 items-center'>
                                        <List className='w-4 h-4' /> {product.attributes.category}
                                    </h2>
                                </div>
                                <div>
                                    <h2 className='dark:text-neutral-900'>${product.attributes.price}</h2>
                                    <h3 className='line-through text-gray-500 text-sm'>${product.attributes.oldprice}</h3>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))
            }
        </div>
    );
};

export default SimilarProducts;
