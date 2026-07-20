from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers

from .models import Note
# from .serializers import NoteSerializer
from django.contrib.auth.models import User
from .serializers import (
    NoteSerializer,
    UserRegistrationSerializer
)

class RegisterView(
    generics.CreateAPIView
):

    queryset = User.objects.all()

    serializer_class = (
        UserRegistrationSerializer
    )

class UserRegistrationSerializer(
    serializers.ModelSerializer
):

    password = serializers.CharField(
        write_only=True
    )

    class Meta:

        model = User

        fields = [
            "username",
            "password"
        ]

    def create(
        self,
        validated_data
    ):

        user = User.objects.create_user(
            username=validated_data[
                "username"
            ],
            email=validated_data[
                "email"
            ],
            password=validated_data[
                "password"
            ]
        )

        return user

class NoteListView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        notes = Note.objects.filter(
            user=request.user
        )

        serializer = NoteSerializer(
            notes,
            many=True
        )

        return Response(serializer.data)
    
class NoteCreateView(
    generics.CreateAPIView
):

    serializer_class = NoteSerializer

    permission_classes = [
        IsAuthenticated
    ]

    def perform_create(
        self,
        serializer
    ):
        serializer.save(
            user=self.request.user
        )

class NoteDetailView(
    generics.RetrieveUpdateDestroyAPIView
):

    serializer_class = NoteSerializer

    permission_classes = [
        IsAuthenticated
    ]

    def get_queryset(self):
        return Note.objects.filter(
            user=self.request.user
        )