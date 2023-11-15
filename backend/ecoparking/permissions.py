from rest_framework.permissions import BasePermission


class ViewEveryOneCreateModifyAdmin(BasePermission):
    def has_permission(self, request, view):
        if view.action == "list":
            return True
        elif view.action in [
            "create",
            "retrieve",
            "update",
            "partial_update",
            "destroy",
        ]:
            print(request.user.is_superuser)
            return request.user.is_superuser
        else:
            return False


class CreateEveryOneAccessAdmin(BasePermission):
    def has_permission(self, request, view):
        if view.action == "create":
            return True
        elif view.action in [
            "list",
            "retrieve",
            "update",
            "partial_update",
            "destroy",
        ]:
            return request.user.is_superuser
        else:
            return False


class CarPermission(BasePermission):
    def has_permission(self, request, view):
        if view.action == "list":
            return (
                request.user.is_authenticated
                and "user" in request.query_params
                and int(request.query_params["user"]) == request.user.id
            ) or request.user.is_superuser
        elif view.action in [
            "create",
            "retrieve",
            "update",
            "partial_update",
            "destroy",
        ]:
            return request.user.is_authenticated
        else:
            return False

    def has_object_permission(self, request, view, obj):
        if not request.user.is_authenticated:
            return False
        if view.action == "retrieve":
            return obj.user == request.user or request.user.is_superuser
        elif view.action in ["update", "partial_update", "destroy"]:
            return obj.user == request.user or request.user.is_superuser
        else:
            return False
