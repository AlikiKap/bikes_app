import { pool } from '../util/db';
import { Journey } from './types';

export const getJourneysData = (): Promise<Journey[]> => new Promise<Journey[]>(function (resolve, reject) {
  pool.query('SELECT * FROM journeys_05 LIMIT 200', (error: Error, results: any) => {
    if (error)
      return reject(error)
    resolve(results.rows as Journey[]);
  });
});
