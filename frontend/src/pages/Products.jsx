import { FaFilter } from "react-icons/fa";
import CardContainer from "../components/CardContainer";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
function Products() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { products, filteredProducts, status, error } = useSelector(
    (state) => state.products
  );
  const resultsCount =
    filteredProducts.length > 0 ? filteredProducts.length : products.length;

  const handleFilter = () => {
    setIsVisible((prev) => !prev);
  };

  // Get the category from the query string or default to 'All Categories'
  const searchParams = new URLSearchParams(location.search);
  const currentCategory = searchParams.get("category") || "All Categories";

  // Update the URL with the selected category
  const handleCategoryChange = (category) => {
    searchParams.set("category", category);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  return (
    <>
      <div className="shadow-md flex justify-between py-2 border-b border-b-gray-400 text-sm ">
        <div className="ml-4">{resultsCount} items found</div>
        <div className="flex gap-2 mr-4 items-center">
          <select
            id="quantity"
            name="quantity"
            className="bg-gray-100 border border-gray-600 rounded-lg pl-2 "
          >
            <option value="Featured">Featured</option>
            <option value="lowToHigh">Price: low to high</option>
            <option value="highToLow">Price: high to low</option>
            {/* <option value="popularity">By popularity</option> */}
          </select>
          <FaFilter
            title="filter"
            className="block md:hidden"
            onClick={handleFilter}
          />
        </div>
      </div>
      {/* Pass the currentCategory and handleCategoryChange to CardContainer */}
      <CardContainer
        isVisible={isVisible}
        currentCategory={currentCategory}
        onCategoryChange={handleCategoryChange}
      />
    </>
  );
}

export default Products;
