
// declaring global variables

let ammoRemaining;
let targetsRemaining;


// creating the objects for targets

class Target {
    constructor(range, windSpeed, windDir, tolerance) {
        this.range = range;
        this.windSpeed = windSpeed;
        this.windDir = windDir;
        this.tolerance = tolerance;
    }
};

const targetOne = new Target(100, 5, "S", .10);

console.log(targetOne)

// caching browser elements

const hitMissBtnEl = document.querySelector("#hit-miss-button");

const tgtButtonEl = document.querySelector("#tgt-buttons");

const shooterInputsEl = document.querySelectorAll("#shooter-inputs");

const fireBtnEl = document.querySelector("#fire-btn");

console.log(tgtButtonEl)

// event listeners

fireBtnEl.addEventListener("click", () => {
    console.log("Shot Fired");
});


