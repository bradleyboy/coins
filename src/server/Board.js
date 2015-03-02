let randomBetween = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
};

const WALL_BLOCKS = 30;
const MAX_COINS = 10;

export default class Board {
    constructor() {
        this.occupied = new Map();
        this.players = new Map();
        this.coins = new Map();

        this.walls = [];
        this.wallsOccupied = [];

        this.listeners = [];

        this.buildWalls();
    }

    buildWalls() {
        for (let i = 0; i < WALL_BLOCKS; i++) {
            let [x, y] = this.getOpenPosition();

            this.walls.push({x, y});
            this.wallsOccupied.push([`${x},${y}`, 'wall']);
        }
    }

    listen(cb) {
        this.listeners.push(cb);
    }

    addCoin() {
        if (!this.players.size || this.coins.size >= MAX_COINS) return;

        let [x, y] = this.getOpenPosition();
        this.coins.set(`${x},${y}`, 1);
        this.emit();
    }

    emit() {
        this.listeners.forEach(cb => cb.call(this));

        let occupied = [];

        this.players.forEach((player, ident) =>  {
            occupied.push(
                [`${player.position.x},${player.position.y}`, 'player']
            );
        });

        this.coins.forEach((coin, key) => {
            occupied.push(
                [key, 'coin']
            );
        });

        occupied = occupied.concat(this.wallsOccupied);

        this.occupied = new Map(occupied);
    }

    getOpenPosition() {
        let pos = this.getRandomPosition();

        while(this.isOccupiedPosition(pos[0], pos[1])) {
            pos = this.getRandomPosition();
        }

        return pos;
    }

    isOccupiedPosition(x, y) {
        return this.occupied.has(`${x},${y}`);
    }

    isACoin(x, y) {
        return this.occupied.has(`${x},${y}`) && this.occupied.get(`${x},${y}`) === 'coin';
    }

    getRandomPosition() {
        return [
            randomBetween(1, 10),
            randomBetween(1, 10)
        ];
    }

    addPlayer(player) {
        let [x, y] = this.getOpenPosition();

        player.x = x;
        player.y = y;

        this.players.set(player.name, player);
        this.emit();
    }

    removePlayer(ident) {
        this.players.delete(ident);
        this.emit();
    }

    get playersArray() {
        let players = [];

        this.players.forEach((player, ident) =>  {
            players.push({
                ident,
                position: player.position,
                score: player.score,
            })
        });

        return players;
    }

    get wallsArray() {
        return this.walls;
    }

    get coinsArray() {
        let coins = [];

        this.coins.forEach((value, key) =>  {
            let [x, y] = key.split(',');

            coins.push({
                x, y
            });
        });

        return coins;
    }

    movePlayer(ident, direction) {
        let player = this.players.get(ident);
        let x = player.position.x;
        let y = player.position.y;

        switch(direction) {
            case 'up':
                y--;
                break;

            case 'down':
                y++;
                break;

            case 'left':
                x--;
                break;

            case 'right':
                x++;
                break;
        }

        x = Math.min(10, Math.max(1, x));
        y = Math.min(10, Math.max(1, y));

        let coin = this.isACoin(x, y);

        if (coin || !this.isOccupiedPosition(x, y)) {
            player.x = x;
            player.y = y;

            if (coin) {
                player.score++;
                this.coins.delete(`${x},${y}`);
            }

            this.players.set(ident, player);

            this.emit();
        }
    }
}
