export default function Journey({journey}){
    return(
        <div key={journey.journey_id} style={{
          border: "solid",
          margin: "1rem"
        }}>
        <p>Departure: {journey.departure}</p>
        <p>Return: {journey.return}</p>
        <p>Departure Station ID: {journey.departure_station_id}</p>
        <p>Departure Station Name: {journey.departure_station_name}</p>
        <p>Return Station ID: {journey.return_station_id}</p>
        <p>Return Station Name: {journey.return_station_name}</p>
        <p>Covered Distance: {journey.covered_distance}</p>
        <p>Duration: {journey.duration}</p>
      </div>
    )
}