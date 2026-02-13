import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";
import { SafeImage } from "@/components/ui/SafeImage";

export const CartDrawer = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 transition-opacity duration-300",
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-md bg-background z-50 shadow-xl transition-transform duration-300 ease-out",
          isCartOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="text-lg font-serif font-light tracking-wide">Your Cart</h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 -mr-2 hover:opacity-70 transition-opacity"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-6">
                <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-6">Your cart is empty</p>
                <Link
                  to="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="luxury-button"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {items.map((item) => (
                  <li key={item.product.id} className="px-6 py-4">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 bg-secondary flex-shrink-0">
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
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          ${item.product.price}
                        </p>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-border">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                              }
                              className="p-1.5 hover:bg-secondary transition-colors"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-3 text-sm">{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                              className="p-1.5 hover:bg-secondary transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-xs text-muted-foreground hover:text-foreground transition-colors underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-border px-6 py-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Subtotal</span>
                <span className="text-lg font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Shipping & taxes calculated at checkout
              </p>
              <Link
                to="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="luxury-button w-full text-center"
              >
                Checkout
              </Link>
              <Link
                to="/cart"
                onClick={() => setIsCartOpen(false)}
                className="block text-center text-sm text-muted-foreground hover:text-foreground transition-colors underline"
              >
                View Cart
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
