import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We'll respond within 24-48 hours.",
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      <div className="py-12 md:py-16">
        <div className="luxury-container">
          <div className="text-center mb-12">
            <p className="luxury-subheading mb-3">Get in Touch</p>
            <h1 className="text-4xl md:text-5xl luxury-heading">Contact Us</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-serif font-light mb-6">
                We'd Love to Hear From You
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Have a question about our products? Need help choosing the right 
                hair solution? Our team is here to assist you.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm uppercase tracking-[0.1em] font-medium mb-2">
                    Email
                  </h3>
                  <a
                    href="mailto:hello@sknhaircare.com"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    hello@sknhaircare.com
                  </a>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-[0.1em] font-medium mb-2">
                    Response Time
                  </h3>
                  <p className="text-muted-foreground">
                    We typically respond within 24-48 hours
                  </p>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-[0.1em] font-medium mb-2">
                    Business Hours
                  </h3>
                  <p className="text-muted-foreground">
                    Monday - Friday: 9am - 6pm (EST)
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="luxury-button w-full disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
