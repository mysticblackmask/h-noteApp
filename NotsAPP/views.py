from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser  # Import CustomUser model
from .serializers import UserSignUpSerializer, UserSignInSerializer, CustomUserSerializer

class UserSignUpAPIView(APIView):
    def post(self, request):
        try:
            # Validate and create the user
            serializer = UserSignUpSerializer(data=request.data)
            if serializer.is_valid():
                user = serializer.save()
                user.set_password(serializer.validated_data['password'])  # Hash the password
                user.save()
                return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Catch any other exceptions and return a generic error
            return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserSignInAPIView(APIView):
    def post(self, request):
        try:
            # Authenticate the user
            serializer = UserSignInSerializer(data=request.data)
            if serializer.is_valid():
                username = serializer.validated_data['username']
                password = serializer.validated_data['password']
                user = authenticate(username=username, password=password)

                if user is not None:
                    # Generate tokens
                    refresh = RefreshToken.for_user(user)
                    return Response({
                        'refresh': str(refresh),
                        'access': str(refresh.access_token)
                    })
                else:
                    return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Catch any other exceptions and return a generic error
            return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserProfileAPIView(APIView):
    def get(self, request):
        try:
            # Ensure the user is authenticated
            if request.user.is_authenticated:
                # Fetch the authenticated user's profile data
                user_data = CustomUser.objects.get(id=request.user.id)  # Fetch user data from CustomUser model
                serializer = CustomUserSerializer(user_data)  # Serialize using CustomUserSerializer
                return Response(serializer.data)
            return Response({"error": "Authentication required"}, status=status.HTTP_401_UNAUTHORIZED)
        except CustomUser.DoesNotExist:
            # If user data doesn't exist in the database
            return Response({"error": "User profile not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            # Catch any other exceptions and return a generic error
            return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
