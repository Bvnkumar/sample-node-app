#get node base image from docker 
FROM node:9-slim
#Creating app directory inside docker
WORKDIR /app
#copying package.json into app folder
COPY package.json /app
#To install node packages in side app folder
RUN npm install 
#copy all the current project to app folder
COPY . /app
#Exposing the project port
EXPOSE 3000
#CMD commonds will excute at the time of launch the creted docker image
CMD ["npm","start"]
#RUN commond will excute at the time of builing an image.
#ENTRYPOINT also  will work same as CMD.