const Patient = require('../lib/models/patient');

exports.getPatients = async (ctx) => {
  const patients = await Patient.find().lean(true);

  ctx.body = patients;
};

exports.getPatientById = async (ctx) => {
  const { params: { id } } = ctx;
  const patient = await Patient.findById(id).lean(true);

  ctx.body = patient;
};
exports.getRecordsByPatientId = async (ctx) => {
  const { params: { id } } = ctx;
  const { records } = await Patient.findById(id).lean(true);

  ctx.body = records;
};

exports.addPatient = async (ctx) => {
  const { request: { body } } = ctx;

  const {
    firstName,
    lastName,
    birthdate,
    records = [],
  } = body;

  const patient = await Patient.create({
    firstName,
    lastName,
    birthdate,
    records,
  });

  ctx.body = patient;
};

exports.setRecordsByPatientId = async (ctx) => {
  const {
    params: {
      id,
    },
    request: {
      body: {
        firstName,
        lastName,
        birthdate,
        records = [],
      },
    },
  } = ctx;

  const patient = Patient.findById(id);

  patient.firstName = firstName;
  patient.lastName = lastName;
  patient.birthdate = birthdate;
  patient.records = records;

  await patient.save();

  ctx.body = patient;
};
