import { pool } from '../util/db';
import Papa from 'papaparse';
import { Journey } from './types';

export const uploadData = async (req:any,res:any) => {
    
    try {
        const {table_name} = req.query;
      const fileBuffer = req.file.buffer.toString();
      const { data } = Papa.parse(fileBuffer, { header: true });
      
      const filteredData: Journey[] = data.filter((journey:any) => 
        journey['Duration (sec.)'] > 10 && journey['Covered distance (m)'] > 10
      ).map((journey:any) => ({
        journey_departure: journey.Departure,
        journey_return: journey.Return,
        departure_station_id: parseInt(journey['Departure station id']),
        departure_station_name: journey['Departure station name'],
        return_station_id: parseInt(journey['Return station id']),
        return_station_name: journey['Return station name'],
        covered_distance: parseInt(journey['Covered distance (m)']),
        duration: parseInt(journey['Duration (sec.)']),
      }));
  
      console.log(`After filter left data ${filteredData.length} from ${data.length}`);
      
      const client = await pool.connect();
      
      await client.query('BEGIN');
      try {

        for (const journey of filteredData) {
            await client.query(
                `
                CREATE TABLE ${table_name} (
                    journey_departure        TEXT,
                    journey_return           TEXT,
                    departure_station_id     INTEGER,
                    departure_station_name   TEXT,
                    return_station_id        INTEGER,
                    return_station_name      TEXT,
                    covered_distance         NUMERIC,
                    duration                 NUMERIC
                  );
                `
            );
          await client.query(
            'INSERT INTO journeys (journey_departure, journey_return, departure_station_id, departure_station_name, return_station_id, return_station_name, covered_distance, duration) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [
              journey.journey_departure,
              journey.journey_return,
              journey.departure_station_id,
              journey.departure_station_name,
              journey.return_station_id,
              journey.return_station_name,
              journey.covered_distance,
              journey.duration,
            ]
          );
        }
        await client.query('COMMIT');
        res.status(201).send('Data uploaded successfully.');
      } catch (err) {
        await client.query('ROLLBACK');
        throw err;
      } finally {
        client.release();
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred.');
    }
  };