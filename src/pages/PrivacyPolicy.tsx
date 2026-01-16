import { Layout } from "@/components/layout/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="py-12 md:py-16">
        <div className="luxury-container">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif font-light text-center mb-12">
              Privacy Policy
            </h1>

            <div className="prose prose-sm max-w-none space-y-8 text-muted-foreground">
              <p>Last updated: January 2026</p>

              <section>
                <h2 className="text-lg font-medium text-foreground mb-4">
                  Information We Collect
                </h2>
                <p className="leading-relaxed">
                  When you make a purchase or attempt to make a purchase through our site, 
                  we collect certain information from you, including your name, billing address, 
                  shipping address, payment information, email address, and phone number.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium text-foreground mb-4">
                  How We Use Your Information
                </h2>
                <p className="leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Fulfill orders and process transactions</li>
                  <li>Communicate with you about your order</li>
                  <li>Screen orders for potential risk or fraud</li>
                  <li>Provide you with information or advertising relating to our products</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-medium text-foreground mb-4">
                  Sharing Your Information
                </h2>
                <p className="leading-relaxed">
                  We share your Personal Information with third parties to help us use your 
                  Personal Information, as described above. We also use analytics services 
                  to help us understand how our customers use the site.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium text-foreground mb-4">
                  Your Rights
                </h2>
                <p className="leading-relaxed">
                  If you are a European resident, you have the right to access personal 
                  information we hold about you and to ask that your personal information 
                  be corrected, updated, or deleted. If you would like to exercise this 
                  right, please contact us.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium text-foreground mb-4">
                  Data Retention
                </h2>
                <p className="leading-relaxed">
                  When you place an order through the Site, we will maintain your Order 
                  Information for our records unless and until you ask us to delete this 
                  information.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium text-foreground mb-4">
                  Contact Us
                </h2>
                <p className="leading-relaxed">
                  For more information about our privacy practices, if you have questions, 
                  or if you would like to make a complaint, please contact us by email at 
                  helpdesk@sknhaircare.com.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
