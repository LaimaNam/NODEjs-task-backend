import Model from '../models/model.js';

const postModel = (req, res) => {
  // -- validation for user inputs
  if (!req.body.name || !req.body.hour_price) {
    res.status(400).json({
      message: 'All fields are required!',
      status: 'error',
    });
    return;
  }

  if (+req.body.hour_price < 0) {
    res.status(400).json({
      message: 'Price per hour must be a positive number!',
      status: 'error',
    });
    return;
  }

  // -- if validation passes, adding new car
  const carModel = new Model(req.body);

  carModel
    .save()
    .then((data) => {
      res.json({ message: 'New car model added!', status: 'success' });
    })
    .catch((err) => console.log(err));
};

export default postModel;
