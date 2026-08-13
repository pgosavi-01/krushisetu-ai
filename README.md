# KrushiSetu Companion

Build a complete, polished, responsive web application called KrushiSetu AI for the Hack Devengers 1.0 hackathon.

PRODUCT IDEA

KrushiSetu AI is a farmer-centric digital platform for Indian farmers.

Its goal is to help farmers make better farming decisions by providing:

Personalized crop guidance

Government scheme discovery

AI agricultural assistance

Multilingual support

Daily farming recommendations

Simple farm task planning

The application should feel like a real startup product, not a basic college project.

DESIGN DIRECTION

Create a modern Agriculture + SaaS dashboard aesthetic.

Use:

Deep green as the primary color

Fresh green as the secondary color

Very light green/off-white background

White cards

Rounded corners

Soft shadows

Clean typography

Minimal and professional animations

Clear visual hierarchy

Farmer-friendly readable text

Avoid:

Overly bright colors

Excessive gradients

Cluttered layouts

Generic Bootstrap styling

Too many animations

The website must be fully responsive on:

Desktop

Tablet

Mobile

Use high-quality agriculture-related visual elements where appropriate, but keep the interface fast and clean.

BRAND

Name:
KrushiSetu AI

Tagline:
Smart Farming. Local Guidance. Better Decisions.

Create a simple professional logo/icon concept related to agriculture + connectivity/AI.

MAIN USER FLOW

The complete user journey should be:

Landing Page
→ Get Started
→ Farmer Profile Setup
→ Personalized Dashboard
→ Crop Guidance
→ Government Scheme Matcher
→ Krushi AI Assistant
→ Today's Farming Advice
→ Farm Action Planner

Make navigation between these sections simple and intuitive.

1. LANDING PAGE

Create a strong hero section.

Include:

KrushiSetu AI

"Smart Farming. Local Guidance. Better Decisions."

Supporting text explaining that KrushiSetu AI provides personalized agricultural guidance, government scheme discovery and AI-powered assistance for farmers.

Buttons:

Get Started

Ask Krushi AI

Add a visually attractive agriculture-themed hero section.

Below the hero, show four feature cards:

🌱 Crop Guidance

🏛️ Government Schemes

🤖 Krushi AI

📋 Smart Farm Planner

Add a short "How It Works" section:

Profile → Personalized Guidance → Take Action

Add a final CTA section.

2. FARMER PROFILE SETUP

Create a clean multi-step or single-page profile form.

Fields:

Farmer Name

State

District

Land Size in hectares

Main Crop

Season

Example profile:

Name: Ramesh
State: Maharashtra
District: Nashik
Land: 2 hectares
Crop: Onion
Season: Rabi

Store the profile locally so that the user does not have to enter it every time.

After completion, take the farmer to the personalized dashboard.

3. PERSONALIZED DASHBOARD

Create a professional dashboard.

Show:

"Good Morning, [Farmer Name] 👨‍🌾"

Then display:

Location

Land size

Current crop

Season

Create summary cards:

Crop Status

Good

Today's Tasks

Show completed/remaining tasks

Relevant Schemes

Number of potentially suitable schemes

AI Assistant

"Ask Krushi AI"

Add a prominent section:

Today's Farming Advice

Generate advice based on:

Farmer location

Crop

Season

For the MVP, use local structured demo data instead of pretending to provide live weather or live agricultural data.

4. CROP GUIDANCE

Create a dedicated Crop Guidance page.

Include crop cards for:

Onion

Wheat

Tomato

Soybean

Cotton

Rice

When a crop is selected, show:

🌱 Sowing

💧 Irrigation

🌿 Fertilizer

🐛 Pest Management

🌾 Harvesting

Use simple farmer-friendly language.

Allow the farmer to switch between crops.

5. GOVERNMENT SCHEME MATCHER

Create a Government Scheme section.

Use a local structured demo dataset.

Each scheme should have:

Scheme name

Description

Benefits

Basic eligibility

Required documents

View Details

Use the farmer's profile to identify potentially relevant schemes.

For example:

Profile:
Maharashtra
2 hectares
Onion farmer

Then show schemes that may be relevant based on the demo eligibility rules.

IMPORTANT:

Do not claim that the farmer is officially eligible.

