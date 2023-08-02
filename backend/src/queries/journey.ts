import {pool} from '../util/db';
import { Journey } from './types';


export const getAllJourneys = (req: any, res: any) => {
    getJourneys()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  }

const getJourneys = (): Promise<Journey[]> => new Promise<Journey[]>(function (resolve, reject) {
  pool.query('SELECT * FROM journeys_05 LIMIT 200', (error: Error, results: any) => {
    if (error) 
      return reject(error)
    
      resolve(results.rows as Journey[]);
    
  });
});
