/* jshint node:true */
/* jshint esversion:6 */
'use strict';

const express = require('express');
const app = express();
const AssetPoolClass = require("@brightsign/assetpool");
const AssetPoolFetcherClass = require("@brightsign/assetpoolfetcher");
const fs = require('fs');
const path = require('path');
const httpRequest = require('request');

let syncSpecUrl = "http://10.0.0.88:8081/current-sync.json";

function main() {

  app.get('/fetch-files',
    function(req, res /*, next*/ ) {
      start()
        .then(function() {
          res.send('Asset fetch completed');
        });
    });

  app.listen(9090, function() {
    console.log('Example app listening on port 9090!');
  });
}


function start() {
  return new Promise(function(resolve, /*reject*/ ) {

    console.log(`initializing download`);
    const storage = '/storage/sd/';
    const poolpathname = path.join(storage, "myassets");
    const storagename = path.basename(storage).toUpperCase() + ":/";
    console.log(`storagename '${storagename}'.`);
    if (!fs.existsSync(poolpathname)) {
      fs.mkdirSync(poolpathname);
    }

    const assetpool = new AssetPoolClass(path.join(storagename, path.basename(poolpathname)));
    const assetpoolfetcher = new AssetPoolFetcherClass(assetpool);

    assetpoolfetcher.addEventListener("fileevent", function(data) {
      console.log(`fileCompleteEvent: ${JSON.stringify(data.detail)}`);
    });

    getSyncSpec(syncSpecUrl)
      .then(function(syncSpec) {
        return assetpoolfetcher.start(syncSpec.files.download);
      })
      .then(function() {
        console.log(`Download completed.`);
        resolve();
      })
      .catch(function(err) {
        console.log(`Download failed with '${err}'.`);
        resolve();
      });
  });
}

function getSyncSpec(url) {
  return new Promise(function(resolve, reject) {
    httpRequest({
      url: url
    }, function(error, res, body) {
      if (error) {
        console.log(`http request error: '${error}'.`);
        reject(error);
      } else {
        const result = JSON.parse(body);
        resolve(result);
      }
    });
  });
}

window.main = main;

