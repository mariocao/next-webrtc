const EventEmitter = require("eventemitter3");
require("isomorphic-fetch");

import { isClient } from "./utils";

var Peer;
if (isClient) {
  Peer = require("peerjs");
}
export const events = new EventEmitter();
let peer;
let connections = [];

export default class RTC {
  static async initChannel(roomID) {
    if (isClient) {
      peer = await RTC.getID(roomID);
      peer.on("error", this.onError);
      peer.on("close", this.onClose);
      peer.on("disconnected", this.onDisconnected);
      peer.on("connection", this.onConnection);
      console.log("[RTC] My ID is " + peer.id);
      return peer;
    }
  }

  static getEvents() {
    if (isClient) {
      return events;
    }
  }

  static getID = async roomID => {
    // Need to rewrite with loops
    return new Promise(function(resolve, reject) {
      var peerNumber = 0;
      var tryCreateId = () => {
        var tryId = `${roomID}-${peerNumber}`;
        var peer = new Peer(tryId, signalingServer);
        var errorFn = e => {
          if (e.type === "unavailable-id") {
            peer.destroy();
            peerNumber++;
            tryCreateId();
          }
        };
        var openFn = () => {
          peer.off("open", openFn);
          peer.off("error", errorFn);
          resolve(peer);
        };
        peer.on("error", errorFn);
        peer.on("open", openFn);
      };
      tryCreateId();
    });
  };

  static connectToPeers(roomID) {
    fetch(`/peerjs/${roomID}`)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(channelPeers) {
        channelPeers.forEach(tryId => {
          if (tryId !== peer.id && typeof connections[tryId] === "undefined") {
            console.log("Trying to connect to", tryId);
            var conn = peer.connect(tryId, {
              reliable: true
            });
            RTC.onConnection(conn);
          }
        });
      });
  }

  static broadcastMessage(message) {
    for (var k in connections) {
      var conn = connections[k];
      conn.send(JSON.stringify(message));
      message.channel = conn.peer.slice(0, -2);
      //saveData(message);
    }
  }

  static onConnection(conn) {
    conn.on("open", () => {
      if (!connections[conn.peer]) {
        connections[conn.peer] = conn;
        console.log(`[RTC] connected to ${conn.peer}`);
        events.emit("peerJoined", {
          connection: conn
        });
      } else {
        connections[conn.peer] = conn;
        console.log(`[RTC] re-connected to ${conn.peer}`);
      }
    });
    conn.on("close", () => {
      if (connections[conn.peer]) {
        delete connections[conn.peer];
        events.emit("peerLeft", {
          connection: conn
        });
      }
    });
    conn.on("data", data => {
      if (JSON.parse(data).return) {
        events.emit("return", {
          connection: conn,
          data: JSON.parse(data)
        });
      } else {
        events.emit("message", {
          connection: conn,
          data: JSON.parse(data)
        });
      }
    });
  }

  static onDisconnected() {
    console.log("[RTC] Peer disconnected");
    peer.reconnect();
  }

  static onOpen(connection) {
    console.log("[RTC] Open connection", connection);
  }

  static onClose() {
    console.log("[RTC] Close connection", connection);
  }

  static onError(error) {
    if (error.type !== "peer-unavailable") {
      console.error(`WebRTC Error (${error.type}):`, error);
    }
  }
}

// const saveData = data => {
//   delete data.digests;
//   delete data.multisig;
//   delete data.signatures;
//   delete data.bundles;
//   delete data.settlementAddress;
//   delete data.result;
//   delete data.flash;

//   fetch(`https://flashdata-edf3d.firebaseio.com/events.json`, {
//     method: "POST",
//     body: JSON.stringify(data)
//   });
// };

const signalingServer = {
  host: process.env.NODE_ENV === "production" ? "my.domain" : "localhost",
  port: process.env.NODE_ENV === "production" ? 443 : 3000,
  path: "/peerjs"
};
Object.freeze(signalingServer);
