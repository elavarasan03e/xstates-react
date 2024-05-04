import './App.css';
import { useState,useEffect } from 'react';

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    fetchCountries();
  }, []);

 const fetchCountries = () => {
    fetch('https://crio-location-selector.onrender.com/countries')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        return response.json();
      })
      .then(data => setCountries(data))
      .catch(error => setError(error.message));
  }

  const fetchStates = (country) => {
    fetch(`https://crio-location-selector.onrender.com/country=${country}/states`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch states');
        }
        return response.json();
      })
      .then(data => setStates(data))
      .catch(error => setError(error.message));
  }

  const fetchCities = (country, state) => {
    fetch(`https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch cities');
        }
        return response.json();
      })
      .then(data => setCities(data))
      .catch(error => setError(error.message));
  }


  const handleCountryChange = (event) => {
    const country = event.target.value;
    setSelectedCountry(country);
    setSelectedState('');
    setSelectedCity('');
    fetchStates(country);
  }

  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    setSelectedCity('');
    fetchCities(selectedCountry, state);
  }

  const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);
  }

  return (
    <div className='container'>
      
        <h1>Select Location</h1>

        <select value={selectedCountry} onChange={handleCountryChange}>
          <option value="">Select Country</option>
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      
      
        
        <select value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
          <option value="">Select State</option>
          {states.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      
      
        
        <select value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
          <option value="">Select City</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      
      {selectedCity && (
        <p><b>You selected {selectedCity},</b> {selectedState}, {selectedCountry}</p>
      )}
    </div>
  );
}

export default App;
