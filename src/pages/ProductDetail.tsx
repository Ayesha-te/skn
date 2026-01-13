import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Minus, Plus, ChevronDown } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/product/ProductCard";
import { useAdminData } from "@/contexts/AdminDataContext";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";

// ---------- CURRENCY HELPERS (GBP BASE) ----------

// You said: 1 GBP = 1.35 USD
const GBP_TO_USD_RATE = 1.35;

// Approx mid-market rates (can be adjusted later if needed)
const GBP_TO_EUR_RATE = 1.15;
const GBP_TO_AED_RATE = 4.95;

const gbpToUsd = (gbp: number) =>
  Math.round(gbp * GBP_TO_USD_RATE * 100) / 100;

const gbpToEur = (gbp: number) =>
  Math.round(gbp * GBP_TO_EUR_RATE * 100) / 100;

const gbpToAed = (gbp: number) =>
  Math.round(gbp * GBP_TO_AED_RATE * 100) / 100;

// ---------- PRICING TABLES (GBP) ----------

// Hair extensions: price table from the client's sheet
// Length keys: 14–16 (base), 18–20, 22–24, 26–28, 30–32
const HAIR_EXTENSION_PRICING_GBP: Record<
  number,
  {
    DARK: Record<string, number>;
    LIGHT: Record<string, number>;
  }
> = {
  75: {
    DARK: {
      "14-16": 700,
      "18-20": 770,
      "22-24": 840,
      "26-28": 910,
      "30-32": 980,
    },
    LIGHT: {
      "14-16": 800,
      "18-20": 880,
      "22-24": 960,
      "26-28": 1040,
      "30-32": 1120,
    },
  },
  100: {
    DARK: {
      "14-16": 933,
      "18-20": 1026,
      "22-24": 1119,
      "26-28": 1212,
      "30-32": 1305,
    },
    LIGHT: {
      "14-16": 1067,
      "18-20": 1173,
      "22-24": 1280,
      "26-28": 1387,
      "30-32": 1493,
    },
  },
  150: {
    DARK: {
      "14-16": 1400,
      "18-20": 1540,
      "22-24": 1680,
      "26-28": 1820,
      "30-32": 1960,
    },
    LIGHT: {
      "14-16": 1600,
      "18-20": 1760,
      "22-24": 1920,
      "26-28": 2080,
      "30-32": 2240,
    },
  },
};

// SKN toppers: width x length, up to 18", 130%, weight, cost (GBP)
const TOPPER_PRICING_GBP = [
  { width: 6, length: 10, density: "130%", weight: "50g", price: 1100 },
  { width: 6, length: 12, density: "130%", weight: "50g", price: 1200 },
  { width: 8, length: 12, density: "130%", weight: "80g", price: 1370 },
  { width: 8, length: 16, density: "130%", weight: "90g", price: 1480 },
  { width: 12, length: 12, density: "130%", weight: "120g", price: 1530 },
];

// Closures – 6x6 table (GBP)
const CLOSURE_6x6_GBP: { length: number; grams: number; price: number }[] = [
  { length: 10, grams: 58, price: 450 },
  { length: 12, grams: 65, price: 480 },
  { length: 14, grams: 70, price: 590 },
  { length: 16, grams: 78, price: 670 },
  { length: 18, grams: 85, price: 770 },
  { length: 20, grams: 92, price: 800 },
];

// Closures – 5x5 table (GBP)
const CLOSURE_5x5_GBP: { length: number; grams: number; price: number }[] = [
  { length: 10, grams: 45, price: 420 },
  { length: 12, grams: 50, price: 450 },
  { length: 14, grams: 57, price: 480 },
  { length: 16, grams: 64, price: 590 },
  { length: 18, grams: 70, price: 670 },
  { length: 20, grams: 78, price: 730 },
];

// Halo band – fixed prices (GBP)
const HALO_BAND_PRICING_GBP: Record<string, number> = {
  '2"': 425,
  '3"': 489,
};

// NEW: HD wig with ear tabs / Italian lace wig (GBP)
const HD_WIG_SIZES = ["X Small", "Small", "Medium"] as const;
type HdWigSize = (typeof HD_WIG_SIZES)[number];

const HD_WIG_LENGTHS = ["12-16", "18-20"] as const;
type HdWigLength = (typeof HD_WIG_LENGTHS)[number];

const HD_WIG_PRICING_GBP: Record<
  HdWigLength,
  Record<HdWigSize, number>
> = {
  "12-16": {
    "X Small": 3400,
    Small: 3500,
    Medium: 3600,
  },
  "18-20": {
    "X Small": 3600,
    Small: 3700,
    Medium: 3800,
  },
};

// ---------- HELPERS ----------

type ProductType =
  | "extension"
  | "topper"
  | "closure"
  | "halo"
  | "hdWig"
  | "simple";

