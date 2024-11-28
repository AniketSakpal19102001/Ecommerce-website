import { IoCartOutline } from "react-icons/io5";
function CartIcon({ count }) {
  return (
    <>
      <div className="relative inline-block">
        <IoCartOutline size={28} className="text-gray-800" />
        {count !== 0 && (
          <span className="absolute right-0 top-0 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
            {count}
          </span>
        )}
      </div>
    </>
  );
}

export default CartIcon;
