import pytest
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select, WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def wait_for_init(driver):
    # The page's DOMContentLoaded handler is async and awaits a Supabase query on startup.
    # We wait until the booking dropdown is populated, indicating all JS initializers have executed.
    WebDriverWait(driver, 10).until(
        lambda d: len(d.find_element(By.ID, "booking-vehicle-select").find_elements(By.TAG_NAME, "option")) > 0
    )

def test_theme_toggle(driver):
    driver.get("http://localhost:8000/index.html")
    wait_for_init(driver)
    
    html_elem = driver.find_element(By.TAG_NAME, "html")
    
    # Assert initial theme is dark
    assert html_elem.get_attribute("data-theme") == "dark"
    
    # Click theme toggle button via JavaScript to ensure it registers in headless mode
    theme_btn = driver.find_element(By.ID, "theme-toggle-btn")
    driver.execute_script("arguments[0].click();", theme_btn)
    
    # Assert theme toggled to light
    WebDriverWait(driver, 5).until(
        lambda d: html_elem.get_attribute("data-theme") == "light"
    )
    
    # Toggle back to dark
    driver.execute_script("arguments[0].click();", theme_btn)
    WebDriverWait(driver, 5).until(
        lambda d: html_elem.get_attribute("data-theme") == "dark"
    )

def test_language_switcher(driver):
    driver.get("http://localhost:8000/index.html")
    wait_for_init(driver)
    
    # Initially the header is in English
    header_title = driver.find_element(By.ID, "header-title")
    assert header_title.text == "Find Your Next Journey"
    
    # Open language dropdown
    lang_btn = driver.find_element(By.ID, "lang-toggle-btn")
    driver.execute_script("arguments[0].click();", lang_btn)
    
    # Wait for Sinhala option and click it
    si_option = WebDriverWait(driver, 5).until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, "button[data-lang='si']"))
    )
    driver.execute_script("arguments[0].click();", si_option)
    
    # Header title should change and not be English anymore
    WebDriverWait(driver, 5).until(
        lambda d: header_title.text != "Find Your Next Journey"
    )
    assert len(header_title.text) > 0

def test_tab_navigation(driver):
    driver.get("http://localhost:8000/index.html")
    wait_for_init(driver)
    
    # Click Live Tracker Tab via JS
    nav_tracker = driver.find_element(By.ID, "nav-tracker")
    driver.execute_script("arguments[0].click();", nav_tracker)
    
    # Check header update
    header_title = driver.find_element(By.ID, "header-title")
    WebDriverWait(driver, 5).until(
        lambda d: header_title.text == "Live GPS Route Tracker"
    )
    
    # Check active tab pane
    tracker_pane = driver.find_element(By.ID, "tab-tracker")
    assert "active" in tracker_pane.get_attribute("class")
    
    # Click Fare Calculator Tab via JS
    nav_calc = driver.find_element(By.ID, "nav-calculator")
    driver.execute_script("arguments[0].click();", nav_calc)
    
    WebDriverWait(driver, 5).until(
        lambda d: header_title.text == "Fare & Route Cost Calculator"
    )
    
    calc_pane = driver.find_element(By.ID, "tab-calculator")
    assert "active" in calc_pane.get_attribute("class")

def test_search_schedules(driver):
    driver.get("http://localhost:8000/index.html")
    wait_for_init(driver)
    
    # Select Origin: Colombo Fort
    origin_select = Select(driver.find_element(By.ID, "origin-select"))
    origin_select.select_by_value("Colombo Fort")
    
    # Select Destination: Galle
    dest_select = Select(driver.find_element(By.ID, "dest-select"))
    dest_select.select_by_value("Galle")
    
    # Click Search button via JS
    search_btn = driver.find_element(By.ID, "btn-search-schedules")
    driver.execute_script("arguments[0].click();", search_btn)
    
    # Verify results section is displayed
    results_section = driver.find_element(By.ID, "results-section")
    WebDriverWait(driver, 5).until(
        lambda d: results_section.is_displayed()
    )
    
    # Verify count and results list are not empty
    results_count = driver.find_element(By.ID, "results-count")
    assert int(results_count.text) > 0
    
    results_list = driver.find_element(By.ID, "results-list-container")
    cards = results_list.find_elements(By.CLASS_NAME, "result-card")
    assert len(cards) > 0

