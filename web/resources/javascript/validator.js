const getInputElm = (props) => {
    let inpElm = document.createElement("input");
    for (let key in props) inpElm.setAttribute(key, props[key]);
    return inpElm;
};

const form = {
    element: document.getElementById("data-form"),
    init() {
        for (let obj of Object.values(this.items)) obj.init();
        this.element.onsubmit = () => {
            let isValid = true;
            let formData = form.element;
            for (let obj of Object.values(form.items)) {
                if (obj.isValid) isValid &= obj.isValid();
                if (document.getElementsByName(obj.name).length > 0) {
                    document.getElementsByName(obj.name)[0].value = obj.value;
                    continue;
                }
                let inpElm = getInputElm({
                    type: "hidden",
                    value: obj.value,
                    name: obj.name,
                });
                formData.appendChild(inpElm);
            }
            return Boolean(isValid);
        };
    },
    items: {
        pointX: {
            input: document.getElementById("x-input"),
            range: {min: -3, max: 5},
            name: "x",
            value: null,
            init() {
                const eachRow = 3;
                const {min, max} = this.range;
                for (let i = min; i <= max; ++i) {
                    let divElm = document.createElement("div");
                    for (const st = i; i <= Math.min(st + eachRow - 1, max); ++i) {
                        let radioElm = getInputElm({
                            type: "radio",
                            class: "x-radio",
                            name: "x-radio",
                            id: `${i}-radio`,
                            value: i,
                        });
                        let labelElm = document.createElement("label");
                        labelElm.setAttribute("for", `${i}-radio`);
                        labelElm.innerText = i;
                        divElm.appendChild(radioElm);
                        divElm.appendChild(labelElm);
                    }
                    this.input.appendChild(divElm);
                    i--;
                }
                let radios = document.getElementsByName("x-radio");
                for (let radio of radios) {
                    radio.onclick = () => {
                        let xError = document.getElementById("x-err");
                        xError.innerText = "";
                        form.items.pointX.value = null;
                        for (let r of radios) {
                            if (r.checked) form.items.pointX.value = r.value;
                        }
                    }
                }
            },
            isValid() {
                let xError = document.getElementById("x-err");
                if (this.value == null) {
                    xError.innerText = "Point X should be chosen";
                    return false;
                }
                return true;
            },
        },
        pointY: {
            input: document.getElementById("y-input"),
            range: {min: -3, max: 3},
            name: "y",
            value: null,
            init() {
                let inpElm = getInputElm({
                    type: "text",
                });
                this.input.appendChild(inpElm);

                inpElm.onkeyup = () => {
                    form.items.pointY.value = inpElm.value;
                    let yError = document.getElementById("y-err");
                    yError.innerText = "";
                }
            },
            isValid() {
                let yError = document.getElementById("y-err");
                if (this.value == null) {
                    yError.innerText = "Point Y should not be empty";
                    return false;
                }
                if (isNaN(this.value)) {
                    yError.innerText = "Point Y should be a number";
                    return false;
                }

                let yValue = Number(this.value);
                if (yValue <= this.range.min || yValue >= this.range.max) {
                    yError.innerText = `Point Y should be a number between ${this.range.min} & ${this.range.max}`;
                    return false;
                }
                this.value = Number(this.value);
                return true;
            }
        },
        radius: {
            input: document.getElementById("radius-input"),
            range: {min: 1, max: 3},
            name: "radius",
            value: [],
            init() {
                for (let i = this.range.min; i <= this.range.max; i += 0.5) {
                    let checkBoxElm = getInputElm({
                        type: "checkbox",
                        name: "r-checkbox",
                        class: "r-checkbox",
                        id: `${i}-checkbox`,
                        value: i,
                    });
                    let labelElm = document.createElement("label");
                    labelElm.setAttribute("for", `${i}-checkbox`);
                    labelElm.innerText = i;
                    this.input.appendChild(checkBoxElm);
                    this.input.appendChild(labelElm);
                }

                let boxes = document.getElementsByName("r-checkbox");
                for (let box of boxes) {
                    box.onclick = () => {
                        let rError = document.getElementById("radius-err");
                        rError.innerText = "";
                        form.items.radius.value = [];
                        for (let b of boxes) {
                            if (b.checked) form.items.radius.value.push(b.value);
                        }
                    }
                }
            },
            isValid() {
                let boxes = document.getElementsByName("r-checkbox");
                let count = 0;
                for (let box of boxes) count += box.checked;
                let rError = document.getElementById("radius-err");
                if (count === 0) {
                    rError.innerText = "Radius should not be empty";
                    return false;
                }
                return true;
            }
        }
    }
};
form.init();