import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, 
  X, 
  Plus, 
  Minus, 
  Check, 
  ArrowRight, 
  Layers, 
  Package, 
  Sparkles, 
  Phone, 
  Mail, 
  MapPin 
} from 'lucide-react';

// ============================================================================
// 1. CONFIGURATION & DATA
// ============================================================================
const SITE_CONFIG = {
  brandName: "APEX TEXTILES",
  brandTagline: "B2B Apparel & Wholesale Supply",
  heroHeadline: "Direct-from-Mill Wholesale Apparel.",
  heroSubheadline: "Premium basics, outerwear, and denim. Order single sample pieces or scale up to bulk factory runs with transparent tiered pricing.",
  contactEmail: "wholesale@apextextiles.com",
  contactPhone: "+1 (800) 555-0194",
  address: "420 Garment District Ave, Suite 300, New York, NY",
  primaryColor: "#0A2540",
};

const PRODUCTS_DATA = [
  {
    id: "prod-01",
    name: "Heavyweight 280GSM Boxy Tee",
    category: "T-Shirts",
    fabric: "100% Combed Ring-Spun Cotton",
    moq: 1,
    isSinglePieceAvailable: true,
    pricePerUnit: 11.50,
    bulkPrice: 8.20,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "prod-02",
    name: "Structured Oxford Button-Down",
    category: "Shirts",
    fabric: "210GSM Organic Cotton Oxford",
    moq: 12,
    isSinglePieceAvailable: false,
    pricePerUnit: 18.00,
    bulkPrice: 14.50,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "prod-03",
    name: "14oz Selvedge Raw Denim Jacket",
    category: "Outerwear",
    fabric: "100% Japanese Indigo Denim",
    moq: 1,
    isSinglePieceAvailable: true,
    pricePerUnit: 42.00,
    bulkPrice: 34.00,
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "prod-04",
    name: "450GSM French Terry Hoodie",
    category: "Outerwear",
    fabric: "Heavy Loopback Cotton Fleece",
    moq: 20,
    isSinglePieceAvailable: false,
    pricePerUnit: 24.00,
    bulkPrice: 19.50,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "prod-05",
    name: "Tailored Twill Chino Trousers",
    category: "Bottoms",
    fabric: "260GSM Stretch Cotton Twill",
    moq: 15,
    isSinglePieceAvailable: false,
    pricePerUnit: 21.00,
    bulkPrice: 16.80,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "prod-06",
    name: "Unstructured Linen Overshirt",
    category: "Shirts",
    fabric: "180GSM European Flax Linen",
    moq: 1,
    isSinglePieceAvailable: true,
    pricePerUnit: 28.00,
    bulkPrice: 22.00,
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80",
  }
];

