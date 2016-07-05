# Dashboard App using Node RED
Dashboard app using node red as service engine and webasset to be used with NGINX

##Setup Steps

#### Install Node JS (recomended version 4+) https://nodejs.org/en/
#### Setup Node-Red
* Take checkout
* Set GIT url config for windows `git config --global url."git@github.com:".insteadOf "git://github.com/"`
* Execute install
    * `npm install`
    * This should install node-red and required packages
    * Open `settings.js` file at path node `node_modules\node-red`
    * Find `httpStatic` and uncomment the line
    * Put the value for `httpStatic` as `webcontent`
         * httpStatic: 'webcontent',    
* To start node-red execute `npm start`
* Open the application at http://localhost

###### Import sample flow
* After opening node-red application goto Top right corner and click on three lines
* Click import --> Clipboard 
* A popup with `Import nodes` will open.
* Open and copy the content of sample_flow.json in sample folder and paste in the popup.
* Deploy the flow using deploy button
* Now open http://localhost/dashboard/test


#### Working with Node Red
* All the flows will be created on http://localhost
* Commiting Flows
      * Once the flow is created on local. Select all the nodes and goto Top right corner and click on three lines
      * Click export --> Clipboard 
      * A popup with `Export nodes to clipboard` will open.
      * Copy the content and save it as Json file inside `flow_templates` folder.
* Commiting static assets
      * All static assets to be saved in `webcontent` folder.
      * In the application the path to this folder is root and a file inside assets can be refered as `/assets/sample.html`
