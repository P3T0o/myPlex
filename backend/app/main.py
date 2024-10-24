# backend/app/main.py

from fastapi import FastAPI
import asyncpg
from sqlalchemy.ext.asyncio import create_async_engine

app = FastAPI()

# Example route
@app.get("/")
async def read_root():
    return {"message": "Welcome to MyPlex API!"}
