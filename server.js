
const express = require('express')
const cors = require('cors');
const app = express()
const db = require('./queries')
const port = 3001
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 
}


app.use(cors(corsOptions));



app.get('/',(req, res) => {
  db.getJourneys()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})




app.post('/journeys', (req, res) => {
  db.createJourney(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.delete('/journeys/:id', (req, res) => {
  db.deleteJourney(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})