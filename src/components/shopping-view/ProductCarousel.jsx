// components/ProductCarousel.jsx
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import ShoppingProductTile from '../../components/shopping-view/product-tile';

const ProductCarousel = ({ handleGetProductDetails }) => {
  const { productList } = useSelector((state) => state.shoppingProducts);
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start'
  }, [Autoplay({ delay: 5000 })]);

  useEffect(() => {
    if (emblaApi) {
      // Optional: Add any carousel event listeners here
    }
  }, [emblaApi]);

  if (!productList?.length) return null;

  return (
    <section className="relative py-8 group">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">
        Featured Products
      </h2>
      
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {productList.map((product) => (
            <div 
              key={product._id}
              className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_45%] md:flex-[0_0_35%] lg:flex-[0_0_28%]"
            >
              <ShoppingProductTile 
                product={product}
                handleGetProductDetails={handleGetProductDetails}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full px-4 hidden md:flex">
        <button
          onClick={() => emblaApi?.scrollPrev()}
          className="p-2 rounded-full bg-black/30 hover:bg-black/50 text-white ml-auto translate-x-12 group-hover:translate-x-0 transition-all"
        >
          {/* Chevron left icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => emblaApi?.scrollNext()}
          className="p-2 rounded-full bg-black/30 hover:bg-black/50 text-white mr-auto -translate-x-12 group-hover:translate-x-0 transition-all"
        >
          {/* Chevron right icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default ProductCarousel;