import CartCard from "../components/CartCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  selectCart,
  selectLoading,
  selectError,
} from "../store/slice/cartSlice";
import { useEffect } from "react";

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  cart && console.log(cart[0].items.map((i, index) => i.size));
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);
  if (loading) return <div>Loading...</div>;
  if (!cart || !cart[0] || !cart[0].items) {
    return <div>No items in cart</div>;
  }
  return (
    <>
      <h1 className="text-2xl font-bold py-4 text-center">My Cart</h1>
      <div className="md:mx-16 mx-3 pb-10 pt-0 md:pt-4 flex flex-col md:flex-row gap-8">
        <div className="flex flex-col w-full md:w-4/6">
          {cart && cart[0] && cart[0].items && cart[0].items.length > 0 ? (
            cart[0].items.map((i, index) => (
              <div key={index} className="rounded-lg border w-full p-2">
                <CartCard
                  quant={i.quantity}
                  id={i.product._id}
                  key={index}
                  itemSize={i.size}
                  src={i.product.img}
                  name={i.product.name}
                  category={i.product.category}
                  price={i.product.price}
                  mrp={i.product.mrp}
                />
              </div>
            ))
          ) : (
            <div>No item in Cart</div>
          )}
        </div>
        {cart && cart[0] && cart[0].items && cart[0].items.length > 0 && (
          <div className="order-first md:order-last w-full md:w-2/6">
            <p className="text-lg text-gray-500 py-1">Billing Details</p>
            <div className="">
              <div className="flex flex-col">
                <div className="p-2 border rounded-sm flex justify-between">
                  <span>Cart Total (Excl. of all taxes)</span>
                  <span className="font-bold">
                    ₹ {cart && cart[0].totalAmount}
                  </span>
                </div>
                <div className="p-2 border rounded-sm flex justify-between">
                  <span>GST</span>
                  <span>₹ 50</span>
                </div>
                <div className="p-2 border rounded-sm flex justify-between">
                  <span>Shipping Charges</span>
                  <span>
                    Free <del>₹ 50</del>
                  </span>
                </div>
                <div className=" font-bold p-2 border rounded-sm flex justify-between">
                  <span>Total Amount</span>
                  <span>₹ {(cart && cart[0].totalAmount) + 50}</span>
                </div>
              </div>
              <button className="bg-blue-600 text-white rounded-md w-full py-2 mt-4">
                Proceed to checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
