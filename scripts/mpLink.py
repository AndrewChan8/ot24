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
"Happy End no Intro ga Kikoeru",
"Monosugoi Ikioi de Keine ga Monosugoi Uta",
"God-ish",
"Cybernetics",
"The Real Disappearance of Hatsune Miku",
"Charisma Rengoku Tenshin",
"Chousai Kenbo Sengen",
"Siren",
"Captain Murasa's Ass Anchor",
"Ikanaide",
"Grenade",
"Ditto",
"FREEDMAN",
"Clumsy thoughts",
"Rising Hope (LU-I Remix)"
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

if __name__ == "__main__":
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


  for link in mpLinks:
    beatmaps, results = getMpData(link)

    if not os.path.exists('roundOne.json'):
      with open('roundOne.json', 'w') as file:
        json.dump({}, file)

    with open('roundOne.json', 'r') as file:
      try:
        data = json.load(file)
      except json.JSONDecodeError:
        data = {}
    # Append the new data

  beatmaps = [
"Happy End no Intro ga Kikoeru",
"Monosugoi Ikioi de Keine ga Monosugoi Uta",
"God-ish",
"Cybernetics",
"The Real Disappearance of Hatsune Miku",
"Charisma Rengoku Tenshin",
"Chousai Kenbo Sengen",
"Siren",
"Captain Murasa's Ass Anchor",
"Ikanaide",
"Grenade",
"Ditto",
"FREEDMAN",
"Clumsy thoughts",
"Rising Hope (LU-I Remix)"
]

  data["beatmaps"] = beatmaps

  for result in results:
    data[result] = results[result]
    data[result]['mpLink'] = int(link)

  # Write the updated data back to the file
  with open('roundOne.json', 'w') as file:
    json.dump(data, file, indent=4)