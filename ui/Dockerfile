FROM node:20-alpine 

WORKDIR /app

COPY package.json package-lock.json* ./ 
RUN npm ci 

COPY public ./public
COPY src ./src

EXPOSE 3000 
EXPOSE 5173

CMD ["npm", "run", "dev"]
