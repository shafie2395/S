/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Phone, MapPin, Clock, ChevronRight, Facebook, Instagram, Twitter } from 'lucide-react';
import { useState, useEffect } from 'react';

// Menu Data
const MENU_SECTIONS = [
  {
    title: "Seafood (Deep Fried)",
    items: [
      { name: "Ghazi SP Fish (1 Pcs)", price: 700 },
      { name: "Fried Fish (4pcs)", price: 700 },
      { name: "Dhaka Fish", price: 700 },
      { name: "Angarian Fish", price: 700 },
      { name: "Tempura Prawn", price: 900 },
      { name: "Finger Fish", price: 700 },
      { name: "Appolo Fish", price: 700 },
    ]
  },
  {
    title: "Rice",
    items: [
      { name: "Chicken Biryani", price: 320 },
      { name: "Mutton Biryani", price: 400 },
      { name: "Fish/ Prawn Biryani", price: 600 },
      { name: "Ghazi Special Fried Rice", price: 640 },
      { name: "Chicken Fried Rice", price: 400 },
      { name: "Egg/ Vegetable Fried Rice", price: 360 },
      { name: "Chicken Masala Rice", price: 400 },
      { name: "Prawn Fried Rice", price: 600 },
      { name: "Mix Fried Rice", price: 600 },
      { name: "Chicken Thai Fried Rice", price: 440 },
      { name: "Butter Zeera Rice", price: 240 },
      { name: "Biryani Rice", price: 200 },
      { name: "Steam Rice", price: 140 },
    ]
  },
  {
    title: "Chicken Specials",
    items: [
      { name: "Special Chicken Handi", price: 900 },
      { name: "Achari Chicken Handi", price: 1000 },
      { name: "Butter Chicken", price: 600 },
      { name: "Chicken Ginger", price: 500 },
      { name: "Ghazi Special Chicken", price: 600 },
      { name: "Chicken Karahi", price: 500 },
      { name: "Achari Chicken Karahi", price: 600 },
      { name: "Chicken Baati", price: 440 },
      { name: "Chicken Black Pepper", price: 600 },
      { name: "Murg Musallam", price: 500 },
      { name: "Chicken Zeera", price: 500 },
      { name: "Chicken Jalfraizi", price: 520 },
      { name: "Chicken Masala", price: 360 },
      { name: "Chicken Do Piaza", price: 560 },
      { name: "Chicken 65", price: 600 },
      { name: "Special Badami Chicken Karahi", price: 600 },
      { name: "Appollo Chicken (Saturday)", price: 500 },
      { name: "Tawa Chicken (Monday)", price: 540 },
      { name: "Chicken W Qorma", price: 440 },
    ]
  }
];

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1626776876729-bab4369a5a54?q=80&w=2000", // Karahi/Handi
  biryani: "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?q=80&w=2000",
  fish: "https://images.unsplash.com/photo-1593330107223-95697240292b?q=80&w=2000", // Finger Fish
  restaurant: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2000",
  signature: "https://images.unsplash.com/photo-1603894584202-9331f0e9f0fb?q=80&w=2000" // Handi close up
};

const DISHES = [
  {
    name: "Special Chicken Handi",
    image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=800",
    description: "Our signature creamy tomato-based chicken curry slow-cooked in a traditional clay pot."
  },
  {
    name: "Ghazi Fish Special",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=800",
    description: "Freshly caught and deep-fried with our secret blend of ethnic Pakistani spices."
  },
  {
    name: "Premium Biryani",
    image: "https://images.unsplash.com/photo-1589302168068-1c459288350e?q=80&w=800",
    description: "Long-grain basmati rice layered with tender meat and aromatic herbs for an explosion of flavor."
  }
];

