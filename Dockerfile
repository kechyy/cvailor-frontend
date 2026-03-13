FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]



# FROM node:20 → use Node 20 image as base

# WORKDIR /app → inside the container, work from /app

# COPY package.json... → copy dependency files first

# RUN npm install → install packages

# COPY . . → copy the rest of the frontend code

# EXPOSE 3000 → frontend listens on port 3000

# CMD ["npm", "run", "dev"] → start Next.js dev server