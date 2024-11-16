import json

if __name__ == "__main__":
  name = input("Enter mappool name: ")
  mods = []
  results = {}
  placements = {}
  
  with open(f'../rawScores/{name}.json', 'r') as file:
    results = json.load(file)

  with open(f'../placements/{name}.json', 'r') as file:
    placements = json.load(file)
  
  with open(f'../other/{name}.json', 'r') as file:
    mods = json.load(file)
  

  rankings = list(placements["rankings"].keys())

  percentages = {}
  resultsList = ["rank", "avg", *mods]

  for player in results:
    temp = {}
    temp["rank"] = rankings.index(player) + 1
    acc = 0
    for score in results[player]:
      raw_score = results[player][score]
      mod = score[:2]
      percent = 0
      if mod == "nm":
        percent = raw_score / 1000000
      elif mod == "hd" or mod == "hr":
        percent = raw_score / 1060000
      elif mod == "dt":
        percent = raw_score / 1200000
      
      percent = round((percent * 100), 2)
      acc += percent
      temp[score] = percent
      
    acc /= len(mods)
    temp["avg"] = round(acc, 2)

    sorted_res = {key: temp[key] for key in resultsList if key in temp}

    percentages[player] = sorted_res

  with open(f'../percentages/{name}.json', 'w') as file:
    json.dump(percentages, file, indent=4)