/* ==========================================================================
   Sri Lankan Transportation Hub - index.js
   ========================================================================== */

// 1. Mock Transport Network Datasets
const STATIONS = {
  "Colombo Fort": { code: "FOT", coords: [6.9344, 79.8504], distance: 0 },
  "Kurunegala": { code: "KNL", coords: [7.4863, 80.3647], distance: 94 },
  "Anuradhapura": { code: "ANP", coords: [8.3114, 80.4037], distance: 206 },
  "Jaffna": { code: "JAF", coords: [9.6615, 80.0255], distance: 398 },
  "Polgahawela": { code: "PLG", coords: [7.3330, 80.3800], distance: 74 },
  "Kandy": { code: "KND", coords: [7.2896, 80.6324], distance: 115 },
  "Nanu Oya": { code: "NOA", coords: [6.9530, 80.7630], distance: 206 },
  "Badulla": { code: "BAD", coords: [6.9934, 81.0550], distance: 290 },
  "Kalutara": { code: "KTW", coords: [6.5856, 79.9607], distance: 43 },
  "Hikkaduwa": { code: "HKW", coords: [6.1367, 80.1040], distance: 96 },
  "Galle": { code: "GLE", coords: [6.0367, 80.2170], distance: 115 },
  "Matara": { code: "MTR", coords: [5.9496, 80.5469], distance: 156 }
};

// Route track coordinates for mapping
const ROUTES = {
  "Main Line": [
    STATIONS["Colombo Fort"].coords,
    STATIONS["Polgahawela"].coords,
    STATIONS["Kandy"].coords,
    STATIONS["Nanu Oya"].coords,
    STATIONS["Badulla"].coords
  ],
  "Coastal Line": [
    STATIONS["Colombo Fort"].coords,
    STATIONS["Kalutara"].coords,
    STATIONS["Hikkaduwa"].coords,
    STATIONS["Galle"].coords,
    STATIONS["Matara"].coords
  ],
  "Northern Line": [
    STATIONS["Colombo Fort"].coords,
    STATIONS["Kurunegala"].coords,
    STATIONS["Anuradhapura"].coords,
    STATIONS["Jaffna"].coords
  ],
  "Southern Expressway Bus": [
    STATIONS["Colombo Fort"].coords,
    [6.8000, 79.9500], // Expressway entry
    [6.4500, 80.1000],
    STATIONS["Galle"].coords,
    STATIONS["Matara"].coords
  ],
  "Kandy Expressway Bus": [
    STATIONS["Colombo Fort"].coords,
    [7.0500, 80.1500], // Highway route
    STATIONS["Kandy"].coords
  ]
};

// Schedule Database
const JOURNEYS = [
  // Trains
  {
    id: "T1015",
    name: "Udarata Menike",
    type: "train",
    route: "Main Line",
    origin: "Colombo Fort",
    dest: "Badulla",
    departure: "05:55 AM",
    arrival: "03:15 PM",
    duration: "9h 20m",
    price: 1500,
    class: "Express",
    delay: 0,
    status: "Suspended",
    stops: ["Colombo Fort", "Polgahawela", "Kandy", "Nanu Oya", "Badulla"]
  },
  {
    id: "T1005",
    name: "Podi Menike",
    type: "train",
    route: "Main Line",
    origin: "Colombo Fort",
    dest: "Badulla",
    departure: "08:30 AM",
    arrival: "05:45 PM",
    duration: "9h 15m",
    price: 1500,
    class: "Express",
    delay: 0,
    status: "Suspended",
    stops: ["Colombo Fort", "Polgahawela", "Kandy", "Nanu Oya", "Badulla"]
  },
  {
    id: "T4021",
    name: "Yal Devi",
    type: "train",
    route: "Northern Line",
    origin: "Colombo Fort",
    dest: "Jaffna",
    departure: "06:35 AM",
    arrival: "01:20 PM",
    duration: "6h 45m",
    price: 1800,
    class: "Intercity Express",
    delay: 0,
    status: "On Time",
    stops: ["Colombo Fort", "Kurunegala", "Anuradhapura", "Jaffna"]
  },
  {
    id: "T8056",
    name: "Ruhunu Kumari",
    type: "train",
    route: "Coastal Line",
    origin: "Colombo Fort",
    dest: "Matara",
    departure: "06:50 AM",
    arrival: "09:40 AM",
    duration: "2h 50m",
    price: 800,
    class: "Express",
    delay: 5,
    status: "On Time",
    stops: ["Colombo Fort", "Kalutara", "Hikkaduwa", "Galle", "Matara"]
  },
  {
    id: "T8058",
    name: "Samudra Devi",
    type: "train",
    route: "Coastal Line",
    origin: "Colombo Fort",
    dest: "Galle",
    departure: "05:30 PM",
    arrival: "08:15 PM",
    duration: "2h 45m",
    price: 600,
    class: "Commuter",
    delay: 0,
    status: "On Time",
    stops: ["Colombo Fort", "Kalutara", "Hikkaduwa", "Galle"]
  },
  {
    id: "T1045",
    name: "Ella Odyssey",
    type: "train",
    route: "Main Line",
    origin: "Colombo Fort",
    dest: "Badulla",
    departure: "05:30 AM",
    arrival: "03:55 PM",
    duration: "10h 25m",
    price: 2800,
    class: "Luxury Tourist",
    delay: 0,
    status: "Suspended",
    stops: ["Colombo Fort", "Kandy", "Nanu Oya", "Badulla"]
  },
  // Reverse Trains
  {
    id: "T1016",
    name: "Udarata Menike (Return)",
    type: "train",
    route: "Main Line",
    origin: "Badulla",
    dest: "Colombo Fort",
    departure: "05:45 AM",
    arrival: "03:20 PM",
    duration: "9h 35m",
    price: 1500,
    class: "Express",
    delay: 0,
    status: "Suspended",
    stops: ["Badulla", "Nanu Oya", "Kandy", "Polgahawela", "Colombo Fort"]
  },
  {
    id: "T8057",
    name: "Ruhunu Kumari (Return)",
    type: "train",
    route: "Coastal Line",
    origin: "Matara",
    dest: "Colombo Fort",
    departure: "06:05 AM",
    arrival: "08:50 AM",
    duration: "2h 45m",
    price: 800,
    class: "Express",
    delay: 0,
    status: "On Time",
    stops: ["Matara", "Galle", "Hikkaduwa", "Kalutara", "Colombo Fort"]
  },
  // Buses
  {
    id: "BEX01",
    name: "Highway AC Luxury Express",
    type: "bus",
    route: "Southern Expressway Bus",
    origin: "Colombo Fort",
    dest: "Matara",
    departure: "07:00 AM",
    arrival: "08:45 AM",
    duration: "1h 45m",
    price: 1200,
    class: "Super AC Luxury",
    delay: 0,
    status: "On Time",
    stops: ["Colombo Fort", "Galle", "Matara"]
  },
  {
    id: "BEX02",
    name: "Highway AC Luxury Express",
    type: "bus",
    route: "Southern Expressway Bus",
    origin: "Colombo Fort",
    dest: "Galle",
    departure: "08:00 AM",
    arrival: "09:30 AM",
    duration: "1h 30m",
    price: 980,
    class: "AC Luxury",
    delay: 0,
    status: "On Time",
    stops: ["Colombo Fort", "Galle"]
  },
  {
    id: "BEX45",
    name: "Colombo-Kandy Intercity AC",
    type: "bus",
    route: "Kandy Expressway Bus",
    origin: "Colombo Fort",
    dest: "Kandy",
    departure: "06:30 AM",
    arrival: "09:15 AM",
    duration: "2h 45m",
    price: 850,
    class: "AC Executive",
    delay: 10,
    status: "Delayed",
    stops: ["Colombo Fort", "Kandy"]
  },
  {
    id: "BEX05",
    name: "Highway AC Luxury (Return)",
    type: "bus",
    route: "Southern Expressway Bus",
    origin: "Matara",
    dest: "Colombo Fort",
    departure: "07:15 AM",
    arrival: "09:00 AM",
    duration: "1h 45m",
    price: 1200,
    class: "Super AC Luxury",
    delay: 0,
    status: "On Time",
    stops: ["Matara", "Galle", "Colombo Fort"]
  },
  {
    id: "BEX09",
    name: "Highway AC Express",
    type: "bus",
    route: "Southern Expressway Bus",
    origin: "Galle",
    dest: "Colombo Fort",
    departure: "04:30 AM",
    arrival: "06:00 AM",
    duration: "1h 30m",
    price: 980,
    class: "AC Luxury",
    delay: 0,
    status: "On Time",
    stops: ["Galle", "Colombo Fort"]
  }
];

// Station Amenities/Facilities Lookup
const STATION_FACILITIES = {
  "Colombo Fort": [
    { icon: "fa-wifi", label: "WiFi" },
    { icon: "fa-couch", label: "Waiting Room" },
    { icon: "fa-mug-hot", label: "Cafeteria" },
    { icon: "fa-credit-card", label: "ATM" },
    { icon: "fa-square-parking", label: "Parking" },
    { icon: "fa-restroom", label: "Restrooms" }
  ],
  "Kandy": [
    { icon: "fa-wifi", label: "WiFi" },
    { icon: "fa-couch", label: "Waiting Room" },
    { icon: "fa-mug-hot", label: "Cafeteria" },
    { icon: "fa-credit-card", label: "ATM" },
    { icon: "fa-restroom", label: "Restrooms" }
  ],
  "Galle": [
    { icon: "fa-couch", label: "Waiting Room" },
    { icon: "fa-mug-hot", label: "Cafeteria" },
    { icon: "fa-credit-card", label: "ATM" },
    { icon: "fa-restroom", label: "Restrooms" }
  ],
  "Jaffna": [
    { icon: "fa-wifi", label: "WiFi" },
    { icon: "fa-couch", label: "Waiting Room" },
    { icon: "fa-credit-card", label: "ATM" },
    { icon: "fa-restroom", label: "Restrooms" }
  ],
  "Badulla": [
    { icon: "fa-couch", label: "Waiting Room" },
    { icon: "fa-mug-hot", label: "Cafeteria" },
    { icon: "fa-restroom", label: "Restrooms" }
  ],
  "Matara": [
    { icon: "fa-couch", label: "Waiting Room" },
    { icon: "fa-credit-card", label: "ATM" },
    { icon: "fa-restroom", label: "Restrooms" }
  ]
};

// Helper to convert time string ("05:55 AM") to minutes from midnight
function parseTimeString(timeStr) {
  if (!timeStr) return 0;
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  if (modifier === 'PM' && hours < 12) {
    hours += 12;
  }
  if (modifier === 'AM' && hours === 12) {
    hours = 0;
  }
  return hours * 60 + minutes;
}

// Helper to convert minutes from midnight to time string ("05:55 AM")
function formatTimeString(totalMinutes) {
  let hours = Math.floor(totalMinutes / 60) % 24;
  const minutes = Math.floor(totalMinutes % 60);
  const modifier = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  const hoursStr = hours < 10 ? '0' + hours : hours;
  return `${hoursStr}:${minutesStr} ${modifier}`;
}

// Approximate time of arrival at intermediate stops along a route
function approximateStopTime(journey, stationName) {
  if (stationName === journey.origin) return journey.departure;
  if (stationName === journey.dest) return journey.arrival;

  const d_origin = STATIONS[journey.origin] ? STATIONS[journey.origin].distance : undefined;
  const d_dest = STATIONS[journey.dest] ? STATIONS[journey.dest].distance : undefined;
  const d_stop = STATIONS[stationName] ? STATIONS[stationName].distance : undefined;

  if (d_origin !== undefined && d_dest !== undefined && d_stop !== undefined && d_origin !== d_dest) {
    const totalDist = Math.abs(d_dest - d_origin);
    const stopDist = Math.abs(d_stop - d_origin);
    const fraction = stopDist / totalDist;

    const startMins = parseTimeString(journey.departure);
    const endMins = parseTimeString(journey.arrival);
    
    const durationMins = endMins - startMins;
    const stopMins = startMins + durationMins * fraction;
    return formatTimeString(stopMins);
  }

  // Fallback: index-based interpolation
  const idx = journey.stops.indexOf(stationName);
  const n = journey.stops.length;
  if (idx !== -1 && n > 1) {
    const fraction = idx / (n - 1);
    const startMins = parseTimeString(journey.departure);
    const endMins = parseTimeString(journey.arrival);
    const durationMins = endMins - startMins;
    const stopMins = startMins + durationMins * fraction;
    return formatTimeString(stopMins);
  }

  return journey.departure;
}

// Retrieve upcoming arrivals for a station, sorted chronologically
function getUpcomingArrivals(stationName) {
  const arrivals = [];
  JOURNEYS.forEach(journey => {
    const stopIndex = journey.stops.indexOf(stationName);
    if (stopIndex !== -1) {
      const scheduledTimeStr = approximateStopTime(journey, stationName);
      const scheduledMins = parseTimeString(scheduledTimeStr);
      let estMins = scheduledMins;
      if (journey.status === "Delayed") {
        estMins += journey.delay;
      }
      
      arrivals.push({
        journey,
        scheduledTime: scheduledTimeStr,
        estimatedTime: formatTimeString(estMins),
        scheduledMins,
        estimatedMins: estMins,
        isOrigin: stopIndex === 0,
        isDestination: stopIndex === journey.stops.length - 1
      });
    }
  });

  // Sort by scheduled time
  arrivals.sort((a, b) => a.scheduledMins - b.scheduledMins);
  return arrivals;
}

