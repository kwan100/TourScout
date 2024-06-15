from datetime import date
import uvicorn
import psycopg2
import json

from fastapi import FastAPI
from fastapi_sqlalchemy import DBSessionMiddleware, db

from schema import Artist as SchemaArtist

from schema import Artist

from models import Artist as ModelArtist

from models import Reviews as ModelReviews

import os
from dotenv import load_dotenv

from fastapi.middleware.cors import CORSMiddleware

load_dotenv('.env')


app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000",
    "http://ec2-3-129-52-41.us-east-2.compute.amazonaws.com:3000",
    "ec2-3-129-52-41.us-east-2.compute.amazonaws.com:3000",
    "http://ec2-3-129-52-41.us-east-2.compute.amazonaws.com:",
    "ec2-3-129-52-41.us-east-2.compute.amazonaws.com:"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# to avoid csrftokenError
app.add_middleware(DBSessionMiddleware, db_url='postgresql://postgres:ontour@3.129.52.41/postgres')

@app.get("/")
async def root():
    return {"message": "hello world"}


# @app.post('/book/', response_model=SchemaBook)
# async def book(book: SchemaBook):
#     db_book = ModelBook(title=book.title, rating=book.rating, author_id = book.author_id)
#     db.session.add(db_book)
#     db.session.commit()
#     return db_book

# @app.get('/book/')
# async def book():
#     book = db.session.query(ModelBook).all()
#     return book



    
@app.post('/artist/', response_model=SchemaArtist)
async def author(author:SchemaArtist, fname: str, lname: str):
    db_artist = ModelArtist(fname=artist.name, lname=artist.lname)
    db.session.add(db_artist)
    db.session.commit()
    return db_artist

@app.get('/artist/')
async def author():
    artist = db.session.query(ModelArtist).all()
    return artist

@app.get('/artist/{artist_id}')
async def author(artist_id: int):
    print("HI")
    artist = db.session.query(ModelArtist).filter(ModelArtist.artist_id == artist_id).first()
    return artist

@app.get('/reviews/{artist_id}')
async def reviews(artist_id: int):
    reviews = db.session.query(ModelReviews).filter(ModelReviews.artist_id == artist_id).all()
    return reviews

@app.post('/reviews/')
async def reviews(artist_id: int, event_id: int, rating: float, description: str, fname: str, lname: str, eventname: str, date: str):
    db_review = ModelReviews(artist_id= artist_id, event_id= event_id, rating=rating, description=description, fname=fname, lname=lname, eventname=eventname, date=date)
    db.session.add(db_review)
    db.session.commit()
    return db_review

@app.get('/search_artist/{search_text}')
async def search_artist(search_text: str):
    print(search_text)
    conn = psycopg2.connect(user="postgres", password="ontour", host="ec2-3-129-52-41.us-east-2.compute.amazonaws.com", port="5432", database="postgres")
    cur = conn.cursor()
    print("Database opened successfully")
    print(conn.get_dsn_parameters(), "\n")
    print("SELECT * FROM search_artist_text(" + search_text + ");")
    cur.execute("SELECT * FROM search_artist_text('" + search_text + "');")
    rows = cur.fetchall()
    res_dict = []
    headers = ["artist_id", "fname", "lname", "genre", "alias", "image_url", "images"]
    for row in rows:
        print(row)
        res_row = dict(zip(headers, row))
        res_dict.append(res_row)
    
    #jsonify(rows)
    res = dict(zip(headers, rows[0]))
    # res_json = json.dumps(res, indent = 4) 


    return res_dict


# To run locally
if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)