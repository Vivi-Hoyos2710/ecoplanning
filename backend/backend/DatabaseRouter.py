class DatabaseRouter(object):
    """
    Control all databases
    """

    def db_for_read(self, model, **hints):
        """
        All databases can be read from
        """
        if model._meta.app_label == "ovms":
            return "ovms"
        return "default"

    def db_for_write(self, model, **hints):
        """
        Attempts to write auth models go to auth_db.
        """
        if model._meta.app_label == "ovms":
            return None
        return "default"

    def allow_relation(self, obj1, obj2, **hints):
        """
        Allow relations if a model in the auth app is involved.
        """
        if obj1._meta.app_label == "ovms" or obj2._meta.app_label == "ovms":
            return False
        return "default"

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        Make sure the auth app only appears in the 'auth_db'
        database.
        """
        if app_label == "ovms":
            return False
        return True
