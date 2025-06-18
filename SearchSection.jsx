
const SearchSection = ({getWeatherDetails,searchInputRef}) => {

    const API_KEY = import.meta.env.VITE_API_KEY;

    const handleCitySearch=(e)=>{ 
        e.preventDefault();
        const searchInput=e.target.querySelector(".search-input");
        const API_URL=`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchInput.value}&days=2`;
        getWeatherDetails(API_URL); 
        
        window.innerWidth<=768&& searchInputRef.current.blur();

    };

    const handleLoactionSearch=()=>{
        navigator.geolocation.getCurrentPosition(
           ( position)=>{
            const {latitude ,longitude}=position.coords;
             const API_URL=`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=2`;
             getWeatherDetails(API_URL)
            },(
                alert("Location Access Denied..Please Enable Permissions To Use This Feature")
            )
        )
    }
  return (
    <div>
      < div className="search-section">
  <form action="#" className="search-form" onSubmit={handleCitySearch}>

    <input type="search" placeholder="Enter City Name"  className="search-input" ref={searchInputRef} required/>
   </form>
   <button className="location-button" onClick={handleLoactionSearch}>
<span className="material-symbols-rounded">
my_location
</span>  </button>
  </div> 
    </div>
  )
}

export default SearchSection
