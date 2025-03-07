import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import ProductDetailsDialog from "@/components/shopping-view/product-details";

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const { productList, isLoading, productDetails } = useSelector(
    (state) => state.shoppingProducts
  );
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  console.log("ProductCarousel - productList:", productList); // Debug productList
  console.log("ProductCarousel - isLoading:", isLoading); // Debug isLoading

  useEffect(() => {
    console.log("Dispatching fetchAllFilteredProducts...");
    dispatch(fetchAllFilteredProducts({
      filterParams: { featured: true },
      sortParams: "-createdAt",
    })).then((result) => {
      console.log("fetchAllFilteredProducts result:", result); // Debug result
    }).catch((error) => {
      console.error("fetchAllFilteredProducts error:", error); // Debug error
    });
  }, [dispatch]);

  const handleQuickView = async (productId) => {
    console.log("Handling Quick View for product ID:", productId); // Debug productId
    try {
      await dispatch(fetchProductDetails(productId));
      console.log("Product details fetched:", productDetails); // Debug productDetails
      setSelectedProduct(productDetails);
      setDialogOpen(true);
    } catch (error) {
      console.error("Error fetching product details:", error); // Debug error
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!productList || productList.length === 0) {
    return <div>No products available.</div>; // Handle empty productList
  }

  return (
    <div className="relative py-12 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
        Featured Products
      </h2>

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
        {productList.map((product) => {
          console.log("Rendering product:", product); // Debug each product
          return (
            <SwiperSlide key={product._id}>
              <div className="px-2 py-4">
                <ShoppingProductTile
                  product={product}
                  handleGetProductDetails={handleQuickView}
                  disableSwing
                  className="hover:shadow-lg transition-shadow"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <ProductDetailsDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        productDetails={selectedProduct}
      />
    </div>
  );
};

export default ProductCarousel;