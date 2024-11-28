import { useNavigate } from "react-router-dom";
import Card from "./Card";
const categories = [
  {
    img: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/OVERSIZED_T-SHIRT_IRlnouN.jpg?format=webp&w=480&dpr=1.3",
    category: "Oversized T-Shirts",
  },
  {
    img: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/JEANS_4_cuwvhhC.jpg?format=webp&w=480&dpr=1.3",
    category: "Jeans",
  },
  {
    img: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/SHIRTS_5_YbZb7NH.jpg?format=webp&w=480&dpr=1.3",
    category: "Shirts",
  },
  {
    img: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/POLOS_6_s4qZAXy.jpg?format=webp&w=480&dpr=1.3",
    category: "Polos",
  },
  {
    img: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/JOGGERS_7_PLY3Fvr.jpg?format=webp&w=480&dpr=1.3",
    category: "Joggers",
  },
  {
    img: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/SHORTS_8_wgi8InG.jpg?format=webp&w=480&dpr=1.3",
    category: "Shorts",
  },
  {
    img: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/SNEAKERS_4_wsltxju.jpg?format=webp&w=480&dpr=1.3",
    category: "Sneakers",
  },
  {
    img: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/HOODIES_4_DXWRevG.jpg?format=webp&w=480&dpr=1.3",
    category: "Hoodies",
  },
];

const fandom = [
  "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/fandometile_Marvel.jpg?format=webp&w=480&dpr=1.3",
  "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/fandometile__DC.jpg?format=webp&w=480&dpr=1.3",
  "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/fandometile_one_piece.jpg?format=webp&w=480&dpr=1.3",
];
const dropOfDay = [
  {
    _id: "6742391c85278226feb0d404",
    src: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1710852581_2949362.jpg?format=webp&w=360&dpr=1.3",
    name: "Batman: The Bat Gigil",
    category: "Oversized T-Shirts",
    price: 1049,
    mrp: 1500,
  },
  {
    _id: "674238e18a18f7233aaeaa6c",
    src: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1726032588_2948271.jpg?format=webp&w=360&dpr=1.3",
    name: "TSS Originals: Warrior Soul",
    category: "Oversized T-Shirts",
    price: 799,
    mrp: 1200,
  },
  {
    _id: "67423964861d57148b402ca8",
    src: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1724133527_9635508.jpg?format=webp&w=360&dpr=1.3",
    name: "Ted The Stoner: Baby Terry",
    category: "Oversized T-Shirts",
    price: 1199,
    mrp: 1750,
  },
  {
    _id: "672dd0dc39713dd7027b7480",
    src: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1728660579_2527478.jpg?format=webp&w=480&dpr=1.3",
    name: "Batman: Justice",
    category: "Oversized T-Shirts",
    price: 1049,
    mrp: 1500,
  },
];
function Featured() {
  const navigate = useNavigate();
  return (
    <>
      <div id="bestseller" className="px-4 py-10">
        <p className="text-3xl font-bold pb-10 text-center">DROP OF DAY</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {dropOfDay.map((i, index) => (
            <Card
              id={i._id}
              key={index}
              src={i.src}
              name={i.name}
              category={i.category}
              price={i.price}
              mrp={i.mrp}
            />
          ))}
        </div>
      </div>
      <div className="px-4 py-10">
        <p className="text-3xl font-bold pb-10 text-center">Categories</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((i, index) => (
            <img
              src={i.img}
              alt=""
              key={index}
              onClick={() => {
                navigate(`/products?category=${i.category}`);
              }}
            />
          ))}
        </div>
      </div>
      <div className="px-4 py-10">
        <p className="text-3xl font-bold pb-10 text-center">SHOP BY FANDOM</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {fandom.map((i, index) => (
            <img src={i} alt="" key={index} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Featured;