def test_fare_calculator(driver):
    driver.get("http://localhost:8000/index.html")
    wait_for_init(driver)
    
    # Go to Fare Calculator tab
    nav_calc = driver.find_element(By.ID, "nav-calculator")
    driver.execute_script("arguments[0].click();", nav_calc)
    
    # Select Origin: Colombo Fort
    calc_origin = Select(driver.find_element(By.ID, "calc-origin"))
    calc_origin.select_by_value("Colombo Fort")
    
    # Select Destination: Galle
    calc_dest = Select(driver.find_element(By.ID, "calc-dest"))
    calc_dest.select_by_value("Galle")
    
    # Wait for calculation results
    distance_val = driver.find_element(By.ID, "calc-distance-val")
    duration_val = driver.find_element(By.ID, "calc-duration-val")
    
    # Wait until value is calculated
    WebDriverWait(driver, 5).until(
        lambda d: distance_val.text != ""
    )
    
    assert "km" in distance_val.text.lower()
    assert "h" in duration_val.text.lower()
    
    # Verify fare table is populated
    table_body = driver.find_element(By.ID, "fare-comparison-body")
    rows = table_body.find_elements(By.TAG_NAME, "tr")
    assert len(rows) > 0

def test_seat_booking_flow(driver):
    driver.get("http://localhost:8000/index.html")
    wait_for_init(driver)
    
    # Override supabaseClient to null so the app uses its clean local simulation code path
    # rather than failing on database network queries/schema mismatches in the test environment.
    driver.execute_script("supabaseClient = null;")
    
    # Go to booking tab
    nav_booking = driver.find_element(By.ID, "nav-booking")
    driver.execute_script("arguments[0].click();", nav_booking)
    
    # Wait for vehicle selector to be visible
    booking_select_el = driver.find_element(By.ID, "booking-vehicle-select")
    
    # Select Yal Devi (T4021), which is active and not suspended
    booking_select = Select(booking_select_el)
    booking_select.select_by_value("T4021")
    # Trigger change event to load the seat grid
    driver.execute_script("arguments[0].dispatchEvent(new Event('change'));", booking_select_el)
    
    # Wait for seats grid to populate
    seats_container = driver.find_element(By.ID, "seats-grid-container")
    WebDriverWait(driver, 5).until(
        lambda d: len(seats_container.find_elements(By.CLASS_NAME, "seat")) > 0
    )
    
    # Find available seats (seats that have "seat-available" class and no "occupied" class)
    available_seats = seats_container.find_elements(By.CSS_SELECTOR, ".seat.seat-available:not(.seat-occupied)")
    assert len(available_seats) > 0
    
    # Click the first available seat
    first_seat = available_seats[0]
    seat_num = first_seat.text
    driver.execute_script("arguments[0].click();", first_seat)
    
    # Verify the selected seat is in summary
    summary_seats = driver.find_element(By.ID, "summary-seats-list")
    assert seat_num in summary_seats.text
    
    # Reserve button should now be enabled
    reserve_btn = driver.find_element(By.ID, "btn-reserve-seats")
    assert reserve_btn.is_enabled()
    
    # Click reserve
    driver.execute_script("arguments[0].click();", reserve_btn)
    
    # Verify boarding pass/ticket wrapper is generated and displayed
    ticket_wrapper = driver.find_element(By.ID, "generated-ticket-wrapper")
    WebDriverWait(driver, 5).until(
        lambda d: ticket_wrapper.is_displayed()
    )
    
    ticket_seats = driver.find_element(By.ID, "ticket-seats-val")
    assert seat_num in ticket_seats.text

def test_admin_analytics_charts(driver):
    driver.get("http://localhost:8000/index.html")
    wait_for_init(driver)
    
    # Override supabaseClient to null to bypass real network auth in testing environment
    driver.execute_script("supabaseClient = null;")
    
    # Go to Admin tab
    nav_admin = driver.find_element(By.ID, "nav-admin")
    driver.execute_script("arguments[0].click();", nav_admin)
    
    # Input mock operator credentials
    email_input = driver.find_element(By.ID, "login-email")
    pass_input = driver.find_element(By.ID, "login-password")
    
    email_input.send_keys("operator@lankatransit.lk")
    pass_input.send_keys("operator123")
    
    # Click Sign In
    login_form = driver.find_element(By.ID, "admin-login-form")
    submit_btn = login_form.find_element(By.CSS_SELECTOR, "button[type='submit']")
    driver.execute_script("arguments[0].click();", submit_btn)
    
    # Wait for dashboard view to display
    dashboard_view = driver.find_element(By.ID, "admin-dashboard-view")
    WebDriverWait(driver, 5).until(
        lambda d: dashboard_view.is_displayed()
    )
    
    # Verify Chart canvases are present and rendered
    rev_chart = driver.find_element(By.ID, "revenueShareChart")
    trends_chart = driver.find_element(By.ID, "bookingTrendsChart")
    
    assert rev_chart.is_displayed()
    assert trends_chart.is_displayed()
    
    # Verify they have been initialized with dimensions
    assert int(rev_chart.get_attribute("width")) > 0
    assert int(trends_chart.get_attribute("width")) > 0

