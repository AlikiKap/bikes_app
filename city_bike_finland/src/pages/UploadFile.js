import { Button, FormControl, InputBase, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

export default function UploadFile() {

  const mutation = useMutation({
    mutationFn: (formData) => fetch('http://localhost:3001/upload', {
      method: 'POST',
      body: formData,
    }).then(response => response.json()),
  })

  if(mutation.isError) return <Typography variant='h4'>Error :(</Typography>

  if (mutation.isPending) return <Typography variant='h4'>Loading...</Typography>

  function uploadFile(event) {
    const file = document.getElementById('fileInput').files[0];
    const formData = new FormData() 

    if (!file) {
      alert('Please select a file to upload.')
      return;
    }
    
    formData.append('csv', file);

    event.preventDefault()

    mutation.mutate(formData)
  }

  return (
    <>
      <FormControl id="fileUploadForm">
        <InputBase type="file" id="fileInput" name="file" />
        <Button type="button" id="uploadButton" onClick={(event) => uploadFile(event)}>Upload</Button>
      </FormControl>
      {mutation.isSuccess ? <Typography variant='h4'>New Data loaded</Typography> : null}
    </>
  )
}