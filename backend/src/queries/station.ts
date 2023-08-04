import {pool} from '../util/db';
import { Station } from './types';

export const getAllStations=(req: any, res: any) => {
  getStationsNamesWithId()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  }

  const getStationsNamesWithId = (): Promise<Station[]> => new Promise<Station[]>(function (resolve, reject) {
    pool.query(`SELECT station_id, station_name AS station_name FROM (
      SELECT departure_station_id AS station_id, departure_station_name AS station_name FROM journeys_05 
      UNION 
      SELECT return_station_id AS station_id, return_station_name AS station_name FROM journeys_05 
  ) AS unique_stations;`, (error: Error, results: any) => {
    if (error) 
      return reject(error)
    
      resolve(results.rows as Station[]);
    
  });
  });

//   const getStation = (req: any, res: any) => {

//     pool.query('SELECT  FROM journeys_05 where _id = $1 LIMIT 1', ).then(value => {

//         if (!value.rows.length) return res.status(204).send()
//         res.json(value.rows)

//     }).catch(reason => {
//         res.status(400).json({
//             name: reason.name,
//             message: reason.message
//         })
//     })

// }