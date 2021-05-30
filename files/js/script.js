let navBar = document.getElementById("navbar");
// navBar.style.opacity = '0';

const navBarOpacity = () => {
    let navBar = document.getElementById("navbar");
    let opacity = (window.pageYOffset / window.innerHeight);
    navBar.style.backgroundColor = "rgba(245,245,245," + (((opacity > 1)?1:opacity).toString()) + ")";
    navBar.style.top = window.pageYOffset.toString() + "px";
    // console.log("rgba(245,245,245," + (((opacity > 1)?1:opacity).toString()) + ")");
}

const onScroll = (e) => {

    if(document.getElementById("html-balisa").scrollTop < window.innerHeight){

    }
    navBarOpacity();
}
// window.onscroll = onScroll;

const FLAKE_NUMBER = 10;
const DELAY = {min:500, max:1000};
const SPEED = {min:3, max:10};
const SIZE = 15;
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
                document.getElementById("html-balisa").append(flake);
                flakeFall(flake, randInt(SPEED.min, SPEED.max), {
                    x:randInt(70, window.innerWidth-SIZE-70),
                    y:document.getElementById("html-balisa").scrollTop
                });
                initFall(i+1);
            }else{

                snhugow(snowPath);
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

// snhugow(snowPath);

const setClassOpacity = (className, opacity) => {
    for (let i in document.getElementsByClassName(className)) {
        i.style.opacity = opacity + "%";
    }
}

const showClass = (className) => {
    let elements = document.getElementsByClassName(className);
    console.log(className);
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.visibility = "visible";
    }
}

const hideClass = (className) => {
    let elements = document.getElementsByClassName(className);
    // console.log("hidding");
    for (let i = 0; i < elements.length; i++) {
        // console.log(elements[i]);
        elements[i].style.visibility = "hidden";
    }
}

const leaveMenu = () => {
    hideClass("nav-bar-link");
}

const restBackground = () => {
    document.body.style.backgroundImage = "url(\"../src/map.png\")";
    document.getElementById("nav-bar").style.backgroundImage = "url(\"../src/menu/neutral.png\")";
    // hideClass("nav-bar-link");
}

const onMenuHover = () => {
    document.getElementById("nav-bar").style.backgroundImage = "url(\"../src/menu/happy.png\")";
}

let navBarShow = false;
const handleNavBarClick = () => {
    if (navBarShow){
        document.getElementById("nav-bar").style.backgroundImage = "url(\"../src/menu/neutral.png\")";
        hideClass("nav-bar-link");
    }else{
        onMenuHover();
        showClass("nav-bar-link");
    }
    navBarShow = !navBarShow;
    console.log(navBarShow);
}
document.getElementById("nav-bar").onclick = handleNavBarClick;
document.getElementById("nav-bar").onmouseover = onMenuHover;
document.getElementById("nav-bar").onmouseleave = () => {document.getElementById("nav-bar").style.backgroundImage = "url(\"../src/menu/neutral.png\")";};

const onCountryHover = (country) => {
    console.log("hover");
    document.body.style.backgroundImage = "url(\"../src/" + country + ".png\")";
    document.getElementById("nav-bar").style.backgroundImage = "url(\"../src/menu/" + country + ".png\")";
}

const countryPositions = {
  Canada: {
      x: 8.6,
      y: 4.4,
      w: 22.7,
      h: 22.1,
      wasIn: false
  },
  India: {
      x: 69.9,
      y: 31.2,
      w: 9.4,
      h: 18.6,
      wasIn: false
  },
  Malaysia: {
      x: 81.4,
      y: 50.1,
      w: 6.5,
      h: 3.9,
      wasIn: false
  }
};

const isIn = (mouse, country) => {
    return country.x < mouse.x &&
        mouse.x < (country.x + country.w) &&
        country.y < mouse.y &&
        mouse.y < (country.y + country.h);
};

document.getElementById("home-map").onmousemove = (e) =>{
    let c = {
        w : window.innerWidth,
        h : window.innerHeight
    };
    let pos = {x: (e.clientX/c.w)*100, y: (e.clientY/c.h)*100};
    // console.log(c);
    // console.log(pos);

    for(let i in countryPositions){
        // console.log(countryPositions[i]);
        if(isIn(pos, countryPositions[i])){
            onCountryHover(i);
            countryPositions[i].wasIn = true;
        }else if(countryPositions[i].wasIn){
            restBackground();
            countryPositions[i].wasIn = false;
        }
    }
};

const onCountryClick = (country) => {
    window.location.href = "../html/" + country + ".html";
};

document.getElementById("Canada-box").onclick = () => onCountryClick("Canada");
document.getElementById("India-box").onclick = () => onCountryClick("India");
document.getElementById("Malaysia-box").onclick = () => onCountryClick("Malaysia");

