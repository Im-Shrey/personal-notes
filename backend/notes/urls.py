from django.urls import path
from .views import (
    NoteListView,
    NoteCreateView,
    NoteDetailView,
    RegisterView,
)

urlpatterns = [
    path(
        "",
        NoteListView.as_view()
    ),

    path(
        "create/",
        NoteCreateView.as_view()
    ),

    path(
        "<int:pk>/",
        NoteDetailView.as_view()
    ),
    
    path(
        "register/",
        RegisterView.as_view()
    ),
]