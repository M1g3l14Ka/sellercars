'use client';

import { motion } from "framer-motion";

import carsData from "../../public/data/cars.json";
import { Car } from "../../types/types";

export default function Main() {

    const cars: Car[] = carsData;

    // Форматирование цены
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('ko-KR').format(price) + ' ₩';
    };

    // Форматирование пробега
    const formatMileage = (mileage: number) => {
        return new Intl.NumberFormat('ko-KR').format(mileage) + ' km';
    };

    return (
        <motion.div>
            <div>
                <section className="py-20 bg-zinc-900/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-orange-500 mb-2">{cars.length}</div>
                                    <div className="text-zinc-400">Available Cars</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-orange-500 mb-2">
                                        {Math.round(cars.reduce((sum, c) => sum + c.price, 0) / cars.length / 1000000)}M ₩
                                    </div>
                                <div className="text-zinc-400">Average Price</div>
                            </div>
                            <div className="text-center">
                            <div className="text-4xl font-bold text-orange-500 mb-2">
                                {Math.min(...cars.map(c => c.year))}-{Math.max(...cars.map(c => c.year))}
                            </div>
                            <div className="text-zinc-400">Year Range</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-orange-500 mb-2">100%</div>
                                <div className="text-zinc-400">Verified Sellers</div>
                            </div>
                        </div>
                    </div>
                </section>

                    {/* Inventory Section */}
                    <section id="inventory" className="py-24">
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                          <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Our <span className="text-orange-500">Inventory</span>
                          </h2>
                          <p className="text-xl text-zinc-400">
                            Handpicked vehicles from Korea&apos;s most trusted marketplace
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {cars.map((car) => (
                            <div 
                              key={car.id}
                              className="group bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-orange-500/50 transition-all duration-300 hover:scale-[1.02]"
                            >
                              {/* Image */}
                              <div className="relative aspect-[4/3] overflow-hidden">
                                <img
                                  src={car.imageUrl}
                                  alt={car.name}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image';
                                  }}
                                />
                                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                                  {car.year}
                                </div>
                              </div>
                              
                              {/* Content */}
                              <div className="p-6">
                                <h3 className="text-xl font-bold mb-3 line-clamp-2">{car.name}</h3>
                              
                                <div className="flex items-center gap-4 text-zinc-400 text-sm mb-4">
                                  <div className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    {formatMileage(car.mileage)}
                                  </div>
                                </div>
                              
                                <div className="flex items-center justify-between">
                                  <div className="text-2xl font-bold text-orange-500">
                                    {formatPrice(car.price)}
                                  </div>
                                  <a
                                    href={car.detailUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-full font-medium transition-colors inline-flex items-center gap-2"
                                  >
                                    Details
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                  </a>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                      
                    {/* About Section */}
                    <section id="about" className="py-24 bg-zinc-900/50">
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                          <div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                              Why Choose <span className="text-orange-500">Us?</span>
                            </h2>
                            <p className="text-xl text-zinc-400 mb-8">
                              We source premium vehicles directly from ENCAR, South Korea&apos;s largest and most trusted used car marketplace. Every vehicle is verified and inspected.
                            </p>
                            <div className="space-y-4">
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center shrink-0">
                                  <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-lg mb-1">Verified Sellers</h4>
                                  <p className="text-zinc-400">All vehicles from certified dealers on ENCAR platform</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center shrink-0">
                                  <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-lg mb-1">Transparent Pricing</h4>
                                  <p className="text-zinc-400">No hidden fees, direct pricing from Korean marketplace</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center shrink-0">
                                  <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                                  </svg>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-lg mb-1">Global Shipping</h4>
                                  <p className="text-zinc-400">Worldwide delivery with full documentation support</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="relative">
                            <div className="aspect-square bg-linear-to-br from-orange-500/20 to-red-600/20 rounded-3xl" />
                            <img
                              src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600"
                              alt="Premium cars"
                              className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] object-cover rounded-2xl"
                            />
                          </div>
                        </div>
                      </div>
                    </section>
                      
                    {/* Contact Section */}
                    <section id="contact" className="py-24">
                      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                          Ready to <span className="text-orange-500">Drive?</span>
                        </h2>
                        <p className="text-xl text-zinc-400 mb-10">
                          Get in touch with us to learn more about any vehicle or start the import process.
                        </p>
                        <a
                          href="mailto:info@millioncars.com"
                          className="inline-flex items-center gap-3 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Contact Us
                        </a>
                      </div>
                    </section>
            </div>
        </motion.div>
    )
}

