import { Facility, Medicine, FacilityInventoryItem, VerificationRecord, DiscrepancyReport } from '../types';

export const INITIAL_FACILITIES: Facility[] = [
  {
    id: 'fac-woodlands',
    name: 'Woodlands Community Pharmacy',
    type: 'Retail Pharmacy',
    address: 'Plot 104, Mosi-o-Tunya Road, Woodlands',
    area: 'Woodlands',
    district: 'Lusaka',
    phone: '+260 211 261 400',
    openingHours: '08:00 – 20:00 (Mon–Sun)',
    isOpenNow: true,
    distanceKm: 2.4,
    latitude: -15.4418,
    longitude: 28.3475,
    isVerified: true,
    zamraLicence: 'ZAMRA/PR/2024/0842',
    rating: 4.8
  },
  {
    id: 'fac-cairo',
    name: 'Cairo Road Central Chemist',
    type: 'Retail Pharmacy',
    address: 'Shop 14, Central Arcade, Cairo Road',
    area: 'Cairo Road',
    district: 'Lusaka',
    phone: '+260 211 224 810',
    openingHours: '07:30 – 19:00 (Mon–Sat)',
    isOpenNow: true,
    distanceKm: 3.8,
    latitude: -15.4190,
    longitude: 28.2831,
    isVerified: true,
    zamraLicence: 'ZAMRA/PR/2023/1109',
    rating: 4.6
  },
  {
    id: 'fac-kabulonga',
    name: 'Kabulonga Care Pharmacy',
    type: 'Retail Pharmacy',
    address: 'Centro Mall, Kabulonga Road',
    area: 'Kabulonga',
    district: 'Lusaka',
    phone: '+260 211 265 190',
    openingHours: '08:00 – 21:00 (Daily)',
    isOpenNow: true,
    distanceKm: 4.1,
    latitude: -15.4262,
    longitude: 28.3614,
    isVerified: true,
    zamraLicence: 'ZAMRA/PR/2024/0321',
    rating: 4.9
  },
  {
    id: 'fac-ridgeway',
    name: 'Ridgeway Dispensary & Clinic',
    type: 'Hospital Dispensary',
    address: 'Nationalist Road, Opp. UTH Teaching Complex',
    area: 'Ridgeway',
    district: 'Lusaka',
    phone: '+260 211 251 200',
    openingHours: '24 Hours Emergency Service',
    isOpenNow: true,
    distanceKm: 5.2,
    latitude: -15.4335,
    longitude: 28.3120,
    isVerified: true,
    zamraLicence: 'ZAMRA/HD/2022/0115',
    rating: 4.7
  },
  {
    id: 'fac-northmead',
    name: 'Northmead Health Chemist',
    type: 'Community Dispensary',
    address: 'Great East Road, Northmead Shopping Complex',
    area: 'Northmead',
    district: 'Lusaka',
    phone: '+260 211 292 411',
    openingHours: '08:00 – 19:30 (Mon–Sat)',
    isOpenNow: true,
    distanceKm: 4.9,
    latitude: -15.4020,
    longitude: 28.3050,
    isVerified: true,
    zamraLicence: 'ZAMRA/PR/2023/0789',
    rating: 4.5
  },
  {
    id: 'fac-chelstone',
    name: 'Chelstone Family Pharmacy',
    type: 'Retail Pharmacy',
    address: 'Palm Drive, Chelstone Green Market',
    area: 'Chelstone',
    district: 'Lusaka',
    phone: '+260 211 281 905',
    openingHours: '08:00 – 18:30 (Mon–Sat)',
    isOpenNow: false,
    distanceKm: 8.7,
    latitude: -15.3780,
    longitude: 28.3980,
    isVerified: true,
    zamraLicence: 'ZAMRA/PR/2024/1045',
    rating: 4.4
  }
];

