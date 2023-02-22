import argparse
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

def main():
  parser = argparse.ArgumentParser(description = "Description for my parser")
  parser.add_argument("-s", "--sentences", help = "Path to Text file containing sentences", required = True)
  parser.add_argument("-c", "--credentials", help = "Path to json file containing the credentials", required = True)
  argument = parser.parse_args()

  cred = credentials.Certificate(argument.credentials)
  if not firebase_admin._apps:
      firebase_admin.initialize_app(cred)
  db = firestore.client()  
  count=0
  id=2
  with open(argument.sentences, "r") as f:
    sentences = f.readlines()
    for sentence in sentences:
      db.collection("Sentences").document(str(id)).set({'prompt':sentence})
      count+=1
      id+=1
      print(sentence,count)
if __name__ == "__main__":
  main()




