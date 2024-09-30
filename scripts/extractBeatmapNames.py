import json

name = input("Enter mappool name:")

with open(f"mappools/{name}.json", "r") as outfile:
  data = json.load(outfile)

for map in data:
  print(data[map]["title"])