// ============================================================================
// 2. HERO COMPONENT
// ============================================================================
interface HeroSectionProps {
  onBrowseClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onBrowseClick }) => {
  const heroRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const scrolled = Math.max(0, Math.min(1, -rect.top / (rect.height * 0.65)));
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      if (!heroRef.current) return;
      canvas.width = heroRef.current.offsetWidth;
      canvas.height = heroRef.current.offsetHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse = { x: -1000, y: -1000 };
    };

    const heroEl = heroRef.current;
    if (heroEl) {
      heroEl.addEventListener('mousemove', handleMouseMove as EventListener);
      heroEl.addEventListener('mouseleave', handleMouseLeave);
    }

    const spacing = 42;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cols = Math.ceil(canvas.width / spacing) + 1;
      const rows = Math.ceil(canvas.height / spacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const baseX = i * spacing;
          const baseY = j * spacing;

          const dx = mouse.x - baseX;
          const dy = mouse.y - baseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 180;

          let radius = 1.5;
          let alpha = 0.14;

          if (dist < maxDist) {
            const force = (1 - dist / maxDist);
            radius = 1.5 + force * 2.2;
            alpha = 0.14 + force * 0.45;
          }

          ctx.beginPath();
          ctx.arc(baseX, baseY, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(10, 37, 64, ${alpha})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      if (heroEl) {
        heroEl.removeEventListener('mousemove', handleMouseMove as EventListener);
        heroEl.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const unfoldScale = 0.88 + scrollProgress * 0.12;
  const topFlapRotate = Math.max(0, (1 - scrollProgress * 1.6) * 38);
  const bottomFlapRotate = Math.max(0, (1 - scrollProgress * 1.6) * -32);

  return (
    <section
      ref={heroRef}
      style={{ borderBottom: '2px solid #0A2540' }}
      className="relative bg-white overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div 
              style={{ borderColor: '#0A2540', color: '#0A2540' }}
              className="inline-flex items-center gap-2 px-3 py-1.5 border-2 bg-white text-xs font-bold uppercase tracking-wider"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Single Piece Samples & Bulk Wholesale
            </div>

            <h1 style={{ color: '#0A2540' }} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              {SITE_CONFIG.heroHeadline}
            </h1>

            <p style={{ color: 'rgba(10, 37, 64, 0.8)' }} className="text-lg max-w-xl leading-relaxed">
              {SITE_CONFIG.heroSubheadline}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onBrowseClick}
                style={{ backgroundColor: '#0A2540', borderColor: '#0A2540', color: '#ffffff' }}
                className="inline-flex items-center gap-2 px-6 py-3.5 font-semibold border-2 hover:bg-white hover:text-[#0A2540] transition-colors cursor-pointer"
              >
                Browse Wholesale Catalog
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#inquiry-section"
                style={{ borderColor: '#0A2540', color: '#0A2540' }}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white font-semibold border-2 hover:bg-[#0A2540] hover:text-white transition-colors"
              >
                Request Custom Quote
              </a>
            </div>

            <div style={{ borderColor: 'rgba(10, 37, 64, 0.2)' }} className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div>
                <p style={{ color: '#0A2540' }} className="text-2xl font-extrabold">1 PC</p>
                <p style={{ color: 'rgba(10, 37, 64, 0.7)' }} className="text-xs font-medium uppercase">Min. Sample Order</p>
              </div>
              <div>
                <p style={{ color: '#0A2540' }} className="text-2xl font-extrabold">280–450</p>
                <p style={{ color: 'rgba(10, 37, 64, 0.7)' }} className="text-xs font-medium uppercase">Heavyweight GSM</p>
              </div>
              <div>
                <p style={{ color: '#0A2540' }} className="text-2xl font-extrabold">48 HRS</p>
                <p style={{ color: 'rgba(10, 37, 64, 0.7)' }} className="text-xs font-medium uppercase">Dispatch Ready</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col items-center">
            <div
              style={{ 
                transform: `scale(${unfoldScale})`,
                perspective: '1000px',
                borderColor: '#0A2540'
              }}
              className="w-full max-w-md border-2 bg-white p-3 transition-transform duration-200 ease-out"
            >
              <div
                style={{ 
                  transform: `rotateX(${topFlapRotate}deg)`,
                  backgroundColor: '#0A2540',
                  borderColor: '#0A2540'
                }}
                className="relative overflow-hidden border-b-2 transition-transform duration-150 ease-out origin-bottom"
              >
                <img
                  src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=80"
                  alt="Folded Wholesale Cotton Apparel Stack"
                  className="w-full h-56 object-cover opacity-95"
                />
                <div style={{ backgroundColor: '#0A2540', color: '#ffffff' }} className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 border border-white">
                  MILL LOT #402 — RAW & DYED TEXTILES
                </div>
              </div>

              <div style={{ borderColor: '#0A2540', color: '#0A2540' }} className="bg-white py-3 px-4 border-b-2 flex items-center justify-between">
                <div>
                  <span style={{ color: 'rgba(10, 37, 64, 0.6)' }} className="text-[11px] font-bold uppercase tracking-wider block">
                    Scroll to Unfold Fabric Spec
                  </span>
                  <span className="text-sm font-extrabold">
                    100% Combed Ring-Spun Cotton Weave
                  </span>
                </div>
                <span style={{ backgroundColor: '#0A2540', color: '#ffffff' }} className="text-xs font-bold px-2 py-1">
                  {Math.round(scrollProgress * 100)}% UNFOLDED
                </span>
              </div>

              <div
                style={{ transform: `rotateX(${bottomFlapRotate}deg)` }}
                className="relative overflow-hidden bg-white transition-transform duration-150 ease-out origin-top"
              >
                <img
                  src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=80"
                  alt="Unfolded Garment Construction Detail"
                  className="w-full h-48 object-cover"
                />
                <div style={{ color: '#0A2540' }} className="p-3 bg-white flex items-center justify-between text-xs font-bold">
                  <span>SINGLE PIECE OR BULK PACKS</span>
                  <span>CUSTOM PRIVATE LABEL READY</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// ============================================================================
// 3. PRODUCT CARD COMPONENT
// ============================================================================
interface Product {
  id: string;
  name: string;
  category: string;
  fabric: string;
  moq: number;
  isSinglePieceAvailable: boolean;
  pricePerUnit: number;
  bulkPrice: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
  onAddToInquiry: (item: Product & { selectedQty: number; appliedUnitPrice: number }) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToInquiry }) => {
  const [orderMode, setOrderMode] = useState<'single' | 'bulk'>(
    product.isSinglePieceAvailable ? 'single' : 'bulk'
  );
  const [quantity, setQuantity] = useState<number>(
    product.isSinglePieceAvailable ? 1 : product.moq
  );
  const [addedFeedback, setAddedFeedback] = useState<boolean>(false);

  const handleModeSwitch = (mode: 'single' | 'bulk') => {
    setOrderMode(mode);
    if (mode === 'single') {
      setQuantity(1);
    } else {
      setQuantity(Math.max(product.moq, 10));
    }
  };

  const minAllowed = orderMode === 'single' ? 1 : Math.max(product.moq, 10);
  const activeUnitPrice = quantity >= 50 ? product.bulkPrice : product.pricePerUnit;

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(minAllowed, prev - 1));
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAdd = () => {
    onAddToInquiry({
      ...product,
      selectedQty: quantity,
      appliedUnitPrice: activeUnitPrice,
    });
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1200);
  };

  return (
    <div style={{ borderColor: '#0A2540' }} className="border-2 bg-white flex flex-col justify-between transition-transform duration-150 hover:-translate-y-0.5">
      <div>
        <div style={{ borderColor: '#0A2540' }} className="relative h-64 w-full border-b-2 overflow-hidden bg-slate-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />

          <div className="absolute top-3 left-3">
            {product.isSinglePieceAvailable ? (
              <span style={{ borderColor: '#0A2540', color: '#0A2540' }} className="inline-block px-2.5 py-1 text-xs font-bold bg-white border-2">
                1 PC / SINGLE AVAILABLE
              </span>
            ) : (
              <span style={{ backgroundColor: '#0A2540', borderColor: '#0A2540', color: '#ffffff' }} className="inline-block px-2.5 py-1 text-xs font-bold border-2">
                MIN ORDER: {product.moq} PCS
              </span>
            )}
          </div>
        </div>

        <div className="p-5">
          <div style={{ color: 'rgba(10, 37, 64, 0.6)' }} className="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-1">
            <span>{product.category}</span>
            <span>ID: {product.id.toUpperCase()}</span>
          </div>

          <h3 style={{ color: '#0A2540' }} className="text-lg font-extrabold leading-snug">
            {product.name}
          </h3>

          <p style={{ color: 'rgba(10, 37, 64, 0.75)' }} className="text-sm mt-1">{product.fabric}</p>

          <div style={{ borderColor: 'rgba(10, 37, 64, 0.15)' }} className="mt-4 pt-3 border-t flex items-baseline justify-between">
            <div>
              <span style={{ color: '#0A2540' }} className="text-2xl font-extrabold">
                ${activeUnitPrice.toFixed(2)}
              </span>
              <span style={{ color: 'rgba(10, 37, 64, 0.7)' }} className="text-xs font-semibold"> / unit</span>
            </div>
            <div className="text-right">
              <span style={{ color: '#0A2540' }} className="text-xs font-bold block">
                50+ pcs: ${product.bulkPrice.toFixed(2)}/unit
              </span>
            </div>
          </div>

          {product.isSinglePieceAvailable && (
            <div style={{ borderColor: '#0A2540' }} className="mt-4 grid grid-cols-2 border-2">
              <button
                type="button"
                onClick={() => handleModeSwitch('single')}
                style={{
                  backgroundColor: orderMode === 'single' ? '#0A2540' : '#ffffff',
                  color: orderMode === 'single' ? '#ffffff' : '#0A2540'
                }}
                className="py-1.5 text-xs font-bold uppercase cursor-pointer transition-colors"
              >
                Single Piece (1+)
              </button>
              <button
                type="button"
                onClick={() => handleModeSwitch('bulk')}
                style={{
                  backgroundColor: orderMode === 'bulk' ? '#0A2540' : '#ffffff',
                  color: orderMode === 'bulk' ? '#ffffff' : '#0A2540'
                }}
                className="py-1.5 text-xs font-bold uppercase cursor-pointer transition-colors"
              >
                Bulk Pack (10+)
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-5 pt-0 space-y-3">
        <div style={{ borderColor: '#0A2540' }} className="flex items-center justify-between border-2 bg-white">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={quantity <= minAllowed}
            style={{ color: '#0A2540' }}
            className="p-2.5 hover:bg-[#0A2540] hover:text-white disabled:opacity-30 transition-colors cursor-pointer"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1">
            <input
              type="number"
              min={minAllowed}
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                if (!isNaN(val)) setQuantity(Math.max(minAllowed, val));
              }}
              style={{ color: '#0A2540' }}
              className="w-16 text-center font-extrabold focus:outline-none"
            />
            <span style={{ color: 'rgba(10, 37, 64, 0.6)' }} className="text-xs font-bold">PCS</span>
          </div>

          <button
            type="button"
            onClick={handleIncrement}
            style={{ color: '#0A2540' }}
            className="p-2.5 hover:bg-[#0A2540] hover:text-white transition-colors cursor-pointer"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          style={{
            backgroundColor: addedFeedback ? '#ffffff' : '#0A2540',
            color: addedFeedback ? '#0A2540' : '#ffffff',
            borderColor: '#0A2540'
          }}
          className="w-full py-3 px-4 font-bold text-sm uppercase tracking-wider border-2 flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          {addedFeedback ? (
            <>
              <Check className="w-4 h-4" />
              Added to Quote List
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              Add {quantity} {quantity === 1 ? 'Piece' : 'Pieces'} — $
              {(quantity * activeUnitPrice).toFixed(2)}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// 4. MAIN APPLICATION COMPONENT
// ============================================================================
export default function WholesaleClothingApp() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [onlySinglePiece, setOnlySinglePiece] = useState<boolean>(false);
  const [inquiryList, setInquiryList] = useState<Array<Product & { selectedQty: number; appliedUnitPrice: number }>>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const [buyerInfo, setBuyerInfo] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    notes: '',
  });

  const categories = ['All', 'T-Shirts', 'Shirts', 'Outerwear', 'Bottoms'];

  const filteredProducts = PRODUCTS_DATA.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSingleFilter =
      !onlySinglePiece || item.isSinglePieceAvailable;
    return matchesCategory && matchesSingleFilter;
  });

  const handleAddToInquiry = (itemWithQty: Product & { selectedQty: number; appliedUnitPrice: number }) => {
    setInquiryList((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === itemWithQty.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].selectedQty + itemWithQty.selectedQty;
        updated[existingIndex] = {
          ...updated[existingIndex],
          selectedQty: newQty,
          appliedUnitPrice:
            newQty >= 50 ? updated[existingIndex].bulkPrice : updated[existingIndex].pricePerUnit,
        };
        return updated;
      }
      return [...prev, itemWithQty];
    });
  };

  const handleRemoveFromInquiry = (id: string) => {
    setInquiryList((prev) => prev.filter((item) => item.id !== id));
  };

  const totalUnits = inquiryList.reduce((acc, item) => acc + item.selectedQty, 0);
  const estimatedTotal = inquiryList.reduce(
    (acc, item) => acc + item.selectedQty * item.appliedUnitPrice,
    0
  );

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setInquiryList([]);
      setBuyerInfo({
        businessName: '',
        contactName: '',
        email: '',
        phone: '',
        notes: '',
      });
    }, 400);
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ color: '#0A2540' }} className="min-h-screen bg-white font-sans selection:bg-[#0A2540] selection:text-white">
      <header style={{ borderBottom: '2px solid #0A2540' }} className="sticky top-0 z-40 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div style={{ backgroundColor: '#0A2540' }} className="w-8 h-8 text-white flex items-center justify-center font-black text-lg">
              A
            </div>
            <div>
              <span style={{ color: '#0A2540' }} className="font-black text-lg tracking-tight block leading-none">
                {SITE_CONFIG.brandName}
              </span>
              <span style={{ color: 'rgba(10, 37, 64, 0.7)' }} className="text-[10px] font-bold uppercase tracking-widest">
                {SITE_CONFIG.brandTagline}
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-bold">
            <a href="#catalog-section" className="hover:underline underline-offset-4">
              Wholesale Catalog
            </a>
            <a href="#moq-policy" className="hover:underline underline-offset-4">
              Single Piece & MOQ Rules
            </a>
            <a href="#inquiry-section" className="hover:underline underline-offset-4">
              Bulk Order Form
            </a>
          </nav>

          <button
            onClick={() => setIsDrawerOpen(true)}
            style={{ backgroundColor: '#0A2540', borderColor: '#0A2540', color: '#ffffff' }}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold border-2 hover:bg-white hover:text-[#0A2540] transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Quote List</span>
            <span style={{ backgroundColor: '#ffffff', color: '#0A2540' }} className="ml-1 px-1.5 py-0.5 text-xs font-extrabold">
              {totalUnits}
            </span>
          </button>
        </div>
      </header>

      <HeroSection onBrowseClick={scrollToCatalog} />

      <section id="moq-policy" style={{ borderBottom: '2px solid #0A2540' }} className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div style={{ borderColor: '#0A2540' }} className="p-5 border-2 flex items-start gap-4">
              <Package style={{ color: '#0A2540' }} className="w-7 h-7 shrink-0 mt-0.5" />
              <div>
                <h2 style={{ color: '#0A2540' }} className="font-extrabold text-base uppercase tracking-wide">
                  1-Piece Sample & Boutique Orders
                </h2>
                <p style={{ color: 'rgba(10, 37, 64, 0.8)' }} className="text-sm mt-1">
                  Items marked <strong>1 PC / SINGLE AVAILABLE</strong> can be purchased individually with zero minimum quantity—ideal for fabric testing or small boutique drops.
                </p>
              </div>
            </div>

            <div style={{ borderColor: '#0A2540' }} className="p-5 border-2 flex items-start gap-4">
              <Layers style={{ color: '#0A2540' }} className="w-7 h-7 shrink-0 mt-0.5" />
              <div>
                <h2 style={{ color: '#0A2540' }} className="font-extrabold text-base uppercase tracking-wide">
                  Factory-Direct Bulk Tiers (50+ Units)
                </h2>
                <p style={{ color: 'rgba(10, 37, 64, 0.8)' }} className="text-sm mt-1">
                  Bulk-only styles have fixed production minimums, and any order reaching <strong>50+ units</strong> automatically unlocks discounted mill-tier pricing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 style={{ color: '#0A2540' }} className="text-3xl font-extrabold tracking-tight">
              Wholesale Apparel Catalog
            </h2>
            <p style={{ color: 'rgba(10, 37, 64, 0.75)' }} className="text-sm mt-1">
              Every garment is stocked in our warehouse for immediate dispatch or private-label customization.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setOnlySinglePiece(!onlySinglePiece)}
              style={{
                backgroundColor: onlySinglePiece ? '#0A2540' : '#ffffff',
                color: onlySinglePiece ? '#ffffff' : '#0A2540',
                borderColor: '#0A2540'
              }}
              className="px-3.5 py-2 text-xs font-bold uppercase border-2 transition-colors cursor-pointer"
            >
              {onlySinglePiece ? '✓ Single Piece Only' : 'Filter: 1-Piece Available'}
            </button>

            <div style={{ backgroundColor: 'rgba(10, 37, 64, 0.2)' }} className="h-6 w-0.5 hidden sm:block" />

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    backgroundColor: selectedCategory === cat ? '#0A2540' : '#ffffff',
                    color: selectedCategory === cat ? '#ffffff' : '#0A2540',
                    borderColor: '#0A2540'
                  }}
                  className="px-4 py-2 text-xs font-bold uppercase border-2 transition-colors cursor-pointer"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToInquiry={handleAddToInquiry}
            />
          ))}
        </div>
      </section>

      <section id="inquiry-section" style={{ borderTop: '2px solid #0A2540' }} className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div style={{ borderColor: '#0A2540' }} className="border-2 p-6 sm:p-10 bg-white">
            <h2 style={{ color: '#0A2540' }} className="text-2xl sm:text-3xl font-extrabold">
              Submit Wholesale Order / Quote Request
            </h2>
            <p style={{ color: 'rgba(10, 37, 64, 0.75)' }} className="text-sm mt-2">
              Need custom neck labels, screen printing, or mixed size runs? Submit your list below and our wholesale desk will send a formal invoice within 4 business hours.
            </p>

            <div style={{ borderColor: '#0A2540' }} className="mt-6 p-4 border-2 bg-slate-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold uppercase tracking-wider">
                  Selected Items ({inquiryList.length} styles / {totalUnits} total pieces)
                </span>
                <span className="text-sm font-extrabold">
                  Est. Total: ${estimatedTotal.toFixed(2)}
                </span>
              </div>

              {inquiryList.length === 0 ? (
                <p style={{ color: 'rgba(10, 37, 64, 0.7)' }} className="text-xs">
                  No garments added yet. Select items from the catalog above or submit a general inquiry below.
                </p>
              ) : (
                <ul className="divide-y divide-[#0A2540]/15 text-xs mt-2">
                  {inquiryList.map((item) => (
                    <li key={item.id} className="py-2 flex items-center justify-between">
                      <span className="font-bold">
                        {item.name} ({item.selectedQty} pcs @ ${item.appliedUnitPrice.toFixed(2)})
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFromInquiry(item.id)}
                        style={{ color: '#0A2540' }}
                        className="underline font-bold cursor-pointer"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {formSubmitted ? (
              <div style={{ backgroundColor: '#0A2540', borderColor: '#0A2540' }} className="mt-6 p-6 border-2 text-white">
                <h3 className="text-lg font-extrabold">Wholesale Request Received</h3>
                <p className="text-sm mt-1 text-white/90">
                  Thank you. Our B2B account team is reviewing your piece count and will email your pro-forma invoice shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setFormSubmitted(false)}
                  style={{ color: '#0A2540' }}
                  className="mt-4 px-4 py-2 bg-white text-xs font-bold uppercase cursor-pointer"
                >
                  Start Another Order
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">
                      Company / Store Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={buyerInfo.businessName}
                      onChange={(e) =>
                        setBuyerInfo({ ...buyerInfo, businessName: e.target.value })
                      }
                      placeholder="e.g., Northside Apparel Co."
                      style={{ borderColor: '#0A2540' }}
                      className="w-full px-3.5 py-2.5 border-2 text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">
                      Buyer Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={buyerInfo.contactName}
                      onChange={(e) =>
                        setBuyerInfo({ ...buyerInfo, contactName: e.target.value })
                      }
                      placeholder="Jane Doe"
                      style={{ borderColor: '#0A2540' }}
                      className="w-full px-3.5 py-2.5 border-2 text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={buyerInfo.email}
                      onChange={(e) =>
                        setBuyerInfo({ ...buyerInfo, email: e.target.value })
                      }
                      placeholder="buyer@store.com"
                      style={{ borderColor: '#0A2540' }}
                      className="w-full px-3.5 py-2.5 border-2 text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={buyerInfo.phone}
                      onChange={(e) =>
                        setBuyerInfo({ ...buyerInfo, phone: e.target.value })
                      }
                      placeholder="+1 (555) 234-5678"
                      style={{ borderColor: '#0A2540' }}
                      className="w-full px-3.5 py-2.5 border-2 text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1">
                    Size Breakdown & Custom Branding Notes
                  </label>
                  <textarea
                    rows={3}
                    value={buyerInfo.notes}
                    onChange={(e) =>
                      setBuyerInfo({ ...buyerInfo, notes: e.target.value })
                    }
                    placeholder="Specify S / M / L / XL ratios, colorways, or custom woven label requirements..."
                    style={{ borderColor: '#0A2540' }}
                    className="w-full px-3.5 py-2.5 border-2 text-sm focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  style={{ backgroundColor: '#0A2540', borderColor: '#0A2540', color: '#ffffff' }}
                  className="w-full py-3.5 px-6 font-extrabold text-sm uppercase tracking-wider border-2 hover:bg-white hover:text-[#0A2540] transition-colors cursor-pointer"
                >
                  Send Wholesale Quote Request
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer style={{ backgroundColor: '#0A2540', borderTop: '2px solid #0A2540' }} className="text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <span className="font-black text-xl tracking-tight block">
                {SITE_CONFIG.brandName}
              </span>
              <p className="text-sm text-white/75 mt-2 max-w-xs">
                Direct wholesale garments for independent retailers, fashion labels, and corporate merchandisers.
              </p>
            </div>

            <div className="space-y-2 text-sm">
              <p className="font-bold uppercase tracking-wider text-xs text-white/60">
                Wholesale Showroom & Warehouse
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 shrink-0" />
                {SITE_CONFIG.address}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                {SITE_CONFIG.contactPhone}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                {SITE_CONFIG.contactEmail}
              </p>
            </div>

            <div className="text-sm md:text-right flex flex-col justify-between">
              <div>
                <p className="font-bold uppercase tracking-wider text-xs text-white/60">
                  Trade Hours
                </p>
                <p className="mt-1">Mon – Fri: 8:30 AM – 6:00 PM EST</p>
              </div>
              <p className="text-xs text-white/60 mt-6">
                © {new Date().getFullYear()} {SITE_CONFIG.brandName}. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
          <div style={{ borderColor: '#0A2540' }} className="w-full max-w-md bg-white border-l-2 h-full flex flex-col justify-between p-6">
            <div>
              <div style={{ borderColor: '#0A2540' }} className="flex items-center justify-between pb-4 border-b-2">
                <h3 className="text-lg font-extrabold uppercase">
                  Wholesale Quote List ({totalUnits} pcs)
                </h3>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  style={{ borderColor: '#0A2540' }}
                  className="p-1.5 border-2 hover:bg-[#0A2540] hover:text-white cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {inquiryList.length === 0 ? (
                <div className="py-16 text-center">
                  <p style={{ color: 'rgba(10, 37, 64, 0.7)' }} className="text-sm font-bold">
                    Your quote list is empty.
                  </p>
                  <p style={{ color: 'rgba(10, 37, 64, 0.6)' }} className="text-xs mt-1">
                    Add single sample pieces or bulk packs from the catalog.
                  </p>
                </div>
              ) : (
                <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                  {inquiryList.map((item) => (
                    <div
                      key={item.id}
                      style={{ borderColor: '#0A2540' }}
                      className="p-3 border-2 flex items-center justify-between gap-3 bg-white"
                    >
                      <div>
                        <p className="font-bold text-sm">{item.name}</p>
                        <p style={{ color: 'rgba(10, 37, 64, 0.7)' }} className="text-xs">
                          {item.selectedQty} pcs × ${item.appliedUnitPrice.toFixed(2)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-extrabold text-sm">
                          ${(item.selectedQty * item.appliedUnitPrice).toFixed(2)}
                        </p>
                        <button
                          onClick={() => handleRemoveFromInquiry(item.id)}
                          style={{ color: '#0A2540' }}
                          className="text-[11px] font-bold underline mt-1 cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {inquiryList.length > 0 && (
              <div style={{ borderColor: '#0A2540' }} className="pt-4 border-t-2 space-y-3">
                <div className="flex items-center justify-between font-extrabold text-base">
                  <span>Estimated Subtotal</span>
                  <span>${estimatedTotal.toFixed(2)}</span>
                </div>
                <a
                  href="#inquiry-section"
                  onClick={() => setIsDrawerOpen(false)}
                  style={{ backgroundColor: '#0A2540', borderColor: '#0A2540', color: '#ffffff' }}
                  className="block w-full py-3 text-center font-bold text-sm uppercase border-2 hover:bg-white hover:text-[#0A2540] transition-colors"
                >
                  Proceed to Checkout / Quote Form
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}