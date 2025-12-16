
// declaring global variables

let ammoRemaining = 15
let targetsRemaining;


let currentTarget = null;
let currentTargetIndex = 0

let spd;
let correctTargetWindage;

let correctWindDir;

let shooterWindageMils;



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

const targetOne = new Target(100, 5, "E", .12, 500);
const targetTwo = new Target(150, 10, "W", .12, 500);
const targetThree = new Target(200, 15, "E", .12, 550);
const targetFour = new Target(300, 20, "N", .12, 600);
const targetFive = new Target(350, 10, "W", .12, 650);
const targetSix = new Target(450, 5, "W", .10, 900);
const targetSeven = new Target(700, 15, "E", .10, 2000);
const targetEight = new Target(750, 20, "N", .10, 2100);
const targetNine = new Target(900, 20, "E", .10, 3000);
const targetTen = new Target(1000, 10, "W", .10, 4000);

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

function calculateWindageDir() {

    if (currentTarget.windDir === "S" ||
        currentTarget.windDir === "N") {
        correctWindDir = "center"

    } else if (currentTarget.windDir === "NE" ||
        currentTarget.windDir === "E" ||
        currentTarget.windDir === "SE") {
        correctWindDir = "right"

    } else if (currentTarget.windDir === "NW" ||
        currentTarget.windDir === "W" ||
        currentTarget.windDir === "SW") {
        correctWindDir = "left"
    } else {
        return null;
    }
    return correctWindDir;
}


function calculateCorrectWindage() {
    spd = currentTarget.windSpeed
    console.log(spd)
    console.log(correctWindDir)
    if (correctWindDir === "center") {
        correctTargetWindage = spd * 0

    } else if (correctWindDir === "right") {
        correctTargetWindage = spd * 5

    } else if (correctWindDir === "left") {
        correctTargetWindage = spd * -5

    } else {
        return null;
    }
}


function calculateShooterWindage() {
    shooterWindageMils = Number(shooterMilWindageEl.value);

    if (correctWindDir === "center") {
        return shooterWindageMils * 0

    } else if (correctWindDir === "right") {
        return shooterWindageMils * 10 * 5

    } else if (correctWindDir === "left") {
        return shooterWindageMils * 10 * -5

    } else {
        return null;
    }
}

function checkWindage() {
    calculateWindageDir();
    calculateCorrectWindage();
    calculateShooterWindage();
    console.log(correctTargetWindage);
    console.log(calculateShooterWindage());

    if (correctTargetWindage === calculateShooterWindage()) {
        return true;
    } else {
        return false;
    }
};


// function checkCorrectWindage(correctWindageDir, shooterWindage) {
//     let correctTotalWindage = target.correctWindDir
// }



function renderHit(target) {
    const hitElevation = calculateHitElevation(target);
    const tgtDistance = target.distance;
    const windage = checkWindage(correctTargetWindage, shooterWindageMils)
    console.log(windage)

    console.log(hitElevation)

    const tolerance = tgtDistance * target.tolerance;

    const isHit = hitElevation >= tgtDistance - tolerance &&
        hitElevation <= tgtDistance + tolerance && windage;

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
    currentTarget = targetDeck[currentTargetIndex]
    return targetDeck[currentTargetIndex] ?? null;
}

function renderAmmo() {
    ammoContainerEl.textContent = `You have ${ammoRemaining} shots remaining`
    fireBtnEl.disabled = ammoRemaining === 0;
}

// -------------------------------event listeners----------------------------------------------------



fireBtnEl.addEventListener("click", () => {
    console.log("Shot Fired");
    const target = peekTarget();

    if (ammoRemaining <= 1) {
        console.log("out of Ammo")
        playShotSound();
        ammoRemaining--;
        renderAmmo()
        setTimeout(() => {
            renderScore();
        }, (target.delay + 500));

        return;
    }

    playShotSound()


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
            // renderScore()
            updateDope(target, isHit, hitElevation)
            ammoRemaining = 0;
            setTimeout(() => {
                winLoseBtnEl.style.visibility = "visible"
                winLoseBtnEl.textContent = "You Win!"
            }, (target.delay + 500));
            return;
        }
    }
});


// functions


function updateDope(currentTarget, isHit, hitElevation) {
    const li = document.createElement("li");
    li.textContent = isHit
        ? `Hit, ${Math.abs(hitElevation - currentTarget.distance).toFixed(1)} off-center` :
        `Miss by ${Math.abs(hitElevation - currentTarget.distance).toFixed(1)}m`;
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
