import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { API_BASE_URL } from "@/config";

/* =======================
   CURRENCY CONFIG
======================= */
type Currency = "USD" | "GBP" | "AED" | "AUD";

const currencySymbols: Record<Currency, string> = {
  USD: "$",
  GBP: "£",
  AED: "د.إ",
  AUD: "A$",
};

const exchangeRates: Record<Currency, number> = {
  USD: 1,
  GBP: 0.79,
  AED: 3.67,
  AUD: 1.52,
};

const Checkout = () => {
  const { items, totalPrice } = useCart(); // prices assumed in USD
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [currency, setCurrency] = useState<Currency>("USD");

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

  const convert = (usd: number) => usd * exchangeRates[currency];
  const format = (usd: number) =>
    `${currencySymbols[currency]}${convert(usd).toFixed(2)}`;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* =======================
     SHIPPING + TOTALS
  ======================= */
  const shippingCostUSD = items.reduce((sum, item) => {
    const charge =
      item.product.delivery_charges ||
      item.product.deliveryCharges ||
      0;
    return sum + Number(charge) * item.quantity;
  }, 0);

  const grandTotalUSD = totalPrice + shippingCostUSD;

  /* =======================
     SUBMIT
  ======================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isProcessing) return;

    if (items.length === 0) {
      toast({
        title: "Your cart is empty",
        description: "Please add products before checkout.",
      });
      return;
    }

    try {
      setIsProcessing(true);

      const response = await fetch(
        `${API_BASE_URL}/payments/create-checkout-session/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map((item) => ({
              product: { id: item.product.id },
              quantity: item.quantity,
            })),
            shipping_cost: shippingCostUSD,
            currency, // ✅ SEND CURRENCY
            ...formData,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Stripe error");
      }

      window.location.href = data.url;
    } catch (err) {
      toast({
        title: "Payment error",
        description: "Could not start payment.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="py-20 text-center">
          <h1 className="text-3xl font-serif mb-4">Your Cart is Empty</h1>
          <Link to="/shop" className="luxury-button">
            Continue Shopping
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-16">
        <div className="luxury-container">
          <h1 className="text-4xl font-serif text-center mb-12">
            Checkout
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 gap-16">

              {/* LEFT */}
              <div className="space-y-8">
                <input
                  name="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input name="firstName" placeholder="First name" required onChange={handleInputChange} className="px-4 py-3 border"/>
                  <input name="lastName" placeholder="Last name" required onChange={handleInputChange} className="px-4 py-3 border"/>
                </div>
                <input name="address" placeholder="Address" required onChange={handleInputChange} className="w-full px-4 py-3 border"/>
                <div className="grid grid-cols-2 gap-4">
                  <input name="city" placeholder="City" required onChange={handleInputChange} className="px-4 py-3 border"/>
                  <input name="postalCode" placeholder="Postal code" required onChange={handleInputChange} className="px-4 py-3 border"/>
                </div>
                <input name="country" placeholder="Country" required onChange={handleInputChange} className="w-full px-4 py-3 border"/>
                <input name="phone" placeholder="Phone" onChange={handleInputChange} className="w-full px-4 py-3 border"/>
              </div>

              {/* RIGHT */}
              <div className="bg-secondary p-8">

                {/* Currency selector */}
                <div className="flex justify-end mb-6">
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as Currency)}
                    className="border px-3 py-2 text-sm"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="AED">AED (د.إ)</option>
                    <option value="AUD">AUD (A$)</option>
                  </select>
                </div>

                <ul className="divide-y">
                  {items.map((item) => (
                    <li key={item.product.id} className="flex justify-between py-4">
                      <span>{item.product.name} × {item.quantity}</span>
                      <span>{format(item.product.price * item.quantity)}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{format(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shippingCostUSD === 0 ? "Free" : format(shippingCostUSD)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-medium border-t pt-4">
                    <span>Total</span>
                    <span>{format(grandTotalUSD)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="luxury-button w-full mt-6"
                >
                  {isProcessing ? "Redirecting..." : "Pay with Card"}
                </button>

              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
