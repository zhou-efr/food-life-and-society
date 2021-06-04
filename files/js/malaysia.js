const FLAKE_NUMBER = 10;
const DELAY = {min:500, max:1000};
const SPEED = {min:3, max:10};
const SIZE = 30;
let count = 0;
// const snowPath = "../src/snow.svg";

const randInt = (min, max) => {
    return Math.max(min, Math.floor(Math.random()*max));
}
const random = (min, max) => {
    return Math.max(min, (Math.random()*max));
}

const snhugow = (snowflake) => {
    console.log("launched");
    const initFall = (i) => {
        setTimeout(() => {
            if (i < FLAKE_NUMBER){
                let flake = new Image(SIZE, SIZE);
                flake.src = snowflake;
                flake.style.position = "absolute";
                flake.style.top = "0px";
                document.getElementById("html-balisa").append(flake);
                flakeFall(flake, randInt(SPEED.min, SPEED.max), {
                    x:randInt(70, window.innerWidth-SIZE-70),
                    y:document.getElementById("html-balisa").scrollTop
                });
                initFall(i+1);
            }else{

                snhugow(snowflake);
            }
        }, randInt(SPEED.min, SPEED.max))
    }
    initFall(0);
}

const flakeFall = (picture, speed, start) => {
    picture.style.left = start.x + "px";
    const fall = (picture, i, speed, x_origin, x, amplitude) => {
        setTimeout(() => {
            if (i < document.getElementById("html-balisa").scrollTop+window.innerHeight-20){
                picture.style.top = i + "px";
                picture.style.left = x_origin + Math.sin(x)*amplitude + "px";
                fall(picture, i + speed, speed, x_origin,x+0.1, amplitude);
            }else{
                picture.remove();
            }
        }, 10);
    }
    fall(picture, start.y, speed, start.x, 0, random(10, 40));
}

snhugow("../src/leaf.svg");

// for (let i in document.getElementById("contents").children){
//     document.getElementById("contents").children[i].style.flexDirection = randInt(0,1)?"row":"reverse-row";
// }
