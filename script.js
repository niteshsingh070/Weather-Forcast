//constant for api key
const apikey = '8337cfa9d3eee7b82da4ef38fe88c979';

//await with fetch

async function getWeather()
 {
    //...Literals and constant..//
    const city = document.getElementById('cityInput').value;
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`
;

    try
     {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error('HTTP error! Status: ${response.status}');    
        }
        const data = await response.json();
        displayWeather(data);
    }
    catch (error)
     {
        console.error('Failed to Fetch Weather data',error);
        alert('Failed to fetch Weather data.');
    }
}

function displayWeather(data) {
    const { main: {temp, humidity}, weather, wind: {speed}, sys: { country }, name } = data;
    const [{ main: weatherMain, description, icon }] = weather;

    const weatherDisplay = document.getElementById('weatherDisplay');
    
    if (data.cod !== 200) {
        // Use backticks for template literals in error message
        weatherDisplay.innerHTML = `<p>Error: ${data.message}</p>`;
        return; 
    }

    const weatherHTML = `
        <h2>Weather in ${name}, ${country}</h2>
        <p>Temperature: ${temp} °C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Weather: ${weatherMain} (${description})</p>
        <p>Wind: ${speed} m/s</p>
        <img src="https://openweathermap.org/img/w/${icon}.png" alt="Weather icon">
    `;

    // Display the HTML content in the weatherDisplay element
    weatherDisplay.innerHTML = weatherHTML;
}
