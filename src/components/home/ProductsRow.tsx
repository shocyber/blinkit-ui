import ProductCard from "../ProductCard";

const ProductsRow = ({ products }: { products: any }) => {
  return (
    <section>
      <div className="flex items-center justify-between h-16">
        <h2 className="font-bold text-[26px] _text-default">Products</h2>
      </div>
      <div className="max-h-fit mb-8 flex w-full relative">
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-2  lg:grid-cols-6 md:grid-cols-4">
            {products?.map((item: any, i: number) => (
              <ProductCard key={i} data={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsRow;
