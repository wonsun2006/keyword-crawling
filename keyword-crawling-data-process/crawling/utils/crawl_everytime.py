from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from datetime import datetime, timedelta

def login_everytime(driver: webdriver.Chrome, id, pw):
    """
    에브리타임에 로그인하는 함수.
    
    Parameters:
        - driver: Selenium webdriver
        - id: 에브리타임 아이디
        - pw: 에브리타임 비밀번호
    """
    driver.get("https://account.everytime.kr/login")
    driver.find_element(By.NAME, "id").send_keys(id)
    driver.find_element(By.NAME, "password").send_keys(pw)
    driver.find_element(By.XPATH, "/html/body/div[1]/div/form/input").click()
    # 이유를 알 수 없지만, implicit wait을 사용하면 로그인 창으로 돌아감
    # => time.sleep()을 사용하면 로그인이 됨
    # driver.implicitly_wait(1)
    time.sleep(1)


def crawl_board(driver: webdriver.Chrome, board_id, start_post_id=None, end_post_id=None):
    """
    에브리타임 게시판을 크롤링하는 함수.
    start_post_id에 해당하는 게시글부터 end_post_id에 해당하는 게시글까지 크롤링.

    Parameters:
        - driver: Selenium webdriver
        - board_id: 게시판 id
        - start_post_id: 크롤링 시작할 게시글 id
        - end_post_id: 크롤링 끝낼 게시글 id

    Returns:
        - result(list)
            - board_id: 게시판 id
            - post_id: 게시글 id
            - title: 게시글 제목
            - content: 게시글 내용 + 댓글 내용
    """
    PAGE_LIMIT = 3
    board_url = "https://everytime.kr/{}".format(board_id)
    post_id_list = []
    result = []

    # 페이지 탐색하며 게시글 url 수집
    page_count = 0
    while page_count < PAGE_LIMIT:
        page_count += 1
        if page_count > PAGE_LIMIT:
            raise Exception("Page limit exceeded\npost_id_list: {post_id_list}")
        driver.get(f"{board_url}/p/{page_count}")
        driver.implicitly_wait(1)
        article_list = driver.find_elements(By.CSS_SELECTOR, "article > a.article")
        links = [
            article.get_attribute("href").split("/")[-1] for article in article_list
        ]
        
        if len(article_list) == 0:
            raise Exception("게시글에 접근 권한이 없습니다.")

        # start_post_id가 None이면, 1페이지만 크롤링
        if start_post_id is None:
            post_id_list = links
            break

        if start_post_id in links:
            if end_post_id in links:
                post_id_list = links[
                    links.index(end_post_id) : links.index(start_post_id) + 1
                ]
                break
            else:
                post_id_list += links[: links.index(start_post_id) + 1]
                break
        elif end_post_id in links:
            post_id_list = links[links.index(end_post_id) :]
        else:
            post_id_list += links

    # 수집된 url로 게시글 데이터 수집
    for post_id in post_id_list:
        driver.get(f"{board_url}/v/{post_id}")
        driver.implicitly_wait(1)
        title = driver.find_element(By.CSS_SELECTOR, "h2.large").text
        paragraphs = driver.find_elements(By.CSS_SELECTOR, "p.large")
        content = ' '.join([p.text for p in paragraphs])
        result.append({"board_id":board_id, "post_id": post_id, "title": title, "content": content})
    # print(result)
    return result