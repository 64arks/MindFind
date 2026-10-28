import React, { useState } from 'react';
import { 
  BarChart3, 
  Building2, 
  CheckCircle2, 
  Clock, 
  FileText, 
  AlertTriangle, 
  ShieldCheck, 
  Users, 
  Settings, 
  Layers, 
  Pill, 
  Search, 
  Filter, 
  ChevronRight,
  TrendingUp,
  XCircle,
  Eye,
  Check
} from 'lucide-react';
import { Facility, Medicine, FacilityInventoryItem, VerificationRecord, DiscrepancyReport } from '../../types';

interface AdminDashboardProps {
  facilities: Facility[];
  medicines: Medicine[];
  inventory: FacilityInventoryItem[];
  verifications: VerificationRecord[];
  reports: DiscrepancyReport[];
  onApproveFacility: (id: string) => void;
  onRequestVerification: (id: string) => void;
  onDeactivateFacility: (id: string) => void;
  onResolveReport: (id: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  facilities,
  medicines,
  inventory,
  verifications,
  reports,
  onApproveFacility,
  onRequestVerification,
  onDeactivateFacility,
  onResolveReport
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'facilities' | 'medicines' | 'verification' | 'reports' | 'settings'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Stats
  const participatingCount = facilities.length;
  const medicineCount = medicines.length;
  const recentUpdatesCount = inventory.filter(i => i.lastUpdatedMinutesAgo <= 120).length;
  const pendingVerificationsCount = verifications.filter(v => v.status === 'Pending' || v.status === 'Needs Review').length;
  const staleRecordsCount = inventory.filter(i => i.lastUpdatedMinutesAgo > 180).length;

  // Chart data: Most searched medicines in Lusaka
  const mostSearched = [
    { name: 'Amoxicillin 500mg', searches: 1420, percent: 88, category: 'Antibiotic' },
    { name: 'Paracetamol 500mg', searches: 1180, percent: 74, category: 'Analgesic' },
    { name: 'ORS (Oral Rehydration)', searches: 960, percent: 60, category: 'Electrolyte' },
    { name: 'Artemether + Lumefantrine (Coartem)', searches: 890, percent: 56, category: 'Antimalarial' },
    { name: 'Salbutamol Inhaler', searches: 620, percent: 39, category: 'Respiratory' }
  ];

  // Chart data: Availability updates over time (Past 6 hours)
  const updatesOverTime = [
    { time: '10:00', updates: 14 },
    { time: '11:00', updates: 22 },
    { time: '12:00', updates: 38 },
    { time: '13:00', updates: 29 },
    { time: '14:00', updates: 45 },
    { time: '15:00', updates: 52 }
  ];

  // Facilities with update frequencies
  const facilityUpdateRanks = facilities.map(f => {
    const items = inventory.filter(i => i.facilityId === f.id);
    const avgMins = items.length > 0 ? Math.round(items.reduce((acc, cur) => acc + cur.lastUpdatedMinutesAgo, 0) / items.length) : 120;
    return {
      facility: f,
      itemCount: items.length,
      freshnessMinutes: avgMins,
      score: avgMins < 60 ? 'Optimal' : avgMins < 180 ? 'Good' : 'Needs attention'
    };
  });

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
              National Health Directory System
            </span>
            <span className="text-xs text-neutral-500 font-mono">
              Pilot Jurisdiction: Lusaka Urban
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            System Administration
          </h1>
          <p className="text-xs text-neutral-500">
            Regulatory monitoring and availability integrity oversight
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-xl overflow-x-auto no-scrollbar w-full md:w-auto">
          {[
            { id: 'overview', label: 'Dashboard' },
            { id: 'verification', label: `Verification (${pendingVerificationsCount})` },
            { id: 'facilities', label: 'Facilities' },
            { id: 'medicines', label: 'Medicines' },
            { id: 'reports', label: `Discrepancies (${reports.filter(r => r.status !== 'Resolved').length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* VIEW: OVERVIEW DASHBOARD */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
              <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                Participating facilities
              </span>
              <p className="text-2xl font-bold text-neutral-900 tabular-nums">
                {participatingCount}
              </p>
              <span className="text-[11px] text-emerald-700 font-medium mt-1 block">ZAMRA licensed</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
              <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                Medicine records
              </span>
              <p className="text-2xl font-bold text-neutral-900 tabular-nums">
                {medicineCount}
              </p>
              <span className="text-[11px] text-neutral-500 mt-1 block">Essential formulas</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
              <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                Recent inventory updates
              </span>
              <p className="text-2xl font-bold text-emerald-700 tabular-nums">
                {recentUpdatesCount}
              </p>
              <span className="text-[11px] text-neutral-500 mt-1 block">&lt; 2 hrs recent</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
              <span className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider block mb-1">
                Pending verification
              </span>
              <p className="text-2xl font-bold text-amber-700 tabular-nums">
                {pendingVerificationsCount}
              </p>
              <span className="text-[11px] text-neutral-500 mt-1 block">Awaiting audit</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs col-span-2 md:col-span-1">
              <span className="text-[11px] font-semibold text-rose-700 uppercase tracking-wider block mb-1">
                Stale inventory records
              </span>
              <p className="text-2xl font-bold text-rose-700 tabular-nums">
                {staleRecordsCount}
              </p>
              <span className="text-[11px] text-neutral-500 mt-1 block">&gt; 3 hrs unconfirmed</span>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Chart 1: Availability Updates Over Time */}
            <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-neutral-900">
                    Medicine Availability Updates Over Time
                  </h2>
                  <p className="text-xs text-neutral-500">Hourly facility sync velocity (Today)</p>
                </div>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  +38% vs yesterday
                </span>
              </div>

              {/* Clean SVG Bar Chart */}
              <div className="h-44 flex items-end justify-between gap-3 pt-4 px-2 border-b border-neutral-100">
                {updatesOverTime.map((point, idx) => {
                  const heightPercent = Math.round((point.updates / 60) * 100);
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <span className="text-[10px] text-neutral-500 font-mono tabular-nums">
                        {point.updates}
                      </span>
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className="w-full max-w-[40px] rounded-t-lg bg-neutral-900 hover:bg-emerald-600 transition-all cursor-pointer"
                        title={`${point.time}: ${point.updates} updates`}
                      />
                      <span className="text-[10px] text-neutral-400 font-medium">
                        {point.time}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Chart 2: Most Searched Medicines */}
            <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-4">
              <div>
                <h2 className="text-sm font-bold text-neutral-900">
                  Most Searched Medicines (Lusaka)
                </h2>
                <p className="text-xs text-neutral-500">Citizen search volume over the last 7 days</p>
              </div>

              <div className="space-y-3 pt-1">
                {mostSearched.map((med, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-neutral-800">{med.name}</span>
                      <span className="text-neutral-500 font-mono tabular-nums">{med.searches} queries</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                      <div
                        style={{ width: `${med.percent}%` }}
                        className="h-full rounded-full bg-emerald-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Outdated records / Audit warnings */}
          <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-neutral-900">
                  Facilities with Frequent Updates vs. Stale Records
                </h2>
                <p className="text-xs text-neutral-500">Freshness audit across participating dispensaries</p>
              </div>
              <button
                onClick={() => setActiveTab('facilities')}
                className="text-xs font-semibold text-emerald-700 hover:underline"
              >
                View all facilities
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              {facilityUpdateRanks.slice(0, 3).map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50/60 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-900 truncate">{item.facility.name}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                      item.score === 'Optimal' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.score}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500">{item.facility.area} · {item.itemCount} medicines listed</p>
                  <p className="text-[11px] text-neutral-700 font-medium">Average record age: {item.freshnessMinutes} min</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW: FACILITY VERIFICATION (Section 14) */}
      {activeTab === 'verification' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-neutral-900">
                Facility Verification & Accreditation
              </h2>
              <p className="text-xs text-neutral-500">
                Verify ZAMRA Premise Licences and HPCZ Pharmacist Registration prior to public listing
              </p>
            </div>
            <div className="text-xs text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-xl">
              {verifications.length} records evaluated
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-neutral-50/80 border-b border-neutral-200 text-neutral-500 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Facility Name</th>
                  <th className="py-3 px-4">Type & Location</th>
                  <th className="py-3 px-4">ZAMRA Licence</th>
                  <th className="py-3 px-4">Submitted Documents</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {verifications.map((rec) => (
                  <tr key={rec.id} className="hover:bg-neutral-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-neutral-900">{rec.facilityName}</div>
                      <span className="text-[11px] text-neutral-400">{rec.contactPerson}</span>
                    </td>
                    <td className="py-3.5 px-4 text-neutral-600">
                      <div>{rec.facilityType}</div>
                      <span className="text-[10px] text-neutral-400">{rec.location}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-neutral-800">
                      {rec.zamraNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        {rec.documents.map((doc, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[11px]">
                            {doc.status === 'Verified' ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            ) : doc.status === 'Rejected' ? (
                              <XCircle className="w-3.5 h-3.5 text-rose-600" />
                            ) : (
                              <Clock className="w-3.5 h-3.5 text-amber-500" />
                            )}
                            <span className="text-neutral-700">{doc.name}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        rec.status === 'Verified'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : rec.status === 'Pending'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : rec.status === 'Needs Review'
                          ? 'bg-rose-50 text-rose-800 border border-rose-200'
                          : 'bg-neutral-100 text-neutral-700'
                      }`}>
                        {rec.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {rec.status !== 'Verified' && (
                          <button
                            onClick={() => onApproveFacility(rec.id)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs transition-colors"
                          >
                            Approve
                          </button>
                        )}
                        {rec.status === 'Pending' && (
                          <button
                            onClick={() => onRequestVerification(rec.id)}
                            className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-medium text-xs transition-colors"
                          >
                            Request info
                          </button>
                        )}
                        {rec.status === 'Verified' && (
                          <button
                            onClick={() => onDeactivateFacility(rec.id)}
                            className="px-2.5 py-1 rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50 font-medium text-xs transition-colors"
                          >
                            Deactivate
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW: CITIZEN DISCREPANCY REPORTS (Section 16) */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-neutral-900">
              Citizen Discrepancy Reports
            </h2>
            <p className="text-xs text-neutral-500">
              Submitted by patients when facility stock does not match the MediFind public availability report
            </p>
          </div>

          <div className="space-y-3">
            {reports.map((rep) => (
              <div
                key={rep.id}
                className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-neutral-900 text-sm">{rep.facilityName}</span>
                    <span className="text-neutral-400">·</span>
                    <span className="font-semibold text-emerald-800">{rep.medicineName}</span>
                    <span className="text-[10px] text-neutral-400">{rep.reportedAt}</span>
                  </div>
                  <p className="text-neutral-600 font-medium">Issue: {rep.problemType}</p>
                  {rep.comment && (
                    <p className="text-neutral-500 italic bg-neutral-50 p-2 rounded-lg">“{rep.comment}”</p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                    rep.status === 'Resolved'
                      ? 'bg-emerald-50 text-emerald-800'
                      : 'bg-amber-50 text-amber-800'
                  }`}>
                    {rep.status}
                  </span>

                  {rep.status !== 'Resolved' && (
                    <button
                      onClick={() => onResolveReport(rep.id)}
                      className="px-3 py-1.5 rounded-lg bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors"
                    >
                      Mark Resolved
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW: FACILITIES LIST */}
      {activeTab === 'facilities' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-neutral-900">
              Participating Facilities in Lusaka ({facilities.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {facilities.map(fac => (
              <div key={fac.id} className="p-4 rounded-2xl bg-white border border-neutral-200/80 space-y-2 text-xs">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-neutral-900">{fac.name}</h3>
                    <p className="text-neutral-500">{fac.address}</p>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Verified
                  </span>
                </div>
                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-neutral-600">
                  <span>Licence: {fac.zamraLicence}</span>
                  <span>{fac.phone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW: MEDICINES LIST */}
      {activeTab === 'medicines' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-neutral-900">
              Formulary & Medicine Directory ({medicines.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {medicines.map(med => (
              <div key={med.id} className="p-4 rounded-2xl bg-white border border-neutral-200/80 space-y-2 text-xs">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-neutral-900">
                      {med.name} {med.strength}
                    </h3>
                    <p className="text-neutral-500">{med.genericName} · {med.form}</p>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                    med.isRestricted ? 'bg-amber-100 text-amber-900' : 'bg-emerald-50 text-emerald-800'
                  }`}>
                    {med.category}
                  </span>
                </div>
                <p className="text-neutral-600 line-clamp-2">{med.generalDescription}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
