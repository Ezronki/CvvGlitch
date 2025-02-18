// components/ProductCarousel.jsx
import { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import ShoppingProductTile from './ShoppingProductTile';

const ProductCarousel = ({ handleGetProductDetails }) => {
  const { productList } = useSelector((state) => state.shoppingProducts);
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start'
  }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);

  // Safe navigation methods
  const scrollPrev = useCallback(() => {
    emblaApi && emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi && emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      console.log('Carousel initialized');
    }
  }, [emblaApi]);

  if (!productList?.length) return null;

  return (
    <div className="relative py-8 group">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">
        Featured Products
      </h2>

      {/* Carousel Container */}
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {productList.map((product) => (
            <div 
              key={product._id}
              className="embla__slide min-w-0 flex-[0_0_85%] sm:flex-[0_0_45%] md:flex-[0_0_35%] lg:flex-[0_0_28%]"
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
          onClick={scrollPrev}
          className="p-2 rounded-full bg-black/30 hover:bg-black/50 text-white ml-auto translate-x-12 group-hover:translate-x-0 transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={scrollNext}
          className="p-2 rounded-full bg-black/30 hover:bg-black/50 text-white mr-auto -translate-x-12 group-hover:translate-x-0 transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductCarousel;