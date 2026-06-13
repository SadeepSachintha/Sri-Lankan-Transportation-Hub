# 🚆 LankaTransit Hub | Sri Lankan Train & Bus schedules

[![Netlify Status](https://api.netlify.com/api/v1/badges/54b9598a-d14f-4318-ae38-7bb79e0f6667/deploy-status)](https://sri-lankan-transportation-hub.netlify.app/)
[![Product of SS Labz](https://img.shields.io/badge/Product%20of-SS%20Labz-00e5ff?style=flat-square)](https://ss-labz.pages.dev/)
[![Tech Stack](https://img.shields.io/badge/Tech-HTML%20%7C%20CSS%20%7C%20JS-10b981?style=flat-square)](#)

A premium, visually stunning, and highly interactive web dashboard to check real-time train and bus schedules, track vehicles on a live map, calculate fares, and reserve seats in Sri Lanka. 

**Live Demo:** [sri-lankan-transportation-hub.netlify.app](https://sri-lankan-transportation-hub.netlify.app/)

---

## 🎨 Design & Visuals

LankaTransit is crafted with a modern, glassmorphic dark theme, leveraging rich gradients (Teal and Emerald) to represent Sri Lanka's ocean and tea landscapes. It transitions beautifully to a crisp light theme for daytime viewing.

---

## 🚀 Key Features

### 1. 🔍 Dynamic Schedule Search & Recents History
- Search train and bus schedules between major Sri Lankan hubs (Colombo, Kandy, Galle, Jaffna, Badulla, Matara).
- Swap origin and destination stations easily with a single tap.
- Filter results instantly by transport mode (Trains, Buses, or All).
- **Recent Searches:** A LocalStorage-backed history pill row beneath the search card for quick one-tap search repeats and clearing history.

### 2. 🗺️ GPS-Simulated Tracker & Interactive Station Popups
- Fully interactive map powered by **Leaflet.js** using CartoDB Dark Matter / Voyager raster tiles.
- Custom polyline routes mapped to actual geographic coordinates of Sri Lankan transport lines (Coastal, Main, and Northern Lines).
- Real-time simulated movement of active trains and buses along their respective routes.
- Live stats dashboard showing speed, next station, ETA, and journey progress percentages.
- **Interactive Station Popups:** Click any station pin along a route to open a premium glassmorphic popup card showing:
  - **Amenities/Facilities:** Dynamic badges representing amenities (WiFi, Waiting Room, Cafeteria, ATM, Restrooms).
  - **Upcoming Arrivals:** A dynamically compiled, chronologically sorted grid of all incoming transits (trains/buses) listing names, routes, scheduled/estimated arrival times, and delay/suspended status.

### 3. 🎫 Digital Seat Reservation & Export Options
- Interactive 40-seat coach blueprint featuring a corridor aisle layout.
- Seeded random occupied state (approx. 30%) to simulate live reservations.
- Interactive seat selector calculating totals based on carriage class multipliers.
- Instant digital boarding pass ticket generator complete with an SVG barcode and details.
- **PDF Saving & High-contrast Printing:** Integrated `html2pdf.js` library support for downloading high-fidelity ticket PDFs, and optimized `@media print` rules for ink-saving, clean physical printing.

### 4. 💰 Fare & Duration Calculator with Route Timeline
- Quick calculator comparing distances, travel times, and ticket costs across all classes (Train 1st, 2nd, 3rd class vs Normal and Expressway Buses).
- **Route Timeline Solver:** A visual vertical connecting timeline that dynamically lists all intermediate stops between the selected origin and destination.
- Integrated booking triggers redirection to the reservation screen.

### 5. 🔔 Notifications & Real-Time Alerts Bell
- Integrated dynamic system notifications bell with unread badge counters.
- Displays critical delay updates and weather warnings in real time.

### 6. 🌐 Full Multi-language Support (English, Sinhala, Tamil)
- Complete interface localization in English, Sinhala (සිංහල), and Tamil (தமிழ்).
- Translates static elements, form labels, buttons, dynamic schedules, calculator timelines, reservation summary cards, dynamic select options, and generated tickets.

### 7. ⚠️ Active Route Suspensions (Cyclone Ditwa Update)
- Integrated safety blockers and warnings across the app reflecting landslide suspensions on the Main Line (Colombo ➔ Kandy ➔ Badulla trains):
  - Search results display train schedules marked with red **Suspended** badges and disabled actions.
  - The Seat Booking coach selection grid is replaced by a safety advisory warning card, locking bookings.
  - GPS tracker locks suspended trains to `0 km/h` speed, `N/A (Suspended)` ETA, `0%` progress at the origin station, disables progress animations, shows a red map glowing pin, and adds warning alert banners.

---

## 🛠️ Technology Stack

- **Core Structure:** Semantic HTML5
- **Styling:** Custom CSS3 (utilizing modern variable tokens, flexbox/grid layouts, glassmorphism, custom print rules, and responsive screen-size adaptations)
- **Map Engine:** Leaflet.js (loaded via CDN)
- **PDF Generation:** html2pdf.js (loaded via CDN)
- **Icons & Fonts:** FontAwesome 6, Google Fonts (Outfit)
- **Logic:** Vanilla ES6 JavaScript (handling route coordinates, timetables, localizations, and progress animations)

---

## 💻 How to Run Locally

### Option A: Standard File Access
Since this is a client-side static application, you can simply open the files in your browser:
1. Double-click the `index.html` file in your file explorer.

### Option B: Local Web Server (XAMPP / Apache)
To run it on a local environment mirroring production:
1. Copy the project folder into your XAMPP htdocs directory:  
   `C:\xampp\htdocs\Sri Lankan Transportation Hub\`
2. Open the **XAMPP Control Panel** and start **Apache**.
3. Open your browser and navigate to:  
   `http://localhost/Sri%20Lankan%20Transportation%20Hub/`

### Option C: Python Server
1. Open terminal inside the project directory.
2. Run: `python -m http.server 8000`
3. Navigate to: `http://localhost:8000`

---

## 🌐 Deploy to Netlify

This project includes fully configured CI/CD deployment integrations:
1. Create a repository on GitHub and push the codebase.
2. Log in to your **[Netlify Dashboard](https://app.netlify.com/)**.
3. Click **Add new site** ➔ **Import an existing project** ➔ **GitHub**.
4. Select the repository and click **Deploy**.
5. Future pushes to the `main` branch will trigger automatic deployments.

---

## 🏷️ Credits

Developed & Branded as a product of **[SS Labz](https://ss-labz.pages.dev/)**. All rights reserved.
