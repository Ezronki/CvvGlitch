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
      <DialogContent className="w-[90vw] sm:w-[80vw] lg:w-[70vw] max-w-[600px] max-h-[90vh] overflow-y-auto rounded-lg sm:p-10 p-6 shadow-xl bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={productDetails?.image}
              alt={productDetails?.title}
              width={600}
              height={600}
              className="aspect-square w-full object-cover"
            />
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Description:</h3>
              <p className="text-muted-foreground text-lg sm:text-xl mt-3 mb-4">
                {productDetails?.description}
              </p>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">
              {productDetails?.title}
            </h1>

            {/* Description */}
            

            {/* Pricing */}
            <div className="flex items-center justify-between">
              <p
                className={`text-xl sm:text-2xl font-bold text-primary ${
                  productDetails?.salePrice > 0 ? "line-through" : ""
                }`}
              >
                ${productDetails?.price}
              </p>
              {productDetails?.salePrice > 0 && (
                <p className="text-xl sm:text-2xl font-bold text-muted-foreground">
                  ${productDetails?.salePrice}
                </p>
              )}
            </div>

            {/* Ratings */}
            <div className="flex items-center gap-2 mt-2">
              <StarRatingComponent rating={averageReview} />
              <span className="text-muted-foreground text-sm">
                ({averageReview.toFixed(2)})
              </span>
            </div>

            {/* Add to Cart */}
            <div className="mt-5">
              {productDetails?.totalStock === 0 ? (
                <Button className="w-full opacity-60 cursor-not-allowed">
                  Out of Stock
                </Button>
              ) : (
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2"
                  onClick={() => {
                    dispatch(setProductDetails()); // Clear product details
                    navigate("/shop/cart");
                  }}
                >
                  Checkout
                </Button>
              )}
            </div>

            <Separator className="my-5" />

            {/* Reviews Section */}
            <div className="max-h-[250px] overflow-y-auto">
              <h2 className="text-lg sm:text-xl font-bold mb-3">Reviews</h2>
              <div className="grid gap-4">
                {reviews?.length > 0 ? (
                  reviews.map((reviewItem) => (
                    <div className="flex gap-4 items-start" key={reviewItem._id}>
                      <Avatar className="w-10 h-10 border">
                        <AvatarFallback>
                          {reviewItem?.userName[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <h3 className="font-semibold">{reviewItem?.userName}</h3>
                        <StarRatingComponent rating={reviewItem?.reviewValue} />
                        <p className="text-sm text-muted-foreground">
                          {reviewItem.reviewMessage}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <h1 className="text-muted-foreground">No Reviews</h1>
                )}
              </div>
            </div>

            {/* Write a Review */}
            <div className="mt-6">
              <Label>Write a review</Label>
              <div className="flex gap-1 my-2">
                <StarRatingComponent
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(event) => setReviewMsg(event.target.value)}
                placeholder="Write a review..."
              />
              <Button
                className="mt-3"
                onClick={handleAddReview}
                disabled={reviewMsg.trim() === ""}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
