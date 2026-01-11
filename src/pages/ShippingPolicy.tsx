import { Layout } from "@/components/layout/Layout";

const ShippingPolicy = () => {
  return (
    <Layout>
      <div className="py-12 md:py-16">
        <div className="luxury-container">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif font-light text-center mb-12">
              Shipping Policy
            </h1>

            <div className="prose prose-sm max-w-none space-y-8 text-muted-foreground">
              <section>
                <h2 className="text-lg font-medium text-foreground mb-4">
                  Processing Time
                </h2>
                <p className="leading-relaxed">
                  All orders are processed within 1-2 business days. Orders are not 
                  shipped or delivered on weekends or holidays. If we are experiencing 
                  a high volume of orders, shipments may be delayed by a few days.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium text-foreground mb-4">
                  Domestic Shipping (United States)
                </h2>
                <ul className="space-y-3">
                  <li>
                    <strong className="text-foreground">Standard Shipping:</strong> 3-5 business days - €15
                  </li>
                  <li>
                    <strong className="text-foreground">Express Shipping:</strong> 2-3 business days - €25
                  </li>
                  <li>
                    <strong className="text-foreground">Overnight Shipping:</strong> 1 business day - €40
                  </li>
                </ul>
                <p className="mt-4 leading-relaxed">
                  Free standard shipping on all orders over €200.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium text-foreground mb-4">
                  International Shipping
                </h2>
                <p className="leading-relaxed mb-4">
                  We ship to most countries worldwide. International shipping times vary 
                  by location:
                </p>
                <ul className="space-y-2">
                  <li>Canada: 5-10 business days</li>
                  <li>United Kingdom: 7-12 business days</li>
                  <li>Europe: 7-14 business days</li>
                  <li>Australia: 10-15 business days</li>
                  <li>Rest of World: 14-21 business days</li>
                </ul>
                <p className="mt-4 leading-relaxed">
                  International customers are responsible for any customs fees, duties, 
                  or taxes imposed by their country.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium text-foreground mb-4">
                  Order Tracking
                </h2>
                <p className="leading-relaxed">
                  Once your order has shipped, you will receive a shipping confirmation 
                  email with a tracking number. You can track your package using the 
                  carrier's website.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium text-foreground mb-4">
                  Shipping Restrictions
                </h2>
                <p className="leading-relaxed">
                  We cannot ship to P.O. boxes or APO/FPO addresses. Please provide a 
                  physical street address for delivery.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium text-foreground mb-4">
                  Lost or Damaged Packages
                </h2>
                <p className="leading-relaxed">
                  If your package is lost or arrives damaged, please contact us immediately 
                  at hello@sknhaircare.com. We will work with the carrier to resolve the 
                  issue and ensure you receive your order.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShippingPolicy;
