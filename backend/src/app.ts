import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { getAllJourneys } from '../src/queries/journey';
import {getAllStations} from '../src/queries/station'


import * as middlewares from './middlewares';
import api from './api';


const app = express();

app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200 
}));

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/journeys',getAllJourneys);
app.get('/stations',getAllStations)

app.use('/api/v1', api);


app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