// Generate HTML content for the station marker Leaflet popup
function getStationPopupHTML(stationName, lineColor) {
  const station = STATIONS[stationName];
  if (!station) return `<strong>${stationName}</strong>`;

  const code = station.code || "STN";
  
  // Facilities
  const facilities = STATION_FACILITIES[stationName] || [
    { icon: "fa-couch", label: "Waiting Room" },
    { icon: "fa-restroom", label: "Restrooms" }
  ];
  
  const facilitiesHTML = facilities.map(f => `
    <span class="facility-badge" title="${f.label}">
      <i class="fa-solid ${f.icon}"></i> ${f.label}
    </span>
  `).join('');

  // Upcoming Arrivals
  const upcoming = getUpcomingArrivals(stationName);
  let arrivalsHTML = "";
  
  if (upcoming.length === 0) {
    arrivalsHTML = `<div class="popup-no-arrivals">No upcoming transits scheduled.</div>`;
  } else {
    arrivalsHTML = upcoming.map(item => {
      const isTrain = item.journey.type === "train";
      const iconClass = isTrain ? "fa-train" : "fa-bus";
      const vehicleClass = isTrain ? "train" : "bus";
      let statusClass = "status-ontime";
      
      if (item.journey.status === "Delayed") {
        statusClass = "status-delayed";
      } else if (item.journey.status === "Suspended") {
        statusClass = "status-suspended";
      }

      const delayText = item.journey.delay > 0 ? ` (+${item.journey.delay}m)` : "";
      const displayStatus = item.journey.status === "Suspended" ? "Suspended" : (item.journey.status === "Delayed" ? `Delayed${delayText}` : "On Time");

      // Use estimated time if delayed, N/A if suspended, else scheduled time
      const timeToDisplay = item.journey.status === "Suspended" ? "N/A" : (item.journey.status === "Delayed" ? item.estimatedTime : item.scheduledTime);

      return `
        <div class="popup-arrival-row">
          <div class="arrival-vehicle ${vehicleClass}">
            <i class="fa-solid ${iconClass}"></i>
            <div class="vehicle-info">
              <span class="vehicle-name">${item.journey.name}</span>
              <span class="vehicle-route">to ${item.journey.dest}</span>
            </div>
          </div>
          <div class="arrival-time-status">
            <span class="arrival-time">${timeToDisplay}</span>
            <span class="arrival-status ${statusClass}">${displayStatus}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  return `
    <div class="station-popup-card">
      <div class="station-popup-header">
        <div class="station-title-row">
          <i class="fa-solid fa-train-subway popup-station-icon" style="color: ${lineColor};"></i>
          <div>
            <h4 class="popup-station-name">${stationName}</h4>
            <span class="popup-station-code">Station Code: ${code}</span>
          </div>
        </div>
      </div>
      
      <div class="popup-section">
        <h5 class="popup-section-title">Amenities</h5>
        <div class="popup-facilities-grid">
          ${facilitiesHTML}
        </div>
      </div>
      
      <div class="popup-section">
        <h5 class="popup-section-title">Upcoming Arrivals</h5>
        <div class="popup-arrivals-list">
          ${arrivalsHTML}
        </div>
      </div>
    </div>
  `;
}

// Localize station name based on active language dictionary keys
function getLocalizedStationName(stationName) {
  if (!stationName) return "";
  const key = "station_" + stationName.toLowerCase().replace(/\s+/g, '_');
  return (TRANSLATIONS[currentLanguage] && TRANSLATIONS[currentLanguage][key]) || stationName;
}

// Populate digital seat reservation journey dropdown dynamically
function populateBookingSelect() {
  const bookingSelect = document.getElementById("booking-vehicle-select");
  if (!bookingSelect) return;
  const currentVal = bookingSelect.value;
  bookingSelect.innerHTML = "";

  JOURNEYS.forEach(j => {
    const opt = document.createElement("option");
    opt.value = j.id;
    const localizedOrigin = getLocalizedStationName(j.origin);
    const localizedDest = getLocalizedStationName(j.dest);
    opt.innerText = `${j.name} - ${localizedOrigin} to ${localizedDest} (${j.departure})`;
    bookingSelect.appendChild(opt);
  });

  if (currentVal && Array.from(bookingSelect.options).some(o => o.value === currentVal)) {
    bookingSelect.value = currentVal;
  }
}

// App Global State
let currentTab = "search";
let map = null;
let mapMarkers = [];
let routeLines = [];
let trackerVehicleMarker = null;
let trackerVehicleMarkers = [];
let trackerAnimationTimer = null;
let trackerProgress = 0.35; // 35% default progress
let currentTrackerVehicle = JOURNEYS[0];
let currentTrackerConnection = null;
let weatherLayerGroup = null;
let selectedSeats = [];
let currentBookingJourney = JOURNEYS[0];

// Supabase Database Connection State
const SUPABASE_URL = "https://evljltigdptjmyaendcx.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2bGpsdGlnZHB0am15YWVuZGN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNTY2NDksImV4cCI6MjA5NjkzMjY0OX0.kQLd7WKg6wM3znX6tsjcZeTjQao_Jgz99dPfg_8fVAA";
let supabaseClient = null;

if (SUPABASE_URL && SUPABASE_KEY && window.supabase) {
  try {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  } catch (err) {
    console.error("Failed to initialize Supabase client:", err);
  }
}


// 2. DOM Elements & Initialization
document.addEventListener("DOMContentLoaded", async () => {
  await loadRouteStatuses();
  initClock();
  initTabNavigation();
  initSearchEngine();
  initLiveTracker();
  initSeatBooking();
  initFareCalculator();
  initThemeToggle();
  initNotifications();
  initLanguageSwitcher();
  initMyBookingsLookup();
  initTicketWallet();
  initAdminAuth();
  
  // Initialize database status badge
  const statusBadge = document.getElementById("db-status-badge");
  const statusText = document.getElementById("db-status-text");
  if (statusBadge && statusText) {
    if (supabaseClient) {
      statusBadge.classList.add("connected");
      statusText.innerText = "Connected";
    } else {
      statusBadge.classList.remove("connected");
      statusText.innerText = "Simulation";
    }
  }

  subscribeToRealtimeBookings();

  
  // Set default dates to today
  const today = new Date().toISOString().split('T')[0];
  document.getElementById("travel-date").value = today;
  document.getElementById("travel-date").min = today;
});

// 3. Clock logic
function initClock() {
  const clockEl = document.getElementById("clock-time");
  setInterval(() => {
    const now = new Date();
    clockEl.innerText = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  }, 1000);
}

// Global Tab Meta state
let tabMeta = {
  search: {
    title: "Find Your Next Journey",
    subtitle: "Explore Sri Lanka's train and bus networks instantly."
  },
  tracker: {
    title: "Live GPS Route Tracker",
    subtitle: "Real-time positioning and estimated arrivals on active routes."
  },
  booking: {
    title: "Digital Seat Reservation",
    subtitle: "Select your coach class, pick seats, and generate digital ticket passes."
  },
  calculator: {
    title: "Fare & Route Cost Calculator",
    subtitle: "Find the optimal cost and travel times between stations."
  },
  mybookings: {
    title: "Manage Reservations",
    subtitle: "Search, verify, and cancel your Ceylon Transit bookings."
  },
  admin: {
    title: "Operator Admin Panel",
    subtitle: "Monitor transit metrics, bookings database, and toggle route suspensions."
  }
};

// 4. Multi-view Tabs Navigation
function initTabNavigation() {
  const navItems = document.querySelectorAll(".nav-item");
  const tabPanes = document.querySelectorAll(".tab-pane");
  const headerTitle = document.getElementById("header-title");
  const headerSubtitle = document.getElementById("header-subtitle");

  navItems.forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const tabId = item.getAttribute("data-tab");
      if (tabId === currentTab) return;

      // Update Active Navigation Item
      navItems.forEach(nav => nav.classList.remove("active"));
      item.classList.add("active");

      // Update Active Pane
      tabPanes.forEach(pane => pane.classList.remove("active"));
      const activePane = document.getElementById(`tab-${tabId}`);
      if (activePane) activePane.classList.add("active");

      // Update Header Titles
      currentTab = tabId;
      headerTitle.innerText = tabMeta[tabId].title;
      headerSubtitle.innerText = tabMeta[tabId].subtitle;

      // Leaflet specific layout correction on tab show
      if (tabId === "tracker") {
        setTimeout(() => {
          if (map) {
            map.invalidateSize();
            loadTrackerRoute();
          }
        }, 100);
      }
      
      // Admin panel update on tab show
      if (tabId === "admin") {
        checkAdminSession();
      }
    });
  });
}

// 5. Search Engine Logic
function initSearchEngine() {
  const searchForm = document.getElementById("search-form");
  const originSelect = document.getElementById("origin-select");
  const destSelect = document.getElementById("dest-select");
  const swapBtn = document.getElementById("swap-stations");
  const resultsSection = document.getElementById("results-section");
  const resultsCount = document.getElementById("results-count");
  const resultsList = document.getElementById("results-list-container");
  const filterChips = document.querySelectorAll(".filter-chip");

  let lastFilteredResults = [];

  // Swap locations button
  swapBtn.addEventListener("click", () => {
    const temp = originSelect.value;
    originSelect.value = destSelect.value;
    destSelect.value = temp;
  });

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const origin = originSelect.value;
    const dest = destSelect.value;
    const type = document.getElementById("transport-type").value;

    if (origin === dest) {
      showToast("alert", "Origin and Destination stations cannot be the same!");
      return;
    }

    // Filter schedules
    lastFilteredResults = JOURNEYS.filter(journey => {
      const matchOrigin = journey.origin === origin;
      const matchDest = journey.dest === dest;
      const matchType = type === "all" || journey.type === type;
      return matchOrigin && matchDest && matchType;
    });

    if (lastFilteredResults.length === 0) {
      lastFilteredResults = solveMultiModalConnections(origin, dest, type);
    }

    // Reset filter chips
    filterChips.forEach(chip => chip.classList.remove("active"));
    filterChips[0].classList.add("active");

    renderSearchResults(lastFilteredResults);

    // Save to recents if results are found
    if (lastFilteredResults.length > 0) {
      addRecentSearch(origin, dest, type);
    }
  });

  // Category filters (All, Trains, Buses)
  filterChips.forEach(chip => {
    chip.addEventListener("click", () => {
      filterChips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");

      const filterType = chip.getAttribute("data-filter");
      let filtered = lastFilteredResults;
      if (filterType !== "all") {
        filtered = lastFilteredResults.filter(j => j.type === filterType);
      }
      renderSearchResults(filtered);
    });
  });

  function renderSearchResults(results) {
    resultsList.innerHTML = "";
    resultsCount.innerText = results.length;
    resultsSection.style.display = "block";

    if (results.length === 0) {
      resultsList.innerHTML = `
        <div class="glass-card text-center py-5">
          <i class="fa-solid fa-circle-info text-muted" style="font-size: 32px; margin-bottom: 12px;"></i>
          <h4>No Scheduled Journeys Found</h4>
          <p class="text-muted text-sm mt-1">Try changing your stations, switching transit mode, or checking alternative dates.</p>
        </div>
      `;
      return;
    }

    results.forEach(journey => {
      if (journey.isConnection) {
        const isMixed = journey.type === "mixed";
        const iconClass = isMixed ? "fa-solid fa-route" : (journey.type === "train" ? "fa-train" : "fa-bus");
        const typeLabel = isMixed ? "Mixed Transit" : (journey.type === "train" ? "Train Connection" : "Bus Connection");
        
        let statusClass = "status-ontime";
        if (journey.status === "Delayed") statusClass = "status-delayed";
        else if (journey.status === "Suspended") statusClass = "status-suspended";
        
        const isSuspended = journey.status === "Suspended";
        
        const card = document.createElement("div");
        card.className = "glass-card result-card connection-result";
        card.innerHTML = `
          <div class="result-type-icon connection-icon">
            <i class="${iconClass}"></i>
          </div>
          <div class="result-main-details">
            <span class="result-vehicle-name">${journey.leg1.name} ➔ ${journey.leg2.name}</span>
            <span class="result-route-line">${typeLabel} • Hub: ${journey.transferHub} (${journey.transferWaitMins}m wait)</span>
          </div>
          <div class="result-schedule-times">
            <div class="time-row">
              <i class="fa-regular fa-clock text-muted"></i>
              <strong>${journey.departure}</strong>
              <span class="station-label">(${journey.origin})</span>
            </div>
            <div class="time-row">
              <i class="fa-solid fa-flag-checkered text-muted"></i>
              <strong>${journey.arrival}</strong>
              <span class="station-label">(${journey.dest})</span>
            </div>
          </div>
          <div class="result-price-info">
            <span class="price-text">Rs. ${journey.price}</span>
            <span class="price-desc">Total Fare (2 Legs)</span>
            <span class="status-pill ${statusClass}">${journey.status}</span>
          </div>
          <div class="result-actions">
            <button class="btn btn-outline btn-sm btn-track-connection" data-id="${journey.id}" ${isSuspended ? 'disabled' : ''}>
              <i class="fa-solid fa-map-location-dot"></i> Track
            </button>
            <button class="btn btn-primary btn-sm btn-book-connection" data-id="${journey.id}" ${isSuspended ? 'disabled' : ''}>
              <i class="fa-solid fa-ticket"></i> Book
            </button>
            <button class="btn btn-outline btn-sm btn-book-official-connection" data-id="${journey.id}" ${isSuspended ? 'disabled' : ''}>
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Official
            </button>
          </div>
        `;
        resultsList.appendChild(card);
        return;
      }

      const isTrain = journey.type === "train";
      const iconClass = isTrain ? "fa-train" : "fa-bus";
      const typeLabel = isTrain ? "Train" : "Luxury Bus";
      let statusClass = "status-ontime";
      if (journey.status === "Delayed") statusClass = "status-delayed";
      else if (journey.status === "Suspended") statusClass = "status-suspended";
      
      const statusDelay = journey.delay > 0 ? ` (+${journey.delay}m)` : "";
      const isSuspended = journey.status === "Suspended";

      const card = document.createElement("div");
      card.className = `glass-card result-card ${journey.type}-result`;
      card.innerHTML = `
        <div class="result-type-icon">
          <i class="fa-solid ${iconClass}"></i>
        </div>
        <div class="result-main-details">
          <span class="result-vehicle-name">${journey.name}</span>
          <span class="result-route-line">${typeLabel} • Code: ${journey.id} • ${journey.class}</span>
        </div>
        <div class="result-schedule-times">
          <div class="time-row">
            <i class="fa-regular fa-clock text-muted"></i>
            <strong>${journey.departure}</strong>
            <span class="station-label">(${journey.origin})</span>
          </div>
          <div class="time-row">
            <i class="fa-solid fa-flag-checkered text-muted"></i>
            <strong>${journey.arrival}</strong>
            <span class="station-label">(${journey.dest})</span>
          </div>
        </div>
        <div class="result-price-info">
          <span class="price-text">Rs. ${journey.price}</span>
          <span class="price-desc">Base Fare • Class Details</span>
          <span class="status-pill ${statusClass}">${journey.status}${statusDelay}</span>
        </div>
        <div class="result-actions">
          <button class="btn btn-outline btn-sm ${isSuspended ? '' : 'btn-track-this'}" data-id="${journey.id}" ${isSuspended ? 'disabled' : ''}>
            <i class="fa-solid ${isSuspended ? 'fa-ban' : 'fa-map-location-dot'}"></i> ${isSuspended ? 'Suspended' : 'Track'}
          </button>
          <button class="btn btn-primary btn-sm ${isSuspended ? '' : 'btn-book-this'}" data-id="${journey.id}" ${isSuspended ? 'disabled' : ''}>
            <i class="fa-solid ${isSuspended ? 'fa-ban' : 'fa-ticket'}"></i> ${isSuspended ? 'Suspended' : 'Book'}
          </button>
          <button class="btn btn-outline btn-sm ${isSuspended ? '' : 'btn-book-official-search'}" data-id="${journey.id}" ${isSuspended ? 'disabled' : ''}>
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Official
          </button>
        </div>
      `;
      resultsList.appendChild(card);
    });

    // Connect Dynamic click actions inside cards
    document.querySelectorAll(".btn-track-this").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        triggerTrackerForVehicle(id);
      });
    });

    document.querySelectorAll(".btn-book-this").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        triggerBookingForVehicle(id);
      });
    });

    document.querySelectorAll(".btn-book-official-search").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const journey = JOURNEYS.find(j => j.id === id);
        if (journey) {
          triggerExternalBooking(journey);
        }
      });
    });

    document.querySelectorAll(".btn-track-connection").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        triggerTrackerForVehicle(id);
        const conn = lastFilteredResults.find(r => r.id === id);
        if (conn) {
          showToast("info", `Tracking connected journey: ${conn.leg1.name} to ${conn.leg2.name}`);
        }
      });
    });

    document.querySelectorAll(".btn-book-connection").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const conn = lastFilteredResults.find(r => r.id === id);
        if (conn) {
          triggerBookingForVehicle(conn.leg1.id);
          showToast("info", `Reserving Leg 1 (${conn.leg1.name}) of your connected journey.`);
        }
      });
    });

    document.querySelectorAll(".btn-book-official-connection").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const conn = lastFilteredResults.find(r => r.id === id);
        if (conn && conn.leg1) {
          triggerExternalBooking(conn.leg1);
        }
      });
    });
  }

  // Recent Searches Logic
  const recentSection = document.getElementById("recent-searches-section");
  const recentChipsContainer = document.getElementById("recent-chips-container");
  const clearRecentBtn = document.getElementById("clear-recent-btn");

  function renderRecentChips() {
    const recents = JSON.parse(localStorage.getItem("lankatransit_recents") || "[]");
    recentChipsContainer.innerHTML = "";

    if (recents.length === 0) {
      recentSection.style.display = "none";
      return;
    }

    recentSection.style.display = "flex";

    recents.forEach(search => {
      const chip = document.createElement("button");
      chip.className = "recent-chip";
      chip.type = "button";
      
      const isTrain = search.type === "train";
      const isBus = search.type === "bus";
      let iconClass = "fa-solid fa-arrows-left-right";
      if (isTrain) iconClass = "fa-solid fa-train";
      else if (isBus) iconClass = "fa-solid fa-bus";

      chip.innerHTML = `
        <i class="${iconClass}"></i>
        <span>${search.origin} to ${search.dest}</span>
      `;

      chip.addEventListener("click", () => {
        originSelect.value = search.origin;
        destSelect.value = search.dest;
        document.getElementById("transport-type").value = search.type;
        
        // Trigger submit
        searchForm.dispatchEvent(new Event("submit"));
      });

      recentChipsContainer.appendChild(chip);
    });
  }

  function addRecentSearch(origin, dest, type) {
    let recents = JSON.parse(localStorage.getItem("lankatransit_recents") || "[]");
    
    // Remove duplicate
    recents = recents.filter(r => !(r.origin === origin && r.dest === dest && r.type === type));
    
    // Add to front
    recents.unshift({ origin, dest, type });
    
    // Cap at 4 items
    if (recents.length > 4) recents.pop();
    
    localStorage.setItem("lankatransit_recents", JSON.stringify(recents));
    renderRecentChips();
  }

  // Clear listener
  clearRecentBtn.addEventListener("click", () => {
    localStorage.removeItem("lankatransit_recents");
    renderRecentChips();
  });

  // Initial render of persisted searches
  renderRecentChips();
}

// 6. Interactive Live Tracker Map & Progress Animation
function initLiveTracker() {
  const routeSelect = document.getElementById("tracker-route-select");
  const trainModeBtn = document.getElementById("tracker-mode-train");
  const busModeBtn = document.getElementById("tracker-mode-bus");

  // Switch Active Selector Category
  trainModeBtn.addEventListener("click", () => {
    trainModeBtn.classList.add("active");
    busModeBtn.classList.remove("active");
    populateTrackerSelect("train");
  });

  busModeBtn.addEventListener("click", () => {
    busModeBtn.classList.add("active");
    trainModeBtn.classList.remove("active");
    populateTrackerSelect("bus");
  });

  routeSelect.addEventListener("change", () => {
    const vehicleId = routeSelect.value;
    if (vehicleId && vehicleId.includes("+")) {
      const conn = lastFilteredResults.find(r => r.id === vehicleId);
      if (conn) {
        currentTrackerConnection = conn;
        currentTrackerVehicle = conn.leg1;
        loadTrackerRoute();
      }
    } else {
      currentTrackerConnection = null;
      const vehicle = JOURNEYS.find(j => j.id === vehicleId);
      if (vehicle) {
        currentTrackerVehicle = vehicle;
        loadTrackerRoute();
      }
    }
  });

  // Initialize Leaflet Map
  const mapContainer = document.getElementById("tracker-map");
  if (mapContainer) {
    map = L.map("tracker-map").setView([7.8731, 80.7718], 8); // Center of Sri Lanka
    
    // Default Dark tiles
    updateMapTiles();

    // Weather Layer Toggle Listener
    const weatherToggle = document.getElementById("toggle-weather-layer");
    if (weatherToggle) {
      weatherToggle.addEventListener("change", (e) => {
        if (e.target.checked) {
          drawWeatherAlerts();
          if (map) {
            weatherLayerGroup.addTo(map);
          }
          showToast("info", "Live weather warning overlays enabled on the tracker map.");
        } else {
          if (map && weatherLayerGroup) {
            map.removeLayer(weatherLayerGroup);
          }
          showToast("info", "Weather warning overlays disabled.");
        }
      });
    }
  }

  // Populate Default
  populateTrackerSelect("train");
}

function updateMapTiles() {
  if (!map) return;
  const isLight = document.documentElement.getAttribute("data-theme") === "light";
  
  // Clear existing tile layers
  map.eachLayer(layer => {
    if (layer instanceof L.TileLayer) {
      map.removeLayer(layer);
    }
  });

  const tileUrl = isLight 
    ? "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
    : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

  const attribution = isLight
    ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

  L.tileLayer(tileUrl, { attribution, maxZoom: 19 }).addTo(map);
}

function populateTrackerSelect(type) {
  const routeSelect = document.getElementById("tracker-route-select");
  if (!routeSelect) return;
  const currentVal = routeSelect.value;
  routeSelect.innerHTML = "";
  
  const filtered = JOURNEYS.filter(j => j.type === type);
  filtered.forEach(j => {
    const opt = document.createElement("option");
    opt.value = j.id;
    const localizedOrigin = getLocalizedStationName(j.origin);
    const localizedDest = getLocalizedStationName(j.dest);
    opt.innerText = `${j.name} (${j.id}) - ${localizedOrigin} to ${localizedDest}`;
    routeSelect.appendChild(opt);
  });

  if (currentVal && Array.from(routeSelect.options).some(o => o.value === currentVal)) {
    routeSelect.value = currentVal;
  } else if (filtered.length > 0) {
    currentTrackerVehicle = filtered[0];
    routeSelect.value = currentTrackerVehicle.id;
    loadTrackerRoute();
  }
}

// Draw polyline and start marker tracking
function loadTrackerRoute() {
  if (!map) return;

  // Clear existing tracks/markers
  mapMarkers.forEach(m => map.removeLayer(m));
  routeLines.forEach(l => map.removeLayer(l));
  mapMarkers = [];
  routeLines = [];
  
  if (trackerVehicleMarker) {
    map.removeLayer(trackerVehicleMarker);
    trackerVehicleMarker = null;
  }
  
  trackerVehicleMarkers.forEach(m => map.removeLayer(m));
  trackerVehicleMarkers = [];

  if (trackerAnimationTimer) {
    clearInterval(trackerAnimationTimer);
  }

  if (currentTrackerConnection) {
    const leg1 = currentTrackerConnection.leg1;
    const leg2 = currentTrackerConnection.leg2;
    const hubName = currentTrackerConnection.transferHub;
    
    const leg1Color = leg1.type === "train" ? "#00e5ff" : "#10b981";
    const leg2Color = leg2.type === "train" ? "#00e5ff" : "#10b981";

    const coords1 = ROUTES[leg1.route];
    const coords2 = ROUTES[leg2.route];

    if (!coords1 || !coords2) return;

    // Draw both polylines
    const routeLine1 = L.polyline(coords1, { color: leg1Color, weight: 4, opacity: 0.8 }).addTo(map);
    const routeLine2 = L.polyline(coords2, { color: leg2Color, weight: 4, opacity: 0.5, dashArray: "5, 10" }).addTo(map);
    routeLines.push(routeLine1, routeLine2);

    // Add stops for both legs, showing transfer hub specially
    const allStops = new Set([...leg1.stops, ...leg2.stops]);
    allStops.forEach(stopName => {
      const isHub = stopName === hubName;
      const station = STATIONS[stopName];
      if (station) {
        const isLeg1 = leg1.stops.includes(stopName);
        const color = isHub ? "#ffc107" : (isLeg1 ? leg1Color : leg2Color);
        
        const stationIcon = L.divIcon({
          className: 'station-map-pin',
          html: isHub 
            ? `<div style="background-color: #ffc107; width: 14px; height: 14px; border-radius: 50%; border: 3px solid #fff; box-shadow: 0 0 10px #ffc107;" class="pulse-hub"></div>`
            : `<div style="background-color: #fff; width: 8px; height: 8px; border-radius: 50%; border: 2px solid ${color};"></div>`,
          iconSize: isHub ? [16, 16] : [12, 12],
          iconAnchor: isHub ? [8, 8] : [6, 6]
        });

        const marker = L.marker(station.coords, { icon: stationIcon })
          .bindPopup(() => {
            if (isHub) {
              return `
                <div class="transfer-node-popup">
                  <span class="transfer-title"><i class="fa-solid fa-circle-nodes" style="color: #ffc107;"></i> Transfer Hub: ${stopName}</span>
                  <span class="transfer-pill">Layover: ${currentTrackerConnection.transferWaitMins} mins</span>
                  <span class="transfer-body">Arrive via ${leg1.name} at ${currentTrackerConnection.transferTimeStr}</span>
                  <span class="transfer-body">Depart via ${leg2.name} at ${leg2.departure}</span>
                </div>
              `;
            }
            return getStationPopupHTML(stopName, color);
          }, {
            className: 'custom-station-popup',
            maxWidth: 320,
            minWidth: 280
          })
          .addTo(map);
        mapMarkers.push(marker);
      }
    });

    // Fit map to show both legs
    const bounds = L.latLngBounds(coords1.concat(coords2));
    map.fitBounds(bounds, { padding: [40, 40] });

    const isSuspended = leg1.status === "Suspended" || leg2.status === "Suspended";
    trackerProgress = isSuspended ? 0.0 : (0.2 + Math.random() * 0.6);
    updateTrackerUI();

    // Setup visual markers for both legs
    const icon1 = L.divIcon({
      className: 'vehicle-tracker-pin',
      html: `<div class="glowing-tracker-pin" style="background-color: ${leg1.status === "Suspended" ? '#ef4444' : leg1Color}; color: #0a0f1e; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 10px ${leg1Color}; border: 2px solid #fff;">
               <i class="fa-solid ${leg1.type === 'train' ? 'fa-train' : 'fa-bus'}" style="font-size: 14px;"></i>
             </div>`,
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });

    const icon2 = L.divIcon({
      className: 'vehicle-tracker-pin',
      html: `<div class="glowing-tracker-pin" style="background-color: ${leg2.status === "Suspended" ? '#ef4444' : leg2Color}; color: #0a0f1e; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 10px ${leg2Color}; border: 2px solid #fff; opacity: ${trackerProgress >= 0.5 ? 1.0 : 0.45};">
               <i class="fa-solid ${leg2.type === 'train' ? 'fa-train' : 'fa-bus'}" style="font-size: 14px;"></i>
             </div>`,
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });

    const p1 = interpolatePosition(coords1, trackerProgress < 0.5 ? trackerProgress * 2.0 : 1.0);
    const p2 = interpolatePosition(coords2, trackerProgress >= 0.5 ? (trackerProgress - 0.5) * 2.0 : 0.0);

    const marker1 = L.marker(p1, { icon: icon1 }).addTo(map).bindPopup(`<strong>${leg1.name} (Leg 1)</strong><br>Status: ${leg1.status}`);
    const marker2 = L.marker(p2, { icon: icon2 }).addTo(map).bindPopup(`<strong>${leg2.name} (Leg 2)</strong><br>Status: ${leg2.status}`);

    trackerVehicleMarkers.push(marker1, marker2);

    if (!isSuspended) {
      trackerAnimationTimer = setInterval(() => {
        trackerProgress += 0.003;
        if (trackerProgress > 1.0) trackerProgress = 0.0;

        const pos1 = interpolatePosition(coords1, trackerProgress < 0.5 ? trackerProgress * 2.0 : 1.0);
        const pos2 = interpolatePosition(coords2, trackerProgress >= 0.5 ? (trackerProgress - 0.5) * 2.0 : 0.0);

        marker1.setLatLng(pos1);
        marker2.setLatLng(pos2);
        
        // Update opacity dynamically to highlight active vehicle
        const el2 = marker2.getElement();
        if (el2) {
          const pin = el2.querySelector('.glowing-tracker-pin');
          if (pin) pin.style.opacity = trackerProgress >= 0.5 ? "1.0" : "0.45";
        }
        const el1 = marker1.getElement();
        if (el1) {
          const pin = el1.querySelector('.glowing-tracker-pin');
          if (pin) pin.style.opacity = trackerProgress < 0.5 ? "1.0" : "0.45";
        }

        updateTrackerUI();
      }, 1000);
    }
  } else {
    // Plot Stations Along the line
    const routeName = currentTrackerVehicle.route;
    const trackCoords = ROUTES[routeName];
    if (!trackCoords) return;

    // Add line to map
    const lineColor = currentTrackerVehicle.type === "train" ? "#00e5ff" : "#10b981";
    const routeLine = L.polyline(trackCoords, { color: lineColor, weight: 4, opacity: 0.8 }).addTo(map);
    routeLines.push(routeLine);

    // Add markers for stops
    currentTrackerVehicle.stops.forEach(stopName => {
      const station = STATIONS[stopName];
      if (station) {
        const stationIcon = L.divIcon({
          className: 'station-map-pin',
          html: `<div style="background-color: #fff; width: 8px; height: 8px; border-radius: 50%; border: 2px solid ${lineColor};"></div>`,
          iconSize: [12, 12]
        });

        const marker = L.marker(station.coords, { icon: stationIcon })
          .bindPopup(() => getStationPopupHTML(stopName, lineColor), {
            className: 'custom-station-popup',
            maxWidth: 320,
            minWidth: 280
          })
          .addTo(map);
        mapMarkers.push(marker);
      }
    });

    // Fit Map bounds to show route
    map.fitBounds(routeLine.getBounds(), { padding: [40, 40] });

    // Initialize Vehicle marker movement animation
    const isSuspended = currentTrackerVehicle.status === "Suspended";
    trackerProgress = isSuspended ? 0.0 : (0.2 + Math.random() * 0.6); // Lock progress to 0% if suspended
    updateTrackerUI();

    const vehicleIcon = L.divIcon({
      className: 'vehicle-tracker-pin',
      html: `<div class="glowing-tracker-pin" style="background-color: ${isSuspended ? '#ef4444' : lineColor}; color: #0a0f1e; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 10px ${isSuspended ? '#ef4444' : lineColor}; border: 2px solid #fff;">
               <i class="fa-solid ${currentTrackerVehicle.type === 'train' ? 'fa-train' : 'fa-bus'}" style="font-size: 14px;"></i>
             </div>`,
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });

    const startCoords = interpolatePosition(trackCoords, trackerProgress);
    trackerVehicleMarker = L.marker(startCoords, { icon: vehicleIcon }).addTo(map)
      .bindPopup(`<strong>${currentTrackerVehicle.name} (${currentTrackerVehicle.id})</strong><br>Status: ${currentTrackerVehicle.status}`);

    // Animate tracker loop if not suspended
    if (!isSuspended) {
      trackerAnimationTimer = setInterval(() => {
        trackerProgress += 0.003; // Slowly increment progress
        if (trackerProgress > 1.0) trackerProgress = 0.0; // Loop around

        const newCoords = interpolatePosition(trackCoords, trackerProgress);
        if (newCoords && trackerVehicleMarker) {
          trackerVehicleMarker.setLatLng(newCoords);
          updateTrackerUI();
        }
      }, 1000);
    }
  }
}

// Interpolate LatLng points along route array segment
function interpolatePosition(coords, fraction) {
  if (coords.length === 0) return null;
  if (coords.length === 1) return coords[0];
  if (fraction <= 0) return coords[0];
  if (fraction >= 1) return coords[coords.length - 1];

  const totalSegments = coords.length - 1;
  const rawIndex = fraction * totalSegments;
  const index = Math.floor(rawIndex);
  const localFraction = rawIndex - index;

  const start = coords[index];
  const end = coords[index + 1];

  const lat = start[0] + (end[0] - start[0]) * localFraction;
  const lng = start[1] + (end[1] - start[1]) * localFraction;

  return [lat, lng];
}

// Update text items in Tracker control panel
function updateTrackerUI() {
  const percentage = Math.round(trackerProgress * 100);
  
  if (currentTrackerConnection) {
    const leg1 = currentTrackerConnection.leg1;
    const leg2 = currentTrackerConnection.leg2;
    const activeLeg = trackerProgress < 0.5 ? leg1 : leg2;
    const localProgress = trackerProgress < 0.5 ? trackerProgress * 2.0 : (trackerProgress - 0.5) * 2.0;
    
    // Set UI stats
    document.getElementById("tracker-vehicle-name").innerText = `${leg1.name} ➔ ${leg2.name}`;
    
    const localizedOrigin = getLocalizedStationName(currentTrackerConnection.origin);
    const localizedDest = getLocalizedStationName(currentTrackerConnection.dest);
    const localizedHub = getLocalizedStationName(currentTrackerConnection.transferHub);
    document.getElementById("tracker-route-line").innerText = `${localizedOrigin} ➔ ${localizedHub} ➔ ${localizedDest}`;
    
    const statusBadge = document.getElementById("tracker-status-badge");
    statusBadge.innerText = activeLeg.status;
    const isSuspended = activeLeg.status === "Suspended";
    let badgeClass = "status-ontime";
    if (activeLeg.status === "Delayed") badgeClass = "status-delayed";
    else if (activeLeg.status === "Suspended") badgeClass = "status-suspended";
    statusBadge.className = `status-badge ${badgeClass}`;

    // Suspended overlay alert display
    const warningContainerId = "tracker-suspended-warning";
    let warningEl = document.getElementById(warningContainerId);
    if (isSuspended) {
      if (!warningEl) {
        warningEl = document.createElement("div");
        warningEl.id = warningContainerId;
        warningEl.className = "tracker-suspended-alert";
        warningEl.innerHTML = `
          <i class="fa-solid fa-triangle-exclamation"></i>
          <span>Operations are fully suspended due to landslides and adverse weather alerts.</span>
        `;
        const routeLineEl = document.getElementById("tracker-route-line");
        if (routeLineEl) {
          routeLineEl.parentNode.insertBefore(warningEl, routeLineEl.nextSibling);
        }
      }
    } else {
      if (warningEl) {
        warningEl.remove();
      }
    }

    // Next Stop Calculation based on stops count
    const stopIndex = Math.min(
      Math.floor(localProgress * activeLeg.stops.length),
      activeLeg.stops.length - 1
    );
    const nextStopName = activeLeg.stops[Math.min(stopIndex + 1, activeLeg.stops.length - 1)];
    document.getElementById("tracker-next-stop").innerText = getLocalizedStationName(nextStopName);

    // Speeds & timings
    const isTrain = activeLeg.type === "train";
    let currentSpeed = "0 km/h";
    if (!isSuspended) {
      currentSpeed = percentage >= 98 ? "0 km/h" : (isTrain ? `${50 + Math.round(Math.random() * 15)} km/h` : `${65 + Math.round(Math.random() * 20)} km/h`);
    }
    document.getElementById("tracker-current-speed").innerText = currentSpeed;
    
    // ETA calculation
    if (isSuspended) {
      document.getElementById("tracker-eta-stop").innerText = "N/A (Suspended)";
    } else {
      const etaMins = Math.round((1.0 - trackerProgress) * 120); // minutes remaining to destination
      if (etaMins === 0) {
        document.getElementById("tracker-eta-stop").innerText = "Arrived";
      } else {
        const etaDate = new Date();
        etaDate.setMinutes(etaDate.getMinutes() + etaMins);
        document.getElementById("tracker-eta-stop").innerText = etaDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      }
    }

    document.getElementById("tracker-delay-val").innerText = `${activeLeg.delay} min`;
    document.getElementById("tracker-delay-val").className = `stat-value ${activeLeg.delay > 0 ? "text-warning" : "text-success"}`;

    // Timeline UI updates
    document.getElementById("tracker-timeline-start").innerText = localizedOrigin;
    document.getElementById("tracker-timeline-end").innerText = localizedDest;
    document.getElementById("tracker-progress-fill").style.width = `${percentage}%`;
    document.getElementById("tracker-vehicle-marker").style.left = `${percentage}%`;
    
    // Update progress vehicle icon dynamically
    const progressIcon = document.querySelector("#tracker-vehicle-marker i");
    if (progressIcon) {
      progressIcon.className = `fa-solid ${activeLeg.type === "train" ? "fa-train" : "fa-bus"}`;
    }

    document.getElementById("tracker-progress-percentage").innerText = `Journey ${percentage}% Completed`;
  } else {
    // Set UI stats
    document.getElementById("tracker-vehicle-name").innerText = `${currentTrackerVehicle.name} (${currentTrackerVehicle.id})`;
    const localizedOrigin = getLocalizedStationName(currentTrackerVehicle.origin);
    const localizedDest = getLocalizedStationName(currentTrackerVehicle.dest);
    document.getElementById("tracker-route-line").innerText = `${localizedOrigin} ➔ ${localizedDest}`;
    
    const statusBadge = document.getElementById("tracker-status-badge");
    statusBadge.innerText = currentTrackerVehicle.status;
    const isSuspended = currentTrackerVehicle.status === "Suspended";
    let badgeClass = "status-ontime";
    if (currentTrackerVehicle.status === "Delayed") badgeClass = "status-delayed";
    else if (currentTrackerVehicle.status === "Suspended") badgeClass = "status-suspended";
    statusBadge.className = `status-badge ${badgeClass}`;

    // Suspended overlay alert display
    const warningContainerId = "tracker-suspended-warning";
    let warningEl = document.getElementById(warningContainerId);
    if (isSuspended) {
      if (!warningEl) {
        warningEl = document.createElement("div");
        warningEl.id = warningContainerId;
        warningEl.className = "tracker-suspended-alert";
        warningEl.innerHTML = `
          <i class="fa-solid fa-triangle-exclamation"></i>
          <span>This journey's operations are fully suspended due to landslides and adverse weather alerts.</span>
        `;
        const routeLineEl = document.getElementById("tracker-route-line");
        if (routeLineEl) {
          routeLineEl.parentNode.insertBefore(warningEl, routeLineEl.nextSibling);
        }
      }
    } else {
      if (warningEl) {
        warningEl.remove();
      }
    }

    // Next Stop Calculation based on stops count
    const stopIndex = Math.min(
      Math.floor(trackerProgress * currentTrackerVehicle.stops.length),
      currentTrackerVehicle.stops.length - 1
    );
    const nextStopName = currentTrackerVehicle.stops[Math.min(stopIndex + 1, currentTrackerVehicle.stops.length - 1)];
    document.getElementById("tracker-next-stop").innerText = getLocalizedStationName(nextStopName);

    // Speeds & timings
    const isTrain = currentTrackerVehicle.type === "train";
    let currentSpeed = "0 km/h";
    if (!isSuspended) {
      currentSpeed = percentage >= 98 ? "0 km/h" : (isTrain ? `${50 + Math.round(Math.random() * 15)} km/h` : `${65 + Math.round(Math.random() * 20)} km/h`);
    }
    document.getElementById("tracker-current-speed").innerText = currentSpeed;
    
    // ETA calculation
    if (isSuspended) {
      document.getElementById("tracker-eta-stop").innerText = "N/A (Suspended)";
    } else {
      const etaMins = Math.round((1.0 - trackerProgress) * 90); // minutes remaining to destination
      if (etaMins === 0) {
        document.getElementById("tracker-eta-stop").innerText = "Arrived";
      } else {
        const etaDate = new Date();
        etaDate.setMinutes(etaDate.getMinutes() + etaMins);
        document.getElementById("tracker-eta-stop").innerText = etaDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      }
    }

    document.getElementById("tracker-delay-val").innerText = `${currentTrackerVehicle.delay} min`;
    document.getElementById("tracker-delay-val").className = `stat-value ${currentTrackerVehicle.delay > 0 ? "text-warning" : "text-success"}`;

    // Timeline UI updates
    document.getElementById("tracker-timeline-start").innerText = getLocalizedStationName(currentTrackerVehicle.origin);
    document.getElementById("tracker-timeline-end").innerText = getLocalizedStationName(currentTrackerVehicle.dest);
    document.getElementById("tracker-progress-fill").style.width = `${percentage}%`;
    document.getElementById("tracker-vehicle-marker").style.left = `${percentage}%`;
    
    // Update progress vehicle icon dynamically
    const progressIcon = document.querySelector("#tracker-vehicle-marker i");
    if (progressIcon) {
      progressIcon.className = `fa-solid ${currentTrackerVehicle.type === "train" ? "fa-train" : "fa-bus"}`;
    }

    document.getElementById("tracker-progress-percentage").innerText = `Journey ${percentage}% Completed`;
  }
}

// Route navigation redirection from Search Card to Live Tracker
function triggerTrackerForVehicle(vehicleId) {
  if (vehicleId && vehicleId.includes("+")) {
    const conn = lastFilteredResults.find(r => r.id === vehicleId);
    if (conn) {
      currentTrackerConnection = conn;
      currentTrackerVehicle = conn.leg1; // Leg 1 is default reference
      
      // Swap nav tabs
      document.getElementById("nav-tracker").click();
      
      setTimeout(() => {
        const routeSelect = document.getElementById("tracker-route-select");
        if (routeSelect) {
          let opt = Array.from(routeSelect.options).find(o => o.value === vehicleId);
          if (!opt) {
            opt = document.createElement("option");
            opt.value = vehicleId;
            opt.innerText = `[Connection] ${conn.leg1.name} ➔ ${conn.leg2.name}`;
            routeSelect.appendChild(opt);
          }
          routeSelect.value = vehicleId;
        }
        loadTrackerRoute();
      }, 150);
    }
  } else {
    currentTrackerConnection = null;
    const vehicle = JOURNEYS.find(j => j.id === vehicleId);
    if (vehicle) {
      currentTrackerVehicle = vehicle;
      
      // Swap nav tabs
      document.getElementById("nav-tracker").click();
      
      // Set selector value
      const trackerMode = document.getElementById(vehicle.type === "train" ? "tracker-mode-train" : "tracker-mode-bus");
      if (trackerMode) trackerMode.click();
      
      setTimeout(() => {
        const routeSelect = document.getElementById("tracker-route-select");
        if (routeSelect) routeSelect.value = vehicleId;
        loadTrackerRoute();
      }, 150);
    }
  }
}

// 7. Interactive Seat Booking Coach Grid
function initSeatBooking() {
  const bookingSelect = document.getElementById("booking-vehicle-select");
  const classSelect = document.getElementById("booking-class-select");
  const seatsContainer = document.getElementById("seats-grid-container");
  const bookBtn = document.getElementById("btn-reserve-seats");
  const ticketWrapper = document.getElementById("generated-ticket-wrapper");

  // Populate Booking Journeys list
  populateBookingSelect();

  // Triggers
  bookingSelect.addEventListener("change", () => {
    const id = bookingSelect.value;
    const vehicle = JOURNEYS.find(j => j.id === id);
    if (vehicle) {
      currentBookingJourney = vehicle;
      selectedSeats = [];
      generateSeatGrid();
      updateBookingSummary();
    }
  });

  classSelect.addEventListener("change", () => {
    selectedSeats = [];
    generateSeatGrid();
    updateBookingSummary();
  });

  bookBtn.addEventListener("click", async () => {
    if (selectedSeats.length === 0) return;
    
    const travelDate = document.getElementById("travel-date").value || new Date().toISOString().split('T')[0];
    
    // Calculate total price based on class multipliers
    const basePrice = currentBookingJourney.price;
    let multiplier = 1.0;
    if (classSelect.value === "1st") multiplier = 1.6;
    if (classSelect.value === "3rd") multiplier = 0.6;
    const total = Math.round(selectedSeats.length * basePrice * multiplier);

    let refId = "LT-" + Math.floor(10000000 + Math.random() * 90000000) + "-SL";

    if (supabaseClient) {
      try {
        bookBtn.disabled = true;
        const originalHTML = bookBtn.innerHTML;
        bookBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Reserving...`;
        
        const { data, error } = await supabaseClient.from('bookings').insert({
          journey_id: currentBookingJourney.id,
          vehicle_name: currentBookingJourney.name,
          origin: currentBookingJourney.origin,
          destination: currentBookingJourney.dest,
          travel_date: travelDate,
          cabin_class: classSelect.value,
          seats: selectedSeats,
          total_fare: total
        }).select();

        if (error) throw error;
        
        if (data && data[0]) {
          refId = data[0].id;
        }

        // Refresh grid
        await generateSeatGrid();
      } catch (err) {
        console.error("Database reservation failed:", err);
        showToast("alert", "Failed to save reservation to database. Please make sure the table schema matches and public RLS inserts are allowed.");
        bookBtn.disabled = false;
        bookBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i> Book Selected Seats`;
        return;
      }
    } else {
      // Save simulated booking to LocalStorage so it updates the admin charts/metrics
      try {
        const simBookings = JSON.parse(localStorage.getItem("lankatransit_sim_bookings") || "[]");
        simBookings.push({
          id: refId,
          passenger_name: "Guest Explorer",
          journey_id: currentBookingJourney.id,
          vehicle_name: currentBookingJourney.name,
          origin: currentBookingJourney.origin,
          destination: currentBookingJourney.dest,
          travel_date: travelDate,
          cabin_class: classSelect.value,
          seats: selectedSeats,
          total_fare: total,
          created_at: new Date().toISOString()
        });
        localStorage.setItem("lankatransit_sim_bookings", JSON.stringify(simBookings));
      } catch (err) {
        console.error("Failed to save simulation booking:", err);
      }
    }

    // Reset button UI
    bookBtn.disabled = false;
    bookBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i> Book Selected Seats`;

    // Generate Boarding Pass Ticket
    document.getElementById("ticket-origin-code").innerText = STATIONS[currentBookingJourney.origin].code;
    document.getElementById("ticket-origin-name").innerText = getLocalizedStationName(currentBookingJourney.origin);
    document.getElementById("ticket-dest-code").innerText = STATIONS[currentBookingJourney.dest].code;
    document.getElementById("ticket-dest-name").innerText = getLocalizedStationName(currentBookingJourney.dest);
    document.getElementById("ticket-date-val").innerText = travelDate;
    document.getElementById("ticket-time-val").innerText = currentBookingJourney.departure;
    
    document.getElementById("ticket-seats-val").innerText = `Car 02 / ${selectedSeats.join(", ")}`;
    document.getElementById("ticket-vehicle-val").innerText = currentBookingJourney.name;
    document.getElementById("ticket-ref-val").innerText = refId;

    // Save ticket details to Local Wallet
    const ticketObj = {
      id: refId,
      vehicle_name: currentBookingJourney.name,
      origin: currentBookingJourney.origin,
      destination: currentBookingJourney.dest,
      travel_date: travelDate,
      seats: [...selectedSeats],
      total_fare: total
    };
    saveTicketToWallet(ticketObj);

    // Show ticket
    ticketWrapper.style.display = "block";
    ticketWrapper.scrollIntoView({ behavior: 'smooth' });

    showToast("info", `Reservation Successful! Seat(s) ${selectedSeats.join(", ")} reserved for ${currentBookingJourney.name}.`);
  });

  // Ticket buttons
  document.getElementById("btn-print-ticket").addEventListener("click", () => {
    window.print();
  });

  document.getElementById("btn-download-ticket").addEventListener("click", () => {
    const element = document.getElementById("generated-ticket-wrapper");
    
    // Extract travel details to create a unique filename
    const seats = document.getElementById("ticket-seats-val").innerText.replace(/[\s\/,]+/g, '-');
    const vehicle = currentBookingJourney.name.replace(/\s+/g, '-');
    const filename = `LankaTransit-Ticket-${vehicle}-${seats}.pdf`;

    // Configure html2pdf options
    const opt = {
      margin:       0.3,
      filename:     filename,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { 
        scale: 2, 
        useCORS: true,
        backgroundColor: null // Honors transparent/radial-gradient CSS styles
      },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    // Temporarily hide the action buttons inside the ticket layout so they don't print on the PDF
    const actionsEl = element.querySelector(".ticket-actions");
    if (actionsEl) actionsEl.style.visibility = "hidden";
    
    // Generate and save PDF, then restore action buttons
    html2pdf().set(opt).from(element).save().finally(() => {
      if (actionsEl) actionsEl.style.visibility = "visible";
    });
  });

  // External Deep-Link Booking
  const externalBookingBtn = document.getElementById("btn-external-booking");
  if (externalBookingBtn) {
    externalBookingBtn.addEventListener("click", () => {
      triggerExternalBooking(currentBookingJourney);
    });
  }

  // Refresh seat grid if travel date is changed
  const dateInput = document.getElementById("travel-date");
  if (dateInput) {
    dateInput.addEventListener("change", () => {
      selectedSeats = [];
      generateSeatGrid();
      updateBookingSummary();
    });
  }

  // Default layout gen
  currentBookingJourney = JOURNEYS[0];
  generateSeatGrid();
  updateBookingSummary();
}

async function generateSeatGrid() {
  const seatsContainer = document.getElementById("seats-grid-container");
  seatsContainer.innerHTML = "";

  const bookBtn = document.getElementById("btn-reserve-seats");

  if (currentBookingJourney.status === "Suspended") {
    seatsContainer.innerHTML = `
      <div class="booking-suspended-alert">
        <i class="fa-solid fa-triangle-exclamation"></i>
        <h4>Route Operations Suspended</h4>
        <p>Bookings are temporarily closed for this train due to severe weather and landslide warnings on the Main Line caused by Cyclone Ditwa.</p>
      </div>
    `;
    selectedSeats = [];
    if (bookBtn) bookBtn.disabled = true;
    return;
  }

  let occupiedSeats = new Set();

  if (supabaseClient) {
    const travelDate = document.getElementById("travel-date").value || new Date().toISOString().split('T')[0];
    try {
      const { data, error } = await supabaseClient
        .from('bookings')
        .select('seats')
        .eq('journey_id', currentBookingJourney.id)
        .eq('travel_date', travelDate);
      
      if (error) {
        console.error("Error querying bookings:", error);
      } else if (data) {
        data.forEach(booking => {
          if (Array.isArray(booking.seats)) {
            booking.seats.forEach(seat => occupiedSeats.add(seat));
          }
        });
      }
    } catch (err) {
      console.error("Database query failed:", err);
    }
  }

  const classSelect = document.getElementById("booking-class-select");
  const cabinClass = classSelect ? classSelect.value : "2nd";
  
  // Set class styling class on container
  seatsContainer.className = "seats-grid";
  seatsContainer.classList.add("class-" + cabinClass);

  let seatLetters = ["A", "B", "C", "D"];
  if (cabinClass === "1st") {
    // Add premium window at the rear of the observation carriage
    const windowEl = document.createElement("div");
    windowEl.className = "coach-rear-window";
    windowEl.innerText = "1st Class Glass Observation Deck Window";
    windowEl.style.gridColumn = "span 10";
    seatsContainer.appendChild(windowEl);

    seatLetters = ["A", "B"];
  } else if (cabinClass === "3rd") {
    seatLetters = ["A", "B", "C", "D", "E"];
  }

  const totalColumns = 10;
  const seed = currentBookingJourney.id.charCodeAt(1) || 5;
  
  for (let row = 0; row < seatLetters.length; row++) {
    const letter = seatLetters[row];
    for (let col = 1; col <= totalColumns; col++) {
      const seatId = `${letter}${col}`;
      
      let isOccupied = false;
      if (supabaseClient) {
        isOccupied = occupiedSeats.has(seatId);
      } else {
        const occupiedHash = (seed * row + col * 7) % 10;
        isOccupied = occupiedHash < 3; // ~30% occupied
      }

      const seatEl = document.createElement("div");
      seatEl.className = `seat ${isOccupied ? 'seat-occupied' : 'seat-available'}`;
      seatEl.classList.add(`row-${letter.toLowerCase()}`);
      seatEl.setAttribute("data-seat-id", seatId);
      seatEl.innerText = seatId;

      if (!isOccupied) {
        seatEl.addEventListener("click", () => {
          if (seatEl.classList.contains("seat-selected")) {
            seatEl.classList.remove("seat-selected");
            selectedSeats = selectedSeats.filter(s => s !== seatId);
          } else {
            seatEl.classList.add("seat-selected");
            selectedSeats.push(seatId);
          }
          updateBookingSummary();
        });
      }

      seatsContainer.appendChild(seatEl);
    }
  }
}

function updateBookingSummary() {
  const journeyTitle = document.getElementById("summary-journey-title");
  const cabinClass = document.getElementById("summary-cabin-class");
  const seatsList = document.getElementById("summary-seats-list");
  const totalFare = document.getElementById("summary-total-fare");
  const bookBtn = document.getElementById("btn-reserve-seats");

  const localizedOrigin = getLocalizedStationName(currentBookingJourney.origin);
  const localizedDest = getLocalizedStationName(currentBookingJourney.dest);
  journeyTitle.innerText = `${localizedOrigin} to ${localizedDest}`;
  
  const classSelect = document.getElementById("booking-class-select");
  const cabinClassVal = classSelect ? classSelect.value : "2nd";
  const classLabel = classSelect.options[classSelect.selectedIndex].text.split(" (")[0];
  cabinClass.innerText = classLabel;

  seatsList.innerText = selectedSeats.length > 0 ? selectedSeats.join(", ") : "None";

  // Calculate total price based on class multipliers
  const basePrice = currentBookingJourney.price;
  let multiplier = 1.0;
  if (cabinClassVal === "1st") multiplier = 1.6;
  if (cabinClassVal === "3rd") multiplier = 0.6;

  const total = Math.round(selectedSeats.length * basePrice * multiplier);
  totalFare.innerText = `Rs. ${total.toLocaleString()}`;

  // Disable button if no seats selected or if the route is suspended
  bookBtn.disabled = selectedSeats.length === 0 || currentBookingJourney.status === "Suspended";

  // Upgrade Banner logic
  const upgradeBanner = document.getElementById("cabin-upgrade-banner");
  if (upgradeBanner) {
    if (cabinClassVal === "1st" || currentBookingJourney.status === "Suspended") {
      upgradeBanner.style.display = "none";
    } else {
      upgradeBanner.style.display = "flex";
      const upgradeBtn = document.getElementById("btn-upgrade-cabin");
      
      let priceDiff = 0;
      let targetClassLabel = "1st Class A/C Observation";
      if (cabinClassVal === "3rd") {
        priceDiff = Math.round(basePrice * 0.4); // diff between 3rd (0.6) and 2nd (1.0)
        targetClassLabel = "2nd Class Reserved";
      } else if (cabinClassVal === "2nd") {
        priceDiff = Math.round(basePrice * 0.6); // diff between 2nd (1.0) and 1st (1.6)
        targetClassLabel = "1st Class Observation";
      }

      document.getElementById("upgrade-banner-title").innerText = `Upgrade to ${targetClassLabel}!`;
      document.getElementById("upgrade-banner-desc").innerText = `Enjoy a premium travel experience for just Rs. ${priceDiff.toLocaleString()} more per seat.`;

      // Remove existing event listeners by cloning button
      const newUpgradeBtn = upgradeBtn.cloneNode(true);
      upgradeBtn.parentNode.replaceChild(newUpgradeBtn, upgradeBtn);

      newUpgradeBtn.addEventListener("click", () => {
        if (cabinClassVal === "3rd") {
          classSelect.value = "2nd";
        } else if (cabinClassVal === "2nd") {
          classSelect.value = "1st";
        }
        selectedSeats = [];
        generateSeatGrid();
        updateBookingSummary();
        showToast("success", `Upgraded to ${targetClassLabel}!`);
      });
    }
  }
}

// Route navigation from Search Card to Booking Tab
function triggerBookingForVehicle(vehicleId) {
  const vehicle = JOURNEYS.find(j => j.id === vehicleId);
  if (vehicle) {
    currentBookingJourney = vehicle;
    
    // Switch navigation tabs
    document.getElementById("nav-booking").click();

    setTimeout(() => {
      document.getElementById("booking-vehicle-select").value = vehicleId;
      selectedSeats = [];
      generateSeatGrid();
      updateBookingSummary();
      document.getElementById("generated-ticket-wrapper").style.display = "none";
    }, 150);
  }
}

// External booking deep-linking redirect helper
function triggerExternalBooking(journey) {
  if (!journey) {
    showToast("alert", "No journey selected for booking!");
    return;
  }
  
  const travelDate = document.getElementById("travel-date")?.value || new Date().toISOString().split('T')[0];
  let url = "";
  
  if (journey.type === "train") {
    // Sri Lanka Railways
    url = `https://seatreservation.railway.gov.lk/webbooking/search?origin=${encodeURIComponent(journey.origin.toUpperCase())}&destination=${encodeURIComponent(journey.dest.toUpperCase())}&date=${travelDate}&passengers=1`;
  } else if (journey.type === "bus") {
    const isExpressway = journey.route.toLowerCase().includes("expressway") || journey.route.toLowerCase().includes("highway");
    if (isExpressway) {
      // SLTB booking site
      url = `https://sltb.seatreservation.lk/search?from=${encodeURIComponent(journey.origin.toLowerCase())}&to=${encodeURIComponent(journey.dest.toLowerCase())}&date=${travelDate}`;
    } else {
      // Magiya.lk
      url = `https://magiya.lk/search?origin=${encodeURIComponent(journey.origin)}&destination=${encodeURIComponent(journey.dest)}&date=${travelDate}`;
    }
  }
  
  if (url) {
    window.open(url, "_blank");
    showToast("success", `Redirecting to official ${journey.type === "train" ? "Railways" : "Bus"} booking portal...`);
  } else {
    showToast("alert", "Unable to resolve external booking link.");
  }
}

// 8. Fare Calculator Layout & Core Mathematics
function initFareCalculator() {
  const originSelect = document.getElementById("calc-origin");
  const destSelect = document.getElementById("calc-dest");

  originSelect.addEventListener("change", calculateFares);
  destSelect.addEventListener("change", calculateFares);

  // Initial load
  calculateFares();
}

function calculateFares() {
  const origin = document.getElementById("calc-origin").value;
  const dest = document.getElementById("calc-dest").value;
  const distanceVal = document.getElementById("calc-distance-val");
  const durationVal = document.getElementById("calc-duration-val");
  const comparisonBody = document.getElementById("fare-comparison-body");

  if (origin === dest) {
    distanceVal.innerText = "0 km";
    durationVal.innerText = "0m";
    comparisonBody.innerHTML = `<tr><td colspan="6" class="text-center text-muted">Select different origin and destination locations.</td></tr>`;
    renderCalculatorTimeline(origin, dest);
    return;
  }

  // Calculate mock distance based on predefined station distances
  const origDist = STATIONS[origin].distance;
  const destDist = STATIONS[dest].distance;
  const totalDistance = Math.abs(origDist - destDist);

  distanceVal.innerText = `${totalDistance} km`;

  // Duration approximation (avg 45 km/h for routes)
  const totalMins = Math.round((totalDistance / 48) * 60);
  const hours = Math.floor(totalMins / 60);
  const mins = totalMins % 60;
  durationVal.innerText = `${hours > 0 ? hours + 'h ' : ''}${mins}m`;

  renderCalculatorTimeline(origin, dest);

  // Draw Comparison Table
  const options = [
    { name: "Train (3rd Class Ordinary)", factor: 2.2, duration: totalMins * 1.1, type: "train" },
    { name: "Train (2nd Class Reserved)", factor: 4.5, duration: totalMins * 1.0, type: "train" },
    { name: "Train (1st Class A/C Observation)", factor: 9.0, duration: totalMins * 0.95, type: "train" },
    { name: "Bus (Normal / Ordinary Route)", factor: 3.5, duration: totalMins * 1.3, type: "bus" },
    { name: "Bus (Expressway AC Coach)", factor: 7.5, duration: totalMins * 0.75, type: "bus" }
  ];

  comparisonBody.innerHTML = "";
  options.forEach(opt => {
    const isTrain = opt.type === "train";
    const durationText = `${Math.floor(opt.duration / 60)}h ${Math.round(opt.duration % 60)}m`;
    const baseFare = Math.max(50, Math.round(totalDistance * opt.factor));
    const bookingFee = isTrain ? 150 : 250;
    const total = baseFare + bookingFee;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <i class="fa-solid ${isTrain ? 'fa-train text-teal' : 'fa-bus text-emerald'}"></i>
        <strong>${opt.name}</strong>
      </td>
      <td>${durationText}</td>
      <td>Rs. ${baseFare}</td>
      <td>Rs. ${bookingFee}</td>
      <td class="bold">Rs. ${total}</td>
      <td>
        <button class="btn btn-outline btn-sm btn-calc-book" data-mode="${opt.type}">Book</button>
      </td>
    `;
    comparisonBody.appendChild(row);
  });

  document.querySelectorAll(".btn-calc-book").forEach(btn => {
    btn.addEventListener("click", () => {
      const mode = btn.getAttribute("data-mode");
      // Find matching journey
      const journey = JOURNEYS.find(j => j.origin === origin && j.dest === dest && j.type === mode) || 
                      JOURNEYS.find(j => j.type === mode);
      if (journey) {
        triggerBookingForVehicle(journey.id);
      } else {
        document.getElementById("nav-booking").click();
      }
    });
  });
}

function getRouteStops(origin, dest) {
  const routes = [
    ["Colombo Fort", "Polgahawela", "Kandy", "Nanu Oya", "Badulla"],
    ["Colombo Fort", "Kalutara", "Hikkaduwa", "Galle", "Matara"],
    ["Colombo Fort", "Kurunegala", "Anuradhapura", "Jaffna"]
  ];

  // Find a route that contains both origin and dest
  for (const route of routes) {
    const origIdx = route.indexOf(origin);
    const destIdx = route.indexOf(dest);
    if (origIdx !== -1 && destIdx !== -1) {
      if (origIdx < destIdx) {
        return route.slice(origIdx, destIdx + 1);
      } else {
        return route.slice(destIdx, origIdx + 1).reverse();
      }
    }
  }

  // Fallback: just return origin and dest
  return [origin, dest];
}

function renderCalculatorTimeline(origin, dest) {
  const container = document.getElementById("calc-timeline-container");
  if (!container) return;
  container.innerHTML = "";

  if (origin === dest) {
    container.innerHTML = `<div class="text-xs text-muted">Select different origin and destination.</div>`;
    return;
  }

  const stops = getRouteStops(origin, dest);
  stops.forEach((stop, index) => {
    const node = document.createElement("div");
    node.className = "timeline-node active";
    
    const stationCode = STATIONS[stop] ? STATIONS[stop].code : "STN";

    node.innerHTML = `
      <div class="timeline-node-info">
        <span class="timeline-station-name">${getLocalizedStationName(stop)}</span>
        <span class="timeline-station-code">${stationCode}</span>
      </div>
    `;
    container.appendChild(node);
  });
}

// 9. Premium Theme Toggle Logic
function initThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle-btn");
  
  toggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    
    document.documentElement.setAttribute("data-theme", newTheme);
    
    // Change toggle button icon
    const icon = toggleBtn.querySelector("i");
    if (newTheme === "light") {
      icon.className = "fa-solid fa-sun";
    } else {
      icon.className = "fa-solid fa-moon";
    }

    // Refresh Leaflet tiles with dark/light templates
    updateMapTiles();
  });
}

// 10. Dynamic Delay Alerts & System Notifications
let notifications = [
  {
    id: "N1",
    type: "alert",
    message: "Ditwa Cyclone Update: Main Line operations between Kandy and Badulla are completely suspended due to landslides.",
    time: "Just now",
    isRead: false
  },
  {
    id: "N2",
    type: "alert",
    message: "Podi Menike (T1005) is cancelled today due to adverse weather warnings and landslips on the mountain tracks.",
    time: "10 mins ago",
    isRead: false
  },
  {
    id: "N3",
    type: "delay",
    message: "Colombo-Kandy Intercity AC (BEX45) has a 10-minute delay due to traffic at Kadugannawa.",
    time: "30 mins ago",
    isRead: false
  },
  {
    id: "N4",
    type: "info",
    message: "Coastal Line tracks fully cleared. Ruhunu Kumari is back on standard scheduled time.",
    time: "2 hours ago",
    isRead: true
  },
  {
    id: "N5",
    type: "info",
    message: "Express seat booking for Jaffna lines is now open up to 30 days ahead.",
    time: "4 hours ago",
    isRead: true
  }
];

function initNotifications() {
  const notifBtn = document.getElementById("notif-btn");
  const notifDropdown = document.getElementById("notif-dropdown");
  const clearBtn = document.getElementById("clear-notif-btn");
  const listContainer = document.getElementById("notif-list-container");
  const badge = document.getElementById("notif-badge");

  // Load read notification IDs from localStorage
  let readNotifIds = JSON.parse(localStorage.getItem("lankatransit_read_notifs") || "[]");

  // Synchronize read states on load
  notifications.forEach(n => {
    if (readNotifIds.includes(n.id)) {
      n.isRead = true;
    }
  });

  // Toggle dropdown visibility
  notifBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    notifDropdown.classList.toggle("active");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!notifDropdown.contains(e.target) && e.target !== notifBtn) {
      notifDropdown.classList.remove("active");
    }
  });

  // Mark all as read
  clearBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    notifications.forEach(n => {
      n.isRead = true;
      if (!readNotifIds.includes(n.id)) {
        readNotifIds.push(n.id);
      }
    });
    localStorage.setItem("lankatransit_read_notifs", JSON.stringify(readNotifIds));
    renderNotifications();
  });

  function renderNotifications() {
    listContainer.innerHTML = "";
    
    // Sync active notifications with read list in case dynamic alerts were added
    notifications.forEach(n => {
      if (readNotifIds.includes(n.id)) {
        n.isRead = true;
      }
    });

    const unreadCount = notifications.filter(n => !n.isRead).length;

    // Update notification badge UI
    if (unreadCount > 0) {
      badge.style.display = "block";
      badge.innerText = unreadCount;
      badge.classList.remove("pulse");
      void badge.offsetWidth; // Trigger reflow for restart animation
      badge.classList.add("pulse");
    } else {
      badge.style.display = "none";
    }

    if (notifications.length === 0) {
      listContainer.innerHTML = `
        <div class="notif-empty">
          <i class="fa-regular fa-bell-slash"></i>
          <p>No new system notifications</p>
        </div>
      `;
      return;
    }

    // Populate notification list
    notifications.forEach(n => {
      const item = document.createElement("div");
      item.className = `notif-item ${n.isRead ? "" : "unread"}`;
      item.setAttribute("data-id", n.id);

      let iconHtml = "";
      if (n.type === "delay") {
        iconHtml = `<i class="fa-solid fa-clock-rotate-left"></i>`;
      } else if (n.type === "alert") {
        iconHtml = `<i class="fa-solid fa-triangle-exclamation"></i>`;
      } else {
        iconHtml = `<i class="fa-solid fa-circle-info"></i>`;
      }

      item.innerHTML = `
        <div class="notif-icon ${n.type}">
          ${iconHtml}
        </div>
        <div class="notif-info">
          <span class="notif-message">${n.message}</span>
          <span class="notif-time">${n.time}</span>
        </div>
      `;

      // Mark single notification as read on click
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        n.isRead = true;
        if (!readNotifIds.includes(n.id)) {
          readNotifIds.push(n.id);
          localStorage.setItem("lankatransit_read_notifs", JSON.stringify(readNotifIds));
        }
        renderNotifications();
      });

      listContainer.appendChild(item);
    });
  }

  // Initial render on load
  renderNotifications();
  triggerNotificationRender = renderNotifications;
}

// 11. Multi-language Translation Logic (English, Sinhala, Tamil)
const TRANSLATIONS = {
  en: {
    schedules: "Schedules",
    live_tracker: "Live Tracker",
    seat_booking: "Seat Booking",
    fare_calculator: "Fare Calculator",
    my_bookings: "My Bookings",
    admin_panel: "Admin Panel",
    header_title_search: "Find Your Next Journey",
    header_subtitle_search: "Explore Sri Lanka's train and bus networks instantly.",
    header_title_tracker: "Live GPS Route Tracker",
    header_subtitle_tracker: "Real-time positioning and estimated arrivals on active routes.",
    header_title_booking: "Digital Seat Reservation",
    header_subtitle_booking: "Select your coach class, pick seats, and generate digital ticket passes.",
    header_title_calculator: "Fare & Route Cost Calculator",
    header_subtitle_calculator: "Find the optimal cost and travel times between stations.",
    header_title_mybookings: "Manage Reservations",
    header_subtitle_mybookings: "Search, verify, and cancel your Ceylon Transit bookings.",
    header_title_admin: "Operator Admin Panel",
    header_subtitle_admin: "Monitor transit metrics, bookings database, and toggle route suspensions.",
    search_hero_title: "Experience Sri Lanka by Rail & Road",
    search_hero_desc: "Direct routes, local timetables, and seat reservation, all in one premium portal.",
    search_form_origin: "Origin Station",
    search_form_dest: "Destination Station",
    search_form_date: "Travel Date",
    search_form_mode: "Transit Mode",
    search_btn: "Search Schedules",
    select_origin: "Select starting station...",
    select_dest: "Select destination...",
    mode_all: "All Modes (Train & Bus)",
    mode_train: "Train Only",
    mode_bus: "Bus Only",
    station_colombo_fort: "Colombo Fort",
    station_kurunegala: "Kurunegala",
    station_anuradhapura: "Anuradhapura",
    station_jaffna: "Jaffna",
    station_polgahawela: "Polgahawela",
    station_kandy: "Kandy",
    station_nanu_oya: "Nanu Oya",
    station_badulla: "Badulla",
    station_kalutara: "Kalutara",
    station_hikkaduwa: "Hikkaduwa",
    station_galle: "Galle",
    station_matara: "Matara",
    booking_journey_label: "Select Journey",
    booking_class_label: "Cabin / Class",
    class_1st: "1st Class A/C Observation (Rs. 2,500)",
    class_2nd: "2nd Class Reserved (Rs. 1,500)",
    class_3rd: "3rd Class Reserved (Rs. 800)",
    calc_header: "Fare & Travel Time Estimator",
    calc_subheader: "Compare prices and travel durations across all available train and bus classes in Sri Lanka.",
    calc_origin_label: "Origin",
    calc_dest_label: "Destination",
    map_overlays_header: "Map Overlays",
    weather_alerts_label: "Show Weather Alerts",
    book_official_btn: "Book on Official Portal",
    wallet_title: "My Saved Passes",
    wallet_export_btn: "Export Backup",
    wallet_import_btn: "Import JSON",
    wallet_empty: "No saved passes found. Try booking a seat or importing a pass."
  },
  si: {
    schedules: "කාලසටහන්",
    live_tracker: "සජීවී ලුහුබැඳීම",
    seat_booking: "ආසන වෙන්කිරීම්",
    fare_calculator: "ගාස්තු කැල්කියුලේටරය",
    my_bookings: "මගේ වෙන්කිරීම්",
    admin_panel: "පාලක පැනලය",
    header_title_search: "ඔබගේ ඊළඟ ගමන සොයාගන්න",
    header_subtitle_search: "ශ්‍රී ලංකාවේ දුම්රිය සහ බස් කාලසටහන් ක්ෂණිකව පරීක්ෂා කරන්න.",
    header_title_tracker: "සජීවී ජීපීඑස් මාර්ග ලුහුබැඳීම",
    header_subtitle_tracker: "සජීවී වාහන පිහිටීම සහ ඇස්තමේන්තුගත පැමිණීමේ වේලාවන්.",
    header_title_booking: "ඩිජිටල් ආසන වෙන්කිරීම්",
    header_subtitle_booking: "පන්ති තෝරාගන්න, ආසන වෙන්කරගන්න, ඩිජිටල් ප්‍රවේශපත්‍ර සාදාගන්න.",
    header_title_calculator: "ගාස්තු සහ මාර්ග පිරිවැය කැල්කියුලේටරය",
    header_subtitle_calculator: "ප්‍රශස්ත පිරිවැය සහ ගමන් වේලාවන් සොයාගන්න.",
    header_title_mybookings: "වෙන්කිරීම් කළමනාකරණය",
    header_subtitle_mybookings: "ඔබගේ දුම්රිය/බස් වෙන්කිරීම් සොයන්න සහ අවලංගු කරන්න.",
    header_title_admin: "පරිපාලක පැනලය",
    header_subtitle_admin: "ප්‍රවේශපත්‍ර දත්ත ගබඩාව අධීක්ෂණය සහ මාර්ග අත්හිටුවීම් සක්‍රිය/අක්‍රිය කරන්න.",
    search_hero_title: "දුම්රියෙන් සහ මඟෙන් ශ්‍රී ලංකාව අත්විඳින්න",
    search_hero_desc: "සෘජු මාර්ග, දේශීය කාලසටහන්, සහ ආසන වෙන්කරවා ගැනීම්, සියල්ල එකම පෝටාලයකින්.",
    search_form_origin: "ආරම්භක දුම්රිය ස්ථානය",
    search_form_dest: "ගමනාන්ත දුම්රිය ස්ථානය",
    search_form_date: "ගමන් කරන දිනය",
    search_form_mode: "ප්‍රවාහන ක්‍රමය",
    search_btn: "කාලසටහන් සොයන්න",
    select_origin: "ආරම්භක ස්ථානය තෝරන්න...",
    select_dest: "ගමනාන්තය තෝරන්න...",
    mode_all: "සියලුම ක්‍රම (දුම්රිය සහ බස්)",
    mode_train: "දුම්රිය පමණි",
    mode_bus: "බස් පමණි",
    station_colombo_fort: "කොළඹ කොටුව",
    station_kurunegala: "කුරුණෑගල",
    station_anuradhapura: "අනුරාධපුරය",
    station_jaffna: "යාපනය",
    station_polgahawela: "පොල්ගහවෙල",
    station_kandy: "මහනුවර",
    station_nanu_oya: "නානුඔය",
    station_badulla: "බදුල්ල",
    station_kalutara: "කළුතර",
    station_hikkaduwa: "හික්කඩුව",
    station_galle: "ගාල්ල",
    station_matara: "මාතර",
    booking_journey_label: "ගමන තෝරන්න",
    booking_class_label: "කුටිය / පන්තිය",
    class_1st: "1 වන පන්තිය A/C නිරීක්ෂණ (රු. 2,500)",
    class_2nd: "2 වන පන්තිය වෙන්කළ (රු. 1,500)",
    class_3rd: "3 වන පන්තිය වෙන්කළ (රු. 800)",
    calc_header: "ගාස්තු සහ ගමන් කාල ඇස්තමේන්තුකරු",
    calc_subheader: "ශ්‍රී ලංකාවේ පවතින සියලුම දුම්රිය සහ බස් පන්ති අතර මිල ගණන් සහ ගමන් කාල සසඳන්න.",
    calc_origin_label: "ආරම්භය",
    calc_dest_label: "ගමනාන්තය",
    map_overlays_header: "සිතියම් ආවරණ",
    weather_alerts_label: "කාලගුණ අනතුරු ඇඟවීම් පෙන්වන්න",
    book_official_btn: "නිල වෙබ් අඩවියෙන් වෙන් කරන්න",
    wallet_title: "මගේ සුරැකි ප්‍රවේශපත්‍ර",
    wallet_export_btn: "පසුම්බිය උපස්ථ කරන්න",
    wallet_import_btn: "JSON ඇතුළත් කරන්න",
    wallet_empty: "සුරැකි ප්‍රවේශපත්‍ර කිසිවක් හමු නොවීය. ආසනයක් වෙන්කරන්න හෝ JSON ඇතුළත් කරන්න."
  },
  ta: {
    schedules: "அட்டவணைகள்",
    live_tracker: "நேரடி லொக்கேட்டர்",
    seat_booking: "இருக்கை முன்பதிவு",
    fare_calculator: "கட்டண கால்குலேட்டர்",
    my_bookings: "எனது பதிவுகள்",
    admin_panel: "நிர்வாக குழு",
    header_title_search: "உங்களது அடுத்த பயணத்தைக் கண்டறியவும்",
    header_subtitle_search: "இலங்கையின் ரயில் மற்றும் பஸ் கால அட்டவணைகளை உடனுக்குடன் பார்க்கவும்.",
    header_title_tracker: "ஜிபிஎஸ் நேரடி கண்காணிப்பு",
    header_subtitle_tracker: "செயலில் உள்ள வழிகளில் உண்மையான நேர நிலை மற்றும் வருகை நேரம்.",
    header_title_booking: "டிஜிட்டல் இருக்கை முன்பதிவு",
    header_subtitle_booking: "இருக்கை வகுப்பு, இருக்கைகளைத் தேர்ந்தெடுத்து டிஜிட்டல் டிக்கெட்டைப் பெறவும்.",
    header_title_calculator: "கட்டண மற்றும் பயண நேர கால்குலேட்டர்",
    header_subtitle_calculator: "நிலையங்களுக்கு இடையே உகந்த செலவு மற்றும் பயண நேரங்களை கண்டறியவும்.",
    header_title_mybookings: "பதிவுகளை நிர்வகிக்கவும்",
    header_subtitle_mybookings: "உங்கள் டிக்கெட் பதிவுகளைத் தேடவும், சரிபார்க்கவும் மற்றும் ரத்து செய்யவும்.",
    header_title_admin: "நிர்வாக அலகு",
    header_subtitle_admin: "டிக்கெட் தரவுத்தளத்தைக் கண்காணிக்கவும் மற்றும் போக்குவரத்து சேவைகளை மாற்றவும்.",
    search_hero_title: "ரயில் மற்றும் சாலை வழியாக இலங்கையை அனுபவியுங்கள்",
    search_hero_desc: "நேரடி வழிகள், உள்ளூர் கால அட்டவணைகள், இருக்கை முன்பதிவு, அனைத்தும் ஒரே பிரீமியம் போர்ட்டலில்.",
    search_form_origin: "புறப்படும் நிலையம்",
    search_form_dest: "சேரும் நிலையம்",
    search_form_date: "பயணத் தேதி",
    search_form_mode: "போக்குவரத்து முறை",
    search_btn: "அட்டவணைகளைத் தேடு",
    select_origin: "புறப்படும் நிலையத்தைத் தேர்ந்தெடுக்கவும்...",
    select_dest: "சேரும் நிலையத்தைத் தேர்ந்தெடுக்கவும்...",
    mode_all: "அனைத்து வழிகள் (ரயில் & பேருந்து)",
    mode_train: "ரயில் மட்டும்",
    mode_bus: "பேருந்து மட்டும்",
    station_colombo_fort: "கொழும்பு கோட்டை",
    station_kurunegala: "குருணாகல்",
    station_anuradhapura: "அனுராதபுரம்",
    station_jaffna: "யாழ்ப்பாணம்",
    station_polgahawela: "பொல்கஹவௌ",
    station_kandy: "கண்டி",
    station_nanu_oya: "நானுஓயா",
    station_badulla: "பதுளை",
    station_kalutara: "களுத்துறை",
    station_hikkaduwa: "ஹிக்கடுவ",
    station_galle: "காலி",
    station_matara: "மாத்தறை",
    booking_journey_label: "பயணத்தைத் தேர்ந்தெடுக்கவும்",
    booking_class_label: "வகுப்பு / இருக்கை",
    class_1st: "1 ஆம் வகுப்பு A/C அவதானிப்பு (ரூ. 2,500)",
    class_2nd: "2 ஆம் வகுப்பு ஒதுக்கப்பட்டது (ரூ. 1,500)",
    class_3rd: "3 ஆம் வகுப்பு ஒதுக்கப்பட்டது (ரூ. 800)",
    calc_header: "கட்டணம் மற்றும் பயண நேர மதிப்பீட்டாளர்",
    calc_subheader: "இலங்கையில் கிடைக்கக்கூடிய அனைத்து ரயில் மற்றும் பஸ் வகுப்புகளுக்கான கட்டணங்கள் மற்றும் பயண நேரங்களை ஒப்பிடுக.",
    calc_origin_label: "புறப்பாடு",
    calc_dest_label: "சேருமிடம்",
    map_overlays_header: "வரைபட மேலடுக்குகள்",
    weather_alerts_label: "வானிலை எச்சரிக்கைகளைக் காட்டு",
    book_official_btn: "அதிகாரப்பூர்வ தளம் மூலம் பதிவிட",
    wallet_title: "எனது சேமிக்கப்பட்ட பாஸ்கள்",
    wallet_export_btn: "காப்புப்பிரதியை ஏற்றுமதி செய்",
    wallet_import_btn: "JSON ஐ இறக்குமதி செய்",
    wallet_empty: "சேமிக்கப்பட்ட பாஸ்கள் எதுவும் இல்லை. இருக்கையை முன்பதிவு செய்ய அல்லது பாஸை இறக்குமதி செய்ய முயற்சிக்கவும்."
  }
};

let currentLanguage = "en";

function initLanguageSwitcher() {
  const langToggleBtn = document.getElementById("lang-toggle-btn");
  const langDropdown = document.getElementById("lang-dropdown");
  const langOptions = document.querySelectorAll(".lang-option");

  // Toggle language dropdown
  langToggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle("active");
  });

  // Close dropdown on click outside
  document.addEventListener("click", (e) => {
    if (!langDropdown.contains(e.target) && e.target !== langToggleBtn) {
      langDropdown.classList.remove("active");
    }
  });

  // Handle language option selection
  langOptions.forEach(opt => {
    opt.addEventListener("click", () => {
      const lang = opt.getAttribute("data-lang");
      
      // Update active state in dropdown
      langOptions.forEach(o => o.classList.remove("active"));
      opt.classList.add("active");

      // Apply translations
      applyTranslations(lang);

      // Close dropdown
      langDropdown.classList.remove("active");
    });
  });

  // Retrieve persisted language if available
  const savedLang = localStorage.getItem("lankatransit_lang") || "en";
  if (savedLang !== "en") {
    const activeOpt = Array.from(langOptions).find(o => o.getAttribute("data-lang") === savedLang);
    if (activeOpt) {
      langOptions.forEach(o => o.classList.remove("active"));
      activeOpt.classList.add("active");
      applyTranslations(savedLang);
    }
  }
}

function applyTranslations(lang) {
  currentLanguage = lang;
  localStorage.setItem("lankatransit_lang", lang);

  // Update dropdown button text label
  document.querySelector("#lang-toggle-btn .lang-code").innerText = lang.toUpperCase();

  // Translate all tags containing data-i18n attribute
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.getAttribute("data-i18n");
    if (TRANSLATIONS[lang][key]) {
      // Safely preserve icon child element if it exists
      const icon = element.querySelector("i");
      if (icon) {
        element.innerHTML = "";
        element.appendChild(icon);
        element.appendChild(document.createTextNode(" " + TRANSLATIONS[lang][key]));
      } else {
        element.innerText = TRANSLATIONS[lang][key];
      }
    }
  });

  // Update dynamic Tab Meta titles
  updateTabMetaTranslations(lang);

  // Re-populate dynamic dropdowns with localized station names
  const trainModeBtn = document.getElementById("tracker-mode-train");
  const trackerMode = trainModeBtn && trainModeBtn.classList.contains("active") ? "train" : "bus";
  populateTrackerSelect(trackerMode);
  populateBookingSelect();
  calculateFares();
  if (typeof renderTicketWallet === 'function') {
    renderTicketWallet();
  }
}

function updateTabMetaTranslations(lang) {
  // Translate the static titles shown when switching views
  tabMeta = {
    search: {
      title: TRANSLATIONS[lang].header_title_search,
      subtitle: TRANSLATIONS[lang].header_subtitle_search
    },
    tracker: {
      title: TRANSLATIONS[lang].header_title_tracker,
      subtitle: TRANSLATIONS[lang].header_subtitle_tracker
    },
    booking: {
      title: TRANSLATIONS[lang].header_title_booking,
      subtitle: TRANSLATIONS[lang].header_subtitle_booking
    },
    calculator: {
      title: TRANSLATIONS[lang].header_title_calculator,
      subtitle: TRANSLATIONS[lang].header_subtitle_calculator
    },
    mybookings: {
      title: TRANSLATIONS[lang].header_title_mybookings,
      subtitle: TRANSLATIONS[lang].header_subtitle_mybookings
    },
    admin: {
      title: TRANSLATIONS[lang].header_title_admin,
      subtitle: TRANSLATIONS[lang].header_subtitle_admin
    }
  };

  // Force update current active header content
  const headerTitle = document.getElementById("header-title");
  const headerSubtitle = document.getElementById("header-subtitle");
  if (headerTitle && headerSubtitle) {
    headerTitle.innerText = tabMeta[currentTab].title;
    headerSubtitle.innerText = tabMeta[currentTab].subtitle;
  }
}


// 13. Supabase Realtime Updates
let realtimeChannel = null;

function subscribeToRealtimeBookings() {
  if (!supabaseClient) return;

  try {
    realtimeChannel = supabaseClient
      .channel('public:bookings')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'bookings' },
        (payload) => {
          if (payload.new) {
            handleIncomingRealtimeBooking(payload.new);
          }
        }
      )
      .subscribe((status) => {
        console.log("Supabase Realtime subscription status:", status);
      });

    // Subscribe to route status changes in real-time
    supabaseClient
      .channel('public:route_status')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'route_status' },
        (payload) => {
          if (payload.new) {
            handleIncomingRouteStatusChange(payload.new);
          }
        }
      )
      .subscribe();
  } catch (err) {
    console.error("Failed to subscribe to Supabase Realtime:", err);
  }
}

function handleIncomingRealtimeBooking(newBooking) {
  const travelDate = document.getElementById("travel-date").value || new Date().toISOString().split('T')[0];
  
  // 1. Check if the booking matches current journey selection and date
  if (
    currentBookingJourney &&
    newBooking.journey_id === currentBookingJourney.id &&
    newBooking.travel_date === travelDate
  ) {
    const seatsToLock = Array.isArray(newBooking.seats) ? newBooking.seats : [];
    seatsToLock.forEach(seatId => {
      const seatEl = document.querySelector(`.seat[data-seat-id="${seatId}"]`);
      if (seatEl && !seatEl.classList.contains("seat-occupied")) {
        // Deselect if currently selected by the user
        if (seatEl.classList.contains("seat-selected")) {
          seatEl.classList.remove("seat-selected");
          selectedSeats = selectedSeats.filter(id => id !== seatId);
          updateBookingSummary();
          showToast("alert", `Seat ${seatId} was just reserved by another user.`);
        }
        
        // Apply pulsing lock animation
        seatEl.classList.add("seat-pulsing-lock");
        
        // Lock permanently after animation ends (4.5s)
        setTimeout(() => {
          seatEl.classList.remove("seat-pulsing-lock");
          seatEl.classList.add("seat-occupied");
          seatEl.classList.remove("seat-available");
        }, 4500);
      }
    });
  }

  // 2. Add dynamic entry to Notifications bell alerts drop-down
  const seatsStr = Array.isArray(newBooking.seats) ? newBooking.seats.join(", ") : newBooking.seats;
  addSystemNotification(
    "info",
    `Seats ${seatsStr} just reserved on ${newBooking.vehicle_name} (${newBooking.origin} ➔ ${newBooking.destination})!`
  );
}

let triggerNotificationRender = null;

function addSystemNotification(type, message) {
  notifications.unshift({
    id: "N" + Date.now(),
    type: type,
    message: message,
    time: "Just now",
    isRead: false
  });
  if (triggerNotificationRender) {
    triggerNotificationRender();
  }
  showToast(type, message);
}

// 14. Dynamic Database Suspensions, Lookup and Admin Controllers
let lineStatuses = { "Main Line": "Suspended", "Coastal Line": "Active", "Northern Line": "Active" };

function syncRouteStatuses() {
  JOURNEYS.forEach(journey => {
    const dbStatus = lineStatuses[journey.route];
    if (dbStatus === "Suspended") {
      journey.status = "Suspended";
    } else {
      journey.status = journey.delay > 0 ? "Delayed" : "On Time";
    }
  });
}

async function loadRouteStatuses() {
  if (!supabaseClient) {
    syncRouteStatuses();
    return;
  }

  try {
    const { data, error } = await supabaseClient.from('route_status').select('route_name, status');
    if (error) throw error;

    if (data) {
      data.forEach(row => {
        lineStatuses[row.route_name] = row.status;
      });
      syncRouteStatuses();
    }
  } catch (err) {
    console.error("Failed to load route statuses from Supabase:", err);
    syncRouteStatuses();
  }
}

function handleIncomingRouteStatusChange(changedRoute) {
  lineStatuses[changedRoute.route_name] = changedRoute.status;
  syncRouteStatuses();

  if (document.getElementById("results-section").style.display === "block") {
    renderSearchResults(lastFilteredResults);
  }
  
  if (currentBookingJourney && currentBookingJourney.route === changedRoute.route_name) {
    generateSeatGrid();
    updateBookingSummary();
  }

  if (currentTrackerVehicle && currentTrackerVehicle.route === changedRoute.route_name) {
    loadTrackerRoute(currentTrackerVehicle);
  }

  if (currentTab === "admin") {
    renderAdminRouteStatuses();
    loadAdminDashboardData();
  }

  const statusLabel = changedRoute.status === "Suspended" ? "SUSPENDED" : "ACTIVATED";
  showToast(
    changedRoute.status === "Suspended" ? "alert" : "info",
    `Service on the ${changedRoute.route_name} has been ${statusLabel} by operators.`
  );
}

function initMyBookingsLookup() {
  const form = document.getElementById("booking-lookup-form");
  const input = document.getElementById("lookup-ref-id");
  const wrapper = document.getElementById("lookup-result-wrapper");
  const cancelBtn = document.getElementById("btn-cancel-booking");
  
  let currentLookupId = null;

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const refId = input.value.trim();
    if (!refId) return;

    let booking = null;

    if (!supabaseClient) {
      // Simulation mode lookup: check lankatransit_sim_bookings or lankatransit_wallet_bookings
      const simBookings = JSON.parse(localStorage.getItem("lankatransit_sim_bookings") || "[]");
      booking = simBookings.find(b => b.id === refId);
      if (!booking) {
        const walletBookings = JSON.parse(localStorage.getItem("lankatransit_wallet_bookings") || "[]");
        booking = walletBookings.find(b => b.id === refId);
      }
      
      if (!booking) {
        showToast("alert", "No booking found with this Reference ID.");
        wrapper.style.display = "none";
        return;
      }
      
      // Populate fields
      document.getElementById("lookup-origin-code").innerText = STATIONS[booking.origin] ? STATIONS[booking.origin].code : "FOT";
      document.getElementById("lookup-origin-name").innerText = getLocalizedStationName(booking.origin);
      document.getElementById("lookup-dest-code").innerText = STATIONS[booking.destination] ? STATIONS[booking.destination].code : "GLE";
      document.getElementById("lookup-dest-name").innerText = getLocalizedStationName(booking.destination);
      document.getElementById("lookup-date-val").innerText = booking.travel_date;
      document.getElementById("lookup-time-val").innerText = booking.created_at ? new Date(booking.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) : "07:00 AM";
      document.getElementById("lookup-seats-val").innerText = `Car 02 / ${booking.seats.join(", ")}`;
      document.getElementById("lookup-vehicle-val").innerText = booking.vehicle_name;
      document.getElementById("lookup-class-val").innerText = booking.cabin_class === "1st" ? "1st Class Observation" : (booking.cabin_class === "3rd" ? "3rd Class Reserved" : "2nd Class Reserved");
      document.getElementById("lookup-fare-val").innerText = `Rs. ${booking.total_fare.toLocaleString()}`;
      document.getElementById("lookup-barcode-num").innerText = booking.id;

      currentLookupId = booking.id;
      wrapper.style.display = "block";
      wrapper.scrollIntoView({ behavior: 'smooth' });
      showToast("info", "Reservation retrieved successfully.");
    } else {
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(refId)) {
        showToast("alert", "Invalid Ticket Reference ID format. Please check the ID.");
        return;
      }

      try {
        const { data, error } = await supabaseClient
          .rpc('get_booking_by_id', { booking_id: refId });

        if (error) throw error;

        booking = data && data.length > 0 ? data[0] : null;

        if (!booking) {
          showToast("alert", "No booking found with this Reference ID.");
          wrapper.style.display = "none";
          return;
        }

        document.getElementById("lookup-origin-code").innerText = STATIONS[booking.origin].code;
        document.getElementById("lookup-origin-name").innerText = getLocalizedStationName(booking.origin);
        document.getElementById("lookup-dest-code").innerText = STATIONS[booking.destination].code;
        document.getElementById("lookup-dest-name").innerText = getLocalizedStationName(booking.destination);
        document.getElementById("lookup-date-val").innerText = booking.travel_date;
        document.getElementById("lookup-time-val").innerText = booking.created_at ? new Date(booking.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) : "07:00 AM";
        document.getElementById("lookup-seats-val").innerText = `Car 02 / ${booking.seats.join(", ")}`;
        document.getElementById("lookup-vehicle-val").innerText = booking.vehicle_name;
        document.getElementById("lookup-class-val").innerText = booking.cabin_class === "1st" ? "1st Class Observation" : (booking.cabin_class === "3rd" ? "3rd Class Reserved" : "2nd Class Reserved");
        document.getElementById("lookup-fare-val").innerText = `Rs. ${booking.total_fare.toLocaleString()}`;
        document.getElementById("lookup-barcode-num").innerText = booking.id;

        currentLookupId = booking.id;
        wrapper.style.display = "block";
        wrapper.scrollIntoView({ behavior: 'smooth' });
        showToast("info", "Reservation retrieved successfully.");
      } catch (err) {
        console.error("Error looking up booking:", err);
        showToast("alert", "An error occurred while retrieving your booking.");
      }
    }
  });

  cancelBtn.addEventListener("click", async () => {
    if (!currentLookupId) return;

    if (confirm("Are you sure you want to cancel this reservation? This action cannot be undone.")) {
      try {
        if (!supabaseClient) {
          // Remove from simulation bookings
          let simBookings = JSON.parse(localStorage.getItem("lankatransit_sim_bookings") || "[]");
          simBookings = simBookings.filter(b => b.id !== currentLookupId);
          localStorage.setItem("lankatransit_sim_bookings", JSON.stringify(simBookings));
          
          if (currentTab === "admin") {
            loadSimulationAdminDashboardData();
          }
        } else {
          const { error } = await supabaseClient.rpc('cancel_booking_by_id', { booking_id: currentLookupId });
          if (error) throw error;
        }

        // Remove from local wallet
        removeTicketFromWallet(currentLookupId);

        showToast("info", "Your reservation has been cancelled successfully.");
        wrapper.style.display = "none";
        input.value = "";
        
        await generateSeatGrid();
      } catch (err) {
        console.error("Error cancelling booking:", err);
        showToast("alert", "Failed to cancel your reservation.");
      }
    }
  });
}

function initTicketWallet() {
  const exportBtn = document.getElementById("btn-export-wallet");
  const importTrigger = document.getElementById("btn-import-wallet-trigger");
  const importFile = document.getElementById("wallet-import-file");

  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      const wallet = JSON.parse(localStorage.getItem("lankatransit_wallet_bookings") || "[]");
      if (wallet.length === 0) {
        showToast("info", "Your ticket wallet is empty. Nothing to export.");
        return;
      }
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(wallet, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "lankatransit_ticket_wallet_backup.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast("success", "Ticket wallet backup downloaded successfully.");
    });
  }

  if (importTrigger && importFile) {
    importTrigger.addEventListener("click", () => {
      importFile.click();
    });

    importFile.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function(event) {
        try {
          const importedWallet = JSON.parse(event.target.result);
          if (!Array.isArray(importedWallet)) {
            showToast("alert", "Invalid backup file format. Must be a JSON array.");
            return;
          }
          
          let currentWallet = JSON.parse(localStorage.getItem("lankatransit_wallet_bookings") || "[]");
          let addedCount = 0;

          importedWallet.forEach(ticket => {
            if (ticket && ticket.id && !currentWallet.some(t => t.id === ticket.id)) {
              currentWallet.push(ticket);
              addedCount++;
            }
          });

          localStorage.setItem("lankatransit_wallet_bookings", JSON.stringify(currentWallet));
          renderTicketWallet();
          showToast("success", `Successfully imported ${addedCount} new ticket passes into your wallet.`);
        } catch (err) {
          showToast("alert", "Failed to parse backup file. Please ensure it's a valid JSON.");
        }
      };
      reader.readAsText(file);
      importFile.value = ""; // Reset file input
    });
  }

  renderTicketWallet();
}

function saveTicketToWallet(ticket) {
  let wallet = JSON.parse(localStorage.getItem("lankatransit_wallet_bookings") || "[]");
  if (!wallet.some(t => t.id === ticket.id)) {
    wallet.unshift(ticket);
    localStorage.setItem("lankatransit_wallet_bookings", JSON.stringify(wallet));
    renderTicketWallet();
  }
}

function removeTicketFromWallet(ticketId) {
  let wallet = JSON.parse(localStorage.getItem("lankatransit_wallet_bookings") || "[]");
  wallet = wallet.filter(t => t.id !== ticketId);
  localStorage.setItem("lankatransit_wallet_bookings", JSON.stringify(wallet));
  renderTicketWallet();
}

function renderTicketWallet() {
  const container = document.getElementById("wallet-passes-list");
  if (!container) return;

  const wallet = JSON.parse(localStorage.getItem("lankatransit_wallet_bookings") || "[]");
  container.innerHTML = "";

  if (wallet.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "wallet-empty-state";
    const localizedEmpty = (TRANSLATIONS[currentLanguage] && TRANSLATIONS[currentLanguage].wallet_empty) || "No saved passes found. Try booking a seat or importing a pass.";
    emptyState.innerHTML = `
      <i class="fa-solid fa-receipt"></i>
      <p>${localizedEmpty}</p>
    `;
    container.appendChild(emptyState);
    return;
  }

  const todayStr = new Date().toISOString().split('T')[0];

  wallet.forEach(ticket => {
    const isPast = ticket.travel_date < todayStr;
    const item = document.createElement("div");
    item.className = `wallet-pass-item ${isPast ? 'past' : ''}`;
    
    const statusLabel = isPast ? "Past" : "Active";
    const badgeClass = isPast ? "past" : "active";

    const localizedOrigin = getLocalizedStationName(ticket.origin);
    const localizedDest = getLocalizedStationName(ticket.destination);

    item.innerHTML = `
      <div class="pass-main-details">
        <span class="pass-route">
          ${localizedOrigin} <i class="fa-solid fa-arrow-right" style="font-size: 10px; color: var(--primary-color);"></i> ${localizedDest}
        </span>
        <span class="pass-meta">
          <strong>${ticket.vehicle_name}</strong>
          <span>Date: ${ticket.travel_date} | Seats: ${ticket.seats.join(", ")}</span>
          <span style="font-family: monospace; font-size: 10px; opacity: 0.7;">Ref: ${ticket.id}</span>
        </span>
      </div>
      <div class="pass-status-indicator">
        <span class="pass-status-badge ${badgeClass}">${statusLabel}</span>
        <strong style="color: var(--primary-color); font-size: 12px;">Rs. ${ticket.total_fare.toLocaleString()}</strong>
      </div>
    `;

    item.addEventListener("click", () => {
      // Trigger Lookup search automatically
      const refInput = document.getElementById("lookup-ref-id");
      const lookupForm = document.getElementById("booking-lookup-form");
      if (refInput && lookupForm) {
        refInput.value = ticket.id;
        lookupForm.dispatchEvent(new Event("submit"));
      }
    });

    container.appendChild(item);
  });
}

function renderAdminRouteStatuses() {
  const container = document.getElementById("admin-route-status-list");
  if (!container) return;

  container.innerHTML = "";

  Object.keys(lineStatuses).forEach(line => {
    const status = lineStatuses[line];
    const item = document.createElement("div");
    item.className = "route-status-item";
    
    let routeDesc = "Colombo Fort ➔ Badulla";
    if (line === "Coastal Line") routeDesc = "Colombo Fort ➔ Galle ➔ Matara";
    if (line === "Northern Line") routeDesc = "Colombo Fort ➔ Kurunegala ➔ Jaffna";

    const isSuspended = status === "Suspended";

    item.innerHTML = `
      <div class="route-meta">
        <strong>${line}</strong>
        <span>${routeDesc}</span>
      </div>
      <div class="route-actions">
        <span class="badge-status ${isSuspended ? 'suspended' : 'active'}">${isSuspended ? 'Suspended' : 'Active'}</span>
        <button class="btn-toggle-status ${isSuspended ? 'activate-btn' : 'suspend-btn'}" data-route="${line}">
          ${isSuspended ? 'Activate' : 'Suspend'}
        </button>
      </div>
    `;

    item.querySelector(".btn-toggle-status").addEventListener("click", async () => {
      const newStatus = isSuspended ? "Active" : "Suspended";
      const reason = isSuspended ? "" : "Cyclone Ditwa Landslide warning";
      
      if (confirm(`Are you sure you want to change status of ${line} to ${newStatus}?`)) {
        try {
          if (!supabaseClient) {
            lineStatuses[line] = newStatus;
            syncRouteStatuses();
            renderAdminRouteStatuses();
            showToast("info", `Route status updated locally.`);
            return;
          }
          const { error } = await supabaseClient.from('route_status').upsert({
            route_name: line,
            status: newStatus,
            reason: reason
          });
          if (error) throw error;
        } catch (err) {
          console.error("Failed to toggle route status:", err);
          showToast("alert", "Failed to update route status in database.");
        }
      }
    });

    container.appendChild(item);
  });
}

async function loadAdminDashboardData() {
  if (!supabaseClient) return;

  try {
    const { data: bookings, error } = await supabaseClient
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (bookings) {
      document.getElementById("admin-total-bookings").innerText = bookings.length;

      let totalRevenue = 0;
      bookings.forEach(b => {
        totalRevenue += b.total_fare;
      });
      document.getElementById("admin-total-revenue").innerText = `Rs. ${totalRevenue.toLocaleString()}`;

      const activeSuspensions = Object.values(lineStatuses).filter(s => s === "Suspended").length;
      document.getElementById("admin-active-suspensions").innerText = activeSuspensions;

      const tbody = document.getElementById("admin-bookings-table-body");
      tbody.innerHTML = "";

      if (bookings.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="7" style="text-align: center; padding: 20px; color: var(--text-muted);">No bookings found in database</td>
          </tr>
        `;
      } else {
        bookings.forEach(b => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td style="padding: 12px 8px; font-weight: 600;">${b.passenger_name}</td>
            <td style="padding: 12px 8px; font-family: monospace; font-size: 11px; color: var(--text-muted);">${b.id}</td>
            <td style="padding: 12px 8px;">${b.vehicle_name} (${b.origin} ➔ ${b.destination})</td>
            <td style="padding: 12px 8px;">${b.travel_date}</td>
            <td style="padding: 12px 8px; font-weight: 600;">${b.seats.join(", ")}</td>
            <td style="padding: 12px 8px; color: var(--primary-color); font-weight: 700;">Rs. ${b.total_fare.toLocaleString()}</td>
            <td style="padding: 12px 8px;">
              <button class="btn-cancel-sm" data-id="${b.id}">Cancel</button>
            </td>
          `;

          tr.querySelector(".btn-cancel-sm").addEventListener("click", async () => {
            if (confirm(`Are you sure you want to cancel booking ${b.id}?`)) {
              await deleteBooking(b.id);
            }
          });

          tbody.appendChild(tr);
        });
      }
      // Render Charts
      updateAdminCharts(bookings);
    }
  } catch (err) {
    console.error("Failed to load admin dashboard data:", err);
  }
}

async function deleteBooking(id) {
  if (!supabaseClient) return;

  try {
    const { error } = await supabaseClient.from('bookings').delete().eq('id', id);
    if (error) throw error;
    showToast("info", "Reservation cancelled successfully.");
    
    await loadAdminDashboardData();
    await generateSeatGrid();
  } catch (err) {
    console.error("Failed to delete booking:", err);
    showToast("alert", "Failed to delete booking.");
  }
}

function showToast(type, message) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast-item";

  let iconHtml = '<i class="fa-solid fa-circle-info"></i>';
  let title = "System Update";
  if (type === "alert") {
    iconHtml = '<i class="fa-solid fa-triangle-exclamation"></i>';
    title = "System Alert";
  } else if (type === "delay") {
    iconHtml = '<i class="fa-solid fa-clock-rotate-left"></i>';
    title = "Delay Advisory";
  }

  toast.innerHTML = `
    <div class="toast-icon ${type}">
      ${iconHtml}
    </div>
    <div class="toast-content">
      <span class="toast-title">${title}</span>
      <span class="toast-msg">${message}</span>
    </div>
  `;

  container.appendChild(toast);

  // Auto remove after 4 seconds
  setTimeout(() => {
    toast.classList.add("fade-out");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4000);
}

async function exportBookingsToCSV() {
  let bookings = [];
  if (!supabaseClient) {
    bookings = getSimulationBookings();
  } else {
    try {
      const { data, error } = await supabaseClient
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      bookings = data || [];
    } catch (err) {
      console.error("Failed to fetch bookings for CSV export:", err);
      showToast("alert", "Failed to fetch bookings for export.");
      return;
    }
  }

  if (bookings.length === 0) {
    showToast("info", "No bookings to export.");
    return;
  }

  // Generate CSV content
  const headers = ["Booking ID", "Passenger Name", "Journey ID", "Vehicle Name", "Origin", "Destination", "Travel Date", "Seats", "Cabin Class", "Total Fare", "Created At"];
  const csvRows = [headers.join(",")];

  for (const b of bookings) {
    const seatsStr = Array.isArray(b.seats) ? b.seats.join("; ") : (b.seats || "");
    const row = [
      escapeCSV(b.id),
      escapeCSV(b.passenger_name),
      escapeCSV(b.journey_id),
      escapeCSV(b.vehicle_name),
      escapeCSV(b.origin),
      escapeCSV(b.destination),
      escapeCSV(b.travel_date),
      escapeCSV(seatsStr),
      escapeCSV(b.cabin_class),
      b.total_fare,
      escapeCSV(b.created_at)
    ];
    csvRows.push(row.join(","));
  }

  const csvContent = csvRows.join("\n");
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `lankatransit_bookings_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast("info", "Bookings exported to CSV successfully.");
}

function escapeCSV(val) {
  if (val === null || val === undefined) return "";
  let stringVal = String(val);
  if (stringVal.includes(',') || stringVal.includes('"') || stringVal.includes('\n') || stringVal.includes('\r')) {
    stringVal = '"' + stringVal.replace(/"/g, '""') + '"';
  }
  return stringVal;
}

function initAdminAuth() {
  const loginForm = document.getElementById("admin-login-form");
  const logoutBtn = document.getElementById("btn-admin-logout");
  const exportCsvBtn = document.getElementById("btn-export-csv");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value;

      if (!supabaseClient) {
        if (email === "operator@lankatransit.lk" && password === "operator123") {
          showToast("info", "Successfully signed in as operator (Simulation).");
          sessionStorage.setItem("simulationOperatorSession", email);
          document.getElementById("login-email").value = "";
          document.getElementById("login-password").value = "";
          await checkAdminSession();
        } else {
          showToast("alert", "Invalid operator credentials (Simulation).");
        }
        return;
      }

      try {
        const { error } = await supabaseClient.auth.signInWithPassword({
          email,
          password
        });

        if (error) throw error;

        showToast("info", "Successfully signed in as operator.");
        // Clear inputs
        document.getElementById("login-email").value = "";
        document.getElementById("login-password").value = "";
        
        await checkAdminSession();
      } catch (err) {
        console.error("Sign in failed:", err);
        showToast("alert", err.message || "Invalid operator credentials.");
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      if (!supabaseClient) {
        sessionStorage.removeItem("simulationOperatorSession");
        showToast("info", "Successfully signed out (Simulation).");
        await checkAdminSession();
        return;
      }
      try {
        const { error } = await supabaseClient.auth.signOut();
        if (error) throw error;
        showToast("info", "Successfully signed out.");
        await checkAdminSession();
      } catch (err) {
        console.error("Sign out failed:", err);
        showToast("alert", "Failed to sign out.");
      }
    });
  }

  if (exportCsvBtn) {
    exportCsvBtn.addEventListener("click", exportBookingsToCSV);
  }

  // Set up auth state listener if supabase is active
  if (supabaseClient) {
    supabaseClient.auth.onAuthStateChange((event, session) => {
      console.log("Auth state change event:", event);
      checkAdminSession();
    });
  }

  // Initial check
  checkAdminSession();
}

async function checkAdminSession() {
  const authView = document.getElementById("admin-auth-view");
  const dashboardView = document.getElementById("admin-dashboard-view");
  const emailSpan = document.getElementById("admin-session-email");

  if (!authView || !dashboardView) return;

  if (!supabaseClient) {
    const simSession = sessionStorage.getItem("simulationOperatorSession");
    if (simSession) {
      authView.style.display = "none";
      dashboardView.style.display = "flex";
      if (emailSpan) {
        emailSpan.innerText = simSession;
      }
      if (currentTab === "admin") {
        renderAdminRouteStatuses();
        loadSimulationAdminDashboardData();
      }
    } else {
      authView.style.display = "block";
      dashboardView.style.display = "none";
    }
    return;
  }

  try {
    const { data: { session }, error } = await supabaseClient.auth.getSession();
    if (error) throw error;

    if (session && session.user) {
      authView.style.display = "none";
      dashboardView.style.display = "flex";
      if (emailSpan) {
        emailSpan.innerText = session.user.email;
      }
      
      // Load dashboard details only if on admin tab to avoid redundant queries
      if (currentTab === "admin") {
        renderAdminRouteStatuses();
        await loadAdminDashboardData();
      }
    } else {
      authView.style.display = "block";
      dashboardView.style.display = "none";
    }
  } catch (err) {
    console.error("Error checking session:", err);
    authView.style.display = "block";
    dashboardView.style.display = "none";
  }
}

// 9. Operator Dashboard Analytics Charts (Chart.js implementation)
let revenueShareChartInstance = null;
let bookingTrendsChartInstance = null;
let modeDemandChartInstance = null;

function updateAdminCharts(bookings) {
  const revenueShareCtx = document.getElementById("revenueShareChart");
  const bookingTrendsCtx = document.getElementById("bookingTrendsChart");
  const modeDemandCtx = document.getElementById("modeDemandChart");
  if (!revenueShareCtx || !bookingTrendsCtx) return;

  // Calculate Revenue Share (Trains vs Buses)
  let trainRevenue = 0;
  let busRevenue = 0;

  bookings.forEach(b => {
    const journey = JOURNEYS.find(j => j.name === b.vehicle_name || j.id === b.journey_id);
    const type = journey ? journey.type : (b.vehicle_name.toLowerCase().includes("bus") ? "bus" : "train");
    if (type === "bus") {
      busRevenue += b.total_fare;
    } else {
      trainRevenue += b.total_fare;
    }
  });

  // Default fallbacks if empty
  if (trainRevenue === 0 && busRevenue === 0) {
    trainRevenue = 5000;
    busRevenue = 3000;
  }

  // Calculate Booking Trends (Last 7 days)
  const trendsData = {};
  const modeTrendsData = {};
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    trendsData[dateStr] = 0;
    modeTrendsData[dateStr] = { train: 0, bus: 0 };
  }

  bookings.forEach(b => {
    const date = new Date(b.created_at || Date.now());
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (trendsData[dateStr] !== undefined) {
      trendsData[dateStr] += 1;
    } else {
      trendsData[dateStr] = 1;
    }

    if (modeTrendsData[dateStr] !== undefined) {
      const journey = JOURNEYS.find(j => j.name === b.vehicle_name || j.id === b.journey_id);
      const type = journey ? journey.type : (b.vehicle_name.toLowerCase().includes("bus") ? "bus" : "train");
      if (type === "bus") {
        modeTrendsData[dateStr].bus += 1;
      } else {
        modeTrendsData[dateStr].train += 1;
      }
    }
  });

  const trendLabels = Object.keys(trendsData);
  const trendCounts = Object.values(trendsData);

  const modeLabels = Object.keys(modeTrendsData);
  const trainCounts = modeLabels.map(label => modeTrendsData[label].train);
  const busCounts = modeLabels.map(label => modeTrendsData[label].bus);

  // Reset/Destroy existing charts
  if (revenueShareChartInstance) revenueShareChartInstance.destroy();
  if (bookingTrendsChartInstance) bookingTrendsChartInstance.destroy();
  if (modeDemandChartInstance) modeDemandChartInstance.destroy();

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: { family: 'Outfit', size: 12 }
        }
      }
    }
  };

  // Render Doughnut
  revenueShareChartInstance = new Chart(revenueShareCtx, {
    type: 'doughnut',
    data: {
      labels: ['Trains', 'Buses'],
      datasets: [{
        data: [trainRevenue, busRevenue],
        backgroundColor: [
          'rgba(0, 229, 255, 0.2)',
          'rgba(16, 185, 129, 0.2)'
        ],
        borderColor: [
          '#00e5ff',
          '#10b981'
        ],
        borderWidth: 2,
        hoverOffset: 4
      }]
    },
    options: chartOptions
  });

  // Render Line
  bookingTrendsChartInstance = new Chart(bookingTrendsCtx, {
    type: 'line',
    data: {
      labels: trendLabels,
      datasets: [{
        label: 'Bookings',
        data: trendCounts,
        fill: true,
        backgroundColor: 'rgba(0, 229, 255, 0.05)',
        borderColor: '#00e5ff',
        borderWidth: 2,
        tension: 0.3,
        pointBackgroundColor: '#00e5ff',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#00e5ff'
      }]
    },
    options: {
      ...chartOptions,
      scales: {
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: {
            color: 'rgba(255, 255, 255, 0.5)',
            stepSize: 1,
            beginAtZero: true
          }
        },
        x: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: 'rgba(255, 255, 255, 0.5)' }
        }
      }
    }
  });

  // Render Stacked Bar Chart for daily transit mode distribution
  if (modeDemandCtx) {
    modeDemandChartInstance = new Chart(modeDemandCtx, {
      type: 'bar',
      data: {
        labels: modeLabels,
        datasets: [
          {
            label: 'Trains',
            data: trainCounts,
            backgroundColor: 'rgba(0, 229, 255, 0.6)',
            borderColor: '#00e5ff',
            borderWidth: 1
          },
          {
            label: 'Buses',
            data: busCounts,
            backgroundColor: 'rgba(16, 185, 129, 0.6)',
            borderColor: '#10b981',
            borderWidth: 1
          }
        ]
      },
      options: {
        ...chartOptions,
        scales: {
          x: {
            stacked: true,
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: 'rgba(255, 255, 255, 0.5)' }
          },
          y: {
            stacked: true,
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: {
              color: 'rgba(255, 255, 255, 0.5)',
              stepSize: 1,
              beginAtZero: true
            }
          }
        }
      }
    });
  }
}

