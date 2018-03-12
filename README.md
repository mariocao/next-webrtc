# Chat application using Next.js and WebRTC

This project is a Proof-of-Concept for a chat room application.
The main goal is to create an application that can easily be extended for more complex uses.

The application has been implemented by using Next.js, React, styled-components and WebRTC (by using Peer.js).

The app also contains a simple signalling server for allowing channel peer discovery.

## Execution instructions

```
npm install
npm run dev
```

Browse to http://localhost:3000 and ENJOY! ;-)

## Endpoints

The application has the following endpoints:
* (base URL): intro screen (to be completed)
* /channel/:channelName: joining (or creating) a channel
* /peerjs/:channelName: list all peers in the requested channel

## To-Dos

- [ ] Refactor the channel page (extract React components)
- [ ] Change peer names within the chanel
- [ ] ...