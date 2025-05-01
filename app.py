from flask import Flask, render_template
import sqlite3
import os

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
    # Listen on all network interfaces and use the port provided by the host
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
