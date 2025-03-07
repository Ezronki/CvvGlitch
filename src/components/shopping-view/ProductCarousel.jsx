import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import ProductDetailsDialog from "@/components/shopping-view/product-details";

// Import Slick CSS files
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const { productList, isLoading } = useSelector((state) => state.shoppingProducts);
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Fetch featured products on mount
  useEffect(() => {
    dispatch(fetchAllFilteredProducts({
      filterParams: { featured: true },
      sortParams: "-createdAt",
    }))
      .unwrap()
      .then((result) => {
        console.log("Fetched products:", result);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [dispatch]);

  // Handle Quick View for a product
  const handleQuickView = async (productId) => {
    try {
      const productData = await dispatch(fetchProductDetails(productId)).unwrap();
      setSelectedProduct(productData);
      setDialogOpen(true);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  // React Slick settings – adjust these values to get your desired look
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    centerMode: true,
    centerPadding: "10%", // Adjust to control how much of the neighboring slide is visible
    slidesToShow: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          centerPadding: "0px",
        },
      },
    ],
  };

  return (
    <div className="relative py-12 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
        Featured Products
      </h2>

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : !productList || productList.length === 0 ? (
        <div className="text-center text-gray-500">No featured products available.</div>
      ) : (
        <Slider {...settings}>
          {productList.map((product) => (
            <div key={product?._id} className="px-2 py-4">
              <ShoppingProductTile
                product={product}
                handleGetProductDetails={handleQuickView}
                disableSwing
              />
            </div>
          ))}
        </Slider>
      )}

      {/* Product Details Dialog */}
      <ProductDetailsDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        productDetails={selectedProduct}
      />
    </div>
  );
};

export default ProductCarousel;
