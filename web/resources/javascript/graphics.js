var x, y, radius;
var rEfficient = 5 / 6;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var [maxX, maxY] = [canvas.width, canvas.height];
var [xCenter, yCenter] = [maxX / 2, maxY / 2];
var R = maxX / 2 * rEfficient;

// --------- Subjects --------------
var Ox = [[0, yCenter], [maxX, yCenter]];
var Oy = [[xCenter, maxY], [xCenter, 0]];
var xArrow = [[maxX - 10, yCenter - 5], [maxX, yCenter], [maxX - 10, yCenter + 5]];
var yArrow = [[xCenter - 5, 10], [xCenter, 0], [xCenter + 5, 10]];
var milestones = [];
for (var i = xCenter - R; i <= xCenter + R; i += R / 2) {
    milestones.push([[i, yCenter - 2], [i, yCenter + 2]]);
    milestones.push([[xCenter - 2, i], [xCenter + 2, i]]);
}
;
var arcs = [xCenter, yCenter, R, Math.PI, 1.5 * Math.PI];
var rect = [xCenter, yCenter - R, R, R];
var tri = [[xCenter, yCenter], [xCenter, yCenter + R / 2], [xCenter + R / 2, yCenter]];
var rText = [];
for (var i = xCenter - R; i <= xCenter + R; i += 2 * R) {
    rText.push([i + 5, yCenter - 5]);
    rText.push([yCenter + 5, i - 5]);
}
;
var r2Text = [];
for (var i = xCenter - R / 2; i <= xCenter + R / 2; i += R) {
    r2Text.push([i + 5, yCenter - 5]);
    r2Text.push([yCenter + 5, i - 5]);
}
;

// ----------------------- Draw function ----------------------------
var drawLine = function (points) {
    for (var point of points) {
        if (point === points[0]) ctx.moveTo(...point);
        else ctx.lineTo(...point);
    }
};
var drawArcs = function (arc) {
    ctx.moveTo(xCenter, yCenter);
    ctx.arc(...arc);
};
var drawRect = function (rect) {
    ctx.rect(...rect);
};

// -------------------- Drawing subjects -----------------------
ctx.fillStyle = "rgb(51, 153, 255, 0.3)";

drawArcs(arcs);
drawRect(rect);
drawLine(tri);
ctx.fill();

drawLine(Ox);
drawLine(Oy);
drawLine(xArrow);
drawLine(yArrow);
for (var milestone of milestones) drawLine(milestone);
for (var point of rText) ctx.strokeText("R", ...point);
for (var point of r2Text) ctx.strokeText("R/2", ...point);

ctx.stroke();

// function getCursorPosition(canvas, event) {
//     const rect = canvas.getBoundingClientRect();
//     var xArr = [], yArr = [];
//     for (var i = 0; i < radius.length; i++) {
//         var x = (event.clientX - xCenter - rect.left) / R * radius[i];
//         var y = (yCenter - event.clientY + rect.top) / R * radius[i];
//         xArr.push(x);
//         yArr.push(y);
//     }
//
//     ctx.beginPath();
//     ctx.fillStyle = "red";
//     ctx.arc(event.clientX - rect.left, event.clientY - rect.top, 3, 0, 2 * Math.PI);
//     ctx.fill();
//     ctx.closePath();
//     redirect({x: xArr.join(","), y: yArr.join(","), radius}, "/lab-2_war/data-process");
// };
//
// function redirect(body, url) {
//     var form = document.createElement("form");
//     document.body.appendChild(form);
//     form.method = "POST";
//     form.action = url;
//     for (var [key, value] of Object.entries(body)) {
//         var inpElm = getInputElm({
//             type: "hidden",
//             value: value,
//             name: key,
//         });
//         form.appendChild(inpElm);
//     }
//     form.submit();
// }
// document.querySelector('canvas').addEventListener('mousedown', function (e) {
//     [x, y, radius] = [
//         parseFloat(canvas.getAttribute("data-x")),
//         parseFloat(canvas.getAttribute("data-y")),
//         parseFloat(canvas.getAttribute("data-r"))
//     ];
//
//     if (!radius) {
//         var err = document.getElementById("canvas-err");
//         err.innerText = "It's impossible to determine coordinate of the point without radius value";
//         return;
//     }
//     getCursorPosition(document.querySelector('canvas'), e);
// });