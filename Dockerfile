FROM node:16.13.1


WORKDIR /usr/app

COPY package.json ./

RUN npm install 

COPY . . 

EXPOSE 3333 

CMD ["npm", "run", "dev"]der --chown=node:node /home/node/dist/ ./dist/

CMD ["node", "dist/server.js"]
