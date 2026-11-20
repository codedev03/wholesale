import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  SlidersHorizontal,
  Sparkles,
  Check,
  Plus,
  Minus,
  X,
  TrendingUp,
  IndianRupee,
  PackageCheck,
  Clock,
  LayoutDashboard,
  Store,
  ArrowUpRight,
  Filter,
  ShieldCheck,
  Truck,
  Tag
} from 'lucide-react';

// ============================================================================
// 1. INITIAL CATALOG DATA (Dresses & Wholesale Apparel in INR ₹)
// ============================================================================
export interface DressProduct {
  id: string;
  brand: string;
  name: string;
  category: 'Ethnic Dresses' | 'Western Dresses' | 'Party & Evening' | 'Co-ord Sets' | 'Kurtis & Tunics';
  fabric: string;
  sizes: string[];
  moq: number;
  isSinglePieceAvailable: boolean;
  singlePriceINR: number;
  bulkPriceINR: number; // Applied at 15+ units
  bulkThreshold: number;
  stockUnits: number;
  rating: number;
  reviewsCount: number;
  tag?: string;
  image: string;
}

const INITIAL_DRESSES: DressProduct[] = [
  {
    id: 'DRS-101',
    brand: 'NAVY & LOOM STUDIO',
    name: 'Royal Indigo Handloom Anarkali Gown',
    category: 'Ethnic Dresses',
    fabric: 'Pure Chanderi Silk & Mulmul Lining',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    moq: 1,
    isSinglePieceAvailable: true,
    singlePriceINR: 1850,
    bulkPriceINR: 1390,
    bulkThreshold: 12,
    stockUnits: 420,
    rating: 4.8,
    reviewsCount: 312,
    tag: 'BESTSELLER • 1 PC READY',
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'DRS-102',
    brand: 'ATELIER MODA B2B',
    name: 'Structured Midnight Pleated Midi Dress',
    category: 'Western Dresses',
    fabric: 'Heavyweight 240GSM Crepe Georgette',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    moq: 10,
    isSinglePieceAvailable: false,
    singlePriceINR: 1450,
    bulkPriceINR: 1050,
    bulkThreshold: 10,
    stockUnits: 680,
    rating: 4.6,
    reviewsCount: 189,
    tag: 'BULK PACK (10+)',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'DRS-103',
    brand: 'AURA COUTURE WHOLESALE',
    name: 'Satin Wrap Evening Cocktail Dress',
    category: 'Party & Evening',
    fabric: '100% Viscose Lustre Satin',
    sizes: ['S', 'M', 'L', 'XL'],
    moq: 1,
    isSinglePieceAvailable: true,
    singlePriceINR: 2100,
    bulkPriceINR: 1580,
    bulkThreshold: 15,
    stockUnits: 290,
    rating: 4.9,
    reviewsCount: 410,
    tag: 'NEW ARRIVAL • 1 PC READY',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'DRS-104',
    brand: 'NAVY & LOOM STUDIO',
    name: 'Schiffli Embroidered Cotton Tiered Maxi',
    category: 'Western Dresses',
    fabric: '100% Breathable Cambric Cotton',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    moq: 1,
    isSinglePieceAvailable: true,
    singlePriceINR: 1620,
    bulkPriceINR: 1190,
    bulkThreshold: 12,
    stockUnits: 540,
    rating: 4.7,
    reviewsCount: 275,
    tag: 'SINGLE SAMPLE OK',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'DRS-105',
    brand: 'KALA TEXTILES SURAT',
    name: 'Zari Border Festive Straight Kurti Set',
    category: 'Kurtis & Tunics',
    fabric: 'Modal Silk Blend with Dupatta',
    sizes: ['M', 'L', 'XL', 'XXL'],
    moq: 16,
    isSinglePieceAvailable: false,
    singlePriceINR: 1280,
    bulkPriceINR: 920,
    bulkThreshold: 16,
    stockUnits: 950,
    rating: 4.5,
    reviewsCount: 520,
    tag: 'FACTORY LOT • 16 PCS',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'DRS-106',
    brand: 'ATELIER MODA B2B',
    name: 'Tailored Linen Blazer & Trouser Co-ord',
    category: 'Co-ord Sets',
    fabric: '220GSM Pure European Flax Linen',
    sizes: ['S', 'M', 'L', 'XL'],
    moq: 1,
    isSinglePieceAvailable: true,
    singlePriceINR: 2490,
    bulkPriceINR: 1890,
    bulkThreshold: 10,
    stockUnits: 210,
    rating: 4.8,
    reviewsCount: 148,
    tag: 'BOUTIQUE PICK • 1 PC READY',
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'DRS-107',
    brand: 'AURA COUTURE WHOLESALE',
    name: 'Corset Bodice Flared A-Line Dress',
    category: 'Party & Evening',
    fabric: 'Structured Cotton Poplin Stretch',
    sizes: ['XS', 'S', 'M', 'L'],
    moq: 12,
    isSinglePieceAvailable: false,
    singlePriceINR: 1550,
    bulkPriceINR: 1120,
    bulkThreshold: 12,
    stockUnits: 375,
    rating: 4.7,
    reviewsCount: 204,
    tag: 'HIGH MARGIN',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'DRS-108',
    brand: 'KALA TEXTILES SURAT',
    name: 'Block-Printed Indigo A-Line Tunic Dress',
    category: 'Kurtis & Tunics',
    fabric: '60x60 Pure Mul Cotton',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    moq: 1,
    isSinglePieceAvailable: true,
    singlePriceINR: 990,
    bulkPriceINR: 690,
    bulkThreshold: 20,
    stockUnits: 1120,
    rating: 4.6,
    reviewsCount: 630,
    tag: 'FAST MOVING • 1 PC READY',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80',
  }
];

interface WholesaleOrder {
  orderId: string;
  buyerStore: string;
  city: string;
  gstNumber: string;
  totalPieces: number;
  amountINR: number;
  gstAmountINR: number;
  paymentStatus: 'Paid' | '50% Advance' | 'Pending';
  dispatchStatus: 'Dispatched' | 'Packing' | 'Awaiting Approval';
  date: string;
}

const INITIAL_ORDERS: WholesaleOrder[] = [
  {
    orderId: 'ORD-8841',
    buyerStore: 'Zoya Boutique & Silks',
    city: 'Kochi, KL',
    gstNumber: '32AABCU9603R1ZM',
    totalPieces: 48,
    amountINR: 64200,
    gstAmountINR: 3210,
    paymentStatus: 'Paid',
    dispatchStatus: 'Dispatched',
    date: '20 Nov 2026',
  },
  {
    orderId: 'ORD-8840',
    buyerStore: 'Vogue Trends Retail',
    city: 'Bengaluru, KA',
    gstNumber: '29AAACV1234F1Z5',
    totalPieces: 120,
    amountINR: 138500,
    gstAmountINR: 6925,
    paymentStatus: '50% Advance',
    dispatchStatus: 'Packing',
    date: '19 Nov 2026',
  },
  {
    orderId: 'ORD-8839',
    buyerStore: 'Meera Ethnic Studio',
    city: 'Mumbai, MH',
    gstNumber: '27AAACM9876K1Z1',
    totalPieces: 4,
    amountINR: 7450,
    gstAmountINR: 372,
    paymentStatus: 'Paid',
    dispatchStatus: 'Dispatched',
    date: '19 Nov 2026',
  },
  {
    orderId: 'ORD-8838',
    buyerStore: 'Ananya Fashion Hub',
    city: 'Delhi, DL',
    gstNumber: '07AAACA5544P1Z9',
    totalPieces: 85,
    amountINR: 94800,
    gstAmountINR: 4740,
    paymentStatus: 'Pending',
    dispatchStatus: 'Awaiting Approval',
    date: '18 Nov 2026',
  }
];

