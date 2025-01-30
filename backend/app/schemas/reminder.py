from datetime import datetime

from pydantic import BaseModel

# Ce fichier contient la définition des schemas Pydantic pour valider les données d'entrée et de sortie

# Entrée de la requête
class ReminderCreate(BaseModel):
    name: str
    description: str
    notified_mail: bool
    date_end: datetime

# Définir la réponse de la requête, prend les variables de BaseModel par defaut.
# Actuellement prend les variables de ReminderCreate
class ReminderResponse(ReminderCreate):
    id: int

    class Config:
        orm_mode = True
