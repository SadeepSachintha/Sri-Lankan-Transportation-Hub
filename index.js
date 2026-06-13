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
    status: "On Time",
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
    delay: 15,
    status: "Delayed",
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
    status: "On Time",
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
    status: "On Time",
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
  }
];

// App Global State
let currentTab = "search";
let map = null;
let mapMarkers = [];
let routeLines = [];
let trackerVehicleMarker = null;
let trackerAnimationTimer = null;
let trackerProgress = 0.35; // 35% default progress
let currentTrackerVehicle = JOURNEYS[0];
let selectedSeats = [];
let currentBookingJourney = JOURNEYS[0];

// 2. DOM Elements & Initialization
document.addEventListener("DOMContentLoaded", () => {
  initClock();
  initTabNavigation();
  initSearchEngine();
  initLiveTracker();
  initSeatBooking();
  initFareCalculator();
  initThemeToggle();
  initNotifications();
  
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

// 4. Multi-view Tabs Navigation
function initTabNavigation() {
  const navItems = document.querySelectorAll(".nav-item");
  const tabPanes = document.querySelectorAll(".tab-pane");
  const headerTitle = document.getElementById("header-title");
  const headerSubtitle = document.getElementById("header-subtitle");

  const tabMeta = {
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
    }
  };

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
      alert("Origin and Destination stations cannot be the same!");
      return;
    }

    // Filter schedules
    lastFilteredResults = JOURNEYS.filter(journey => {
      const matchOrigin = journey.origin === origin;
      const matchDest = journey.dest === dest;
      const matchType = type === "all" || journey.type === type;
      return matchOrigin && matchDest && matchType;
    });

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
      const isTrain = journey.type === "train";
      const iconClass = isTrain ? "fa-train" : "fa-bus";
      const typeLabel = isTrain ? "Train" : "Luxury Bus";
      const statusClass = journey.status === "On Time" ? "status-ontime" : "status-delayed";
      const statusDelay = journey.delay > 0 ? ` (+${journey.delay}m)` : "";

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
          <button class="btn btn-outline btn-sm btn-track-this" data-id="${journey.id}">
            <i class="fa-solid fa-map-location-dot"></i> Track
          </button>
          <button class="btn btn-primary btn-sm btn-book-this" data-id="${journey.id}">
            <i class="fa-solid fa-ticket"></i> Book
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
    const vehicle = JOURNEYS.find(j => j.id === vehicleId);
    if (vehicle) {
      currentTrackerVehicle = vehicle;
      loadTrackerRoute();
    }
  });

  // Initialize Leaflet Map
  const mapContainer = document.getElementById("tracker-map");
  if (mapContainer) {
    map = L.map("tracker-map").setView([7.8731, 80.7718], 8); // Center of Sri Lanka
    
    // Default Dark tiles
    updateMapTiles();
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
  routeSelect.innerHTML = "";
  
  const filtered = JOURNEYS.filter(j => j.type === type);
  filtered.forEach(j => {
    const opt = document.createElement("option");
    opt.value = j.id;
    opt.innerText = `${j.name} (${j.id}) - ${j.origin} to ${j.dest}`;
    routeSelect.appendChild(opt);
  });

  if (filtered.length > 0) {
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
  if (trackerAnimationTimer) {
    clearInterval(trackerAnimationTimer);
  }

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
        .bindPopup(`<strong>${stopName}</strong><br>Station Code: ${station.code}`)
        .addTo(map);
      mapMarkers.push(marker);
    }
  });

  // Fit Map bounds to show route
  map.fitBounds(routeLine.getBounds(), { padding: [40, 40] });

  // Initialize Vehicle marker movement animation
  trackerProgress = 0.2 + Math.random() * 0.6; // Start at randomized progress between 20% and 80%
  updateTrackerUI();

  const vehicleIcon = L.divIcon({
    className: 'vehicle-tracker-pin',
    html: `<div class="glowing-tracker-pin" style="background-color: ${lineColor}; color: #0a0f1e; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 10px ${lineColor}; border: 2px solid #fff;">
             <i class="fa-solid ${currentTrackerVehicle.type === 'train' ? 'fa-train' : 'fa-bus'}" style="font-size: 14px;"></i>
           </div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17]
  });

  const startCoords = interpolatePosition(trackCoords, trackerProgress);
  trackerVehicleMarker = L.marker(startCoords, { icon: vehicleIcon }).addTo(map)
    .bindPopup(`<strong>${currentTrackerVehicle.name} (${currentTrackerVehicle.id})</strong><br>Status: ${currentTrackerVehicle.status}`);

  // Animate tracker loop
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
  
  // Set UI stats
  document.getElementById("tracker-vehicle-name").innerText = `${currentTrackerVehicle.name} (${currentTrackerVehicle.id})`;
  document.getElementById("tracker-route-line").innerText = `${currentTrackerVehicle.origin} ➔ ${currentTrackerVehicle.dest}`;
  
  const statusBadge = document.getElementById("tracker-status-badge");
  statusBadge.innerText = currentTrackerVehicle.status;
  statusBadge.className = `status-badge ${currentTrackerVehicle.status === "On Time" ? "status-ontime" : "status-delayed"}`;

  // Next Stop Calculation based on stops count
  const stopIndex = Math.min(
    Math.floor(trackerProgress * currentTrackerVehicle.stops.length),
    currentTrackerVehicle.stops.length - 1
  );
  const nextStopName = currentTrackerVehicle.stops[Math.min(stopIndex + 1, currentTrackerVehicle.stops.length - 1)];
  document.getElementById("tracker-next-stop").innerText = nextStopName;

  // Speeds & timings
  const isTrain = currentTrackerVehicle.type === "train";
  const currentSpeed = percentage >= 98 ? "0 km/h" : (isTrain ? `${50 + Math.round(Math.random() * 15)} km/h` : `${65 + Math.round(Math.random() * 20)} km/h`);
  document.getElementById("tracker-current-speed").innerText = currentSpeed;
  
  // ETA calculation
  const etaMins = Math.round((1.0 - trackerProgress) * 90); // minutes remaining to destination
  if (etaMins === 0) {
    document.getElementById("tracker-eta-stop").innerText = "Arrived";
  } else {
    const etaDate = new Date();
    etaDate.setMinutes(etaDate.getMinutes() + etaMins);
    document.getElementById("tracker-eta-stop").innerText = etaDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  document.getElementById("tracker-delay-val").innerText = `${currentTrackerVehicle.delay} min`;
  document.getElementById("tracker-delay-val").className = `stat-value ${currentTrackerVehicle.delay > 0 ? "text-warning" : "text-success"}`;

  // Timeline UI updates
  document.getElementById("tracker-timeline-start").innerText = currentTrackerVehicle.origin;
  document.getElementById("tracker-timeline-end").innerText = currentTrackerVehicle.dest;
  document.getElementById("tracker-progress-fill").style.width = `${percentage}%`;
  document.getElementById("tracker-vehicle-marker").style.left = `${percentage}%`;
  document.getElementById("tracker-progress-percentage").innerText = `Journey ${percentage}% Completed`;
}

// Route navigation redirection from Search Card to Live Tracker
function triggerTrackerForVehicle(vehicleId) {
  const vehicle = JOURNEYS.find(j => j.id === vehicleId);
  if (vehicle) {
    currentTrackerVehicle = vehicle;
    
    // Swap nav tabs
    document.getElementById("nav-tracker").click();
    
    // Set selector value
    const trackerMode = document.getElementById(vehicle.type === "train" ? "tracker-mode-train" : "tracker-mode-bus");
    trackerMode.click();
    
    setTimeout(() => {
      document.getElementById("tracker-route-select").value = vehicleId;
      loadTrackerRoute();
    }, 150);
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
  JOURNEYS.forEach(j => {
    const opt = document.createElement("option");
    opt.value = j.id;
    opt.innerText = `${j.name} - ${j.origin} to ${j.dest} (${j.departure})`;
    bookingSelect.appendChild(opt);
  });

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

  bookBtn.addEventListener("click", () => {
    if (selectedSeats.length === 0) return;
    
    // Generate Boarding Pass Ticket
    document.getElementById("ticket-origin-code").innerText = STATIONS[currentBookingJourney.origin].code;
    document.getElementById("ticket-origin-name").innerText = currentBookingJourney.origin;
    document.getElementById("ticket-dest-code").innerText = STATIONS[currentBookingJourney.dest].code;
    document.getElementById("ticket-dest-name").innerText = currentBookingJourney.dest;
    document.getElementById("ticket-date-val").innerText = document.getElementById("travel-date").value || "15 Jun 2026";
    document.getElementById("ticket-time-val").innerText = currentBookingJourney.departure;
    
    const classLabel = classSelect.options[classSelect.selectedIndex].text.split(" (")[0];
    document.getElementById("ticket-seats-val").innerText = `Car 02 / ${selectedSeats.join(", ")}`;
    document.getElementById("ticket-vehicle-val").innerText = currentBookingJourney.name;

    // Show ticket
    ticketWrapper.style.display = "block";
    ticketWrapper.scrollIntoView({ behavior: 'smooth' });

    alert(`Reservation Successful! Seat(s) ${selectedSeats.join(", ")} reserved for ${currentBookingJourney.name}.`);
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

  // Default layout gen
  currentBookingJourney = JOURNEYS[0];
  generateSeatGrid();
  updateBookingSummary();
}

function generateSeatGrid() {
  const seatsContainer = document.getElementById("seats-grid-container");
  seatsContainer.innerHTML = "";

  const seatLetters = ["A", "B", "C", "D"];
  const totalColumns = 10;
  
  // Seed random occupied state based on selected journey ID to keep consistency
  const seed = currentBookingJourney.id.charCodeAt(1) || 5;
  
  for (let row = 0; row < 4; row++) {
    const letter = seatLetters[row];
    for (let col = 1; col <= totalColumns; col++) {
      const seatId = `${letter}${col}`;
      
      // Seeded random simulation for occupied seat
      const occupiedHash = (seed * row + col * 7) % 10;
      const isOccupied = occupiedHash < 3; // ~30% occupied

      const seatEl = document.createElement("div");
      seatEl.className = `seat ${isOccupied ? 'seat-occupied' : 'seat-available'}`;
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

  journeyTitle.innerText = `${currentBookingJourney.origin} to ${currentBookingJourney.dest}`;
  
  const classSelect = document.getElementById("booking-class-select");
  const classLabel = classSelect.options[classSelect.selectedIndex].text.split(" (")[0];
  cabinClass.innerText = classLabel;

  seatsList.innerText = selectedSeats.length > 0 ? selectedSeats.join(", ") : "None";

  // Calculate total price based on class multipliers
  const basePrice = currentBookingJourney.price;
  let multiplier = 1.0;
  if (classSelect.value === "1st") multiplier = 1.6;
  if (classSelect.value === "3rd") multiplier = 0.6;

  const total = Math.round(selectedSeats.length * basePrice * multiplier);
  totalFare.innerText = `Rs. ${total.toLocaleString()}`;

  // Disable button if no seats selected
  bookBtn.disabled = selectedSeats.length === 0;
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
    type: "delay",
    message: "Udarata Menike (T1015) is running on-time, but expect minor speed limits between Hatton and Ella.",
    time: "5 mins ago",
    isRead: false
  },
  {
    id: "N2",
    type: "alert",
    message: "Podi Menike (T1005) is delayed by 15 mins due to track clearance work at Rambukkana.",
    time: "15 mins ago",
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
    });
    renderNotifications();
  });

  function renderNotifications() {
    listContainer.innerHTML = "";
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
        renderNotifications();
      });

      listContainer.appendChild(item);
    });
  }

  // Initial render on load
  renderNotifications();
}

