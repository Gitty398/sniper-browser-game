
//-------------------------declaring global variables--------------------------------------

let ammoRemaining = 15
let targetsRemaining;

let currentTarget = null;
let currentTargetIndex = 0

let spd;
let correctTargetWindage;
let correctWindDir;
let shooterWindageMils;
let shooterDir;


//-----------------------creating the objects for targets-----------------------------------------

class Target {
    constructor(tgtNumber, distance, windSpeed, windDir, tolerance, delay) {
        this.tgtNumber = tgtNumber;
        this.distance = distance;
        this.windSpeed = windSpeed;
        this.windDir = windDir;
        this.tolerance = tolerance;
        this.delay = delay;
    }
};

const targetOne = new Target(1, 100, 5, "E", .12, 500);
const targetTwo = new Target(2, 150, 10, "W", .12, 500);
const targetThree = new Target(3, 200, 15, "E", .12, 550);
const targetFour = new Target(4, 300, 20, "N", .12, 600);
const targetFive = new Target(5, 350, 10, "W", .12, 650);
const targetSix = new Target(6, 450, 5, "W", .10, 900);
const targetSeven = new Target(7, 700, 15, "E", .10, 2000);
const targetEight = new Target(8, 750, 20, "N", .10, 2100);
const targetNine = new Target(9, 900, 20, "E", .10, 3000);
const targetTen = new Target(10, 1000, 10, "W", .10, 4000);

const targetDeck = [
    targetOne, targetTwo, targetThree, targetFour,
    targetFive, targetSix, targetSeven, targetEight,
    targetNine, targetTen
];

// ----------------------------------------caching browser elements--------------------------------

const winLoseBtnEl = document.querySelector("#win-lose");

const tgtDistanceEl = document.querySelector("#tgt-distance");
const tgtWndSpdEl = document.querySelector("#wnd-spd");
const tgtWndDirEl = document.querySelector("#wnd-dir");
const tgtNumberEl = document.querySelector("#tgt-number")

const shooterElevationEl = document.querySelector("#elevation");
const shooterDirectionEl = document.querySelector("#direction");
const shooterMilWindageEl = document.querySelector("#mil-windage");

const fireBtnEl = document.querySelector("#fire-btn");

const ammoContainerEl = document.querySelector("#ammo-container")
const dopeContainerEl = document.querySelector("#dope-container")


// ---------------------------------------- Misc functions--------------------------------------------------------


function playShotSound() {
    const sound = new Audio("./assets/sniper-rifle-5989.mp3");
    sound.play()
    sound.volume = 0.1;
}

function playHitSound() {
    const sound = new Audio("./assets/steelcup-47888.mp3")
    setTimeout(() => {
        sound.play();
        sound.volume = 0.2
    }, currentTarget.delay);
}

function renderAmmo() {
    ammoContainerEl.textContent = `You have ${ammoRemaining} shots remaining`
    fireBtnEl.disabled = ammoRemaining === 0;
}


// ----------------------------------------Targeting section-------------------------------------------------

const firstTarget = peekTarget();          /* renders the first target on the GUI */
if (firstTarget) renderTgtInfo(firstTarget);


function peekTarget() {                       /* peekTarget sets the current target as the current target index */
    currentTarget = targetDeck[currentTargetIndex]
    return targetDeck[currentTargetIndex] ?? null;
}

function renderTgtInfo(target) {               /* renders target info for the user */
    tgtDistanceEl.textContent = `${target.distance} meters`
    tgtWndDirEl.textContent = target.windDir
    tgtWndSpdEl.textContent = `${target.windSpeed} mph`
    tgtNumberEl.textContent = target.tgtNumber
}

// ------------------------------------Elevation functions---------------------------------------------------------------

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


// ----------------------------------Wind functions--------------------------------------------------------------------------


