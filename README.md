# 🌾 KrushiSetu AI

### Smart Farming. Local Guidance. Better Decisions.

KrushiSetu AI is a farmer-centric digital platform designed to help Indian farmers make better farming decisions through personalized crop guidance, location-based weather insights, AI assistance, government scheme discovery, and smart farm planning.

---

## 🚀 Key Features

### 👨‍🌾 Personalized Farmer Profile

- Farmer Name
- State
- District
- City/Town
- Land Size
- Main Crop
- Season
- Persistent profile after browser refresh

---

### 📍 Smart Location

**State → District → City/Town**

- Complete Indian State and Union Territory selection
- Districts dynamically filtered according to the selected State
- Searchable District selection
- Searchable City/Town selection
- Location-aware weather
- Exact selected location used for weather information

---

### 🌦️ Live Weather

KrushiSetu AI provides weather information based on the farmer's selected City/Town.

Features include:

- Current temperature
- Weather condition
- Humidity
- Rain probability
- Wind speed
- Weather forecast
- Current date
- Last updated time
- Manual weather refresh

Weather information is connected to the farmer's selected location.

---

### 🌱 Smart Farming Advice

KrushiSetu AI combines:

**Location + Crop + Season + Weather**

to provide simple and farmer-friendly daily recommendations.

Examples include:

- Soil moisture suggestions
- Irrigation considerations
- Rain-related suggestions
- Crop inspection reminders
- Weather-aware farming recommendations

---

### 🔔 Smart Farm Reminders

Farmers can:

- Add reminders
- Complete reminders
- Delete reminders
- Track task progress
- Review today's tasks
- Receive weather-aware reminder suggestions
- Keep reminders saved after browser refresh

Example:

If an irrigation reminder exists and rain is expected, KrushiSetu AI can provide a weather-aware suggestion to check field conditions before irrigation.

---

### 🌾 Crop Guidance

KrushiSetu AI provides guidance for a wide range of crops.

Crop categories include:

- Cereals
- Pulses
- Oilseeds
- Vegetables
- Fruits
- Cash Crops
- Spices
- Plantation Crops

Guidance includes:

- 🌱 Sowing
- 💧 Irrigation
- 🌿 Fertilizer
- 🐛 Pest Management
- 🌾 Harvesting

---

### 🏛️ Government Scheme Discovery

Farmers can explore potentially relevant government schemes based on their profile.

Each scheme can provide:

- Scheme Name
- Description
- Benefits
- Basic Eligibility
- Required Documents
- View Details
- Official Government Website

Official eligibility should always be verified through the relevant government authority.

---

### 🤖 Krushi AI

Krushi AI is an intelligent agricultural assistant designed to help farmers with:

- Crop-related questions
- Farming practices
- Crop management
- Government schemes
- Weather-related farming questions
- General agricultural guidance

The application is prepared for AI API integration using environment variables.

If the AI service is unavailable, a fallback/demo mode can be used so that the assistant remains usable during demonstrations.

---

### 🌐 Multilingual Support

KrushiSetu AI supports:

- English
- मराठी
- हिंदी

The language selector is available throughout the application.

The selected language is saved locally and restored after browser refresh.

---

### 📋 Smart Farm Planner

Farmers can:

- Add tasks
- Complete tasks
- Delete tasks
- Track task progress
- Review today's farm activities

Example:

**3 / 5 Tasks Completed**

---

## 🧠 How KrushiSetu AI Works

```text
Farmer Profile
      ↓
State
      ↓
District
      ↓
City/Town
      ↓
Live Weather
      ↓
Crop + Season
      ↓
Smart Farming Advice
      ↓
Weather-aware Reminders
      ↓
Government Schemes
      ↓
Krushi AI
      ↓
Farm Action
```

---

## 🛠️ Tech Stack

- React
- TypeScript
- Tailwind CSS
- Component-Based Architecture
- Local Storage
- Weather API
- AI API Integration
- Responsive Web Design

---

## 🏆 Hackathon Demo Flow

The recommended hackathon demonstration flow is:

1. Open KrushiSetu AI
2. Click **Get Started**
3. Create the farmer profile
4. Select State
5. Select District
6. Select City/Town
7. Select Main Crop
8. Select Season
9. Open the personalized Dashboard
10. Check current weather
11. Show Today's Farming Advice
12. Check weather-aware reminders
13. Open Crop Guidance
14. Explore Government Schemes
15. Open Scheme Details
16. Visit the official government website
17. Open Krushi AI
18. Ask a farming question
19. Open Farm Planner
20. Complete a farm task
21. Show task progress

---

## 🎯 Vision

KrushiSetu AI aims to make agricultural information easier to understand and more personalized for Indian farmers by connecting:

**Local Context + Crop Information + Weather Insights + AI Assistance**

into one simple and farmer-friendly digital platform.

---

## 🔗 Live Demo

**Lovable:**  
https://krushisetu-ai.lovable.app

**Vercel:**  
https://krushisetu-ai.vercel.app

---

## 💻 Development

### Clone the repository

```bash
git clone <repository-url>
cd <repository-name>
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

---

## 🔐 Environment Variables

API keys and secrets should never be hardcoded or committed to GitHub.

Use environment variables such as:

```text
VITE_GEMINI_API_KEY=your_api_key_here
```

Do not commit `.env` files containing real API keys.

---

## 📱 Responsive Design

KrushiSetu AI is designed to work across:

- 💻 Desktop
- 📱 Mobile
- 📲 Tablet

The interface is designed to remain simple, readable, and farmer-friendly across different screen sizes.

---

## ⚠️ Disclaimer

KrushiSetu AI provides informational agricultural guidance and should not be considered a substitute for professional agricultural advice.

Government scheme eligibility, benefits, documents, and application requirements should always be verified through the relevant official government authority.

Weather-based suggestions are informational and should not automatically determine farming decisions.

---

## 🌾 Built for Hack Devengers 1.0

**KrushiSetu AI**

**Smart Farming. Local Guidance. Better Decisions.**
