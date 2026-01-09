import requests
import json

response = requests.get('https://sleepy-carrie-ayesha25-2b164d3d.koyeb.app/api/products/')
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

response = requests.get('https://sleepy-carrie-ayesha25-2b164d3d.koyeb.app/api/categories/')
categories = response.json()
print(f"\nTotal categories: {len(categories)}")
for c in categories:
    print(f"  - {c['name']} (ID: {c['id']})")
