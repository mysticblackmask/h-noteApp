from rest_framework import serializers
from NotsAPP.models import CustomUser  # Import your CustomUser model

# Serializer for the CustomUser model (for profile, etc.)
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'phone_number']

# Serializer for the default Django User model (for certain cases where you might still use it)
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser  # Use CustomUser model
        fields = ['id', 'username', 'email']  # Feel free to adjust based on required fields

# Serializer for sign-up, now working with CustomUser model
class UserSignUpSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser  # Use CustomUser model for sign-up
        fields = ['username', 'email', 'password', 'phone_number']  # Include phone_number

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        return value

# Serializer for sign-in, works the same way with CustomUser model
class UserSignInSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
