import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";

const Checkout = () => {
  const { items, totalPrice } = useCart();
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // shipping + totals
  const shippingCost = totalPrice > 200 ? 0 : 15;
  const grandTotal = totalPrice + shippingCost; // in dollars

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isProcessing) return;

    if (items.length === 0) {
      toast({
        title: "Your cart is empty",
        description: "Please add some products before checking out.",
      });
      return;
    }

    // You could add basic form validation here if you want

    try {
      setIsProcessing(true);

      // Stripe expects the amount in the smallest currency unit
      // For USD: dollars -> cents (e.g. 199.99 -> 19999)
      const amountInCents = Math.round(grandTotal * 100);

      const response = await fetch(
        "http://127.0.0.1:8000/api/payments/create-checkout-session/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: amountInCents,
            currency: "usd",
            // You can also send customer info here if you want:
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.url) {
        console.error("Stripe error:", data);
        toast({
          title: "Payment error",
          description: "Something went wrong starting the payment. Please try again.",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }

      // Redirect user to Stripe Checkout
      window.location.href = data.url;
      // After this, Stripe takes over. User will return to
      // http://localhost:5173/order-confirmation on success (from backend success_url)

    } catch (error) {
      console.error(error);
      toast({
        title: "Network error",
        description: "Could not connect to payment server. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
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
                  <p className="font-medium mb-2">Test Mode</p>
                  <p className="text-muted-foreground">
                    Payments are currently in Stripe test mode. Use card number
                    <span className="font-mono"> 4242 4242 4242 4242</span> with
                    any future expiry date and any CVC to simulate a successful
                    payment.
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
                          <p className="text-sm font-medium">
                            {item.product.name}
                          </p>
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
                        {shippingCost === 0
                          ? "Free"
                          : `$${shippingCost.toFixed(2)}`}
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
                    {isProcessing ? "Redirecting to Stripe..." : "Pay with Card"}
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
