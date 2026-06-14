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
- **Multi-Modal Journey Planner:** Connects stations without direct transit paths by automatically linking multiple legs through transfer hubs (e.g. Colombo Fort) with 15+ minute layover logic and cumulative pricing.

### 2. 🗺️ GPS-Simulated Tracker & Interactive Station Popups
- Fully interactive map powered by **Leaflet.js** using CartoDB Dark Matter / Voyager raster tiles.
- Custom polyline routes mapped to actual geographic coordinates of Sri Lankan transport lines (Coastal, Main, and Northern Lines).
- Real-time simulated movement of active trains and buses along their respective routes.
- Live stats dashboard showing speed, next station, ETA, and journey progress percentages.
- **Interactive Weather Overlay Layer:** Pulses hazard warnings (Red/Orange/Yellow zones representing storm surges, gale winds, and landslide warnings) which link to interactive description popups and direct transit impact status checks.
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

### 7. ⚠️ Active Route Suspensions & Real-time Database Sync (Supabase)
- **Real-time Route Statuses:** Route statuses (Active or Suspended) are retrieved dynamically from a Supabase PostgreSQL table on load and synchronized across all clients via Supabase Realtime websocket channels.
- **Safety Blockers:** Landslide warnings on the Main Line (Colombo ➔ Kandy ➔ Badulla) lock down bookings, schedules, and live GPS trackers instantly.
- **GPS Tracker Locking:** Suspended vehicles lock to `0 km/h`, `N/A (Suspended)` ETA, and `0%` progress at the origin station, with active animation bypasses and red glowing pins on the Leaflet map.

### 8. 🔒 Authenticated Operator Admin Panel (Supabase Auth)
- **Operator Sign In:** The Admin Panel tab is fully protected by a glassmorphic login view. Accessing transit metrics or changing route statuses requires authenticating with Supabase Auth.
- **Session Persistence:** Features automatic operator session restoration on page load and a secure "Sign Out" control banner.
- **Dynamic Controls:** Authenticated operators can toggle train line statuses (Active/Suspended) in real-time, instantly broadcasting changes to all active passenger clients globally.
- **Interactive Visual Analytics Dashboard:** Displays automated graphs using Chart.js (glowing doughnut chart for Bus vs Train revenue share, and line chart for daily demand trends over the last week).

### 9. 🛡️ Passenger Data Privacy & RPC Security
- **Anti-Scraping Protection:** Disabled public `SELECT` and `DELETE` access to the `bookings` table via Row Level Security (RLS) policies.
- **Secure UUID Queries:** Passenger-side ticket lookups and cancellations are routed through PostgreSQL `SECURITY DEFINER` RPC helper functions. This ensures guests can fetch or delete *only* their specific ticket if they possess the correct 128-bit UUID reference key, preventing bulk data harvesting.

---

## 🛠️ Technology Stack

- **Core Structure:** Semantic HTML5
- **Styling:** Custom CSS3 (utilizing modern variable tokens, flexbox/grid layouts, glassmorphism, custom print rules, and responsive screen-size adaptations)
- **Map Engine:** Leaflet.js (loaded via CDN)
- **PDF Generation:** html2pdf.js (loaded via CDN)
- **Database Backend:** Supabase (PostgreSQL with RLS policy permissions)
- **Icons & Fonts:** FontAwesome 6, Google Fonts (Outfit)
- **Logic:** Vanilla ES6 JavaScript (handling route coordinates, timetables, localizations, and progress animations)

---

## 🗄️ Database Setup & Security (Supabase)

To connect the application to your own Supabase project and enable authentication and security rules, execute the following steps:

### 1. Execute Schema & Policies SQL
Open the **SQL Editor** in your Supabase Dashboard and run the following script:

```sql
-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  passenger_name text NOT NULL,
  origin text NOT NULL,
  destination text NOT NULL,
  travel_date text NOT NULL,
  seats text[] NOT NULL,
  vehicle_name text NOT NULL,
  cabin_class text NOT NULL,
  total_fare integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create route_status table
CREATE TABLE IF NOT EXISTS route_status (
  route_name text PRIMARY KEY,
  status text NOT NULL DEFAULT 'Active',
  reason text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

-- Seed initial status configurations
INSERT INTO route_status (route_name, status, reason) VALUES
  ('Main Line', 'Suspended', 'Ditwa Landslide block at Rambukkana'),
  ('Coastal Line', 'Active', ''),
  ('Northern Line', 'Active', '')
ON CONFLICT (route_name) DO UPDATE 
SET status = EXCLUDED.status, reason = EXCLUDED.reason;

-- Define guest RPC function to query a single booking safely
CREATE OR REPLACE FUNCTION get_booking_by_id(booking_id uuid)
RETURNS SETOF bookings
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT * FROM bookings WHERE id = booking_id;
$$;

-- Define guest RPC function to cancel a booking safely
CREATE OR REPLACE FUNCTION cancel_booking_by_id(booking_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM bookings WHERE id = booking_id;
  RETURN FOUND;
END;
$$;

-- Enable Row Level Security (RLS)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE route_status ENABLE ROW LEVEL SECURITY;

-- Configure Bookings policies
CREATE POLICY "Allow authenticated read/write bookings" ON bookings 
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow guest insert bookings" ON bookings 
  FOR INSERT TO anon WITH CHECK (true);

-- Configure Route Status policies
CREATE POLICY "Allow public read access" ON route_status 
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated write access" ON route_status 
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
```

### 2. Create an Admin Operator Account
1. In the Supabase Dashboard, navigate to **Authentication** ➔ **Users**.
2. Click **Add user** ➔ **Create user**.
3. Provide the operator's email (e.g., `operator@lankatransit.lk`) and a password, then save.
4. You can now use these credentials to sign in via the **Admin Panel** tab on the web interface!

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

## 🧪 Automated Testing Suite

To ensure the reliability of search, calculations, booking, and visual interfaces, the application includes a complete automated testing suite:
- **Unit Tests (`tests/test_unit.py`)**: Tests standalone functions such as coordinate interpolation, delay durations, and pricing formulas.
- **End-to-End (E2E) Tests (`tests/test_e2e.py`)**: Automates browser sessions using Selenium WebDriver (running in headless mode) to verify key passenger and operator workflows:
  - Multi-language localization and theme toggles.
  - Multi-Modal connection search and booking.
  - Ticket reservation flow (seat mapping, passes generation, high-contrast printing).
  - Admin login credentials bypass and visual Chart.js canvases rendering.
  - Map weather layer checkboxes toggles and warnings popup cards.

### Running the Tests Locally

1. **Install testing packages**:
   ```bash
   pip install -r requirements.txt
   ```
2. **Run the test suite**:
   ```bash
   python -m pytest
   ```
   *Note: The test configuration (`tests/conftest.py`) automatically starts up a local Python HTTP server on port 8000 prior to launching the E2E tests, serving the static web files in the background.*

---

## 🏷️ Credits

Developed & Branded as a product of **[SS Labz](https://ss-labz.pages.dev/)**. All rights reserved.