function detectProductType(name: string): ProductType {
  const n = name.toLowerCase();

  if (n.includes("extension")) return "extension";
  if (n.includes("topper") || n.includes("skn topper")) return "topper";
  if (n.includes("closure")) return "closure";
  if (n.includes("halo")) return "halo";
  if (n.includes("hd wig") || n.includes("italian lace")) return "hdWig";

  return "simple";
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useAdminData();
  const product = useMemo(
    () => products.find((p) => p.id?.toString() === id),
    [products, id]
  );
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>(
    "description"
  );

  // option state
  const [extGrams, setExtGrams] = useState<75 | 100 | 150>(100);
  const [extColour, setExtColour] = useState<"DARK" | "LIGHT">("DARK");
  const [extLengthBand, setExtLengthBand] = useState<
    "14-16" | "18-20" | "22-24" | "26-28" | "30-32"
  >("14-16");

  const [topperIndex, setTopperIndex] = useState(0);

  const [closureBase, setClosureBase] = useState<"6x6" | "5x5">("6x6");
  const [closureLength, setClosureLength] = useState<number>(10);

  const [haloBand, setHaloBand] = useState<'2"' | '3"'>('2"');

  // HD wig options
  const [hdWigLength, setHdWigLength] = useState<HdWigLength>("12-16");
  const [hdWigSize, setHdWigSize] = useState<HdWigSize>("X Small");

  if (!product) {
    return (
      <Layout>
        <div className="py-20 text-center">
          <h1 className="text-2xl font-serif mb-4">Product Not Found</h1>
          <Link to="/shop" className="luxury-link">
            Return to Shop
          </Link>
        </div>
      </Layout>
    );
  }

  const productType: ProductType = detectProductType(product.name || "");

  // ---------- PRICE + LABEL CALCULATION (GBP BASE) ----------

  const basePriceGbp = Number(product.price || 0);

  let finalPriceGbp = basePriceGbp;
  let optionLabel = "";

  if (productType === "extension") {
    const table = HAIR_EXTENSION_PRICING_GBP[extGrams];
    let gbp = basePriceGbp || 0;

    if (table && table[extColour] && table[extColour][extLengthBand] != null) {
      gbp = table[extColour][extLengthBand];
    }

    finalPriceGbp = gbp;
    optionLabel = `${extGrams}g / ${extColour.toLowerCase()} / ${extLengthBand}"`;
  } else if (productType === "topper") {
    const row = TOPPER_PRICING_GBP[topperIndex] ?? TOPPER_PRICING_GBP[0];
    finalPriceGbp = row.price;
    optionLabel = `${row.width}×${row.length}cm / ${row.density} / ${row.weight} / up to 18"`;
  } else if (productType === "closure") {
    const source = closureBase === "6x6" ? CLOSURE_6x6_GBP : CLOSURE_5x5_GBP;
    const row = source.find((r) => r.length === closureLength) ?? source[0];
    if (row) {
      finalPriceGbp = row.price;
      optionLabel = `${closureBase} / ${row.length}" / ${row.grams}g`;
    }
  } else if (productType === "halo") {
    const gbp = HALO_BAND_PRICING_GBP[haloBand] ?? basePriceGbp;
    finalPriceGbp = gbp;
    optionLabel = `${haloBand} hairline halo band`;
  } else if (productType === "hdWig") {
    const lengthPricing = HD_WIG_PRICING_GBP[hdWigLength];
    const gbp =
      (lengthPricing && lengthPricing[hdWigSize]) || basePriceGbp || 0;
    finalPriceGbp = gbp;
    optionLabel = `${hdWigLength}" / ${hdWigSize} · HD Wig with ear tabs & Italian lace`;
  } else {
    finalPriceGbp = basePriceGbp;
    optionLabel = "";
  }

  // conversions
  const finalPriceUsd = gbpToUsd(finalPriceGbp);
  const finalPriceEur = gbpToEur(finalPriceGbp);
  const finalPriceAed = gbpToAed(finalPriceGbp);

  const relatedProducts = useMemo(() => {
    return products
      .filter((p) => p.category === product?.category && p.id !== product?.id)
      .slice(0, 4);
  }, [products, product]);

  const handleAddToCart = () => {
    const nameWithOptions =
      optionLabel && optionLabel.length > 0
        ? `${product.name} – ${optionLabel}`
        : product.name;

    const productForCart = {
      ...product,
      name: nameWithOptions,
      // cart/checkout works in USD – backend stays the same
      price: finalPriceUsd.toFixed(2),
    };

    addToCart(productForCart, quantity);
    setQuantity(1);
  };

  const accordionItems = [
    {
      id: "description",
      title: "Description",
      content: product.description,
    },
    {
      id: "details",
      title: "Product Details",
      content: product.details,
    },
    {
      id: "care",
      title: "Care Instructions",
      content:
        "Handle with care. Wash with sulfate-free shampoo. Use lukewarm water. Air dry when possible. Store on a wig stand when not in use.",
    },
  ];

  // ---------- OPTION UI BLOCKS ----------

  const renderExtensionOptions = () => (
    <div className="space-y-6 mb-8">
      {/* Grams */}
      <div>
        <p className="text-sm font-medium mb-2">Grams</p>
        <div className="flex flex-wrap gap-2">
          {[75, 100, 150].map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setExtGrams(g as 75 | 100 | 150)}
              className={cn(
                "px-3 py-2 text-xs border rounded-full",
                extGrams === g
                  ? "bg-foreground text-background"
                  : "bg-transparent hover:bg-secondary"
              )}
            >
              {g}g
            </button>
          ))}
        </div>
      </div>

      {/* Colour */}
      <div>
        <p className="text-sm font-medium mb-2">Colour</p>
        <div className="flex gap-2">
          {["DARK", "LIGHT"].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setExtColour(c as "DARK" | "LIGHT")}
              className={cn(
                "px-3 py-2 text-xs border rounded-full",
                extColour === c
                  ? "bg-foreground text-background"
                  : "bg-transparent hover:bg-secondary"
              )}
            >
              {c.toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Length */}
      <div>
        <p className="text-sm font-medium mb-2">Length</p>
        <div className="flex flex-wrap gap-2">
          {["14-16", "18-20", "22-24", "26-28", "30-32"].map((len) => (
            <button
              key={len}
              type="button"
              onClick={() =>
                setExtLengthBand(
                  len as "14-16" | "18-20" | "22-24" | "26-28" | "30-32"
                )
              }
              className={cn(
                "px-3 py-2 text-xs border rounded-full",
                extLengthBand === len
                  ? "bg-foreground text-background"
                  : "bg-transparent hover:bg-secondary"
              )}
            >
              {len}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTopperOptions = () => (
    <div className="space-y-4 mb-8">
      <p className="text-sm font-medium mb-2">Base Size & Specs</p>
      <div className="space-y-2">
        {TOPPER_PRICING_GBP.map((row, index) => (
          <button
            key={`${row.width}x${row.length}`}
            type="button"
            onClick={() => setTopperIndex(index)}
            className={cn(
              "w-full text-left px-3 py-2 text-xs border rounded-md",
              topperIndex === index
                ? "bg-foreground text-background"
                : "bg-transparent hover:bg-secondary"
            )}
          >
            {row.width}×{row.length} cm · {row.density} · {row.weight} · up to
            18"
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        150g is an additional £250 added to the cost price (custom orders).
      </p>
    </div>
  );

  const renderClosureOptions = () => {
    const source = closureBase === "6x6" ? CLOSURE_6x6_GBP : CLOSURE_5x5_GBP;

    return (
      <div className="space-y-4 mb-8">
        <div>
          <p className="text-sm font-medium mb-2">Closure Base Size</p>
          <div className="flex gap-2">
            {["6x6", "5x5"].map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setClosureBase(b as "6x6" | "5x5")}
                className={cn(
                  "px-3 py-2 text-xs border rounded-full",
                  closureBase === b
                    ? "bg-foreground text-background"
                    : "bg-transparent hover:bg-secondary"
                )}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Length</p>
          <div className="flex flex-wrap gap-2">
            {source.map((row) => (
              <button
                key={row.length}
                type="button"
                onClick={() => setClosureLength(row.length)}
                className={cn(
                  "px-3 py-2 text-xs border rounded-full",
                  closureLength === row.length
                    ? "bg-foreground text-background"
                    : "bg-transparent hover:bg-secondary"
                )}
              >
                {row.length}" – {row.grams}g
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderHaloOptions = () => (
    <div className="space-y-4 mb-8">
      <div>
        <p className="text-sm font-medium mb-2">Band Size</p>
        <div className="flex gap-2">
          {['2"', '3"'].map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setHaloBand(size as '2"' | '3"')}
              className={cn(
                "px-3 py-2 text-xs border rounded-full",
                haloBand === size
                  ? "bg-foreground text-background"
                  : "bg-transparent hover:bg-secondary"
              )}
            >
              {size} wide band
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderHdWigOptions = () => (
    <div className="space-y-6 mb-8">
      {/* Length */}
      <div>
        <p className="text-sm font-medium mb-2">Length</p>
        <div className="flex gap-2">
          {HD_WIG_LENGTHS.map((len) => (
            <button
              key={len}
              type="button"
              onClick={() => setHdWigLength(len)}
              className={cn(
                "px-3 py-2 text-xs border rounded-full",
                hdWigLength === len
                  ? "bg-foreground text-background"
                  : "bg-transparent hover:bg-secondary"
              )}
            >
              {len}"
            </button>
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <p className="text-sm font-medium mb-2">Cap Size</p>
        <div className="flex flex-wrap gap-2">
          {HD_WIG_SIZES.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setHdWigSize(size)}
              className={cn(
                "px-3 py-2 text-xs border rounded-full",
                hdWigSize === size
                  ? "bg-foreground text-background"
                  : "bg-transparent hover:bg-secondary"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        HD wig with ear tabs and HD Italian lace wig. All prices shown in GBP.
      </p>
    </div>
  );

  // ---------- RENDER ----------

  return (
    <Layout>
      <div className="py-12 md:py-16">
        <div className="luxury-container">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link
                  to="/shop"
                  className="hover:text-foreground transition-colors"
                >
                  Shop
                </Link>
              </li>
              <li>/</li>
              <li className="text-foreground">{product.name}</li>
            </ol>
          </nav>

          {/* Product Section */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            {/* Images & Video */}
            <div className="space-y-4">
              <div className="aspect-square bg-secondary overflow-hidden">
                {activeImage === -1 && product.video ? (
                  <video
                    src={product.video}
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={
                      activeImage === -2
                        ? product.image
                        : product.images[activeImage]?.image || product.image
                    }
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setActiveImage(-2)}
                  className={cn(
                    "w-20 h-20 bg-secondary transition-opacity",
                    activeImage === -2
                      ? "opacity-100 ring-1 ring-foreground"
                      : "opacity-50 hover:opacity-75"
                  )}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </button>
                {product.images.map((imgObj, index) => (
                  <button
                    key={imgObj.id}
                    onClick={() => setActiveImage(index)}
                    className={cn(
                      "w-20 h-20 bg-secondary transition-opacity",
                      activeImage === index
                        ? "opacity-100 ring-1 ring-foreground"
                        : "opacity-50 hover:opacity-75"
                    )}
                  >
                    <img
                      src={imgObj.image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
                {product.video && (
                  <button
                    onClick={() => setActiveImage(-1)}
                    className={cn(
                      "w-20 h-20 bg-secondary flex items-center justify-center transition-opacity",
                      activeImage === -1
                        ? "opacity-100 ring-1 ring-foreground"
                        : "opacity-50 hover:opacity-75"
                    )}
                  >
                    <div className="text-[10px] uppercase font-bold">
                      Video
                    </div>
                  </button>
                )}
              </div>
            </div>

            {/* Info */}
            <div>
              <p className="luxury-subheading mb-2">
                {product.category_name || product.category}
              </p>
              <h1 className="text-3xl md:text-4xl font-serif font-light mb-2">
                {product.name}
              </h1>

              {optionLabel && (
                <p className="text-xs text-muted-foreground mb-2">
                  Selected: {optionLabel}
                </p>
              )}

              {/* MAIN PRICE (GBP) + CONVERSIONS */}
              <p className="text-2xl mb-1">
                £
                {finalPriceGbp.toLocaleString("en-GB", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className="text-xs text-muted-foreground mb-6">
                Approx: ${finalPriceUsd.toFixed(2)} / €
                {finalPriceEur.toFixed(2)} / د.إ
                {finalPriceAed.toFixed(2)}
              </p>

              <p className="text-muted-foreground leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Dynamic option blocks */}
              {productType === "extension" && renderExtensionOptions()}
              {productType === "topper" && renderTopperOptions()}
              {productType === "closure" && renderClosureOptions()}
              {productType === "halo" && renderHaloOptions()}
              {productType === "hdWig" && renderHdWigOptions()}

              {/* Quantity & Add to Cart */}
              <div className="flex gap-4 mb-8">
                <div className="flex items-center border border-border">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-3 hover:bg-secondary transition-colors"
                    type="button"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-3 hover:bg-secondary transition-colors"
                    type="button"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 luxury-button"
                  type="button"
                >
                  Add to Cart
                </button>
              </div>

              {/* Accordion */}
              <div className="border-t border-border">
                {accordionItems.map((item) => (
                  <div key={item.id} className="border-b border-border">
                    <button
                      onClick={() =>
                        setOpenAccordion(
                          openAccordion === item.id ? null : item.id
                        )
                      }
                      className="flex items-center justify-between w-full py-4 text-left"
                    >
                      <span className="text-sm font-medium">
                        {item.title}
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-300",
                          openAccordion === item.id && "rotate-180"
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300",
                        openAccordion === item.id
                          ? "max-h-48 pb-4"
                          : "max-h-0"
                      )}
                    >
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-20 md:mt-28">
              <h2 className="text-2xl md:text-3xl font-serif font-light text-center mb-10">
                You May Also Like
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
