import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// controllers
import getModels from './controllers/getModels.js';
import modelsCount from './controllers/modelsCount.js';
import {
  getVehicles,
  getVehiclesByCountry,
} from './controllers/getVehicles.js';
import postModel from './controllers/postModel.js';
import postVehicle from './controllers/postVehicle.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// middlewares
app.use(cors());
app.use(express.json());

// connecting DB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((res) => {
    console.log(`Connected to MongoDB...`);
    // stating server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}...`);
    });
  });

// -- -- Routes
// -- GET
app.get('/models', getModels);

app.get('/modelscount', modelsCount);

app.get('/vehicles', getVehicles);

app.get('/vehicles/:country', getVehiclesByCountry);

// -- POST
app.post('/models', postModel);

app.post('/vehicles', postVehicle);

/*

1 ----
POST /models (leis įrašyti naują modelį);
POST /vehicles (įrašyti naują automobilį);

2 ----
GET /models (paduos visus modelius - auto kaina be PVM);
GET /modelscount (grąžins visus modelius ir kiek automobilių turi šie modeliai);
GET /vehicles (paduos visus automobilius, kur model_id taps model name ir hour_price [su join padaryti]). Čia, automobilių kaina grąžinama su PVM.

3 --- dinaminiai URL /vehicles/:country
GET /vehicles/lt (paduos visus automobilius, kurie yra Lietuvoje; identiškas duomenų formatas kaip /vehicles);
GET /vehicles/lv (paduos visus automobilius, kurie yra Latvijoje; identiškas duomenų formatas kaip /vehicles);
GET /vehicles/ee (paduos visus automobilius, kurie yra Estijoje; identiškas duomenų formatas kaip /vehicles);

  */
