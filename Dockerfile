FROM alpine:3.4

# Bundle app source
COPY package.json /src/
COPY webcontent /src/webcontent

# Update
RUN apk update \
	&& apk add nodejs \
	&& cd /src \
	&& npm install
	
# Install app dependencies
RUN cd /src; npm install

EXPOSE 80
CMD [ "npm start" ]
