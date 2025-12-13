
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

// console.log(targetOne)

// caching browser elements

const hitMissBtnEl = document.querySelector("#hit-miss-button");

const tgtDistanceEl = document.querySelector("#tgt-distance");
const tgtWndSpdEl = document.querySelector("#wnd-spd");
const tgtWndDirEl = document.querySelector("#wnd-dir");


const shooterElevationEl = document.querySelector("#elevation");
const shooterDirectionEl = document.querySelector("#direction");
const shooterMilWindageEl = document.querySelector("#mil-windage");

const fireBtnEl = document.querySelector("#fire-btn");

const ammoContainerEl = document.querySelector("#ammo-container")
const dopeContainerEl = document.querySelector("#dope-container")

// console.log(fireBtnEl)

// event listeners

fireBtnEl.addEventListener("click", () => {
    console.log("Shot Fired");
});

// functions

function renderTgtDist() {

}
