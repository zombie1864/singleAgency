from flask import Flask, json, jsonify

app = Flask(__name__)

@app.after_request
def add_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] =  "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
    response.headers['Access-Control-Allow-Methods']=  "GET"
    return response

@app.route('/', methods=['GET'])
def index():
    data = json.loads(open('fixture.json').read()) # sends json file 
    return data

@app.route('/<index>', methods=['GET'])
def getItem(index):
    with open("fixture.json", "r") as read_file:
        fixture = json.load(read_file)
    res = fixture["results"][int(index)]
    return jsonify(res)

if __name__ == "__main__":
    app.run(debug=True)