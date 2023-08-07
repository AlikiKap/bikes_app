import { pool } from '../util/db';
import { SingleStation, Station } from './types';

export const getStationsNamesWithId = (): Promise<Station[]> => new Promise<Station[]>(function (resolve, reject) {
  pool.query(`SELECT station_id, station_name AS station_name FROM (
      SELECT departure_station_id AS station_id, departure_station_name AS station_name FROM journeys 
      UNION 
      SELECT return_station_id AS station_id, return_station_name AS station_name FROM journeys 
  ) AS unique_stations;`, (error: Error, results: any) => {
    if (error)
      return reject(error)
    resolve(results.rows as Station[]);

  });
});

export const getStation = (id: number): Promise<SingleStation> => new Promise<SingleStation>(function (resolve, reject) {
  pool.query(`WITH StationCounts AS (
    SELECT
        COUNT(CASE WHEN departure_station_id = $1 THEN 1 END) AS depart_count,
        COUNT(CASE WHEN return_station_id = $1 THEN 1 END) AS return_count,
        COALESCE(
            (SELECT departure_station_name FROM journeys WHERE departure_station_id = $1 LIMIT 1),
            (SELECT return_station_name FROM journeys WHERE return_station_id = $1 LIMIT 1)
        ) AS station_name
    FROM
        journeys
    WHERE
    $1 IN (departure_station_id, return_station_id) limit 1
)
SELECT
    station_name,
    depart_count,
    return_count
FROM
    StationCounts limit 1;`, [id], (error: Error, results: any) => {
    if (error)
      return reject(error)
    resolve(results.rows[0] as SingleStation);
  });
});