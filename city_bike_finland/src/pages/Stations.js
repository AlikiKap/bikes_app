import { Stack } from '@mui/material';
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