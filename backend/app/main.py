from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from .models.reminder import Reminder
from .models.user import User, Base
from .schemas.reminder import ReminderResponse, ReminderCreate
from .schemas.user import UserCreate, UserResponse
from .database import engine, get_db

app = FastAPI()

# Création de la base de données
@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

# Endpoint pour créer un utilisateur
@app.post("/users/", response_model=UserResponse)
async def create_user(user: UserCreate, db: AsyncSession = Depends(get_db)):
    new_user = User(name=user.name, email=user.email, password=user.password)
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user

# Endpoint pour récupérer tous les utilisateurs
@app.get("/users/", response_model=list[UserResponse])
async def get_users(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User))
    users = result.scalars().all()
    return users

###### ==============================

# Endpoint pour créer un rappel
@app.post("/reminders/", response_model=ReminderResponse)
async def create_reminder(reminder: ReminderCreate, db: AsyncSession = Depends(get_db)):
    new_reminder = Reminder(name=reminder.name, description=reminder.description, notified_mail=reminder.notified_mail,
                        date_end=reminder.date_end
                        )
    db.add(new_reminder)
    await db.commit()
    await db.refresh(new_reminder)
    return new_reminder

# Endpoint pour récupérer tous les rappeles
@app.get("/reminders/", response_model=list[ReminderResponse])
async def get_reminders(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Reminder))
    reminders = result.scalars().all()
    return reminders
