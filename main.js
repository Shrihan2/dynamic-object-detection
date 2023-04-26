img="";
stats=true;
objects=[];
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status:detecting objects";
}
function draw(){
    image(video,0,0,380,380);
    if(stats!=""){
        objectDetector.detect(video,gotResult);
        r=random(255);
        g=random(255);
        b=random(255);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="status:object detected";
            document.getElementById("number_object").innerHTML="number of objects detected are"+objects.length;
            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+""+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function modelLoaded(){
    console.log("model Loaded");
    stats=true;
}
function gotResult(results,error){  
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}