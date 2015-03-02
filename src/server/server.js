require("babel/polyfill");

import { Server } from 'ws';
import Board from './Board';
import Player from './Player';

const wss = new Server({port: 8181});
const board = new Board();

board.listen(() => {
    let data = {
        players: board.playersArray,
        coins: board.coinsArray,
        walls: board.wallsArray,
    };

    wss.clients.forEach((client) => client.send(JSON.stringify(data)));
});

wss.on('connection', (ws) => {
    let next = board.players.size + 1;
    let ident = `player-${next}`;

    ws.on('message', (data) => {
        data = JSON.parse(data);
        board.movePlayer(ident, data.direction);
    });

    ws.on('close', () => {
        board.removePlayer(ident);
    });

    ws.send(JSON.stringify({ident}));

    board.addPlayer(new Player(ident));
});

setInterval(() => board.addCoin(), 2000);
