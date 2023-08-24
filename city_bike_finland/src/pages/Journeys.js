import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Stack } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { Grid } from '@mui/material';
import Journey from '../components/Journey'
import Loading from '../components/Loading';

export default function Journeys() {

  const [page, setPage] = React.useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const { isPending, error, data } = useQuery({
    queryKey: ['getJourneys', page],
    queryFn: () => fetch(`http://localhost:3001/journeys?page=${page}`)
      .then(response => response.json())
  })

  useEffect(() => {
    if (data !== undefined && data.rows instanceof Array) {
      setCurrentItems(data.rows);
      setPageCount(data.totalPages);
    }
  }, [data]);

  if (isPending) return(
    <Loading/>
  )

  if (error) return <div>Error retrieving journey data: {error.message}</div>;

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        paddingBottom={2}
      >
        <Stack spacing={2} paddingBottom={2}>
          {currentItems.map(journey => <Journey journey={journey} />)}
        </Stack>
        <Pagination count={pageCount} page={page} onChange={(_, value) => setPage(value)}/>
      </Grid>
    </>
  );
}