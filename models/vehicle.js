import mongoose from 'mongoose';
const { Schema } = mongoose;

const vehicleSchema = new Schema({
  model_id: {
    type: String,
    required: true,
  },
  number_plate: {
    type: String,
    required: true,
  },
  country_location: {
    type: String,
    required: true,
  },
});

const Vehicle = mongoose.model('vehicle', vehicleSchema);

export default Vehicle;
