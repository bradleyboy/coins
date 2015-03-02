export default class Player {
    constructor(name, position = {x: 5, y: 5}) {
        this.name = name;
        this.position = position;
        this.score = 0;
    }

    set x(x) {
        this.position.x = x;
    }

    set y(y) {
        this.position.y = y;
    }
}
