import { Stack } from '@mui/material';
import { Grid } from '@mui/material';
import Station from "../components/Station";

import StationsItem from '../components/StationsItem';

  

export default function Stations() {
    
    

    return (
            <Stack
                justifyContent="center"
                direction="column"
                paddingX="12%"
            >
                <StationsItem/>
            </Stack>
    )
}