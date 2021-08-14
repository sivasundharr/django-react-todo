from django.urls import path

from .views import TodoListApiView,TodoDetailApiView,UserListApiView,UserDetailApiView

urlpatterns = [
    path('users/',UserListApiView.as_view()),
    path('users/<int:pk>/',UserDetailApiView.as_view()),
    path('',TodoListApiView.as_view()),
    path('<int:pk>/',TodoDetailApiView.as_view()),
]
