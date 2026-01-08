import requests
import base64

def test_login(username, password):
    url = "http://localhost:8000/api/me/"
    auth = base64.b64encode(f"{username}:{password}".encode()).decode()
    headers = {
        "Authorization": f"Basic {auth}"
    }
    try:
        response = requests.get(url, headers=headers)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
    except Exception as e:
        print(f"Error: {e}")

def test_register(username, email, password):
    url = "http://localhost:8000/api/register/"
    data = {
        "username": username,
        "email": email,
        "password": password,
        "is_staff": True
    }
    try:
        response = requests.post(url, json=data)
        print(f"Register Status Code: {response.status_code}")
        print(f"Register Response: {response.text}")
    except Exception as e:
        print(f"Register Error: {e}")

if __name__ == "__main__":
    # Test with admin:admin123
    test_login("admin", "admin123")
    # Test registration
    test_register("testuser", "test@example.com", "testpass123")
    # Test login with new user
    test_login("testuser", "testpass123")
