import requests # type: ignore
import json
import os
from dotenv import load_dotenv # type: ignore

load_dotenv()

apiKey = os.getenv('apiKey')

def getBeatmapData(beatmapID):
  beatmapLink = f"https://osu.ppy.sh/api/get_beatmaps?k={apiKey}&b={beatmapID}&mods=64"
  getBeatmap = requests.get(beatmapLink).json()
  beatmapData = {}
  beatmap = getBeatmap[0]
  setID = beatmap["beatmapset_id"]
  artist = beatmap["artist"]
  title = beatmap["title"]
  version = beatmap["version"]
  mapper = beatmap["creator"]
  mapperID = beatmap["creator_id"]
  sr = beatmap["difficultyrating"]
  bpm = beatmap["bpm"]
  length = beatmap["hit_length"]
  minutes = int(length) // 60
  seconds = int(length) % 60
  length = f"{minutes}:{seconds:02d}"
  cs = beatmap["diff_size"]
  od = beatmap["diff_overall"]
  ar = beatmap["diff_approach"]


  beatmapData["title"] = f"{title}"
  beatmapData["artist"] = f"{artist}"
  beatmapData["version"] = f"{version}"
  beatmapData["mapper"] = f"{mapper}"
  beatmapData["beatmap_link"] = f"https://osu.ppy.sh/beatmapsets/{setID}#osu/{beatmapID}"
  beatmapData["mapper_link"] = f"https://osu.ppy.sh/users/{mapperID}"
  beatmapData["beatmap_id"] = str(beatmapID)
  beatmapData["star_rating"] = f"{sr}"
  beatmapData["bpm_modified"] = f"{float(bpm) * 1.5}"
  beatmapData["length"] = f"{length}"
  beatmapData["cs"] = f"{cs}"
  beatmapData["ar"] = f"{ar}"
  beatmapData["od"] = f"{od}"

  return beatmapData

if __name__ == "__main__":
  mapIDs = [
    3482587,
    4200123,
    3601684,
    3810198,
    4006827,
    2015479,
    43018,
    1284517,
    3798036,
    4436247,
    2138076,
    4240721,
    1977468,
    3094624,
    3824170,
    4653665,
    2387334
  ]

  mappool = {}

  for id in mapIDs:
    mapData = getBeatmapData(id)

    mappool[id] = mapData

  name = input("Enter mappool name:")

  with open(f"{name}.json", "w") as outfile:
    json.dump(mappool, outfile, indent=4)