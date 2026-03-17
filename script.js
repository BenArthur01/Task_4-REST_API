// REST API + Debounced Search

const searchInput = document.getElementById("searchInput");
const weatherResult = document.getElementById("weatherResult");
const loading = document.getElementById("loading");
const error = document.getElementById("error");


const API_KEY = "c1518371d6e632e17dec3ac9e0b23617";

// Debounce function
function debounce(func, delay){
    let timeout;
    return function(){
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), delay);
    };
}

// Fetch weather data
async function getWeather(city){

    weatherResult.innerHTML = "";
    error.textContent = "";
    loading.classList.remove("hidden");

    try{

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if(!response.ok){
            throw new Error("City not found")
        }

        const data = await response.json();

        weatherResult.innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperature:${data.main.temp} °C </p>
        <p>Weather: ${data.weather[0].description}</p>
        `;

    } catch(error){
        error.textContent = error.message;
    } finally{
        loading.classList.add("hidden");
    }
}

// Debounced search
const debouncedSearch = debounce(function(){
    const city = searchInput.value.trim();

    if(city.length > 2){
        getWeather(city);
    }
}, 500);

searchInput.addEventListener("input", debouncedSearch);