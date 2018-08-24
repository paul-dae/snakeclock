const DIRECTIONS = [[[0, 1], "up"],
                    [[1, 0], "right"],
                    [[0, -1], "down"],
                    [[-1, 0], "left"]];

const DIRECTIONS_ARRAY = [[0, 1], [1, 0], [0, -1], [-1, 0]];

var scaling;
var s;
var canWidth;
var canHeight;
var mins;
var minscale;
var currSc;
var header;

function setup() {
    canWidth = 600;
    canHeight = 600;
    header = 50;

    minscale = 10;
    currSc = 0;

    mins = 30;
	createCanvas(canWidth, canHeight + header);
    scaling = 20;
    s = new Snake([floor(random(canWidth/scaling - 1)), floor(random(canHeight/scaling) - 1)], scaling);
    //console.log(s.body);
}

function draw() {

    let hr = hour();
    let mn = minute();
    let sc = second();

    background(0);

    push();
    fill('white');
    rect(0, 0, canWidth, header);
    pop();

    push();
    textAlign(LEFT);
    text("Deaths: " + hr, 10 , 16);
    text("Score: " + (mn * 600 + (sc - sc % 10) * 10 + (sc % 10) * 5), floor(canWidth / 2), 16)
    pop();

    if(sc != currSc){
        currSc = sc;
        s.update(mn);
    }
    if(mn == 59 && sc == 59) s.death();
    s.show();
}
