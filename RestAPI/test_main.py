import requests

BASE = "http://127.0.0.1:5000"

data = [{"likes": 10, "name": "TheOffice", "views": 100000}, {"likes": 4, "name": "BB", "views": 4622553}, {
    "likes": 3, "name": "MrRobot", "views": 3252525}, {"likes": 7, "name": "CSI", "views": 5772523}]

for i in range(len(data)):
    response_put = requests.put(BASE + f"/video/{i}", data[i])
    print("PUT", response_put.json())

# input()

# response_del = requests.delete(BASE + "/video/0")
# print("DEL", response_del)

input()

for i in range(2*len(data)):
    response_get = requests.get(BASE + f"/video/{i}")
    print("GET", response_get.json())
