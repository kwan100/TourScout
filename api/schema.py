# build a schema using pydantic
from pydantic import BaseModel

# class Book(BaseModel):
#     title: str
#     rating: int
#     author_id: int

#     class Config:
#         orm_mode = True

class Artist (BaseModel):
    artist_id: int
    fname: str
    lname: str
    genre: str
    alias: str

    class Config:
        orm_mode = True
        
