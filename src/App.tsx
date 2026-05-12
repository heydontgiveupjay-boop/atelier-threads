import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ProductGrid } from "./components/ProductGrid";
import { ProductModal } from "./components/ProductModal";
import { CartSheet } from "./components/CartSheet";
import { CheckoutForm } from "./components/CheckoutForm";
import { Product, CartItem } from "./types";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import { PRODUCTS } from "./data/products";

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckout, setIsCheckout] = useState(false);

  // Sync cart with local storage (optional, for demo)
  useEffect(() => {
    const savedCart = localStorage.getItem("essence-cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to load cart", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("essence-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, selectedSize: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === selectedSize);
      if (existing) {
        toast.info(`Updated ${product.name} quantity in bag`);
        return prev.map(item => 
          item.id === product.id && item.selectedSize === selectedSize 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      toast.success(`Added ${product.name} to bag`);
      return [...prev, { ...product, quantity: 1, selectedSize }];
    });
  };

  const handleQuickAddToCart = (product: Product) => {
    // If multiple sizes, open modal. If only one size or we want a default, we could pick first.
    // For this UI, we'll open the modal to ensure size selection.
    setSelectedProduct(product);
  };

  const updateQuantity = (id: string, size: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.selectedSize === size) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: string, size: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)));
    toast.info("Item removed from bag");
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (isCheckout) {
    return (
      <div className="min-h-screen bg-background font-sans">
        <CheckoutForm 
          cart={cart} 
          onBack={() => setIsCheckout(false)} 
          onComplete={() => {
            setCart([]);
            setIsCheckout(false);
          }} 
        />
        <Toaster position="bottom-right" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-slate-900 selection:text-white">
      <Navbar cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />
      
      <main>
        <Hero />
        <ProductGrid 
          onQuickView={setSelectedProduct} 
          onAddToCart={handleQuickAddToCart} 
        />
        
        <section className="bg-slate-900 text-white py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 tracking-tight">Elegance in Every Detail</h2>
            <p className="text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed text-lg">
              We believe in creating pieces that last. Our philosophy is rooted in slow fashion, 
              focusing on quality craftsmanship and sustainable materials that stand the test of time.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto text-sm uppercase tracking-widest font-semibold text-slate-300">
              <div className="space-y-4">
                <div className="h-px bg-slate-800 w-12 mx-auto"></div>
                <p>Ethical Production</p>
              </div>
              <div className="space-y-4">
                <div className="h-px bg-slate-800 w-12 mx-auto"></div>
                <p>Organic Materials</p>
              </div>
              <div className="space-y-4">
                <div className="h-px bg-slate-800 w-12 mx-auto"></div>
                <p>Fair Wages</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <h3 className="text-xl font-bold tracking-tight uppercase">shop with swago</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Elevating the everyday through thoughtful design and uncompromising quality.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Support</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-slate-900 transition-colors">Shipping & Returns</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">Size Guide</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-slate-900 transition-colors">Our Story</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">Sustainability</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">Stockists</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Join the Journey</h4>
              <p className="text-sm text-slate-500 mb-4">Subscribe for early access and seasonal updates.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="flex-1 bg-slate-50 border-none px-4 text-sm focus:ring-1 focus:ring-slate-900 transition-all outline-none"
                />
                <button className="bg-slate-900 text-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-400 uppercase tracking-widest font-medium">
            <p>© 2024 shop with swago. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      <ProductModal 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />

      <CartSheet 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckout(true);
        }}
      />

      <Toaster position="bottom-right" expand={false} richColors />
    </div>
  );
}

export default App;