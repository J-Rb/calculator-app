const calcScreen = document.querySelector(".screen");
const buttons = document.querySelector(".buttons");


let arr =
    [["AC", "", "", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="]];
function addDivs() {
    for (let i = 0; i < 5; i++) {
        const row = document.createElement("div");
        row.classList.add("row");


        if (i == 4) {
            for (let k = 0; k < 3; k++) {
                const [newDiv, circle] = createDivs(i, k);
                if (k == 0) {
                    circle.style.width = "500px";
                    newDiv.setAttribute("class", "zero-key elem");
                }
            }
            break;
        }
        for (let j = 0; j < 4; j++) {
            createDivs(i, j);
        }
        function createDivs(i, j) {
            console.log(j);
            const newDiv = document.createElement("div");
            newDiv.setAttribute("class", "elem");

            const circle = document.createElement("div");
            circle.setAttribute("class", "elem");
            circle.style.borderRadius = "25px";
            circle.style.backgroundColor = "blue";
            circle.style.color = "white";
            circle.textContent = arr[i][j];

            const symbol = circle.textContent;
            switch (true) {
                case symbol == "AC":
                    newDiv.addEventListener("click", () => calcScreen.textContent = "");
                    break;
                case symbol == "=":
                    newDiv.addEventListener("click", () => operate());
                    break;
                case !Number.isNaN(+symbol) || symbol == ".":
                    newDiv.addEventListener("click", () => {
                        calcScreen.textContent += symbol;
                    });
                    break;
                default:
                    newDiv.addEventListener("click", () => {
                        calcScreen.textContent += " " + symbol + " "
                    });

            }

            newDiv.appendChild(circle);
            row.appendChild(newDiv);
            buttons.appendChild(row);
            return [newDiv, circle];
        }
    }
    // document.body.insertBefore(buttons, document.body.lastChild.previousSibling);
    // document.body.appendChild(buttons);
}


function operate() {
    let array;
    let operations = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "/": (a, b) => a / b,
        "*": (a, b) => a * b,
    }
    console.log(array = calcScreen.textContent.split(" ").filter(element => element && !element.includes("\n")));

    let total = 0;
    while (Number.isNaN(+calcScreen.textContent)) {

        let indicesOfMult = {};
        array.forEach((element, index) => {
            if (element === "*" || element === "/") {
                indicesOfMult[index] = element;

            }
        });
        while (Object.keys(indicesOfMult).length != 0) {
            let [index, operator] = Object.entries(indicesOfMult).shift();
            index = +index;
            total = operations[operator](+array[index - 1], +array[index + 1]);
            console.log(+array[index - 1], operator, +array[index + 1], "=", total, index);
            console.log(array);
            console.log(indicesOfMult);
            array = array.slice(0, index - 1).concat(array.slice(index + 2));
            array.unshift(total.toString());
            calcScreen.textContent = array.join(" ");
            indicesOfMult = {};
            array.forEach((element, index) => {
                if (element === "*" || element === "/") {
                    indicesOfMult[index] = element;

                }
            });
        }

        if (Number.isNaN(+calcScreen.textContent)) {
            console.log(array);
            total = operations[array[1]](+array[0], +array[2]);
            console.log(total);
            array = array.slice(3);
            array.unshift(total.toString());
            calcScreen.textContent = array.join(" ");
        }
    }
}

addDivs();