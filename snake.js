class Snake{
    constructor(coords, scaling = 20, body = [coords]){
        this.coords = coords;
        this.tailLength = 0;
        this.body = body;
        this.min = 0;
        this.scaling = scaling;
        this.path = [];
    }

    death(){
        this.tailLength = 0;
        this.coords = [1, 1];
        this.min = 0;
        this.body = [[floor(random(canWidth/scaling)), floor(random(canHeight/scaling))]];
    }

    calcPath(){
        let ghost = new Snake(this.coords, this.scaling, this.body);
        ghost.min = this.min;
        ghost.tailLength = this.tailLength;
        for(let i = 0; i < 10; i++){
            ghost.moveRandom();
            this.path.push(ghost.coords)
        }
        this.path.reverse();
    }

    setMinutes(mins){
        this.tailLength = mins - 1;
    }

    update(min){
        this.min = min;
        if(this.path == undefined || this.path.length == 0) this.calcPath();
        let nextCoords = this.path.pop();
        this.move([nextCoords[0] - this.coords[0], nextCoords[1] - this.coords[1]]);
    }

    addTail(lastTail){
        this.body = this.body.concat([lastTail]);
        this.tailLength++;
    }

    moveRandom(){
        let validDirections = this.getValidCoords();
        this.move(validDirections[floor(random(validDirections.length))]);
    }

    //TODO
    // moveRandom(lazyness){
    //     let validDirections = this.getValidCoords();
    // }

    move(direction){
        switch(direction){
            case DIRECTIONS[0][0]:
            case DIRECTIONS[0][1]:
                this.coords = [this.coords[0], this.coords[1] + 1];
                break;
            case DIRECTIONS[1][0]:
            case DIRECTIONS[1][1]:
                this.coords = [this.coords[0] + 1, this.coords[1]];
                break;
            case DIRECTIONS[2][0]:
            case DIRECTIONS[2][1]:
                this.coords = [this.coords[0], this.coords[1] - 1];
                break;
            case DIRECTIONS[3][0]:
            case DIRECTIONS[3][1]:
                this.coords = [this.coords[0] - 1, this.coords[1]];
                break;
            default:
                this.coords = [this.coords[0] + direction[0], this.coords[1] + direction[1]];
                // console.error("Error: Invalid Direction (" + direction + ")");
                // console.log(DIRECTIONS_ARRAY.includes([direction]));
                break;
        }
        this.updateBody(this.coords)
    }

    updateBody(coords){
        let lastTail = this.body[this.body.length - 1];
        this.body = [coords].concat(this.body.slice(0, this.body.length - 1));
        if(this.body.length <= floor(this.min / minscale)) this.addTail(lastTail);
    }

    getAdjacentCoords(coords){
        let adjacentCoords = [];
        for(let i = 0; i < DIRECTIONS.length; i++){
            if(coords[0] + DIRECTIONS[i][0][0] >= 0 && coords[1] + DIRECTIONS[i][0][1] >= 0
                && coords[0] + DIRECTIONS[i][0][0] <= canWidth / this.scaling - 1
                && coords[1] + DIRECTIONS[i][0][1] <= canHeight / this.scaling - 1){
                adjacentCoords = adjacentCoords.concat([DIRECTIONS[i]]);
            }
        }
        return adjacentCoords;
    }

    getValidCoords(coords = this.coords){
        // console.log(coords);
        let adjacentCoords = this.getAdjacentCoords(coords);
        let valid;
        let validAdjacentCoords = [];
        for(let i in adjacentCoords){
            valid = true;
            for(let j in this.body){
                if(this.body[j][0] == coords[0] + adjacentCoords[i][0][0] && this.body[j][1] == coords[1] + adjacentCoords[i][0][1]){
                    valid = false;
                }
            }
            if (valid) validAdjacentCoords = validAdjacentCoords.concat([adjacentCoords[i][0]]);
        }
        return validAdjacentCoords;
    }

    show() {
        for(let i = 0; i < this.body.length; i++){
            if(i == 0){
                push();
                fill(255, 160, 160);
                rect(this.body[i][0] * this.scaling, header + this.body[i][1] * this.scaling, this.scaling, this.scaling);
                pop();
                textSize(16 * floor(this.scaling / 20));
                textAlign(CENTER, CENTER);
                text(this.min % 10, this.body[i][0] * this.scaling + floor(this.scaling / 2), header + (this.body[i][1] + 1) * this.scaling - floor(this.scaling / 2));
            }
            else rect(this.body[i][0] * this.scaling, header + this.body[i][1] * this.scaling, this.scaling, this.scaling);
        }

        if(!(this.path == undefined || this.path.length == 0)){
            push();
            fill(255, 204, 0);
            rect(this.path[0][0] * this.scaling, header + this.path[0][1] * this.scaling, this.scaling, this.scaling, 20);
            pop();
        }
    }
}
