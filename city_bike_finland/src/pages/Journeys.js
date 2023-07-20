import React, { useEffect, useState } from 'react';
import Journey from '../components/Journey';
import Pagination from '../components/Pagination';
import { useQuery } from '@tanstack/react-query';


export default function Journeys() {


  const { isPending, error, data } = useQuery({
    queryKey: ['getJourneys'],
    queryFn: () => fetch("http://localhost:3001/")
      .then(response => response.json())
  })

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  console.log(`DATA: ${typeof data}`);
  console.log(`DATA: ${data}`);

  useEffect(() => {
    if (data instanceof Array) {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, data]);


  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error retrieving journey data: {error.message}</div>;
  }

  return (
    <>
      <div className="journeys">
        {currentItems.map(journey => {
          return (
            <Journey journey={journey} />
          )
        })}
      </div>
      <Pagination pageCount={pageCount} onPageChange={handlePageClick} />

    </>
  );
}