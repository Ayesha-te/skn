import os
import django
import sys

sys.path.append(os.path.join(os.getcwd(), 'backend_django'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.contrib.auth.models import User
users = User.objects.all()
print(f"Total users: {users.count()}")
for u in users:
    print(f"User: {u.username}, Is Staff: {u.is_staff}, Is Superuser: {u.is_superuser}")
