import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "@/store/shop/products-slice";
import { getSearchResults, resetSearchResults } from "@/store/shop/search-slice";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import debounce from "lodash.debounce";
import { Loader2, X } from "lucide-react";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1); // For keyboard navigation
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);

  // Open dialog when productDetails is updated
  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  // Debounced search logic
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

  // Update search when keyword changes
  useEffect(() => {
    updateSearch(keyword);
  }, [keyword, updateSearch]);

  // Click-away functionality
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle product click
  const handleProductClick = (productId) => {
    if (!productId) {
      console.error("Product ID is undefined");
      return;
    }
    console.log("Selected product ID:", productId); // Log the productId
    dispatch(fetchProductDetails(productId));
    setIsDropdownOpen(false);
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!isDropdownOpen || searchResults.length === 0) return;

    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      const selectedProduct = searchResults[selectedIndex];
      if (selectedProduct?.id) {
        handleProductClick(selectedProduct.id);
      } else {
        console.error("Selected product has no ID");
      }
    }
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
          onKeyDown={handleKeyDown}
          placeholder="Search products..."
          className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#04D94F]"
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

      {/* Dropdown with Framer Motion */}
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
              searchResults.map((item, index) => (
                <div
                  key={item.id}
                  className={`p-4 hover:bg-gray-100 cursor-pointer transition-colors flex items-center gap-4 ${
                    index === selectedIndex ? "bg-gray-100" : ""
                  }`}
                  onClick={() => handleProductClick(item.id)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  <div>
                    <p className="font-extrabold text-gray-800">{item.title}</p>
                    <p className="text-sm text-gray-500">Price: ${item.price}</p>
                    {item?.balance !== null && item?.balance !== 0 && (
                      <div className="flex justify-center items-center mb-2">
                        <span className="text-[15px] font-bold">
                          Balance: ${item?.balance}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 p-4">No results found</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Details Dialog */}
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
};

export default SearchBar;