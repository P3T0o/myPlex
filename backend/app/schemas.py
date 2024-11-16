from pydantic import BaseModel

# Ce fichier contient la définition des schemas Pydantic pour valider les données d'entrée et de sortie

# Entrée de la requête
class UserCreate(BaseModel):
    name: str
    email: str

# Définir la réponse de la requête, prend les variables de BaseModel par defaut.
# Actuellement prend les variables de UserCreate
class UserResponse(UserCreate):
    id: int

    class Config:
        orm_mode = True
