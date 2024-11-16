import requests # type: ignore
import json
import os
from dotenv import load_dotenv # type: ignore

load_dotenv()

apiKey = os.getenv('apiKey')

MODS = {
  "nm": 0,
  "hd": 0,
  "hr": 16,
  "dt": 64,
  "fm": 0,
  "tb": 0
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

def getBeatmapData(beatmapID, mod):
  mod = MODS[mod[0:2]]
  beatmapLink = f"https://osu.ppy.sh/api/get_beatmaps?k={apiKey}&b={beatmapID}&mods={mod}"
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
  coverImageLink = f"https://assets.ppy.sh/beatmaps/{setID}/covers/cover.jpg"
  coverThumbnailLink = f"https://b.ppy.sh/thumb/{setID}l.jpg"



  cs = float(beatmap["diff_size"])
  od = float(beatmap["diff_overall"])
  ar = float(beatmap["diff_approach"])

  if mod == 16:
    cs = min(float(cs) * 1.3, 10)
    ar = min(float(ar) * 1.4, 10)
    od = min(float(od) * 1.4, 10)

  if mod == 64:
    bpm *= 1.5
    length = round(length * (2 / 3))
    ar = getAr(ar)
    od = getOd(od)

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
  beatmapData["star_rating"] = f"{round(sr, 2)}"
  beatmapData["bpm"] = f"{bpm}"
  beatmapData["length"] = f"{length}"
  beatmapData["cs"] = f"{round(cs, 1)}"
  beatmapData["ar"] = f"{round(ar, 1)}"
  beatmapData["od"] = f"{round(od, 1)}"
  beatmapData["image"] = f"{coverImageLink}"
  beatmapData["thumbnail"] = f"{coverThumbnailLink}"

  return beatmapData

if __name__ == "__main__":
  name = input("Enter mappool name: ")
  mapIDs = []

  with open(f'../rawBeatmapIDs/{name}.txt', 'r') as file:
    mapIDs = [line.strip() for line in file]

  with open(f'../other/{name}.json', 'r') as file:
    mods = json.load(file)

  mappool = {}

  for i, id in enumerate(mapIDs):
    mapData = getBeatmapData(id, mods[i])

    if mods[i] == "tb1":
      mappool[f"tb"] = mapData
    else:
      mappool[f"{mods[i]}"] = mapData

  with open(f"../mappools/{name}.json", "w") as outfile:
    json.dump(mappool, outfile, indent=4)

