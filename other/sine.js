
var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");

canvas.width = innerWidth
canvas.height = innerHeight

document.getElementById("height").max = canvas.height*2;
document.getElementById("height").value = canvas.height;

const wave = {
	height: canvas.height,
    length: 0.01,
    amplitude: 100
}

window.addEventListener('resize', resizeCanvas, false);

function sliderInput(slider) {
	if (slider.id == "length") {
    	wave[slider.id] = slider.value / 2000;
    } else wave[slider.id] = slider.value;
}

function refresh(){

    window.requestAnimationFrame(refresh)
    
    // canvas.width  = window.innerWidth;
    // canvas.height = window.innerHeight;
	
	if (document.getElementById("clear").checked === true) {
	    c.clearRect(0, 0, canvas.width, canvas.height);
	}
    
	c.beginPath()
    
    c.moveTo(0, wave.height/2)
    
    for (let x = 0; x < canvas.width; x++) {
        c.lineTo(x, wave.height/2 + Math.sin(x * wave.length) * wave.amplitude);
    }
    c.stroke()
}

function refreshPage() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    resizeCanvas()
}

function resizeCanvas() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}

function saveAsImage() {
    c.globalCompositeOperation = 'destination-over';

    c.fillStyle = "#ffffff";
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.globalCompositeOperation = 'source-over';

    
    let cnv = document.getElementById("canvas");
    let d = cnv.toDataURL("image/png");
    let w = window.open('about:blank','image from canvas');
    w.document.write("<img src='"+d+"' alt='from canvas'/>");

}

refresh()