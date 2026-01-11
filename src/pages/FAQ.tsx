import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { cn } from "@/lib/utils";

const faqCategories = [
  {
    name: "Products",
    questions: [
      {
        q: "What makes your hair 100% virgin unprocessed?",
        a: "Our virgin hair has never been chemically treated, dyed, permed, or processed in any way. It retains its natural cuticle layer, ensuring the softest, most natural-looking hair that lasts for years.",
      },
      {
        q: "How do I choose the right hair topper for me?",
        a: "Consider your coverage needs, base size preference, and desired length. Our silk base toppers offer the most natural scalp appearance, while lace front options provide a seamless hairline. Contact us for personalized recommendations.",
      },
      {
        q: "Can I color or heat style your products?",
        a: "Yes! Because our hair is 100% virgin human hair, you can color, bleach, curl, straighten, and style it just like your natural hair. We recommend professional coloring for best results.",
      },
      {
        q: "How long do your hair products last?",
        a: "With proper care, our hair toppers and extensions can last 1-3 years. Hair care products like shampoo and conditioner should be used within 12 months of opening.",
      },
    ],
  },
  {
    name: "Shipping",
    questions: [
      {
        q: "Do you ship internationally?",
        a: "Yes, we ship worldwide. International shipping times vary by location, typically 7-14 business days. All orders are shipped with tracking information.",
      },
      {
        q: "How long does shipping take?",
        a: "Domestic orders (US) ship within 1-2 business days and arrive in 3-5 business days. Express shipping options are available at checkout.",
      },
      {
        q: "Is shipping free?",
        a: "We offer free standard shipping on all orders over €200. Orders under €200 have a flat shipping rate of €15.",
      },
      {
        q: "Can I track my order?",
        a: "Yes, you'll receive a tracking number via email once your order ships. You can track your package directly from the carrier's website.",
      },
    ],
  },
  {
    name: "Returns & Refunds",
    questions: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 14 days of delivery for unused, unaltered products in original packaging. Hair care products are final sale for hygiene reasons.",
      },
      {
        q: "How do I initiate a return?",
        a: "Contact our customer service team at hello@sknhaircare.com with your order number. We'll provide a return authorization and shipping instructions.",
      },
      {
        q: "When will I receive my refund?",
        a: "Refunds are processed within 5-7 business days after we receive your return. The refund will be credited to your original payment method.",
      },
    ],
  },
  {
    name: "Care & Maintenance",
    questions: [
      {
        q: "How do I wash my hair topper or extensions?",
        a: "Use lukewarm water and our sulfate-free shampoo. Gently work the product through the hair, rinse thoroughly, and apply conditioner from mid-length to ends. Air dry whenever possible.",
      },
      {
        q: "How often should I wash my hair piece?",
        a: "We recommend washing after every 6-8 wears, or when product buildup is noticeable. Over-washing can reduce the lifespan of your hair piece.",
      },
      {
        q: "How should I store my hair products?",
        a: "Store hair toppers and extensions on a wig stand or mannequin head to maintain shape. Keep in a cool, dry place away from direct sunlight.",
      },
    ],
  },
];

const FAQ = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Layout>
      <div className="py-12 md:py-16">
        <div className="luxury-container">
          <div className="text-center mb-12">
            <p className="luxury-subheading mb-3">Help Center</p>
            <h1 className="text-4xl md:text-5xl luxury-heading">
              Frequently Asked Questions
            </h1>
          </div>

          <div className="max-w-3xl mx-auto space-y-12">
            {faqCategories.map((category) => (
              <div key={category.name}>
                <h2 className="text-xl font-serif font-light mb-6 pb-2 border-b border-border">
                  {category.name}
                </h2>
                <div className="space-y-0">
                  {category.questions.map((item, index) => {
                    const key = `${category.name}-${index}`;
                    const isOpen = openItems[key];

                    return (
                      <div key={key} className="border-b border-border">
                        <button
                          onClick={() => toggleItem(key)}
                          className="flex items-start justify-between w-full py-4 text-left"
                        >
                          <span className="text-sm font-medium pr-4">
                            {item.q}
                          </span>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 flex-shrink-0 mt-0.5 transition-transform duration-300",
                              isOpen && "rotate-180"
                            )}
                          />
                        </button>
                        <div
                          className={cn(
                            "overflow-hidden transition-all duration-300",
                            isOpen ? "max-h-48 pb-4" : "max-h-0"
                          )}
                        >
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.a}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="max-w-xl mx-auto text-center mt-16 p-8 bg-secondary">
            <h3 className="text-lg font-serif mb-2">Still Have Questions?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Our team is here to help you find the perfect solution.
            </p>
            <a href="/contact" className="luxury-button-outline text-sm">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
