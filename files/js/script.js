// let navBar = document.getElementById("navbar");
// navBar.style.opacity = '0';

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

if (window.innerWidth < window.innerHeight){
    alert("for a better experience, use landscape format");
    document.getElementById("apothegm").style.flexDirection = "reverse-column";
}

// const mapBg = {};
// const navEmote = {};

// const navBarOpacity = () => {
//     let navBar = document.getElementById("navbar");
//     let opacity = (window.pageYOffset / window.innerHeight);
//     navBar.style.backgroundColor = "rgba(245,245,245," + (((opacity > 1)?1:opacity).toString()) + ")";
//     navBar.style.top = window.pageYOffset.toString() + "px";
//     // console.log("rgba(245,245,245," + (((opacity > 1)?1:opacity).toString()) + ")");
// }
//
// const onScroll = (e) => {
//
//     if(document.getElementById("html-balisa").scrollTop < window.innerHeight){
//
//     }
//     navBarOpacity();
// }
// window.onscroll = onScroll;


// snhugow(snowPath);

// const setClassOpacity = (className, opacity) => {
//     for (let i in document.getElementsByClassName(className)) {
//         i.style.opacity = opacity + "%";
//     }
// }

const showClass = (className) => {
    let elements = document.getElementsByClassName(className);
    // console.log(className);
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

// const leaveMenu = () => {
//     hideClass("nav-bar-link");
// }

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
    // console.log(navBarShow);
}
document.getElementById("nav-bar").onclick = handleNavBarClick;
document.getElementById("nav-bar").onmouseover = onMenuHover;
document.getElementById("nav-bar").onmouseleave = () => {document.getElementById("nav-bar").style.backgroundImage = "url(\"../src/menu/neutral.png\")";};

const onCountryHover = (country) => {
    // console.log("hover");
    document.body.style.backgroundImage = "url(\"../src/" + country + ".png\")";
    document.getElementById("nav-bar").style.backgroundImage = "url(\"../src/menu/" + country + ".png\")";
}

const isIn = (mouse, country) => {
    return country.x < mouse.x &&
        mouse.x < (country.x + country.w) &&
        country.y < mouse.y &&
        mouse.y < (country.y + country.h);
};

const onCountryClick = (country) => {
    window.location.href = "../html/" + country + ".html";
};

const mapEvent = (e) => {
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
            if (e.type === "mousemove"){
                onCountryHover(i);
                countryPositions[i].wasIn = true;
            }else if (e.type === "click"){
                onCountryClick(i);
            }
        }else if(countryPositions[i].wasIn && e.type === "mousemove"){
            restBackground();
            countryPositions[i].wasIn = false;
        }
    }
}

document.getElementById("home-map").onclick = mapEvent;
document.getElementById("home-map").onmousemove = mapEvent;
document.getElementById("Canada-title").onclick = () => onCountryClick("Canada");
document.getElementById("India-title").onclick = () => onCountryClick("India");
document.getElementById("Malaysia-title").onclick = () => onCountryClick("Malaysia");

// const preload = () => {
//     let temp = [];
//     let counter = 0;
//     for(let i in countryPositions){
//         // console.log("hover");
//         mapBg[i] = new Image();
//         mapBg[i].src = "../src/" + i + ".png";
//
//         navEmote[i] = new Image();
//         navEmote[i].src = "../src/menu/" + i + ".png";
//     }
//     restBackground();
// }
//
// preload();
