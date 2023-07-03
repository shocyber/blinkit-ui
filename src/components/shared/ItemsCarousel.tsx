import Carousel from 'react-multi-carousel';
import { shuffleItems } from '../../utils/helper';
import { ProductItem } from '../../utils/types';
import CarouselButtonGroup from '../CarouselButtonGroup';
import ProductCard from '../ProductCard';
import 'react-multi-carousel/lib/styles.css';

type Props = {
  topItems: ProductItem[];
};

const responsive = {
  uhdDesktop: {
    breakpoint: { max: 1920, min: 1440 },
    items: 7,
    slidesToSlide: 7,
    partialVisibilityGutter: 10,
  },
  superLargeDesktop: {
    breakpoint: { max: 1440, min: 1200 },
    items: 6,
    slidesToSlide: 6,
    partialVisibilityGutter: 10,
  },
  largeDesktop: {
    breakpoint: { max: 1200, min: 1024 },
    items: 5,
    slidesToSlide: 5,
    partialVisibilityGutter: 10,
  },
  desktop: {
    breakpoint: { max: 1024, min: 767 },
    items: 4,
    slidesToSlide: 4,
    partialVisibilityGutter: 10,
  },
  tablet: {
    breakpoint: { max: 767, min: 560 },
    items: 3,
    slidesToSlide: 3,
    partialVisibilityGutter: 10,
  },
  mobile: {
    breakpoint: { max: 560, min: 420 },
    items: 2,
    slidesToSlide: 2,
    partialVisibilityGutter: 10,
  },
  minimobile: {
    breakpoint: { max: 420, min: 0 },
    items: 2,
    slidesToSlide: 1,
    partialVisibilityGutter: -20,
  },
};

const ItemsCarousel = ({ products }: { products: [] }) => {
  return (
    <div className="max-h-fit mb-8 flex w-full relative">
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-2  lg:grid-cols-6 md:grid-cols-4">
          {products?.map((item, i) => (
            <ProductCard key={i} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemsCarousel;
