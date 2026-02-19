import { memo } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '@types/index';
import { formatPrice } from '@utils/format';

interface ProductCardProps {
  product: Product & {
    images?: { url: string }[];
  };
}

function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.images?.[0]?.url || '/placeholder-product.jpg';

  return (
    <Link
      to={`/product/${product.slug}`}
      className="block bg-tg-secondary-bg rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      {/* Product Image */}
      <div className="aspect-square overflow-hidden bg-tg-bg">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Product Info */}
      <div className="p-3">
        <h3 className="font-medium text-tg-text text-sm line-clamp-2 mb-1">
          {product.name}
        </h3>

        {/* Rating */}
        {product.rating > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <span className="text-yellow-500 text-xs">★</span>
            <span className="text-tg-hint text-xs">{product.rating.toFixed(1)}</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="font-bold text-tg-text text-base">
            {formatPrice(product.price)}
          </span>

          <button
            className="bg-tg-button text-tg-button-text px-3 py-1.5 rounded-lg text-xs font-medium hover:opacity-90 transition-opacity"
            onClick={(e) => e.preventDefault()}
          >
            Ko'rish
          </button>
        </div>
      </div>
    </Link>
  );
}

export default memo(ProductCard);
