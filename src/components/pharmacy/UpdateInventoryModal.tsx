import React, { useState } from 'react';
import { X, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Medicine, FacilityInventoryItem, AvailabilityStatus } from '../../types';

interface UpdateInventoryModalProps {
  medicine: Medicine;
  currentItem?: FacilityInventoryItem | null;
  onClose: () => void;
  onSave: (medicineId: string, status: AvailabilityStatus, quantity?: number, unit?: string) => void;
}

export const UpdateInventoryModal: React.FC<UpdateInventoryModalProps> = ({
  medicine,
  currentItem,
  onClose,
  onSave
}) => {
  const [status, setStatus] = useState<AvailabilityStatus>(currentItem?.status || 'Available');
  const [quantity, setQuantity] = useState<string>(currentItem?.quantityOptional ? String(currentItem.quantityOptional) : '');
  const [unit, setUnit] = useState<string>(currentItem?.unit || (medicine.form === 'Capsules' || medicine.form === 'Tablets' ? 'boxes' : 'units'));
  const [isSuccess, setIsSuccess] = useState(false);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const qtyNum = quantity ? parseInt(quantity, 10) : undefined;
    onSave(medicine.id, status, qtyNum, unit);
    setIsSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-[28px] p-6 shadow-2xl border border-neutral-100 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
          <div>
            <h2 className="text-base font-bold text-neutral-900">
              Update Inventory
            </h2>
            <p className="text-xs text-neutral-500">
              Timely logs keep Lusaka patients accurately informed
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900">
              Inventory updated successfully.
            </h3>
            <p className="text-xs text-emerald-700 font-medium">
              Updated just now.
            </p>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-4 text-xs">
            {/* Readonly info */}
            <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200/70 grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] uppercase font-semibold text-neutral-400">Medicine</span>
                <p className="font-bold text-neutral-900 text-sm">{medicine.name}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-neutral-400">Strength</span>
                <p className="font-bold text-neutral-900 text-sm">{medicine.strength}</p>
              </div>
            </div>

            {/* Availability Radio Options */}
            <div className="space-y-2">
              <label className="font-semibold text-neutral-700 block">
                Availability Status
              </label>

              <div className="space-y-2">
                {[
                  { value: 'Available' as AvailabilityStatus, label: 'Available', desc: 'Sufficient current stock for patient dispensation', color: 'text-emerald-700' },
                  { value: 'Low stock' as AvailabilityStatus, label: 'Low Stock', desc: 'Limited packages remaining (< 10 units)', color: 'text-amber-700' },
                  { value: 'Out of stock' as AvailabilityStatus, label: 'Out of Stock', desc: 'No units available right now', color: 'text-rose-700' }
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                      status === opt.value
                        ? 'border-neutral-900 bg-neutral-50 font-semibold'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="inventoryStatus"
                      value={opt.value}
                      checked={status === opt.value}
                      onChange={() => setStatus(opt.value)}
                      className="mt-0.5 w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div>
                      <p className={`font-semibold ${opt.color}`}>{opt.label}</p>
                      <p className="text-[11px] text-neutral-400 font-normal">{opt.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Optional Quantity */}
            <div className="space-y-1.5 pt-1">
              <label className="font-semibold text-neutral-700 block">
                Quantity (Optional for participating facility transparency)
              </label>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 45"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="col-span-2 p-2.5 rounded-xl border border-neutral-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
                <input
                  type="text"
                  placeholder="boxes/packs"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="p-2.5 rounded-xl border border-neutral-200 text-xs text-neutral-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 pt-1">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span>Timestamp will automatically refresh to current time upon saving.</span>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs transition-colors shadow-xs"
              >
                Update Availability
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
