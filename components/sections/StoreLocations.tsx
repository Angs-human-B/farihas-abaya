"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { MapPin, Clock, Phone, Navigation, Star } from "lucide-react";
import Image from "next/image";

// Store data
const stores = [
  {
    id: 1,
    name: "Dhanmondi Flagship Store",
    nameAr: "متجر دانموندي الرئيسي",
    address: "House 42, Road 8, Dhanmondi",
    city: "Dhaka",
    phone: "+880 1XXX-XXXXXX",
    hours: {
      weekday: "10 AM - 10 PM",
      weekend: "10 AM - 10 PM",
      friday: "2 PM - 10 PM"
    },
    image: "/api/placeholder/400/300",
    mapUrl: "https://maps.google.com/?q=23.7461,90.3742",
    coordinates: { lat: 23.7461, lng: 90.3742 },
    featured: true,
    rating: 4.9,
    totalReviews: 234,
    features: ["Personal Styling", "Alterations", "VIP Lounge", "Home Delivery"],
    description: "Our flagship store in the heart of Dhanmondi offers the complete Fariha's Abaya experience with our full collection and premium services."
  },
  {
    id: 2,
    name: "Gulshan Boutique",
    nameAr: "بوتيك جولشان",
    address: "Plot 15, Road 113, Gulshan 2",
    city: "Dhaka",
    phone: "+880 1XXX-XXXXXX",
    hours: {
      weekday: "11 AM - 9 PM",
      weekend: "11 AM - 9 PM",
      friday: "2 PM - 9 PM"
    },
    image: "/api/placeholder/400/300",
    mapUrl: "https://maps.google.com/?q=23.7925,90.4078",
    coordinates: { lat: 23.7925, lng: 90.4078 },
    featured: false,
    rating: 4.8,
    totalReviews: 189,
    features: ["Express Alterations", "Gift Wrapping", "Personal Shopping"],
    description: "Located in upscale Gulshan, this boutique specializes in our Modern Mystique and Bridal collections."
  },
  {
    id: 3,
    name: "Uttara Branch",
    nameAr: "فرع أوتارا",
    address: "Sector 7, Uttara Model Town",
    city: "Dhaka",
    phone: "+880 1XXX-XXXXXX",
    hours: {
      weekday: "10 AM - 10 PM",
      weekend: "10 AM - 10 PM",
      friday: "2 PM - 10 PM"
    },
    image: "/api/placeholder/400/300",
    mapUrl: "https://maps.google.com/?q=23.8759,90.3795",
    coordinates: { lat: 23.8759, lng: 90.3795 },
    featured: false,
    rating: 4.7,
    totalReviews: 156,
    features: ["Family Shopping Area", "Kids Play Zone", "Parking Available"],
    description: "Family-friendly store in Uttara with spacious layout and convenient parking facilities."
  }
];

