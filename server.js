// server.js
const next = require("next");
const routes = require("./routes");
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handler = routes.getRequestHandler(app);

// With express
const express = require("express");
// With Express Peer Server
const ExpressPeerServer = require("peer").ExpressPeerServer;

app.prepare().then(() => {
  var expressApp = express();
  var server = require("http").createServer(expressApp);

  // Signalling server
  var expressPeerServer = ExpressPeerServer(server, {
    allow_discovery: true,
    debug: true
  });
  expressApp.use("/peerjs", expressPeerServer);
  var connected = [];
  expressPeerServer.on("connection", function(id) {
    var idx = connected.indexOf(id); // only add id if it's not in the list yet
    if (idx === -1) {
      connected.push(id);
    }
  });
  expressPeerServer.on("disconnect", function(id) {
    var idx = connected.indexOf(id); // only attempt to remove id if it's in the list
    if (idx !== -1) {
      connected.splice(idx, 1);
    }
  });

  expressApp.get("/peerjs/:channel", function(req, res) {
    var channel = req.params.channel;
    return res.json(
      connected.filter(item => {
        var ch = item.split("-");
        return ch.length === 2 && ch[0] === channel;
      })
    );
  });

  console.log("Listening on port 3000!");
  expressApp.use(handler);
  server.listen(3000);
});