function calculateWindageDir() {          /* links the raw wind directions to the correct wind direction calls from the user */

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


function calculateCorrectWindage() {   /* creates 3 wind brackets (<250, 250-749, >750) and assigns multipliers to each direction in the bracket for
                                        the correct wind call */
    spd = currentTarget.windSpeed

    if (currentTarget.distance < 250) {

        if (correctWindDir === "center") {
            correctTargetWindage = spd * 0

        } else if (correctWindDir === "right") {
            correctTargetWindage = spd * 2.5

        } else if (correctWindDir === "left") {
            correctTargetWindage = spd * -2.5
        } else {
            return null;
        }
    }

    if (currentTarget.distance >= 250 && currentTarget.distance < 750) {
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

    if (currentTarget.distance >= 750) {
        if (correctWindDir === "center") {
            correctTargetWindage = spd * 0

        } else if (correctWindDir === "right") {
            correctTargetWindage = spd * 7.5

        } else if (correctWindDir === "left") {
            correctTargetWindage = spd * -7.5

        } else {
            return null;
        }
    } return correctTargetWindage
}


function calculateShooterWindage() {         /* calculates the math from the shooter's windage input for use in comparing to the correct call*/
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


function checkWindage() {           /* compares the correct wind direction and windage to the shooter's inputs*/
    let shooterDir = (shooterDirectionEl.value)

    calculateWindageDir();
    calculateCorrectWindage();
    calculateShooterWindage();

    if (correctTargetWindage === calculateShooterWindage() && correctWindDir === shooterDir) {
        return true;
    } else {
        return false;
    }
};


// -----------------------------------------Render hit function-----------------------------------------



function renderHit(target) {
    const hitElevation = calculateHitElevation(target);
    const tgtDistance = target.distance;
    const windage = checkWindage(correctTargetWindage, shooterWindageMils, shooterDir)

    console.log(windage)
    console.log(hitElevation)

    const tolerance = tgtDistance * target.tolerance;

    const isHit = hitElevation >= tgtDistance - tolerance &&
        hitElevation <= tgtDistance + tolerance && windage;

    target.hit = isHit;

    console.log(isHit ? "Hit" : "Miss")

    if (target.hit === true) {
        playHitSound()
        return isHit;
    }
}

// -------------------------------Fire button click event----------------------------------------------------



fireBtnEl.addEventListener("click", () => {
    console.log("Shot Fired");
    const target = peekTarget();

    calculateWindageDir()
    const targetsWND = calculateCorrectWindage();
    const shooterWND = calculateShooterWindage();

    if (ammoRemaining <= 1) {         /* path when shooter s on their last shot */
        console.log("out of Ammo")
        playShotSound();
        ammoRemaining--;
        renderAmmo()
        setTimeout(() => {           /* renders the score 500 miliseconds after last target delay */
            renderScore();
        }, (target.delay + 500));

        return;
    }

    playShotSound()


    if (!target) {                          /* if no more targets, shooter made it to the end and is a winner */
        console.log("No more targets");
        winLoseBtnEl.style.visibility = "visible"
        winLoseBtnEl.textContent = "You Win!"
        return;
    }

    const hitElevation = calculateHitElevation(target);
    const isHit = renderHit(target);

    ammoRemaining--;
    renderAmmo()
    updateDope(target, isHit, hitElevation, shooterWND, targetsWND);

    if (isHit) {

        currentTargetIndex++;               /* moves to the next target if there is a hit */
        const nextTarget = peekTarget();
        if (nextTarget) {
            renderTgtInfo(nextTarget);

        } else {                   /* if a hit and no more targets, shooter made it to the end and is a winner */
            console.log("All targets completed")
            updateDope(target, isHit, hitElevation, shooterWND, targetsWND);
            ammoRemaining = 0;
            setTimeout(() => {
                winLoseBtnEl.style.visibility = "visible"
                winLoseBtnEl.textContent = "You Win!"
            }, (target.delay + 500));
            return;
        }
    }
});


// -------------------------------------DOPE functions--------------------------------------------------



function updateDope(currentTarget, isHit, hitElevation, shooterWindageMils, correctTargetWindage) {

    const li = document.createElement("li");
    dopeContainerEl.innerHTML = ""
    const elText = calcElDope(currentTarget, isHit, hitElevation)
    const windText = calcWindDope(shooterWindageMils, correctTargetWindage, isHit, correctWindDir, shooterDir)
    li.textContent = `${elText} | ${windText}`;
    dopeContainerEl.appendChild(li);
};

function calcElDope(currentTarget, isHit, hitElevation) {
    const elevationDiff = Math.round(hitElevation - currentTarget.distance);

    if (isHit) {
        if (elevationDiff === 0) {
            return "Hit, dead-center";
        } else if (elevationDiff > 0) {
            return `Hit, ${elevationDiff} inches high`;
        } else {
            return `Hit, ${Math.abs(elevationDiff)} inches low`;
        }
    } else {
        return `Miss, ${Math.abs(elevationDiff)}m ${elevationDiff > 0 ? "high" : "low"}`;
    }
};

function calcWindDope(shooterWindageMils, correctTargetWindage, isHit, correctWindDir, shooterDir) {
    const windDiff = Math.round(shooterWindageMils - correctTargetWindage)
    console.log(correctTargetWindage, shooterWindageMils);

    if (isHit) {
        if (windDiff === 0) {
            return "Good wind call";
        } else if (windDiff > 0) {
            return `Wind ${windDiff}mils right`
        } else {
            return `Wind: ${Math.abs(windDiff)}mils left`;
        }
    } else {
        if (windDiff === 0 && correctWindDir !== shooterDir) {
            return "Wind: perfect, but wrong windage direction";
        } else if (windDiff === 0 && correctWindDir === shooterDir) {
            return "Wind: perfect, but elevation is off";
        } else {
            return `Wind: off by ${Math.abs(windDiff)}mils ${windDiff > 0 ? "right" : "left"}`;
        }
    };
}

// --------------------------------Render score function--------------------------------------------


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
