import { Card, CardContent, Typography } from "@mui/material"
export default function Station({station}){
    return(
        <>
        <Card>
            <CardContent>
                <Typography>{station}</Typography>
            </CardContent>
        </Card>
        </>
    )
}