export const INITIAL_MEDICINES: Medicine[] = [
  {
    id: 'med-amox-500',
    name: 'Amoxicillin',
    brandName: 'Amoxil / Generic',
    genericName: 'Amoxicillin Trihydrate',
    strength: '500mg',
    form: 'Capsules',
    category: 'Antibiotic',
    isRestricted: false,
    generalDescription: 'A broad-spectrum penicillin antibiotic widely utilized under prescription for susceptible bacterial infections.',
    activeIngredients: 'Amoxicillin trihydrate equivalent to 500mg amoxicillin',
    therapeuticClass: 'Beta-lactam Antibacterials',
    safetyAdvisory: 'Complete full course as prescribed by a licensed clinician to prevent antimicrobial resistance. Not for viral illnesses such as the common cold or flu.'
  },
  {
    id: 'med-amox-250',
    name: 'Amoxicillin',
    brandName: 'Generic',
    genericName: 'Amoxicillin Trihydrate',
    strength: '250mg',
    form: 'Capsules',
    category: 'Antibiotic',
    isRestricted: false,
    generalDescription: 'Lower-strength broad-spectrum aminopenicillin formulation indicated for diagnosed bacterial infections.',
    activeIngredients: 'Amoxicillin trihydrate 250mg',
    therapeuticClass: 'Beta-lactam Antibacterials',
    safetyAdvisory: 'Requires professional medical assessment and prescription. Take at evenly spaced intervals.'
  },
  {
    id: 'med-amox-susp',
    name: 'Amoxicillin Oral Suspension',
    brandName: 'Amoxil Paediatric',
    genericName: 'Amoxicillin Trihydrate',
    strength: '125mg/5ml',
    form: 'Suspension',
    category: 'Antibiotic',
    isRestricted: false,
    generalDescription: 'Paediatric liquid antibacterial formulation prepared by reconstitution with clean boiled water.',
    activeIngredients: 'Amoxicillin 125mg per 5ml measure',
    therapeuticClass: 'Beta-lactam Antibacterials',
    safetyAdvisory: 'Shake bottle vigorously prior to each measured dose. Keep refrigerated once reconstituted and discard after 7 to 10 days.'
  },
  {
    id: 'med-paracetamol-500',
    name: 'Paracetamol',
    brandName: 'Panadol / Generic',
    genericName: 'Paracetamol (Acetaminophen)',
    strength: '500mg',
    form: 'Tablets',
    category: 'Analgesic',
    isRestricted: false,
    generalDescription: 'Standard non-opioid analgesic and antipyretic for mild-to-moderate aches, headaches, and elevated temperature.',
    activeIngredients: 'Paracetamol 500mg',
    therapeuticClass: 'Anilide Analgesics',
    safetyAdvisory: 'Never exceed 4000mg (8 tablets) within 24 hours. Do not combine with other preparations containing paracetamol to prevent acute liver toxicity.'
  },
  {
    id: 'med-ors',
    name: 'Oral Rehydration Salts (ORS)',
    brandName: 'WHO Standard ORS',
    genericName: 'Sodium chloride, glucose, potassium chloride, trisodium citrate',
    strength: '20.5g / Sachet',
    form: 'Oral Powder/Sachet',
    category: 'Electrolyte & Rehydration',
    isRestricted: false,
    generalDescription: 'Essential low-osmolarity oral rehydration formulation recommended by WHO/UNICEF for the management of dehydration.',
    activeIngredients: 'Sodium Chloride 2.6g, Glucose anhydrous 13.5g, Potassium Chloride 1.5g, Trisodium Citrate 2.9g',
    therapeuticClass: 'Electrolytes with Carbohydrates',
    safetyAdvisory: 'Dissolve exactly 1 sachet into 1 litre of clean safe drinking or boiled water. Discard unused prepared solution after 24 hours.'
  },
  {
    id: 'med-coartem',
    name: 'Artemether + Lumefantrine',
    brandName: 'Coartem',
    genericName: 'Artemether / Lumefantrine',
    strength: '20mg / 120mg',
    form: 'Tablets',
    category: 'Antimalarial',
    isRestricted: false,
    generalDescription: 'First-line Artemisinin-based Combination Therapy (ACT) recommended in Zambia for uncomplicated Plasmodium falciparum malaria.',
    activeIngredients: 'Artemether 20mg, Lumefantrine 120mg',
    therapeuticClass: 'Antimalarial Agents',
    safetyAdvisory: 'Confirm malaria diagnosis via RDT (Rapid Diagnostic Test) or blood microscopy before starting treatment. Take with a fatty meal or milk for optimal absorption.'
  },
  {
    id: 'med-ibuprofen-400',
    name: 'Ibuprofen',
    brandName: 'Brufen / Generic',
    genericName: 'Ibuprofen',
    strength: '400mg',
    form: 'Tablets',
    category: 'Analgesic',
    isRestricted: false,
    generalDescription: 'Non-steroidal anti-inflammatory drug (NSAID) used for inflammatory musculoskeletal conditions, dental pain, and dysmenorrhea.',
    activeIngredients: 'Ibuprofen 400mg',
    therapeuticClass: 'NSAIDs (Propionic acid derivatives)',
    safetyAdvisory: 'Take with or immediately after food. Avoid if you have active gastric ulceration, severe renal impairment, or known NSAID-induced asthma.'
  },
  {
    id: 'med-salbutamol',
    name: 'Salbutamol Inhaler',
    brandName: 'Ventolin Evohaler',
    genericName: 'Salbutamol Sulfate',
    strength: '100mcg / Dose',
    form: 'Inhaler',
    category: 'Respiratory',
    isRestricted: false,
    generalDescription: 'Short-acting beta-2 agonist (SABA) bronchodilator for rapid relief of acute bronchospasm in asthma and reversible airways obstruction.',
    activeIngredients: 'Salbutamol sulfate 100 micrograms per actuation (200 doses)',
    therapeuticClass: 'Selective Beta-2 Adrenoreceptor Agonists',
    safetyAdvisory: 'If symptoms persist or you require more than 8 puffs in 24 hours, seek emergency medical care at the nearest health center immediately.'
  },
  {
    id: 'med-metformin-500',
    name: 'Metformin',
    brandName: 'Glucophage / Generic',
    genericName: 'Metformin Hydrochloride',
    strength: '500mg',
    form: 'Tablets',
    category: 'Endocrine',
    isRestricted: false,
    generalDescription: 'Biguanide antihyperglycemic agent for the management of type 2 diabetes mellitus as adjunct to diet and exercise.',
    activeIngredients: 'Metformin hydrochloride 500mg',
    therapeuticClass: 'Biguanides',
    safetyAdvisory: 'Requires periodic monitoring of renal function and blood glucose. Take with meals to reduce gastrointestinal discomfort.'
  },
  // RESTRICTED MEDICINES:
  {
    id: 'med-tramadol-50',
    name: 'Tramadol Hydrochloride',
    brandName: 'Ultram / Generic',
    genericName: 'Tramadol Hydrochloride',
    strength: '50mg',
    form: 'Capsules',
    category: 'Controlled',
    isRestricted: true,
    restrictionReason: 'Controlled substance subject to strict national prescription regulations due to abuse, dependence, and respiratory depression risks.',
    generalDescription: 'Centrally-acting opioid analgesic indicated only for moderate to severe pain unresponsive to non-opioid medications.',
    activeIngredients: 'Tramadol Hydrochloride 50mg',
    therapeuticClass: 'Centrally Acting Opioid Analgesics',
    safetyAdvisory: 'Controlled substance. Dispensed exclusively on an authentic stamped prescription from a registered medical practitioner.'
  },
  {
    id: 'med-codeine-linctus',
    name: 'Codeine Linctus',
    brandName: 'Codeine Pediatric/Adult',
    genericName: 'Codeine Phosphate',
    strength: '15mg/5ml',
    form: 'Syrup',
    category: 'Controlled',
    isRestricted: true,
    restrictionReason: 'Restricted opioid antitussive. Regulated by ZAMRA under controlled medicine statutory schedules.',
    generalDescription: 'Opioid cough suppressant indicated solely for dry, non-productive cough under clinical direction.',
    activeIngredients: 'Codeine phosphate 15mg per 5ml',
    therapeuticClass: 'Opioid Cough Suppressants',
    safetyAdvisory: 'Strictly prohibited for self-medication in children and adolescents. Dispensing requires registered pharmacist verification.'
  },
  {
    id: 'med-morphine-10',
    name: 'Morphine Sulfate Oral Solution',
    brandName: 'Oramorph',
    genericName: 'Morphine Sulfate',
    strength: '10mg/5ml',
    form: 'Oral Powder/Sachet',
    category: 'Controlled',
    isRestricted: true,
    restrictionReason: 'Schedule 1 Controlled Substance requiring authorized dangerous drugs registers and hospital specialist prescription.',
    generalDescription: 'Strong opioid analgesic reserved for severe chronic pain management, palliative care, and acute post-operative trauma.',
    activeIngredients: 'Morphine Sulfate 10mg per 5ml',
    therapeuticClass: 'Strong Opioid Agonists',
    safetyAdvisory: 'Hospital and specialist dispensary distribution only. Must never be shared or stored where minors could access.'
  }
];

