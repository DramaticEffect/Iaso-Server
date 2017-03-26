#!/usr/bin/env node
const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect('mongodb://mongo:27017');

const Patient = require('../lib/models/patient');

(async function main() {
  await Patient.create({
    firstName: 'John',
    lastName: 'Doe',
    records: [
      {
        type: 'tetanus',
        dateAdministered: Date.now(),
        administeredBy: 'John Smith',
        nextDate: Date.now() + 1000,
      },
      {
        type: 'polio',
        dateAdministered: Date.now(),
        administeredBy: 'Ralph Smith',
        nextDate: Date.now() + 55802,
      },
    ],
  });

  mongoose.connection.close();
}());

