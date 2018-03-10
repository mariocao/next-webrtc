// server.js
const next = require("next")
const routes = require("./routes")
const app = next({ dev: process.env.NODE_ENV !== "production" })
const handler = routes.getRequestHandler(app)

var ExpressPeerServer = require("peer").ExpressPeerServer

// With express
const express = require("express")

app.prepare().then(() => {
  var expressApp = express()
  var server = require("http").createServer(expressApp)
  expressApp.use(
    "/peerjs",
    ExpressPeerServer(server, {
      debug: true
    })
  )
  expressApp.use(handler)
  server.listen(3000)
})