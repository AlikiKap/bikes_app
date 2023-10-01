import { pool } from '../util/db';
import { Journey, PageData } from './types';
import {fileName} from './csvImport';
import { log } from 'console';

export const getJourneysData = async (itemsPerPage: number, offset: number): Promise<PageData> => {
  try {
    const intOffset = parseInt(offset.toString(), 10);
    const intItemsPerPage = parseInt(itemsPerPage.toString(), 10);

  console.log(`File: ${fileName}`);


    const results = await pool.query(`SELECT * FROM ${fileName} OFFSET $1 LIMIT $2`, [intOffset, intItemsPerPage]);
    const totalCountResult = await pool.query(`SELECT COUNT(*) AS total_count FROM ${fileName}`);
    const totalCount: number = totalCountResult.rows[0].total_count;
    const maxPages = Math.ceil(totalCount / intItemsPerPage);

    return {
      rows: results.rows,
      totalPages: maxPages
    };
  } catch (error) {
    throw error;
  }
};

