import React, { useState } from 'react';
import { 
  INITIAL_FACILITIES, 
  INITIAL_MEDICINES, 
  INITIAL_INVENTORY, 
  INITIAL_VERIFICATIONS, 
  INITIAL_REPORTS 
} from './data/mockData';
import { 
  Facility, 
  Medicine, 
  FacilityInventoryItem, 
  VerificationRecord, 
  DiscrepancyReport, 
  UserState, 
  AccessLevel,
  AvailabilityStatus 
} from './types';

// Common Components
import { ModeSwitcher, AppRole } from './components/common/ModeSwitcher';
import { Header } from './components/common/Header';
import { BottomNav, NavTab } from './components/common/BottomNav';

// Patient Flow Screens
import { SplashScreen } from './components/patient/SplashScreen';
import { AgeSafetyOnboarding } from './components/patient/AgeSafetyOnboarding';
import { AgeAccessScreen } from './components/patient/AgeAccessScreen';
import { HomeScreen } from './components/patient/HomeScreen';
import { MedicineSearchScreen } from './components/patient/MedicineSearchScreen';
import { MedicineResultsScreen } from './components/patient/MedicineResultsScreen';
import { MedicineDetailsScreen } from './components/patient/MedicineDetailsScreen';
import { RestrictedMedicineScreen } from './components/patient/RestrictedMedicineScreen';
import { MapScreen } from './components/patient/MapScreen';
import { FacilityDetailsScreen } from './components/patient/FacilityDetailsScreen';
import { DirectionsModal } from './components/patient/DirectionsModal';
import { SafetyPrivacyCenter } from './components/patient/SafetyPrivacyCenter';
import { ReportIncorrectScreen } from './components/patient/ReportIncorrectScreen';
import { ProfileScreen } from './components/patient/ProfileScreen';
import { NotificationsScreen } from './components/patient/NotificationsScreen';
import { SavedScreen } from './components/patient/SavedScreen';
import { EmptyStatesDemo } from './components/patient/EmptyStatesDemo';

// Pharmacy Staff Components
import { PharmacyDashboard } from './components/pharmacy/PharmacyDashboard';

// Admin Components
import { AdminDashboard } from './components/admin/AdminDashboard';

export type PatientScreenView =
  | 'splash'
  | 'onboarding'
  | 'access_level'
  | 'home'
  | 'search'
  | 'results'
  | 'medicine_details'
  | 'restricted'
  | 'facility_details'
  | 'map'
  | 'saved'
  | 'profile'
  | 'notifications'
  | 'safety'
  | 'report'
  | 'empty_states';

