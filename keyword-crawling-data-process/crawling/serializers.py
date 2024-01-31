from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

    def save(self, validated_data):
        post, created = Post.objects.update_or_create(
            post_id=validated_data['post_id'],
            defaults={
            'board_id':validated_data['board_id'],
            'title': validated_data['title'],
            'content': validated_data['content'],
            })
        return post