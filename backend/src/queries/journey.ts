import { log } from 'console';
import { pool } from '../util/db';
import { PageData } from './types';

export const getJourneysData = async (itemsPerPage: number, offset: number): Promise<PageData> => {
  try {
    const results = await pool.query('SELECT * FROM journeys_05 OFFSET $1 LIMIT $2', [offset, itemsPerPage]);
    const totalCountResult = await pool.query('SELECT COUNT(*) AS total_count FROM journeys_05');
    const totalCount: number = totalCountResult.rows[0].total_count;
    const maxPages = Math.ceil(totalCount / itemsPerPage);

    return {
      rows: results.rows,
      totalPages: maxPages
    };
  } catch (error) {
    throw error;
  }
};
