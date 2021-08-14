from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_auth.serializers import TokenSerializer
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id','second_id','text','completed','createdAt','updatedAt','user')

    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id','username','email',)

class CustomTokenSerializer(TokenSerializer):
    user = UserSerializer(read_only=True)

    class Meta(TokenSerializer.Meta):
        fields = ('key','user')
