# Work A Day 🏗️
**Connecting daily wage workers with contractors — instantly, intelligently, and reliably.**

🔗 **Live MVP:** https://workadaymvp.netlify.app
GOOGLE SERVICES USED

---

## The Problem
Daily wage workers struggle to find reliable work quickly, while contractors struggle to find trusted workers — due to a lack of a real-time, trust-based system. Everything depends on middlemen, which is slow and unreliable.

## The Solution
Work A Day is a platform where:
- Workers describe their skills in **any language** → AI detects and tags them instantly
- Contractors post job requirements and get matched with available workers
- A trust & rating system builds reliability on both sides

---

## 🤖 Google AI Integration — Gemini API

Work A Day uses **Google Gemini AI** for intelligent skill detection directly in the app.

**How it works:**
1. Worker opens their profile
2. Describes their work in any language (English, Telugu, Hindi, etc.)
3. Gemini AI extracts and tags their skills automatically

**Example:**
```
Input:  "I do mason work and painting, 5 years experience"
Output: ["Mason", "Painter"]
```
```
Input:  "నేను మేసన్ పని చేస్తాను" (Telugu)
Output: ["Mason"]
```

> This makes the platform accessible to workers with low literacy — they don't need to know skill names or categories, they just describe what they do.

---

## Features
- ✨ **AI Skill Detection** — Powered by Google Gemini API
- 🔍 **Instant Job Matching** — Workers matched to nearby jobs by skill
- 📋 **Contractor Job Posting** — Post requirements, get matched workers
- ⭐ **Trust & Rating System** — Ratings after every job
- 🌐 **Local Language Support** — Works in any language via Gemini
- 📱 **Lightweight UI** — Simple enough for first-time smartphone users

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React Native + Expo (Web) |
| Backend | FastAPI (Python) |
| Database | MongoDB Atlas |
| AI | **Google Gemini API** |
| Hosting | Netlify (Frontend), Render (Backend) |

---

## Testing the MVP

🔗 https://workadaymvp.netlify.app

**Instructions:**
- Enter any phone number → OTP will flash on screen for 2 seconds
- Choose **Worker** or **Contractor** path (one path per number)
- Worker path → go to **Profile tab** → try the **✨ AI Skill Detection** feature
- Contractor path → post a job and view applicants

---

## Project Structure
```
work-a-day/
├── frontend/         # React Native + Expo
│   └── app/
│       ├── (auth)/   # Login, OTP, Register
│       ├── (worker)/ # Worker screens
│       ├── (contractor)/ # Contractor screens
│       └── (admin)/  # Admin dashboard
├── backend/          # FastAPI + MongoDB
└── README.md
```

---

## Future Development
- 🎤 Voice input (speak instead of type)
- 🗺️ Google Maps integration for location-based matching
- 🌍 More regional languages
- 📵 Offline / low-internet support
- 💳 In-app payments
- 📊 Analytics for contractors

---

## Demo Screenshots

<img width="1920" height="1080" alt="Screenshot (28)" src="https://github.com/user-attachments/assets/55cd3d23-13f7-4c50-bd9d-8715a0030220" />
<img width="1920" height="1080" alt="Screenshot (32)" src="https://github.com/user-attachments/assets/a4a7a252-c129-497a-adb5-2b8d37babfcf" />
<img width="1920" height="1080" alt="Screenshot (29)" src="https://github.com/user-attachments/assets/2aa934ec-410d-4782-9830-32d0293b2f8a" />

---

*Built for Google Solution Challenge 2026 — addressing UN SDG 8: Decent Work and Economic Growth*
