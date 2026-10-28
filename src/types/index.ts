export type AccessLevel = 'Adult' | 'Restricted';

export type AvailabilityStatus = 'Available' | 'Low stock' | 'Not recently confirmed' | 'Out of stock';

export interface Facility {
  id: string;
  name: string;
  type: 'Retail Pharmacy' | 'Community Dispensary' | 'Hospital Dispensary' | 'Health Post Dispensary';
  address: string;
  area: 'Woodlands' | 'Kabulonga' | 'Northmead' | 'Cairo Road' | 'Ridgeway' | 'Chelstone' | 'Longacres' | 'Rhodes Park';
  district: string;
  phone: string;
  openingHours: string;
  isOpenNow: boolean;
  distanceKm: number;
  latitude: number;
  longitude: number;
  isVerified: boolean;
  zamraLicence: string;
  rating?: number;
}

export interface Medicine {
  id: string;
  name: string;
  brandName?: string;
  genericName: string;
  strength: string;
  form: 'Tablets' | 'Capsules' | 'Suspension' | 'Syrup' | 'Oral Powder/Sachet' | 'Inhaler' | 'Injection';
  category: 'Antibiotic' | 'Analgesic' | 'Antimalarial' | 'Electrolyte & Rehydration' | 'Respiratory' | 'Cardiovascular' | 'Endocrine' | 'Controlled';
  isRestricted: boolean;
  restrictionReason?: string;
  generalDescription: string;
  activeIngredients: string;
  therapeuticClass: string;
  safetyAdvisory: string;
}

export interface FacilityInventoryItem {
  id: string;
  facilityId: string;
  medicineId: string;
  status: AvailabilityStatus;
  quantityOptional?: number;
  unit?: string;
  lastUpdatedMinutesAgo: number;
  lastUpdatedDate: string;
  updatedBy?: string;
}

export interface VerificationRecord {
  id: string;
  facilityName: string;
  facilityType: string;
  location: string;
  zamraNumber: string;
  contactPerson: string;
  phone: string;
  email: string;
  submittedDate: string;
  status: 'Verified' | 'Pending' | 'Needs Review' | 'Deactivated';
  documents: {
    name: string;
    status: 'Verified' | 'Pending' | 'Rejected';
  }[];
}

export interface DiscrepancyReport {
  id: string;
  facilityName: string;
  medicineName: string;
  problemType: 'Medicine unavailable' | 'Incorrect medicine information' | 'Incorrect facility information' | 'Other';
  comment: string;
  reportedAt: string;
  status: 'Received' | 'Investigating' | 'Resolved';
}

export interface UserState {
  name: string;
  dateOfBirth: string;
  age: number | null;
  accessLevel: AccessLevel;
  locationPreference: string;
  hasCompletedOnboarding: boolean;
  savedFacilities: string[];
  savedMedicines: string[];
  recentSearches: string[];
}
