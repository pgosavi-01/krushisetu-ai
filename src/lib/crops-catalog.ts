import type { Lang } from "./i18n";
import type { CropKey } from "./data";

export type CropCategory =
  | "cereals"
  | "pulses"
  | "oilseeds"
  | "cash"
  | "vegetables"
  | "fruits"
  | "spices"
  | "plantation"
  | "other";

export interface CropOption {
  /** Stable id stored in the farmer profile. */
  id: string;
  en: string;
  mr: string;
  hi: string;
  category: CropCategory;
  /** Existing crop guide used as the base for guidance and advice. */
  base: CropKey;
}

export const CROP_CATEGORY_LABEL: Record<CropCategory, { en: string; mr: string; hi: string }> = {
  cereals: { en: "Cereals", mr: "तृणधान्ये", hi: "अनाज" },
  pulses: { en: "Pulses", mr: "कडधान्ये", hi: "दालें" },
  oilseeds: { en: "Oilseeds", mr: "तेलबिया", hi: "तिलहन" },
  cash: { en: "Cash / Commercial crops", mr: "नगदी पिके", hi: "नकदी फसलें" },
  vegetables: { en: "Vegetables", mr: "भाजीपाला", hi: "सब्ज़ियाँ" },
  fruits: { en: "Fruits", mr: "फळे", hi: "फल" },
  spices: { en: "Spices", mr: "मसाले", hi: "मसाले" },
  plantation: { en: "Plantation / Other", mr: "बागायती / इतर", hi: "बागान / अन्य" },
  other: { en: "Other", mr: "इतर", hi: "अन्य" },
};

