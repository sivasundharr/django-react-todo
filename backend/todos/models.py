import uuid
from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)

class TimeStampModel(models.Model):
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Todo(TimeStampModel):
    text = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)
    second_id = models.UUIDField(unique=True,default=uuid.uuid4,editable=False)
    user = models.ForeignKey(User,related_name='user_todos',on_delete=models.CASCADE)

    def __str__(self):
        return self.text
    
