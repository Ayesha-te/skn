import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { useCart } from "@/contexts/CartContext";
import { SafeImage } from "@/components/ui/SafeImage";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="py-20 md:py-28 text-center">
          <div className="luxury-container">
            <h1 className="text-3xl md:text-4xl font-serif font-light mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-muted-foreground mb-8">
              Discover our premium hair care collection.
            </p>
            <Link to="/shop" className="luxury-button">
              Continue Shopping
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-12 md:py-16">
        <div className="luxury-container">
          <h1 className="text-3xl md:text-4xl font-serif font-light text-center mb-12">
            Shopping Cart
          </h1>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="border-t border-border">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-6 py-6 border-b border-border"
                  >
                    <Link
                      to={`/product/${item.product.id}`}
                      className="w-24 h-24 md:w-32 md:h-32 bg-secondary flex-shrink-0"
                    >
                      <SafeImage
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        fallback={
                          <div className="w-full h-full flex items-center justify-center text-[10px] uppercase tracking-[0.15em] text-muted-foreground bg-muted/10">
                            Image
                          </div>
                        }
                      />
                    </Link>

                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between">
                        <div>
                          <Link
                            to={`/product/${item.product.id}`}
                            className="font-medium hover:underline"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.product.category}
                          </p>
                        </div>
                        <p className="font-medium">${item.product.price}</p>
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center border border-border">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="p-2 hover:bg-secondary transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-10 text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="p-2 hover:bg-secondary transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/shop"
                className="inline-block mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors underline"
              >
                Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-secondary p-6 md:p-8">
                <h2 className="text-lg font-medium mb-6">Order Summary</h2>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>

                <div className="border-t border-border mt-6 pt-6">
                  <div className="flex justify-between text-lg font-medium">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <Link to="/checkout" className="luxury-button w-full text-center mt-6">
                  Proceed to Checkout
                </Link>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Taxes and shipping calculated at checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
