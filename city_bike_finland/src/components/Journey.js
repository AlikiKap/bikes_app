import { Card,CardContent, Typography,Stack, useThemeProps } from '@mui/material'
import EastIcon from '@mui/icons-material/East';



export default function Journey({journey}){
    return(
        <Card key={journey.journey_id}>
          <CardContent>
            <Stack justifyContent="center" alignItems="center" direction="row" spacing={3}>
              <Stack spacing={1}>
              <Typography style={{ color: '#6d6d6d' }} variant="body1">{string2date(journey.departure)}</Typography>
              <Typography variant="body1">{journey.departure_station_name}</Typography>
              </Stack>
              <EastIcon style={{ color: '#007AC9' }}/>
              <Stack spacing={1}>
              <Typography style={{ color: '#6d6d6d' }} variant="body1">{string2date(journey.return)}</Typography>
              <Typography variant="body1">{journey.return_station_name}</Typography>
              </Stack>
              <Typography variant="body1">{journey.covered_distance / 1000} km</Typography>
              <Typography style={{ color: '#007AC9', fontWeight: 600 }} variant="body1">{seconds2time(journey.duration)} min</Typography>
            </Stack>
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