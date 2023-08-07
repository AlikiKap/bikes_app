import { useQuery } from '@tanstack/react-query';
import { Button } from "@mui/material";

export default function UploadFile(){

  //   const { isPending, error, data } = useQuery({
  //       queryKey: ['uploadData', table_name],
  //       queryFn: () => fetch(`http://localhost:3001/upload?table_name=${table_name}`)
  //         .then(response => response.json())
  //     })
  //     if (isPending) return <div>Loading...</div>;

  // if (error) return <div>Error retrieving journey data: {error.message}</div>;


    return(
        <>
        <Button variant="contained" component="label" color="primary">
        Upload
        <input type="file" hidden />
      </Button>
        </>
    )
}