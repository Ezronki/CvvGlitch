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
    setRating(getRating);
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
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

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="w-[95vw] sm:w-[80vw] lg:w-[70vw] max-w-[800px] max-h-[90vh] overflow-y-auto rounded-xl sm:p-8 p-4 shadow-2xl bg-white dark:bg-gray-900 border-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Product Image Section */}
          <div className="relative group overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
            <img
              src={productDetails?.image}
              alt={productDetails?.title}
              className="w-full h-64 object-contain transition-transform duration-300 hover:scale-105"
            />
            <div className="p-4 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Product Details
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {productDetails?.description}
              </p>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {productDetails?.title}
              </h1>
              
              {/* Pricing */}
              <div className="flex items-center gap-4 mb-4">
                <span className={`text-xl font-bold ${
                  productDetails?.salePrice > 0 
                    ? "text-gray-400 dark:text-gray-500 line-through"
                    : "text-green-600 dark:text-green-400"
                }`}>
                  ${productDetails?.price}
                </span>
                {productDetails?.salePrice > 0 && (
                  <span className="text-xl font-bold text-green-600 dark:text-green-400">
                    ${productDetails?.salePrice}
                  </span>
                )}
              </div>

              {/* Stock Info */}
              {productDetails?.balance !== null && productDetails?.balance !== 0 && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>Available Balance:</span>
                  <span className="font-medium">${productDetails?.balance}</span>
                </div>
              )}

              {/* Ratings */}
              <div className="flex items-center gap-2">
                <StarRatingComponent rating={averageReview} />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ({reviews?.length} reviews)
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="space-y-4">
              {productDetails?.totalStock === 0 ? (
                <Button 
                  className="w-full bg-red-500/90 hover:bg-red-600 text-white transition-colors"
                  disabled
                >
                  Out of Stock
                </Button>
              ) : (
                <Button
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition-colors"
                  onClick={() => {
                    dispatch(setProductDetails());
                    navigate("/shop/cart");
                  }}
                >
                  Proceed to Checkout
                </Button>
              )}
            </div>

            <Separator className="dark:bg-gray-700" />

            {/* Reviews Section */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Customer Reviews
              </h2>
              
              <div className="space-y-4 max-h-[200px] overflow-y-auto pr-2">
                {reviews?.length > 0 ? (
                  reviews.map((reviewItem) => (
                    <div 
                      key={reviewItem._id}
                      className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8 border dark:border-gray-600">
                          <AvatarFallback className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300">
                            {reviewItem?.userName[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-900 dark:text-gray-200">
                              {reviewItem?.userName}
                            </h3>
                            <StarRatingComponent 
                              rating={reviewItem?.reviewValue}
                              starSize="16px"
                            />
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            {reviewItem.reviewMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                    No reviews yet
                  </div>
                )}
              </div>

              {/* Add Review Section */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-gray-900 dark:text-gray-200">
                    Write a Review
                  </Label>
                  <div className="flex items-center gap-2">
                    <StarRatingComponent
                      rating={rating}
                      handleRatingChange={handleRatingChange}
                      starSize="24px"
                    />
                  </div>
                  <Input
                    value={reviewMsg}
                    onChange={(e) => setReviewMsg(e.target.value)}
                    placeholder="Share your experience..."
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                </div>
                <Button
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={handleAddReview}
                  disabled={!reviewMsg.trim() || rating === 0}
                >
                  Submit Review
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;