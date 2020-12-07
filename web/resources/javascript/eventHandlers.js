document.getElementById("Layer_1").onmousedown = (e) => {
    let rValue = document.getElementById("data-form:radius-input_input").value;
    let rErr = document.getElementById("svg-err");
    if (!rValue) {
        rErr.innerText = "Radius is required";
        return;
    } else rErr.innerText = "";
    let [x, y] = [(e.offsetX - 150) / 30, -(e.offsetY - 150) / 30];
    let itX = document.querySelector("input[type=hidden]").nextElementSibling;
    let itY = itX.nextElementSibling;
    itX.value = x.toFixed(3);
    itY.value = y.toFixed(3);
    console.log(rValue);
};