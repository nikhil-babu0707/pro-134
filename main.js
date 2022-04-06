Status = "";
objects = [];
song = "";

function preload() {
    song = loadSound("hi.mp3");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDectector = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("status").innerHTML = "status : Detecting Objects";
}

function draw() {
    image(video, 0, 0, 380, 380);
    if (Status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDectector.detect(video, gotResults);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Dectected";
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == "person") {
                document.getElementById("number_of_objects").innerHTML = "baby found";
                console.log("stop!!!");
                song.stop();
            } else {
                document.getElementById("number_of_objects").innerHTML = "baby not found";
                console.log("play!!!");
                song.play();
            }
            if (objects.length == 0) {
                document.getElementById("number_of_objects").innerHTML = "baby not found";
                console.log("play!!!");
                song.play();
            }
        }
    }
}

function modelloaded() {
    console.log("I am loaded");
    Status = true;
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}