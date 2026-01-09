import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import missionImg from "@/images/2nd.jpeg";


const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="luxury-container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="luxury-subheading mb-4">Our Story</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl luxury-heading mb-6">
              Redefining Beauty with Virgin Hair
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              SKN Hair Care was born from a simple belief: every woman deserves 
              access to the highest quality hair products that look and feel 
              completely natural.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 md:py-28">
        <div className="luxury-container">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
<div className="aspect-[4/5] relative overflow-hidden rounded-xl">
  <img
    src={missionImg}
    alt="Our Mission"
    className="w-full h-full object-cover"
  />
</div>
            <div>
              <p className="luxury-subheading mb-3">Our Mission</p>
              <h2 className="text-3xl md:text-4xl luxury-heading mb-6">
                100% Virgin Unprocessed Human Hair
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We source only the finest virgin human hair, completely unprocessed 
                and free from any chemical treatments. This means your hair topper 
                or extension will blend seamlessly with your natural hair, move 
                naturally, and last for years with proper care.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our commitment to quality extends beyond our products. We work 
                directly with ethical suppliers to ensure fair practices and 
                sustainable sourcing throughout our supply chain.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Every piece is handcrafted with meticulous attention to detail, 
                from the selection of each strand to the final quality inspection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="luxury-container">
          <div className="text-center mb-12">
            <p className="luxury-subheading mb-3">What We Stand For</p>
            <h2 className="text-3xl md:text-4xl luxury-heading">Our Values</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 border border-foreground flex items-center justify-center">
                <span className="text-2xl font-serif">01</span>
              </div>
              <h3 className="text-lg font-serif mb-3">Quality First</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We never compromise on quality. Every product meets our rigorous 
                standards before reaching our customers.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 border border-foreground flex items-center justify-center">
                <span className="text-2xl font-serif">02</span>
              </div>
              <h3 className="text-lg font-serif mb-3">Ethical Sourcing</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our hair is ethically sourced with full transparency and fair 
                compensation to our suppliers.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 border border-foreground flex items-center justify-center">
                <span className="text-2xl font-serif">03</span>
              </div>
              <h3 className="text-lg font-serif mb-3">Customer Care</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your confidence is our priority. We provide exceptional support 
                and guidance throughout your journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="luxury-container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl luxury-heading mb-6">
              Experience the Difference
            </h2>
            <p className="text-muted-foreground mb-8">
              Discover why thousands of women trust SKN Hair Care for their 
              premium hair solutions.
            </p>
            <Link to="/shop" className="luxury-button">
              Shop Now
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
