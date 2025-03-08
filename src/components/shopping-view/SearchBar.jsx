import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchResults, resetSearchResults } from "@/store/shop/search-slice";
import debounce from "lodash.debounce";
import { Loader2, X } from "lucide-react";
// Import cart functionality and toast notifications
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const { searchResults } = useSelector((state) => state.shopSearch);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);

  const updateSearch = useCallback(
    debounce((searchTerm) => {
      if (searchTerm.trim().length > 3) {
        setLoading(true);
        dispatch(getSearchResults(searchTerm)).finally(() => setLoading(false));
        setIsDropdownOpen(true);
      } else {
        dispatch(resetSearchResults());
        setIsDropdownOpen(false);
        setLoading(false);
      }
    }, 500),
    [dispatch]
  );

  useEffect(() => {
    updateSearch(keyword);
  }, [keyword, updateSearch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Add-to-Cart handler with sold-out and stock checks
  const handleAddtoCart = (productId, totalStock) => {
    // Check if product is sold out
    if (totalStock === 0) {
      toast({
        title: "This product is sold out",
        variant: "destructive",
      });
      return;
    }

    const currentCartItems = cartItems?.items || [];
    const index = currentCartItems.findIndex((item) => item.productId === productId);

    // If product exists in cart, check if adding one more exceeds the stock
    if (index > -1) {
      const currentQuantity = currentCartItems[index].quantity;
      if (currentQuantity + 1 > totalStock) {
        toast({
          title: `Only ${currentQuantity} unit(s) can be added for this item`,
          variant: "destructive",
        });
        return;
      }
    }

    // Proceed to add to cart
    dispatch(
      addToCart({
        userId: user?.id,
        productId: productId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({ title: "Product added to cart" });
      }
    });
  };

  return (
    <div className="relative w-full max-w-md" ref={dropdownRef}>
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={() => setIsDropdownOpen(true)}
          placeholder="Search products..."
          className="w-full px-4 py-2 pr-10 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#04D94F]"
        />
        {keyword && (
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={() => setKeyword("")}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
          >
            {loading ? (
              <div className="flex justify-center p-4">
                <Loader2 className="animate-spin text-gray-500" size={24} />
              </div>
            ) : searchResults.length > 0 ? (
              searchResults.map((item, index) => {
                // Determine available stock using stock or balance as a fallback.
                const availableStock = item.stock || item.balance || 0;
                return (
                  <div
                    key={item?._id}
                    className={`p-4 hover:bg-gray-100 transition-colors flex flex-col items-start gap-4 ${
                      index === selectedIndex ? "bg-gray-100" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4 w-full">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <p className="font-bold text-gray-800">{item.title}</p>
                        <p className="text-sm font-bold text-green-800">Price: ${item.price}</p>
                        {item?.balance !== null && item?.balance !== 0 && (
                          <p className="text-[15px] font-bold text-gray-800">
                            Balance: ${item?.balance}
                          </p>
                        )}
                      </div>
                    </div>
                    {/* Direct Add-to-Cart Button */}
                    <button
                      onClick={() => handleAddtoCart(item._id, availableStock)}
                      className={`w-full py-2 rounded-md transition-colors text-white ${
                        availableStock === 0
                          ? "bg-gray-500 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                      disabled={availableStock === 0}
                    >
                      {availableStock === 0 ? "Sold Out" : "Add to Cart"}
                    </button>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-500 p-4">No results found</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
