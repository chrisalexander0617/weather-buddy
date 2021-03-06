//doing this part will allow you to use react
import React from "react";
import Title from "./components/Title";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "62176eaf9daa9844314e0d26ed2c3375";
//creating a component that contains content to be used in index.js
class App extends React.Component {

  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=imperial&APPID=${API_KEY}`);
    
    const data = await api_call.json();

    if(city && country){
      
      console.log(data);

      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });

    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter city and country code"
      });

    }
  }
    render(){
      
      return (
      <div>

        <Title />

        <Form getWeather={this.getWeather} />

        <Weather 
        
        temperature = {this.state.temperature} 
        city = {this.state.city}
        country = {this.state.country}
        humidity = {this.state.humidity}
        description = {this.state.description}
        error = {this.state.error}
        />

      </div>
      );
    }
}
//exporting the component to be used globaly
export default App;
//import ReactDOM from "react-dom"
