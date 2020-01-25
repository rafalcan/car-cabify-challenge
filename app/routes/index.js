const { Router } = require('express');

const methodNotAllowed = require('../routes/method-not-allowed');
const StatusController = require('../controllers/status');
const CarsController = require('../controllers/cars');
const JourneyController = require('../controllers/journey');
const DropoffController = require('../controllers/dropoff');
const LocateController = require('../controllers/locate');

const router = Router();

router.route('/status')
  .get(StatusController.read)
  .all(methodNotAllowed);
router.route('/cars')
  .put(CarsController.update)
  .all(methodNotAllowed);
router.route('/journey')
  .post(JourneyController.create)
  .all(methodNotAllowed);
router.route('/dropoff')
  .post(DropoffController.create)
  .all(methodNotAllowed);
router.route('/locate')
  .post(LocateController.create)
  .all(methodNotAllowed);

module.exports = router;
