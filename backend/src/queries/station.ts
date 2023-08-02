import {pool} from '../util/db';
import { Station } from './types';

export const getAllStations=(req: any, res: any) => {
    getStations()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  }

  const getStations = (): Promise<string[]> => new Promise<string[]>(function (resolve, reject) {
    pool.query('SELECT station_name AS departure_or_return_station FROM (SELECT departure_station_name AS station_name FROM journeys_05 UNION SELECT return_station_name AS station_name FROM journeys_05 ) AS unique_stations;', (error: Error, results: any) => {
      if (error) 
        return reject(error);
  
      const stations: string[] = results.rows.map((row: any) => row.departure_or_return_station);
      resolve(stations);
    });
  });