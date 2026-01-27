const nappi = document.getElementById("klikattava");
const resetNappi = document.getElementById("resetNappi");
const powerUpHintaNaytto = document.getElementById("powerUpHinta");
const pisteNaytto = document.getElementById("pisteet");
const powerUpNappi = document.querySelector("#powerUpNappi");
const button = document.querySelector("#klikattava");
const powerSound = document.getElementById("powerSound");
const resetSound = document.getElementById("resetSound");
// const clickSound = document.getElementById("clickSound");
const powerUpKerroin = document.getElementById("klikkausVoima");
const LOOP_START = 0;
const bgMusic = new Audio("sounds/bgmusic.mp3");


let pisteet = 0;
let klikkausVoima = 0;
let powerUpHinta = 50;

function lisaaPiste() {
    const kerroin = klikkausVoima * 2;
    pisteet += 1 + kerroin;
    paivitaNakyma();
}

function paivitaNakyma() {
    pisteNaytto.textContent = pisteet;
    powerUpHintaNaytto.textContent = powerUpHinta;
    powerUpKerroin.textContent = klikkausVoima === 0 ? 1 : klikkausVoima * 2;
}

function lisaaPisteAutomaattisesti() {
    pisteet = pisteet + 1;
    paivitaNakyma();
}

function playClickSound() {
    const clickSound = new Audio("sounds/click.wav");
    clickSound.currentTime = 0.2;
    clickSound.play();
}

function playPowerSound() {
    if (pisteet >= 50) {    // Äänimerkki kuuluu vasta kun pisteitä 50 tai yli
        powerSound.currentTime = 0; // Mistä kohtaa äänitiedostoa efektiä toistetaan
        powerSound.play();
    }
}

function playBgMusic() {
    bgMusic.volume = 0.3;
    bgMusic.play();
}

function playResetSound() {
    resetSound.currentTime = 0.1;
    resetSound.play();
}

setInterval(lisaaPisteAutomaattisesti, 1000);

nappi.addEventListener("click", lisaaPiste);

button.addEventListener("click", () => {
    button.classList.remove("bounce");
    void button.offsetWidth; 
    button.classList.add("bounce");
});

button.addEventListener("click", () => {
    playBgMusic();
}, { once: true 
    
});


button.addEventListener("click", () => {
    playClickSound();
});

bgMusic.addEventListener("ended", () => {
    bgMusic.currentTime = LOOP_START;
    bgMusic.play();
});

powerUpNappi.addEventListener("click", () => {
    playPowerSound();
});

resetNappi.addEventListener("click", () => {
    playResetSound();
});

powerUpNappi.addEventListener("click", function () {
    if (pisteet >= powerUpHinta) {
        pisteet = pisteet - powerUpHinta;
        klikkausVoima = klikkausVoima + 1;
        powerUpHinta = powerUpHinta * 2;
        paivitaNakyma();
        console.log("Power Up ostettu, voima:", klikkausVoima);
    } else {
        console.log("Ei tarpeeksi pisteitä");
    }
});

resetNappi.addEventListener("click", function () {
    pisteet = 0;
    klikkausVoima = 0;
    powerUpHinta = 50;
    paivitaNakyma();
    console.log("Pisteet nollattu");
});