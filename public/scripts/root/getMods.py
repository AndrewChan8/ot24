import json

if __name__ == "__main__":
  name = input("Enter mappool name: ")
  nm_count = int(input("Enter nm count: "))
  hd_count = int(input("Enter hd count: "))
  hr_count = int(input("Enter hr count: "))
  dt_count = int(input("Enter dt count: "))
  tb_count = int(input("Enter tb count: "))
  mods = (
    [f"nm{i + 1}" for i in range(nm_count)] +
    [f"hd{i + 1}" for i in range(hd_count)] +
    [f"hr{i + 1}" for i in range(hr_count)] +
    [f"dt{i + 1}" for i in range(dt_count)] +
    [f"tb{i + 1}" for i in range(tb_count)]
  )
  with open(f'../other/{name}.json', 'w') as file:
    json.dump(mods, file)