// debugger
import { playList } from "./playList.js"
const belBtn = document.querySelector('.lang-bel')
const engBtn = document.querySelector('.lang-engl')
const ruBtn = document.querySelector('.lang-ru')
let nextQuote = 0;

function changeLanguage() {
    let language = "en";
    if (document.getElementById('en').checked) {
        language = "en";
    }
    if (document.getElementById('ru').checked) {
        language = "ru"
    }
    if (document.getElementById('bel').checked) {
        language = "bel"
    }
    return language;
}
engBtn.addEventListener('click', () => {
    greetingNode.innerText = showGreating();
    showQuotes();
});
belBtn.addEventListener('click', () => {
    greetingNode.innerText = showGreating();
    showQuotes();
});
ruBtn.addEventListener('click', () => {
    greetingNode.innerText = showGreating();
    showQuotes();
});

//WIDGET QUOTE OF THE DAY
const changeQuote = document.querySelector(".change-quote");
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');

function getQuotes() {
    let lang = changeLanguage();
    if (lang === "en") {
        return 'https://type.fit/api/quotes';
    } else if (lang === "ru") {
        return 'assets/data_ru.json';
    } else {
        return 'assets/data_bel.json';
    }
}
async function showQuotes() {
    let quotes = getQuotes();
    const res = await fetch(quotes);
    const data = await res.json();
    // let nextQuote = Math.floor(1 + Math.random() * (data.length + 1 - 1));
    // if (nextQuote >= data.length) {
    //     nextQuote = 0;
    // }
    // else
    //     nextQuote++;
    nextQuote = (nextQuote + 1) % data.length;
    //1 % 3 = 1; 4 % 3 = 1
    //2 % 3 = 2; 5 % 3 = 2
    //3 % 3 = 3; 6 % 3 = 3     
    console.log(data.length, nextQuote);
    quote.textContent = `${data[nextQuote].text}`;
    author.textContent = `${data[nextQuote].author}`;
}
window.addEventListener("load", showQuotes)
changeQuote.addEventListener("click", showQuotes)


// SETTING GREETING!
const greetingNode = document.querySelector(".greeting");
const englGreating = ["morning", "afternoon", "evening", "night"];
const belGreating = ["Добрай раніцы", "Добры дзень", "Добры вечар", "Дабранач"];
const ruGreating = ["Доброе утро", "Добрый день", "Добрый вечер", "Доброй ночи"];

function geTimeOfDay(par = 'engl') {
    const hours = new Date().getHours();
    let greating = (hours >= 6 && hours < 12) ? 0 :
        (hours >= 12 && hours < 18) ? 1 :
            (hours >= 18 && hours < 24) ? 2 :
                3
    return greating;
}
function showGreating() {
    if (changeLanguage() === "en") {
        return `Good ${englGreating[geTimeOfDay()]},`;
    } else if (changeLanguage() === "bel") {
        return belGreating[geTimeOfDay()]+ ",";
    } else return ruGreating[geTimeOfDay()] + ",";
}
greetingNode.innerText = showGreating();

// SETTING DATE & TIME
let timeNode = document.querySelector(".time");
function getCurrentTime() {
    const hours = new Date().getHours().toString().padStart(2, "0");
    const minutes = new Date().getMinutes().toString().padStart(2, "0");
    const sec = new Date().getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${sec}`;
}
setInterval(() =>
    timeNode.innerHTML = getCurrentTime(),
    1000
);
timeNode.innerText = getCurrentTime();

let dayTime = document.querySelector(".date");
function getCurrentDate() {
    const dayTitle = ['Monday', "Tuesday", "Wednesday", "Thursday", 'Friday', "Suturday", "Sunday"];
    const monthTitle = ["January", "February", 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const day = new Date().getDay(); //0-11;
    const date = new Date().getDate();
    const month = new Date().getMonth(); //0-11
    return `${dayTitle[day]}, ${monthTitle[month]} ${date}`
}
dayTime.innerText = getCurrentDate();

// RECORD USERMANE TO LOCALSTORAGE 
let nameNode = document.querySelector(".name");
function setNameToLocalStorage() {
    localStorage.setItem("name", nameNode.value);
}
window.addEventListener("beforeunload", setLocalStorage);
nameNode.addEventListener("change", setNameToLocalStorage);

function getNameFromLocalStorage() {
    if (localStorage.getItem('name')) {
        nameNode.value = localStorage.getItem('name');
    }
}
window.addEventListener('load', getNameFromLocalStorage)

// BACKGROUND SLIDER
let randomNum = 0;
function getRandomNum(randomNum) {
    randomNum = Math.floor(1 + Math.random() * (20 + 1 - 1));
    return randomNum;
}
let slideNext = document.querySelector(".slide-next");
let slidePrev = document.querySelector(".slide-prev");

function changeBgNext() {
    // let = getRandomNum();
    const url = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${englGreating[geTimeOfDay()]}/${getRandomNum().toString().padStart(2, "0")}.jpg`;

    const newImg = new Image();
    newImg.src = url;
    newImg.onload = () => {
        document.body.style.backgroundImage = 'url("' + url + '")';
        localStorage.setItem("url", url);
    };
}
slideNext.addEventListener('click', changeBgNext);
slidePrev.addEventListener('click', changeBgNext);

