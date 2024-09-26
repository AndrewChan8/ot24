import json
import os

with open('qualifiers.json', 'r') as file:
  data = json.load(file)

for map in data:
  print(map)
  print(data[map]["star_rating"], data[map]["bpm"], data[map]["length"], data[map]["cs"], data[map]["ar"], data[map]["od"])
  print()