import { Link } from "react-router-dom";
import { ProductCard } from "@/components/product/ProductCard";
import { Layout } from "@/components/layout/Layout";
import hero from "@/images/1st.jpeg";
import { useAdminData } from "@/contexts/AdminDataContext";
import promiseImg from "@/images/2nd.jpeg";


const Index = () => {
  const { products, categories: backendCategories, collections } = useAdminData();
  const featuredProducts = products.filter(p => p.featured);
  const bestsellers = products.filter(p => p.bestseller);
  const newArrivals = [...products].sort((a, b) => {
    const dateA = new Date(a.created_at || 0).getTime();
    const dateB = new Date(b.created_at || 0).getTime();
    return dateB - dateA;
  }).slice(0, 4);

  const displayCategories = backendCategories.slice(0, 3).map(c => ({
    id: c.id,
    name: c.name,
    description: c.description || "Premium hair collection",
    image: c.image,
    href: `/shop?category=${encodeURIComponent(c.name)}`,
  }));

  return (
    <Layout>
      {/* Hero Section */}
      <section
  className="
    relative
    h-[70vh]
    sm:h-[80vh]
    md:h-[85vh]
    min-h-[420px]
    md:min-h-[600px]
    flex
    items-center
    bg-cover
    bg-center
  "
  style={{
    backgroundImage: `url(${hero})`,
  }}
>

  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/55"></div>

  <div className="luxury-container relative z-10">
    <div className="max-w-2xl animate-fade-in-up text-white">
      <p className="luxury-subheading mb-4 text-white/80">
        The World's First
      </p>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light leading-tight mb-6 text-white">
        100% Virgin Unprocessed Human Hair Toppers
      </h1>

      <p className="text-white/85 text-lg mb-8 leading-relaxed">
        Experience the luxury of natural beauty with our premium virgin hair collection.
        Ethically sourced, expertly crafted, beautifully yours.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/shop"
          className="luxury-button bg-white text-black hover:bg-white/90"
        >
          Shop Collection
        </Link>

        <Link
          to="/about"
          className="luxury-button-outline border-white text-white hover:bg-white hover:text-black"
        >
          Our Story
        </Link>
      </div>
    </div>
  </div>
</section>


      {/* Collections Section */}
      {collections.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="luxury-container">
            <div className="text-center mb-12">
              <p className="luxury-subheading mb-3">Featured</p>
              <h2 className="text-3xl md:text-4xl luxury-heading">Our Collections</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {collections.map((collection, index) => (
                <Link
                  key={collection.id}
                  to={`/shop?category=${encodeURIComponent(collection.name)}`}
                  className="group relative aspect-[4/5] bg-secondary overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {collection.image && (
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                    <h3 className="text-2xl font-serif font-light mb-2 text-white group-hover:tracking-wider transition-all duration-300">
                      {collection.name}
                    </h3>
                    <p className="text-sm text-white/80">{collection.description}</p>
                    <span className="mt-4 text-xs uppercase tracking-[0.15em] border-b border-white pb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                      View Collection
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories Section */}
      {displayCategories.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="luxury-container">
            <div className="text-center mb-12">
              <p className="luxury-subheading mb-3">Explore</p>
              <h2 className="text-3xl md:text-4xl luxury-heading">Shop By Category</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {displayCategories.map((category, index) => (
                <Link
                  key={category.id}
                  to={category.href}
                  className="group relative aspect-[4/5] bg-secondary overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {category.image && (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                    <h3 className="text-2xl font-serif font-light mb-2 text-white group-hover:tracking-wider transition-all duration-300">
                      {category.name}
                    </h3>
                    <p className="text-sm text-white/80">{category.description}</p>
                    <span className="mt-4 text-xs uppercase tracking-[0.15em] border-b border-white pb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                      View Category
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="luxury-container">
          <div className="text-center mb-12">
            <p className="luxury-subheading mb-3">Featured</p>
            <h2 className="text-3xl md:text-4xl luxury-heading">Curated Selection</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {featuredProducts.length > 0 ? featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            )) : newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/shop" className="luxury-button-outline">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 md:py-28">
        <div className="luxury-container">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
<div className="aspect-square relative overflow-hidden rounded-xl">
  <img
    src={promiseImg}
    alt="Our Promise"
    className="w-full h-full object-cover"
  />
</div>
            <div>
              <p className="luxury-subheading mb-3">Our Promise</p>
              <h2 className="text-3xl md:text-4xl luxury-heading mb-6">
                Uncompromising Quality
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                At SKN Hair Care, we believe every woman deserves to feel confident
                and beautiful. Our 100% virgin unprocessed human hair products are
                ethically sourced and meticulously crafted to deliver the most
                natural look and feel.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                From our signature hair toppers to our nourishing hair care line,
                each product is a testament to our commitment to excellence.
              </p>
              <Link to="/about" className="luxury-link text-sm uppercase tracking-[0.1em]">
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      {bestsellers.length > 0 && (
        <section className="py-20 md:py-28 bg-secondary">
          <div className="luxury-container">
            <div className="text-center mb-12">
              <p className="luxury-subheading mb-3">Customer Favorites</p>
              <h2 className="text-3xl md:text-4xl luxury-heading">Bestsellers</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {bestsellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="py-20 md:py-28 bg-secondary">
          <div className="luxury-container">
            <div className="text-center mb-12">
              <p className="luxury-subheading mb-3">Latest Additions</p>
              <h2 className="text-3xl md:text-4xl luxury-heading">New Arrivals</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="luxury-container">
          <div className="max-w-xl mx-auto text-center">
            <p className="luxury-subheading mb-3">Stay Connected</p>
            <h2 className="text-3xl md:text-4xl luxury-heading mb-4">
              Join Our Community
            </h2>
            <p className="text-muted-foreground mb-8">
              Be the first to know about new arrivals, exclusive offers, and hair care tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-border bg-transparent text-sm focus:outline-none focus:border-foreground transition-colors"
              />
              <button type="submit" className="luxury-button whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
