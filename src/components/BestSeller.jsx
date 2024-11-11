import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import ProductItem from "./ProductItem"
import Title from "./Title"

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([])
    
    useEffect(() => {
        const bestProduct = products?.filter((item) => item.bestseller) || [];
        setBestSeller(bestProduct.slice(0, 5)) 
    }, [products])
    
    if (!products || products.length === 0) {
        return <div>Loading products...</div>;
    }

    return (
        <div className="my-10">
            <div className="text-center py-8 text-3xl">
                <Title text1={"BEST"} text2={"SELLER"} />
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {bestSeller.length > 0 ? (
                    bestSeller.map((item) => (
                        <ProductItem
                            key={item._id}
                            id={item._id}
                            image={item.image}
                            name={item.name}
                            price={item.price}
                        />
                    ))
                ) : (
                    <p>No best sellers available</p>
                )}
            </div>
        </div>
    )
}

export default BestSeller
