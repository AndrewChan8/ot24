import json

if __name__ == "__main__":
  name = input("Enter mappool name: ")
  mods = []
  results = {}
  
  with open(f'../rawScores/{name}.json', 'r') as file:
    results = json.load(file)
  
  with open(f'../other/{name}.json', 'r') as file:
    mods = json.load(file)
  
  percentages = {}
  for player in results:
    temp = {}
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
      temp[score] = percent
    percentages[player] = temp

  with open(f'../percentages/{name}.json', 'w') as file:
    json.dump(percentages, file, indent=4)