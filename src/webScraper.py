from bs4 import BeautifulSoup
import requests

restaurant = 'grillo-al-barsha'

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36'}
url = 'https://www.zomato.com/dubai/' + restaurant + '/order'

response = requests.get(url, headers=headers)
soup = BeautifulSoup(response.content, 'lxml')
offer = soup.find('section', class_='sc-AUpyg ulsWi')
print(response.text)
