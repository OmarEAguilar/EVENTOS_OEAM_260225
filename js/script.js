let maxleft;
let maxTop;
const minLeft = 0;
const minTop = 0;
let timeDelta;
let imgs = [
    "media/img/arboles/arbol1.png",
    "media/img/arboles/arbol2.png",
    "media/img/arboles/arbol3.png",
    "media/img/arboles/arbol4.png",
];

var originalX;
var originalY;
window.onload = function () {
    document.onmousedown = startDrag;
    document.onmouseup = stopDrag;
    baseOnLoad();
};

function sensorClick() {
    if (Date.now() - timeDelta < 150) {
        createPopUp(this);
    }
}

function createPopUp(parent) {
    let p = document.getElementById("popup");
    if (p) {
        p.parentNode.removeChild(p);
    }
    let popup = document.createElement("div");
    popup.id = "popup";
    popup.className = "popup";
    popup.style.top = parent.offsetTop - 110 + "px";
    popup.style.left = parent.offsetLeft - 75 + "px";

    let map = document.getElementsByClassName("map")[0];
    map.appendChild(popup);
}

function baseOnLoad() {
    var map = document.getElementsByClassName("map")[0];
    var base = document.getElementsByClassName("base")[0];
    maxleft = base.clientWidth - 50;
    maxTop = base.clientHeight - 50;

    for (let i = 0; i < 6; i++) {
        let sensor = document.createElement("img");
        sensor.src = imgs[i % imgs.length];
        sensor.alt = i;
        sensor.id = i;
        sensor.draggable = true;
        sensor.classList.add("sensor", "dragme");
        sensor.style.position = "absolute";
        sensor.style.left = `${Math.floor(Math.random() * 900)}px`;
        sensor.style.top = `${Math.floor(Math.random() * 500)}px`;
        sensor.onclick = sensorClick;
        let parent = document.getElementsByClassName("map")[0];
        parent.appendChild(sensor);
    }
}

let drag = false;
let targ, offsetX, offsetY, coordX, coordY;

function startDrag(e) {
    timeDelta = Date.now();
    if (!e) e = window.event;

    if (e.preventDefault) e.preventDefault();
    targ = e.target ? e.target : e.srcElement;

    if (!targ.classList.contains("dragme")) return;

    originalX = targ.style.left;
    originalY = targ.style.top;

    offsetX = e.clientX;
    offsetY = e.clientY;
    coordX = parseInt(targ.style.left) || 0;
    coordY = parseInt(targ.style.top) || 0;
    drag = true;

    document.onmousemove = dragDiv;
    return false;
}

function dragDiv(e) {
    if (!drag) return;
    if (!e) e = window.event;

    let newLeft = coordX + e.clientX - offsetX;
    let newTop = coordY + e.clientY - offsetY;

    if (newLeft < maxleft && newLeft > minLeft) targ.style.left = newLeft + "px";
    if (newTop < maxTop && newTop > minTop) targ.style.top = newTop + "px";
}

function stopDrag() {
    if (typeof drag == "undefined") return;
    if (drag) {
        if (Date.now() - timeDelta > 150) {
            let p = document.getElementById("popup");
            if (p) {
                p.parentNode.removeChild(p);
            }
        } else {
            if (targ) {
                targ.style.left = originalX;
                targ.style.top = originalY;
            }
        }
    }
    drag = false;
}
