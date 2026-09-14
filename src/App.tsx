import React, { useState, useEffect } from 'react';
import { ElevatorProduct, Inquiry, Booking, MaintenanceRecord } from './types';
import {
  INITIAL_PRODUCTS,
  INITIAL_INQUIRIES,
  INITIAL_BOOKINGS,
  INITIAL_MAINTENANCE
} from './data/initialData';
import { HeaderNav } from './components/HeaderNav';
import { HeroElevator3D } from './components/HeroElevator3D';
import { ProductsSection } from './components/ProductsSection';
import { ProductConfiguratorModal } from './components/ProductConfiguratorModal';
import { SafetyFeaturesSection } from './components/SafetyFeaturesSection';
import { HeritageTimeline } from './components/HeritageTimeline';
import { SpecCalculatorSection } from './components/SpecCalculatorSection';
import { BookingModal } from './components/BookingModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { CheckCircle2, Info } from 'lucide-react';

export function App() {
  // Master state
  const [products, setProducts] = useState<ElevatorProduct[]>(INITIAL_PRODUCTS);
  const [inquiries, setInquiries] = useState<Inquiry[]>(INITIAL_INQUIRIES);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [maintenanceRecords, setMaintenanceRecords] = useState<MaintenanceRecord[]>(INITIAL_MAINTENANCE);

  // Modal control states
  const [selectedProductForConfig, setSelectedProductForConfig] = useState<ElevatorProduct | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Booking prefill data
  const [bookingPrefill, setBookingPrefill] = useState<{
    productName?: string;
    floors?: number;
    clientName?: string;
    company?: string;
    phone?: string;
    email?: string;
  }>({});

  // Toast notification system
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Discreet keyboard shortcut for administrative access (Ctrl/Cmd + Shift + A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Actions
  const handleSelectProduct = (product: ElevatorProduct) => {
    setSelectedProductForConfig(product);
  };

  const handleLaunchConfigurator = () => {
    // Select the first product (Veloce-X) by default
    setSelectedProductForConfig(products[0] || null);
  };

  const handleBookFromConfigurator = (configured: {
    product: ElevatorProduct;
    finish: string;
    lighting: string;
    floors: number;
    hasAiDispatch: boolean;
    totalEstimatedPrice: number;
  }) => {
    setBookingPrefill({
      productName: `${configured.product.name} [${configured.finish}]`,
      floors: configured.floors
    });
    setIsBookingModalOpen(true);
    showToast(`Configured ${configured.product.name} (${configured.floors} Fl). Opening survey scheduling...`);
  };

  const handleScheduleFromCalculator = (specData: Partial<Inquiry>) => {
    const newInquiry: Inquiry = {
      id: `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString().split('T')[0],
      clientName: specData.clientName || 'Architect Client',
      companyName: specData.companyName || 'Enterprise Builder',
      phone: specData.phone || '+91 98100 00000',
      email: specData.email || 'consultant@firm.com',
      projectType: specData.projectType || 'Skyscraper',
      floors: specData.floors || 35,
      shaftHeight: specData.shaftHeight || 122.5,
      speed: specData.speed || 4.0,
      estimatedMotor: specData.estimatedMotor || 'PMSM Gearless 24.5 kW',
      estimatedPayload: specData.estimatedPayload || '1,600 kg (21 Pass.)',
      status: 'New',
      notes: specData.notes
    };

    setInquiries(prev => [newInquiry, ...prev]);

    setBookingPrefill({
      clientName: specData.clientName,
      company: specData.companyName,
      phone: specData.phone,
      email: specData.email,
      floors: specData.floors,
      productName: `${specData.projectType} System`
    });

    setIsBookingModalOpen(true);
    showToast(`Lead inquiry recorded (#${newInquiry.id}). Please select your preferred inspection window.`);
  };

  const handleBookingComplete = (newBooking: Booking) => {
    setBookings(prev => [newBooking, ...prev]);
    showToast(`Survey Booking ${newBooking.id} confirmed! Token deposit escrow verified.`);
  };

  const handleAddProduct = (newProduct: ElevatorProduct) => {
    setProducts(prev => [...prev, newProduct]);
    showToast(`Model ${newProduct.name} successfully deployed to active catalog.`);
  };

  const handleUpdateInquiryStatus = (id: string, status: Inquiry['status']) => {
    setInquiries(prev =>
      prev.map(item => (item.id === id ? { ...item, status } : item))
    );
    showToast(`Inquiry ${id} status updated to: ${status}`);
  };

  const handleAddMaintenanceRecord = (record: MaintenanceRecord) => {
    setMaintenanceRecords(prev => [record, ...prev]);
    showToast(`Maintenance ticket ${record.id} logged for ${record.elevatorName || record.buildingName}.`);
  };

  const handleScrollToSystems = () => {
    const el = document.getElementById('elevators-and-systems');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0c1322] text-[#dce2f7] flex flex-col font-body selection:bg-[#00d9ff] selection:text-[#001f26]">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md p-4 rounded-xl bg-[#141b2b] border border-[#00d9ff] shadow-[0_10px_30px_rgba(0,217,255,0.25)] flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-[#00d9ff] shrink-0" />
          <span className="text-xs text-white font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header Navigation */}
      <HeaderNav
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenBooking={() => {
          setBookingPrefill({});
          setIsBookingModalOpen(true);
        }}
      />

      {/* Main Page Flow */}
      <main className="flex-1 w-full">
        {/* 1. Hero with Interactive Three.js 3D Elevator Shaft */}
        <HeroElevator3D
          onExploreClick={handleScrollToSystems}
          onConfiguratorClick={handleLaunchConfigurator}
        />

        {/* 2. Systems & Portfolios with 3D Tilt and Finish Previews */}
        <ProductsSection
          products={products}
          onSelectProduct={handleSelectProduct}
        />

        {/* 3. Safety Regimes & Live Hoistway Telemetry Deck */}
        <SafetyFeaturesSection />

        {/* 4. Heritage Timeline: A Decade of Elevating NCR */}
        <HeritageTimeline />

        {/* 5. Architectural Spec Calculator & Feasibility Matrix */}
        <SpecCalculatorSection
          onScheduleSurvey={handleScheduleFromCalculator}
        />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* 3D Modular Product Configurator Modal */}
      <ProductConfiguratorModal
        product={selectedProductForConfig}
        isOpen={Boolean(selectedProductForConfig)}
        onClose={() => setSelectedProductForConfig(null)}
        onBookSurvey={handleBookFromConfigurator}
      />

      {/* On-Site Survey Booking & Payment Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onBookingComplete={handleBookingComplete}
        prefillData={bookingPrefill}
      />

      {/* Admin & Fleet Telemetry Command Center */}
      {isAdminOpen && (
        <AdminDashboard
          products={products}
          inquiries={inquiries}
          bookings={bookings}
          maintenanceRecords={maintenanceRecords}
          onAddProduct={handleAddProduct}
          onUpdateInquiryStatus={handleUpdateInquiryStatus}
          onAddMaintenanceRecord={handleAddMaintenanceRecord}
          onClose={() => setIsAdminOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
