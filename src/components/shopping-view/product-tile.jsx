import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { useState } from "react";


const swingAnimation = {
  y: [0, -5, 5, -5, 5, 0],
  transition: {
    y: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: 4,
    },
  },
};

function ShoppingProductTile({ product, handleGetProductDetails }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="w-full max-w-sm mx-auto"
      style={{ boxShadow: "0 0 10px rgba(0, 255, 255, 0.5)" }}
      animate={swingAnimation}
      whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 255, 255, 0.9)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Card className="w-full max-w-sm mx-auto transition-transform duration-300 hover:scale-100">
        <div onClick={() => handleGetProductDetails(product?._id)}>
          <div className="relative">
            <img
              src={product?.image}
              alt={product?.title}
              className="w-full h-[150px] object-cover rounded-t-lg"
            />
            {product?.totalStock === 0 ? (
              <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                SOLD OUT
              </Badge>
            ) : product?.totalStock < 10 ? (
              <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                {`Only ${product?.totalStock} items left`}
              </Badge>
            ) : product?.salePrice > 0 ? (
              <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                Sale
              </Badge>
            ) : null}
          </div>
          <CardContent className="p-4">
            <h2 className="text-xl font-bold flex justify-center items-center mb-2">
              {product?.title}
            </h2>
            <div className="flex justify-center items-center mb-2">
              <span
                className={`${product?.salePrice > 0 ? "line-through" : ""
                  } text-xl text-green-500 font-bold flex justify-center items-center mb-2`}
              >
                ${product?.price}
              </span>
              {product?.salePrice > 0 ? (
                <span className="text-lg font-semibold text-primary">
                  ${product?.salePrice}
                </span>
              ) : null}
            </div>
            {product?.balance !== null && product?.balance !== 0 && (
              <div className="flex justify-center items-center mb-2">
                <span className="text-[15px] font-bold">
                  Balance: ${product?.balance}
                </span>
              </div>
            )}


          </CardContent>
        </div>
        <CardFooter className="relative h-12">
          {product?.totalStock === 0 ? (
            <Button className="w-full opacity-60 cursor-not-allowed">
              SOLD OUT
            </Button>
          ) : (
            <motion.div
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: hovered ? 1 : 0 }}
            >
              <Button
                onClick={() => handleGetProductDetails(product?._id)}
                className="w-full flex items-center gap-2 bg-black text-white py-2 px-4 rounded-lg"
              >
                <Eye size={18} />
                Quick View
              </Button>
            </motion.div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default ShoppingProductTile;
