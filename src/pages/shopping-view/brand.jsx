import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { fetchProductDetails } from "@/store/shop/products-slice";

const BrandProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const brand = searchParams.get("brand") || ""; // Avoid null brand

  

  useEffect(() => {
    const fetchBrandProducts = async () => {
      if (!brand) return; // Avoid API call if brand is empty

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/products?brand=${encodeURIComponent(brand)}`);
        const contentType = response.headers.get("content-type");
        const responseText = await response.text();

        // Log the status, headers, and response text
        console.log("Response Status:", response.status);
        console.log("Response Headers:", response.headers);
        console.log("Response Text:", responseText); // Log the response

        if (contentType && contentType.includes("application/json")) {
          let data;
          try {
            data = JSON.parse(responseText);
          } catch (e) {
            throw new Error("Invalid JSON response");
          }

          if (!data.success) {
            throw new Error(data.message || "Failed to fetch products");
          }

          setProductList(data.data);
        } else {
          // Handle non-JSON response
          setError(`Unexpected response format: ${responseText}`);
          console.error("Unexpected response format:", responseText);
        }
      } catch (err) {
        setError(err.message);
        console.error("Error parsing JSON:", err.message); // Log the error
      } finally {
        setLoading(false);
      }
    };

    fetchBrandProducts();
  }, [brand]);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4">Loading {brand} products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error loading products: {error}
      </div>
    );
  }

  return (
    <section className="mt-3">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          {brand ? `${brand}` : "Featured Products"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {productList.length > 0 ? (
            productList.map((productItem) => (
              <ShoppingProductTile
                key={productItem._id || productItem.id || Math.random()}
               
                product={productItem}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-12">
              No products found{brand ? ` for ${brand}` : ""}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BrandProductsPage;