// function changeBgBack() {
// const url = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getDayTime()}/${getRandomNum().toString().padStart(2, "0")}.jpg`;
// const newImg = new Image();
// if (localStorage.getItem('url')) {
//     newImg.value = localStorage.getItem('url');
// }
//    newImg.onload = () => {
//      document.body.style.backgroundImage = 'url("' + url + '")';
//    };
// }

// RECORD CITY TO LOCALSTORAGE 
let cityNode = document.querySelector(".city");
function setLocalStorage() {
    localStorage.setItem("city", cityNode.value);
}
window.addEventListener("beforeunload", setLocalStorage);
cityNode.addEventListener("change", setLocalStorage);

function getLocalStorage() {
    if (localStorage.getItem('city')) {
        cityNode.value = localStorage.getItem('city');
    }
}
window.addEventListener('load', getLocalStorage)

// WEATHER WIDGET
const weatherIconNode = document.querySelector(".weather-icon");
const temperatureNode = document.querySelector(".temperature");
const windNode = document.querySelector(".wind");
// const weatherNode = document.querySelector("");
const humidityNode = document.querySelector(".humidity");
const weatherDescriptionNode = document.querySelector(".weather-description");
let town = 'Minsk';

// function setCity(event) {
//     if (event.code === "Enter") {
//         getWeather();
//         // city.blur();
//         console.log(city);
//     }
// }
// cityNode.onchange = (event) => {
//     // console.log(cityNode);
//     const { value } = event.target;
//     localStorage.getItem('city') = value;
//     // town.blur();
//     getWeather();
//     console.log(town);
// };
function getUrl() {
    // debugger
    const api = 'c2bcabfcc8f4b7b9bfd81db6d62ad535';
    if (localStorage.getItem('city') === 'undefined') {
        town = 'Minsk';
    } else town = localStorage.getItem('city');
    return `https://api.openweathermap.org/data/2.5/weather?q=${town}&lang=en&appid=${api}&units=metric`;
}

function getWeather() {
    fetch(getUrl())
        .then((response) => {
            return response.json();
            // console.log(data);
        }).then((data) => {
            // console.log(data);
            weatherIconNode.className = "weather-icon owf";
            weatherIconNode.classList.add(`owf-${data.weather[0].id}`);
            temperatureNode.textContent = `${Math.floor(data.main.temp)}°C`;
            weatherDescriptionNode.textContent = data.weather[0].description;
            windNode.textContent = `Wind speed: ${data.wind.speed} m/s`;
            humidityNode.textContent = `Humidity: ${data.main.humidity}%`;
            // } catch (e) {
            //     console.log('error');
            // }
        })
}
window.addEventListener('load', getWeather);
cityNode.addEventListener('change', getWeather);
// cityNode.addEventListener('keypress', setCity);

// WIDGET AUDIO-PLAYER
const playListContainer = document.querySelector('.play-list');
const playNext = document.querySelector('.play-next');
const playPrev = document.querySelector('.play-prev');
const playBtn = document.querySelector(".play");
const audio = new Audio();

playList.forEach(item => {
    const li = document.createElement('li');
    li.classList.add("play-item")
    li.textContent = item.title
    playListContainer.append(li)
    // item.addEventListener("click", playAudio);
})
playListContainer.addEventListener("click", playList);

function toggleBtn() {
    playBtn.classList.toggle("pause");
}
playBtn.addEventListener("click", toggleBtn);

let isPlay = false;
let playNum = 0;
function playAudio() {
    // audio.src = "./assets/sounds/Aqua Caelestis.mp3";
    audio.src = playList[playNum].src
    if (!isPlay) {
        audio.play();
        isPlay = true;
    } else {
        audio.pause();
        isPlay = false;
    }
}
playBtn.addEventListener('click', playAudio);

function playNextSong() {
    // debugger
    if (playNum >= (playList.length - 1)) {
        playNum = -1;
    }
    playNum++;
    isPlay = false;
    // playBtn.classList.remove(pause);
    playAudio();
    console.log(playNum, playList[playNum]);
}
function playPrevSong() {
    if (playNum <= 0) {
        playNum = 1;
    } else {
        playNum--;
        console.log(playNum, playList[playNum]);
        isPlay = false;
        playAudio();
    }
}
playPrev.addEventListener('click', playPrevSong);
playNext.addEventListener('click', playNextSong);


       