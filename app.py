from flask import Flask, render_template
import sqlite3

app = Flask(__name__)

def fetch_games():
    conn = sqlite3.connect('game.db')
    cursor = conn.cursor()
    cursor.execute("SELECT Id, Name, Torrent, FromSource FROM game")
    games = cursor.fetchall()
    conn.close()
    return games

@app.route('/')
def index():
    games = fetch_games()
    return render_template('index.html', games=games)

if __name__ == '__main__':
    app.run(debug=True)
