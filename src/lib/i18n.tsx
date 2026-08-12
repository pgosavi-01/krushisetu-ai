import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "en" | "mr" | "hi";

type Dict = Record<string, string>;

export const LANG_STORAGE_KEY = "krushisetu_lang";

const en: Dict = {
  brand: "KrushiSetu AI",
  tagline: "Smart Farming. Local Guidance. Better Decisions.",

  // Navigation
  home: "Home",
  dashboard: "Dashboard",
  cropGuide: "Crop Guide",
  schemes: "Government Schemes",
  krushiAI: "Krushi AI",
  planner: "Farm Planner",
  profile: "Farmer Profile",
  menu: "Menu",
  open: "Open",

  // Landing
  heroIntro:
    "KrushiSetu AI provides personalized agricultural guidance, government scheme discovery and AI-powered assistance so farmers can make confident decisions every single day.",
  getStarted: "Get Started",
  askAI: "Ask Krushi AI",
  featuresTitle: "Everything a farmer needs, in one place",
  featuresSubtitle:
    "Built farmer-first: simple words, fewer taps, and guidance that changes with your crop and season.",
  featCropTitle: "Crop Guidance",
  featCropText:
    "Sowing, irrigation, fertilizer, pest and harvest advice for six major crops in plain language.",
  featSchemeTitle: "Government Schemes",
  featSchemeText:
    "Discover schemes that may suit your land size, state and crop, with documents and benefits.",
  featAiTitle: "Krushi AI",
  featAiText: "Ask farming questions any time and get clear, farmer-friendly answers instantly.",
  featPlannerTitle: "Smart Farm Planner",
  featPlannerText:
    "Plan the day's field tasks, tick them off and track your progress through the season.",
  howItWorks: "How it works",
  step1Title: "Create your profile",
  step1Text: "Tell us your state, district, land size, crop and season. It takes under a minute.",
  step2Title: "Get personalized guidance",
  step2Text: "Your dashboard shows today's advice, crop steps and schemes that may suit you.",
  step3Title: "Take action",
  step3Text: "Plan field tasks, tick them off and ask Krushi AI whenever you are unsure.",
  ctaTitle: "Start farming with better decisions",
  ctaText:
    "Set up your farmer profile once and KrushiSetu AI will personalize crop guidance, scheme matching and daily advice for your farm.",
  footerNote:
    "Demo data is used for guidance and scheme matching. Always verify official eligibility and crop advisories with your local agriculture department.",

  // Profile
  createProfile: "Create Profile",
  editProfile: "Edit Profile",
  profileIntro:
    "Tell us about your farm once. We save it on this device so it stays after you refresh or close the browser.",
  farmerName: "Farmer Name",
  farmerNamePlaceholder: "e.g. Ramesh",
  state: "State",
  district: "District",
  landSize: "Land Size (hectares)",
  mainCrop: "Main Crop",
  season: "Season",
  saveProfile: "Save Profile",
  saveContinue: "Save & Continue",
  clearProfile: "Clear saved profile",
  profileSaved: "Profile saved on this device.",
  errName: "Please enter the farmer's name.",
  errLand: "Enter a valid land size in hectares.",
  required: "Required field",

  // Dashboard
  goodMorning: "Good Morning",
  farmOverview: "Farm Overview",
  crop: "Crop",
  location: "Location",
  land: "Land Size",
  hectares: "hectares",
  cropStatus: "Crop Status",
  good: "Good",
  todaysTasks: "Today's Tasks",
  remaining: "remaining",
  relevantSchemes: "Relevant Schemes",
  potentiallySuitableLower: "potentially suitable",
  aiAssistant: "AI Assistant",
  answersInSeconds: "Answers in seconds",
  whatToday: "What should I do today?",
  todaysAdvice: "Today's Farming Advice",
  cropNotes: "Key notes for this season.",
  irrigationLabel: "Irrigation",
  pestWatch: "Pest watch",
  fullCropGuide: "Full crop guide",
  openPlanner: "Open Farm Planner",
  needProfileTitle: "Set up your farm profile first",
  needProfileText: "We need your state, crop and season to personalize the dashboard.",
  loading: "Loading...",

  // Crop guide
  cropGuideTitle: "Crop Guidance",
  cropGuideSubtitle: "Choose a crop to see practical guidance for each stage of the season.",
  selectCrop: "Select Crop",
  viewGuide: "View Guide",
  search: "Search",
  searchCrop: "Search crop",
  noCropFound: "No crop matches your search.",
  sowing: "Sowing",
  irrigation: "Irrigation",
  fertilizer: "Fertilizer",
  pestManagement: "Pest Management",
  harvesting: "Harvesting",
  seasonLabel: "Season",

  // Schemes
  schemesTitle: "Government Schemes",
  schemesMatched:
    "Based on {state}, {land} hectares and {crop} farming, {count} schemes look potentially suitable.",
  schemesNoProfile: "Create your farmer profile to see schemes matched to your farm.",
  showMatchedOnly: "Show matched only",
  showAllSchemes: "Show all schemes",
  potentially: "Potentially suitable",
  benefits: "Benefits",
  eligibility: "Eligibility",
  requiredDocuments: "Required Documents",
  viewDetails: "View Details",
  noSchemes: "No schemes found for your profile right now.",
  schemeDisclaimer:
    "Scheme matching uses demo eligibility rules for this MVP and does not confirm official eligibility. Please verify details and apply through the relevant government authority or your local agriculture office.",
  officialNote: "Official eligibility must be verified with the relevant government authority.",
  close: "Close",

  // Assistant
  assistantSubtitle: "Your intelligent farming assistant",
  demoMode: "Demo Mode",
  askQuestion: "Ask your farming question",
  askPlaceholder: "Ask Krushi AI a farming question...",
  send: "Send",
  clearChat: "Clear Chat",
  thinking: "Thinking...",
  aiError: "Krushi AI could not respond right now. Please try again.",
  suggestionsIntro: "Ask anything about your crop, irrigation, pests or schemes. Try one of these:",
  demoModeNote:
    "Krushi AI is running in Demo Mode with offline farming knowledge, so it works without any internet connection or API key during the demo.",
  aiPrefix: "For your {land} hectare {crop} farm in {district}, {state}: ",
  sug1: "How often should I irrigate my onion crop?",
  sug2: "What should I check before harvesting?",
  sug3: "Which scheme may be useful for my farm?",
  sug4: "How can I improve my crop management?",

  // Planner
  tasks: "Today's Farm Tasks",
  plannerSubtitle: "Add your own tasks, tick them off as you finish, and keep the day on track.",
  completed: "Tasks Completed",
  progress: "Progress",
  addTask: "Add Task",
  taskPlaceholder: "e.g. Clean the drip lines",
  resetDay: "Reset day",
  markComplete: "Mark as complete",
  markPending: "Mark as pending",
  deleteTask: "Delete task",
  noTasks: "No tasks yet. Add your first task for today.",
};

