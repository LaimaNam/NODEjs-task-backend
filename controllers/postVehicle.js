import Vehicle from '../models/vehicle.js';

const postVehicle = (req, res) => {
  // -- validation for user inputs
  if (
    !req.body.model_id ||
    !req.body.number_plate ||
    !req.body.country_location
  ) {
    res.status(400).json({
      message: 'All fields are required!',
      status: 'error',
    });
    return;
  }
  //-- if validation passes, adding new car
  const newVehicle = new Vehicle(req.body);

  newVehicle
    .save()
    .then((data) => {
      res.json({ message: 'New vehicle added!', status: 'success' });
    })
    .catch((err) => console.log(err));
};

export default postVehicle;
