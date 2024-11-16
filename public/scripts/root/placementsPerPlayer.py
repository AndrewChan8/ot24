import json

if __name__ == "__main__":
  name = input("Enter mappool name: ")
  mods = []
  results = {}
  placements = {}
  
  with open(f'../rawScores/{name}.json', 'r') as file:
    rawResults = json.load(file)

  with open(f'../placements/{name}.json', 'r') as file:
    placements = json.load(file)
  
  with open(f'../other/{name}.json', 'r') as file:
    mods = json.load(file)
  
  placementsPerPlayer = {}
  players = [name for name in rawResults.keys() if name != 'beatmaps']

  rankings = list(placements["rankings"].keys())

  resultsList = ["rank", "avg", *mods]

  for player in players:
    temp = {}
    temp["rank"] = rankings.index(player) + 1
    acc = 0
    for map in placements:
      if map == "rankings":
        continue
      rank = placements[map].index(player) + 1
      acc += rank
      temp[map] = rank
    acc /= len(mods)
    temp["avg"] = acc
    
    sorted_res = {key: temp[key] for key in resultsList if key in temp}

    placementsPerPlayer[player] = sorted_res

  print(placementsPerPlayer)

  with open(f'../placementsPerPlayer/{name}.json', 'w') as file:
    json.dump(placementsPerPlayer, file, indent=4)