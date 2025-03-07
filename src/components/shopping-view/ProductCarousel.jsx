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
  const { productList, isLoading } = useSelector((state) => state.shopProducts);
  
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

  // Initialize Keen Slider with configuration
  const [sliderRef] = useKeenSlider({
    loop: true,
    autoplay: {
      delay: 5000,
    },
    spacing: 24,
    slides: { perView: 1 },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 2 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3 },
      },
    },
  });

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
        <div ref={sliderRef} className="keen-slider">
          {productList.map((product) => (
            <div key={product?._id} className="keen-slider__slide px-2 py-4">
              <ShoppingProductTile
                product={product}
                handleGetProductDetails={handleQuickView}
                disableSwing // Disable swing animation if needed
              />
            </div>
          ))}
        </div>
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