def test_multi_modal_routing(driver):
    driver.get("http://localhost:8000/index.html")
    wait_for_init(driver)
    
    # Select Origin: Galle
    origin_select = Select(driver.find_element(By.ID, "origin-select"))
    origin_select.select_by_value("Galle")
    
    # Select Destination: Jaffna
    dest_select = Select(driver.find_element(By.ID, "dest-select"))
    dest_select.select_by_value("Jaffna")
    
    # Click Search
    search_btn = driver.find_element(By.ID, "btn-search-schedules")
    driver.execute_script("arguments[0].click();", search_btn)
    
    # Verify results section is displayed
    results_section = driver.find_element(By.ID, "results-section")
    WebDriverWait(driver, 5).until(
        lambda d: results_section.is_displayed()
    )
    
    # Verify we got a connection card
    results_list = driver.find_element(By.ID, "results-list-container")
    connection_cards = results_list.find_elements(By.CLASS_NAME, "connection-result")
    assert len(connection_cards) > 0
    
    # Verify the vehicle name details contains connection arrow
    vehicle_name = connection_cards[0].find_element(By.CLASS_NAME, "result-vehicle-name")
    assert "➔" in vehicle_name.text
    
    # Verify the price is cumulative (980 for Galle-Col bus + 1800 for Colombo-Jaf train = 2780)
    price_text = connection_cards[0].find_element(By.CLASS_NAME, "price-text")
    assert "2780" in price_text.text
    
    # Click "Book" on connection card
    book_btn = connection_cards[0].find_element(By.CLASS_NAME, "btn-book-connection")
    driver.execute_script("arguments[0].click();", book_btn)
    
    # Verify we are on booking tab
    booking_pane = driver.find_element(By.ID, "tab-booking")
    WebDriverWait(driver, 5).until(
        lambda d: "active" in booking_pane.get_attribute("class")
    )
    
    # Verify BEX09 (first leg) is selected
    booking_select_el = driver.find_element(By.ID, "booking-vehicle-select")
    WebDriverWait(driver, 5).until(
        lambda d: booking_select_el.get_attribute("value") == "BEX09"
    )
    booking_select = Select(booking_select_el)
    assert booking_select.first_selected_option.get_attribute("value") == "BEX09"

def test_live_weather_map_overlay(driver):
    driver.get("http://localhost:8000/index.html")
    wait_for_init(driver)
    
    # Go to Live Tracker tab
    nav_tracker = driver.find_element(By.ID, "nav-tracker")
    driver.execute_script("arguments[0].click();", nav_tracker)
    
    # Wait for map container to render and load Leaflet elements
    map_el = driver.find_element(By.ID, "tracker-map")
    WebDriverWait(driver, 5).until(
        lambda d: map_el.is_displayed()
    )
    
    # Find weather toggle checkbox and click it
    weather_toggle = driver.find_element(By.ID, "toggle-weather-layer")
    assert not weather_toggle.is_selected()
    
    driver.execute_script("arguments[0].click();", weather_toggle)
    assert weather_toggle.is_selected()
    
    # Verify that the pulsing weather warning circles are drawn on the map
    WebDriverWait(driver, 5).until(
        lambda d: len(d.find_elements(By.CLASS_NAME, "weather-pulse-red")) > 0
    )
    
    orange_zones = driver.find_elements(By.CLASS_NAME, "weather-pulse-orange")
    yellow_zones = driver.find_elements(By.CLASS_NAME, "weather-pulse-yellow")
    assert len(orange_zones) > 0
    assert len(yellow_zones) > 0
    
    # Click the red weather warning zone circle to trigger its popup via Leaflet API
    driver.execute_script("weatherLayerGroup.getLayers()[0].openPopup();")
    
    # Wait for Leaflet popup to render and become visible on map
    WebDriverWait(driver, 5).until(
        lambda d: d.find_element(By.CLASS_NAME, "custom-weather-popup").is_displayed()
    )
    popup = driver.find_element(By.CLASS_NAME, "custom-weather-popup")
    
    # Verify the popup title and contents
    popup_text = popup.text.lower()
    assert "central highlands" in popup_text or "adverse weather" in popup_text
    assert "warning" in popup_text
    assert "transit impact" in popup_text
    
    # Deselect weather layer toggle and verify overlays are removed
    driver.execute_script("arguments[0].click();", weather_toggle)
    assert not weather_toggle.is_selected()
    
    # Wait for weather warning circles to be removed
    WebDriverWait(driver, 5).until(
        lambda d: len(d.find_elements(By.CLASS_NAME, "weather-pulse-red")) == 0
    )

