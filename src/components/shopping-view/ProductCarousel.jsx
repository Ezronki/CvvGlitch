import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/slices/shopCartSlice";
import { useToast } from "@/components/ui/use-toast";
import ShoppingProductTile from "@/components/products/ShoppingProductTile";

function handleAddtoCart(dispatch, cartItems, user, getCurrentProductId, getTotalStock, toast) {
  let getCartItems = cartItems.items || [];

  if (getCartItems.length) {
    const indexOfCurrentItem = getCartItems.findIndex(
      (item) => item.productId === getCurrentProductId
    );
    if (indexOfCurrentItem > -1) {
      const getQuantity = getCartItems[indexOfCurrentItem].quantity;
      if (getQuantity + 1 > getTotalStock) {
        toast({
          title: `Only ${getQuantity} quantity can be added for this item`,
          variant: "destructive",
        });
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
      toast({ title: "Product added to cart" });
    }
  });
}

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.shopProducts);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

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
                  handleAddtoCart={(id, stock) =>
                    handleAddtoCart(dispatch, cartItems, user, id, stock, toast)
                  }
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default ProductCarousel;
