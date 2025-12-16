
// declaring global variables

let ammoRemaining = 15
let targetsRemaining;


let currentTarget = null;
let currentTargetIndex = 0


// creating the objects for targets

class Target {
    constructor(distance, windSpeed, windDir, tolerance, delay) {
        this.distance = distance;
        this.windSpeed = windSpeed;
        this.windDir = windDir;
        this.tolerance = tolerance;
        // this.hit = false;
        this.delay = delay;
    }
};

const targetOne = new Target(100, 5, "S", .12, 500);
const targetTwo = new Target(150, 5, "S", .12, 500);
const targetThree = new Target(200, 5, "S", .12, 550);
const targetFour = new Target(300, 5, "S", .12, 600);
const targetFive = new Target(350, 5, "S", .12, 650);
const targetSix = new Target(450, 5, "S", .10, 900);
const targetSeven = new Target(700, 5, "S", .10, 2000);
const targetEight = new Target(750, 5, "S", .10, 2100);
const targetNine = new Target(900, 5, "S", .10, 3000);
const targetTen = new Target(1000, 5, "S", .10, 4000);

const targetDeck = [
    targetOne, targetTwo, targetThree, targetFour,
    targetFive, targetSix, targetSeven, targetEight,
    targetNine, targetTen
];


// console.log(targetOne)

// caching browser elements

const winLoseBtnEl = document.querySelector("#win-lose");

const tgtDistanceEl = document.querySelector("#tgt-distance");
const tgtWndSpdEl = document.querySelector("#wnd-spd");
const tgtWndDirEl = document.querySelector("#wnd-dir");


const shooterElevationEl = document.querySelector("#elevation");
const shooterDirectionEl = document.querySelector("#direction");
const shooterMilWindageEl = document.querySelector("#mil-windage");

const fireBtnEl = document.querySelector("#fire-btn");

const ammoContainerEl = document.querySelector("#ammo-container")
const dopeContainerEl = document.querySelector("#dope-container")




function calculateHitElevation(target) {
    const tgtDistance = target.distance;
    let shooterElevation = Number(shooterElevationEl.value);

    if (tgtDistance >= 100 && tgtDistance <= 400) {
        return shooterElevation * 15 + 100
    }

    if (tgtDistance >= 401 && tgtDistance <= 700) {
        return shooterElevation * 15 + 100
    }

    if (tgtDistance >= 701 && tgtDistance <= 1000) {
        return shooterElevation * 15 + 100
    }

    console.log(shooterElevation)
    return shooterElevation

};

function calculateWindage(target) {
    let correctWindDir;

    if (target.windDir === "S" ||
        target.windDir === "N") {
        correctWindDir = "center"

    } else if (target.windDir === "NE" ||
        target.windDir === "E" ||
        target.windDir === "SE") {
        correctWindDir = "right"

    } else if (target.windDir === "NW" ||
        target.windDir === "W" ||
        target.windDir === "SW") {
        correctWindDir = "left"
    } else {
        return null;
    }

    return correctWindDir;
}

function calculateWindageMils() {
    let correctWindage = Number(shooterMilWindageEl.textContent);
    return correctWindage * 5
}



function renderHit(target) {
    const hitElevation = calculateHitElevation(target);
    const tgtDistance = target.distance;

    console.log(hitElevation)

    const tolerance = tgtDistance * target.tolerance;

    const isHit = hitElevation >= tgtDistance - tolerance &&
        hitElevation <= tgtDistance + tolerance

    target.hit = isHit;
    target.shotAt = true;

    console.log(isHit ? "Hit" : "Miss")

    const sound = new Audio("./steelcup-47888.mp3")
    if (target.hit === true) {
        setTimeout(() => {
            sound.play();
            sound.volume = 0.2
        }, target.delay);
    }
    return isHit;
}


function playShotSound() {
    const sound = new Audio("./sniper-rifle-5989.mp3");
    sound.play()
    sound.volume = 0.1;
}

function peekTarget() {
    return targetDeck[currentTargetIndex] ?? null;
}

function renderAmmo() {
    ammoContainerEl.textContent = `You have ${ammoRemaining} shots remaining`
}

// -------------------------------event listeners----------------------------------------------------



fireBtnEl.addEventListener("click", () => {
    console.log("Shot Fired");

    if (ammoRemaining <= 1) {
        console.log("out of Ammo")
        playShotSound();
        renderScore();
        return;
    }

    playShotSound()

    const target = peekTarget();
    if (!target) {
        console.log("No more targets");
        winLoseBtnEl.style.visibility = "visible"
        winLoseBtnEl.textContent = "You Win!"
        return;
    }

    const hitElevation = calculateHitElevation(target);
    const isHit = renderHit(target);

    ammoRemaining--;
    renderAmmo()
    updateDope(target, isHit, hitElevation)

    if (isHit) {
        currentTargetIndex++;

        const nextTarget = peekTarget();
        if (nextTarget) {
            renderTgtInfo(nextTarget);
        } else {
            console.log("All targets completed")
            ammoRemaining = 0;
            return;
        }
    }
});


// functions


function updateDope(currentTarget, isHit, hitElevation) {
    const li = document.createElement("li");
    li.textContent = isHit
        ? `Hit, ${Math.abs(hitElevation - currentTarget.distance).toFixed(1)} off-center` : `Miss by ${Math.abs(hitElevation - currentTarget.distance).toFixed(1)}m`;
    dopeContainerEl.appendChild(li);
}

function targetSelector() {
    if (currentTargetIndex >= targetDeck.length) {
        currentTarget = null;
        return null;
    }
    currentTarget = targetDeck[currentTargetIndex++];
    return currentTarget;
}

function renderTgtInfo(target) {
    tgtDistanceEl.textContent = target.distance
    tgtWndDirEl.textContent = target.windDir
    tgtWndSpdEl.textContent = target.windSpeed
}

const firstTarget = peekTarget();
if (firstTarget) renderTgtInfo(firstTarget);


function renderScore() {
    currentTarget = targetDeck[currentTargetIndex]

    if (currentTarget.distance >= 750) {
        winLoseBtnEl.style.visibility = "visible"
        winLoseBtnEl.textContent = "You Win!"
        return;
    }

    if (currentTarget.distance < 750) {
        winLoseBtnEl.style.visibility = "visible"
        winLoseBtnEl.textContent = "You Lose!"
        return;
    }
}
