import { pool } from '../util/db';
import Papa from 'papaparse';
import { Journey } from './types';
import format from 'pg-format';

export const uploadData = async (req: any, res: any) => {
  try {
    const fileBuffer = req.file.buffer.toString();
    const { data } = Papa.parse(fileBuffer, { header: true });
    const filteredData: Journey[] = data.filter((journey: any) =>
      journey['Duration (sec.)'] > 10 && journey['Covered distance (m)'] > 10
    ).map((journey: any) => ({
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

    const fileName = req.file.originalname.replace('.csv', '').toLowerCase()

    const fileNameRegex = /^[A-Za-z][A-Za-z0-9_$#]{0,127}$/;

    if (fileNameRegex.test(fileName)) {

      await client.query('BEGIN');
      try {
        await client.query(
          `
            DROP TABLE IF EXISTS ${fileName};
            CREATE TABLE ${fileName} (
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
        )
  
        const insertQuery = `INSERT INTO ${fileName} (journey_departure, journey_return, departure_station_id, departure_station_name, return_station_id, return_station_name, covered_distance, duration) VALUES %L`;
        let result = filteredData.map((journey) => {
          return [
            journey.journey_departure,
            journey.journey_return,
            journey.departure_station_id,
            journey.departure_station_name,
            journey.return_station_id,
            journey.return_station_name,
            journey.covered_distance,
            journey.duration
          ]
        })
  
        await client.query(format(insertQuery, result), [], (err) => {
          console.log({
            "error": err?.message,
            "result": result
          });
  
        });
  
  
        await client.query('COMMIT');
        res.status(201).send({
          "message": `${fileName} was uploaded`
        });
      } catch (err) {
        await client.query('ROLLBACK');
        throw err;
      } finally {
        client.release();
      }

      
      console.log("Valid file name.");
    } else {
      res.status(406).send('Invalid file name.')
    }


  } catch (err) {
    console.error(err);
    res.status(500).send(`An error occurred. ${(err as Error).message}`);
  }
};