export const CROP_CATALOG: CropOption[] = [
  // Cereals
  { id: "rice", en: "Rice", mr: "भात", hi: "धान", category: "cereals", base: "rice" },
  { id: "wheat", en: "Wheat", mr: "गहू", hi: "गेहूँ", category: "cereals", base: "wheat" },
  { id: "maize", en: "Maize", mr: "मका", hi: "मक्का", category: "cereals", base: "wheat" },
  { id: "sorghum", en: "Sorghum (Jowar)", mr: "ज्वारी", hi: "ज्वार", category: "cereals", base: "wheat" },
  { id: "pearl-millet", en: "Pearl Millet (Bajra)", mr: "बाजरी", hi: "बाजरा", category: "cereals", base: "wheat" },
  { id: "finger-millet", en: "Finger Millet (Ragi)", mr: "नाचणी", hi: "रागी", category: "cereals", base: "wheat" },
  { id: "barley", en: "Barley", mr: "जव", hi: "जौ", category: "cereals", base: "wheat" },
  { id: "oats", en: "Oats", mr: "ओट्स", hi: "जई", category: "cereals", base: "wheat" },

  // Pulses
  { id: "chickpea", en: "Chickpea (Chana)", mr: "हरभरा", hi: "चना", category: "pulses", base: "soybean" },
  { id: "pigeon-pea", en: "Pigeon Pea (Tur/Arhar)", mr: "तूर", hi: "अरहर (तूर)", category: "pulses", base: "soybean" },
  { id: "green-gram", en: "Green Gram (Moong)", mr: "मूग", hi: "मूंग", category: "pulses", base: "soybean" },
  { id: "black-gram", en: "Black Gram (Urad)", mr: "उडीद", hi: "उड़द", category: "pulses", base: "soybean" },
  { id: "lentil", en: "Lentil (Masoor)", mr: "मसूर", hi: "मसूर", category: "pulses", base: "soybean" },
  { id: "field-pea", en: "Field Pea", mr: "वाटाणा", hi: "मटर", category: "pulses", base: "soybean" },
  { id: "cowpea", en: "Cowpea", mr: "चवळी", hi: "लोबिया", category: "pulses", base: "soybean" },

  // Oilseeds
  { id: "soybean", en: "Soybean", mr: "सोयाबीन", hi: "सोयाबीन", category: "oilseeds", base: "soybean" },
  { id: "groundnut", en: "Groundnut", mr: "भुईमूग", hi: "मूंगफली", category: "oilseeds", base: "soybean" },
  { id: "sunflower", en: "Sunflower", mr: "सूर्यफूल", hi: "सूरजमुखी", category: "oilseeds", base: "soybean" },
  { id: "sesame", en: "Sesame", mr: "तीळ", hi: "तिल", category: "oilseeds", base: "soybean" },
  { id: "mustard", en: "Mustard", mr: "मोहरी", hi: "सरसों", category: "oilseeds", base: "soybean" },
  { id: "rapeseed", en: "Rapeseed", mr: "राई", hi: "तोरिया", category: "oilseeds", base: "soybean" },
  { id: "safflower", en: "Safflower", mr: "करडई", hi: "कुसुम", category: "oilseeds", base: "soybean" },
  { id: "castor", en: "Castor", mr: "एरंड", hi: "अरंडी", category: "oilseeds", base: "soybean" },
  { id: "linseed", en: "Linseed", mr: "जवस", hi: "अलसी", category: "oilseeds", base: "soybean" },

  // Cash crops
  { id: "cotton", en: "Cotton", mr: "कापूस", hi: "कपास", category: "cash", base: "cotton" },
  { id: "sugarcane", en: "Sugarcane", mr: "ऊस", hi: "गन्ना", category: "cash", base: "cotton" },
  { id: "jute", en: "Jute", mr: "ताग", hi: "जूट", category: "cash", base: "cotton" },
  { id: "tobacco", en: "Tobacco", mr: "तंबाखू", hi: "तंबाकू", category: "cash", base: "cotton" },

  // Vegetables
  { id: "onion", en: "Onion", mr: "कांदा", hi: "प्याज", category: "vegetables", base: "onion" },
  { id: "potato", en: "Potato", mr: "बटाटा", hi: "आलू", category: "vegetables", base: "onion" },
  { id: "tomato", en: "Tomato", mr: "टोमॅटो", hi: "टमाटर", category: "vegetables", base: "tomato" },
  { id: "brinjal", en: "Brinjal", mr: "वांगी", hi: "बैंगन", category: "vegetables", base: "tomato" },
  { id: "cabbage", en: "Cabbage", mr: "कोबी", hi: "पत्ता गोभी", category: "vegetables", base: "tomato" },
  { id: "cauliflower", en: "Cauliflower", mr: "फ्लॉवर", hi: "फूल गोभी", category: "vegetables", base: "tomato" },
  { id: "okra", en: "Okra (Bhindi)", mr: "भेंडी", hi: "भिंडी", category: "vegetables", base: "tomato" },
  { id: "chilli", en: "Chilli", mr: "मिरची", hi: "मिर्च", category: "vegetables", base: "tomato" },
  { id: "capsicum", en: "Capsicum", mr: "ढोबळी मिरची", hi: "शिमला मिर्च", category: "vegetables", base: "tomato" },
  { id: "carrot", en: "Carrot", mr: "गाजर", hi: "गाजर", category: "vegetables", base: "onion" },
  { id: "radish", en: "Radish", mr: "मुळा", hi: "मूली", category: "vegetables", base: "onion" },
  { id: "beetroot", en: "Beetroot", mr: "बीट", hi: "चुकंदर", category: "vegetables", base: "onion" },
  { id: "spinach", en: "Spinach", mr: "पालक", hi: "पालक", category: "vegetables", base: "tomato" },
  { id: "peas", en: "Peas", mr: "मटार", hi: "मटर", category: "vegetables", base: "soybean" },
  { id: "cucumber", en: "Cucumber", mr: "काकडी", hi: "खीरा", category: "vegetables", base: "tomato" },
  { id: "bottle-gourd", en: "Bottle Gourd", mr: "दुधी भोपळा", hi: "लौकी", category: "vegetables", base: "tomato" },
  { id: "bitter-gourd", en: "Bitter Gourd", mr: "कारले", hi: "करेला", category: "vegetables", base: "tomato" },
  { id: "ridge-gourd", en: "Ridge Gourd", mr: "दोडका", hi: "तोरई", category: "vegetables", base: "tomato" },
  { id: "pumpkin", en: "Pumpkin", mr: "भोपळा", hi: "कद्दू", category: "vegetables", base: "tomato" },

  // Fruits
  { id: "mango", en: "Mango", mr: "आंबा", hi: "आम", category: "fruits", base: "tomato" },
  { id: "banana", en: "Banana", mr: "केळी", hi: "केला", category: "fruits", base: "tomato" },
  { id: "grapes", en: "Grapes", mr: "द्राक्षे", hi: "अंगूर", category: "fruits", base: "tomato" },
  { id: "orange", en: "Orange", mr: "संत्री", hi: "संतरा", category: "fruits", base: "tomato" },
  { id: "pomegranate", en: "Pomegranate", mr: "डाळिंब", hi: "अनार", category: "fruits", base: "tomato" },
  { id: "guava", en: "Guava", mr: "पेरू", hi: "अमरूद", category: "fruits", base: "tomato" },
  { id: "papaya", en: "Papaya", mr: "पपई", hi: "पपीता", category: "fruits", base: "tomato" },
  { id: "watermelon", en: "Watermelon", mr: "कलिंगड", hi: "तरबूज", category: "fruits", base: "tomato" },
  { id: "muskmelon", en: "Muskmelon", mr: "खरबूज", hi: "खरबूजा", category: "fruits", base: "tomato" },
  { id: "apple", en: "Apple", mr: "सफरचंद", hi: "सेब", category: "fruits", base: "tomato" },
  { id: "grapefruit", en: "Grapefruit", mr: "ग्रेपफ्रूट", hi: "चकोतरा", category: "fruits", base: "tomato" },
  { id: "lemon", en: "Lemon", mr: "लिंबू", hi: "नींबू", category: "fruits", base: "tomato" },
  { id: "sapota", en: "Sapota (Chikoo)", mr: "चिकू", hi: "चीकू", category: "fruits", base: "tomato" },
  { id: "custard-apple", en: "Custard Apple", mr: "सीताफळ", hi: "सीताफल", category: "fruits", base: "tomato" },

  // Spices
  { id: "turmeric", en: "Turmeric", mr: "हळद", hi: "हल्दी", category: "spices", base: "onion" },
  { id: "ginger", en: "Ginger", mr: "आले", hi: "अदरक", category: "spices", base: "onion" },
  { id: "garlic", en: "Garlic", mr: "लसूण", hi: "लहसुन", category: "spices", base: "onion" },
  { id: "coriander", en: "Coriander", mr: "कोथिंबीर", hi: "धनिया", category: "spices", base: "onion" },
  { id: "cumin", en: "Cumin", mr: "जिरे", hi: "जीरा", category: "spices", base: "wheat" },
  { id: "fenugreek", en: "Fenugreek", mr: "मेथी", hi: "मेथी", category: "spices", base: "wheat" },
  { id: "black-pepper", en: "Black Pepper", mr: "काळी मिरी", hi: "काली मिर्च", category: "spices", base: "tomato" },
  { id: "cardamom", en: "Cardamom", mr: "वेलची", hi: "इलायची", category: "spices", base: "tomato" },
  { id: "clove", en: "Clove", mr: "लवंग", hi: "लौंग", category: "spices", base: "tomato" },
  { id: "fennel", en: "Fennel", mr: "बडीशेप", hi: "सौंफ", category: "spices", base: "wheat" },

  // Plantation
  { id: "coconut", en: "Coconut", mr: "नारळ", hi: "नारियल", category: "plantation", base: "tomato" },
  { id: "tea", en: "Tea", mr: "चहा", hi: "चाय", category: "plantation", base: "tomato" },
  { id: "coffee", en: "Coffee", mr: "कॉफी", hi: "कॉफ़ी", category: "plantation", base: "tomato" },
  { id: "rubber", en: "Rubber", mr: "रबर", hi: "रबर", category: "plantation", base: "tomato" },
  { id: "cashew", en: "Cashew", mr: "काजू", hi: "काजू", category: "plantation", base: "tomato" },

  // Custom
  { id: "other", en: "Other / Custom Crop", mr: "इतर / स्वतःचे पीक", hi: "अन्य / कस्टम फसल", category: "other", base: "onion" },
];

export const CROP_BY_ID: Record<string, CropOption> = Object.fromEntries(
  CROP_CATALOG.map((c) => [c.id, c]),
);

export function cropName(lang: Lang, id: string, custom?: string): string {
  if (id === "other") return custom?.trim() || CROP_BY_ID["other"]![lang];
  const c = CROP_BY_ID[id];
  if (!c) return id;
  return c[lang];
}

/** Maps any catalog crop to one of the built-in crop guides. */
export function baseCropKey(id: string): CropKey {
  return CROP_BY_ID[id]?.base ?? "onion";
}
