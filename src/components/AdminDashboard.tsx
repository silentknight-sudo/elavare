import React, { useState } from 'react';
import { ElevatorProduct, Inquiry, Booking, MaintenanceRecord } from '../types';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Activity,
  Calendar,
  Layers,
  Wrench,
  TrendingUp,
  Download,
  Plus,
  Search,
  Filter,
  CheckCircle,
  AlertTriangle,
  Clock,
  Shield,
  PhoneCall,
  X
} from 'lucide-react';

interface AdminDashboardProps {
  products: ElevatorProduct[];
  inquiries: Inquiry[];
  bookings: Booking[];
  maintenanceRecords: MaintenanceRecord[];
  onAddProduct: (product: ElevatorProduct) => void;
  onUpdateInquiryStatus: (id: string, status: Inquiry['status']) => void;
  onAddMaintenanceRecord: (record: MaintenanceRecord) => void;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  inquiries,
  bookings,
  maintenanceRecords,
  onAddProduct,
  onUpdateInquiryStatus,
  onAddMaintenanceRecord,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'inquiries' | 'bookings' | 'maintenance' | 'products'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [showNewProductModal, setShowNewProductModal] = useState(false);

  // Maintenance form state
  const [ticketElevator, setTicketElevator] = useState('Veloce-X (DLF CyberCity Tower C)');
  const [ticketType, setTicketType] = useState<'Routine' | 'Emergency' | 'Inspection'>('Routine');
  const [ticketNotes, setTicketNotes] = useState('');
  const [ticketTech, setTicketTech] = useState('Dinesh Sharma (Lead Technologist)');

  // Product form state
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<'commercial' | 'residential' | 'industrial'>('commercial');
  const [newProdSpeed, setNewProdSpeed] = useState('3.5 m/s');
  const [newProdCapacity, setNewProdCapacity] = useState('1,600 kg (21 Pass.)');
  const [newProdPrice, setNewProdPrice] = useState(4800000);
  const [newProdDescription, setNewProdDescription] = useState('');

  // Telemetry chart mock data
  const telemetryTrends = [
    { hour: '06:00', uptime: 100, vibration: 0.02, powerUsageKwh: 34 },
    { hour: '08:00', uptime: 99.98, vibration: 0.03, powerUsageKwh: 120 },
    { hour: '10:00', uptime: 99.96, vibration: 0.04, powerUsageKwh: 240 },
    { hour: '12:00', uptime: 99.99, vibration: 0.03, powerUsageKwh: 210 },
    { hour: '14:00', uptime: 100, vibration: 0.02, powerUsageKwh: 195 },
    { hour: '16:00', uptime: 99.97, vibration: 0.03, powerUsageKwh: 230 },
    { hour: '18:00', uptime: 99.98, vibration: 0.04, powerUsageKwh: 265 },
    { hour: '20:00', uptime: 100, vibration: 0.02, powerUsageKwh: 110 }
  ];

  const deploymentData = [
    { month: 'Apr', installations: 12, revenueCr: 5.4 },
    { month: 'May', installations: 16, revenueCr: 7.2 },
    { month: 'Jun', installations: 19, revenueCr: 8.9 },
    { month: 'Jul', installations: 22, revenueCr: 10.4 },
    { month: 'Aug', installations: 27, revenueCr: 12.8 },
    { month: 'Sep', installations: 31, revenueCr: 14.5 }
  ];

