import { useState, useEffect } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  filterByCategory,
  resetFilter,
} from "../store/slice/productSlice.js";

function CardContainer({ isVisible, currentCategory, onCategoryChange }) {
  const dispatch = useDispatch();
  const { products, filteredProducts, status, error } = useSelector(
    (state) => state.products
  );

  // Fetch products when the component mounts or when the category changes
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // Apply the category filter based on currentCategory prop
  useEffect(() => {
    if (currentCategory === "All Categories") {
      dispatch(resetFilter());
    } else {
      dispatch(filterByCategory(currentCategory));
    }
  }, [currentCategory, dispatch]);

  // Display loading state
  if (status === "loading") return <div>Loading...</div>;

  // Display error state
  if (status === "failed") return <div>Error: {error}</div>;

  // Render the products (filtered or all)
  let productsToDisplay =
    currentCategory === "All Categories" ? products : filteredProducts;

  // console.log(productsToDisplay);
  const categories = [
    "Oversized T-Shirts",
    "Shirts",
    "Polos",
    "Hoodies",
    "Jeans",
    "Shorts",
    "Joggers",
    "Sneakers",
  ];
  const themes = ["Marvel", "DC", "One Piece", "F.R.I.E.N.D.S", "Harry Potter"];
  const prices = [
    "Rs. 599 to Rs. 1098",
    "Rs. 1099 to Rs. 1598",
    "Rs. 1599 to Rs. 2098",
    "Rs. 2099 to Rs. 2598",
  ];
  // function sortLH() {
  //   const sortedProducts = [...productsToDisplay].sort(
  //     (a, b) => a.price - b.price
  //   );
  //   productsToDisplay = sortedProducts;
  // }
  // // sortLH();
  // function sortHL() {
  //   const sortedProducts = [...productsToDisplay].sort(
  //     (a, b) => b.price - a.price
  //   );
  //   productsToDisplay = sortedProducts;
  // }
  // // sortHL();
  // function sortClear() {
  //   productsToDisplay =
  //     currentCategory === "All Categories" ? products : filteredProducts;
  // }
  // // sortClear();

  return (
    <>
      <div className="flex">
        <div
          className={`md:w-1/5 z-10 md:static absolute right-0 -mr-1 pl-2 pr-10 bg-white md:bg-none mx-4 my-4
          ${isVisible || window.innerWidth >= 768 ? "block" : "hidden"}`}
        >
          <div className="border-b pb-4">
            <p className="text-gray-700 text-lg whitespace-nowrap">
              All Categories
            </p>
            <div className="text-gray-700 text-sm flex items-center gap-1">
              <input
                type="checkbox"
                checked={currentCategory === "All Categories"}
                onChange={() => onCategoryChange("All Categories")}
              />
              <span>All Categories</span>
            </div>
          </div>
          <div className="border-b pb-4">
            <p className="text-gray-700 text-lg">Categories</p>
            {categories.map((category, index) => (
              <div
                key={index}
                className="text-gray-700 text-sm flex items-center gap-1"
              >
                <input
                  type="checkbox"
                  checked={currentCategory === category}
                  onChange={() => onCategoryChange(category)}
                />
                <span>{category}</span>
              </div>
            ))}
          </div>
          <div className="border-b pb-4">
            <p className="text-gray-700 text-lg">Themes</p>
            {themes.map((i, index) => (
              <div
                key={index}
                className="text-gray-700 text-sm flex items-center gap-1"
              >
                <input type="checkbox" />
                <span>{i}</span>
              </div>
            ))}
          </div>
          <div className="border-b pb-4">
            <p className="text-gray-700 text-lg">Prices</p>
            {prices.map((i, index) => (
              <div
                key={index}
                className="text-gray-700 text-sm flex items-center gap-1"
              >
                <input type="checkbox" />
                <span>{i}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-4/5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-2 py-4">
            {productsToDisplay.map((i, index) => (
              <Card
                key={index}
                id={i._id}
                src={i.img}
                name={i.name}
                category={i.category}
                price={i.price}
                mrp={i.mrp}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CardContainer;
