function determineCoor(e) {
    let rValue = document.getElementById("data-form:radius-input_input").value;
    let rErr = document.getElementById("svg-err");
    if (!rValue) {
        rErr.innerText = "Radius is required";
        return;
    } else rErr.innerText = "";
    // let rect = e.target.getBoundingClientRect();
    // let [x, y] = [(e.clientX - rect.left - 150) / 30, -(e.clientY - rect.top - 150) / 30];
    let [x, y] = [(e.offsetX - 150) / 30, -(e.offsetY - 150) / 30];
    let itX = document.querySelector("input[type=hidden]").nextElementSibling;
    let itY = itX.nextElementSibling;
    itX.value = x.toFixed(3);
    itY.value = y.toFixed(3);
    console.log(itX, itY);
}
document.getElementById("Layer_1").onmousedown = determineCoor;
document.getElementById("Layer_1").onmouseover = determineCoor;