import { useEffect, useState } from "react";
import {
  deleteItemFromCart,
  getCart,
  selectCart,
} from "../store/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
function CartCard({ src, name, category, price, mrp, quant, id, itemSize }) {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const handleChange = (e) => {
    console.log(e.target.value);
    setQuantity(Number(e.target.value));
  };
  const handleSize = (e) => {
    setSize(e.target.value);
  };
  const handleDelete = (id) => {
    console.log(id);
    dispatch(deleteItemFromCart({ id }));
    toast.success("Product removed from cart");
  };
  useEffect(() => {
    setQuantity(quant);
    setSize(itemSize);
  }, []);

  return (
    <>
      <div className=" rounded-md flex gap-2">
        <img src={src} alt="" className="h-48" />
        <div className="mx-2 text-gray-900">
          <p className="font-bold border-b border-b-gray-200 ">{name}</p>
          <p>{category}</p>
          <div>
            <span className="font-semibold text-lg"> ₹{price} </span>{" "}
            <span>
              {" "}
              <del className="text-xs text-gray-500">₹{mrp}</del>{" "}
            </span>{" "}
            <span>({Math.round((price / mrp) * 100)} %off)</span>
          </div>
          <div className="flex gap-2">
            <select
              id="quantity"
              name="quantity"
              className="border border-gray-600 rounded-sm"
              value={quantity}
              onChange={handleChange}
            >
              <option value="1">Qty: 1</option>
              <option value="2">Qty: 2</option>
              <option value="3">Qty: 3</option>
              <option value="4">Qty: 4</option>
              <option value="5">Qty: 5</option>
              <option value="6">Qty: 6</option>
              <option value="7">Qty: 7</option>
              <option value="8">Qty: 8</option>
              <option value="9">Qty: 9</option>
              <option value="10">Qty: 10</option>
            </select>
            <select
              id="size"
              name="size"
              className="border border-gray-600 rounded-sm"
              value={size}
              onChange={handleSize}
            >
              <option value="XXS">Size: XXS</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
              <option value="XXL">XXL</option>
            </select>
          </div>
          <div className="flex gap-4 mt-14">
            <button
              onClick={() => handleDelete(id)}
              className="bg-red-400 px-3 py-1 rounded-md"
            >
              Delete
            </button>
            <button className="border border-black px-3 py-1 rounded-md">
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartCard;
