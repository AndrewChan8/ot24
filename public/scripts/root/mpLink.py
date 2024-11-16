import requests # type: ignore
import json
import os
from dotenv import load_dotenv # type: ignore

load_dotenv()

apiKey = os.getenv('apiKey')

def getMpData(mpLink):
  matchUrl = f"https://osu.ppy.sh/api/get_match?k={apiKey}&mp={mpLink}"
  userUrl = f"https://osu.ppy.sh/api/get_user?k={apiKey}&u="
  beatmapUrl = f"https://osu.ppy.sh/api/get_beatmaps?k={apiKey}&b="

  getMatch = requests.get(matchUrl).json()
  match = getMatch['games']
  playerIDs = []
  usernames = []
  matchScores = {}
  beatmaps = [
"Sekai ga Katachi Nakushitemo",
"Crystallite Dream",
"Karada wa Shoujiki datte Ittenno",
"RAMSING",
"Apollo 69",
"BREAK LAW",
"Hana ni Natte",
"Hestia",
"Kokoronashi",
"Furin Kagerou"
]

  for eachMap in match:
    getBeatmap = requests.get(beatmapUrl + eachMap['beatmap_id']).json()
    beatmap = getBeatmap[0]['title']
    if beatmap not in beatmaps:
      continue

    for score in eachMap['scores']:
      if score['user_id'] not in playerIDs:
        playerIDs.append(score['user_id'])
        getUsername = requests.get(userUrl + str(score['user_id'])).json()
        usernames.append(getUsername[0]['username'])
        matchScores[getUsername[0]['username']] = {}
      map_score = score["score"]
      currentPlayer = usernames[playerIDs.index(score['user_id'])]
      matchScores[currentPlayer][beatmap] = int(map_score)

  return beatmaps, matchScores

def promptLinks():
  mpLinks = []
  print("Enter multiplayer lobby IDs.")
  print("Note: If you want to enter multiple at a time, seperate the IDs with spaces")
  print("To finish, enter 0 (zero)")
  while True:
    id = input("Enter mp link IDs: ")
    idList = id.split()
    if '0' in idList:
      break
    idList = [int(id) for id in idList]
    if len(idList) > 1:
      mpLinks += idList
    else:
      mpLinks.append(id)
  return mpLinks

if __name__ == "__main__":
  mpLinks = [
116165171,
116087727,
116162129,
116174469,
116164711,
116086530,
116140974,
116183207,
116086530,
116140974,
116165171,
116079414,
116171459,
116096627,
116083928,
116183250,
116164891,
116140974,
116091924,
116164821,
116164937,
116079485,
116084051
  ]

  # mpLinks = promptLinks()

  name = input("Enter mappool name:")
  
  for link in mpLinks:
    beatmaps, results = getMpData(link)

    if not os.path.exists(f'../mpResults/{name}.json'):
      with open(f'../mpResults/{name}.json', 'w') as file:
        json.dump({}, file)

    with open(f'../mpResults/{name}.json', 'r') as file:
      try:
        data = json.load(file)
      except json.JSONDecodeError:
        data = {}
    # Append the new data
    if "beatmaps" not in data:
      data["beatmaps"] = beatmaps

    for result in results:
      if result in data:
        combined = {**data[result], **results[result]}
        data[result] = combined
        
      else:
        data[result] = results[result]

    # Write the updated data back to the file
    with open(f'../mpResults/{name}.json', 'w') as file:
      json.dump(data, file, indent=4)