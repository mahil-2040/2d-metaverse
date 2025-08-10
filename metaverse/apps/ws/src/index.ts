import { WebSocketServer } from 'ws';
import { User } from './User';
import dotenv from "dotenv";

import path from "path";
dotenv.config({path: path.join(__dirname,"../../.env")});

const wss = new WebSocketServer({ port: 3001 });
wss.on('connection', function connection(ws) {
  // console.log("user connected")
  let user = new User(ws);
  ws.on('error', console.error);

  ws.on('close', () => {
    user?.destroy();
  });
});