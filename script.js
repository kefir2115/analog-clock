const plane = document.querySelector(".plane");
const c = plane.getContext("2d");

var w, h;
var angle = {
    hour: 0,
    minute: 45
};

function init() {
    scale();
    tick();
    draw();
}
init();

function tick() {
    setTimeout(() => {
        tick();
    }, 500);

    let d = new Date();
    angle.hour = (d.getHours()-1+(d.getMinutes()/60))/24*360;
    angle.minute = (d.getMinutes()+(d.getSeconds()/60))/60*360;
}
function draw() {
    window.requestAnimationFrame(draw);

    c.fillStyle = "rgb(25, 25, 25)";
    c.fillRect(0, 0, w, h);

    c.translate(w/2, h/2);

    c.shadowBlur = 5;
    c.strokeStyle = c.shadowColor = "rgb(255, 255, 255)";
    
    c.save();
    c.beginPath();
    c.lineWidth = 3;
    c.arc(0, 0, 100, 0, Math.PI*2);
    c.stroke();
    c.closePath();
    c.restore();

    let rad = -Math.PI/180;
    // line length from middle to border of clock
    let hourLength = 50;
    let minuteLength = 75;

    c.save();
    c.beginPath();
    c.moveTo(0, 0);
    c.lineWidth = 3;
    c.lineTo(hourLength*Math.sin((angle.hour+90)*rad), hourLength*Math.cos((angle.hour+90)*rad));
    c.stroke();
    c.closePath();
    c.restore();

    c.save();
    c.beginPath();
    c.moveTo(0, 0);
    c.lineWidth = 2;
    c.lineTo(minuteLength*Math.sin((angle.minute+180)*rad), minuteLength*Math.cos((angle.minute+180)*rad));
    c.stroke();
    c.closePath();
    c.restore();

    // Draw numbers on clock
    c.fillStyle = "#FFF";
    c.font = "1rem sans-serif";
    c.textAlign = "center";

    let nums = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], anglePer = 360/nums.length, distance = 80;
    nums.forEach((n, i) => {
        let ang = i*anglePer+180;
        let p = [distance*Math.sin(ang*rad), distance*Math.cos(ang*rad)];
        c.fillText(n+"", p[0], p[1]);
        
        c.save();
        c.beginPath();
        c.arc(p[0], p[1], 1, 0, Math.PI*2);
        c.closePath();
        c.restore();
    });

    c.translate(-w/2, -h/2);
}
function scale() {
    plane.width = w = window.innerWidth;
    plane.height = h = window.innerHeight;
}
window.onresize = scale;