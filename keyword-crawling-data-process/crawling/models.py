from django.db import models

class Post(models.Model):
    order = models.AutoField(primary_key=True)
    board_id = models.CharField(null=False, max_length=255)
    post_id = models.CharField(null=False, max_length=255)
    title = models.CharField(max_length=255)
    content = models.TextField()