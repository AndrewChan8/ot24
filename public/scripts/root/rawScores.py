import json

if __name__ == "__main__":
  name = input("Enter mappool name: ")
  mods = []
  results = {}
  
  with open(f'../mpResults/{name}.json', 'r') as file:
    results = json.load(file)
  
  with open(f'../other/{name}.json', 'r') as file:
    mods = json.load(file)
  
  raw_scores = {}
  players = [name for name in results.keys() if name != 'beatmaps']
  for result in results:
    if result == 'beatmaps':
      continue
    temp = {}
    for index, score in enumerate(results[result]):
      playerScore = results[result][score]
      temp[mods[index]] = playerScore
    raw_scores[result] = temp

  with open(f'../rawScores/{name}.json', 'w') as file:
    json.dump(raw_scores, file, indent=4)