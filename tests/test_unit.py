import pytest

def test_parse_time_string(driver):
    driver.get("http://localhost:8000/index.html")
    
    # Test standard AM time
    res = driver.execute_script("return parseTimeString('05:55 AM');")
    assert res == 355
    
    # Test midnight AM time
    res = driver.execute_script("return parseTimeString('12:00 AM');")
    assert res == 0
    
    # Test noon PM time
    res = driver.execute_script("return parseTimeString('12:00 PM');")
    assert res == 720
    
    # Test standard PM time
    res = driver.execute_script("return parseTimeString('03:15 PM');")
    assert res == 915

def test_format_time_string(driver):
    driver.get("http://localhost:8000/index.html")
    
    # Test standard AM minutes
    res = driver.execute_script("return formatTimeString(355);")
    assert res == "05:55 AM"
    
    # Test standard PM minutes
    res = driver.execute_script("return formatTimeString(915);")
    assert res == "03:15 PM"
    
    # Test midnight minutes
    res = driver.execute_script("return formatTimeString(0);")
    assert res == "12:00 AM"

def test_approximate_stop_time(driver):
    driver.get("http://localhost:8000/index.html")
    
    # T1015 is Udarata Menike (JOURNEYS[0]), departure 05:55 AM, arrival 03:15 PM
    res = driver.execute_script("return approximateStopTime(JOURNEYS[0], 'Colombo Fort');")
    assert res == "05:55 AM"
    
    res = driver.execute_script("return approximateStopTime(JOURNEYS[0], 'Badulla');")
    assert res == "03:15 PM"

def test_get_upcoming_arrivals(driver):
    driver.get("http://localhost:8000/index.html")
    
    # Get upcoming transits for Colombo Fort
    res = driver.execute_script("return getUpcomingArrivals('Colombo Fort');")
    assert len(res) > 0
    
    # Check that arrivals are chronologically sorted by scheduled minutes
    scheduled_mins = [item['scheduledMins'] for item in res]
    assert scheduled_mins == sorted(scheduled_mins)

def test_get_localized_station_name(driver):
    driver.get("http://localhost:8000/index.html")
    
    # Test default language (English)
    res = driver.execute_script("return getLocalizedStationName('Colombo Fort');")
    assert "Colombo Fort" in res
    
    # Switch to Sinhala and test
    driver.execute_script("currentLanguage = 'si';")
    res = driver.execute_script("return getLocalizedStationName('Colombo Fort');")
    # It should retrieve the Sinhala translation
    assert res != "Colombo Fort"
    assert len(res) > 0
