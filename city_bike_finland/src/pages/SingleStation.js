import { CardContent, Typography, Stack } from '@mui/material'
import Card from '@mui/material/Card'
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function SingleStation() {

    const { id } = useParams();

    const { isPending, error, data } = useQuery({
        queryKey: ['getStation'],
        queryFn: () => fetch(`http://localhost:3001/stations/${id}`)
            .then(response => response.json())
    })

    if (isPending) return <div>Loading...</div>;
    
    if (error) return <div>Error retrieving single station data: {error.message}</div>;

    return (
        <>
            <Card>
                <CardContent>
                    <Stack justifyContent="center" alignItems="center" spacing={2}>
                        <Typography variant="h5">{data.station_name}</Typography>
                        <Typography variant="body1">{data.station_name}</Typography>
                        <Typography variant="body1">Total number of journeys starting from the station: {data.depart_count}</Typography>
                        <Typography variant="body1">Total number of journeys ending at the station: {data.return_count}</Typography>
                    </Stack>
                </CardContent>
            </Card>
        </>
    )
}