const formatINR = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

// ============================================================================
// 2. INTERACTIVE FASHION HERO (Cursor + Touch Screen Smooth Dynamics)
// ============================================================================
const FashionInteractiveHero: React.FC<{ onExploreClick: () => void }> = ({ onExploreClick }) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // Smooth spring-interpolated pointer coordinates (-1 to +1 normalized)
  const targetPointer = useRef({ x: 0, y: 0, active: false, rawX: -1000, rawY: -1000 });
  const currentPointer = useRef({ x: 0, y: 0 });
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  // Unified Mouse + Touch pointer tracking
  const updatePointerPosition = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relX = clientX - rect.left;
    const relY = clientY - rect.top;

    // Normalized -1 to 1
    const normX = (relX / rect.width) * 2 - 1;
    const normY = (relY / rect.height) * 2 - 1;

    targetPointer.current = {
      x: normX,
      y: normY,
      active: true,
      rawX: relX,
      rawY: relY,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    updatePointerPosition(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      updatePointerPosition(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      updatePointerPosition(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handlePointerLeave = () => {
    targetPointer.current.active = false;
    targetPointer.current.x = 0;
    targetPointer.current.y = 0;
  };

  // 60fps Silk Wave & Couture Thread Canvas + Smooth Parallax Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const handleResize = () => {
      if (!containerRef.current) return;
      canvas.width = containerRef.current.offsetWidth;
      canvas.height = containerRef.current.offsetHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const animate = () => {
      time += 0.025;

      // Smooth lerp for silky touch & cursor response
      currentPointer.current.x += (targetPointer.current.x - currentPointer.current.x) * 0.08;
      currentPointer.current.y += (targetPointer.current.y - currentPointer.current.y) * 0.08;

      setParallax({
        x: currentPointer.current.x,
        y: currentPointer.current.y,
      });

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw flowing dark-blue silk drape curves reacting to cursor/touch
      const lines = 7;
      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        const baseY = (canvas.height / (lines + 1)) * (i + 1);

        for (let x = 0; x <= canvas.width; x += 24) {
          const distToPointer = Math.abs(x - targetPointer.current.rawX);
          const pointerInfluence = targetPointer.current.active
            ? Math.max(0, 1 - distToPointer / 320) * (currentPointer.current.y * 45)
            : 0;

          const waveY =
            baseY +
            Math.sin(x * 0.006 + time + i * 0.6) * 18 +
            Math.cos(x * 0.003 - time * 0.7) * 10 +
            pointerInfluence;

          if (x === 0) ctx.moveTo(x, waveY);
          else ctx.lineTo(x, waveY);
        }

        ctx.strokeStyle = i % 2 === 0 ? 'rgba(10, 37, 64, 0.12)' : 'rgba(10, 37, 64, 0.06)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handlePointerLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handlePointerLeave}
      style={{ borderBottom: '2px solid #0A2540' }}
      className="relative bg-white overflow-hidden select-none touch-pan-y"
    >
      {/* Flowing Silk Thread Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Editorial Fashion Pitch */}
          <div className="lg:col-span-6 space-y-5">
            <div
              style={{ backgroundColor: '#0A2540', color: '#ffffff' }}
              className="inline-flex items-center gap-2 px-3 py-1 text-xs font-extrabold uppercase tracking-widest"
            >
              <Sparkles className="w-3.5 h-3.5" />
              FESTIVE & WESTERN WHOLESALE EDIT ’26
            </div>

            <h1
              style={{ color: '#0A2540' }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.06]"
            >
              Runway Dresses at Direct Mill Prices.
            </h1>

            <p style={{ color: 'rgba(10, 37, 64, 0.85)' }} className="text-base sm:text-lg max-w-xl leading-relaxed">
              Source boutique-grade Anarkalis, satin evening gowns, and linen co-ords. Buy <strong>1 Single Sample Piece</strong> or unlock <strong>Bulk Wholesale Rates</strong> starting at ₹690/dress.
            </p>

            {/* Quick Category Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              {['Ethnic Gowns', 'Party Satin', 'Cotton Maxis', 'Co-ord Sets', '1-Pc Samples'].map((tag) => (
                <span
                  key={tag}
                  style={{ borderColor: '#0A2540', color: '#0A2540' }}
                  className="px-3 py-1 text-xs font-bold border bg-white"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={onExploreClick}
                style={{ backgroundColor: '#0A2540', borderColor: '#0A2540', color: '#ffffff' }}
                className="px-7 py-3.5 text-sm font-extrabold uppercase tracking-wider border-2 hover:bg-white hover:text-[#0A2540] transition-colors cursor-pointer"
              >
                Explore Dress Catalog
              </button>

              <div style={{ borderColor: '#0A2540' }} className="px-4 py-2.5 border-2 bg-white">
                <span className="text-[11px] font-bold uppercase block text-[#0A2540]/60">
                  Interactive Lookbook
                </span>
                <span className="text-xs font-extrabold text-[#0A2540]">
                  Move Cursor or Swipe Dress Cards →
                </span>
              </div>
            </div>
          </div>

          {/* Right Dynamic Multi-Layer Fashion Lookbook (Reacts to Cursor & Touch) */}
          <div className="lg:col-span-6 relative h-[410px] sm:h-[460px] flex items-center justify-center">
            
            {/* Back Floating Lookbook Card (Moves opposite to pointer) */}
            <div
              style={{
                borderColor: '#0A2540',
                transform: `translate3d(${-parallax.x * 22}px, ${-parallax.y * 16}px, 0) rotate(${-4 + parallax.x * 3}deg)`,
              }}
              className="absolute left-2 sm:left-6 top-6 w-48 sm:w-56 border-2 bg-white p-2 shadow-sm transition-transform duration-75 ease-out"
            >
              <img
                src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80"
                alt="Pleated Midi Dress"
                className="w-full h-56 sm:h-64 object-cover"
              />
              <div className="pt-2 flex items-center justify-between text-[11px] font-extrabold text-[#0A2540]">
                <span>WESTERN MIDI</span>
                <span>₹1,050 BULK</span>
              </div>
            </div>

            {/* Front Floating Lookbook Card (Moves opposite vertically) */}
            <div
              style={{
                borderColor: '#0A2540',
                transform: `translate3d(${parallax.x * 26}px, ${-parallax.y * 20}px, 0) rotate(${5 + parallax.x * 4}deg)`,
              }}
              className="absolute right-2 sm:right-6 bottom-6 w-48 sm:w-56 border-2 bg-white p-2 shadow-sm transition-transform duration-75 ease-out z-20"
            >
              <img
                src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80"
                alt="Satin Evening Dress"
                className="w-full h-56 sm:h-64 object-cover"
              />
              <div className="pt-2 flex items-center justify-between text-[11px] font-extrabold text-[#0A2540]">
                <span>SATIN GOWN</span>
                <span>1 PC AVAILABLE</span>
              </div>
            </div>

            {/* Center Focal Couture Frame (Follows pointer smoothly) */}
            <div
              style={{
                borderColor: '#0A2540',
                transform: `translate3d(${parallax.x * 12}px, ${parallax.y * 12}px, 0)`,
              }}
              className="relative z-10 w-60 sm:w-72 border-2 bg-white p-2.5 transition-transform duration-75 ease-out"
            >
              <div className="relative overflow-hidden border-b-2 border-[#0A2540]">
                <img
                  src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=700&q=80"
                  alt="Royal Indigo Anarkali Gown"
                  className="w-full h-72 sm:h-80 object-cover"
                />
                <div
                  style={{ backgroundColor: '#0A2540', color: '#ffffff' }}
                  className="absolute bottom-2 left-2 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider"
                >
                  SINGLE: ₹1,850 • BULK: ₹1,390
                </div>
              </div>
              <div className="pt-2.5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-black text-[#0A2540]">INDIGO ANARKALI</p>
                  <p className="text-[10px] font-bold text-[#0A2540]/70">Chanderi Silk • S–XXL</p>
                </div>
                <span
                  style={{ borderColor: '#0A2540', color: '#0A2540' }}
                  className="px-2 py-0.5 text-[10px] font-extrabold border"
                >
                  IN STOCK
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// 3. MYNTRA-STYLE MAXIMALIST DRESS CARD (Mandatory Dark Blue Border)
// ============================================================================
interface DressCardProps {
  product: DressProduct;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  onAddToBag: (product: DressProduct, qty: number, size: string, unitPrice: number) => void;
}

const DressProductCard: React.FC<DressCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToBag,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[1] || product.sizes[0]);
  const [orderType, setOrderType] = useState<'single' | 'bulk'>(
    product.isSinglePieceAvailable ? 'single' : 'bulk'
  );
  const [qty, setQty] = useState<number>(product.isSinglePieceAvailable ? 1 : product.moq);
  const [justAdded, setJustAdded] = useState(false);

  const minAllowed = orderType === 'single' ? 1 : product.moq;
  const effectivePrice =
    qty >= product.bulkThreshold || orderType === 'bulk'
      ? product.bulkPriceINR
      : product.singlePriceINR;

  const discountPercent = Math.round(
    ((product.singlePriceINR - product.bulkPriceINR) / product.singlePriceINR) * 100
  );

  const switchMode = (mode: 'single' | 'bulk') => {
    setOrderType(mode);
    setQty(mode === 'single' ? 1 : Math.max(product.moq, product.bulkThreshold));
  };

  const handleAdd = () => {
    onAddToBag(product, qty, selectedSize, effectivePrice);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1100);
  };

  return (
    /* MANDATORY SOLID DARK BLUE BORDER AROUND EVERY PRODUCT FRAME */
    <div
      style={{ borderColor: '#0A2540' }}
      className="border-2 bg-white flex flex-col justify-between group transition-all duration-150 hover:-translate-y-0.5"
    >
      <div>
        {/* Image Frame */}
        <div style={{ borderColor: '#0A2540' }} className="relative h-72 w-full border-b-2 overflow-hidden bg-slate-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Top Tag */}
          {product.tag && (
            <div
              style={{
                backgroundColor: product.isSinglePieceAvailable ? '#ffffff' : '#0A2540',
                color: product.isSinglePieceAvailable ? '#0A2540' : '#ffffff',
                borderColor: '#0A2540',
              }}
              className="absolute top-2.5 left-2.5 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider border"
            >
              {product.tag}
            </div>
          )}

          {/* Wishlist Heart */}
          <button
            type="button"
            onClick={() => onToggleWishlist(product.id)}
            style={{ borderColor: '#0A2540', color: '#0A2540' }}
            className="absolute top-2.5 right-2.5 p-1.5 bg-white border hover:bg-[#0A2540] hover:text-white transition-colors cursor-pointer"
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#0A2540]' : ''}`} />
          </button>

          {/* Myntra-style Bottom Rating Pill */}
          <div
            style={{ borderColor: '#0A2540', color: '#0A2540' }}
            className="absolute bottom-2.5 left-2.5 bg-white/95 px-2 py-0.5 text-[11px] font-extrabold border flex items-center gap-1"
          >
            <span>{product.rating} ★</span>
            <span className="text-[#0A2540]/40">|</span>
            <span>{product.reviewsCount}</span>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-3.5">
          <p className="text-[11px] font-black uppercase tracking-wider text-[#0A2540]">
            {product.brand}
          </p>
          <h3 className="text-sm font-semibold text-[#0A2540]/85 truncate mt-0.5">
            {product.name}
          </h3>
          <p className="text-[11px] text-[#0A2540]/65 mt-0.5 truncate">{product.fabric}</p>

          {/* Dual Wholesale Pricing Row in INR */}
          <div className="mt-2.5 flex items-baseline gap-2 flex-wrap">
            <span className="text-base font-black text-[#0A2540]">
              {formatINR(effectivePrice)}
            </span>
            {effectivePrice < product.singlePriceINR && (
              <span className="text-xs line-through text-[#0A2540]/50">
                {formatINR(product.singlePriceINR)}
              </span>
            )}
            <span className="text-[11px] font-extrabold text-[#0A2540]">
              ({discountPercent}% BULK OFF)
            </span>
          </div>
          <p className="text-[11px] font-bold text-[#0A2540]/75 mt-0.5">
            Bulk Rate ({product.bulkThreshold}+ pcs): {formatINR(product.bulkPriceINR)}/pc
          </p>

          {/* Size Selector Pills */}
          <div className="mt-3">
            <span className="text-[10px] font-bold uppercase text-[#0A2540]/60 block mb-1">
              Select Size (Or Mixed Lot):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setSelectedSize(sz)}
                  style={{
                    backgroundColor: selectedSize === sz ? '#0A2540' : '#ffffff',
                    color: selectedSize === sz ? '#ffffff' : '#0A2540',
                    borderColor: '#0A2540',
                  }}
                  className="px-2 py-0.5 text-[11px] font-extrabold border cursor-pointer"
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Single Piece vs Bulk Toggle */}
          {product.isSinglePieceAvailable && (
            <div style={{ borderColor: '#0A2540' }} className="mt-3 grid grid-cols-2 border">
              <button
                type="button"
                onClick={() => switchMode('single')}
                style={{
                  backgroundColor: orderType === 'single' ? '#0A2540' : '#ffffff',
                  color: orderType === 'single' ? '#ffffff' : '#0A2540',
                }}
                className="py-1 text-[10px] font-extrabold uppercase cursor-pointer"
              >
                1 Pc Sample
              </button>
              <button
                type="button"
                onClick={() => switchMode('bulk')}
                style={{
                  backgroundColor: orderType === 'bulk' ? '#0A2540' : '#ffffff',
                  color: orderType === 'bulk' ? '#ffffff' : '#0A2540',
                }}
                className="py-1 text-[10px] font-extrabold uppercase cursor-pointer"
              >
                Bulk ({product.bulkThreshold}+)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quantity & Add to Wholesale Bag */}
      <div className="p-3.5 pt-0 space-y-2">
        <div style={{ borderColor: '#0A2540' }} className="flex items-center justify-between border">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(minAllowed, q - 1))}
            disabled={qty <= minAllowed}
            className="px-2.5 py-1.5 hover:bg-[#0A2540] hover:text-white disabled:opacity-30 cursor-pointer"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="text-xs font-black">
            {qty} {qty === 1 ? 'PC' : 'PCS'}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            className="px-2.5 py-1.5 hover:bg-[#0A2540] hover:text-white cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          style={{
            backgroundColor: justAdded ? '#ffffff' : '#0A2540',
            color: justAdded ? '#0A2540' : '#ffffff',
            borderColor: '#0A2540',
          }}
          className="w-full py-2.5 px-3 text-xs font-extrabold uppercase tracking-wider border-2 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
        >
          {justAdded ? (
            <>
              <Check className="w-4 h-4" /> Added to Bag
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" /> Add • {formatINR(qty * effectivePrice)}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// 4. SELLER ADMIN DASHBOARD VIEW (Sales, Money, GST & Live Inventory Control)
// ============================================================================
interface AdminDashboardProps {
  products: DressProduct[];
  orders: WholesaleOrder[];
  onToggleSinglePiece: (productId: string) => void;
  onAddNewDress: (newDress: DressProduct) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: WholesaleOrder['dispatchStatus']) => void;
}

const SellerAdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  orders,
  onToggleSinglePiece,
  onAddNewDress,
  onUpdateOrderStatus,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDressForm, setNewDressForm] = useState({
    name: '',
    brand: 'NAVY & LOOM STUDIO',
    category: 'Ethnic Dresses' as DressProduct['category'],
    fabric: '',
    singlePriceINR: 1600,
    bulkPriceINR: 1150,
    moq: 1,
    isSinglePieceAvailable: true,
    stockUnits: 250,
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=800&q=80',
  });

  // Financial Calculations in INR
  const totalRevenueINR = orders.reduce((sum, o) => sum + o.amountINR, 0);
  const totalGSTCollected = orders.reduce((sum, o) => sum + o.gstAmountINR, 0);
  const totalUnitsSold = orders.reduce((sum, o) => sum + o.totalPieces, 0);
  const pendingReceivablesINR = orders
    .filter((o) => o.paymentStatus !== 'Paid')
    .reduce((sum, o) => sum + (o.paymentStatus === '50% Advance' ? o.amountINR * 0.5 : o.amountINR), 0);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const created: DressProduct = {
      id: `DRS-${Math.floor(109 + Math.random() * 890)}`,
      brand: newDressForm.brand,
      name: newDressForm.name,
      category: newDressForm.category,
      fabric: newDressForm.fabric || '100% Premium Woven Fabric',
      sizes: ['S', 'M', 'L', 'XL'],
      moq: newDressForm.isSinglePieceAvailable ? 1 : Number(newDressForm.moq),
      isSinglePieceAvailable: newDressForm.isSinglePieceAvailable,
      singlePriceINR: Number(newDressForm.singlePriceINR),
      bulkPriceINR: Number(newDressForm.bulkPriceINR),
      bulkThreshold: 12,
      stockUnits: Number(newDressForm.stockUnits),
      rating: 5.0,
      reviewsCount: 1,
      tag: newDressForm.isSinglePieceAvailable ? 'NEW • 1 PC READY' : `BULK (${newDressForm.moq}+)`,
      image: newDressForm.image,
    };
    onAddNewDress(created);
    setShowAddModal(false);
    setNewDressForm({
      ...newDressForm,
      name: '',
      fabric: '',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-[#0A2540]">
        <div>
          <span
            style={{ backgroundColor: '#0A2540', color: '#ffffff' }}
            className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest"
          >
            SELLER CONTROL CENTER • GSTIN VERIFIED
          </span>
          <h1 className="text-3xl font-black text-[#0A2540] mt-2">
            Wholesale Revenue & Inventory Dashboard
          </h1>
          <p className="text-sm text-[#0A2540]/75">
            Track live dress sales, INR cashflow, GST collections, and toggle 1-piece vs. bulk MOQ rules.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          style={{ backgroundColor: '#0A2540', color: '#ffffff', borderColor: '#0A2540' }}
          className="px-5 py-3 text-xs font-extrabold uppercase tracking-wider border-2 hover:bg-white hover:text-[#0A2540] transition-colors cursor-pointer flex items-center gap-2 self-start"
        >
          <Plus className="w-4 h-4" /> Add New Dress to Store
        </button>
      </div>

      {/* 4 Financial & Sales KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div style={{ borderColor: '#0A2540' }} className="border-2 p-5 bg-white">
          <div className="flex items-center justify-between text-xs font-bold uppercase text-[#0A2540]/65">
            <span>Gross Wholesale Sales</span>
            <IndianRupee className="w-4 h-4 text-[#0A2540]" />
          </div>
          <p className="text-3xl font-black text-[#0A2540] mt-2">{formatINR(totalRevenueINR)}</p>
          <p className="text-xs font-bold text-[#0A2540] mt-2 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +18.4% vs last week
          </p>
        </div>

        <div style={{ borderColor: '#0A2540' }} className="border-2 p-5 bg-white">
          <div className="flex items-center justify-between text-xs font-bold uppercase text-[#0A2540]/65">
            <span>Pending Balance Due</span>
            <Clock className="w-4 h-4 text-[#0A2540]" />
          </div>
          <p className="text-3xl font-black text-[#0A2540] mt-2">
            {formatINR(pendingReceivablesINR)}
          </p>
          <p className="text-xs font-bold text-[#0A2540]/75 mt-2">
            From B2B credit & 50% advance orders
          </p>
        </div>

        <div style={{ borderColor: '#0A2540' }} className="border-2 p-5 bg-white">
          <div className="flex items-center justify-between text-xs font-bold uppercase text-[#0A2540]/65">
            <span>Total Dresses Dispatched</span>
            <PackageCheck className="w-4 h-4 text-[#0A2540]" />
          </div>
          <p className="text-3xl font-black text-[#0A2540] mt-2">{totalUnitsSold} PCS</p>
          <p className="text-xs font-bold text-[#0A2540]/75 mt-2">
            Across {orders.length} active B2B buyers
          </p>
        </div>

        <div style={{ borderColor: '#0A2540' }} className="border-2 p-5 bg-[#0A2540] text-white">
          <div className="flex items-center justify-between text-xs font-bold uppercase text-white/75">
            <span>5% Apparel GST Collected</span>
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <p className="text-3xl font-black mt-2">{formatINR(totalGSTCollected)}</p>
          <p className="text-xs font-bold text-white/80 mt-2">
            Ready for monthly GSTR-1 filing
          </p>
        </div>
      </div>

      {/* Live Wholesale Orders Table */}
      <div style={{ borderColor: '#0A2540' }} className="border-2 bg-white overflow-hidden">
        <div className="p-5 border-b-2 border-[#0A2540] flex items-center justify-between">
          <h2 className="text-lg font-black uppercase tracking-wide text-[#0A2540]">
            Recent Wholesale Orders & Payments (INR)
          </h2>
          <span className="text-xs font-bold px-2.5 py-1 border border-[#0A2540]">
            LIVE LEDGER
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr style={{ backgroundColor: '#0A2540', color: '#ffffff' }} className="text-xs uppercase">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Retailer / Boutique</th>
                <th className="py-3 px-4">GSTIN</th>
                <th className="py-3 px-4">Qty</th>
                <th className="py-3 px-4">Invoice (INR)</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Dispatch Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0A2540]/20 text-sm">
              {orders.map((ord) => (
                <tr key={ord.orderId} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-black">{ord.orderId}</td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold">{ord.buyerStore}</p>
                    <p className="text-xs text-[#0A2540]/65">{ord.city}</p>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs">{ord.gstNumber}</td>
                  <td className="py-3.5 px-4 font-extrabold">{ord.totalPieces} pcs</td>
                  <td className="py-3.5 px-4 font-black">{formatINR(ord.amountINR)}</td>
                  <td className="py-3.5 px-4">
                    <span
                      style={{
                        backgroundColor: ord.paymentStatus === 'Paid' ? '#0A2540' : '#ffffff',
                        color: ord.paymentStatus === 'Paid' ? '#ffffff' : '#0A2540',
                        borderColor: '#0A2540',
                      }}
                      className="px-2.5 py-1 text-xs font-extrabold border"
                    >
                      {ord.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={ord.dispatchStatus}
                      onChange={(e) =>
                        onUpdateOrderStatus(
                          ord.orderId,
                          e.target.value as WholesaleOrder['dispatchStatus']
                        )
                      }
                      style={{ borderColor: '#0A2540' }}
                      className="px-2.5 py-1 text-xs font-bold border bg-white cursor-pointer"
                    >
                      <option value="Awaiting Approval">Awaiting Approval</option>
                      <option value="Packing">Packing</option>
                      <option value="Dispatched">Dispatched</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Catalog MOQ & Single-Piece Toggle Manager */}
      <div style={{ borderColor: '#0A2540' }} className="border-2 bg-white overflow-hidden">
        <div className="p-5 border-b-2 border-[#0A2540]">
          <h2 className="text-lg font-black uppercase tracking-wide text-[#0A2540]">
            Catalog Stock & Single-Piece Toggle Control
          </h2>
          <p className="text-xs text-[#0A2540]/75 mt-0.5">
            Switch any dress between <strong>1-Piece Sample Allowed</strong> and <strong>Bulk MOQ Only</strong>—updates the customer shop immediately.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-[#0A2540] text-xs uppercase bg-slate-50">
                <th className="py-3 px-4">Dress</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">1-Pc Price</th>
                <th className="py-3 px-4">Bulk Price</th>
                <th className="py-3 px-4">Warehouse Stock</th>
                <th className="py-3 px-4">1-Piece Selling Mode</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0A2540]/15 text-sm">
              {products.map((prod) => (
                <tr key={prod.id}>
                  <td className="py-3 px-4 flex items-center gap-3">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-10 h-12 object-cover border border-[#0A2540]"
                    />
                    <div>
                      <p className="font-bold">{prod.name}</p>
                      <p className="text-xs text-[#0A2540]/60">{prod.id}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-xs font-bold">{prod.category}</td>
                  <td className="py-3 px-4 font-bold">{formatINR(prod.singlePriceINR)}</td>
                  <td className="py-3 px-4 font-black">{formatINR(prod.bulkPriceINR)}</td>
                  <td className="py-3 px-4 font-bold">{prod.stockUnits} pcs</td>
                  <td className="py-3 px-4">
                    <button
                      type="button"
                      onClick={() => onToggleSinglePiece(prod.id)}
                      style={{
                        backgroundColor: prod.isSinglePieceAvailable ? '#0A2540' : '#ffffff',
                        color: prod.isSinglePieceAvailable ? '#ffffff' : '#0A2540',
                        borderColor: '#0A2540',
                      }}
                      className="px-3 py-1.5 text-xs font-extrabold uppercase border-2 cursor-pointer transition-colors"
                    >
                      {prod.isSinglePieceAvailable ? '✓ 1-Piece Enabled' : 'Bulk MOQ Only'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Dress Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div
            style={{ borderColor: '#0A2540' }}
            className="w-full max-w-lg bg-white border-2 p-6 space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#0A2540]">
              <h3 className="text-lg font-black uppercase">Add New Wholesale Dress</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 border border-[#0A2540] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase mb-1">Dress Title *</label>
                <input
                  type="text"
                  required
                  value={newDressForm.name}
                  onChange={(e) => setNewDressForm({ ...newDressForm, name: e.target.value })}
                  placeholder="e.g., Banarasi Silk Flared Lehenga Dress"
                  style={{ borderColor: '#0A2540' }}
                  className="w-full px-3 py-2 border-2 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Category</label>
                  <select
                    value={newDressForm.category}
                    onChange={(e) =>
                      setNewDressForm({
                        ...newDressForm,
                        category: e.target.value as DressProduct['category'],
                      })
                    }
                    style={{ borderColor: '#0A2540' }}
                    className="w-full px-3 py-2 border-2 text-sm bg-white"
                  >
                    <option value="Ethnic Dresses">Ethnic Dresses</option>
                    <option value="Western Dresses">Western Dresses</option>
                    <option value="Party & Evening">Party & Evening</option>
                    <option value="Co-ord Sets">Co-ord Sets</option>
                    <option value="Kurtis & Tunics">Kurtis & Tunics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Fabric Spec</label>
                  <input
                    type="text"
                    value={newDressForm.fabric}
                    onChange={(e) => setNewDressForm({ ...newDressForm, fabric: e.target.value })}
                    placeholder="e.g., Pure Georgette"
                    style={{ borderColor: '#0A2540' }}
                    className="w-full px-3 py-2 border-2 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">
                    Single Piece Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newDressForm.singlePriceINR}
                    onChange={(e) =>
                      setNewDressForm({ ...newDressForm, singlePriceINR: Number(e.target.value) })
                    }
                    style={{ borderColor: '#0A2540' }}
                    className="w-full px-3 py-2 border-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">
                    Bulk Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newDressForm.bulkPriceINR}
                    onChange={(e) =>
                      setNewDressForm({ ...newDressForm, bulkPriceINR: Number(e.target.value) })
                    }
                    style={{ borderColor: '#0A2540' }}
                    className="w-full px-3 py-2 border-2 text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <input
                  id="allowSingleCheck"
                  type="checkbox"
                  checked={newDressForm.isSinglePieceAvailable}
                  onChange={(e) =>
                    setNewDressForm({
                      ...newDressForm,
                      isSinglePieceAvailable: e.target.checked,
                    })
                  }
                  className="w-4 h-4 accent-[#0A2540]"
                />
                <label htmlFor="allowSingleCheck" className="text-xs font-bold">
                  Allow customers to buy 1 single sample piece
                </label>
              </div>

              <button
                type="submit"
                style={{ backgroundColor: '#0A2540', color: '#ffffff' }}
                className="w-full py-3 text-xs font-extrabold uppercase tracking-wider cursor-pointer mt-2"
              >
                Publish Dress to Live Store
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 5. MAIN APPLICATION (Customer Myntra-Style Storefront + Seller Admin Portal)
// ============================================================================
export default function WholesaleFashionPortal() {
  const [activePortal, setActivePortal] = useState<'storefront' | 'admin'>('storefront');
  const [products, setProducts] = useState<DressProduct[]>(INITIAL_DRESSES);
  const [orders, setOrders] = useState<WholesaleOrder[]>(INITIAL_ORDERS);

  // Storefront Filter & Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [onlySinglePiece, setOnlySinglePiece] = useState<boolean>(false);
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(3000);
  const [sortBy, setSortBy] = useState<'featured' | 'priceLow' | 'priceHigh' | 'rating'>('featured');
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Wholesale Bag Drawer State
  const [bagItems, setBagItems] = useState<
    Array<{ product: DressProduct; qty: number; size: string; unitPrice: number }>
  >([]);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [buyerDetails, setBuyerDetails] = useState({
    storeName: '',
    city: '',
    gstNumber: '',
    phone: '',
  });

  const categories = [
    'All',
    'Ethnic Dresses',
    'Western Dresses',
    'Party & Evening',
    'Co-ord Sets',
    'Kurtis & Tunics',
  ];

  // Filter & Sort Dresses
  const visibleDresses = products
    .filter((item) => {
      const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSingle = !onlySinglePiece || item.isSinglePieceAvailable;
      const matchesPrice = item.bulkPriceINR <= maxPriceFilter;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.fabric.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSingle && matchesPrice && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'priceLow') return a.bulkPriceINR - b.bulkPriceINR;
      if (sortBy === 'priceHigh') return b.bulkPriceINR - a.bulkPriceINR;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  const handleToggleWishlist = (id: string) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const handleAddToBag = (
    product: DressProduct,
    qty: number,
    size: string,
    unitPrice: number
  ) => {
    setBagItems((prev) => {
      const idx = prev.findIndex((x) => x.product.id === product.id && x.size === size);
      if (idx > -1) {
        const updated = [...prev];
        const newQty = updated[idx].qty + qty;
        updated[idx] = {
          ...updated[idx],
          qty: newQty,
          unitPrice: newQty >= product.bulkThreshold ? product.bulkPriceINR : product.singlePriceINR,
        };
        return updated;
      }
      return [...prev, { product, qty, size, unitPrice }];
    });
  };

  const totalBagPieces = bagItems.reduce((sum, item) => sum + item.qty, 0);
  const bagSubtotalINR = bagItems.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);
  const bagGSTINR = Math.round(bagSubtotalINR * 0.05);

  const handlePlaceWholesaleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (bagItems.length === 0) return;

    const newOrder: WholesaleOrder = {
      orderId: `ORD-${Math.floor(8842 + Math.random() * 900)}`,
      buyerStore: buyerDetails.storeName || 'Boutique Buyer',
      city: buyerDetails.city || 'India',
      gstNumber: buyerDetails.gstNumber || 'UNREGISTERED-B2C',
      totalPieces: totalBagPieces,
      amountINR: bagSubtotalINR + bagGSTINR,
      gstAmountINR: bagGSTINR,
      paymentStatus: '50% Advance',
      dispatchStatus: 'Awaiting Approval',
      date: '20 Nov 2026',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCheckoutSuccess(true);
    setBagItems([]);
  };

  // Admin Handlers
  const handleToggleSinglePieceAdmin = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? {
              ...p,
              isSinglePieceAvailable: !p.isSinglePieceAvailable,
              moq: !p.isSinglePieceAvailable ? 1 : 12,
              tag: !p.isSinglePieceAvailable ? '1 PC READY' : 'BULK PACK (12+)',
            }
          : p
      )
    );
  };

  const handleAddNewDressAdmin = (newDress: DressProduct) => {
    setProducts((prev) => [newDress, ...prev]);
  };

  const handleUpdateOrderStatusAdmin = (
    orderId: string,
    newStatus: WholesaleOrder['dispatchStatus']
  ) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, dispatchStatus: newStatus } : o))
    );
  };

  return (
    <div style={{ color: '#0A2540' }} className="min-h-screen bg-white font-sans">
      {/* TOP ANNOUNCEMENT & PORTAL SWITCHER BAR */}
      <div style={{ backgroundColor: '#0A2540', color: '#ffffff' }} className="text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <p className="font-bold tracking-wide">
            PAN-INDIA WHOLESALE DISPATCH • GST INVOICING • 1-PIECE SAMPLE ORDERS OPEN
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActivePortal('storefront')}
              className={`px-3 py-1 font-extrabold uppercase text-[11px] border border-white cursor-pointer flex items-center gap-1.5 ${
                activePortal === 'storefront'
                  ? 'bg-white text-[#0A2540]'
                  : 'bg-transparent text-white'
              }`}
            >
              <Store className="w-3.5 h-3.5" /> Customer Shop View
            </button>
            <button
              onClick={() => setActivePortal('admin')}
              className={`px-3 py-1 font-extrabold uppercase text-[11px] border border-white cursor-pointer flex items-center gap-1.5 ${
                activePortal === 'admin'
                  ? 'bg-white text-[#0A2540]'
                  : 'bg-transparent text-white'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" /> Seller Admin & Money
            </button>
          </div>
        </div>
      </div>

      {/* MYNTRA-STYLE MAXIMALIST STICKY HEADER */}
      <header style={{ borderBottom: '2px solid #0A2540' }} className="sticky top-0 z-40 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div
            onClick={() => setActivePortal('storefront')}
            className="flex items-center gap-2.5 cursor-pointer shrink-0"
          >
            <div
              style={{ backgroundColor: '#0A2540' }}
              className="w-9 h-9 text-white flex items-center justify-center font-black text-xl"
            >
              V
            </div>
            <div>
              <span className="font-black text-lg tracking-tight block leading-none">
                VASTRA B2B
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0A2540]/70">
                WHOLESALE FASHION HUB
              </span>
            </div>
          </div>

          {/* Desktop Category Mega-Links (Myntra Style) */}
          {activePortal === 'storefront' && (
            <nav className="hidden xl:flex items-center gap-6 text-xs font-extrabold uppercase tracking-wider">
              {categories.slice(1).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    document.getElementById('catalog-grid')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`py-2 border-b-2 cursor-pointer transition-colors ${
                    selectedCategory === cat
                      ? 'border-[#0A2540] text-[#0A2540]'
                      : 'border-transparent hover:border-[#0A2540]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </nav>
          )}

          {/* Wide Search Bar */}
          {activePortal === 'storefront' && (
            <div className="flex-1 max-w-md relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#0A2540]/60" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Anarkalis, Satin Gowns, Linen Co-ords..."
                style={{ borderColor: '#0A2540' }}
                className="w-full pl-9 pr-4 py-2 border-2 text-xs font-semibold focus:outline-none bg-slate-50 focus:bg-white"
              />
            </div>
          )}

          {/* Action Icons (Wishlist + Wholesale Bag) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActivePortal('storefront')}
              className="hidden sm:flex flex-col items-center text-[10px] font-extrabold uppercase cursor-pointer"
            >
              <div className="relative">
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span
                    style={{ backgroundColor: '#0A2540', color: '#ffffff' }}
                    className="absolute -top-1.5 -right-2 px-1 text-[9px] font-black"
                  >
                    {wishlist.length}
                  </span>
                )}
              </div>
              <span className="mt-0.5">Wishlist</span>
            </button>

            <button
              onClick={() => {
                setCheckoutSuccess(false);
                setIsBagOpen(true);
              }}
              style={{ backgroundColor: '#0A2540', color: '#ffffff', borderColor: '#0A2540' }}
              className="px-3.5 py-2 border-2 flex items-center gap-2 text-xs font-extrabold uppercase cursor-pointer hover:bg-white hover:text-[#0A2540] transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Wholesale Bag</span>
              <span className="bg-white text-[#0A2540] px-1.5 py-0.5 text-[11px] font-black">
                {totalBagPieces}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* CONDITIONAL RENDER: ADMIN DASHBOARD VS CUSTOMER STOREFRONT */}
      {activePortal === 'admin' ? (
        <SellerAdminDashboard
          products={products}
          orders={orders}
          onToggleSinglePiece={handleToggleSinglePieceAdmin}
          onAddNewDress={handleAddNewDressAdmin}
          onUpdateOrderStatus={handleUpdateOrderStatusAdmin}
        />
      ) : (
        <>
          {/* HERO SECTION WITH CURSOR & TOUCH DYNAMICS */}
          <FashionInteractiveHero
            onExploreClick={() =>
              document.getElementById('catalog-grid')?.scrollIntoView({ behavior: 'smooth' })
            }
          />

          {/* MYNTRA-STYLE TRUST & WHOLESALE BENEFITS STRIP */}
          <section style={{ borderBottom: '2px solid #0A2540' }} className="bg-white py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-extrabold">
              <div className="flex items-center gap-2.5">
                <Tag className="w-5 h-5 shrink-0" />
                <span>1-PIECE SAMPLE ORDERS ALLOWED</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 shrink-0" />
                <span>100% INPUT GST TAX INVOICE</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Truck className="w-5 h-5 shrink-0" />
                <span>48-HR DISPATCH ACROSS INDIA</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 shrink-0" />
                <span>CUSTOM PRIVATE LABEL TAGS</span>
              </div>
            </div>
          </section>

          {/* MAXIMALIST CATALOG SECTION (Left Sidebar Filters + 4-Col Product Grid) */}
          <section id="catalog-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Breadcrumb & Sort Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-[#0A2540]">
              <div>
                <p className="text-xs font-bold text-[#0A2540]/60 uppercase">
                  Home / Wholesale Dresses / {selectedCategory}
                </p>
                <h2 className="text-2xl font-black text-[#0A2540] mt-0.5">
                  {selectedCategory} Collection{' '}
                  <span className="text-sm font-bold text-[#0A2540]/60">
                    ({visibleDresses.length} Styles)
                  </span>
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-xs font-extrabold uppercase">Sort By:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  style={{ borderColor: '#0A2540' }}
                  className="px-3 py-2 border-2 text-xs font-extrabold bg-white cursor-pointer"
                >
                  <option value="featured">Recommended Wholesale</option>
                  <option value="priceLow">Bulk Price: Low to High (₹)</option>
                  <option value="priceHigh">Bulk Price: High to Low (₹)</option>
                  <option value="rating">Highest Buyer Rating</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
              {/* LEFT SIDEBAR FILTERS (Myntra-style filter rail) */}
              <aside className="lg:col-span-3 space-y-6">
                <div style={{ borderColor: '#0A2540' }} className="border-2 p-4 bg-white space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-[#0A2540]/20">
                    <span className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                      <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
                    </span>
                    <button
                      onClick={() => {
                        setSelectedCategory('All');
                        setOnlySinglePiece(false);
                        setMaxPriceFilter(3000);
                        setSearchQuery('');
                      }}
                      className="text-[11px] font-extrabold underline cursor-pointer"
                    >
                      CLEAR ALL
                    </button>
                  </div>

                  {/* Filter 1: Order Flexibility */}
                  <div>
                    <p className="text-xs font-black uppercase mb-2.5">Order Flexibility</p>
                    <label className="flex items-center gap-2.5 text-xs font-bold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={onlySinglePiece}
                        onChange={(e) => setOnlySinglePiece(e.target.checked)}
                        className="w-4 h-4 accent-[#0A2540]"
                      />
                      <span>1-Piece Single Order Available</span>
                    </label>
                  </div>

                  {/* Filter 2: Dress Categories */}
                  <div className="pt-4 border-t border-[#0A2540]/20">
                    <p className="text-xs font-black uppercase mb-2.5">Dress Categories</p>
                    <div className="space-y-2">
                      {categories.map((cat) => (
                        <label
                          key={cat}
                          className="flex items-center gap-2.5 text-xs font-bold cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="dressCategory"
                            checked={selectedCategory === cat}
                            onChange={() => setSelectedCategory(cat)}
                            className="w-3.5 h-3.5 accent-[#0A2540]"
                          />
                          <span>{cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Filter 3: Max Bulk Price Slider in INR */}
                  <div className="pt-4 border-t border-[#0A2540]/20">
                    <div className="flex items-center justify-between text-xs font-black uppercase mb-2">
                      <span>Max Bulk Price</span>
                      <span>{formatINR(maxPriceFilter)}</span>
                    </div>
                    <input
                      type="range"
                      min={600}
                      max={3000}
                      step={100}
                      value={maxPriceFilter}
                      onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                      className="w-full accent-[#0A2540] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-bold text-[#0A2540]/60 mt-1">
                      <span>₹600</span>
                      <span>₹3,000+</span>
                    </div>
                  </div>
                </div>
              </aside>

              {/* RIGHT PRODUCT GRID */}
              <div className="lg:col-span-9">
                {visibleDresses.length === 0 ? (
                  <div
                    style={{ borderColor: '#0A2540' }}
                    className="border-2 p-12 text-center bg-white"
                  >
                    <Filter className="w-8 h-8 mx-auto mb-2" />
                    <p className="font-black text-base">No dresses match your current filters.</p>
                    <button
                      onClick={() => {
                        setSelectedCategory('All');
                        setOnlySinglePiece(false);
                        setMaxPriceFilter(3000);
                        setSearchQuery('');
                      }}
                      style={{ backgroundColor: '#0A2540', color: '#ffffff' }}
                      className="mt-4 px-4 py-2 text-xs font-extrabold uppercase cursor-pointer"
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {visibleDresses.map((dress) => (
                      <DressProductCard
                        key={dress.id}
                        product={dress}
                        isWishlisted={wishlist.includes(dress.id)}
                        onToggleWishlist={handleToggleWishlist}
                        onAddToBag={handleAddToBag}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </>
      )}

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#0A2540', color: '#ffffff' }} className="mt-16 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <span className="font-black text-xl tracking-tight">VASTRA B2B</span>
            <p className="text-white/75 text-xs mt-2 max-w-xs leading-relaxed">
              Direct manufacturer-to-boutique wholesale women’s wear platform. Order single sample pieces or factory carton runs with GST compliance.
            </p>
          </div>
          <div className="space-y-1.5 text-xs">
            <p className="font-extrabold uppercase text-white/60">Wholesale Hubs</p>
            <p>Surat Textile Market • Ring Road, Gujarat</p>
            <p>MG Road Apparel Center • Kochi, Kerala</p>
            <p>Support: orders@vastrab2b.in • +91 98470 00192</p>
          </div>
          <div className="md:text-right text-xs flex flex-col justify-between">
            <p className="font-bold">100% Secure B2B Bank Transfer, UPI & NetBanking</p>
            <p className="text-white/60 mt-4">© 2026 Vastra B2B Wholesale India. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* WHOLESALE BAG & INR GST CHECKOUT DRAWER */}
      {isBagOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
          <div
            style={{ borderColor: '#0A2540' }}
            className="w-full max-w-md bg-white border-l-2 h-full flex flex-col justify-between p-5 overflow-y-auto"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b-2 border-[#0A2540]">
                <h3 className="text-base font-black uppercase">
                  Wholesale Bag ({totalBagPieces} Pieces)
                </h3>
                <button
                  onClick={() => setIsBagOpen(false)}
                  className="p-1.5 border border-[#0A2540] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {checkoutSuccess ? (
                <div
                  style={{ backgroundColor: '#0A2540', color: '#ffffff' }}
                  className="mt-6 p-6 space-y-3"
                >
                  <h4 className="text-lg font-black">Wholesale Order Placed!</h4>
                  <p className="text-xs text-white/85 leading-relaxed">
                    Your order has been logged directly into the Seller Admin Dashboard. Switch to{' '}
                    <strong>Seller Admin & Money</strong> in the top bar to view the live revenue & invoice entry!
                  </p>
                  <button
                    onClick={() => {
                      setIsBagOpen(false);
                      setActivePortal('admin');
                    }}
                    className="w-full py-2.5 bg-white text-[#0A2540] text-xs font-extrabold uppercase cursor-pointer"
                  >
                    Open Seller Admin Dashboard →
                  </button>
                </div>
              ) : bagItems.length === 0 ? (
                <div className="py-20 text-center">
                  <p className="font-black text-sm">Your wholesale bag is empty.</p>
                  <p className="text-xs text-[#0A2540]/65 mt-1">
                    Add 1-piece samples or bulk dress sets from the catalog.
                  </p>
                </div>
              ) : (
                <div className="mt-4 space-y-4">
                  {bagItems.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}`}
                      style={{ borderColor: '#0A2540' }}
                      className="p-3 border-2 flex items-center justify-between gap-3"
                    >
                      <div>
                        <p className="text-xs font-black">{item.product.name}</p>
                        <p className="text-[11px] font-bold text-[#0A2540]/70">
                          Size: {item.size} • {item.qty} pcs × {formatINR(item.unitPrice)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-black">
                          {formatINR(item.qty * item.unitPrice)}
                        </p>
                        <button
                          onClick={() =>
                            setBagItems((prev) =>
                              prev.filter(
                                (x) =>
                                  !(x.product.id === item.product.id && x.size === item.size)
                              )
                            )
                          }
                          className="text-[10px] font-bold underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* GST & Total Summary */}
                  <div
                    style={{ borderColor: '#0A2540' }}
                    className="p-3.5 border-2 bg-slate-50 space-y-1.5 text-xs"
                  >
                    <div className="flex justify-between font-bold">
                      <span>Subtotal ({totalBagPieces} pcs)</span>
                      <span>{formatINR(bagSubtotalINR)}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Apparel GST (5%)</span>
                      <span>{formatINR(bagGSTINR)}</span>
                    </div>
                    <div className="flex justify-between font-black text-sm pt-2 border-t border-[#0A2540]/20">
                      <span>Total Payable (INR)</span>
                      <span>{formatINR(bagSubtotalINR + bagGSTINR)}</span>
                    </div>
                  </div>

                  {/* Quick B2B Checkout Form */}
                  <form onSubmit={handlePlaceWholesaleOrder} className="space-y-2.5 pt-2">
                    <input
                      type="text"
                      required
                      placeholder="Boutique / Business Name *"
                      value={buyerDetails.storeName}
                      onChange={(e) =>
                        setBuyerDetails({ ...buyerDetails, storeName: e.target.value })
                      }
                      style={{ borderColor: '#0A2540' }}
                      className="w-full px-3 py-2 border-2 text-xs font-semibold"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        placeholder="City & State *"
                        value={buyerDetails.city}
                        onChange={(e) =>
                          setBuyerDetails({ ...buyerDetails, city: e.target.value })
                        }
                        style={{ borderColor: '#0A2540' }}
                        className="w-full px-3 py-2 border-2 text-xs font-semibold"
                      />
                      <input
                        type="text"
                        placeholder="GSTIN (Optional)"
                        value={buyerDetails.gstNumber}
                        onChange={(e) =>
                          setBuyerDetails({ ...buyerDetails, gstNumber: e.target.value })
                        }
                        style={{ borderColor: '#0A2540' }}
                        className="w-full px-3 py-2 border-2 text-xs font-semibold"
                      />
                    </div>
                    <button
                      type="submit"
                      style={{ backgroundColor: '#0A2540', color: '#ffffff' }}
                      className="w-full py-3 text-xs font-extrabold uppercase tracking-wider cursor-pointer"
                    >
                      Confirm Wholesale Order • {formatINR(bagSubtotalINR + bagGSTINR)}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}