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
  const { productList, isLoading } = useSelector((state) => state.shoppingProducts);
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Fetch featured products on mount
  useEffect(() => {
    console.log("Dispatching fetchAllFilteredProducts...");
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
    console.log("Handling Quick View for product ID:", productId);
    try {
      const productData = await dispatch(fetchProductDetails(productId)).unwrap();
      console.log("Fetched product details:", productData);
      setSelectedProduct(productData);
      setDialogOpen(true);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  console.log("ProductCarousel - productList:", productList);

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
          {productList.map((product) => (
            <SwiperSlide key={product?._id}>
              <div className="px-2 py-4">
                <ShoppingProductTile
                  product={product}
                  handleGetProductDetails={handleQuickView}
                  disableSwing // Disable swing animation for carousel
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
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