export const INITIAL_INVENTORY: FacilityInventoryItem[] = [
  // Woodlands Community Pharmacy
  {
    id: 'inv-1',
    facilityId: 'fac-woodlands',
    medicineId: 'med-amox-500',
    status: 'Available',
    quantityOptional: 45,
    unit: 'boxes',
    lastUpdatedMinutesAgo: 12,
    lastUpdatedDate: 'Today, 15:23',
    updatedBy: 'Pharmacist Mwamba'
  },
  {
    id: 'inv-2',
    facilityId: 'fac-woodlands',
    medicineId: 'med-amox-250',
    status: 'Available',
    quantityOptional: 30,
    unit: 'boxes',
    lastUpdatedMinutesAgo: 14,
    lastUpdatedDate: 'Today, 15:21',
    updatedBy: 'Pharmacist Mwamba'
  },
  {
    id: 'inv-3',
    facilityId: 'fac-woodlands',
    medicineId: 'med-amox-susp',
    status: 'Low stock',
    quantityOptional: 4,
    unit: 'bottles',
    lastUpdatedMinutesAgo: 15,
    lastUpdatedDate: 'Today, 15:20',
    updatedBy: 'Pharmacist Mwamba'
  },
  {
    id: 'inv-4',
    facilityId: 'fac-woodlands',
    medicineId: 'med-paracetamol-500',
    status: 'Available',
    quantityOptional: 120,
    unit: 'packs',
    lastUpdatedMinutesAgo: 10,
    lastUpdatedDate: 'Today, 15:25',
    updatedBy: 'Pharmacist Mwamba'
  },
  {
    id: 'inv-5',
    facilityId: 'fac-woodlands',
    medicineId: 'med-ors',
    status: 'Available',
    quantityOptional: 85,
    unit: 'sachets',
    lastUpdatedMinutesAgo: 18,
    lastUpdatedDate: 'Today, 15:17',
    updatedBy: 'Pharmacist Mwamba'
  },
  {
    id: 'inv-6',
    facilityId: 'fac-woodlands',
    medicineId: 'med-coartem',
    status: 'Available',
    quantityOptional: 50,
    unit: 'courses',
    lastUpdatedMinutesAgo: 22,
    lastUpdatedDate: 'Today, 15:13',
    updatedBy: 'Pharmacist Mwamba'
  },
  {
    id: 'inv-7',
    facilityId: 'fac-woodlands',
    medicineId: 'med-ibuprofen-400',
    status: 'Low stock',
    quantityOptional: 8,
    unit: 'boxes',
    lastUpdatedMinutesAgo: 25,
    lastUpdatedDate: 'Today, 15:10',
    updatedBy: 'Pharmacist Mwamba'
  },

  // Cairo Road Central Chemist
  {
    id: 'inv-8',
    facilityId: 'fac-cairo',
    medicineId: 'med-amox-500',
    status: 'Low stock',
    quantityOptional: 6,
    unit: 'boxes',
    lastUpdatedMinutesAgo: 35,
    lastUpdatedDate: 'Today, 15:00',
    updatedBy: 'Pharm Tech Chanda'
  },
  {
    id: 'inv-9',
    facilityId: 'fac-cairo',
    medicineId: 'med-paracetamol-500',
    status: 'Available',
    quantityOptional: 95,
    unit: 'packs',
    lastUpdatedMinutesAgo: 28,
    lastUpdatedDate: 'Today, 15:07',
    updatedBy: 'Pharm Tech Chanda'
  },
  {
    id: 'inv-10',
    facilityId: 'fac-cairo',
    medicineId: 'med-salbutamol',
    status: 'Available',
    quantityOptional: 22,
    unit: 'inhalers',
    lastUpdatedMinutesAgo: 40,
    lastUpdatedDate: 'Today, 14:55',
    updatedBy: 'Pharm Tech Chanda'
  },
  {
    id: 'inv-11',
    facilityId: 'fac-cairo',
    medicineId: 'med-ors',
    status: 'Available',
    quantityOptional: 40,
    unit: 'sachets',
    lastUpdatedMinutesAgo: 32,
    lastUpdatedDate: 'Today, 15:03',
    updatedBy: 'Pharm Tech Chanda'
  },

  // Kabulonga Care Pharmacy
  {
    id: 'inv-12',
    facilityId: 'fac-kabulonga',
    medicineId: 'med-amox-500',
    status: 'Available',
    quantityOptional: 60,
    unit: 'boxes',
    lastUpdatedMinutesAgo: 45,
    lastUpdatedDate: 'Today, 14:50',
    updatedBy: 'Pharmacist Phiri'
  },
  {
    id: 'inv-13',
    facilityId: 'fac-kabulonga',
    medicineId: 'med-coartem',
    status: 'Available',
    quantityOptional: 40,
    unit: 'courses',
    lastUpdatedMinutesAgo: 50,
    lastUpdatedDate: 'Today, 14:45',
    updatedBy: 'Pharmacist Phiri'
  },
  {
    id: 'inv-14',
    facilityId: 'fac-kabulonga',
    medicineId: 'med-metformin-500',
    status: 'Available',
    quantityOptional: 35,
    unit: 'boxes',
    lastUpdatedMinutesAgo: 52,
    lastUpdatedDate: 'Today, 14:43',
    updatedBy: 'Pharmacist Phiri'
  },

  // Ridgeway Dispensary & Clinic (Hospital)
  {
    id: 'inv-15',
    facilityId: 'fac-ridgeway',
    medicineId: 'med-amox-500',
    status: 'Not recently confirmed',
    quantityOptional: undefined,
    lastUpdatedMinutesAgo: 240, // 4 hours ago
    lastUpdatedDate: 'Today, 11:35',
    updatedBy: 'Dispensary Shift Lead'
  },
  {
    id: 'inv-16',
    facilityId: 'fac-ridgeway',
    medicineId: 'med-paracetamol-500',
    status: 'Available',
    quantityOptional: 200,
    unit: 'packs',
    lastUpdatedMinutesAgo: 65,
    lastUpdatedDate: 'Today, 14:30',
    updatedBy: 'Dispensary Shift Lead'
  },
  {
    id: 'inv-17',
    facilityId: 'fac-ridgeway',
    medicineId: 'med-morphine-10',
    status: 'Available',
    quantityOptional: 15,
    unit: 'vials',
    lastUpdatedMinutesAgo: 180,
    lastUpdatedDate: 'Today, 12:35',
    updatedBy: 'Clinical Pharmacist Lungu'
  },
  {
    id: 'inv-18',
    facilityId: 'fac-ridgeway',
    medicineId: 'med-tramadol-50',
    status: 'Available',
    quantityOptional: 28,
    unit: 'boxes',
    lastUpdatedMinutesAgo: 90,
    lastUpdatedDate: 'Today, 14:05',
    updatedBy: 'Clinical Pharmacist Lungu'
  },

  // Northmead Health Chemist
  {
    id: 'inv-19',
    facilityId: 'fac-northmead',
    medicineId: 'med-amox-500',
    status: 'Out of stock',
    quantityOptional: 0,
    unit: 'boxes',
    lastUpdatedMinutesAgo: 70,
    lastUpdatedDate: 'Today, 14:25',
    updatedBy: 'Pharmacist Bwalya'
  },
  {
    id: 'inv-20',
    facilityId: 'fac-northmead',
    medicineId: 'med-ors',
    status: 'Available',
    quantityOptional: 75,
    unit: 'sachets',
    lastUpdatedMinutesAgo: 75,
    lastUpdatedDate: 'Today, 14:20',
    updatedBy: 'Pharmacist Bwalya'
  }
];

