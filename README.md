# javascript-assetpoolfetcher
How to use @brightsign/assetpool and @brightsign/assetpoolfetcher to download files to your BrightSign player

Created a sample application for FourWinds to demonstrate @brightsign/assetpoolfetcher. See https://docs.brightsign.biz/display/DOC/assetpoolfetcher for documentation.

## Prerequisites:

* Node v10.15.3+ on your laptop.
* A source of files to download. Example: publish an Simple File Networking (SFN) application from BA:connected and use the published folder as the download source.

## To run the attached application:

### Set up your file source, in this example, your SFN folder (see Prerequisites above)

* When you publish your project from BA:connected, specify the url to the folder on your laptop, e.g. http://10.0.0.88:8081
* Host this using a web server, e.g. run http-server (https://www.npmjs.com/package/http-server) on a laptop
* Change the url at the top of fetcher.js from http://10.0.0.88:8081/current-sync.json to point to your web server, that is, http://<your laptop ip address>:<your port>/current-sync.json

### Set up the player

* Clone this project
* Run “npm install”
* Run “npx webpack”
* Copy autorun.brs, node-server.html and bundle.js to your sd card
* Boot your player 
* In the player log, you should see the message “Example app listening on port 9090!”

### Trigger the download

* Now trigger the download by visiting http://<ip address of brightsign player>:9090/fetch-files in a browser
