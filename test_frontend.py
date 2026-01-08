import requests
import json

response = requests.get('http://localhost:8000/api/products/')
products = response.json()

print(f"Total products: {len(products)}")
if products:
    p = products[0]
    print(f"First product: {p['name']}")
    print(f"  - ID: {p['id']}")
    print(f"  - Category ID: {p['category']}")
    print(f"  - Category Name: {p['category_name']}")
    print(f"  - Featured: {p['featured']}")
    print(f"  - Bestseller: {p['bestseller']}")
    print(f"  - Created At: {p['created_at']}")

response = requests.get('http://localhost:8000/api/categories/')
categories = response.json()
print(f"\nTotal categories: {len(categories)}")
for c in categories:
    print(f"  - {c['name']} (ID: {c['id']})")
