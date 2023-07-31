import {CardContent, Typography,Stack } from '@mui/material'
import Card from '@mui/material/Card'


export default function SingleStation() {
    return (
        <>
            <Card>
                <CardContent>
                    <Stack justifyContent="center" alignItems="center" spacing={2}>
                        <Typography variant="h5">Station name</Typography>
                        <Typography variant="body1">Station address</Typography>
                        <Typography variant="body1">Total number of journeys starting from the station</Typography>
                        <Typography variant="body1">Total number of journeys ending at the station</Typography>
                    </Stack>
                </CardContent>
            </Card>
        </>
    )
}