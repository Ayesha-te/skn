import { Link } from "react-router-dom";
import logo from "@/images/SKN transparent-03.png";

const footerLinks = {
  shop: [
    { name: "Hair Toppers", href: "/shop?category=Hair+Toppers" },
    { name: "Closures", href: "/shop?category=Closures" },
    { name: "Extensions", href: "/shop?category=Extensions" },
    { name: "Ponytails", href: "/shop?category=Ponytails" },
    { name: "Hair Care", href: "/shop?category=Hair+Care" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Shipping Policy", href: "/shipping" },
    { name: "Refund Policy", href: "/refund" },
    { name: "Terms & Conditions", href: "/terms" },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="luxury-container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <img
              src={logo}
              alt="SKN Hair Elegance"
              className="rounded-2xl h-[5rem] mb-4"
            />
            <p className="text-sm text-muted-foreground leading-relaxed">
              The world's first 100% virgin unprocessed human hair toppers and
              premium hair care products.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-medium mb-4">
              Shop
            </h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-medium mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-medium mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col items-center gap-3 text-center">
            <a
              href="https://www.instagram.com/skn_haircare?igsh=Nm4wdmpjMXVpYmR5&utm_source=qr"
              target="_blank"
              rel="noreferrer"
              className="luxury-link text-sm"
            >
              Follow us on Instagram @skn_haircare
            </a>
            <p className="text-xs text-muted-foreground">
              Ac {new Date().getFullYear()} SKN Hair Care. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
