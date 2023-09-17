from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework.filters import OrderingFilter
from rest_framework.mixins import Response
from rest_framework.serializers import EmailField, ModelSerializer
from rest_framework.validators import UniqueValidator
from rest_framework.views import status
from rest_framework.viewsets import ModelViewSet
from user.models import User
import django.contrib.auth.password_validation as validators


class UserSerializer(ModelSerializer):
    email = EmailField(validators=[UniqueValidator(queryset=User.objects.all())])

    def validate_password(self, password):
        validators.validate_password(password=password)

    class Meta:
        model = User
        fields = ["id", "email", "first_name", "last_name", "password"]


class UserView(ModelViewSet):
    serializer_class = UserSerializer
    filter_backends = [
        DjangoFilterBackend,
        OrderingFilter,
    ]
    filterset_fields = {
        "id": ["exact"],
        "email": ["exact"],
        "first_name": ["exact"],
        "last_name": ["exact"],
    }
    ordering_fields = filterset_fields

    def get_queryset(self):
        return User.objects.all()

    @action(detail=False, methods=["POST"], name="validation", url_path="validation")
    def validate_data(self, request):
        """
        Custom action to validate data passed in a POST request.
        """
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Do your validation logic here
            validated_data = serializer.validated_data
            # Perform validation operations and return a response

            # Example response:
            response_data = {
                "message": "Data is valid",
                "validated_data": validated_data,
            }
            return Response(response_data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
