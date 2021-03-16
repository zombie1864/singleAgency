from flask import Flask, json 
app = Flask(__name__)

@app.route('/')
def index():
    data = json.loads(open('fixture.json').read())
    return data

if __name__ == "__main__":
    app.run(debug=True)