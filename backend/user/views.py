from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from rest_framework.serializers import ModelSerializer
from rest_framework.viewsets import ModelViewSet
from user.models import User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "first_name", "last_name"]


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
