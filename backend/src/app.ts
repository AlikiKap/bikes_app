import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { getAllJourneys } from '../src/routes/journey';
import { getAllStations, getStationData } from '../src/routes/station';
import * as middlewares from './middlewares';
import api from './api';
import { Routes } from './queries/types';
import multer, { memoryStorage } from 'multer';
import {uploadData} from './queries/csvImport';


const app = express();
const upload = multer({ dest: 'upload', storage: memoryStorage() });

app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200
}));

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<{}, Routes>('/', (req, res) => {
  res.json({
    journeys: 'http://localhost:3001/journeys',
    stations: 'http://localhost:3001/stations'
  });
});

app.get('/journeys', getAllJourneys);
app.post('/upload',upload.single('csv'),uploadData);
app.get('/stations', getAllStations);
app.get('/stations/:id', getStationData);

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
