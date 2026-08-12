export type CropKey = "onion" | "wheat" | "tomato" | "soybean" | "cotton" | "rice";

export interface CropGuide {
  key: CropKey;
  name: string;
  emoji: string;
  season: string;
  sowing: string;
  irrigation: string;
  fertilizer: string;
  pest: string;
  harvest: string;
}

export const CROPS: CropGuide[] = [
  {
    key: "onion",
    name: "Onion",
    emoji: "🧅",
    season: "Rabi / Kharif",
    sowing:
      "Prepare a fine, well-drained seedbed. Transplant 6-7 week old seedlings at 15 cm x 10 cm spacing. Best sowing window for Rabi onion is November to December.",
    irrigation:
      "Light irrigation every 7-10 days. Keep soil moist but never waterlogged. Stop irrigation 15-20 days before harvest so bulbs cure well.",
    fertilizer:
      "Apply well-rotted farmyard manure before planting. Give nitrogen in 2-3 split doses up to 45 days after transplanting. Sulphur improves bulb pungency and storage.",
    pest: "Watch for thrips (silvery streaks on leaves) and purple blotch. Inspect leaves twice a week and use recommended sprays only when damage is visible.",
    harvest:
      "Harvest when 50-70% of the tops fall over naturally. Cure bulbs in shade for 7-10 days before storage to reduce rotting.",
  },
  {
    key: "wheat",
    name: "Wheat",
    emoji: "🌾",
    season: "Rabi",
    sowing:
      "Sow between the first and third week of November at 5 cm depth with 20-22 cm row spacing. Use certified, treated seed.",
    irrigation:
      "The crown root stage (20-25 days after sowing) is the most critical irrigation. Usually 4-6 irrigations are needed depending on soil.",
    fertilizer:
      "Apply half the nitrogen and full phosphorus at sowing, and the rest of nitrogen with the first irrigation.",
    pest: "Look out for aphids in cool weather and yellow rust as orange-yellow stripes on leaves. Remove weeds early to avoid yield loss.",
    harvest:
      "Harvest when grains are hard and straw turns golden yellow, at roughly 20% grain moisture. Dry grain well before storage.",
  },
  {
    key: "tomato",
    name: "Tomato",
    emoji: "🍅",
    season: "All seasons",
    sowing:
      "Raise seedlings in a nursery and transplant after 25-30 days at 60 cm x 45 cm spacing. Stake plants to keep fruit off the soil.",
    irrigation:
      "Irrigate every 5-7 days. Drip irrigation gives the best results and reduces fungal disease.",
    fertilizer:
      "Add organic manure at planting. Give balanced nutrition during flowering and fruit setting. Calcium helps prevent blossom end rot.",
    pest: "Common problems are fruit borer, whitefly and early blight. Remove affected fruit and use pheromone traps for borer.",
    harvest:
      "Pick at the breaker or light red stage for distant markets, fully red for local sale. Harvest every 3-4 days.",
  },
  {
    key: "soybean",
    name: "Soybean",
    emoji: "🫘",
    season: "Kharif",
    sowing:
      "Sow with the onset of monsoon when 80-100 mm rainfall has been received. Use 45 cm row spacing and treat seed with rhizobium culture.",
    irrigation:
      "Mostly rainfed. Provide protective irrigation during pod filling if there is a long dry spell.",
    fertilizer:
      "Soybean fixes its own nitrogen. Focus on phosphorus, potash and sulphur at sowing.",
    pest: "Watch for girdle beetle, stem fly and leaf-eating caterpillars. Scout fields weekly in the first 45 days.",
    harvest:
      "Harvest when leaves turn yellow and drop and pods rattle. Avoid delay, as pods shatter easily.",
  },
  {
    key: "cotton",
    name: "Cotton",
    emoji: "🪴",
    season: "Kharif",
    sowing:
      "Sow in May-June with irrigation or with the first monsoon rains. Maintain recommended spacing for your variety.",
    irrigation:
      "Critical stages are flowering and boll development. Avoid water stress and also avoid waterlogging.",
    fertilizer:
      "Apply nitrogen in splits along with potash during boll formation for better boll weight.",
    pest: "Monitor pink bollworm with pheromone traps and follow refuge planting. Sucking pests appear early in the season.",
    harvest:
      "Pick clean, dry cotton in 3-4 pickings. Keep separate lots to maintain quality and price.",
  },
  {
    key: "rice",
    name: "Rice",
    emoji: "🌾",
    season: "Kharif",
    sowing:
      "Transplant 21-25 day old seedlings, 2-3 per hill, at 20 cm x 15 cm spacing in puddled fields.",
    irrigation:
      "Maintain 2-5 cm standing water up to the flowering stage. Alternate wetting and drying saves water without loss of yield.",
    fertilizer:
      "Apply nitrogen in three splits: basal, tillering and panicle initiation. Add zinc where deficiency is common.",
    pest: "Stem borer and leaf folder are common. Blast and bacterial blight appear in humid weather.",
    harvest:
      "Harvest when 80% of grains turn straw coloured. Dry grain to 14% moisture for safe storage.",
  },
];