Use wording such as:

"Potentially suitable based on your profile."

Add a disclaimer that official eligibility should be verified from the relevant government authority.

6. KRUSHI AI ASSISTANT

Create a polished chatbot interface.

Title:

Krushi AI

Subtitle:

"Your intelligent farming assistant"

Features:

Chat interface

User messages

AI responses

Loading indicator

Error handling

Clear chat option

Example questions:

"How often should I irrigate my onion crop?"

"What should I check before harvesting?"

"Which scheme may be useful for my farm?"

"How can I improve my crop management?"

The interface should support farmer-friendly responses.

Prepare the application for Gemini API integration.

Use an environment variable for the API key.

Never hardcode API keys.

If the Gemini API is unavailable, create a Demo Mode that returns predefined useful farming responses so the feature still works during the hackathon presentation.

7. MULTILINGUAL SUPPORT

Add a language selector in the navbar:

English | मराठी | हिंदी

Translate the main interface labels and common navigation elements.

The selected language should persist locally.

Prioritize Marathi because the initial target demo can focus on Maharashtra farmers.

8. SMART FARM ACTION PLANNER

Create a task management section.

Title:

Today's Farm Tasks

Example tasks:

Check soil moisture

Inspect crop

Check irrigation requirement

Review fertilizer schedule

Inspect for pests

Features:

Add task

Complete task

Delete task

Progress indicator

Example:

3 / 5 Tasks Completed

Store tasks locally.

9. "WHAT SHOULD I DO TODAY?" FEATURE

Create a visually prominent dashboard card:

What should I do today?

Based on:

📍 Location
🌱 Crop
🌤️ Season

Show 3–4 actionable recommendations.

Example:

Check soil moisture.

Inspect leaves for signs of pests.

Review irrigation requirements.

Complete today's farm task.

This should be one of the main features shown during the hackathon demo.

10. NAVIGATION

Create a responsive navbar/sidebar.

Navigation:

Home

Dashboard

Crop Guide

Schemes

Krushi AI

Farm Planner

Include:

Language selector

Farmer profile/avatar

On mobile, use a clean mobile navigation menu.

11. DATA

For the initial MVP, use structured local data for:

Crops

Crop guidance

Government schemes

Demo AI responses

Translations

Today's farming advice

Do not depend on external APIs for the core demo.

The application should still work if there is no internet connection to external agricultural services.

12. IMPORTANT PRODUCT PRINCIPLES

Prioritize:

Working MVP > unnecessary features

The application should not contain fake buttons.

Every visible button should either:

Navigate somewhere

Open a modal

Submit data

Perform an action

Use realistic demo data.

Keep the UI polished but simple.

Make the application easy for a hackathon judge to understand within 2–3 minutes.

13. HACKATHON DEMO

The final demo should follow this exact story:

Open KrushiSetu AI

Click Get Started

Enter farmer profile

Select Maharashtra → Nashik → Onion → Rabi

Open personalized dashboard

Show Today's Farming Advice

Open Crop Guidance

Show Onion guidance

Open Government Schemes

Show potentially suitable schemes

Open Krushi AI

Ask a farming question

Show AI/Demo response

Open Farm Planner

Complete a task

Show progress

The entire flow should feel connected and personalized.

14. TECHNICAL REQUIREMENTS

Use a modern React-based implementation suitable for Lovable.

Use:

React

TypeScript if Lovable's default setup supports it

Tailwind CSS if available

Component-based architecture

Local storage for persistence

Keep the code modular.

Do not add unnecessary dependencies.

Make sure the project can later be deployed easily.

15. QUALITY CHECK

Before considering the MVP complete, verify:

Landing page works

Get Started works

Farmer profile saves

Dashboard is personalized

Crop Guide works

Scheme Matcher works

Krushi AI interface works

Demo AI mode works without API key

Farm Planner works

Tasks can be added/completed/deleted

Language selector works

Navigation works

Mobile layout works

No broken buttons

No console errors

No API keys are exposed

All pages have consistent styling

Build the application as a polished, realistic, farmer-first product.

Start by creating the complete UI and working MVP using local/demo data.

Do not wait for external APIs to build the core functionality.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://krushisetu-ai.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f66836ec-95fd-48ec-9246-3a10e908cc14).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
