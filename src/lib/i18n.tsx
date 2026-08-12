import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "mr" | "hi";

type Dict = Record<string, string>;

const en: Dict = {
  brand: "KrushiSetu AI",
  tagline: "Smart Farming. Local Guidance. Better Decisions.",
  home: "Home",
  dashboard: "Dashboard",
  cropGuide: "Crop Guide",
  schemes: "Schemes",
  krushiAI: "Krushi AI",
  planner: "Farm Planner",
  getStarted: "Get Started",
  askAI: "Ask Krushi AI",
  profile: "Farmer Profile",
  goodMorning: "Good Morning",
  todaysAdvice: "Today's Farming Advice",
  whatToday: "What should I do today?",
  tasks: "Today's Farm Tasks",
  completed: "Tasks Completed",
  addTask: "Add task",
  save: "Save & Continue",
  location: "Location",
  land: "Land Size",
  crop: "Current Crop",
  season: "Season",
  viewDetails: "View Details",
  potentially: "Potentially suitable based on your profile.",
};

const mr: Dict = {
  brand: "कृषीसेतू AI",
  tagline: "स्मार्ट शेती. स्थानिक मार्गदर्शन. चांगले निर्णय.",
  home: "मुख्यपृष्ठ",
  dashboard: "डॅशबोर्ड",
  cropGuide: "पीक मार्गदर्शन",
  schemes: "योजना",
  krushiAI: "कृषी AI",
  planner: "शेती नियोजन",
  getStarted: "सुरू करा",
  askAI: "कृषी AI ला विचारा",
  profile: "शेतकरी प्रोफाइल",
  goodMorning: "सुप्रभात",
  todaysAdvice: "आजचा शेती सल्ला",
  whatToday: "आज मी काय करावे?",
  tasks: "आजची शेतीची कामे",
  completed: "कामे पूर्ण",
  addTask: "काम जोडा",
  save: "जतन करा",
  location: "ठिकाण",
  land: "जमीन",
  crop: "सध्याचे पीक",
  season: "हंगाम",
  viewDetails: "तपशील पहा",
  potentially: "तुमच्या प्रोफाइलनुसार संभाव्य उपयुक्त.",
};

const hi: Dict = {
  brand: "कृषिसेतु AI",
  tagline: "स्मार्ट खेती. स्थानीय मार्गदर्शन. बेहतर निर्णय.",
  home: "होम",
  dashboard: "डैशबोर्ड",
  cropGuide: "फसल मार्गदर्शन",
  schemes: "योजनाएँ",
  krushiAI: "कृषि AI",
  planner: "खेत योजना",
  getStarted: "शुरू करें",
  askAI: "कृषि AI से पूछें",
  profile: "किसान प्रोफ़ाइल",
  goodMorning: "सुप्रभात",
  todaysAdvice: "आज की खेती सलाह",
  whatToday: "आज मुझे क्या करना चाहिए?",
  tasks: "आज के खेत के काम",
  completed: "काम पूरे",
  addTask: "काम जोड़ें",
  save: "सहेजें",
  location: "स्थान",
  land: "ज़मीन",
  crop: "वर्तमान फसल",
  season: "मौसम",
  viewDetails: "विवरण देखें",
  potentially: "आपकी प्रोफ़ाइल के आधार पर संभावित उपयुक्त।",
};

const DICTS: Record<Lang, Dict> = { en, mr, hi };

export const LANG_LABELS: Record<Lang, string> = { en: "English", mr: "मराठी", hi: "हिंदी" };

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string }>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("ks_lang") as Lang | null;
    if (saved && DICTS[saved]) setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("ks_lang", l);
  };

  const t = (k: string) => DICTS[lang][k] ?? en[k] ?? k;

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
