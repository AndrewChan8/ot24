import json

if __name__ == "__main__":
  name = input("Enter mappool name: ")
  mods = []
  results = {}
  
  with open(f'../rawScores/{name}.json', 'r') as file:
    results = json.load(file)
  
  with open(f'../other/{name}.json', 'r') as file:
    mods = json.load(file)
  
  placements = {}
  players = [name for name in results.keys() if name != 'beatmaps']

  
  for map in mods:
    mod_placement = []
    for player in results:
      score = results[player][map]
      mod_placement.append((player, score))
    mod_placement.sort(key=lambda x: x[1], reverse=True)
    playersOnly = [place[0] for place in mod_placement]
    placements[map] = playersOnly

  rankings = {}

  for map in placements:
    for index, player in enumerate(placements[map]):
      if player not in rankings:
        rankings[player] = 0
      rankings[player] += index + 1

  sortedRankings = dict(sorted(rankings.items(), key=lambda item: item[1]))

  placements["rankings"] = sortedRankings

  with open(f'../placements/{name}.json', 'w') as file:
    json.dump(placements, file, indent=4)