import Model from '../models/model.js';
import Vehicle from '../models/vehicle.js';
// -- making new JSON of vehicles (function reused in "/vehicles"  and "/vehicles/:country" routes)
const getNewVehiclesJSON = (vehicles, models) => {
  let newVehiclesJSON = [];
  vehicles.reduce((total, currentVehicle) => {
    let filteredModels = models.find(
      (model) => '' + model._id === currentVehicle.model_id
    );

    total = {
      _id: currentVehicle._id,
      model_name: filteredModels.name,
      hour_price_with_PVM: (filteredModels.hour_price * 1.21).toFixed(2),
      number_plate: currentVehicle.number_plate,
      country_location: currentVehicle.country_location,
    };

    newVehiclesJSON.push(total);
  }, []);

  return newVehiclesJSON;
};

export const getVehicles = async (req, res) => {
  let vehicles = await Vehicle.find({});
  let models = await Model.find({});

  let newVehiclesJSON = getNewVehiclesJSON(vehicles, models);

  res.json(newVehiclesJSON);
};

export const getVehiclesByCountry = async (req, res) => {
  let country = req.params.country;
  let models = await Model.find({});

  let vehicles = await Vehicle.find({ country_location: country });
  let newVehiclesJSON = getNewVehiclesJSON(vehicles, models);

  res.json(newVehiclesJSON);
};