function getSimulationBookings() {
  const simBookings = localStorage.getItem("lankatransit_sim_bookings");
  if (!simBookings) {
    const mockBookings = [
      {
        id: "LT-89304723-SL",
        passenger_name: "Sadeep Sachintha",
        journey_id: "T4021",
        vehicle_name: "Yal Devi",
        origin: "Colombo Fort",
        destination: "Jaffna",
        travel_date: new Date().toISOString().split('T')[0],
        seats: ["A12", "A13"],
        cabin_class: "2nd",
        total_fare: 3600,
        created_at: new Date(Date.now() - 4 * 3600 * 1000).toISOString()
      },
      {
        id: "LT-28492048-SL",
        passenger_name: "Nimal Perera",
        journey_id: "T8056",
        vehicle_name: "Ruhunu Kumari",
        origin: "Colombo Fort",
        destination: "Matara",
        travel_date: new Date().toISOString().split('T')[0],
        seats: ["B5"],
        cabin_class: "3rd",
        total_fare: 800,
        created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
      },
      {
        id: "LT-10948572-SL",
        passenger_name: "Aisha Rahman",
        journey_id: "BEX02",
        vehicle_name: "Highway AC Luxury Express",
        origin: "Colombo Fort",
        destination: "Galle",
        travel_date: new Date(Date.now() + 24 * 3600 * 1000).toISOString().split('T')[0],
        seats: ["C1", "C2"],
        cabin_class: "2nd",
        total_fare: 1960,
        created_at: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString()
      },
      {
        id: "LT-74859201-SL",
        passenger_name: "Karthik Siva",
        journey_id: "T4021",
        vehicle_name: "Yal Devi",
        origin: "Colombo Fort",
        destination: "Jaffna",
        travel_date: new Date().toISOString().split('T')[0],
        seats: ["A20", "A21", "A22"],
        cabin_class: "1st",
        total_fare: 8640,
        created_at: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString()
      },
      {
        id: "LT-38592048-SL",
        passenger_name: "John Doe",
        journey_id: "BEX45",
        vehicle_name: "Colombo-Kandy Intercity AC",
        origin: "Colombo Fort",
        destination: "Kandy",
        travel_date: new Date().toISOString().split('T')[0],
        seats: ["B10"],
        cabin_class: "2nd",
        total_fare: 850,
        created_at: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString()
      }
    ];
    localStorage.setItem("lankatransit_sim_bookings", JSON.stringify(mockBookings));
    return mockBookings;
  }
  return JSON.parse(simBookings);
}

