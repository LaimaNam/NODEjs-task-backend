import Model from '../models/model.js';

const getModels = async (req, res) => {
  let models = await Model.find({});
  res.json(models);
};

export default getModels;
