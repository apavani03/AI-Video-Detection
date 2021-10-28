objects = [];
video = "";
status_model = "";
function preload() {
    video = createVideo("NATURE.mp4");
    video.hide();
}

function setup() {
    canvas = createCanvas(450, 450);
    canvas.center();
}

function draw() {
    image(video, 0, 0, 450, 450);
    if (status_model != "") {
        object_Detector.detect(video, gotResults);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects " + objects.length;

            fill("#e6b90b");
            confident = floor(objects[i].confidence * 100);
            text(objects[i].label + " : " + confident + " % ", objects[i].x + 20, objects[i].y + 20);
            noFill();
            stroke("#e4e60b");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}


function button_start() {
    object_Detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Model Loading";

}

function modelLoaded() {
    console.log("Model Loaded!");
    document.getElementById("status").innerHTML = "Status : Model Loaded - Detecting Objects";
    status_model = true;
    video.loop();
    video.speed(1);
    video.volume(0);

}

function gotResults(error, results) {
    if (error) {
        console.error();
    }
    else {
        console.log(results);
        objects = results;
      
    }
}