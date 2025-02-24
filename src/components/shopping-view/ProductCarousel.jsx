import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchAllFilteredProducts,
  fetchProductDetails 
} from "@/redux/slices/shoppingProductSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ShoppingProductTile from "./ShoppingProductTile";
import ProductDetailsDialog from "./ProductDetailsDialog";

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const { productList, isLoading, productDetails } = useSelector(
    (state) => state.shoppingProducts
  );
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({
      filterParams: { featured: true },
      sortParams: "-createdAt"
    }));
  }, [dispatch]);

  const handleQuickView = async (productId) => {
    await dispatch(fetchProductDetails(productId));
    setSelectedProduct(productDetails);
    setDialogOpen(true);
  };

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
          1024: { slidesPerView: 3.2, spaceBetween: 32 }
        }}
        className="!pb-12"
      >
        {productList.map((product) => (
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
        ))}
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