import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice";
import ShoppingProductTile from "../../components/shopping-view/product-tile";
import ProductDetailsDialog from "../../components/shopping-view/product-details";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector((state) => state.shopProducts);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  // Fetch featured products on mount
  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: { featured: true },
        sortParams: "-createdAt",
      })
    )
      .unwrap()
      .then((result) => {
        console.log("Fetched products:", result);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [dispatch]);

  // Use the same handler as in your listing page
  const handleGetProductDetails = (productId) => {
    dispatch(fetchProductDetails(productId));
  };

  // Open details dialog when productDetails becomes available
  useEffect(() => {
    if (productDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);

  return (
    <div className="relative py-12 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
        Featured Products
      </h2>
      
      {(!productList || productList.length === 0) ? (
        <div className="text-center text-gray-500">No featured products available.</div>
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1.2}
          centeredSlides={true}
          autoplay={{ delay: 5000, pauseOnMouseEnter: true }}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2.2, spaceBetween: 24 },
            1024: { slidesPerView: 3.2, spaceBetween: 32 },
          }}
          className="!pb-12"
        >
          {productList.map((productItem) => (
            <SwiperSlide key={productItem.id || productItem._id}>
              <div className="px-2 py-4">
                <ShoppingProductTile
                  key={productItem.id || productItem._id}
                  product={productItem}
                  handleGetProductDetails={handleGetProductDetails}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
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
