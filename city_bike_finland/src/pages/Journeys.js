import React, { useEffect, useState } from 'react';
import Journey from '../components/Journey';
import { useQuery } from '@tanstack/react-query';
import { Stack } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { Grid } from '@mui/material';


export default function Journeys() {

  const [page, setPage] = React.useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 6;

  const { isPending, error, data } = useQuery({
    queryKey: ['getJourneys', page, itemsPerPage],
    queryFn: () => fetch("http://localhost:3001/")
      .then(response => response.json())
  })

  const onPageChanged = (event, value) => {
    setPage(value);
    setItemOffset((value * itemsPerPage) % data.length);
  };

  useEffect(() => {
    if (data instanceof Array) {
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(data.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(data.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, data]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error retrieving journey data: {error.message}</div>;
  }

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Stack spacing={2} paddingBottom={2}>
          {currentItems.map(journey => {
            return (
              <Journey journey={journey} />
            )
          })}

        </Stack>
        <Pagination count={pageCount} page={page} onChange={onPageChanged} />

        </Grid>
      
    </>
  );
}