export interface Scheme {
  id: string;
  name: string;
  description: string;
  benefits: string;
  eligibility: string;
  documents: string[];
  maxLand?: number;
  states?: string[];
  crops?: CropKey[];
}

export const SCHEMES: Scheme[] = [
  {
    id: "pm-kisan",
    name: "PM-KISAN Samman Nidhi",
    description:
      "Income support scheme for land-holding farmer families across India, paid directly into the bank account.",
    benefits: "₹6,000 per year in three equal instalments of ₹2,000.",
    eligibility: "Small and marginal land-holding farmer families, typically up to 2 hectares.",
    documents: ["Aadhaar card", "Land records (7/12 or equivalent)", "Bank passbook"],
    maxLand: 2,
  },
  {
    id: "pmfby",
    name: "Pradhan Mantri Fasal Bima Yojana",
    description:
      "Crop insurance scheme protecting farmers against yield loss due to natural calamities, pests and diseases.",
    benefits: "Insurance cover at a low premium: 2% for Kharif, 1.5% for Rabi crops.",
    eligibility: "All farmers growing notified crops in notified areas, including tenant farmers.",
    documents: ["Aadhaar card", "Land records", "Sowing certificate", "Bank passbook"],
  },
  {
    id: "soil-health",
    name: "Soil Health Card Scheme",
    description:
      "Provides a soil health card with nutrient status of your field and crop-wise fertilizer recommendations.",
    benefits: "Free soil testing and tailored fertilizer advice, reducing input cost.",
    eligibility: "All farmers with cultivable land.",
    documents: ["Aadhaar card", "Land records"],
  },
  {
    id: "pmksy",
    name: "PM Krishi Sinchayee Yojana (Per Drop More Crop)",
    description:
      "Support for micro-irrigation such as drip and sprinkler systems to improve water use efficiency.",
    benefits: "Subsidy of 45-55% on drip and sprinkler installation depending on farmer category.",
    eligibility: "Farmers with an assured water source, priority to small and marginal farmers.",
    documents: ["Aadhaar card", "Land records", "Water source proof", "Quotation from supplier"],
    crops: ["onion", "tomato", "cotton", "soybean"],
  },
  {
    id: "mahadbt-horti",
    name: "MahaDBT Horticulture Support (Maharashtra)",
    description:
      "State scheme supporting horticulture and vegetable growers with planting material, shade nets and storage.",
    benefits: "Subsidy on onion storage structures, nursery inputs and farm equipment.",
    eligibility: "Farmers registered on the MahaDBT portal in Maharashtra.",
    documents: ["Aadhaar card", "7/12 extract", "Bank passbook", "Caste certificate if applicable"],
    states: ["Maharashtra"],
    crops: ["onion", "tomato"],
  },
  {
    id: "kcc",
    name: "Kisan Credit Card",
    description:
      "Short-term institutional credit for crop production, post-harvest expenses and farm maintenance.",
    benefits: "Crop loan at 7% interest with 3% rebate on timely repayment.",
    eligibility: "All farmers, tenant farmers and sharecroppers with cultivation records.",
    documents: ["Aadhaar card", "Land records", "Passport photo", "Bank account details"],
  },
  {
    id: "enam",
    name: "e-NAM Online Market Access",
    description:
      "National online agricultural market connecting farmers to buyers across mandis for transparent price discovery.",
    benefits: "Better price realisation and direct online payment from buyers.",
    eligibility: "Farmers registered with a participating APMC mandi.",
    documents: ["Aadhaar card", "Bank passbook", "Mandi registration"],
  },
];

export function matchSchemes(profile: { state: string; land: number; crop: CropKey }) {
  return SCHEMES.filter((s) => {
    if (s.maxLand !== undefined && profile.land > s.maxLand) return false;
    if (s.states && !s.states.includes(profile.state)) return false;
    if (s.crops && !s.crops.includes(profile.crop)) return false;
    return true;
  });
}

