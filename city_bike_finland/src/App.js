import React, {useState, useEffect} from 'react';
import axios from 'axios';
function App() {
    const [journeys, setJourneys] = useState([]);

    useEffect(() => {
      getJourney();
    }, []);

    const getJourney = async () => {
      try {
        // Make an HTTP GET request to retrieve the journey data
        const response = await axios.get('http://localhost:3001');
        setJourneys(response.data);
      } catch (error) {
        console.error('Error retrieving journey data:', error);
      }
    };

  /*function createJourneys() {
    let journey_departure = prompt('Enter journey name');
    let journey_return = prompt('Enter journey name');
    let departure_station_id = prompt('Enter journey name');
    let departure_station_name = prompt('Enter journey name');
    let return_station_id = prompt('Enter journey name');
    let return_station_name = prompt('Enter journey name');
    let covered_distance = prompt('Enter journey name');
    let duration = prompt('Enter journey name');

    fetch('http://localhost:3000/journey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({journey_departure,journey_return,departure_station_id,departure_station_name,return_station_id,return_station_name,covered_distance,duration}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getJourney();
      });
  }*/
  /*function deleteJourneys() {
    let id = prompt('Enter journey id');
    fetch(`http://localhost:3000/journey/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        
        return response.text();
      })
      .then(data => {
        alert(data);
        getJourney();
      });
  }
  
  
        {journeys.map(journey => (
        <div key={journey.journey_id}>
          <p>journey_id: {journey.journey_id}</p>
          <p>departure: {journey.departure}</p>
          <p>return: {journey.return}</p>
          <p>departure_station_id: {journey.departure_station_id}</p>
          <p>departure_station_name: {journey.departure_station_name}</p>
          <p>return_station_id: {journey.return_station_id}</p>
          <p>return_station_name: {journey.return_station_name}</p>
          <p>covered_distance: {journey.covered_distance}</p>
          <p>duration: {journey.duration}</p>
        </div>
      ))}*/
  return (
    <div>
      <h1>Journey List</h1>
    {journeys}
    </div>
  );
}
export default App;