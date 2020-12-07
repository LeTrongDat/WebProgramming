let clock = document.getElementById("clock");
clock.innerHTML = new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString();

function updateTime() {
    clock.innerHTML = new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString();
}
setInterval(updateTime, 8000);