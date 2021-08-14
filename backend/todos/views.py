from rest_framework import generics,permissions
from django.contrib.auth import get_user_model

from .models import Todo
from .permissions import IsAuthorOrReadOnly
from .serializers import TodoSerializer,UserSerializer

class TodoListApiView(generics.ListCreateAPIView):
    serializer_class = TodoSerializer

    def get_queryset(self):
        user = self.request.user
        return Todo.objects.filter(user = user)

class TodoDetailApiView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    #queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    def get_queryset(self):
        user = self.request.user
        return Todo.objects.filter(user = user)


class UserListApiView(generics.ListCreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer


class UserDetailApiView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

