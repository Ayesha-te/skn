import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { useAdminData } from "@/contexts/AdminDataContext";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { addOrder } = useAdminData();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const deliveryChargesSum = items.reduce((sum, item) => {
    return sum + (item.product.deliveryCharges || 0) * item.quantity;
  }, 0);

  const shippingCost = deliveryChargesSum > 0 ? deliveryChargesSum : (totalPrice > 200 ? 0 : 15);
  const grandTotal = totalPrice + shippingCost;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Save order to admin data
    try {
      await addOrder({
        customer: formData,
        items: items.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image
        })),
        total: grandTotal,
        shipping: shippingCost
      });

      clearCart();
      setIsProcessing(false);
      
      toast({
        title: "Order Confirmed!",
        description: "Thank you for your purchase. You will receive a confirmation email shortly.",
      });
      
      navigate("/order-confirmation");
    } catch (error) {
      console.error("Order submission failed:", error);
      setIsProcessing(false);
      toast({
        title: "Order Failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="py-20 md:py-28 text-center">
          <div className="luxury-container">
            <h1 className="text-3xl md:text-4xl font-serif font-light mb-4">
              Your Cart is Empty
            </h1>
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
            Checkout
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Form */}
              <div className="space-y-8">
                {/* Contact */}
                <div>
                  <h2 className="text-lg font-medium mb-4">Contact</h2>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>

                {/* Shipping */}
                <div>
                  <h2 className="text-lg font-medium mb-4">Shipping Address</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground transition-colors"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground transition-colors"
                    />
                  </div>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full mt-4 px-4 py-3 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground transition-colors"
                  />
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground transition-colors"
                    />
                    <input
                      type="text"
                      name="postalCode"
                      placeholder="Postal code"
                      required
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground transition-colors"
                    />
                  </div>
                  <select
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full mt-4 px-4 py-3 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground transition-colors"
                  >
                    <option value="">Select country</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone (optional)"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full mt-4 px-4 py-3 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>

                {/* Payment Notice */}
                <div className="p-4 bg-secondary text-sm">
                  <p className="font-medium mb-2">Demo Mode</p>
                  <p className="text-muted-foreground">
                    This is a frontend demo. No actual payment will be processed.
                    Click "Place Order" to simulate a purchase.
                  </p>
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <div className="bg-secondary p-6 md:p-8">
                  <h2 className="text-lg font-medium mb-6">Order Summary</h2>

                  <ul className="divide-y divide-border">
                    {items.map((item) => (
                      <li key={item.product.id} className="flex gap-4 py-4">
                        <div className="w-16 h-16 bg-background relative">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute -top-2 -right-2 w-5 h-5 bg-foreground text-background text-xs flex items-center justify-center rounded-full">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.product.category}
                          </p>
                        </div>
                        <p className="text-sm">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-border mt-4 pt-4 space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>
                        {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                    {shippingCost > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Free shipping on orders over $200
                      </p>
                    )}
                  </div>

                  <div className="border-t border-border mt-4 pt-4">
                    <div className="flex justify-between text-lg font-medium">
                      <span>Total</span>
                      <span>${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="luxury-button w-full text-center mt-6 disabled:opacity-50"
                  >
                    {isProcessing ? "Processing..." : "Place Order"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
