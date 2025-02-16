import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { fetchProductDetails } from "@/store/shop/products-slice";
import { getSearchResults, resetSearchResults } from "@/store/shop/search-slice";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import debounce from "lodash.debounce";

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

  const updateSearch = useCallback(
    debounce((searchTerm) => {
      if (searchTerm.trim().length > 3) {
        setSearchParams(new URLSearchParams(`?keyword=${searchTerm}`));
        dispatch(getSearchResults(searchTerm));
      } else {
        setSearchParams(new URLSearchParams(""));
        dispatch(resetSearchResults());
      }
    }, 500),
    []
  );

  useEffect(() => {
    updateSearch(keyword);
  }, [keyword, updateSearch]);

  function handleGetProductDetails(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="mt-10 container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            value={keyword}
            name="keyword"
            onChange={(event) => setKeyword(event.target.value)}
            className="py-6"
            placeholder="Search Products..."
          />
        </div>
      </div>
      {!searchResults?.length ? (
        <h1 className="text-2xl text-white font-extrabold">No results found!</h1>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchResults?.map((item) => (
          <ShoppingProductTile
            key={item.id}
            product={item}
            handleGetProductDetails={handleGetProductDetails}
          />
        ))}
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
      <div className="flex flex-col md:flex-row justify-center items-center gap-6">
        <div className="text-center md:text-left">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Cvvglitch. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SearchProducts;