function loadSimulationAdminDashboardData() {
  const bookings = getSimulationBookings();
  
  document.getElementById("admin-total-bookings").innerText = bookings.length;

  let totalRevenue = 0;
  bookings.forEach(b => {
    totalRevenue += b.total_fare;
  });
  document.getElementById("admin-total-revenue").innerText = `Rs. ${totalRevenue.toLocaleString()}`;

  const activeSuspensions = Object.values(lineStatuses).filter(s => s === "Suspended").length;
  document.getElementById("admin-active-suspensions").innerText = activeSuspensions;

  const tbody = document.getElementById("admin-bookings-table-body");
  if (tbody) {
    tbody.innerHTML = "";
    if (bookings.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 20px; color: var(--text-muted);">No bookings found in database</td>
        </tr>
      `;
    } else {
      const sortedBookings = [...bookings].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      sortedBookings.forEach(b => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td style="padding: 12px 8px; font-weight: 600;">${b.passenger_name}</td>
          <td style="padding: 12px 8px; font-family: monospace; font-size: 11px; color: var(--text-muted);">${b.id}</td>
          <td style="padding: 12px 8px;">${b.vehicle_name} (${b.origin} ➔ ${b.destination})</td>
          <td style="padding: 12px 8px;">${b.travel_date}</td>
          <td style="padding: 12px 8px; font-weight: 600;">${b.seats.join(", ")}</td>
          <td style="padding: 12px 8px; font-weight: 700; color: var(--primary-color);">Rs. ${b.total_fare.toLocaleString()}</td>
          <td style="padding: 12px 8px;">
            <button class="btn btn-outline btn-xs btn-cancel-sm" data-id="${b.id}" style="padding: 4px 8px; font-size: 10px; border-color: rgba(239,68,68,0.3); color: #ef4444; background: rgba(239,68,68,0.05);">Cancel</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
      
      tbody.querySelectorAll(".btn-cancel-sm").forEach(btn => {
        btn.addEventListener("click", () => {
          const bookingId = btn.getAttribute("data-id");
          cancelSimulationBooking(bookingId);
        });
      });
    }
  }

  // Update Charts
  updateAdminCharts(bookings);
}

function cancelSimulationBooking(id) {
  let bookings = getSimulationBookings();
  bookings = bookings.filter(b => b.id !== id);
  localStorage.setItem("lankatransit_sim_bookings", JSON.stringify(bookings));
  showToast("info", "Successfully cancelled reservation (Simulation).");
  loadSimulationAdminDashboardData();
}

function solveMultiModalConnections(origin, dest, type) {
  const connections = [];
  
  // Find all Journeys J1 departing from origin
  const firstLegs = JOURNEYS.filter(j1 => j1.origin === origin && (type === "all" || j1.type === type));
  
  firstLegs.forEach(j1 => {
    const stops1 = j1.stops;
    const originIdx = stops1.indexOf(origin);
    if (originIdx === -1) return;
    
    // Intermediate stops along J1
    const intermediateStops = stops1.slice(originIdx + 1);
    
    intermediateStops.forEach(hub => {
      // Find Journeys J2 starting from this hub and arriving at dest
      const secondLegs = JOURNEYS.filter(j2 => j2.origin === hub && j2.dest === dest && (type === "all" || j2.type === type));
      
      secondLegs.forEach(j2 => {
        // Calculate J1 arrival time at hub
        const j1ArrivalAtHubStr = approximateStopTime(j1, hub);
        const j1ArrivalMins = parseTimeString(j1ArrivalAtHubStr);
        
        // Calculate J2 departure time from hub
        const j2DepartureMins = parseTimeString(j2.departure);
        
        // Ensure J2 departure is after J1 arrival at hub with at least 15 mins transfer time
        const transferDiff = j2DepartureMins - j1ArrivalMins;
        if (transferDiff >= 15) {
          // Calculate overall duration: J2 arrival mins - J1 departure mins
          const j1DepartureMins = parseTimeString(j1.departure);
          const j2ArrivalMins = parseTimeString(j2.arrival);
          let totalDurationMins = j2ArrivalMins - j1DepartureMins;
          
          // Handle day transition
          if (totalDurationMins < 0) totalDurationMins += 24 * 60;
          
          const hours = Math.floor(totalDurationMins / 60);
          const mins = Math.floor(totalDurationMins % 60);
          const totalDurationStr = `${hours}h ${mins}m`;
          
          connections.push({
            id: `${j1.id}+${j2.id}`,
            isConnection: true,
            leg1: j1,
            leg2: j2,
            transferHub: hub,
            transferTimeStr: j1ArrivalAtHubStr,
            transferWaitMins: transferDiff,
            origin: origin,
            dest: dest,
            departure: j1.departure,
            arrival: j2.arrival,
            duration: totalDurationStr,
            price: j1.price + j2.price,
            type: j1.type === j2.type ? j1.type : "mixed",
            status: j1.status === "Suspended" || j2.status === "Suspended" ? "Suspended" : (j1.status === "Delayed" || j2.status === "Delayed" ? "Delayed" : "On Time"),
            delay: Math.max(j1.delay, j2.delay)
          });
        }
      });
    });
  });
  
  // Sort connections by total duration
  connections.sort((a, b) => {
    const durA = parseTimeString(a.arrival) - parseTimeString(a.departure);
    const durB = parseTimeString(b.arrival) - parseTimeString(b.departure);
    return (durA < 0 ? durA + 1440 : durA) - (durB < 0 ? durB + 1440 : durB);
  });
  
  return connections;
}

// 12. Weather Alerts Overlay System
const WEATHER_ALERTS = [
  {
    id: "weather-central",
    name: "Central Highlands Adverse Weather Zone",
    center: [6.9530, 80.7630], // Centered around Nanu Oya/Nuwara Eliya
    radius: 40000, // 40km
    severity: "Warning",
    colorClass: "weather-pulse-red",
    color: "#ef4444",
    desc: "Heavy mountain rainfall (>150mm) causing high risk of landslips and track washouts in the hill country.",
    impact: "Main Line operations between Rambukkana and Badulla are fully suspended."
  },
  {
    id: "weather-south",
    name: "Galle/Matara Coastal Storm Surge",
    center: [6.0367, 80.2170], // Centered around Galle
    radius: 30000, // 30km
    severity: "Advisory",
    colorClass: "weather-pulse-orange",
    color: "#f97316",
    desc: "Gale-force coastal winds up to 70 km/h and high tidal waves active along the southern coast.",
    impact: "Coastal line trains run with speed restrictions of 30 km/h; expect minor delays."
  },
  {
    id: "weather-north",
    name: "Jaffna Gale Winds Warning",
    center: [9.6615, 80.0255], // Centered around Jaffna
    radius: 25000, // 25km
    severity: "Advisory",
    colorClass: "weather-pulse-yellow",
    color: "#eab308",
    desc: "High wind speeds and sudden thunder squalls active across the northern peninsula.",
    impact: "Bus operators are advised to exercise caution on A9 highway routes."
  }
];

function drawWeatherAlerts() {
  if (!map) return;
  
  if (!weatherLayerGroup) {
    weatherLayerGroup = L.layerGroup();
  } else {
    weatherLayerGroup.clearLayers();
  }
  
  WEATHER_ALERTS.forEach(alert => {
    const circle = L.circle(alert.center, {
      radius: alert.radius,
      color: alert.color,
      fillColor: alert.color,
      fillOpacity: 0.22,
      weight: 2,
      className: alert.colorClass
    });
    
    const popupContent = `
      <div class="weather-popup-card">
        <div class="weather-popup-header">
          <i class="fa-solid fa-cloud-bolt" style="color: ${alert.color}; font-size: 16px;"></i>
          <span style="color: var(--text-main); font-weight: 700;">${alert.name}</span>
        </div>
        <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: ${alert.color}; letter-spacing: 0.5px; margin-top: -4px;">
          ${alert.severity} Alert
        </div>
        <div class="weather-popup-body">
          ${alert.desc}
        </div>
        <div class="weather-popup-impact">
          <i class="fa-solid fa-triangle-exclamation" style="margin-top: 2px;"></i>
          <div><strong>Transit Impact:</strong> ${alert.impact}</div>
        </div>
      </div>
    `;
    
    circle.bindPopup(popupContent, {
      className: "custom-weather-popup",
      closeButton: true,
      offset: L.point(0, 0)
    });
    
    weatherLayerGroup.addLayer(circle);
  });
}



