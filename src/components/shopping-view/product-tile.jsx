import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { useState } from "react";

// Swing animation configuration
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

function ShoppingProductTile({ product, disableSwing, handleAddtoCart}) {
  const [hovered, setHovered] = useState(false);

  // If disableSwing is true, omit the swing animation
  const animationProps = disableSwing ? {} : { animate: swingAnimation };

  return (
    <motion.div
      className="w-full max-w-sm mx-auto h-96"  // Fixed overall height for consistency
      style={{ boxShadow: "0 0 10px rgba(0, 255, 255, 0.5)" }}
      {...animationProps}
      whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 255, 255, 0.9)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Card className="w-full max-w-sm h-full mx-auto transition-transform duration-300">
        <div className="h-full flex flex-col">
          
          <div className="relative h-[150px]">
            <img
              src={product?.image}
              alt={product?.title}
              className="w-full h-full object-cover rounded-t-lg"
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
          {/* Card content with flexible height */}
          <CardContent className="p-4 flex-1">
            <h2 className="text-xl font-bold flex justify-center items-center mb-2">
              {product?.title}
            </h2>
            <div className="flex justify-center items-center mb-2">
              <span
                className={`${product?.salePrice > 0 ? "line-through" : ""} text-xl text-green-800 font-bold flex justify-center items-center mb-2`}
              >
                ${product?.price}
              </span>
              {product?.salePrice > 0 && (
                <span className="text-lg font-semibold text-primary">
                  ${product?.salePrice}
                </span>
              )}
            </div>
            {product?.balance !== null && product?.balance !== 0 && (
              <div className="flex justify-center items-center mb-2">
                <span className="text-[15px] font-bold">
                  Balance: ${product?.balance}
                </span>
              </div>
            )}
          </CardContent>
          {/* Card footer with fixed height */}
          <CardFooter>
            {product?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Out Of Stock
              </Button>
            ) : (
              <Button
                onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
                className="w-full"
              >
                Add to cart
              </Button>
            )}
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
}

export default ShoppingProductTile;
