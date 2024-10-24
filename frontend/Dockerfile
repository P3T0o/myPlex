# frontend/Dockerfile

# Utiliser une image officielle Node.js comme environnement de base
FROM node:18

# Définir le répertoire de travail dans le conteneur
WORKDIR /app/app

# Copier package.json et package-lock.json pour installer les dépendances en premier
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier le reste du code de l'application
COPY . .

# Exposer le port sur lequel l'application sera servie
EXPOSE 8080

# Commande pour démarrer l'application Vue.js
CMD ["npm", "run", "serve"]
