from flask import Flask, render_template, request
import sqlite3
import os

app = Flask(__name__)


def fetch_games(db_name):
    conn = sqlite3.connect(f'{db_name}.db')
    cursor = conn.cursor()
    
    if db_name == 'pc':
     cursor.execute("SELECT Id, Name, Torrent, FromSource FROM game")
    games = cursor.fetchall()

    if db_name == 'android':
        cursor.execute("SELECT Id, Name, link FROM Games")
        games = cursor.fetchall()

    if db_name == 'programs':
        cursor.execute("SELECT id, name, link FROM programs")
        games = cursor.fetchall()
    
    conn.close()
    return games

@app.route('/')
def index():
    db_name = request.args.get('db', 'pc')
    if db_name not in ['pc', 'android', 'programs']:
        db_name = 'pc'
    games = fetch_games(db_name)
    return render_template('index.html', games=games, current_db=db_name)

if __name__ == '__main__':
    # Listen on all network interfaces and use the port provided by the host
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)