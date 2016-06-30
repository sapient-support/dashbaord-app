FROM alpine:3.4

# Bundle app source
COPY . /src

# Update
RUN apk update \
	&& apk add nodejs \
	&& cd /src \
	&& npm install \
	&& sed -i 's|//httpStatic:|httpStatic:|' node_modules/node-red/settings.js \
	&& sed -i 's|/home/nol/node-red-static/|webcontent|' node_modules/node-red/settings.js \
	&& sed -i 's|//adminAuth: {|adminAuth: {|' node_modules/node-red/settings.js  \
    && sed -i 's|//    type: "credentials",|    type: "credentials",|' node_modules/node-red/settings.js \
    && sed -i 's|//    users: \[{|    users: \[{ |' node_modules/node-red/settings.js \
    && sed -i 's|//        username: "admin",|        username: "admin",|' node_modules/node-red/settings.js \
    && sed -i 's|//        password: "$2a$08$zZWtXTja0fB1pzD4sHCMyOCMYz2Z6dNbM6tl8sJogENOMcxWV9DN.",|        password: "$2a$08$UUa5LNI5EiFX.z8w51VzHOAtS3Haa7tIUP2tb4Hl0jC2tUVXUIa/6",|' node_modules/node-red/settings.js  \
    && sed -i 's|//        permissions: "*"|        permissions: "*"|' node_modules/node-red/settings.js  \
    && sed -i 's|//    }]|    }]|' node_modules/node-red/settings.js  \
    && sed -i 's|//},|},|' node_modules/node-red/settings.js
	
# Install app dependencies
RUN cd /src; npm install

EXPOSE 80
CMD [ "npm", "start" ]
