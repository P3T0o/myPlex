# Set version for latest LTS version of Node.js
FROM node:22.11.0

WORKDIR /backend

COPY package*.json ./

RUN npm install -g npm@latest && npm install

COPY . .

# Important : This is required for hot reloading to work in Docker on Windows
ENV CHOKIDAR_USEPOLLING=true

EXPOSE 3333

# Delete database, Run migrations, Run seed data, and start the app
CMD npm run db:fresh && \
npm run dev
