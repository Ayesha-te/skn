import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, FileDown } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { API_BASE_URL } from "@/config";

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");

  return (
    <Layout>
      <div className="py-20 md:py-28">
        <div className="luxury-container">
          <div className="max-w-lg mx-auto text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-6 text-foreground" />
            
            <h1 className="text-3xl md:text-4xl font-serif font-light mb-4">
              Thank You!
            </h1>
            
            <p className="text-lg text-muted-foreground mb-2">
              Your order has been placed successfully.
            </p>
            
            <p className="text-muted-foreground mb-8">
              A confirmation email will be sent to your email address shortly.
            </p>

            {orderId && (
              <div className="mb-8">
                <a 
                  href={`${API_BASE_URL}/payments/generate-receipt/${orderId}/`}
                  className="inline-flex items-center gap-2 text-sm font-medium underline hover:text-muted-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileDown className="w-4 h-4" />
                  Download Your Receipt (PDF)
                </a>
              </div>
            )}

            <div className="bg-secondary p-6 mb-8 text-left">
              <h2 className="font-medium mb-4">What's Next?</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• You'll receive an order confirmation email</li>
                <li>• We'll notify you when your order ships</li>
                <li>• Track your package with the provided tracking number</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop" className="luxury-button">
                Continue Shopping
              </Link>
              <Link to="/" className="luxury-button-outline">
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
