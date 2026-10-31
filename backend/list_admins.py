import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

admins = User.objects.filter(is_superuser=True)

if not admins.exists():
    print("No Django superuser accounts found.")
else:
    print("Existing Django superuser accounts:")

    for admin in admins:
        print(f"Username: {admin.username}")
        print(f"Email: {admin.email or 'No email registered'}")