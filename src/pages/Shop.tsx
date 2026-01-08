import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/product/ProductCard";
import { cn } from "@/lib/utils";
import { useAdminData } from "@/contexts/AdminDataContext";

const Shop = () => {
  const { products, categories: backendCategories } = useAdminData();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "All";
  const [activeCategory, setActiveCategory] = useState(categoryParam);

  const displayCategories = useMemo(() => {
    return ["All", ...backendCategories.map(c => c.name)];
  }, [backendCategories]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return products;
    
    // Find category ID by name
    const category = backendCategories.find(c => c.name === activeCategory);
    if (!category) return [];

    return products.filter((product) => 
      product.category?.toString() === category.id.toString()
    );
  }, [activeCategory, products, backendCategories]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  return (
    <Layout>
      <div className="py-12 md:py-16">
        <div className="luxury-container">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="luxury-subheading mb-3">Collection</p>
            <h1 className="text-4xl md:text-5xl luxury-heading">Shop</h1>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
            {displayCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={cn(
                  "px-4 py-2 text-xs uppercase tracking-[0.1em] border transition-all duration-300",
                  activeCategory === category
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-foreground border-border hover:border-foreground"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No products found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
