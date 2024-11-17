from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func

# Ce fichier contient la définition de la table dans la base de données

Base = declarative_base()

class Reminder(Base):
    __tablename__ = "reminders"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    description = Column(String, nullable=False)
    finish = Column(Boolean, default=False)
    notified_mail = Column(Boolean, default=False)
    date_end = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now()) # Ajoute la date par défaut