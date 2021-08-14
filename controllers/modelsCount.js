import Model from '../models/model.js';
import Vehicle from '../models/vehicle.js';

const modelsCount = async (req, res) => {
  let vehicles = await Vehicle.find({});
  let models = await Model.find({});

  let newJSON = [];
  models.reduce((total, currentModel) => {
    let filteredVehiclesArray = vehicles.filter(
      (vehicle) => vehicle.model_id === '' + currentModel._id
    );

    total = {
      _id: currentModel._id,
      name: currentModel.name,
      vehiclesCount: filteredVehiclesArray.length,
    };

    newJSON.push(total);
  }, []);

  res.json(newJSON);
};

export default modelsCount;
