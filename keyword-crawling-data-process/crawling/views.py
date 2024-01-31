from rest_framework.views import APIView
from rest_framework.response import Response
from selenium import webdriver
import environ

from .serializers import PostSerializer
from .utils.enum import BoardId
from .utils.crawl_everytime import crawl_board, login_everytime

from . import models

env = environ.Env()
EVERYTIME_ID = env('EVERYTIME_ID')
EVERYTIME_PW = env('EVERYTIME_PW')

class CrawlView(APIView):
    def get(self, request):
        result = []
        print("Chrome driver initializing")
        webdriver_options = webdriver.ChromeOptions()
        # webdriver_options.add_argument('--headless')
        # webdriver_options.add_argument('--no-sandbox')
        # webdriver_options.add_argument('--disable-dev-shm-usage')
        # webdriver_options.add_argument('user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36')
        driver = webdriver.Chrome(options=webdriver_options)
        driver.implicitly_wait(1)
        print("Login to everytime")
        login_everytime(driver, EVERYTIME_ID, EVERYTIME_PW)
        for board_id in BoardId.list():
            recent_post = models.Post.objects.filter(board_id=board_id).order_by("-order").first()
            recent_post_id = None if recent_post is None else recent_post.post_id
            print(f"Crawling board_id={board_id}")
            result += crawl_board(driver, board_id, start_post_id=recent_post_id)
        serializer = PostSerializer(data=result, many=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data)
