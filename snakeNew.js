class Snake{
    constructor(coords = [1, 1], isTail = false, sec = 0, scaling = 20){
        this.coords = coords;
        this.isTail = isTail;
        this.body = [coords];
        this.sec = sec;
        this.scaling = scaling
    }

    setSeconds(sec){
        this.sec = sec;
    }

    setMinutes(mins){
        this.tailLength = mins - 1;
    }

    update(){
        moveRandom();
        sec++;
    }

    moveRandom(){
        let validDirections = this.getValidCoords();
        this.move(validDirections[floor(random(validDirections.length))]);
    }

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
                console.error("Error: Invalid Direction (" + direction + ")");
                return;
        }
        this.updateBody(this.coords)
    }

    //TODO
    updateBody(coords){
        this.body = [coords].concat(this.body.slice(0, this.body.length - 1));
        second++;
    }

    getAdjacentCoords(coords){
        let adjacentCoords = [];
        for(let i = 0; i < DIRECTIONS.length; i++){
            if(coords[0] + DIRECTIONS[i][0][0] >= 0 && coords[1] + DIRECTIONS[i][0][1] >= 0){
                adjacentCoords = adjacentCoords.concat([DIRECTIONS[i]]);
            }
        }
        return adjacentCoords;
    }

    getValidCoords(coords = this.coords){
        // console.log(coords);
        let adjacentCoords = this.getAdjacentCoords(coords);
        let valid;
        //console.log("getValidCoords:\nadjacentCoords: " + adjacentCoords);
        let validAdjacentCoords = [];
        //console.log(this.body);
        for(let i in adjacentCoords){
            valid = true;
            // console.log("adjacentCoords: " + adjacentCoords);
            for(let j in this.body){
                // console.log("valid: " + valid);
                // console.log("adjacentCoords i: " + coords + " " + adjacentCoords[i][0] + " , this.body[j]: " + this.body[j]);
                // console.log(!(this.body[j][0] == coords[0] + adjacentCoords[i][0][0] && this.body[j][1] == coords[1] + adjacentCoords[i][0][1]));
                // console.log(this.body[j].includes(coords[0] + adjacentCoords[i][0][0]) && this.body[j].includes(coords[1] + adjacentCoords[i][0][1]));
                if(this.body[j][0] == coords[0] + adjacentCoords[i][0][0] && this.body[j][1] == coords[1] + adjacentCoords[i][0][1]){
                    valid = false;
                }
            }
            // console.log("valid: " + valid);
            if (valid) validAdjacentCoords = validAdjacentCoords.concat([adjacentCoords[i][0]]);
        }
        //console.log(validAdjacentCoords);
        return validAdjacentCoords;
    }

    show() {
        for(let i in this.body){
            rect(this.body[i][0] * this.scaling, this.body[i][1] * this.scaling, this.scaling, this.scaling);
            if(i == s.tailLength){
                textSize(16);
                textAlign(CENTER, CENTER);
                text(this.sec, this.body[i][0] * this.scaling + floor(this.scaling / 2), (this.body[i][1] + 1) * this.scaling - floor(this.scaling / 2));
            }
        }
    }
}
