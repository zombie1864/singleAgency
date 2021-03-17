from flask import Flask, json, jsonify
app = Flask(__name__)

@app.route('/')
def index():
    data = json.loads(open('fixture.json').read()) # sends json file 
    return data

@app.route('/<index>')
def getItem(index):
    with open("fixture.json", "r") as read_file:
        developer = json.load(read_file)
    res = developer["results"][int(index)]
    return jsonify(res)

if __name__ == "__main__":
    app.run(debug=True)