import React from 'react'
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
  } from '@tanstack/react-query';
  import axios from 'axios';
function Journey() {
    
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['journeys'],
    queryFn: () =>
      axios
        .get('http://localhost:3001/')
        .then((res) => res.data),

  })

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error retrieving journey data: {error.message}</div>;
  }
return (
    <div>
    {data.map((journey) => (
    <div key={journey.journey_id}>
        <p>Departure: {journey.departure}</p>
        <p>Return: {journey.return}</p>
        <p>Departure Station ID: {journey.departure_station_id}</p>
        <p>Departure Station Name: {journey.departure_station_name}</p>
        <p>Return Station ID: {journey.return_station_id}</p>
        <p>Return Station Name: {journey.return_station_name}</p>
        <p>Covered Distance: {journey.covered_distance}</p>
        <p>Duration: {journey.duration}</p>
    </div>
    ))}
</div>
)
}

export default Journey