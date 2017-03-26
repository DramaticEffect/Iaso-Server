const Koa = require('koa');
const Router = require('koa-router');

const koaBody = require('koa-body');
const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017');
mongoose.Promise = Promise;

const patientRoutes = require('./routes/patient');

const app = new Koa();
const router = new Router();

// Accessors
router.get('/patients', patientRoutes.getPatients);
router.get('/patients/:id', patientRoutes.getPatientById);
router.get('/patients/:id/records', patientRoutes.getRecordsByPatientId);

// Mutators
router.post('/patients', patientRoutes.addPatient);
router.patch('/patients/:id/records', patientRoutes.setRecordsByPatientId);

app.use(koaBody());
app.use(router.routes());

// eslint-disable-next-line no-console
app.listen(3000, () => console.log('Listening on port 3000'));
