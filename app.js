//Select elements
let notifElement = document.querySelector(".notification")
let iconElement = document.querySelector(".weather-icon")
let tempElement = document.querySelector(".temperature-value p")
let descElement = document.querySelector(".temperature-description p")
let locationElement = document.querySelector(".location p")

//app data

const weather = {

    // temperature: {
    //     value : 18,
    //     unit : "celcius"
    // },

    // description : "few clouds",
    // iconId: "01d",
    // city:"London",
    // country:"GB" 
 
    //getting these through api
};

weather.temperature = {
    unit: "celsius"
}

//constants
const Kelvin = 273;

//api key
const key = "82005d27a116c2880c8f0fcb866998a0"

//checking if browser supports geolocation 
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, ShowError);
}
else {
    // notifElement.style.display = "block";
    // notifElement.innerHTML = "<p>Doesn't support</p>"
    notifElement.innerHTML = "Doesn't support"
}


//set user's position

function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

//Show error func if any issue w the geolocation
function ShowError(error) {
    notifElement.style.display = "block";
    notifElement.innerHTML = `<p> ${error.message} </p>` //backtick used for template 
}


//getWeather from api
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    // console.log(api);

    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - Kelvin);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });

}

//display weather
function displayWeather(){
    iconElement.innerHTML = `<img src = "icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span> C </span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// temp conversion
function CtoF(temperature) {
    return (temperature * 9/5) + 32;
}

//what happens when clicked on the temp element
tempElement.addEventListener("click" , function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit === "celsius"){
        let fahrenheit = CtoF(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span> F</span>`;
        weather.temperature.unit = "fahrenheit";
    }
    else{
        tempElement.innerHTML = `${weather.temperature.value}°<span> C </span>`;
        weather.temperature.unit = "celsius";
        
    }
});
