import { Layout } from "@/components/layout/Layout";

const Terms = () => {
  return (
    <Layout>
      <div className="py-12 md:py-16">
        <div className="luxury-container">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif font-light text-center mb-12">
              Terms & Conditions
            </h1>

            <div className="prose prose-sm max-w-none space-y-8 text-muted-foreground">
              <p>Last updated: January 2026</p>

              <section>
                <h2 className="text-lg font-medium text-foreground mb-4">
                  Overview
                </h2>
                <p className="leading-relaxed">
                  This website is operated by SKN Hair Care. Throughout the site, the terms 
                  "we", "us" and "our" refer to SKN Hair Care. By visiting our site and/or 
                  purchasing something from us, you engage in our "Service" and agree to be 
                  bound by these terms and conditions.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium text-foreground mb-4">
                  Online Store Terms
                </h2>
                <p className="leading-relaxed mb-4">
                  By agreeing to these Terms of Service, you represent that you are at least 
                  the age of majority in your state or province of residence. You may not use 
                  our products for any illegal or unauthorized purpose.
                </p>
                <p className="leading-relaxed">
                  A breach or violation of any of the Terms will result in an immediate 
                  termination of your Services.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium text-foreground mb-4">
                  Accuracy of Information
                </h2>
                <p className="leading-relaxed">
                  We are not responsible if information made available on this site is not 
                  accurate, complete or current. The material on this site is provided for 
                  general information only. We reserve the right to modify the contents of 
                  this site at any time.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium text-foreground mb-4">
                  Products & Pricing
                </h2>
                <p className="leading-relaxed mb-4">
                  Prices for our products are subject to change without notice. We reserve 
                  the right to modify or discontinue the Service (or any part or content 
                  thereof) without notice at any time.
                </p>
                <p className="leading-relaxed">
                  We do not warrant that the quality of any products, services, information, 
                  or other material purchased or obtained by you will meet your expectations.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium text-foreground mb-4">
                  Payment
                </h2>
                <p className="leading-relaxed">
                  We accept major credit cards and other payment methods as displayed at 
                  checkout. By submitting your order, you authorize us to charge your 
                  payment method for the total amount of your order including shipping 
                  and applicable taxes.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium text-foreground mb-4">
                  Intellectual Property
                </h2>
                <p className="leading-relaxed">
                  All content on this website, including text, graphics, logos, images, and 
                  software, is the property of SKN Hair Care and is protected by copyright 
                  and trademark laws. You may not reproduce, distribute, or create derivative 
                  works without our express written permission.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium text-foreground mb-4">
                  Limitation of Liability
                </h2>
                <p className="leading-relaxed">
                  In no case shall SKN Hair Care, our directors, officers, employees, 
                  affiliates, agents, contractors, or suppliers be liable for any injury, 
                  loss, claim, or any direct, indirect, incidental, punitive, special, or 
                  consequential damages of any kind.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium text-foreground mb-4">
                  Governing Law
                </h2>
                <p className="leading-relaxed">
                  These Terms of Service and any separate agreements whereby we provide you 
                  Services shall be governed by and construed in accordance with the laws 
                  of the United States.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium text-foreground mb-4">
                  Contact Information
                </h2>
                <p className="leading-relaxed">
                  Questions about the Terms of Service should be sent to us at 
                  hello@sknhaircare.com.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
