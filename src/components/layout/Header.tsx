import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAdminData } from "@/contexts/AdminDataContext";
import { cn } from "@/lib/utils";
import logo from "@/images/SKN transparent-03.png"

const navigation = [
  { name: "Shop", href: "/shop" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/faq" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { user, logout } = useAdminData();
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="luxury-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 -ml-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 rounded-md">
            <img src={logo} alt="SKN Hair Elegance" className="h-[10rem] rounded-2xl" />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "luxury-link text-sm uppercase tracking-[0.1em] font-light",
                  location.pathname === item.href && "after:scale-x-100"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center text-sm font-light text-muted-foreground">
                  <User className="h-5 w-5 mr-1" />
                  {user.username}
                </div>
                <button
                  onClick={logout}
                  className="luxury-link text-sm uppercase tracking-[0.1em] font-light"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className={cn(
                  "p-2 hover:text-primary transition-colors",
                  location.pathname === "/login" && "text-primary"
                )}
              >
                <User className="h-5 w-5" />
              </Link>
            )}
            {/* Cart button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 -mr-2"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-foreground text-background text-[10px] flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            mobileMenuOpen ? "max-h-[32rem] pb-4" : "max-h-0"
          )}
        >
          <div className="flex flex-col space-y-4 pt-4 border-t border-border">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "text-sm uppercase tracking-[0.1em] font-light py-1",
                  location.pathname === item.href && "font-medium"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};
