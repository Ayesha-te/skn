import { Layout } from "@/components/layout/Layout";

const RefundPolicy = () => {
  return (
    <Layout>
      <div className="py-12 md:py-16">
        <div className="luxury-container">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif font-light text-center mb-12">
              Refund Policy
            </h1>

            <div className="prose prose-sm max-w-none space-y-8 text-muted-foreground">
              <section>
                <h2 className="text-lg font-medium text-foreground mb-4">
                  Returns
                </h2>
                <p className="leading-relaxed">
                  We want you to be completely satisfied with your purchase. If you are 
                  not satisfied for any reason, you may return unused, unaltered items 
                  within 14 days of delivery for a full refund of the purchase price.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium text-foreground mb-4">
                  Return Conditions
                </h2>
                <p className="leading-relaxed mb-4">
                  To be eligible for a return, items must be:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Unused and in original condition</li>
                  <li>In original packaging with all tags attached</li>
                  <li>Free from any alterations, cuts, or styling</li>
                  <li>Returned within 14 days of delivery</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-medium text-foreground mb-4">
                  Non-Returnable Items
                </h2>
                <p className="leading-relaxed mb-4">
                  The following items cannot be returned:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Hair care products (shampoo, conditioner, styling products)</li>
                  <li>Items that have been worn, washed, or altered</li>
                  <li>Custom or made-to-order pieces</li>
                  <li>Items marked as final sale</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-medium text-foreground mb-4">
                  How to Initiate a Return
                </h2>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Contact us at hello@sknhaircare.com with your order number</li>
                  <li>Receive your Return Authorization (RA) number</li>
                  <li>Pack items securely in original packaging</li>
                  <li>Include the RA number on the outside of the package</li>
                  <li>Ship to the address provided in your RA email</li>
                </ol>
              </section>

              <section>
                <h2 className="text-lg font-medium text-foreground mb-4">
                  Refund Processing
                </h2>
                <p className="leading-relaxed">
                  Once we receive your return, we will inspect the item and process your 
                  refund within 5-7 business days. Refunds will be credited to your 
                  original payment method. Please note that it may take an additional 
                  3-5 business days for the refund to appear on your statement.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium text-foreground mb-4">
                  Exchanges
                </h2>
                <p className="leading-relaxed">
                  We do not offer direct exchanges. If you need a different item, please 
                  return your original purchase for a refund and place a new order.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium text-foreground mb-4">
                  Damaged or Defective Items
                </h2>
                <p className="leading-relaxed">
                  If you receive a damaged or defective item, please contact us within 
                  48 hours of delivery with photos of the issue. We will arrange for a 
                  replacement or full refund at no additional cost to you.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RefundPolicy;
