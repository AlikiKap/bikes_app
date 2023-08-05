import { Card, CardActionArea, CardContent, Typography } from "@mui/material"
import { Link } from "react-router-dom"

export default function Station({ station }) {
    return (
        <>
            <Card>
                <CardActionArea component={Link} to={`/stations/${station.station_id}`}>
                    <CardContent>
                        <Typography>{station.station_name}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    )
}