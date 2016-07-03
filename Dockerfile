FROM alpine:3.4

# Bundle app source
COPY package.json /src/
COPY webcontent /src/webcontent

# Update
RUN apk update
RUN apk add nodejs
WORKDIR /src
RUN npm install


EXPOSE 80
CMD [ "npm","start" ]
