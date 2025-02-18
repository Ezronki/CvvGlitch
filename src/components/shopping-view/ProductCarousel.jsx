// components/ProductCarousel.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import ShoppingProductTile from './product-tile';

const ProductCarousel = ({ handleGetProductDetails }) => {
  const { productList } = useSelector((state) => state.shoppingProducts);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <div className="relative px-4 py-8 group">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">
        Featured Products
      </h2>
      
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {productList.map((product) => (
            <div 
              key={product._id}
              className="flex-[0_0_80%] md:flex-[0_0_40%] lg:flex-[0_0_30%] xl:flex-[0_0_25%]"
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
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => emblaApi?.scrollNext()}
          className="p-2 rounded-full bg-black/30 hover:bg-black/50 text-white mr-auto -translate-x-12 group-hover:translate-x-0 transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {productList.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className="w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors"
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;