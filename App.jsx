import CurrentWeather from "./components/CurrentWeather"
import HourlyWeatherItem from "./components/HourlyWeatherItem"
import SearchSection from "./components/SearchSection"
import { useEffect, useRef, useState } from "react";
import { weatherCodes } from "./constants"
import NoResultsDiv from "./components/NoResultsDiv"

const App = () => {

  const[currentWeather,setCurrentWeather]=useState({});
  const[hourlyForecasts,setHourlyForecasts]=useState([]);
  const [hasNoResults,setHasNoResults]=useState(false);
  const searchInputRef = useRef(null);
  const API_KEY=import.meta.env.VITE_API_KEY;
  const filterHourlyForecast =(hourlyData)=>{
    const currentHour=new Date().setMinutes(0,0,0);
    const next24Hours=currentHour+24 *60*60*1000;

    const next24HoursData=hourlyData.filter(({time})=>{
      const forecastTime=new Date(time).getTime();
      return forecastTime>=currentHour && forecastTime <=next24Hours;
    });
    setHourlyForecasts(next24HoursData);
    
  };

  const getWeatherDetails = async (API_URL)=>{
    setHasNoResults(false);
    try{
      const response=await fetch(API_URL);
      if(!response.ok) throw new Error();
      window.innerWidth<=768&& searchInputRef.current.blur();


      const data=await response.json();
      const temperature=data.current.temp_c;
      const description=data.current.condition.text;
     const weatherIcon=Object.keys(weatherCodes).find(icon=>weatherCodes[icon].includes(data.current.condition.code));
      setCurrentWeather({temperature,description,weatherIcon});
     const combineHourlyData=[...data.forecast.forecastday[0].hour,...data.forecast.forecastday[1].hour]
     
     searchInputRef.current.value=data.location.name;
     filterHourlyForecast(combineHourlyData);    
    }catch {
      setHasNoResults(true);
      
    }
  }

  useEffect(()=>{
    const defaultCity="Hyderabad";
     const API_URL=`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${defaultCity}&days=2`;
     getWeatherDetails(API_URL); 
  },[]);

  return (<div>
    <div className="container">
  <SearchSection getWeatherDetails={getWeatherDetails} searchInputRef={searchInputRef}/>
  
  {hasNoResults ? (
    <NoResultsDiv/>
  ):(
    <div className="weather-section">
  <CurrentWeather currentWeather={currentWeather}/>
    <div className="hourly-forecast">
      <ul className="weather-list">
        {hourlyForecasts.map(hourlyWeather =>(<HourlyWeatherItem key={hourlyWeather.time_epoch} hourlyWeather={hourlyWeather}/>))}
        </ul>
        </div>
        </div>
  )}
        
      
  </div>
  <div>
  <div class="page-wrapper">
  <div class="container">
  </div>
  <footer class="footer">
    <p>Grandhi Murali</p>
    <p>Email: gamersidp222@gmail.com</p>
    <p>Contact: +91-7674944967</p>
    <p>@-All Rights Are Reserved</p>
  </footer>
</div>

  </div>
  </div>
  
  )
}

export default App