export default function App() {
  // Master state
  const [role, setRole] = useState<AppRole>('patient');
  const [isMobileFrame, setIsMobileFrame] = useState(true);

  // Core Data
  const [facilities, setFacilities] = useState<Facility[]>(INITIAL_FACILITIES);
  const [medicines, setMedicines] = useState<Medicine[]>(INITIAL_MEDICINES);
  const [inventory, setInventory] = useState<FacilityInventoryItem[]>(INITIAL_INVENTORY);
  const [verifications, setVerifications] = useState<VerificationRecord[]>(INITIAL_VERIFICATIONS);
  const [reports, setReports] = useState<DiscrepancyReport[]>(INITIAL_REPORTS);

  // User & Onboarding state
  const [user, setUser] = useState<UserState>({
    name: 'Chileshe Mwape',
    dateOfBirth: '1998-05-14',
    age: 28,
    accessLevel: 'Adult',
    locationPreference: 'Woodlands, Lusaka',
    hasCompletedOnboarding: true,
    savedFacilities: ['fac-woodlands', 'fac-kabulonga'],
    savedMedicines: ['med-amox-500', 'med-ors'],
    recentSearches: ['Amoxicillin', 'Paracetamol', 'ORS']
  });

  // Patient Navigation State
  const [patientView, setPatientView] = useState<PatientScreenView>('home');
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(medicines[0]);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(facilities[0]);
  const [directionsFacility, setDirectionsFacility] = useState<Facility | null>(null);
  const [hasUnreadNotifs, setHasUnreadNotifs] = useState(true);

  // Pharmacy staff active facility
  const [pharmacyFacilityId, setPharmacyFacilityId] = useState<string>(facilities[0].id);

  // Flow runner helper
  const handleRunFlow = (flowId: 'patient_flow' | 'pharmacy_flow' | 'admin_flow' | 'restricted_flow' | 'empty_states') => {
    switch (flowId) {
      case 'patient_flow':
        setRole('patient');
        setPatientView('splash');
        break;
      case 'pharmacy_flow':
        setRole('pharmacy');
        break;
      case 'admin_flow':
        setRole('admin');
        break;
      case 'restricted_flow': {
        setRole('patient');
        const tramadol = medicines.find(m => m.id === 'med-tramadol-50') || medicines[medicines.length - 1];
        setSelectedMedicine(tramadol);
        setPatientView('restricted');
        break;
      }
      case 'empty_states':
        setRole('patient');
        setPatientView('empty_states');
        break;
    }
  };

  // Bottom Navigation Handler
  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab);
    switch (tab) {
      case 'home':
        setPatientView('home');
        break;
      case 'search':
        setPatientView('search');
        break;
      case 'map':
        setPatientView('map');
        break;
      case 'saved':
        setPatientView('saved');
        break;
      case 'profile':
        setPatientView('profile');
        break;
    }
  };

  // Medicine Selection
  const handleSelectMedicine = (med: Medicine) => {
    setSelectedMedicine(med);
    if (med.isRestricted) {
      setPatientView('restricted');
    } else {
      setPatientView('results');
    }
  };

  // Facility Selection
  const handleSelectFacility = (fac: Facility) => {
    setSelectedFacility(fac);
    setPatientView('facility_details');
  };

  // Toggle Saved Facility
  const handleToggleSaveFacility = (facId: string) => {
    setUser(prev => {
      const exists = prev.savedFacilities.includes(facId);
      return {
        ...prev,
        savedFacilities: exists
          ? prev.savedFacilities.filter(id => id !== facId)
          : [...prev.savedFacilities, facId]
      };
    });
  };

  // Inventory update from Pharmacy Dashboard
  const handleUpdateInventory = (
    facilityId: string, 
    medicineId: string, 
    status: AvailabilityStatus, 
    quantity?: number, 
    unit?: string
  ) => {
    setInventory(prev => {
      const existingIdx = prev.findIndex(i => i.facilityId === facilityId && i.medicineId === medicineId);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          status,
          quantityOptional: quantity,
          unit: unit || updated[existingIdx].unit,
          lastUpdatedMinutesAgo: 1,
          lastUpdatedDate: 'Just now'
        };
        return updated;
      } else {
        const newItem: FacilityInventoryItem = {
          id: `inv-${Date.now()}`,
          facilityId,
          medicineId,
          status,
          quantityOptional: quantity,
          unit: unit || 'units',
          lastUpdatedMinutesAgo: 1,
          lastUpdatedDate: 'Just now',
          updatedBy: 'Staff Pharmacist'
        };
        return [newItem, ...prev];
      }
    });
  };

  // Admin Verification Actions
  const handleApproveFacility = (id: string) => {
    setVerifications(prev => prev.map(v => v.id === id ? { ...v, status: 'Verified' } : v));
  };
  const handleRequestVerification = (id: string) => {
    setVerifications(prev => prev.map(v => v.id === id ? { ...v, status: 'Needs Review' } : v));
  };
  const handleDeactivateFacility = (id: string) => {
    setVerifications(prev => prev.map(v => v.id === id ? { ...v, status: 'Deactivated' } : v));
  };

  // Discrepancy report submission
  const handleSubmitReport = (facilityName: string, medicineName: string, problem: string, comment: string) => {
    const newReport: DiscrepancyReport = {
      id: `rep-${Date.now()}`,
      facilityName,
      medicineName,
      problemType: problem as any,
      comment,
      reportedAt: 'Just now',
      status: 'Received'
    };
    setReports(prev => [newReport, ...prev]);
  };

  // Resolve discrepancy report
  const handleResolveReport = (id: string) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: 'Resolved' } : r));
  };

  // Header Title & Back configs
  const getHeaderProps = () => {
    switch (patientView) {
      case 'results':
        return {
          title: selectedMedicine ? `${selectedMedicine.name} ${selectedMedicine.strength}` : 'Availability',
          subtitle: 'Participating Facilities in Lusaka',
          showBack: true,
          onBack: () => setPatientView('search')
        };
      case 'medicine_details':
        return {
          title: selectedMedicine?.name || 'Medicine Details',
          subtitle: 'Educational & Formulary Info',
          showBack: true,
          onBack: () => setPatientView('results')
        };
      case 'restricted':
        return {
          title: 'Restricted Formulation',
          subtitle: 'Professional Clinical Oversight',
          showBack: true,
          onBack: () => setPatientView('search')
        };
      case 'facility_details':
        return {
          title: selectedFacility?.name || 'Facility Profile',
          subtitle: `${selectedFacility?.area}, Lusaka`,
          showBack: true,
          onBack: () => setPatientView('home')
        };
      case 'search':
        return {
          title: 'Find a Medicine',
          subtitle: 'Lusaka Health Directory',
          showBack: true,
          onBack: () => {
            setActiveTab('home');
            setPatientView('home');
          }
        };
      case 'map':
        return {
          title: 'Lusaka Facilities Map',
          subtitle: 'Participating Pharmacies & Clinics',
          showBack: false
        };
      case 'saved':
        return {
          title: 'Saved Items',
          subtitle: 'Bookmarked Dispensaries',
          showBack: false
        };
      case 'profile':
        return {
          title: 'User Profile',
          subtitle: 'Access & Preferences',
          showBack: false
        };
      case 'notifications':
        return {
          title: 'Notifications',
          subtitle: 'Stock & Freshness Alerts',
          showBack: true,
          onBack: () => setPatientView('home')
        };
      case 'safety':
        return {
          title: 'Safety & Privacy',
          subtitle: 'National Health Compliance',
          showBack: true,
          onBack: () => setPatientView('home')
        };
      case 'report':
        return {
          title: 'Report Discrepancy',
          subtitle: 'Information Quality Assurance',
          showBack: true,
          onBack: () => setPatientView('home')
        };
      case 'empty_states':
        return {
          title: 'System States',
          subtitle: 'Empty, Outdated & Error Modes',
          showBack: true,
          onBack: () => setPatientView('home')
        };
      default:
        return {
          showBack: false
        };
    }
  };

  const isNavVisible = role === 'patient' && 
    !['splash', 'onboarding', 'access_level'].includes(patientView);

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col font-sans text-neutral-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Flow Jumper & Switcher Bar */}
      <ModeSwitcher
        currentRole={role}
        onSelectRole={setRole}
        isMobileFrame={isMobileFrame}
        onToggleMobileFrame={() => setIsMobileFrame(prev => !prev)}
        onRunFlow={handleRunFlow}
      />

      {/* Main View Area */}
      <main className="flex-1 flex justify-center items-start py-2 sm:py-6 px-0 sm:px-4">
        {/* If Patient View with Mobile Frame enabled */}
        {role === 'patient' ? (
          <div
            className={`w-full transition-all duration-300 ${
              isMobileFrame
                ? 'max-w-[420px] bg-white rounded-[40px] shadow-2xl border-[8px] border-neutral-800 overflow-hidden min-h-[820px] flex flex-col relative my-auto'
                : 'max-w-2xl bg-white rounded-3xl shadow-sm border border-neutral-200 overflow-hidden min-h-[780px] flex flex-col relative'
            }`}
          >
            {/* Apple iPhone Style Dynamic Island / Status Bar when inside mobile frame */}
            {isMobileFrame && (
              <div className="pt-3 pb-1 px-6 flex items-center justify-between bg-white text-[11px] font-semibold text-neutral-800 select-none border-b border-neutral-100/50">
                <span className="tabular-nums">15:35</span>
                {/* Minimal Dynamic Island Pill */}
                <div className="w-20 h-4 bg-neutral-900 rounded-full mx-auto" />
                <div className="flex items-center gap-1.5 text-[10px]">
                  <span>5G</span>
                  <div className="w-4 h-2 rounded-[2px] border border-neutral-700 p-0.5 flex items-center">
                    <div className="w-full h-full bg-neutral-800 rounded-[1px]" />
                  </div>
                </div>
              </div>
            )}

            {/* Standard Mobile Header (when past onboarding) */}
            {isNavVisible && (
              <Header
                {...getHeaderProps()}
                accessLevel={user.accessLevel}
                onNotificationClick={() => {
                  setHasUnreadNotifs(false);
                  setPatientView('notifications');
                }}
                unreadNotifications={hasUnreadNotifs}
                onSafetyClick={() => setPatientView('safety')}
              />
            )}

            {/* Content Container */}
            <div className="flex-1 overflow-y-auto no-scrollbar relative">
              {/* FLOW 1: SPLASH SCREEN */}
              {patientView === 'splash' && (
                <SplashScreen
                  onStart={() => setPatientView('onboarding')}
                />
              )}

              {/* FLOW 1: AGE & SAFETY ONBOARDING */}
              {patientView === 'onboarding' && (
                <AgeSafetyOnboarding
                  onContinue={(dob, age) => {
                    const level: AccessLevel = age >= 18 ? 'Adult' : 'Restricted';
                    setUser(prev => ({
                      ...prev,
                      dateOfBirth: dob,
                      age,
                      accessLevel: level
                    }));
                    setPatientView('access_level');
                  }}
                />
              )}

              {/* FLOW 1: AGE ACCESS DETERMINATION */}
              {patientView === 'access_level' && (
                <AgeAccessScreen
                  age={user.age || 28}
                  accessLevel={user.accessLevel}
                  onProceedToHome={() => {
                    setPatientView('home');
                    setActiveTab('home');
                  }}
                  onChangeDob={() => setPatientView('onboarding')}
                />
              )}

              {/* HOME SCREEN */}
              {patientView === 'home' && (
                <HomeScreen
                  accessLevel={user.accessLevel}
                  facilities={facilities}
                  medicines={medicines}
                  inventory={inventory}
                  onSelectMedicine={handleSelectMedicine}
                  onSelectFacility={handleSelectFacility}
                  onOpenSearch={(query) => {
                    setActiveTab('search');
                    setPatientView('search');
                  }}
                  onOpenMap={() => {
                    setActiveTab('map');
                    setPatientView('map');
                  }}
                  onOpenSafety={() => setPatientView('safety')}
                />
              )}

              {/* MEDICINE SEARCH SCREEN */}
              {patientView === 'search' && (
                <MedicineSearchScreen
                  medicines={medicines}
                  inventory={inventory}
                  accessLevel={user.accessLevel}
                  onSelectMedicine={handleSelectMedicine}
                  onSelectRestrictedMedicine={(med) => {
                    setSelectedMedicine(med);
                    setPatientView('restricted');
                  }}
                />
              )}

              {/* MEDICINE AVAILABILITY RESULTS SCREEN */}
              {patientView === 'results' && selectedMedicine && (
                <MedicineResultsScreen
                  medicine={selectedMedicine}
                  facilities={facilities}
                  inventory={inventory}
                  onViewFacility={handleSelectFacility}
                  onGetDirections={(fac) => setDirectionsFacility(fac)}
                  onViewMedicineInfo={(med) => setPatientView('medicine_details')}
                />
              )}

              {/* MEDICINE DETAILS SCREEN */}
              {patientView === 'medicine_details' && selectedMedicine && (
                <MedicineDetailsScreen
                  medicine={selectedMedicine}
                  facilities={facilities}
                  inventory={inventory}
                  onViewResults={() => setPatientView('results')}
                  onSelectFacility={handleSelectFacility}
                  onContactPharmacist={() => {
                    alert('Connecting to Lusaka Pharmacist Advice Line (+260 211 261 400)...');
                  }}
                />
              )}

              {/* RESTRICTED MEDICINE SCREEN (Section 8) */}
              {patientView === 'restricted' && selectedMedicine && (
                <RestrictedMedicineScreen
                  medicine={selectedMedicine}
                  accessLevel={user.accessLevel}
                  onContactPharmacist={() => {
                    alert('Connecting with Licensed Pharmacist for prescription verification...');
                  }}
                  onFindFacilities={() => setPatientView('results')}
                  onViewSafetyInfo={() => setPatientView('safety')}
                  onBack={() => setPatientView('search')}
                />
              )}

              {/* FACILITY PROFILE SCREEN */}
              {patientView === 'facility_details' && selectedFacility && (
                <FacilityDetailsScreen
                  facility={selectedFacility}
                  medicines={medicines}
                  inventory={inventory}
                  isSaved={user.savedFacilities.includes(selectedFacility.id)}
                  onToggleSave={() => handleToggleSaveFacility(selectedFacility.id)}
                  onSelectMedicine={handleSelectMedicine}
                  onGetDirections={() => setDirectionsFacility(selectedFacility)}
                  onCall={() => alert(`Calling ${selectedFacility.name} at ${selectedFacility.phone}...`)}
                />
              )}

              {/* MAP SCREEN */}
              {patientView === 'map' && (
                <MapScreen
                  facilities={facilities}
                  inventory={inventory}
                  selectedMedicine={selectedMedicine}
                  onSelectFacility={handleSelectFacility}
                  onGetDirections={(fac) => setDirectionsFacility(fac)}
                />
              )}

              {/* SAVED ITEMS SCREEN */}
              {patientView === 'saved' && (
                <SavedScreen
                  savedFacilityIds={user.savedFacilities}
                  facilities={facilities}
                  medicines={medicines}
                  inventory={inventory}
                  onSelectFacility={handleSelectFacility}
                  onSelectMedicine={handleSelectMedicine}
                  onRemoveSavedFacility={handleToggleSaveFacility}
                />
              )}

              {/* PROFILE SCREEN */}
              {patientView === 'profile' && (
                <ProfileScreen
                  user={user}
                  facilities={facilities}
                  medicines={medicines}
                  onToggleAccessLevel={(newLevel) => {
                    setUser(prev => ({
                      ...prev,
                      accessLevel: newLevel,
                      age: newLevel === 'Adult' ? 28 : 15
                    }));
                  }}
                  onOpenSavedFacilities={() => {
                    setActiveTab('saved');
                    setPatientView('saved');
                  }}
                  onOpenNotifications={() => setPatientView('notifications')}
                  onOpenSafetySettings={() => setPatientView('safety')}
                  onResetOnboarding={() => setPatientView('splash')}
                  onSelectFacility={handleSelectFacility}
                />
              )}

              {/* NOTIFICATIONS SCREEN */}
              {patientView === 'notifications' && (
                <NotificationsScreen
                  onBack={() => setPatientView('home')}
                />
              )}

              {/* SAFETY & PRIVACY CENTER */}
              {patientView === 'safety' && (
                <SafetyPrivacyCenter
                  accessLevel={user.accessLevel}
                  onOpenReport={() => setPatientView('report')}
                />
              )}

              {/* REPORT INCORRECT INFORMATION FORM */}
              {patientView === 'report' && (
                <ReportIncorrectScreen
                  facilities={facilities}
                  medicines={medicines}
                  defaultFacility={selectedFacility}
                  defaultMedicine={selectedMedicine}
                  onBack={() => setPatientView('home')}
                  onSubmitReport={handleSubmitReport}
                />
              )}

              {/* EMPTY AND ERROR STATES DEMO (Section 19) */}
              {patientView === 'empty_states' && (
                <EmptyStatesDemo
                  onBack={() => setPatientView('home')}
                />
              )}
            </div>

            {/* Bottom Tab Navigation */}
            {isNavVisible && (
              <BottomNav
                activeTab={activeTab}
                onTabChange={handleTabChange}
                savedCount={user.savedFacilities.length}
              />
            )}
          </div>
        ) : role === 'pharmacy' ? (
          /* FLOW 2: PHARMACY STAFF DASHBOARD */
          <div className="w-full bg-white rounded-3xl shadow-sm border border-neutral-200 overflow-hidden">
            <PharmacyDashboard
              facilities={facilities}
              medicines={medicines}
              inventory={inventory}
              currentFacilityId={pharmacyFacilityId}
              onFacilityChange={setPharmacyFacilityId}
              onUpdateInventory={handleUpdateInventory}
            />
          </div>
        ) : (
          /* FLOW 3: ADMIN VERIFICATION & OVERSIGHT PORTAL */
          <div className="w-full bg-white rounded-3xl shadow-sm border border-neutral-200 overflow-hidden">
            <AdminDashboard
              facilities={facilities}
              medicines={medicines}
              inventory={inventory}
              verifications={verifications}
              reports={reports}
              onApproveFacility={handleApproveFacility}
              onRequestVerification={handleRequestVerification}
              onDeactivateFacility={handleDeactivateFacility}
              onResolveReport={handleResolveReport}
            />
          </div>
        )}

        {/* Global Directions Modal */}
        {directionsFacility && (
          <DirectionsModal
            facility={directionsFacility}
            onClose={() => setDirectionsFacility(null)}
          />
        )}
      </main>
    </div>
  );
}
