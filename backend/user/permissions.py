from rest_framework.permissions import BasePermission


class UserPermission(BasePermission):
    def has_permission(self, request, view):
        if view.action == "list":
            return request.user.is_authenticated and request.user.is_superuser
        elif view.action in [
            "create",
            "retrieve",
            "update",
            "partial_update",
            "destroy",
            "validate_data",
        ]:
            return True
        else:
            return False

    def has_object_permission(self, request, view, obj):
        if not request.user.is_authenticated():
            return False
        if view.action == "retrieve":
            return obj == request.user or request.user.is_admin
        elif view.action in ["update", "partial_update", "destroy"]:
            return obj == request.user or request.user.is_admin
        else:
            return False
