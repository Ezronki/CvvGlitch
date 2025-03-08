import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
        (sum, currentItem) =>
          sum +
          (currentItem?.salePrice > 0
            ? currentItem?.salePrice
            : currentItem?.price) *
          currentItem?.quantity,
        0
      )
      : 0;

  return (
    <SheetContent className="w-full sm:max-w-md">
      <SheetHeader>
        <SheetTitle className="text-lg sm:text-xl">Your Cart</SheetTitle>
      </SheetHeader>

      {/* Scrollable container for cart items */}
      <div className="mt-8 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto space-y-4 px-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => (
            <UserCartItemsContent key={item.id} cartItem={item} />
          ))
          : <div className="text-center text-gray-400">No items in cart</div>
        }
      </div>

      <div className="mt-8 space-y-4 px-4">
        <div className="flex justify-between">
          <span className="font-bold text-sm sm:text-base">Total</span>
          <span className="font-bold text-sm sm:text-base">${totalCartAmount}</span>
        </div>
      </div>

      <Button
        onClick={() => {
          navigate("/shop/cart");
          setOpenCartSheet(false);
        }}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </SheetContent>

  );
}

export default UserCartWrapper;
