import { useNavigate } from "react-router-dom";
function Card({ src, name, category, price, mrp, id }) {
  const navigate = useNavigate();
  function redirectToProduct(id) {
    navigate(`/productdetail/${id}`);
  }
  return (
    <>
      <div
        onClick={() => redirectToProduct(id)}
        className="border border-gray-300 rounded-md flex flex-col gap-2 hover:cursor-pointer"
      >
        <img src={src} alt="" className="" />
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
        </div>
      </div>
    </>
  );
}

export default Card;