  const categoryPie = [
    { name: 'Commercial', value: 45, color: '#00d9ff' },
    { name: 'Luxury Living', value: 35, color: '#ffb700' },
    { name: 'Industrial', value: 20, color: '#2c3e50' }
  ];

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: MaintenanceRecord = {
      id: `MNT-${Math.floor(100 + Math.random() * 900)}`,
      unitCode: `ELV-NCR-0${Math.floor(1 + Math.random() * 9)}`,
      buildingName: ticketElevator,
      location: 'Delhi-NCR Central Corridor',
      model: 'Veloce-X Ultra',
      elevatorName: ticketElevator,
      lastServiceDate: '2026-08-20',
      nextScheduledDate: new Date().toISOString().split('T')[0],
      scheduledDate: new Date().toISOString().split('T')[0],
      assignedTechnician: ticketTech,
      technician: ticketTech,
      status: ticketType === 'Emergency' ? 'Alert' : 'Service in Progress',
      type: ticketType,
      healthScore: ticketType === 'Emergency' ? 74 : 96,
      operationalHours: 4200,
      lastVibrationReading: 0.03,
      notes: ticketNotes || 'Routine bi-monthly safety lubrication and counterweight balancing inspection.'
    };
    onAddMaintenanceRecord(newRecord);
    setShowNewTicketModal(false);
    setTicketNotes('');
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProd: ElevatorProduct = {
      id: newProdName.toLowerCase().replace(/\s+/g, '-'),
      name: newProdName,
      tagline: 'High-Velocity Engineered Transit Architecture',
      badge: 'NEW 2026',
      category: newProdCategory,
      speed: newProdSpeed,
      capacity: newProdCapacity,
      decibel: '< 42 dB',
      driveType: 'PMSM Ultra-Gearless',
      basePriceInr: Number(newProdPrice),
      description: newProdDescription || 'High-performance vertical architecture engineered for modern requirements.',
      keySpecs: [
        { label: 'Velocity', value: newProdSpeed },
        { label: 'Max Payload', value: newProdCapacity },
        { label: 'Drive', value: 'Permanent Magnet' }
      ],
      availableFinishes: ['Cyber Glass & Cyan Glow', 'Statuario Marble & Titanium Gold', 'Satin Steel'],
      imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=900&q=80',
      imageAlt: newProdName
    };
    onAddProduct(newProd);
    setShowNewProductModal(false);
    setNewProdName('');
  };

  const exportInquiriesCsv = () => {
    const headers = 'ID,Date,Client,Company,Phone,Email,Project,Floors,Speed,Status\n';
    const rows = inquiries
      .map(
        i =>
          `"${i.id}","${i.createdAt}","${i.clientName}","${i.companyName}","${i.phone}","${i.email}","${i.projectType}",${i.floors},${i.speed},"${i.status}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ELEVARE_INQUIRIES_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-6xl my-4 rounded-xl bg-[#0c1322] border border-[#2c3e50] shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[95vh]">
        {/* Top Header Navigation */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-4 border-b border-[#2c3e50] bg-[#141b2b] gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#191f2f] border border-[#00d9ff]/30 flex items-center justify-center text-[#00d9ff]">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-headline text-lg font-bold text-white uppercase tracking-tight">
                  ELEVARE Central Command & Analytics
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00d9ff]/20 text-[#00d9ff]">
                  NCR LIVE FLEET
                </span>
              </div>
              <p className="text-xs text-[#859398]">Operations, Hoistway Telemetry & Architectural Lead Management</p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            {/* Quick action tabs */}
            <div className="flex bg-[#191f2f] p-1 rounded-lg border border-[#2c3e50] text-xs">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-1 rounded font-semibold uppercase transition-colors cursor-pointer ${
                  activeTab === 'overview' ? 'bg-[#00d9ff] text-[#001f26] font-bold' : 'text-[#859398] hover:text-white'
                }`}
              >
                Analytics
              </button>
              <button
                onClick={() => setActiveTab('inquiries')}
                className={`px-3 py-1 rounded font-semibold uppercase transition-colors cursor-pointer ${
                  activeTab === 'inquiries' ? 'bg-[#00d9ff] text-[#001f26] font-bold' : 'text-[#859398] hover:text-white'
                }`}
              >
                Inquiries ({inquiries.length})
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`px-3 py-1 rounded font-semibold uppercase transition-colors cursor-pointer ${
                  activeTab === 'bookings' ? 'bg-[#00d9ff] text-[#001f26] font-bold' : 'text-[#859398] hover:text-white'
                }`}
              >
                Surveys ({bookings.length})
              </button>
              <button
                onClick={() => setActiveTab('maintenance')}
                className={`px-3 py-1 rounded font-semibold uppercase transition-colors cursor-pointer ${
                  activeTab === 'maintenance' ? 'bg-[#00d9ff] text-[#001f26] font-bold' : 'text-[#859398] hover:text-white'
                }`}
              >
                Fleet IoT
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`px-3 py-1 rounded font-semibold uppercase transition-colors cursor-pointer ${
                  activeTab === 'products' ? 'bg-[#00d9ff] text-[#001f26] font-bold' : 'text-[#859398] hover:text-white'
                }`}
              >
                Products
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#859398] hover:text-white hover:bg-[#191f2f] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab 1: Overview & Analytics */}
        {activeTab === 'overview' && (
          <div className="p-6 overflow-y-auto space-y-6">
            {/* Top Stat Ribbon */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-[#141b2b] border border-[#2c3e50] shadow-sm">
                <span className="text-[11px] font-semibold text-[#859398] uppercase tracking-wider block">Active Fleet Uptime</span>
                <span className="font-headline text-3xl font-extrabold text-[#00d9ff] mt-1 block">99.98%</span>
                <span className="text-[10px] text-[#aeecff] mt-1 block">850 Live Cabins across NCR</span>
              </div>
              <div className="p-4 rounded-xl bg-[#141b2b] border border-[#2c3e50] shadow-sm">
                <span className="text-[11px] font-semibold text-[#859398] uppercase tracking-wider block">Pipeline Contract Value</span>
                <span className="font-headline text-3xl font-extrabold text-[#ffb700] mt-1 block">₹28.4 Cr</span>
                <span className="text-[10px] text-[#ffdea9] mt-1 block">+18.4% QoQ Expansion</span>
              </div>
              <div className="p-4 rounded-xl bg-[#141b2b] border border-[#2c3e50] shadow-sm">
                <span className="text-[11px] font-semibold text-[#859398] uppercase tracking-wider block">Mean Tech Arrival Time</span>
                <span className="font-headline text-3xl font-extrabold text-white mt-1 block">14.2 Min</span>
                <span className="text-[10px] text-[#00d9ff] mt-1 block">Guaranteed Sub-18m SLA</span>
              </div>
              <div className="p-4 rounded-xl bg-[#141b2b] border border-[#2c3e50] shadow-sm">
                <span className="text-[11px] font-semibold text-[#859398] uppercase tracking-wider block">Eco Kinetic Regenerated</span>
                <span className="font-headline text-3xl font-extrabold text-[#ffb700] mt-1 block">1,840 kWh</span>
                <span className="text-[10px] text-[#859398] mt-1 block">Fed back to grid today</span>
              </div>
            </div>

            {/* Visual Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Chart 1: Telemetry trends */}
              <div className="lg:col-span-8 p-5 rounded-xl bg-[#141b2b] border border-[#2c3e50] shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                      Fleet Peak Telemetry & Kinetic Power Load
                    </h3>
                    <p className="text-[11px] text-[#859398]">Real-time kilowatt consumption vs regenerative feedback</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#00d9ff]/15 text-[#00d9ff] text-[10px] font-mono">
                    10ms Sample Rate
                  </span>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={telemetryTrends}>
                      <CartesianGrid stroke="#1f2a3a" strokeDasharray="3 3" />
                      <XAxis dataKey="hour" stroke="#859398" fontSize={11} />
                      <YAxis stroke="#859398" fontSize={11} />
                      <Tooltip contentStyle={{ backgroundColor: '#0c1322', borderColor: '#2c3e50', fontSize: '12px' }} />
                      <Line type="monotone" dataKey="powerUsageKwh" stroke="#00d9ff" strokeWidth={2.5} name="Power (kWh)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Chart 2: Category Distribution */}
              <div className="lg:col-span-4 p-5 rounded-xl bg-[#141b2b] border border-[#2c3e50] shadow-md flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                    System Architecture Distribution
                  </h3>
                  <p className="text-[11px] text-[#859398] mb-3">Portfolio installation mix in NCR</p>
                  <div className="h-44 w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={categoryPie} dataKey="value" cx="50%" cy="50%" innerRadius={42} outerRadius={68} paddingAngle={4}>
                          {categoryPie.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#0c1322', borderColor: '#2c3e50', fontSize: '12px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="space-y-1.5 pt-2 border-t border-[#2c3e50]/60">
                  {categoryPie.map(cat => (
                    <div key={cat.name} className="flex justify-between text-xs text-[#bbc9ce]">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                        <span>{cat.name}</span>
                      </span>
                      <span className="font-bold text-white">{cat.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Inquiries & Leads */}
        {activeTab === 'inquiries' && (
          <div className="p-6 overflow-y-auto space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="font-headline text-base font-bold text-white uppercase">Architectural Lead Pipeline</h3>
                <p className="text-xs text-[#859398]">Project specifications submitted by consultants and developers</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={exportInquiriesCsv}
                  className="px-3 py-1.5 rounded border border-[#2c3e50] bg-[#191f2f] hover:bg-[#232a3a] text-xs font-semibold text-[#00d9ff] uppercase flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-[#2c3e50]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#141b2b] text-[#859398] uppercase font-semibold border-b border-[#2c3e50]">
                  <tr>
                    <th className="p-3">Ref ID</th>
                    <th className="p-3">Client / Firm</th>
                    <th className="p-3">Project Type</th>
                    <th className="p-3">Floors & Speed</th>
                    <th className="p-3">Estimated Motor</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2c3e50] bg-[#0c1322]">
                  {inquiries.map(inq => (
                    <tr key={inq.id} className="hover:bg-[#141b2b]/60 transition-colors">
                      <td className="p-3 font-mono text-[#00d9ff]">{inq.id}</td>
                      <td className="p-3">
                        <span className="font-bold text-white block">{inq.clientName}</span>
                        <span className="text-[11px] text-[#859398]">{inq.companyName} • {inq.phone}</span>
                      </td>
                      <td className="p-3 text-[#bbc9ce]">{inq.projectType}</td>
                      <td className="p-3 text-white font-medium">
                        {inq.floors} Fl ({inq.speed} m/s)
                      </td>
                      <td className="p-3 text-[#ffb700]">{inq.estimatedMotor}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            inq.status === 'New'
                              ? 'bg-[#00d9ff]/20 text-[#00d9ff]'
                              : inq.status === 'Quoting'
                              ? 'bg-[#ffb700]/20 text-[#ffb700]'
                              : inq.status === 'Converted'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-white/10 text-white'
                          }`}
                        >
                          {inq.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <select
                          value={inq.status}
                          onChange={e => onUpdateInquiryStatus(inq.id, e.target.value as any)}
                          className="bg-[#191f2f] border border-[#2c3e50] rounded px-2 py-1 text-[11px] text-white focus:outline-none focus:border-[#00d9ff]"
                        >
                          <option value="New">New</option>
                          <option value="Feasibility Review">Feasibility Review</option>
                          <option value="Quoting">Quoting</option>
                          <option value="Converted">Converted</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Survey Bookings */}
        {activeTab === 'bookings' && (
          <div className="p-6 overflow-y-auto space-y-4">
            <div>
              <h3 className="font-headline text-base font-bold text-white uppercase">On-Site Engineering Surveys</h3>
              <p className="text-xs text-[#859398]">Token fee escrows verified via Razorpay gateway and surveyor dispatches</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookings.map(bkg => (
                <div key={bkg.id} className="p-4 rounded-xl bg-[#141b2b] border border-[#2c3e50] shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-mono text-xs font-bold text-[#00d9ff]">{bkg.id}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400">
                        {bkg.paymentStatus} (₹{bkg.surveyFeeInr})
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">{bkg.clientName}</h4>
                    <p className="text-xs text-[#859398] mb-2">{bkg.company} • {bkg.ncrDistrict}</p>
                    <div className="p-2.5 rounded bg-[#191f2f] border border-[#2c3e50]/60 text-xs space-y-1">
                      <div className="text-[#bbc9ce]">
                        <span className="text-[#859398]">Window:</span> {bkg.surveyDate} ({bkg.timeSlot})
                      </div>
                      <div className="text-[#bbc9ce]">
                        <span className="text-[#859398]">Site:</span> {bkg.siteAddress}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#2c3e50] flex items-center justify-between">
                    <span className="text-[11px] text-[#ffb700] font-semibold">
                      {bkg.assignedEngineer}
                    </span>
                    <span className="text-[10px] text-[#859398] font-mono">{bkg.paymentId}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Fleet Maintenance IoT */}
        {activeTab === 'maintenance' && (
          <div className="p-6 overflow-y-auto space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-headline text-base font-bold text-white uppercase">Fleet Predictive Maintenance (IoT Core)</h3>
                <p className="text-xs text-[#859398]">Automated cable wear, vibration sensor triggers & bi-monthly servicing</p>
              </div>
              <button
                onClick={() => setShowNewTicketModal(true)}
                className="px-3.5 py-2 rounded bg-[#00d9ff] text-[#001f26] font-headline text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all hover:bg-[#38e1ff] cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Log Service Ticket</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {maintenanceRecords.map(rec => (
                <div key={rec.id} className="p-4 rounded-xl bg-[#141b2b] border border-[#2c3e50] shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-mono text-xs text-[#00d9ff]">{rec.id}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          rec.type === 'Emergency'
                            ? 'bg-rose-500/20 text-rose-400'
                            : rec.status === 'Completed'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-[#ffb700]/20 text-[#ffb700]'
                        }`}
                      >
                        {rec.type} • {rec.status}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">{rec.elevatorName || rec.buildingName}</h4>
                    <p className="text-xs text-[#bbc9ce] mb-3 leading-relaxed">{rec.notes || `${rec.model} unit at ${rec.location}. Health score: ${rec.healthScore}%. Vibration: ${rec.lastVibrationReading} m/s²`}</p>
                  </div>
                  <div className="pt-2 border-t border-[#2c3e50] flex justify-between items-center text-[11px] text-[#859398]">
                    <span>{rec.technician || rec.assignedTechnician}</span>
                    <span>{rec.scheduledDate || rec.nextScheduledDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Products Management */}
        {activeTab === 'products' && (
          <div className="p-6 overflow-y-auto space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-headline text-base font-bold text-white uppercase">Product Catalog & Model Specs</h3>
                <p className="text-xs text-[#859398]">Active elevator series and architectural finishes</p>
              </div>
              <button
                onClick={() => setShowNewProductModal(true)}
                className="px-3.5 py-2 rounded bg-[#ffb700] text-[#422d00] font-headline text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all hover:bg-[#ffba26] cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Elevator Model</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map(p => (
                <div key={p.id} className="p-4 rounded-xl bg-[#141b2b] border border-[#2c3e50] shadow-sm flex flex-col justify-between">
                  <div>
                    <img src={p.imageUrl} alt={p.name} className="w-full h-32 object-cover rounded-lg mb-3" />
                    <span className="text-[10px] font-bold text-[#00d9ff] uppercase tracking-wider block">{p.badge}</span>
                    <h4 className="text-sm font-bold text-white uppercase mb-1">{p.name}</h4>
                    <p className="text-xs text-[#859398] mb-2">{p.category} • {p.speed} • {p.capacity}</p>
                  </div>
                  <div className="pt-2 border-t border-[#2c3e50] flex justify-between items-center">
                    <span className="text-xs font-bold text-[#ffb700]">
                      ₹{(p.basePriceInr / 100000).toFixed(1)} Lakhs+
                    </span>
                    <span className="text-[11px] text-[#00d9ff]">{p.driveType}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* New Maintenance Ticket Modal */}
      {showNewTicketModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form onSubmit={handleCreateTicket} className="w-full max-w-md p-6 rounded-xl bg-[#141b2b] border border-[#2c3e50] shadow-2xl space-y-4">
            <h3 className="font-headline text-base font-bold text-white uppercase">Log Hoistway Service Ticket</h3>
            <div>
              <label className="text-xs text-[#859398] uppercase font-semibold block mb-1">Target Installation</label>
              <input
                type="text"
                value={ticketElevator}
                onChange={e => setTicketElevator(e.target.value)}
                className="w-full p-2.5 rounded bg-[#191f2f] border border-[#2c3e50] text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs text-[#859398] uppercase font-semibold block mb-1">Service Type</label>
              <select
                value={ticketType}
                onChange={e => setTicketType(e.target.value as any)}
                className="w-full p-2.5 rounded bg-[#191f2f] border border-[#2c3e50] text-xs text-white"
              >
                <option value="Routine">Routine Bi-Monthly Inspection</option>
                <option value="Emergency">Emergency Brake Calibration</option>
                <option value="Inspection">EN 81-20/50 Safety Certification</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-[#859398] uppercase font-semibold block mb-1">Field Technologist</label>
              <input
                type="text"
                value={ticketTech}
                onChange={e => setTicketTech(e.target.value)}
                className="w-full p-2.5 rounded bg-[#191f2f] border border-[#2c3e50] text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs text-[#859398] uppercase font-semibold block mb-1">Diagnostics Notes</label>
              <textarea
                value={ticketNotes}
                onChange={e => setTicketNotes(e.target.value)}
                placeholder="Specific motor, cable tension, or door sensor observations..."
                rows={3}
                className="w-full p-2.5 rounded bg-[#191f2f] border border-[#2c3e50] text-xs text-white"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowNewTicketModal(false)}
                className="px-4 py-2 rounded border border-[#2c3e50] text-xs text-[#bbc9ce]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded bg-[#00d9ff] text-[#001f26] font-bold text-xs uppercase"
              >
                Create Ticket
              </button>
            </div>
          </form>
        </div>
      )}

      {/* New Product Modal */}
      {showNewProductModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form onSubmit={handleCreateProduct} className="w-full max-w-md p-6 rounded-xl bg-[#141b2b] border border-[#2c3e50] shadow-2xl space-y-3">
            <h3 className="font-headline text-base font-bold text-white uppercase">Add Elevator Series</h3>
            <div>
              <label className="text-xs text-[#859398] uppercase font-semibold block mb-1">Model Name</label>
              <input
                type="text"
                required
                value={newProdName}
                onChange={e => setNewProdName(e.target.value)}
                placeholder="e.g. Stratos-Ultra 8.0"
                className="w-full p-2 rounded bg-[#191f2f] border border-[#2c3e50] text-xs text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-[#859398] uppercase font-semibold block mb-1">Category</label>
                <select
                  value={newProdCategory}
                  onChange={e => setNewProdCategory(e.target.value as any)}
                  className="w-full p-2 rounded bg-[#191f2f] border border-[#2c3e50] text-xs text-white"
                >
                  <option value="commercial">Commercial</option>
                  <option value="residential">Luxury Living</option>
                  <option value="industrial">Heavy Logistics</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-[#859398] uppercase font-semibold block mb-1">Speed</label>
                <input
                  type="text"
                  value={newProdSpeed}
                  onChange={e => setNewProdSpeed(e.target.value)}
                  placeholder="e.g. 5.0 m/s"
                  className="w-full p-2 rounded bg-[#191f2f] border border-[#2c3e50] text-xs text-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-[#859398] uppercase font-semibold block mb-1">Capacity</label>
                <input
                  type="text"
                  value={newProdCapacity}
                  onChange={e => setNewProdCapacity(e.target.value)}
                  placeholder="e.g. 2,000 kg"
                  className="w-full p-2 rounded bg-[#191f2f] border border-[#2c3e50] text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs text-[#859398] uppercase font-semibold block mb-1">Base Price (INR)</label>
                <input
                  type="number"
                  value={newProdPrice}
                  onChange={e => setNewProdPrice(Number(e.target.value))}
                  className="w-full p-2 rounded bg-[#191f2f] border border-[#2c3e50] text-xs text-white"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-[#859398] uppercase font-semibold block mb-1">Engineering Description</label>
              <textarea
                value={newProdDescription}
                onChange={e => setNewProdDescription(e.target.value)}
                rows={2}
                className="w-full p-2 rounded bg-[#191f2f] border border-[#2c3e50] text-xs text-white"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowNewProductModal(false)}
                className="px-4 py-2 rounded border border-[#2c3e50] text-xs text-[#bbc9ce]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded bg-[#ffb700] text-[#422d00] font-bold text-xs uppercase"
              >
                Save Model
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
