import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";
import { useNavigate } from "react-router-dom";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { reviews } = useSelector((state) => state.shopReview);
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleRatingChange(getRating) {
    console.log(getRating, "getRating");
    setRating(getRating);
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails()); // Clear product details when dialog closes
    setRating(0);
    setReviewMsg("");
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({
          title: "Review added successfully!",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  console.log(reviews, "reviews");

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="w-[90vw] sm:w-[80vw] lg:w-[70vw] max-w-[600px] max-h-[90vh] overflow-y-auto rounded-lg sm:p-10 p-6 shadow-xl bg-white dark:bg-gray-900">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={productDetails?.image}
              alt={productDetails?.title}
              width={600}
              height={600}
              className="aspect-square w-full object-contain" 
            />
            <h3 className="mt-2 text-left text-lg sm:text-xl font-bold mb-2 dark:text-white">
              Description:
            </h3>
            <p className="text-muted-foreground text-lg sm:text-xl mt-3 mb-4 dark:text-gray-300">
              {productDetails?.description}
            </p>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold dark:text-white">
              {productDetails?.title}
            </h1>

            {/* Pricing */}
            <div className="flex items-center justify-between">
              <p
                className={`text-xl text-green-800 sm:text-2xl font-bold text-primary ${
                  productDetails?.salePrice > 0 ? "line-through" : ""
                } dark:text-green-800`}
              >
                Price: ${productDetails?.price}
              </p>
              {productDetails?.salePrice > 0 && (
                <p className="text-xl sm:text-2xl font-bold text-muted-foreground dark:text-gray-300">
                  Price: ${productDetails?.salePrice}
                </p>
              )}
            </div>

            {/* Balance */}
            {productDetails?.balance !== null && productDetails?.balance !== 0 && (
              <div className="flex justify-left items-left mb-2">
                <span className="text-xl text-[15px] font-bold dark:text-white">
                  Balance: ${productDetails?.balance}
                </span>
              </div>
            )}

            {/* Ratings */}
            <div className="flex items-center gap-2 mt-2">
              <StarRatingComponent rating={averageReview} />
              <span className="text-muted-foreground text-sm dark:text-gray-400">
                ({averageReview.toFixed(2)})
              </span>
            </div>

            {/* Add to Cart */}
            <div className="mt-5">
              {productDetails?.totalStock === 0 ? (
                <Button className="w-full opacity-60 bg-red-500 cursor-not-allowed dark:bg-red-600">
                  SOLD OUT
                </Button>
              ) : (
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 dark:bg-blue-700 dark:hover:bg-blue-800"
                  onClick={() => {
                    dispatch(setProductDetails()); // Clear product details
                    navigate("/shop/checkout");
                  }}
                >
                  Checkout
                </Button>
              )}
            </div>

            <Separator className="my-5 dark:bg-gray-700" />

           
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;