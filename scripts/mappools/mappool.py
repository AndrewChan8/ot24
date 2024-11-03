import json
import os

name = input("Enter mappool name:")

with open(f'{name}.json', 'r') as file:
  data = json.load(file)

for map in data:
  print(map)
  print(data[map]["star_rating"], data[map]["bpm"], data[map]["length"], data[map]["cs"], data[map]["ar"], data[map]["od"])
  print()