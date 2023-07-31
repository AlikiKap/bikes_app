import { Divider, Stack, Typography, Container } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import Station from "./Station";

export default function StationsItem() {
    const stations = [{ "name": "Näkinsilta" }, { "name": "Viiskulma" }, { "name": "Töölöntulli" }, { "name": "Koskelan varikko" }, { "name": "Laajalahden aukio" }, { "name": "Teljäntie" }];


    function sortAndGroupByFirstLetter(arr) {
        const sortedArray = arr.slice().sort((a, b) => a.name.localeCompare(b.name));
        const groupedByFirstLetter = {};

        for (const item of sortedArray) {
            const firstLetter = item.name.charAt(0).toUpperCase();
            if (!groupedByFirstLetter[firstLetter]) {
                groupedByFirstLetter[firstLetter] = [];
            }
            groupedByFirstLetter[firstLetter].push(item.name);
        }

        return groupedByFirstLetter;
    }


    const groupedItems = sortAndGroupByFirstLetter(stations);
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