const GALLERY_DATA = [
  {
    category: "Chef's Specials",
    images: [
      { url: "https://images.unsplash.com/photo-1603894584202-9331f0e9f0fb?q=80&w=800", title: "Special Chicken Handi" },
      { url: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=800", title: "Murg Musallam" },
      { url: "https://images.unsplash.com/photo-1626776876729-bab4369a5a54?q=80&w=800", title: "Ghazi Special Karahi" },
    ]
  },
  {
    category: "Appetizers",
    images: [
      { url: "https://images.unsplash.com/photo-1593330107223-95697240292b?q=80&w=800", title: "Crispy Finger Fish" },
      { url: "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?q=80&w=800", title: "Tempura Prawn" },
      { url: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=800", title: "Chicken 65" },
    ]
  },
  {
    category: "Desserts",
    images: [
      { url: "https://images.unsplash.com/photo-1589113103553-49684c9adfe4?q=80&w=800", title: "Traditional Kheer" },
      { url: "https://images.unsplash.com/photo-1593531182305-654dbf1f4569?q=80&w=800", title: "Gulab Jamun" },
      { url: "https://images.unsplash.com/photo-1542156822-6924d1a71aba?q=80&w=800", title: "Sweet Delights" },
    ]
  }
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeGalleryTab, setActiveGalleryTab] = useState(GALLERY_DATA[0].category);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] font-sans selection:bg-[#002366] selection:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md py-4 shadow-lg border-b border-blue-50' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-[#002366] rounded-lg flex items-center justify-center text-white font-serif font-bold text-xl">G</div>
            <div className={`text-2xl font-serif font-bold tracking-tighter transition-colors duration-300 ${isScrolled ? 'text-[#002366]' : 'text-white'}`}>GHAZI</div>
          </div>
          <div className={`hidden md:flex space-x-10 text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${isScrolled ? 'text-gray-600' : 'text-white/80'}`}>
            <a href="#home" className="hover:text-[#002366] transition-colors relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#002366] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#about" className="hover:text-[#002366] transition-colors relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#002366] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#menu" className="hover:text-[#002366] transition-colors relative group">
              Menu
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#002366] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#gallery" className="hover:text-[#002366] transition-colors relative group">
              Gallery
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#002366] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#contact" className="hover:text-[#002366] transition-colors relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#002366] group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>
          <a href="tel:03183292782" className="bg-[#002366] text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#001a4d] hover:scale-105 transition-all shadow-xl shadow-[#002366]/20">
            Reserve Table
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.hero} 
            alt="Delicious Pakistani Handi" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002366]/90 via-[#002366]/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="max-w-3xl"
          >
            <span className="text-blue-400 font-serif italic text-2xl mb-4 block">Est. Tradition 1998</span>
            <h1 className="text-7xl md:text-8xl font-serif font-black text-white mb-8 uppercase tracking-tighter leading-[0.9]">
              Authentic <br /> <span className="text-white">Ghazi</span> Taste
            </h1>
            <p className="text-white/70 text-xl max-w-xl font-light leading-relaxed mb-12 border-l-2 border-blue-400 pl-6">
              "A taste of tradition, a fusion of flavors." <br /> Experience the finest Pakistani cuisine in the heart of Korangi.
            </p>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <a href="#menu" className="w-full md:w-auto bg-white text-[#002366] px-12 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-blue-50 transition-all shadow-2xl">
                View Menu
              </a>
              <div className="flex items-center space-x-4 text-white">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                   <Phone size={20} className="text-blue-400" />
                </div>
                <div>
                   <span className="text-white/50 text-[10px] uppercase tracking-widest block font-bold">Call for delivery</span>
                   <span className="font-serif text-xl font-bold italic">0318 3292782</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Signature Dish Highlight (Images Addition) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#002366] mb-4">Our Signature Specialties</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Crafted with precision, served with passion. Our most loved dishes that define the Ghazi experience.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {DISHES.map((dish, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="group bg-[#f8faff] rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={dish.image} alt={dish.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-serif font-bold text-[#002366] mb-3">{dish.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">{dish.description}</p>
                  <a href="#menu" className="inline-flex items-center text-[#002366] font-bold text-xs uppercase tracking-widest group/link">
                    Order this dish <ChevronRight size={16} className="ml-2 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-[#002366] overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center relative z-10">
          <div className="relative group">
            <div className="aspect-square overflow-hidden rounded-[3rem] shadow-2xl relative z-10 border-8 border-white/10">
              <img src={IMAGES.signature} alt="Authentic Food Preparation" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-white/20 rounded-[3rem] scale-110 group-hover:scale-100 transition-transform duration-700"></div>
          </div>
          
          <div className="text-white">
            <span className="text-blue-400 font-serif italic text-xl mb-4 block">Our Story</span>
            <h2 className="text-5xl md:text-6xl font-serif font-bold mb-8 leading-tight">
              A Legacy of <br /> <span className="italic">Pure Excellence</span>
            </h2>
            <p className="text-lg text-white/70 mb-10 leading-relaxed font-light">
              Located at the heart of Korangi, Ghazi Restaurant stands as a testament to authentic flavors. Every Handi we serve and every Biryani we steam carries the weight of tradition blended with modern hygiene and quality.
            </p>
            <div className="grid grid-cols-2 gap-12 mb-12">
              <div className="border-l-2 border-blue-400 pl-6">
                <h4 className="text-4xl font-serif font-black mb-2 italic">25+</h4>
                <p className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-bold">Years of Heritage</p>
              </div>
              <div className="border-l-2 border-blue-400 pl-6">
                <h4 className="text-4xl font-serif font-black mb-2 italic">50k+</h4>
                <p className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-bold">Happy Diners</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
               <div className="w-12 h-12 bg-blue-400 rounded-xl flex items-center justify-center text-[#002366]">
                  <MapPin size={24} />
               </div>
               <div>
                  <p className="text-white font-bold text-sm">Main Branch</p>
                  <p className="text-white/50 text-xs lowercase">Korangi 5, Main khaddi stop, sector 35, Karachi</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 bg-white text-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6 text-center mb-20">
          <span className="text-blue-600 font-serif italic text-xl mb-2 block">Premium Cuisines</span>
          <h2 className="text-6xl md:text-8xl font-serif font-bold mb-6 text-[#002366] uppercase tracking-tighter">The Menu</h2>
          <div className="w-24 h-1 bg-[#002366] mx-auto opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-16">
            {MENU_SECTIONS.map((section, idx) => (
              <div key={idx} className="space-y-10">
                <div className="text-center">
                  <h3 className="text-3xl font-serif font-bold text-[#002366] bg-[#f8faff] py-4 rounded-2xl border border-blue-50 shadow-sm">{section.title}</h3>
                </div>
                
                <div className="space-y-6">
                  {section.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="group relative">
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="text-lg font-medium group-hover:text-blue-600 transition-colors pr-4 bg-white relative z-10">{item.name}</span>
                        <div className="flex-1 h-[1px] border-b border-dotted border-gray-300 relative -top-1"></div>
                        <span className="pl-4 font-serif font-bold text-xl text-[#002366] bg-white relative z-10">
                          <span className="text-[10px] uppercase tracking-widest font-sans text-gray-400 font-normal mr-1">PKR</span>
                          {item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-20 p-12 rounded-[3rem] text-center bg-[#002366] relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <p className="text-white/80 italic text-2xl mb-8 relative z-10">"Every bite is a journey through the heart of Pakistan."</p>
            <div className="flex flex-wrap justify-center gap-6 relative z-10">
              <div className="px-8 py-3 rounded-full bg-white/10 border border-white/20 text-blue-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md">Saturday: Apollo Chicken</div>
              <div className="px-8 py-3 rounded-full bg-white/10 border border-white/20 text-blue-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md">Monday: Tawa Chicken</div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-[#f8faff]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-200 pb-12">
            <div className="max-w-xl mb-8 md:mb-0">
              <span className="text-blue-600 font-serif italic text-xl mb-2 block">The Visual Feast</span>
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-[#002366] mb-4">Gallery</h2>
              <p className="text-gray-500">A glimpse into our kitchen, our dishes, and the atmosphere that awaits you.</p>
            </div>
            
            <div className="flex bg-white p-1 rounded-full shadow-lg border border-gray-100">
              {GALLERY_DATA.map((tab) => (
                <button
                  key={tab.category}
                  onClick={() => setActiveGalleryTab(tab.category)}
                  className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 ${
                    activeGalleryTab === tab.category 
                      ? "bg-[#002366] text-white shadow-xl" 
                      : "text-gray-400 hover:text-[#002366]"
                  }`}
                >
                  {tab.category}
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            {GALLERY_DATA.find(t => t.category === activeGalleryTab)?.images.map((img, i) => (
              <motion.div
                key={img.url}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative aspect-square overflow-hidden rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002366] via-[#002366]/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10 translate-y-4 group-hover:translate-y-0">
                  <span className="text-blue-200 text-[10px] uppercase tracking-[0.4em] font-bold mb-3 border-b border-blue-400/30 pb-2 w-fit">Ghazi Elite</span>
                  <h4 className="text-white text-3xl font-serif font-bold italic">{img.title}</h4>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact & Footer */}
      <footer id="contact" className="bg-white border-t border-gray-100 pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16">
          <div className="md:col-span-2">
             <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-[#002366] rounded-xl flex items-center justify-center text-white font-serif font-bold text-2xl">G</div>
                <div className="text-4xl font-serif font-bold tracking-tighter text-[#002366] uppercase">GHAZI</div>
             </div>
             <p className="text-gray-500 mb-10 max-w-md leading-relaxed text-lg font-light">
               Since 1998, we've been serving the community with flavors that excite and hospitality that comforts. Join the legacy of Ghazi.
             </p>
             <div className="flex space-x-8">
                <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#002366] hover:text-white transition-all cursor-pointer group">
                  <Facebook size={20} className="group-hover:scale-110 transition-transform" />
                </div>
                <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#002366] hover:text-white transition-all cursor-pointer group">
                  <Instagram size={20} className="group-hover:scale-110 transition-transform" />
                </div>
             </div>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.3em] mb-8 text-[#002366]">Quick Info</h4>
            <div className="space-y-6 text-gray-500 text-sm">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#002366] shrink-0">
                  <MapPin size={16} />
                </div>
                <span className="leading-relaxed">Korangi 5, Main khaddi stop, sector 35, Karachi</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#002366] shrink-0">
                  <Phone size={16} />
                </div>
                <span className="font-bold text-[#002366]">0318 3292782</span>
              </div>
            </div>
          </div>

          <div>
             <h4 className="font-bold text-xs uppercase tracking-[0.3em] mb-8 text-[#002366]">Hours of Taste</h4>
             <div className="space-y-4 text-gray-500 text-sm">
                <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                  <span className="font-medium">Everyday</span>
                  <span className="text-[#002366] font-bold">12:00 PM - 12:00 AM</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                  <span className="font-medium italic">Friday</span>
                  <span className="text-[#002366] font-bold">02:00 PM - 12:00 AM</span>
                </div>
             </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
              © 2026 Ghazi Restaurant. Excellence in every grain.
            </p>
            <div className="flex space-x-8 text-[10px] uppercase tracking-widest font-bold text-gray-400">
              <a href="#" className="hover:text-[#002366]">Privacy</a>
              <a href="#" className="hover:text-[#002366]">Terms</a>
              <a href="#" className="hover:text-[#002366]">Hiring</a>
            </div>
        </div>
      </footer>
    </div>
  );
}
