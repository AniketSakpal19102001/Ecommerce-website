import { useParams } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import Star from "../components/Star";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchProducts } from "../store/slice/productSlice.js";
import {
  getCart,
  addCart,
  selectCart,
  selectLoading,
  selectError,
} from "../store/slice/cartSlice";
import { selectIsAuthenticated } from "../store/slice/authSlice.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];
function ProductDetail() {
  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState({});
  const dispatch = useDispatch();
  const { products, filteredProducts, status, error } = useSelector(
    (state) => state.products
  );
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const handleChange = (e) => {
    console.log(e.target.value);
    setQuantity(Number(e.target.value));
  };
  function handleSize(size) {
    setSize(size);
    console.log(size);
  }
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
    // console.log(products.filter((i) => i._id === id)[0]);
    setCurrentProduct(products.filter((i) => i._id === id)[0]);
  }, [status, dispatch]);
  function addToCart(productId, quantity, size) {
    if (size === "") {
      toast.error("Please select size");
    } else {
      dispatch(addCart({ productId, quantity, size }));
      toast.success("Added to cart");
    }
  }
  if (status === "loading") return <div>Loading...</div>;
  return (
    <>
      {currentProduct && Object.keys(currentProduct).length ? (
        <div className="py-8">
          <div className="md:mx-16 mx-3 gap-4 grid md:grid-cols-2 ">
            <div className="flex justify-center items-start">
              <img
                src={currentProduct.img}
                alt=""
                className="border w-[95%] sm:w-full"
              />
            </div>
            <div className="py-2">
              <div className="pb-5 border-b">
                <p className="text-3xl font-bold">{currentProduct.name}</p>
                <p className="text-gray-600">{currentProduct.category}</p>
              </div>
              <div className="py-2">
                <div className="pb-5">
                  <p className="text-3xl font-bold">₹ {currentProduct.price}</p>
                  <p className="text-gray-600"> MRP incl. of all taxes</p>
                </div>
                <div className="pb-5">
                  <p className="pb-2 ">Select Size</p>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleSize(item)}
                        className={`w-14 py-2 text-center border transition-all ease-in-out border-gray-600 rounded-full ${
                          size === item ? " bg-gray-300" : ""
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="pb-5">
                  <span className="text-gray-60">Quantity: </span>
                  <select
                    id="quantity"
                    name="quantity"
                    className="border border-gray-600 rounded-none"
                    value={quantity}
                    onChange={handleChange}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>
                <div className="pb-5">
                  <button
                    onClick={() => {
                      if (isAuthenticated) {
                        addToCart(currentProduct._id, quantity, size);
                      } else {
                        toast.error("Login to use cart");
                      }
                    }}
                    className="w-full text-center py-2 bg-blue-500 rounded-lg"
                  >
                    Add to Cart
                  </button>
                </div>
                <div className="pb-5 border p-2">
                  <p className="text-lg text-gray-600">Product Detail: </p>
                  <p>{currentProduct.detail}</p>
                </div>
                {currentProduct.reviews && currentProduct.reviews.length ? (
                  <div className="pb-5">
                    <p className="text-lg py-2">Customer Reviews: </p>
                    {currentProduct.reviews.map((i, index) => (
                      <div key={index} className="py-3">
                        <div className="flex gap-2  items-center">
                          <div className="rounded-full border p-1">
                            <FaUser />
                          </div>{" "}
                          <span>{i.username}</span>
                        </div>
                        <div className="font-semibold flex items-center gap-2">
                          <span>
                            <Star n={i.rating} />
                          </span>
                          <span>{i.title}</span>
                        </div>
                        <p className="text-gray-600">Reviewed on {i.date}</p>
                        <p>{i.detail}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <p className="text-lg py-2">Customer Reviews: </p>
                    <div>No reviews yet</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>No Product Found</div>
      )}
    </>
    // <>
    //   <div className="py-8">
    //     <div className="md:mx-16 mx-3 gap-4 grid md:grid-cols-2 ">
    //       <div className="flex justify-center items-start">
    //         <img
    //           src="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1728660579_2527478.jpg?format=webp&w=480&dpr=1.3"
    //           alt=""
    //           className="border w-[95%] sm:w-full"
    //         />
    //       </div>
    //       <div className="py-2">
    //         <div className="pb-5 border-b">
    //           <p className="text-3xl font-bold">Batman: Justice</p>
    //           <p className="text-gray-600">Oversized T-Shirts</p>
    //         </div>
    //         <div className="py-2">
    //           <div className="pb-5">
    //             <p className="text-3xl font-bold">₹ 1049</p>
    //             <p className="text-gray-600"> MRP incl. of all taxes</p>
    //           </div>
    //           <div className="pb-5">
    //             <p className="pb-2 ">Select Size</p>
    //             <div className="flex flex-wrap gap-2">
    //               {sizes.map((i, index) => (
    //                 <button
    //                   key={index}
    //                   className="w-14 py-2 text-center border border-gray-600 rounded-full"
    //                 >
    //                   {i}
    //                 </button>
    //               ))}
    //             </div>
    //           </div>
    //           <div className="pb-5">
    //             <span className="text-gray-60">Quantity: </span>
    //             <select
    //               id="quantity"
    //               name="quantity"
    //               className="border border-gray-600 rounded-none"
    //             >
    //               <option value="1">1</option>
    //               <option value="2">2</option>
    //               <option value="3">3</option>
    //               <option value="4">4</option>
    //               <option value="5">5</option>
    //               <option value="6">6</option>
    //               <option value="7">7</option>
    //               <option value="8">8</option>
    //               <option value="9">9</option>
    //               <option value="10">10</option>
    //             </select>
    //           </div>
    //           <div className="pb-5">
    //             <button className="w-full text-center py-2 bg-blue-500 rounded-lg">
    //               Buy now
    //             </button>
    //           </div>
    //           <div className="pb-5 border p-2">
    //             <p className="text-lg text-gray-600">Product Detail: </p>
    //             <p>
    //               Material & Care: Premium Heavy Gauge Fabric 100% Cotton
    //               Machine Wash Country of Origin: India (and proud) Manufactured
    //               & Sold By: The Souled Store Pvt. Ltd. 224, Tantia Jogani
    //               Industrial Premises J.R. Boricha Marg Lower Parel (E) Mumbai -
    //               400 011 connect@thesouledstore.com Customer care no. +91
    //               22-68493328
    //             </p>
    //           </div>
    //           {reviews.length > 0 ? (
    //             <div className="pb-5">
    //               <p className="text-lg py-2">Customer Reviews: </p>
    //               {reviews.map((i, index) => (
    //                 <div key={index} className="py-3">
    //                   <div className="flex gap-2  items-center">
    //                     <div className="rounded-full border p-1">
    //                       <FaUser />
    //                     </div>{" "}
    //                     <span>{i.username}</span>
    //                   </div>
    //                   <div className="font-semibold flex items-center gap-2">
    //                     <span>
    //                       <Star n={i.rating} />
    //                     </span>
    //                     <span>{i.title}</span>
    //                   </div>
    //                   <p className="text-gray-600">Reviewed on {i.date}</p>
    //                   <p>{i.detail}</p>
    //                 </div>
    //               ))}
    //             </div>
    //           ) : (
    //             <>
    //               <p className="text-lg py-2">Customer Reviews: </p>
    //               <div>No reviews yet</div>
    //             </>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
}

export default ProductDetail;