const mr: Dict = {
  brand: "कृषीसेतू AI",
  tagline: "स्मार्ट शेती. स्थानिक मार्गदर्शन. चांगले निर्णय.",

  home: "मुख्यपृष्ठ",
  dashboard: "डॅशबोर्ड",
  cropGuide: "पीक मार्गदर्शन",
  schemes: "शासकीय योजना",
  krushiAI: "कृषी AI",
  planner: "शेती नियोजन",
  profile: "शेतकरी प्रोफाइल",
  menu: "मेनू",
  open: "उघडा",

  heroIntro:
    "कृषीसेतू AI तुम्हाला वैयक्तिक शेती मार्गदर्शन, शासकीय योजनांची माहिती आणि AI मदत देते, जेणेकरून तुम्ही रोज आत्मविश्वासाने निर्णय घेऊ शकाल.",
  getStarted: "सुरू करा",
  askAI: "कृषी AI ला विचारा",
  featuresTitle: "शेतकऱ्याला लागणारे सर्व काही, एकाच ठिकाणी",
  featuresSubtitle:
    "शेतकऱ्यांसाठी बनवलेले: सोपी भाषा, कमी क्लिक आणि तुमच्या पिकानुसार व हंगामानुसार बदलणारे मार्गदर्शन.",
  featCropTitle: "पीक मार्गदर्शन",
  featCropText:
    "सहा प्रमुख पिकांसाठी पेरणी, पाणी, खत, कीड आणि काढणीचा सल्ला सोप्या भाषेत.",
  featSchemeTitle: "शासकीय योजना",
  featSchemeText:
    "तुमची जमीन, राज्य आणि पिकानुसार उपयुक्त ठरू शकणाऱ्या योजना, फायदे व कागदपत्रांसह पहा.",
  featAiTitle: "कृषी AI",
  featAiText: "कधीही शेतीविषयी प्रश्न विचारा आणि लगेच सोपी उत्तरे मिळवा.",
  featPlannerTitle: "स्मार्ट शेती नियोजन",
  featPlannerText:
    "दिवसाची शेतीची कामे ठरवा, पूर्ण झाल्यावर खूण करा आणि हंगामभर प्रगती पहा.",
  howItWorks: "हे कसे चालते",
  step1Title: "तुमचे प्रोफाइल तयार करा",
  step1Text: "तुमचे राज्य, जिल्हा, जमीन, पीक आणि हंगाम सांगा. एक मिनिटापेक्षा कमी वेळ लागतो.",
  step2Title: "वैयक्तिक मार्गदर्शन मिळवा",
  step2Text: "तुमचा डॅशबोर्ड आजचा सल्ला, पिकाचे टप्पे आणि तुम्हाला उपयुक्त योजना दाखवतो.",
  step3Title: "कृती करा",
  step3Text: "शेतीची कामे ठरवा, पूर्ण करा आणि शंका असल्यास कृषी AI ला विचारा.",
  ctaTitle: "चांगल्या निर्णयांसह शेतीची सुरुवात करा",
  ctaText:
    "एकदाच शेतकरी प्रोफाइल तयार करा आणि कृषीसेतू AI तुमच्या शेतासाठी पीक मार्गदर्शन, योजना जुळवणी व रोजचा सल्ला वैयक्तिक करेल.",
  footerNote:
    "मार्गदर्शन आणि योजना जुळवणीसाठी डेमो माहिती वापरली आहे. अधिकृत पात्रता व पीक सल्ला तुमच्या स्थानिक कृषी विभागाकडून तपासा.",

  createProfile: "प्रोफाइल तयार करा",
  editProfile: "प्रोफाइल बदला",
  profileIntro:
    "तुमच्या शेताची माहिती एकदाच सांगा. ती याच उपकरणावर जतन होते, त्यामुळे रिफ्रेश केल्यावरही टिकते.",
  farmerName: "शेतकऱ्याचे नाव",
  farmerNamePlaceholder: "उदा. रमेश",
  state: "राज्य",
  district: "जिल्हा",
  landSize: "जमीन (हेक्टर)",
  mainCrop: "मुख्य पीक",
  season: "हंगाम",
  saveProfile: "प्रोफाइल जतन करा",
  saveContinue: "जतन करा व पुढे जा",
  clearProfile: "जतन केलेले प्रोफाइल हटवा",
  profileSaved: "प्रोफाइल या उपकरणावर जतन झाले आहे.",
  errName: "कृपया शेतकऱ्याचे नाव लिहा.",
  errLand: "हेक्टरमध्ये योग्य जमीन आकार लिहा.",
  required: "आवश्यक माहिती",

  goodMorning: "सुप्रभात",
  farmOverview: "शेताची माहिती",
  crop: "पीक",
  location: "ठिकाण",
  land: "जमीन",
  hectares: "हेक्टर",
  cropStatus: "पिकाची स्थिती",
  good: "चांगली",
  todaysTasks: "आजची कामे",
  remaining: "बाकी",
  relevantSchemes: "उपयुक्त योजना",
  potentiallySuitableLower: "संभाव्य उपयुक्त",
  aiAssistant: "AI सहाय्यक",
  answersInSeconds: "काही सेकंदात उत्तर",
  whatToday: "आज मी काय करावे?",
  todaysAdvice: "आजचा शेती सल्ला",
  cropNotes: "या हंगामासाठी महत्त्वाच्या सूचना.",
  irrigationLabel: "पाणी व्यवस्थापन",
  pestWatch: "कीड निरीक्षण",
  fullCropGuide: "संपूर्ण पीक मार्गदर्शन",
  openPlanner: "शेती नियोजन उघडा",
  needProfileTitle: "आधी तुमचे शेती प्रोफाइल तयार करा",
  needProfileText: "डॅशबोर्ड वैयक्तिक करण्यासाठी तुमचे राज्य, पीक आणि हंगाम आवश्यक आहे.",
  loading: "लोड होत आहे...",

  cropGuideTitle: "पीक मार्गदर्शन",
  cropGuideSubtitle: "हंगामाच्या प्रत्येक टप्प्याचे मार्गदर्शन पाहण्यासाठी पीक निवडा.",
  selectCrop: "पीक निवडा",
  viewGuide: "मार्गदर्शन पहा",
  search: "शोधा",
  searchCrop: "पीक शोधा",
  noCropFound: "तुमच्या शोधाशी जुळणारे पीक नाही.",
  sowing: "पेरणी",
  irrigation: "पाणी",
  fertilizer: "खत",
  pestManagement: "कीड व्यवस्थापन",
  harvesting: "काढणी",
  seasonLabel: "हंगाम",

  schemesTitle: "शासकीय योजना",
  schemesMatched:
    "{state}, {land} हेक्टर आणि {crop} शेतीच्या आधारे {count} योजना संभाव्य उपयुक्त दिसतात.",
  schemesNoProfile: "तुमच्या शेताशी जुळणाऱ्या योजना पाहण्यासाठी शेतकरी प्रोफाइल तयार करा.",
  showMatchedOnly: "फक्त जुळणाऱ्या योजना",
  showAllSchemes: "सर्व योजना पहा",
  potentially: "संभाव्य उपयुक्त",
  benefits: "फायदे",
  eligibility: "पात्रता",
  requiredDocuments: "आवश्यक कागदपत्रे",
  viewDetails: "तपशील पहा",
  noSchemes: "सध्या तुमच्या प्रोफाइलसाठी योजना सापडली नाही.",
  schemeDisclaimer:
    "या MVP मध्ये योजना जुळवणी डेमो नियमांवर आधारित आहे आणि ती अधिकृत पात्रता नाही. कृपया तपशील तपासा आणि संबंधित शासकीय कार्यालय किंवा स्थानिक कृषी कार्यालयामार्फत अर्ज करा.",
  officialNote: "अधिकृत पात्रता संबंधित शासकीय कार्यालयाकडून तपासणे आवश्यक आहे.",
  close: "बंद करा",

  assistantSubtitle: "तुमचा हुशार शेती सहाय्यक",
  demoMode: "डेमो मोड",
  askQuestion: "तुमचा शेतीविषयक प्रश्न विचारा",
  askPlaceholder: "कृषी AI ला शेतीविषयक प्रश्न विचारा...",
  send: "पाठवा",
  clearChat: "संभाषण पुसा",
  thinking: "विचार करत आहे...",
  aiError: "कृषी AI आत्ता उत्तर देऊ शकले नाही. कृपया पुन्हा प्रयत्न करा.",
  suggestionsIntro: "पीक, पाणी, कीड किंवा योजनांबद्दल काहीही विचारा. यापैकी एक वापरून पहा:",
  demoModeNote:
    "कृषी AI डेमो मोडमध्ये ऑफलाइन शेती माहितीसह चालते, त्यामुळे इंटरनेट किंवा API की शिवाय ते काम करते.",
  aiPrefix: "{district}, {state} मधील तुमच्या {land} हेक्टर {crop} शेतासाठी: ",
  sug1: "कांद्याला किती वेळा पाणी द्यावे?",
  sug2: "काढणीपूर्वी काय तपासावे?",
  sug3: "माझ्या शेतासाठी कोणती योजना उपयुक्त आहे?",
  sug4: "माझे पीक व्यवस्थापन कसे सुधारू?",

  tasks: "आजची शेतीची कामे",
  plannerSubtitle: "तुमची कामे जोडा, पूर्ण झाल्यावर खूण करा आणि दिवस नियोजनबद्ध ठेवा.",
  completed: "कामे पूर्ण",
  progress: "प्रगती",
  addTask: "काम जोडा",
  taskPlaceholder: "उदा. ठिबक नळ्या स्वच्छ करा",
  resetDay: "दिवस पुन्हा सुरू करा",
  markComplete: "पूर्ण म्हणून खूण करा",
  markPending: "अपूर्ण म्हणून खूण करा",
  deleteTask: "काम हटवा",
  noTasks: "अजून कामे नाहीत. आजचे पहिले काम जोडा.",
};

