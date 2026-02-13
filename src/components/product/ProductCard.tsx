import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { SafeImage } from "@/components/ui/SafeImage";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [hidden, setHidden] = useState(false);

  if (hidden || !product.image) return null;

  return (
    <div className="group">
      <Link to={`/product/${product.id}`} className="block">
  <div className="aspect-square bg-secondary overflow-hidden mb-4 flex items-center justify-center">
    <SafeImage
      src={product.image}
      alt={product.name}
      className="w-full h-full object-contain transition-transform duration-500"
      fallback={null}
      onImageError={() => setHidden(true)}
    />
  </div>
</Link>

      
      <div className="space-y-2">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-medium group-hover:underline transition-all">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          {product.category}
        </p>
        <p className="text-sm">£{product.price}</p>
        
        <button
          onClick={() => addToCart(product)}
          className="w-full mt-3 py-2.5 text-xs uppercase tracking-[0.1em] border border-foreground 
                     hover:bg-foreground hover:text-background transition-all duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