export const STATES: Record<string, string[]> = {
  Maharashtra: ["Nashik", "Pune", "Nagpur", "Aurangabad", "Solapur", "Kolhapur"],
  Punjab: ["Ludhiana", "Amritsar", "Patiala", "Bathinda"],
  Karnataka: ["Belagavi", "Mysuru", "Hubballi", "Kalaburagi"],
  "Uttar Pradesh": ["Lucknow", "Meerut", "Varanasi", "Agra"],
  Gujarat: ["Rajkot", "Junagadh", "Surat", "Anand"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Ujjain", "Sagar"],
};

export const SEASONS = ["Rabi", "Kharif", "Zaid"] as const;

export const DEFAULT_TASKS = [
  "Check soil moisture",
  "Inspect crop",
  "Check irrigation requirement",
  "Review fertilizer schedule",
  "Inspect for pests",
];

export function todaysAdvice(crop: CropKey, season: string, district: string): string[] {
  const guide = CROPS.find((c) => c.key === crop)!;
  return [
    `Check soil moisture in your ${guide.name.toLowerCase()} field early in the morning before the heat rises.`,
    `Inspect leaves for early pest signs. ${guide.pest.split(".")[0]}.`,
    `Review your irrigation plan: ${guide.irrigation.split(".")[0].toLowerCase()}.`,
    `${season} weather around ${district} can change quickly — complete field work before noon and log today's farm task.`,
  ];
}

export const DEMO_AI_RESPONSES: { match: string[]; answer: string }[] = [
  {
    match: ["irrigat", "water", "पाणी", "सिंचन", "पानी"],
    answer:
      "For onion in Rabi season, give a light irrigation every 7-10 days. Keep the soil moist but never waterlogged, since standing water causes bulb rot. Stop irrigation 15-20 days before harvest so the bulbs cure properly and store longer. If you have drip irrigation, run it for shorter durations more frequently.",
  },
  {
    match: ["harvest", "काढणी", "कटाई"],
    answer:
      "Before harvesting, check three things: (1) about 50-70% of the tops have fallen over naturally, (2) the outer skin has turned papery, and (3) the weather forecast is dry for the next few days. Harvest in the morning, and cure the bulbs in shade for 7-10 days before storage.",
  },
  {
    match: ["scheme", "योजना", "subsidy", "अनुदान"],
    answer:
      "Based on a small holding in Maharashtra, PM-KISAN, PMFBY crop insurance, the Kisan Credit Card and the Per Drop More Crop micro-irrigation subsidy are commonly useful. Open the Schemes page to see the ones that match your profile. Always confirm official eligibility with your local agriculture office.",
  },
  {
    match: ["pest", "insect", "कीड", "कीट"],
    answer:
      "Scout your field twice a week, especially the underside of leaves. Thrips show up as silvery streaks on onion leaves; purple blotch appears as purple-brown spots. Use yellow or blue sticky traps for early detection and spray only when damage is actually visible, rotating the chemical group to avoid resistance.",
  },
  {
    match: ["fertiliz", "khat", "खत", "उर्वरक", "nutrient"],
    answer:
      "Start with well-rotted farmyard manure before planting. For onion, split the nitrogen into 2-3 doses up to 45 days after transplanting, and include sulphur for better pungency and storage life. Get a Soil Health Card so your dose matches your actual soil test rather than a general recommendation.",
  },
  {
    match: ["improve", "yield", "management", "उत्पादन", "व्यवस्थापन"],
    answer:
      "Four practical steps: (1) test your soil and follow the recommended dose instead of guessing, (2) switch to drip irrigation to save water and reduce disease, (3) keep a simple weekly record of sowing, spraying and irrigation, and (4) plan storage and staggered selling so you are not forced to sell at the lowest market price.",
  },
];

export function demoAnswer(question: string): string {
  const q = question.toLowerCase();
  const hit = DEMO_AI_RESPONSES.find((r) => r.match.some((m) => q.includes(m)));
  if (hit) return hit.answer;
  return "I can help with sowing, irrigation, fertilizer, pest management, harvesting and government schemes. Try asking something like \"How often should I irrigate my onion crop?\" or \"Which scheme may be useful for my farm?\". For field-specific problems, share your crop, its age in days and what you are seeing on the leaves.";
}