const hi: Dict = {
  brand: "कृषिसेतु AI",
  tagline: "स्मार्ट खेती. स्थानीय मार्गदर्शन. बेहतर निर्णय.",

  home: "होम",
  dashboard: "डैशबोर्ड",
  cropGuide: "फसल मार्गदर्शन",
  schemes: "सरकारी योजनाएँ",
  krushiAI: "कृषि AI",
  planner: "खेत योजना",
  profile: "किसान प्रोफ़ाइल",
  menu: "मेन्यू",
  open: "खोलें",

  heroIntro:
    "कृषिसेतु AI आपको व्यक्तिगत खेती मार्गदर्शन, सरकारी योजनाओं की जानकारी और AI सहायता देता है, ताकि आप हर दिन भरोसे के साथ निर्णय ले सकें।",
  getStarted: "शुरू करें",
  askAI: "कृषि AI से पूछें",
  featuresTitle: "किसान की हर ज़रूरत, एक ही जगह",
  featuresSubtitle:
    "किसानों के लिए बनाया गया: आसान भाषा, कम क्लिक और आपकी फसल व मौसम के अनुसार बदलता मार्गदर्शन।",
  featCropTitle: "फसल मार्गदर्शन",
  featCropText: "छह प्रमुख फसलों के लिए बुवाई, सिंचाई, खाद, कीट और कटाई की सलाह आसान भाषा में।",
  featSchemeTitle: "सरकारी योजनाएँ",
  featSchemeText:
    "अपनी ज़मीन, राज्य और फसल के अनुसार उपयुक्त योजनाएँ, लाभ और दस्तावेज़ों के साथ देखें।",
  featAiTitle: "कृषि AI",
  featAiText: "कभी भी खेती से जुड़े सवाल पूछें और तुरंत आसान जवाब पाएँ।",
  featPlannerTitle: "स्मार्ट खेत योजना",
  featPlannerText: "दिन के खेत के काम तय करें, पूरा होने पर निशान लगाएँ और प्रगति देखें।",
  howItWorks: "यह कैसे काम करता है",
  step1Title: "अपनी प्रोफ़ाइल बनाएँ",
  step1Text: "अपना राज्य, ज़िला, ज़मीन, फसल और मौसम बताएँ। इसमें एक मिनट से भी कम समय लगता है।",
  step2Title: "व्यक्तिगत मार्गदर्शन पाएँ",
  step2Text: "आपका डैशबोर्ड आज की सलाह, फसल के चरण और आपके लिए उपयुक्त योजनाएँ दिखाता है।",
  step3Title: "कदम उठाएँ",
  step3Text: "खेत के काम तय करें, पूरे करें और संदेह होने पर कृषि AI से पूछें।",
  ctaTitle: "बेहतर निर्णयों के साथ खेती शुरू करें",
  ctaText:
    "एक बार किसान प्रोफ़ाइल बनाएँ और कृषिसेतु AI आपके खेत के लिए फसल मार्गदर्शन, योजना मिलान और रोज़ की सलाह व्यक्तिगत करेगा।",
  footerNote:
    "मार्गदर्शन और योजना मिलान के लिए डेमो डेटा उपयोग किया गया है। आधिकारिक पात्रता और फसल सलाह अपने स्थानीय कृषि विभाग से अवश्य जाँचें।",

  createProfile: "प्रोफ़ाइल बनाएँ",
  editProfile: "प्रोफ़ाइल बदलें",
  profileIntro:
    "अपने खेत की जानकारी एक बार दें। यह इसी डिवाइस पर सुरक्षित रहती है, इसलिए रिफ्रेश के बाद भी बनी रहती है।",
  farmerName: "किसान का नाम",
  farmerNamePlaceholder: "जैसे रमेश",
  state: "राज्य",
  district: "ज़िला",
  landSize: "ज़मीन (हेक्टेयर)",
  mainCrop: "मुख्य फसल",
  season: "मौसम",
  saveProfile: "प्रोफ़ाइल सहेजें",
  saveContinue: "सहेजें और आगे बढ़ें",
  clearProfile: "सहेजी प्रोफ़ाइल हटाएँ",
  profileSaved: "प्रोफ़ाइल इस डिवाइस पर सहेज ली गई है।",
  errName: "कृपया किसान का नाम लिखें।",
  errLand: "हेक्टेयर में सही ज़मीन आकार लिखें।",
  required: "आवश्यक जानकारी",

  goodMorning: "सुप्रभात",
  farmOverview: "खेत की जानकारी",
  crop: "फसल",
  location: "स्थान",
  land: "ज़मीन",
  hectares: "हेक्टेयर",
  cropStatus: "फसल की स्थिति",
  good: "अच्छी",
  todaysTasks: "आज के काम",
  remaining: "शेष",
  relevantSchemes: "उपयुक्त योजनाएँ",
  potentiallySuitableLower: "संभावित उपयुक्त",
  aiAssistant: "AI सहायक",
  answersInSeconds: "कुछ सेकंड में जवाब",
  whatToday: "आज मुझे क्या करना चाहिए?",
  todaysAdvice: "आज की खेती सलाह",
  cropNotes: "इस मौसम के लिए ज़रूरी बातें।",
  irrigationLabel: "सिंचाई",
  pestWatch: "कीट निगरानी",
  fullCropGuide: "पूरा फसल मार्गदर्शन",
  openPlanner: "खेत योजना खोलें",
  needProfileTitle: "पहले अपनी खेत प्रोफ़ाइल बनाएँ",
  needProfileText: "डैशबोर्ड व्यक्तिगत करने के लिए आपका राज्य, फसल और मौसम चाहिए।",
  loading: "लोड हो रहा है...",

  cropGuideTitle: "फसल मार्गदर्शन",
  cropGuideSubtitle: "मौसम के हर चरण का मार्गदर्शन देखने के लिए फसल चुनें।",
  selectCrop: "फसल चुनें",
  viewGuide: "मार्गदर्शन देखें",
  search: "खोजें",
  searchCrop: "फसल खोजें",
  noCropFound: "आपकी खोज से मेल खाती फसल नहीं मिली।",
  sowing: "बुवाई",
  irrigation: "सिंचाई",
  fertilizer: "खाद",
  pestManagement: "कीट प्रबंधन",
  harvesting: "कटाई",
  seasonLabel: "मौसम",

  schemesTitle: "सरकारी योजनाएँ",
  schemesMatched:
    "{state}, {land} हेक्टेयर और {crop} खेती के आधार पर {count} योजनाएँ संभावित उपयुक्त लगती हैं।",
  schemesNoProfile: "अपने खेत से मेल खाती योजनाएँ देखने के लिए किसान प्रोफ़ाइल बनाएँ।",
  showMatchedOnly: "केवल मेल खाती योजनाएँ",
  showAllSchemes: "सभी योजनाएँ देखें",
  potentially: "संभावित उपयुक्त",
  benefits: "लाभ",
  eligibility: "पात्रता",
  requiredDocuments: "आवश्यक दस्तावेज़",
  viewDetails: "विवरण देखें",
  noSchemes: "अभी आपकी प्रोफ़ाइल के लिए कोई योजना नहीं मिली।",
  schemeDisclaimer:
    "इस MVP में योजना मिलान डेमो नियमों पर आधारित है और यह आधिकारिक पात्रता नहीं है। कृपया विवरण जाँचें और संबंधित सरकारी कार्यालय या स्थानीय कृषि कार्यालय के माध्यम से आवेदन करें।",
  officialNote: "आधिकारिक पात्रता संबंधित सरकारी कार्यालय से जाँचना आवश्यक है।",
  close: "बंद करें",

  assistantSubtitle: "आपका समझदार खेती सहायक",
  demoMode: "डेमो मोड",
  askQuestion: "अपना खेती से जुड़ा सवाल पूछें",
  askPlaceholder: "कृषि AI से खेती का सवाल पूछें...",
  send: "भेजें",
  clearChat: "चैट साफ़ करें",
  thinking: "सोच रहा है...",
  aiError: "कृषि AI अभी जवाब नहीं दे सका। कृपया दोबारा कोशिश करें।",
  suggestionsIntro: "फसल, सिंचाई, कीट या योजनाओं के बारे में कुछ भी पूछें। इनमें से एक आज़माएँ:",
  demoModeNote:
    "कृषि AI डेमो मोड में ऑफ़लाइन खेती जानकारी के साथ चलता है, इसलिए यह बिना इंटरनेट या API की के काम करता है।",
  aiPrefix: "{district}, {state} में आपके {land} हेक्टेयर {crop} खेत के लिए: ",
  sug1: "प्याज़ की फसल को कितनी बार सिंचाई करें?",
  sug2: "कटाई से पहले क्या जाँचना चाहिए?",
  sug3: "मेरे खेत के लिए कौन-सी योजना उपयोगी है?",
  sug4: "मैं अपना फसल प्रबंधन कैसे सुधारूँ?",

  tasks: "आज के खेत के काम",
  plannerSubtitle: "अपने काम जोड़ें, पूरा होने पर निशान लगाएँ और दिन को व्यवस्थित रखें।",
  completed: "काम पूरे",
  progress: "प्रगति",
  addTask: "काम जोड़ें",
  taskPlaceholder: "जैसे ड्रिप लाइन साफ़ करें",
  resetDay: "दिन रीसेट करें",
  markComplete: "पूरा चिह्नित करें",
  markPending: "अपूर्ण चिह्नित करें",
  deleteTask: "काम हटाएँ",
  noTasks: "अभी कोई काम नहीं है। आज का पहला काम जोड़ें।",
};

const DICTS: Record<Lang, Dict> = { en, mr, hi };

export const LANG_LABELS: Record<Lang, string> = { en: "English", mr: "मराठी", hi: "हिंदी" };

export type TFunc = (key: string, vars?: Record<string, string | number>) => string;

interface I18nValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: TFunc;
}

const Ctx = createContext<I18nValue>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

function readStoredLang(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    const saved =
      (localStorage.getItem(LANG_STORAGE_KEY) as Lang | null) ??
      (localStorage.getItem("ks_lang") as Lang | null);
    if (saved && DICTS[saved]) return saved;
  } catch {
    /* ignore */
  }
  return "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = readStoredLang();
    if (stored !== "en") setLangState(stored);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback<TFunc>(
    (key, vars) => {
      let str = DICTS[lang][key] ?? en[key] ?? key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          str = str.replaceAll(`{${k}}`, String(v));
        }
      }
      return str;
    },
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
