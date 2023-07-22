import { CardContent, Typography } from '@mui/material'
import Card from '@mui/material/Card'

export default function Journey({journey}){
    return(
        <Card key={journey.journey_id} sx={{minWidth: 275}}>
          <CardContent>
            <Typography variant="body1">Departure: {string2date(journey.departure)}</Typography>
            <Typography variant="body1">Return: {string2date(journey.return)}</Typography>
            <Typography variant="body1">Departure Station ID: {journey.departure_station_id}</Typography>
            <Typography variant="body1">Departure Station Name: {journey.departure_station_name}</Typography>
            <Typography variant="body1">Return Station ID: {journey.return_station_id}</Typography>
            <Typography variant="body1">Return Station Name: {journey.return_station_name}</Typography>
            <Typography variant="body1">Covered Distance: {journey.covered_distance / 1000} km</Typography>
            <Typography variant="body1">Duration: {seconds2time(journey.duration)} min</Typography>
          </CardContent>
      </Card>
    )
}

function seconds2time(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    
  return `${formattedMinutes}:${formattedSeconds}`;
}
function string2date(inputDateString){

const dateObject = new Date(inputDateString);

const day = dateObject.getUTCDate().toString().padStart(2, "0");
const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, "0"); 
const year = dateObject.getUTCFullYear();

const hours = dateObject.getUTCHours().toString().padStart(2, "0");
const minutes = dateObject.getUTCMinutes().toString().padStart(2, "0");

const formattedDate = `${day}/${month}/${year}`;
const formattedTime = `${hours}:${minutes}`;

return(`${formattedTime}, ${formattedDate}`);
}