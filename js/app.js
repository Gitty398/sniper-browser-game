
// declaring global variables

let ammoRemaining = 15
let targetsRemaining;


let currentTarget = null;
let currentTargetIndex = 0


// creating the objects for targets

class Target {
    constructor(distance, windSpeed, windDir, tolerance) {
        this.distance = distance;
        this.windSpeed = windSpeed;
        this.windDir = windDir;
        this.tolerance = tolerance;
        this.shotAt = false;
    }
};

const targetOne = new Target(100, 5, "S", .10);
const targetTwo = new Target(150, 5, "S", .10);
const targetThree = new Target(200, 5, "S", .10);
const targetFour = new Target(300, 5, "S", .10);
const targetFive = new Target(350, 5, "S", .10);
const targetSix = new Target(450, 5, "S", .10);
const targetSeven = new Target(700, 5, "S", .10);
const targetEight = new Target(750, 5, "S", .10);
const targetNine = new Target(900, 5, "S", .10);
const targetTen = new Target(1000, 5, "S", .10);

const targetDeck = [
    targetOne, targetTwo, targetThree, targetFour,
    targetFive, targetSix, targetSeven, targetEight,
    targetNine, targetTen
];


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

function calculateHitElevation(target) {
    const tgtDistance = target.distance;
    let shooterElevation = Number(shooterElevationEl.value);

    if (tgtDistance >= 100 && tgtDistance <= 400) {
        return shooterElevation * 33 + 100
    }

    if (tgtDistance >= 401 && tgtDistance <= 700) {
        return shooterElevation * 33 + 100
    }

    if (tgtDistance >= 701 && tgtDistance <= 1000) {
        return shooterElevation * 33 + 100
    }

    return shooterElevation
};

console.log(shooterElevationEl.value);

function renderHit(target) {
    const hitElevation = calculateHitElevation(target);
    const tgtDistance = target.distance;

    const tolerance = tgtDistance * target.tolerance;

    if (hitElevation >= tgtDistance - tolerance && hitElevation <= tgtDistance + tolerance)
        console.log("Hit")

    else {
        console.log("Miss")
    }
};


// event listeners

fireBtnEl.addEventListener("click", () => {
    console.log("Shot Fired");

    const target = targetSelector();
    if (!target) {
        console.log("No more targets");
        return;
    }
    console.log("target distance", target.distance)
    renderHit(target)
    renderTgtDist(target)
});

// functions


function targetSelector() {
    if (currentTargetIndex >= targetDeck.length) {
        currentTarget = null;
        return null;
    }
    currentTarget = targetDeck[currentTargetIndex++];
    return currentTarget;
}

console.log(currentTarget)

function renderTgtDist(target) {
    tgtDistanceEl.textContent = target.distance
    tgtWndDirEl.textContent = target.windDir
    tgtWndSpdEl.textContent = target.windSpeed
}


const target = targetSelector();
if (target) renderTgtDist(target);


// targetSelector()
// renderTgtDist()


// function cleanTarget() {
//     tgtDistanceEl.innerHTML = ""
// }

// function currentTarget() {
//     targetOne[0] = 
// }