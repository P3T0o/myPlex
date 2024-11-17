from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import declarative_base

# Ce fichier contient la définition de la table dans la base de données

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String, index=True)