export const INITIAL_VERIFICATIONS: VerificationRecord[] = [
  {
    id: 'ver-101',
    facilityName: 'Woodlands Community Pharmacy',
    facilityType: 'Retail Pharmacy',
    location: 'Woodlands, Lusaka',
    zamraNumber: 'ZAMRA/PR/2024/0842',
    contactPerson: 'Dr. Mwamba Chilufya, BPharm',
    phone: '+260 211 261 400',
    email: 'dispensary@woodlandspharmacy.co.zm',
    submittedDate: '12 Jan 2026',
    status: 'Verified',
    documents: [
      { name: 'ZAMRA Annual Premise Licence', status: 'Verified' },
      { name: 'Pharmacist Practicing Certificate (HPCZ)', status: 'Verified' },
      { name: 'Certificate of Incorporation (PACRA)', status: 'Verified' }
    ]
  },
  {
    id: 'ver-102',
    facilityName: 'Kabulonga Care Pharmacy',
    facilityType: 'Retail Pharmacy',
    location: 'Kabulonga, Lusaka',
    zamraNumber: 'ZAMRA/PR/2024/0321',
    contactPerson: 'Mrs. Cynthia Phiri, MPharm',
    phone: '+260 211 265 190',
    email: 'info@kabulongacare.co.zm',
    submittedDate: '18 Feb 2026',
    status: 'Verified',
    documents: [
      { name: 'ZAMRA Annual Premise Licence', status: 'Verified' },
      { name: 'HPCZ Retention Certificate', status: 'Verified' }
    ]
  },
  {
    id: 'ver-103',
    facilityName: 'Matero East Community Dispensary',
    facilityType: 'Community Dispensary',
    location: 'Matero, Lusaka',
    zamraNumber: 'ZAMRA/PR/2026/PENDING',
    contactPerson: 'Mr. Patrick Zulu',
    phone: '+260 977 410 998',
    email: 'materoeastdispensary@gmail.com',
    submittedDate: '20 Sep 2026',
    status: 'Pending',
    documents: [
      { name: 'ZAMRA Inspection Receipt', status: 'Pending' },
      { name: 'Superintendent Pharmacist Credentials', status: 'Pending' }
    ]
  },
  {
    id: 'ver-104',
    facilityName: 'Chilenje Express Chemist',
    facilityType: 'Retail Pharmacy',
    location: 'Chilenje South, Lusaka',
    zamraNumber: 'ZAMRA/PR/2025/0912',
    contactPerson: 'Ms. Tamara Banda',
    phone: '+260 966 820 144',
    email: 'chilenje.chemist@health.zm',
    submittedDate: '15 Sep 2026',
    status: 'Needs Review',
    documents: [
      { name: 'Premise Renewal Certificate', status: 'Rejected' },
      { name: 'HPCZ Renewal Notice', status: 'Pending' }
    ]
  }
];

export const INITIAL_REPORTS: DiscrepancyReport[] = [
  {
    id: 'rep-01',
    facilityName: 'Cairo Road Central Chemist',
    medicineName: 'Amoxicillin 500mg',
    problemType: 'Medicine unavailable',
    comment: 'Visited at 15:10, staff mentioned stock ran out 10 minutes prior.',
    reportedAt: '15:14 Today',
    status: 'Investigating'
  },
  {
    id: 'rep-02',
    facilityName: 'Ridgeway Dispensary & Clinic',
    medicineName: 'Amoxicillin 500mg',
    problemType: 'Incorrect medicine information',
    comment: 'Listing showed 500mg capsules but dispensary only carries 250mg tablets.',
    reportedAt: '13:40 Today',
    status: 'Resolved'
  }
];
