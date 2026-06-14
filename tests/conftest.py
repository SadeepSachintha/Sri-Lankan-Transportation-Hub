import pytest
import subprocess
import time
import socket
import os
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

def is_port_open(port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('127.0.0.1', port)) == 0

@pytest.fixture(scope="session", autouse=True)
def dev_server():
    # Get workspace directory (root of the project)
    workspace_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    
    # Start local Python HTTP server on port 8000
    server_process = subprocess.Popen(
        ["python", "-m", "http.server", "8000"],
        cwd=workspace_dir,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )
    
    # Wait for server to start
    for _ in range(30):
        if is_port_open(8000):
            break
        time.sleep(0.1)
        
    yield "http://localhost:8000"
    
    # Clean up server
    server_process.terminate()
    server_process.wait()

@pytest.fixture(scope="function")
def driver():
    options = Options()
    options.add_argument("--headless=new")  # modern headless mode
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--window-size=1280,800")
    
    driver = webdriver.Chrome(options=options)
    yield driver
    driver.quit()
