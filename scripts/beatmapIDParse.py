import requests # type: ignore
import json
import os
from dotenv import load_dotenv # type: ignore

load_dotenv()

apiKey = os.getenv('apiKey')
token = os.getenv('access_token')

MODS = {
  "hr": 16,
  "dt": 64
}

def getAr(ar):
  if ar > 5:
    ms = 200 + (11 - ar) * 100
  else:
    ms = 800 + (5 - ar) * 80
  
  if ms < 300:
    new_ar = 11
  elif ms < 1200:
    new_ar = round(11 - (ms - 300) / 150, 2)
  else:
    new_ar = round(5 - (ms - 1200) / 120, 2)

  return round(new_ar, 1)

def getOd(od):
  hitwindow300 = ((79 - (od * 6) + 0.5) * 2 / 3)
  od_num = min(11, (79.5 - hitwindow300) / 6)
  
  return round(od_num, 1)

def getBeatmapData2(beatmapID, mod):
  url = f"https://osu.ppy.sh/api/v2/beatmaps/{beatmapID}/attributes"

  headers = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json",
    "Accept": "application/json"
  }

  data = {
    "mods": MODS[mod[0:2]],
    "ruleset": "osu"
  }

  response = requests.post(url, headers=headers, data=json.dumps(data))

  response_data = response.json()
  data = response_data["attributes"]
  sr = data["star_rating"]
  return sr

def getBeatmapData(beatmapID, mod):
  mods = mod[0:2]
  beatmapLink = f"https://osu.ppy.sh/api/get_beatmaps?k={apiKey}&b={beatmapID}"
  getBeatmap = requests.get(beatmapLink).json()
  beatmapData = {}
  beatmap = getBeatmap[0]
  setID = beatmap["beatmapset_id"]
  artist = beatmap["artist"]
  title = beatmap["title"]
  version = beatmap["version"]
  mapper = beatmap["creator"]
  mapperID = beatmap["creator_id"]
  sr = float(beatmap["difficultyrating"])
  bpm = float(beatmap["bpm"])
  length = float(beatmap["hit_length"])

  cs = float(beatmap["diff_size"])
  od = float(beatmap["diff_overall"])
  ar = float(beatmap["diff_approach"])

  if mods == "hr":
    cs = min(float(cs) * 1.3, 10)
    ar = min(float(ar) * 1.4, 10)
    od = min(float(od) * 1.4, 10)
    sr = getBeatmapData2(beatmapID, mod)

  if mods == "dt":
    bpm *= 1.5
    length = round(length * (2 / 3))
    ar = getAr(ar)
    od = getOd(od)
    sr = getBeatmapData2(beatmapID, mod)

  minutes = int(length) // 60
  seconds = int(length) % 60
  length = f"{minutes}:{seconds:02d}"

  beatmapData["title"] = f"{title}"
  beatmapData["artist"] = f"{artist}"
  beatmapData["version"] = f"{version}"
  beatmapData["mapper"] = f"{mapper}"
  beatmapData["beatmap_link"] = f"https://osu.ppy.sh/beatmapsets/{setID}#osu/{beatmapID}"
  beatmapData["mapper_link"] = f"https://osu.ppy.sh/users/{mapperID}"
  beatmapData["beatmap_id"] = str(beatmapID)
  beatmapData["star_rating"] = f"{round(sr, 1)}"
  beatmapData["bpm"] = f"{bpm}"
  beatmapData["length"] = f"{length}"
  beatmapData["cs"] = f"{round(cs, 1)}"
  beatmapData["ar"] = f"{round(ar, 1)}"
  beatmapData["od"] = f"{round(od, 1)}"

  return beatmapData

if __name__ == "__main__":
  mapIDs = [
    4526303,
    134856,
    3160017,
    3257450,
    2993432,
    4053095,
    3651716,
    2810356,
    1684136,
    609853,
    4630386,
    1526271,
    114384,
    3882782,
    4327325,
    46827,
    4153684
  ]

  mods = {
    "nm": 5,
    "hd": 3,
    "hr": 3,
    "dt": 3,
    "fm": 2,
    "tb": 1
  }

  modList = [f"{key}{i+1}" for key, count in mods.items() for i in range(count)]

  mappool = {}

  for i, id in enumerate(mapIDs):
    mapData = getBeatmapData(id, modList[i])

    if modList[i] == "tb1":
      mappool[f"tb"] = mapData
    else:
      mappool[f"{modList[i]}"] = mapData

  name = input("Enter mappool name:")

  with open(f"{name}.json", "w") as outfile:
    json.dump(mappool, outfile, indent=4)

