status1 = "";
img = ""
objects = []
var objectDetection;

function preload(){
    img = loadImage("dog_cat.jpg")

}

function setup(){
    canvas = createCanvas(380, 380)
    canvas.center()
    video = createCapture(VIDEO);
    video.size(380, 380)
    video.hide()

}
function start(){
    objectDetection = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "Status: Detecting Objects"
}

function modelLoaded(){
    console.log("Model has been loaded")
    status1 = true;

}
function gotResult(error, results){
    if(error){
        console.error(error)
    }
    else{
        console.log(results)
    }
    objects = results
}
function draw(){
    image(video, 0, 0, 380, 380)
    if(status1 != ""){
    objectDetection.detect(video, gotResult)
    for(var i=0;  i < objects.length; i++){
        
            document.getElementById("number_of_objects").innerHTML = "Objects Detected: " + objects.length;
            var percentage = floor(objects[i].confidence * 100)
            fill("red")
            text(objects[i].label + " " + percentage + "%",objects[i].x-15, objects[i].y-15)
            noFill() 
            stroke("red")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height )
            document.getElementById("status").innerHTML = "Detected Objects"
        }
    }


}