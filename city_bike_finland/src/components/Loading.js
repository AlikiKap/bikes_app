import React from 'react';
import { CircularProgress, Stack, Typography} from '@mui/material';

function Loading() {
    return (
        <>
            <Stack
                justifyContent="center"
                direction="column">
                <CircularProgress />
                <Typography variant='h4'>Loading...</Typography>

            </Stack>
        </>
    )
}

export default Loading