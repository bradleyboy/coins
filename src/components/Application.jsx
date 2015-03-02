import React from 'react';
import WebSocket from 'ws';
import Board from './Board';
import Leaderboard from './Leaderboard';
import Piece from './Piece';
import Coin from './Coin';
import Wall from './Wall';
import key from 'keymaster';

const styles = {
    main: {
        display: 'flex',
    }
};

export default class Application extends React.Component {
    constructor() {
        this.state = {
            ident: null,
            players: [],
            coins: [],
            walls: [],
        }
    }

    componentDidMount() {
        this.socket = new WebSocket('ws://192.168.1.77:8181');

        this.socket.onmessage = (event) => {
            let data = JSON.parse(event.data);
            this.setState(data);
        }

        key('up, down, left, right', (event) => {
            this.socket.send(JSON.stringify({
                ident: this.state.ident,
                direction: event.keyIdentifier.toLowerCase(),
            }));
        });
    }

    render() {
        return <div style={styles.main}>
            <Board>
                {this.state.players.map(player => <Piece
                    color={this.state.ident === player.ident ? 'red' : 'gray'}
                    data={player} />)}

                {this.state.coins.map(coin => <Coin {...coin} />)}

                {this.state.walls.map(wall => <Wall {...wall} />)}
            </Board>

            <Leaderboard currentPlayer={this.state.ident} players={this.state.players.sort((a,b) => a.score > b.score ? -1: 1)} />
        </div>
    }
}
