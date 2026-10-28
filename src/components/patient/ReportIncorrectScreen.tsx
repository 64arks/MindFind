import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, AlertTriangle, Send } from 'lucide-react';
import { Facility, Medicine } from '../../types';

interface ReportIncorrectScreenProps {
  facilities: Facility[];
  medicines: Medicine[];
  defaultFacility?: Facility | null;
  defaultMedicine?: Medicine | null;
  onBack: () => void;
  onSubmitReport: (facilityName: string, medicineName: string, problem: string, comment: string) => void;
}

export const ReportIncorrectScreen: React.FC<ReportIncorrectScreenProps> = ({
  facilities,
  medicines,
  defaultFacility,
  defaultMedicine,
  onBack,
  onSubmitReport
}) => {
  const [selectedFacility, setSelectedFacility] = useState(defaultFacility?.name || facilities[0]?.name || 'Woodlands Community Pharmacy');
  const [selectedMedicine, setSelectedMedicine] = useState(defaultMedicine ? `${defaultMedicine.name} ${defaultMedicine.strength}` : 'Amoxicillin 500mg');
  const [problemType, setProblemType] = useState<string>('Medicine unavailable');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const problems = [
    'Medicine unavailable',
    'Incorrect medicine information',
    'Incorrect facility information',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitReport(selectedFacility, selectedMedicine, problemType, details);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[500px] flex flex-col justify-center items-center text-center p-6 bg-white space-y-4 max-w-md mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-neutral-900">
            Thank you. The information will be reviewed.
          </h2>
          <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
            Our quality monitoring team and the participating facility will be notified to verify and correct the reported stock status.
          </p>
        </div>

        <button
          onClick={onBack}
          className="mt-4 px-6 py-2.5 rounded-xl bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors"
        >
          Return to directory
        </button>
      </div>
    );
  }

  return (
    <div className="pb-24 px-4 pt-2 max-w-md mx-auto space-y-4">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-neutral-900 font-medium"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back</span>
      </button>

      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl font-bold tracking-tight text-neutral-900">
          Report incorrect information
        </h1>
        <p className="text-xs text-neutral-500">
          Help Lusaka residents access accurate medicine availability
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Facility Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-700 block">
            Facility
          </label>
          <select
            value={selectedFacility}
            onChange={(e) => setSelectedFacility(e.target.value)}
            className="w-full p-3 rounded-xl bg-white border border-neutral-200 text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            {facilities.map(f => (
              <option key={f.id} value={f.name}>
                {f.name} ({f.area})
              </option>
            ))}
          </select>
        </div>

        {/* Medicine Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-700 block">
            Medicine
          </label>
          <select
            value={selectedMedicine}
            onChange={(e) => setSelectedMedicine(e.target.value)}
            className="w-full p-3 rounded-xl bg-white border border-neutral-200 text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            {medicines.map(m => (
              <option key={m.id} value={`${m.name} ${m.strength}`}>
                {m.name} {m.strength} ({m.form})
              </option>
            ))}
          </select>
        </div>

        {/* Problem radio list */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-neutral-700 block">
            Problem
          </label>
          <div className="space-y-2">
            {problems.map((p) => (
              <label
                key={p}
                className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer text-xs transition-all ${
                  problemType === p
                    ? 'border-neutral-900 bg-neutral-50 font-semibold text-neutral-900'
                    : 'border-neutral-200 hover:border-neutral-300 text-neutral-700'
                }`}
              >
                <input
                  type="radio"
                  name="problemType"
                  value={p}
                  checked={problemType === p}
                  onChange={() => setProblemType(p)}
                  className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                />
                <span>{p}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Optional details */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-700 block">
            Additional observations (optional)
          </label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows={3}
            placeholder="e.g. Visited at 14:00 and staff mentioned they ran out of stock 10 minutes prior..."
            className="w-full p-3 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>

        <button
          type="submit"
          className="w-full h-12 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs active:scale-[0.98]"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Submit Report</span>
        </button>
      </form>
    </div>
  );
};
