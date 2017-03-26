const Koa = require('koa');
const corsMiddleware = require('koa-cors');
const Router = require('koa-router');
const koaBody = require('koa-body');
const mongoose = require('mongoose');

const blockchainSyncMiddleware = require('./lib/middleware/blockchainSync');

const mongoHost = process.env.IASO_MONGO_HOST || 'mongo';

mongoose.connect(`mongodb://${mongoHost}:27017`);
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
router.post('/patients/:id/records', patientRoutes.setRecordsByPatientId);

app.use(corsMiddleware());
app.use(blockchainSyncMiddleware());
app.use(koaBody());
app.use(router.routes());

// eslint-disable-next-line no-console
app.listen(3000, () => console.log('Listening on port 3000'));
