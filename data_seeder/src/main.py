if __name__ == '__main__':
  print("Inside main")
  f = open("/tmp/test.txt", "w")
  f.write("This is a test!")
  f.close()