// Store Card Component
const StoreCard = ({ store, isSelected, onClick, inView }: any) => {
  const currentDay = new Date().getDay();
  const isFriday = currentDay === 5;
  const isWeekend = currentDay === 0 || currentDay === 6;
  
  const currentHours = isFriday ? store.hours.friday : 
                      isWeekend ? store.hours.weekend : 
                      store.hours.weekday;

  return (
    <motion.div
      className={`relative bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-500 ${
        isSelected ? 'ring-2 ring-gold shadow-xl scale-105' : 'hover:shadow-xl hover:scale-102'
      }`}
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: store.id * 0.2 }}
      whileHover={{ y: -5 }}
    >
      {/* Featured Badge */}
      {store.featured && (
        <motion.div
          className="absolute top-4 left-4 z-10 px-3 py-1 bg-gold text-midnight text-sm font-medium rounded-full"
          initial={{ scale: 0, rotate: -180 }}
          animate={inView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Flagship
        </motion.div>
      )}

      {/* Store Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={store.image}
          alt={store.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Rating Badge */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
          <Star className="w-4 h-4 text-gold fill-current" />
          <span className="text-sm font-medium text-midnight">{store.rating}</span>
          <span className="text-xs text-gray-600">({store.totalReviews})</span>
        </div>
      </div>

      {/* Store Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-serif text-midnight mb-1">{store.name}</h3>
            <p className="text-sm text-gray-600 font-arabic" dir="rtl">{store.nameAr}</p>
          </div>
          <motion.button
            className="p-2 text-gold hover:bg-gold/10 rounded-full transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Navigation className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Address */}
        <div className="flex items-start gap-2 mb-3">
          <MapPin className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-700">{store.address}</p>
            <p className="text-xs text-gray-500">{store.city}</p>
          </div>
        </div>

        {/* Hours */}
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-gold" />
          <p className="text-sm text-gray-700">
            <span className={`font-medium ${
              isFriday ? 'text-blue-600' : 'text-green-600'
            }`}>
              Today: {currentHours}
            </span>
          </p>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-2 mb-4">
          <Phone className="w-4 h-4 text-gold" />
          <p className="text-sm text-gray-700">{store.phone}</p>
        </div>

        {/* Features */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {store.features.slice(0, 3).map((feature: string, index: number) => (
              <span
                key={index}
                className="px-2 py-1 bg-sand/30 text-xs text-midnight rounded-full"
              >
                {feature}
              </span>
            ))}
            {store.features.length > 3 && (
              <span className="px-2 py-1 bg-sand/30 text-xs text-midnight rounded-full">
                +{store.features.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          {store.description}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <motion.button
            className="flex-1 py-2 border border-gold text-gold hover:bg-gold hover:text-white transition-colors duration-200 rounded-md text-sm font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Directions
          </motion.button>
          <motion.button
            className="px-4 py-2 bg-gold text-midnight hover:bg-gold/90 transition-colors duration-200 rounded-md text-sm font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Call
          </motion.button>
        </div>
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <motion.div
          className="absolute inset-0 border-2 border-gold rounded-xl pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-gold/10 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

// Interactive Map Component (Placeholder)
const InteractiveMap = ({ selectedStore, stores, onStoreSelect }: any) => {
  return (
    <div className="relative h-full bg-gradient-to-br from-sand to-pearl rounded-xl overflow-hidden">
      {/* Map Placeholder */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-16 h-16 text-gold mx-auto mb-4" />
          <h3 className="text-2xl font-serif text-midnight mb-2">Interactive Map</h3>
          <p className="text-gray-600 mb-4">Google Maps integration will be added here</p>
          <p className="text-sm text-gray-500">
            Selected: {selectedStore ? selectedStore.name : 'None'}
          </p>
        </div>
      </div>

      {/* Map Markers Simulation */}
      <div className="absolute inset-0">
        {stores.map((store: any, index: number) => (
          <motion.button
            key={store.id}
            className={`absolute w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-all duration-300 ${
              selectedStore?.id === store.id ? 'bg-gold scale-125' : 'bg-red-500 hover:bg-red-600'
            }`}
            style={{
              left: `${20 + index * 25}%`,
              top: `${30 + index * 15}%`,
            }}
            onClick={() => onStoreSelect(store)}
            initial={{ scale: 0, y: -50 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.2,
              type: "spring",
              bounce: 0.4
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <MapPin className="w-4 h-4 text-white" />
          </motion.button>
        ))}
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <motion.button
          className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-md hover:bg-white transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-xl font-bold text-gray-700">+</span>
        </motion.button>
        <motion.button
          className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-md hover:bg-white transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-xl font-bold text-gray-700">−</span>
        </motion.button>
      </div>
    </div>
  );
};

// Main Store Locations Component
const StoreLocations = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [selectedStore, setSelectedStore] = useState(stores[0]);

  return (
    <section ref={ref} className="py-20 bg-pearl">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-serif text-midnight mb-6"
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Visit Our Sanctuaries
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Experience the elegance in person at our beautifully designed boutiques across Dhaka
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Map Section */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="sticky top-8 h-[600px]">
              <InteractiveMap
                selectedStore={selectedStore}
                stores={stores}
                onStoreSelect={setSelectedStore}
              />
            </div>
          </motion.div>

          {/* Stores List */}
          <motion.div
            className="order-1 lg:order-2 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {stores.map((store) => (
              <StoreCard
                key={store.id}
                store={store}
                isSelected={selectedStore?.id === store.id}
                onClick={() => setSelectedStore(store)}
                inView={inView}
              />
            ))}
          </motion.div>
        </div>

        {/* Contact CTA */}
        <motion.div
          className="text-center mt-16 p-8 bg-gradient-to-r from-gold/10 to-rose-gold/10 rounded-xl"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h3 className="text-2xl font-serif text-midnight mb-4">
            Can't visit our stores?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Experience our collection from the comfort of your home with our virtual consultation 
            and home delivery services across Bangladesh.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="px-8 py-3 bg-gold text-midnight font-medium rounded-full hover:bg-gold/90 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Virtual Consultation
            </motion.button>
            <motion.button
              className="px-8 py-3 border border-gold text-gold hover:bg-gold hover:text-midnight transition-colors duration-200 rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Request Home Delivery
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export { StoreLocations };
