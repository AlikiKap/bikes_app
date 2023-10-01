import { Button, FormControl, InputBase, Typography, Stack } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import Loading from '../components/Loading';

export default function UploadFile() {

  const mutation = useMutation({
    mutationFn: (formData) => fetch('http://localhost:3001/upload', {
      method: 'POST',
      body: formData,
    }).then(response => {
      if (response.status === 406) {
        throw new Error('Invalid file name');
      }
      else
        response.json()
    })
      .catch((err) => {
        throw new Error(err.message)
      }),
  })

  if (mutation.isPending) return (
    <Loading />
  )

  function uploadFile(event) {
    const file = document.getElementById('fileInput').files[0];
    const formData = new FormData()
    console.log(formData);
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
      <Stack
        justifyContent='center'
        alignItems='center'
        direction='column'
        spacing={2}
      >
        <FormControl id="fileUploadForm">
          <InputBase type="file" id="fileInput" name="file" />
          <Button variant='contained' type="button" id="uploadButton" onClick={(event) => uploadFile(event)}>Upload</Button>
        </FormControl>
        {mutation.isSuccess ? <Typography variant='h4'>New Data loaded</Typography> : null}
        {mutation.isError ? <Typography variant='h4'>{mutation.error?.message}</Typography> : null}
      </Stack>
    </>
  )
}