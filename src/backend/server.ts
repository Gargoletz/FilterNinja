/**
 * SERVER
 */

//Internal server starter
const { dialog } = require("electron");
const http = require("http");
const qs = require("querystring");
const fs = require("fs");
const request = require("request");

const LEAGUE = "Delirium";
let links = [
  "Fragment",
  "Scarab",
  "Fossil",
  "Resonator",
  "Essence",
  "DivinationCard",
  "Prophecy",
  "UniqueMap",
  /*"Map",*/ "UniqueJewel",
  "UniqueFlask",
  "UniqueWeapon",
  "UniqueArmour",
  "UniqueAccessory",
];
let whatever = {};

var server = http.createServer(function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
  res.setHeader("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  switch (req.method) {
    case "POST":
      serverResponse(req, res);
      break;
  }
});

function serverResponse(req, res) {
  var allData = "";

  req.on("data", function (data) {
    allData += data;
  });

  req.on("end", function (data) {
    var finish = JSON.parse(allData);
    switch (finish.action) {
      case "get":
        if (LOADED) {
          res.end(JSON.stringify(whatever));
          break;
        } else {
          RES = res;
          return;
        }
      case "save":
        fs.writeFile("output.filter", finish.data, (err) => {
          if (err) res.end(JSON.stringify({ data: "error!" }));
          res.end(JSON.stringify({ data: "file saved!" }));
        });

        // dialog.showSaveDialog({
        // filters: [{
        //     name: 'Path of Exile filter',
        //     extensions: ['filter']
        // }]
        // }).then(result => {
        //     if (result.filePath) {
        //         fs.writeFile(result.filePath, finish.data, (err) => {
        //             if (err) {
        //                 console.log("An error occured: " + err);
        //                 return;
        //             }

        //             console.log("File created!");
        //             res.end(JSON.stringify({ data: "success" }));
        //         });
        //     }
        // }).catch(err => { console.log(err) });
        break;
      case "load":
        dialog
          .showOpenDialog({
            filters: [
              {
                name: "Path of Exile filter",
                extensions: ["filter"],
              },
            ],
          })
          .then((result) => {
            fs.readFile(
              result.filePaths[0],
              { encoding: "utf-8" },
              (err, data) => {
                if (err) res.end(JSON.stringify({ data: "error!" }));

                res.end(JSON.stringify({ data }));
              }
            );
            // res.end(JSON.stringify({ data: "success" }));
          });
        break;
      default:
        res.end(JSON.stringify({ data: "failure ale z serwera" }));
        break;
    }
  });
}
let LOADED = false;
let RES;
let COUNTER = 0;
server.listen(3001, function () {
  console.log("serwer startuje na porcie 3001 does this work?");

  // for (let i = 0; i < links.length; i++) {
  //     request(`https://poe.ninja/api/data/${(links[i] == "Fragment") ? "currency" : "item"}overview?league=${LEAGUE}&type=${links[i]}`, function (error, response, body) {
  //         let _data = [];
  //         try {
  //             let _body = JSON.parse(body);
  //             for (let j = 0; j < _body.lines.length; j++) {
  //                 let _name = (links[i] == "Fragment") ? _body.lines[i].currencyTypeName : _body.lines[j].name;
  //                 let _value = (links[i] == "Fragment") ? _body.lines[j].chaosEquivalent : _body.lines[j].chaosValue
  //                 if (_value >= 1) {
  //                     if (_body.lines[j].links == undefined || _body.lines[j].links <= 4) {
  //                         _data.push({ name: _name, value: _value, info: _body.lines[j].explicitModifiers });
  //                     }
  //                 }
  //             }
  //             whatever[links[i]] = _data;
  //             console.log(`https://poe.ninja/api/data/itemoverview?league=${LEAGUE}&type=${links[i]}`);
  //             COUNTER++;
  //             if (COUNTER >= 13)
  //                 RES.end(JSON.stringify(whatever));
  //         } catch (e) {

  //         }
  //     });
  //     // LOADED = true;
  //     // if (RES)
  //     // RES.end(JSON.stringify(whatever));
  // }
});
