const {Pool} = require('pg');
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'bikes',
  password: 'password',
  port: 5433,
})

const getJourneys = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM journeys_05 LIMIT 10', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const createJourney = (body) => {
  return new Promise(function(resolve, reject) {
    const { journey_departure,journey_return,departure_station_id,departure_station_name,return_station_id,return_station_name,covered_distance,duration} = body
    pool.query('INSERT INTO journeys_05 (departure,return,departure_station_id,departure_station_name,return_station_id,return_station_name,covered_distance,duration) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [journey_departure,journey_return,departure_station_id,departure_station_name,return_station_id,return_station_name,covered_distance,duration], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new journey has been added added: ${results.rows[0]}`)
    })
  })
}

const deleteJourney = () => {
  return new Promise(function(resolve, reject) {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM journeys_05 WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Journey deleted with ID: ${id}`)
    })
  })
}

module.exports = {
  getJourneys,
  createJourney,
  deleteJourney,
}