def test_external_booking_deep_links(driver):
    driver.get("http://localhost:8000/index.html")
    wait_for_init(driver)
    
    # Go to booking tab
    nav_booking = driver.find_element(By.ID, "nav-booking")
    driver.execute_script("arguments[0].click();", nav_booking)
    
    # Wait for vehicle selector
    booking_select_el = driver.find_element(By.ID, "booking-vehicle-select")
    
    # Case 1: Train (Yal Devi T4021) -> Should redirect to Railway portal
    booking_select = Select(booking_select_el)
    booking_select.select_by_value("T4021")
    driver.execute_script("arguments[0].dispatchEvent(new Event('change'));", booking_select_el)
    
    external_btn = driver.find_element(By.ID, "btn-external-booking")
    assert external_btn.is_displayed()
    
    # Store original window handle
    original_window = driver.current_window_handle
    
    # Click external booking button
    driver.execute_script("arguments[0].click();", external_btn)
    
    # Wait for the new tab to open
    WebDriverWait(driver, 5).until(lambda d: len(d.window_handles) == 2)
    
    # Switch to new tab and check URL
    new_window = [h for h in driver.window_handles if h != original_window][0]
    driver.switch_to.window(new_window)
    assert "railway.gov.lk" in driver.current_url.lower()
    
    # Close new tab and switch back
    driver.close()
    driver.switch_to.window(original_window)
    
    # Case 2: Expressway Bus (BEX09) -> Should redirect to SLTB portal
    booking_select.select_by_value("BEX09")
    driver.execute_script("arguments[0].dispatchEvent(new Event('change'));", booking_select_el)
    
    # Click external booking button
    driver.execute_script("arguments[0].click();", external_btn)
    
    # Wait for the new tab to open
    WebDriverWait(driver, 5).until(lambda d: len(d.window_handles) == 2)
    
    # Switch to new tab and check URL
    new_window = [h for h in driver.window_handles if h != original_window][0]
    driver.switch_to.window(new_window)
    assert "sltb.seatreservation.lk" in driver.current_url.lower()
    
    # Close new tab and switch back
    driver.close()
    driver.switch_to.window(original_window)

def test_search_results_external_booking_links(driver):
    driver.get("http://localhost:8000/index.html")
    wait_for_init(driver)
    
    # --- Case 1: Direct Train Search & Redirection ---
    origin_select = Select(driver.find_element(By.ID, "origin-select"))
    origin_select.select_by_value("Colombo Fort")
    
    dest_select = Select(driver.find_element(By.ID, "dest-select"))
    dest_select.select_by_value("Jaffna")
    
    search_btn = driver.find_element(By.ID, "btn-search-schedules")
    driver.execute_script("arguments[0].click();", search_btn)
    
    results_list = driver.find_element(By.ID, "results-list-container")
    
    # Wait for results
    WebDriverWait(driver, 5).until(
        lambda d: len(results_list.find_elements(By.CLASS_NAME, "result-card")) > 0
    )
    
    # Find the "Official" button for Yal Devi train (which is not suspended)
    train_card = results_list.find_element(By.CLASS_NAME, "train-result")
    official_btn = train_card.find_element(By.CLASS_NAME, "btn-book-official-search")
    driver.execute_script("arguments[0].scrollIntoView(true);", official_btn)
    time.sleep(0.5)
    assert official_btn.is_displayed()
    
    original_window = driver.current_window_handle
    driver.execute_script("arguments[0].click();", official_btn)
    
    WebDriverWait(driver, 5).until(lambda d: len(d.window_handles) == 2)
    new_window = [h for h in driver.window_handles if h != original_window][0]
    driver.switch_to.window(new_window)
    assert "railway.gov.lk" in driver.current_url.lower()
    
    driver.close()
    driver.switch_to.window(original_window)
    
    # --- Case 2: Connection Search & Redirection ---
    # Galle to Jaffna has connections
    origin_select.select_by_value("Galle")
    dest_select.select_by_value("Jaffna")
    driver.execute_script("arguments[0].click();", search_btn)
    
    # Wait for connection cards to render
    WebDriverWait(driver, 5).until(
        lambda d: len(results_list.find_elements(By.CLASS_NAME, "connection-result")) > 0
    )
    
    conn_card = results_list.find_element(By.CLASS_NAME, "connection-result")
    official_btn = conn_card.find_element(By.CLASS_NAME, "btn-book-official-connection")
    driver.execute_script("arguments[0].scrollIntoView(true);", official_btn)
    time.sleep(0.5)
    assert official_btn.is_displayed()
    
    driver.execute_script("arguments[0].click();", official_btn)
    
    WebDriverWait(driver, 5).until(lambda d: len(d.window_handles) == 2)
    new_window = [h for h in driver.window_handles if h != original_window][0]
    driver.switch_to.window(new_window)
    assert "railway.gov.lk" in driver.current_url.lower() or "sltb.seatreservation.lk" in driver.current_url.lower() or "magiya.lk" in driver.current_url.lower()
    
    driver.close()
    driver.switch_to.window(original_window)





