# 2022-03-22
# 八分 API 拿到最新一期, 注意每周四, 六执行.
#

import json
import requests

data=requests.get("https://api.vistopia.com.cn/api/v1/content/article_list?content_id=11&count=1001").json()

upd = data['data']['article_list']
upd.reverse() # NOTE: ( data['data']['article_list']).reverse()
esp = upd[0]


print(esp['title'], ' via: ', esp['share_url'])
print('download_url:-> ', esp['media_key_full_url'])
