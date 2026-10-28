import React, { useState } from 'react';
import { Building2, Search, Plus, RefreshCw, CheckCircle2, AlertTriangle, XCircle, Clock, Edit3, ShieldCheck, Filter } from 'lucide-react';
import { Facility, Medicine, FacilityInventoryItem, AvailabilityStatus } from '../../types';
import { UpdateInventoryModal } from './UpdateInventoryModal';

interface PharmacyDashboardProps {
  facilities: Facility[];
  medicines: Medicine[];
  inventory: FacilityInventoryItem[];
  currentFacilityId: string;
  onFacilityChange: (facilityId: string) => void;
  onUpdateInventory: (facilityId: string, medicineId: string, status: AvailabilityStatus, quantity?: number, unit?: string) => void;
  onAddMedicineRecord?: (facilityId: string, medicineId: string) => void;
}

export const PharmacyDashboard: React.FC<PharmacyDashboardProps> = ({
  facilities,
  medicines,
  inventory,
  currentFacilityId,
  onFacilityChange,
  onUpdateInventory
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const activeFacility = facilities.find(f => f.id === currentFacilityId) || facilities[0];

  // Inventory rows for this facility
  const facilityItems = inventory.filter(i => i.facilityId === activeFacility.id);

  // Stats calculation
  const totalMedicines = facilityItems.length;
  const availableCount = facilityItems.filter(i => i.status === 'Available').length;
  const lowStockCount = facilityItems.filter(i => i.status === 'Low stock').length;
  const outOfStockCount = facilityItems.filter(i => i.status === 'Out of stock').length;
  const needsUpdateCount = facilityItems.filter(i => i.lastUpdatedMinutesAgo > 120 || i.status === 'Not recently confirmed').length;

  // Inventory table data joined with medicine records
  const tableRows = facilityItems.map(invItem => {
    const med = medicines.find(m => m.id === invItem.medicineId);
    return {
      invItem,
      med,
      name: med ? med.name : 'Unknown Medicine',
      strength: med ? med.strength : '',
      form: med ? med.form : '',
      status: invItem.status,
      quantity: invItem.quantityOptional,
      unit: invItem.unit,
      lastUpdated: `${invItem.lastUpdatedMinutesAgo} min ago`,
      isStale: invItem.lastUpdatedMinutesAgo > 120
    };
  }).filter(row => {
    const matchesSearch = row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          row.strength.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || row.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: AvailabilityStatus) => {
    switch (status) {
      case 'Available':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Available
          </span>
        );
      case 'Low stock':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Low Stock
          </span>
        );
      case 'Out of stock':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-800 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Out of Stock
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-600 bg-neutral-100 px-2.5 py-0.5 rounded-full border border-neutral-200">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
            Needs Update
          </span>
        );
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 space-y-6">
      {/* Top Banner / Facility Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
              ZAMRA Certified Dispensary Console
            </span>
            <span className="text-xs text-neutral-500 font-mono">
              {activeFacility.zamraLicence}
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Pharmacy Dashboard
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Managing public availability for {activeFacility.name} ({activeFacility.area}, Lusaka)
          </p>
        </div>

        {/* Facility Selector */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-xs text-neutral-500 whitespace-nowrap">Switch Facility:</label>
          <select
            value={activeFacility.id}
            onChange={(e) => onFacilityChange(e.target.value)}
            className="p-2 rounded-xl border border-neutral-200 bg-white text-xs font-semibold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            {facilities.map(f => (
              <option key={f.id} value={f.id}>
                {f.name} ({f.area})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Overview Metric Cards (Total, Available, Low Stock, Out of Stock, Needs Update) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
          <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
            Total medicines
          </span>
          <p className="text-2xl font-bold text-neutral-900 tabular-nums">
            {totalMedicines}
          </p>
          <span className="text-[11px] text-neutral-500 mt-1 block">Cataloged formulas</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
          <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider block mb-1">
            Available
          </span>
          <p className="text-2xl font-bold text-emerald-700 tabular-nums">
            {availableCount}
          </p>
          <span className="text-[11px] text-neutral-500 mt-1 block">Ready for patients</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
          <span className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider block mb-1">
            Low stock
          </span>
          <p className="text-2xl font-bold text-amber-700 tabular-nums">
            {lowStockCount}
          </p>
          <span className="text-[11px] text-neutral-500 mt-1 block">&lt; 10 units left</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
          <span className="text-[11px] font-semibold text-rose-700 uppercase tracking-wider block mb-1">
            Out of stock
          </span>
          <p className="text-2xl font-bold text-rose-700 tabular-nums">
            {outOfStockCount}
          </p>
          <span className="text-[11px] text-neutral-500 mt-1 block">Awaiting restock</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs col-span-2 md:col-span-1">
          <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block mb-1">
            Needs update
          </span>
          <p className="text-2xl font-bold text-neutral-700 tabular-nums">
            {needsUpdateCount}
          </p>
          <span className="text-[11px] text-neutral-500 mt-1 block">&gt; 2 hrs without log</span>
        </div>
      </div>

      {/* Action Bar & Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
            <input
              type="text"
              placeholder="Search inventory (e.g. Amoxicillin, Paracetamol)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2.5 rounded-xl border border-neutral-200 bg-white text-xs text-neutral-700 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Low stock">Low Stock</option>
            <option value="Out of stock">Out of Stock</option>
          </select>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              if (medicines[0]) setEditingMedicine(medicines[0]);
            }}
            className="h-10 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Update Inventory</span>
          </button>

          <button
            onClick={() => {
              // Pick an unadded medicine
              const unadded = medicines.find(m => !facilityItems.some(fi => fi.medicineId === m.id));
              if (unadded) setEditingMedicine(unadded);
              else setEditingMedicine(medicines[0]);
            }}
            className="h-10 px-4 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Medicine</span>
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-neutral-50/80 border-b border-neutral-200 text-neutral-500 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4">Medicine</th>
                <th className="py-3.5 px-4">Strength</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Quantity (Optional)</th>
                <th className="py-3.5 px-4">Last Updated</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {tableRows.map((row) => (
                <tr key={row.invItem.id} className="hover:bg-neutral-50/60 transition-colors">
                  <td className="py-3 px-4 font-semibold text-neutral-900">
                    <div>{row.name}</div>
                    <span className="text-[10px] text-neutral-400 font-normal">{row.form}</span>
                  </td>
                  <td className="py-3 px-4 font-medium text-neutral-800 tabular-nums">
                    {row.strength}
                  </td>
                  <td className="py-3 px-4">
                    {getStatusBadge(row.status)}
                  </td>
                  <td className="py-3 px-4 text-neutral-600 font-mono tabular-nums">
                    {row.quantity !== undefined ? `${row.quantity} ${row.unit || 'units'}` : '—'}
                  </td>
                  <td className="py-3 px-4 text-neutral-500">
                    <span className={`tabular-nums ${row.isStale ? 'text-amber-700 font-medium' : ''}`}>
                      {row.lastUpdated}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => {
                        if (row.med) setEditingMedicine(row.med);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold transition-colors"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Timely updates notice */}
      <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-xs text-neutral-600 flex items-start gap-3">
        <Clock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-neutral-900">
            Zambia Medicines Availability Freshness Policy
          </p>
          <p className="leading-relaxed">
            Facilities are encouraged to update stock levels at least once every shift (or immediately upon stockout of essential antibiotics and antimalarials) to prevent unnecessary patient travel across Lusaka.
          </p>
        </div>
      </div>

      {/* Edit Modal */}
      {editingMedicine && (
        <UpdateInventoryModal
          medicine={editingMedicine}
          currentItem={facilityItems.find(i => i.medicineId === editingMedicine.id)}
          onClose={() => setEditingMedicine(null)}
          onSave={(medId, status, qty, unit) => {
            onUpdateInventory(activeFacility.id, medId, status, qty, unit);
          }}
        />
      )}
    </div>
  );
};
