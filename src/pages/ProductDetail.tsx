import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Minus, Plus, ChevronDown } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/product/ProductCard";
import { useAdminData } from "@/contexts/AdminDataContext";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useAdminData();
  const product = useMemo(() => products.find(p => p.id?.toString() === id), [products, id]);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>("description");

  if (!product) {
    return (
      <Layout>
        <div className="py-20 text-center">
          <h1 className="text-2xl font-serif mb-4">Product Not Found</h1>
          <Link to="/shop" className="luxury-link">
            Return to Shop
          </Link>
        </div>
      </Layout>
    );
  }

  const relatedProducts = useMemo(() => {
    return products
      .filter((p) => p.category === product?.category && p.id !== product?.id)
      .slice(0, 4);
  }, [products, product]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  const accordionItems = [
    {
      id: "description",
      title: "Description",
      content: product.description,
    },
    {
      id: "details",
      title: "Product Details",
      content: product.details,
    },
    {
      id: "care",
      title: "Care Instructions",
      content:
        "Handle with care. Wash with sulfate-free shampoo. Use lukewarm water. Air dry when possible. Store on a wig stand when not in use.",
    },
  ];

  return (
    <Layout>
      <div className="py-12 md:py-16">
        <div className="luxury-container">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link to="/shop" className="hover:text-foreground transition-colors">
                  Shop
                </Link>
              </li>
              <li>/</li>
              <li className="text-foreground">{product.name}</li>
            </ol>
          </nav>

          {/* Product Section */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            {/* Images & Video */}
            <div className="space-y-4">
              <div className="aspect-square bg-secondary overflow-hidden">
                {activeImage === -1 && product.video ? (
                  <video src={product.video} controls className="w-full h-full object-cover" />
                ) : (
                  <img
                    src={activeImage === -2 ? product.image : (product.images[activeImage]?.image || product.image)}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setActiveImage(-2)}
                  className={cn(
                    "w-20 h-20 bg-secondary transition-opacity",
                    activeImage === -2 ? "opacity-100 ring-1 ring-foreground" : "opacity-50 hover:opacity-75"
                  )}
                >
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </button>
                {product.images.map((imgObj, index) => (
                  <button
                    key={imgObj.id}
                    onClick={() => setActiveImage(index)}
                    className={cn(
                      "w-20 h-20 bg-secondary transition-opacity",
                      activeImage === index ? "opacity-100 ring-1 ring-foreground" : "opacity-50 hover:opacity-75"
                    )}
                  >
                    <img
                      src={imgObj.image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
                {product.video && (
                  <button
                    onClick={() => setActiveImage(-1)}
                    className={cn(
                      "w-20 h-20 bg-secondary flex items-center justify-center transition-opacity",
                      activeImage === -1 ? "opacity-100 ring-1 ring-foreground" : "opacity-50 hover:opacity-75"
                    )}
                  >
                    <div className="text-[10px] uppercase font-bold">Video</div>
                  </button>
                )}
              </div>
            </div>

            {/* Info */}
            <div>
              <p className="luxury-subheading mb-2">{product.category}</p>
              <h1 className="text-3xl md:text-4xl font-serif font-light mb-4">
                {product.name}
              </h1>
              <p className="text-2xl mb-6">€{product.price}</p>

              <p className="text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Quantity & Add to Cart */}
              <div className="flex gap-4 mb-8">
                <div className="flex items-center border border-border">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-3 hover:bg-secondary transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-3 hover:bg-secondary transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button onClick={handleAddToCart} className="flex-1 luxury-button">
                  Add to Cart
                </button>
              </div>

              {/* Accordion */}
              <div className="border-t border-border">
                {accordionItems.map((item) => (
                  <div key={item.id} className="border-b border-border">
                    <button
                      onClick={() =>
                        setOpenAccordion(openAccordion === item.id ? null : item.id)
                      }
                      className="flex items-center justify-between w-full py-4 text-left"
                    >
                      <span className="text-sm font-medium">{item.title}</span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-300",
                          openAccordion === item.id && "rotate-180"
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300",
                        openAccordion === item.id ? "max-h-48 pb-4" : "max-h-0"
                      )}
                    >
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-20 md:mt-28">
              <h2 className="text-2xl md:text-3xl font-serif font-light text-center mb-10">
                You May Also Like
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
