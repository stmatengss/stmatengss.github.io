var container;

var element;
var elements = new Array();

var elementWidth;
var elementHeight;
var canvasWidth;
var canvasHeight;

var graphics;

var PI2 = Math.PI * 2;

var size = 10;
var sizeHalf = size / 2;
var direction = 1;
var speed = .1;
var positionX = size / 2;

var i = 0;

init();
createGrid();
setInterval(loop, 1000/60);

function init()
{
	container = document.getElementById('container');

	while( i < 2)
	{
		elements[i] = document.createElement('input');
		elements[i].type = 'checkbox';
		container.appendChild(elements[i]);
		i++;
	}

	elementWidth = elements[1].offsetLeft - elements[0].offsetLeft;
	elements[1].style.display = 'block';

	elementHeight = elements[1].offsetTop - elements[0].offsetTop;
	elements[1].style.display = 'inline';
}

function createGrid()
{
	canvasWidth = Math.floor( window.innerWidth / elementWidth );
	canvasHeight = Math.floor( window.innerHeight / elementHeight );

	if (elements.length < canvasWidth * canvasHeight)
	{
		while( i < canvasWidth * canvasHeight)
		{
			element = elements[i] = document.createElement("input");
			element.type = "checkbox";
			container.appendChild(element);
			i++;
		}
	}

	var buffer = document.createElement("canvas");
	buffer.width = canvasWidth;
	buffer.height = canvasHeight;
	buffer.style.position = "absolute";
	buffer.style.top = "0px";
	buffer.style.left = "0px";
	// container.appendChild(buffer);

	graphics = buffer.getContext("2d");
}

function loop()
{
	// animation

	graphics.fillStyle = "#000000";
	graphics.fillRect (0, 0, canvasWidth, canvasHeight);

	graphics.fillStyle = "#ff0000";
	graphics.beginPath();
	graphics.arc(positionX, (canvasHeight - 2*sizeHalf) - Math.abs( Math.cos(new Date() * .001) * (canvasHeight - size) ), sizeHalf, 0, PI2, true); 
	graphics.closePath();
	graphics.fill();

	positionX += direction * speed;

	if (positionX > canvasWidth - sizeHalf)
		direction = -1;
	else if (positionX < sizeHalf)
		direction = 1;

	// rendering

	var data = graphics.getImageData(0, 0, canvasWidth, canvasHeight).data;


	for (var i = 0; i < canvasWidth * canvasHeight; i ++)
	{
		element = elements[i];
		element.checked = data[i * 4] > 0;
	}

}	
