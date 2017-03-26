const mongoose = require('mongoose');

const recordSchema = mongoose.Schema({
  type: String,
  dateAdministered: String,
  administeredBy: String,
  nextDate: String,
});

const patientSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  birthdate: String,
  records: [recordSchema],
});

patientSchema
  .virtual('name')
  .get(function getName() {
    return `${this.firstName} ${this.lastName}`;
  });

module.exports = mongoose.model('Patient', patientSchema);
