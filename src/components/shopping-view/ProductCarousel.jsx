import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts, fetchProductDetails, resetProductDetails } from "@/store/shop/products-slice";
import ShoppingProductTile from "../../components/shopping-view/product-tile";
import ProductDetailsDialog from "../../components/shopping-view/product-details";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";


// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector((state) => state.shopProducts);
  const { cartItems } = useSelector((state) => state.shopCart);
  const user = useSelector((state) => state.auth.user);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { toast } = useToast();

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

  useEffect(() => {
    if (productDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);

  const handleAddtoCart = (getCurrentProductId, getTotalStock) => {
    const getCartItems = cartItems?.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const currentQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (currentQuantity + 1 > getTotalStock) {
          toast.error(`Only ${currentQuantity} quantity can be added for this item`);
          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast.success("Product added to cart");
      }
    });
  };

  return (
    <div className="relative py-2 bg-black z-10 pb-16">
      <h2 className="text-3xl font-bold text-center mb- text-white">
        Featured Products
      </h2>

      {(!productList || productList.length === 0) ? (
        <div className="text-center text-gray-400">No featured products available.</div>
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1.2}
          centeredSlides={false}
          loop={true}
          autoplay={{ delay: 2000, pauseOnMouseEnter: true, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2.2, spaceBetween: 15 },
            1024: { slidesPerView: 4, spaceBetween: 15 },
          }}
          className="!pb-12 relative z-10"
        >
          {productList.map((productItem) => (
            <SwiperSlide key={productItem.id || productItem._id}>
              <div className="px-2 py-4">
                <ShoppingProductTile
                  key={productItem.id || productItem._id}
                  product={productItem}
                  disableSwing={true}
                  handleAddtoCart={() =>
                    handleAddtoCart(productItem.id, productItem.stock)
                  }
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <ProductDetailsDialog
        open={openDetailsDialog && !!productDetails}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
        onClose={() => {
          setOpenDetailsDialog(false);
          dispatch(resetProductDetails());
        }}
      />
    </div>
  );
};

export default ProductCarousel;
