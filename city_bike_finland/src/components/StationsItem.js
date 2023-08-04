import { Divider, Stack, Typography, Container } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import Station from "./Station";
import { useQuery } from '@tanstack/react-query';

export default function StationsItem() {

    const { isPending, error, data } = useQuery({
        queryKey: ['getJourneys'],
        queryFn: () => fetch("http://localhost:3001/stations")
          .then(response => response.json())
      })
      
      if (isPending) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error retrieving journey data: {error.message}</div>;
      }

    function sortAndGroupByFirstLetter(arr) {
        const sortedArray = arr.slice().sort((a, b) => a.station_name.localeCompare(b.station_name));
        const groupedByFirstLetter = {};

        for (const item of sortedArray) {
            const firstLetter = item.station_name.charAt(0).toUpperCase();
            if (!groupedByFirstLetter[firstLetter]) {
                groupedByFirstLetter[firstLetter] = [];
            }
            groupedByFirstLetter[firstLetter].push(item);
        }

        return groupedByFirstLetter;
    }


    const groupedItems = sortAndGroupByFirstLetter(Object.values(data));
    console.log(groupedItems);

    return (
        <>
            {Object.entries(groupedItems).map(([letter, stationsArray]) => {
                return (
                    <>
                        <Typography color="#007AC9" fontWeight={600}>{letter}</Typography>
                        <Divider variant="fullWidth" textAlign="left"/>
                        <Grid container paddingY={2} spacing={2}>
                            {stationsArray.map(station =>
                                <Grid>
                                    <Station station={station} />
                                </Grid>
                            )}
                        </Grid>
                    </>
                )
            })}
        </>
    )
}