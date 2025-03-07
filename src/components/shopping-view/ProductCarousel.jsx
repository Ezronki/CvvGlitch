import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice";
import ShoppingProductTile from "../../components/shopping-view/product-tile";
import ProductDetailsDialog from "../../components/shopping-view/product-details";

// Import Keen Slider hook and styles
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector((state) => state.shopProducts);
  
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

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

  // Use the same handler as your listing page
  const handleGetProductDetails = (productId) => {
    dispatch(fetchProductDetails(productId));
  };

  // Open dialog when productDetails are available
  useEffect(() => {
    if (productDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);

  // Initialize Keen Slider with configuration
  const [sliderRef] = useKeenSlider({
    loop: true,
    autoplay: { delay: 5000 },
    spacing: 24,
    slides: { perView: 1 },
    breakpoints: {
      "(min-width: 640px)": { slides: { perView: 2 } },
      "(min-width: 1024px)": { slides: { perView: 3 } },
    },
  });

  return (
    <div className="relative py-12 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
        Featured Products
      </h2>
      
      {(!productList || productList.length === 0) ? (
        <div className="text-center text-gray-500">No featured products available.</div>
      ) : (
        <div ref={sliderRef} className="keen-slider">
          {productList.map((productItem) => (
            <div key={productItem.id} className="keen-slider__slide px-2 py-4">
              <ShoppingProductTile
                key={productItem.id}
                product={productItem}
                handleGetProductDetails={handleGetProductDetails}
              />
            </div>
          ))}
        </div>
      )}

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
};

export default ProductCarousel;
