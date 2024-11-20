import requests # type: ignore
import json
import os
from dotenv import load_dotenv # type: ignore

load_dotenv()

apiKey = os.getenv('apiKey')

if __name__ == "__main__":
  teams = {}

  userUrl = f"https://osu.ppy.sh/api/get_user?k={apiKey}&u="

  with open(f'../teams/teams.txt', 'r') as file:
    data = [line.strip() for line in file]

  for index, line in enumerate(data):
    try:
      data[index] = int(line)
    except:
      continue

  teamName = None
  i = 1
  temp = {}
  for item in data:
    if type(item) == str:
      if teamName and temp:
        teams[teamName] = temp
      teamName = item  
      temp = {}
      i = 1
    else:
      getUser = requests.get(userUrl + str(item)).json()
      rank = getUser[0]['pp_rank']
      username = getUser[0]["username"]
      temp[f"player{i}"] = [username, int(rank), int(item)]
      i += 1

  if teamName and temp:
    teams[teamName] = temp

  with open(f'../teams/teams.json', 'w') as file:
    json.dump(teams, file, indent=4)