const FLAKE_NUMBER = 2;
const DELAY = {min:500, max:1000};
const SPEED = {min:10, max:30};
const SIZE = 40;
let count = 0;
const snowPath = "../src/snow.svg";

const randInt = (min, max) => {
    return Math.max(min, Math.floor(Math.random()*max));
}
const random = (min, max) => {
    return Math.max(min, (Math.random()*max));
}

const snhugow = (snowflake) => {
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
            // console.log(i, document.getElementById("html-balisa").scrollTop+window.innerHeight-20-SIZE);
            if (i < document.getElementById("html-balisa").scrollTop+window.innerHeight-20-SIZE){
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

document.getElementById("footerLogo").onclick = () => snhugow("../src/elephant.png");