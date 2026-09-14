import React, { useState } from 'react';
import { Booking, ElevatorProduct } from '../types';
import confetti from 'canvas-confetti';
import { X, Calendar, Clock, MapPin, Building, CreditCard, ShieldCheck, CheckCircle2, Download, Smartphone, Mail, Lock } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingComplete: (booking: Booking) => void;
  prefillData?: {
    productName?: string;
    floors?: number;
    clientName?: string;
    company?: string;
    phone?: string;
    email?: string;
  };
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  onBookingComplete,
  prefillData
}) => {
  if (!isOpen) return null;

  // Step 1: Details & Slot, Step 2: Payment Gateway, Step 3: Confirmation
  const [step, setStep] = useState<'form' | 'payment' | 'confirmation'>('form');

  // Form State
  const [clientName, setClientName] = useState(prefillData?.clientName || '');
  const [company, setCompany] = useState(prefillData?.company || '');
  const [phone, setPhone] = useState(prefillData?.phone || '');
  const [email, setEmail] = useState(prefillData?.email || '');
  const [siteAddress, setSiteAddress] = useState('');
  const [ncrDistrict, setNcrDistrict] = useState<'Gurugram' | 'Noida' | 'New Delhi' | 'Faridabad' | 'Greater Noida'>('Gurugram');
  const [surveyDate, setSurveyDate] = useState('2026-09-18');
  const [timeSlot, setTimeSlot] = useState('11:00 AM - 01:00 PM');
  const [buildingType, setBuildingType] = useState(
    prefillData?.productName
      ? `${prefillData.productName} (${prefillData.floors || 35} Floors)`
      : 'Commercial High-Rise Tower (35 Floors)'
  );

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('architect@okhdfc');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  const surveyFee = 2500;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePayNow = () => {
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);
      const generatedId = `BKG-${Math.floor(1000 + Math.random() * 9000)}`;
      const generatedPayId = `pay_RZP_${Math.random().toString(36).substring(2, 10)}`;

      const engineers = [
        'Harpreet Singh (Chief Hoistway Inspector)',
        'Arunav Roy (Senior Structural Surveyor)',
        'Dinesh Sharma (Noida Dispatch Lead)',
        'Gurpreet Chawla (Rapid Team 1)'
      ];
      const randomEngineer = engineers[Math.floor(Math.random() * engineers.length)];

      const newBooking: Booking = {
        id: generatedId,
        createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        clientName: clientName || 'Architect Client',
        company: company || 'Enterprise Infrastructure',
        phone: phone || '+91 98110 00000',
        email: email || 'consultant@firm.com',
        siteAddress: siteAddress || 'Cyber City Sector 29, Gurugram',
        ncrDistrict,
        surveyDate,
        timeSlot,
        buildingType,
        surveyFeeInr: surveyFee,
        paymentStatus: 'Paid',
        paymentId: generatedPayId,
        assignedEngineer: randomEngineer
      };

      setConfirmedBooking(newBooking);
      onBookingComplete(newBooking);
      setStep('confirmation');

      // Confetti celebration!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Safe fallback
      }
    }, 1800);
  };

  const handleDownloadCalendar = () => {
    if (!confirmedBooking) return;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ELEVARE Vertical Mobility//Survey Booking//EN
BEGIN:VEVENT
SUMMARY:ELEVARE On-Site Engineering Survey (${confirmedBooking.id})
DESCRIPTION:Detailed Hoistway & Structural Transit Assessment by ${confirmedBooking.assignedEngineer}. Site: ${confirmedBooking.siteAddress}
LOCATION:${confirmedBooking.siteAddress}, ${confirmedBooking.ncrDistrict}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ELEVARE_SURVEY_${confirmedBooking.id}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 rounded-xl bg-[#0c1322] border border-[#2c3e50] shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2c3e50] bg-[#141b2b]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#191f2f] border border-[#ffb700]/40 flex items-center justify-center text-[#ffb700]">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-headline text-base font-bold text-white uppercase tracking-tight">
                {step === 'form' && 'Schedule On-Site Engineering Survey'}
                {step === 'payment' && 'Razorpay Secure Token Escrow'}
                {step === 'confirmation' && 'Survey Confirmed & Dispatched'}
              </h3>
              <p className="text-[11px] text-[#859398]">
                {step === 'form' && 'Certified Hoistway Inspection across Delhi-NCR'}
                {step === 'payment' && '₹2,500 Token deposit credited against elevator contract'}
                {step === 'confirmation' && 'Sub-18 Min Priority SLA Activated'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#859398] hover:text-white hover:bg-[#191f2f] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Form */}
        {step === 'form' && (
          <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-[#859398] uppercase tracking-wider block mb-1">
                  Lead Architect / Contact Name
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  placeholder="e.g. Sanjay Chawla"
                  className="w-full p-2.5 rounded bg-[#191f2f] border border-[#2c3e50] text-xs text-white placeholder:text-[#859398] focus:outline-none focus:border-[#00d9ff]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#859398] uppercase tracking-wider block mb-1">
                  Developer / Architectural Firm
                </label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  placeholder="e.g. DLF Commercial"
                  className="w-full p-2.5 rounded bg-[#191f2f] border border-[#2c3e50] text-xs text-white placeholder:text-[#859398] focus:outline-none focus:border-[#00d9ff]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#859398] uppercase tracking-wider block mb-1">
                  +91 Mobile Phone (For SMS Tracking)
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+91 98110 44219"
                  className="w-full p-2.5 rounded bg-[#191f2f] border border-[#2c3e50] text-xs text-white placeholder:text-[#859398] focus:outline-none focus:border-[#00d9ff]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#859398] uppercase tracking-wider block mb-1">
                  Corporate Email (For BIM & Spec Reports)
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="sanjay@dlfcommercial.com"
                  className="w-full p-2.5 rounded bg-[#191f2f] border border-[#2c3e50] text-xs text-white placeholder:text-[#859398] focus:outline-none focus:border-[#00d9ff]"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#859398] uppercase tracking-wider block mb-1">
                Site Location & Address in NCR
              </label>
              <input
                type="text"
                required
                value={siteAddress}
                onChange={e => setSiteAddress(e.target.value)}
                placeholder="Plot / Sector / Tower details (e.g., Tower 4, Sector 29, Cyber City)"
                className="w-full p-2.5 rounded bg-[#191f2f] border border-[#2c3e50] text-xs text-white placeholder:text-[#859398] focus:outline-none focus:border-[#00d9ff]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-bold text-[#859398] uppercase tracking-wider block mb-1">
                  NCR District Hub
                </label>
                <select
                  value={ncrDistrict}
                  onChange={e => setNcrDistrict(e.target.value as any)}
                  className="w-full p-2.5 rounded bg-[#191f2f] border border-[#2c3e50] text-xs text-white focus:outline-none focus:border-[#00d9ff]"
                >
                  <option value="Gurugram">Gurugram (Cyber City Hub)</option>
                  <option value="Noida">Noida (Sector 62 Hub)</option>
                  <option value="New Delhi">New Delhi (Okhla / Aerocity)</option>
                  <option value="Faridabad">Faridabad Industrial</option>
                  <option value="Greater Noida">Greater Noida Tech Zone</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#859398] uppercase tracking-wider block mb-1">
                  Preferred Survey Date
                </label>
                <input
                  type="date"
                  required
                  value={surveyDate}
                  min="2026-09-15"
                  onChange={e => setSurveyDate(e.target.value)}
                  className="w-full p-2.5 rounded bg-[#191f2f] border border-[#2c3e50] text-xs text-white focus:outline-none focus:border-[#00d9ff]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#859398] uppercase tracking-wider block mb-1">
                  Time Slot Window
                </label>
                <select
                  value={timeSlot}
                  onChange={e => setTimeSlot(e.target.value)}
                  className="w-full p-2.5 rounded bg-[#191f2f] border border-[#2c3e50] text-xs text-white focus:outline-none focus:border-[#00d9ff]"
                >
                  <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM (Morning)</option>
                  <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM (Mid-Day)</option>
                  <option value="02:30 PM - 04:30 PM">02:30 PM - 04:30 PM (Afternoon)</option>
                  <option value="04:30 PM - 06:30 PM">04:30 PM - 06:30 PM (Evening)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#859398] uppercase tracking-wider block mb-1">
                Building & Hoistway Transit Specs
              </label>
              <input
                type="text"
                value={buildingType}
                onChange={e => setBuildingType(e.target.value)}
                className="w-full p-2.5 rounded bg-[#191f2f] border border-[#2c3e50] text-xs text-white placeholder:text-[#859398] focus:outline-none focus:border-[#00d9ff]"
              />
            </div>

            {/* Price Token Box */}
            <div className="p-3.5 rounded-lg bg-[#141b2b] border border-[#2c3e50] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">Official On-Site Survey Token Deposit</span>
                <span className="text-[11px] text-[#859398]">Includes laser pit survey, power audit, & 100% credited against machine contract</span>
              </div>
              <span className="font-headline text-lg font-bold text-[#ffb700]">₹2,500</span>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded border border-[#2c3e50] text-[#bbc9ce] hover:text-white text-xs font-semibold uppercase cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded bg-[#ffb700] hover:bg-[#ffba26] text-[#422d00] font-headline text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                Proceed to Secure Verification
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Payment Gateway (Razorpay Simulated) */}
        {step === 'payment' && (
          <div className="p-6 space-y-5">
            <div className="p-4 rounded-lg bg-[#141b2b] border border-[#2c3e50] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#859398] block">Merchant: ELEVARE Technologies Pvt Ltd</span>
                <span className="text-sm font-bold text-white">On-Site Structural Inspection Fee</span>
                <span className="text-[11px] text-[#00d9ff] block mt-0.5">Booking for {surveyDate} ({timeSlot})</span>
              </div>
              <div className="text-right">
                <span className="font-headline text-2xl font-extrabold text-[#ffb700]">₹2,500.00</span>
                <span className="text-[10px] text-[#859398] block">Razorpay Encrypted</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <label className="text-[11px] font-bold text-[#859398] uppercase tracking-wider block">
                Select Payment Mode
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'upi', label: 'UPI / QR', icon: Smartphone },
                  { id: 'card', label: 'Corporate Card', icon: CreditCard },
                  { id: 'netbanking', label: 'NetBanking', icon: Building }
                ].map(m => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`p-3 rounded border text-center text-xs font-semibold uppercase flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        paymentMethod === m.id
                          ? 'border-[#00d9ff] bg-[#00d9ff]/10 text-[#00d9ff]'
                          : 'border-[#2c3e50] bg-[#191f2f] text-[#bbc9ce] hover:border-[#3c494d]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{m.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* UPI Tab */}
              {paymentMethod === 'upi' && (
                <div className="p-4 rounded-lg bg-[#191f2f] border border-[#2c3e50] space-y-3">
                  <label className="text-[11px] font-bold text-[#859398] uppercase block">
                    Enter Virtual Payment Address (VPA) / UPI ID
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                    placeholder="e.g. yourname@okhdfcbank"
                    className="w-full p-2.5 rounded bg-[#141b2b] border border-[#2c3e50] text-xs text-white focus:outline-none focus:border-[#00d9ff]"
                  />
                  <div className="flex gap-2 text-[10px] text-[#859398]">
                    <span className="px-2 py-0.5 rounded bg-[#141b2b] border border-[#2c3e50]">Google Pay</span>
                    <span className="px-2 py-0.5 rounded bg-[#141b2b] border border-[#2c3e50]">PhonePe</span>
                    <span className="px-2 py-0.5 rounded bg-[#141b2b] border border-[#2c3e50]">Paytm UPI</span>
                  </div>
                </div>
              )}

              {/* Card Tab */}
              {paymentMethod === 'card' && (
                <div className="p-4 rounded-lg bg-[#191f2f] border border-[#2c3e50] space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-[#859398] uppercase block mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      defaultValue="4532 •••• •••• 8829"
                      className="w-full p-2.5 rounded bg-[#141b2b] border border-[#2c3e50] text-xs text-white focus:outline-none focus:border-[#00d9ff]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-[#859398] uppercase block mb-1">Expiry</label>
                      <input
                        type="text"
                        defaultValue="08/29"
                        className="w-full p-2.5 rounded bg-[#141b2b] border border-[#2c3e50] text-xs text-white focus:outline-none focus:border-[#00d9ff]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-[#859398] uppercase block mb-1">CVV</label>
                      <input
                        type="password"
                        defaultValue="•••"
                        className="w-full p-2.5 rounded bg-[#141b2b] border border-[#2c3e50] text-xs text-white focus:outline-none focus:border-[#00d9ff]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* NetBanking Tab */}
              {paymentMethod === 'netbanking' && (
                <div className="p-4 rounded-lg bg-[#191f2f] border border-[#2c3e50] space-y-2">
                  <label className="text-[11px] font-bold text-[#859398] uppercase block">
                    Choose Corporate Bank
                  </label>
                  <select className="w-full p-2.5 rounded bg-[#141b2b] border border-[#2c3e50] text-xs text-white focus:outline-none focus:border-[#00d9ff]">
                    <option>HDFC Bank Corporate</option>
                    <option>ICICI Corporate Banking</option>
                    <option>State Bank of India (Commercial)</option>
                    <option>Axis Bank Commercial</option>
                  </select>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-[#859398] text-xs">
              <Lock className="w-4 h-4 text-[#00d9ff]" />
              <span>256-bit TLS encryption certified by Razorpay Payment Gateway.</span>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => setStep('form')}
                className="px-4 py-2.5 rounded border border-[#2c3e50] text-[#bbc9ce] hover:text-white text-xs font-semibold uppercase cursor-pointer"
              >
                Back to Specs
              </button>
              <button
                type="button"
                onClick={handlePayNow}
                disabled={isProcessingPayment}
                className="px-7 py-3 rounded bg-[#ffb700] hover:bg-[#ffba26] text-[#422d00] font-headline text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-[0_0_20px_rgba(255,183,0,0.4)] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isProcessingPayment ? (
                  <>
                    <span className="w-4 h-4 border-2 border-[#422d00] border-t-transparent rounded-full animate-spin" />
                    <span>Processing Authorization...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Authorize Token Payment ₹2,500</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 'confirmation' && confirmedBooking && (
          <div className="p-6 space-y-5 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#00d9ff]/20 border border-[#00d9ff] flex items-center justify-center text-[#00d9ff]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold text-[#00d9ff] uppercase tracking-widest block mb-1">
                Transaction Verified & Dispatched
              </span>
              <h4 className="font-headline text-2xl font-bold text-white uppercase">
                Booking ID: {confirmedBooking.id}
              </h4>
              <p className="text-xs text-[#bbc9ce] mt-1">
                Ref ID: {confirmedBooking.paymentId} • ₹2,500 Escrow Credited
              </p>
            </div>

            {/* Details Receipt Card */}
            <div className="max-w-md mx-auto p-4 rounded-lg bg-[#141b2b] border border-[#2c3e50] text-left text-xs space-y-2">
              <div className="flex justify-between text-[#859398]">
                <span>Client & Firm:</span>
                <span className="text-white font-semibold">{confirmedBooking.clientName} ({confirmedBooking.company})</span>
              </div>
              <div className="flex justify-between text-[#859398]">
                <span>Date & Window:</span>
                <span className="text-[#00d9ff] font-semibold">{confirmedBooking.surveyDate} • {confirmedBooking.timeSlot}</span>
              </div>
              <div className="flex justify-between text-[#859398]">
                <span>Site Address:</span>
                <span className="text-white font-semibold">{confirmedBooking.siteAddress}, {confirmedBooking.ncrDistrict}</span>
              </div>
              <div className="flex justify-between text-[#859398] pt-2 border-t border-[#2c3e50]">
                <span>Assigned Field Surveyor:</span>
                <span className="text-[#ffb700] font-semibold">{confirmedBooking.assignedEngineer}</span>
              </div>
            </div>

            {/* Notification previews */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              <div className="p-3 rounded bg-[#191f2f] border border-[#2c3e50] flex items-start gap-2.5">
                <Smartphone className="w-4 h-4 text-[#00d9ff] shrink-0 mt-0.5" />
                <div className="text-[11px]">
                  <span className="font-bold text-white block">SMS Notification Sent</span>
                  <span className="text-[#859398]">Dispatch alert sent to {confirmedBooking.phone} with surveyor live GPS link.</span>
                </div>
              </div>
              <div className="p-3 rounded bg-[#191f2f] border border-[#2c3e50] flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#ffb700] shrink-0 mt-0.5" />
                <div className="text-[11px]">
                  <span className="font-bold text-white block">Email Confirmation Sent</span>
                  <span className="text-[#859398]">Tax invoice and structural checklist sent to {confirmedBooking.email}.</span>
                </div>
              </div>
            </div>

            {/* Download Calendar & Close */}
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleDownloadCalendar}
                className="px-5 py-2.5 rounded border border-[#2c3e50] bg-[#141b2b] hover:bg-[#191f2f] text-xs font-semibold text-[#00d9ff] uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Add to Calendar (.ICS)</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded bg-[#ffb700] hover:bg-[#ffba26] text-[#422d00] font-headline text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                Close & View Portal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
