import ProductFilter from "@/components/shopping-view/filter";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { sortOptions } from "@/config";

import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const categories = [
  { id: "usa_banks", label: "USA Banks", path: "/shop/listing?category=usa_banks" },
  { id: "uk_banks", label: "UK Banks", path: "/shop/listing?category=uk_banks" },
  { id: "canada_banks", label: "Canada Banks", path: "/shop/listing?category=canada_banks" },
  { id: "cc_cvv", label: "CC & CVV", path: "/shop/listing?category=cc_cvv" },
  { id: "stealth_accountss", label: "Stealth Accounts", path: "/shop/listing?category=stealth_accountss" },
  { id: "fullz", label: "Fullz", path: "/shop/listing?category=fullz" },
  { id: "toolss", label: "Tools", path: "/shop/listing?category=toolss" },
  { id: "e_gift_cardss", label: "E-Gift Cards", path: "/shop/listing?category=e_gift_cards" },
  { id: "clones", label: "Clones", path: "/shop/listing?category=clones" },
  { id: "carded_products", label: "Carded Products", path: "/shop/listing?category=carded_products" },
  { id: "cashapp", label: "CashApp", path: "/shop/listing?category=cashapp" },
  { id: "paypal", label: "PayPal", path: "/shop/listing?category=paypal" },
  { id: "clm", label: "Cashapp Linkables", path: "/shop/listing?category=clm" },
  { id: "ppm", label: "Paypal Linkables", path: "/shop/listing?category=ppm" },
  { id: "venmom", label: "Venmo", path: "/shop/listing?category=venmom" },
  { id: "applepaym", label: "ApplePay", path: "/shop/listing/category=applepaym" },
  { id: "gpaym", label: "GooglePay", path: "/shop/listing?category=gpaym" },
  { id: "dump", label: "Dumps", path: "/shop/dump" }
];

function ShoppingListing() {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector((state) => state.shopProducts);
 
  const { user } = useSelector((state) => state.auth);

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Ensure categorySearchParam is initialized before using it
  const categorySearchParam = searchParams.get("category");
  const categoryData = categories.find((cat) => cat.id === categorySearchParam);
  const categoryTitle = categoryData ? categoryData.label : "All Products";

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { toast } = useToast();

  function handleSort(value) {
    setSort(value);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParam]);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = new URLSearchParams(filters).toString();
      setSearchParams(createQueryString);
    }
  }, [filters]);

  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(fetchAllFilteredProducts({ filterParams: filters, sortParams: sort }));
  }, [dispatch, sort, filters]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-1 gap-6 p-4 md:p-6">
      <div className="bg-[#040c1b] w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-3xl text-white font-extrabold">{categoryTitle}</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">{productList?.length} Products</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
              <ShoppingProductTile
                key={productItem.id}
                handleGetProductDetails={handleGetProductDetails}
                product={productItem}
                
              />
            ))
            : null}
        </div>
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
      
    </div>
    
  );
}

export default ShoppingListing;
