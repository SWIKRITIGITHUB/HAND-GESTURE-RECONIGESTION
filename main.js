noseX=0;
noseY=0;
rightWristX=0;
leftWristX=0;
difference = 0;

function setup()
{
    video=createCapture(VIDEO);
    video.size(500,500);

    canvas=createCanvas(650,500);
    canvas.position(560,100);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
   console.log("model is loaded");
}

function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("noseX=" + noseX+"noseY=" + noseY);

        rightWristX = results[0].pose.rightWrist.x;
        leftWristX = results[0].pose.leftWrist.x;
        difference = floor(leftWristX - rightWristX);
        console.log("rightWristX=" + rightWristX+"leftWristX=" + leftWristX + "difference=" +difference);

    }
}



function draw() {
    background('#eaa4f5');
    document.getElementById("square_side").innerHTML = "Width And Height of a Square will be = " + difference +"px";
    fill('#0a450d');
    stroke('#0a450d');
    square(noseX, noseY, difference);
}
