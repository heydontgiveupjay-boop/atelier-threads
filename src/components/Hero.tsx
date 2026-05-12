import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <div className="relative h-[80vh] w-full overflow-hidden bg-slate-50">
      <div className="absolute inset-0">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/08d64014-c24b-4313-882f-e975c9e328c9/hero-banner-9fd3bdc4-1778519703509.webp" 
          alt="Luxury store" 
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/40" />
      </div>

      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-start text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <h2 className="text-sm font-semibold uppercase tracking-widest mb-4">New Season 2024</h2>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Curated Essentials for the Modern Wardrobe
          </h1>
          <p className="text-lg text-white/90 mb-8 max-w-lg leading-relaxed">
            Discover our latest collection featuring sustainable fabrics, timeless silhouettes, and uncompromising quality.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 rounded-none h-14 px-8 text-base font-semibold">
              Shop Collection
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 rounded-none h-14 px-8 text-base font-semibold">
              Explore Our Story
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};