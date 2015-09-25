//####################################################################################################################
//		Paint Application for Circle
//		Pallavi Singh
//####################################################################################################################
//Following tasks has been carried in this application using HTML5 Canvas Element

//1.	It lets the user draw circles on the canvas by dragging mouse.
//2.	IT automatically fills a different color to every different circle.
//3.	A button has been added that clears the canvas.
//4.	Another feature added where user can drag circles using mouse.
//5.	On double click of a circle deletes it.

//	It has been tested on the following browsers:
//			Google Chrome
//			Mozilla Firefox
//			IE
//			Safari

//	Additionally, the size of the canvas has not been kept fixed, and it varies with the resizing of the browser window.
//	
//	1. Draw : Drag mouse anywhere on the canvas to draw circles. (Click on Draw/ Move circle button to switch between the modes)
//	2. Move	Manually : Click and drag the circle you want to move. (Click on Draw/ Move circle button to switch between the modes)
//	3. Delete : Double click on the circle you want to delete.
//	4. Clear : Clicking on the clear button deletes all the drawn circles and clears the canvas.
//	5. Move Randomly : On click of the last button, the drawn circles start moving randomly.
//						It is a toggle button. Clicking it again will stop the movement.
//
//Global variable declaration
								
	var bgColor;
	var canvas;
	var canvasImage;	
	var circleCount;
	var circles;
	var color;
	var context;
	var draggingDraw;
	var draggingMove;
	var dragX;
	var dragY;
	var dragIndexDelete;
	var dragIndexMove;
	var dragStartLocation;
	var mouseX;
	var mouseY;
	var radius;
	var targetX;
	var targetY;
	var tempX;
	var tempY;
	var dx;
	var dy;
	var flagRandom= false;

window.addEventListener('load', init, false);


//initialize global variables	(called on: load of window)	
function init() 
	{
		canvas = document.getElementById("canvas");
		context = canvas.getContext('2d');
		context.lineWidth = 4;
		context.lineCap = 'round';
	
		circleCount=0;	
		draggingDraw = false;
		bgColor = "#000000";
		circles = [];
		
		//event listeners to draw circles
		canvas.addEventListener('mousedown', dragStart, false);
		canvas.addEventListener('mousemove', drag, false);
		canvas.addEventListener('mouseup', dragStop, false);
		
		//event listener to delete circle
		canvas.addEventListener('dblclick', deleteCircle,false);
	}	


//####################################################################################################################
//		Drawing of Circles with random colors	
//####################################################################################################################
	
function dragStart(event) {
    draggingDraw = true;
    dragStartLocation = getCanvasCoordinates(event);
    getImage();
}

function drag(event) {
    var position;
    if (draggingDraw === true) {
        putImage();
        position = getCanvasCoordinates(event);
        drawCircle(position);
    }
}
function dragStop(event) {
    draggingDraw = false;
    putImage();
    var position = getCanvasCoordinates(event);
    drawCircle(position);
		
	color = "rgb(" + Math.floor(Math.random()*200) + "," + Math.floor(Math.random()*200) + "," + Math.floor(Math.random()*200) +")";

	context.fillStyle = color;
	context.fill();
	
	circleCount=circleCount+1;
	tempCircle = {x:tempX, y:tempY, rad:radius, color:color};
	
	circles.push(tempCircle);
	
}
	
function getCanvasCoordinates(event) {

    var x = event.clientX - canvas.getBoundingClientRect().left,
        y = event.clientY - canvas.getBoundingClientRect().top;

    return {x: x, y: y};
}

function getImage() {
    canvasImage = context.getImageData(0, 0, canvas.width, canvas.height);
}

function putImage() {
    context.putImageData(canvasImage, 0, 0);
}

function drawCircle(position) {
	
		tempX=dragStartLocation.x;
		tempY=dragStartLocation.y;
		
		radius = Math.sqrt(Math.pow((tempX - position.x), 2) + Math.pow((tempY - position.y), 2));
		context.beginPath();
		context.arc(tempX, tempY, radius, 0, 2 * Math.PI, false);
		context.closePath();
}



//####################################################################################################################
//		On click of Draw / Move Button
//####################################################################################################################
	
function togglebtn(){

		if(document.getElementById("btnMve").name == "Draw Shape")
			{ 	
		
				canvas.removeEventListener("mousedown", mouseDown, false);
				document.getElementById("btnMve").src = "moveButton.jpg";
				document.getElementById("btnMve").name = "Move Shape";		
				document.getElementById("spid").innerHTML="Click here to move the circles";
		
				canvas.addEventListener('mousedown', dragStart, false);
				canvas.addEventListener('mousemove', drag, false);
				canvas.addEventListener('mouseup', dragStop, false);				
			}
	  else if(document.getElementById("btnMve").name == "Move Shape")
	  {         
		
				canvas.removeEventListener("mousedown", dragStart, false);
				canvas.removeEventListener("mousemove", drag, false);
				canvas.removeEventListener("mouseup", dragStop, false);
				
				document.getElementById("btnMve").src = "drawButton.jpg";
				document.getElementById("btnMve").name = "Draw Shape";
				document.getElementById("spid").innerHTML="Click here to draw the circles";
				
				canvas.addEventListener('mousedown', mouseDown, false);
	   }
 }
	