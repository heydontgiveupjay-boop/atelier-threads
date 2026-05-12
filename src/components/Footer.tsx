import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white uppercase">shop with swago</span>
            </div>
            <p className="text-sm leading-relaxed">
              Curating the finest fashion and lifestyle products. Quality and minimalism at your fingertips.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Shop</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">All Products</a></li>
              <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Best Sellers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Featured</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Company</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Newsletter</h3>
            <p className="text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <div className="flex gap-2">
              <Input
                placeholder="Enter email"
                className="bg-slate-800 border-slate-700 text-white focus-visible:ring-white"
              />
              <Button className="bg-white hover:bg-slate-200 text-slate-900 font-bold px-4">
                Join
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © 2024 shop with swago. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              <span>hello@swago.com</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>Global</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};